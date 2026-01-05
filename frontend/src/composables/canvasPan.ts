import { ref, onMounted, onUnmounted } from "vue";
import type { Ref } from "vue";
import type { SvgCanvasState } from "../types/ui/svgCanvasState";








export const useCanvasPan = (canvas: SvgCanvasState, editorMode: Ref<boolean>) => {
  const isPanning = ref(false)
  const start = ref({
    x: 0,
    y: 0,
  })

  const isSpacePressed = ref(false)

  // KeyPress
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      isSpacePressed.value = true
      e.preventDefault() // prevent page scrolling
    }
  }

  // KeyPress
  const onKeyUp = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      isSpacePressed.value = false
    }
  }



  // Mouse Down
  const onMouseDown = (event: MouseEvent) => {
    if (!editorMode.value) return
    if (!isSpacePressed.value) return

    isPanning.value = true;
    start.value = { 
      x: event.clientX,
      y: event.clientY,
    }
    event.preventDefault();
  }


  // Mouse Move
  const onMouseMove = (event: MouseEvent) => {
    if (!editorMode.value || !isPanning.value) return

    const svg = event.currentTarget as SVGSVGElement;
    const bounding = svg.getBoundingClientRect();

    const dx = ((event.clientX - start.value.x) / bounding.width) * canvas.width
    const dy = ((event.clientY - start.value.y) / bounding.height) * canvas.height

    canvas.setPan(canvas.offsetX + dx, canvas.offsetY + dy)

    start.value = {
      x: event.clientX,
      y: event.clientY,
    }
  }


  // Mouse Up
  const onMouseUp = () => {
    if (!editorMode.value) return
    isPanning.value = false;
  }




  onMounted(() => {
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', onKeyDown)
    window.removeEventListener("keyup", onKeyUp)
  });


  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    isPanning
  }
}