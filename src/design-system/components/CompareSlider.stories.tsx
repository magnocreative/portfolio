import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CompareSlider } from "./CompareSlider";
import { Figure } from "./Figure";
import light from "@/assets/evidence/button-sheet-light.png";
import dark from "@/assets/evidence/button-sheet-dark.png";

const meta = {
  title: "Components/CompareSlider",
  component: CompareSlider,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Compares two images of the same thing, such as light and dark or before and after, with a divider the reader drags. Arrow keys move it too, and screen readers announce it as a slider. Use it inside a Figure.\n\nFigma: Compare slider.",
      },
    },
  },
  decorators: [
    (Story) => (
      <Figure caption="One variable mode switches the sheet and every button on it between themes. Drag to compare.">
        <Story />
      </Figure>
    ),
  ],
  args: {
    label: "Compare the Button sheet in the light and dark themes",
    before: { src: light, label: "Light", alt: "The Button spec sheet in the light theme." },
    after: { src: dark, label: "Dark", alt: "The Button spec sheet in the dark theme." },
  },
} satisfies Meta<typeof CompareSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightAndDark: Story = {};

export const StartsMostlyDark: Story = {
  args: { initial: 25 },
  parameters: { docs: { description: { story: "`initial` sets where the divider starts, as a percentage from the left." } } },
};
