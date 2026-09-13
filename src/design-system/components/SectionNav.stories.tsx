import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SectionNav } from "./SectionNav";

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
      <p className="mt-4 max-w-[46rem] text-base text-text-secondary">
        Placeholder body so the page is long enough to scroll and the current section actually
        changes. Scroll the story and watch the rule move.
      </p>
      <p className="mt-4 max-w-[46rem] text-base text-text-secondary">
        Every section carries `mt-16 scroll-mt-32`, not `py-16`. Spacing above a section has to be
        margin: padding sits inside the border box, so the anchor lands 96px above the heading and
        leaves a strip of the previous section showing, which reads as a scroll that stopped short.
      </p>
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
          "A contents list for a long page. Real anchors to sections that all stay in the document, with the current one marked as the reader scrolls. **Not tabs, and not a variant of them.** Tabs swap one region between mutually exclusive views; this navigates a page where everything is present, which is the entire reason to choose it. Nothing is hidden from Cmd+F, from print, from search, or from a reviewer skimming in forty seconds. It is the component the case study template wants, which is why it exists before that template does.",
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
          "The rail a long case study wants, and the intended use. Scroll and the marker follows. It sits beside the content rather than above it, so it costs no vertical space and never competes with the site header. The active marker is a left rule, which reads as a position in a list rather than a selected control.",
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
          "The same rail in the right-hand column. Which side it sits on is a layout decision, not a prop: swap the grid columns and the component does not care. A `side` prop that mirrored the rule to the outer edge was built and thrown away after one look, because it put the marker at the far end of the column from the label it marks. The labels are left-aligned either way, so the rule belongs on their left either way.",
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
          "The bar form, for narrow viewports where a rail has nowhere to sit. Note the `sticky` prop is deliberately ignored here. A sticky element only sticks inside its own parent's box, so a bar wrapped in a one-line div scrolls away with that div, silently and with no error. Making the bar stick is the page's job: it has to be a direct child of an element spanning the scrolling region. This was learned the expensive way on a prototype.",
      },
    },
  },
};

export const States: Story = {
  args: { orientation: "horizontal" },
  render: (args) => (
    <div className="pb-24">
      <SectionNav {...args} />
      <p className="mt-8 max-w-[46rem] text-base text-text-secondary">
        The first item is current and carries the rule at 6.89:1 with a label at 18.28:1. The rest
        sit at 8.85:1 and lift to 18.28:1 on hover, bringing in a grey rule so the hover previews the
        shape being current will take. Hover the second item to see it. There is no disabled state,
        because a section either exists on the page or it does not.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Two states, measured in both themes. Visually this matches Tabs on purpose, since both organise one page, but the markup underneath is a nav and a list of anchors rather than a tablist. Looking alike while behaving differently is the correct outcome here: the reader learns one visual language, and assistive technology gets the truth about which one it is.",
      },
    },
  },
};
