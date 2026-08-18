---
tags: [随构, 知识库, Schema, 设计稿]
created: 2026-08-04
status: 初稿-待评审
---

# 随构 · 知识库 YAML Schema 设计（初稿）

> 设计依据：[[01-竞品分析-嘉立创FA]] 第六批解码的截面/连接件 JSON 结构思想 + [[07-软件缺陷改进方案]] 元数据/Golden单测要求 + [[05-品类观与创意图谱]] 材料接口层。
> 原则：数据与规则分离、规则与引擎分离、每条记录可溯源可测试。

## 0. 仓库目录规划（未来代码库）

```
knowledge/
  sections/        # 型材截面库（一文件一截面）
  connectors/      # 连接件库
  rules/
    selection.yaml       # 选型规则
    connection.yaml      # 连接决策
    validation.yaml      # 校验规则
    material-interface.yaml  # 材料接口规则
  prices/          # 价格快照（按日期版本化）
  tests/           # Golden用例（与规则包一一对应）
```

## 1. 公共元数据信封（每条记录必带）

```yaml
meta:
  id: eu-3030                # 全局唯一
  source: jlcfa-process-page # jlcfa-*/national-standard/handbook/inferred
  confidence: public         # verified(行家评审/实测) / public(公开资料) / inferred(推断)
  review: pending            # pending / approved / rejected
  version: 0.1.0
  updated: 2026-08-04
  notes: ""
```

> 生成行为约束：`inferred` 级规则参与生成时方案必须标注"基于推断，建议核实"。

## 2. 截面库 sections/*.yaml

```yaml
section:
  id: eu-3030
  name: 3030铝型材 欧标
  standard: eu               # eu / gb
  series: 30
  size: [30, 30]             # 截面外形 mm
  variant: null              # A/B/C/E/R 等截面变体
  slot: { type: T, width: 8, depth: 8.5 }
  wallThickness: 2.0         # mm，关联强度
  weightPerMeter: 0.85       # kg/m，驱动重量/成本估算
  coreHole: { diameter: 5.0, tapping: M6, tapDepth: 15 }   # 端面中心孔(攻牙规则来源)
  faces:                     # 装配语义：四个侧面的槽接口
    - { index: 0, normal: [ 1, 0, 0], slots: [{ offset: 0, width: 8 }] }
    - { index: 1, normal: [-1, 0, 0], slots: [{ offset: 0, width: 8 }] }
    - { index: 2, normal: [ 0, 1, 0], slots: [{ offset: 0, width: 8 }] }
    - { index: 3, normal: [ 0,-1, 0], slots: [{ offset: 0, width: 8 }] }
  outlineRef: dxf/eu-3030.dxf   # 显示/制造几何（描摹自建）
  mechanics:                 # 校验用截面力学参数（待行家评审→verified）
    momentOfInertia: { ix: 3.2e4, iy: 3.2e4 }   # mm^4
    elasticModulus: 6.9e4     # MPa (6063-T5)
```

设计要点：**装配语义(faces/slots) 与显示几何(outlineRef) 分离**——嘉立创同款思想；力学参数为我方独有扩展（它没有校验，我们有）。
> [!important] 2026-08-04 Schema修正2（源：行家评审第三部分）
> ① `mechanics` 不得写死单值：改为 **defaults(典型值+range) + brandOverrides(厂家覆盖)** 双层结构，厂家间惯性矩差20%~50%，用户选厂家自动切换；
> ② `meta.source` 采用三级分级：tier1厂商CAD/Catalog（可入库）> tier2手册（仅公式）> tier3网络转载（禁入）；
> ③ 挠度限值为场景映射表（L/250~L/2000），不是常量。
> [!note] Schema补充（Euler规范要求）
> `mechanics` 需新增 `area`（截面积mm²，长细比计算）与 `radiusOfGyration`（可由 r=√(I/A) 派生）；厂商型录通常直接给出 A/Ix/Iy/rx/ry，随 brandOverrides 一并采集。

## 3. 连接件库 connectors/*.yaml

