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
          "Two controls, not three. A light/dark switch and a *match system* mode.\n\nThis was a three-option radiogroup — Light, Dark, Match system — and the reduction is not just one fewer button. Light and Dark were never three peers: they are two values of one axis, while *match system* is a statement about who decides rather than about which theme. Rendering all three as equal siblings said they were the same kind of choice.\n\nWhat a plain binary toggle usually destroys, and this keeps, is *follow my system*. A two-state switch discards it permanently the first time anyone touches it, and that is the setting most visitors actually want. Keeping it as its own mode button is what makes the reduction safe.\n\nThe switch shows the theme it will **give** you and its name says the action — *Switch to dark theme*. Icon and label describe the same thing, which is the only way the pair is unambiguous; an icon showing current state beside a label describing an action points two ways at once. The mode button is a real toggle and reverses both ways: pressing it while pressed pins whatever the system is currently resolving to, so you are never stuck in a state the control that put you there cannot undo.\n\nThe selected fill is the interactive blue with a white icon — the same blue as the primary button and the mark, in both themes. It was the inverse surface, which became the darkest object in the header at 19.8:1 against the bar. The tinted ground was tried as the quiet alternative and rejected on measurement: 1.17:1 against the header, and an accent icon at 1.17:1 against the unselected icons — same lightness, only the hue apart, which would have rested the whole state on color. axe passed that version clean, which is the lesson: a state being invisible is not something axe can see.\n\nBoth controls are a 32px chip inside a 44px hit area at touch density, so hover and selected are the same object in two colors rather than two shapes.",
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
          "The real `SiteHeader`, not a drawing of one. This story used to hand-build a copy of the header, and the copy drifted: it kept an *AF* monogram the site had replaced with the mark, lost the Résumé link, and never grew the current-page state. A story that redraws another component documents the component it used to be.\n\nThe header is now a full-bleed banner at every width — mark and name at the left, theme controls at the right — with a nav rail below it from 1280px up. Drag the Storybook viewport below 1280 to see the rail give way to the disclosure, and below 640 to see the theme controls move into the panel. The icons carry no visible label at any size, so each button keeps an `aria-label` and a `title`.",
      },
    },
  },
  render: () => <SiteHeader />,
};
