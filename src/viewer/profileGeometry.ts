import * as THREE from 'three';
import type { Section } from '../knowledge/types';

/** 截面即数据：由知识库 Section 记录参数化生成 T 型槽截面轮廓 */
export function buildSectionShape(sec: Section): THREE.Shape {
  const h = sec.size[0] / 2;
  const sw = sec.slot.width / 2;
  const { lipDepth, cavityWidth, cavityDepth } = sec.geometry;
  const cw = cavityWidth / 2;
  const lipY = h - lipDepth;
  const cavY = h - lipDepth - cavityDepth;
  // 顶边(含槽口)的点序列，旋转4次拼出四边
  const side: [number, number][] = [
    [-h, h], [-sw, h], [-sw, lipY], [-cw, lipY], [-cw, cavY],
    [cw, cavY], [cw, lipY], [sw, lipY], [sw, h], [h, h],
  ];
  const pts: THREE.Vector2[] = [];
  for (let i = 0; i < 4; i++) {
    const a = -i * Math.PI / 2;
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    for (const [x, y] of side) pts.push(new THREE.Vector2(x * cos - y * sin, x * sin + y * cos));
  }
  // 去除相邻重复顶点（四角拼接处），避免三角化退化面片造成端面伪影
  const clean = pts.filter((p, i) => i === 0 || p.distanceToSquared(pts[i - 1]) > 1e-6);
  if (clean.length > 1 && clean[0].distanceToSquared(clean[clean.length - 1]) < 1e-6) clean.pop();
  const shape = new THREE.Shape(clean);
  const hole = new THREE.Path();
  hole.absarc(0, 0, sec.coreHole.diameter / 2, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  return shape;
}

/** 一根型材 = 截面 + 长度（挤出几何，居中于原点） */
export function profileGeometry(shape: THREE.Shape, length: number): THREE.ExtrudeGeometry {
  const g = new THREE.ExtrudeGeometry(shape, { depth: length, bevelEnabled: false, curveSegments: 12 });
  g.translate(0, 0, -length / 2);
  return g;
}
