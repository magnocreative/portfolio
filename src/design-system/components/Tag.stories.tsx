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
          "A short uppercase status, in the site's label setting (Medium, 0.11em). Four tones. Pass and live are drawn as chips; neutral and danger are text alone, because information and failure are not decorated. Mirrors the Tag component in Figma.",
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
        story: "A measured ratio that clears its bar. The chip has a hairline edge because a tint on the page cannot carry its own shape by luminance alone.",
      },
    },
  },
};

export const Live: Story = {
  args: { tone: "live", children: "Live on this site" },
  parameters: {
    docs: {
      description: {
        story: "Something running now, like the site a case study describes. The status green with a dot that always shows. Kept for things that are actually live, so the green keeps meaning something.",
      },
    },
  },
};

export const Neutral: Story = {
  args: { tone: "neutral", children: "AA Large" },
  parameters: {
    docs: {
      description: { story: "Information rather than a result: a large-text allowance, a divider kept under 3:1 on purpose." },
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
      description: { story: "The draft marker under a case study in the work index. The dot anchors a tag that sits alone on its line." },
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
        story: "As the contrast table uses them, right aligned. The unboxed tones take the chip's padding so every label ends on the same edge.",
      },
    },
  },
};
