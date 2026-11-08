import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Card } from "./Card";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A raised surface with a hairline edge, 32px in: the FeaturePanel material in one column. Mirrors Card in Figma. With bleed, below 640px it runs to the screen's edges with square corners and no side borders, so the text inside stays as wide as the page's own column.",
      },
    },
  },
  args: {
    children:
      "One employer on the résumé: the heading, the roles and their bullets. The card says where one employer stops and the next begins.",
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const BleedOnPhone: Story = {
  args: { bleed: true },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
