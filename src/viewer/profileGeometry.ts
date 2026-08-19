import * as THREE from 'three';
import type { Section } from '../knowledge/types';
import { sectionOutlinePoints, sectionCoreHoles } from '../engine/sectionOutline';

/** 截面即数据：由知识库 Section 记录参数化生成 T 型槽截面轮廓（轮廓点列与 STEP 导出共用） */
export function buildSectionShape(sec: Section): THREE.Shape {
  const shape = new THREE.Shape(sectionOutlinePoints(sec).map(([x, y]) => new THREE.Vector2(x, y)));
  for (const { x, y, r } of sectionCoreHoles(sec)) {
    const hole = new THREE.Path();
    hole.absarc(x, y, r, 0, Math.PI * 2, true);
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
