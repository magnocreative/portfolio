import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ThemeToggle } from "./ThemeToggle";
import { SiteHeader } from "./SiteHeader";

const meta = {
  title: "Components/ThemeToggle",
  component: ThemeToggle,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Two controls: a light and dark switch, and a match-system mode. The switch shows the theme it will give you and says so in its name; the mode button hands the choice back to the device. Both use the interactive blue when selected.\n\nFigma: Theme chip.",
      },
    },
  },
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InContext: Story = {
  parameters: {
    layout: "fullscreen",
    // Storybook has no app router, so usePathname returns null unless it is
    // told what the path is. Set to /system so the header renders the state a
    // visitor actually sees most of the time: one nav item current, with the
    // rule under it.
    nextjs: { appDirectory: true, navigation: { pathname: "/system" } },
    docs: {
      description: {
        story:
          "The real site header, not a copy of it, so this story can't drift from the component.",
      },
    },
  },
  render: () => <SiteHeader />,
};
