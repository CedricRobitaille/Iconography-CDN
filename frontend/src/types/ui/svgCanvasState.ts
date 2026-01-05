import type { treeNode } from "../shapes/svgTree";

export interface SvgCanvasState {
  // Canvas Appearance
  width: number;
  height: number;
  zoom: number;     // 1 - 100
  offsetX: number;  // X Pan Offset
  offsetY: number;  // Y Pan Offset

  // SVG State
  selectedNodeIds: number[];

  // Root Node of tree
  rootNode: treeNode | null;

  // Flattened list of all nodes..
  // Instead of needing to dig for nested nodes each time
  flatNodes: treeNode[];
}