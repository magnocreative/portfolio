"use client";

import { useEffect, useRef } from "react";

/* --------------------------------------------------------------------------
   The homepage's ground: the case studies' dot grid, where every few seconds
   a few dots link up into the outline of one of the design system's own
   components, hold, and let go (Alejandro, November 2026: something
   creative and clever, slightly animated; chosen over contour lines, and
   left unlabeled, since the vagueness is the point). The systems behind the
   tools, drawn on the grid they are built on.

   Decoration only: hidden from assistive technology, never focusable, drawn
   in the page's own faint border color with the accent kept sparing, and
   masked to a whisper behind the headline so the text's contrast is the
   page's. With reduced motion it draws one still frame. It stops drawing
   when scrolled away or when the tab is hidden. */

/* Resolve a color role to rgb, so canvas can draw it in either theme */
function readColor(el: HTMLElement, role: string) {
  const probe = document.createElement("span");
  probe.style.color = `var(${role})`;
  probe.style.display = "none";
  el.appendChild(probe);
  const c = getComputedStyle(probe).color;
  probe.remove();
  return c;
}

/* Component outlines, traced from the design system's own components in
   Storybook (Alejandro, November 2026: match their shapes, as outlines),
   in grid cells from an anchor dot. Kept vague on purpose: the outer shape,
   the parts' outlines and a line where text would be, nothing more. The
   outer box sits on whole cells, so its corners land on dots, and those are
   the dots that light up. */
type Pt = [number, number];
type Shape = { name: string; w: number; h: number; parts: Pt[][] };

const line = (x1: number, y1: number, x2: number, y2: number): Pt[] => [
  [x1, y1],
  [x2, y2],
];

/* A rounded rectangle, as one closed path */
function rr(x: number, y: number, w: number, h: number, r = 0.18): Pt[] {
  const pts: Pt[] = [];
  const arc = (cx: number, cy: number, a0: number) => {
    for (let i = 0; i <= 6; i++) {
      const a = a0 + (i / 6) * (Math.PI / 2);
      pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
    }
  };
  pts.push([x + r, y]);
  arc(x + w - r, y + r, -Math.PI / 2);
  arc(x + w - r, y + h - r, 0);
  arc(x + r, y + h - r, Math.PI / 2);
  arc(x + r, y + r, Math.PI);
  pts.push([x + r, y]);
  return pts;
}

function circle(cx: number, cy: number, r: number): Pt[] {
  return Array.from({ length: 21 }, (_, i) => {
    const a = -Math.PI / 2 + (i / 20) * Math.PI * 2;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as Pt;
  });
}

