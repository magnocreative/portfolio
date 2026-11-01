import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageHeader } from "./PageHeader";
import { Button } from "./Button";

const meta = {
  title: "Components/PageHeader",
  component: PageHeader,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The header at the top of every page: an eyebrow or a breadcrumb trail, the h1, and the intro. Mirrors the Page header component in Figma type for type. The type sets the headline's size and measure, because that decides where it breaks; everything else (the 56px gap, the 46rem intro) is shared.",
      },
    },
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Hero: Story = {
  args: {
    type: "hero",
    eyebrow: "Experience Designer · Design Systems",
    title: "I design the systems behind the tools people use all day.",
    lede: "Ten years on internal software: compliance platforms, audit tooling, and the CRM systems bankers and advisors work in every day. I own the design system, and I build the prototypes that prove a design works before engineering commits to it.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Home only. 48 on a phone, 64 from sm, 84 from lg, where it is capped at 12em and wraps plainly rather than balancing, so it holds three lines on every desktop width.",
      },
    },
  },
};

export const Subhero: Story = {
  args: {
    type: "subhero",
    eyebrow: "Work",
    title: "Each of these is a decision, not a project.",
    lede: "Internal software rarely leaves a screen worth showing, and the screens it does leave belong to the companies that paid for them. What I can show is the call that was made, what it cost, and what happened after.",
  },
};

export const WithSectionNav: Story = {
  args: {
    type: "withSectionNav",
    eyebrow: "The design system",
    title: "A system you can read, not a claim you have to take on trust.",
    lede: "This site runs on the system documented below. Everything here is live, and the contrast figures are measured in your browser as you read them.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "The left column beside the section nav. The column is narrower, so the headline is capped at 15ch until xl and 24ch from there.",
      },
    },
  },
};

export const WithBreadcrumb: Story = {
  args: {
    type: "withSectionNav",
    breadcrumb: [{ label: "Design system", href: "/system" }, { label: "Components" }],
    title: "The real components, running live.",
    lede: "Every component below is the real one, rendered by this page, reading the same tokens as everything else on the site.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "A level down, the trail replaces the eyebrow. Its last item names the page, so there is no eyebrow under it repeating the same word.",
      },
    },
  },
};

export const Resume: Story = {
  args: {
    type: "resume",
    eyebrow: "Résumé",
    title: "Alejandro Magno Fernandini",
    subtitle: "Experience Designer. Design systems and complex operational tools.",
    meta: (
      <>
        <span>Dallas&ndash;Fort Worth, Texas</span>
        <span>Open to relocation</span>
      </>
    ),
    lede: "Experience designer with ten years in design and a working engineering background, focused on the internal systems people use all day to do difficult work.",
    actions: (
      <Button href="#" variant="secondary">
        Request a PDF
      </Button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "The name, uncapped, then a subtitle and a contact row before the intro, which sits 48px below them. The PDF request follows the intro.",
      },
    },
  },
};
