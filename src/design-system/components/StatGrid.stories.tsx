import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StatGrid } from "./StatGrid";

const meta = {
  title: "Components/StatGrid",
  component: StatGrid,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Numbers two by two, each with what it counts and where to check it. Hairlines between cells, none round the edge. Two columns from 16rem of its own width, one below. Paths break only after a slash or a dot. A detail with an href is a link. Mirrors the Stat grid component in Figma.",
      },
    },
  },
  args: {
    items: [
      { value: "140", label: "tokens, in one file", detail: "src/styles/tokens.css" },
      { value: "28", label: "components, in code", detail: "src/design-system/" },
      { value: "95", label: "stories, published", detail: "storybook.magnocreative.com", href: "https://storybook.magnocreative.com" },
      { value: "7", label: "colors, measured live", detail: "Contrast, measured", href: "#contrast" },
    ],
    note: "Counted from the code when the site is built.",
  },
  decorators: [(Story) => <div className="max-w-[22rem]">{Story()}</div>],
} satisfies Meta<typeof StatGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InAPanelAside: Story = {
  name: "In a panel's aside",
  parameters: { docs: { description: { story: "As in Read the source on /system, at the aside's 22rem. Sample numbers; the page counts its own." } } },
};

export const Narrow: Story = {
  decorators: [(Story) => <div className="max-w-[17.25rem]">{Story()}</div>],
  parameters: { docs: { description: { story: "At a phone panel's 276px it stays two by two; under 16rem the cells stack." } } },
};
