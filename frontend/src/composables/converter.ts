export const HSBtoHEX = (h: number, s: number, b: number): string => {
  // Hue is range from 0 - 360
  // Saturation + Brightess is a percentage 0 - 1
  s /= 100;
  b /= 100;

  const k = (n: number) => {
    return (n + h / 60) % 6;
  }
  const f = (n:number) => {
    return b - b * s * Math.max(Math.min(k(n), 4-k(n), 1), 0)
  }

  const red = Math.round(f(5) * 255);
  const green = Math.round(f(3) * 255);
  const blue = Math.round(f(1) * 255);

  const toHex = (x: number) => {
    return x.toString(16).padStart(2, '0');
  }

  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}




export const HEXtoHSB = (hex: string): {h: number, s: number, b: number} => {
  hex = hex.replace("#", '')

  if (hex.length == 3) {
    // fcd -> ffccdd
    hex = hex.split("").map(c => c + c).join('')
  }

  // convert ff -> 'f','f' -> 255 -> 1
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r,g,b);
  const min = Math.min(r,g,b);
  const delta = max-min

  let h = 0;

  if (delta !== 0) {
    if (max === r) {
      h = 60 * (((g - b) / delta) % 6)
    } else if (max === g) {
      h = 60 * (((b - r) / delta) + 2)
    } else {
      h = 60 * (((r - g) / delta) + 4)
    }
    if (h < 0) h += 360;
  }

  const s = max === 0 ? 0 : (delta / max) * 100;
  const brightness = max * 100

  return {
    h: h,
    s: s,
    b: brightness,
  }
}