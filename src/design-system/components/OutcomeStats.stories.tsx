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
          "Two to four outcomes that open a case study's result. Each label finishes the sentence its number starts. Side by side from 48rem, stacked below.\n\nFigma: Outcome stats.",
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
    docs: { description: { story: "Two outcomes, each with more room." } },
  },
};
