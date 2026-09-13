import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";
import { ArrowRight, ArrowUpRight, ArrowLeft, Download, Mail } from "./Icon";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Three levels of emphasis, one size, two shapes. The variant is a statement about how much attention the action deserves, not a decoration: primary is the loudest object on a page and so should appear once on it, secondary carries the ordinary forward action, and tertiary is a link that has been given a hit area. All three are fills rather than two fills and an outline, which is what keeps them legible as one family at three volumes. The label is Inter at 14px rather than the mono uppercase the rest of the interface furniture uses, because mono uppercase names a thing and a button asks you to do one. Given an `href` the component renders an anchor; otherwise a real button, which is a keyboard and screen-reader distinction rather than a styling one.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["primary", "secondary", "tertiary"],
      description: "How much attention the action is asking for.",
    },
    shape: {
      control: "inline-radio",
      options: ["rounded", "pill"],
      description: "8px corner, the control radius, or a full pill.",
    },
    disabled: { control: "boolean" },
    selected: {
      control: "boolean",
      description: "The current choice. Persistent, and announced to assistive technology.",
    },
    children: { control: "text" },
    iconBefore: { control: false },
    iconAfter: { control: false },
  },
  args: {
    children: "Read the system",
    variant: "secondary",
    shape: "rounded",
    disabled: false,
    selected: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live control surface. Change variant, shape and label from the panel. */
export const Playground: Story = {};

export const Primary: Story = {
  args: { variant: "primary", children: "Start a conversation", iconAfter: <ArrowRight /> },
  parameters: {
    docs: {
      description: {
        story:
          "Solid fill on the interactive blue. It wins any competition it enters, which is the reason to allow it only once per view. Two primaries on a page means neither is primary. Label on fill measures 7.46:1 in light and 10.06:1 in dark.",
      },
    },
  },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Read the system", iconAfter: <ArrowRight /> },
  parameters: {
    docs: {
      description: {
        story:
          "The same blue as primary at a fraction of the strength, so the two read as one family at two volumes. The first build of this was an outline instead, and an outline is the weaker answer: it sits at about the weight of a disabled control, it competes with every hairline rule on a page like this one, and beside a solid primary the pair reads as one real button and one ghost. A tint plus a hairline is a different thing from an outline, and it is where this landed after a round without any edge at all. The tint measures about 1.1:1 against whatever is behind it, so on its own the fill gives the control no boundary and the label carries the entire job of announcing it is a button. The hairline roughly doubles that, to 1.85:1 on the page and 2.00:1 on a panel in light, 1.92:1 and 1.81:1 in dark. Enough to see a shape, not enough to meet the 3:1 non-text bar, and the honest description of that is a trade rather than a pass. WCAG 1.4.11 asks 3:1 of the visual information required to identify a component. This edge is not carrying that. The label is, at 6.35:1, inside a real button element with a 40px target and the right announcement. Somebody who cannot resolve a 1.9:1 line still finds the control. What the trade buys is that at 3:1 the edge reads as an outline and the quiet variant stops being quiet. It was built at 3.64:1, softened to 3.10:1, and landed here across three rounds of looking at it. Panel edges sit at 1.13:1 on purpose, because a container outline is decoration; a control edge is what tells you the control is there. Same 1px line, two jobs, and the job decides the value.",
      },
    },
  },
};

export const Tertiary: Story = {
  args: { variant: "tertiary", children: "View all work", iconAfter: <ArrowRight /> },
  parameters: {
    docs: {
      description: {
        story:
          "Text alone, with a transparent border so it stands exactly as tall as the other two and a row of mixed variants sits on one baseline. The border is invisible and load-bearing. It underlines on hover rather than taking a fill, because a tertiary that fills on hover becomes a secondary and the distinction you spent three variants building disappears the moment anyone touches it.",
      },
    },
  },
};

export const Hierarchy: Story = {
  args: { children: "Read the system" },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="primary" iconAfter={<ArrowRight />}>
        Start a conversation
      </Button>
      <Button variant="secondary" iconAfter={<ArrowRight />}>
        Read the system
      </Button>
      <Button variant="tertiary" iconAfter={<ArrowRight />}>
        View all work
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The three together, at real size. The test of a variant set is whether the order of emphasis is obvious without labels. Read left to right: solid, tinted, bare. One blue, three volumes.",
      },
    },
  },
};

export const States: Story = {
  args: { children: "Read the system" },
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="primary">Rest</Button>
        <Button variant="primary" className="!bg-interactive-hover">
          Hover
        </Button>
        <Button variant="primary" selected>
          Selected
        </Button>
        <Button variant="primary" disabled>
          Disabled
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="secondary">Rest</Button>
        <Button variant="secondary" className="!bg-interactive-subtle-hover">
          Hover
        </Button>
        <Button variant="secondary" selected>
          Selected
        </Button>
        <Button variant="secondary" disabled>
          Disabled
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="tertiary">Rest</Button>
        <Button variant="tertiary" className="!underline !text-interactive-hover">
          Hover
        </Button>
        <Button variant="tertiary" selected>
          Selected
        </Button>
        <Button variant="tertiary" disabled>
          Disabled
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Hover forced on, since a static page cannot show it otherwise. Selected is a real prop, not a simulation: it holds the deepest tint for as long as it is true and it announces itself, `aria-pressed` on a button and `aria-current=\"page\"` on a link, so a filter chip or a current nav item is correct to a screen reader and not only to the eye. Pressing borrows the same values through `:active`, which makes a press a half-second preview of what being chosen looks like rather than a fourth idea to keep in step. Both filled variants move in one direction, deeper in light and lighter in dark, roughly four points of lightness per step. Four is the smallest move that reads as a state change rather than a rendering difference; further and a hover feels like a different button instead of the same one under a cursor. The lowest label anywhere in the set is 5.01:1, on a selected secondary in light.",
      },
    },
  },
};

