import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SectionHead } from "./SectionHead";

const meta = {
  title: "Components/SectionHead",
  component: SectionHead,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The heading that opens a section: an uppercase label in the primary text color on a full-width rule, with an optional count at the far right. It replaced fourteen hand-written copies across six pages. The count is padded to two digits and tracked wider than the label, so it reads as a figure, not as part of the heading.",
      },
    },
  },
  args: { children: "The short version" },
} satisfies Meta<typeof SectionHead>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "A label and a rule. Most sections on the site open this way.",
      },
    },
  },
};

export const WithCount: Story = {
  args: { children: "Case studies", count: 4 },
  parameters: {
    docs: {
      description: {
        story:
          "With a count, for sections that list things: the case studies on the home page and the work index, and the principles on About. The count is the length of the list it heads, so it cannot drift from the content.",
      },
    },
  },
};

export const LongLabel: Story = {
  args: { children: "Decisions, and what each one cost", count: 12 },
  parameters: {
    docs: {
      description: {
        story:
          "The label is a phrase, not a single word, on several pages. Label and count share a baseline.",
      },
    },
  },
};
