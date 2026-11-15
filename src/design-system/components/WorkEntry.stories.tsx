import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WorkEntry } from "./WorkEntry";
import { SectionHead } from "./SectionHead";
import { caseStudies } from "@/content/case-studies";

const meta = {
  title: "Components/WorkEntry",
  component: WorkEntry,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "One case study on the work index: a card with the cover and the record (number, organization, title, standfirst, action). Side by side from 54rem of card width, stacked below. Covers are made for the site, never employer screens.\n\nFigma: Work entry.",
      },
    },
  },
  argTypes: {
    index: { control: { type: "number", min: 0, max: 20 } },
  },
} satisfies Meta<typeof WorkEntry>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Published: Story = {
  args: {
    index: 0,
    study: { ...caseStudies[0], status: "published" },
  },
  parameters: {
    docs: {
      description: {
        story:
          "A finished study. The whole card opens it; the title is the one link a screen reader hears.",
      },
    },
  },
};

export const Draft: Story = {
  args: {
    index: 1,
    study: { ...caseStudies[1], status: "draft" },
  },
  parameters: {
    docs: {
      description: {
        story:
          "A study still being written: marked, never dimmed, and not a link in production.",
      },
    },
  },
};

export const LongTitle: Story = {
  args: {
    index: 11,
    study: {
      ...caseStudies[1],
      title: "Sixteen applications across three platforms, and no way for anyone to know when any of them would break",
      status: "published",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "A long title breaks into even lines.",
      },
    },
  },
};

export const TheIndex: Story = {
  args: { index: 0, study: caseStudies[0] },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Every study as the index shows them, 16px apart.",
      },
    },
  },
  render: () => (
    <div style={{ padding: "2rem", maxWidth: "84rem", margin: "0 auto" }}>
      <SectionHead count={caseStudies.length}>Case studies</SectionHead>
      <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        {caseStudies.map((study, i) => (
          <WorkEntry key={study.slug} study={study} index={i} />
        ))}
      </div>
    </div>
  ),
};

export const Phone: Story = {
  args: {
    index: 0,
    study: { ...caseStudies[0], status: "published" },
  },
  globals: { viewport: { value: "phone", isRotated: false } },
  parameters: {
    layout: "fullscreen",
    // The page's 24px phone gutter, so the card's bleed meets the edges.
    padding: "2rem 1.5rem",
    docs: {
      description: {
        story:
          "At 390px the action becomes a full-width button, still part of the card's one link.",
      },
    },
  },
};

export const PhoneDraft: Story = {
  name: "Phone, draft",
  args: { index: 1, study: { ...caseStudies[1], status: "draft" } },
  globals: { viewport: { value: "phone", isRotated: false } },
  parameters: {
    layout: "fullscreen",
    // The page's 24px phone gutter, so the card's bleed meets the edges.
    padding: "2rem 1.5rem",
    docs: {
      description: {
        story: "A draft on a phone: no button, since there's nothing to open yet.",
      },
    },
  },
};
