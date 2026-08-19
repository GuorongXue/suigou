import type { FrameModel } from '../engine/types';
import type { KnowledgeBase } from '../knowledge/types';
import { sectionOutlinePoints, sectionCoreHoles } from '../engine/sectionOutline';
import type { StepRequest } from './stepWorker';

let worker: Worker | null = null;

/** FrameModel → STEP Blob（Worker 惰性加载 OCCT wasm，首次导出约需数秒） */
export function exportStepBlob(model: FrameModel, kb: KnowledgeBase): Promise<Blob> {
  worker ??= new Worker(new URL('./stepWorker.ts', import.meta.url), { type: 'module' });
  const outlineCache = new Map<string, { pts: [number, number][]; holes: { x: number; y: number; r: number }[] }>();
  const outlineFor = (sectionId: string) => {
    let hit = outlineCache.get(sectionId);
    if (!hit) {
      const sec = kb.sections.find((s) => s.section.id === sectionId)!.section;
      hit = { pts: sectionOutlinePoints(sec), holes: sectionCoreHoles(sec) };
      outlineCache.set(sectionId, hit);
    }
    return hit;
  };
  const req: StepRequest = {
    members: model.members.map((m) => {
      const { pts, holes } = outlineFor(m.sectionId);
      return { pts, holes, length: m.length, position: m.position, axis: m.axis, tilt: m.tilt,
        name: `${m.partNo ?? m.id} ${m.sectionId} L${m.length}` };
    }),
    panels: model.panels.map((p) => ({ boxSize: p.boxSize, position: p.position,
      name: `${p.partNo ?? p.id} ${p.material} ${Math.round(p.size[0])}x${Math.round(p.size[1])}x${p.size[2]}` })),
  };
  return new Promise((resolve, reject) => {
    const w = worker!;
    w.onmessage = (e: MessageEvent<{ ok: boolean; buf?: ArrayBuffer; error?: string }>) => {
      if (e.data.ok && e.data.buf) resolve(new Blob([e.data.buf], { type: 'application/step' }));
      else reject(new Error(e.data.error ?? 'STEP 导出失败'));
    };
    w.onerror = (e) => reject(new Error(e.message || 'STEP Worker 加载失败（可能是网络原因未能获取 wasm）'));
    w.postMessage(req);
  });
}
