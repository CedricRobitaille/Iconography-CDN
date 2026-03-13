export type StyleId = string | number;

export type StyleFill = {
  fill?: string,
  fillOpacity?: number,
}

export type StyleStroke = {
  stroke?: string,
  strokeOpacity?: number,
  strokeWidth?: number,
  strokeDasharray?: string,
  strokeDashoffset?: number,
  strokeLinecap?: string,
  strokeLinejoin?: string,
  strokeLineposition?: string,
}

export interface StyleDefinition {
  fill: StyleFill;
  stroke: StyleStroke;
}

export type StyleRegistryMap = Record<StyleId, StyleDefinition>