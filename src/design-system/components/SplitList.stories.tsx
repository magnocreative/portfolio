import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SplitList } from "./SplitList";

const meta = {
  title: "Components/SplitList",
  component: SplitList,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Titled rows: the title on the left, its paragraph on the right, a hairline between rows. Side by side once the list is 48rem wide, stacked below. The decisions on /system. Mirrors the Split list component in Figma.",
      },
    },
  },
  args: {
    items: [
      {
        title: "A short decision",
        body: "Two sentences of reasoning. The row is only as tall as this paragraph.",
      },
      {
        title: "A decision with a longer title that wraps",
        body: "A longer paragraph, so the rows are uneven on purpose. Each row is as tall as its own text, so a long entry beside a short one leaves no hole, and the list still reads top to bottom in the order it was written. The paragraph stops at about seventy-five characters a line, beside a title column that reads as a list on its own.",
      },
      {
        title: "Sample content",
        body: "Nothing here is the real list; the page passes its own.",
      },
    ],
  },
} satisfies Meta<typeof SplitList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Phone: Story = {
  globals: { viewport: { value: "phone", isRotated: false } },
  parameters: { docs: { description: { story: "Under 48rem of its own width the title sits over its paragraph." } } },
};
