export const sanitizeHex = (value: string): string => {
  let val = value.toUpperCase();

  // Remove non-hex-ready characters
  // Only accept 0-9, A-Z, and start with "#"
  val = "#" + val.replace(/[^0-9A-F]/g, "");

  // Clamp to 7 chars
  if (val.length > 7) {
    val = val.slice(0, 7);
  }

  return val;
}

export const sanitizeOpacity = (value: number): number => {
  let val = value;

  if (val > 100) {
    // Remove the last digit. 240 -> 24
    val = Math.floor(val / 10)
  }
  if (val < 0) {
    val = 0
  }

  return val;
}