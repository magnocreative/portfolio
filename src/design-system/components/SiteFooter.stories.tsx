import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SiteFooter } from "./SiteFooter";

const meta = {
  title: "Components/SiteFooter",
  component: SiteFooter,
  parameters: {
    layout: "fullscreen",
    // Page chrome: edge to edge, as it meets the window.
    padding: 0,
    docs: {
      description: {
        component:
          "The end of every page: one prompt, the email and the links elsewhere, on a raised ground.\n\nFigma: Footer.",
      },
    },
  },
} satisfies Meta<typeof SiteFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  globals: { viewport: { value: "desktop", isRotated: false } },
  parameters: { docs: { description: { story: "At 1440px: the prompt on the left, the links on the right." } } },
};

export const Phone: Story = {
  globals: { viewport: { value: "phone", isRotated: false } },
  parameters: { docs: { description: { story: "At 390px the prompt and email stack above the links." } } },
};
