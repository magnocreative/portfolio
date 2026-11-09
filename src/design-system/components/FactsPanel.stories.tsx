import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FactsPanel } from "./FactsPanel";
import { Tag } from "./Tag";
import { CalendarIcon, CodeIcon, RoleIcon, ScopeIcon } from "./Icon";

const meta = {
  title: "Components/FactsPanel",
  component: FactsPanel,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The facts of a piece of work in one card, under a case study's hero: role, period, scope and stack, with the status in the header. Values sit beside their labels rather than at the far edge. Two columns once the card is 48rem wide (a container query), filled down then across, so the visual order and the reading order agree. Bleeds to the screen edge below 640. Mirrors the Facts panel component in Figma.",
      },
    },
  },
  args: {
    items: [
      { key: "Role", value: "Designer and engineer, solo", icon: RoleIcon },
      { key: "Period", value: "2026", icon: CalendarIcon },
      { key: "Scope", value: "Tokens, components, Figma library, documentation", icon: ScopeIcon },
      { key: "Stack", value: "Next.js, Tailwind CSS, Figma variables", icon: CodeIcon },
    ],
  },
} satisfies Meta<typeof FactsPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithStatus: Story = {
  args: { status: <Tag tone="live">Live on this site</Tag> },
  parameters: {
    docs: { description: { story: "The design system study: the work is running on the site you are reading." } },
  },
};

export const WithoutStatus: Story = {
  parameters: {
    docs: {
      description: {
        story: "A study of work behind an employer's login has nothing live to point at, so the header holds the label alone.",
      },
    },
  },
};
