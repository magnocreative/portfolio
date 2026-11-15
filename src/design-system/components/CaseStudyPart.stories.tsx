import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CaseStudyBeat, CaseStudyPart } from "./CaseStudyPart";
import { Figure } from "./Figure";

const meta = {
  title: "Components/CaseStudyPart",
  component: CaseStudyPart,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "One of a case study's two halves, What changed and How I got there, with its beats inside. The half takes a section head and an eyebrow in words (Part one, Part two); each beat takes a small heading in the storytelling guide's words, its prose, and the evidence that backs it. Mirrors the Case study part component in Figma.",
      },
    },
  },
  args: { id: "what-changed", eyebrow: "Part one", title: "What changed", children: null },
} satisfies Meta<typeof CaseStudyPart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WhatChanged: Story = {
  render: (args) => (
    <CaseStudyPart {...args}>
      <CaseStudyBeat id="situation" heading="The situation">
        Sixteen applications on three platforms, and nothing tied them together. When one went down,
        the people who depended on it found out by trying to open it.
      </CaseStudyBeat>
      <CaseStudyBeat
        id="result"
        heading="The result"
        after={<Figure caption="Every application on one screen, split into the ones you can open and the ones you'd have to request." />}
      >
        One front door: every application, what it&rsquo;s for and whether it&rsquo;s up.
      </CaseStudyBeat>
      <CaseStudyBeat id="role" heading="My role">
        I was the lead designer, from research through launch, with one design partner.
      </CaseStudyBeat>
    </CaseStudyPart>
  ),
};

export const HowIGotThere: Story = {
  args: { id: "how", eyebrow: "Part two", title: "How I got there" },
  render: (args) => (
    <CaseStudyPart {...args}>
      <CaseStudyBeat id="constraint" heading="The constraint">
        Leadership wanted it out of the box, to keep tech debt down.
      </CaseStudyBeat>
      <CaseStudyBeat id="decision" heading="The decision">
        I argued for a custom build, and named what it would cost.
      </CaseStudyBeat>
      <CaseStudyBeat id="argument" heading="The argument I lost">
        I proposed fewer applications. It went to the backlog.
      </CaseStudyBeat>
      <CaseStudyBeat id="differently" heading="What I’d do differently">
        Ship the explanation with the hub, not after it.
      </CaseStudyBeat>
    </CaseStudyPart>
  ),
};
