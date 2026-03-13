
/**
 * Extracts css rules from <style> elements inside an SVG
 * @param svgEl: SVGSVGElement
 * @returns : CSSRule[]
 */
export const parseCss = (svgEl: SVGSVGElement): CSSRule[] => {
  const rules: CSSRule[] = [];

  const styleEls = Array.from(svgEl.querySelectorAll("style"))
  styleEls.forEach(styleEl => {
    try {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(styleEl.textContent || ""); // streams text from styleEl into cssSheet

      for (const rule of sheet.cssRules) { 
        if (rule instanceof CSSStyleRule) rules.push(rule); // Extracts from cleaned cssSheet
      }
      
    } catch (e) {
      console.warn("failed parsing css:", e)
    }
  })

  return rules;
}