import { useEditorStore } from "../stores/editorSvg";
// IMPORT TOOL COMPOSABLE

export const useToolManager = () => {
  const editor = useEditorStore();

  const tools: Record<string, any> = {
    // pen: usePenTool()
  };

  const handleMouseDown = (e: MouseEvent) => {
    tools[editor.activeTool]?.onMouseDown?.(e, editor)
  };
  const handleMouseUp = (e: MouseEvent) => {
    tools[editor.activeTool]?.onMouseUp?.(e, editor)
  };
  const handleMouseMove = (e: MouseEvent) => {
    tools[editor.activeTool]?.onMouseMove?.(e, editor)
  };
  const handleClick = (e: MouseEvent) => {
    tools[editor.activeTool]?.onMouseClick?.(e, editor)
  };
  const handleWheel = (e: MouseEvent) => {
    tools[editor.activeTool]?.onWheel?.(e, editor)
  }

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleClick,
    handleWheel,
  }
}