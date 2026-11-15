import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CodeBlock } from "./CodeBlock";

const meta = {
  title: "Components/CodeBlock",
  component: CodeBlock,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A few lines of code in the site's own colors, so they follow the theme instead of sitting on the page as a picture of an editor. Comments in tertiary, custom property names in the accent, the rest primary. Lines wrap rather than scroll. On the design system case study the lines are read from tokens.css when the site builds.",
      },
    },
  },
  args: {
    lines: [
      "/* Primitive, in OKLCH: lightness, chroma, hue */",
      "--p-paper-900: oklch(20.2% 0.002 62);",
      "/* Role: one value per theme */",
      "--text-primary: light-dark(var(--p-paper-900), var(--p-slate-100));",
    ],
  },
  decorators: [(Story) => <div className="max-w-[40rem]">{Story()}</div>],
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tokens: Story = {};
export const Narrow: Story = {
  decorators: [(Story) => <div className="max-w-[20rem]">{Story()}</div>],
  parameters: { docs: { description: { story: "At a phone's width the long line wraps instead of scrolling." } } },
};
