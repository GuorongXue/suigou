/** 框架生成参数（M2：正交工作台框架） */
export interface FrameSpec {
  width: number;    // 总宽 X (mm)
  depth: number;    // 总深 Z (mm)
  height: number;   // 总高 Y (mm)
  sectionId: string;
  connectorId: string;
  /** 隔板层数（不含顶底框），均匀分布在高度方向 */
  shelfCount: number;
}

export type MemberRole = 'post' | 'beam-x' | 'beam-z';

export type Axis = 'x' | 'y' | 'z';

/** 构件图节点：一根型材的角色、长度与放置 */
export interface Member {
  id: string;
  role: MemberRole;
  sectionId: string;
  length: number;
  position: [number, number, number];   // 构件中心点
  axis: Axis;                           // 挤出方向
}

export interface CutListItem {
  sectionId: string;
  length: number;
  qty: number;
}

/** 接点：梁端与立柱面的交汇处，携带连接件放置信息 */
export interface Joint {
  id: string;
  connectorId: string;
  /** 梁端面中心点（即立柱内侧面） */
  position: [number, number, number];
  beamAxis: 'x' | 'z';
  /** 从梁端指向立柱的方向符号 */
  outward: 1 | -1;
  /** 角码放置侧：+1 梁上方（底框），-1 梁下方（顶框/隔板） */
  ySide: 1 | -1;
}

/** 孔口圆片：在构件表面的孔开口可视化（真实孔面表现，非穿透标记） */
export interface HoleDisc {
  position: [number, number, number];
  axis: Axis;
  dir: 1 | -1;
  /** 孔径 */
  d: number;
  /** 沉头外径（沉头孔才有） */
  D?: number;
}

/** 加工特征：由连接件声明式派生（孔位可视化 + 加工清单） */
export interface MachiningOp {
  id: string;
  jointId: string;
  type: 'through-hole' | 'end-tap' | 'counterbore' | 'wrench-hole' | string;
  /** 人读规格，如 Φ11.5 / M8×20 / Φ9沉Φ14 */
  spec: string;
  position: [number, number, number];
  axis: Axis;
  diameter: number;
  length: number;
  /** 表面孔口圆片（可见面） */
  discs: HoleDisc[];
}

export interface FrameModel {
  spec: FrameSpec;
  members: Member[];
  joints: Joint[];
  machining: MachiningOp[];
  cutList: CutListItem[];
  totals: { memberCount: number; totalLengthMm: number; weightKg: number | null; priceCny: number | null };
  warnings: string[];
}
