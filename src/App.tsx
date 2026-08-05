import { useMemo, useState } from 'react';
import { loadKnowledgeBase } from './knowledge/loader';
import { generateFrame } from './engine/generate';
import type { FrameSpec } from './engine/types';
import { Viewer, type RenderMember, type RenderJoint } from './viewer/Viewer';

export default function App() {
  const kb = useMemo(() => loadKnowledgeBase(), []);
  const [spec, setSpec] = useState<FrameSpec>({
    width: 700,
    depth: 400,
    height: 720,
    sectionId: 'eu-3030',
    connectorId: 'corner-bracket-30',
    shelfCount: 1,
  });
  const [selected, setSelected] = useState<RenderMember | null>(null);

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
        position: j.position,
        beamAxis: j.beamAxis,
        outward: j.outward,
        ySide: j.ySide,
        hidden: conn.visibility === 'hidden',
        size: sec.size[0],
      };
    });
  }, [result, kb]);

  const set = (patch: Partial<FrameSpec>) => { setSpec((s) => ({ ...s, ...patch })); setSelected(null); };
  const model = result.model;
  const roleName: Record<string, string> = { post: '立柱', 'beam-x': '横梁(X向)', 'beam-z': '纵梁(Z向)' };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <aside style={{ width: 320, padding: 16, background: '#fff', borderRight: '1px solid #e2e5ea', overflowY: 'auto', fontSize: 13, lineHeight: 1.7 }}>
        <h2 style={{ margin: '0 0 4px', fontSize: 18 }}>随构 · M2 生成引擎</h2>
        <div style={{ color: '#888', marginBottom: 12 }}>参数 → 构件图 → 查看器（纯确定性）</div>

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

        {model && (
          <>
            {model.warnings.map((w) => (
              <div key={w} style={{ color: '#b7791f', background: '#fffbeb', padding: '6px 8px', borderRadius: 4, marginBottom: 8, fontSize: 12 }}>⚠ {w}</div>
            ))}

            <h3 style={{ margin: '12px 0 6px', fontSize: 14 }}>切割清单</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #d8dce2', color: '#666', textAlign: 'left' }}>
                  <th style={{ padding: '4px 0' }}>截面</th>
                  <th style={{ textAlign: 'right' }}>下料长度</th>
                  <th style={{ textAlign: 'right' }}>数量</th>
                </tr>
              </thead>
              <tbody>
                {model.cutList.map((c) => (
                  <tr key={c.length} style={{ borderBottom: '1px solid #f0f2f5' }}>
                    <td style={{ padding: '4px 0' }}>{c.sectionId}</td>
                    <td style={{ textAlign: 'right' }}>{c.length} mm</td>
                    <td style={{ textAlign: 'right' }}>×{c.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: 10, color: '#555' }}>
              构件 {model.totals.memberCount} 根 · 总长 {(model.totals.totalLengthMm / 1000).toFixed(2)} m
              {model.totals.weightKg != null && <> · 约 {model.totals.weightKg.toFixed(1)} kg</>}
              {model.totals.priceCny != null && <> · 型材约 ¥{model.totals.priceCny.toFixed(0)}（未税）</>}
            </div>
          </>
        )}

        <div style={{ marginTop: 12, color: '#aaa', fontSize: 12 }}>
          知识库：{kb.sections.length} 截面 · {kb.connectors.length} 连接件 · {Object.keys(kb.rules).length} 规则包
        </div>
      </aside>

      <main style={{ flex: 1, position: 'relative' }}>
        <Viewer
          items={items}
          joints={joints}
          focusY={spec.height / 2}
          onSelect={setSelected}
          selectedId={selected?.id ?? null}
        />
        {selected && (
          <div style={{
            position: 'absolute', top: 14, right: 14, width: 230,
            background: 'rgba(255,255,255,.96)', borderRadius: 8, padding: '12px 14px',
            boxShadow: '0 4px 16px rgba(0,0,0,.12)', fontSize: 13, lineHeight: 1.8,
          }}>
            <div style={{ fontWeight: 600, marginBottom: 4, color: '#1e6fff' }}>
              {roleName[selected.role] ?? selected.role} · {selected.id}
            </div>
            <div>截面：{selected.section.name}</div>
            <div>下料长度：<b>{selected.length} mm</b></div>
            <div>米重：{selected.section.weightPerMeter != null ? `${selected.section.weightPerMeter} kg/m` : '待补'}</div>
            <div>单根约：{selected.section.price.perMeter != null ? `¥${((selected.section.price.perMeter * selected.length) / 1000).toFixed(2)}` : '待补'}</div>
            <div style={{ color: '#999', fontSize: 12, marginTop: 4 }}>点击空白处取消选择</div>
          </div>
        )}
      </main>
    </div>
  );
}
