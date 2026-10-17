import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WorkEntry } from "./WorkEntry";
import { Label } from "@/design-system/primitives/Container";
import { caseStudies } from "@/content/case-studies";

const meta = {
  title: "Components/WorkEntry",
  component: WorkEntry,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "One row of the work index: an image at 40% and the record at 60%, stacking below md. The record reads in scan order: number and period, the title (the decision), the standfirst (the argument, never truncated), then employer and discipline. Until a study has its visual, the image slot holds its place at 4:3. Each image will be a visual from its case study, made for this site, never a screen.",
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
          "A finished case study. The whole row is a link. On hover the title takes the accent and nothing else moves; the ground does not change, because a row that wells on hover reads as a button and this is a document.",
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
          "A case study still being written. Marked, never dimmed. The first version faded drafts to 55% opacity, which made the most important content on the page the least legible thing on it — exactly backwards. A draft renders as a div rather than a link, so nobody clicks into an empty page, and `group` lives on the link branch alone: without that, hovering a draft turned its title accent blue and promised a page that was not there.",
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
          "All four as the index renders them, one row each under the section rule. Each row closes with its own hairline, so the list ends on a rule rather than on loose space.",
      },
    },
  },
  render: () => (
    <div style={{ padding: "2rem", maxWidth: "84rem", margin: "0 auto" }}>
      <div className="flex items-baseline justify-between border-b border-border-rule pb-4">
        <Label as="h2" className="!text-text-primary">
          Case studies
        </Label>
        <span className="font-label text-xs tracking-[0.14em] text-text-tertiary">
          {String(caseStudies.length).padStart(2, "0")}
        </span>
      </div>
      <div>
        {caseStudies.map((study, i) => (
          <WorkEntry key={study.slug} study={study} index={i} />
        ))}
      </div>
    </div>
  ),
};
