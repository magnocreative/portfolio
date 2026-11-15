import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FeaturePanel } from "./FeaturePanel";
import { KeyValueList } from "./KeyValueList";
import { Button } from "./Button";
import { ArrowRight } from "./Icon";
import { Figure } from "./Figure";

const meta = {
  title: "Components/FeaturePanel",
  component: FeaturePanel,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A raised panel with a main column and an aside, for a section that pairs an argument with its evidence. The aside's width, side and alignment vary; the spacing doesn't.\n\nFigma: Feature panel.",
      },
    },
  },
  args: {
    heading: "Every claim on this page is checkable.",
    eyebrow: "Read the source",
    children:
      "The tokens are one file. The components are next to their own stories. Nothing here is a screenshot of work done elsewhere.",
    aside: (
      <KeyValueList
        items={[
          { key: "tokens", value: "src/styles/tokens.css" },
          { key: "components", value: "src/design-system/" },
        ]}
      />
    ),
  },
} satisfies Meta<typeof FeaturePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FactsAtTheEnd: Story = {};

export const WithAction: Story = {
  args: {
    eyebrow: undefined,
    heading: "This site runs on a design system you can read.",
    action: (
      <Button href="/system" variant="primary" iconAfter={<ArrowRight />}>
        Read the system
      </Button>
    ),
  },
};

export const AsideAtTheStart: Story = {
  args: {
    eyebrow: undefined,
    heading: undefined,
    asideWidth: "narrow",
    asideSide: "start",
    align: "start",
  },
};

export const WithMedia: Story = {
  args: {
    media: (
      <Figure
        alt="Sample image"
        caption="A figure that belongs to the panel, in the full-width row under both columns, 48px below them and lined up with the text."
      />
    ),
  },
  parameters: {
    docs: { description: { story: "With a full-width media row, as in Read the source on /system." } },
  },
};
