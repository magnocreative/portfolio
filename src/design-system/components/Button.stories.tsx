import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";
import { KeyValueList } from "./KeyValueList";
import { ArrowRight, ArrowUpRight, ArrowLeft, Download, Mail } from "./Icon";
import { SectionHead } from "./SectionHead";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "One way to ask for an action, at three levels of emphasis. Primary appears once per view, secondary carries everyday actions, and tertiary is a link with a button's hit area. With an `href` it renders a link; without one, a real button.\n\nBelow 640px a button fills its column; pills and `fillOnPhone={false}` keep their width. `specimen` draws a non-interactive picture of a button, for previews inside a link.\n\nFigma: Button.",
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
          "The loudest action on a page, so use it once per view. One blue in both themes, with a white label at 5.00:1.",
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
          "The same blue at a fraction of the strength, with a hairline edge. The label, not the edge, is what identifies the control.",
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
          "Text alone, with a transparent border so it stands as tall as the others. It underlines on hover instead of filling.",
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
          "The three together. The order of emphasis should read without labels: solid, tinted, bare.",
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
          "Hover, pressed, selected and disabled. Selected is a real prop: `aria-pressed` on a button, `aria-current` on a link. On the dark page, hover and pressed dim below 3:1 against the ground while their labels stay at 7.46:1 and 10.90:1.",
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
          "Rounded (8px) for most actions, pill for compact ones. The gap between them is wide on purpose, so the two read as two decisions.",
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
          "An icon after the label shows where the action goes; before it, what kind of action it is. Icons take the label's color.",
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
          "All three variants share one disabled look, drawn in explicit colors rather than opacity, so its contrast never depends on what sits behind it.",
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
          "Identical on screen, different to a keyboard and a screen reader: the first is a link, the second a button.",
      },
    },
  },
};

export const InContext: Story = {
  args: { children: "Read the system" },
  render: () => (
    <div className="mx-auto max-w-[72rem]">
      <SectionHead>Design system</SectionHead>
      <div className="mt-10 grid grid-cols-1 gap-12 rounded-sm border border-border-subtle bg-surface-raised p-8 md:p-12 lg:grid-cols-[1fr_20rem] lg:items-center lg:gap-20">
        <div>
          <h3 className="max-w-[24ch] font-display text-3xl leading-[1.2] tracking-[-0.018em] text-text-primary">
            This site runs on a design system you can read.
          </h3>
          <p className="mt-5 max-w-[52ch] text-base text-text-secondary">
            Tokens, components, the accessibility model, and the reasoning behind each, published and
            open.
          </p>
          <div className="mt-7">
            <Button href="/system" variant="primary" iconAfter={<ArrowRight />}>
              Read the system
            </Button>
          </div>
        </div>
        <KeyValueList
          items={[
            { key: "tokens", value: "three tiers" },
            { key: "color", value: "OKLCH ramps" },
            { key: "themes", value: "paper / slate" },
            { key: "contrast", value: "WCAG AA" },
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "The home page's design system panel, where this is the page's only primary button.",
      },
    },
  },
};
