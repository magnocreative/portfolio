import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ComponentType, SVGProps } from "react";
import * as Icons from "@/design-system/components/Icon";
import { Logo } from "@/design-system/brand/Logo";
import { HclLogo, JpmcLogo, M7Logo, SwbcLogo, UiwLogo, UsaaLogo } from "@/design-system/brand/OrgLogos";

/**
 * Every icon in Icon.tsx, READ from the module, never listed by hand.
 *
 * The same rule as the type specimen: a gallery that names its icons goes
 * stale the day someone adds one. This imports the module and draws whatever
 * it exports, so a new icon appears here the moment it exists. The table below
 * only adds a family and a line on what each is for; an icon missing from it
 * still shows, under "Not yet described", which is the cue to describe it.
 *
 * Four glyphs live inside the component that owns them and are not exported:
 * the menu and chevron (SiteHeader) and the sun, moon and monitor (ThemeToggle).
 * They are in those stories. Figma keeps all of them on its Icons page.
 */
type Icon = ComponentType<SVGProps<SVGSVGElement>>;

const ABOUT: Record<string, { family: string; use: string }> = {
  WorkIcon: { family: "Navigation", use: "Work, in the menu" },
  SystemIcon: { family: "Navigation", use: "Design system, in the menu" },
  AboutIcon: { family: "Navigation", use: "About, in the menu" },
  ResumeIcon: { family: "Navigation", use: "Résumé, in the menu" },
  ArrowRight: { family: "Arrows", use: "Go to: buttons, Read the case study" },
  ArrowUpRight: { family: "Arrows", use: "Leaves the site" },
  ArrowLeft: { family: "Arrows", use: "Go back" },
  Download: { family: "Actions", use: "Download the résumé" },
  Mail: { family: "Actions", use: "Email" },
  RoleIcon: { family: "Facts", use: "Role, in a FactsPanel" },
  CalendarIcon: { family: "Facts", use: "Period, in a FactsPanel" },
  ScopeIcon: { family: "Facts", use: "Scope, in a FactsPanel" },
  CodeIcon: { family: "Facts", use: "Stack, in a FactsPanel" },
  BriefcaseOffIcon: { family: "Points", use: "Nothing taken from work" },
  BrowserCheckIcon: { family: "Points", use: "Runs, and was tested where it runs" },
  HandoffIcon: { family: "Points", use: "Both sides of a handoff" },
  TexasIcon: { family: "Places", use: "Where he is: résumé header, footer" },
  GlobeIcon: { family: "Places", use: "Open to relocation" },
  BriefcaseIcon: { family: "Marks", use: "Stands in for a logo: early career" },
  LinkedInIcon: { family: "Social", use: "LinkedIn, in the footer" },
  GitHubIcon: { family: "Social", use: "GitHub, in the footer" },
  ComponentsIcon: { family: "Skills", use: "Design systems, on the résumé" },
  PenNibIcon: { family: "Skills", use: "Product design, on the résumé" },
  TerminalIcon: { family: "Skills", use: "Design engineering, on the résumé" },
  WrenchIcon: { family: "Skills", use: "Tools, on the résumé" },
};
const FAMILIES = ["Navigation", "Arrows", "Actions", "Facts", "Points", "Places", "Skills", "Marks", "Social", "Not yet described"];

// Function components only: Icon.tsx exports nothing else today, and this
// keeps a future helper or constant from turning up as a broken tile.
const all = Object.entries(Icons).filter(([, v]) => typeof v === "function") as [string, Icon][];

function Tile({ name, Icon, use }: { name: string; Icon: Icon; use?: string }) {
  return (
    <li className="flex flex-col items-center gap-3 rounded-sm border border-border-subtle bg-surface-raised px-3 pt-6 pb-4 text-center">
      <Icon className="h-6 w-6 text-text-primary" />
      <code className="font-label text-xs text-text-primary">{name}</code>
      {use && <span className="text-xs text-text-tertiary">{use}</span>}
    </li>
  );
}

