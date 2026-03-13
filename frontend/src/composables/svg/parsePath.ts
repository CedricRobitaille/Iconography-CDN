import type { PathAction } from "../../types";

export const parsepathD = (d: string): PathAction[] => {
  const actions: PathAction[] = [];
  const regex = /([MLHVCSQTAZmlhvcsqtaz])([^MLHVCSQTAZmlhvcsqtaz]*)/gi;
  let match: RegExpExecArray | null;

  let cx = 0, cy = 0, sx = 0, sy = 0;

  // Clean Numbers
  const parseNumbers = (str: string): number[] => {
    const nums: number[] = [];
    const regex = /-?\d*\.?\d+(e[-+]?\d+)?/gi;
    let m: RegExpExecArray | null;
    while ((m = regex.exec(str)) !== null) nums.push(parseFloat(m[0]));
    return nums;
  };

  while ((match = regex.exec(d)) !== null) {

    const cmd = match[1];
    const rawParams = match[2] ?? ""
    const params = parseNumbers(rawParams);

    // helper to deal with while loops
    const currParam = (count: number) => params.splice(0, count);

    switch (cmd) {
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
      case "c": {
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