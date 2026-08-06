/**
 * 意图层（M4）：自然语言 → 结构化参数抽取（LongCat-2.0，提示词 v0.3 实验一致率 95.5%）。
 * 已知坑（suigou-lab 实验结论）：推理型模型答案可能在 reasoning_content；不支持
 * response_format 时需降级；输出可能带 ``` 围栏。
 */

export interface Extraction {
  productType: string;
  dimensions: { width: number | null; depth: number | null; height: number | null; unit: string };
  load: { totalKg: number | null; type: 'distributed' | 'concentrated' | 'unknown'; description: string };
  scene: string;
  mobility: 'fixed' | 'caster' | 'unknown';
  stiffnessNeed: string;
  environment: { humid: boolean | null; outdoor: boolean | null; vibration: boolean | null };
  panels: { material: string; position: string }[];
  appearance: { color: string | null; hiddenConnectorsPreferred: boolean | null };
  budgetSensitivity: string;
  layers: number | null;
  /** 本轮用户输入中明确提到的字段路径（手动锁定解锁依据，9.4.1） */
  _explicitFields?: string[];
  _missing: string[];
  _assumptions: string[];
  _riskFlags: string[];
}

// 提示词 v0.3（与 suigou-lab/system_prompt.txt 同源，实验验证 95.5%）
const SYSTEM_PROMPT = `你是一位资深机械结构工程师，负责把用户的自然语言需求转换为结构化参数。

输出规则：
1. 只输出一个符合下方Schema的JSON对象，不要输出markdown代码块标记、解释或其他任何内容
2. 用户没说的信息一律填 null 或 "unknown"，绝对禁止编造尺寸和载荷数值
3. load.totalKg 只在用户明确说出重量数值时才填；你估算的重量只能写进 _assumptions，totalKg 保持 null
4. mobility：用户提到轮子/移动/推拉填 caster；完全未提及移动需求一律填 "unknown"，不要推断为 fixed
5. scene 判定标准：家用家具/置物=diy-furniture；放工具仪器的操作台面=workbench；车间/仓储重货架=industrial-rack；鱼缸相关一律=aquarium；儿童用品=child；阳台室外=outdoor；其余拿不准=unknown
6. 可以做常识推断，但每条推断必须写入 _assumptions 数组（例如："鱼缸1.2米→满水约180kg→按250kg设计余量"）
7. 高风险场景（水族/儿童用品/悬挂/带脚轮的高架/人体载荷）必须写入 _riskFlags
8. 载荷区分集中/均布：桌面放一台机器=concentrated，摆满杂物=distributed；拿不准=unknown
9. _missing 按重要性排序：先安全相关（载荷/跨度/高度），再成本相关（系列/材质），最后外观
10. 数字缺少单位、或无法确定对应宽/深/高哪个维度时（如"三段式 75 30 5"），dimensions 一律保持 null：把可能的解释写入 _assumptions，并在 _missing 中列出需确认的尺寸
11. _explicitFields：列出本轮用户输入（最后一条消息）中明确提到或明确修改的字段路径，可选值："dimensions.width","dimensions.depth","dimensions.height","load.totalKg","load.type","mobility","scene","layers","panels"。仅基于最后一条用户消息判断，历史提过但本轮未提的不要列入

Schema：
{
  "productType": "workbench | shelf | cabinet | frame | enclosure | other",
  "dimensions": { "width": null, "depth": null, "height": null, "unit": "mm" },
  "load": { "totalKg": null, "type": "distributed | concentrated | unknown", "description": "" },
  "scene": "diy-furniture | industrial-rack | workbench | automation | precision | optical | aquarium | child | outdoor | unknown",
  "mobility": "fixed | caster | unknown",
  "stiffnessNeed": "normal | high | unknown",
  "environment": { "humid": null, "outdoor": null, "vibration": null },
  "panels": [ { "material": "wood | glass | acrylic | pegboard | other | none", "position": "top | shelf | side | door | drawer" } ],
  "appearance": { "color": null, "hiddenConnectorsPreferred": null },
  "budgetSensitivity": "low | medium | high | unknown",
  "layers": null,
  "_explicitFields": [],
  "_missing": [],
  "_assumptions": [],
  "_riskFlags": []
}`;

// 浏览器走 vite 代理；Node CLI（M5 跑批）直连并从环境变量取 Key
const IS_NODE = typeof localStorage === 'undefined';
const ENDPOINT = IS_NODE
  ? 'https://api.longcat.chat/openai/v1/chat/completions'
  : '/api/longcat/openai/v1/chat/completions';
const MODEL = 'LongCat-2.0';

export function getApiKey(): string | null {
  if (IS_NODE) return (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env.LONGCAT_API_KEY ?? null;
  return localStorage.getItem('llm_api_key');
}

export function setApiKey(key: string) {
  localStorage.setItem('llm_api_key', key);
}

/** 抽取（支持多轮：把追问回答拼进对话） */
export async function extractIntent(
  userText: string,
  history: { role: 'user' | 'assistant'; content: string }[] = [],
): Promise<Extraction> {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('未配置 API Key');

  const payload: Record<string, unknown> = {
    model: MODEL,
    temperature: 0,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history,
      { role: 'user', content: userText },
    ],
  };

  let resp = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (resp.status === 400) {   // 平台不支持 response_format 时降级
    delete payload.response_format;
    resp = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }
  if (!resp.ok) throw new Error(`LLM 调用失败 HTTP ${resp.status}: ${(await resp.text()).slice(0, 200)}`);

  const body = await resp.json();
  const msg = body.choices?.[0]?.message ?? {};
  // LongCat-2.0 推理型：答案可能在 reasoning_content
  const content: string = msg.content || msg.reasoning_content || '';
  const jsonText = content.includes('{')
    ? content.slice(content.indexOf('{'), content.lastIndexOf('}') + 1)
    : content;
  return JSON.parse(jsonText) as Extraction;
}
