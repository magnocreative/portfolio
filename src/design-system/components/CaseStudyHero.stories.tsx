import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CaseStudyHero, heroFade } from "./CaseStudyHero";

const meta = {
  title: "Components/CaseStudyHero",
  component: CaseStudyHero,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The opening band of a case study: breadcrumb, title and intro on the page's own ground at the left, and art on the right that fades out toward the text. The fade is a mask to transparent, so one piece of art serves both themes, and it is fully transparent before the text column ends. Desktop only from 1280; below that it is the plain page header. The art is decorative: aria-hidden and inert. Give it an id and the page's section nav can wait for it to scroll away (RevealAfter).",
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

export const FadedArt: Story = {
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
      description: { story: "The default: the whole art fades, as a picture should." },
    },
  },
};

export const SolidSubjectOnAFadingGround: Story = {
  args: {
    fade: false,
    art: (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          style={{
            ...heroFade,
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(var(--border-default) 1.2px, transparent 1.6px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "62%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 112,
            height: 112,
            borderRadius: 16,
            background: "var(--interactive-default)",
          }}
        />
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "fade={false}: the art fades only its own background with heroFade, and its subject stays solid. The design system case study uses this for its live token chain.",
      },
    },
  },
};
