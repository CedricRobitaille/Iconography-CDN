import type { PathAction } from "./path";

interface Points {
  x: number;
  y: number;
}

export interface DragPositionXY {
  x: number;
  y: number;
}

export interface DragPositionLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface DragPositionPolygon {
  points: Points[];
}

export interface DragPositionCircle {
  cx: number;
  cy: number;
}

export interface DragPositionEllipse {
  cx: number;
  cy: number;
}

export interface DragPositionPath {
  d: PathAction[];
}

export type DragInitialPositions = Record<
  number,
  | DragPositionXY
  | DragPositionLine
  | DragPositionPolygon
  | DragPositionCircle
  | DragPositionEllipse
  | DragPositionPath
>;

export interface EditablePoint {
  x: number;
  y: number;
  type: "corner" | "center" | "endpoint" | "vertex" | "control";
  nodeId: number;
  index?: number;
  actionId?: number;
}