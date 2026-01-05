import type { treeNode } from "../shapes/svgTree";
import type { tools } from "./tools";

export interface SvgCanvasState {
  // Canvas Appearance
  width: number;
  height: number;
  zoom: number;     // 1 - 100
  offsetX: number;  // X Pan Offset
  offsetY: number;  // Y Pan Offset

  activeTool: tools,
  activeStyle: SvgStyle;

  // SVG State
  selectedNodeIds: number[];

  // Root Node of tree
  rootNode: treeNode | null;

  // Flattened list of all nodes..
  // Instead of needing to dig for nested nodes each time
  flatNodes: treeNode[];
}

export interface SvgStyle {
  fill: fill,
  stroke: stroke,
}

interface fill {
  fill: string,
  fillOpacity: number,
}

interface stroke {
  stroke: string,
  strokeDasharray: string,
  strokeDashoffset: number,
  strokeLinecap: string,
  strokeLinejoin: string,
  strokeOpacity: number,
  strokeWidth: number,
}