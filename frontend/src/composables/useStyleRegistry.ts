import type {
  StyleDefinition,
  StyleRegistryMap,
  StyleId
} from '../types'


export const useStyleRegistry = () => {
  const styles: StyleRegistryMap = {};
  const hashToId: Record<string, StyleId> = {};
  let idCounter = 1;

  // Create UID
  const generateId = ():StyleId => {
    return `s${idCounter++}`
  }

  // Hash the style
  const hashStyle = (style: StyleDefinition): string => {
    return JSON.stringify({
      fill: {
        fill: style.fill.fill ?? null,
        fillOpacity: style.fill.fillOpacity ?? null
      },
      stroke: {
        stroke: style.stroke.stroke ?? null,
        strokeOpacity: style.stroke.strokeOpacity ?? null,
        strokeWidth: style.stroke.strokeWidth ?? null,
        strokeDasharray: style.stroke.strokeDasharray ?? null,
        strokeDashoffset: style.stroke.strokeDashoffset ?? null,
        strokeLinecap: style.stroke.strokeLinecap ?? null,
        strokeLinejoin: style.stroke.strokeLinejoin ?? null,
        strokeLineposition: style.stroke.strokeLineposition ?? null
      }
    });
  }

  // Register the style
  const register = (style: StyleDefinition): StyleId => {
    const hash = hashStyle(style)
    const existing = hashToId[hash] // See if the style already exists

    if (existing) return existing;

    const id = generateId();
    styles[id] = style;
    hashToId[hash] = id;

    return id
  }

  /**
   * Retrieve the style from ID
   * @param id: StyleId
   * @returns style
   */
  const get = (id: StyleId): StyleDefinition | undefined => {
    console.log("Style Engine - Get():", styles[id])
    return styles[id]
  }

  /**
   * Update Style
   * @param id: StyleId
   * @param next: StyleDefinition
   * @returns :StyleId
   */
  const update = (id: StyleId, next: StyleDefinition): StyleId => {
    const hash = hashStyle(next);
    const existing = hashToId[hash];

    if (existing) return existing;

    const newId = generateId();
    styles[newId] = next;
    hashToId[hash] = newId;

    return newId;
  }

  /**
   * Get all Styles
   */
  const all = (): StyleRegistryMap => {
    return styles;
  }

  return {
    register,
    get,
    update,
    all,
  }

}