/**
 * 选型建议引擎（M3）：selection.yaml / connection.yaml 行家 verified 规则的正向推荐。
 * 阈值与 validate.ts 同源（数据源 knowledge/rules/*.yaml）。
 */

const SERIES_ORDER = ['eu-2020', 'eu-3030', 'eu-4040-s8'];
const upgradeSeries = (id: string) =>
  SERIES_ORDER[Math.min(SERIES_ORDER.indexOf(id) + 1, SERIES_ORDER.length - 1)];

export interface SectionSelectInput {
  span: number;
  loadKg: number;
  loadType?: 'distributed' | 'concentrated';
  /** 高风险场景（水族/儿童/头顶）→ sel-004 升一级 */
  highRisk?: boolean;
  vibration?: boolean;
  precision?: boolean;
}

export interface SelectResult {
  use: string;
  ruleIds: string[];
  rationale: string;
}

export function selectSection(inp: SectionSelectInput): SelectResult {
  const ruleIds: string[] = [];
  let span = inp.span;
  if (inp.loadType === 'concentrated') {   // sel-005 集中载荷跨度降一档（≈阈值×0.75）
    span = inp.span / 0.75;
    ruleIds.push('sel-005');
  }

  let use: string;
  let rationale: string;
  if (span > 1200 || inp.loadKg > 80 || inp.vibration || inp.precision) {
    use = 'eu-4040-s8'; ruleIds.push('sel-003');
    rationale = '4040核心优势是刚度更大挠度更小';
  } else if (span <= 600 && inp.loadKg <= 20) {
    use = 'eu-2020'; ruleIds.push('sel-001');
    rationale = '短跨轻载，2020定位轻型框架';
  } else if (span <= 800 && inp.loadKg <= 10) {
    use = 'eu-2020'; ruleIds.push('sel-001b');
    rationale = '长跨极轻载，2020可用';
  } else if (span <= 1000 && inp.loadKg <= 50) {
    use = 'eu-3030'; ruleIds.push('sel-002');
    rationale = '行家闭眼边界1000@50均布';
  } else if (span <= 800 && inp.loadKg <= 80) {
    use = 'eu-3030'; ruleIds.push('sel-002b');
    rationale = '中跨中载主力系列';
  } else {
    use = 'eu-4040-s8'; ruleIds.push('sel-003');
    rationale = '超出3030适用域，保守升级';
  }

  if (inp.highRisk) {
    const upgraded = upgradeSeries(use);
    if (upgraded !== use) {
      use = upgraded; ruleIds.push('sel-004');
      rationale += '；高风险场景升一级';
    }
  }
  return { use, ruleIds, rationale };
}

export interface ConnectorSelectInput {
  joint?: 'corner-90' | 'end-to-face';
  load: 'light' | 'medium' | 'heavy';
  hiddenRequired?: boolean;
  mobility?: 'fixed' | 'caster';
  frameRole?: 'mainFrame' | 'general';
  alignedCoreHole?: boolean;
}

// strengthClass 升档路径：角码(3) → 锚式(4) → 端攻(5)
const CONN_UPGRADE: Record<string, string> = {
  'internal-30': 'corner-bracket-30',
  'corner-bracket-30': 'anchor-30',
  'anchor-30': 'screw-joint-30',
  'screw-joint-30': 'screw-joint-30',
};

export function selectConnector(inp: ConnectorSelectInput): SelectResult {
  const ruleIds: string[] = [];
  let use: string;
  let rationale: string;

  if (inp.joint === 'end-to-face' && inp.alignedCoreHole) {
    use = 'screw-joint-30'; ruleIds.push('con-004');
    rationale = '端面攻丝为四类中抗弯最强（轴向预紧）';
  } else if (inp.frameRole === 'mainFrame') {
    use = 'screw-joint-30'; ruleIds.push('con-007');
    rationale = '主框架惯例端面攻丝——刚度最高不易松';
  } else if (inp.load === 'heavy') {
    use = 'anchor-30'; ruleIds.push('con-003');
    rationale = '强度优先隐藏式';
  } else if (inp.hiddenRequired && inp.load === 'light') {
    use = 'internal-30'; ruleIds.push('con-002');
    rationale = '仅限外观定位与轻载辅助，禁止主承重';
  } else {
    use = 'corner-bracket-30'; ruleIds.push('con-001');
    rationale = '便宜免加工可拆，轻载首选';
  }

  if (inp.mobility === 'caster') {   // con-005 脚轮升一级
    const upgraded = CONN_UPGRADE[use] ?? use;
    if (upgraded !== use) {
      use = upgraded; ruleIds.push('con-005');
      rationale += '；脚轮工况连接升一级';
    }
  }
  return { use, ruleIds, rationale };
}
