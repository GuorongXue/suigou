---
tags: [随构, LLM, 实验方案, Phase0]
created: 2026-08-04
status: 方案定稿-待执行
---

# 随构 · LLM 参数抽取实验方案

> C区预研项。目标：验证"一句话需求 → 结构化参数"的稳定性。**通过标准（E区判据）：同一需求5次抽取字段级一致率 ≥90%。**

## 1. 抽取目标 Schema（对齐知识库维度）

```json
{
  "productType": "workbench | shelf | cabinet | frame | enclosure | other",
  "dimensions": { "width": null, "depth": null, "height": null, "unit": "mm" },
  "load": {
    "totalKg": null,
    "type": "distributed | concentrated | unknown",   // 行家维度：载荷分布
    "description": "放什么东西的原话"
  },
  "scene": "diy-furniture | industrial-rack | workbench | automation | precision | optical | aquarium | child | outdoor | unknown",   // 驱动挠度限值档位与安全系数
  "mobility": "fixed | caster | unknown",              // 行家维度：脚轮触发全套升级
  "stiffnessNeed": "normal | high | unknown",          // 行家维度：精度/刚度需求
  "environment": { "humid": null, "outdoor": null, "vibration": null },
  "panels": [ { "material": "wood|glass|acrylic|none", "position": "top|shelf|side|door" } ],   // 材料接口规则入口
  "appearance": { "color": null, "hiddenConnectorsPreferred": null },
  "budgetSensitivity": "low | medium | high | unknown",
  "layers": null,
  "_missing": [],          // 模型自报缺失字段
  "_assumptions": [],      // 模型采用的默认假设（必须显式列出）
  "_riskFlags": []         // aquarium/child/overhead/highCaster 等高危标记
}
```

设计原则：
1. **一切拿不准的填 unknown/null，禁止臆造数值**（幻觉尺寸是头号敌人）
2. 默认假设必须写进 `_assumptions`（如"未提载荷，按均布30kg假设"）
3. `_riskFlags` 与 val-003/val-005 直连

## 2. System Prompt 草稿 v0.1

```
你是一位资深机械结构工程师，负责把用户的自然语言需求转换为结构化参数。

规则：
1. 只输出符合Schema的JSON，不输出其他内容
2. 用户没说的信息一律填null/unknown，绝对禁止编造尺寸和载荷数值
3. 可以做常识推断，但每条推断必须写入_assumptions（如"鱼缸1.2米→满水约180kg→按250kg设计余量"）
4. 高风险场景（水族/儿童用品/悬挂/带脚轮的高架）必须写入_riskFlags
5. 载荷区分集中/均布：桌面放一台机器=集中，摆满杂物=均布
6. _missing按重要性排序：先安全相关（载荷/跨度/高度），再成本相关（系列/材质），最后外观
```

## 3. 追问策略规则（第二阶段实验）

- 优先级硬编码：**安全(载荷/尺寸/脚轮) → 成本(材质/预算) → 外观(颜色/隐藏连接)**
- 一轮最多问3个问题，合并成一段自然中文；最多追问2轮，之后用默认假设+显式标注
- 高风险场景（_riskFlags非空）：载荷问题必问，不允许默认
- 追问话术要求带工程解释（"1.2米的缸满水约180公斤，所以需要确认……"）——工程师式对话的体验落点

## 4. 实验协议

| 项 | 设定 |
|---|---|
| 测试集 | 10条真实需求原话（来自A区收集，暂用占位集启动） |
| 重复次数 | 每条×5次（temperature=0 与 默认温度 各跑一组） |
| 候选模型 | 国内大模型API×2（成本/合规主选）+ GPT/Claude级×1（上限参照） |
| 一致性度量 | 字段级：5次结果两两比对，数值字段容差±5%，枚举字段严格相等 |
| 通过线 | 关键字段（尺寸/载荷/场景/mobility）一致率≥90%；_assumptions合理率人工评审≥80% |
| 副产品 | 每模型的单次调用成本记录（喂给F区成本模型） |

## 5. 测试集收集模板（A区配套）

```yaml
- id: req-001
  source: 嘉立创开发群 / B站评论 / 小红书 / 水族论坛 / 朋友口述
  raw: "原话一字不改地记录在这里"
  context: 提问者背景（如：养鱼新手，公寓阳台）
  expectedParams: { }   # 人工标注的期望抽取结果（Golden答案）
  notes: ""
```
### 收集识别标准（2026-08-04补）

**合格线**：有人在描述"我想要一个XXX的东西"但还没有解决方案。
- ✅ 需求原话（模糊表达正是要测的："大概到腰""60的缸"）；抱怨帖（"嘉立创连接件看不懂""对角线差3mm玻璃塞不进"）；晒贴评论区的"我也想要怎么做"
- ❌ 已有图纸求报价的；纯晒成品；自己编造或让群友造句（污染样本）
- 记录：原话一字不改（含错别字/模糊词）+ 提问者背景 + 配图截图（Phase 1图片输入素材）

