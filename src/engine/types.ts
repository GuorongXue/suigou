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

export interface FrameModel {
  spec: FrameSpec;
  members: Member[];
  cutList: CutListItem[];
  totals: { memberCount: number; totalLengthMm: number; weightKg: number | null; priceCny: number | null };
  warnings: string[];
}
