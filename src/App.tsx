import { useMemo, useState } from 'react';
import { loadKnowledgeBase } from './knowledge/loader';
import { Viewer } from './viewer/Viewer';

export default function App() {
  const kb = useMemo(() => loadKnowledgeBase(), []);
  const [sectionId, setSectionId] = useState(kb.sections[0]?.section.id ?? '');
  const [length, setLength] = useState(500);

  const record = kb.sections.find((s) => s.section.id === sectionId);
  if (!record) return <div style={{ padding: 20 }}>知识库为空：knowledge/sections/ 下没有截面数据</div>;

  const sec = record.section;
  const weight = sec.weightPerMeter != null ? ((sec.weightPerMeter * length) / 1000).toFixed(2) : '—';
  const price = sec.price.perMeter != null ? ((sec.price.perMeter * length) / 1000).toFixed(2) : '—';

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <aside style={{ width: 300, padding: 16, background: '#fff', borderRight: '1px solid #e2e5ea', overflowY: 'auto', fontSize: 13, lineHeight: 1.7 }}>
        <h2 style={{ margin: '0 0 4px', fontSize: 18 }}>随构 · M1 骨架</h2>
        <div style={{ color: '#888', marginBottom: 12 }}>知识库驱动的型材查看器</div>

        <label style={{ display: 'block', marginBottom: 8 }}>
          截面系列
          <select value={sectionId} onChange={(e) => setSectionId(e.target.value)} style={{ width: '100%', marginTop: 4 }}>
            {kb.sections.map((s) => (
              <option key={s.section.id} value={s.section.id}>{s.section.name}</option>
            ))}
          </select>
        </label>

        <label style={{ display: 'block', marginBottom: 12 }}>
          长度 {length} mm
          <input type="range" min={100} max={2000} step={10} value={length}
            onChange={(e) => setLength(Number(e.target.value))} style={{ width: '100%' }} />
        </label>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {[
              ['槽型/槽宽', `${sec.slot.type} / ${sec.slot.width}mm`],
              ['壁厚', sec.wallThickness != null ? `${sec.wallThickness}mm` : '⚠ 待补'],
              ['米重', sec.weightPerMeter != null ? `${sec.weightPerMeter}kg/m` : '⚠ 待补'],
              ['中心孔', `Φ${sec.coreHole.diameter} 攻${sec.coreHole.tapping}×${sec.coreHole.tapDepth}`],
              ['惯性矩 Ix', `${(sec.mechanics.momentOfInertia.ix / 1e4).toFixed(1)} cm⁴（默认值）`],
              ['本段重量', `${weight} kg`],
              ['本段价格', `¥${price}（未税）`],
              ['数据来源', `${record.meta.source} (${record.meta.confidence})`],
            ].map(([k, v]) => (
              <tr key={k as string} style={{ borderBottom: '1px solid #f0f2f5' }}>
                <td style={{ padding: '4px 0', color: '#666' }}>{k}</td>
                <td style={{ padding: '4px 0', textAlign: 'right' }}>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: 12, color: '#aaa', fontSize: 12 }}>
          知识库：{kb.sections.length} 截面 · {kb.connectors.length} 连接件 · {Object.keys(kb.rules).length} 规则包
        </div>
      </aside>

      <main style={{ flex: 1 }}>
        <Viewer section={sec} length={length} />
      </main>
    </div>
  );
}
