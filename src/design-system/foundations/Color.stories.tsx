import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ContrastAudit, type AuditRow } from "@/design-system/components/ContrastAudit";

const textRoles: AuditRow[] = [
  { token: "--text-primary", note: "Body and headings" },
  { token: "--text-secondary", note: "Standfirsts, supporting copy" },
  { token: "--text-tertiary", note: "Mono metadata — dates, disciplines, labels" },
  { token: "--text-accent", note: "Links and section markers" },
  { token: "--interactive-default", note: "Interactive elements, rules" },
];

const surfaces: AuditRow[] = [
  { token: "--surface-page", note: "The page itself" },
  { token: "--surface-raised", note: "Cards and panels above the page" },
  { token: "--surface-sunken", note: "Hover wells, inset areas" },
  { token: "--surface-inverse", note: "Reversed blocks" },
];

const borders: AuditRow[] = [
  { token: "--border-subtle", note: "Row dividers" },
  { token: "--border-default", note: "Panel edges" },
  { token: "--border-strong", note: "Emphasis, markers" },
  { token: "--border-rule", note: "Section rules — the heavy line" },
];

function Section({ title, intro, rows }: { title: string; intro: string; rows: AuditRow[] }) {
  return (
    <section className="mb-14">
      <h2 className="font-display text-2xl tracking-[-0.015em] text-text-primary">{title}</h2>
      <p className="mt-2 mb-7 max-w-[62ch] text-sm leading-relaxed text-text-secondary">{intro}</p>
      <ContrastAudit rows={rows} />
    </section>
  );
}

function Ramp({ prefix, steps, label }: { prefix: string; steps: (number | string)[]; label: string }) {
  return (
    <div className="mb-8">
      <div className="mb-3 font-mono text-2xs uppercase tracking-[0.14em] text-text-tertiary">{label}</div>
      <div className="flex gap-0.5">
        {steps.map((s) => (
          <div key={s} className="flex-1">
            <div className="h-14 border border-border-subtle" style={{ background: `var(--p-${prefix}-${s})` }} />
            <div className="mt-1 text-center font-mono text-[0.625rem] text-text-tertiary">{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ColorDocs() {
  return (
    <div className="max-w-[68rem]">
      <Section
        title="Text roles, measured"
        intro="These ratios are measured live in your browser against whichever theme the toolbar is set to — not written down and hoped for. Each token is painted to a canvas and the pixel is read back, because a computed custom property comes back as oklch() and anything that parses that as RGB produces confident nonsense. This table is how --text-tertiary was caught at 3.92:1 in the light theme, under the 4.5:1 its small mono metadata needs. Flip the theme in the toolbar and watch every number change."
        rows={textRoles}
      />
      <Section
        title="Surfaces"
        intro="Ordered by elevation, measured against the page for reference. Surfaces carry no text of their own; the bar that matters is whether text placed on them still passes."
        rows={surfaces}
      />
      <Section
        title="Borders"
        intro="Dividers and rules sit below 3:1 deliberately. A hairline that meets text contrast is a heavy black line, and the page stops reading as a document. Non-text contrast governs controls and meaningful graphics, which these are not."
        rows={borders}
      />

      <section>
        <h2 className="font-display text-2xl tracking-[-0.015em] text-text-primary">The primitive ramps</h2>
        <p className="mt-2 mb-7 max-w-[62ch] text-sm leading-relaxed text-text-secondary">
          Two neutral ramps, not one inverted. Paper is warm and carries the light theme; slate is cool and carries the
          dark one. Both are OKLCH, so lightness is perceptually even across hues and paper-600 carries the same visual
          weight as accent-600. No component references these directly — only the semantic roles above do.
        </p>
        <Ramp label="Paper — warm neutrals, light theme" prefix="paper" steps={[0, 25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]} />
        <Ramp label="Slate — cool neutrals, dark theme" prefix="slate" steps={[100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000]} />
        <Ramp label="Accent — ink blue" prefix="accent" steps={[100, 200, 300, 400, 500, 600, 700, 800]} />
      </section>
    </div>
  );
}

const meta = {
  title: "Foundations/Color",
  component: ColorDocs,
  parameters: { layout: "padded" },
} satisfies Meta<typeof ColorDocs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Color: Story = {};
