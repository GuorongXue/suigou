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

  // ---- val-005 斜撑触发器（五触发，行家 verified；Phase0 不生成斜撑构件，给建议） ----
  const aspectW = spec.height / spec.width;
  const aspectD = spec.height / spec.depth;
  const braceTriggers: string[] = [];
  if (spec.height > 1000) braceTriggers.push('高度>1000mm');
  if (aspectW > 3 || aspectD > 3) braceTriggers.push(`高宽比${Math.max(aspectW, aspectD).toFixed(1)}>3`);
  if (spec.mobility === 'caster') braceTriggers.push('脚轮工况');
  if (braceTriggers.length > 0) {
    checks.push({
      level: 'warn', ruleId: 'val-005',
      message: `建议加斜撑/背板：${braceTriggers.join('、')}。晃不是型材不够强，是整体抗剪不足`,
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

  return checks;
}
