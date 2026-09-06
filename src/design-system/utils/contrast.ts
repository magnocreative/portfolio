/**
 * Contrast measurement against the values the browser actually paints.
 *
 * This exists because reading a computed custom property back as a string is
 * not enough: modern engines hand back `oklch(...)` or `lab(...)` untouched,
 * and anything that parses those as RGB produces confident nonsense. The only
 * reliable answer is to let the browser resolve the color, paint one pixel,
 * and read the pixel.
 *
 * This is not a documentation toy. It caught a real bug: --text-tertiary sat
 * at 3.92:1 in the light theme — under the 4.5:1 the small mono metadata it
 * carries requires — and it looked completely fine on screen.
 */

export type Level = "AAA" | "AA" | "AA Large" | "Fail";

let ctx: CanvasRenderingContext2D | null = null;

function context(): CanvasRenderingContext2D | null {
  if (typeof document === "undefined") return null;
  if (ctx) return ctx;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  ctx = canvas.getContext("2d", { willReadFrequently: true });
  return ctx;
}

/** Resolve any CSS color — including oklch() and light-dark() — to sRGB. */
export function toRGB(color: string): [number, number, number] | null {
  const c = context();
  if (!c) return null;
  c.clearRect(0, 0, 1, 1);
  // Paint opaque black first so an unparseable value is obvious rather than
  // silently inheriting whatever was there before.
  c.fillStyle = "#000";
  c.fillStyle = color;
  c.fillRect(0, 0, 1, 1);
  const d = c.getImageData(0, 0, 1, 1).data;
  return [d[0], d[1], d[2]];
}

/**
 * Resolve a semantic token to sRGB.
 *
 * Deliberately NOT `getComputedStyle(root).getPropertyValue(name)`. A custom
 * property comes back as its declared text — for these tokens that is
 * `light-dark(oklch(...), oklch(...))`, which canvas cannot parse at all, so
 * every measurement silently collapses to the black fallback and the whole
 * table reads 1.00:1. That is exactly what happened the first time.
 *
 * Instead: apply the token as a real `color` on a throwaway element and read
 * it back. A used color value is always resolved to rgb(), whatever function
 * produced it and whichever theme branch won.
 */
export function resolveToken(name: string): [number, number, number] | null {
  if (typeof document === "undefined" || !document.body) return null;
  const probe = document.createElement("span");
  probe.style.cssText = `position:absolute;width:0;height:0;opacity:0;pointer-events:none;color:var(${name})`;
  document.body.appendChild(probe);
  const resolved = getComputedStyle(probe).color;
  probe.remove();
  return resolved ? toRGB(resolved) : null;
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  const [rl, gl, bl] = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
}

export function contrastRatio(
  fg: [number, number, number],
  bg: [number, number, number],
): number {
  const [hi, lo] = [relativeLuminance(fg), relativeLuminance(bg)].sort((a, b) => b - a);
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * WCAG 2.2 thresholds. `large` means 24px, or 18.66px at 600+ weight —
 * on this site that is display type only, never the mono metadata.
 */
export function level(ratio: number, large = false): Level {
  if (large) {
    if (ratio >= 4.5) return "AAA";
    if (ratio >= 3) return "AA Large";
    return "Fail";
  }
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3) return "AA Large";
  return "Fail";
}

export function hex([r, g, b]: [number, number, number]): string {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}
