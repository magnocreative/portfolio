import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ImageGallery } from "./ImageGallery";
import sketch1 from "@/assets/grc/sketch-1.png";
import sketch2 from "@/assets/grc/sketch-2.png";
import sketch3 from "@/assets/grc/sketch-3.png";
import sketch4 from "@/assets/grc/sketch-4.png";
import sketch5 from "@/assets/grc/sketch-5.png";
import sketch6 from "@/assets/grc/sketch-6.png";

const meta = {
  title: "Components/ImageGallery",
  component: ImageGallery,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A grid of thumbnails that each open a larger view. Every thumbnail is a button, the larger view is a native dialog (Escape closes it, the arrow keys step through the set), and on a narrow frame the grid becomes a carousel you swipe. Items are images, or live drawings such as recreated screens, which give the width they are drawn at.",
      },
    },
  },
  args: {
    label: "Early sketches",
    ratio: "16/9",
    columns: 4,
    items: [
      { src: sketch1, label: "Home 1", alt: "A home page sketch with a profile column and application cards." },
      { src: sketch2, label: "Home 2", alt: "A home page sketch with a welcome header and cards in sections." },
      { src: sketch3, label: "Home 3", alt: "A home page sketch with navigation down the left and a grid of cards." },
      { src: sketch4, label: "Home 4", alt: "A home page sketch with a single list of applications." },
      { src: sketch5, label: "Details 1", alt: "A modal with an application's details." },
      { src: sketch6, label: "Details 2", alt: "A second modal with an application's details." },
    ],
  },
} satisfies Meta<typeof ImageGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FourColumns: Story = {};

export const ThreeColumns: Story = { args: { columns: 3 } };

export const TwoColumns: Story = { args: { columns: 2 } };

export const Narrow: Story = {
  render: (args) => (
    <div className="max-w-[22rem]">
      <ImageGallery {...args} />
    </div>
  ),
};
