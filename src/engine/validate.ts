import type { KnowledgeBase } from '../knowledge/types';
import type { FrameModel, CheckResult } from './types';

/**
 * 校验管道（M3）：行家评审 v0.6 规则包的可执行子集。
 * 挠度限值/安全系数/屈曲规范等数据从 knowledge/rules/validation.yaml 读取。
 */
export function validateFrame(model: FrameModel, kb: KnowledgeBase): CheckResult[] {
  const checks: CheckResult[] = [];
  const { spec, members } = model;
  const sec = kb.sections.find((s) => s.section.id === spec.sectionId)!.section;
  const conn = kb.connectors.find((c) => c.connector.id === spec.connectorId)!.connector;

  const E = sec.mechanics.elasticModulus;          // MPa = N/mm²
  const I = sec.mechanics.momentOfInertia.ix;      // mm⁴
  const validation = kb.rules['validation'] as {
    deflectionLimits?: Record<string, string>;
  } | undefined;

  // 场景挠度限值（L/xxx），源：validation.yaml deflectionLimits（行家 verified）
  const limitStr = validation?.deflectionLimits?.[spec.scene] ?? 'L/300';
  const limitRatio = Number(limitStr.split('/')[1] ?? 300);

  // val-003 高风险场景：设计载荷 ×2.0 且挠度校验强制（行家 verified）
  const safetyFactor = spec.highRisk ? 2.0 : 1.0;
  // con-005 脚轮：越门槛冲击 2~3 倍静载取中值 2.5（行家 verified）
  const impactFactor = spec.mobility === 'caster' ? 2.5 : 1.0;
  const designLoadN = spec.loadKg * 9.81 * safetyFactor * impactFactor;
  if (spec.highRisk) {
    checks.push({ level: 'info', ruleId: 'val-003', message: '高风险场景：设计载荷已按安全系数 2.0 放大，挠度校验强制执行' });
  }
  if (spec.mobility === 'caster') {
    checks.push({ level: 'info', ruleId: 'con-005', message: '脚轮工况：设计载荷已按冲击系数 2.5 放大' });
  }

  // ---- val-002 挠度校验：顶面承载梁（取最长跨，载荷分到两根同向梁） ----
  const topBeams = members.filter((m) => m.role !== 'post' && Math.abs(m.position[1] - (spec.height - sec.size[0] / 2)) < 1);
  const longest = topBeams.reduce((a, b) => (b.length > a.length ? b : a), topBeams[0]);
  if (longest) {
    const L = longest.length;
    const P = designLoadN / 2;   // 两根同向梁分担
    const deflection = spec.loadType === 'concentrated'
      ? (P * L ** 3) / (48 * E * I)                 // 集中：δ=PL³/48EI
      : (5 * (P / L) * L ** 4) / (384 * E * I);     // 均布：δ=5qL⁴/384EI
    const limit = L / limitRatio;
    const affected = topBeams.filter((m) => m.length === L).map((m) => m.id);
    if (deflection > limit) {
      checks.push({
        level: 'error', ruleId: 'val-002', memberIds: affected,
        message: `挠度超限：估算 ${deflection.toFixed(2)}mm > 允许 ${limit.toFixed(2)}mm（${spec.scene} 档 L/${limitRatio}）。建议升级截面、缩短跨度或加中柱`,
      });
    } else if (deflection > limit * 0.7) {
      checks.push({
        level: 'warn', ruleId: 'val-002', memberIds: affected,
        message: `挠度接近限值：估算 ${deflection.toFixed(2)}mm / 允许 ${limit.toFixed(2)}mm（余量不足30%）`,
      });
    } else {
      checks.push({ level: 'pass', ruleId: 'val-002', message: `挠度校验通过：${deflection.toFixed(2)}mm ≤ ${limit.toFixed(2)}mm（L/${limitRatio}）` });
    }
  }

  // ---- val-004 立柱 Euler 屈曲（触发：柱高≥800；K=1.0；安全系数3，行家 verified） ----
  const posts = members.filter((m) => m.role === 'post');
  if (spec.height >= 800 && posts.length > 0) {
    const K = 1.0;
    const Pcr = (Math.PI ** 2 * E * I) / (K * spec.height) ** 2;
    const pAllow = Pcr / 3;
    const perPost = designLoadN / posts.length;
    if (perPost > pAllow) {
      checks.push({
        level: 'error', ruleId: 'val-004', memberIds: posts.map((p) => p.id),
        message: `立柱屈曲风险：单柱载荷 ${(perPost / 9.81).toFixed(0)}kg > 允许 ${(pAllow / 9.81).toFixed(0)}kg（Pcr/3）。建议升级截面或加横撑`,
      });
    } else {
      checks.push({ level: 'pass', ruleId: 'val-004', message: `屈曲校验通过：单柱 ${(perPost / 9.81).toFixed(0)}kg ≤ 允许 ${(pAllow / 9.81).toFixed(0)}kg` });
    }
  }

  // ---- val-postband 超高档（行家档位 postHeightBands：>2000 需加横撑，M5 req-009） ----
  if (spec.height > 2000) {
    checks.push({
      level: 'warn', ruleId: 'val-postband',
      message: `高度 ${spec.height}mm 超过 2000mm（行家档位）：建议中部加一圈横撑降低屈曲有效长度；当前隔板层横梁可兼作横撑，但层间距>1200mm 时仍需补撑`,
    });
  }

  // ---- val-workbench 工作台形态语义：档位来自 knowledge/archetypes.yaml computer-desk ----
  if (spec.scene === 'workbench') {
    const desk = kb.archetypes['computer-desk'];
    const hMin = desk?.overallHeightMm?.hutchMin ?? 1100;
    const hMax = desk?.overallHeightMm?.hutchMax ?? 1800;
    if (spec.height < hMin || spec.height > hMax) {
      checks.push({
        level: 'warn', ruleId: 'val-workbench-height',
        message: `工作台（含上层置物）建议总高 ${hMin}~${hMax}mm，当前 ${spec.height}mm 偏离常用区间；请确认是否仍是电脑桌语义`,
      });
    }
    const dMin = desk?.deskTopHeightMm?.min ?? 680;
    const dMax = desk?.deskTopHeightMm?.max ?? 800;
    if ((spec.workbenchDeskTopHeightMm ?? 740) < dMin || (spec.workbenchDeskTopHeightMm ?? 740) > dMax) {
      checks.push({
        level: 'warn', ruleId: 'val-workbench-desk-top',
        message: `主桌面高度建议 ${dMin}~${dMax}mm，当前 ${(spec.workbenchDeskTopHeightMm ?? 740)}mm 可能影响坐姿与键鼠操作舒适度`,
      });
    }
    const dpMin = desk?.depthMm?.min ?? 550;
    if (spec.depth < dpMin) {
      checks.push({
        level: 'warn', ruleId: 'val-workbench-depth',
        message: `桌面深度 ${spec.depth}mm < ${dpMin}mm：显示器距离过近伤眼、键盘无处安放（真实电脑桌深度≥550，舒适线600）`,
      });
    }
    const hasEnclosure = spec.bottomPanel !== 'none' || spec.doorPanel !== 'none'
      || (spec.backPanel !== 'none' && spec.backPanel !== 'pegboard')
      || spec.leftPanel !== 'none' || spec.rightPanel !== 'none';
    if (hasEnclosure) {
      checks.push({
        level: 'warn', ruleId: 'val-workbench-topology',
        message: '当前为工作台场景但存在底板/门板/全高侧背板，形态更接近柜体；若目标是电脑桌，建议保持开放式拓扑',
      });
    }
  }

  // ---- val-005 斜撑触发器（五触发，行家 verified）；已加斜撑/背板则通过 ----
  const hasBrace = spec.brace;
  // 围网是围护件非剪力板（16号评测：区分围护板与结构剪力板），不计入抗剪体系
  const shearPanel = (m: string) => m !== 'none' && m !== 'wire-mesh';
  const hasShear = shearPanel(spec.backPanel) || shearPanel(spec.leftPanel) || shearPanel(spec.rightPanel);
  const aspectW = spec.height / spec.width;
  const aspectD = spec.height / spec.depth;
  const braceTriggers: string[] = [];
  if (spec.height > 1000) braceTriggers.push('高度>1000mm');
  if (aspectW > 3 || aspectD > 3) braceTriggers.push(`高宽比${Math.max(aspectW, aspectD).toFixed(1)}>3`);
  if (spec.mobility === 'caster') braceTriggers.push('脚轮工况');
  if (spec.vibration) braceTriggers.push('设备振动工况');
  if (braceTriggers.length > 0 && !hasBrace && !hasShear) {
    checks.push({
      level: 'warn', ruleId: 'val-005',
      message: `建议加斜撑/背板：${braceTriggers.join('、')}。晃不是型材不够强，是整体抗剪不足`,
    });
  } else if (braceTriggers.length > 0) {
    checks.push({
      level: 'pass', ruleId: 'val-005',
      message: `斜撑触发条件存在（${braceTriggers.join('、')}），已配置${hasBrace ? '背面斜撑' : ''}${hasBrace && hasShear ? '+' : ''}${hasShear ? '侧围板抗剪' : ''}`,
    });
  }

  // ---- val-001 跨度阈值（源：selection.yaml 行家 verified 阈值；集中载荷按 sel-005 降档≈×0.75） ----
  const spanFactor = spec.loadType === 'concentrated' ? 0.75 : 1.0;
  const maxSpanTable: Record<string, (loadKg: number) => number> = {
    'eu-2020': (kg) => (kg <= 10 ? 800 : kg <= 20 ? 600 : 0),
    'eu-3030': (kg) => (kg <= 50 ? 1000 : kg <= 80 ? 800 : 0),
    'eu-4040-s8': () => 1500,
  };
  const maxBeam = Math.max(...members.filter((m) => m.role !== 'post').map((m) => m.length));
  const effLoad = spec.loadKg * safetyFactor * impactFactor;
  const allowSpan = (maxSpanTable[sec.id]?.(effLoad) ?? 0) * spanFactor;
  if (allowSpan === 0) {
    checks.push({
      level: 'error', ruleId: 'val-001',
      message: `${sec.name} 不适用于 ${effLoad.toFixed(0)}kg 设计载荷（超出选型规则上限），建议升级截面`,
    });
  } else if (maxBeam > allowSpan) {
    checks.push({
      level: 'warn', ruleId: 'val-001',
      message: `跨度 ${maxBeam}mm 超出 ${sec.name} 在 ${effLoad.toFixed(0)}kg 下的建议值 ${allowSpan.toFixed(0)}mm（sel 规则），建议升级或加中柱`,
    });
  }

  // ---- val-006 禁忌组合：内置连接件单独主承重 ----
  if (conn.loadRole === 'positioning-aesthetic') {
    checks.push({
      level: 'error', ruleId: 'val-006',
      message: `${conn.name} 仅限定位/外观用途，禁止单独主承重。建议改用角码/锚式/端攻，或与角码组合（con-006）`,
    });
  }

  // ---- val-008 连接强度匹配 ----
  if (effLoad > 50 && conn.strengthClass <= 2) {
    checks.push({
      level: 'warn', ruleId: 'val-008',
      message: `设计载荷 ${effLoad.toFixed(0)}kg 较大而连接件强度等级仅 ${conn.strengthClass}/5，建议升级连接方式`,
    });
  }

  // ---- val-lateral 侧向稳定性状态（16号评测：只验竖向挠度会制造"全绿=安全"假象） ----
  const slenderH = spec.height > 800 || spec.height / Math.min(spec.width, spec.depth) > 2;
  if (hasBrace || hasShear) {
    checks.push({
      level: 'pass', ruleId: 'val-lateral',
      message: `已有抗侧向体系（${[hasBrace ? '背面斜撑' : '', hasShear ? '侧围板' : ''].filter(Boolean).join('+')}），侧向刚度显著改善`,
    });
  } else {
    checks.push({
      level: slenderH ? 'warn' : 'info',
      ruleId: 'val-lateral',
      message: slenderH
        ? '侧向稳定性未验证：无斜撑/背板体系，竖向校验通过不代表不会晃。可勾选背面斜撑或添加侧围板'
        : '侧向稳定性未验证（矮框架风险较低）：本版本仅校验竖向挠度/屈曲',
    });
  }

  // ---- mat-* 材料接口规则（行家 verified，knowledge/rules/material-interface.yaml） ----
  for (const p of model.panels) {
    if (p.material === 'glass') {
      checks.push({ level: 'warn', ruleId: 'mat-glass',
        message: `玻璃板（${p.size[0]}×${p.size[1]}）必须钢化+边缘倒角，嵌槽加 EPDM 胶条，禁止直接压铝槽——风险最大的板材` });
    }
    if (p.material === 'acrylic' && Math.max(p.size[0], p.size[1]) > 500) {
      checks.push({ level: 'info', ruleId: 'mat-acrylic',
        message: `亚克力板跨度 ${Math.max(p.size[0], p.size[1]).toFixed(0)}mm > 500：已留 1.5mm 热胀间隙（锁死会开裂/鼓包）` });
    }
    if (p.material === 'wood') {
      checks.push({ level: 'info', ruleId: 'mat-wood',
        message: '木板吸湿胀缩：已按浮动安装预留间隙，禁止四边完全锁死' });
    }
  }

  return checks;
}
