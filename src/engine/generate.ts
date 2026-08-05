import type { KnowledgeBase } from '../knowledge/types';
import type { FrameSpec, FrameModel, Member, Joint } from './types';

/**
 * 确定性生成器（M2）：参数 → 正交工作台框架构件图。
 * 下料长度推导与 Golden 用例 t-cut-001 同源：梁长 = 总尺寸 − 2×立柱截面 + 2×连接件修正。
 */
export function generateFrame(spec: FrameSpec, kb: KnowledgeBase): FrameModel {
  const warnings: string[] = [];

  const sectionRecord = kb.sections.find((s) => s.section.id === spec.sectionId);
  if (!sectionRecord) throw new Error(`知识库中不存在截面 ${spec.sectionId}`);
  const sec = sectionRecord.section;
  const s = sec.size[0];

  const connectorRecord = kb.connectors.find((c) => c.connector.id === spec.connectorId);
  if (!connectorRecord) throw new Error(`知识库中不存在连接件 ${spec.connectorId}`);
  const conn = connectorRecord.connector;

  if (!conn.compatible.series.includes(sec.id)) {
    warnings.push(`连接件 ${conn.name} 的兼容清单不含 ${sec.name}（compatible.series），请核实`);
  }
  if (conn.loadRole === 'positioning-aesthetic') {
    warnings.push(`${conn.name} 仅限定位/外观用途，禁止单独主承重（行家规则 val-006）`);
  }

  const { width: W, depth: D, height: H } = spec;
  const beamX = W - 2 * s + 2 * conn.lengthOffset;
  const beamZ = D - 2 * s + 2 * conn.lengthOffset;
  if (beamX <= 0 || beamZ <= 0) throw new Error('总尺寸过小，扣除立柱截面后梁长为负');

  const members: Member[] = [];
  const joints: Joint[] = [];
  let n = 0;
  let jn = 0;
  const add = (m: Omit<Member, 'id'>) => members.push({ id: `m-${++n}`, ...m });
  const addJoint = (j: Omit<Joint, 'id' | 'connectorId'>) =>
    joints.push({ id: `j-${++jn}`, connectorId: conn.id, ...j });

  // 4 立柱（全高）
  for (const [x, z] of [
    [-W / 2 + s / 2, -D / 2 + s / 2],
    [W / 2 - s / 2, -D / 2 + s / 2],
    [-W / 2 + s / 2, D / 2 - s / 2],
    [W / 2 - s / 2, D / 2 - s / 2],
  ]) {
    add({ role: 'post', sectionId: sec.id, length: H, position: [x, H / 2, z], axis: 'y' });
  }

  // 梁层：底框 + 顶框 + 均匀分布的隔板层
  const levels: number[] = [s / 2, H - s / 2];
  for (let i = 1; i <= spec.shelfCount; i++) {
    levels.push((H * i) / (spec.shelfCount + 1));
  }

  for (const y of levels) {
    const ySide: 1 | -1 = y <= s ? 1 : -1;   // 底框角码朝上，其余朝下
    for (const z of [-D / 2 + s / 2, D / 2 - s / 2]) {
      add({ role: 'beam-x', sectionId: sec.id, length: beamX, position: [0, y, z], axis: 'x' });
      for (const outward of [1, -1] as const) {
        addJoint({ position: [outward * (W / 2 - s), y, z], beamAxis: 'x', outward, ySide });
      }
    }
    for (const x of [-W / 2 + s / 2, W / 2 - s / 2]) {
      add({ role: 'beam-z', sectionId: sec.id, length: beamZ, position: [x, y, 0], axis: 'z' });
      for (const outward of [1, -1] as const) {
        addJoint({ position: [x, y, outward * (D / 2 - s)], beamAxis: 'z', outward, ySide });
      }
    }
  }

  // 切割清单：按长度聚合
  const byLength = new Map<number, number>();
  for (const m of members) byLength.set(m.length, (byLength.get(m.length) ?? 0) + 1);
  const cutList = [...byLength.entries()]
    .map(([length, qty]) => ({ sectionId: sec.id, length, qty }))
    .sort((a, b) => b.length - a.length);

  const totalLengthMm = members.reduce((sum, m) => sum + m.length, 0);
  const weightKg = sec.weightPerMeter != null ? (totalLengthMm / 1000) * sec.weightPerMeter : null;
  const priceCny = sec.price.perMeter != null ? (totalLengthMm / 1000) * sec.price.perMeter : null;

  return {
    spec,
    members,
    joints,
    cutList,
    totals: { memberCount: members.length, totalLengthMm, weightKg, priceCny },
    warnings,
  };
}
