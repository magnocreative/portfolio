import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useEffect, useState } from "react";

/**
 * The scale is READ from the tokens, never restated here.
 *
 * The previous version of this file listed sizes as literal strings next to
 * each step. The moment a token changed the documentation started lying, which
 * is exactly what happened twice: once when the smallest step went from 11px
 * to 12px, and again when everything at 12px moved to 13px and the two steps
 * below became reserved rather than removed. Only the step names and
 * their intended use live here now; every number on screen is read from the
 * stylesheet at runtime.
 *
 * The working floor is `xs` at 13px. The two steps below it exist and are
 * deliberately unused: 12px uppercase labels read small enough to be a
 * complaint, and 12 against 13 is a distinction nobody perceives. They stay on
 * the scale so a future dense surface has somewhere defined to go rather than
 * inventing a raw value, which is the same rule the color ramps follow.
 */
const steps = [
  { name: "6xl", use: "Reserved. Nothing on the site uses it yet." },
  { name: "5xl", use: "Hero headline, large viewports" },
  { name: "4xl", use: "Hero headline, mid viewports" },
  { name: "3xl", use: "Panel headings" },
  { name: "2xl", use: "Work index card titles" },
  { name: "xl", use: "Footer prompt, callouts" },
  { name: "lg", use: "Hero standfirst" },
  { name: "base", use: "Body copy" },
  { name: "sm", use: "Header, dense UI" },
  { name: "xs", use: "Labels, metadata, dates, disciplines, token values" },
  { name: "2xs", use: "Reserved. Nothing on the site uses it." },
  { name: "3xs", use: "Reserved. Nothing on the site uses it." },
];

type Measured = { name: string; use: string; rem: string; px: string; weight: string };

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
        // Weight belongs to the step from 2xl up. Read it like the size, so the
        // specimen shows the rule the stylesheet actually enforces.
        const weight = cs.getPropertyValue(`--text-${s.name}--font-weight`).trim() || "400";
        return { ...s, rem, px, weight };
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
        One face
      </h2>
      <p className="mt-2 mb-10 max-w-measure text-sm leading-relaxed text-text-secondary">
        Poppins carries the whole site: headings, reading, labels, controls, and code. Hierarchy comes from weight and
        size rather than from changing face. Every step from 28px up is SemiBold, and that rule lives on the type scale
        itself, not on each heading. Inline code is marked by Medium weight instead of a second family. Self-hosted, so
        nothing render-blocks on a font CDN and no visitor&rsquo;s IP leaves for one.
      </p>

      <div className="mb-14 flex flex-col gap-6">
        {[
          {
            label: "Display \u00b7 Poppins SemiBold",
            className: "font-display text-4xl leading-[1.06] tracking-[-0.025em]",
            sample: "I design the systems behind the tools people use all day.",
          },
          {
            label: "Sans \u00b7 Poppins Regular",
            className: "font-sans text-lg",
            sample:
              "Ten years on internal software: compliance platforms, audit tooling, and the CRM systems bankers work in every day.",
          },
          {
            label: "Label \u00b7 Poppins Medium, uppercase",
            className: "font-label text-xs font-medium uppercase tracking-[0.11em]",
            sample: "Design systems \u00b7 Platform strategy \u00b7 2024 to now",
          },
          {
            label: "Code \u00b7 Poppins Medium",
            className: "font-sans text-sm font-medium",
            sample: "--interactive-default  #4e729a  4.62:1",
          },
        ].map((f) => (
          <div key={f.label} className="border-t border-border-default pt-4">
            <div className="mb-3.5 font-label text-xs uppercase tracking-[0.14em] text-text-tertiary">{f.label}</div>
            <div className={`${f.className} max-w-[34ch] text-text-primary`}>{f.sample}</div>
          </div>
        ))}
      </div>

      <h2 className="font-display text-2xl tracking-[-0.015em] text-text-primary">The scale</h2>
      <p className="mt-2 mb-8 max-w-measure text-sm leading-relaxed text-text-secondary">
        Every step is a whole pixel. Half-pixel steps are not steps — they are rounding errors that leave two sizes
        nobody can tell apart and nobody knows which to reach for. Line heights are ratios rather than fixed values, and
        tracking tightens as size increases, because large type set at body tracking always reads loose.
      </p>
      <p className="mb-8 max-w-measure text-sm leading-relaxed text-text-secondary">
        The rem and px columns below are read from the stylesheet as this page renders — not typed in. Change a token
        and this table changes with it.
      </p>

      <div>
        {scale.map((s) => (
          <div
            key={s.name}
            className="grid grid-cols-[3.5rem_5rem_4rem_1fr] items-baseline gap-6 border-b border-border-subtle py-4"
          >
            <div className="font-label text-xs text-text-accent">{s.name}</div>
            <div className="font-label text-xs text-text-tertiary">{s.rem}</div>
            <div className="font-label text-xs text-text-tertiary">{s.px}</div>
            <div>
              <div
                className="font-display leading-[1.2] tracking-[-0.015em] text-text-primary"
                style={{ fontSize: s.rem, fontWeight: Number(s.weight) }}
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
