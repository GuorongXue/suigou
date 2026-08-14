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
      if (pure.members.some((member) => member.role === 'post' && member.length !== height)) fail('纯桌腿应全高（腿顶=桌面顶，案例实证）');
      const desktops = pure.panels.filter((panel) => panel.mode === 'top-inset');
      if (desktops.length !== 1) fail('纯电脑桌应有且仅有1块凹嵌桌面');
      const topY = desktops[0] ? desktops[0].position[1] + desktops[0].boxSize[1] / 2 : Number.NaN;
      if (Math.abs(topY - height) > 0.01) fail(`纯电脑桌桌面顶高 ${topY} ≠ 请求总高 ${height}`);
      const stretchers = pure.members.filter((m) => m.role === 'beam-x' && m.position[1] < 200);
      if (stretchers.length !== 2) fail(`纯桌应有底部长边双撑，实际 ${stretchers.length}`);
      if (!pure.checks.some((check) => check.ruleId === 'val-002')) fail('纯电脑桌缺少主桌面挠度校验');
    }
    ok('纯电脑桌 740/800mm 拓扑通过');
  } catch (e) {
    fail(`纯电脑桌生成异常: ${(e as Error).message}`);
  }

  // 黄金锚点②（随构/21 极简桌）：1342×545×740，BOM 实证 1302×4 / 505×短梁 / 740×4 腿 + 中横梁
  try {
    const desk = generateFrame({
      ...spec, width: 1342, depth: 545, height: 740, shelfCount: 1,
      mobility: 'fixed', backPanel: 'none', topPanel: 'wood', sectionId: 'eu-2020', connectorId: 'internal-slot-20', brace: false,
    }, kb);
    const lens = new Map<number, number>();
    for (const m of desk.members) lens.set(m.length, (lens.get(m.length) ?? 0) + 1);
    if (lens.get(740) !== 4) fail(`极简桌腿应 740×4，实际 ${lens.get(740) ?? 0}`);
    if (lens.get(1302) !== 4) fail(`极简桌长梁应 1302×4（顶框2+底撑2），实际 ${lens.get(1302) ?? 0}`);
    if ((lens.get(505) ?? 0) < 3) fail(`极简桌短梁应≥3（顶框2+中横梁1），实际 ${lens.get(505) ?? 0}`);
    if (!desk.panels.some((p) => p.mode === 'top-inset')) fail('极简桌桌面应凹嵌');
    ok('黄金锚点② 极简桌 1342×545×740 BOM 对齐');
  } catch (e) {
    fail(`极简桌锚点异常: ${(e as Error).message}`);
  }

  // 黄金锚点③（随构/21 三抽屉柜）：350×400×490，BOM 实证 490×4 / 340×10 / 290×4
  try {
    const tower = generateFrame({
      ...spec, width: 350, depth: 400, height: 490, scene: 'diy-furniture',
      shelfCount: 0, drawerCount: 3, drawerKind: 'ready-made',
      mobility: 'leveling-feet', backPanel: 'none', topPanel: 'wood',
      sectionId: 'eu-3030', connectorId: 'three-way-30', brace: false,
    }, kb);
    const lens = new Map<number, number>();
    for (const m of tower.members) lens.set(m.length, (lens.get(m.length) ?? 0) + 1);
    if (lens.get(490) !== 4) fail(`三抽屉柜立柱应 490×4，实际 ${lens.get(490) ?? 0}`);
    if (lens.get(340) !== 10) fail(`三抽屉柜深向梁应 340×10（顶2+底2+轨道6），实际 ${lens.get(340) ?? 0}`);
    if (lens.get(290) !== 4) fail(`三抽屉柜宽向梁应 290×4，实际 ${lens.get(290) ?? 0}`);
    if (tower.accessories.filter((a) => a.kind === 'drawer-box').length !== 3) fail('三抽屉柜应有3个抽屉盒');
    if (tower.accessories.filter((a) => a.kind === 'leveling-foot').length !== 4) fail('三抽屉柜应有4个调平地脚');
    ok('黄金锚点③ 三抽屉柜 350×400×490 BOM 对齐');
  } catch (e) {
    fail(`三抽屉柜锚点异常: ${(e as Error).message}`);
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

console.log(failures ? `\n== 5. 中柱拓扑（跳过） ==` : '== 5. 中柱拓扑 ==');
{
  // 工具柜双列分区：670×400×815，2020 系列，中柱将内腔分为左右双列（随构/21 案例拓扑骨架）
  const dual = generateFrame({
    width: 670, depth: 400, height: 815, scene: 'diy-furniture', shelfCount: 2,
    sectionId: 'eu-2020', connectorId: 'internal-slot-20', centerColumn: true,
    loadKg: 15, loadType: 'distributed', highRisk: false, mobility: 'leveling-feet',
    topPanel: 'wood', shelfPanel: 'wood', bottomPanel: 'wood', backPanel: 'none',
    leftPanel: 'none', rightPanel: 'none', brace: false,
  }, kb);
  const posts = dual.members.filter((m) => m.role === 'post');
  const centerPosts = posts.filter((p) => p.position[0] === 0);   // 中柱 x=0
  if (centerPosts.length !== 2) fail(`中柱应为 2 根（前后各一），实际 ${centerPosts.length}`);
  if (posts.length !== 6) fail(`中柱柜总立柱应为 6（4 角+2 中），实际 ${posts.length}`);
  // 横梁在中柱处断开：每层 4 根 beam-x（左半×前后 + 右半×前后）；层数=底框+2隔板+顶框=4
  const beamX = dual.members.filter((m) => m.role === 'beam-x');
  const layerCount = 4;              // 底框 + 2 隔板层 + 顶框
  const expectedBeamX = 4 * layerCount;
  if (beamX.length !== expectedBeamX) fail(`中柱柜横梁应为 ${expectedBeamX}，实际 ${beamX.length}`);
  // 梁长验证：长梁半段 = W/2 − 3s/2 = 335 − 30 = 305
  const halfBeamLen = 305;
  if (!beamX.some((b) => b.length === halfBeamLen)) fail(`中柱柜半段梁长应有 ${halfBeamLen}mm`);
  // 中柱柜无 invalid 错误
  if (dual.status === 'invalid') fail(`中柱柜 invalid: ${dual.checks.filter((c) => c.level === 'error').map((c) => c.ruleId).join(',')}`);
  if (!failures) ok(`中柱拓扑通过：${posts.length} 立柱（含 ${centerPosts.length} 中柱）· ${beamX.length} 横梁 · 状态 ${dual.status}`);
}

console.log(failures ? `\n== 6. 顶板凹陷模式（跳过） ==` : '== 6. 顶板凹陷模式 ==');
{
  // recessed 顶板：嵌于框内，尺寸 (W−2s)×(D−2s)，坐落在顶框梁上（不悬挑）
  const recessed = generateFrame({
    width: 800, depth: 400, height: 1200, scene: 'diy-furniture', shelfCount: 1,
    sectionId: 'eu-3030', connectorId: 'corner-bracket-30', topPanelMode: 'recessed',
    topPanel: 'wood', shelfPanel: 'wood', bottomPanel: 'wood',
    loadKg: 20, loadType: 'distributed', highRisk: false, mobility: 'fixed',
    backPanel: 'none', leftPanel: 'none', rightPanel: 'none', brace: false,
  }, kb);
  const topPanels = recessed.panels.filter((p) => p.mode === 'top-recessed');
  if (topPanels.length !== 1) fail(`凹陷顶板应恰好 1 块，实际 ${topPanels.length}`);
  const tp = topPanels[0];
  const expectedW = 800 - 2 * 30;   // W − 2s = 740
  const expectedD = 400 - 2 * 30;   // D − 2s = 340
  if (tp.size[0] !== expectedW) fail(`凹陷顶板宽应为 ${expectedW}，实际 ${tp.size[0]}`);
  if (tp.size[1] !== expectedD) fail(`凹陷顶板深应为 ${expectedD}，实际 ${tp.size[1]}`);
  // 凹陷顶板坐落在顶框梁上（底面 y = H = 1200，与 overlay 同高，仅尺寸不同）
  const bottomY = tp.position[1] - tp.size[2] / 2;
  if (Math.abs(bottomY - 1200) > 0.01) fail(`凹陷顶板底面应落在 1200（梁顶面），实际 ${bottomY}`);
  // 对比 overlay 模式：overlay 顶板应宽 800（齐外缘）
  const overlay = generateFrame({
    width: 800, depth: 400, height: 1200, scene: 'diy-furniture', shelfCount: 1,
    sectionId: 'eu-3030', connectorId: 'corner-bracket-30', topPanelMode: 'overlay',
    topPanel: 'wood', shelfPanel: 'wood', bottomPanel: 'wood',
    loadKg: 20, loadType: 'distributed', highRisk: false, mobility: 'fixed',
    backPanel: 'none', leftPanel: 'none', rightPanel: 'none', brace: false,
  }, kb);
  const overlayTop = overlay.panels.filter((p) => p.mode === 'top-overlay');
  if (overlayTop.length !== 1 || overlayTop[0].size[0] !== 800) fail('overlay 顶板应宽 800（齐外缘）');
  if (!failures) ok(`顶板凹陷模式通过：recessed ${tp.size[0]}×${tp.size[1]} vs overlay ${overlayTop[0].size[0]}×${overlayTop[0].size[1]}`);
}

console.log(failures ? `\n== 7. 洞洞板侧挂语义（跳过） ==` : '== 7. 洞洞板侧挂语义 ==');
{
  // 洞洞板 + position=side → 应挂于左立面（leftPanel），而非背板
  const { intentToSpec } = await import('../src/engine/intent');
  const base = {
    productType: 'cabinet', dimensions: { width: 800, depth: 400, height: 1200, unit: 'mm' },
    load: { totalKg: 20, type: 'distributed' as const, description: '' }, scene: 'diy-furniture',
    mobility: 'fixed' as const, stiffnessNeed: 'normal', environment: { humid: null, outdoor: null, vibration: null },
    panels: [{ material: 'pegboard', position: 'side' }], appearance: { color: null, hiddenConnectorsPreferred: null },
    budgetSensitivity: 'unknown', layers: 2, _missing: [], _assumptions: [], _riskFlags: [],
  };
  const pegSide = intentToSpec(base, kb);
  if (pegSide.spec.leftPanel !== 'pegboard') fail(`洞洞板侧挂应为 leftPanel=pegboard，实际 ${pegSide.spec.leftPanel}`);
  if (pegSide.spec.backPanel === 'pegboard') fail('洞洞板侧挂不应同时设为背板');
  // 对比：非洞洞板材料 + side → 仍按背板处理
  const woodSide = intentToSpec({ ...base, panels: [{ material: 'wood', position: 'side' }] }, kb);
  if (woodSide.spec.backPanel !== 'wood') fail(`木板+side 应仍为背板，实际 ${woodSide.spec.backPanel}`);
  if (woodSide.spec.leftPanel === 'wood') fail('木板+side 不应挂侧立面');
  // 生成验证：左立面应有侧挂板
  const model = generateFrame(pegSide.spec, kb);
  const sidePanels = model.panels.filter((p) => p.mode === 'side-overlay' && p.position[0] < 0);
  if (sidePanels.length !== 1) fail(`应生成 1 块左侧挂板，实际 ${sidePanels.length}`);
  if (!failures) ok(`洞洞板侧挂通过：pegboard+side → leftPanel ✓；wood+side → backPanel ✓`);
}

console.log(failures ? `\n== 8. 装配预装约束（跳过） ==` : '== 8. 装配预装约束 ==');
{
  // corner-bracket-30 用 T 型螺母 → 装配说明应含预装提示
  const { buildAssemblySteps } = await import('../src/engine/assembly');
  const bracket = generateFrame({
    width: 800, depth: 400, height: 1200, scene: 'diy-furniture', shelfCount: 1,
    sectionId: 'eu-3030', connectorId: 'corner-bracket-30',
    topPanel: 'wood', shelfPanel: 'wood', bottomPanel: 'wood',
    loadKg: 20, loadType: 'distributed', highRisk: false, mobility: 'fixed',
    backPanel: 'none', leftPanel: 'none', rightPanel: 'none', brace: false,
  }, kb);
  const steps = buildAssemblySteps(bracket, kb);
  const allNotes = steps.map((s) => s.note).join(' ');
  if (!/滑块|T型螺母/.test(allNotes)) fail('角码连接件装配说明缺少滑块(T型螺母)预装提示');
  if (!/滑入槽内|预装/.test(allNotes)) fail('装配说明缺少"滑入槽内"预装动作描述');
  // 对比：不用 T 型螺母的连接件（如 anchor-30）不应有预装提示
  const anchor = generateFrame({
    width: 800, depth: 400, height: 1200, scene: 'diy-furniture', shelfCount: 1,
    sectionId: 'eu-3030', connectorId: 'anchor-30',
    topPanel: 'wood', shelfPanel: 'wood', bottomPanel: 'wood',
    loadKg: 20, loadType: 'distributed', highRisk: false, mobility: 'fixed',
    backPanel: 'none', leftPanel: 'none', rightPanel: 'none', brace: false,
  }, kb);
  const anchorSteps = buildAssemblySteps(anchor, kb);
  const anchorNotes = anchorSteps.map((s) => s.note).join(' ');
  if (/滑块.*滑入|预装.*螺母/.test(anchorNotes)) fail('锚式连接件(无 T 型螺母)不应有滑块预装提示');
  if (!failures) ok(`装配预装约束通过：角码含预装提示 ✓；锚式无多余提示 ✓`);
}

console.log(failures ? `\n== 9. 型材颜色维度（跳过） ==` : '== 9. 型材颜色维度 ==');
{
  // profileColor 应传递到生成结果（通过渲染层材质验证）
  const black = generateFrame({
    width: 600, depth: 400, height: 1000, scene: 'diy-furniture', shelfCount: 1,
    sectionId: 'eu-3030', connectorId: 'corner-bracket-30', profileColor: 'black',
    topPanel: 'none', shelfPanel: 'none', bottomPanel: 'none',
    loadKg: 15, loadType: 'distributed', highRisk: false, mobility: 'fixed',
    backPanel: 'none', leftPanel: 'none', rightPanel: 'none', brace: false,
  }, kb);
  // 颜色由 Viewer 材质消费，生成层验证字段透传即可
  if (black.spec.profileColor !== 'black') fail(`profileColor 应透传为 black，实际 ${black.spec.profileColor}`);
  // 三种颜色都能正常生成不报错
  for (const color of ['silver', 'black', 'gold'] as const) {
    const m = generateFrame({
      width: 600, depth: 400, height: 1000, scene: 'diy-furniture', shelfCount: 1,
      sectionId: 'eu-3030', connectorId: 'corner-bracket-30', profileColor: color,
      topPanel: 'none', shelfPanel: 'none', bottomPanel: 'none',
      loadKg: 15, loadType: 'distributed', highRisk: false, mobility: 'fixed',
      backPanel: 'none', leftPanel: 'none', rightPanel: 'none', brace: false,
    }, kb);
    if (m.status === 'invalid') fail(`${color} 颜色方案不应 invalid`);
  }
  if (!failures) ok('型材颜色维度通过：silver/black/gold 三档均生成 ✓');
}

console.log(failures ? `\n✖ 失败 ${failures} 项` : '\n✓ 全部通过');
process.exit(failures ? 1 : 0);
