import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { PasswordGate, GateMark } from "./PasswordGate";

/* Sample password for the stories only: "storybook". The real one lives in
   Vercel and is checked on the server; nothing here can open the site. */
const check = async (pw: string) => {
  await new Promise((r) => setTimeout(r, 400));
  return pw === "storybook";
};

const meta = {
  title: "Components/PasswordGate",
  component: PasswordGate,
  parameters: {
    layout: "fullscreen",
    docs: {
      story: { inline: false, iframeHeight: 720 },
      description: {
        component:
          "The way in while the site is password-protected: a card over the blurred opening of the home page, with the mark, a welcome and the password field. Each keystroke raises the mark's fill a step (any keystroke: it never says whether a character is right); the right password fills it and opens the site, a wrong one drains it, shakes the field and shows a toast. A native modal dialog, so the page behind it is inert. Try the sample password \"storybook\". Mirrors the Password gate component in Figma.",
      },
    },
  },
  args: { contactHref: "mailto:hello@example.com?subject=Password", check },
  render: (args) => {
    // A remount on entry, so the story can be tried again.
    const [run, setRun] = useState(0);
    return (
      <div className="min-h-screen p-16">
        <p className="max-w-[16ch] font-display text-6xl font-semibold leading-[1.05] text-text-primary">
          Sample page behind the gate
        </p>
        <PasswordGate key={run} {...args} onEntered={() => setRun((n) => n + 1)} />
      </div>
    );
  },
} satisfies Meta<typeof PasswordGate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Phone: Story = {
  globals: { viewport: { value: "phone", isRotated: false } },
};

export const MarkLevels: StoryObj = {
  name: "The mark, filling",
  render: () => (
    <div className="flex gap-10 p-10">
      {[0, 0.3, 0.6, 1].map((l) => (
        <div key={l} className="flex flex-col items-center gap-3">
          <GateMark level={l} entering={l === 1} />
          <span className="font-label text-xs uppercase tracking-[0.11em] text-text-tertiary">{l === 1 ? "entered" : `${Math.round(l * 100)}%`}</span>
        </div>
      ))}
    </div>
  ),
  parameters: { layout: "padded", docs: { story: { inline: true }, description: { story: "At rest, typing (it stops short of 70%), and on entry." } } },
};
