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
          "A raised surface for content one column long, such as each employer on the résumé. With `bleed`, it runs to the screen's edges below 640px so the text keeps the page's width.\n\nFigma: Card.",
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
