export interface Meta {
  id: string;
  source: string;
  confidence: 'verified' | 'public' | 'inferred' | string;
  review: string;
  version: string;
  updated?: string;
}

export interface SlotDef {
  type: string;
  width: number;
}

export interface FaceDef {
  index: number;
  normal: [number, number, number];
  slots: { offset: number; width: number }[];
}

/** 显示几何参数（近似值，仅用于参数化挤出渲染） */
export interface SectionGeometry {
  lipDepth: number;
  cavityWidth: number;
  cavityDepth: number;
}

export interface Section {
  id: string;
  name: string;
  standard: string;
  series: number;
  size: [number, number];
  slot: SlotDef;
  wallThickness: number | null;
  weightPerMeter: number | null;
  coreHole: { diameter: number; tapping: string; tapDepth: number };
  faces: FaceDef[];
  outlineRef: string;
  geometry: SectionGeometry;
  price: { perMeter: number | null; currency?: string; tax?: boolean };
  mechanics: {
    momentOfInertia: { ix: number; iy: number; range?: [number, number] };
    elasticModulus: number;
  };
}

export interface SectionRecord {
  meta: Meta;
  section: Section;
}

export interface Connector {
  id: string;
  name: string;
  category: string;
  visibility: string;
  compatible: { slotWidths: number[]; series: string[] };
  strengthClass: number;
  loadRole: string;
  note?: string;
  removable: boolean;
  lengthOffset: number;
  attach: Record<string, unknown>;
  machining: Record<string, unknown>[];
  bom: { sku: string; qty: number; priceUntaxed?: number }[];
}

export interface ConnectorRecord {
  meta: Meta;
  connector: Connector;
}

/** 板材规格（knowledge/panels.yaml） */
export interface PanelSpecDef {
  name: string;
  thickness: number;
  kgPerM2: number;
  pricePerM2: number;
  mount: 't-nut-screw' | 'gasket-clamp' | 'shelf-support' | 'corner-flat';
  holeDiameter: number;
  mountNote: string;
}

/** 紧固件单价（knowledge/fasteners.yaml） */
export interface FastenerDef {
  name: string;
  price: number;
}

/** 尺寸档位：真实物件的 min/std/max（knowledge/archetypes.yaml） */
export interface DimBand {
  min?: number;
  std?: number;
  max?: number;
  hutchMin?: number;
  hutchMax?: number;
}

/** 物件形态原型（真实样子的数据化） */
export interface ArchetypeDef {
  name: string;
  deskTopHeightMm?: DimBand;
  depthMm?: DimBand;
  widthMm?: DimBand;
  overallHeightMm?: DimBand;
  upperShelfDepthRatio?: DimBand;
  shelfPitchMm?: DimBand;
  topology?: Record<string, string>;
  note?: string;
  [key: string]: unknown;
}

export interface KnowledgeBase {
  sections: SectionRecord[];
  connectors: ConnectorRecord[];
  rules: Record<string, unknown>;   // selection/connection/validation 等原始规则文档，M3 时再类型化
  tests: Record<string, unknown>;
  materials: Record<string, unknown>;
  panels: Record<string, PanelSpecDef>;
  fasteners: Record<string, FastenerDef>;
  archetypes: Record<string, ArchetypeDef>;
}
