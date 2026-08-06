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
    width: 800, depth: 400, height: 1500, sectionId: 'eu-3030', connectorId: 'anchor-30',
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
    if (m.totals.cost.total <= 0) fail('总价未算出');
    if (m.status === 'invalid') fail(`冒烟方案 invalid: ${m.checks.filter((c) => c.level === 'error').map((c) => c.ruleId).join(',')}`);
    if (!failures) ok(`构件${m.members.length} 板${m.panels.length} Mount${m.mounts.length} 加工${m.machining.length} 合计¥${m.totals.cost.total} status=${m.status}`);
  } catch (e) {
    fail(`生成异常: ${(e as Error).message}`);
  }
}

console.log(failures ? `\n✖ 失败 ${failures} 项` : '\n✓ 全部通过');
process.exit(failures ? 1 : 0);
