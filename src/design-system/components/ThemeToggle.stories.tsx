import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ThemeToggle } from "./ThemeToggle";
import { SiteHeader } from "./SiteHeader";

const meta = {
  title: "Components/ThemeToggle",
  component: ThemeToggle,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Three states, not two. A binary switch silently discards *follow my system* — the setting most visitors actually want — and never gives it back once it has been touched. Rendered as a radiogroup so the three options are announced as one control with a current selection, rather than three unrelated buttons.\n\nNo enclosing frame. A border here drew a box around three icons that already read as a set, and in the header it nested a rectangle inside a bar. Proximity groups them instead: one pixel between the options against twenty-eight to the nearest nav link.\n\nThe selected option is the interactive blue with a white icon — the same blue as the primary button, the current nav item, and the mark itself, in both themes. It was the inverse surface, which without the frame became the darkest object in the header at 19.8:1 against the bar. The secondary button's tinted ground was tried as the quiet alternative and rejected on measurement: 1.17:1 against the header, and an accent icon at 1.17:1 against the unselected icons, same lightness and only the hue apart. That would have rested the whole state on colour. axe passed it clean, which is the lesson — a state being invisible is not something axe can see.",
      },
    },
  },
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InContext: Story = {
  parameters: {
    layout: "fullscreen",
    // Storybook has no app router, so usePathname returns null unless it is
    // told what the path is. Set to /system so the header renders the state a
    // visitor actually sees most of the time: one nav item current, with the
    // rule under it.
    nextjs: { appDirectory: true, navigation: { pathname: "/system" } },
    docs: {
      description: {
        story:
          "The real `SiteHeader`, not a drawing of one. This story used to hand-build a copy of the header, and the copy drifted: it kept an *AF* monogram the site had replaced with the mark, lost the Résumé link, and never grew the current-page state. A story that redraws another component documents the component it used to be. Rendering the real one means this can only ever be accurate.\n\nAt this width the toggle sits right of the nav. Below 820px the header stacks and the toggle moves up to the identity row, so drag the Storybook viewport to see the other arrangement. At every size the icons carry no label, so each button keeps an aria-label and a title.",
      },
    },
  },
  render: () => <SiteHeader />,
};
