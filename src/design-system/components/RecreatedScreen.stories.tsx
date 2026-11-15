import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RecreatedScreen } from "./RecreatedScreen";

const meta = {
  title: "Components/RecreatedScreen",
  component: RecreatedScreen,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A browser window for a case study's recreated product screens: an invented address, always light, drawn at desktop width and scaled to fit. Switch the theme: it stays light. Narrow the canvas: it scales rather than reflows.\n\nFigma: Recreated screen.",
      },
    },
  },
  args: { address: "hub.example", children: null },
} satisfies Meta<typeof RecreatedScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="max-w-[56rem]">
      <RecreatedScreen {...args}>
        <div className="grid grid-cols-3 gap-4 p-6">
          {["Policy Library", "Issue Tracker", "Risk Assessments"].map((name) => (
            <div key={name} className="rounded-md border border-border-subtle bg-surface-raised p-4">
              <div className="text-sm font-semibold text-text-primary">{name}</div>
              <div className="mt-1 text-xs text-text-secondary">One line on what it’s for.</div>
            </div>
          ))}
        </div>
      </RecreatedScreen>
    </div>
  ),
};
