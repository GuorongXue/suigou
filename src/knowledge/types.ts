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

export interface KnowledgeBase {
  sections: SectionRecord[];
  connectors: ConnectorRecord[];
  rules: Record<string, unknown>;   // selection/connection/validation 等原始规则文档，M3 时再类型化
  tests: Record<string, unknown>;
  materials: Record<string, unknown>;
}
