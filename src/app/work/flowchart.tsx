import type { ReactNode } from "react";

/* --------------------------------------------------------------------------
   Flowchart pieces for user flows recreated from Alejandro's own artifacts
   (November 2026), shared by the case studies so every flow reads in the
   same notation, his: blue boxes for screens, bracketed shapes for what the
   user does, diamonds for decisions, green for the start and for success,
   pink for failure, a white box for a step left out of the first release,
   and light blue panels for a group. Drawn in SVG user units on a white
   canvas, light in both themes, as his flowcharts were: a picture of the
   artifact, not a diagram in the site's own style. */

export const FC = {
  screen: "oklch(88.5% 0.055 228)",
  screenEdge: "oklch(72% 0.07 230)",
  decision: "oklch(66% 0.14 235)",
  ok: "oklch(83% 0.11 135)",
  okEdge: "oklch(64% 0.1 135)",
  bad: "oklch(86% 0.07 5)",
  badEdge: "oklch(68% 0.11 5)",
  panel: "oklch(96% 0.02 228)",
  panelEdge: "oklch(82% 0.04 230)",
  note: "oklch(93.5% 0.004 250)",
  noteEdge: "oklch(78% 0.006 250)",
  line: "oklch(32% 0.02 260)",
  text: "oklch(24% 0.02 260)",
};

/* The canvas: white, the arrowhead defined once, scrolling sideways on a
   phone rather than shrinking past reading */
export function FlowCanvas({ w, h, children, minWidth = "46rem" }: { w: number; h: number; children: ReactNode; minWidth?: string }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="block w-full" style={{ minWidth, fontFamily: "Arial, Helvetica, sans-serif" }}>
      <defs>
        <marker id="flow-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill={FC.line} />
        </marker>
      </defs>
      {children}
    </svg>
  );
}

export function Lines({ x, y, lines, size = 13, anchor = "middle", weight }: { x: number; y: number; lines: string[]; size?: number; anchor?: "middle" | "start"; weight?: number }) {
  const lh = size * 1.18;
  const top = y - ((lines.length - 1) * lh) / 2;
  return (
    <text x={x} textAnchor={anchor} dominantBaseline="central" fontSize={size} fontWeight={weight} fill={FC.text}>
      {lines.map((l, i) => (
        <tspan key={i} x={x} y={top + i * lh}>
          {l}
        </tspan>
      ))}
    </text>
  );
}

type Tone = "screen" | "ok" | "bad" | "later";

/* A screen. `later` is his white box: a step left for a later release */
export function FBox({ x, y, lines, w = 118, h = 56, tone = "screen", size }: { x: number; y: number; lines: string[]; w?: number; h?: number; tone?: Tone; size?: number }) {
  const fill = tone === "ok" ? FC.ok : tone === "bad" ? FC.bad : tone === "later" ? "white" : FC.screen;
  const edge = tone === "ok" ? FC.okEdge : tone === "bad" ? FC.badEdge : tone === "later" ? FC.decision : FC.screenEdge;
  return (
    <g>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={2.5} fill={fill} stroke={edge} strokeWidth={1.2} />
      <Lines x={x} y={y} lines={lines} size={size} />
    </g>
  );
}

export function FDiamond({ x, y, lines, w = 124, h = 76 }: { x: number; y: number; lines: string[]; w?: number; h?: number }) {
  return (
    <g>
      <path d={`M${x} ${y - h / 2} L${x + w / 2} ${y} L${x} ${y + h / 2} L${x - w / 2} ${y} Z`} fill="white" stroke={FC.decision} strokeWidth={1.4} strokeLinejoin="round" />
      <Lines x={x} y={y} lines={lines} size={12.5} />
    </g>
  );
}

/* What the user does: a shape bracketed top and bottom, as in his flow */
export function FAction({ x, y, lines, w = 116, h = 48 }: { x: number; y: number; lines: string[]; w?: number; h?: number }) {
  const x0 = x - w / 2;
  const x1 = x + w / 2;
  const y0 = y - h / 2;
  const y1 = y + h / 2;
  return (
    <g>
      <rect x={x0} y={y0} width={w} height={h} fill="white" />
      <path
        d={`M${x0 + 3} ${y0 + 9} Q${x0 + 3} ${y0} ${x0 + 13} ${y0} L${x1 - 13} ${y0} Q${x1 - 3} ${y0} ${x1 - 3} ${y0 + 9} M${x0 + 3} ${y1 - 9} Q${x0 + 3} ${y1} ${x0 + 13} ${y1} L${x1 - 13} ${y1} Q${x1 - 3} ${y1} ${x1 - 3} ${y1 - 9}`}
        fill="none"
        stroke={FC.decision}
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      <Lines x={x} y={y} lines={lines} />
    </g>
  );
}

/* A group: his light blue panel, with its title above it */
export function FPanel({ x, y, w, h, title }: { x: number; y: number; w: number; h: number; title?: string }) {
  return (
    <g>
      {title && (
        <text x={x} y={y - 14} fontSize={19} fill={FC.text}>
          {title}
        </text>
      )}
      <rect x={x} y={y} width={w} height={h} rx={4} fill={FC.panel} stroke={FC.panelEdge} strokeWidth={1.2} />
    </g>
  );
}

/* A connector: a polyline, with an arrowhead at its end unless told not to */
export function L({ p, end = true }: { p: [number, number][]; end?: boolean }) {
  return (
    <polyline
      points={p.map((q) => q.join(",")).join(" ")}
      fill="none"
      stroke={FC.line}
      strokeWidth={1.4}
      strokeLinejoin="round"
      markerEnd={end ? "url(#flow-arrow)" : undefined}
    />
  );
}

/* A connector's label, on a white ground so the line breaks around it */
export function LLabel({ x, y, t }: { x: number; y: number; t: string }) {
  const w = t.length * 6 + 8;
  return (
    <g>
      <rect x={x - w / 2} y={y - 8} width={w} height={16} fill="white" />
      <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize={10.5} fontWeight={700} fill={FC.text}>
        {t}
      </text>
    </g>
  );
}
