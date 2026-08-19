/// <reference lib="webworker" />
/**
 * STEP 导出 Worker：replicad (OCCT wasm) 惰性初始化，型材 T 槽轮廓挤出 + 板材盒体 → B-rep STEP。
 * wasm ~12MB 仅在首次导出时加载。
 */
import opencascade from 'replicad-opencascadejs';
import wasmUrl from 'replicad-opencascadejs/wasm?url';
import { setOC, draw, drawCircle, drawRoundedRectangle, exportSTEP, type AnyShape } from 'replicad';

export interface StepMember {
  pts: [number, number][];
  holes: { x: number; y: number; r: number }[];
  length: number;
  position: [number, number, number];
  axis: 'x' | 'y' | 'z';
  tilt?: number;
  name?: string;
}
export interface StepPanel {
  boxSize: [number, number, number];
  position: [number, number, number];
  name?: string;
}
export interface StepRequest { members: StepMember[]; panels: StepPanel[] }

let ocReady: Promise<void> | null = null;
const init = () => (ocReady ??= (opencascade as unknown as (o: object) => Promise<Parameters<typeof setOC>[0]>)({
  locateFile: () => wasmUrl,
}).then((oc) => setOC(oc)));

function buildMember(m: StepMember): AnyShape {
  let pen = draw(m.pts[0]);
  for (const p of m.pts.slice(1)) pen = pen.lineTo(p);
  let drawing = pen.close();
  for (const h of m.holes) {
    const cut = drawing.cut(drawCircle(h.r).translate(h.x, h.y));
    if (cut) drawing = cut as typeof drawing;
  }
  let solid = drawing.sketchOnPlane('XY').extrude(m.length).translate(0, 0, -m.length / 2) as AnyShape;
  if (m.axis === 'x') solid = solid.rotate(90, [0, 0, 0], [0, 1, 0]);
  else if (m.axis === 'y') solid = solid.rotate(-90, [0, 0, 0], [1, 0, 0]);
  if (m.tilt) solid = solid.rotate((m.tilt * 180) / Math.PI, [0, 0, 0], [0, 0, 1]);
  return solid.translate(m.position);
}

function buildPanel(p: StepPanel): AnyShape {
  const [sx, sy, sz] = p.boxSize;
  // 挤出体 [sx,sy] 平面 × sz 厚，居中后与渲染 BoxGeometry(boxSize) 完全一致
  return drawRoundedRectangle(sx, sy)
    .sketchOnPlane('XY')
    .extrude(sz)
    .translate(0, 0, -sz / 2)
    .translate(p.position) as AnyShape;
}

self.onmessage = async (e: MessageEvent<StepRequest>) => {
  try {
    await init();
    // 逐件 Y-up → Z-up（STEP 惯例），带件号名称与基础色导出装配
    const zUp = (s: AnyShape) => s.rotate(90, [0, 0, 0], [1, 0, 0]);
    const configs = [
      ...e.data.members.map((m) => ({ shape: zUp(buildMember(m)), name: m.name, color: '#c0c5cc' })),
      ...e.data.panels.map((p) => ({ shape: zUp(buildPanel(p)), name: p.name, color: '#b58a52' })),
    ];
    const blob = exportSTEP(configs);
    const buf = await blob.arrayBuffer();
    (self as unknown as Worker).postMessage({ ok: true, buf }, [buf]);
  } catch (err) {
    (self as unknown as Worker).postMessage({ ok: false, error: (err as Error).message });
  }
};
