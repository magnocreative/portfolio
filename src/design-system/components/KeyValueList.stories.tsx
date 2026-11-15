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
          "Short facts as label and value pairs, with a hairline between rows. A long value drops under its label instead of overflowing.\n\nFigma: Key value row.",
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
  parameters: { docs: { description: { story: "The home page's design system panel." } } },
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
        story: "A long value wraps under its label.",
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
  parameters: { docs: { description: { story: "The mark's two colors, as on About." } } },
};

export const WithLink: Story = {
  args: {
    items: [
      { key: "tokens", value: "src/styles/tokens.css" },
      { key: "stories", value: "storybook.magnocreative.com", href: "https://storybook.magnocreative.com" },
    ],
  },
  parameters: {
    docs: { description: { story: "A value with an href becomes a link." } },
  },
};
