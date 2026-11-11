import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { SiteHeader } from "./SiteHeader";

/**
 * Page chrome, so the stories run edge to edge (`padding: 0`) and pin a
 * viewport: the header changes shape at 1024, and a story at whatever width
 * the panel happens to be shows the wrong one half the time.
 *
 * The current page comes from the router (`usePathname`), so each story sets
 * it. A page of filler sits under the bar, because a sticky header with
 * nothing beneath it never shows its hairline doing its job.
 */
function Page() {
  return (
    <div className="mx-auto max-w-[56rem] px-6 py-16 text-base leading-[1.7] text-text-secondary sm:px-16">
      {Array.from({ length: 6 }, (_, i) => (
        <p key={i} className="mb-6">
          The page under the header. Scroll it to watch the bar hold its place with one hairline facing the
          content, the same construction as the footer at the other end of the document.
        </p>
      ))}
    </div>
  );
}

const meta = {
  title: "Components/SiteHeader",
  component: SiteHeader,
  parameters: {
    layout: "fullscreen",
    padding: 0,
    nextjs: { appDirectory: true, navigation: { pathname: "/work" } },
    docs: {
      description: {
        component:
          "The banner on every page: the mark and name on the left, the four sections and the theme control on the right. From 1024 the sections sit in the bar; below it they fold into a menu that hangs from the bar's bottom edge as a sheet over the page, moved with transforms so opening it never reflows the document. The current page is marked in the nav and announced with aria-current. Mirrors Banner in Figma.",
      },
    },
  },
  render: () => (
    <>
      <SiteHeader />
      <Page />
    </>
  ),
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  globals: { viewport: { value: "desktop", isRotated: false } },
  parameters: { docs: { description: { story: "At 1440, on the Work page: Work carries the current marker." } } },
};

export const Phone: Story = {
  globals: { viewport: { value: "phone", isRotated: false } },
  parameters: {
    docs: {
      description: {
        story: "At 390: the mark, the name and the menu control. The sections are one tap away, not squeezed into the bar.",
      },
    },
  },
};

export const PhoneMenuOpen: Story = {
  name: "Phone, menu open",
  globals: { viewport: { value: "phone", isRotated: false } },
  parameters: {
    docs: {
      description: {
        story:
          "The menu opened, as a play step taps it. The control's name turns to Close menu and aria-expanded to true; Escape closes it and puts focus back on the control.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole("button", { name: "Open menu" });
    await userEvent.click(button);
    await expect(canvas.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
  },
};