const SHAPES: Shape[] = [
  {
    // Button: the label and its arrow inside the outline
    name: "Button",
    w: 5,
    h: 2,
    parts: [rr(0, 0, 5, 2, 0.22), line(1, 1, 3.2, 1), line(3.6, 1, 4.1, 1), [[3.85, 0.75], [4.1, 1], [3.85, 1.25]]],
  },
  {
    // Tag: a pill, its status dot and its word
    name: "Tag",
    w: 3,
    h: 1,
    parts: [rr(0, 0, 3, 1, 0.5), circle(0.5, 0.5, 0.13), line(0.9, 0.5, 2.5, 0.5)],
  },
  {
    // Theme toggle: three segments, the chosen one filled out, and the
    // sun, the moon and the screen
    name: "ThemeToggle",
    w: 4,
    h: 1,
    parts: [rr(0, 0, 4, 1, 0.22), rr(2.75, 0.12, 1.13, 0.76, 0.16), circle(0.66, 0.5, 0.2), circle(2, 0.5, 0.2), rr(3.1, 0.32, 0.43, 0.3, 0.05)],
  },
  {
    // Work entry: the cover at left, then the meta line, a two-line title,
    // the standfirst, a rule and the link
    name: "WorkEntry",
    w: 10,
    h: 4,
    parts: [
      rr(0, 0, 10, 4, 0.2),
      rr(0.25, 0.25, 4, 3.5, 0.12),
      rr(4.75, 0.55, 0.3, 0.3, 0.04),
      line(5.25, 0.7, 7.25, 0.7),
      line(4.75, 1.3, 8.9, 1.3),
      line(4.75, 1.75, 7.6, 1.75),
      line(4.75, 2.3, 9.3, 2.3),
      line(4.75, 2.65, 8.4, 2.65),
      line(4.75, 3.05, 9.5, 3.05),
      line(4.75, 3.45, 6.6, 3.45),
    ],
  },
  {
    // Facts panel: the employer's mark and the kind of work, the status pill,
    // then three facts, each an icon, a key and a value
    name: "FactsPanel",
    w: 8,
    h: 4,
    parts: [
      rr(0, 0, 8, 4, 0.2),
      rr(0.35, 0.35, 0.45, 0.45, 0.06),
      line(1.05, 0.58, 3.4, 0.58),
      rr(6.1, 0.35, 1.55, 0.45, 0.22),
      line(0, 1.15, 8, 1.15),
      ...[1.75, 2.55, 3.35].flatMap((y) => [rr(0.35, y - 0.2, 0.4, 0.4, 0.06), line(1, y, 2.4, y), line(3, y, 6.6, y)]),
    ],
  },
  {
    // Outcome stats: three columns between rules, each a figure and its label
    name: "OutcomeStats",
    w: 9,
    h: 3,
    parts: [
      line(0, 0, 9, 0),
      line(0, 3, 9, 3),
      line(3, 0, 3, 3),
      line(6, 0, 6, 3),
      ...[0, 3, 6].flatMap((x) => [rr(x + 0.35, 0.55, 1.6, 0.75, 0.1), line(x + 0.35, 1.85, x + 2.6, 1.85), line(x + 0.35, 2.3, x + 1.9, 2.3)]),
    ],
  },
  {
    // Compare slider: the frame, the divider, its handle, and the two labels
    name: "CompareSlider",
    w: 8,
    h: 5,
    parts: [
      rr(0, 0, 8, 5, 0.2),
      line(4, 0, 4, 5),
      circle(4, 2.5, 0.42),
      [[3.75, 2.35], [3.6, 2.5], [3.75, 2.65]],
      [[4.25, 2.35], [4.4, 2.5], [4.25, 2.65]],
      rr(0.3, 4.15, 1.7, 0.55, 0.27),
      rr(6, 4.15, 1.7, 0.55, 0.27),
    ],
  },
  {
    // Image gallery: three thumbnails and their labels
    name: "ImageGallery",
    w: 9,
    h: 3,
    parts: [0, 3.1, 6.2].flatMap((x) => [rr(x, 0, 2.8, 2.1, 0.14), line(x, 2.6, x + 1.5, 2.6)]),
  },
  {
    // Point cards: two by two, each an icon, a title and a line
    name: "PointCards",
    w: 8,
    h: 5,
    parts: [
      [0, 0],
      [4.1, 0],
      [0, 2.6],
      [4.1, 2.6],
    ].flatMap(([x, y]) => [rr(x, y, 3.9, 2.4, 0.18), rr(x + 0.3, y + 0.3, 0.5, 0.5, 0.08), line(x + 1.05, y + 0.55, x + 2.9, y + 0.55), line(x + 0.3, y + 1.3, x + 3.4, y + 1.3), line(x + 0.3, y + 1.75, x + 2.6, y + 1.75)]),
  },
  {
    // Section nav: the rail, the current section marked on it, and the
    // section names
    name: "SectionNav",
    w: 4,
    h: 5,
    parts: [
      line(0, 0, 0, 5),
      line(0.08, 1.5, 0.08, 2.2),
      ...[0.4, 1.1, 1.85, 2.6, 3.3, 4.05, 4.7].map((y, i) => line(i === 0 || i === 3 ? 0.35 : 0.7, y, i === 0 || i === 3 ? 3.2 : 2.8, y)),
    ],
  },
  {
    // Note: the info mark and two lines
    name: "Note",
    w: 7,
    h: 2,
    parts: [rr(0, 0, 7, 2, 0.2), circle(0.65, 0.7, 0.25), line(0.65, 0.62, 0.65, 0.8), line(1.25, 0.7, 6.2, 0.7), line(1.25, 1.25, 4.8, 1.25)],
  },
];

