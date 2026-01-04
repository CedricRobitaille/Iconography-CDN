import type { Rectangle, Polygon, Polyline, Path, Line, Ellipse, Circle } from "../";

type style = {
  color: string,
  stroke: string,
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
  id: number;
  name: number;
  type: "circle" | "ellipse" | "line" | "path" | "polygon" | "polyline" | "rect" | "folder";
  locked: boolean;
  visible: boolean;
  properties: Rectangle | Polygon | Polyline | Path | Line | Ellipse | Circle;
  expanded: boolean;
  children: treeNode[];
  style: style
}



export interface svgDescriptor {
  tag: "circle" | "ellipse" | "line" | "path" | "polygon" | "polyline" | "rect" | "g";
  attrs: Record<string, string| number>
  children?: svgDescriptor[]
}