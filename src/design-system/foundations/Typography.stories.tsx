import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useEffect, useState } from "react";

/**
 * The scale is READ from the tokens, never restated here.
 *
 * The previous version of this file listed sizes as literal strings next to
 * each step. The moment a token changed, the documentation started lying —
 * which is exactly what happened when 2xs went from 11px to 12px. Only the
 * step names and their intended use live in this file now; every number on
 * screen comes from the stylesheet at runtime.
 */
const steps = [
  { name: "6xl", use: "Reserved. Nothing on the site uses it yet." },
  { name: "5xl", use: "Hero headline, large viewports" },
  { name: "4xl", use: "Hero headline, mid viewports" },
  { name: "3xl", use: "Case study titles" },
  { name: "2xl", use: "Section headings" },
  { name: "xl", use: "Footer prompt, callouts" },
  { name: "lg", use: "Hero standfirst" },
  { name: "base", use: "Body copy" },
  { name: "sm", use: "Header, dense UI" },
  { name: "xs", use: "Mono metadata — dates, disciplines" },
  { name: "2xs", use: "Uppercase mono labels" },
];

type Measured = { name: string; use: string; rem: string; px: string };

function useScale(): Measured[] {
  const [scale, setScale] = useState<Measured[]>([]);

  useEffect(() => {
    const cs = getComputedStyle(document.documentElement);
    const probe = document.createElement("span");
    probe.style.cssText = "position:absolute;visibility:hidden";
    document.body.appendChild(probe);

    setScale(
      steps.map((s) => {
        const rem = cs.getPropertyValue(`--text-${s.name}`).trim();
        // rem strings do not tell you the rendered size — the root font size
        // could be anything, and a visitor may have changed it. Resolve it.
        probe.style.fontSize = rem;
        const px = getComputedStyle(probe).fontSize;
        return { ...s, rem, px };
      }),
    );

    probe.remove();
  }, []);

  return scale;
}

function TypeDocs() {
  const scale = useScale();

  return (
    <div className="max-w-[68rem]">
      <h2 className="font-display text-2xl tracking-[-0.015em] text-text-primary">
        Three faces, each with a job
      </h2>
      <p className="mt-2 mb-10 max-w-[62ch] text-sm leading-relaxed text-text-secondary">
        Newsreader carries argument — headlines and case study titles, where the writing is the work. Inter carries
        explanation. JetBrains Mono carries record: dates, disciplines, section labels, anything that behaves like an
        entry in a table of contents. All three are self-hosted, so nothing render-blocks on a font CDN and no
        visitor&rsquo;s IP leaves for one.
      </p>

      <div className="mb-14 flex flex-col gap-6">
        {[
          {
            label: "Display — Newsreader",
            className: "font-display text-[2.5rem] leading-[1.12] tracking-[-0.022em]",
            sample: "I design the systems behind the tools people use all day.",
          },
          {
            label: "Sans — Inter",
            className: "font-sans text-lg",
            sample:
              "Ten years on internal software — compliance platforms, audit tooling, and the CRM systems bankers work in every day.",
          },
          {
            label: "Mono — JetBrains Mono",
            className: "font-mono text-sm",
            sample: "DESIGN SYSTEMS · PLATFORM STRATEGY · 2024 —",
          },
        ].map((f) => (
          <div key={f.label} className="border-t border-border-default pt-4">
            <div className="mb-3.5 font-mono text-2xs uppercase tracking-[0.14em] text-text-tertiary">{f.label}</div>
            <div className={`${f.className} max-w-[34ch] text-text-primary`}>{f.sample}</div>
          </div>
        ))}
      </div>

      <h2 className="font-display text-2xl tracking-[-0.015em] text-text-primary">The scale</h2>
      <p className="mt-2 mb-8 max-w-[62ch] text-sm leading-relaxed text-text-secondary">
        Every step is a whole pixel. Half-pixel steps are not steps — they are rounding errors that leave two sizes
        nobody can tell apart and nobody knows which to reach for. Line heights are ratios rather than fixed values, and
        tracking tightens as size increases, because large type set at body tracking always reads loose.
      </p>
      <p className="mb-8 max-w-[62ch] text-sm leading-relaxed text-text-secondary">
        The rem and px columns below are read from the stylesheet as this page renders — not typed in. Change a token
        and this table changes with it.
      </p>

      <div>
        {scale.map((s) => (
          <div
            key={s.name}
            className="grid grid-cols-[3.5rem_5rem_4rem_1fr] items-baseline gap-6 border-b border-border-subtle py-4"
          >
            <div className="font-mono text-xs text-text-accent">{s.name}</div>
            <div className="font-mono text-2xs text-text-tertiary">{s.rem}</div>
            <div className="font-mono text-2xs text-text-tertiary">{s.px}</div>
            <div>
              <div
                className="font-display leading-[1.2] tracking-[-0.015em] text-text-primary"
                style={{ fontSize: s.rem }}
              >
                Systems behind the tools
              </div>
              <div className="mt-1.5 text-xs text-text-tertiary">{s.use}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta = {
  title: "Foundations/Typography",
  component: TypeDocs,
  parameters: { layout: "padded" },
} satisfies Meta<typeof TypeDocs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Typography: Story = {};
