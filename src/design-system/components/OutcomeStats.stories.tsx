import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { OutcomeStats } from "./OutcomeStats";

const meta = {
  title: "Components/OutcomeStats",
  component: OutcomeStats,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Two to four numbers that open a case study's outcome. Each is an outcome, not a size, and its label finishes the sentence the number starts. Rules above and below rather than a card, so it does not read as more metadata. Side by side once the row is 48rem wide, stacked below that. Mirrors the Outcome stats component in Figma.",
      },
    },
  },
  args: {
    items: [
      { value: "1 token", label: "softened the darkest text on every page, in code and in Figma" },
      { value: "1 setting", label: "moved the navigation from a side rail to the top bar" },
      { value: "0", label: "hard-coded colors across the 24 components in code" },
    ],
  },
} satisfies Meta<typeof OutcomeStats>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Three: Story = {};

export const Two: Story = {
  args: {
    items: [
      { value: "82", label: "people interviewed before anything was drawn" },
      { value: "16", label: "applications brought under one status page" },
    ],
  },
  parameters: {
    docs: { description: { story: "Two outcomes take the same row, each with more room." } },
  },
};
