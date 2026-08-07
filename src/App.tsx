import { useEffect, useMemo, useState } from 'react';
import { loadKnowledgeBase } from './knowledge/loader';
import { generateFrame } from './engine/generate';
import { selectSection } from './engine/select';
import { runGolden } from './engine/golden';
import { extractIntent, getApiKey, setApiKey } from './engine/extract';
import { intentToSpec, type IntentResult } from './engine/intent';
import { nestCutList } from './engine/nesting';
import { buildAssemblySteps } from './engine/assembly';
import type { FrameSpec } from './engine/types';
import { Viewer, type RenderMember, type RenderJoint, type RenderMachining, type RenderPanel, type RenderAccessory, type RenderMountPoint, type RenderDim, type RenderBubble, type Selection } from './viewer/Viewer';
import { PartDrawing } from './components/PartDrawing';

type ViewMode = 'appearance' | 'structure' | 'drawing';

interface ChatMsg {
  role: 'user' | 'ai' | 'system';
  text: string;
}

const FIELD_NAMES: Record<string, string> = {
  width: '总宽', depth: '总深', height: '总高', shelfCount: '隔板层数', loadKg: '载荷',
  loadType: '载荷分布', scene: '场景', highRisk: '高风险', mobility: '移动性',
  workbenchLowerZoneRatio: '下层净空占比', workbenchUpperShelfDepthRatio: '上层浅搁板深度占比',
  sectionId: '截面', connectorId: '连接件', topPanel: '顶面板', shelfPanel: '隔板材质', bottomPanel: '底板', doorPanel: '门板',
};

// 手动锁定字段 → 抽取字段路径（_explicitFields 解锁依据，9.4.1）
const FIELD_TO_PATH: Record<string, string> = {
  width: 'dimensions.width', depth: 'dimensions.depth', height: 'dimensions.height',
  loadKg: 'load.totalKg', loadType: 'load.type', mobility: 'mobility',
  shelfCount: 'layers', scene: 'scene', highRisk: 'scene',
  topPanel: 'panels', shelfPanel: 'panels',
};

const DRAFT_KEY = 'suigou_draft_v1';
const WORKBENCH_HEIGHT_MIN = 680;
const WORKBENCH_HEIGHT_MAX = 900;
interface Draft {
  spec: FrameSpec;
  chat: ChatMsg[];
  manual: [string, string][];
  unsupported: string[];
}
const normalizeWorkbenchSpec = (s: FrameSpec): FrameSpec => {
  const next = { ...s };
  if (next.scene === 'workbench') {
    next.height = Math.min(WORKBENCH_HEIGHT_MAX, Math.max(WORKBENCH_HEIGHT_MIN, next.height));
    next.workbenchLowerZoneRatio = next.workbenchLowerZoneRatio ?? 0.62;
    next.workbenchUpperShelfDepthRatio = next.workbenchUpperShelfDepthRatio ?? 0.58;
    next.doorPanel = 'none';
    next.backPanel = 'none';
    next.leftPanel = 'none';
    next.rightPanel = 'none';
  }
  return next;
};
const loadDraft = (): Draft | null => {
  try { return JSON.parse(localStorage.getItem(DRAFT_KEY) ?? 'null'); } catch { return null; }
};

