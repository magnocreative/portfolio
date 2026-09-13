import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tabs } from "./Tabs";

function Panel({ title, body }: { title: string; body: string }) {
  return (
    <div className="max-w-[46rem]">
      <h3 className="font-display text-xl leading-[1.25] tracking-[-0.01em] text-text-primary">
        {title}
      </h3>
      <p className="mt-3 text-base text-text-secondary">{body}</p>
    </div>
  );
}

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "One region, several views of it. Built to the ARIA tabs pattern rather than styled to look like it, which is a bigger difference than it sounds: arrow keys move between tabs, Tab itself moves out of the set to the panel, `aria-selected` and `aria-controls` say which tab is active and what it governs, and the panel is focusable so it can be scrolled by keyboard. A row of divs with a click handler looks identical in a screenshot and does none of that. Labels take the mono uppercase wayfinding register, and the indicator is a rule rather than a fill, because the button family already owns fills here and a row of filled tabs beside a filled button reads as two primaries competing.",
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
      { id: "c", label: "Hover me", content: <Panel title="Hover" body="Hover lifts the label to full strength and shows a grey rule." /> },
      { id: "d", label: "Disabled", disabled: true, content: <Panel title="Disabled" body="Never reachable." /> },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Four states, measured. Selected is 18.28:1 in light with a 6.89:1 rule beneath it; rest is 8.85:1 and lifts to 18.28:1 on hover, which also brings in a grey rule so the hover previews the shape selection will take. Disabled is 5.87:1, drawn in an explicit colour rather than dimmed with opacity, because an opacity-dimmed label has a ratio that depends on whatever happens to be behind it. Disabled is also skipped by the arrow keys, not merely styled as unavailable, which is the part that separates a real disabled state from a grey one.",
      },
    },
  },
};

export const Keyboard: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Click any tab, then use the keyboard. Left and Right move between tabs and skip the disabled one. Home and End jump to the ends. Tab moves out of the set and into the panel rather than to the next tab, which is the whole purpose of the roving tabindex: the set is one stop, not one stop per tab, so nine tabs do not cost a keyboard user nine keypresses to get past. Selection follows focus, so arrowing reveals each panel rather than needing a second key to confirm it.",
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
          "Seven tabs, wrapping to a second row at narrow widths rather than scrolling horizontally, since a horizontally scrolling tab strip hides its own contents. This is also the case tabs are genuinely for: reference material somebody looks something up in. On a case study, where a reviewer is skimming for evidence you did the work, hiding two thirds of it behind tabs costs more than the scroll it saves. Hidden content is not scanned, not found by Cmd+F, not printed, and not indexed.",
      },
    },
  },
};