**渠道**（按命中率）：嘉立创开发群聊天记录 > 小红书评论区（搜"铝型材diy/鱼缸架定制/猫爬架自制"）> B站视频评论 > 贴吧水族论坛求助帖 > 闲鱼买家咨询 > 知乎问题描述

**配额（保证场景覆盖30条）**：工作台6 / 鱼缸架5(高危重点) / 宠物4 / 置物收纳5 / 直播摄影3 / 种植户外3 / 带脚轮2 / 自由2；其中≥5条含板材（木/玻璃/亚克力）以覆盖材料接口规则。

## 6. 占位测试集（⚠ synthetic，待真实原话替换）

1. "我想要一个1米2宽的工作台，放3D打印机和工具，桌面想用木头的"
2. "帮我设计个鱼缸架，缸是80×40×50的，放客厅"
3. "想给猫做一个靠窗的爬架，大概到腰那么高，要能挂吊床"
4. "车间要个可以推来推去的物料架，四层，每层放20公斤左右零件"
5. "阳台想搭一个放花盆的架子，一米八高，怕生锈"

> 注意5条各踩一个知识库开关：①集中载荷+木板接口 ②aquarium高风险+2倍安全系数 ③绳索/织物接口+非标高度表达（"到腰"→追问或按900mm假设） ④caster全套升级+四层 ⑤outdoor环境+高瘦H/W校验。**占位集的作用是先跑通实验管线，结论必须以真实原话集复跑为准。**

## 7. 执行步骤

- [ ] 选定2+1候选模型并开通API
- [ ] 用占位集跑通管线（脚本：调用→JSON校验→字段比对→一致率报表）
- [ ] A区真实原话到位10条后正式实验
- [ ] 结果记录到本文档"实验记录"节，通过则勾E区判据
- [ ] 第二阶段：追问策略实验（多轮对话一致性）
### 模型与管线定案（2026-08-04）

- **模型平台：阿里云百炼**（用户有免费额度）：qwen-turbo(小模型/路由测试) / qwen-plus(主力) / qwen-max(上限参照)——三档天然对应成本路由实验
- **实验管线已建**：`PersonalData/vsCodeProject/suigou-lab/`（独立目录，不入Radar仓库）
  - `system_prompt.txt`（Schema+六条规则）/ `testcases.json`（原生组10条）/ `extract_experiment.py`
  - 零第三方依赖（urllib），temperature=0，response_format=json_object，限流保护0.5s
  - 输出：results/raw逐次留档 + summary.csv + report.md（含逐模型成本估算，喂F区成本模型）
  - 运行：设 `DASHSCOPE_API_KEY` 后 `python extract_experiment.py`（全量3×10×5）或 `python extract_experiment.py qwen-plus 2`（调试）
- 判定内置：关键字段(dimensions/load/scene/mobility)两两一致率，数值容差±5%，≥90%通过

## 实验记录

（待填）

##### 2026-08-04 正式实验：LongCat-2.0 —— ✅ 通过（95.5%）

| 项 | 结果 |
|---|---|
| 平台/模型 | 美团LongCat开放平台 / LongCat-2.0（1M上下文，推理型） |
| 协议 | 原生组10条 × 5次重复，temperature=0 |
| 最终成绩 | **关键字段平均一致率 95.5%**（parse率100%），E区判据"≥90%"✅ |
| 迭代轨迹 | v0.1 67.6% → v0.2 89.5% → v0.3 95.5% |

**关键教训（全部已固化进 system_prompt.txt v0.3 与脚本）**：
1. **平台坑**：LongCat-2.0 是推理型模型，答案在 `reasoning_content` 字段而非 `content`——读取需兼容；早期还遇到偶发断连，已加3次重试
2. **测量设计影响结论**：load.description 是自由文本，措辞天然每次不同，剔除出比较集后 load 一致率大幅回升——"测什么"和"怎么测"同样重要
3. **提示词三条铁律**（漂移根因）：totalKg 只在用户明说时填（模型自估必漂移）；mobility 未提及一律 unknown（禁推断 fixed）；scene 枚举必须给判定标准（workbench vs diy-furniture 边界）
4. **歧义数字规则**：无单位或维度映射不明（"三段式75 30 5"）→ dimensions 保持 null + 解释进 _assumptions + 进 _missing 追问——req-006 从55%修到90%
5. 成本：LongCat免费额度内实付0；单次调用约850 tokens

**遗留观察**：req-001（85%）与 req-008（90%）的残余漂移在 mobility/scene 边界判断，可接受；追问策略实验（第二阶段）待Phase 0前执行。
