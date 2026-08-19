import type { Section } from '../knowledge/types';

/** T 型槽截面轮廓点列（纯数据，THREE 渲染与 STEP 导出共用）：顺时针闭合，不含重复首尾点 */
export function sectionOutlinePoints(sec: Section): [number, number][] {
  const hw = sec.size[0] / 2;                    // 半宽（x）
  const hh = (sec.size[1] ?? sec.size[0]) / 2;   // 半高（y）
  const sw = sec.slot.width / 2;
  const { lipDepth, cavityWidth, cavityDepth } = sec.geometry;
  const cw = cavityWidth / 2;

  // 单个 T 槽锯齿（边局部坐标：u 沿边递增，v=边面外法向坐标，槽向内凹）
  const slotPts = (u: number, edgeV: number): [number, number][] => {
    const lipV = edgeV - lipDepth;
    const cavV = edgeV - lipDepth - cavityDepth;
    return [
      [u - sw, edgeV], [u - sw, lipV], [u - cw, lipV], [u - cw, cavV],
      [u + cw, cavV], [u + cw, lipV], [u + sw, lipV], [u + sw, edgeV],
    ];
  };
  const edge = (halfLen: number, edgeV: number, offsets: number[]): [number, number][] => {
    const pts: [number, number][] = [[-halfLen, edgeV]];
    for (const off of [...offsets].sort((a, b) => a - b)) pts.push(...slotPts(off, edgeV));
    pts.push([halfLen, edgeV]);
    return pts;
  };
  const slotsFor = (nx: number, ny: number) =>
    sec.faces.find((f) => f.normal[0] === nx && f.normal[1] === ny)?.slots.map((sl) => sl.offset) ?? [];

  // 顺时针四边；faces 槽 offset 语义 = 截面全局坐标（x± 面为 y 坐标，y± 面为 x 坐标）
  const pts: [number, number][] = [];
  const push = (list: [number, number][], map: (u: number, v: number) => [number, number]) => {
    for (const [u, v] of list) pts.push(map(u, v));
  };
  push(edge(hw, hh, slotsFor(0, 1)), (u, v) => [u, v]);                              // 顶 y+：左→右
  push(edge(hh, hw, slotsFor(1, 0).map((o) => -o)), (u, v) => [v, -u]);              // 右 x+：上→下
  push(edge(hw, hh, slotsFor(0, -1).map((o) => -o)), (u, v) => [-u, -v]);            // 底 y−：右→左
  push(edge(hh, hw, slotsFor(-1, 0)), (u, v) => [-v, u]);                            // 左 x−：下→上

  // 去除相邻重复顶点（四角拼接处）
  const d2 = (a: [number, number], b: [number, number]) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;
  const clean = pts.filter((p, i) => i === 0 || d2(p, pts[i - 1]) > 1e-6);
  if (clean.length > 1 && d2(clean[0], clean[clean.length - 1]) < 1e-6) clean.pop();
  return clean;
}

/** 芯孔列表（截面局部坐标） */
export function sectionCoreHoles(sec: Section): { x: number; y: number; r: number }[] {
  return (sec.coreHolePositions ?? [[0, 0]]).map(([x, y]) => ({ x, y, r: sec.coreHole.diameter / 2 }));
}
