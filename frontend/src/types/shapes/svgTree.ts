import type { Rectangle, Polygon, Polyline, Path, Line, Ellipse, Circle } from "../";


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
  type: "circle" | "ellipse" | "line" | "path" | "polygon" | "polyline" | "rectangle" | "folder";
  locked: boolean;
  visible: boolean;
  properties: Rectangle | Polygon | Polyline | Path | Line | Ellipse | Circle;
  expanded: boolean;
  children: treeNode[]
}


