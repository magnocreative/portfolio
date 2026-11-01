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
          "A run of prose at the 900px measure: an optional heading, the body, and an optional action. Mirrors the Text block component in Figma, where Show heading and Show action are the same two choices. Body is 16px at 1.7, paragraphs 24px apart, and the action sits 32px under the last line.",
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
        story: "One of a list: the principles on About and the decisions on the design system page.",
      },
    },
  },
};

export const BodyOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: "Straight under a SectionHead, which already names it, so there is no heading of its own.",
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
        story: "A pointer at the end of a section. The action is whatever Button the page needs; its variant is the page's call, not the block's.",
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
        story: "Pass <p> elements and they sit 24px apart. In Figma, the same thing is a return inside the Body text.",
      },
    },
  },
};