/* The grid dots a closed outline's corners come within a hair of. Lines
   of text are left out, so no dot lights up in the middle of a shape. */
function anchorsOf(lines: Pt[][]) {
  const found = new Map<string, Pt>();
  for (const l of lines) {
    const closed = l.length > 2 && Math.hypot(l[0][0] - l[l.length - 1][0], l[0][1] - l[l.length - 1][1]) < 0.01;
    if (!closed) continue;
    for (const [x, y] of l) {
      const gx = Math.round(x);
      const gy = Math.round(y);
      if (Math.hypot(x - gx, y - gy) < 0.12) found.set(`${gx},${gy}`, [gx, gy]);
    }
  }
  return [...found.values()];
}

function pathLength(lines: Pt[][]) {
  let L = 0;
  for (const l of lines) for (let i = 1; i < l.length; i++) L += Math.hypot(l[i][0] - l[i - 1][0], l[i][1] - l[i - 1][1]);
  return L;
}

export function HomeGround() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const cv = canvas.current;
    if (!el || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let colors = { dot: "", accent: "" };
    const readColors = () => {
      colors = { dot: readColor(el, "--border-default"), accent: readColor(el, "--interactive-default") };
    };
    readColors();

    let W = 0;
    let H = 0;
    const resize = () => {
      const r = el.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const S = 28; // the grid, as in the case study heroes

    type Live = { shape: Shape; x: number; y: number; born: number; len: number; lines: Pt[][]; anchors: Pt[] };
    let live: Live[] = [];
    const DRAW = 1800;
    const HOLD = 2600;
    const FADE = 1400;
    const LIFE = DRAW + HOLD + FADE;

    const spawn = (now: number) => {
      const cols = Math.floor(W / S);
      const rows = Math.floor(H / S);
      // To the right of the headline, where the ground is strongest. Below
      // 1024 the headline takes the width, so the grid stays still.
      if (W < 1024) return;
      const minCol = Math.floor(cols * 0.77);
      // Only the components that fit there, and not one already showing
      const fits = SHAPES.filter((sh) => sh.w <= cols - minCol - 1 && !live.some((l) => l.shape.name === sh.name));
      if (!fits.length) return;
      const shape = fits[Math.floor(Math.random() * fits.length)];
      for (let tries = 0; tries < 20; tries++) {
        const cx = minCol + Math.floor(Math.random() * Math.max(1, cols - shape.w - 1 - minCol));
        const cy = 1 + Math.floor(Math.random() * Math.max(1, rows - shape.h - 2));
        const clash = live.some((l) => cx < l.x + l.shape.w + 2 && cx + shape.w + 2 > l.x && cy < l.y + l.shape.h + 2 && cy + shape.h + 2 > l.y);
        if (!clash) {
          const lines = shape.parts;
          live.push({ shape, x: cx, y: cy, born: now, len: pathLength(lines), lines, anchors: anchorsOf(lines) });
          return;
        }
      }
    };

    const drawDots = (lit?: Set<string>) => {
      ctx.fillStyle = colors.dot;
      for (let y = S / 2; y < H; y += S) {
        for (let x = S / 2; x < W; x += S) {
          const key = `${Math.round((x - S / 2) / S)},${Math.round((y - S / 2) / S)}`;
          if (lit?.has(key)) continue;
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const drawBuild = (now: number) => {
      ctx.clearRect(0, 0, W, H);
      const lit = new Map<string, number>();
      for (const l of live) {
        const age = now - l.born;
        const fade = age < DRAW + HOLD ? 1 : Math.max(0, 1 - (age - DRAW - HOLD) / FADE);
        // The dots the outline passes through at its corners, lit as it draws
        for (const [px, py] of l.anchors) {
          const k = `${l.x + px},${l.y + py}`;
          lit.set(k, Math.max(lit.get(k) ?? 0, fade * Math.min(1, age / DRAW)));
        }
      }
      drawDots();
      ctx.fillStyle = colors.accent;
      for (const [k, a] of lit) {
        const [gx, gy] = k.split(",").map(Number);
        ctx.globalAlpha = 0.95 * a;
        ctx.beginPath();
        ctx.arc(gx * S + S / 2, gy * S + S / 2, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.lineWidth = 1.5;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      for (const l of live) {
        const age = now - l.born;
        const grow = Math.min(1, age / DRAW);
        const eased = 1 - Math.pow(1 - grow, 3);
        const fade = age < DRAW + HOLD ? 1 : Math.max(0, 1 - (age - DRAW - HOLD) / FADE);
        ctx.strokeStyle = colors.accent;
        ctx.globalAlpha = 0.8 * fade;
        let budget = eased * l.len;
        for (const line of l.lines) {
          if (budget <= 0) break;
          ctx.beginPath();
          const ox = l.x * S + S / 2;
          const oy = l.y * S + S / 2;
          ctx.moveTo(ox + line[0][0] * S, oy + line[0][1] * S);
          for (let i = 1; i < line.length && budget > 0; i++) {
            const [ax, ay] = line[i - 1];
            const [bx, by] = line[i];
            const seg = Math.hypot(bx - ax, by - ay);
            const t = Math.min(1, budget / seg);
            ctx.lineTo(ox + (ax + (bx - ax) * t) * S, oy + (ay + (by - ay) * t) * S);
            budget -= seg;
          }
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      live = live.filter((l) => now - l.born < LIFE);
    };

    /* ---------------- the loop ---------------- */
    let raf = 0;
    let visible = true;
    let nextSpawn = 0;
    let restful = false;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      // Nothing moves on a narrow screen: draw the dots once and rest
      if (W < 1024) {
        if (!restful) drawBuild(now);
        restful = true;
        return;
      }
      restful = false;
      if (now >= nextSpawn && live.length < 3) {
        spawn(now);
        nextSpawn = now + 1700 + Math.random() * 1600;
      }
      drawBuild(now);
    };

    const still = () => {
      live = [];
      spawn(-DRAW);
      drawBuild(0);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (reduce.matches) still();
      else raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    const ro = new ResizeObserver(() => {
      resize();
      restful = false; // resizing clears the canvas, so draw again
      if (reduce.matches) still();
    });
    ro.observe(el);
    // Repaint in the new colors when the theme changes
    const mo = new MutationObserver(() => {
      readColors();
      restful = false;
      if (reduce.matches) still();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class", "style"] });
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    const onScheme = () => {
      readColors();
      restful = false;
      if (reduce.matches) still();
    };
    scheme.addEventListener("change", onScheme);
    reduce.addEventListener("change", start);
    start();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      scheme.removeEventListener("change", onScheme);
      reduce.removeEventListener("change", start);
    };
  }, []);

  return (
    <div
      ref={wrap}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        // Quiet behind the headline, full strength to its right, gone at the
        // bottom, as the case study heroes fade their ground
        maskImage:
          "linear-gradient(to right, rgb(0 0 0 / 0.35) 40%, black 68%), linear-gradient(to bottom, black 70%, transparent)",
        maskComposite: "intersect",
        WebkitMaskImage:
          "linear-gradient(to right, rgb(0 0 0 / 0.35) 40%, black 68%), linear-gradient(to bottom, black 70%, transparent)",
        WebkitMaskComposite: "source-in",
      }}
    >
      <canvas ref={canvas} className="block h-full w-full" />
    </div>
  );
}
