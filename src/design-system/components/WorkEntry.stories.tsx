import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WorkEntry } from "./WorkEntry";
import { caseStudies } from "@/content/case-studies";

const meta = {
  title: "Components/WorkEntry",
  component: WorkEntry,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "One row of the work index. A four-column record — number, argument, disciplines, date — because a list of work here is a table of contents, not a gallery. Cards would put the image first; this puts the sentence first, which is the point of the whole site. Below the large breakpoint the metadata columns fold into the main column rather than disappearing.",
      },
    },
  },
  argTypes: {
    index: { control: { type: "number", min: 0, max: 20 } },
  },
} satisfies Meta<typeof WorkEntry>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Published: Story = {
  args: {
    index: 0,
    study: { ...caseStudies[0], status: "published" },
  },
  parameters: {
    docs: {
      description: {
        story: "A finished case study. The whole row is a link, the title takes the accent on hover, and the row wells slightly.",
      },
    },
  },
};

export const Draft: Story = {
  args: {
    index: 1,
    study: caseStudies[1],
  },
  parameters: {
    docs: {
      description: {
        story:
          "A case study still being written. Marked, never dimmed. The first version of this faded drafts to 55% opacity, which made the most important content on the page the least legible thing on it — exactly backwards. The row is not a link, so nobody clicks into an empty page.",
      },
    },
  },
};

export const LongTitle: Story = {
  args: {
    index: 11,
    study: {
      ...caseStudies[2],
      title: "Sixteen applications across three platforms, and no way for anyone to know when any of them would break",
      status: "published",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Titles are sentences, so they will sometimes be long ones. Capped at 24 characters of measure so a long title wraps into a readable column instead of running the width of the page. Double-digit numbering also stops padding at two.",
      },
    },
  },
};

export const TheIndex: Story = {
  args: { index: 0, study: caseStudies[0] },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "All three in sequence, which is how anyone actually encounters them.",
      },
    },
  },
  render: () => (
    <div style={{ padding: "2rem", maxWidth: "84rem", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          borderBottom: "1px solid var(--border-rule)",
          paddingBottom: "1rem",
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.14em" }}>
          Selected work
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", letterSpacing: "0.14em", color: "var(--text-tertiary)" }}>
          {String(caseStudies.length).padStart(2, "0")}
        </span>
      </div>
      {caseStudies.map((study, i) => (
        <WorkEntry key={study.slug} study={study} index={i} />
      ))}
    </div>
  ),
};
