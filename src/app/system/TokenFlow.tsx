"use client";

import { useEffect, useState, type ReactNode } from "react";
import { resolveToken } from "@/design-system/utils/contrast";
import { Button } from "@/design-system/components/Button";
import { ArrowRight } from "@/design-system/components/Icon";

/**
 * The three tiers as a picture: three real colors followed from the raw value,
 * through the semantic role that gives it a purpose, to the component that
 * asks for the role (Alejandro, November 2026). It replaced a table that
 * explained one chain in words and never showed the payoff.
 *
 * The payoff is the theme switch. Text and surfaces carry a value for each
 * theme, so their semantic row lights whichever primitive it resolves to right
 * now, measured in the browser by comparing the role's computed color with
 * each primitive's (the same probe the contrast tables use). Switch the theme
 * and the lit primitive moves; the component column never changes. The
 * button's blue is one value in both themes, so its row never moves at all,
 * which is the point the mark makes on /about.
 *
 * Page code, not a library component: it reads primitives directly to show
 * them, which no component may do.
 */

type Chain = {
  key: string;
  role: string;
  /** The primitives the role can resolve to, light first. One for a single value. */
  primitives: { token: string; theme?: "Light" | "Dark" }[];
  purpose: string;
  component: ReactNode;
  componentName: string;
};

const chains: Chain[] = [
  {
    key: "button",
    role: "--interactive-default",
    primitives: [{ token: "--p-blue-600" }],
    purpose: "Fills a control",
    componentName: "Primary button",
    component: (
      <Button specimen variant="primary" fillOnPhone={false} iconAfter={<ArrowRight />}>
        Read the system
      </Button>
    ),
  },
  {
    key: "text",
    role: "--text-primary",
    primitives: [
      { token: "--p-paper-900", theme: "Light" },
      { token: "--p-slate-100", theme: "Dark" },
    ],
    purpose: "Body and headings",
    componentName: "Text block",
    component: <span className="text-base leading-snug text-text-primary">Every line you are reading.</span>,
  },
  {
    key: "surface",
    role: "--surface-raised",
    primitives: [
      { token: "--p-paper-0", theme: "Light" },
      { token: "--p-slate-950", theme: "Dark" },
    ],
    purpose: "Cards above the page",
    componentName: "Card",
    component: (
      <span className="flex w-full max-w-48 flex-col gap-2 rounded-md border border-border-default bg-surface-raised p-3 shadow-[var(--shadow-chip)]">
        <span className="block h-1.5 w-2/3 rounded-full bg-border-strong" />
        <span className="block h-1.5 w-full rounded-full bg-border-default" />
      </span>
    ),
  },
];

/** Which primitive each role resolves to right now, re-measured on a theme change. */
function useResolved() {
  const [active, setActive] = useState<Record<string, string>>({});
  useEffect(() => {
    const measure = () => {
      const next: Record<string, string> = {};
      for (const c of chains) {
        const role = resolveToken(c.role)?.join(",");
        const hit = c.primitives.find((p) => resolveToken(p.token)?.join(",") === role);
        if (hit) next[c.key] = hit.token;
      }
      setActive(next);
    };
    measure();
    const observer = new MutationObserver(measure);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", measure);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", measure);
    };
  }, []);
  return active;
}

const head = "font-label text-xs uppercase tracking-[0.11em] text-text-tertiary";
const mono = "font-label text-xs";

function Arrow() {
  return (
    <span aria-hidden="true" className="flex items-center justify-center text-border-strong">
      <svg viewBox="0 0 20 20" className="h-4 w-4 rotate-90 @2xl:rotate-0" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10h13M12 6l4 4-4 4" />
      </svg>
    </span>
  );
}

export function TokenFlow() {
  const active = useResolved();
  return (
    <figure className="@container rounded-sm border border-border-default bg-surface-inset p-5 sm:p-8">
      {/* Column heads, on a wide frame only; on a narrow one each cell names its tier. */}
      <div className="hidden @2xl:grid @2xl:grid-cols-[1fr_auto_1fr_auto_1fr] @2xl:gap-x-4 pb-4">
        <span className={head}>01 · Primitive</span>
        <span className="w-4" />
        <span className={head}>02 · Semantic</span>
        <span className="w-4" />
        <span className={head}>03 · Component</span>
      </div>

      {/* The chains sit straight on the figure's ground, a hairline between
          them: no card around each chain or each tier (Alejandro, November
          2026: a box in a box in a box was too many layers). */}
      <ol aria-label="Three colors, followed from primitive to semantic role to component" className="flex flex-col">
        {chains.map((c) => (
          <li
            key={c.key}
            className="grid grid-cols-1 gap-2.5 border-t border-border-default py-6 first:border-t-0 first:pt-0 last:pb-0 @2xl:grid-cols-[1fr_auto_1fr_auto_1fr] @2xl:items-center @2xl:gap-x-4 @2xl:py-5"
          >
            {/* Primitive: one swatch, or one per theme with the live one lit */}
            <div className="flex flex-col gap-2 @2xl:justify-center">
              <span className={`${head} @2xl:hidden`}>01 · Primitive</span>
              {c.primitives.map((p) => {
                const lit = c.primitives.length === 1 || active[c.key] === p.token;
                return (
                  /* The theme not in use dims its swatch only: its name stays
                     readable, in the secondary and tertiary text colors, so
                     every label here passes contrast (Alejandro, November
                     2026: at 40% the whole row was hard to read, in light
                     above all). The live one is lit by the ring and the
                     primary text color. */
                  <span key={p.token} className="flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      /* Only the fill fades, so the swatch keeps its edge
                         and still reads as a swatch when its color is close
                         to the figure's ground */
                      className={`h-6 w-6 shrink-0 rounded-[5px] border border-border-default ${lit && c.primitives.length > 1 ? "ring-2 ring-focus-ring ring-offset-2 ring-offset-surface-inset" : ""}`}
                      style={{ background: lit ? `var(${p.token})` : `color-mix(in oklab, var(${p.token}) 35%, transparent)` }}
                    />
                    <span className="flex flex-col">
                      <span className={`${mono} ${lit ? "text-text-primary" : "text-text-secondary"}`}>{p.token}</span>
                      <span className={`${mono} text-text-tertiary`}>{p.theme ? `${p.theme} theme` : "Both themes"}</span>
                    </span>
                  </span>
                );
              })}
            </div>

            <Arrow />

            {/* Semantic: the role, and what it is for */}
            <div className="flex flex-col gap-1.5 @2xl:justify-center">
              <span className={`${head} @2xl:hidden`}>02 · Semantic</span>
              <span className="flex items-center gap-2.5">
                <span aria-hidden="true" className="h-6 w-6 shrink-0 rounded-full border border-border-default" style={{ background: `var(${c.role})` }} />
                <span className={`${mono} text-text-primary`}>{c.role}</span>
              </span>
              <span className="text-sm text-text-secondary">{c.purpose}</span>
            </div>

            <Arrow />

            {/* Component: the real thing, asking for the role */}
            <div className="flex flex-col gap-2 @2xl:justify-center">
              <span className={`${head} @2xl:hidden`}>03 · Component</span>
              <span className="flex min-h-10 items-center">{c.component}</span>
              <span className={`${mono} text-text-tertiary`}>{c.componentName}</span>
            </div>
          </li>
        ))}
      </ol>

    </figure>
  );
}
