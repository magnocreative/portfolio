import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ContrastAudit, type AuditRow } from "@/design-system/components/ContrastAudit";
import type { TokenKind } from "@/design-system/utils/contrast";
import { interactiveRoles, textRoles } from "@/content/system";

/* The text and interactive roles come from the same list the design system
   page measures, so the two tables can't disagree (Alejandro, November 2026:
   this one had stopped at four text roles after the page grew to six). */

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
  { token: "--border-rule", note: "Section rules: punctuation, not a bar" },
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
      <ContrastAudit rows={rows} kind={kind} label={title} />
    </section>
  );
}

function Ramp({ prefix, steps, label }: { prefix: string; steps: (number | string)[]; label: string }) {
  return (
    <div className="mb-8">
      <div className="mb-3 font-label text-xs uppercase tracking-[0.14em] text-text-tertiary">{label}</div>
      <div className="flex gap-0.5">
        {steps.map((s) => (
          <div key={s} className="flex-1">
            <div className="h-14 rounded-sm border border-border-subtle" style={{ background: `var(--p-${prefix}-${s})` }} />
            <div className="mt-1 text-center font-label text-xs text-text-tertiary">{s}</div>
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
        intro="Each text color, measured live against the page in whichever theme the toolbar is set to. Switch the theme and the figures change."
        rows={textRoles}
      />
      <Section
        title="Interactive fills"
        kind="nontext"
        intro="Filled controls are held to the 3:1 non-text bar, since the white label on the fill carries the text contrast. Switch the theme: the ratios move, the colors don't. On the dark page, hover and pressed fall below 3:1 and are graded Decorative: they're passing states, and their label still measures 7.46:1 and 10.90:1."
        rows={interactiveRoles}
      />
      <Section
        title="Surfaces"
        kind="surface"
        intro="Surfaces measured against the page, for reference. No contrast rule applies between two backgrounds; elevation is meant to be subtle."
        rows={surfaces}
      />
      <Section
        title="Borders and rules"
        kind="nontext"
        intro="Held to the 3:1 non-text bar. Dividers graded Decorative sit below it on purpose: a hairline at text contrast reads as a heavy line."
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
          least 0.263. No color satisfies both, so no single blue can be a link on both grounds: blue-600 reaches only
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
        <Ramp label="Paper: near-neutral warm gray, light theme" prefix="paper" steps={[0, 5, 25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]} />
        <Ramp label="Slate: the mark's blue as a ground, dark theme" prefix="slate" steps={[100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000]} />
        <Ramp label="Blue: the brand ramp, anchored on the logo, serves both themes" prefix="blue" steps={[100, 200, 300, 400, 500, 600, 700, 800, 900]} />
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
