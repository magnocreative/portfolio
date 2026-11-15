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
          "The facts of a piece of work, under a case study's hero: role, period, scope and tools, with an optional status. Two columns once the card is 48rem wide.\n\nFigma: Facts panel.",
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
    docs: { description: { story: "Work that is running now carries a status, as on the design system study." } },
  },
};

export const WithoutStatus: Story = {
  parameters: {
    docs: {
      description: {
        story: "Work behind an employer's login has nothing live to point at, so there's no status.",
      },
    },
  },
};