export const Shapes: Story = {
  args: { children: "Read the system" },
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="primary" shape="rounded">
          Rounded · 8px
        </Button>
        <Button variant="secondary" shape="rounded">
          Rounded · 8px
        </Button>
        <Button variant="tertiary" shape="rounded">
          Rounded · 8px
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="primary" shape="pill">
          Pill · 999px
        </Button>
        <Button variant="secondary" shape="pill">
          Pill · 999px
        </Button>
        <Button variant="tertiary" shape="pill">
          Pill · 999px
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Rounded is 8px and pill is a full round, and the gap between them is the point. The first version put the button at 16px, which is four fifths of a pill on a 40px control: the two shapes came out as nearly the same object and the variant had nothing to say. Everything on the site now rounds at 8px, buttons and containers alike, and the shapes still read as two different decisions because 8px on a 40px control is a corner you notice and 8px on a wide panel is an edge you do not.",
      },
    },
  },
};

export const WithIcons: Story = {
  args: { children: "Read the system" },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="secondary" iconAfter={<ArrowRight />}>
        Next case study
      </Button>
      <Button variant="secondary" iconBefore={<ArrowLeft />}>
        Previous
      </Button>
      <Button variant="secondary" iconAfter={<ArrowUpRight />}>
        Open on GitHub
      </Button>
      <Button variant="secondary" iconBefore={<Download />}>
        Download résumé
      </Button>
      <Button variant="primary" iconBefore={<Mail />}>
        Get in touch
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Position carries meaning. An icon after the label is the destination of the action, which is why a forward arrow belongs on the right and an up-right arrow means the link leaves the site. An icon before the label is the kind of the action: a download, a message. Icons inherit `currentColor` and are sized by the button, so they follow every hover and theme change without a second declaration.",
      },
    },
  },
};

export const Disabled: Story = {
  args: { children: "Read the system" },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="primary" disabled>
        Primary
      </Button>
      <Button variant="secondary" disabled>
        Secondary
      </Button>
      <Button variant="tertiary" disabled>
        Tertiary
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All three collapse to one disabled appearance, because a disabled button has no emphasis left to express. It stays a fill so it reads as the same object drained of colour rather than a different kind of control, and it is drawn with explicit values rather than dimmed with opacity: an opacity-dimmed control has a contrast ratio that depends on whatever happens to be behind it, so nobody can tell you what it measures. Its fill is also its own value rather than a borrowed surface. It used to reuse `surface-sunken`, which was fine until a disabled button landed on a sunken well and measured 1.00:1 against it: identical values, so the control disappeared. A control cannot share a value with a surface it might sit on, and that only shows up when you put the component on every surface it will ever meet rather than on the one in the story. It now sits between 1.07:1 and 1.26:1 against every surface in both themes, with a label at 5.20:1 in light and 5.84:1 in dark. Disabled does not have to mean illegible; losing the colour is the signal.",
      },
    },
  },
};

export const AsLink: Story = {
  args: { children: "Read the system" },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button href="/system" variant="secondary" iconAfter={<ArrowRight />}>
        Read the system
      </Button>
      <Button onClick={() => {}} variant="secondary" iconAfter={<ArrowRight />}>
        Runs an action
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Identical on screen, different to a keyboard and a screen reader. The first renders an anchor: it announces as a link, opens in a new tab on the modifier key, and shows a URL on hover. The second renders a button: it announces as a button and responds to Space as well as Enter. Getting this backwards is the most common defect in a hand-built button, and it is invisible in a screenshot.",
      },
    },
  },
};

export const InContext: Story = {
  args: { children: "Read the system" },
  render: () => (
    <div className="max-w-[44rem] rounded-sm border border-border-subtle bg-surface-raised p-8 md:p-12">
      <div className="font-mono text-xs font-medium uppercase tracking-[0.11em] text-text-accent">
        Live artifact
      </div>
      <h2 className="mt-5 max-w-[24ch] font-display text-3xl leading-[1.2] tracking-[-0.018em] text-text-primary">
        This site runs on a design system you can read.
      </h2>
      <p className="mt-5 max-w-[52ch] text-base text-text-secondary">
        Tokens, components, the accessibility model, and the reasoning behind each, published and
        open.
      </p>
      <div className="mt-7">
        <Button href="/system" variant="secondary" iconAfter={<ArrowRight />}>
          Read the system
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The homepage panel with the plain text link replaced by a secondary button. Panel and button both round at 8px. The same radius reads differently at the two sizes: on a 40px control it is a fifth of the way to a pill and the corner is the shape, on a panel several hundred pixels wide it is a crisp edge you barely register.",
      },
    },
  },
};
