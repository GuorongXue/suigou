# 中柱拓扑 v2 重构计划

## 问题
当前 `centerColumn` 实现：
- 抽屉盒没按列分开（一个全宽抽屉盒跨越中柱）
- 中柱没有连接件（梁到中柱无接点）
- 中柱只能居中、只能前后方向

## Phase 0 方案

### 核心思路
中柱 = 在框架内部加的一根（或多根）前后方向立柱，将内腔分为左右两列。每列独立生成自己的结构（横梁/抽屉/搁板），互不干扰。

### 数据结构
```typescript
centerColumn?: {
  count: 1;            // Phase 0 单中柱（多中柱为后续）
  offsetRatio: number; // 中柱偏移比（0.5=居中，0.67=黄金锚点①的 425/630）
};
```

### 立柱布局（3 个 X 位置）
```
xLeft = -W/2 + s/2                    // 左角柱
xCenter = -W/2 + s + innerW * offsetRatio  // 中柱（innerW = W-2s）
xRight = W/2 - s/2                    // 右角柱
```

### 横梁（beam-x）分段
- 左梁：xLeft → xCenter，长度 = xCenter - xLeft
- 右梁：xCenter → xRight，长度 = xRight - xCenter

### 各列独立结构
- **左列**：深向梁（beam-z）在 xLeft 和 xCenter，承载左列的隔板/抽屉
- **右列**：深向梁（beam-z）在 xCenter 和 xRight，承载右列的隔板/抽屉
- 两列的层数/抽屉数可不同（由 shelfCount/drawerCount 控制，Phase 0 先同构）

### 中柱连接件
每层深向梁（beam-z）与中柱交汇处生成接点：
- 左梁右端（outward=+1）→ 接中柱
- 右梁左端（outward=-1）→ 接中柱
- 连接件使用 `corner-bracket-30`（通用角码）

### 抽屉盒
- 左列抽屉盒宽度 = 左列宽 − 间隙
- 右列抽屉盒宽度 = 右列宽 − 间隙
- 各自独立，不跨越中柱

### 跳过（Phase 0.5）
- 多中柱（count > 1）
- 左右列不同构（左抽屉右搁板）
- 中柱左右方向（Z 向分区）
- 变高立柱（内柱短于外柱）
