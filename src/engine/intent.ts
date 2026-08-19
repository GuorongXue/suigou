import type { KnowledgeBase } from '../knowledge/types';
import type { FrameSpec } from './types';
import type { Extraction } from './extract';
import { selectSectionFixedPoint, selectConnector } from './select';

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
  let width = dim.width ?? 800;
  let depth = dim.depth ?? 400;
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

  const mobility: FrameSpec['mobility'] = (ex.mobility === 'caster' || ex.mobility === 'leveling-feet')
    ? ex.mobility : 'fixed';
  if (ex.mobility === 'unknown') {
    questions.push('底部怎么放？移动（脚轮，按 2.5 倍冲击设计）/ 调平（地脚，用于不平地面）/ 直接落地固定？');
  }

  const scene: FrameSpec['scene'] = ex.productType === 'workbench'
    ? 'workbench'
    : (() => {
      const s = SCENE_MAP[ex.scene] ?? 'diy-furniture';
      // 确定性防线：柜/架类产品绝不进 workbench（电脑桌）语义，LLM 场景误判时纠正
      return s === 'workbench' ? 'diy-furniture' : s;
    })();
  if (ex.productType !== 'workbench' && SCENE_MAP[ex.scene] === 'workbench') {
    assumptions.push('产品类型为柜/架，场景修正为家具（桌面操作台语义仅限桌类）');
  }
  if (ex.productType === 'workbench' && SCENE_MAP[ex.scene] !== 'workbench') {
    assumptions.push('产品类型为桌子（workbench），场景按电脑桌/工作台语义处理');
  }
  // archetype 判定：真实物件档位来自 knowledge/archetypes.yaml
  const hasDrawers = (ex.panels?.some((p) => p.position === 'drawer') ?? false);
  const archetype = scene === 'workbench' ? 'computer-desk'
    : ex.scene === 'aquarium' ? 'aquarium-stand'
    : ex.productType === 'shelf' ? 'storage-rack'
    : ex.productType === 'cabinet' && hasDrawers ? 'drawer-tower'
    : ex.productType === 'cabinet' && (dim.height ?? 0) >= 1800 ? 'wardrobe'
    : undefined;
  // 非桌类 archetype：缺失维度用真实档位 std 值替换泛化默认
  const arch = archetype ? kb.archetypes[archetype] : undefined;
  if (arch && archetype !== 'computer-desk') {
    const useStd = (label: '宽度' | '深度' | '高度', cur: number | null, std?: number) => {
      if (cur != null || std == null) return null;
      const i = assumptions.findIndex((a) => a.startsWith(`${label}未说明`));
      if (i >= 0) assumptions.splice(i, 1);
      assumptions.push(`${label}未说明，按${arch.name}常见档位 ${std}mm 假设`);
      return std;
    };
    const w = useStd('宽度', dim.width, arch.widthMm?.std);
    const d = useStd('深度', dim.depth, arch.depthMm?.std);
    const h = useStd('高度', dim.height, archetype === 'aquarium-stand' ? (arch.standHeightMm as { std?: number } | undefined)?.std : arch.overallHeightMm?.std);
    if (w != null) width = w;
    if (d != null) depth = d;
    if (h != null) height = h;
  }
  if (scene === 'workbench') {
    const deskDepthMin = desk?.depthMm?.min ?? 550;
    if (dim.depth == null) {
      depth = desk?.depthMm?.std ?? 650;
      const i = assumptions.findIndex((a) => a.includes('深度未说明'));
      if (i >= 0) assumptions.splice(i, 1);
      assumptions.push(`电脑桌深度未说明，按舒适深度 ${depth}mm 假设`);
    } else if (depth < deskDepthMin) {
      assumptions.push(`电脑桌深度 ${depth}mm 小于可用下限 ${deskDepthMin}mm，已调整为 ${deskDepthMin}mm`);
      depth = deskDepthMin;
    }
    const rawHeight = height;
    if (dim.height == null) {
      // 高度未说明：单层=纯桌面高；多层/上方置物=hutch 形态总高（archetypes）
      const wantsHutch = (ex.layers ?? 1) >= 2;
      height = wantsHutch ? Math.round(((WORKBENCH_HEIGHT_MIN + WORKBENCH_HEIGHT_MAX) / 2) / 10) * 10 : (desk?.deskTopHeightMm?.std ?? 740);
      const i = assumptions.findIndex((a) => a.includes('高度未说明'));
      if (i >= 0) assumptions.splice(i, 1);
      assumptions.push(wantsHutch
        ? `高度未说明：电脑桌带上层置物架，按常见总高 ${height}mm 假设（桌面 ${desk?.deskTopHeightMm?.std ?? 740} + 上层置物）`
        : `高度未说明：纯桌面按标准桌高 ${height}mm 假设`);
    } else if ((ex.layers ?? 1) >= 2 && height < WORKBENCH_HEIGHT_MIN) {
      height = WORKBENCH_HEIGHT_MIN;
      assumptions.push(`高度 ${rawHeight}mm 不够容纳桌面+上层置物，已按 hutch 最小总高 ${height}mm 调整`);
    } else if (height > WORKBENCH_HEIGHT_MAX) {
      height = WORKBENCH_HEIGHT_MAX;
      assumptions.push(`工作台高度 ${rawHeight}mm 超出桌架语义区间，已调整为 ${height}mm`);
    }
  }

  // 选型引擎定截面（固定点：梁长=总尺寸−2×截面尺寸，截面越大净跨越小，迭代至收敛）
  const secSel = selectSectionFixedPoint({
    width,
    depth,
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

  if (scene === 'workbench') {
    assumptions.push('工作台语义至少保留 1 层桌面隔板，已自动补齐');
  }
  const workbenchLowerZoneRatio = scene === 'workbench' ? 0.62 : undefined;
  const workbenchDeskTopHeightMm = scene === 'workbench' ? (desk?.deskTopHeightMm?.std ?? 740) : undefined;
  const workbenchUpperShelfDepthRatio = scene === 'workbench' ? (desk?.upperShelfDepthRatio?.std ?? 0.55) : undefined;
  if (scene === 'workbench') {
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
  const POS_NAME: Record<string, string> = { top: '顶面板', shelf: '隔板', bottom: '底板', side: '侧板', door: '门板', drawer: '抽屉' };
  let topPanel: FrameSpec['topPanel'] = 'none';
  let shelfPanel: FrameSpec['topPanel'] = 'none';
  let bottomPanel: FrameSpec['topPanel'] = 'none';
  let doorPanel: FrameSpec['topPanel'] = 'none';
  let backPanel: FrameSpec['topPanel'] = 'none';
  let leftPanel: FrameSpec['topPanel'] = 'none';
  let drawerCount = 0;
  for (const p of ex.panels ?? []) {
    if (p.material === 'none') continue;
    // 抽屉不再降级（随构/21 案例拓扑已支持）：每条 drawer 记录计入层数
    if (p.position === 'drawer' && scene !== 'workbench') {
      drawerCount += 1;
      continue;
    }
    const mat = MAT_MAP[p.material];
    // 电脑桌语义：洞洞板是立面收纳件（背板位），不是桌面/隔板材质
    if (scene === 'workbench' && p.material === 'pegboard') {
      backPanel = 'pegboard';
      assumptions.push('洞洞板：按立面收纳背板处理（电脑桌常见形态）');
      continue;
    }
    // 未收录材质（海洋板等）全场景兜底木板，不再降级丢弃（门板除外，需精确材质）
    const effMat = mat ?? (['top', 'shelf', 'side', 'bottom'].includes(p.position) ? 'wood' as const : undefined);
    if (!mat && effMat) {
      assumptions.push(`${POS_NAME[p.position] ?? p.position}材质未收录，按木板（多层实木）处理`);
    }
    if (p.position === 'top' && effMat) {
      topPanel = effMat;
      assumptions.push(`顶面板：${MAT_NAME[p.material]}（材料接口规则 mat-* 自动附安装方式）`);
    } else if (p.position === 'shelf' && effMat) {
      shelfPanel = effMat;
      assumptions.push(`隔板：${MAT_NAME[p.material]}`);
    } else if (p.position === 'bottom' && effMat) {
      bottomPanel = effMat;
      assumptions.push(`底板：${MAT_NAME[p.material]}（搭底框梁）`);
    } else if (p.position === 'door' && mat) {
      doorPanel = mat;
      assumptions.push(`门板：${MAT_NAME[p.material]}（正面单开，槽装合页+磁吸+把手）`);
    } else if (p.position === 'side' && effMat) {
      // 洞洞板：侧挂语义（工具墙/工具柜常见形态），挂于左立面；其余材料按背板处理
      if (p.material === 'pegboard') {
        leftPanel = effMat;
        assumptions.push('洞洞板：侧挂于左立面（工具墙收纳语义，案例高频）');
      } else {
        backPanel = effMat;
        assumptions.push(`侧/背板：${MAT_NAME[p.material]}（按背板处理，兼作抗侧向体系）`);
      }
    } else {
      unsupported.push(`${POS_NAME[p.position] ?? p.position}（${MAT_NAME[p.material] ?? p.material}）`);
    }
  }
  if (scene === 'workbench') {
    if (shelfPanel === 'none') {
      shelfPanel = 'wood';
      assumptions.push('工作台语义默认补齐主桌面板：隔板材质未指定时按木板处理');
    }
    if (height >= WORKBENCH_HEIGHT_MIN && topPanel === 'none') {
      topPanel = shelfPanel;
      assumptions.push('带上架电脑桌默认补齐后靠浅层置物板（与主桌面同材质）');
    }
    // 开放式约束：门板/底板禁止；背板仅保留洞洞板（立面收纳）
    const hadEnclosure = doorPanel !== 'none' || bottomPanel !== 'none' || (backPanel !== 'none' && backPanel !== 'pegboard');
    if (hadEnclosure) {
      assumptions.push('工作台语义默认开放式：门板/实体背板/底板已关闭（避免生成柜体形态）');
      unsupported.push('工作台默认开放式封板（门板/实体背板/底板）');
    }
    doorPanel = 'none';
    if (backPanel !== 'pegboard') backPanel = 'none';
    bottomPanel = 'none';
  }
  if (drawerCount > 0) {
    assumptions.push(`抽屉×${drawerCount}：成品抽屉盒+反弹轨道方案（无拉手，案例实证拓扑）`);
  }
  // 数量词联动：有 drawer→抽屉塔（shelfCount=0）；cabinet 无 drawer 但 layers>1→layers 作抽屉数
  let drawerCountFinal = drawerCount;
  const isCabinet = ex.productType === 'cabinet' || ex.productType === 'enclosure';
  if (drawerCount === 0 && (ex.layers ?? 0) > 1 && scene !== 'workbench' && isCabinet) {
    drawerCountFinal = Math.min(5, ex.layers ?? 0);
    assumptions.push(`层数 ${ex.layers} 按抽屉塔处理（${drawerCountFinal} 层抽屉）`);
  }
  // 抽屉柜层数未说明：按高度÷节距（案例档位 160~230 取 205）估计，避免"抽屉柜"只出 1 层
  if (drawerCount === 1 && ex.layers == null && isCabinet) {
    const est = Math.max(1, Math.min(5, Math.round(height / 205)));
    if (est > drawerCountFinal) {
      drawerCountFinal = est;
      assumptions.push(`抽屉层数未说明，按总高 ${height}mm ÷ 节距≈205 估 ${est} 层（可改）`);
    }
  }
  // 抽屉+柜门组合 → 中柱双列分区（工具柜实证拓扑，锚点①）：左列抽屉，右列带门柜体
  let centerColumn: FrameSpec['centerColumn'];
  const doorCount = (ex.panels ?? []).filter((p) => p.position === 'door' && p.material !== 'none').length;
  if (drawerCountFinal > 0 && doorCount > 0 && isCabinet) {
    centerColumn = {
      offsetRatio: 0.4,
      left: { type: 'drawer', count: Math.min(5, drawerCountFinal), kind: 'ready-made' },
      right: { type: 'cabinet', count: 1 },
    };
    assumptions.push(`抽屉×${drawerCountFinal}+柜门 → 中柱双列分区（左列抽屉/右列柜门，工具柜实证拓扑）`);
    drawerCountFinal = 0;   // 抽屉由分区列生成，避免普通抽屉塔双重计数
    doorPanel = 'none';     // 门由 cabinet 列生成
  }
  const shelfCount = drawerCountFinal > 0 ? 0
    : (ex.layers != null ? Math.max(0, Math.min(4, ex.layers - 1)) : 1);
  if (ex.layers == null && drawerCountFinal === 0) assumptions.push('层数未说明，按 1 层隔板假设');
  const shelfCountAdj = centerColumn ? 0 : shelfCount;
  const deskShelfCount = scene === 'workbench' ? Math.max(1, shelfCountAdj) : shelfCountAdj;
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
      archetype,
      workbenchLowerZoneRatio, workbenchDeskTopHeightMm, workbenchUpperShelfDepthRatio,
      loadKg, loadType, scene, highRisk, mobility, vibration,
      topPanel, shelfPanel, bottomPanel, doorPanel,
      backPanel, leftPanel, rightPanel: 'none',
      drawerCount: drawerCountFinal > 0 ? Math.min(5, drawerCountFinal) : undefined,
      drawerKind: drawerCountFinal > 0 ? 'ready-made' : undefined,
      centerColumn,
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
