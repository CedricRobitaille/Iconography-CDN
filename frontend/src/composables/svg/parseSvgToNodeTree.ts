import { parseSvg } from "./parseSvg";
import { buildSceneGraph } from "./buildSceneGraph";
import { parseCss } from "./parseCss";
import { resolveStyles } from "./resolveStyles";
import { buildNodeTree } from "./buildTreeNode";
import type { treeNode } from "../../types";
import { styleRegistry } from "./styleRegistrySingleton";

/**
 * 
 */
export const parseSvgToTreeNode = (svgText: string): treeNode[] => {
  // Parse raw SVG
  const svgEl = parseSvg(svgText)
  if (!svgEl) return [];

  // Append svg to dom for computed styles
  document.body.appendChild(svgEl);

  // Build scene graph
  const sceneGraph = buildSceneGraph(svgEl)

  // Parse <style> tags
  const cssRules = parseCss(svgEl)

  // Resolve final tags
  resolveStyles(sceneGraph, cssRules, styleRegistry);

  // Convert scene graph + styles => treeNode[]
  const nodeTree = buildNodeTree(sceneGraph, styleRegistry)

  // Clean up
  svgEl.remove();

  // Export
  return nodeTree
}