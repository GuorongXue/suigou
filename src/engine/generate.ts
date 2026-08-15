import type { KnowledgeBase } from '../knowledge/types';
import type { FrameSpec, FrameModel, Member, Joint, MachiningOp, PanelItem, PanelMaterial, MountItem, AccessoryItem, PanelListItem, PartOp, CenterColumnType } from './types';
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
  if (![W, D, H, spec.loadKg].every(Number.isFinite)) {
    throw new Error('尺寸与载荷必须是有限数值');
  }
  if (!Number.isFinite(spec.shelfCount)
    || (spec.workbenchDeskTopHeightMm != null && !Number.isFinite(spec.workbenchDeskTopHeightMm))
    || (spec.workbenchUpperShelfDepthRatio != null && !Number.isFinite(spec.workbenchUpperShelfDepthRatio))) {
    throw new Error('层数与工作台人体工学参数必须是有限数值');
  }
  if (W <= 0 || D <= 0 || H <= 0) {
    throw new Error('宽、深、高必须大于 0');
  }
  if (spec.scene === 'workbench' && D < 500) {
    throw new Error('电脑桌/工作桌深度至少需要 500mm（显示器桌推荐 600~700）');
  }
  const isPureDesk = spec.scene === 'workbench' && H <= 800;
  if (spec.scene === 'workbench' && !isPureDesk && H < 1100) {
    throw new Error('电脑桌总高 801~1099mm 既不符合纯桌面，也不足以容纳上架');
  }
  const beamX = W - 2 * s + 2 * conn.lengthOffset;
  const beamZ = D - 2 * s + 2 * conn.lengthOffset;
  if (beamX <= 0 || beamZ <= 0) throw new Error('总尺寸过小，扣除立柱截面后梁长为负');

  const members: Member[] = [];
  const joints: Joint[] = [];
  const panels: PanelItem[] = [];
  const mounts: MountItem[] = [];
  const PANEL_SPEC = kb.panels;   // knowledge/panels.yaml：厚度/面密度/单价/固定方式/孔径
  let n = 0;
  let jn = 0;
  let pn = 0;
  let mtn = 0;
  const add = (m: Omit<Member, 'id'>) => members.push({ id: `m-${++n}`, ...m });
  const addJoint = (j: Omit<Joint, 'id' | 'connectorId'>) =>
    joints.push({ id: `j-${++jn}`, connectorId: conn.id, ...j });

  // 梁层：底框 + 顶框 + 隔板层（工作台场景优先保证主桌面绝对高度）
  const clampRatio = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
  const shelfLevels: number[] = (() => {
    const count = Math.floor(spec.scene === 'workbench' ? Math.max(1, spec.shelfCount) : Math.max(0, spec.shelfCount));
    if (count <= 0) return [];
    if (spec.scene !== 'workbench') {
      return Array.from({ length: count }, (_, i) => (H * (i + 1)) / (count + 1));
    }
    const panelKey = isPureDesk && spec.topPanel !== 'none'
      ? spec.topPanel
      : (spec.shelfPanel !== 'none' ? spec.shelfPanel : 'wood');
    const panelT = PANEL_SPEC[panelKey].thickness;
    const deskTop = isPureDesk ? H : Math.min(800, Math.max(680, spec.workbenchDeskTopHeightMm ?? 740));
    const deskLevel = Math.min(
      isPureDesk ? H - s / 2 : H - s - 90,
      Math.max(s + 60, isPureDesk ? H - s / 2 : deskTop - (s / 2 + panelT)),
    );
    if (isPureDesk) return [deskLevel];
    if (count === 1) return [deskLevel];
    const upperCount = count - 1;
    const upperStart = deskLevel + 240;
    const upperEnd = H - s - 90;
    if (upperCount > 0 && upperEnd - deskLevel < upperCount * 170) {
      throw new Error(`总高 ${H}mm 无法容纳 ${count} 层桌面/搁板（层间净距至少 170mm）`);
    }
    const uppers = Array.from({ length: upperCount }, (_, i) => {
      const t = (i + 1) / (upperCount + 1);
      return upperStart + (upperEnd - upperStart) * t;
    }).map((y) => Math.min(H - s - 70, Math.max(deskLevel + 170, y)));
    return [deskLevel, ...uppers];
  })();
  const levels: number[] = [s / 2, H - s / 2, ...shelfLevels];

  const postAt = new Map<string, string>();   // "x,z" -> memberId
  const groundPostIds = new Set<string>();
  const addPost = (x: number, z: number, yStart: number, yEnd: number) => {
    if (!Number.isFinite(yStart) || !Number.isFinite(yEnd) || yEnd <= yStart) {
      throw new Error(`立柱高度无效：${yStart}~${yEnd}mm`);
    }
    add({ role: 'post', sectionId: sec.id, length: yEnd - yStart, position: [x, (yStart + yEnd) / 2, z], axis: 'y' });
    const postId = `m-${n}`;
    postAt.set(`${x},${z}`, postId);
    if (yStart === 0) groundPostIds.add(postId);
  };
  const xLeft = -W / 2 + s / 2;
  const xRight = W / 2 - s / 2;
  const zBack = -D / 2 + s / 2;
  const zFront = D / 2 - s / 2;
  const upperDepthRatio = clampRatio(spec.workbenchUpperShelfDepthRatio ?? 0.55, 0.35, 0.95);
  const upperOuterDepth = Math.min(D, Math.max(180, Math.round(D * upperDepthRatio)));
  const zUpperFront = -D / 2 + upperOuterDepth - s / 2;

  if (spec.scene === 'workbench' && isPureDesk) {
    // 案例实证拓扑（随构/21 极简桌）：腿全高=桌面顶，板凹嵌顶框内
    addPost(xLeft, zBack, 0, H);
    addPost(xRight, zBack, 0, H);
    addPost(xLeft, zFront, 0, H);
    addPost(xRight, zFront, 0, H);
  } else if (spec.scene === 'workbench') {
    const deskY = shelfLevels[0];
    addPost(xLeft, zBack, 0, H);
    addPost(xRight, zBack, 0, H);
    addPost(xLeft, zFront, 0, deskY + s / 2);
    addPost(xRight, zFront, 0, deskY + s / 2);
    addPost(xLeft, zUpperFront, deskY + s / 2, H);
    addPost(xRight, zUpperFront, deskY + s / 2, H);
  } else {
    for (const [x, z] of [[xLeft, zBack], [xRight, zBack], [xLeft, zFront], [xRight, zFront]]) {
      addPost(x, z, 0, H);
    }
  }

  const drawerBoxes: { y: number; pitch: number; colWidth?: number; xCenter?: number }[] = [];  // 抽屉盒位置（分区塔/普通抽屉塔共用）

  // 中柱分区（工具柜/异构柜）：在框架内部加立柱，将内腔分为左右双列
  let xCenter: number | null = null;
  if (spec.centerColumn) {
    const innerW = W - 2 * s;
    xCenter = -W / 2 + s + innerW * spec.centerColumn.offsetRatio;
    addPost(xCenter, zBack, 0, H);
    addPost(xCenter, zFront, 0, H);
  }

  const addRectLayer = (y: number, outerDepth: number, centerZ = 0) => {
    const ySide: 1 | -1 = y <= s ? 1 : -1;   // 底框角码朝上，其余朝下
    const layerBeamZ = outerDepth - 2 * s + 2 * conn.lengthOffset;
    const layerBack = centerZ - outerDepth / 2 + s / 2;
    const layerFront = centerZ + outerDepth / 2 - s / 2;
    for (const z of [layerBack, layerFront]) {
      if (spec.centerColumn && xCenter != null) {
        // 中柱：横梁在中心处断开为左右两段，各连接角柱与中柱
        // 左半段：左角柱 → 中柱
        const leftLen = xCenter - xLeft - s + 2 * conn.lengthOffset;
        const leftCenter = (xLeft + xCenter) / 2;
        add({ role: 'beam-x', sectionId: sec.id, length: leftLen, position: [leftCenter, y, z], axis: 'x' });
        const leftBeamId = `m-${n}`;
        for (const outward of [1, -1] as const) {
          const px = outward === -1 ? xLeft : xCenter;
          const postId = postAt.get(`${px},${z}`)!;
          const jointX = outward === -1 ? -(W / 2 - s) : (xCenter - s);
          addJoint({ position: [jointX, y, z], beamAxis: 'x', outward, ySide,
            beamMemberId: leftBeamId, postMemberId: postId });
        }
        // 右半段：中柱 → 右角柱
        const rightLen = xRight - xCenter - s + 2 * conn.lengthOffset;
        const rightCenter = (xCenter + xRight) / 2;
        add({ role: 'beam-x', sectionId: sec.id, length: rightLen, position: [rightCenter, y, z], axis: 'x' });
        const rightBeamId = `m-${n}`;
        for (const outward of [1, -1] as const) {
          const px = outward === 1 ? xRight : xCenter;
          const postId = postAt.get(`${px},${z}`)!;
          const jointX = outward === 1 ? (W / 2 - s) : (xCenter + s);
          addJoint({ position: [jointX, y, z], beamAxis: 'x', outward, ySide,
            beamMemberId: rightBeamId, postMemberId: postId });
        }
      } else {
        add({ role: 'beam-x', sectionId: sec.id, length: beamX, position: [0, y, z], axis: 'x' });
        const beamId = `m-${n}`;
        for (const outward of [1, -1] as const) {
          const postId = postAt.get(`${outward * (W / 2 - s / 2)},${z}`)!;
          addJoint({ position: [outward * (W / 2 - s), y, z], beamAxis: 'x', outward, ySide,
            beamMemberId: beamId, postMemberId: postId });
        }
      }
    }
    for (const x of [xLeft, xRight]) {
      add({ role: 'beam-z', sectionId: sec.id, length: layerBeamZ, position: [x, y, centerZ], axis: 'z' });
      const beamId = `m-${n}`;
      for (const outward of [1, -1] as const) {
        const z = outward === -1 ? layerBack : layerFront;
        const postId = postAt.get(`${x},${z}`)!;
        addJoint({ position: [x, y, centerZ + outward * (outerDepth / 2 - s)], beamAxis: 'z', outward, ySide,
          beamMemberId: beamId, postMemberId: postId });
      }
    }
  };

  if (spec.scene === 'workbench' && isPureDesk) {
    addRectLayer(H - s / 2, D);
    // 底部长边双横撑（案例：离地约120，短边方向开放保腿部进出）
    const footY = Math.min(120, H / 4);
    for (const z of [zBack, zFront]) {
      add({ role: 'beam-x', sectionId: sec.id, length: beamX, position: [0, footY, z], axis: 'x' });
      const beamId = `m-${n}`;
      for (const outward of [1, -1] as const) {
        addJoint({ position: [outward * (W / 2 - s), footY, z], beamAxis: 'x', outward, ySide: 1,
          beamMemberId: beamId, postMemberId: postAt.get(`${outward * (W / 2 - s / 2)},${z}`)! });
      }
    }
    // 跨度>1200 顶框加中横梁（案例：1302 跨中点加撑防桌板下挠）
    if (W > 1200) {
      add({ role: 'beam-z', sectionId: sec.id, length: D - 2 * s, position: [0, H - s / 2, 0], axis: 'z' });
      mounts.push({
        id: `mt-${++mtn}`, targetType: 'member', targetId: `m-${n}`,
        method: 't-nut-screw', note: '顶框中横梁：角码两端固定于长梁内侧（跨度>1200 防桌板下挠）',
        fasteners: [{ sku: 'corner-bracket-30-body', qty: 2 }, { sku: 't-nut-m6', qty: 4 }, { sku: 'bolt-m6-l16', qty: 4 }],
        points: [[0, H - s / 2, -D / 2 + s], [0, H - s / 2, D / 2 - s]],
      });
    }
  } else if (spec.scene === 'workbench') {
    // 桌下正面完全开放：底部仅保留后横撑，不做前梁和两侧落地围框。
    add({ role: 'beam-x', sectionId: sec.id, length: beamX, position: [0, s / 2, zBack], axis: 'x' });
    const bottomRearId = `m-${n}`;
    for (const outward of [1, -1] as const) {
      addJoint({ position: [outward * (W / 2 - s), s / 2, zBack], beamAxis: 'x', outward, ySide: 1,
        beamMemberId: bottomRearId, postMemberId: postAt.get(`${outward * (W / 2 - s / 2)},${zBack}`)! });
    }
    addRectLayer(shelfLevels[0], D);
    const upperCenterZ = -D / 2 + upperOuterDepth / 2;
    for (const y of shelfLevels.slice(1)) addRectLayer(y, upperOuterDepth, upperCenterZ);
    addRectLayer(H - s / 2, upperOuterDepth, upperCenterZ);
  } else {
    for (const y of levels) addRectLayer(y, D);
  }

  // 抽屉塔（随构/21 三抽屉柜实证）：顶底框 + 每层双深向轨道梁 + 抽屉盒
  const drawerCount = Math.floor(spec.drawerCount ?? 0);
  if (spec.drawerCount != null && !Number.isFinite(spec.drawerCount)) {
    throw new Error('抽屉层数必须是有限数值');
  }

  if (drawerCount > 0 && spec.scene !== 'workbench') {
    const pitch = (H - 2 * s) / drawerCount;
    if (pitch < 120) {
      throw new Error(`总高 ${H}mm 装不下 ${drawerCount} 层抽屉（节距 ${Math.round(pitch)} < 120mm；案例档位 160~230）`);
    }
    for (let i = 0; i < drawerCount; i++) {
      const y = s + i * pitch + 20;   // 轨道梁在每层底部上方（案例：角码固定于柱）
      for (const x of [xLeft, xRight]) {
        add({ role: 'beam-z', sectionId: sec.id, length: beamZ, position: [x, y, 0], axis: 'z' });
        mounts.push({
          id: `mt-${++mtn}`, targetType: 'member', targetId: `m-${n}`,
          method: 't-nut-screw', note: `抽屉轨道梁：角码两端固定于前后柱（案例实证 角码×2/梁）`,
          fasteners: [{ sku: 'corner-bracket-30-body', qty: 2 }, { sku: 't-nut-m6', qty: 4 }, { sku: 'bolt-m6-l16', qty: 4 }],
          points: [[x, y, zBack], [x, y, zFront]],
        });
      }
      drawerBoxes.push({ y, pitch, colWidth: W - 2 * s, xCenter: 0 });
    }
  }

  // 板材构件（9.2.3 修复：真实搭接几何 + Mount 固定关系，不再悬空）
  // 板材固定档位分派（安装工艺谱系：随构/21）：方式→紧固件 BOM
  const supportSku = s >= 30 ? 'shelf-support-30' : 'shelf-support-20';
  const mountFasteners = (mount: string): { sku: string; qty: number }[] => {
    switch (mount) {
      case 'gasket-clamp': return [{ sku: 'epdm-gasket-pad', qty: 4 }, { sku: 'clamp-strip-200', qty: 4 }];
      case 'shelf-support': return [{ sku: supportSku, qty: 4 }, { sku: 'selftap-m4-10', qty: 8 }];
      case 'corner-flat': return [{ sku: 'flat-corner-plate', qty: 4 }, { sku: 'screw-m4-10-pan', qty: 8 }, { sku: 't-nut-m4', qty: 8 }];
      default: return [{ sku: 't-nut-m6', qty: 4 }, { sku: 'bolt-m6-l16', qty: 4 }];
    }
  };
  const addPanel = (
    material: PanelMaterial,
    beamTopY: number,
    isTop: boolean,
    opts?: { depthRatio?: number; align?: 'center' | 'back' | 'front' },
  ) => {
    if (material === 'none') return;
    const ps = PANEL_SPEC[material];
    // 顶面板：overlay=覆盖整框（W×D 齐平框外缘）；recessed=凹陷嵌框内（W−2s×D−2s 坐落在框梁上）；隔板：四边各搭 15mm 在梁上表面
    const overlap = 15;
    const recessed = isTop && spec.topPanelMode === 'recessed';
    const ratio = clampRatio(opts?.depthRatio ?? 1, 0.35, 1);
    const fullPd = isTop && !recessed ? D : D - 2 * s + 2 * overlap;
    const pw = isTop && !recessed ? W : (recessed ? W - 2 * s : W - 2 * s + 2 * overlap);
    const pd = recessed ? D - 2 * s
      : isTop && spec.scene !== 'workbench' ? D
      : Math.min(fullPd, Math.max(Math.round(fullPd * ratio), Math.round(overlap + 120)));
    const zShift = (() => {
      const free = Math.max(0, fullPd - pd);
      if (opts?.align === 'back') return -free / 2;
      if (opts?.align === 'front') return free / 2;
      return 0;
    })();
    if (pw <= 0 || pd <= 0) return;
    const panelId = `pn-${++pn}`;
    // 固定孔（板局部坐标）：顶板孔心落梁中心线距边 s/2；隔板落搭接区中心距边 overlap/2
    const inset = isTop ? s / 2 : overlap / 2;
    const holes = ps.mount === 't-nut-screw' || ps.mount === 'corner-flat'
      ? [[inset, inset], [pw - inset, inset], [inset, pd - inset], [pw - inset, pd - inset]]
        .map(([x, y]) => ({ x, y, diameter: ps.holeDiameter }))
      : [];
    panels.push({
      id: panelId, material,
      size: [pw, pd, ps.thickness],
      boxSize: [pw, ps.thickness, pd],
      position: [0, beamTopY + ps.thickness / 2, zShift],   // 底面落在梁上表面
      mode: recessed ? 'top-recessed' : isTop ? 'top-overlay' : 'shelf-overlap',
      mountNote: (recessed ? '顶部置物板(凹陷嵌框内)：' : isTop ? '顶部置物板：' : '隔板(搭梁式)：') + ps.mountNote
        + (pd < fullPd ? `；浅搁板深度 ${Math.round((pd / fullPd) * 100)}%` : ''),
      holes,
    });
    // 固定点：四角内缩，落在梁中心线上方
    const px = pw / 2 - inset;
    const pz = pd / 2 - inset;
    const points: [number, number, number][] = [
      [-px, beamTopY, zShift - pz], [px, beamTopY, zShift - pz],
      [-px, beamTopY, zShift + pz], [px, beamTopY, zShift + pz],
    ];
    mounts.push({
      id: `mt-${++mtn}`, targetType: 'panel', targetId: panelId,
      method: ps.mount,
      note: ps.mountNote,
      fasteners: mountFasteners(ps.mount),
      points,
    });
  };

  // 辅助函数：中柱分区的单列结构（抽屉/搁板/柜门）
  const addCenterColStructure = (colXLeft: number, colXRight: number, colWidth: number, col: CenterColumnType) => {
    if (colWidth <= 0) return;
    const leftInnerX = colXLeft + s / 2;
    const rightInnerX = colXRight - s / 2;
    const colCenterX = colXLeft + colWidth / 2;
    if (col.type === 'drawer') {
      const pitch = (H - 2 * s) / col.count;
      for (let d = 0; d < col.count; d++) {
        const y = s + d * pitch + 20;
        for (const x of [leftInnerX, rightInnerX]) {
          add({ role: 'beam-z', sectionId: sec.id, length: D - 2 * s + 2 * conn.lengthOffset, position: [x, y, 0], axis: 'z' });
          const beamId = `m-${n}`;
          for (const outward of [1, -1] as const) {
            const z = outward === -1 ? zBack : zFront;
            const postId = postAt.get(`${x},${z}`)!;
            addJoint({ position: [x, y, z], beamAxis: 'z', outward, ySide: -1, beamMemberId: beamId, postMemberId: postId });
          }
        }
        drawerBoxes.push({ y, pitch, colWidth, xCenter: colCenterX });
      }
    } else if (col.type === 'cabinet') {
      const shelfPitch = (H - 2 * s) / (col.count + 1);
      for (let sh = 0; sh < col.count; sh++) {
        const y = s + (sh + 1) * shelfPitch;
        for (const x of [leftInnerX, rightInnerX]) {
          add({ role: 'beam-z', sectionId: sec.id, length: D - 2 * s + 2 * conn.lengthOffset, position: [x, y, 0], axis: 'z' });
          const beamId = `m-${n}`;
          for (const outward of [1, -1] as const) {
            const z = outward === -1 ? zBack : zFront;
            const postId = postAt.get(`${x},${z}`)!;
            addJoint({ position: [x, y, z], beamAxis: 'z', outward, ySide: -1, beamMemberId: beamId, postMemberId: postId });
          }
        }
        addPanel(spec.shelfPanel, y, false, { depthRatio: 1, align: 'center' });
      }
      const dw = colWidth - s;
      const dh = H - 2 * s;
      if (dw > 50 && dh > 50) {
        const doorMaterial = spec.shelfPanel !== 'none' ? spec.shelfPanel : 'wood';
        const ps = PANEL_SPEC[doorMaterial];
        const panelId = `pn-${++pn}`;
        panels.push({ id: panelId, material: doorMaterial, size: [dw, dh, ps.thickness], boxSize: [dw, dh, ps.thickness],
          position: [colCenterX, H / 2, D / 2 + ps.thickness / 2], mode: 'door-front',
          mountNote: `柜门(左铰右开)：合页×2 + 把手 + 磁吸`,
          holes: [{ x: dw - 40, y: dh / 2 - 48, diameter: 5 }, { x: dw - 40, y: dh / 2 + 48, diameter: 5 }] });
        const hingeX = colXLeft + s / 2;
        mounts.push({ id: `mt-${++mtn}`, targetType: 'panel', targetId: panelId, method: 'hinge',
          note: '柜门合页×2 入左柱槽 + 磁吸扣右柱中部 + 把手孔距96',
          fasteners: [{ sku: 'hinge-slot-30', qty: 2 }, { sku: 't-nut-m6', qty: 4 }, { sku: 'bolt-m6-l12', qty: 4 }, { sku: 'magnetic-catch', qty: 1 }, { sku: 'handle-96', qty: 1 }],
          points: [[hingeX, s + dh / 5, D / 2], [hingeX, s + dh * 4 / 5, D / 2], [colXRight - s / 2, H / 2, D / 2]] });
      }
    } else {
      const shelfPitch = (H - 2 * s) / (col.count + 1);
      for (let sh = 0; sh < col.count; sh++) {
        const y = s + (sh + 1) * shelfPitch;
        for (const x of [leftInnerX, rightInnerX]) {
          add({ role: 'beam-z', sectionId: sec.id, length: D - 2 * s + 2 * conn.lengthOffset, position: [x, y, 0], axis: 'z' });
          const beamId = `m-${n}`;
          for (const outward of [1, -1] as const) {
            const z = outward === -1 ? zBack : zFront;
            const postId = postAt.get(`${x},${z}`)!;
            addJoint({ position: [x, y, z], beamAxis: 'z', outward, ySide: -1, beamMemberId: beamId, postMemberId: postId });
          }
        }
        addPanel(spec.shelfPanel, y, false, { depthRatio: 1, align: 'center' });
      }
    }
  };

  // 中柱分区：左右两列独立结构
  if (spec.centerColumn && xCenter != null) {
    const leftW = xCenter - xLeft - s;
    const rightW = xRight - xCenter - s;
    addCenterColStructure(xLeft, xCenter, leftW, spec.centerColumn.left);
    addCenterColStructure(xCenter, xRight, rightW, spec.centerColumn.right);
  }

  if (!isPureDesk) addPanel(spec.topPanel, H, true, spec.scene === 'workbench'
    ? { depthRatio: upperDepthRatio, align: 'back' }
    : undefined);
  addPanel(spec.bottomPanel, s, false);   // 底框梁上表面 = s（搭梁式同隔板）
  if (isPureDesk) {
    // 纯桌桌面凹嵌顶框内（案例：板顶=腿顶，平面直角连接件固定）
    const material = spec.topPanel !== 'none' ? spec.topPanel : (spec.shelfPanel !== 'none' ? spec.shelfPanel : 'wood');
    const ps = PANEL_SPEC[material];
    const gap = 1;
    const pw = W - 2 * s - 2 * gap;
    const pd = D - 2 * s - 2 * gap;
    const panelId = `pn-${++pn}`;
    panels.push({
      id: panelId, material,
      size: [pw, pd, ps.thickness],
      boxSize: [pw, ps.thickness, pd],
      position: [0, H - ps.thickness / 2, 0],
      mode: 'top-inset',
      mountNote: `桌面板(凹嵌顶框内)：板顶与型材齐平；平面直角连接件下方固定`,
      holes: [],
    });
    mounts.push({
      id: `mt-${++mtn}`, targetType: 'panel', targetId: panelId,
      method: 'corner-flat',
      note: '平面直角连接件×4 下方托板并锁入梁槽（案例实证固定方式）',
      fasteners: [{ sku: 'flat-corner-plate', qty: 4 }, { sku: 'screw-m4-10-pan', qty: 8 }, { sku: 't-nut-m4', qty: 8 }],
      points: [
        [-W / 2 + s, H - ps.thickness, -D / 2 + s], [W / 2 - s, H - ps.thickness, -D / 2 + s],
        [-W / 2 + s, H - ps.thickness, D / 2 - s], [W / 2 - s, H - ps.thickness, D / 2 - s],
      ],
    });
  } else {
    for (let i = 0; i < shelfLevels.length; i++) {
      const depthRatio = spec.scene === 'workbench' && i > 0 ? upperDepthRatio : 1;
      addPanel(spec.shelfPanel, shelfLevels[i] + s / 2, false, {
        depthRatio,
        align: spec.scene === 'workbench' ? 'back' : 'center',
      });
    }
  }

  // 侧围板（背/左/右）：贴在框架外侧面，兼作抗侧向体系（val-lateral 解药）
  const addSidePanel = (material: PanelMaterial, side: 'back' | 'left' | 'right') => {
    if (material === 'none') return;
    const ps = PANEL_SPEC[material];
    const panelId = `pn-${++pn}`;
    const isBack = side === 'back';
    const pw = isBack ? W : D;   // 板面宽度（沿框架面）
    const partialWorkbenchBack = spec.scene === 'workbench' && isBack && material === 'pegboard';
    const deskTop = spec.workbenchDeskTopHeightMm ?? 740;
    const ph = partialWorkbenchBack ? H - deskTop : H;
    const boxSize: [number, number, number] = isBack
      ? [W, H, ps.thickness] : [ps.thickness, H, D];
    const position: [number, number, number] = isBack
      ? [0, partialWorkbenchBack ? (deskTop + H) / 2 : H / 2, -D / 2 - ps.thickness / 2]
      : [side === 'left' ? -W / 2 - ps.thickness / 2 : W / 2 + ps.thickness / 2, H / 2, 0];
    if (partialWorkbenchBack) boxSize[1] = ph;
    // 固定孔（板局部坐标，沿板宽×板高）：孔心落柱中心线，横向距边 s/2，纵向距上下边 s
    const holes = ps.mount === 't-nut-screw' || ps.mount === 'corner-flat'
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
      ? [[-W / 2 + s / 2, partialWorkbenchBack ? deskTop : s, -D / 2], [W / 2 - s / 2, partialWorkbenchBack ? deskTop : s, -D / 2], [-W / 2 + s / 2, H - s, -D / 2], [W / 2 - s / 2, H - s, -D / 2]]
      : (() => {
        const x = side === 'left' ? -W / 2 : W / 2;
        return [[x, s, -D / 2 + s / 2], [x, s, D / 2 - s / 2], [x, H - s, -D / 2 + s / 2], [x, H - s, D / 2 - s / 2]] as [number, number, number][];
      })();
    // 外挂薄板用垂直角码（真实案例：4mm 海洋板侧挂），其余按档位分派
    mounts.push({
      id: `mt-${++mtn}`, targetType: 'panel', targetId: panelId,
      method: ps.mount,
      note: '侧围板四角固定于立柱外侧槽',
      fasteners: ps.mount === 'corner-flat'
        ? [{ sku: 'vertical-bracket-20', qty: 4 }, { sku: 'screw-m4-10-pan', qty: 8 }, { sku: 't-nut-m4', qty: 8 }]
        : mountFasteners(ps.mount),
      points,
    });
  };
  addSidePanel(spec.backPanel, 'back');
  addSidePanel(spec.leftPanel, 'left');
  addSidePanel(spec.rightPanel, 'right');

  // 正面单开门：槽装合页（左柱铰接）+ 磁吸 + 把手；门是可开启件，不计入抗剪体系
  if (spec.doorPanel && spec.doorPanel !== 'none') {
    const material = spec.doorPanel;
    const ps = PANEL_SPEC[material];
    const gap = 3;   // 每边开启间隙
    const dw = W - 2 * s - 2 * gap;
    const dh = H - 2 * s - 2 * gap;
    if (dw > 100 && dh > 100) {
      const panelId = `pn-${++pn}`;
      const soft = ps.mount === 'gasket-clamp';
      // 把手孔：硬质门右缘内40mm、中高孔距96；软质门（玻璃/亚克力）用粘贴把手免钻
      const holes = soft ? [] : [
        { x: dw - 40, y: dh / 2 - 48, diameter: 5 },
        { x: dw - 40, y: dh / 2 + 48, diameter: 5 },
      ];
      panels.push({
        id: panelId, material,
        size: [dw, dh, ps.thickness],
        boxSize: [dw, dh, ps.thickness],
        position: [0, H / 2, D / 2 + ps.thickness / 2],
        mode: 'door-front',
        mountNote: `正面单开门(${soft ? '玻璃门铰夹式+粘贴把手' : '槽装合页+拉手96'})：左铰右开，每边留 ${gap}mm 间隙；${ps.mountNote}`,
        holes,
      });
      // 铰接点：左前柱上下 1/5 门高处；磁吸在右柱中部
      const hx = -W / 2 + s / 2, hz = D / 2;
      const hingePts: [number, number, number][] = [
        [hx, s + gap + dh / 5, hz], [hx, s + gap + dh * 4 / 5, hz],
      ];
      mounts.push({
        id: `mt-${++mtn}`, targetType: 'panel', targetId: panelId,
        method: 'hinge',
        note: soft ? '玻璃门铰×2 夹持门板左缘，磁吸扣右柱中部，粘贴式把手' : '槽装合页×2 入左前柱前槽（T型螺母固定），磁吸扣右柱中部，拉手孔距96',
        fasteners: soft
          ? [{ sku: 'glass-hinge', qty: 2 }, { sku: 'magnetic-catch', qty: 1 }, { sku: 'handle-adhesive', qty: 1 }]
          : [{ sku: 'hinge-slot-30', qty: 2 }, { sku: 't-nut-m6', qty: 4 }, { sku: 'bolt-m6-l12', qty: 4 },
             { sku: 'magnetic-catch', qty: 1 }, { sku: 'handle-96', qty: 1 }],
        points: [...hingePts, [W / 2 - s / 2, H / 2, hz]],
      });
      if (dw > 600) {
        warnings.push(`门宽 ${dw}mm > 600mm：单开门铰链下垂风险，建议改双开或加第三合页`);
      }
    }
  }

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
  // 调平地脚（真实案例高频：三抽屉柜/展示柜）：落地柱底端 M8 拧入
  if (spec.mobility === 'leveling-feet') {
    let fn = 0;
    for (const [key, postId] of postAt) {
      if (!groundPostIds.has(postId)) continue;
      const [x, z] = key.split(',').map(Number);
      const accId = `af-${++fn}`;
      accessories.push({ id: accId, kind: 'leveling-foot', sku: 'leveling-foot-m8', position: [x, -25, z], weightKg: 0.1 });
      mounts.push({
        id: `mt-${++mtn}`, targetType: 'accessory', targetId: accId,
        method: 'foot-stem', note: `调平地脚拧入立柱(${postId})底端面 M8 攻牙`,
        fasteners: [{ sku: 'leveling-foot-m8', qty: 1 }],
        points: [[x, 0, z]],
      });
    }
  }
  if (spec.mobility === 'caster') {
    let an = 0;
    for (const [key, postId] of postAt) {
      if (!groundPostIds.has(postId)) continue;
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

  // 抽屉盒附件：周转箱+三折轨道（工具）或 成品抽屉+反弹轨道（家具，无拉手）
  if (drawerBoxes.length) {
    const kind = spec.drawerKind ?? 'ready-made';
    const boxSku = kind === 'turnover-box' ? 'turnover-box-148' : 'drawer-box-ready';
    const slideSku = kind === 'turnover-box' ? 'drawer-slide-350' : 'rebound-slide-350';
    let dn = 0;
    for (const { y, pitch, colWidth, xCenter } of drawerBoxes) {
      const accId = `ad-${++dn}`;
      // 抽屉盒净宽 = 分区宽 − 滑轨侧向间隙（每侧 ~15mm，硬件属体）。
      // 分区宽度由 partitions.widths 决定（非均匀双列时各列不同）
      const DRAWER_SIDE_CLEARANCE = 30;
      const bw = (colWidth ?? W - 2 * s) - DRAWER_SIDE_CLEARANCE;
      const bh = Math.min(pitch - 25, kind === 'turnover-box' ? 155 : pitch - 25);
      const bd = D - 2 * s;
      accessories.push({
        id: accId, kind: 'drawer-box', sku: boxSku,
        position: [xCenter ?? 0, y + 10 + bh / 2, 0], weightKg: kind === 'turnover-box' ? 1.2 : 3.0,
        boxSize: [bw, bh, bd],
      });
      mounts.push({
        id: `mt-${++mtn}`, targetType: 'accessory', targetId: accId,
        method: 'drawer-slide',
        note: kind === 'turnover-box'
          ? '周转箱+底托放三折轨道上（轨道 M4 半圆头螺丝入梁槽）'
          : '成品抽屉盒装反弹轨道（按压开启无拉手，轨道 M4 半圆头螺丝入梁槽）',
        fasteners: [{ sku: boxSku, qty: 1 }, { sku: slideSku, qty: 1 }, { sku: 'screw-m4-10-pan', qty: 8 }, { sku: 't-nut-m4', qty: 8 }],
        points: [[-W / 2 + s, y, 0], [W / 2 - s, y, 0]],
      });
    }
  }

  // LED 灯条：顶框前梁下槽内嵌（mat-004），电源线沿立柱槽走线
  if (spec.ledStrip) {
    const ledY = H - s;
    const ledZ = D / 2 - s / 2;
    const accId = 'ac-led';
    accessories.push({ id: accId, kind: 'led-strip', sku: 'led-strip-m', position: [0, ledY - 4, ledZ], weightKg: 0.2, lengthMm: beamX });
    mounts.push({
      id: `mt-${++mtn}`, targetType: 'accessory', targetId: accId,
      method: 'slot-embed', note: 'LED灯条嵌入顶框前梁下槽（mat-004 槽内嵌），电源线沿立柱槽走线至底部',
      fasteners: [{ sku: 'led-strip-m', qty: Math.ceil(beamX / 1000) }, { sku: 'led-psu-24w', qty: 1 }],
      points: [[-beamX / 2, ledY, ledZ], [beamX / 2, ledY, ledZ]],
    });
  }

  // 加工特征派生：连接件 machining 声明 → 每个接点的孔位（位置/方向/规格）
  const machining: MachiningOp[] = [];
  let mn = 0;
  const T = sec.slotWallThickness ?? sec.wallThickness ?? 2;   // 锚式公式 G=19-T+2 用槽口壁厚 T
  for (const j of joints) {
    const [jx, jy, jz] = j.position;
    const inward = -j.outward;   // 从梁端指向梁内部
    const at = (d: number): [number, number, number] =>
      j.beamAxis === 'x' ? [jx + inward * d, jy, jz] : [jx, jy, jz + inward * d];
    for (const op of conn.machining) {
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
  // 脚轮/地脚丝杆 → 立柱底端面 M8 攻牙加工（装配关系派生加工特征）
  if (spec.mobility === 'caster' || spec.mobility === 'leveling-feet') {
    const tag = spec.mobility === 'caster' ? '脚轮' : '调平地脚';
    for (const [key, postId] of postAt) {
      if (!groundPostIds.has(postId)) continue;
      const [x, z] = key.split(',').map(Number);
      machining.push({
        id: `mc-${++mn}`, jointId: '-', memberId: postId, type: 'end-tap', spec: `M8×20(${tag})`,
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
  // 脚轮/LED 的 mount 紧固件即附件本体，归入附件项避免重计
  const fastenersCost = r2(mounts.filter((mt) => mt.method !== 'caster-stem' && mt.method !== 'foot-stem' && mt.method !== 'drawer-slide' && mt.method !== 'slot-embed')
    .reduce((sum, mt) => sum + mt.fasteners.reduce((a, f) => a + fprice(f.sku) * f.qty, 0), 0));
  const machiningCost = r2(machining.reduce((sum, mc) => sum + (mprice[mc.type] ?? 0), 0)
    + members.filter((m) => m.role === 'brace').length * 2 * (mprice['miter-cut'] ?? 0));
  const accessoriesCost = r2(accessories.reduce((sum, a) => {
    if (a.kind === 'led-strip') return sum + fprice('led-strip-m') * Math.ceil((a.lengthMm ?? 1000) / 1000) + fprice('led-psu-24w');
    return sum + fprice(a.sku);
  }, 0));
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
