import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const scale = [
  { name: "6xl", size: "5.25rem", use: "Reserved. Nothing on the site uses it yet." },
  { name: "5xl", size: "4rem", use: "Hero headline at large viewports" },
  { name: "4xl", size: "3rem", use: "Hero headline, mid viewports" },
  { name: "3xl", size: "2.25rem", use: "Case study titles" },
  { name: "2xl", size: "1.75rem", use: "Section headings" },
  { name: "xl", size: "1.375rem", use: "Footer prompt, callouts" },
  { name: "lg", size: "1.125rem", use: "Hero standfirst" },
  { name: "base", size: "1rem", use: "Body copy" },
  { name: "sm", size: "0.875rem", use: "Header, dense UI" },
  { name: "xs", size: "0.78125rem", use: "Mono metadata" },
  { name: "2xs", size: "0.6875rem", use: "Uppercase mono labels" },
];

function TypeDocs() {
  return (
    <div style={{ maxWidth: "68rem" }}>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", letterSpacing: "-0.015em", margin: "0 0 0.5rem" }}>
        Three faces, each with a job
      </h2>
      <p style={{ maxWidth: "62ch", color: "var(--text-secondary)", margin: "0 0 2.5rem", fontSize: "0.9375rem", lineHeight: 1.65 }}>
        Newsreader carries argument — headlines and case study titles, where the writing is the work. Inter carries
        explanation. JetBrains Mono carries record: dates, disciplines, section labels, anything that behaves like an
        entry in a table of contents. All three are self-hosted, so nothing render-blocks on a font CDN and no visitor&rsquo;s
        IP leaves for one.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "3.5rem" }}>
        {[
          { label: "Display — Newsreader", family: "var(--font-display)", sample: "I design the systems behind the tools people use all day.", size: "2.5rem", lh: 1.12 },
          { label: "Sans — Inter", family: "var(--font-sans)", sample: "Ten years on internal software — compliance platforms, audit tooling, and the CRM systems bankers work in every day.", size: "1.0625rem", lh: 1.65 },
          { label: "Mono — JetBrains Mono", family: "var(--font-mono)", sample: "DESIGN SYSTEMS · PLATFORM STRATEGY · 2024 —", size: "0.8125rem", lh: 1.6 },
        ].map((f) => (
          <div key={f.label} style={{ borderTop: "1px solid var(--border-default)", paddingTop: "1rem" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--text-tertiary)", marginBottom: "0.875rem" }}>
              {f.label}
            </div>
            <div style={{ fontFamily: f.family, fontSize: f.size, lineHeight: f.lh, letterSpacing: f.family.includes("display") ? "-0.022em" : undefined, maxWidth: "34ch" }}>
              {f.sample}
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", letterSpacing: "-0.015em", margin: "0 0 0.5rem" }}>
        The scale
      </h2>
      <p style={{ maxWidth: "62ch", color: "var(--text-secondary)", margin: "0 0 2rem", fontSize: "0.9375rem", lineHeight: 1.65 }}>
        A 1.25 major third, tuned by hand at the display end where a pure ratio goes limp. Line heights are ratios rather
        than pixel values, and tracking tightens as size increases — large type set at the same tracking as body copy
        always reads loose.
      </p>

      <div>
        {scale.map((s) => (
          <div
            key={s.name}
            style={{
              display: "grid",
              gridTemplateColumns: "4rem 5rem 1fr",
              gap: "1.5rem",
              alignItems: "baseline",
              padding: "1rem 0",
              borderBottom: "1px solid var(--border-subtle)",
            }}
          >
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-accent)" }}>{s.name}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--text-tertiary)" }}>{s.size}</div>
            <div>
              <div style={{ fontSize: s.size, lineHeight: 1.2, letterSpacing: "-0.015em", fontFamily: "var(--font-display)" }}>
                Systems behind the tools
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: "0.375rem" }}>{s.use}</div>
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
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof TypeDocs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Typography: Story = {};
