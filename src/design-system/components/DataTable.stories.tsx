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
          "The bordered table the design system page reads its records in: the three tiers and both contrast tables. One frame stopping at the measure, a sunken heading row in Label SemiBold, lines between rows and none between columns, no fill. Two ways to meet a narrow screen: scroll keeps the columns and scrolls sideways inside the frame, for figures compared down a column; stack turns each row into a block below 48rem of its own width, with every cell under its column's name, for sentences. Mirrors the Data table component in Figma.",
      },
    },
  },
  args: sentences,
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Stack: Story = {
  parameters: { docs: { description: { story: "Sentences, as in Three tiers on /system. Narrow the canvas under 48rem and each row becomes a block." } } },
};

export const StackNarrow: Story = {
  name: "Stack, narrow",
  decorators: [(Story) => <div className="max-w-[22rem]">{Story()}</div>],
  parameters: { docs: { description: { story: "At a phone's width: the first cell is the row's title, and every other cell sits under its column's name." } } },
};

export const Scroll: Story = {
  args: figures,
  parameters: { docs: { description: { story: "Figures, as in the contrast tables. Sample values; the page measures its own." } } },
};

export const ScrollNarrow: Story = {
  name: "Scroll, narrow",
  args: { ...figures, minWidth: "min-w-[30rem]" },
  decorators: [(Story) => <div className="max-w-[22rem]">{Story()}</div>],
  parameters: { docs: { description: { story: "Under its minimum width the table scrolls inside the frame, and the frame becomes a named tab stop so a keyboard can reach it." } } },
};
