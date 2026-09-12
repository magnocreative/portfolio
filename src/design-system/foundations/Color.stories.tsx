import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ContrastAudit, type AuditRow } from "@/design-system/components/ContrastAudit";
import type { TokenKind } from "@/design-system/utils/contrast";

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

function Section({
  title,
  intro,
  rows,
  kind = "text",
}: {
  title: string;
  intro: string;
  rows: AuditRow[];
  kind?: TokenKind;
}) {
  return (
    <section className="mb-14">
      <h2 className="font-display text-2xl tracking-[-0.015em] text-text-primary">{title}</h2>
      <p className="mt-2 mb-7 max-w-[62ch] text-sm leading-relaxed text-text-secondary">{intro}</p>
      <ContrastAudit rows={rows} kind={kind} />
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
        kind="surface"
        intro="Elevation, measured against the page as information rather than as a test. No WCAG threshold applies to a background compared with another background, and surfaces are supposed to sit close together — that closeness is what makes elevation subtle instead of stripey. What matters is whether text placed on them passes, which the table above answers."
        rows={surfaces}
      />
      <Section
        title="Borders and rules"
        kind="nontext"
        intro="Judged against WCAG 1.4.11 at 3:1, not the text threshold. That rule covers interface boundaries and graphics you need in order to understand the content; a divider between two rows is neither, so the ones marked Decorative are choices rather than defects. A hairline that meets text contrast is a heavy black line, and the page stops reading as a document."
        rows={borders}
      />

      <section>
        <h2 className="font-display text-2xl tracking-[-0.015em] text-text-primary">The primitive ramps</h2>
        <p className="mt-2 mb-7 max-w-[62ch] text-sm leading-relaxed text-text-secondary">
          The palette starts from the logo. The mark is two mountains in #4f729a and #7297b7, and those two values are
          anchor points in the blue ramp rather than colours used directly: blue-600 IS the deep peak, blue-400 sits
          essentially on the light one. Neither can serve as a link colour on its own. The deep peak measures 4.83:1 on
          cream and 3.85:1 on the dark ground; the light peak fails on cream outright. So the interactive roles are
          taken from the steps either side, which is the normal relationship between a logo and a design system.
        </p>
        <p className="mt-2 mb-7 max-w-[62ch] text-sm leading-relaxed text-text-secondary">
          Two neutral grounds, not one inverted. Paper is a warm cream; slate is the mark&rsquo;s own blue taken down to
          a ground, so the logo sits natively in dark instead of being placed on top of something unrelated. Slate
          bottoms out at 17% lightness rather than the ~10% a dark theme usually reaches for, because at 10% sRGB has
          almost no room for chroma and a hue specified down there renders as black however much saturation it carries.
          No component references any of these directly. Only the semantic roles above do.
        </p>
        <Ramp label="Paper — warm cream, light theme" prefix="paper" steps={[0, 25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]} />
        <Ramp label="Slate — the mark's blue as a ground, dark theme" prefix="slate" steps={[100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000]} />
        <Ramp label="Blue — the brand ramp, anchored on the logo, serves both themes" prefix="blue" steps={[100, 200, 300, 400, 500, 600, 700, 800, 900]} />
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
