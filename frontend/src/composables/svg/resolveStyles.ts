import type { SceneNode, StyleDefinition } from "../../types";
import type { styleRegistry } from "./styleRegistrySingleton";

/**
 * Combines inline attributes + CSS rules into a final style for each node
 * Registers the style in the registry and returns a styleId per node
 */
export const resolveStyles = (
  sceneNodes: SceneNode[], 
  cssRules: CSSRule[],
  styleEngine: typeof styleRegistry
) => {

  const getEffectiveStyle = (el: Element): StyleDefinition => {
    const cs = window.getComputedStyle(el);

    const num = (v: string | null) => (v ? parseFloat(v) : undefined);
    const none = (v: string | null) => (v === "none" || v === "transparent" ? "none" : v);

    const style: StyleDefinition = {
      fill: {
        fill: none(el.getAttribute("fill") ?? cs.fill),
        fillOpacity: parseFloat(el.getAttribute("fill-opacity") ?? cs.fillOpacity) ?? 1,
      },
      stroke: {
        stroke: none(el.getAttribute("stroke") ?? cs.stroke),
        strokeOpacity: num(el.getAttribute("stroke-opacity") ?? cs.strokeOpacity) ?? 1,
        strokeWidth: num(el.getAttribute("stroke-width") ?? cs.strokeWidth) ?? 0,
        strokeLinecap: el.getAttribute("stroke-linecap") ?? cs.strokeLinecap as any,
        strokeLinejoin: el.getAttribute("stroke-linejoin") ?? cs.strokeLinejoin as any,
        strokeDasharray: cs.strokeDasharray === "none" ? undefined : cs.strokeDasharray,
        strokeDashoffset: num(el.getAttribute("stroke-dashoffset") ?? cs.strokeDashoffset) ?? 0,
      },
    };

    // Apply CSS <style> rules
    cssRules.forEach(rule => {
      try {
        if (rule instanceof CSSStyleRule) {
          for (const key of rule.style) {
            const value = rule.style.getPropertyValue(key);
            switch (key) {
              case "fill": style.fill.fill = none(value); break;
              case "fill-opacity": style.fill.fillOpacity = parseFloat(value) || 1; break;
              case "stroke": style.stroke.stroke = none(value); break;
              case "stroke-opacity": style.stroke.strokeOpacity = parseFloat(value) || 1; break;
              case "stroke-width": style.stroke.strokeWidth = parseFloat(value) || 0; break;
              case "stroke-linecap": style.stroke.strokeLinecap = value as any; break;
              case "stroke-linejoin": style.stroke.strokeLinejoin = value as any; break;
              case "stroke-dasharray": style.stroke.strokeDasharray = value === "none" ? undefined : value; break;
              case "stroke-dashoffset": style.stroke.strokeDashoffset = parseFloat(value) || 0; break;
            }
          }
        }
      } catch (e) {
        // invalid selector, skip
      }
    });

    return style;
  };

  const traverse = (nodes: SceneNode[]) => {
    nodes.forEach(node => {
      if (!node.el) return;

      const effectiveStyle = getEffectiveStyle(node.el);
      node.styleId = styleEngine.register(effectiveStyle);

      if (node.children && node.children.length > 0) traverse(node.children);
    });
  };

  traverse(sceneNodes);
};