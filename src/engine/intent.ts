import type { KnowledgeBase } from '../knowledge/types';
import type { FrameSpec } from './types';
import type { Extraction } from './extract';
import { selectSection, selectConnector } from './select';

/** 抽取结果 → FrameSpec 映射结果 */
export interface IntentResult {
  spec: FrameSpec;
  /** 采用的假设（含默认值补齐），展示给用户 */
  assumptions: string[];
  /** 需要追问的问题（安全优先，一次一问在 UI 层控制） */
  questions: string[];
  riskFlags: string[];
  /** 诚实降级：听到但当前版本做不了的需求，绝不静默丢弃 */
  unsupported: string[];
}

const SCENE_MAP: Record<string, FrameSpec['scene']> = {
  'diy-furniture': 'diy-furniture',
  workbench: 'workbench',
  'industrial-rack': 'industrial-rack',
  automation: 'industrial-rack',
  precision: 'precision',
  optical: 'precision',
  aquarium: 'industrial-rack',   // 挠度档用机架级；高风险由 highRisk 承担
  child: 'diy-furniture',
  outdoor: 'diy-furniture',
  unknown: 'diy-furniture',
};

const HIGH_RISK_SCENES = ['aquarium', 'child', 'overhead'];

/** 抽取 → 生成参数：缺失走保守默认+假设记录，选型引擎自动定截面/连接件 */
export function intentToSpec(ex: Extraction, kb: KnowledgeBase): IntentResult {
  const assumptions = [...(ex._assumptions ?? [])];
  const questions: string[] = [];
  const riskFlags = [...(ex._riskFlags ?? [])];

  const dim = ex.dimensions ?? { width: null, depth: null, height: null };
  const width = dim.width ?? 800;
  const depth = dim.depth ?? 400;
  const height = dim.height ?? 750;
  if (dim.width == null) assumptions.push('宽度未说明，按 800mm 假设');
  if (dim.depth == null) assumptions.push('深度未说明，按 400mm 假设');
  if (dim.height == null) assumptions.push('高度未说明，按 750mm 假设');

  const highRisk = HIGH_RISK_SCENES.includes(ex.scene) || riskFlags.length > 0;

  let loadKg = ex.load?.totalKg ?? null;
  if (loadKg == null) {
    loadKg = 30;
    assumptions.push('载荷未明确，按 30kg 保守假设');
    // 追问策略：安全优先——高风险场景强制问载荷
    questions.push(highRisk
      ? '⚠ 高风险场景必须确认：架子上实际会放多重的东西（kg）？'
      : '架子大概要承重多少公斤？（影响选型，默认按 30kg 算）');
  }
  const loadType = ex.load?.type === 'concentrated' ? 'concentrated' : 'distributed';
  if (ex.load?.type === 'unknown') assumptions.push('载荷分布不明，按均布假设');

  const mobility: FrameSpec['mobility'] = ex.mobility === 'caster' ? 'caster' : 'fixed';
  if (ex.mobility === 'unknown') {
    questions.push('需要带脚轮可以移动吗？（脚轮会按 2.5 倍冲击载荷设计）');
  }

  const scene = SCENE_MAP[ex.scene] ?? 'diy-furniture';

  // 选型引擎定截面（跨度=较大水平尺寸的净跨近似）
  const secSel = selectSection({
    span: Math.max(width, depth) - 60,
    loadKg,
    loadType,
    highRisk,
    vibration: ex.environment?.vibration ?? false,
    precision: ex.stiffnessNeed === 'high',
  });
  const sectionId = kb.sections.some((s) => s.section.id === secSel.use) ? secSel.use : 'eu-3030';
  assumptions.push(`截面选型：${sectionId}（${secSel.ruleIds.join('+')}，${secSel.rationale}）`);

  const connSel = selectConnector({
    joint: 'corner-90',
    load: loadKg > 60 ? 'heavy' : 'light',
    hiddenRequired: ex.appearance?.hiddenConnectorsPreferred ?? false,
    mobility,
  });
  const connectorId = kb.connectors.some((c) => c.connector.id === connSel.use) ? connSel.use : 'corner-bracket-30';
  assumptions.push(`连接选型：${connectorId}（${connSel.ruleIds.join('+')}，${connSel.rationale}）`);

  const shelfCount = ex.layers != null ? Math.max(0, Math.min(4, ex.layers - 1)) : 1;
  if (ex.layers == null) assumptions.push('层数未说明，按 1 层隔板假设');

  // 板材映射：top→顶面板，shelf→隔板；门/侧板/抽屉等诚实降级（绝不静默丢弃）
  const unsupported: string[] = [];
  const MAT_MAP: Record<string, FrameSpec['topPanel']> = {
    wood: 'wood', glass: 'glass', acrylic: 'acrylic', pegboard: 'pegboard',
  };
  const MAT_NAME: Record<string, string> = { wood: '木板', glass: '玻璃', acrylic: '亚克力', pegboard: '洞洞板', other: '板材' };
  const POS_NAME: Record<string, string> = { side: '侧板', door: '门板', drawer: '抽屉' };
  let topPanel: FrameSpec['topPanel'] = 'none';
  let shelfPanel: FrameSpec['topPanel'] = 'none';
  for (const p of ex.panels ?? []) {
    if (p.material === 'none') continue;
    const mat = MAT_MAP[p.material];
    if (p.position === 'top' && mat) {
      topPanel = mat;
      assumptions.push(`顶面板：${MAT_NAME[p.material]}（材料接口规则 mat-* 自动附安装方式）`);
    } else if (p.position === 'shelf' && mat) {
      shelfPanel = mat;
      assumptions.push(`隔板：${MAT_NAME[p.material]}`);
    } else {
      unsupported.push(`${POS_NAME[p.position] ?? p.position}（${MAT_NAME[p.material] ?? p.material}）`);
    }
  }
  // productType 超纲 / 附件类需求降级
  if (ex.productType === 'other') {
    unsupported.push('非框架类主体结构');
  }

  // 追问补充：来自抽取的 _missing（截取前2条，避免问题轰炸）
  for (const m of (ex._missing ?? []).slice(0, 2)) {
    if (!questions.some((q) => q.includes(m.slice(0, 4)))) questions.push(`请确认：${m}`);
  }

  return {
    spec: {
      width: clamp(width), depth: clamp(depth), height: clamp(height),
      sectionId, connectorId, shelfCount,
      loadKg, loadType, scene, highRisk, mobility,
      topPanel, shelfPanel,
    },
    assumptions,
    questions: questions.slice(0, 3),
    riskFlags,
    unsupported,
  };
}

const clamp = (v: number) => Math.min(2000, Math.max(200, Math.round(v / 10) * 10));
