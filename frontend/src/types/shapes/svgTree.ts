import type { Rectangle, Polygon, Polyline, Path, Line, Ellipse, Circle, StyleId, StyleRegistry, StyleDefinition } from "../";

export interface Transform {
  matrix: [number, number, number, number, number, number]
}



/**
 * w = Width
 * h = Height
 * x = xPos
 * y = yPos
 * rx = Corner Radius X
 * ry = Corner Radius Y
 */
export interface treeNode {
  id: string | number;
  name: string;
  type: "circle" | "ellipse" | "line" | "path" | "polygon" | "polyline" | "rect" | "folder";
  properties: Rectangle | Polygon | Polyline | Path | Line | Ellipse | Circle;
  locked: boolean;
  visible: boolean;
  expanded: boolean;
  children: treeNode[];
  styleId: StyleId;
  style?: StyleDefinition; // Pointer to the registry style
  transform?: Transform;
  depth?: number;
}

export interface SvgDocument {
  nodes: treeNode[]
  styles: StyleRegistry
}


export interface svgDescriptor {
  tag: "circle" | "ellipse" | "line" | "path" | "polygon" | "polyline" | "rect" | "g";
  attrs: Record<string, string| number>
  children?: svgDescriptor[]
}


export interface SceneNode {
  id?: string | number;
  tag: string;
  attributes: Record<string, string | number>;
  children: SceneNode[];
  el?: Element;
  styleId?: number;
}