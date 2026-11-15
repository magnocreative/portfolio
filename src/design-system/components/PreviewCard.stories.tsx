import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PreviewCard } from "./PreviewCard";
import { Button } from "./Button";
import { ContrastReading } from "./ContrastReading";
import { ArrowRight } from "./Icon";

const meta = {
  title: "Components/PreviewCard",
  component: PreviewCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A link people won't follow on trust, so it shows a live piece of where it goes first. The preview is drawn from the same tokens as the destination, never a screenshot, and holds nothing interactive.\n\nFigma: Preview card.",
      },
    },
  },
  args: {
    href: "/system#tiers",
    title: "Three tiers",
    description: "Follow the button’s blue from a raw value, to the role that names it, to the component that asks for the role.",
    action: "Read the tiers",
    preview: (
      <span className="flex flex-col items-center gap-2 font-label text-xs">
        <span className="flex items-center gap-2 text-text-tertiary">
          <span className="block h-4 w-4 rounded-[4px] border border-border-default bg-interactive" />
          --p-blue-600
        </span>
        <ArrowRight className="h-3.5 w-3.5 rotate-90 text-text-tertiary" />
        <span className="text-text-primary">--interactive-default</span>
        <ArrowRight className="h-3.5 w-3.5 rotate-90 text-text-tertiary" />
        <Button specimen variant="primary" fillOnPhone={false}>
          Button
        </Button>
      </span>
    ),
  },
  decorators: [(Story) => <div className="max-w-[18rem]">{Story()}</div>],
} satisfies Meta<typeof PreviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tiers: Story = {
  parameters: { docs: { description: { story: "The button's blue, from primitive to role to the button itself." } } },
};

export const Measured: Story = {
  args: {
    href: "/system#contrast",
    title: "Contrast, measured",
    description: "Every text color, measured in your browser against the page it sits on. Switch the theme and these figures change with it.",
    action: "See every reading",
    preview: (
      <span className="flex flex-col gap-4">
        <ContrastReading token="--text-primary" />
        <ContrastReading token="--text-tertiary" />
      </span>
    ),
  },
  parameters: { docs: { description: { story: "Two live contrast readings. Switch the theme and the figures change." } } },
};
