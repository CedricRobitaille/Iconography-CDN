import { ref } from "vue";
import type { SvgCanvasState } from "../types";


export const useMouseToSvgPos = (e: MouseEvent, editor: SvgCanvasState) => {
  if (!editor) return {};
  const svg = e.currentTarget as SVGSVGElement;
  const bounding = svg.getBoundingClientRect();
  const x = ((e.clientX - bounding.left) / bounding.width) * editor.width;
  const y = ((e.clientY - bounding.top) / bounding.height) * editor.height;

  return {
    x: x,
    y: y,
  }
}