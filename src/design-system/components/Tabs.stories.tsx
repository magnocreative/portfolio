import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tabs } from "./Tabs";
import { TextBlock } from "./TextBlock";

/** Panel content is a TextBlock, the same component the site's tab panels use. */
function Panel({ title, body }: { title: string; body: string }) {
  return <TextBlock heading={title}>{body}</TextBlock>;
}

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Switches one region between views. Built to the ARIA tabs pattern: arrow keys move between tabs, and Tab moves into the panel. Use it for reference content someone looks things up in, not for an argument that should stay visible.\n\nFigma: Tabs.",
      },
    },
  },
  args: {
    label: "Case study sections",
    tabs: [
      {
        id: "overview",
        label: "Overview",
        content: (
          <Panel
            title="Eighty-two people, one question"
            body="They did not want better applications. They wanted to know when the ones they had would be down."
          />
        ),
      },
      {
        id: "process",
        label: "Process",
        content: (
          <Panel
            title="What made the obvious answer impossible"
            body="One product partner across three lines of business, and a grayscale prototype nobody could read as finished work."
          />
        ),
      },
      {
        id: "outcome",
        label: "Outcome",
        content: (
          <Panel
            title="What happened"
            body="It reached the design phase and stopped there. The reasoning survived; the screens did not."
          />
        ),
      },
    ],
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  args: {
    label: "Tab states",
    tabs: [
      { id: "a", label: "Selected", content: <Panel title="Selected" body="The active tab carries the rule and the full-strength label." /> },
      { id: "b", label: "Rest", content: <Panel title="Rest" body="Inactive tabs sit at the secondary text weight." /> },
      { id: "c", label: "Hover me", content: <Panel title="Hover" body="Hover lifts the label to full strength and shows a gray rule." /> },
      { id: "d", label: "Disabled", disabled: true, content: <Panel title="Disabled" body="Never reachable." /> },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Rest, hover, selected and disabled. Disabled is skipped by the arrow keys, not just grayed out.",
      },
    },
  },
};

export const Keyboard: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Click a tab, then use the arrows, Home and End. Tab leaves the set for the panel.",
      },
    },
  },
};

export const ManyTabs: Story = {
  args: {
    label: "Design system reference",
    tabs: ["Color", "Type", "Space", "Radius", "Motion", "Elevation", "Icons"].map((n) => ({
      id: n.toLowerCase(),
      label: n,
      content: <Panel title={n} body={`The ${n.toLowerCase()} reference, which somebody consults rather than reads.`} />,
    })),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Seven tabs wrap to a second row rather than scroll sideways.",
      },
    },
  },
};