```yaml
connector:
  id: corner-bracket-30
  name: 角码 30系列
  category: corner           # corner角码/internal内置/anchor锚式/slot角槽/tap打孔攻丝/endface端面/3d三维/plate连接板
  visibility: external       # external外露 / hidden隐藏
  compatible:
    slotWidths: [8]
    series: [eu-30, eu-4008]
  strengthClass: 2           # 1-5 相对强度分级(待行家评审)
  removable: true            # 可拆卸性(影响决策)
  lengthOffset: 0            # 对相邻型材下料长度的修正 mm
  attach:                    # 吸附声明(参照JLC faces思想)
    facesRequired: 2
    orientation: perpendicular
  machining: []              # 派生加工特征；角码无需加工
  bom:                       # 派生配件
    - { sku: t-nut-m6, qty: 2 }
    - { sku: bolt-m6-l12, qty: 2 }
---
connector:
  id: anchor-30
  name: 锚式连接件 30系列
  category: anchor
  visibility: hidden
  compatible: { slotWidths: [8], series: [eu-30] }
  strengthClass: 4
  removable: true
  lengthOffset: 0
  attach: { facesRequired: 2, orientation: perpendicular }
  machining:                 # 关键：加工特征=连接件的声明式派生
    - type: through-hole
      diameter: 11.5
      onMember: adjacent     # 打在相邻型材上
      offsetFromEnd: "19 - slotWallThickness + 2"   # G=19-T+2 公式入库
  bom:
    - { sku: tpef-308-0, qty: 1 }
```
> [!important] 2026-08-04 Schema修正（源：行家评审补充）
> **接点(joint)必须支持多连接件组合，各连接件带角色(role: stiffness/positioning)**——工业惯例"角码+内置"组合（内置定位、角码承力）打破了"一接点一连接件"的原始假设。连接件Schema增加 `loadRole` 字段，装配模型的 joint 定义为连接件数组。

## 4. 选型规则 rules/selection.yaml

```yaml
rules:
  - id: sel-001
    meta: { source: inferred, confidence: inferred, review: pending }
    when: { span: "<=600", loadKg: "<=30", scene: desktop }
    use: eu-2020
    rationale: 短跨轻载，20系列性价比最高
  - id: sel-002
    when: { span: "600..1200", loadKg: "30..80" }
    use: eu-3030
    rationale: 中跨中载主力系列，配件生态最全
  - id: sel-003
    when: { loadKg: ">80", scene: [aquarium, machine] }
    use: eu-4040
    rationale: 重载/水族场景保守选型
conflicts:                    # 冲突仲裁（07文档要求）
  priority: [safety, budget, aesthetics]   # 安全永远压倒预算
```

## 5. 连接决策 rules/connection.yaml

```yaml
rules:
  - id: con-001
    when: { joint: corner-90, load: light, hiddenRequired: false }
    use: corner-bracket
    rationale: 便宜免加工可拆，轻载首选
  - id: con-002
    when: { joint: corner-90, hiddenRequired: true }
    use: internal-connector
    rationale: 外观优先场景，代价是打孔加工费
  - id: con-003
    when: { joint: corner-90, load: heavy }
    use: anchor
    rationale: 强度优先，隐藏式，加工费高于角码
```

## 6. 校验规则 rules/validation.yaml

```yaml
rules:
  - id: val-001
    type: max-span
    expr: "span <= seriesMaxSpan[section] "
    onFail: { action: reject-and-ask, message: 跨度超出该系列建议值，建议加中柱或升级系列 }
  - id: val-002
    type: deflection            # 简支梁挠度估算(公式待行家评审)
    expr: "5*q*L^4/(384*E*I) <= L/300"
    onFail: { action: suggest, message: 估算挠度偏大，建议升级截面或加横撑 }
  - id: val-003
    type: high-risk-scene       # 07文档责任设计落地
    when: { scene: [aquarium, child, overhead] }
    action: { addSafetyFactor: 1.5, showWarning: true }
```

## 7. 材料接口规则 rules/material-interface.yaml（混材预留）

```yaml
rules:
  - id: mat-001
    material: wood-board
    mount: t-nut-direct        # T型螺母直固
    clearance: 0
  - id: mat-002
    material: acrylic
    mount: slot-insert         # 嵌槽
    clearance: 1.5             # 热胀间隙 mm
    maxSize: [600, 600]
  - id: mat-003
    material: glass
    mount: slot-insert-with-gasket   # 嵌槽+胶条
    requires: [rubber-gasket]
    safetyNote: 必须钢化玻璃，边缘倒角
  - id: mat-004
    material: led-strip
    mount: slot-inlay          # 槽内嵌入(槽宽8mm适配10mm内灯条需检查)
    maxWidth: 8
```

## 8. Golden 用例格式 tests/*.yaml

```yaml
tests:
  - id: t-sel-002-a
    rule: sel-002
    input: { span: 900, loadKg: 50, scene: workbench }
    expect: { use: eu-3030 }
  - id: t-con-003-a
    rule: con-003
    input: { joint: corner-90, load: heavy }
    expect: { use: anchor, machining: [{ type: through-hole, diameter: 11.5 }] }
```

## 9. 待评审清单（行家门禁）

- [ ] mechanics 力学参数（惯性矩/弹性模量数据来源与数值）
- [ ] strengthClass 连接件强度分级排序
- [ ] sel-* 选型阈值（跨度/载荷分界）
- [ ] val-002 挠度公式与 L/300 判据适用性
- [ ] mat-* 材料间隙与安装方式

## 下一步

1. 按此 Schema 先建 3 个截面（eu-2020/eu-3030/eu-4040）+ 4 个连接件（角码/内置/锚式/端面）真实数据
2. 每包配 5-10 条 Golden 用例
3. 找行家过一遍"待评审清单"
