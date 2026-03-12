import type { 
  treeNode, 
  Circle, 
  Rectangle, 
  Ellipse, 
  Line, 
  Polygon, 
  Polyline, 
  Path, 
  PathAction,
  style
} from "../types"

// Converts SVG string to SVG code to be parsed by the svg parser
const parseSvgString = (svgText: string): SVGElement | null => {
  // Accept valid HTML as string
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, 'image/svg+xml');

  const root = doc.documentElement;

  // Confirm data -> in matches typing of SVG
  if (
    root.tagName.toLowerCase() === 'svg'
  ) {

    return root as SVGSVGElement;
  }

  return null
}

// SVG Parser to convert svg code to the nodeTree[] structure
export const useSvgParser = () => {

  let nodeIdCounter = 1;

  // Generate a unique ID for each node
  const genId = ():number => {
    return nodeIdCounter++;
  }

  // Parse out the css styles into treeNode.style format
  const parseCssMap = (svgEl: SVGSVGElement): Record<string, Partial<treeNode["style"]>> => {
    // Map out all the styles in treeNode.style
    const cssMap: Record<string, Partial<treeNode["style"]>> = {}

    // Get all the styles in the svg elem
    const styleEls = svgEl.querySelectorAll("style");

    styleEls.forEach(styleEl => {
      const cssText = styleEl.textContent ?? "";
      const regex = /\.(.+?)\s*\{([^}]+)\}/g;
      let match: RegExpExecArray | null;

      while ((match = regex.exec(cssText)) !== null) {
        const className = match[1]?.trim() // eg: .cls-1
        const rules = match[2]?.trim() // eg: border {}
        const styleObj: style = {
          fill: {},
          stroke: {},
        }

        rules?.split(";").forEach(rule => {
          // split the string from border: 20px -> [border], [20px]
          const [prop, val] = rule.split(":").map(s => s.trim());
          // Must have both the prop and the value
          if (!prop || !val) return;

          switch (prop) {
            case "fill":
              styleObj.fill!.fill = val;
              break;

            case "fill-opacity":
              styleObj.fill!.fillOpacity = parseFloat(val);
              break;

            case "stroke":
              styleObj.stroke!.stroke = val;
              break;

            case "stroke-width":
              styleObj.stroke!.strokeWidth = parseFloat(val);
              break;

            case "stroke-linecap":
              styleObj.stroke!.strokeLinecap = val as "butt" | "round" | "square";
              break;

            case "stroke-linejoin":
              styleObj.stroke!.strokeLinejoin = val as "miter" | "round" | "bevel";
              break;
          }
        });

        cssMap[className] = styleObj
      }
    });

    return cssMap
  }


  // Parse from string ie: "12.23-234 23.1 23.24"
  // to number [num, num, num, num]
  const parseNumbers = (str: string): number[] => {
    const nums: number[] = [];
    // Regex: match numbers including negative / decimal / etc
    const regex = /-?\d*\.?\d+(e[-+]?\d+)?/gi;

    let match: RegExpExecArray | null;
    // Loop through every set, split by regec characters 
    while ((match = regex.exec(str)) !== null) {
      // Add the numbers to the arr
      nums.push(parseFloat(match[0]));
    }
    return nums;
  }


  // Parse 'path' type actionString into pathAction[]
  const parsePathD = (d: string): PathAction[] => {
    const actions: PathAction[] = [];

    const regex = /([MLHVCSQTAZmlhvcsqtaz])([^MLHVCSQTAZmlhvcsqtaz]*)/gi;
    let match: RegExpExecArray | null;

    let cx = 0; // Current xPos
    let cy = 0; // Current yPos

    let sx = 0; // Starting xPos
    let sy = 0; // Starting yPos

    // While there are still pathActions 
    // (as defined by the regex)
    // Keep parsing!
    while((match = regex.exec(d)) !== null) {

      const cmd = match[1];
      const rawParams = match[2] ?? ""
      const params = parseNumbers(rawParams);

      // helper to deal with while loops
      const currParam = (count: number) => params.splice(0, count);

      switch(cmd) {
        case "M":
        case "m": {
          let first = true;
          while (params.length >= 2) {
            let [
              x = 0, 
              y = 0
            ] = currParam(2);
            if (cmd === "m") { x += cx; y += cy; }
            cx = x;
            cy = y;
            if (first) {
              sx = x;
              sy = y;
              actions.push({ type: "M", d: { x, y } });
              first = false;
            } else {
              actions.push({ type: "L", d: { x, y } });
            }
          }
          break;
        }
          
        case "L":
        case "l": {
          while (params.length >= 2) {
            let [
              x = 0,
              y = 0
            ] = currParam(2);

            if (cmd === "l") {
              x += cx;
              y += cy;
            }
            // Set the currentPointPos
            cx = x;
            cy = y;

            actions.push({
              type: "L",
              d: {
                x: x,
                y: y
              }
            })
          }
          break;
        }
          
        case "H":
        case "h": {
          while (params.length >= 1) {
            let [
              x = 0,
            ] = currParam(1);

            if (cmd === "h") {
              x += cx;
            }
            cx = x;

            actions.push({
              type: "H",
              d: {
                x: x
              }
            })
          }
          
          break;
        }
          
        case "V":
        case "v": {
          while (params.length >= 1) {
            let [
              y = 0,
            ] = currParam(1);

            if (cmd === 'v') {
              y += cy;
            }
            cy = y;

            actions.push({
              type: "V",
              d: {
                y: y
              }
            })
          }

          break;
        }
          
        case "C":
        case"c": {
          while (params.length >= 6) {
            let [
              x1 = 0,
              y1 = 0,
              x2 = 0,
              y2 = 0,
              x = 0,
              y = 0,
            ] = currParam(6);

            if (cmd === 'c') {
              x1 += cx; 
              y1 += cy;
              x2 += cx; 
              y2 += cy;
              x += cx; 
              y += cy;
            }
            cx = x;
            cy = y;

            actions.push({
              type: "C",
              d: {
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2,
                x: x,
                y: y
              }
            })
          }
          
          break;
        }
          
        case "S":
        case "s": {
          while (params.length >= 4) {
            let [
              x2 = 0,
              y2 = 0,
              x = 0,
              y = 0,
            ] = currParam(4);

            if (cmd === 's') {
              x2 += cx; 
              y2 += cy; 
              x += cx; 
              y += cy;
            }
            cx = x;
            cy = y;

            actions.push({
              type: "S",
              d: {
                x2: x2,
                y2: y2,
                x: x,
                y: y,
              }
            })
          }
          
          break;
        }
          
        case "Q":
        case "q": {
          while (params.length >= 4) {
            let [
              x1 = 0,
              y1 = 0,
              x = 0,
              y = 0,
            ] = currParam(4);

            if (cmd === 'q') {
              x1 += cx; 
              y1 += cy; 
              x += cx; 
              y += cy; 
            }
            cx = x;
            cy = y;

            actions.push({
              type: "Q",
              d: {
                x1: x1,
                y1: y1,
                x: x,
                y: y,
              }
            })
          }
          break;
        }
          
        case "T":
        case 't': {
          while (params.length >= 2) {
            let [
              x = 0,
              y = 0,
            ] = currParam(2);

            if (cmd === 't') {
              x += cx;
              y += cy; 
            }
            cx = x;
            cy = y;

            actions.push({
              type: "T",
              d: {
                x: x,
                y: y
              }
            })
          }
          
          break;
        }
          
        case "A":
        case "a": {
          while (params.length >= 7) {
            let [
              rx = 0,
              ry = 0,
              xAxisRotation = 0,
              largeArcFlag = 0,
              sweepFlag = 0,
              x = 0,
              y = 0,
            ] = currParam(7);

            if (cmd === 'a') {
              x += cx; 
              y += cy; 
            }
            cx = x;
            cy = y;

            actions.push({
              type: "A",
              d: {
                rx: rx,
                ry: ry,
                xAxisRotation: xAxisRotation,
                largeArcFlag: largeArcFlag,
                sweepFlag: sweepFlag,
                x: x,
                y: y
              }
            })
          }
          
          break;
        }

        case "Z":
        case "z":
          actions.push({
            type: "Z",
            d: {}
          })
          cx = sx;
          cy = sy;
          break;
      }
    }
    return actions;
  }




  // Recursively convert SVG into treeNode
  const parseElement = (el: Element, cssMap: Record<string, Partial<treeNode["style"]>>): treeNode | null => {
    const tag = el.tagName.toLowerCase();
    console.log("ELEMENT: ",el)

    // Only accept supported tags
    const supportedTags = ['circle', 'rect', 'ellipse', 'line', 'polygon', 'polyline', 'path', 'g'];
    if (!supportedTags.includes(tag)) return null;

    // Extract style
    const style: style = {
      fill: {
        fill: el.getAttribute("fill") || "none",
        fillOpacity: parseFloat(el.getAttribute("fill-opacity") ?? "1"),
      },
      stroke: {
        stroke: el.getAttribute("stroke") || "none",
        strokeOpacity: el.getAttribute("stroke-opacity") ? parseFloat(el.getAttribute("stroke-opacity")!) : 1,
        strokeWidth: el.getAttribute("stroke-width") ? parseFloat(el.getAttribute("stroke-width")!) : 0,
        strokeDasharray: el.getAttribute("stroke-dasharray") as any,
        strokeDashoffset: el.getAttribute("stroke-dashoffset") as any,
        strokeLinecap: el.getAttribute("stroke-linecap") as any,
        strokeLinejoin: el.getAttribute("stroke-join") as any,
      }
    };

    // Merge class styles
    const classNames = (el.getAttribute("class") ?? "")
      .split(/\s/)
      .filter(Boolean);
    
    classNames.forEach(cls => {
      if (cssMap[cls]) {
        Object.assign(style, cssMap[cls]); // class overrides default inline
      }
    })

    // Form the selected node
    const node: treeNode = {
      id: genId(),
      name: tag,
      type: tag === 'g' ? 'folder' : tag as any,
      locked: false,
      visible: el.getAttribute("display") !== "none", // Display none = false
      expanded: false,
      style: style,
      children: [],
      properties: {} as any,
    };

    // Map tag type to properties
    switch(tag) {

      case 'circle':
        node.properties = {
          cx: Number(el.getAttribute('cx') ?? 0),
          cy: Number(el.getAttribute('cy') ?? 0),
          r: Number(el.getAttribute('r') ?? 0),
        } as Circle;
        break;

      case 'ellipse':
        node.properties = {
          cx: Number(el.getAttribute('cx') ?? 0),
          cy: Number(el.getAttribute('cy') ?? 0),
          rx: Number(el.getAttribute('rx') ?? 0),
          ry: Number(el.getAttribute('ry') ?? 0),
        } as Ellipse;
        break;

      case 'line':
        node.properties = {
          x1: Number(el.getAttribute('x1') ?? 0),
          y1: Number(el.getAttribute('y1') ?? 0),
          x2: Number(el.getAttribute('x2') ?? 0),
          y2: Number(el.getAttribute('y2') ?? 0),
        } as Line;
        break;

      case 'path':
        const d = el.getAttribute('d') ?? '';
        // Use the helper function to parse the data.
        node.properties = { d: parsePathD(d) } as Path;
        break;


      case 'polygon':
      case 'polyline':
        const pointsAttr = el.getAttribute("points") ?? "";
        // Remove end space, split at space, break into array
        const pointsArray = pointsAttr.trim().split(/\s/).map(pair => {
          // Convert each xy point to [num, num]
          const [x, y] = pair.split(",").map(Number);
          return {x, y};
        })
        // Set the typing depending on the type
        node.properties = tag === "polygon" 
          ? { points: pointsArray } as Polygon
          : { points: pointsArray } as Polyline;
        break;

      case 'rect':
        node.properties = {
          x: Number(el.getAttribute('x') ?? 0),
          y: Number(el.getAttribute('y') ?? 0),
          w: Number(el.getAttribute('width') ?? 0),
          h: Number(el.getAttribute('height') ?? 0),
          rx: Number(el.getAttribute('rx') ?? 0),
          ry: Number(el.getAttribute('ry') ?? 0),
        } as Rectangle;
        break;
    }

    // Recursively parse children if folder
    if (tag === 'g') {
      node.children = Array.from(el.children)
        .map(parseElement)
        .filter(Boolean) as treeNode[];
    }

    return node;
  }
  // END PARSE_ELEMENT FUNCTION



  // Convert entire SVG string into treenode[]
  const parse = (svgText: string): treeNode[] => {
    nodeIdCounter = 0; // reset the id count

    const svgEl = parseSvgString(svgText);
    if (!svgEl) return [];

    const cssMap = parseCssMap(svgEl);

    const tree = Array.from(svgEl.children)
      .map(el => parseElement(el, cssMap))
      .filter(Boolean) as treeNode[];

    console.log(tree)

    return tree
  }


  // called action from the useSvgParser function
  return {
    parse,
  }
}