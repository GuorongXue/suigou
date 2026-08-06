import type { KnowledgeBase } from '../knowledge/types';
import type { CutListItem } from './types';

/** 一根原料的切割方案 */
export interface StockBar {
  /** 切割段（净长，按切割顺序） */
  cuts: { partNo: string; length: number }[];
  /** 已用长度（含每刀锯口） */
  usedMm: number;
  /** 余料 */
  remnantMm: number;
}

export interface NestingResult {
  stockLengthMm: number;
  kerfMm: number;
  bars: StockBar[];
  /** 总利用率（净切割长 / 原料总长） */
  utilization: number;
  totalStockBars: number;
}

/**
 * 套裁（一维下料优化）：FFD 首次适应递减 + 锯口损耗。
 * 用途：自购原料的切法参考与利用率/余料统计；平台按净长计价不受影响。
 */
export function nestCutList(cutList: CutListItem[], kb: KnowledgeBase): NestingResult | null {
  const cfg = (kb.rules.cam as { nesting?: { stockLengthMm: number; kerfMm: number } })?.nesting;
  const stock = cfg?.stockLengthMm ?? 6000;
  const kerf = cfg?.kerfMm ?? 5;

  const segments = cutList
    .flatMap((c) => Array.from({ length: c.qty }, () => ({ partNo: c.partNo, length: c.length })))
    .sort((a, b) => b.length - a.length);
  if (!segments.length) return null;
  if (segments[0].length > stock) return null;   // 超长段无法套裁（Phase 0 不做接料）

  const bars: StockBar[] = [];
  for (const seg of segments) {
    // 每段占用 = 净长 + 一刀锯口（末段锯口计入保守估计）
    const need = seg.length + kerf;
    const bar = bars.find((b) => b.usedMm + need <= stock);
    if (bar) {
      bar.cuts.push(seg);
      bar.usedMm += need;
    } else {
      bars.push({ cuts: [seg], usedMm: need, remnantMm: 0 });
    }
  }
  for (const b of bars) b.remnantMm = stock - b.usedMm;

  const netMm = segments.reduce((s, x) => s + x.length, 0);
  return {
    stockLengthMm: stock,
    kerfMm: kerf,
    bars,
    utilization: netMm / (bars.length * stock),
    totalStockBars: bars.length,
  };
}
