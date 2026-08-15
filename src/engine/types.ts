export type PanelMaterial = 'none' | 'wood' | 'glass' | 'acrylic' | 'pegboard' | 'wire-mesh';

/** 框架生成参数（M2：正交工作台框架；M3 加载荷/场景维度；M4.5 加板材） */
export interface FrameSpec {
  width: number;    // 总宽 X (mm)
  depth: number;    // 总深 Z (mm)
  height: number;   // 总高 Y (mm)
  sectionId: string;
  connectorId: string;
  /** 隔板层数（不含顶底框）；常规场景均匀分布，工作台场景可按人体工学偏置 */
  shelfCount: number;
  /** 工作台语义：首层隔板高度占可用高度比例（下层人体工学净空优先） */
  workbenchLowerZoneRatio?: number;
  /** 工作台语义：主桌面上表面高度（mm，坐姿操作区） */
  workbenchDeskTopHeightMm?: number;
  /** 工作台语义：最上层搁板深度占桌面深度比例（上层默认浅一些） */
  workbenchUpperShelfDepthRatio?: number;
  /** 抽屉层数（非 workbench 场景；拓扑=顶底框+每层双深向轨道梁，随构/21 三抽屉柜实证） */
  drawerCount?: number;
  /** 抽屉方案：周转箱+三折轨道（工具场景）/ 成品抽屉+反弹轨道（家具场景，无拉手） */
  drawerKind?: 'turnover-box' | 'ready-made';
  /** 顶面设计载荷 kg */
  loadKg: number;
  loadType: 'distributed' | 'concentrated';
  /** 物件形态原型 id（knowledge/archetypes.yaml）：驱动真实尺寸默认与档位校验 */
  archetype?: string;
  /** 用途场景，决定挠度限值档位（validation.yaml deflectionLimits） */
  scene: 'diy-furniture' | 'industrial-rack' | 'workbench' | 'precision';
  /** 高风险场景（水族/儿童/头顶）→ val-003 安全系数 2.0 */
  highRisk: boolean;
  mobility: 'fixed' | 'leveling-feet' | 'caster';
  /** 设备振动工况（3D打印机/CNC 等）→ val-005 斜撑触发 */
  vibration?: boolean;
  /** 板材：顶面、隔板层、底框各一种材质 */
  topPanel: PanelMaterial;
  shelfPanel: PanelMaterial;
  bottomPanel: PanelMaterial;
  /** 顶板模式：overlay=全覆盖齐平框外缘（默认）/ recessed=凹陷嵌于框内坐落在框梁上 */
  topPanelMode?: 'overlay' | 'recessed';
  /** 侧围板（背/左/右）：兼作抗侧向体系（val-lateral） */
  backPanel: PanelMaterial;
  leftPanel: PanelMaterial;
  rightPanel: PanelMaterial;
  /** 背面对角斜撑（val-005 解药） */
  brace: boolean;
  /** 中柱：在框架中心(x=0)加前后两根立柱，将内腔分为左右双列（均匀双列，工具柜/分区柜拓扑） */
  centerColumn?: boolean;
  /** 非均匀分区（黄金锚点①工具柜）：多列异构拓扑，每列可不同宽度+不同内部结构 */
  partitions?: {
    /** 内部分区数（2=双列） */
    count: 2;
    /** 各列宽度（mm），总和 = 内宽 = W − 2s */
    widths: [number, number];
    /** 各列内部结构 */
    columns: [
      { type: 'drawer'; count: number; kind?: 'turnover-box' | 'ready-made' } | { type: 'shelf'; count: number },
      { type: 'drawer'; count: number; kind?: 'turnover-box' | 'ready-made' } | { type: 'shelf'; count: number }
    ];
  };
  /** 型材颜色：silver=阳极氧化银白（默认）/ black=哑光黑（工具柜常见）/ gold=香槟金 */
  profileColor?: 'silver' | 'black' | 'gold';
  /** LED 灯条：顶框前梁下槽内嵌（mat-004） */
  ledStrip?: boolean;
  /** 正面单开门（槽装合页+磁吸+把手） */
  doorPanel?: PanelMaterial;
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

/** 单件加工特征（件局部坐标，单件加工图数据源） */
export interface PartOp {
  type: string;
  /** 人读规格，如 Φ11.5 / M8×20 */
  spec: string;
  /** 孔心距件起端 mm */
  fromStart: number;
  /** 加工面：end / y+ / y- / z+ / z- / x+ / x- */
  face: string;
  diameter: number;
}

export interface CutListItem {
  partNo: string;
  sectionId: string;
  length: number;
  qty: number;
  /** 加工特征摘要（如 "通孔Φ11.5×2"），无加工为空 */
  machiningNote: string;
  /** 结构化孔位（代表件）：单件加工图用 */
  ops: PartOp[];
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
  mode: 'top-overlay' | 'top-recessed' | 'top-inset' | 'shelf-overlap' | 'back-overlay' | 'side-overlay' | 'door-front';
  mountNote: string;
  /** 固定孔（板局部坐标，原点=板角，沿长×宽）；胶垫压条固定的软材质为空 */
  holes: { x: number; y: number; diameter: number }[];
  /** 板材件号（B1/B2…，同材质+尺寸+孔位合并） */
  partNo?: string;
}

/** 固定关系：板材/附件/斜撑与主体的真实连接（消除"字符串式已安装"） */
export interface MountItem {
  id: string;
  targetType: 'panel' | 'accessory' | 'member';
  targetId: string;
  method: 't-nut-screw' | 'gasket-clamp' | 'shelf-support' | 'corner-flat' | 'caster-stem' | 'foot-stem' | 'drawer-slide' | 'slot-embed' | 'hinge';
  note: string;
  fasteners: { sku: string; qty: number }[];
  /** 固定点（装配图/结构视图数据源） */
  points: [number, number, number][];
}

/** 附件：脚轮/LED灯条等（进模型/重量/价格/BOM） */
export interface AccessoryItem {
  id: string;
  kind: 'caster' | 'led-strip' | 'leveling-foot' | 'drawer-box';
  sku: string;
  position: [number, number, number];
  weightKg: number;
  /** 长条类附件的长度（LED 灯条） */
  lengthMm?: number;
  /** 盒体类附件渲染尺寸（抽屉盒）：[X, Y, Z] */
  boxSize?: [number, number, number];
}

/** 板材下料清单行（按件号聚合） */
export interface PanelListItem {
  partNo: string;
  material: PanelMaterial;
  materialName: string;
  /** [长, 宽, 厚] mm */
  size: [number, number, number];
  qty: number;
  /** 如 Φ7×4孔@四角 */
  holeNote: string;
  /** 单件估价（含钻孔费） */
  priceCny: number;
}

/** 价格明细（未税CNY，非 verified 单价均为估价） */
export interface CostBreakdown {
  profile: number;
  panels: number;
  connectors: number;
  fasteners: number;
  machining: number;
  accessories: number;
  total: number;
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
  panelList: PanelListItem[];
  checks: CheckResult[];
  /** 导出闸门状态：由 checks 派生（error→invalid，warn→needs-confirmation） */
  status: ModelStatus;
  totals: { memberCount: number; totalLengthMm: number; weightKg: number | null; priceCny: number | null; cost: CostBreakdown };
  warnings: string[];
}
