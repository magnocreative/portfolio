import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DataTable } from "./DataTable";

const sentences = {
  label: "The three tiers",
  layout: "stack" as const,
  align: "top" as const,
  columns: [
    { label: "Tier", width: "w-40" },
    { label: "What it holds" },
    { label: "Example", width: "w-52" },
    { label: "Who may use it", width: "w-40" },
  ],
  rows: [
    {
      key: "primitives",
      cells: [
        <span key="t" className="font-display text-lg text-text-primary">Primitives</span>,
        <p key="h" className="text-sm leading-[1.6] text-text-secondary">Raw colors, with no meaning attached.</p>,
        <span key="e" className="font-label text-xs text-text-tertiary">--p-blue-600</span>,
        <p key="w" className="text-sm leading-[1.6] text-text-secondary">Only the roles</p>,
      ],
    },
    {
      key: "roles",
      cells: [
        <span key="t" className="font-display text-lg text-text-primary">Roles</span>,
        <p key="h" className="text-sm leading-[1.6] text-text-secondary">What a color is for, with its value for each theme.</p>,
        <span key="e" className="font-label text-xs text-text-tertiary">--interactive-default</span>,
        <p key="w" className="text-sm leading-[1.6] text-text-secondary">Every component</p>,
      ],
    },
  ],
};

const figures = {
  label: "Sample figures",
  layout: "scroll" as const,
  columns: [
    { label: "Role" },
    { label: "Value", width: "w-28" },
    { label: "Ratio", width: "w-24", align: "right" as const },
  ],
  rows: [
    ["--text-primary", "#1c1b19", "16.69:1"],
    ["--text-secondary", "#4d4a45", "8.86:1"],
    ["--text-tertiary", "#6b675f", "5.31:1"],
  ].map(([role, value, ratio]) => ({
    key: role,
    cells: [
      <span key="r" className="font-label text-xs text-text-primary">{role}</span>,
      <span key="v" className="font-label text-xs text-text-tertiary">{value}</span>,
      <span key="x" className="font-label text-xs text-text-primary">{ratio}</span>,
    ],
  })),
};

const meta = {
  title: "Components/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A bordered table for records, as on the design system page. Two ways to handle a narrow screen: `scroll` keeps the columns, for figures read down a column; `stack` turns each row into a block, for sentences.\n\nFigma: Tiers table and Contrast table.",
      },
    },
  },
  args: sentences,
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Stack: Story = {
  parameters: { docs: { description: { story: "Sentences, as in the three tiers. Narrow the canvas below 48rem and each row becomes a block." } } },
};

export const StackNarrow: Story = {
  name: "Stack, narrow",
  decorators: [(Story) => <div className="max-w-[22rem]">{Story()}</div>],
  parameters: { docs: { description: { story: "At a phone's width: each row's first cell is its title, and the rest sit under their column names." } } },
};

export const Scroll: Story = {
  args: figures,
  parameters: { docs: { description: { story: "Figures, as in the contrast tables. Sample values." } } },
};

export const ScrollNarrow: Story = {
  name: "Scroll, narrow",
  args: { ...figures, minWidth: "min-w-[30rem]" },
  decorators: [(Story) => <div className="max-w-[22rem]">{Story()}</div>],
  parameters: { docs: { description: { story: "Below its minimum width the table scrolls inside its frame, and the frame becomes a keyboard stop." } } },
};
