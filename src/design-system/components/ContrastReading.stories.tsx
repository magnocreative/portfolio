import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ContrastReading } from "./ContrastReading";

const meta = {
  title: "Components/ContrastReading",
  component: ContrastReading,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "One contrast figure, measured live against the page: swatch, token, ratio and grade. Use it where a full table would be too much. It re-measures when the theme changes.\n\nFigma: Contrast reading.",
      },
    },
  },
  args: { token: "--text-primary" },
} satisfies Meta<typeof ContrastReading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Tertiary: Story = {
  args: { token: "--text-tertiary" },
  parameters: { docs: { description: { story: "The role this measurement once caught at 3.92:1 in the light theme, before it was darkened to pass." } } },
};
