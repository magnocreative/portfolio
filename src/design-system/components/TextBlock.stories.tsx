import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TextBlock } from "./TextBlock";
import { Button } from "./Button";
import { ArrowRight } from "./Icon";

const meta = {
  title: "Components/TextBlock",
  component: TextBlock,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A run of prose at the reading measure, with an optional heading and action.\n\nFigma: Text block.",
      },
    },
  },
  args: {
    children:
      "A static mockup asks engineering to imagine the behavior. A coded prototype shows them. The cost is real: the first pass is slower. It buys something worth more, which is that the argument stops being about whether a thing will work.",
  },
} satisfies Meta<typeof TextBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithHeading: Story = {
  args: { heading: "Build it rather than describe it" },
  parameters: {
    docs: {
      description: {
        story: "With a heading, as for each principle on About.",
      },
    },
  },
};

export const BodyOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: "Under a section head, which already names it.",
      },
    },
  },
};

export const WithAction: Story = {
  args: {
    children:
      "The design system this site runs on is live and published in full: the tokens, the components, the contrast measurements and the reasoning behind each decision. It is the one project here you can check rather than take on trust.",
    action: (
      <Button href="#" variant="secondary" iconAfter={<ArrowRight />}>
        Read the system
      </Button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Ending in an action. The page chooses the button.",
      },
    },
  },
};

export const SeveralParagraphs: Story = {
  args: {
    children: [
      <p key="1">
        Design systems and internal tools, in that order. The work I want is the work where the system is the
        product.
      </p>,
      <p key="2">
        I care more about whether a thing shipped and stayed shipped than whether it looked good in a deck.
      </p>,
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Paragraphs sit 24px apart.",
      },
    },
  },
};
