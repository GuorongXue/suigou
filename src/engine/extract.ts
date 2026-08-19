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
  mobility: 'fixed' | 'caster' | 'leveling-feet' | 'unknown';
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
4. mobility：用户提到轮子/移动/推拉/走/滚填 caster；提到调平/地脚/水平/稳固/不平填 leveling-feet；明确说固定/不动/落地填 fixed；完全未提及移动需求一律填 "unknown"，不要推断为 fixed
5. scene 判定标准：电脑桌/书桌/办公桌/学习桌/操作台面=workbench；工具柜/收纳柜/抽屉柜/储物柜/酒柜/鸡尾柜等一切柜子及家用置物=diy-furniture（柜类绝不是 workbench，workbench 仅限有桌面操作区的桌子）；车间/仓储重货架=industrial-rack；鱼缸相关一律=aquarium；儿童用品=child；阳台室外=outdoor；其余拿不准=unknown
6. 可以做常识推断，但每条推断必须写入 _assumptions 数组（例如："鱼缸1.2米→满水约180kg→按250kg设计余量"）
7. 高风险场景（水族/儿童用品/悬挂/带脚轮的高架/人体载荷）必须写入 _riskFlags
8. 载荷区分集中/均布：桌面放一台机器=concentrated，摆满杂物=distributed；拿不准=unknown
9. _missing 按重要性排序：先安全相关（载荷/跨度/高度），再成本相关（系列/材质），最后外观
10. 数字缺少单位、或无法确定对应宽/深/高哪个维度时（如"三段式 75 30 5"），dimensions 一律保持 null：把可能的解释写入 _assumptions，并在 _missing 中列出需确认的尺寸
11. _explicitFields：列出本轮用户输入（最后一条消息）中明确提到或明确修改的字段路径，可选值："dimensions.width","dimensions.depth","dimensions.height","load.totalKg","load.type","mobility","scene","layers","panels"。仅基于最后一条用户消息判断，历史提过但本轮未提的不要列入
12. environment.vibration：放置的设备本身会高速运动/振动时填 true（3D打印机尤其CoreXY结构如拓竹/Voron、激光雕刻机、CNC、缝纫机），并在 _assumptions 说明依据
13. 水与电器同框（水桶/水槽/鱼缸 与 电茶炉/电器同时出现）→ _riskFlags 加 "water-electric"
14. budgetSensitivity：用户说出预算金额或"便宜/性价比"→ high；"要好的/不差钱"→ low；未提→ unknown。预算金额写入 _assumptions（如"预算1000元"）
15. panels.material 只能取枚举值；遇到枚举外材料（海洋板/PVC/金属网等）填 "other" 并在 _assumptions 记录原词，禁止归入相近枚举。例外：提到“挂架/挂钩/挂工具/洞洞板”功能的立面（侧板/背板）= pegboard（洞洞板是挂架功能的标准实现）
16. panels 数量词展开：用户提到带数量的抽屉/门/板材（如"5个抽屉"、"两个门"、"三块侧板"），必须在 panels 数组中输出对应数量的条目（每条一个对象；Schema 无数值/qty 字段，不能合并为一条）。"5个抽屉"→ 5 条 {"material":"wood","position":"drawer"}。注意区分："X层"一般指搁板层数→只填 layers: X；但"X层抽屉柜/抽屉塔"的"层"=抽屉个数→应展开为 X 条 drawer 条目（position: "drawer"）。"X个抽屉/门/侧板"始终展开到 panels 数组。⚠ 展开抽屉到 panels 时禁止同时填 layers（避免 shelfCount 与 drawerCount 双重计数）；只有真正的搁板层数才填 layers

Schema：
{
  "productType": "workbench | shelf | cabinet | frame | enclosure | other",
  "dimensions": { "width": null, "depth": null, "height": null, "unit": "mm" },
  "load": { "totalKg": null, "type": "distributed | concentrated | unknown", "description": "" },
  "scene": "diy-furniture | industrial-rack | workbench | automation | precision | optical | aquarium | child | outdoor | unknown",
  "mobility": "fixed | caster | leveling-feet | unknown",
  "stiffnessNeed": "normal | high | unknown",
  "environment": { "humid": null, "outdoor": null, "vibration": null },
  "panels": [ { "material": "wood | glass | acrylic | pegboard | other | none", "position": "top | shelf | bottom | side | door | drawer" } ],
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
  try {
    return JSON.parse(jsonText) as Extraction;
  } catch (e) {
    // LLM 输出被截断/多余 markdown/非 JSON 时，给可操作的提示而非原始语法错误
    const snippet = jsonText.slice(0, 120).replace(/\s+/g, ' ').trim();
    throw new Error(
      `AI 返回的参数格式无法解析（${(e as Error).message}）。通常是输出被截断，请重试；若反复出现请简化描述。原始片段：${snippet || '(空)'}`,
    );
  }
}
