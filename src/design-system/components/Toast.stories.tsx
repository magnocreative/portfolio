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
          "A short message that rises from the bottom of the screen: the password gate's wrong-password note. A pill on the raised surface; the tone is one dot, not a red fill. The live region is always present, so the message is announced when it appears. Mirrors the Toast component in Figma.",
      },
    },
  },
  args: { open: true, tone: "danger", children: "That’s not quite it. Try again." },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Danger: Story = {};
export const Neutral: Story = { args: { tone: "neutral", children: "Copied to the clipboard." } };
