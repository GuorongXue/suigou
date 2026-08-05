import { useMemo, useState } from 'react';
import { loadKnowledgeBase } from './knowledge/loader';
import { generateFrame } from './engine/generate';
import { selectSection } from './engine/select';
import { runGolden } from './engine/golden';
import type { FrameSpec } from './engine/types';
import { Viewer, type RenderMember, type RenderJoint, type RenderMachining, type RenderDim, type Selection } from './viewer/Viewer';

type ViewMode = 'appearance' | 'structure' | 'drawing';

export default function App() {
  const kb = useMemo(() => loadKnowledgeBase(), []);
  const [spec, setSpec] = useState<FrameSpec>({
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
  });
  const [selection, setSelection] = useState<Selection | null>(null);
  const [mode, setMode] = useState<ViewMode>('appearance');

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

  const set = (patch: Partial<FrameSpec>) => setSpec((s) => ({ ...s, ...patch }));
  const model = result.model;
  const roleName: Record<string, string> = { post: '立柱', 'beam-x': '横梁(X向)', 'beam-z': '纵梁(Z向)' };

  const selectedMember = selection?.type === 'member' ? items.find((i) => i.id === selection.id) ?? null : null;
  const selectedJoint = selection?.type === 'joint' && model
    ? model.joints.find((j) => j.id === selection.id) ?? null : null;
  const selectedConnector = selectedJoint
    ? kb.connectors.find((c) => c.connector.id === selectedJoint.connectorId) ?? null : null;

  // 尺寸标注：外观/图纸模式显示整体 W/D/H；图纸模式加每种下料长度代表标注；选中构件始终标注
  const dims: RenderDim[] = useMemo(() => {
    const out: RenderDim[] = [];
    const { width: W, depth: D, height: H } = spec;
    const secSize = kb.sections.find((s) => s.section.id === spec.sectionId)?.section.size[0] ?? 30;
    if (mode !== 'structure') {
      out.push({ a: [-W / 2, 2, D / 2], b: [W / 2, 2, D / 2], offset: [0, 0, 90], label: `W ${W}` });
      out.push({ a: [W / 2, 2, D / 2], b: [W / 2, 2, -D / 2], offset: [90, 0, 0], label: `D ${D}` });
      out.push({ a: [-W / 2, 0, -D / 2], b: [-W / 2, H, -D / 2], offset: [-90, 0, 0], label: `H ${H}` });
    }
    if (mode === 'drawing' && model) {
      const seen = new Set<number>();
      for (const m of model.members) {
        if (m.role === 'post' || seen.has(m.length)) continue;
        seen.add(m.length);
        const along: [number, number, number] = m.axis === 'x' ? [1, 0, 0] : [0, 0, 1];
        const a: [number, number, number] = [
          m.position[0] - along[0] * m.length / 2, m.position[1], m.position[2] - along[2] * m.length / 2];
        const b: [number, number, number] = [
          m.position[0] + along[0] * m.length / 2, m.position[1], m.position[2] + along[2] * m.length / 2];
        out.push({ a, b, offset: [0, secSize * 1.6, 0], label: `${m.length}` });
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

  /** 改构件长度 = 反算对应整体尺寸重新生成（参数微调，非自由编辑） */
  const commitLength = (raw: string) => {
    if (!selectedMember || !model) return;
    const newLen = Math.round(Number(raw));
    if (!Number.isFinite(newLen) || newLen <= 0) return;
    const sec = kb.sections.find((s) => s.section.id === model.spec.sectionId)!.section;
    const conn = kb.connectors.find((c) => c.connector.id === model.spec.connectorId)!.connector;
    const s = sec.size[0];
    const overall = newLen + 2 * s - 2 * conn.lengthOffset;
    const clamp = (v: number) => Math.min(2000, Math.max(200, v));
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

  const exportCutList = () => {
    if (!model) return;
    downloadCsv('切割清单.csv', ['件号', '截面', '下料长度mm', '数量', '加工'],
      model.cutList.map((c) => [c.partNo, c.sectionId, c.length, c.qty, c.machiningNote || '无']));
  };

  const exportBom = () => {
    if (!model) return;
    const conn = kb.connectors.find((c) => c.connector.id === spec.connectorId)!.connector;
    const rows: (string | number)[][] = model.cutList.map((c) => [
      '型材', `${c.sectionId} L${c.length}`, c.qty,
      sec2Price(c.length) != null ? (sec2Price(c.length)! * c.qty).toFixed(2) : '待补']);
    rows.push(['连接件', conn.name, model.joints.length, '']);
    const bomAgg = new Map<string, number>();
    for (const b of conn.bom) bomAgg.set(b.sku, (bomAgg.get(b.sku) ?? 0) + b.qty * model.joints.length);
    for (const [sku, qty] of bomAgg) rows.push(['配件', sku, qty, '']);
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

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <aside style={{ width: 320, padding: 16, background: '#fff', borderRight: '1px solid #e2e5ea', overflowY: 'auto', fontSize: 13, lineHeight: 1.7 }}>
        <h2 style={{ margin: '0 0 4px', fontSize: 18 }}>随构 · M3 规则引擎</h2>
        <div style={{ color: '#888', marginBottom: 12 }}>参数 → 构件图 → 校验 → 清单</div>

        {([
          ['总宽 W', 'width', 200, 2000],
          ['总深 D', 'depth', 200, 2000],
          ['总高 H', 'height', 200, 2000],
        ] as const).map(([label, key, min, max]) => (
          <label key={key} style={{ display: 'block', marginBottom: 8 }}>
            {label} {spec[key]} mm
            <input type="range" min={min} max={max} step={10} value={spec[key]}
              onChange={(e) => set({ [key]: Number(e.target.value) } as Partial<FrameSpec>)} style={{ width: '100%' }} />
          </label>
        ))}

        <label style={{ display: 'block', marginBottom: 8 }}>
          隔板层数 {spec.shelfCount}
          <input type="range" min={0} max={4} step={1} value={spec.shelfCount}
            onChange={(e) => set({ shelfCount: Number(e.target.value) })} style={{ width: '100%' }} />
        </label>

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

        <div style={{ display: 'flex', gap: 14, marginBottom: 8 }}>
          <label><input type="checkbox" checked={spec.highRisk}
            onChange={(e) => set({ highRisk: e.target.checked })} /> 高风险(水族/儿童/头顶)</label>
          <label><input type="checkbox" checked={spec.mobility === 'caster'}
            onChange={(e) => set({ mobility: e.target.checked ? 'caster' : 'fixed' })} /> 带脚轮</label>
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
            {kb.connectors.map((c) => (
              <option key={c.connector.id} value={c.connector.id}>{c.connector.name}</option>
            ))}
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

        {model && (
          <>
            {model.warnings.map((w) => (
              <div key={w} style={{ color: '#b7791f', background: '#fffbeb', padding: '6px 8px', borderRadius: 4, marginBottom: 8, fontSize: 12 }}>⚠ {w}</div>
            ))}

            <h3 style={{ margin: '12px 0 6px', fontSize: 14 }}>结构校验</h3>
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
                  <tr key={c.partNo} style={{ borderBottom: '1px solid #f0f2f5' }}>
                    <td style={{ padding: '4px 0' }}>{c.partNo}</td>
                    <td style={{ textAlign: 'right' }}>{c.length}</td>
                    <td style={{ textAlign: 'right' }}>×{c.qty}</td>
                    <td style={{ textAlign: 'right', fontSize: 11, color: '#777' }}>{c.machiningNote || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: 10, color: '#555' }}>
              构件 {model.totals.memberCount} 根 · 总长 {(model.totals.totalLengthMm / 1000).toFixed(2)} m
              {model.totals.weightKg != null && <> · 约 {model.totals.weightKg.toFixed(1)} kg</>}
              {model.totals.priceCny != null && <> · 型材约 ¥{model.totals.priceCny.toFixed(0)}（未税）</>}
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

            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button onClick={exportCutList} style={{ flex: 1, padding: '7px 0', border: '1px solid #1e6fff', borderRadius: 6, background: '#fff', color: '#1e6fff', cursor: 'pointer' }}>导出切割清单</button>
              <button onClick={exportBom} style={{ flex: 1, padding: '7px 0', border: 'none', borderRadius: 6, background: '#1e6fff', color: '#fff', cursor: 'pointer' }}>导出 BOM</button>
            </div>

            {/* 免责三要素（07文档责任设计） */}
            <div style={{ marginTop: 12, padding: '8px 10px', background: '#f7f8fa', borderRadius: 6, color: '#888', fontSize: 11, lineHeight: 1.6 }}>
              ① 本方案的承重/挠度为工程估算参考，基于典型截面参数（厂家间差异可达20%~50%）；
              ② 未经专业结构认证，不替代持证工程师核算；
              ③ 水族/儿童/头顶等高风险场景请务必勾选高风险选项并保留安全冗余，最终装配质量需自行确认。
            </div>
          </>
        )}

        <div style={{ marginTop: 12, color: '#aaa', fontSize: 12 }}>
          知识库：{kb.sections.length} 截面 · {kb.connectors.length} 连接件 · {Object.keys(kb.rules).length} 规则包
        </div>

        <details style={{ marginTop: 6, fontSize: 12 }}>
          <summary style={{ cursor: 'pointer', color: goldenPass === golden.length ? '#2f855a' : '#c0392b' }}>
            Golden 用例 {goldenPass}/{golden.length} {goldenPass === golden.length ? '✓ 全部通过' : '✖ 存在失败'}
          </summary>
          {golden.map((g) => (
            <div key={g.id} style={{ color: g.pass ? '#2f855a' : '#c0392b', padding: '2px 0' }}>
              {g.pass ? '✓' : '✖'} {g.id}（{g.rule}）actual: {g.actual}
            </div>
          ))}
        </details>
      </aside>

      <main style={{ flex: 1, position: 'relative' }}>
        <Viewer
          items={items}
          joints={mode === 'structure' ? joints : []}
          machining={mode !== 'appearance' ? machining : []}
          dims={dims}
          focusY={spec.height / 2}
          onSelect={setSelection}
          selection={selection}
          warnMemberIds={warnMemberIds}
        />
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
            position: 'absolute', top: 14, right: 14, width: 240,
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
            position: 'absolute', top: 14, right: 14, width: 240,
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
      </main>
    </div>
  );
}
