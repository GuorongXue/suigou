import type { KnowledgeBase } from '../knowledge/types';
import type { FrameSpec, FrameModel, Member, Joint, MachiningOp, PanelItem, PanelMaterial, MountItem, AccessoryItem, PanelListItem, PartOp } from './types';
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

  // 板材构件（9.2.3 修复：真实搭接几何 + Mount 固定关系，不再悬空）
  const panels: PanelItem[] = [];
  const mounts: MountItem[] = [];
  const PANEL_SPEC = kb.panels;   // knowledge/panels.yaml：厚度/面密度/单价/固定方式/孔径
  let pn = 0;
  let mtn = 0;
  const addPanel = (material: PanelMaterial, beamTopY: number, isTop: boolean) => {
    if (material === 'none') return;
    const ps = PANEL_SPEC[material];
    // 顶面板：覆盖整框（W×D 齐平）；隔板：四边各搭 15mm 在梁上表面（真实支撑接触）
    const overlap = 15;
    const pw = isTop ? W : W - 2 * s + 2 * overlap;
    const pd = isTop ? D : D - 2 * s + 2 * overlap;
    if (pw <= 0 || pd <= 0) return;
    const panelId = `pn-${++pn}`;
    // 固定孔（板局部坐标）：顶板孔心落梁中心线距边 s/2；隔板落搭接区中心距边 overlap/2
    const inset = isTop ? s / 2 : overlap / 2;
    const holes = ps.mount === 't-nut-screw'
      ? [[inset, inset], [pw - inset, inset], [inset, pd - inset], [pw - inset, pd - inset]]
        .map(([x, y]) => ({ x, y, diameter: ps.holeDiameter }))
      : [];
    panels.push({
      id: panelId, material,
      size: [pw, pd, ps.thickness],
      boxSize: [pw, ps.thickness, pd],
      position: [0, beamTopY + ps.thickness / 2, 0],   // 底面落在梁上表面
      mode: isTop ? 'top-overlay' : 'shelf-overlap',
      mountNote: (isTop ? '顶面板(覆盖式)：' : '隔板(搭梁式)：') + ps.mountNote,
      holes,
    });
    // 固定点：四角内缩，落在梁中心线上方
    const px = W / 2 - s / 2, pz = D / 2 - s / 2;
    const points: [number, number, number][] = [
      [-px, beamTopY, -pz], [px, beamTopY, -pz], [-px, beamTopY, pz], [px, beamTopY, pz],
    ];
    const soft = ps.mount === 'gasket-clamp';
    mounts.push({
      id: `mt-${++mtn}`, targetType: 'panel', targetId: panelId,
      method: soft ? 'gasket-clamp' : 't-nut-screw',
      note: ps.mountNote,
      fasteners: soft
        ? [{ sku: 'epdm-gasket-pad', qty: 4 }, { sku: 'clamp-strip-200', qty: 4 }]
        : [{ sku: 't-nut-m6', qty: 4 }, { sku: 'bolt-m6-l16', qty: 4 }],
      points,
    });
  };
  addPanel(spec.topPanel, H, true);   // 顶梁上表面 = H
  addPanel(spec.bottomPanel, s, false);   // 底框梁上表面 = s（搭梁式同隔板）
  for (let i = 1; i <= spec.shelfCount; i++) {
    addPanel(spec.shelfPanel, (H * i) / (spec.shelfCount + 1) + s / 2, false);
  }

  // 侧围板（背/左/右）：贴在框架外侧面，兼作抗侧向体系（val-lateral 解药）
  const addSidePanel = (material: PanelMaterial, side: 'back' | 'left' | 'right') => {
    if (material === 'none') return;
    const ps = PANEL_SPEC[material];
    const panelId = `pn-${++pn}`;
    const isBack = side === 'back';
    const pw = isBack ? W : D;   // 板面宽度（沿框架面）
    const ph = H;
    const boxSize: [number, number, number] = isBack
      ? [W, H, ps.thickness] : [ps.thickness, H, D];
    const position: [number, number, number] = isBack
      ? [0, H / 2, -D / 2 - ps.thickness / 2]
      : [side === 'left' ? -W / 2 - ps.thickness / 2 : W / 2 + ps.thickness / 2, H / 2, 0];
    // 固定孔（板局部坐标，沿板宽×板高）：孔心落柱中心线，横向距边 s/2，纵向距上下边 s
    const holes = ps.mount === 't-nut-screw'
      ? [[s / 2, s], [pw - s / 2, s], [s / 2, ph - s], [pw - s / 2, ph - s]]
        .map(([x, y]) => ({ x, y, diameter: ps.holeDiameter }))
      : [];
    panels.push({
      id: panelId, material,
      size: [pw, ph, ps.thickness], boxSize, position,
      mode: isBack ? 'back-overlay' : 'side-overlay',
      mountNote: `${isBack ? '背板' : side === 'left' ? '左侧板' : '右侧板'}(外贴式)：${ps.mountNote}；兼作抗剪体系`,
      holes,
    });
    // 固定点：四角柱上
    const points: [number, number, number][] = isBack
      ? [[-W / 2 + s / 2, s, -D / 2], [W / 2 - s / 2, s, -D / 2], [-W / 2 + s / 2, H - s, -D / 2], [W / 2 - s / 2, H - s, -D / 2]]
      : (() => {
        const x = side === 'left' ? -W / 2 : W / 2;
        return [[x, s, -D / 2 + s / 2], [x, s, D / 2 - s / 2], [x, H - s, -D / 2 + s / 2], [x, H - s, D / 2 - s / 2]] as [number, number, number][];
      })();
    const soft = ps.mount === 'gasket-clamp';
    mounts.push({
      id: `mt-${++mtn}`, targetType: 'panel', targetId: panelId,
      method: soft ? 'gasket-clamp' : 't-nut-screw',
      note: '侧围板四角固定于立柱外侧槽',
      fasteners: soft
        ? [{ sku: 'epdm-gasket-pad', qty: 4 }, { sku: 'clamp-strip-200', qty: 4 }]
        : [{ sku: 't-nut-m6', qty: 4 }, { sku: 'bolt-m6-l16', qty: 4 }],
      points,
    });
  };
  addSidePanel(spec.backPanel, 'back');
  addSidePanel(spec.leftPanel, 'left');
  addSidePanel(spec.rightPanel, 'right');

  // 背面对角斜撑（val-005 解药）：按层分段（之字形）避开隔板横梁，每段两端斜切+端孔压接
  const braceEndHoles: { memberId: string; position: [number, number, number] }[] = [];
  if (spec.brace) {
    const sorted = [...levels].sort((a, b) => a - b);
    const bx = W - 2 * s;
    const angles = new Set<string>();
    for (let i = 0; i < sorted.length - 1; i++) {
      const yLo = sorted[i] + s / 2;
      const yHi = sorted[i + 1] - s / 2;
      const by = yHi - yLo;
      if (by < 100) continue;   // 层间净空太矮不放撑
      const dir = i % 2 === 0 ? 1 : -1;   // 交替方向成之字形
      const segLen = Math.round(Math.hypot(bx, by));
      const tilt = Math.atan2(by, bx) * dir;
      add({
        role: 'brace', sectionId: sec.id, length: segLen,
        position: [0, (yLo + yHi) / 2, -D / 2 + s / 2], axis: 'x', tilt,
      });
      const braceId = `m-${n}`;
      // 端面斜切角 = 90° − 杆件倾角（嘉立创非标斜切范围 30~150°）
      angles.add((90 - Math.abs(tilt * 180 / Math.PI)).toFixed(1));
      // 两端固定：斜撑端孔 M6 螺栓 → 柱/梁槽内 T 型螺母压接
      const pLo: [number, number, number] = [-dir * bx / 2, yLo, -D / 2 + s / 2];
      const pHi: [number, number, number] = [dir * bx / 2, yHi, -D / 2 + s / 2];
      braceEndHoles.push({ memberId: braceId, position: pLo }, { memberId: braceId, position: pHi });
      mounts.push({
        id: `mt-${++mtn}`, targetType: 'member', targetId: braceId,
        method: 't-nut-screw',
        note: `斜撑段端部压接：M6螺栓穿端孔入柱/梁槽内T型螺母`,
        fasteners: [{ sku: 't-nut-m6', qty: 2 }, { sku: 'bolt-m6-l16', qty: 2 }],
        points: [pLo, pHi],
      });
    }
    if (angles.size) {
      warnings.push(`斜撑分 ${braceEndHoles.length / 2} 段（避开隔板横梁），两端斜切 ${[...angles].join('/')}°（嘉立创非标斜切 30~150° 可加工）`);
    }
  }

  // 脚轮附件（9.2.4 修复：进模型/BOM/重量；丝杆脚轮 → 柱底端面攻牙加工）
  const accessories: AccessoryItem[] = [];
  if (spec.mobility === 'caster') {
    let an = 0;
    for (const [key, postId] of postAt) {
      const [x, z] = key.split(',').map(Number);
      const accId = `ac-${++an}`;
      accessories.push({ id: accId, kind: 'caster', sku: 'caster-stem-m8-50', position: [x, -35, z], weightKg: 0.35 });
      mounts.push({
        id: `mt-${++mtn}`, targetType: 'accessory', targetId: accId,
        method: 'caster-stem', note: `丝杆脚轮拧入立柱(${postId})底端面 M8 攻牙`,
        fasteners: [{ sku: 'caster-stem-m8-50', qty: 1 }],
        points: [[x, 0, z]],
      });
    }
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
  // 脚轮丝杆 → 立柱底端面 M8 攻牙加工（装配关系派生加工特征）
  if (spec.mobility === 'caster') {
    for (const [key, postId] of postAt) {
      const [x, z] = key.split(',').map(Number);
      machining.push({
        id: `mc-${++mn}`, jointId: '-', memberId: postId, type: 'end-tap', spec: 'M8×20(脚轮)',
        position: [x, 10, z], axis: 'y', diameter: 8, length: 20, discs: [] });
    }
  }

  // 斜撑段端部固定孔（装配关系派生：每端 Φ7 通孔穿 M6 螺栓）
  for (const h of braceEndHoles) {
    machining.push({
      id: `mc-${++mn}`, jointId: '-', memberId: h.memberId, type: 'through-hole', spec: 'Φ7(斜撑端)',
      position: h.position, axis: 'z', diameter: 7, length: s, discs: [] });
  }

  const machBy = new Map<string, string[]>();
  const opsBy = new Map<string, PartOp[]>();
  const memberById = new Map(members.map((m) => [m.id, m]));
  for (const mc of machining) {
    const m = memberById.get(mc.memberId)!;
    // 构件局部坐标：沿构件轴距起端距离 + 加工方向轴相对构件的面
    const axisIdx = m.axis === 'x' ? 0 : m.axis === 'y' ? 1 : 2;
    const fromStart = Math.round(mc.position[axisIdx] - (m.position[axisIdx] - m.length / 2));
    const face = mc.axis === m.axis ? 'end' : `${mc.axis}${mc.discs[0]?.dir ?? ''}`;
    (machBy.get(mc.memberId) ?? machBy.set(mc.memberId, []).get(mc.memberId)!)
      .push(`${mc.type}:${mc.spec}@${fromStart}/${face}`);
    (opsBy.get(mc.memberId) ?? opsBy.set(mc.memberId, []).get(mc.memberId)!)
      .push({ type: mc.type, spec: mc.spec, fromStart, face, diameter: mc.diameter });
  }
  const partKey = (m: Member) => `${m.length}|${(machBy.get(m.id) ?? []).sort().join(',')}`;
  const partNoByKey = new Map<string, string>();
  const cutAgg = new Map<string, { length: number; qty: number; machiningNote: string; ops: PartOp[] }>();
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
      cutAgg.set(key, { length: m.length, qty: 1, machiningNote, ops: (opsBy.get(m.id) ?? []).sort((a, b) => a.fromStart - b.fromStart) });
    }
  }
  const cutList = [...cutAgg.entries()]
    .map(([key, v]) => ({ partNo: partNoByKey.get(key)!, sectionId: sec.id, ...v }))
    .sort((a, b) => b.length - a.length);

  // 板材下料清单（件号 B1..）：同材质+尺寸+孔位合并；单件估价 = 面积×单价 + 钻孔费
  const mprice = (((kb.rules.pricing as Record<string, unknown>)?.machiningPrice ?? {}) as Record<string, number>);
  const panelAgg = new Map<string, PanelListItem>();
  for (const p of panels) {
    const key = `${p.material}|${p.size.join('x')}|${p.holes.map((h) => `${h.x},${h.y}`).join(';')}`;
    const hit = panelAgg.get(key);
    if (hit) { hit.qty++; p.partNo = hit.partNo; continue; }
    const ps = PANEL_SPEC[p.material as Exclude<PanelMaterial, 'none'>];
    const partNo = `B${panelAgg.size + 1}`;
    p.partNo = partNo;
    const area = (p.size[0] / 1000) * (p.size[1] / 1000);
    panelAgg.set(key, {
      partNo, material: p.material, materialName: ps?.name ?? p.material, size: p.size, qty: 1,
      holeNote: p.holes.length ? `Φ${p.holes[0].diameter}×${p.holes.length}孔@四角` : '免钻孔(胶垫压条)',
      priceCny: +(area * (ps?.pricePerM2 ?? 0) + p.holes.length * (mprice['panel-hole'] ?? 0)).toFixed(2),
    });
  }
  const panelList = [...panelAgg.values()];

  const totalLengthMm = members.reduce((sum, m) => sum + m.length, 0);
  // 重量 = 型材 + 板材（面密度）+ 脚轮（9.2.4：可见零件必须计重）
  const panelKg = panels.reduce((sum, p) => {
    const kgPerM2 = PANEL_SPEC[p.material as Exclude<PanelMaterial, 'none'>]?.kgPerM2 ?? 10;
    return sum + (p.size[0] / 1000) * (p.size[1] / 1000) * kgPerM2;
  }, 0);
  const accKg = accessories.reduce((sum, a) => sum + a.weightKg, 0);
  const weightKg = sec.weightPerMeter != null
    ? (totalLengthMm / 1000) * sec.weightPerMeter + panelKg + accKg : null;

  // 全 BOM 价格明细（未税估价）：型材/板材/连接件/紧固件/加工费/附件
  const fprice = (sku: string) => kb.fasteners[sku]?.price ?? 0;
  const r2 = (v: number) => Math.round(v * 100) / 100;
  const profile = r2(sec.price.perMeter != null ? (totalLengthMm / 1000) * sec.price.perMeter : 0);
  const panelsCost = r2(panelList.reduce((sum, p) => sum + p.priceCny * p.qty, 0));
  const connectorsCost = r2(joints.length * conn.bom.reduce((sum, b) => sum + (b.priceUntaxed ?? fprice(b.sku)) * b.qty, 0));
  // 脚轮的 mount 紧固件即脚轮本体，归入附件项避免重计
  const fastenersCost = r2(mounts.filter((mt) => mt.method !== 'caster-stem')
    .reduce((sum, mt) => sum + mt.fasteners.reduce((a, f) => a + fprice(f.sku) * f.qty, 0), 0));
  const machiningCost = r2(machining.reduce((sum, mc) => sum + (mprice[mc.type] ?? 0), 0)
    + members.filter((m) => m.role === 'brace').length * 2 * (mprice['miter-cut'] ?? 0));
  const accessoriesCost = r2(accessories.reduce((sum, a) => sum + fprice(a.sku), 0));
  const cost = {
    profile, panels: panelsCost, connectors: connectorsCost,
    fasteners: fastenersCost, machining: machiningCost, accessories: accessoriesCost,
    total: r2(profile + panelsCost + connectorsCost + fastenersCost + machiningCost + accessoriesCost),
  };
  const priceCny = cost.total > 0 ? cost.total : null;

  const model: FrameModel = {
    spec,
    members,
    joints,
    machining,
    panels,
    mounts,
    accessories,
    cutList,
    panelList,
    checks: [],
    status: 'valid',
    totals: { memberCount: members.length, totalLengthMm, weightKg, priceCny, cost },
    warnings,
  };
  model.checks = validateFrame(model, kb);
  if (incompatible) {
    model.checks.unshift({
      level: 'error', ruleId: 'compat-001',
      message: `不兼容组合：${conn.name}（适配系列${conn.compatible.series.join('/')}，槽宽${conn.compatible.slotWidths.join('/')}）不适用于 ${sec.name}，无法装配。请更换连接件或截面`,
    });
  }
  // 导出闸门状态派生：error→invalid（禁导出），warn→needs-confirmation
  model.status = model.checks.some((c) => c.level === 'error') ? 'invalid'
    : model.checks.some((c) => c.level === 'warn') ? 'needs-confirmation'
    : 'valid';
  return model;
}
