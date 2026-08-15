import { useEffect, useMemo, useState } from 'react';
import { loadKnowledgeBase } from './knowledge/loader';
import { generateFrame } from './engine/generate';
import { selectSectionFixedPoint } from './engine/select';
// import { runGolden } from './engine/golden';
import { extractIntent, getApiKey, setApiKey } from './engine/extract';
import { intentToSpec, type IntentResult } from './engine/intent';
import { nestCutList } from './engine/nesting';
import { buildAssemblySteps } from './engine/assembly';
import type { FrameSpec } from './engine/types';
import { Viewer, type RenderMember, type RenderJoint, type RenderMachining, type RenderPanel, type RenderAccessory, type RenderMountPoint, type RenderDim, type RenderBubble, type Selection } from './viewer/Viewer';
import { PartDrawing } from './components/PartDrawing';
import { Section } from './components/PanelSection';

type ViewMode = 'appearance' | 'structure' | 'drawing';

interface ChatMsg {
  role: 'user' | 'ai' | 'system';
  text: string;
}

/** 中柱子组件——避免 IIFE 在 JSX 中的运行时问题 */
function CenterColumnConfig({ cc, onChange }: { cc: NonNullable<FrameSpec['centerColumn']>; onChange: (patch: Partial<typeof cc>) => void }) {
  return (
    <Section title="中柱分区" icon="▐▌" defaultOpen={true}>
      <div style={{ marginBottom: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
          <span style={{ fontSize: 10, color: '#6b7280' }}>中柱位置</span>
          <span style={{ fontSize: 11, color: '#3769b2', fontWeight: 600 }}>{Math.round(cc.offsetRatio * 100)}%</span>
        </div>
        <input type="range" min={20} max={80} step={1} value={Math.round(cc.offsetRatio * 100)} onChange={(e) => onChange({ offsetRatio: Number(e.target.value) / 100 })} style={{ width: '100%', height: 3 }} />
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <label style={{ flex: 1 }}>
          <span style={{ fontSize: 10, color: '#8a90a0' }}>左列</span>
          <select value={cc.left.type} onChange={(e) => onChange({ left: { type: e.target.value as 'drawer' | 'shelf', count: cc.left.count } })} style={{ width: '100%', marginTop: 2, padding: '2px 4px', border: '1px solid #c9d2e0', borderRadius: 3, fontSize: 10 }}>
            <option value="drawer">抽屉</option>
            <option value="shelf">搁板</option>
          </select>
          <input type="number" min={1} max={6} value={cc.left.count} onChange={(e) => onChange({ left: { ...cc.left, count: Number(e.target.value) || 1 } })} style={{ width: '100%', marginTop: 2, padding: '2px 4px', border: '1px solid #c9d2e0', borderRadius: 3, fontSize: 10 }} />
        </label>
        <label style={{ flex: 1 }}>
          <span style={{ fontSize: 10, color: '#8a90a0' }}>右列</span>
          <select value={cc.right.type} onChange={(e) => onChange({ right: { type: e.target.value as 'drawer' | 'shelf', count: cc.right.count } })} style={{ width: '100%', marginTop: 2, padding: '2px 4px', border: '1px solid #c9d2e0', borderRadius: 3, fontSize: 10 }}>
            <option value="drawer">抽屉</option>
            <option value="shelf">搁板</option>
          </select>
          <input type="number" min={1} max={6} value={cc.right.count} onChange={(e) => onChange({ right: { ...cc.right, count: Number(e.target.value) || 1 } })} style={{ width: '100%', marginTop: 2, padding: '2px 4px', border: '1px solid #c9d2e0', borderRadius: 3, fontSize: 10 }} />
        </label>
      </div>
    </Section>
  );
}

const FIELD_NAMES: Record<string, string> = {
  width: '总宽', depth: '总深', height: '总高', shelfCount: '隔板层数', loadKg: '载荷',
  loadType: '载荷分布', scene: '场景', highRisk: '高风险', mobility: '移动性',
  workbenchDeskTopHeightMm: '主桌面高度', workbenchUpperShelfDepthRatio: '上层浅搁板深度占比',
  sectionId: '截面', connectorId: '连接件', topPanel: '顶面板', shelfPanel: '隔板材质', bottomPanel: '底板', doorPanel: '门板',
};

const FIELD_TO_PATH: Record<string, string> = {
  width: 'dimensions.width', depth: 'dimensions.depth', height: 'dimensions.height',
  loadKg: 'load.totalKg', loadType: 'load.type', mobility: 'mobility',
  shelfCount: 'layers', scene: 'scene', highRisk: 'scene',
  topPanel: 'panels', shelfPanel: 'panels',
};

const DRAFT_KEY = 'suigou_draft_v1';
const WORKBENCH_HEIGHT_MIN = 1100;
const WORKBENCH_HEIGHT_MAX = 1800;
interface Draft {
  spec: FrameSpec;
  chat: ChatMsg[];
  manual: [string, string][];
  unsupported: string[];
}
const normalizeWorkbenchSpec = (s: FrameSpec): FrameSpec => {
  const next = { ...s };
  if (next.scene === 'workbench') {
    next.depth = Math.max(550, next.depth);
    next.height = next.height <= 800
      ? Math.min(800, Math.max(680, next.height))
      : Math.min(WORKBENCH_HEIGHT_MAX, Math.max(WORKBENCH_HEIGHT_MIN, next.height));
    next.workbenchDeskTopHeightMm = next.workbenchDeskTopHeightMm ?? 740;
    next.workbenchLowerZoneRatio = next.workbenchLowerZoneRatio ?? 0.62;
    next.workbenchUpperShelfDepthRatio = next.workbenchUpperShelfDepthRatio ?? 0.55;
    next.shelfCount = Math.max(1, next.shelfCount);
    next.doorPanel = 'none';
    next.bottomPanel = 'none';
    if (next.backPanel !== 'pegboard') next.backPanel = 'none';
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
    width: 700, depth: 650, height: 1100, sectionId: 'eu-3030', connectorId: 'corner-bracket-30',
    shelfCount: 1, loadKg: 30, loadType: 'distributed', scene: 'workbench', highRisk: false,
    mobility: 'fixed', topPanel: 'none', shelfPanel: 'none', workbenchDeskTopHeightMm: 740,
    workbenchLowerZoneRatio: 0.62, workbenchUpperShelfDepthRatio: 0.55,
    bottomPanel: 'none', backPanel: 'none', leftPanel: 'none', rightPanel: 'none', brace: false,
  });
  const [selection, setSelection] = useState<Selection | null>(null);
  const [mode, setMode] = useState<ViewMode>('appearance');
  const [aiText, setAiText] = useState('');
  const [aiBusy, setAiBusy] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<IntentResult | null>(null);
  const [chat, setChat] = useState<ChatMsg[]>(draft?.chat ?? []);
  const [manualChanges, setManualChanges] = useState<Map<string, string>>(new Map(draft?.manual ?? []));
  const [unsupportedSaved, setUnsupportedSaved] = useState<string[]>(draft?.unsupported ?? []);
  const [hasKey, setHasKey] = useState(() => !!getApiKey());
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

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
      const history = chat.slice(-6).map((m) => ({
        role: (m.role === 'ai' ? 'assistant' : 'user') as 'assistant' | 'user',
        content: m.text,
      }));
      const stateJson = aiResult ? `\n[当前方案参数] ${JSON.stringify({
        width: spec.width, depth: spec.depth, height: spec.height,
        loadKg: spec.loadKg, loadType: spec.loadType, mobility: spec.mobility,
        layers: spec.shelfCount + 1, topPanel: spec.topPanel, shelfPanel: spec.shelfPanel,
        workbenchDeskTopHeightMm: spec.workbenchDeskTopHeightMm,
        workbenchLowerZoneRatio: spec.workbenchLowerZoneRatio,
        workbenchUpperShelfDepthRatio: spec.workbenchUpperShelfDepthRatio,
      })}` : '';
      const manualNote = manualChanges.size > 0
        ? `\n[用户手动锁定项，除非本轮明确改口否则保持：${[...manualChanges.values()].join('，')}]`
        : '';
      const extraction = await extractIntent(userMsg + stateJson + manualNote, history);
      const result = intentToSpec(extraction, kb);
      const explicit = new Set(extraction._explicitFields ?? []);
      const guarded = { ...result.spec };
      const nextManual = new Map(manualChanges);
      for (const key of manualChanges.keys()) {
        const path = FIELD_TO_PATH[key];
        if (path && explicit.has(path)) {
          nextManual.delete(key);
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
      id: m.id, role: m.role, section: kb.sections.find((s) => s.section.id === m.sectionId)!.section,
      length: m.length, position: m.position, axis: m.axis, tilt: m.tilt, partNo: m.partNo,
    }));
  }, [result, kb]);

  const joints: RenderJoint[] = useMemo(() => {
    if (!result.model) return [];
    const sec = kb.sections.find((s) => s.section.id === result.model!.spec.sectionId)!.section;
    return result.model.joints.map((j) => {
      const conn = kb.connectors.find((c) => c.connector.id === j.connectorId)!.connector;
      return { id: j.id, connectorId: j.connectorId, position: j.position, beamAxis: j.beamAxis, outward: j.outward, ySide: j.ySide, hidden: conn.visibility === 'hidden', size: sec.size[0] };
    });
  }, [result, kb]);

  const machining: RenderMachining[] = useMemo(() => {
    if (!result.model) return [];
    return result.model.machining.flatMap((m) =>
      m.discs.map((disc) => ({ position: disc.position, axis: disc.axis, dir: disc.dir, d: disc.d, D: disc.D })));
  }, [result]);

  const panels: RenderPanel[] = useMemo(() => {
    if (!result.model) return [];
    return result.model.panels.map((p) => ({ id: p.id, material: p.material, boxSize: p.boxSize, position: p.position, mode: p.mode }));
  }, [result]);

  const accessories: RenderAccessory[] = useMemo(() => {
    if (!result.model) return [];
    return result.model.accessories.map((a) => ({ kind: a.kind, position: a.position, lengthMm: a.lengthMm, boxSize: a.boxSize }));
  }, [result]);

  const mountPoints: RenderMountPoint[] = useMemo(() => {
    if (!result.model) return [];
    const methodName: Record<string, string> = { 't-nut-screw': 'T型螺母+螺栓', 'gasket-clamp': '胶垫+压条', 'shelf-support': '层板托平嵌', 'corner-flat': '平面直角件', 'caster-stem': '丝杆拧入', 'foot-stem': '地脚拧入', 'drawer-slide': '抽屉轨道' };
    return result.model.mounts.flatMap((m, i) => m.points.map((p) => ({
      position: p, label: `M${i + 1}`,
      note: `${methodName[m.method] ?? m.method}｜${m.fasteners.map((f) => `${f.sku}×${f.qty}`).join(' ')}｜${m.note}`,
    })));
  }, [result]);

  const warnMemberIds = useMemo(() => {
    if (!result.model) return [];
    return [...new Set(result.model.checks
      .filter((c) => (c.level === 'error' || c.level === 'warn') && c.memberIds)
      .flatMap((c) => c.memberIds!))];
  }, [result]);

  // 校验条目点击 → 高亮关联构件（取第一个构件的件号）
  const memberById = useMemo(() => {
    const m = new Map<string, string>();
    if (result.model) for (const mem of result.model.members) m.set(mem.id, mem.partNo ?? '');
    return m;
  }, [result]);

  const recommendation = useMemo(() => {
    const r = selectSectionFixedPoint({ width: spec.width, depth: spec.depth, loadKg: spec.loadKg, loadType: spec.loadType, highRisk: spec.highRisk });
    return r.use !== spec.sectionId ? r : null;
  }, [spec, kb]);

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
    const url = URL.createObjectURL(new Blob(['﻿' + txt], { type: 'text/plain;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url; a.download = '装配说明.txt'; a.click();
    URL.revokeObjectURL(url);
  };

  const set = (patch: Partial<FrameSpec>) => {
    setSpec((s) => {
      const next = normalizeWorkbenchSpec({ ...s, ...patch });
      if (next.scene === 'workbench') {
        if (next.workbenchDeskTopHeightMm == null) next.workbenchDeskTopHeightMm = 740;
        if (next.workbenchLowerZoneRatio == null) next.workbenchLowerZoneRatio = 0.62;
        if (next.workbenchUpperShelfDepthRatio == null) next.workbenchUpperShelfDepthRatio = 0.55;
      }
      return next;
    });
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
  const selectedJoint = selection?.type === 'joint' && model ? model.joints.find((j) => j.id === selection.id) ?? null : null;
  const selectedConnector = selectedJoint ? kb.connectors.find((c) => c.connector.id === selectedJoint.connectorId) ?? null : null;
  const selectedPanel = selection?.type === 'panel' && model ? model.panels.find((p) => p.id === selection.id) ?? null : null;

  const dims: RenderDim[] = useMemo(() => {
    const out: RenderDim[] = [];
    const { width: W, depth: D, height: H } = spec;
    // 尺寸标注仅图纸模式显示（外观模式保持干净看造型）
    if (mode === 'drawing') {
      out.push({ a: [-W / 2, 2, D / 2], b: [W / 2, 2, D / 2], offset: [0, 0, 110], label: `W ${W}` });
      out.push({ a: [W / 2, 2, D / 2], b: [W / 2, 2, -D / 2], offset: [110, 0, 0], label: `D ${D}` });
      out.push({ a: [-W / 2, 0, -D / 2], b: [-W / 2, H, -D / 2], offset: [-110, 0, 0], label: `H ${H}` });
    }
    if (selectedMember) {
      const s = selectedMember.section.size[0];
      const along: [number, number, number] = selectedMember.axis === 'x' ? [1, 0, 0] : selectedMember.axis === 'y' ? [0, 1, 0] : [0, 0, 1];
      const p = selectedMember.position;
      const off: [number, number, number] = selectedMember.axis === 'y' ? [Math.sign(p[0] || 1) * s * 1.6, 0, 0] : [0, s * 1.6, 0];
      out.push({
        a: [p[0] - along[0] * selectedMember.length / 2, p[1] - along[1] * selectedMember.length / 2, p[2] - along[2] * selectedMember.length / 2],
        b: [p[0] + along[0] * selectedMember.length / 2, p[1] + along[1] * selectedMember.length / 2, p[2] + along[2] * selectedMember.length / 2],
        offset: off, label: `${selectedMember.length} mm`,
      });
    }
    // 面板选中时显示尺寸（长×宽两条尺寸线，统一偏移 60mm）
    if (selectedPanel) {
      const sp = selectedPanel.position;
      const sx = selectedPanel.boxSize[0], sy = selectedPanel.boxSize[1], sz = selectedPanel.boxSize[2];
      const off = 60;   // 统一偏移距离，与主尺寸链一致
      if (sy < sx && sy < sz) {
        // 水平板（厚度沿 Y）：长(X)前伸、宽(Z)左伸
        out.push({ a: [sp[0] - sx / 2, sp[1], sp[2] - sz / 2], b: [sp[0] + sx / 2, sp[1], sp[2] - sz / 2], offset: [0, 0, -off], label: `${sx}` });
        out.push({ a: [sp[0] - sx / 2, sp[1], sp[2] - sz / 2], b: [sp[0] - sx / 2, sp[1], sp[2] + sz / 2], offset: [-off, 0, 0], label: `${sz}` });
      } else {
        // 竖直板（厚度沿 Z）：宽(X)右伸、高(Y)上伸
        out.push({ a: [sp[0] - sx / 2, sp[1] - sy / 2, sp[2]], b: [sp[0] + sx / 2, sp[1] - sy / 2, sp[2]], offset: [off, 0, 0], label: `${sx}` });
        out.push({ a: [sp[0] - sx / 2, sp[1] - sy / 2, sp[2]], b: [sp[0] - sx / 2, sp[1] + sy / 2, sp[2]], offset: [0, off, 0], label: `${sy}` });
      }
    }
    return out;
  }, [mode, spec, model, selectedMember, selectedPanel, kb]);

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

  const [partDetail, setPartDetail] = useState<string | null>(null);
  const [highlightedPartNo, setHighlightedPartNo] = useState<string | null>(null);
  const [highlightedCheck, setHighlightedCheck] = useState<string | null>(null);

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
  const lengthTarget: Record<string, string> = { post: '总高 H 同步调整', 'beam-x': '总宽 W 同步调整', 'beam-z': '总深 D 同步调整' };

  const downloadCsv = (name: string, header: string[], rows: (string | number)[][]) => {
    const csv = '﻿' + [header, ...rows].map((r) => r.join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url; a.download = name; a.click();
    URL.revokeObjectURL(url);
  };

  const exportGate = (): boolean => {
    if (!model) return false;
    if (model.status === 'invalid') { alert('方案存在结构错误（见结构校验红色项），禁止导出制造文件。请先修复。'); return false; }
    if (model.status === 'needs-confirmation') { return confirm('方案存在警告项（见结构校验），确认已知晓风险并继续导出？'); }
    return true;
  };

  // 校验条目点击 → 高亮关联构件
  useEffect(() => {
    if (highlightedCheck && result.model) {
      const check = result.model.checks.find((c) => c.ruleId === highlightedCheck);
      const firstMemberId = check?.memberIds?.[0];
      if (firstMemberId) {
        const partNo = memberById.get(firstMemberId);
        if (partNo) setHighlightedPartNo(partNo);
      }
    }
  }, [highlightedCheck, result, memberById]);

  // 键盘快捷键（Fusion 360 / Figma 式专业体验）
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key === '1') setMode('appearance');
      else if (e.key === '2') setMode('structure');
      else if (e.key === '3') setMode('drawing');
      else if (e.key === 'r' || e.key === 'R') setSelection(null);
      else if (e.key === 'Escape') { setSelection(null); setHighlightedPartNo(null); setHighlightedCheck(null); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const tolOf = (len: number) => spec.scene === 'precision' ? '+0/-0.2' : len <= 1000 ? '±0.3' : '±0.5';

  const exportCutList = () => {
    if (!model || !exportGate()) return;
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
    const rows: (string | number)[][] = model.cutList.map((c) => ['型材', `${c.sectionId} L${c.length}`, c.qty, sec2Price(c.length) != null ? (sec2Price(c.length)! * c.qty).toFixed(2) : '待补']);
    rows.push(['连接件', conn.name, model.joints.length, '']);
    const bomAgg = new Map<string, number>();
    for (const b of conn.bom) bomAgg.set(b.sku, (bomAgg.get(b.sku) ?? 0) + b.qty * model.joints.length);
    for (const mt of model.mounts.filter((m) => m.method !== 'caster-stem' && m.method !== 'foot-stem' && m.method !== 'drawer-slide' && m.method !== 'slot-embed')) {
      for (const f of mt.fasteners) bomAgg.set(f.sku, (bomAgg.get(f.sku) ?? 0) + f.qty);
    }
    for (const [sku, qty] of bomAgg) rows.push(['配件', sku, qty, (kb.fasteners[sku] ? (kb.fasteners[sku].price * qty).toFixed(2) : '待补')]);
    for (const p of model.panelList) rows.push(['板材', `${p.partNo} ${p.materialName} ${p.size[0]}×${p.size[1]}×${p.size[2]} ${p.holeNote}`, p.qty, (p.priceCny * p.qty).toFixed(2)]);
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
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh', background: '#f5f6f8' }}>
      {/* ═══════ 顶栏：品牌 + 预设 + 状态 + 导出 ═══════ */}
      <header style={{ height: 42, display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', background: '#fff', borderBottom: '1px solid #e2e5ea', fontSize: 12, flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <b style={{ fontSize: 15, color: '#1a1a2e' }}>随构</b>
        <span style={{ color: '#9ca3af', fontSize: 11 }}>参数化铝材设计</span>
        <div style={{ display: 'flex', gap: 4, marginLeft: 8 }}>
          {([
            ['💻 电脑桌', { scene: 'workbench', width: 1200, depth: 600, height: 740, shelfCount: 1 }],
            ['📦 置物架', { scene: 'diy-furniture', width: 800, depth: 400, height: 1500, shelfCount: 3 }],
            ['🗄️ 工具柜', { scene: 'diy-furniture', width: 670, depth: 400, height: 815, drawerCount: 3, drawerKind: 'turnover-box' }],
          ] as const).map(([label, preset]) => (
            <button key={label} onClick={() => set(preset as Partial<FrameSpec>)} style={{ padding: '3px 8px', border: '1px solid #e2e5ea', borderRadius: 12, background: '#f8f9fa', cursor: 'pointer', fontSize: 11, color: '#555', whiteSpace: 'nowrap' }}>{label}</button>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        {model && (
          <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 10, background: model.status === 'valid' ? '#f0fff4' : model.status === 'needs-confirmation' ? '#fffbeb' : '#fdf0ee', color: model.status === 'valid' ? '#2f855a' : model.status === 'needs-confirmation' ? '#b7791f' : '#c0392b', fontWeight: 600 }}>
            {model.status === 'valid' ? '✓ 可制造' : model.status === 'needs-confirmation' ? `⚠ ${warnCount} 警告` : `✖ ${errCount} 错误`}
          </span>
        )}
        {model && <span style={{ color: '#888', fontSize: 11 }}>{model.totals.memberCount} 根 · {model.totals.weightKg != null && `${model.totals.weightKg.toFixed(1)} kg`} · ¥{model.totals.priceCny?.toFixed(0) ?? '?'}</span>}
        {(chat.length > 0 || manualChanges.size > 0) && <button onClick={resetDraft} style={{ fontSize: 11, padding: '4px 10px', border: '1px solid #e2e5ea', borderRadius: 5, background: '#fff', color: '#666', cursor: 'pointer' }}>新方案</button>}
        <button onClick={exportCutList} disabled={!model || model.status === 'invalid'} style={{ fontSize: 11, padding: '4px 8px', border: '1px solid #e2e5ea', borderRadius: 5, background: '#fff', color: !model || model.status === 'invalid' ? '#ccc' : '#555', cursor: !model || model.status === 'invalid' ? 'not-allowed' : 'pointer' }}>切割</button>
        <button onClick={exportAssembly} disabled={!model || model.status === 'invalid'} style={{ fontSize: 11, padding: '4px 8px', border: '1px solid #e2e5ea', borderRadius: 5, background: '#fff', color: !model || model.status === 'invalid' ? '#ccc' : '#555', cursor: !model || model.status === 'invalid' ? 'not-allowed' : 'pointer' }}>装配</button>
        <button onClick={exportBom} disabled={!model || model.status === 'invalid'} style={{ fontSize: 11, padding: '4px 8px', border: 'none', borderRadius: 5, background: !model || model.status === 'invalid' ? '#e5e7eb' : '#1e6fff', color: !model || model.status === 'invalid' ? '#9ca3af' : '#fff', cursor: !model || model.status === 'invalid' ? 'not-allowed' : 'pointer', fontWeight: 600 }}>BOM</button>
      </header>

      {/* ═══════ 主区域：左栏 + 3D画布 + 右栏 ═══════ */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>

        {/* ── 左侧栏：参数 ── */}
        {leftOpen && (
          <aside style={{ width: 280, display: 'flex', flexDirection: 'column', background: '#fff', borderRight: '1px solid #e2e5ea', flexShrink: 0 }}>
            <button onClick={() => setLeftOpen(false)} style={{ padding: '7px 12px', border: 'none', borderBottom: '1px solid #eef0f3', background: '#f7f8fa', cursor: 'pointer', fontSize: 11, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>⟨</span><span>收起参数</span>
            </button>
            <div style={{ padding: 12, overflowY: 'auto', fontSize: 12, lineHeight: 1.6 }}>
              {/* AI 意图输入 */}
              {!hasKey ? (
                <div style={{ background: '#fffbeb', padding: '8px 10px', borderRadius: 6, marginBottom: 10, fontSize: 11 }}>
                  首次使用请配置 LongCat API Key（仅存本地浏览器）：
                  <input type="password" placeholder="ak_..." style={{ width: '100%', marginTop: 4, padding: '4px 6px', border: '1px solid #d8c68a', borderRadius: 4 }} onKeyDown={(e) => { if (e.key === 'Enter') { const v = (e.target as HTMLInputElement).value.trim(); if (v) { setApiKey(v); setHasKey(true); } } }} />
                  <div style={{ color: '#999', marginTop: 2, fontSize: 10 }}>回车保存。没有 Key 也可直接用下方手动参数。</div>
                </div>
              ) : (
                <div style={{ marginBottom: 10 }}>
                  {chat.length > 0 && (
                    <div style={{ maxHeight: 180, overflowY: 'auto', marginBottom: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {chat.map((m, i) => (
                        <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '88%', padding: '5px 8px', borderRadius: 8, fontSize: 11, whiteSpace: 'pre-wrap', lineHeight: 1.5, background: m.role === 'user' ? '#1e6fff' : '#f0f2f5', color: m.role === 'user' ? '#fff' : '#333' }}>{m.text}</div>
                      ))}
                      {aiBusy && <div style={{ alignSelf: 'flex-start', color: '#999', fontSize: 11, padding: '2px 8px' }}>AI 理解中…</div>}
                    </div>
                  )}
                  <textarea value={aiText} onChange={(e) => setAiText(e.target.value)} placeholder={chat.length ? '回答追问或补充需求…' : '例：想要一个放3D打印机的架子，宽大概一米，带轮子方便移动'} rows={2} style={{ width: '100%', padding: '6px 8px', border: '1px solid #c9d2e0', borderRadius: 6, resize: 'vertical', fontFamily: 'inherit', fontSize: 12 }} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); runIntent(); } }} />
                  <button onClick={runIntent} disabled={aiBusy} style={{ width: '100%', marginTop: 4, padding: '6px 0', border: 'none', borderRadius: 5, background: aiBusy ? '#9db8e8' : '#1e6fff', color: '#fff', cursor: aiBusy ? 'wait' : 'pointer', fontSize: 12 }}>{aiBusy ? 'AI 理解中…' : chat.length ? '发送' : '✨ 生成方案'}</button>
                  {aiError && <div style={{ color: '#c0392b', fontSize: 11, marginTop: 4 }}>✖ {aiError}</div>}
                  {manualChanges.size > 0 && (
                    <div style={{ color: '#8a7a3a', background: '#fdf9e8', padding: '4px 8px', borderRadius: 4, fontSize: 10, marginTop: 4 }}>
                      🔒 已手动调整并锁定：{[...manualChanges.values()].join('，')}
                    </div>
                  )}
                </div>
              )}
              {(aiResult?.unsupported.length || unsupportedSaved.length) ? (
                <div style={{ background: '#fdf9e8', color: '#8a7a3a', padding: '6px 8px', borderRadius: 6, fontSize: 11, marginBottom: 8 }}>
                  🚧 已存入草稿但暂不支持：{(aiResult?.unsupported ?? unsupportedSaved).join('、')}
                </div>
              ) : null}
              {aiResult && (
                <details style={{ fontSize: 11, color: '#666', marginBottom: 8 }}>
                  <summary style={{ cursor: 'pointer' }}>AI 假设与选型依据（{aiResult.assumptions.length}）</summary>
                  {aiResult.assumptions.map((a) => <div key={a} style={{ padding: '1px 0' }}>· {a}</div>)}
                </details>
              )}

              {/* 快速尺寸 */}
              <Section title="快速尺寸" icon="📐" defaultOpen={true}>
                {([['总宽 W', 'width', 200, 3000], ['总深 D', 'depth', 200, 3000], ['总高 H', 'height', 200, 3000]] as const).map(([label, key, min, max]) => (
                  <div key={key} style={{ marginBottom: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 1 }}>
                      <span style={{ fontSize: 10, color: '#6b7280', flex: 1 }}>{label}</span>
                      <input type="number" value={spec[key]} min={min} max={max} step={10} onChange={(e) => { const v = Number(e.target.value); if (v >= min && v <= max) set({ [key]: v } as Partial<FrameSpec>); }} style={{ width: 56, padding: '2px 4px', border: '1px solid #c9d2e0', borderRadius: 3, fontSize: 11, textAlign: 'right' }} />
                      <span style={{ fontSize: 10, color: '#9ca3af' }}>mm</span>
                    </div>
                    <input type="range" min={min} max={max} step={10} value={spec[key]} onChange={(e) => set({ [key]: Number(e.target.value) } as Partial<FrameSpec>)} style={{ width: '100%', height: 3 }} />
                  </div>
                ))}
              </Section>

              {/* 板材与封板 */}
              <Section title="板材与封板" icon="📦" defaultOpen={false}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
                  {([['顶', 'topPanel'], ['隔板', 'shelfPanel'], ['底', 'bottomPanel']] as const).map(([label, key]) => (
                    <label key={key} style={{ flex: 1 }}>
                      <span style={{ fontSize: 10, color: '#8a90a0' }}>{label}</span>
                      <select value={spec[key]} onChange={(e) => set({ [key]: e.target.value } as Partial<FrameSpec>)} style={{ width: '100%', marginTop: 1, padding: '2px 4px', border: '1px solid #c9d2e0', borderRadius: 3, fontSize: 10, background: spec[key] !== 'none' ? '#f0f7ff' : '#fff' }}>
                        <option value="none">无</option><option value="wood">木板</option><option value="glass">玻璃</option><option value="acrylic">亚克力</option><option value="pegboard">洞洞板</option>
                      </select>
                    </label>
                  ))}
                </div>
                {spec.scene !== 'workbench' && spec.topPanel !== 'none' && (
                  <div style={{ marginBottom: 6 }}>
                    <span style={{ fontSize: 10, color: '#8a90a0' }}>顶板模式</span>
                    <select value={spec.topPanelMode ?? 'overlay'} onChange={(e) => set({ topPanelMode: e.target.value as FrameSpec['topPanelMode'] })} style={{ width: '100%', marginTop: 1, padding: '2px 4px', border: '1px solid #c9d2e0', borderRadius: 3, fontSize: 10 }}>
                      <option value="overlay">全覆盖</option><option value="recessed">凹陷嵌框</option>
                    </select>
                  </div>
                )}
                <div style={{ display: 'flex', gap: 4 }}>
                  {([['背', 'backPanel'], ['左', 'leftPanel'], ['右', 'rightPanel']] as const).map(([label, key]) => (
                    <label key={key} style={{ flex: 1 }}>
                      <span style={{ fontSize: 10, color: '#8a90a0' }}>{label}</span>
                      <select value={spec[key]} onChange={(e) => set({ [key]: e.target.value } as Partial<FrameSpec>)} style={{ width: '100%', marginTop: 1, padding: '2px 4px', border: '1px solid #c9d2e0', borderRadius: 3, fontSize: 10, background: spec[key] !== 'none' ? '#f0f7ff' : '#fff' }}>
                        <option value="none">无</option><option value="wood">木板</option><option value="acrylic">亚克力</option><option value="pegboard">洞洞板</option><option value="wire-mesh">围网</option>
                      </select>
                    </label>
                  ))}
                  <label style={{ flex: 1 }}>
                    <span style={{ fontSize: 10, color: '#8a90a0' }}>门</span>
                    <select value={spec.doorPanel ?? 'none'} onChange={(e) => set({ doorPanel: e.target.value as FrameSpec['doorPanel'] })} style={{ width: '100%', marginTop: 1, padding: '2px 4px', border: '1px solid #c9d2e0', borderRadius: 3, fontSize: 10, background: (spec.doorPanel ?? 'none') !== 'none' ? '#f0f7ff' : '#fff' }}>
                      <option value="none">无</option><option value="wood">木门</option><option value="glass">玻璃门</option><option value="acrylic">亚克力门</option>
                    </select>
                  </label>
                </div>
              </Section>

              {/* 结构与外观 */}
              <Section title="结构与外观" icon="🔧" defaultOpen={false}>
                <div style={{ marginBottom: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                    <span style={{ fontSize: 10, color: '#6b7280' }}>{spec.scene === 'workbench' ? '桌面高度' : '隔板层数'}</span>
                    <span style={{ fontSize: 11, color: '#3769b2', fontWeight: 600 }}>{spec.scene === 'workbench' ? `${spec.workbenchDeskTopHeightMm ?? 740} mm` : spec.shelfCount}</span>
                  </div>
                  {spec.scene === 'workbench' ? (
                    <input type="range" min={680} max={800} step={10} value={spec.workbenchDeskTopHeightMm ?? 740} onChange={(e) => set({ workbenchDeskTopHeightMm: Number(e.target.value) })} style={{ width: '100%', height: 3 }} />
                  ) : (
                    <input type="range" min={0} max={4} step={1} value={spec.shelfCount} onChange={(e) => set({ shelfCount: Number(e.target.value) })} style={{ width: '100%', height: 3 }} />
                  )}
                </div>
                {spec.scene !== 'workbench' && (
                  <div style={{ marginBottom: 6 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                      <span style={{ fontSize: 10, color: '#6b7280' }}>抽屉层数</span>
                      <span style={{ fontSize: 11, color: '#3769b2', fontWeight: 600 }}>{spec.drawerCount ?? 0}</span>
                    </div>
                    <input type="range" min={0} max={5} step={1} value={spec.drawerCount ?? 0} onChange={(e) => set({ drawerCount: Number(e.target.value) })} style={{ width: '100%', height: 3 }} />
                    {(spec.drawerCount ?? 0) > 0 && (
                      <select value={spec.drawerKind ?? 'ready-made'} onChange={(e) => set({ drawerKind: e.target.value as FrameSpec['drawerKind'] })} style={{ width: '100%', marginTop: 3, padding: '2px 4px', border: '1px solid #c9d2e0', borderRadius: 3, fontSize: 10 }}>
                        <option value="ready-made">成品抽屉</option><option value="turnover-box">周转箱</option>
                      </select>
                    )}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 4 }}>
                  <label style={{ flex: 1 }}>
                    <span style={{ fontSize: 10, color: '#8a90a0' }}>截面</span>
                    <select value={spec.sectionId} onChange={(e) => set({ sectionId: e.target.value })} style={{ width: '100%', marginTop: 1, padding: '2px 4px', border: '1px solid #c9d2e0', borderRadius: 3, fontSize: 10 }}>
                      {kb.sections.map((s) => (<option key={s.section.id} value={s.section.id}>{s.section.name}</option>))}
                    </select>
                  </label>
                  <label style={{ flex: 1 }}>
                    <span style={{ fontSize: 10, color: '#8a90a0' }}>连接件</span>
                    <select value={spec.connectorId} onChange={(e) => set({ connectorId: e.target.value })} style={{ width: '100%', marginTop: 1, padding: '2px 4px', border: '1px solid #c9d2e0', borderRadius: 3, fontSize: 10 }}>
                      {kb.connectors.map((c) => {
                        const sec = kb.sections.find((s) => s.section.id === spec.sectionId)!.section;
                        const ok = c.connector.compatible.series.includes(sec.id) && c.connector.compatible.slotWidths.includes(sec.slot.width);
                        return (<option key={c.connector.id} value={c.connector.id} disabled={!ok}>{c.connector.name}{ok ? '' : ' ⚠'}</option>);
                      })}
                    </select>
                  </label>
                </div>
                <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                  <label style={{ flex: 1 }}>
                    <span style={{ fontSize: 10, color: '#8a90a0' }}>颜色</span>
                    <select value={spec.profileColor ?? 'silver'} onChange={(e) => set({ profileColor: e.target.value as FrameSpec['profileColor'] })} style={{ width: '100%', marginTop: 1, padding: '2px 4px', border: '1px solid #c9d2e0', borderRadius: 3, fontSize: 10 }}>
                      <option value="silver">银白</option><option value="black">哑光黑</option><option value="gold">香槟金</option>
                    </select>
                  </label>
                  <label style={{ flex: 1 }}>
                    <span style={{ fontSize: 10, color: '#8a90a0' }}>底部</span>
                    <select value={spec.mobility} onChange={(e) => set({ mobility: e.target.value as FrameSpec['mobility'] })} style={{ width: '100%', marginTop: 1, padding: '2px 4px', border: '1px solid #c9d2e0', borderRadius: 3, fontSize: 10 }}>
                      <option value="fixed">落地</option><option value="leveling-feet">调平脚</option><option value="caster">脚轮</option>
                    </select>
                  </label>
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                  <label style={{ fontSize: 10, display: 'flex', alignItems: 'center', gap: 3 }}><input type="checkbox" checked={spec.brace} onChange={(e) => set({ brace: e.target.checked })} style={{ margin: 0 }} /> 斜撑</label>
                  <label style={{ fontSize: 10, display: 'flex', alignItems: 'center', gap: 3 }}><input type="checkbox" checked={!!spec.centerColumn} onChange={(e) => set({ centerColumn: e.target.checked ? { offsetRatio: 0.5, left: { type: 'drawer', count: 3 }, right: { type: 'drawer', count: 3 } } : undefined })} style={{ margin: 0 }} /> 中柱</label>
                  <label style={{ fontSize: 10, display: 'flex', alignItems: 'center', gap: 3 }}><input type="checkbox" checked={spec.highRisk} onChange={(e) => set({ highRisk: e.target.checked })} style={{ margin: 0 }} /> 高风险</label>
                </div>
              </Section>

              {/* 中柱分区配置（勾选中柱后显示） */}
              {spec.centerColumn && <CenterColumnConfig cc={spec.centerColumn} onChange={(patch) => set({ centerColumn: { ...spec.centerColumn!, ...patch } })} />}

              {/* 高级 */}
              <Section title="高级" icon="⚙️" defaultOpen={false}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                  <span style={{ fontSize: 10, color: '#6b7280' }}>载荷</span>
                  <span style={{ fontSize: 11, color: '#3769b2', fontWeight: 600 }}>{spec.loadKg} kg</span>
                </div>
                <input type="range" min={5} max={200} step={5} value={spec.loadKg} onChange={(e) => set({ loadKg: Number(e.target.value) })} style={{ width: '100%', height: 3, marginBottom: 6 }} />
                <div style={{ display: 'flex', gap: 4 }}>
                  <label style={{ flex: 1 }}>
                    <span style={{ fontSize: 10, color: '#8a90a0' }}>分布</span>
                    <select value={spec.loadType} onChange={(e) => set({ loadType: e.target.value as FrameSpec['loadType'] })} style={{ width: '100%', marginTop: 1, padding: '2px 4px', border: '1px solid #c9d2e0', borderRadius: 3, fontSize: 10 }}>
                      <option value="distributed">均布</option><option value="concentrated">集中</option>
                    </select>
                  </label>
                  <label style={{ flex: 1 }}>
                    <span style={{ fontSize: 10, color: '#8a90a0' }}>场景</span>
                    <select value={spec.scene} onChange={(e) => set({ scene: e.target.value as FrameSpec['scene'] })} style={{ width: '100%', marginTop: 1, padding: '2px 4px', border: '1px solid #c9d2e0', borderRadius: 3, fontSize: 10 }}>
                      <option value="diy-furniture">家具</option><option value="workbench">工作台</option><option value="industrial-rack">机架</option><option value="precision">精密</option>
                    </select>
                  </label>
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                  <label style={{ fontSize: 10, display: 'flex', alignItems: 'center', gap: 3 }}><input type="checkbox" checked={spec.vibration ?? false} onChange={(e) => set({ vibration: e.target.checked })} style={{ margin: 0 }} /> 振动</label>
                  <label style={{ fontSize: 10, display: 'flex', alignItems: 'center', gap: 3 }}><input type="checkbox" checked={spec.ledStrip ?? false} onChange={(e) => set({ ledStrip: e.target.checked })} style={{ margin: 0 }} /> LED</label>
                </div>
              </Section>

              {recommendation && (
                <div style={{ background: '#ebf4ff', color: '#2b6cb0', padding: '6px 8px', borderRadius: 5, marginTop: 8, fontSize: 11 }}>
                  💡 推荐 <b>{kb.sections.find((s) => s.section.id === recommendation.use)?.section.name}</b>
                  <button onClick={() => set({ sectionId: recommendation.use })} style={{ marginLeft: 6, border: '1px solid #2b6cb0', background: '#fff', color: '#2b6cb0', borderRadius: 3, padding: '1px 6px', cursor: 'pointer', fontSize: 10 }}>应用</button>
                </div>
              )}
            </div>
          </aside>
        )}
        {!leftOpen && (
          <button onClick={() => setLeftOpen(true)} title="展开参数" style={{ width: 36, background: '#e8edf4', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, flexShrink: 0, border: 'none', borderRight: '1px solid #dde1e8' }}>
            <span style={{ fontSize: 14, color: '#3769b2' }}>⟩</span>
            <span style={{ writingMode: 'vertical-rl', fontSize: 9, color: '#3769b2', letterSpacing: 1 }}>参数</span>
          </button>
        )}

        {/* ── 3D 画布（主导区域） ── */}
        <main style={{ flex: 1, position: 'relative', background: '#f5f6f8' }}>
          <Viewer items={items} joints={mode === 'structure' ? joints : []} machining={mode !== 'appearance' ? machining : []} panels={panels} accessories={accessories} mountPoints={mode === 'structure' ? mountPoints : []} dims={dims} drawing={mode === 'drawing'} bubbles={bubbles} focusY={spec.height / 2} onSelect={setSelection} selection={selection} warnMemberIds={warnMemberIds} profileColor={spec.profileColor} highlightedPartNo={highlightedPartNo} />
          {/* 视图模式工具条 — 三模式明确分工 */}
          <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
            <div style={{ display: 'flex', gap: 2, background: 'rgba(255,255,255,.92)', padding: 3, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,.08)' }}>
              {([
                ['appearance', '外观', '看造型', '1'],
                ['structure', '结构', '看连接', '2'],
                ['drawing', '图纸', '看尺寸', '3'],
              ] as const).map(([m, name, desc, key]) => (
                <button key={m} onClick={() => setMode(m)} title={desc} style={{
                  border: 'none', borderRadius: 5, padding: '5px 12px', cursor: 'pointer', fontSize: 12,
                  background: mode === m ? '#1e6fff' : 'transparent', color: mode === m ? '#fff' : '#555',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,
                }}>
                  <span>{name}<sup style={{ fontSize: 8, marginLeft: 2, opacity: 0.6 }}>{key}</sup></span>
                  <span style={{ fontSize: 9, opacity: mode === m ? 0.8 : 0.5 }}>{desc}</span>
                </button>
              ))}
            </div>
          </div>
          {selectedMember && (
            <div style={{ position: 'absolute', top: 56, right: 12, width: 220, background: 'rgba(255,255,255,.95)', borderRadius: 8, padding: '10px 12px', boxShadow: '0 4px 16px rgba(0,0,0,.12)', fontSize: 12, lineHeight: 1.8 }}>
              <div style={{ fontWeight: 600, marginBottom: 3, color: '#1e6fff' }}>{roleName[selectedMember.role] ?? selectedMember.role} · {selectedMember.id}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>下料长度：<input key={selectedMember.id + ':' + selectedMember.length} type="number" defaultValue={selectedMember.length} min={40} max={2000} step={10} style={{ width: 60, padding: '2px 4px', border: '1px solid #c9d2e0', borderRadius: 3 }} onKeyDown={(e) => { if (e.key === 'Enter') commitLength((e.target as HTMLInputElement).value); }} onBlur={(e) => { if (Number(e.target.value) !== selectedMember.length) commitLength(e.target.value); }} /> mm</div>
              <div style={{ color: '#888', fontSize: 11 }}>回车确认，{lengthTarget[selectedMember.role]}</div>
              <div>米重：{selectedMember.section.weightPerMeter != null ? `${selectedMember.section.weightPerMeter} kg/m` : '待补'}</div>
              <div>单根约：{selectedMember.section.price.perMeter != null ? `¥${((selectedMember.section.price.perMeter * selectedMember.length) / 1000).toFixed(2)}` : '待补'}</div>
            </div>
          )}
          {selectedJoint && selectedConnector && (
            <div style={{ position: 'absolute', top: 56, right: 12, width: 220, background: 'rgba(255,255,255,.95)', borderRadius: 8, padding: '10px 12px', boxShadow: '0 4px 16px rgba(0,0,0,.12)', fontSize: 12, lineHeight: 1.8 }}>
              <div style={{ fontWeight: 600, marginBottom: 3, color: '#1e6fff' }}>连接件 · {selectedJoint.id}</div>
              <div>{selectedConnector.connector.name}</div>
              <div>强度等级：{selectedConnector.connector.strengthClass} / 5</div>
              <div>安装：{selectedConnector.connector.visibility === 'hidden' ? '隐藏式' : '外露式'}{selectedConnector.connector.machining.length > 0 && ` · 需加工 ${selectedConnector.connector.machining.length} 项`}</div>
            </div>
          )}
          {selection?.type === 'panel' && model && (() => {
            const panel = model.panels.find((p) => p.id === selection.id);
            if (!panel) return null;
            const ps = kb.panels[panel.material];
            const kgPerM2 = ps?.kgPerM2 ?? 10;
            const wt = (panel.size[0] / 1000) * (panel.size[1] / 1000) * kgPerM2;
            return (
              <div style={{ position: 'absolute', top: 56, right: 12, width: 220, background: 'rgba(255,255,255,.95)', borderRadius: 8, padding: '10px 12px', boxShadow: '0 4px 16px rgba(0,0,0,.12)', fontSize: 12, lineHeight: 1.8 }}>
                <div style={{ fontWeight: 600, marginBottom: 3, color: '#1e6fff' }}>板材 · {panel.partNo}</div>
                <div>材质：{ps?.name ?? panel.material}</div>
                <div>尺寸：{panel.size[0]}×{panel.size[1]}×{panel.size[2]} mm</div>
                <div>重量：{wt.toFixed(2)} kg</div>
                <div>位置：{panel.mode}</div>
              </div>
            );
          })()}
          {partDetail && model && (() => {
            const item = model.cutList.find((c) => c.partNo === partDetail);
            if (!item) return null;
            const ss = kb.sections.find((s) => s.section.id === item.sectionId)?.section.size[0] ?? 30;
            return <PartDrawing item={item} sectionSize={ss} tolerance={tolOf(item.length)} onClose={() => setPartDetail(null)} />;
          })()}
        </main>

        {/* ── 右侧栏：结果 ── */}
        {rightOpen && (
          <aside style={{ width: 300, display: 'flex', flexDirection: 'column', background: '#fff', borderLeft: '1px solid #e2e5ea', flexShrink: 0 }}>
            <button onClick={() => setRightOpen(false)} style={{ padding: '7px 12px', border: 'none', borderBottom: '1px solid #eef0f3', background: '#f7f8fa', cursor: 'pointer', fontSize: 11, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>⟩</span><span>收起结果</span>
            </button>
            <div style={{ padding: 12, overflowY: 'auto', fontSize: 12, lineHeight: 1.6 }}>
              {model ? (
                <>
                  {model.warnings.map((w) => (
                    <div key={w} style={{ color: '#b7791f', background: '#fffbeb', padding: '5px 8px', borderRadius: 4, marginBottom: 6, fontSize: 11 }}>⚠ {w}</div>
                  ))}
                  <h3 style={{ margin: '0 0 4px', fontSize: 13 }}>结构校验</h3>
                  {model.checks.map((c, i) => {
                    const st = levelStyle[c.level];
                    const hasMembers = c.memberIds != null && c.memberIds.length > 0;
                    const focused = highlightedCheck === c.ruleId;
                    return (
                      <div key={i} onClick={() => hasMembers && setHighlightedCheck((p) => (p === c.ruleId ? null : c.ruleId))} style={{
                        color: st.color, background: focused ? '#fff3cd' : st.bg, padding: '4px 7px', borderRadius: 3, marginBottom: 3, fontSize: 11,
                        cursor: hasMembers ? 'pointer' : 'default', border: focused ? '1px solid #e0c050' : '1px solid transparent',
                      }}>
                        {st.icon} <b>{c.ruleId}</b> {c.message}{hasMembers && <span style={{ fontSize: 9, marginLeft: 4, opacity: 0.7 }}>●高亮</span>}
                      </div>
                    );
                  })}
                  <h3 style={{ margin: '10px 0 4px', fontSize: 13 }}>切割清单</h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
                    <thead><tr style={{ borderBottom: '1px solid #d8dce2', color: '#666' }}><th style={{ padding: '3px 0' }}>件号</th><th style={{ textAlign: 'right' }}>长度</th><th style={{ textAlign: 'right' }}>数量</th></tr></thead>
                    <tbody>
                      {model.cutList.map((c) => (
                        <tr key={c.partNo} onClick={() => setHighlightedPartNo((p) => (p === c.partNo ? null : c.partNo))} title="点击高亮对应构件" style={{ borderBottom: '1px solid #f0f2f5', cursor: 'pointer', background: highlightedPartNo === c.partNo ? '#e8f4ff' : 'transparent' }}>
                          <td style={{ padding: '3px 0', color: '#1e6fff', textDecoration: 'underline' }}>{c.partNo}</td><td style={{ textAlign: 'right' }}>{c.length}</td><td style={{ textAlign: 'right' }}>×{c.qty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {nesting && (
                    <>
                      <h3 style={{ margin: '10px 0 4px', fontSize: 13 }}>下料方案</h3>
                      <div style={{ fontSize: 11, color: '#555', marginBottom: 3 }}>原料 {nesting.stockLengthMm}mm × {nesting.totalStockBars} 根 · 利用率 {(nesting.utilization * 100).toFixed(1)}%</div>
                      {nesting.bars.map((b, i) => (
                        <div key={i} style={{ fontSize: 10, color: '#777', padding: '2px 0', borderBottom: '1px solid #f0f2f5' }}>#{i + 1}：{b.cuts.map((c) => `${c.partNo}(${c.length})`).join(' + ')} → 余料 {b.remnantMm}mm</div>
                      ))}
                    </>
                  )}
                  {model.panelList.length > 0 && (
                    <>
                      <h3 style={{ margin: '10px 0 4px', fontSize: 13 }}>板材清单</h3>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
                        <thead><tr style={{ borderBottom: '1px solid #d8dce2', color: '#666' }}><th style={{ padding: '3px 0', textAlign: 'left' }}>件号</th><th style={{ textAlign: 'left' }}>材质</th><th style={{ textAlign: 'right' }}>长×宽×厚</th><th style={{ textAlign: 'right' }}>重量</th><th style={{ textAlign: 'right' }}>数量</th></tr></thead>
                        <tbody>
                          {model.panelList.map((p) => {
                            const kgPerM2 = kb.panels[p.material]?.kgPerM2 ?? 10;
                            const wt = ((p.size[0] / 1000) * (p.size[1] / 1000) * kgPerM2 * p.qty);
                            return (
                              <tr key={p.partNo} style={{ borderBottom: '1px solid #f0f2f5' }}>
                                <td style={{ padding: '3px 0' }}>{p.partNo}</td><td>{p.materialName}</td><td style={{ textAlign: 'right', fontSize: 10 }}>{p.size[0]}×{p.size[1]}×{p.size[2]}</td><td style={{ textAlign: 'right' }}>{wt.toFixed(1)}kg</td><td style={{ textAlign: 'right' }}>×{p.qty}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <div style={{ fontSize: 10, color: '#999', marginTop: '3px' }}>板材总重 {model.panelList.reduce((s, p) => { const k = kb.panels[p.material]?.kgPerM2 ?? 10; return s + (p.size[0] / 1000) * (p.size[1] / 1000) * k * p.qty; }, 0).toFixed(1)}kg · {model.panelList.map((p) => p.holeNote).join(' · ')}</div>
                    </>
                  )}
                  <h3 style={{ margin: '10px 0 4px', fontSize: 13 }}>价格明细</h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
                    <tbody>
                      {([['型材', model.totals.cost.profile], ['板材', model.totals.cost.panels], ['连接件', model.totals.cost.connectors], ['紧固件', model.totals.cost.fasteners], ['加工', model.totals.cost.machining], ['附件', model.totals.cost.accessories]] as const).filter(([, v]) => v > 0).map(([label, v]) => (
                        <tr key={label} style={{ borderBottom: '1px solid #f0f2f5' }}><td style={{ padding: '2px 0', color: '#666' }}>{label}</td><td style={{ textAlign: 'right' }}>¥{v.toFixed(2)}</td></tr>
                      ))}
                      <tr><td style={{ padding: '3px 0', fontWeight: 600 }}>合计</td><td style={{ textAlign: 'right', fontWeight: 600 }}>¥{model.totals.cost.total.toFixed(2)}</td></tr>
                    </tbody>
                  </table>
                  {assembly.length > 0 && (
                    <details style={{ marginTop: 8 }}>
                      <summary style={{ cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>装配步骤（{assembly.length} 步）</summary>
                      {assembly.map((s) => (
                        <div key={s.step} style={{ padding: '4px 0', borderBottom: '1px solid #f0f2f5', fontSize: 11 }}>
                          <b>{s.step}. {s.title}</b>
                          {s.parts.length > 0 && <div style={{ color: '#555' }}>用件：{s.parts.join('、')}</div>}
                          {s.note && <div style={{ color: '#999', fontSize: 10 }}>{s.note}</div>}
                        </div>
                      ))}
                    </details>
                  )}
                </>
              ) : (
                <div style={{ color: '#999' }}>生成方案后这里显示校验结果与清单</div>
              )}
            </div>
          </aside>
        )}
        {!rightOpen && (
          <button onClick={() => setRightOpen(true)} title="展开结果" style={{ width: 36, background: '#e8edf4', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, flexShrink: 0, border: 'none', borderLeft: '1px solid #dde1e8' }}>
            <span style={{ fontSize: 14, color: '#3769b2' }}>⟨</span>
            <span style={{ writingMode: 'vertical-rl', fontSize: 9, color: '#3769b2', letterSpacing: 1 }}>结果</span>
          </button>
        )}
      </div>
    </div>
  );
}
