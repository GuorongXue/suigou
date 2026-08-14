import { loadKbNode } from './kb-node';
import { runGolden } from '../src/engine/golden';
import { generateFrame } from '../src/engine/generate';
import type { FrameSpec } from '../src/engine/types';

/**
 * CLI 跑批（M5 收官条件：测试可由命令一次执行）：
 * 1) 知识库完整性检查（必需字段/悬空引用/SKU 价格覆盖）
 * 2) Golden 用例跑批
 * 3) 冒烟：默认 spec 全链路生成 + 强制不变量
 * 退出码非 0 = 失败。
 */
const kb = loadKbNode();
let failures = 0;
const fail = (msg: string) => { failures++; console.error(`  ✖ ${msg}`); };
const ok = (msg: string) => console.log(`  ✓ ${msg}`);

console.log('== 1. 知识库完整性 ==');
{
  const sectionIds = new Set(kb.sections.map((s) => s.section.id));
  for (const s of kb.sections) {
    if (!s.section.id || !s.section.size || !s.section.slot) fail(`截面缺必需字段: ${s.section.id}`);
    if (s.section.price?.perMeter == null) fail(`截面无米价: ${s.section.id}`);
  }
  for (const c of kb.connectors) {
    if (!c.connector.compatible?.series?.length) fail(`连接件无兼容声明: ${c.connector.id}`);
    for (const sid of c.connector.compatible.series) {
      if (!sectionIds.has(sid)) fail(`连接件 ${c.connector.id} 兼容引用悬空截面: ${sid}`);
    }
    for (const b of c.connector.bom) {
      if (b.priceUntaxed == null && !kb.fasteners[b.sku]) fail(`连接件 ${c.connector.id} BOM SKU 无价格: ${b.sku}`);
    }
  }
  if (!Object.keys(kb.panels).length) fail('panels.yaml 未装载');
  if (!Object.keys(kb.fasteners).length) fail('fasteners.yaml 未装载');
  for (const [id, p] of Object.entries(kb.panels)) {
    if (p.pricePerM2 == null || p.thickness == null) fail(`板材缺字段: ${id}`);
  }
  const pricing = (kb.rules.pricing as { machiningPrice?: Record<string, number> })?.machiningPrice;
  for (const t of ['through-hole', 'end-tap', 'counterbore', 'wrench-hole', 'miter-cut', 'panel-hole']) {
    if (pricing?.[t] == null) fail(`加工计价缺类型: ${t}`);
  }
  if (!failures) ok(`${kb.sections.length} 截面 / ${kb.connectors.length} 连接件 / ${Object.keys(kb.rules).length} 规则包 / ${Object.keys(kb.fasteners).length} SKU 价`);
}

console.log('== 2. Golden 用例 ==');
{
  const results = runGolden(kb);
  for (const r of results) {
    if (r.pass) ok(`${r.id} (${r.rule})`);
    else fail(`${r.id} expected=${r.expected} actual=${r.actual}`);
  }
  if (!results.length) fail('golden.yaml 无用例');
}

