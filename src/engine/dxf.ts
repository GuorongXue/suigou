import type { CutListItem } from './types';

/**
 * DXF R12 ASCII 导出：切割清单全部件号平铺为一张加工图。
 * 每件：轮廓矩形（俯视 长×截面宽）+ 孔位圆 + 件号文字；间距 60mm 纵向排布。
 */

const num = (v: number) => String(Math.round(v * 100) / 100);

function line(x1: number, y1: number, x2: number, y2: number): string {
  return ['0', 'LINE', '8', '0', '10', num(x1), '20', num(y1), '11', num(x2), '21', num(y2)].join('\n');
}

function circle(cx: number, cy: number, r: number): string {
  return ['0', 'CIRCLE', '8', '0', '10', num(cx), '20', num(cy), '40', num(r)].join('\n');
}

function text(x: number, y: number, h: number, content: string): string {
  return ['0', 'TEXT', '8', '0', '10', num(x), '20', num(y), '40', num(h), '1', content].join('\n');
}

/** 单件实体：origin 为件左下角 */
function partEntities(item: CutListItem, sectionWidth: number, ox: number, oy: number): string[] {
  const L = item.length;
  const Wd = sectionWidth;
  const out: string[] = [
    line(ox, oy, ox + L, oy),
    line(ox + L, oy, ox + L, oy + Wd),
    line(ox + L, oy + Wd, ox, oy + Wd),
    line(ox, oy + Wd, ox, oy),
    text(ox, oy + Wd + 8, 10, `${item.partNo}  ${item.sectionId}  L${L}  x${item.qty}${item.machiningNote ? '  ' + item.machiningNote : ''}`),
  ];
  for (const op of item.ops) {
    if (op.face === 'end') {
      // 端面攻丝：端部中心小圆 + 十字标记
      const ex = op.fromStart <= L / 2 ? ox : ox + L;
      const cy = oy + Wd / 2;
      out.push(circle(ex, cy, Math.max(2, op.diameter / 2)));
      out.push(line(ex - 4, cy, ex + 4, cy), line(ex, cy - 4, ex, cy + 4));
    } else {
      out.push(circle(ox + op.fromStart, oy + Wd / 2, op.diameter / 2));
    }
  }
  return out;
}

/** 切割清单 → 单张 DXF（全部件号纵向平铺） */
export function cutListToDxf(cutList: CutListItem[], sectionWidth: number): string {
  const entities: string[] = [];
  let oy = 0;
  for (const item of [...cutList].sort((a, b) => b.length - a.length)) {
    entities.push(...partEntities(item, sectionWidth, 0, oy));
    oy += sectionWidth + 60;
  }
  return ['0', 'SECTION', '2', 'ENTITIES', ...entities, '0', 'ENDSEC', '0', 'EOF'].join('\n');
}
