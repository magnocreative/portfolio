import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Note } from "./Note";
import { TextBlock } from "./TextBlock";

const meta = {
  title: "Components/Note",
  component: Note,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A note set off by a 1px rule down its left edge, 20px from the text. Same type as the body, so it reads as an aside to the prose rather than a louder or quieter version of it. On a phone, below 640px, the rule and the inset go and it reads as plain prose: a narrow column cannot spare the indent. Mirrors the Note component in Figma, which has the same two versions.",
      },
    },
  },
  args: {
    children:
      "Deliberately absent from the homepage, the case studies and this page. Tabs hide content behind a click, so a reviewer can leave having read a third of an argument and believing they read all of it.",
  },
} satisfies Meta<typeof Note>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithInlineCode: Story = {
  args: {
    children: (
      <>
        The vertical rail has no <code className="font-medium">self-start</code> on its grid cell, and that
        omission is load bearing.
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Inline code is marked by weight, as everywhere else on the site, not by a second face.",
      },
    },
  },
};

export const UnderProse: Story = {
  render: (args) => (
    <div>
      <TextBlock>
        The full ARIA pattern: roving tabindex, arrow keys that wrap, and manual activation, so arrowing to a
        tab does not swap the panel until Enter or Space.
      </TextBlock>
      <Note {...args} className="mt-6" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "In context: under a component's decision on the components page, 24px below the prose it comments on.",
      },
    },
  },
};
