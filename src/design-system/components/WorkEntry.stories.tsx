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
          "One card in the work index. This was a full-width four-column row — number, argument, disciplines, date — and it held up at three entries and broke at four: the metadata columns sat about 350px to the right of where the summary stopped, so every row carried a hole down its middle and the index grew by a screen for every two case studies added. Two columns of cards is 25% shorter at four entries. What survived the change is the thing that mattered: the standfirst is present in full rather than truncated to fit, because the standfirst is the argument. A card here is a record with a sentence in it, not a thumbnail.",
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
          "A finished case study. The whole card is a link. On hover the border takes the interactive blue and the title takes the accent; the ground does not change, because a card that wells on hover reads as a button and this is a document.",
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
          "Titles are sentences, so they will sometimes be long ones. The measure is capped at 28ch. It was 22ch, which rendered at 349px inside a 538px card: every title stopped short of its own right edge and the longer ones broke to three lines against empty space. 28ch is 444px. Not wider — at 30ch the shortest title on the site collapses to one line, and a one-line title beside a two-line one unbalances the row. Double-digit numbering also stops the padding at two.",
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
          "All four in the real grid. The grid is the story: `h-full` plus `mt-auto` on the card footer only does its job inside a stretching grid row, so two cards side by side share a height whatever their copy length. Rendered in plain flow — as this story used to be — the cards collapse to their content and the equal-height behavior the component is built for disappears.",
      },
    },
  },
  render: () => (
    <div style={{ padding: "2rem", maxWidth: "84rem", margin: "0 auto" }}>
      <div className="flex items-baseline justify-between border-b border-border-rule pb-4">
        <Label as="h2" className="!text-text-primary">
          Case studies
        </Label>
        <span className="font-mono text-xs tracking-[0.14em] text-text-tertiary">
          {String(caseStudies.length).padStart(2, "0")}
        </span>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {caseStudies.map((study, i) => (
          <WorkEntry key={study.slug} study={study} index={i} />
        ))}
      </div>
    </div>
  ),
};
