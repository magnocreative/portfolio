import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Figure } from "./Figure";

const meta = {
  title: "Components/Figure",
  component: Figure,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "One piece of evidence and the claim it proves. The caption is required and states a claim, never a label. Until the image exists, the frame holds its place.\n\nFigma: Figure.",
      },
    },
  },
  args: {
    alt: "The Button spec sheet from the Figma library: thirty variants in a labelled grid above a properties table.",
    caption:
      "Thirty variants and eight properties, drawn from the component itself, so the documentation can't quietly drift from the thing it documents.",
  },
} satisfies Meta<typeof Figure>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {};

export const Square: Story = { args: { ratio: "1/1" } };

export const Recreated: Story = {
  args: {
    recreated: true,
    caption: "Every application says what it’s for and whether it’s up, before anyone opens it.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "A figure that redraws a product with invented content adds one standard note after the caption.",
      },
    },
  },
};