console.log('== 3. 生成冒烟 + 强制不变量 ==');
{
  const spec: FrameSpec = {
    width: 800, depth: 650, height: 1500, sectionId: 'eu-3030', connectorId: 'anchor-30',
    shelfCount: 2, loadKg: 15, loadType: 'distributed', scene: 'workbench', highRisk: false,
    mobility: 'caster', topPanel: 'wood', shelfPanel: 'glass', backPanel: 'pegboard',
    bottomPanel: 'none', leftPanel: 'none', rightPanel: 'none', brace: true,
  };
  try {
    const m = generateFrame(spec, kb);
    // 不变量（架构 13.2）：每块板/附件至少一个 Mount；Mount 紧固件有价；数量一致
    for (const p of m.panels) {
      if (!m.mounts.some((mt) => mt.targetType === 'panel' && mt.targetId === p.id)) fail(`板材无 Mount: ${p.id}`);
    }
    for (const a of m.accessories) {
      if (!m.mounts.some((mt) => mt.targetType === 'accessory' && mt.targetId === a.id)) fail(`附件无 Mount: ${a.id}`);
    }
    for (const mt of m.mounts) {
      for (const f of mt.fasteners) {
        if (!kb.fasteners[f.sku]) fail(`Mount ${mt.id} 紧固件无价格: ${f.sku}`);
      }
    }
    const cutQty = m.cutList.reduce((s, c) => s + c.qty, 0);
    if (cutQty !== m.members.length) fail(`切割清单数量 ${cutQty} ≠ 构件数 ${m.members.length}`);
    const panelQty = m.panelList.reduce((s, p) => s + p.qty, 0);
    if (panelQty !== m.panels.length) fail(`板材清单数量 ${panelQty} ≠ 板数 ${m.panels.length}`);
    for (const member of m.members) {
      if (!Number.isFinite(member.length) || member.length <= 0) fail(`构件长度无效: ${member.id}=${member.length}`);
      if (member.position.some((v) => !Number.isFinite(v))) fail(`构件位置无效: ${member.id}`);
    }
    const casterMounts = m.mounts.filter((mt) => mt.method === 'caster-stem');
    if (casterMounts.length !== 4) fail(`电脑桌落地脚轮应为4个，实际 ${casterMounts.length}`);
    if (casterMounts.some((mt) => mt.points.some((p) => p[1] !== 0))) fail('脚轮存在悬空安装点');
    const bottomFront = m.members.filter((member) => member.role === 'beam-x'
      && member.position[1] < 100 && member.position[2] > 0);
    if (bottomFront.length) fail('电脑桌桌下正面存在阻挡腿部的底横梁');
    const upperPanels = m.panels.filter((panel) => panel.mode === 'top-overlay'
      || (panel.mode === 'shelf-overlap' && panel.position[1] > (spec.workbenchDeskTopHeightMm ?? 740) + 100));
    const expectedUpperDepth = Math.round(spec.depth * (spec.workbenchUpperShelfDepthRatio ?? 0.55));
    if (upperPanels.some((panel) => panel.size[1] > expectedUpperDepth + 1)) fail('上层板深度超过浅层支撑框');
    if (m.totals.cost.total <= 0) fail('总价未算出');
    if (m.status === 'invalid') fail(`冒烟方案 invalid: ${m.checks.filter((c) => c.level === 'error').map((c) => c.ruleId).join(',')}`);
    if (!failures) ok(`构件${m.members.length} 板${m.panels.length} Mount${m.mounts.length} 加工${m.machining.length} 合计¥${m.totals.cost.total} status=${m.status}`);
  } catch (e) {
    fail(`生成异常: ${(e as Error).message}`);
  }

  const mustReject = (patch: Partial<FrameSpec>, label: string) => {
    try {
      generateFrame({ ...spec, ...patch }, kb);
      fail(`${label} 未被生成器拒绝`);
    } catch {
      ok(`${label} 已阻断`);
    }
  };
  mustReject({ width: Number.NaN }, 'NaN 尺寸');
  mustReject({ shelfCount: Number.NaN }, 'NaN 层数');
  mustReject({ workbenchUpperShelfDepthRatio: Number.NaN }, 'NaN 上层深度比例');
  mustReject({ depth: 400 }, '电脑桌深度不足550mm');
  mustReject({ height: 1100, shelfCount: 3 }, '层数与总高冲突');

  try {
    for (const height of [740, 800]) {
      const pure = generateFrame({ ...spec, height, shelfCount: 1, mobility: 'fixed', backPanel: 'none', topPanel: 'wood' }, kb);
      if (pure.members.filter((member) => member.role === 'post').length !== 4) fail('纯电脑桌应只有4根桌腿');
      const desktops = pure.panels.filter((panel) => panel.mode === 'shelf-overlap');
      if (desktops.length !== 1) fail('纯电脑桌应只有1块主桌面');
      const topY = desktops[0] ? desktops[0].position[1] + desktops[0].boxSize[1] / 2 : Number.NaN;
      if (Math.abs(topY - height) > 0.01) fail(`纯电脑桌桌面顶高 ${topY} ≠ 请求总高 ${height}`);
      if (pure.members.some((member) => member.position[1] > 800)) fail('纯电脑桌不应生成上架构件');
      if (!pure.checks.some((check) => check.ruleId === 'val-002')) fail('纯电脑桌缺少主桌面挠度校验');
    }
    if (!failures) ok('纯电脑桌 740/800mm 拓扑通过');
  } catch (e) {
    fail(`纯电脑桌生成异常: ${(e as Error).message}`);
  }
}

console.log(failures ? `\n== 4. archetype 意图回归（跳过） ==` : '== 4. archetype 意图回归 ==');
{
  const { intentToSpec } = await import('../src/engine/intent');
  const base = {
    productType: 'shelf', dimensions: { width: null, depth: null, height: null, unit: 'mm' },
    load: { totalKg: 20, type: 'distributed' as const, description: '' }, scene: 'diy-furniture',
    mobility: 'fixed' as const, stiffnessNeed: 'normal', environment: { humid: null, outdoor: null, vibration: null },
    panels: [], appearance: { color: null, hiddenConnectorsPreferred: null }, budgetSensitivity: 'unknown',
    layers: 3, _missing: [], _assumptions: [], _riskFlags: [],
  };
  const rack = intentToSpec(base, kb);
  if (rack.spec.archetype !== 'storage-rack') fail(`shelf 应判为 storage-rack，实际 ${rack.spec.archetype}`);
  if (rack.spec.depth !== 400 || rack.spec.height !== 1700) fail(`置物架默认档位错误: ${rack.spec.width}×${rack.spec.depth}×${rack.spec.height}`);
  const rackModel = generateFrame(rack.spec, kb);
  if (!rackModel.checks.some((c) => c.ruleId === 'val-rack-tipover')) fail('高置物架缺少防倾倒提示');

  const aq = intentToSpec({ ...base, productType: 'frame', scene: 'aquarium' }, kb);
  if (aq.spec.archetype !== 'aquarium-stand') fail(`aquarium 应判为 aquarium-stand，实际 ${aq.spec.archetype}`);
  if (aq.spec.height !== 750) fail(`鱼缸架默认高度应 750，实际 ${aq.spec.height}`);
  if (!generateFrame(aq.spec, kb).checks.some((c) => c.ruleId === 'val-aquarium-load')) fail('鱼缸架缺少承重冗余提示');

  const ward = intentToSpec({ ...base, productType: 'cabinet', dimensions: { width: 1800, depth: 400, height: 2400, unit: 'mm' } }, kb);
  if (ward.spec.archetype !== 'wardrobe') fail(`高柜应判为 wardrobe，实际 ${ward.spec.archetype}`);
  if (!generateFrame(ward.spec, kb).checks.some((c) => c.ruleId === 'val-wardrobe-depth')) fail('浅衣柜缺少深度档位提示');
  if (!failures) ok('storage-rack / aquarium-stand / wardrobe 档位与校验通过');
}

console.log(failures ? `\n✖ 失败 ${failures} 项` : '\n✓ 全部通过');
process.exit(failures ? 1 : 0);
