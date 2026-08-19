import * as THREE from 'three';
import type { Section } from '../knowledge/types';

/** 截面即数据：由知识库 Section 记录参数化生成 T 型槽截面轮廓（支持矩形如 2040，槽位取自 faces） */
export function buildSectionShape(sec: Section): THREE.Shape {
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
  // 一条边：u 从 −halfLen 到 +halfLen，途经各槽（offsets 为边局部 u 坐标）
  const edge = (halfLen: number, edgeV: number, offsets: number[]): [number, number][] => {
    const pts: [number, number][] = [[-halfLen, edgeV]];
    for (const off of [...offsets].sort((a, b) => a - b)) pts.push(...slotPts(off, edgeV));
    pts.push([halfLen, edgeV]);
    return pts;
  };
  const slotsFor = (nx: number, ny: number) =>
    sec.faces.find((f) => f.normal[0] === nx && f.normal[1] === ny)?.slots.map((sl) => sl.offset) ?? [];

  // 顺时针四边；faces 槽 offset 语义 = 截面全局坐标（x± 面为 y 坐标，y± 面为 x 坐标）
  const pts: THREE.Vector2[] = [];
  const push = (list: [number, number][], map: (u: number, v: number) => [number, number]) => {
    for (const [u, v] of list) { const [x, y] = map(u, v); pts.push(new THREE.Vector2(x, y)); }
  };
  push(edge(hw, hh, slotsFor(0, 1)), (u, v) => [u, v]);                              // 顶 y+：左→右
  push(edge(hh, hw, slotsFor(1, 0).map((o) => -o)), (u, v) => [v, -u]);              // 右 x+：上→下
  push(edge(hw, hh, slotsFor(0, -1).map((o) => -o)), (u, v) => [-u, -v]);            // 底 y−：右→左
  push(edge(hh, hw, slotsFor(-1, 0)), (u, v) => [-v, u]);                            // 左 x−：下→上

  // 去除相邻重复顶点（四角拼接处），避免三角化退化面片造成端面伪影
  const clean = pts.filter((p, i) => i === 0 || p.distanceToSquared(pts[i - 1]) > 1e-6);
  if (clean.length > 1 && clean[0].distanceToSquared(clean[clean.length - 1]) < 1e-6) clean.pop();
  const shape = new THREE.Shape(clean);
  for (const [cx, cy] of sec.coreHolePositions ?? [[0, 0]]) {
    const hole = new THREE.Path();
    hole.absarc(cx, cy, sec.coreHole.diameter / 2, 0, Math.PI * 2, true);
    shape.holes.push(hole);
  }
  return shape;
}

/** 一根型材 = 截面 + 长度（挤出几何，居中于原点） */
export function profileGeometry(shape: THREE.Shape, length: number): THREE.ExtrudeGeometry {
  const g = new THREE.ExtrudeGeometry(shape, { depth: length, bevelEnabled: false, curveSegments: 12 });
  g.translate(0, 0, -length / 2);
  return g;
}
