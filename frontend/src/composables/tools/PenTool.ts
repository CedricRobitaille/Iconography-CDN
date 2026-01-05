import type { SvgCanvasState, ToolHandler, treeNode } from "../../types";
import { useMouseToSvgPos } from "../mousePos";

export const usePenTool = (): ToolHandler => {

  const onClick = (event: MouseEvent, editor: SvgCanvasState) => {
    // Must be using Pen tool
    if (editor.activeTool !== "pen") return;

    console.log("PEN CLICK")
    // convert mosue to SVG coords
    const {
      x = 0,
      y = 0,
    } = useMouseToSvgPos(event, editor);

    if (!editor.currentPath) {
      // Start a new path
      const newPath: treeNode = {
        id: 0,
        name: 'Path',
        type: 'path',
        locked: false,
        visible: true,
        expanded: true,
        style: { fill: 'none', stroke: '#000' },
        properties: { d: [{ type: 'M', d: { x, y } }] },
        children: [],
      };
      // ! Need a function to set path
      editor.setCurrentPath(newPath);
      // ! Need a function to add path to node
      editor.addNode(newPath)
    } else {
      // Add new line segment
      editor.currentPath.properties.d.push({
        type: "L",
        d: {
          x: x,
          y: y
        }
      });
    }
  }

  return {
    onClick,
  }
}