const meta = {
  title: "Foundations/Icons",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A small stroke set, drawn rather than imported: a 20-unit grid, 1.5 stroke, round caps and joins, `currentColor`. An icon takes its color from the text around it and its size from the component that holds it, never from itself. Read straight from Icon.tsx, so nothing here can fall behind the code.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gallery: Story = {
  parameters: {
    docs: { description: { story: "Every exported icon at 24px, the size the site uses most, grouped by family." } },
  },
  render: () => (
    <div className="flex max-w-[64rem] flex-col gap-10">
      {FAMILIES.map((family) => {
        const icons = all.filter(([name]) => (ABOUT[name]?.family ?? "Not yet described") === family);
        if (!icons.length) return null;
        return (
          <section key={family}>
            <h2 className="font-label text-xs font-medium uppercase tracking-[0.11em] text-text-tertiary">
              {family} <span className="text-text-tertiary">· {icons.length}</span>
            </h2>
            <ul className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-3">
              {icons.map(([name, Icon]) => (
                <Tile key={name} name={name} Icon={Icon} use={ABOUT[name]?.use} />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The same glyphs at the four sizes in use: 14 in a compact label, 16 in a button, 20 in the menu, 24 in a card or panel. The stroke scales with the icon, so it stays the same weight relative to the drawing. The ink box is shared, so icons of different families sit on one center line.",
      },
    },
  },
  render: () => {
    const sample = all.filter(([name]) =>
      ["ArrowRight", "WorkIcon", "RoleIcon", "BrowserCheckIcon", "HandoffIcon"].includes(name),
    );
    return (
      <table className="text-left">
        <thead>
          <tr className="font-label text-xs uppercase tracking-[0.11em] text-text-tertiary">
            <th className="pr-10 pb-4 font-medium">Size</th>
            {sample.map(([name]) => (
              <th key={name} className="pr-10 pb-4 font-medium normal-case tracking-normal">
                <code className="font-label">{name}</code>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[14, 16, 20, 24].map((px) => (
            <tr key={px} className="border-t border-border-subtle">
              <td className="py-4 pr-10 font-label text-xs text-text-secondary">{px}px</td>
              {sample.map(([name, Icon]) => (
                <td key={name} className="py-4 pr-10 text-text-primary">
                  <Icon style={{ width: px, height: px }} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
};

export const InContext: Story = {
  name: "Color from context",
  parameters: {
    docs: {
      description: {
        story:
          "One icon, no color of its own: it paints in whatever text color surrounds it. Primary in a heading, tertiary beside a fact's key, accent on a point card and in a link.",
      },
    },
  },
  render: () => (
    <ul className="flex flex-col gap-4 text-base">
      {[
        ["text-text-primary", "Primary"],
        ["text-text-secondary", "Secondary"],
        ["text-text-tertiary", "Tertiary"],
        ["text-text-accent", "Accent"],
      ].map(([cls, label]) => (
        <li key={cls} className={`flex items-center gap-3 ${cls}`}>
          <Icons.BrowserCheckIcon className="h-6 w-6" />
          <span>{label}</span>
        </li>
      ))}
    </ul>
  ),
};

export const Logos: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Not icons, but drawn the same way and kept beside them. The MagnoCreative mark paints two tokens, --mark-deep and --mark-light, the same in both themes. The employer logos and the university's mark were traced for this site and appear only on the résumé; USAA's, SWBC's and the university's tiles invert in the dark theme so it does not sink into the ground. Switch the theme in the toolbar to check both.",
      },
    },
  },
  render: () => (
    <ul className="grid max-w-[50rem] grid-cols-2 gap-3 sm:grid-cols-4">
      {[
        ["MagnoCreative", <Logo key="m" className="h-10 w-auto" />],
        ["USAA", <UsaaLogo key="u" className="h-10 w-10" />],
        ["JPMorganChase", <JpmcLogo key="j" className="h-10 w-10" />],
        ["HCL", <HclLogo key="h" className="h-10 w-10" />],
        ["SWBC", <SwbcLogo key="s" className="h-10 w-10" />],
        ["M7 Aerospace", <M7Logo key="7" className="h-10 w-10" />],
        ["University of the Incarnate Word", <UiwLogo key="w" className="h-10 w-10" />],
      ].map(([name, mark]) => (
        <li
          key={name as string}
          className="flex flex-col items-center gap-3 rounded-sm border border-border-subtle bg-surface-raised px-3 pt-6 pb-4"
        >
          <span className="flex h-10 items-center">{mark}</span>
          <span className="text-xs text-text-tertiary">{name}</span>
        </li>
      ))}
    </ul>
  ),
};
