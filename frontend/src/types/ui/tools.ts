import type { SvgCanvasState } from "./svgCanvasState";

export interface ToolHandler {
  onMouseDown?: (e: MouseEvent, canvas: SvgCanvasState) => void;
  onMouseMove?: (e: MouseEvent, canvas: SvgCanvasState) => void;
  onMouseUp?: (e: MouseEvent, canvas: SvgCanvasState) => void;
  onClick?: (e: MouseEvent, canvas: SvgCanvasState) => void;
  onWheel?: (e: MouseEvent, canvas: SvgCanvasState) => void;
}

export type tools = "select" | "pen" | "polygon" | "line" | "rect" | "ellipse" | "pan" | "zoom";
