import type { 
  Circle,
  Rectangle,
  Ellipse,
  Line,
  Polygon,
  Polyline,
  Path,
  SceneNode, 
  treeNode
} from "../../types";
import { parsepathD } from "./parsePath";
import type { styleRegistry } from "./styleRegistrySingleton";




/**
 * 
 */
export const buildNodeTree = (
  sceneNodes: SceneNode[],
  styleEngine: typeof styleRegistry
): treeNode[] => {

  let nodeIdCounter = 1;
  const genId = (): number => nodeIdCounter++;



  // Convert the sceneNode into a treenode
  const convertNode = (sn: SceneNode): treeNode => {
    const node: treeNode = {
      id: sn.id ?? genId(),
      name: sn.tag,
      type: sn.tag === "g" ? "folder" : sn.tag as any,
      locked: false,
      visible: sn.attributes.display !== "none",
      expanded: false,
      styleId: sn.styleId!,
      style: styleEngine.get(sn.styleId!),
      children: sn.children.map(convertNode),
      properties: {} as any,
    }

    // Map attributes to shape properties
    switch (sn.tag) {

      case 'circle':
        node.properties = {
          cx: Number(sn.attributes.cx ?? 0),
          cy: Number(sn.attributes.cy ?? 0),
          r: Number(sn.attributes.r ?? 0),
        } as Circle;
        break;

      case 'ellipse':
        node.properties = {
          cx: Number(sn.attributes.cx ?? 0),
          cy: Number(sn.attributes.cy ?? 0),
          rx: Number(sn.attributes.rx ?? 0),
          ry: Number(sn.attributes.ry ?? 0),
        } as Ellipse;
        break;

      case 'line':
        node.properties = {
          x1: Number(sn.attributes.x1 ?? 0),
          y1: Number(sn.attributes.y1 ?? 0),
          x2: Number(sn.attributes.x2 ?? 0),
          y2: Number(sn.attributes.y2 ?? 0),
        } as Line;
        break;

      case 'path':
        const d = sn.attributes.d ?? '';
        // Use the helper function to parse the data.
        node.properties = { d: parsepathD(sn.attributes.d ?? "") } as Path;
        break;

      case 'polygon':
      case 'polyline':
        const numbers = (sn.attributes.points ?? "").trim().split(/\s+/).map(Number);
        const pointsArray = numbers.reduce<number[][]>((acc, _, i) => {
          if (i % 2 === 0) acc.push([numbers[i], numbers[i + 1]]);
          return acc;
        }, []);
        node.properties = sn.tag === "polygon"
          ? { points: pointsArray } as Polygon
          : { points: pointsArray } as Polyline;
        break;

      case 'rect':
        node.properties = {
          x: Number(sn.attributes.x ?? 0),
          y: Number(sn.attributes.y ?? 0),
          w: Number(sn.attributes.width ?? 0),
          h: Number(sn.attributes.height ?? 0),
          rx: Number(sn.attributes.rx ?? 0),
          ry: Number(sn.attributes.ry ?? 0),
        } as Rectangle;
        break;
    }
    return node;
  };

  return sceneNodes.map(convertNode)
}