export default function App() {
  const kb = useMemo(() => loadKnowledgeBase(), []);
  const draft = useMemo(loadDraft, []);
  const [spec, setSpec] = useState<FrameSpec>(draft?.spec ? normalizeWorkbenchSpec({
    ...draft.spec,
    backPanel: draft.spec.backPanel ?? 'none',
    leftPanel: draft.spec.leftPanel ?? 'none',
    rightPanel: draft.spec.rightPanel ?? 'none',
    bottomPanel: draft.spec.bottomPanel ?? 'none',
    brace: draft.spec.brace ?? false,
  }) : {
    width: 700,
    depth: 400,
    height: 720,
    sectionId: 'eu-3030',
    connectorId: 'corner-bracket-30',
    shelfCount: 1,
    loadKg: 30,
    loadType: 'distributed',
    scene: 'workbench',
    highRisk: false,
    mobility: 'fixed',
    topPanel: 'none',
    shelfPanel: 'none',
    workbenchLowerZoneRatio: 0.62,
    workbenchUpperShelfDepthRatio: 0.58,
    bottomPanel: 'none',
    backPanel: 'none',
    leftPanel: 'none',
    rightPanel: 'none',
    brace: false,
  });
  const [selection, setSelection] = useState<Selection | null>(null);
  const [mode, setMode] = useState<ViewMode>('appearance');
  // 意图层状态（M4）：对话与滑杆共享同一方案状态（单一事实源）
  const [aiText, setAiText] = useState('');
  const [aiBusy, setAiBusy] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<IntentResult | null>(null);
  const [chat, setChat] = useState<ChatMsg[]>(draft?.chat ?? []);
  const [manualChanges, setManualChanges] = useState<Map<string, string>>(new Map(draft?.manual ?? []));
  const [unsupportedSaved, setUnsupportedSaved] = useState<string[]>(draft?.unsupported ?? []);
  const [hasKey, setHasKey] = useState(() => !!getApiKey());

  // 草稿持久化（9.4.3："已记录"必须真实——刷新不丢）
  useEffect(() => {
    const unsupported = aiResult?.unsupported ?? unsupportedSaved;
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ spec, chat, manual: [...manualChanges], unsupported } satisfies Draft));
  }, [spec, chat, manualChanges, aiResult, unsupportedSaved]);

  const resetDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
    location.reload();
  };

  const runIntent = async () => {
    if (!aiText.trim() || aiBusy) return;
    const userMsg = aiText.trim();
    setAiBusy(true);
    setAiError(null);
    setChat((c) => [...c, { role: 'user', text: userMsg }]);
    setAiText('');
    try {
      // 9.4.2：追问与回答成对传递（assistant/user 轮次），模型能理解"要/不要/50公斤"指代什么
      const history = chat.slice(-6).map((m) => ({
        role: (m.role === 'ai' ? 'assistant' : 'user') as 'assistant' | 'user',
        content: m.text,
      }));
      // 当前方案状态作为结构化 JSON 上下文（非自然语言备注）
      const stateJson = aiResult ? `\n[当前方案参数] ${JSON.stringify({
        width: spec.width, depth: spec.depth, height: spec.height,
        loadKg: spec.loadKg, loadType: spec.loadType, mobility: spec.mobility,
        layers: spec.shelfCount + 1, topPanel: spec.topPanel, shelfPanel: spec.shelfPanel,
        workbenchLowerZoneRatio: spec.workbenchLowerZoneRatio,
        workbenchUpperShelfDepthRatio: spec.workbenchUpperShelfDepthRatio,
      })}` : '';
      const manualNote = manualChanges.size > 0
        ? `\n[用户手动锁定项，除非本轮明确改口否则保持：${[...manualChanges.values()].join('，')}]`
        : '';
      const extraction = await extractIntent(userMsg + stateJson + manualNote, history);
      const result = intentToSpec(extraction, kb);
      // 9.4.1：锁定解锁由模型返回的 _explicitFields 决定，不再用数字正则
      const explicit = new Set(extraction._explicitFields ?? []);
      const guarded = { ...result.spec };
      const nextManual = new Map(manualChanges);
      for (const key of manualChanges.keys()) {
        const path = FIELD_TO_PATH[key];
        if (path && explicit.has(path)) {
          nextManual.delete(key);   // 用户本轮明确改口 → 采用 AI 新值并解锁
        } else {
          (guarded as unknown as Record<string, unknown>)[key] = spec[key as keyof FrameSpec];
        }
      }
      setManualChanges(nextManual);
      setSpec(guarded);
      setAiResult(result);
      if (result.unsupported.length) setUnsupportedSaved(result.unsupported);
      const aiReply = [
        `已更新方案：宽${guarded.width}×深${guarded.depth}×高${guarded.height}mm，${guarded.sectionId}，载荷${guarded.loadKg}kg`,
        result.unsupported.length ? `🚧 已存入方案草稿但当前版本暂不支持：${result.unsupported.join('、')}` : '',
        result.riskFlags.length ? `⚠ ${result.riskFlags[0]}` : '',
        result.questions.length ? `❓ ${result.questions[0]}` : '参数已齐，可微调或导出清单',
      ].filter(Boolean).join('\n');
      setChat((c) => [...c, { role: 'ai', text: aiReply }]);
      setSelection(null);
    } catch (e) {
      setAiError((e as Error).message);
      setChat((c) => [...c, { role: 'ai', text: `✖ 出错了：${(e as Error).message}` }]);
    } finally {
      setAiBusy(false);
    }
  };

  const result = useMemo(() => {
    try {
      return { model: generateFrame(spec, kb), error: null };
    } catch (e) {
      return { model: null, error: (e as Error).message };
    }
  }, [spec, kb]);

  const items: RenderMember[] = useMemo(() => {
    if (!result.model) return [];
    return result.model.members.map((m) => ({
      id: m.id,
      role: m.role,
      section: kb.sections.find((s) => s.section.id === m.sectionId)!.section,
      length: m.length,
      position: m.position,
      axis: m.axis,
      tilt: m.tilt,
    }));
  }, [result, kb]);

  const joints: RenderJoint[] = useMemo(() => {
    if (!result.model) return [];
    const sec = kb.sections.find((s) => s.section.id === result.model!.spec.sectionId)!.section;
    return result.model.joints.map((j) => {
      const conn = kb.connectors.find((c) => c.connector.id === j.connectorId)!.connector;
      return {
        id: j.id,
        connectorId: j.connectorId,
        position: j.position,
        beamAxis: j.beamAxis,
        outward: j.outward,
        ySide: j.ySide,
        hidden: conn.visibility === 'hidden',
        size: sec.size[0],
      };
    });
  }, [result, kb]);

  const machining: RenderMachining[] = useMemo(() => {
    if (!result.model) return [];
    return result.model.machining.flatMap((m) =>
      m.discs.map((disc) => ({ position: disc.position, axis: disc.axis, dir: disc.dir, d: disc.d, D: disc.D })));
  }, [result]);

  const panels: RenderPanel[] = useMemo(() => {
    if (!result.model) return [];
    return result.model.panels.map((p) => ({ material: p.material, boxSize: p.boxSize, position: p.position, mode: p.mode }));
  }, [result]);

  const accessories: RenderAccessory[] = useMemo(() => {
    if (!result.model) return [];
    return result.model.accessories.map((a) => ({ kind: a.kind, position: a.position, lengthMm: a.lengthMm }));
  }, [result]);

  const mountPoints: RenderMountPoint[] = useMemo(() => {
    if (!result.model) return [];
    const methodName: Record<string, string> = { 't-nut-screw': 'T型螺母+螺栓', 'gasket-clamp': '胶垫+压条', 'caster-stem': '丝杆拧入' };
    return result.model.mounts.flatMap((m, i) => m.points.map((p) => ({
      position: p,
      label: `M${i + 1}`,
      note: `${methodName[m.method] ?? m.method}｜${m.fasteners.map((f) => `${f.sku}×${f.qty}`).join(' ')}｜${m.note}`,
    })));
  }, [result]);

  const machiningSummary = useMemo(() => {
    if (!result.model) return [];
    const byKey = new Map<string, { type: string; spec: string; qty: number }>();
    for (const m of result.model.machining) {
      const key = `${m.type}:${m.spec}`;
      const row = byKey.get(key);
      if (row) row.qty++;
      else byKey.set(key, { type: m.type, spec: m.spec, qty: 1 });
    }
    return [...byKey.values()];
  }, [result]);

  const warnMemberIds = useMemo(() => {
    if (!result.model) return [];
    return [...new Set(result.model.checks
      .filter((c) => (c.level === 'error' || c.level === 'warn') && c.memberIds)
      .flatMap((c) => c.memberIds!))];
  }, [result]);

  // 选型建议：按当前跨度/载荷正向推荐截面（sel 规则）
  const recommendation = useMemo(() => {
    const secSize = kb.sections.find((s) => s.section.id === spec.sectionId)?.section.size[0] ?? 30;
    const span = Math.max(spec.width, spec.depth) - 2 * secSize;
    const r = selectSection({ span, loadKg: spec.loadKg, loadType: spec.loadType, highRisk: spec.highRisk });
    return r.use !== spec.sectionId ? r : null;
  }, [spec, kb]);

  const golden = useMemo(() => runGolden(kb), [kb]);
  const goldenPass = golden.filter((g) => g.pass).length;

  const nesting = useMemo(() => (result.model ? nestCutList(result.model.cutList, kb) : null), [result, kb]);
  const assembly = useMemo(() => (result.model ? buildAssemblySteps(result.model, kb) : []), [result, kb]);

  const exportAssembly = () => {
    if (!model || !exportGate()) return;
    const txt = [
      `随构 · 装配说明（${spec.width}×${spec.depth}×${spec.height}mm · ${spec.sectionId}）`,
      `生成时间：${new Date().toLocaleString()} · 方案状态：${model.status}`,
      '',
      ...assembly.flatMap((s) => [
        `【第 ${s.step} 步】${s.title}`,
        s.parts.length ? `  用件：${s.parts.join('、')}` : '',
        s.fasteners.length ? `  紧固件：${s.fasteners.join('、')}` : '',
        s.tools.length ? `  工具：${s.tools.join('、')}` : '',
        `  说明：${s.note}`,
        '',
      ]).filter((l) => l !== ''),
      '⚠ 本说明由方案装配关系自动生成；高风险场景请保留安全冗余并自行确认装配质量。',
    ].join('\n');
    const url = URL.createObjectURL(new Blob(['\ufeff' + txt], { type: 'text/plain;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = '装配说明.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const set = (patch: Partial<FrameSpec>) => {
    setSpec((s) => {
      const next = normalizeWorkbenchSpec({ ...s, ...patch });
      if (next.scene === 'workbench') {
        if (next.workbenchLowerZoneRatio == null) next.workbenchLowerZoneRatio = 0.62;
        if (next.workbenchUpperShelfDepthRatio == null) next.workbenchUpperShelfDepthRatio = 0.58;
      }
      return next;
    });
    // 对话开始后的手动调整要记账，下一轮注入模型上下文（单一事实源）
    if (chat.length > 0) {
      setManualChanges((mc) => {
        const next = new Map(mc);
        for (const [k, v] of Object.entries(patch)) {
          next.set(k, `${FIELD_NAMES[k] ?? k}=${v}`);
        }
        return next;
      });
    }
  };
  const model = result.model;
  const roleName: Record<string, string> = { post: '立柱', 'beam-x': '横梁(X向)', 'beam-z': '纵梁(Z向)', brace: '斜撑' };

  const selectedMember = selection?.type === 'member' ? items.find((i) => i.id === selection.id) ?? null : null;
  const selectedJoint = selection?.type === 'joint' && model
    ? model.joints.find((j) => j.id === selection.id) ?? null : null;
  const selectedConnector = selectedJoint
    ? kb.connectors.find((c) => c.connector.id === selectedJoint.connectorId) ?? null : null;

  // 尺寸标注：外观=干净无标注；图纸=完整尺寸链（总尺寸+层间距+代表长度）；选中始终标注
  const dims: RenderDim[] = useMemo(() => {
    const out: RenderDim[] = [];
    const { width: W, depth: D, height: H } = spec;
    const secSize = kb.sections.find((s) => s.section.id === spec.sectionId)?.section.size[0] ?? 30;
    if (mode === 'drawing') {
      // 总尺寸（基准在外轮廓）
      out.push({ a: [-W / 2, 2, D / 2], b: [W / 2, 2, D / 2], offset: [0, 0, 110], label: `W ${W}` });
      out.push({ a: [W / 2, 2, D / 2], b: [W / 2, 2, -D / 2], offset: [110, 0, 0], label: `D ${D}` });
      out.push({ a: [-W / 2, 0, -D / 2], b: [-W / 2, H, -D / 2], offset: [-110, 0, 0], label: `H ${H}` });
      // 层间距尺寸链（左前柱上，从底到顶逐段，避免封闭尺寸链）
      if (model) {
        const ys = [...new Set(model.members.filter((m) => m.role !== 'post' && m.role !== 'brace').map((m) => m.position[1]))].sort((a, b) => a - b);
        for (let i = 0; i < ys.length - 1; i++) {
          const gap = Math.round(ys[i + 1] - ys[i]);
          out.push({
            a: [-W / 2, ys[i], D / 2], b: [-W / 2, ys[i + 1], D / 2],
            offset: [-55, 0, 55], label: `${gap}`,
          });
        }
        // 每种下料长度代表标注（横梁）
        const seen = new Set<number>();
        for (const m of model.members) {
          if (m.role === 'post' || m.role === 'brace' || seen.has(m.length)) continue;
          seen.add(m.length);
          const along: [number, number, number] = m.axis === 'x' ? [1, 0, 0] : [0, 0, 1];
          out.push({
            a: [m.position[0] - along[0] * m.length / 2, m.position[1], m.position[2] - along[2] * m.length / 2],
            b: [m.position[0] + along[0] * m.length / 2, m.position[1], m.position[2] + along[2] * m.length / 2],
            offset: [0, secSize * 1.6, 0], label: `${m.length}`,
          });
        }
      }
    }
    if (selectedMember) {
      const s = selectedMember.section.size[0];
      const along: [number, number, number] = selectedMember.axis === 'x' ? [1, 0, 0]
        : selectedMember.axis === 'y' ? [0, 1, 0] : [0, 0, 1];
      const p = selectedMember.position;
      const off: [number, number, number] = selectedMember.axis === 'y'
        ? [Math.sign(p[0] || 1) * s * 1.6, 0, 0] : [0, s * 1.6, 0];
      out.push({
        a: [p[0] - along[0] * selectedMember.length / 2, p[1] - along[1] * selectedMember.length / 2, p[2] - along[2] * selectedMember.length / 2],
        b: [p[0] + along[0] * selectedMember.length / 2, p[1] + along[1] * selectedMember.length / 2, p[2] + along[2] * selectedMember.length / 2],
        offset: off,
        label: `${selectedMember.length} mm`,
      });
    }
    return out;
  }, [mode, spec, model, selectedMember, kb]);

  // 件号球标（图纸模式）：每个件号取第一根构件中点，图与切割清单对照
  const bubbles: RenderBubble[] = useMemo(() => {
    if (mode !== 'drawing' || !model) return [];
    const seen = new Set<string>();
    const out: RenderBubble[] = [];
    for (const m of model.members) {
      if (!m.partNo || seen.has(m.partNo)) continue;
      seen.add(m.partNo);
      out.push({ position: [m.position[0], m.position[1], m.position[2]], label: m.partNo });
    }
    return out;
  }, [mode, model]);

  // 视图预设（图纸模式：主视/俯视/左视/轴测）
  const [viewReq, setViewReq] = useState<{ dir: [number, number, number]; seq: number } | null>(null);
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [partDetail, setPartDetail] = useState<string | null>(null);
  const requestView = (dir: [number, number, number]) =>
    setViewReq((v) => ({ dir, seq: (v?.seq ?? 0) + 1 }));

  /** 改构件长度 = 反算对应整体尺寸重新生成（参数微调，非自由编辑） */
  const commitLength = (raw: string) => {
    if (!selectedMember || !model) return;
    const newLen = Math.round(Number(raw));
    if (!Number.isFinite(newLen) || newLen <= 0) return;
    const sec = kb.sections.find((s) => s.section.id === model.spec.sectionId)!.section;
    const conn = kb.connectors.find((c) => c.connector.id === model.spec.connectorId)!.connector;
    const s = sec.size[0];
    const overall = newLen + 2 * s - 2 * conn.lengthOffset;
    const clamp = (v: number) => Math.min(3000, Math.max(200, v));
    if (selectedMember.role === 'beam-x') set({ width: clamp(overall) });
    else if (selectedMember.role === 'beam-z') set({ depth: clamp(overall) });
    else set({ height: clamp(newLen) });
  };
  const lengthTarget: Record<string, string> = {
    post: '总高 H 同步调整', 'beam-x': '总宽 W 同步调整', 'beam-z': '总深 D 同步调整',
  };
  const machiningName: Record<string, string> = {
    'through-hole': '通孔', 'end-tap': '端面攻丝', counterbore: '沉头孔', 'wrench-hole': '扬手孔',
  };

  const downloadCsv = (name: string, header: string[], rows: (string | number)[][]) => {
    const csv = '\ufeff' + [header, ...rows].map((r) => r.join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  /** 导出质量闸门：函数层自身校验，不只靠按钮禁用（9.2.2） */
  const exportGate = (): boolean => {
    if (!model) return false;
    if (model.status === 'invalid') {
      alert('方案存在结构错误（见结构校验红色项），禁止导出制造文件。请先修复。');
      return false;
    }
    if (model.status === 'needs-confirmation') {
      return confirm('方案存在警告项（见结构校验），确认已知晓风险并继续导出？');
    }
    return true;
  };

  /** 下料公差（cam.yaml 分段）：L≤1000 ±0.3 / >1000 ±0.5；precision 单向 */
  const tolOf = (len: number) =>
    spec.scene === 'precision' ? '+0/-0.2' : len <= 1000 ? '±0.3' : '±0.5';

  const exportCutList = () => {
    if (!model || !exportGate()) return;
    // 工序链映射源：knowledge/rules/cam.yaml（cam-001~006）
    const processOf = (note: string) => {
      if (!note) return '切割→去毛刺';
      if (note.includes('沉')) return '切割→钻孔→沉头→去毛刺';
      if (note.includes('M8')) return '切割→去毛刺→端面攻丝M8×1.25';
      if (note.includes('Φ')) return '切割→钻孔→去毛刺';
      return '切割→去毛刺';
    };
    downloadCsv('切割清单.csv', ['件号', '截面/材质', '下料尺寸mm', '公差', '数量', '加工', '工序链', '去毛刺'],
      [
        ...model.cutList.map((c) => [c.partNo, c.sectionId, c.length, tolOf(c.length), c.qty, c.machiningNote || '无', processOf(c.machiningNote), '孔口双面去毛刺+锐边倒铝'] as (string | number)[]),
        ...model.panelList.map((p) => [p.partNo, p.materialName, `${p.size[0]}×${p.size[1]}×${p.size[2]}`, '±1.0', p.qty, p.holeNote, '开料→钻孔→修边', ''] as (string | number)[]),
      ]);
  };

  const exportBom = () => {
    if (!model || !exportGate()) return;
    const conn = kb.connectors.find((c) => c.connector.id === spec.connectorId)!.connector;
    const rows: (string | number)[][] = model.cutList.map((c) => [
      '型材', `${c.sectionId} L${c.length}`, c.qty,
      sec2Price(c.length) != null ? (sec2Price(c.length)! * c.qty).toFixed(2) : '待补']);
    rows.push(['连接件', conn.name, model.joints.length, '']);
    const bomAgg = new Map<string, number>();
    for (const b of conn.bom) bomAgg.set(b.sku, (bomAgg.get(b.sku) ?? 0) + b.qty * model.joints.length);
    // 装配层紧固件（板材固定）聚合；脚轮/LED 本体走附件行避免重复
    for (const mt of model.mounts.filter((m) => m.method !== 'caster-stem' && m.method !== 'slot-embed')) {
      for (const f of mt.fasteners) bomAgg.set(f.sku, (bomAgg.get(f.sku) ?? 0) + f.qty);
    }
    for (const [sku, qty] of bomAgg) rows.push(['配件', sku, qty, (kb.fasteners[sku] ? (kb.fasteners[sku].price * qty).toFixed(2) : '待补')]);
    for (const p of model.panelList) {
      rows.push(['板材', `${p.partNo} ${p.materialName} ${p.size[0]}×${p.size[1]}×${p.size[2]} ${p.holeNote}`, p.qty, (p.priceCny * p.qty).toFixed(2)]);
    }
    for (const a of model.accessories) {
      if (a.kind === 'led-strip') {
        const m = Math.ceil((a.lengthMm ?? 1000) / 1000);
        rows.push(['附件', `LED灯条套件 ${m}m+电源`, 1, ((kb.fasteners['led-strip-m']?.price ?? 0) * m + (kb.fasteners['led-psu-24w']?.price ?? 0)).toFixed(2)]);
        continue;
      }
      rows.push(['附件', a.sku, 1, (kb.fasteners[a.sku]?.price ?? 0).toFixed(2)]);
    }
    rows.push(['加工费', '型材打孔/攻牙/斜切合计', '', model.totals.cost.machining.toFixed(2)]);
    rows.push(['合计', '（未税估价，以平台实际报价为准）', '', model.totals.cost.total.toFixed(2)]);
    downloadCsv('BOM清单.csv', ['类别', '名称/规格', '数量', '估价CNY'], rows);
  };

  const sec2Price = (len: number) => {
    const sec = kb.sections.find((s) => s.section.id === spec.sectionId)!.section;
    return sec.price.perMeter != null ? (sec.price.perMeter * len) / 1000 : null;
  };

  const levelStyle: Record<string, { color: string; bg: string; icon: string }> = {
    error: { color: '#c0392b', bg: '#fdf0ee', icon: '✖' },
    warn: { color: '#b7791f', bg: '#fffbeb', icon: '⚠' },
    info: { color: '#2b6cb0', bg: '#ebf4ff', icon: 'ℹ' },
    pass: { color: '#2f855a', bg: '#f0fff4', icon: '✓' },
  };

  const errCount = model?.checks.filter((c) => c.level === 'error').length ?? 0;
  const warnCount = model?.checks.filter((c) => c.level === 'warn').length ?? 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }}>
      {/* 顶栏：品牌 + 方案状态摘要 + 全局动作（16号评测 2.3） */}
      <header style={{ height: 46, display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', background: '#fff', borderBottom: '1px solid #e2e5ea', fontSize: 13, flexShrink: 0 }}>
        <b style={{ fontSize: 16 }}>随构</b>
        <span style={{ color: '#aaa', fontSize: 12 }}>一句话出方案</span>
        {model && (
          <>
            <span style={{
              fontSize: 11, padding: '3px 10px', borderRadius: 10,
              background: model.status === 'valid' ? '#f0fff4' : model.status === 'needs-confirmation' ? '#fffbeb' : '#fdf0ee',
              color: model.status === 'valid' ? '#2f855a' : model.status === 'needs-confirmation' ? '#b7791f' : '#c0392b',
            }}>
              {model.status === 'valid' ? '✓ 可制造' : model.status === 'needs-confirmation' ? `⚠ ${warnCount} 项警告` : `✖ ${errCount} 项错误`}
            </span>
            <span style={{ color: '#666' }}>
              构件 {model.totals.memberCount} 根
              {model.totals.weightKg != null && ` · 约 ${model.totals.weightKg.toFixed(1)} kg`}
              {model.totals.priceCny != null && ` · 合计约 ¥${model.totals.priceCny.toFixed(0)}`}
            </span>
          </>
        )}
        <div style={{ flex: 1 }} />
        {(chat.length > 0 || manualChanges.size > 0) && (
          <button onClick={resetDraft} style={{ fontSize: 12, padding: '5px 14px', border: '1px solid #c9d2e0', borderRadius: 6, background: '#fff', color: '#666', cursor: 'pointer' }}>新方案</button>
        )}
        <button onClick={exportCutList} disabled={!model || model.status === 'invalid'} style={{ fontSize: 12, padding: '5px 14px', border: '1px solid #1e6fff', borderRadius: 6, background: '#fff', color: !model || model.status === 'invalid' ? '#aaa' : '#1e6fff', borderColor: !model || model.status === 'invalid' ? '#ccc' : '#1e6fff', cursor: !model || model.status === 'invalid' ? 'not-allowed' : 'pointer' }}>导出切割清单</button>
        <button onClick={exportAssembly} disabled={!model || model.status === 'invalid'} style={{ fontSize: 12, padding: '5px 14px', border: '1px solid #1e6fff', borderRadius: 6, background: '#fff', color: !model || model.status === 'invalid' ? '#aaa' : '#1e6fff', borderColor: !model || model.status === 'invalid' ? '#ccc' : '#1e6fff', cursor: !model || model.status === 'invalid' ? 'not-allowed' : 'pointer' }}>导出装配说明</button>
        <button onClick={exportBom} disabled={!model || model.status === 'invalid'} style={{ fontSize: 12, padding: '5px 14px', border: 'none', borderRadius: 6, background: !model || model.status === 'invalid' ? '#ccc' : '#1e6fff', color: '#fff', cursor: !model || model.status === 'invalid' ? 'not-allowed' : 'pointer' }}>导出 BOM</button>
      </header>

      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
      {leftOpen && (
      <aside style={{ width: 340, padding: 14, background: '#fff', borderRight: '1px solid #e2e5ea', overflowY: 'auto', fontSize: 13, lineHeight: 1.7, flexShrink: 0 }}>

        {/* 意图输入（M4） */}
        {!hasKey ? (
          <div style={{ background: '#fffbeb', padding: '8px 10px', borderRadius: 6, marginBottom: 10, fontSize: 12 }}>
            首次使用请配置 LongCat API Key（仅存本地浏览器）：
            <input type="password" placeholder="ak_..." style={{ width: '100%', marginTop: 4, padding: '4px 6px', border: '1px solid #d8c68a', borderRadius: 4 }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const v = (e.target as HTMLInputElement).value.trim();
                  if (v) { setApiKey(v); setHasKey(true); }
                }
              }} />
            <div style={{ color: '#999', marginTop: 2 }}>回车保存。没有 Key 也可直接用下方手动参数。</div>
          </div>
        ) : (
          <div style={{ marginBottom: 10 }}>
            {/* 对话历史：用户说了什么、AI 理解成什么，全程可追溯 */}
            {chat.length > 0 && (
              <div style={{ maxHeight: 220, overflowY: 'auto', marginBottom: 6, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {chat.map((m, i) => (
                  <div key={i} style={{
                    alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '88%', padding: '6px 10px', borderRadius: 10, fontSize: 12,
                    whiteSpace: 'pre-wrap', lineHeight: 1.6,
                    background: m.role === 'user' ? '#1e6fff' : '#f0f2f5',
                    color: m.role === 'user' ? '#fff' : '#333',
                  }}>{m.text}</div>
                ))}
                {aiBusy && <div style={{ alignSelf: 'flex-start', color: '#999', fontSize: 12, padding: '2px 10px' }}>AI 理解中…</div>}
              </div>
            )}
            <textarea
              value={aiText}
              onChange={(e) => setAiText(e.target.value)}
              placeholder={chat.length ? '回答追问或补充需求…' : '例：想要一个放3D打印机的架子，宽大概一米，带轮子方便移动'}
              rows={2}
              style={{ width: '100%', padding: '6px 8px', border: '1px solid #c9d2e0', borderRadius: 6, resize: 'vertical', fontFamily: 'inherit', fontSize: 13 }}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); runIntent(); } }}
            />
            <button onClick={runIntent} disabled={aiBusy} style={{
              width: '100%', marginTop: 4, padding: '7px 0', border: 'none', borderRadius: 6,
              background: aiBusy ? '#9db8e8' : '#1e6fff', color: '#fff', cursor: aiBusy ? 'wait' : 'pointer', fontSize: 13,
            }}>{aiBusy ? 'AI 理解中…' : chat.length ? '发送' : '✨ 生成方案'}</button>
            {aiError && <div style={{ color: '#c0392b', fontSize: 12, marginTop: 4 }}>✖ {aiError}</div>}
            {manualChanges.size > 0 && (
              <div style={{ color: '#8a7a3a', background: '#fdf9e8', padding: '4px 8px', borderRadius: 4, fontSize: 11, marginTop: 4 }}>
                🔒 已手动调整并锁定：{[...manualChanges.values()].join('，')}（AI 不会覆盖，改口请在对话中明说）
              </div>
            )}
          </div>
        )}

        {(aiResult?.unsupported.length || unsupportedSaved.length) ? (
          <div style={{ background: '#fdf9e8', color: '#8a7a3a', padding: '6px 8px', borderRadius: 6, fontSize: 12, marginBottom: 4 }}>
            🚧 已存入草稿但暂不支持：{(aiResult?.unsupported ?? unsupportedSaved).join('、')}（当前版本只做正交框架+顶板/隔板）
          </div>
        ) : null}
        {aiResult && (
          <div style={{ marginBottom: 10 }}>
            <details style={{ fontSize: 12, color: '#666' }}>
              <summary style={{ cursor: 'pointer' }}>AI 假设与选型依据（{aiResult.assumptions.length}）</summary>
              {aiResult.assumptions.map((a) => <div key={a} style={{ padding: '1px 0' }}>· {a}</div>)}
            </details>
          </div>
        )}

        {([
          ['总宽 W', 'width', 200, 3000],
          ['总深 D', 'depth', 200, 3000],
          ['总高 H', 'height', 200, 3000],
        ] as const).map(([label, key, min, max]) => (
          <label key={key} style={{ display: 'block', marginBottom: 8 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {label}
              <input type="number" value={spec[key]} min={min} max={max} step={10}
                onChange={(e) => { const v = Number(e.target.value); if (v >= min && v <= max) set({ [key]: v } as Partial<FrameSpec>); }}
                style={{ width: 72, padding: '1px 4px', border: '1px solid #c9d2e0', borderRadius: 4, fontSize: 12 }} /> mm
            </span>
            <input type="range" min={min} max={max} step={10} value={spec[key]}
              onChange={(e) => set({ [key]: Number(e.target.value) } as Partial<FrameSpec>)} style={{ width: '100%' }} />
          </label>
        ))}

        <label style={{ display: 'block', marginBottom: 8 }}>
          隔板层数 {spec.shelfCount}
          <input type="range" min={0} max={4} step={1} value={spec.shelfCount}
            onChange={(e) => set({ shelfCount: Number(e.target.value) })} style={{ width: '100%' }} />
        </label>

        {spec.scene === 'workbench' && spec.shelfCount > 0 && (
          <div style={{ marginBottom: 10, padding: '8px 10px', borderRadius: 6, background: '#f6f9ff', border: '1px solid #d8e6ff' }}>
            <div style={{ fontSize: 12, color: '#3769b2', marginBottom: 4 }}>电脑桌语义（人体工学）</div>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 12 }}>
              下层净空占比 {Math.round((spec.workbenchLowerZoneRatio ?? 0.62) * 100)}%
              <input
                type="range"
                min={45}
                max={82}
                step={1}
                value={Math.round((spec.workbenchLowerZoneRatio ?? 0.62) * 100)}
                onChange={(e) => set({ workbenchLowerZoneRatio: Number(e.target.value) / 100 })}
                style={{ width: '100%' }}
              />
            </label>
            <label style={{ display: 'block', fontSize: 12 }}>
              上层浅搁板深度占比 {Math.round((spec.workbenchUpperShelfDepthRatio ?? 0.58) * 100)}%
              <input
                type="range"
                min={35}
                max={95}
                step={1}
                value={Math.round((spec.workbenchUpperShelfDepthRatio ?? 0.58) * 100)}
                onChange={(e) => set({ workbenchUpperShelfDepthRatio: Number(e.target.value) / 100 })}
                style={{ width: '100%' }}
              />
            </label>
            <div style={{ fontSize: 11, color: '#6d7a90', marginTop: 4 }}>上层搁板默认靠后放置，避免压缩腿部活动与桌前操作空间。</div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          {([['顶面板', 'topPanel'], ['隔板材质', 'shelfPanel'], ['底板', 'bottomPanel']] as const).map(([label, key]) => (
            <label key={key} style={{ flex: 1 }}>
              {label}
              <select value={spec[key]} onChange={(e) => set({ [key]: e.target.value } as Partial<FrameSpec>)} style={{ width: '100%', marginTop: 4 }}>
                <option value="none">无</option>
                <option value="wood">木板</option>
                <option value="glass">玻璃(钢化)</option>
                <option value="acrylic">亚克力</option>
                <option value="pegboard">洞洞板</option>
              </select>
            </label>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
          {([['背板', 'backPanel'], ['左侧板', 'leftPanel'], ['右侧板', 'rightPanel']] as const).map(([label, key]) => (
            <label key={key} style={{ flex: 1, fontSize: 12 }}>
              {label}
              <select value={spec[key]} onChange={(e) => set({ [key]: e.target.value } as Partial<FrameSpec>)} style={{ width: '100%', marginTop: 4 }}>
                <option value="none">无</option>
                <option value="wood">木板</option>
                <option value="acrylic">亚克力</option>
                <option value="pegboard">洞洞板</option>
                <option value="wire-mesh">围网</option>
              </select>
            </label>
          ))}
          <label style={{ flex: 1, fontSize: 12 }}>
            门板(正面)
            <select value={spec.doorPanel ?? 'none'} onChange={(e) => set({ doorPanel: e.target.value as FrameSpec['doorPanel'] })} style={{ width: '100%', marginTop: 4 }}>
              <option value="none">无</option>
              <option value="wood">木门</option>
              <option value="glass">玻璃门</option>
              <option value="acrylic">亚克力门</option>
            </select>
          </label>
        </div>

        <label style={{ display: 'block', marginBottom: 8 }}>
          顶面载荷 {spec.loadKg} kg
          <input type="range" min={0} max={200} step={5} value={spec.loadKg}
            onChange={(e) => set({ loadKg: Number(e.target.value) })} style={{ width: '100%' }} />
        </label>

        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <label style={{ flex: 1 }}>
            载荷分布
            <select value={spec.loadType} onChange={(e) => set({ loadType: e.target.value as FrameSpec['loadType'] })} style={{ width: '100%', marginTop: 4 }}>
              <option value="distributed">均匀分布</option>
              <option value="concentrated">集中一点</option>
            </select>
          </label>
          <label style={{ flex: 1 }}>
            使用场景
            <select value={spec.scene} onChange={(e) => set({ scene: e.target.value as FrameSpec['scene'] })} style={{ width: '100%', marginTop: 4 }}>
              <option value="diy-furniture">家具/置物</option>
              <option value="workbench">工作台</option>
              <option value="industrial-rack">设备机架</option>
              <option value="precision">精密设备</option>
            </select>
          </label>
        </div>

        <div style={{ display: 'flex', gap: 14, marginBottom: 8, flexWrap: 'wrap' }}>
          <label><input type="checkbox" checked={spec.highRisk}
            onChange={(e) => set({ highRisk: e.target.checked })} /> 高风险(水族/儿童/头顶)</label>
          <label><input type="checkbox" checked={spec.mobility === 'caster'}
            onChange={(e) => set({ mobility: e.target.checked ? 'caster' : 'fixed' })} /> 带脚轮</label>
          <label><input type="checkbox" checked={spec.brace}
            onChange={(e) => set({ brace: e.target.checked })} /> 背面斜撑</label>
          <label><input type="checkbox" checked={spec.vibration ?? false}
            onChange={(e) => set({ vibration: e.target.checked })} /> 设备振动(3D打印/CNC)</label>
          <label><input type="checkbox" checked={spec.ledStrip ?? false}
            onChange={(e) => set({ ledStrip: e.target.checked })} /> LED灯条(顶框前梁槽嵌)</label>
        </div>

        <label style={{ display: 'block', marginBottom: 8 }}>
          截面系列
          <select value={spec.sectionId} onChange={(e) => set({ sectionId: e.target.value })} style={{ width: '100%', marginTop: 4 }}>
            {kb.sections.map((s) => (
              <option key={s.section.id} value={s.section.id}>{s.section.name}</option>
            ))}
          </select>
        </label>

        <label style={{ display: 'block', marginBottom: 12 }}>
          连接件
          <select value={spec.connectorId} onChange={(e) => set({ connectorId: e.target.value })} style={{ width: '100%', marginTop: 4 }}>
            {kb.connectors.map((c) => {
              const sec = kb.sections.find((s) => s.section.id === spec.sectionId)!.section;
              const ok = c.connector.compatible.series.includes(sec.id)
                && c.connector.compatible.slotWidths.includes(sec.slot.width);
              return (
                <option key={c.connector.id} value={c.connector.id} disabled={!ok}>
                  {c.connector.name}{ok ? '' : '（与当前截面不兼容）'}
                </option>
              );
            })}
          </select>
        </label>

        {result.error && <div style={{ color: '#c0392b', marginBottom: 12 }}>⚠ {result.error}</div>}

        {recommendation && (
          <div style={{ background: '#ebf4ff', color: '#2b6cb0', padding: '7px 9px', borderRadius: 6, marginBottom: 8, fontSize: 12, lineHeight: 1.6 }}>
            💡 选型建议（{recommendation.ruleIds.join('+')}）：推荐 <b>{kb.sections.find((s) => s.section.id === recommendation.use)?.section.name ?? recommendation.use}</b>
            ——{recommendation.rationale}
            <button onClick={() => set({ sectionId: recommendation.use })} style={{ marginLeft: 6, border: '1px solid #2b6cb0', background: '#fff', color: '#2b6cb0', borderRadius: 4, padding: '1px 8px', cursor: 'pointer', fontSize: 12 }}>一键应用</button>
          </div>
        )}
      </aside>
      )}
      <button onClick={() => setLeftOpen((o) => !o)} title={leftOpen ? '收起左栏' : '展开左栏'}
        style={{ width: 16, border: 'none', borderRight: '1px solid #e2e5ea', background: '#f7f8fa', cursor: 'pointer', color: '#888', fontSize: 11, flexShrink: 0, padding: 0 }}>
        {leftOpen ? '‹' : '›'}
      </button>

      <main style={{ flex: 1, position: 'relative' }}>
        <Viewer
          items={items}
          joints={mode === 'structure' ? joints : []}
          machining={mode !== 'appearance' ? machining : []}
          panels={panels}
          accessories={accessories}
          mountPoints={mode === 'structure' ? mountPoints : []}
          dims={dims}
          drawing={mode === 'drawing'}
          bubbles={bubbles}
          viewRequest={viewReq}
          focusY={spec.height / 2}
          onSelect={setSelection}
          selection={selection}
          warnMemberIds={warnMemberIds}
        />
        {/* 图纸视图预设：正交标准视角 */}
        {mode === 'drawing' && (
          <div style={{
            position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: 4, background: 'rgba(255,255,255,.95)', padding: 4,
            borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,.1)',
          }}>
            {([
              ['主视图', [0, 0, 1]],
              ['俯视图', [0, 1, 0]],
              ['左视图', [-1, 0, 0]],
              ['轴测', [1, 0.7, 1]],
            ] as [string, [number, number, number]][]).map(([name, dir]) => (
              <button key={name} onClick={() => requestView(dir)} style={{
                border: 'none', borderRadius: 6, padding: '4px 14px', cursor: 'pointer',
                fontSize: 12, background: 'transparent', color: '#555',
              }}>{name}</button>
            ))}
          </div>
        )}
        {/* 视图模式工具条：按用户任务阶段分层显示 */}
        <div style={{
          position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 4, background: 'rgba(255,255,255,.95)', padding: 4,
          borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,.1)',
        }}>
          {([['appearance', '外观'], ['structure', '结构'], ['drawing', '图纸']] as const).map(([m, name]) => (
            <button key={m} onClick={() => setMode(m)} style={{
              border: 'none', borderRadius: 6, padding: '6px 18px', cursor: 'pointer', fontSize: 13,
              background: mode === m ? '#1e6fff' : 'transparent',
              color: mode === m ? '#fff' : '#555',
            }}>{name}</button>
          ))}
        </div>
        {selectedMember && (
          <div style={{
            position: 'absolute', top: 130, right: 14, width: 240,
            background: 'rgba(255,255,255,.96)', borderRadius: 8, padding: '12px 14px',
            boxShadow: '0 4px 16px rgba(0,0,0,.12)', fontSize: 13, lineHeight: 1.8,
          }}>
            <div style={{ fontWeight: 600, marginBottom: 4, color: '#1e6fff' }}>
              {roleName[selectedMember.role] ?? selectedMember.role} · {selectedMember.id}
            </div>
            <div>截面：{selectedMember.section.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              下料长度：
              <input
                key={selectedMember.id + ':' + selectedMember.length}
                type="number"
                defaultValue={selectedMember.length}
                min={40}
                max={2000}
                step={10}
                style={{ width: 76, padding: '2px 4px', border: '1px solid #c9d2e0', borderRadius: 4 }}
                onKeyDown={(e) => { if (e.key === 'Enter') commitLength((e.target as HTMLInputElement).value); }}
                onBlur={(e) => { if (Number(e.target.value) !== selectedMember.length) commitLength(e.target.value); }}
              /> mm
            </div>
            <div style={{ color: '#888', fontSize: 12 }}>回车确认，{lengthTarget[selectedMember.role]}</div>
            <div>米重：{selectedMember.section.weightPerMeter != null ? `${selectedMember.section.weightPerMeter} kg/m` : '待补'}</div>
            <div>单根约：{selectedMember.section.price.perMeter != null ? `¥${((selectedMember.section.price.perMeter * selectedMember.length) / 1000).toFixed(2)}` : '待补'}</div>
            <div style={{ color: '#999', fontSize: 12, marginTop: 4 }}>点击空白处取消选择</div>
          </div>
        )}
        {selectedJoint && selectedConnector && (
          <div style={{
            position: 'absolute', top: 130, right: 14, width: 240,
            background: 'rgba(255,255,255,.96)', borderRadius: 8, padding: '12px 14px',
            boxShadow: '0 4px 16px rgba(0,0,0,.12)', fontSize: 13, lineHeight: 1.8,
          }}>
            <div style={{ fontWeight: 600, marginBottom: 4, color: '#1e6fff' }}>
              连接件 · {selectedJoint.id}
            </div>
            <div>{selectedConnector.connector.name}</div>
            <div>强度等级：{selectedConnector.connector.strengthClass} / 5</div>
            <div>承载角色：{selectedConnector.connector.loadRole === 'primary' ? '主承重' : '定位/外观'}</div>
            <div>安装：{selectedConnector.connector.visibility === 'hidden' ? '隐藏式' : '外露式'}
              {selectedConnector.connector.machining.length > 0 && ` · 需加工 ${selectedConnector.connector.machining.length} 项`}</div>
            <div style={{ color: '#666', fontSize: 12 }}>
              BOM：{selectedConnector.connector.bom.map((b) => `${b.sku}×${b.qty}`).join('，')}
            </div>
            {selectedConnector.connector.note && (
              <div style={{ color: '#b7791f', fontSize: 12, marginTop: 4 }}>⚠ {selectedConnector.connector.note}</div>
            )}
            <div style={{ color: '#999', fontSize: 12, marginTop: 4 }}>在左侧下拉框可更换连接件类型</div>
          </div>
        )}
        {partDetail && model && (() => {
          const item = model.cutList.find((c) => c.partNo === partDetail);
          if (!item) return null;
          const ss = kb.sections.find((s) => s.section.id === item.sectionId)?.section.size[0] ?? 30;
          return <PartDrawing item={item} sectionSize={ss} tolerance={tolOf(item.length)} onClose={() => setPartDetail(null)} />;
        })()}
      </main>

      {/* 右栏：方案结果——为什么可靠、要买什么（16号评测 2.3） */}
      <button onClick={() => setRightOpen((o) => !o)} title={rightOpen ? '收起右栏' : '展开右栏'}
        style={{ width: 16, border: 'none', borderLeft: '1px solid #e2e5ea', background: '#f7f8fa', cursor: 'pointer', color: '#888', fontSize: 11, flexShrink: 0, padding: 0 }}>
        {rightOpen ? '›' : '‹'}
      </button>
      {rightOpen && (
      <aside style={{ width: 340, padding: 14, background: '#fff', borderLeft: '1px solid #e2e5ea', overflowY: 'auto', fontSize: 13, lineHeight: 1.7, flexShrink: 0 }}>
        {model ? (
          <>
            {model.warnings.map((w) => (
              <div key={w} style={{ color: '#b7791f', background: '#fffbeb', padding: '6px 8px', borderRadius: 4, marginBottom: 8, fontSize: 12 }}>⚠ {w}</div>
            ))}

            <h3 style={{ margin: '0 0 6px', fontSize: 14 }}>结构校验</h3>
            {model.checks.map((c, i) => {
              const st = levelStyle[c.level];
              return (
                <div key={i} style={{ color: st.color, background: st.bg, padding: '5px 8px', borderRadius: 4, marginBottom: 4, fontSize: 12 }}>
                  {st.icon} <b>{c.ruleId}</b> {c.message}
                </div>
              );
            })}

            <h3 style={{ margin: '12px 0 6px', fontSize: 14 }}>切割清单（按件号）</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #d8dce2', color: '#666', textAlign: 'left' }}>
                  <th style={{ padding: '4px 0' }}>件号</th>
                  <th style={{ textAlign: 'right' }}>长度</th>
                  <th style={{ textAlign: 'right' }}>数量</th>
                  <th style={{ textAlign: 'right' }}>加工</th>
                </tr>
              </thead>
              <tbody>
                {model.cutList.map((c) => (
                  <tr key={c.partNo} onClick={() => setPartDetail(c.partNo)} title="点击查看单件加工图"
                    style={{ borderBottom: '1px solid #f0f2f5', cursor: 'pointer' }}>
                    <td style={{ padding: '4px 0', color: '#1e6fff', textDecoration: 'underline' }}>{c.partNo}</td>
                    <td style={{ textAlign: 'right' }}>{c.length}</td>
                    <td style={{ textAlign: 'right' }}>×{c.qty}</td>
                    <td style={{ textAlign: 'right', fontSize: 11, color: '#777' }}>{c.machiningNote || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {nesting && (
              <>
                <h3 style={{ margin: '12px 0 6px', fontSize: 14 }}>下料方案（套裁）</h3>
                <div style={{ fontSize: 12, color: '#555', marginBottom: 4 }}>
                  原料 {nesting.stockLengthMm}mm × {nesting.totalStockBars} 根 · 利用率 {(nesting.utilization * 100).toFixed(1)}% · 锯口 {nesting.kerfMm}mm/刀
                </div>
                {nesting.bars.map((b, i) => (
                  <div key={i} style={{ fontSize: 11, color: '#777', padding: '2px 0', borderBottom: '1px solid #f0f2f5' }}>
                    #{i + 1}：{b.cuts.map((c) => `${c.partNo}(${c.length})`).join(' + ')} → 余料 {b.remnantMm}mm
                  </div>
                ))}
              </>
            )}

            {model.panelList.length > 0 && (
              <>
                <h3 style={{ margin: '12px 0 6px', fontSize: 14 }}>板材清单（按件号）</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #d8dce2', color: '#666', textAlign: 'left' }}>
                      <th style={{ padding: '4px 0' }}>件号</th>
                      <th>材质</th>
                      <th style={{ textAlign: 'right' }}>长×宽×厚</th>
                      <th style={{ textAlign: 'right' }}>数量</th>
                      <th style={{ textAlign: 'right' }}>估价</th>
                    </tr>
                  </thead>
                  <tbody>
                    {model.panelList.map((p) => (
                      <tr key={p.partNo} style={{ borderBottom: '1px solid #f0f2f5' }}>
                        <td style={{ padding: '4px 0' }}>{p.partNo}</td>
                        <td>{p.materialName}</td>
                        <td style={{ textAlign: 'right', fontSize: 11 }}>{p.size[0]}×{p.size[1]}×{p.size[2]}</td>
                        <td style={{ textAlign: 'right' }}>×{p.qty}</td>
                        <td style={{ textAlign: 'right' }}>¥{(p.priceCny * p.qty).toFixed(0)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ fontSize: 11, color: '#999', marginTop: 4 }}>
                  {model.panelList.map((p) => `${p.partNo}: ${p.holeNote}`).join(' · ')}
                </div>
              </>
            )}

            <h3 style={{ margin: '12px 0 6px', fontSize: 14 }}>价格明细（未税估价）</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <tbody>
                {([['型材', model.totals.cost.profile], ['板材(含钻孔)', model.totals.cost.panels],
                   ['连接件', model.totals.cost.connectors], ['紧固件/胶垫压条', model.totals.cost.fasteners],
                   ['型材加工费', model.totals.cost.machining], ['附件', model.totals.cost.accessories]] as const)
                  .filter(([, v]) => v > 0)
                  .map(([label, v]) => (
                    <tr key={label} style={{ borderBottom: '1px solid #f0f2f5' }}>
                      <td style={{ padding: '3px 0', color: '#666' }}>{label}</td>
                      <td style={{ textAlign: 'right' }}>¥{v.toFixed(2)}</td>
                    </tr>
                  ))}
                <tr>
                  <td style={{ padding: '4px 0', fontWeight: 600 }}>合计</td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>¥{model.totals.cost.total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>非实价报价：板材/紧固件/加工费为市场量级估价，以平台实际报价为准</div>

            <div style={{ marginTop: 10, color: '#555' }}>
              构件 {model.totals.memberCount} 根 · 总长 {(model.totals.totalLengthMm / 1000).toFixed(2)} m
              {model.totals.weightKg != null && <> · 约 {model.totals.weightKg.toFixed(1)} kg</>}
              {model.totals.priceCny != null && <> · 合计约 ¥{model.totals.priceCny.toFixed(0)}（未税）</>}
            </div>

            {machiningSummary.length > 0 && (
              <>
                <h3 style={{ margin: '12px 0 6px', fontSize: 14 }}>加工清单</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #d8dce2', color: '#666', textAlign: 'left' }}>
                      <th style={{ padding: '4px 0' }}>类型</th>
                      <th>规格</th>
                      <th style={{ textAlign: 'right' }}>数量</th>
                    </tr>
                  </thead>
                  <tbody>
                    {machiningSummary.map((m) => (
                      <tr key={m.type + m.spec} style={{ borderBottom: '1px solid #f0f2f5' }}>
                        <td style={{ padding: '4px 0' }}>{machiningName[m.type] ?? m.type}</td>
                        <td>{m.spec}</td>
                        <td style={{ textAlign: 'right' }}>×{m.qty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ color: '#999', fontSize: 12 }}>深色圆片 = 孔口位置（表面可见面）</div>
              </>
            )}

            {assembly.length > 0 && (
              <details style={{ marginTop: 12 }}>
                <summary style={{ cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>装配步骤（{assembly.length} 步）</summary>
                {assembly.map((s) => (
                  <div key={s.step} style={{ padding: '6px 0', borderBottom: '1px solid #f0f2f5', fontSize: 12 }}>
                    <b>{s.step}. {s.title}</b>
                    {s.parts.length > 0 && <div style={{ color: '#555' }}>用件：{s.parts.join('、')}</div>}
                    {s.fasteners.length > 0 && <div style={{ color: '#555' }}>紧固件：{s.fasteners.join('、')}</div>}
                    {s.tools.length > 0 && <div style={{ color: '#777' }}>工具：{s.tools.join('、')}</div>}
                    <div style={{ color: '#999' }}>{s.note}</div>
                  </div>
                ))}
              </details>
            )}

            {/* 免责三要素（07文档责任设计） */}
            <div style={{ marginTop: 12, padding: '8px 10px', background: '#f7f8fa', borderRadius: 6, color: '#888', fontSize: 11, lineHeight: 1.6 }}>
              ① 本方案的承重/挠度为工程估算参考，基于典型截面参数（厂家间差异可达20%~50%）；
              ② 未经专业结构认证，不替代持证工程师核算；
              ③ 水族/儿童/头顶等高风险场景请务必勾选高风险选项并保留安全冗余，最终装配质量需自行确认。
            </div>
          </>
        ) : (
          <div style={{ color: '#999' }}>生成方案后这里显示校验结果与清单</div>
        )}

        {/* 研发诊断信息收纳，不暴露给普通用户（16号评测 2.2.5） */}
        <details style={{ marginTop: 12, fontSize: 12, color: '#aaa' }}>
          <summary style={{ cursor: 'pointer' }}>开发者诊断</summary>
          <div>知识库：{kb.sections.length} 截面 · {kb.connectors.length} 连接件 · {Object.keys(kb.rules).length} 规则包</div>
          <div style={{ color: goldenPass === golden.length ? '#2f855a' : '#c0392b' }}>
            Golden 用例 {goldenPass}/{golden.length} {goldenPass === golden.length ? '✓' : '✖'}
          </div>
          {golden.filter((g) => !g.pass).map((g) => (
            <div key={g.id} style={{ color: '#c0392b' }}>✖ {g.id} actual: {g.actual}</div>
          ))}
        </details>
      </aside>
      )}
      </div>
    </div>
  );
}
