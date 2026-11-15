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
          "One contrast figure, measured live against the page surface: the token's swatch, its name, the ratio and the grade. The same measurement ContrastAudit makes for a table, for a place that needs one reading. Re-measures when the theme changes.",
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
  parameters: { docs: { description: { story: "The role this measurement caught at 3.92:1 in the light theme, under the 4.5:1 its small metadata needs, before paper-600 replaced paper-500." } } },
};
