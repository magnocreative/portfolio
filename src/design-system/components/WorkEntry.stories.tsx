import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WorkEntry } from "./WorkEntry";
import { SectionHead } from "./SectionHead";
import { caseStudies } from "@/content/case-studies";

const meta = {
  title: "Components/WorkEntry",
  component: WorkEntry,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "One row of the work index: a raised card, the image at 40% held 16px from the top, bottom and left edge, and the record at 60%, stacking when the card is under 64rem wide. The record reads in scan order: number, the title (the decision), the standfirst (the argument, never truncated), then a footer bar with the facts on the left and the status on the right. Below 640 the card runs to the screen's edges like the résumé cards. Each image will be a visual from its case study, made for this site, never a screen.",
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
        story:
          "A finished case study. The whole card is a link and the footer says so: Read the case study, in the accent. On hover the title takes the accent, the arrow nudges 2px and the edge firms from border/subtle to border/default; the ground does not change, because a card that wells on hover reads as a button and this is a document.",
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
          "A case study still being written. Marked, never dimmed. The first version faded drafts to 55% opacity, which made the most important content on the page the least legible thing on it, which is exactly backwards. A draft renders as a div rather than a link, so nobody clicks into an empty page, and `group` lives on the link branch alone: without that, hovering a draft turned its title accent blue and promised a page that was not there.",
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
          "Titles are sentences, so they will sometimes be long ones. The measure is capped at 28ch and balanced, so a long title breaks into even lines instead of a full line and a stray word. Double-digit numbering also stops the padding at two.",
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
        story:
          "Every study as the index renders them: one card each, 16px apart, 40px under the section head.",
      },
    },
  },
  render: () => (
    <div style={{ padding: "2rem", maxWidth: "84rem", margin: "0 auto" }}>
      <SectionHead count={caseStudies.length}>Case studies</SectionHead>
      <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        {caseStudies.map((study, i) => (
          <WorkEntry key={study.slug} study={study} index={i} />
        ))}
      </div>
    </div>
  ),
};
