import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ScaledFrame } from "./ScaledFrame";

const meta = {
  title: "Components/ScaledFrame",
  component: ScaledFrame,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Shows its content at a fixed design width, scaled down to fit and never up. For recreations of products that only had a desktop layout, so a phone sees a smaller picture rather than a mobile design that never existed.",
      },
    },
  },
  args: { width: 840, children: null },
} satisfies Meta<typeof ScaledFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DesktopScreen: Story = {
  render: (args) => (
    <div className="max-w-[24rem] rounded-sm border border-border-subtle bg-surface-sunken p-3">
      <ScaledFrame {...args}>
        <div className="grid grid-cols-3 gap-4 rounded-md border border-border-default bg-surface-raised p-6">
          {["Policy Library", "Issue Tracker", "Risk Assessments"].map((name) => (
            <div key={name} className="rounded-md border border-border-subtle p-4 text-sm font-semibold text-text-primary">
              {name}
            </div>
          ))}
        </div>
      </ScaledFrame>
    </div>
  ),
};
