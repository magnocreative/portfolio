import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SectionNav } from "./SectionNav";
import { TextBlock } from "./TextBlock";

const beats = [
  { id: "stakes", label: "Stakes" },
  { id: "constraint", label: "The constraint" },
  { id: "decision", label: "The decision" },
  { id: "evidence", label: "Evidence" },
  { id: "outcome", label: "What happened" },
  { id: "hindsight", label: "Hindsight" },
];

function Section({ id, title }: { id: string; title: string }) {
  return (
    <section id={id} className="mt-16 scroll-mt-32 border-b border-border-subtle pb-16">
      <h2 className="font-display text-2xl leading-[1.2] tracking-[-0.018em] text-text-primary">
        {title}
      </h2>
      <TextBlock className="mt-4">
        <p>
          Placeholder body so the page is long enough to scroll and the current section actually
          changes. Scroll the story and watch the rule move.
        </p>
        <p>
          Every section carries `mt-16 scroll-mt-32`, not `py-16`. Spacing above a section has to be
          margin: padding sits inside the border box, so the anchor lands 96px above the heading and
          leaves a strip of the previous section showing, which reads as a scroll that stopped short.
        </p>
      </TextBlock>
    </section>
  );
}

const meta = {
  title: "Components/SectionNav",
  component: SectionNav,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A contents list for a long page: links to sections that all stay on the page, with the current one marked as you scroll. Not tabs: nothing is hidden from search, print or a quick skim.\n\nFigma: Section nav.",
      },
    },
  },
  args: { items: beats },
} satisfies Meta<typeof SectionNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  args: { orientation: "vertical", sticky: true },
  render: (args) => (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[14rem_1fr]">
      <div>
        <SectionNav {...args} />
      </div>
      <div>
        {beats.map((b) => (
          <Section key={b.id} id={b.id} title={b.label} />
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The rail beside a long page's content. Scroll and the marker follows.",
      },
    },
  },
};

export const VerticalRightColumn: Story = {
  args: { orientation: "vertical", sticky: true, label: "Contents" },
  render: (args) => (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_14rem]">
      <div>
        {beats.map((b) => (
          <Section key={b.id} id={b.id} title={b.label} />
        ))}
      </div>
      <div>
        <SectionNav {...args} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The same rail in a right-hand column, as on the case studies. The marker stays on the labels' left.",
      },
    },
  },
};

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
  render: (args) => (
    <div>
      <SectionNav {...args} />
      <div>
        {beats.map((b) => (
          <Section key={b.id} id={b.id} title={b.label} />
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The bar form, for narrow screens. Making it stick is the page's job, so `sticky` is ignored here.",
      },
    },
  },
};

export const States: Story = {
  args: { orientation: "horizontal" },
  render: (args) => (
    <div className="pb-24">
      <SectionNav {...args} />
      <TextBlock className="mt-8">
        The first item is current and carries the rule at 4.62:1 with a label at 18.28:1. That rule is
        the interactive blue, one value in both themes, so it reads 4.62:1 on the light page and
        3.82:1 on the dark one rather than two unrelated numbers. The rest
        sit at 8.85:1 and lift to 18.28:1 on hover, bringing in a gray rule so the hover previews the
        shape being current will take. Hover the second item to see it. There is no disabled state,
        because a section either exists on the page or it does not.
      </TextBlock>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Rest, hover and current, in both themes. It looks like Tabs on purpose but is a list of links, not a tablist.",
      },
    },
  },
};
