
/**
 * Convert Raw SVG code into a SVG DOM Element
 * @param svgText: string - Raw SVG Code
 * @returns SVG Dom Element (null if failed)
 */
export const parseSvg = (svgText: string): SVGSVGElement | null => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, 'image/svg+xml');
  const root = doc.documentElement;

  console.log("Parsed SVG root:", root);
  console.log("Root attributes:", root.getAttributeNames().map(a => ({
    [a]: root.getAttribute(a)
  })));

  // Confirm data -> in matches typing of SVG
  if (root.tagName.toLowerCase() === "svg") {
    return root as SVGSVGElement;
  }
  return null;
}