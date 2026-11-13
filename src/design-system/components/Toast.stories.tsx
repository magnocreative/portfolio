import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Toast } from "./Toast";

const meta = {
  title: "Components/Toast",
  component: Toast,
  parameters: {
    layout: "fullscreen",
    docs: {
      story: { inline: false, iframeHeight: 200 },
      description: {
        component:
          "A short message about the whole page that rises from the bottom of the screen and leaves on its own. Each tone is drawn in its own color, the words, a hairline edge and a light tint, with an icon so it never rests on color alone, and a hairline drains over the time the toast is up. Not for a form error: that goes under its field. The live region is always present, so the message is announced when it appears. Mirrors the Toast component in Figma.",
      },
    },
  },
  args: { open: true, tone: "info", duration: 3200, children: "Link copied." },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};
export const Success: Story = { args: { tone: "success", children: "Your PDF is downloading." } };
export const Danger: Story = { args: { tone: "danger", children: "That didn’t go through. Try again." } };
