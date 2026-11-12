import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { KeyValueList } from "./KeyValueList";

const meta = {
  title: "Components/KeyValueList",
  component: KeyValueList,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Short facts as label and value pairs: label left in the tertiary color, value right in the primary, 12px above and below each row and a hairline between rows, not after the last. A long value drops under its label instead of running off the edge. Mirrors the Key value row component in Figma.",
      },
    },
  },
  args: {
    items: [
      { key: "tokens", value: "three tiers" },
      { key: "color", value: "OKLCH ramps" },
      { key: "themes", value: "paper / slate" },
      { key: "contrast", value: "WCAG AA" },
    ],
  },
  decorators: [(Story) => <div className="max-w-[20rem]">{Story()}</div>],
} satisfies Meta<typeof KeyValueList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { docs: { description: { story: "The home page's system panel." } } },
};

export const LongValue: Story = {
  args: {
    items: [
      { key: "tokens", value: "src/styles/tokens.css" },
      { key: "source", value: "github.com/magnocreative/portfolio" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "A value longer than the row has room for wraps under its label rather than overflowing. The design system page's source panel, at phone width.",
      },
    },
  },
};

export const TwoRows: Story = {
  args: {
    items: [
      { key: "--mark-deep", value: "#4e729a" },
      { key: "--mark-light", value: "#80a2c4" },
    ],
  },
  parameters: { docs: { description: { story: "The mark's two fills, under the logo on About." } } },
};

export const WithLink: Story = {
  args: {
    items: [
      { key: "tokens", value: "src/styles/tokens.css" },
      { key: "stories", value: "storybook.magnocreative.com", href: "https://storybook.magnocreative.com" },
    ],
  },
  parameters: {
    docs: { description: { story: "A value with an href is a link: accent color, underlined at rest, a heavier line on hover." } },
  },
};
