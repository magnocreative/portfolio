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
          "Shows where you are and the way back out. The trail is an ordered list in a labeled nav, so a screen reader announces each step's position. The last crumb is the current page: not a link, set in the accent at semibold like the current item in the main navigation.\n\nFigma: Breadcrumb.",
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
  args: { items: [{ label: "Home", href: "/" }, { label: "Design system" }] },
  parameters: {
    docs: {
      description: {
        story: "The shortest useful trail: one level up, then the current page.",
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
          "Ancestors are links and darken on hover. The current page has no hover, because there's nothing to click.",
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
          "A long current label truncates and keeps the full text in its title. Prefer a short label: the full title is the h1 just below.",
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
          "Four levels, about the limit before a trail becomes something to read. The site is two levels deep, so a trail this long means the structure has drifted.",
      },
    },
  },
};
