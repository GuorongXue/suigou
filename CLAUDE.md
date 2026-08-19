# 随构 Suigou · 项目记忆（Claude Code 上下文）

AI 驱动的铝型材参数化设计平台：用户一句话 → 抽取参数 → 确定性生成结构 → 3D 预览 → 校验/BOM/切割清单/装配说明。Phase 0 单人开发。

## 技术栈与命令

- Vite + React + TypeScript + Three.js；`yaml` 解析知识库。
- 开发：`npm run dev`（端口 5173）
- 类型检查：`npx tsc -p tsconfig.json --noEmit`
- 回归（必须过）：`npm run golden`（知识库完整性 + Golden 用例 + 生成不变量 + 三个真实案例黄金锚点）
- AI 链路回归：`npm run m5`（需 `$env:LONGCAT_API_KEY` + `$env:NODE_TLS_REJECT_UNAUTHORIZED=0` 过公司网络）
- 生产构建：`npm run build`
- 单句诊断：`npx tsx scripts/diag.ts`（抽取→意图→生成逐环打印，同样需上面两个环境变量）

## 目录结构

- `knowledge/`：知识库 YAML（单一事实源）
  - `sections/`（截面 2020/3030/4040）、`connectors/`（角码/锚式/内置/三通/内置角槽）、`rules/`、`tests/golden.yaml`
  - `archetypes.yaml`：真实物件尺寸档位（电脑桌/置物架/衣柜/鞋柜/鱼缸架/抽屉塔）
  - `panels.yaml`（板材+固定档位）、`fasteners.yaml`（SKU 单价）
- `src/engine/`：`extract.ts`(LLM抽取) → `intent.ts`(意图→FrameSpec) → `generate.ts`(确定性生成) → `validate.ts`(校验) → `select.ts`(选型)/`golden.ts`/`assembly.ts`/`nesting.ts`
- `src/knowledge/loader.ts`：浏览器侧知识库装载；`scripts/kb-node.ts`：Node CLI 侧（两处都要同步改）
- `src/viewer/Viewer.tsx`：Three.js 渲染；`src/App.tsx`：工作台 UI

## 核心工作纪律（重要）

1. **每个改动点单独 git commit**（方便回退），提交信息用 `feat/fix/chore(scope): ...`。
2. **每项进展实时同步到 Obsidian**（不在 repo 里建 markdown）：`C:\Users\wk074\Documents\Obsidian Vault\随构\` 下 21 份文档是项目大脑。开发日志=`14-Phase0-开发日志.md`，真实案例库=`21-真实案例库.md`。
3. **改任何逻辑后必须跑** `tsc` + `npm run golden`，通过才提交。
4. `图片/`、`archive/`、`out/`、`dist/` 已 gitignore，绝不提交（含 API key 的旧会话在 archive/）。

## 已验证的硬事实（真实案例反推，勿推翻）

- **梁长公式**：梁长 = 总尺寸 − 2×柱宽 + 2×连接件修正。三个真实产品 BOM 实证（670=630+40、350=290+60、1342→1302）。
- **抽屉节距**：160~165mm（周转箱 148 + 间隙 / 490÷3）。
- **系列主连接件**：2020→内置角槽(primary)，3030→三通端面件，30系列通用→角码/锚式。
- **电脑桌语义**：纯桌 680~800（四腿全高 + 桌面凹嵌 top-inset + 底部长边双撑 + 跨度>1200加中横梁）；带上架 1100~1800（后柱全高+前腿止于桌面+桌下仅后撑+上层浅后靠）。桌下正面永远开放。
- **mobility 三态**：fixed / leveling-feet(调平地脚) / caster(脚轮)，后两者拧入落地柱底端 M8 攻牙。
- **板材固定按板厚分档**：6mm→corner-flat，12mm→shelf-support(平嵌隐形)，15-18mm→t-nut-screw，脆性板→gasket-clamp。
- **抽屉两方案**：成品抽屉+反弹轨(家具无拉手) / 周转箱+三折轨(工具)。

## Golden 黄金锚点（生成 BOM 必须与真实产品对齐，改动不能破坏）

1. 极简桌 1342×545×740 → 1302×4 / 505×3 / 740×4 + 凹嵌桌面
2. 三抽屉柜 350×400×490 → 490×4 / 340×10 / 290×4 + 3抽屉盒 + 4调平地脚

## 范围红线（Phase 0）

正交框架 + 隔板 + 抽屉 + 脚轮/地脚 + 板材。无登录、无交易、无自由几何编辑。超纲需求（悬挑/曲面/人体承重椅等）诚实降级记录到 unsupported，绝不静默丢弃或编造尺寸。

## 待办（下一批）

- ~~黄金锚点①工具收纳柜 670×400×815~~ ✅ 中柱拓扑+偏置+三列类型已完整，golden 通过
- ~~LLM 数量词解析~~ ✅ "5层→5抽屉"联动已落地
- ~~顶板 top-recessed / 型材颜色 / 洞洞板 side / 预装约束~~ ✅ 全部完成
- ~~爆炸图可视化~~ ✅ 形心乘性外扩滑杆（外观/结构模式，爆炸时隐藏细节标注）
- ~~DXF 导出~~ ✅ R12 ASCII 全件号平铺（轮廓+孔位+件号标注，golden 第13节断言）
- ~~多句对话记忆~~ ✅ 10轮窗口+完整spec状态+降级历史回传
- ~~变高立柱~~ ✅ 中柱 = H−顶板厚−梁高（锚点①真实BOM 810×4/775×2 精确对齐，顶梁通长架中柱顶，仅 centerColumn+recessed 场景触发）
- ~~2040 矩形梁~~ ✅ 梁柱双截面 `beamSectionId`：层框梁 2040 立放（宽=柱宽槽对齐），底框底对齐/其余层顶对齐（beamDrop=(bh−s)/2），撑杆不升级，切割清单按件截面分组；非法组合阻断（梁宽≠柱宽、2040+抽屉/中柱）
- 中柱分区几何：列中心必须用 `(colXLeft+colXRight)/2`（不能 `colXLeft+colWidth/2`，偏 s/2）；门宽 `colWidth+2s` 居中真正中点（commit 7722d7d）
- 待启动：STEP 导出（需 3D 内核，评估 occt-import-js 或后端转换）
