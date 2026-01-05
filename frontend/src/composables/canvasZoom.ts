import { ref } from "vue";
import type { Ref } from "vue";
import type { SvgCanvasState } from "../types/ui/svgCanvasState";

interface CanvasZoomOptions {
  minZoom?: number;
  maxZoom?: number;
  zoomStep?: number;
}


export const useCanvasZoom = (
  canvas: SvgCanvasState,
  editorMode: Ref<boolean>,
  options: CanvasZoomOptions = {}
) => {
  // Default settings, can allow user input
  const {
    minZoom =  0.1,
    maxZoom = 5,
    zoomStep = 0.1
  } = options;


  // Mouse Wheel Zoom
  const onWheel = (event:WheelEvent) => {
    if (!editorMode.value) return;
    if (!event.ctrlKey && !event.altKey) return;

    event.preventDefault();

    // Mouse pos relative to SVG
    const svg = event.currentTarget as SVGSVGElement;
    const bounding = svg.getBoundingClientRect();
    const mouseX = event.clientX - bounding.left;
    const mouseY = event.clientX - bounding.top;

    // convert to svg coods
    const svgX = (mouseX / bounding.width) * canvas.width;
    const svgY = (mouseY / bounding.height) * canvas.height;

    // zoom direction
    const change = -event.deltaY;
    const zoomFactor = change > 0 ? (1 + zoomStep) : (1 - zoomStep);

    // New zoom
    const newZoom = Math.min(maxZoom, Math.max(minZoom, canvas.zoom * zoomFactor));

    // Change pan to zoom on mousePos
    canvas.setPan(
      svgX - ((svgX - canvas.offsetX) * newZoom) / canvas.zoom,
      svgY - ((svgY - canvas.offsetY) * newZoom) / canvas.zoom,
    );

    canvas.setZoom(newZoom)
  }

  return {
    onWheel
  }
}