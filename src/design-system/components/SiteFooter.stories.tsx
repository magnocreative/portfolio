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
          "The end of every page: a raised ground with one hairline facing the page, the header's construction at the other edge of the document. One prompt, the email under it, and the places to find me elsewhere at the header's link color. 32px above it on a phone and 128 from 640, so a long phone page does not read as having stopped early. Mirrors Footer in Figma.",
      },
    },
  },
} satisfies Meta<typeof SiteFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  globals: { viewport: { value: "desktop", isRotated: false } },
  parameters: { docs: { description: { story: "At 1440: the prompt on the left, the links on the right, bottoms aligned." } } },
};

export const Phone: Story = {
  globals: { viewport: { value: "phone", isRotated: false } },
  parameters: { docs: { description: { story: "At 390 the two stack: the prompt and email first, the links under them." } } },
};
