import { ref, onMounted, onUnmounted } from "vue";
import type { Ref } from "vue";
import { useEditorStore } from "../stores/editorSvg";
import { useCanvasPan } from "./actions/canvasPan";
import { useCanvasZoom } from "./actions/canvasZoom";

export const useDefaultCanvasInteractions = (editorMode: Ref<boolean>) => {
  const editor = useEditorStore();

  // Action Composables
  const pan = useCanvasPan(editor, editorMode)
  const zoom = useCanvasZoom(editor, editorMode)

  // Key States
  const isSpacePressed = ref(false)
  const isCtrlPressed = ref(false)
  const isAltPressed = ref(false)

  // Track modifier keys
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Space") isSpacePressed.value = true;
    if (event.ctrlKey) isCtrlPressed.value = true;
    if (event.altKey) isCtrlPressed.value = true;
  };

  const onKeyUp = (event: KeyboardEvent) => {
    if (event.code === "Space") isSpacePressed.value = false;
    if (!event.ctrlKey) isCtrlPressed.value = false;
    if (!event.altKey) isCtrlPressed.value = false;
  };

  
  const onMouseDown = (event: MouseEvent) => {
    if (isSpacePressed.value){
      pan.onMouseDown(event)
    } 
  }

  const onMouseMove = (event: MouseEvent) => {
    if (isSpacePressed.value) pan.onMouseMove(event)
  }

  const onMouseUp = (event: MouseEvent) => {
    pan.onMouseUp();
  }

  const onWheel = (event: WheelEvent) => {
    if (isCtrlPressed || isAltPressed) zoom.onWheel(event)
  }


  // Mount the KeyUp/Down to the dom
  onMounted(() => {
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("keyup", onKeyUp);
  });


  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onWheel,
  }
}