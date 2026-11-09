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
          "The opening band of a case study: breadcrumb, title and intro on the page's own ground at the left, and art on the right in two layers. The ground (art) bleeds off the right edge and fades out toward the text, a mask to transparent, so one piece of art serves both themes. The subject stays solid in a column at the content's right edge, so on a wide display it holds its place and only the ground grows. Desktop only from 1280; below that it is the plain page header. Both layers are decorative: aria-hidden and inert. Give it an id and the page's section nav can wait for it to scroll away (RevealAfter).",
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
      description: { story: "A ground alone, as a picture would be: it bleeds off the right edge and fades toward the text." },
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
          "A pattern for the ground and a solid subject at the content's right edge. The design system case study uses this for its live token chain on a dotted ground. Widen the canvas past 1440: the subject stays put and the dots fill the extra room.",
      },
    },
  },
};
