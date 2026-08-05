import type { KnowledgeBase } from '../knowledge/types';
import type { FrameSpec, FrameModel, Member, Joint, MachiningOp, PanelItem, PanelMaterial } from './types';
import { validateFrame } from './validate';

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

  // 兼容性是原子约束：不兼容组合 = 不可装配方案，error 级阻断导出（9.2.1）
  const incompatible = !conn.compatible.series.includes(sec.id)
    || !conn.compatible.slotWidths.includes(sec.slot.width);
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

  // 4 立柱（全高），记录位置供接点归属匹配
  const postAt = new Map<string, string>();   // "x,z" -> memberId
  for (const [x, z] of [
    [-W / 2 + s / 2, -D / 2 + s / 2],
    [W / 2 - s / 2, -D / 2 + s / 2],
    [-W / 2 + s / 2, D / 2 - s / 2],
    [W / 2 - s / 2, D / 2 - s / 2],
  ]) {
    add({ role: 'post', sectionId: sec.id, length: H, position: [x, H / 2, z], axis: 'y' });
    postAt.set(`${x},${z}`, `m-${n}`);
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
      const beamId = `m-${n}`;
      for (const outward of [1, -1] as const) {
        const postId = postAt.get(`${outward * (W / 2 - s / 2)},${z}`)!;
        addJoint({ position: [outward * (W / 2 - s), y, z], beamAxis: 'x', outward, ySide,
          beamMemberId: beamId, postMemberId: postId });
      }
    }
    for (const x of [-W / 2 + s / 2, W / 2 - s / 2]) {
      add({ role: 'beam-z', sectionId: sec.id, length: beamZ, position: [x, y, 0], axis: 'z' });
      const beamId = `m-${n}`;
      for (const outward of [1, -1] as const) {
        const postId = postAt.get(`${x},${outward * (D / 2 - s / 2)}`)!;
        addJoint({ position: [x, y, outward * (D / 2 - s)], beamAxis: 'z', outward, ySide,
          beamMemberId: beamId, postMemberId: postId });
      }
    }
  }

  // 板材构件：顶面 + 隔板层（材料接口规则 mat-* 的安装方式/间隙）
  const panels: PanelItem[] = [];
  const PANEL_SPEC: Record<Exclude<PanelMaterial, 'none'>, { thickness: number; clearance: number; mountNote: string }> = {
    wood:     { thickness: 18, clearance: 2,   mountNote: 'T型螺母直固+长孔浮动安装，留胀缩间隙(mat-wood)' },
    glass:    { thickness: 8,  clearance: 2,   mountNote: '必须钢化玻璃+EPDM胶条嵌槽，禁直压铝槽(mat-glass)' },
    acrylic:  { thickness: 5,  clearance: 1.5, mountNote: '嵌槽+热胀间隙，>500mm必须留隙(mat-acrylic)' },
    pegboard: { thickness: 5,  clearance: 2,   mountNote: '洞洞板螺栓固定四角(mat-wood同源)' },
  };
  let pn = 0;
  const addPanel = (material: PanelMaterial, y: number, isTop: boolean) => {
    if (material === 'none') return;
    const ps = PANEL_SPEC[material];
    const pw = W - 2 * s - 2 * ps.clearance;
    const pd = D - 2 * s - 2 * ps.clearance;
    if (pw <= 0 || pd <= 0) return;
    panels.push({
      id: `pn-${++pn}`, material,
      size: [pw, pd, ps.thickness],
      position: [0, y + s / 2 + ps.thickness / 2, 0],   // 搭在梁上表面
      mountNote: (isTop ? '顶面板：' : '隔板：') + ps.mountNote,
    });
  };
  addPanel(spec.topPanel, H - s / 2, true);
  for (let i = 1; i <= spec.shelfCount; i++) {
    addPanel(spec.shelfPanel, (H * i) / (spec.shelfCount + 1), false);
  }

  // 加工特征派生：连接件 machining 声明 → 每个接点的孔位（位置/方向/规格）
  const machining: MachiningOp[] = [];
  let mn = 0;
  const T = sec.wallThickness ?? 2;
  for (const j of joints) {
    const [jx, jy, jz] = j.position;
    const inward = -j.outward;   // 从梁端指向梁内部
    const at = (d: number): [number, number, number] =>
      j.beamAxis === 'x' ? [jx + inward * d, jy, jz] : [jx, jy, jz + inward * d];
    for (const op of conn.machining as Record<string, number | string>[]) {
      const id = `mc-${++mn}`;
      switch (op.type) {
        case 'through-hole': {   // 锚式：梁上距端 G=19-T+2 处打通孔（源:工艺页公式）
          const G = 19 - T + 2;
          const c = at(G);
          const d = Number(op.diameter);
          machining.push({ id, jointId: j.id, memberId: j.beamMemberId, type: 'through-hole', spec: `Φ${d}`,
            position: c, axis: 'y', diameter: d, length: s,
            discs: [
              { position: [c[0], jy + s / 2 + 0.15, c[2]], axis: 'y', dir: 1, d },
              { position: [c[0], jy - s / 2 - 0.15, c[2]], axis: 'y', dir: -1, d },
            ] });
          break;
        }
        case 'end-tap':          // 端面攻丝：梁端中心孔攻牙（贴柱面被遮挡，不出孔口片）
          machining.push({ id, jointId: j.id, memberId: j.beamMemberId, type: 'end-tap', spec: `${op.thread}×${op.depth}`,
            position: at(Number(op.depth) / 2), axis: j.beamAxis, diameter: 8, length: Number(op.depth),
            discs: [] });
          break;
        case 'counterbore': {    // 沉头孔：穿过立柱，沿梁轴，孔口在立柱外侧面
          const pos: [number, number, number] = j.beamAxis === 'x'
            ? [jx + j.outward * (s / 2), jy, jz] : [jx, jy, jz + j.outward * (s / 2)];
          const outer: [number, number, number] = j.beamAxis === 'x'
            ? [jx + j.outward * (s + 0.15), jy, jz] : [jx, jy, jz + j.outward * (s + 0.15)];
          machining.push({ id, jointId: j.id, memberId: j.postMemberId, type: 'counterbore', spec: `Φ${op.d}沉Φ${op.D}×${op.depth}`,
            position: pos, axis: j.beamAxis, diameter: Number(op.d), length: s,
            discs: [{ position: outer, axis: j.beamAxis, dir: j.outward, d: Number(op.d), D: Number(op.D) }] });
          break;
        }
        case 'wrench-hole': {    // 内置：梁上扳手操作孔（可见面单侧开口）
          const c = at(s * 0.75);
          const dir = (-j.ySide) as 1 | -1;
          const d = Number(op.diameter);
          machining.push({ id, jointId: j.id, memberId: j.beamMemberId, type: 'wrench-hole', spec: `Φ${d}`,
            position: c, axis: 'y', diameter: d, length: s,
            discs: [{ position: [c[0], jy + dir * (s / 2 + 0.15), c[2]], axis: 'y', dir, d }] });
          break;
        }
      }
    }
  }

  // 件号系统：长度+完整加工特征签名（含局部位置/加工面/方向，防镜像件误合并，9.2.5）
  const machBy = new Map<string, string[]>();
  const memberById = new Map(members.map((m) => [m.id, m]));
  for (const mc of machining) {
    const m = memberById.get(mc.memberId)!;
    // 构件局部坐标：沿构件轴距起端距离 + 加工方向轴相对构件的面
    const axisIdx = m.axis === 'x' ? 0 : m.axis === 'y' ? 1 : 2;
    const fromStart = Math.round(mc.position[axisIdx] - (m.position[axisIdx] - m.length / 2));
    const face = mc.axis === m.axis ? 'end' : `${mc.axis}${mc.discs[0]?.dir ?? ''}`;
    (machBy.get(mc.memberId) ?? machBy.set(mc.memberId, []).get(mc.memberId)!)
      .push(`${mc.type}:${mc.spec}@${fromStart}/${face}`);
  }
  const partKey = (m: Member) => `${m.length}|${(machBy.get(m.id) ?? []).sort().join(',')}`;
  const partNoByKey = new Map<string, string>();
  const cutAgg = new Map<string, { length: number; qty: number; machiningNote: string }>();
  for (const m of members) {
    const key = partKey(m);
    if (!partNoByKey.has(key)) partNoByKey.set(key, `P${partNoByKey.size + 1}`);
    m.partNo = partNoByKey.get(key)!;
    const agg = cutAgg.get(key);
    if (agg) agg.qty++;
    else {
      const ops = machBy.get(m.id) ?? [];
      const noteMap = new Map<string, number>();
      for (const o of ops) noteMap.set(o.split('@')[0], (noteMap.get(o.split('@')[0]) ?? 0) + 1);
      const machiningNote = [...noteMap.entries()]
        .map(([o, c]) => `${o.split(':')[1]}×${c}`).join(' ');
      cutAgg.set(key, { length: m.length, qty: 1, machiningNote });
    }
  }
  const cutList = [...cutAgg.entries()]
    .map(([key, v]) => ({ partNo: partNoByKey.get(key)!, sectionId: sec.id, ...v }))
    .sort((a, b) => b.length - a.length);

  const totalLengthMm = members.reduce((sum, m) => sum + m.length, 0);
  const weightKg = sec.weightPerMeter != null ? (totalLengthMm / 1000) * sec.weightPerMeter : null;
  const priceCny = sec.price.perMeter != null ? (totalLengthMm / 1000) * sec.price.perMeter : null;

  const model: FrameModel = {
    spec,
    members,
    joints,
    machining,
    panels,
    cutList,
    checks: [],
    status: 'valid',
    totals: { memberCount: members.length, totalLengthMm, weightKg, priceCny },
    warnings,
  };
  model.checks = validateFrame(model, kb);
  if (incompatible) {
    model.checks.unshift({
      level: 'error', ruleId: 'compat-001',
      message: `不兼容组合：${conn.name}（适配槽宽${conn.compatible.slotWidths.join('/')}）不适用于 ${sec.name}（槽宽${sec.slot.width}），无法装配。请更换连接件或截面`,
    });
  }
  // 导出闸门状态派生：error→invalid（禁导出），warn→needs-confirmation
  model.status = model.checks.some((c) => c.level === 'error') ? 'invalid'
    : model.checks.some((c) => c.level === 'warn') ? 'needs-confirmation'
    : 'valid';
  return model;
}
