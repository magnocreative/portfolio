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
          "A short message about the whole page that appears at the bottom and leaves on its own. Each tone has its own color and icon, so it never relies on color alone. Not for form errors: those go under the field.\n\nFigma: Toast.",
      },
    },
  },
  args: { open: true, tone: "info", children: "Link copied." },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};
export const Success: Story = { args: { tone: "success", children: "Your PDF is downloading." } };
export const Danger: Story = { args: { tone: "danger", children: "That didn’t go through. Try again." } };
