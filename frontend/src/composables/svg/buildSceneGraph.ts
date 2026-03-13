
import type { SceneNode } from "../../types";

/**
 * Intermediate representation of the SVG hierarchy
 * Children + Attributes (before styles resolved)
 * @param svgEl 
 * @returns : SceneNode[] - scene graph
 */
export const buildSceneGraph = (svgEl: SVGSVGElement): SceneNode[] => {

  const parseEl = (el: Element): SceneNode | null => {
    const tag = el.tagName.toLowerCase();

    if (["defs","style"].includes(tag)) {
      return null;
    }

    const node: SceneNode = {
      tag,
      attributes: Object.fromEntries(el.getAttributeNames().map(a => [a, el.getAttribute(a)])),
      children: Array.from(el.children).map(parseEl).filter(Boolean) as SceneNode[],
      el, // reference for computed styles
    }
    return node;
  }

  const sceneGraph = Array.from(svgEl.children)
                  .map(parseEl)
                  .filter(Boolean) as SceneNode[];
                  
  console.log("Scene Graph:", sceneGraph)
  return sceneGraph;
}