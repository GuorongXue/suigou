export type PanelMaterial = 'none' | 'wood' | 'glass' | 'acrylic' | 'pegboard';

/** 框架生成参数（M2：正交工作台框架；M3 加载荷/场景维度；M4.5 加板材） */
export interface FrameSpec {
  width: number;    // 总宽 X (mm)
  depth: number;    // 总深 Z (mm)
  height: number;   // 总高 Y (mm)
  sectionId: string;
  connectorId: string;
  /** 隔板层数（不含顶底框），均匀分布在高度方向 */
  shelfCount: number;
  /** 顶面设计载荷 kg */
  loadKg: number;
  loadType: 'distributed' | 'concentrated';
  /** 用途场景，决定挠度限值档位（validation.yaml deflectionLimits） */
  scene: 'diy-furniture' | 'industrial-rack' | 'workbench' | 'precision';
  /** 高风险场景（水族/儿童/头顶）→ val-003 安全系数 2.0 */
  highRisk: boolean;
  mobility: 'fixed' | 'caster';
  /** 板材：顶面与隔板层各一种材质 */
  topPanel: PanelMaterial;
  shelfPanel: PanelMaterial;
  /** 侧围板（背/左/右）：兼作抗侧向体系（val-lateral） */
  backPanel: PanelMaterial;
  leftPanel: PanelMaterial;
  rightPanel: PanelMaterial;
  /** 背面对角斜撑（val-005 解药） */
  brace: boolean;
}

export type MemberRole = 'post' | 'beam-x' | 'beam-z' | 'brace';

export type Axis = 'x' | 'y' | 'z';

/** 构件图节点：一根型材的角色、长度与放置 */
export interface Member {
  id: string;
  role: MemberRole;
  sectionId: string;
  length: number;
  position: [number, number, number];   // 构件中心点
  axis: Axis;                           // 挤出方向（基向）
  /** 斜撑：在基向基础上绕 Z 轴的倾角 rad（背面平面内对角） */
  tilt?: number;
  /** 件号：同长度+同加工特征归为同一件号（出图/下单喯合基准） */
  partNo?: string;
}

export interface CutListItem {
  partNo: string;
  sectionId: string;
  length: number;
  qty: number;
  /** 加工特征摘要（如 "通孔Φ11.5×2"），无加工为空 */
  machiningNote: string;
}

/** 校验结果（规则管道输出） */
export interface CheckResult {
  level: 'error' | 'warn' | 'info' | 'pass';
  ruleId: string;
  message: string;
  /** 问题构件（画布染色） */
  memberIds?: string[];
}

/** 方案状态（导出质量闸门）：invalid/incomplete 禁止导出 */
export type ModelStatus = 'valid' | 'needs-confirmation' | 'invalid' | 'incomplete';

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
  /** 所属梁构件 id（加工归属） */
  beamMemberId: string;
  /** 相邻立柱构件 id */
  postMemberId: string;
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
  /** 被加工构件 id（件号聚合依据） */
  memberId: string;
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

/** 板材构件（搭接/嵌槽在框架上，材质接口规则 mat-* 管控） */
export interface PanelItem {
  id: string;
  material: PanelMaterial;
  /** 清单语义：[长, 宽, 厚] mm */
  size: [number, number, number];
  /** 渲染尺寸：[X, Y, Z] 三轴尺寸（支持水平/竖直板） */
  boxSize: [number, number, number];
  position: [number, number, number];
  /** 覆盖模式 */
  mode: 'top-overlay' | 'shelf-overlap' | 'back-overlay' | 'side-overlay';
  mountNote: string;
}

/** 固定关系：板材/附件与主体的真实连接（消除"字符串式已安装"） */
export interface MountItem {
  id: string;
  targetType: 'panel' | 'accessory';
  targetId: string;
  method: 't-nut-screw' | 'gasket-clamp' | 'caster-stem';
  note: string;
  fasteners: { sku: string; qty: number }[];
  /** 固定点（装配图/结构视图数据源） */
  points: [number, number, number][];
}

/** 附件：脚轮等（进模型/重量/价格/BOM） */
export interface AccessoryItem {
  id: string;
  kind: 'caster';
  sku: string;
  position: [number, number, number];
  weightKg: number;
}

export interface FrameModel {
  spec: FrameSpec;
  members: Member[];
  joints: Joint[];
  machining: MachiningOp[];
  panels: PanelItem[];
  mounts: MountItem[];
  accessories: AccessoryItem[];
  cutList: CutListItem[];
  checks: CheckResult[];
  /** 导出闸门状态：由 checks 派生（error→invalid，warn→needs-confirmation） */
  status: ModelStatus;
  totals: { memberCount: number; totalLengthMm: number; weightKg: number | null; priceCny: number | null };
  warnings: string[];
}
