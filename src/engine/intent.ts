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
  // 真实物件档位来自 knowledge/archetypes.yaml（公开资料采集）
  const desk = kb.archetypes['computer-desk'];
  const WORKBENCH_HEIGHT_MIN = desk?.overallHeightMm?.hutchMin ?? 1100;
  const WORKBENCH_HEIGHT_MAX = desk?.overallHeightMm?.hutchMax ?? 1800;

  const dim = ex.dimensions ?? { width: null, depth: null, height: null };
  const width = dim.width ?? 800;
  const depth = dim.depth ?? 400;
  let height = dim.height ?? 750;
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
  if (scene === 'workbench') {
    const rawHeight = height;
    height = Math.min(WORKBENCH_HEIGHT_MAX, Math.max(WORKBENCH_HEIGHT_MIN, height));
    if (rawHeight !== height) {
      assumptions.push(`工作台高度 ${rawHeight}mm 超出桌面语义区间 ${WORKBENCH_HEIGHT_MIN}~${WORKBENCH_HEIGHT_MAX}mm，已按桌面语义调整为 ${height}mm`);
    }
  }

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
  let connectorId = kb.connectors.some((c) => c.connector.id === connSel.use) ? connSel.use : 'corner-bracket-30';
  assumptions.push(`连接选型：${connectorId}（${connSel.ruleIds.join('+')}，${connSel.rationale}）`);
  // 兼容回退（M5 req-008）：截面升级后若连接件不适配，改用该截面兼容的最强主承重件
  const secDef = kb.sections.find((s) => s.section.id === sectionId)!.section;
  const connDef = kb.connectors.find((c) => c.connector.id === connectorId)?.connector;
  if (connDef && (!connDef.compatible.series.includes(sectionId) || !connDef.compatible.slotWidths.includes(secDef.slot.width))) {
    const fallback = kb.connectors
      .filter((c) => c.connector.compatible.series.includes(sectionId)
        && c.connector.compatible.slotWidths.includes(secDef.slot.width)
        && c.connector.loadRole === 'primary')
      .sort((a, b) => b.connector.strengthClass - a.connector.strengthClass)[0];
    if (fallback) {
      assumptions.push(`连接件兼容回退：${connectorId} 不适配 ${sectionId}，改用 ${fallback.connector.name}`);
      connectorId = fallback.connector.id;
    }
  }

  const shelfCount = ex.layers != null ? Math.max(0, Math.min(4, ex.layers - 1)) : 1;
  if (ex.layers == null) assumptions.push('层数未说明，按 1 层隔板假设');
  const deskShelfCount = scene === 'workbench' ? Math.max(1, shelfCount) : shelfCount;
  if (scene === 'workbench' && shelfCount === 0) {
    assumptions.push('工作台语义至少保留 1 层桌面隔板，已自动补齐');
  }
  const workbenchLowerZoneRatio = scene === 'workbench' ? 0.62 : undefined;
  const workbenchDeskTopHeightMm = scene === 'workbench' ? (desk?.deskTopHeightMm?.std ?? 740) : undefined;
  const workbenchUpperShelfDepthRatio = scene === 'workbench' ? (desk?.upperShelfDepthRatio?.std ?? 0.55) : undefined;
  if (scene === 'workbench' && deskShelfCount > 0) {
    assumptions.push('工作台人体工学默认：下层净空更大、上层置物搁板更浅');
  }

  // 预算敏感透传（M5 req-009）：仅记录不改选型——安全规则优先于预算（行家仲裁 safety>budget）
  if (ex.budgetSensitivity === 'high') {
    assumptions.push('预算敏感：已按满足安全规则的最经济选型；如需进一步降价可减层/缩尺寸（安全优先于预算）');
  }

  // 板材映射：top→顶面板，shelf→隔板；门/侧板/抽屉等诚实降级（绝不静默丢弃）
  const unsupported: string[] = [];
  const MAT_MAP: Record<string, FrameSpec['topPanel']> = {
    wood: 'wood', glass: 'glass', acrylic: 'acrylic', pegboard: 'pegboard',
  };
  const MAT_NAME: Record<string, string> = { wood: '木板', glass: '玻璃', acrylic: '亚克力', pegboard: '洞洞板', other: '板材' };
  const POS_NAME: Record<string, string> = { side: '侧板', door: '门板', drawer: '抽屉' };
  let topPanel: FrameSpec['topPanel'] = 'none';
  let shelfPanel: FrameSpec['topPanel'] = 'none';
  let bottomPanel: FrameSpec['topPanel'] = 'none';
  let doorPanel: FrameSpec['topPanel'] = 'none';
  let backPanel: FrameSpec['topPanel'] = 'none';
  for (const p of ex.panels ?? []) {
    if (p.material === 'none') continue;
    const mat = MAT_MAP[p.material];
    if (p.position === 'top' && mat) {
      topPanel = mat;
      assumptions.push(`顶面板：${MAT_NAME[p.material]}（材料接口规则 mat-* 自动附安装方式）`);
    } else if (p.position === 'shelf' && mat) {
      shelfPanel = mat;
      assumptions.push(`隔板：${MAT_NAME[p.material]}`);
    } else if (p.position === 'bottom' && mat) {
      bottomPanel = mat;
      assumptions.push(`底板：${MAT_NAME[p.material]}（搭底框梁）`);
    } else if (p.position === 'door' && mat) {
      doorPanel = mat;
      assumptions.push(`门板：${MAT_NAME[p.material]}（正面单开，槽装合页+磁吸+把手）`);
    } else if (p.position === 'side' && mat) {
      backPanel = mat;
      assumptions.push(`侧/背板：${MAT_NAME[p.material]}（按背板处理，兼作抗侧向体系）`);
    } else {
      unsupported.push(`${POS_NAME[p.position] ?? p.position}（${MAT_NAME[p.material] ?? p.material}）`);
    }
  }
  if (scene === 'workbench') {
    if (shelfPanel === 'none') {
      shelfPanel = 'wood';
      assumptions.push('工作台语义默认补齐主桌面板：隔板材质未指定时按木板处理');
    }
    const hadEnclosure = doorPanel !== 'none' || backPanel !== 'none' || bottomPanel !== 'none';
    if (hadEnclosure) {
      assumptions.push('工作台语义默认开放式：门板/全高侧背板/底板已关闭（避免生成柜体形态）');
      unsupported.push('工作台默认开放式封板（门板/全高侧背板/底板）');
    }
    doorPanel = 'none';
    backPanel = 'none';
    bottomPanel = 'none';
  }
  // productType 超纲 / 附件类需求降级
  if (ex.productType === 'other') {
    unsupported.push('非框架类主体结构');
  }
  // 去重并合并计数（"抽屉×2"而非重复两行）
  const unsupCount = new Map<string, number>();
  for (const u of unsupported) unsupCount.set(u, (unsupCount.get(u) ?? 0) + 1);
  const unsupportedDedup = [...unsupCount.entries()].map(([u, c]) => (c > 1 ? `${u}×${c}` : u));

  // 追问补充：来自抽取的 _missing（截取前2条，避免问题轰炸）
  for (const m of (ex._missing ?? []).slice(0, 2)) {
    if (!questions.some((q) => q.includes(m.slice(0, 4)))) questions.push(`请确认：${m}`);
  }

  // 振动工况双源（M5 req-002）：environment.vibration 或 LLM 将其归入 _riskFlags
  const vibration = (ex.environment?.vibration ?? false) || riskFlags.some((f) => /vibration|振动/.test(f));

  return {
    spec: {
      width: clamp(width, assumptions, '宽'), depth: clamp(depth, assumptions, '深'), height: clamp(height, assumptions, '高'),
      sectionId, connectorId, shelfCount: deskShelfCount,
      workbenchLowerZoneRatio, workbenchDeskTopHeightMm, workbenchUpperShelfDepthRatio,
      loadKg, loadType, scene, highRisk, mobility, vibration,
      topPanel, shelfPanel, bottomPanel, doorPanel,
      backPanel, leftPanel: 'none', rightPanel: 'none',
      brace: false,
    },
    assumptions,
    questions: questions.slice(0, 3),
    riskFlags,
    unsupported: unsupportedDedup,
  };
}

// Phase 0 生成域 200~3000mm；超限截断必须显式记录（M5 req-009：2400 被静默截成 2000 是几何错误）
const clamp = (v: number, assumptions?: string[], label?: string) => {
  const c = Math.min(3000, Math.max(200, Math.round(v / 10) * 10));
  if (assumptions && label && c !== Math.round(v / 10) * 10) {
    assumptions.push(`${label}度 ${v}mm 超出支持范围 200~3000，已截断为 ${c}mm，请确认`);
  }
  return c;
};
