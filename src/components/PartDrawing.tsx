import type { CutListItem } from '../engine/types';

/** 加工面人读名（世界轴向 → 装配朝向） */
const FACE_NAME: Record<string, string> = {
  'y1': '上表面', 'y-1': '下表面', 'z1': '前面', 'z-1': '背面', 'x1': '右侧面', 'x-1': '左侧面', end: '端面',
};
const faceName = (f: string) => FACE_NAME[f.replace('+', '1').replace('--', '-')] ?? FACE_NAME[f] ?? f;

/**
 * 单件加工图（SVG）：按加工面分条带视图，孔位从左端基准标注尺寸。
 * 工人拿图可直接划线打孔——图纸模式的"最后一公里"。
 */
export function PartDrawing({ item, sectionSize, tolerance, onClose }: {
  item: CutListItem;
  /** 截面边长 mm（条带高按比例） */
  sectionSize: number;
  tolerance: string;
  onClose: () => void;
}) {
  const W = 560;
  const drawW = 460;
  const x0 = 60;
  const scale = drawW / item.length;
  const bandH = Math.max(18, Math.min(34, sectionSize * scale * 4));

  const sideOps = item.ops.filter((o) => o.face !== 'end');
  const endOps = item.ops.filter((o) => o.face === 'end');
  const faces = [...new Set(sideOps.map((o) => o.face))];

  const bandGap = 64;
  const topPad = 46;
  const H = topPad + Math.max(faces.length, 1) * bandGap + 46 + (endOps.length ? 22 : 0);

  let y = topPad;
  const bands = faces.map((face) => {
    const ops = sideOps.filter((o) => o.face === face).sort((a, b) => a.fromStart - b.fromStart);
    const by = y;
    y += bandGap;
    return { face, ops, y: by };
  });
  const totalDimY = y + 14;

  return (
    <div style={{
      position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
      background: '#fff', borderRadius: 10, boxShadow: '0 8px 40px rgba(0,0,0,.25)',
      padding: '14px 18px', zIndex: 30,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6, fontSize: 13 }}>
        <b style={{ fontSize: 16 }}>{item.partNo} 单件加工图</b>
        <span>{item.sectionId}</span>
        <span>L={item.length}mm（{tolerance}）</span>
        <span>×{item.qty} 件</span>
        <div style={{ flex: 1 }} />
        <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 16, color: '#888' }}>✕</button>
      </div>
      <svg width={W} height={H} style={{ display: 'block', background: '#fff' }}>
        {/* 每个加工面一条带视图 */}
        {bands.map(({ face, ops, y: by }) => (
          <g key={face}>
            <text x={x0} y={by - 8} fontSize={11} fill="#555">打孔面：{faceName(face)}（{face}）</text>
            <rect x={x0} y={by} width={drawW} height={bandH} fill="#f4f6f9" stroke="#2f3a4d" strokeWidth={1.2} />
            {ops.map((o, i) => {
              const cx = x0 + o.fromStart * scale;
              const cy = by + bandH / 2;
              const r = Math.max(3, (o.diameter * scale) / 2);
              return (
                <g key={i}>
                  {/* 孔 + 中心线十字 */}
                  <circle cx={cx} cy={cy} r={r} fill="none" stroke="#c0392b" strokeWidth={1.2} />
                  <line x1={cx - r - 4} y1={cy} x2={cx + r + 4} y2={cy} stroke="#c0392b" strokeWidth={0.6} strokeDasharray="4 2" />
                  <line x1={cx} y1={cy - r - 4} x2={cx} y2={cy + r + 4} stroke="#c0392b" strokeWidth={0.6} strokeDasharray="4 2" />
                  {/* 孔位尺寸线：左端基准 → 孔心 */}
                  <line x1={x0} y1={by - 18 - (i % 2) * 12} x2={cx} y2={by - 18 - (i % 2) * 12} stroke="#1e6fff" strokeWidth={0.8} />
                  <line x1={cx} y1={by - 18 - (i % 2) * 12} x2={cx} y2={cy - r - 4} stroke="#1e6fff" strokeWidth={0.5} strokeDasharray="3 2" />
                  <text x={(x0 + cx) / 2} y={by - 21 - (i % 2) * 12} fontSize={10} fill="#1e6fff" textAnchor="middle">{o.fromStart}</text>
                  {/* 孔规格 */}
                  <text x={cx} y={by + bandH + 13} fontSize={10} fill="#c0392b" textAnchor="middle">{o.spec}</text>
                </g>
              );
            })}
            {/* 左端基准符号 */}
            <line x1={x0} y1={by - 30} x2={x0} y2={by + bandH} stroke="#1e6fff" strokeWidth={1} />
            <text x={x0 - 4} y={by - 20} fontSize={9} fill="#1e6fff" textAnchor="end">基准</text>
          </g>
        ))}
        {faces.length === 0 && (
          <g>
            <rect x={x0} y={topPad} width={drawW} height={bandH} fill="#f4f6f9" stroke="#2f3a4d" strokeWidth={1.2} />
            <text x={x0 + drawW / 2} y={topPad + bandH / 2 + 4} fontSize={11} fill="#888" textAnchor="middle">无侧面加工</text>
          </g>
        )}
        {/* 总长尺寸线 */}
        <line x1={x0} y1={totalDimY} x2={x0 + drawW} y2={totalDimY} stroke="#2f3a4d" strokeWidth={1} />
        <line x1={x0} y1={totalDimY - 5} x2={x0} y2={totalDimY + 5} stroke="#2f3a4d" strokeWidth={1} />
        <line x1={x0 + drawW} y1={totalDimY - 5} x2={x0 + drawW} y2={totalDimY + 5} stroke="#2f3a4d" strokeWidth={1} />
        <text x={x0 + drawW / 2} y={totalDimY - 5} fontSize={12} fill="#2f3a4d" textAnchor="middle" fontWeight={600}>{item.length}（{tolerance}）</text>
        {/* 端面加工注记 */}
        {endOps.length > 0 && (
          <text x={x0} y={H - 8} fontSize={11} fill="#b7791f">
            端面加工：{endOps.map((o) => `${o.spec}（${o.fromStart < item.length / 2 ? '起端' : '末端'}中心）`).join('，')}
          </text>
        )}
      </svg>
      <div style={{ fontSize: 11, color: '#999', marginTop: 4 }}>
        孔位自左端基准面起算 · 单位 mm · 孔口双面去毛刺+锐边倒钝 · 镜像件不共用本图
      </div>
    </div>
  );
}
