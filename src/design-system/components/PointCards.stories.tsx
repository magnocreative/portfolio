import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PointCards } from "./PointCards";
import { BriefcaseOffIcon, BrowserCheckIcon, HandoffIcon } from "./Icon";

const meta = {
  title: "Components/PointCards",
  component: PointCards,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Two to four parallel points, each a card with a 24px icon in the accent, a title and a few sentences. Side by side once the row is 48rem wide, sharing rows so the bodies start on one line; stacked below that. Mirrors the Point cards component in Figma.",
      },
    },
  },
  args: {
    items: [
      {
        icon: BriefcaseOffIcon,
        title: "No employer material",
        body: "No screens, component names or tokens from any system I’ve worked on. What those systems taught me is here. Nothing of theirs is.",
      },
      {
        icon: BrowserCheckIcon,
        title: "It runs a real site",
        body: "A Figma-only library never meets a browser, a phone or a screen reader. This one runs the site you’re reading, so every decision gets tested.",
      },
      {
        icon: HandoffIcon,
        title: "Both sides of the handoff",
        body: "I designed it and I built it. With no engineer or designer to catch a shortcut, the structure itself had to enforce the rules.",
      },
    ],
  },
} satisfies Meta<typeof PointCards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Three: Story = {};

export const Two: Story = {
  args: {
    items: [
      {
        icon: BriefcaseOffIcon,
        title: "No employer material",
        body: "No screens, no component names, no tokens copied from a system I’ve worked on.",
      },
      {
        icon: HandoffIcon,
        title: "Both sides of the handoff",
        body: "I designed it and I built it, so the rules had to be enforced by the structure itself.",
      },
    ],
  },
  parameters: { docs: { description: { story: "Two points take the same row, each with more room." } } },
};

export const Phone: Story = {
  globals: { viewport: { value: "phone", isRotated: false } },
  parameters: {
    layout: "fullscreen",
    // The page's 24px phone gutter, so the card's bleed meets the edges.
    padding: "2rem 1.5rem",
    docs: {
      description: {
        story:
          "At 390 the cards stack and run to the screen's edges, a hairline above and below each, the same as every card on the site at this width.",
      },
    },
  },
};
