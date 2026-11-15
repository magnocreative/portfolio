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
          "The heading that opens a section: a display-size title with an optional count beside it. Size does the separating, so there's no rule under it.\n\nFigma: Section head.",
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
        story: "A title alone, as most sections open.",
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
          "With a count, for sections that list things. The count is the list's length, so it can't drift.",
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
          "A phrase rather than a word, as on several pages.",
      },
    },
  },
};
