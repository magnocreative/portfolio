import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tag } from "./Tag";

const meta = {
  title: "Components/Tag",
  component: Tag,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A short uppercase status in four tones. Pass and live are chips; neutral and danger are text alone, because information and failure aren't decorated.\n\nFigma: Tag.",
      },
    },
  },
  args: { children: "AA" },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pass: Story = {
  args: { tone: "pass" },
  parameters: {
    docs: {
      description: {
        story: "A measured ratio that clears its bar.",
      },
    },
  },
};

export const Live: Story = {
  args: { tone: "live", children: "Live on this site" },
  parameters: {
    docs: {
      description: {
        story: "Something running now. Kept for things that are actually live.",
      },
    },
  },
};

export const Neutral: Story = {
  args: { tone: "neutral", children: "AA Large" },
  parameters: {
    docs: {
      description: { story: "Information rather than a result." },
    },
  },
};

export const Danger: Story = {
  args: { tone: "danger", children: "Fail" },
};

export const Draft: Story = {
  args: { tone: "neutral", dot: true, children: "In writing" },
  parameters: {
    docs: {
      description: { story: "Marks a case study still being written." },
    },
  },
};

export const AllVerdicts: Story = {
  render: () => (
    <div className="flex flex-col items-end gap-3">
      <Tag tone="pass">AAA</Tag>
      <Tag tone="pass">AA</Tag>
      <Tag tone="pass">Non-text AA</Tag>
      <Tag tone="neutral" className="px-2.5 py-0.5">AA Large</Tag>
      <Tag tone="neutral" className="px-2.5 py-0.5">Decorative</Tag>
      <Tag tone="danger" className="px-2.5 py-0.5">Fail</Tag>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "As the contrast table uses them, right-aligned on one edge.",
      },
    },
  },
};
