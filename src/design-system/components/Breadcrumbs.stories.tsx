import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Breadcrumbs } from "./Breadcrumbs";

const meta = {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Where you are, and the way back out. Set in the same mono uppercase as the main navigation, because both are wayfinding: they name places rather than ask you to do something, which is the line that decides type on this site. Two things make it correct rather than decorative, and neither is visible. It is an ordered list inside a labelled nav, so the order is the hierarchy and a screen reader announces position within it. And the last crumb is not a link, because it is the page you are already on.",
      },
    },
  },
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Work", href: "/work" },
      { label: "Self-service portal" },
    ],
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TwoLevels: Story = {
  args: { items: [{ label: "Home", href: "/" }, { label: "System" }] },
  parameters: {
    docs: {
      description: {
        story: "The shortest useful trail, and the one the design system page will carry.",
      },
    },
  },
};

export const States: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Work", href: "/work" },
      { label: "Self-service portal" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "There are two states here, not four, and the missing ones are the point. Ancestors are links: they sit at 8.85:1 and go to 18.28:1 on hover. The current page has no hover state, because it has no href. A hover on something you cannot click is a promise about what happens next that the page does not keep, and it is the single most common defect in a hand-built breadcrumb. Hover the first two items and then the last one to feel the difference.",
      },
    },
  },
};

export const LongCurrentLabel: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Work", href: "/work" },
      { label: "Sixteen applications, and no way to know when they'd break" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "A real case study title, truncating. Pass a short label for the current crumb rather than the full headline: the full one is already the h1 a few pixels below, so repeating it costs a line of the trail and tells the reader nothing new. The truncation is a safety net, not the plan, and the whole string stays in the title attribute. The budget is 28ch rather than a round 20, because `ch` measures the zero glyph and knows nothing about letterspacing, so at this tracking about a fifth of the box is gaps between characters rather than characters.",
      },
    },
  },
};

export const DeepTrail: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Work", href: "/work" },
      { label: "Enterprise", href: "/work/enterprise" },
      { label: "Self-service portal" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Four levels, which is about the limit before a trail stops being a shortcut and becomes another thing to read. This site is two levels deep by design, so a crumb this long is a sign the information architecture has drifted rather than a case the component needs to handle well.",
      },
    },
  },
};
