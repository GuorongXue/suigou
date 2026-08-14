import type { FrameModel } from './types';
import type { KnowledgeBase } from '../knowledge/types';

/** 装配步骤（从 Joint/Mount/Fastener 派生的安装顺序编排） */
export interface AssemblyStep {
  step: number;
  title: string;
  /** 本步用件（件号×数量 / 板件号 / 附件名） */
  parts: string[];
  /** 本步紧固件（人读名×数量） */
  fasteners: string[];
  tools: string[];
  note: string;
}

/** 装配说明书编排：底框→立柱→隔层→顶框→斜撑→水平板→围护→门→脚轮→LED→终检 */
export function buildAssemblySteps(model: FrameModel, kb: KnowledgeBase): AssemblyStep[] {
  const conn = kb.connectors.find((c) => c.connector.id === model.spec.connectorId)?.connector;
  const fname = (sku: string) => kb.fasteners[sku]?.name ?? sku;
  const memberById = new Map(model.members.map((m) => [m.id, m]));
  const panelById = new Map(model.panels.map((p) => [p.id, p]));

  const uniq = (ids: string[]) => [...new Set(ids)];
  const partOf = (ids: string[]) => {
    const cnt = new Map<string, number>();
    for (const id of ids) {
      const p = memberById.get(id)?.partNo ?? panelById.get(id)?.partNo ?? id;
      cnt.set(p, (cnt.get(p) ?? 0) + 1);
    }
    return [...cnt.entries()].map(([p, c]) => (c > 1 ? `${p}×${c}` : p));
  };
  const aggFast = (mts: FrameModel['mounts']) => {
    const cnt = new Map<string, number>();
    for (const mt of mts) for (const f of mt.fasteners) cnt.set(f.sku, (cnt.get(f.sku) ?? 0) + f.qty);
    return [...cnt.entries()].map(([sku, c]) => `${fname(sku)}×${c}`);
  };
  const connFast = (jointCount: number) =>
    (conn?.bom ?? []).map((b) => `${fname(b.sku)}×${b.qty * jointCount}`);
  // 工具推导：M8 端攻/沉头需 6mm 内六角，其余 M6 体系 5mm
  const connTools = (conn?.bom ?? []).some((b) => /m8|edla/.test(b.sku))
    ? ['内六角扳手 6mm'] : ['内六角扳手 5mm'];

  const steps: AssemblyStep[] = [];
  let n = 0;
  const add = (title: string, parts: string[], fasteners: string[], tools: string[], note: string) =>
    steps.push({ step: ++n, title, parts, fasteners, tools, note });

  add('识别与清点', model.cutList.map((c) => `${c.partNo}×${c.qty}`),
    [], [], '对照切割清单与单件加工图核对件号/长度/孔位，确认孔口已去毛刺');

  // 按接点高度分层：底框 → 中间层 → 顶框
  const ys = [...new Set(model.joints.map((j) => Math.round(j.position[1])))].sort((a, b) => a - b);
  if (ys.length) {
    const layer = (y: number) => model.joints.filter((j) => Math.round(j.position[1]) === y);
    const bj = layer(ys[0]);
    add('底框与立柱', [...partOf(uniq(bj.map((j) => j.beamMemberId))), ...partOf(uniq(bj.map((j) => j.postMemberId)))],
      connFast(bj.length), connTools,
      `4 根立柱平放，底层横梁用${conn?.name ?? '连接件'}连接（接点×${bj.length}）；先不完全拧紧，留校方余地`);
    for (const y of ys.slice(1, -1)) {
      const js = layer(y);
      add(`隔板层横梁（高 ${y}mm）`, partOf(uniq(js.map((j) => j.beamMemberId))),
        connFast(js.length), connTools, `在 ${y}mm 高度装本层横梁（接点×${js.length}）`);
    }
    if (ys.length > 1) {
      const tj = layer(ys[ys.length - 1]);
      add('顶框', partOf(uniq(tj.map((j) => j.beamMemberId))), connFast(tj.length), connTools,
        `顶层横梁（接点×${tj.length}）；量两条对角线差 ≤2mm 校方后，全部接点二次拧紧`);
    }
  }

  const braceMounts = model.mounts.filter((m) => m.targetType === 'member');
  if (braceMounts.length) {
    add('背面斜撑', partOf(braceMounts.map((m) => m.targetId)), aggFast(braceMounts),
      ['内六角扳手 5mm'], braceMounts[0].note);
  }

  const pm = (modes: string[]) => model.mounts.filter((m) =>
    m.targetType === 'panel' && modes.includes(panelById.get(m.targetId)?.mode ?? ''));
  const flat = pm(['top-overlay', 'shelf-overlap']);
  if (flat.length) {
    add('水平板材（顶板/隔板/底板）', partOf(flat.map((m) => m.targetId)), aggFast(flat),
      ['内六角扳手 5mm'], '板孔对准梁中心槽，T型螺母入槽固定；软材质用胶垫承托+压条，禁止硬压');
  }
  const wrap = pm(['back-overlay', 'side-overlay']);
  if (wrap.length) {
    add('背板/侧板/围网', partOf(wrap.map((m) => m.targetId)), aggFast(wrap),
      ['内六角扳手 5mm'], '外贴于框架侧面，四角固定于立柱槽；围网先 U 型包边');
  }
  const door = pm(['door-front']);
  if (door.length) {
    add('门板', partOf(door.map((m) => m.targetId)), aggFast(door),
      ['内六角扳手 5mm', '十字螺丝刀'], door[0].note + '；先装合页侧，调平后装磁吸与把手');
  }
  const casters = model.mounts.filter((m) => m.method === 'caster-stem');
  if (casters.length) {
    add('脚轮', [`丝杆脚轮×${casters.length}`], aggFast(casters), ['扳手 13mm(可选)'],
      '整体翻转，丝杆拧入立柱底端面 M8 攻牙至根部；落地后测试锁定');
  }
  const feet = model.mounts.filter((m) => m.method === 'foot-stem');
  if (feet.length) {
    add('调平地脚', [`调平地脚×${feet.length}`], aggFast(feet), ['扳手 13mm(可选)'],
      '整体翻转，地脚拧入立柱底端面 M8 攻牙；落地后旋调各脚消除晃动');
  }
  const led = model.mounts.filter((m) => m.method === 'slot-embed');
  if (led.length) {
    add('LED 灯条', ['LED 灯条+电源'], aggFast(led), [],
      led[0].note);
  }
  add('终检', [], [], ['卷尺'],
    '对角线复测；全部螺栓二次紧固；活动件（门/脚轮）开合顺畅；高风险场景核对结构校验清单');
  return steps;
}
