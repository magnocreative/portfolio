import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CaseStudyHero } from "./CaseStudyHero";

const meta = {
  title: "Components/CaseStudyHero",
  component: CaseStudyHero,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The opening of a case study: breadcrumb, title and intro on the left, art on the right. The ground bleeds off the edge and fades toward the text, so one piece of art works in both themes; the subject holds its place at the content's edge. Desktop only, from 1280px. Both layers are decorative.\n\nFigma: Case study hero.",
      },
    },
  },
  args: {
    breadcrumb: [{ label: "Work", href: "/work" }, { label: "A case study" }],
    title: "A title that states the decision, not the project.",
    lede: "One or two sentences that set the stakes: who was hurting, and what it cost them.",
  },
} satisfies Meta<typeof CaseStudyHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithoutArt: Story = {};

export const Ground: Story = {
  args: {
    art: (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, var(--interactive-default), var(--surface-sunken))",
        }}
      />
    ),
  },
  parameters: {
    docs: {
      description: { story: "A ground alone: it bleeds off the right edge and fades toward the text." },
    },
  },
};

export const GroundAndSubject: Story = {
  args: {
    art: (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: "radial-gradient(var(--border-default) 1.2px, transparent 1.6px)",
          backgroundSize: "28px 28px",
        }}
      />
    ),
    subject: (
      <div style={{ width: 112, height: 112, borderRadius: 16, background: "var(--interactive-default)" }} />
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "A dotted ground with a solid subject, as on the design system case study. Widen the canvas: the subject stays put and the ground fills the room.",
      },
    },
  },
};
