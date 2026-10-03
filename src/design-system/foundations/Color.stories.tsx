import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ContrastAudit, type AuditRow } from "@/design-system/components/ContrastAudit";
import type { TokenKind } from "@/design-system/utils/contrast";

const textRoles: AuditRow[] = [
  { token: "--text-primary", note: "Body and headings" },
  { token: "--text-secondary", note: "Standfirsts, supporting copy" },
  { token: "--text-tertiary", note: "Mono metadata — dates, disciplines, labels" },
  { token: "--text-accent", note: "Links and section markers" },
];

/* --interactive-default used to sit in the text table above, which judged it
   against the page at the 4.5:1 text bar and handed it a soft fail in dark.
   That was the table contradicting the system: a fill owes its contrast to its
   own label, not to the page behind it. It is audited here as a non-text role
   instead, which is the bar that actually governs it. */
const interactiveRoles: AuditRow[] = [
  { token: "--interactive-default", note: "Filled controls, the focus ring, the mark — one value, both themes" },
  { token: "--interactive-hover", note: "Hover on a filled control" },
  { token: "--interactive-selected", note: "Pressed and selected" },
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
  { token: "--border-rule", note: "Section rules — punctuation, not a bar" },
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
      <p className="mt-2 mb-7 max-w-measure text-sm leading-relaxed text-text-secondary">{intro}</p>
      <ContrastAudit rows={rows} kind={kind} />
    </section>
  );
}

function Ramp({ prefix, steps, label }: { prefix: string; steps: (number | string)[]; label: string }) {
  return (
    <div className="mb-8">
      <div className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-text-tertiary">{label}</div>
      <div className="flex gap-0.5">
        {steps.map((s) => (
          <div key={s} className="flex-1">
            <div className="h-14 rounded-sm border border-border-subtle" style={{ background: `var(--p-${prefix}-${s})` }} />
            <div className="mt-1 text-center font-mono text-xs text-text-tertiary">{s}</div>
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
        intro="These ratios are measured live in your browser against whichever theme the toolbar is set to — not written down and hoped for. Each token is painted to a canvas and the pixel is read back, because a computed custom property comes back as oklch() and anything that parses that as RGB produces confident nonsense. This table is what caught --text-tertiary sitting at 3.92:1 in the light theme, under the 4.5:1 its small mono metadata needs; it has since been moved to paper-600 and the row below shows it passing. Flip the theme in the toolbar and watch every number change."
        rows={textRoles}
      />
      <Section
        title="Interactive fills"
        kind="nontext"
        intro="Judged at the 3:1 non-text bar, not the 4.5:1 text one, because a filled control owes its contrast to its own label rather than to the page behind it. That distinction is the whole reason these can be single values: --interactive-default is blue-600 in both themes, with a white label in both, and white on it measures 5.00:1. Flip the theme and watch the hex column stay put while the ratios move: same colors, different grounds. That is the whole change, visible in one table.\n\nThe ratios here are measured against the page. On the dark theme hover reads 2.56:1 and pressed 1.75:1 — 2.41:1 and 1.65:1 against a raised surface — and the audit marks both DECORATIVE, correctly. They are transient, pointer-anchored states carrying labels at 7.46:1 and 10.90:1, so the control never becomes unfindable; it dims toward the ground while touched. Lightening them instead would cost the white label, which is the one number that cannot move. Shown failing rather than quietly left out of the table."
        rows={interactiveRoles}
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
        <p className="mt-2 mb-7 max-w-measure text-sm leading-relaxed text-text-secondary">
          The palette starts from the logo. The mark is two mountains in #4f729a and #7297b7: blue-600 IS the deep peak,
          blue-400 sits essentially on the light one. The deep peak is not an anchor the system works around, it is the
          interactive color. Every filled control, the focus ring and the mark itself are blue-600 in both themes,
          one value, no light-dark() pair. It holds because a fill owes its contrast to its own label rather than to the
          page: white on it is 5.00:1, and it clears 3.60:1 against the darkest surface it can land on.
        </p>
        <p className="mt-2 mb-7 max-w-measure text-sm leading-relaxed text-text-secondary">
          Accent <em>text</em> is the exception, and it is arithmetic rather than preference. Text owes 4.5:1 to the page
          behind it. Against paper that caps a color&rsquo;s relative luminance at 0.183; against slate it demands at
          least 0.263. No color satisfies both, so no single blue can be a link on both grounds — blue-600 reaches only
          3.82:1 as text on the dark page. A fill can be one color. Text cannot. That is the whole rule, and it is why
          exactly one accent role in this system still branches on theme.
        </p>
        <p className="mt-2 mb-7 max-w-measure text-sm leading-relaxed text-text-secondary">
          Two neutral grounds, not one inverted. Paper is a near-neutral gray carrying a fifth of the warmth it started with; slate is the mark&rsquo;s own blue taken down to
          a ground, so the logo sits natively in dark instead of being placed on top of something unrelated. Slate
          bottoms out at 17% lightness rather than the ~10% a dark theme usually reaches for, because at 10% sRGB has
          almost no room for chroma and a hue specified down there renders as black however much saturation it carries.
          No component references any of these directly. Only the semantic roles above do.
        </p>
        <Ramp label="Paper — near-neutral warm gray, light theme" prefix="paper" steps={[0, 5, 25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]} />
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
