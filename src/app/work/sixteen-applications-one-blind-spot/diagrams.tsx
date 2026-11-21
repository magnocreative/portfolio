import { CompareSlider } from "@/design-system/components/CompareSlider";
import { RecreatedScreen } from "@/design-system/components/RecreatedScreen";
import { Button } from "@/design-system/components/Button";
import { ImageGallery, type GalleryItem } from "@/design-system/components/ImageGallery";
import type { CSSProperties, ReactNode } from "react";
import sketch1 from "@/assets/grc/sketch-1.png";
import sketch2 from "@/assets/grc/sketch-2.png";
import sketch3 from "@/assets/grc/sketch-3.png";
import sketch4 from "@/assets/grc/sketch-4.png";
import sketch5 from "@/assets/grc/sketch-5.png";
import sketch6 from "@/assets/grc/sketch-6.png";
import sketch7 from "@/assets/grc/sketch-7.png";
import sketch8 from "@/assets/grc/sketch-8.png";
import sketch9 from "@/assets/grc/sketch-9.png";
import sketch10 from "@/assets/grc/sketch-10.png";
import sketch11 from "@/assets/grc/sketch-11.png";
import sketch12 from "@/assets/grc/sketch-12.png";

/* The evidence for this study, drawn live rather than exported, the way the
   first study draws its token chain. Every one is a schematic made for this
   site: no USAA screen, no application name and no persona photo, which is
   the guide's rule and the reason they are drawn here at all. The one
   exception is the sketches in From sketch to screen, which are Alejandro's
   own (see SketchSheet). They follow the
   theme because they are made of the system's roles, never its primitives.

   The three platforms are told apart by fill as well as color, so the split
   never rests on color alone: Salesforce a blue tint, ServiceNow a gray fill,
   React an outline. The split itself is approximate (about half, a quarter
   and a quarter): which application ran where isn't remembered, so the
   grouping is illustrative and the names are invented. */

type Platform = "salesforce" | "servicenow" | "react";

const PLATFORM_TILE: Record<Platform, string> = {
  salesforce:
    "border-[color-mix(in_oklab,var(--interactive-default)_45%,var(--surface-raised))] bg-[color-mix(in_oklab,var(--interactive-default)_22%,var(--surface-raised))]",
  servicenow: "border-border-strong bg-surface-sunken",
  react: "border-dashed border-border-strong bg-transparent",
};

/* The sixteen, invented. The same names run through every figure (the
   ecosystem, the hub, the list view), so the reader meets one world, not
   three. Generic compliance work, and chosen not to echo the real
   applications' names. */
const PLATFORMS: { key: Platform; label: string; count: number; apps: string[] }[] = [
  {
    key: "salesforce",
    label: "Salesforce",
    count: 8,
    apps: [
      "Policy Library",
      "Risk Assessments",
      "Control Testing",
      "Audit Workpapers",
      "Compliance Monitoring",
      "Quality Reviews",
      "Risk Reporting",
      "Attestations",
    ],
  },
  {
    key: "servicenow",
    label: "ServiceNow",
    count: 4,
    apps: ["Issue Tracker", "Incident Reporting", "Compliance Training", "Change Requests"],
  },
  { key: "react", label: "React", count: 4, apps: ["Regulatory Updates", "Vendor Risk", "Exam Management", "Risk Dashboard"] },
];

const label = "font-label text-xs font-medium uppercase tracking-[0.11em] text-text-tertiary";

/* A gray bar standing in for a line of text. */
function Bar({ w, strong = false }: { w: string; strong?: boolean }) {
  return (
    <span
      className={`block h-1.5 rounded-full ${strong ? "bg-border-strong" : "bg-border-default"}`}
      style={{ width: w }}
    />
  );
}

/* --------------------------------------------------------------------------
   Hero subject: sixteen tiles above one front door. Upright, to fit the
   hero's 16.125rem column, in the token chain's language: a tier label, the
   thing, a dashed link, the next thing. */

export function HeroSubject() {
  const tiles = PLATFORMS.flatMap((p) => Array.from({ length: p.count }, () => p.key));
  const link = (
    <span className="flex flex-col items-center" aria-hidden="true">
      <span className="h-12 border-l-2 border-dashed border-border-strong" />
      <span className="-mt-1 h-2.5 w-2.5 rounded-full bg-border-strong" />
    </span>
  );
  return (
    <div className="flex flex-col items-center gap-4">
      <span className={label}>Sixteen applications</span>
      <div className="grid grid-cols-4 gap-2.5">
        {tiles.map((p, i) => (
          <span key={i} className={`h-11 w-11 rounded-md border-2 ${PLATFORM_TILE[p]}`} />
        ))}
      </div>
      {link}
      <span className={label}>One front door</span>
      <span className="flex w-56 flex-col gap-2.5 rounded-lg border border-border-subtle bg-surface-raised p-4 shadow-[0_8px_24px_color-mix(in_oklab,var(--shadow-ink)_8%,transparent)]">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-status-success" />
          <Bar w="7rem" strong />
        </span>
        <Bar w="100%" />
        <Bar w="80%" />
      </span>
    </div>
  );
}

/* --------------------------------------------------------------------------
   The ecosystem: the sixteen in three platform groups, with nothing joining
   them. A diagram, not
   a screen, so it follows the page's theme. */

export function Ecosystem() {
  return (
    <div
      role="img"
      aria-label="Sixteen applications in three groups, with invented names. Salesforce, about half: Policy Library, Risk Assessments, Control Testing, Audit Workpapers, Compliance Monitoring, Quality Reviews, Risk Reporting and Attestations. ServiceNow, a quarter: Issue Tracker, Incident Reporting, Compliance Training and Change Requests. React, a quarter: Regulatory Updates, Vendor Risk, Exam Management and Risk Dashboard. Nothing connects the groups."
      className="@container flex h-full w-full items-center justify-center p-6 @md:p-10"
    >
      {/* Salesforce across the top, the other two side by side under it, so
          every tile is the same width and a two-word name fits on its two
          lines at the type scale's floor. The gap between the two lower
          groups is the tiles' own 10px, so their four tiles sit exactly
          under Salesforce's four columns and React's label lines up with
          the third (Alejandro, November 2026). */}
      <div className="grid w-full grid-cols-1 gap-8 @xl:grid-cols-2 @xl:gap-x-2.5">
        {PLATFORMS.map((p) => (
          <div key={p.key} className={`flex flex-col gap-3 ${p.count === 8 ? "@xl:col-span-2" : ""}`}>
            <span className={label}>{p.label}</span>
            <div className={`grid gap-2.5 ${p.count === 8 ? "grid-cols-2 @md:grid-cols-4" : "grid-cols-2"}`}>
              {p.apps.map((app) => (
                <span
                  key={app}
                  className={`flex min-h-[4.5rem] items-end rounded-md border-2 p-2.5 text-xs font-medium leading-snug text-text-primary ${PLATFORM_TILE[p.key]}`}
                >
                  {app}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   The hub. */

/* The hub, recreated with invented content to follow Alejandro's real high
   fidelity screen for screen: every application name, person, date and
   line of copy is made up, and the palette is invented, not USAA's brand.
   The screens themselves live with the high fidelity gallery further down
   (RedesignDashboard and the rest); HubMock and the compares reuse the
   dashboard.

   A picture, not an interface: every frame is role="img" and inert, and
   nothing in it is a link or a button, only drawn to look like one. */

/* Small line icons for the mock, drawn on the same 20-unit grid and 1.5
   stroke as the site's own set. Local, because they belong to the picture. */
const GLYPHS = {
  search: "M9 15.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Zm4.6-1.9L17.5 17.5",
  bell: "M5 13.5V9a5 5 0 0 1 10 0v4.5l1.5 2h-13l1.5-2ZM8.5 17.5a1.6 1.6 0 0 0 3 0",
  lock: "M6 9V6.5a4 4 0 0 1 8 0V9M4.5 9h11v8.5h-11z",
  doc: "M5.5 2.5h6l3.5 3.5v11.5h-9.5zM11.5 2.5V6H15M8 10.5h5M8 13.5h5",
  alert: "M10 3 18 17H2L10 3Zm0 5.5v3.5m0 2.2v.3",
  arrow: "M7 13 13 7M8 7h5v5",
  chevron: "M6 8l4 4 4-4",
} as const;

function Glyph({ d, className = "h-4 w-4" }: { d: keyof typeof GLYPHS; className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d={GLYPHS[d]} />
    </svg>
  );
}

/* The screens are drawn inside RecreatedScreen (design system): a browser
   window, light only, desktop width scaled to fit, inert. Only the screens
   themselves belong to this study. */

/* The hub's own look, so the recreations read as a real product rather
   than as this site (Alejandro, November 2026: hyper realistic). A product
   palette scoped to the screen: it restates the semantic roles the screens
   are built from, inside this element only, and adds the dark app bar. The
   type is the operating system's, as an internal tool's would be. Invented,
   not any company's brand. Page code, so it may name values. */
const HUB_SKIN = {
  "--hub-bar": "oklch(27% 0.062 256)",
  "--hub-on-bar": "oklch(99% 0 0)",
  "--hub-on-bar-muted": "oklch(85% 0.02 256)",
  "--hub-accent": "oklch(80% 0.09 240)",
  "--hub-mark": "oklch(55% 0.15 252)",
  "--interactive-default": "oklch(50% 0.15 256)",
  "--interactive-hover": "oklch(45% 0.15 256)",
  "--interactive-subtle": "oklch(95.5% 0.025 250)",
  "--border-interactive": "oklch(62% 0.12 254)",
  "--text-accent": "oklch(46% 0.15 256)",
  "--surface-page": "oklch(97.4% 0.004 250)",
  "--surface-raised": "oklch(100% 0 0)",
  "--surface-sunken": "oklch(95.6% 0.006 250)",
  "--border-subtle": "oklch(91.8% 0.008 250)",
  "--border-default": "oklch(86.5% 0.011 250)",
  "--text-primary": "oklch(23% 0.02 256)",
  "--text-secondary": "oklch(42% 0.022 256)",
  "--text-tertiary": "oklch(54% 0.018 256)",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
} as CSSProperties;

/* The result: the dashboard in its refined high fidelity, the same one as
   in the gallery and the compare (Alejandro, November 2026). */
export function HubMock() {
  return (
    <div
      role="img"
      aria-label="The GRC Connect dashboard, in its refined high fidelity, recreated with invented content, in a browser window: search in the bar, one status line for an issue, two maintenance windows and two updates, a welcome column with recently viewed and help, the person's six applications as cards that say what each is for, with status on the affected ones and Launch, and the applications available to request, each with Request access."
      className="h-full w-full"
    >
      {/* No backdrop or padding: the browser window is its own frame (Alejandro, November 2026) */}
      <RecreatedScreen address="grcconnect.example/dashboard" tab="GRC Connect" width={1100}>
        <div style={REAL_SKIN} className="bg-surface-page text-text-primary [&_.font-label]:[font-family:inherit]">
          <RedesignDashboard />
        </div>
      </RecreatedScreen>
    </div>
  );
}

/* --------------------------------------------------------------------------
   The decision: the same applications, two builds, in a compare slider.
   Out of the box is a platform's default list view, recreated generically
   (no vendor's own look or name): a table of names, owners and dates, and
   nothing about what an application is for or whether it's up. The hub is
   the screen above, with nothing open. Both are cropped to the same first
   screenful, the part a person sees before deciding where to go. */

const LIST_ROWS: [string, string, string, string][] = [
  ["Attestations", "Salesforce", "M. Patel", "Oct 3, 2022"],
  ["Audit Workpapers", "Salesforce", "D. Okafor", "Sep 28, 2022"],
  ["Change Requests", "ServiceNow", "L. Chen", "Oct 11, 2022"],
  ["Compliance Monitoring", "Salesforce", "R. Alvarez", "Aug 19, 2022"],
  ["Compliance Training", "ServiceNow", "J. Brooks", "Oct 7, 2022"],
  ["Control Testing", "Salesforce", "S. Nguyen", "Sep 2, 2022"],
  ["Exam Management", "React", "K. Hayes", "Oct 12, 2022"],
  ["Incident Reporting", "ServiceNow", "A. Romero", "Oct 10, 2022"],
  ["Issue Tracker", "ServiceNow", "T. Walsh", "Sep 30, 2022"],
  ["Policy Library", "Salesforce", "P. Singh", "Jul 25, 2022"],
  ["Quality Reviews", "Salesforce", "C. Diaz", "Oct 5, 2022"],
];

function ListScreen() {
  const cell = "border-b border-border-subtle px-3 py-2";
  return (
    <>
      {/* The platform's global bar and its tabs */}
      <div className="flex items-center gap-4 border-b border-border-default bg-surface-raised px-4 py-2.5">
        <span className="grid h-5 w-5 grid-cols-3 gap-0.5">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} className="rounded-[1px] bg-text-tertiary" />
          ))}
        </span>
        <span className="text-sm font-semibold text-text-primary">GRC</span>
        <span className="flex items-center gap-4 text-xs text-text-secondary">
          <span>Home</span>
          <span className="border-b-2 border-interactive pb-0.5 font-medium text-text-primary">Applications</span>
          <span>Reports</span>
          <span>Dashboards</span>
          <span>Files</span>
          <span>More</span>
        </span>
        <span className="ml-auto flex w-56 items-center gap-2 rounded-sm border border-border-default px-3 py-1 text-xs text-text-tertiary">
          <Glyph d="search" className="h-3.5 w-3.5" />
          Search…
        </span>
      </div>

      {/* The list view header */}
      <div className="flex items-end justify-between gap-4 bg-surface-sunken px-4 py-3">
        <span className="flex flex-col">
          <span className="text-xs text-text-tertiary">Applications</span>
          <span className="flex items-center gap-1 text-base font-semibold text-text-primary">
            All Applications
            <Glyph d="chevron" className="h-3.5 w-3.5 text-text-tertiary" />
          </span>
          <span className="mt-1 text-xs text-text-tertiary">16 items · Sorted by Application Name · Updated a few seconds ago</span>
        </span>
        <span className="flex gap-1.5 text-xs text-text-secondary">
          {["New", "Import", "Change Owner", "Printable View"].map((b) => (
            <span key={b} className="rounded-sm border border-border-default bg-surface-raised px-2.5 py-1">
              {b}
            </span>
          ))}
        </span>
      </div>

      {/* The table: names, platforms, owners and dates. Nothing about what
          an application is for, or whether it's up. */}
      <div className="bg-surface-raised text-xs">
        <div className="grid grid-cols-[2.5rem_2fr_1fr_1fr_1fr_2rem] border-y border-border-default bg-surface-sunken font-semibold text-text-secondary">
          <span className={cell} />
          <span className={cell}>Application Name</span>
          <span className={cell}>Platform</span>
          <span className={cell}>Owner</span>
          <span className={cell}>Last Modified</span>
          <span className={cell} />
        </div>
        {LIST_ROWS.map(([name, platform, owner, date], i) => (
          <div key={name} className="grid grid-cols-[2.5rem_2fr_1fr_1fr_1fr_2rem] text-text-secondary">
            <span className={`${cell} text-text-tertiary`}>{i + 1}</span>
            <span className={`${cell} text-text-accent`}>{name}</span>
            <span className={cell}>{platform}</span>
            <span className={cell}>{owner}</span>
            <span className={cell}>{date}</span>
            <span className={`${cell} text-text-tertiary`}>
              <Glyph d="chevron" className="h-3.5 w-3.5" />
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export function BuildComparison() {
  return (
    <CompareSlider
      label="Compare the out-of-the-box list view with the hub as built"
      before={{
        node: (
          <RecreatedScreen address="platform.example/apps" tab="Applications · Platform" width={1100}>
            {/* Tall enough to fill the frame, so the hub never shows under it */}
            <div className="min-h-[800px] bg-surface-raised">
              <ListScreen />
            </div>
          </RecreatedScreen>
        ),
        label: "Out of the box",
        alt: "Out of the box, recreated with invented content: a platform's default list view titled All Applications, with a row of tabs and a table of application names, platforms, owners and last-modified dates. Nothing says what an application is for or whether it's up.",
      }}
      after={{
        node: (
          /* The refined high fidelity dashboard, the same one as in the
             gallery, drawn at the list's width so the two line up
             (Alejandro, November 2026) */
          <RecreatedScreen address="grcconnect.example/dashboard" tab="GRC Connect" width={1100}>
            <div style={REAL_SKIN} className="min-h-[800px] bg-surface-page text-text-primary [&_.font-label]:[font-family:inherit]">
              <RedesignDashboard />
            </div>
          </RecreatedScreen>
        ),
        label: "Custom build",
        alt: "The custom build, in its refined high fidelity form, recreated with invented content: search in the bar, one status line for issues, maintenance and updates, and the person's applications as cards that each say what the application is for, with status on the affected ones and Launch, each card opening its details, then the applications they could request.",
      }}
    />
  );
}

/* --------------------------------------------------------------------------
   The mood board: the case for building the hub custom, made with pictures
   rather than a memo. Recreated (Alejandro, November 2026) from the board on
   his old portfolio, which collected other designers' published shots, so
   nothing of theirs is reproduced here: no product, logo, brand or face.

   Broken down the way a board is read, from the smallest parts up: atoms
   (color, type, buttons, status, icons, inputs), then components built from
   them (a maintenance banner, a card with its status, a summary at a
   glance, what is coming up, steps, toasts, a feedback form). Every tile is
   labeled with its tier, so the board reads as a kit rather than a
   screenshot. Most of it became the hub; the feedback form moved to a later
   release. Light only, like the recreated screens: it is a picture of a
   board. On a phone all six atoms show, Type and Icons side by side, and
   the components trim to Banner, Card and Feedback. The real Button is drawn as a specimen, so the board can't drift
   from it. */

type Tier = "Atom" | "Component";

function Tile({
  tier,
  name,
  span = "col-span-2 @md:col-span-1 @3xl:col-span-2",
  wideOnly = false,
  children,
}: {
  tier: Tier;
  name: string;
  span?: string;
  wideOnly?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`${wideOnly ? "hidden @md:flex" : "flex"} flex-col gap-3 rounded-lg border border-border-subtle bg-surface-raised p-4 ${span}`}
    >
      <span className="font-label text-[10px] uppercase tracking-[0.12em]">
        <span className="text-text-tertiary">{tier}</span>
        <span className="text-border-strong"> · </span>
        <span className="text-text-secondary">{name}</span>
      </span>
      {children}
    </div>
  );
}

const statusChip = {
  up: "bg-[color-mix(in_oklab,var(--status-success)_14%,var(--surface-raised))] text-[color-mix(in_oklab,var(--status-success)_85%,var(--text-primary))]",
  warn: "bg-[color-mix(in_oklab,var(--status-warning)_16%,var(--surface-raised))] text-[color-mix(in_oklab,var(--status-warning)_80%,var(--text-primary))]",
  down: "bg-[color-mix(in_oklab,var(--status-danger)_12%,var(--surface-raised))] text-text-danger",
  info: "bg-[color-mix(in_oklab,var(--interactive-default)_14%,var(--surface-raised))] text-text-accent",
  neutral: "bg-surface-sunken text-text-secondary",
};

function Chip({ tone, children }: { tone: keyof typeof statusChip; children: ReactNode }) {
  /* Squared to 4px and marked by shape, like the tags in the hub */
  return <span className={`inline-flex w-fit items-center gap-1 rounded-[4px] py-0.5 pr-2 pl-1.5 text-[11px] font-medium ${statusChip[tone]}`}>{children}</span>;
}

function ColorAtom() {
  const swatches = [
    { c: "bg-interactive", n: "Action" },
    { c: "bg-status-success", n: "Up" },
    { c: "bg-status-warning", n: "Notice" },
    { c: "bg-status-danger", n: "Down" },
    { c: "bg-text-primary", n: "Ink" },
    { c: "bg-surface-sunken border border-border-subtle", n: "Ground" },
  ];
  return (
    <div className="grid grid-cols-3 gap-2">
      {swatches.map((s) => (
        <span key={s.n} className="flex flex-col gap-1">
          <span className={`h-9 rounded-md ${s.c}`} />
          <span className="text-[10px] text-text-tertiary">{s.n}</span>
        </span>
      ))}
    </div>
  );
}

function TypeAtom() {
  return (
    <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
      <span className="font-display text-4xl leading-none text-text-primary @md:text-5xl">Aa</span>
      <span className="flex flex-col gap-1 pb-0.5">
        <span className="text-base font-semibold leading-tight text-text-primary">Heading</span>
        <span className="text-sm leading-tight text-text-secondary">Body copy</span>
        <span className="font-label text-[10px] uppercase tracking-[0.12em] text-text-tertiary">Label</span>
      </span>
    </div>
  );
}

function ButtonAtom() {
  return (
    /* Launch and Docs on one row, the text action under them with its text
       on the same left edge as Launch's box (Alejandro, November 2026) */
    <div className="flex flex-col items-start gap-1.5">
      <span className="flex flex-wrap items-center gap-2">
        <Button specimen variant="primary" fillOnPhone={false}>Launch</Button>
        <Button specimen variant="secondary" fillOnPhone={false}>Docs</Button>
      </span>
      <Button specimen variant="tertiary" fillOnPhone={false} className="-ml-5">
        Request access
      </Button>
    </div>
  );
}

function StatusAtom() {
  return (
    <div className="flex flex-wrap gap-2">
      <Chip tone="up"><StatusIcon tone="up" className="h-3 w-3" />Up</Chip>
      <Chip tone="warn"><StatusIcon tone="warn" className="h-3 w-3" />Maintenance</Chip>
      <Chip tone="down"><StatusIcon tone="down" className="h-3 w-3" />Down</Chip>
      <Chip tone="info"><StatusIcon tone="info" className="h-3 w-3" />In progress</Chip>
      <Chip tone="neutral"><span className="pl-0.5">Draft</span></Chip>
    </div>
  );
}

function IconAtom() {
  const icons: (keyof typeof GLYPHS)[] = ["search", "bell", "lock", "doc", "alert", "arrow"];
  return (
    <div className="grid grid-cols-3 gap-2 @md:grid-cols-6">
      {icons.map((g) => (
        <span key={g} className="flex aspect-square items-center justify-center rounded-[8px] bg-surface-sunken text-text-secondary">
          <Glyph d={g} className="h-5 w-5" />
        </span>
      ))}
    </div>
  );
}

function InputAtom() {
  return (
    <div className="flex flex-col gap-3">
      <span className="flex items-center gap-2 rounded-sm border border-border-default px-3 py-1.5 text-xs text-text-tertiary">
        <Glyph d="search" className="h-3.5 w-3.5" />
        Search applications
      </span>
      <span className="flex items-center gap-4 text-xs text-text-secondary">
        <span className="flex items-center gap-1.5">
          <span className="flex h-4 w-4 items-center justify-center rounded-[3px] bg-interactive text-[10px] text-interactive-on">✓</span>
          Salesforce
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded-[3px] border border-border-strong" />
          ServiceNow
        </span>
      </span>
      <span className="flex items-center gap-2 text-xs text-text-secondary">
        <span className="flex h-5 w-9 shrink-0 items-center rounded-full bg-interactive p-0.5">
          <span className="ml-auto h-4 w-4 rounded-full bg-surface-raised" />
        </span>
        Maintenance alerts
      </span>
    </div>
  );
}

/* The same notice as in the hub's details: no border, the status mark, one
   short line */
function BannerComponent() {
  /* One line where there is room; on a phone the line wraps rather than cut off */
  const row = "flex items-start gap-2.5 rounded-[8px] px-3 py-2.5 text-xs @xl:items-center @xl:whitespace-nowrap";
  return (
    <div className="flex flex-col gap-2">
      <div className={`${row} bg-[color-mix(in_oklab,var(--status-warning)_16%,var(--surface-raised))] text-[oklch(36%_0.08_70)]`}>
        <StatusIcon tone="warn" className="h-4 w-4" />
        <span>
          <b className="font-semibold">Maintenance</b> · Issue Tracker down Saturday, 2 to 4 AM
        </span>
        <span className="ml-auto font-semibold text-text-accent">Details</span>
      </div>
      <div className={`${row} bg-[color-mix(in_oklab,var(--interactive-default)_10%,var(--surface-raised))] text-[oklch(32%_0.08_256)]`}>
        <StatusIcon tone="info" className="h-4 w-4" />
        <span>
          <b className="font-semibold">New</b> · Exam Management is open to every team
        </span>
        <span className="ml-auto font-semibold text-text-accent">Open</span>
      </div>
    </div>
  );
}

/* The hub's card: the whole card opens the details (the chevron), status
   under the name, and the one action that leaves, Launch, as a tint */
function CardComponent() {
  return (
    <div className={`flex flex-col gap-2 rounded-[8px] border border-[var(--real-line)] bg-surface-raised p-3 ${cardShadow}`}>
      <span className="flex items-start gap-2">
        <span className="flex flex-col">
          <span className="text-sm font-semibold text-text-primary">Issue Tracker</span>
          <span className="text-[11px] text-text-tertiary">ServiceNow</span>
        </span>
        <span className="ml-auto text-text-tertiary">
          <Glyph d="chevron" className="h-4 w-4 -rotate-90" />
        </span>
      </span>
      <Chip tone="warn">
        <StatusIcon tone="warn" className="h-3 w-3" />
        Maintenance Sat, 2 to 4 AM
      </Chip>
      <span className="text-xs text-text-secondary">Log control issues and track each one to closure.</span>
      <span className="flex w-fit items-center gap-1 rounded-[4px] bg-[color-mix(in_oklab,var(--interactive-default)_10%,var(--surface-raised))] px-3 py-1.5 text-xs font-semibold text-text-accent">
        Launch
        <Glyph d="arrow" className="h-3 w-3" />
      </span>
    </div>
  );
}

function SummaryComponent() {
  const parts = [
    { label: "Up", value: 13, tone: "text-status-success", mark: "up" },
    { label: "Maintenance", value: 2, tone: "text-status-warning", mark: "warn" },
    { label: "Down", value: 1, tone: "text-status-danger", mark: "down" },
  ] as const;
  const total = parts.reduce((a, p) => a + p.value, 0);
  const r = 26;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="flex items-center gap-4">
      <span className="relative shrink-0">
        <svg viewBox="0 0 72 72" className="h-20 w-20 -rotate-90">
          {parts.map((p) => {
            const len = (p.value / total) * c;
            const el = (
              <circle key={p.label} cx="36" cy="36" r={r} fill="none" strokeWidth="10" stroke="currentColor" className={p.tone} strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-offset} />
            );
            offset += len;
            return el;
          })}
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-text-primary">{total}</span>
      </span>
      <span className="flex flex-col gap-1.5">
        {parts.map((p) => (
          <span key={p.label} className="flex items-center gap-2 text-xs text-text-secondary">
            <StatusIcon tone={p.mark} />
            <b className="font-semibold text-text-primary">{p.value}</b> {p.label}
          </span>
        ))}
      </span>
    </div>
  );
}

function UpcomingComponent() {
  const rows = [
    ["Sat", "14", "Issue Tracker maintenance", "2:00 to 4:00 AM"],
    ["Tue", "17", "Release notes published", "9:00 AM"],
  ];
  return (
    <div className="flex flex-col gap-2">
      {rows.map(([d, n, t, h]) => (
        <span key={t} className="flex items-center gap-3">
          <span className="flex w-9 flex-col items-center rounded-[6px] bg-[color-mix(in_oklab,var(--interactive-default)_12%,var(--surface-raised))] py-1 leading-tight">
            <span className="text-[10px] text-text-secondary">{d}</span>
            <span className="text-sm font-semibold text-text-accent">{n}</span>
          </span>
          <span className="flex flex-col text-xs">
            <span className="font-medium text-text-primary">{t}</span>
            <span className="text-text-tertiary">{h}</span>
          </span>
        </span>
      ))}
    </div>
  );
}

function StepsComponent() {
  const steps = [
    ["Choose application", "done"],
    ["Describe the issue", "done"],
    ["Review and send", "current"],
  ] as const;
  return (
    <div className="flex flex-col gap-2">
      {steps.map(([label, state]) => (
        <span key={label} className="flex items-center gap-2.5 text-xs">
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
              state === "done" ? "bg-interactive text-interactive-on" : "border-2 border-interactive bg-surface-raised"
            }`}
          >
            {state === "done" ? "✓" : ""}
          </span>
          <span className={state === "current" ? "font-medium text-text-primary" : "text-text-secondary"}>{label}</span>
        </span>
      ))}
    </div>
  );
}

/* One line each, with the mark large enough to read at a glance
   (Alejandro, November 2026) */
function ToastComponent() {
  /* The text takes the dark of its own color, like the notice in the hub */
  const row = "flex items-center gap-2.5 rounded-[8px] px-3 py-2.5 text-xs font-medium whitespace-nowrap";
  return (
    <div className="flex flex-col gap-2">
      <span className={`${row} bg-[color-mix(in_oklab,var(--status-success)_14%,var(--surface-raised))] text-text-success`}>
        <StatusIcon tone="up" className="h-5 w-5" />
        Incident report sent
      </span>
      <span className={`${row} bg-[color-mix(in_oklab,var(--status-danger)_12%,var(--surface-raised))] text-text-danger`}>
        <StatusIcon tone="down" className="h-5 w-5" />
        Not sent. Try again.
      </span>
    </div>
  );
}

function FeedbackComponent() {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-xs text-text-secondary">How useful was this page?</span>
      <span className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${
              n === 4 ? "bg-interactive text-interactive-on" : "bg-surface-sunken text-text-secondary"
            }`}
          >
            {n}
          </span>
        ))}
      </span>
      <span className="h-10 rounded-sm border border-border-default px-2 py-1.5 text-[11px] text-text-tertiary">Anything to add?</span>
    </div>
  );
}

export function MoodBoard() {
  return (
    <div
      role="img"
      aria-label="A mood board, recreated with invented content and broken down from atoms to components. Atoms: a color set (action blue, up green, notice amber, down red, ink, ground), a type specimen, three buttons, status chips (up, maintenance, down, in progress, draft), a row of icons, and inputs (a search field, checkboxes, a toggle). Components: a maintenance banner and an announcement, an application card with its status, a ring chart of applications up, in maintenance and down, a list of what is coming up, three steps of a request, success and error toasts, and a short feedback form."
      className="@container h-full w-full"
    >
      {/* In the hub's own look, the same palette and system type as the
          screens it became, so the board and the high fidelity read as one
          product (Alejandro, November 2026) */}
      <div
        data-scheme="light"
        style={MOOD_SKIN}
        className="grid grid-flow-dense grid-cols-2 gap-3 bg-surface-sunken p-3 text-text-primary sm:p-6 @md:grid-flow-row @3xl:grid-cols-6 [&_.font-label]:[font-family:inherit] [&_.font-sans]:[font-family:inherit]"
      >
        <Tile tier="Atom" name="Color"><ColorAtom /></Tile>
        <Tile tier="Atom" name="Type" span="col-span-1 @3xl:col-span-2"><TypeAtom /></Tile>
        <Tile tier="Atom" name="Buttons"><ButtonAtom /></Tile>
        <Tile tier="Atom" name="Status"><StatusAtom /></Tile>
        <Tile tier="Atom" name="Icons" span="col-span-1 @3xl:col-span-2"><IconAtom /></Tile>
        <Tile tier="Atom" name="Inputs"><InputAtom /></Tile>
        <Tile tier="Component" name="Banner" span="col-span-2 @3xl:col-span-4"><BannerComponent /></Tile>
        <Tile tier="Component" name="Toasts" wideOnly><ToastComponent /></Tile>
        <Tile tier="Component" name="Card"><CardComponent /></Tile>
        <Tile tier="Component" name="Summary" wideOnly><SummaryComponent /></Tile>
        <Tile tier="Component" name="Coming up" wideOnly><UpcomingComponent /></Tile>
        <Tile tier="Component" name="Steps" wideOnly><StepsComponent /></Tile>
        <Tile tier="Component" name="Feedback"><FeedbackComponent /></Tile>
        <Tile tier="Component" name="Tabs" wideOnly span="col-span-2">
          <span className="flex gap-4 border-b border-border-subtle text-xs text-text-secondary">
            <span className="border-b-2 border-interactive pb-1.5 font-medium text-text-primary">All</span>
            <span className="pb-1.5">Salesforce</span>
            <span className="pb-1.5">ServiceNow</span>
            <span className="pb-1.5">React</span>
          </span>
          <span className="text-[11px] text-text-tertiary">Showing 16 applications</span>
        </Tile>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   From sketch to screen: the three stages the hub went through, in order
   (Alejandro, November 2026: show the progress from sketches, to black and
   white, to high fidelity).

   The sketches are the one exception to "drawn for this site": they are
   Alejandro's own pen sketches from 2022, from his earlier portfolio, with
   the product's name taken out of the five frames that showed it, and each
   page of two cut into single sketches. No screen,
   no data and no one's name but his own ("Welcome, Alejandro" in one frame).
   The grayscale rough and the high fidelity are recreated with invented
   content, like every other screen in this study. */

const SKETCHES: GalleryItem[] = [
  { src: sketch1, label: "Home 1", alt: "A home page with a header across the top, a profile column on the left with quick links, tips and newsletter announcements, and application cards on the right." },
  { src: sketch2, label: "Home 2", alt: "A home page with a welcome header, application cards in titled sections, and a feedback bar at the foot." },
  { src: sketch3, label: "Home 3", alt: "A home page with navigation down the left and titled cards in a grid, to preview each application before launching it." },
  { src: sketch4, label: "Home 4", alt: "A home page with navigation down the left and a single list of applications, each with a Launch button at the far right." },
  { src: sketch5, label: "Details 1", alt: "An application's details in a modal over the home page: alerts, a description, alert history, and Updates and Launch buttons." },
  { src: sketch6, label: "Details 2", alt: "A second modal for an application's details, adding who owns it, with Updates and Launch buttons." },
  { src: sketch7, label: "Details 3", alt: "A third modal, with navigation down the left: the application's name, an alert, an about section and Launch." },
  { src: sketch8, label: "Details 4", alt: "A dropdown concept that opens several applications' details at once, noted as busy and crowded." },
  { src: sketch9, label: "Notifications 1", alt: "Notifications with filters for each application across the top and rows of alerts below." },
  { src: sketch10, label: "Notifications 2", alt: "Notifications with a search and filter column on the left and collapsible rows of alerts on the right." },
  { src: sketch11, label: "Notifications 3", alt: "Alerts with navigation down the left, filtered by type, with a history and a search bar." },
  { src: sketch12, label: "Notifications 4", alt: "A notifications page with a search and filter panel on the right and collapsible rows." },
];

/* Twelve sketches, four of each screen, three columns of four on a wide
   frame, one screen to a column: home, an application's details,
   notifications. Each opens larger (Alejandro, November 2026). */
export function SketchSheet() {
  return (
    <ImageGallery items={SKETCHES} label="My first sketches" ratio="16/9" columns={3} rows={4} />
  );
}

const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.";
const LOREM_SHORT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

const WIRE_MINE: [string, string][] = [
  ["Policy Library", "Find and cite the current policies and standards."],
  ["Issue Tracker", "Log control issues and track them to closure."],
  ["Risk Assessments", "Score and review risk by business area."],
  ["Control Testing", "Plan tests and record results for each control."],
  ["Incident Reporting", LOREM],
  ["Regulatory Updates", LOREM],
];

const WIRE_OTHER = [
  "Audit Workpapers",
  "Vendor Risk",
  "Compliance Training",
  "Exam Management",
  "Quality Reviews",
  "Change Requests",
  "Attestations",
];

/* The grayscale roughs, recreated. Each is an artboard on a design tool's
   canvas, named as the tool shows it, drawn at 1100 and scaled to fit. Ink
   and paper are the theme's own roles, and every artboard is also drawn
   through a grayscale filter so nothing in it can carry a hue. Modeled on
   the real roughs' structure; every name, date and line is invented. */
const ink = "var(--wire-ink)";

/* Softer than a finished screen (Alejandro, November 2026: lower the
   fidelity a step). The bar and buttons are a dark gray rather than black,
   the outlines and gray fills are lighter, and repeated copy is drawn as
   gray lines, the way the sketches draw it. Titles and labels stay as words
   so the structure still reads. */
const WIRE_SKIN = {
  "--wire-ink": "oklch(34% 0 0)",
  "--text-primary": "oklch(30% 0 0)",
  "--text-secondary": "oklch(50% 0 0)",
  "--text-tertiary": "oklch(60% 0 0)",
  "--border-strong": "oklch(74% 0 0)",
  "--border-default": "oklch(85% 0 0)",
  "--surface-sunken": "oklch(95.5% 0 0)",
} as CSSProperties;

function Bars({ lines = 2 }: { lines?: number }) {
  const widths = ["92%", "64%"];
  return (
    <span className="flex flex-col gap-1.5 py-0.5">
      {Array.from({ length: lines }, (_, i) => (
        <span key={i} className="block h-1.5 rounded-full bg-border-default" style={{ width: widths[i % widths.length] }} />
      ))}
    </span>
  );
}

/* Placeholder copy becomes gray lines; real words stay words */
/* Placeholder copy is drawn as gray lines, the way the sketches draw it,
   always in one pattern: a full line over a shorter one, or one line where
   a row holds a single line (Alejandro, November 2026). Every real heading
   and line of body text stays as words. */
const say = (t: string, lines = 2) => (t === LOREM || t === LOREM_SHORT ? <Bars lines={lines} /> : t);
const W = 1100;

function Artboard({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div data-scheme="light" data-artboard={name} className="bg-surface-sunken p-10" style={{ width: W }}>
      {/* No artboard name above the screen (Alejandro, November 2026); it
          stays on the element for anyone inspecting it */}
      <div style={WIRE_SKIN} className="relative min-h-[720px] overflow-hidden border border-border-default bg-surface-raised text-text-primary shadow-[var(--shadow-chip)] [filter:grayscale(1)]">
        {children}
      </div>
    </div>
  );
}

function WireTopBar({ active = "Home" }: { active?: string }) {
  return (
    <div className="flex items-center gap-3 px-6 py-3" style={{ background: ink }}>
      <span className="h-4 w-4 rounded-[2px] bg-surface-raised" />
      <span className="font-label text-sm font-semibold uppercase tracking-[0.14em] text-surface-raised">GRC Connect</span>
      <span className="ml-auto flex items-center gap-6 text-xs font-medium text-surface-raised">
        {["Home", "Feedback"].map((t) => (
          <span key={t} className={t === active ? "border-b-2 border-surface-raised pb-0.5" : "pb-0.5 opacity-70"}>
            {t}
          </span>
        ))}
      </span>
      <span className="ml-3 h-4 w-4 rounded-full border-2 border-surface-raised" />
      <span className="ml-2 h-7 w-7 rounded-full border-2 border-surface-raised bg-border-strong" />
    </div>
  );
}

function WireAvatar({ size = "h-12 w-12" }: { size?: string }) {
  return (
    <span className={`grid ${size} shrink-0 place-items-center rounded-full bg-border-default`}>
      <svg viewBox="0 0 24 24" className="h-3/5 w-3/5 text-text-tertiary" fill="currentColor" aria-hidden="true">
        <circle cx="12" cy="9" r="4" />
        <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7z" />
      </svg>
    </span>
  );
}

function WireButton({ children, solid = false }: { children: ReactNode; solid?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-[3px] px-4 py-1.5 text-[11px] font-semibold ${
        solid ? "text-surface-raised" : "border border-border-strong text-text-primary"
      }`}
      style={solid ? { background: ink } : undefined}
    >
      {children}
    </span>
  );
}

function WirePill({ children, solid = false }: { children: ReactNode; solid?: boolean }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
        solid ? "text-surface-raised" : "border border-border-strong text-text-primary"
      }`}
      style={solid ? { background: ink } : undefined}
    >
      {children}
    </span>
  );
}

function Maintenance() {
  return (
    <span className="flex items-center gap-3 rounded-[3px] border border-border-strong px-3 py-2 text-[11px] text-text-primary">
      <span className="rounded-[3px] px-2 py-0.5 font-semibold text-surface-raised" style={{ background: ink }}>
        Maintenance (2)
      </span>
      <span>
        <b className="font-semibold">Issue Tracker:</b> Sat 2:00 to 4:00 AM ·{" "}
        <b className="font-semibold">Policy Library:</b> Sun 6:00 to 8:00 PM
      </span>
      <span className="font-semibold underline underline-offset-2">Read more</span>
      <span className="ml-auto text-sm leading-none">×</span>
    </span>
  );
}

function WireCard({ name, text, other = false }: { name: string; text: string; other?: boolean }) {
  return (
    <span
      className={`flex min-h-[8.5rem] flex-col rounded-[3px] border border-border-strong p-3 ${
        other ? "bg-surface-sunken" : "bg-surface-raised"
      }`}
    >
      <span className="text-xs font-semibold leading-snug text-text-primary">{name}</span>
      <span className="mt-1.5 text-[11px] leading-snug text-text-secondary">{say(text)}</span>
      <span className="mt-auto flex items-center justify-between pt-3 text-[11px] font-semibold text-text-primary">
        Launch
        <span className="tracking-[0.2em]">•••</span>
      </span>
    </span>
  );
}

function AppSections({ cols = 4 }: { cols?: 3 | 4 }) {
  const grid = cols === 3 ? "grid-cols-3" : "grid-cols-4";
  return (
    <>
      <span className="flex flex-col gap-3 rounded-[3px] border border-border-strong p-4">
        <span className="text-sm font-semibold text-text-primary">
          Applications <span className="font-normal text-text-secondary">(My access)</span>
        </span>
        <span className={`grid gap-3 ${grid}`}>
          {WIRE_MINE.map(([n, t]) => (
            <WireCard key={n} name={n} text={t} />
          ))}
        </span>
      </span>
      <span className="flex flex-col gap-3 rounded-[3px] border border-border-strong p-4">
        <span className="text-sm font-semibold text-text-primary">
          Other applications <span className="font-normal text-text-secondary">(Requires access)</span>
        </span>
        <span className={`grid gap-3 ${grid}`}>
          {WIRE_OTHER.slice(0, cols === 3 ? 6 : 7).map((n) => (
            <WireCard key={n} name={n} text={LOREM} other />
          ))}
        </span>
      </span>
    </>
  );
}

function FeedbackBar() {
  return (
    <div className="flex items-center gap-4 border-t border-border-strong bg-surface-sunken px-14 py-3 text-[11px] text-text-secondary">
      <WireButton solid>Feedback</WireButton>
      If you feel there are areas of improvement, please fill out the feedback form.
    </div>
  );
}

/* 1. The first home: navigation in a dark column down the left */
function WireHomeSide() {
  return (
    <div className="flex">
      <div className="flex w-44 shrink-0 flex-col items-center gap-3 px-4 py-5 text-surface-raised" style={{ background: ink }}>
        <span className="font-label text-xs font-semibold uppercase tracking-[0.14em]">GRC Connect</span>
        <span className="mt-3">
          <WireAvatar size="h-14 w-14" />
        </span>
        <span className="text-center text-sm font-semibold">Welcome, Jordan!</span>
        <span className="mt-4 flex w-full flex-col gap-1 text-[11px]">
          {["Home", "Notifications", "Navigation 3"].map((t, i) => (
            <span key={t} className={`flex items-center gap-2 rounded-[3px] px-2 py-1.5 ${i === 0 ? "bg-[color-mix(in_oklab,var(--surface-raised)_18%,transparent)]" : "opacity-75"}`}>
              <span className="h-2.5 w-2.5 rounded-full border border-current" />
              {t}
            </span>
          ))}
        </span>
        <span className="mt-auto rounded-[3px] bg-surface-raised px-4 py-1.5 text-[11px] font-semibold text-text-primary">Feedback</span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-4 p-5">
        <Maintenance />
        <span className="grid grid-cols-4 rounded-[3px] border border-border-strong text-[11px]">
          {[
            ["Application roles", "Risk and compliance, connecting people, processes and platforms."],
            ["Resources", "Wiki link 1 · Wiki link 2"],
            ["Header 2", LOREM_SHORT],
            ["Header 3", LOREM_SHORT],
          ].map(([h, t], i) => (
            <span key={h} className={`flex flex-col gap-1 p-3 ${i < 3 ? "border-r border-border-strong" : ""}`}>
              <span className="font-semibold text-text-primary">{h}</span>
              <span className="text-text-secondary">{say(t)}</span>
            </span>
          ))}
        </span>
        <AppSections />
      </div>
    </div>
  );
}

/* 2. The home users preferred: a header across the top, a welcome row */
function WireHomeTop() {
  return (
    <>
      <WireTopBar />
      <div className="flex flex-col gap-4 px-14 py-5">
        <Maintenance />
        <span className="grid grid-cols-[1.3fr_1fr_1fr_1fr] rounded-[3px] border border-border-strong text-[11px]">
          <span className="flex items-center gap-3 border-r border-border-strong p-4">
            <WireAvatar />
            <span className="text-base font-semibold text-text-primary">Welcome, Jordan!</span>
          </span>
          <span className="flex flex-col gap-1 border-r border-border-strong p-4">
            <span className="font-semibold text-text-primary">Application roles</span>
            <span className="text-text-secondary">Risk and compliance, connecting people, processes and platforms.</span>
          </span>
          <span className="flex flex-col gap-1 border-r border-border-strong p-4">
            <span className="font-semibold text-text-primary">Resources</span>
            {["Wiki link 1", "Wiki link 2", "Wiki link 3"].map((l) => (
              <span key={l} className="flex justify-between text-text-secondary">
                {l}
                <span>›</span>
              </span>
            ))}
          </span>
          <span className="flex flex-col gap-1 p-4">
            <span className="font-semibold text-text-primary">Header 3</span>
            <Bars />
          </span>
        </span>
        <AppSections />
      </div>
      <FeedbackBar />
    </>
  );
}

/* 3. One application's details, in a modal over the home */
function WireDetails() {
  return (
    <div className="relative">
      <WireHomeTop />
      <div className="absolute inset-0 grid place-items-start justify-center bg-[color-mix(in_oklab,var(--text-primary)_45%,transparent)] pt-24">
        <div className="w-[34rem] rounded-[4px] border border-border-strong bg-surface-raised shadow-[var(--shadow-dialog)]">
          <div className="flex items-center justify-between border-b border-border-strong px-5 py-3">
            <span className="text-base font-semibold text-text-primary">Policy Library</span>
            <span className="text-lg leading-none text-text-primary">×</span>
          </div>
          <div className="flex flex-col gap-2 border-b border-border-strong bg-surface-sunken px-5 py-3 text-[11px] text-text-primary">
            <span className="flex items-center gap-3">
              <WirePill>Maintenance</WirePill>
              <span>
                <b className="font-semibold">Sun 6:00 to 8:00 PM.</b> Down for scheduled changes during the evening.
              </span>
            </span>
            <span className="flex items-center gap-3">
              <WirePill solid>Update</WirePill>
              <span>
                <b className="font-semibold">New search filters.</b> Find a policy by business area.
              </span>
            </span>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 px-5 py-4 text-[11px]">
            {[
              ["Your access", "Editor, Compliance analyst"],
              ["Application owner", "Riley Morgan, Technology"],
              ["Business owner", "Sam Ortiz, Policy Office"],
              ["Category", "Governance"],
            ].map(([k, v]) => (
              <span key={k} className="flex flex-col gap-0.5">
                <span className="font-semibold text-text-primary">{k}</span>
                <span className="text-text-secondary">{v}</span>
              </span>
            ))}
            <span className="col-span-2 flex flex-col gap-0.5">
              <span className="font-semibold text-text-primary">Description</span>
              <span className="text-text-secondary">
                The current policies and standards in one place, to find, cite and attest to.
                <Bars />
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2 border-t border-border-strong px-5 py-3">
            <WireButton>Documentation</WireButton>
            <WireButton>See past updates</WireButton>
            <span className="ml-auto">
              <WireButton solid>Launch app</WireButton>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 4. Notifications: filter by application, alerts grouped by kind */
function WireNotifications() {
  const groups: [string, number, boolean, [string, string][]][] = [
    ["Maintenance", 3, false, [["Issue Tracker: Sat 2:00 to 4:00 AM", LOREM_SHORT], ["Policy Library: Sun 6:00 to 8:00 PM", LOREM_SHORT], ["Control Testing: Tue 9:00 to 11:00 PM", LOREM_SHORT]]],
    ["Issues", 2, true, [["Risk Assessments: Slow to load", LOREM_SHORT], ["Incident Reporting: Header name", LOREM_SHORT]]],
    ["Updates", 2, false, [["Policy Library: New search filters", LOREM_SHORT], ["Regulatory Updates: Header name", LOREM_SHORT]]],
  ];
  return (
    <>
      <WireTopBar />
      <div className="flex flex-col gap-1 px-14 pt-6 pb-10">
        <span className="text-lg font-semibold text-text-primary">Notifications</span>
        <span className="text-[11px] font-semibold text-text-primary">‹ Go back to Home</span>
        <div className="mt-4 flex items-start gap-5">
          <div className="flex w-60 shrink-0 flex-col gap-3">
            <span className="rounded-[3px] border border-border-strong px-3 py-1.5 text-[11px] text-text-tertiary">⌕ Search notifications</span>
            <span className="flex flex-col gap-2 rounded-[3px] border border-border-strong p-3 text-[11px] text-text-primary">
              <span className="font-semibold">Filter notifications</span>
              <span className="flex items-center gap-2">
                <span className="grid h-3.5 w-3.5 place-items-center rounded-[2px] text-[9px] text-surface-raised" style={{ background: ink }}>✓</span>
                Show all
              </span>
              <span className="border-t border-border-default" />
              {["Policy Library", "Issue Tracker", "Risk Assessments", "Control Testing", "Incident Reporting", "Regulatory Updates"].map((n) => (
                <span key={n} className="flex items-center gap-2 text-text-secondary">
                  <span className="h-3.5 w-3.5 rounded-[2px] border border-border-strong" />
                  {n}
                </span>
              ))}
              <span className="mt-1">
                <WireButton solid>Apply filter</WireButton>
              </span>
            </span>
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="flex text-[11px] font-semibold text-text-primary">
              <span className="border-x border-t border-border-strong px-3 py-1.5">Active (7)</span>
              <span className="border-b border-border-strong px-3 py-1.5 text-text-secondary">Past updates (12)</span>
              <span className="flex-1 border-b border-border-strong" />
            </span>
            <span className="flex flex-col border-x border-b border-border-strong text-[11px]">
              <span className="px-3 py-2 font-semibold text-text-primary">Expand all | Close all</span>
              {groups.map(([g, n, solid, rows]) => (
                <span key={g} className="flex flex-col">
                  <span className="flex items-center gap-2 border-t border-border-strong px-3 py-1.5">
                    <span className="text-text-primary">⌃</span>
                    <WirePill solid={solid}>{`${g} (${n})`}</WirePill>
                  </span>
                  {rows.map(([h, t]) => (
                    <span key={h} className="flex flex-col gap-0.5 border-t border-border-default px-3 py-2">
                      <span className="font-semibold text-text-primary">{h}</span>
                      <span className="text-text-secondary">{say(t, 1)}</span>
                    </span>
                  ))}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

/* 5. Feedback: the log of what a person has sent */
function WireFeedbackLog() {
  return (
    <>
      <WireTopBar active="Feedback" />
      <div className="flex flex-col gap-1 px-14 pt-6 pb-16">
        <span className="flex items-end justify-between">
          <span className="flex flex-col gap-1">
            <span className="text-lg font-semibold text-text-primary">Feedback log</span>
            <span className="text-[11px] font-semibold text-text-primary">‹ Go back to Home</span>
          </span>
          <span className="flex gap-2">
            <WireButton>Download data</WireButton>
            <WireButton solid>Add new</WireButton>
          </span>
        </span>
        <span className="mt-4 flex flex-col rounded-[3px] border border-border-strong text-[11px]">
          <span className="grid grid-cols-[2rem_4rem_8rem_1fr_7rem] gap-3 border-b border-border-strong bg-surface-sunken px-3 py-2 font-semibold text-text-primary">
            <span className="h-3.5 w-3.5 rounded-[2px] border border-border-strong" />
            <span>ID</span>
            <span>Date</span>
            <span>Description</span>
            <span>Status</span>
          </span>
          {[
            ["0004", "4 hours ago", "Search should include docs, not only applications.", "Received"],
            ["0003", "Oct 18, 2022", "The maintenance banner was easy to miss on a small screen.", "In review"],
            ["0002", "Oct 11, 2022", LOREM_SHORT, "Complete"],
            ["0001", "Oct 3, 2022", LOREM_SHORT, "Draft"],
          ].map(([id, d, t, st]) => (
            <span key={id} className="grid grid-cols-[2rem_4rem_8rem_1fr_7rem] items-center gap-3 border-b border-border-default px-3 py-2.5 text-text-secondary last:border-b-0">
              <span className="h-3.5 w-3.5 rounded-[2px] border border-border-strong" />
              <span className="text-text-primary">{id}</span>
              <span>{d}</span>
              <span>{say(t, 1)}</span>
              <span className="font-semibold text-text-primary">{st}</span>
            </span>
          ))}
        </span>
      </div>
    </>
  );
}

/* 6. Feedback: the form, in four steps, with its errors shown */
function WireFeedbackForm() {
  const steps = ["General questions", "Application satisfaction", "Tool usage", "Additional comments"];
  const required = (
    <span className="flex items-center gap-1.5 text-[10px] text-text-primary">
      <span className="grid h-3.5 w-3.5 rotate-45 place-items-center text-surface-raised" style={{ background: ink }}>
        <span className="-rotate-45 text-[8px] font-bold">!</span>
      </span>
      Response is required
    </span>
  );
  return (
    <>
      <WireTopBar active="Feedback" />
      <div className="flex flex-col gap-1 px-14 pt-6 pb-10">
        <span className="text-lg font-semibold text-text-primary">Feedback form</span>
        <span className="text-[11px] font-semibold text-text-primary">‹ Go back to Feedback log</span>
        <span className="mt-4 flex flex-col gap-2 rounded-[3px] border border-border-strong px-4 pt-3 pb-4">
          <span className="grid grid-cols-4 text-center text-[11px] font-semibold text-text-primary">
            {steps.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </span>
          <span className="relative h-1.5 rounded-full bg-border-default">
            <span className="absolute inset-y-0 left-0 w-[12%] rounded-full" style={{ background: ink }} />
          </span>
        </span>
        <span className="mt-3 flex flex-col gap-3 rounded-[3px] border border-border-strong p-4 text-[11px] text-text-primary">
          <span className="text-sm font-semibold">General questions</span>
          {["Select your role", "Select an application"].map((q) => (
            <span key={q} className="flex flex-col gap-1.5">
              <span className="font-semibold">{q}</span>
              <span className="flex w-56 items-center justify-between rounded-[3px] border-2 border-border-strong px-2 py-1.5 text-text-tertiary">
                Select
                <span>⌄</span>
              </span>
              {required}
            </span>
          ))}
          <span className="flex flex-col gap-1.5">
            <span className="font-semibold">How well does the selected application help you do your role?</span>
            <span className="text-text-secondary">Scale: 1 = Not well at all, 5 = Extremely well</span>
            <span className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <span key={n} className="grid h-8 w-14 place-items-center rounded-[3px] border-2 border-border-strong">
                  {n}
                </span>
              ))}
            </span>
            {required}
          </span>
        </span>
        <span className="mt-3 flex items-center gap-2">
          <WireButton>‹ Previous</WireButton>
          <WireButton>Save for later</WireButton>
          <span className="ml-auto">
            <WireButton solid>Next ›</WireButton>
          </span>
        </span>
      </div>
    </>
  );
}

const ROUGHS: { label: string; name: string; alt: string; screen: ReactNode }[] = [
  {
    label: "Home, side navigation",
    name: "Home · Lo-fi 01",
    alt: "The first home rough: a dark column down the left with the product name, a placeholder avatar, a welcome and navigation, then a maintenance notice, a row of resources and the two sections of application cards.",
    screen: <WireHomeSide />,
  },
  {
    label: "Home, top header",
    name: "Home · Lo-fi 04",
    alt: "The home users preferred: a black header, a maintenance notice, a welcome row with roles and resources, the applications a person can open, the ones they would request in gray, and a feedback bar at the foot.",
    screen: <WireHomeTop />,
  },
  {
    label: "Application details",
    name: "Modal · Lo-fi 02",
    alt: "One application's details in a modal over the home: a maintenance window and an update, the person's access, the owners, the category and a description, with Documentation, See past updates and Launch app.",
    screen: <WireDetails />,
  },
  {
    label: "Notifications",
    name: "Notifications · Lo-fi 02",
    alt: "Notifications: a search and a filter by application on the left; on the right, Active and Past updates tabs and alerts grouped into maintenance, issues and updates.",
    screen: <WireNotifications />,
  },
  {
    label: "Feedback log",
    name: "Feedback · Lo-fi 01",
    alt: "The feedback log: a table of what a person has sent, with an ID, a date, a description and a status, and buttons to download the data or add new feedback.",
    screen: <WireFeedbackLog />,
  },
  {
    label: "Feedback form",
    name: "Feedback · Lo-fi 03",
    alt: "The feedback form in four steps, on the first: two selects and a one to five scale, each marked Response is required, with Previous, Save for later and Next.",
    screen: <WireFeedbackForm />,
  },
];

/* Six roughs in a grid, each opening larger (Alejandro, November 2026: show
   the other roughs, not only the home). */
export function WireframeMock() {
  return (
    <ImageGallery
      label="The grayscale roughs"
      columns={3}
      ratio="4/3"
      items={ROUGHS.map((r) => ({
        label: r.label,
        alt: `${r.alt} Recreated with invented content.`,
        width: W,
        node: <Artboard name={r.name}>{r.screen}</Artboard>,
      }))}
    />
  );
}

/* --------------------------------------------------------------------------
   High fidelity, in a gallery like the roughs (Alejandro, November 2026:
   bring in the colored designs, then make them as close as possible to the
   real ones). These follow the real high fidelity set screen for screen and
   region for region: the dark bar with Home and Feedback, the three alert
   banners stacked across the top, the welcome column, recently viewed, the
   applications a person can open and the gray ones they would request,
   each card with View Details and Launch, the details modal, notifications
   with its filter and grouped alerts, the feedback log, and the feedback
   form on Tool usage and with its errors showing.

   What is not real: every application name, person, date and line of copy,
   the product's name (Hub), the mark, and the palette, which is an invented
   navy and blue rather than the employer's brand. No photo stands in for a
   person; the avatars are drawn. */

/* The small icons in the real set, drawn as vectors on one 16-unit grid so
   each sits centered in its box, rather than as text glyphs, which ride on
   the font's baseline and land off center (Alejandro, November 2026). */
const RI = {
  close: <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />,
  down: <path d="M4.5 6.5 8 10l3.5-3.5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />,
  up: <path d="M4.5 9.5 8 6l3.5 3.5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />,
  right: <path d="M6.5 4.5 10 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />,
  left: <path d="M9.5 4.5 6 8l3.5 3.5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />,
  kebab: (
    <g fill="currentColor">
      <circle cx="8" cy="3.5" r="1.3" />
      <circle cx="8" cy="8" r="1.3" />
      <circle cx="8" cy="12.5" r="1.3" />
    </g>
  ),
  more: (
    <g fill="currentColor">
      <circle cx="3.5" cy="8" r="1.3" />
      <circle cx="8" cy="8" r="1.3" />
      <circle cx="12.5" cy="8" r="1.3" />
    </g>
  ),
  /* A comment waiting on the item: a filled speech bubble */
  comment: (
    <>
      <path d="M2.5 3.2c0-.7.5-1.2 1.2-1.2h8.6c.7 0 1.2.5 1.2 1.2v6.6c0 .7-.5 1.2-1.2 1.2H7.2L4.4 13.6V11h-.7c-.7 0-1.2-.5-1.2-1.2z" fill="currentColor" />
      <path d="M5.2 5.4h5.6M5.2 7.6h3.6" stroke="white" strokeWidth={1.1} strokeLinecap="round" />
    </>
  ),
  /* The error mark: a diamond with the exclamation drawn inside it */
  error: (
    <>
      <path d="M8 1.2 14.8 8 8 14.8 1.2 8z" fill="var(--real-red)" />
      <path d="M8 4.6v4.2" stroke="white" strokeWidth={1.7} strokeLinecap="round" />
      <circle cx="8" cy="11.2" r="1" fill="white" />
    </>
  ),
} as const;

function RIcon({ i, className = "h-3.5 w-3.5" }: { i: keyof typeof RI; className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`shrink-0 ${className}`} aria-hidden="true">
      {RI[i]}
    </svg>
  );
}

const HI_W = 1160;
const SCREEN_W = 1100;

/* The real set's look, scoped to the screen, on top of the hub's skin */
const REAL_SKIN = {
  ...HUB_SKIN,
  "--hub-bar": "oklch(36% 0.105 257)",
  "--hub-on-bar": "oklch(99% 0 0)",
  "--hub-on-bar-muted": "oklch(88% 0.025 256)",
  "--real-link": "oklch(52% 0.16 256)",
  "--real-action": "oklch(54% 0.17 256)",
  "--real-red": "oklch(61% 0.19 25)",
  "--real-green": "oklch(68% 0.16 150)",
  "--real-off": "oklch(93.8% 0.003 250)",
  "--real-line": "oklch(88% 0.006 250)",
  "--surface-page": "oklch(100% 0 0)",
} as CSSProperties;

/* The mood board in the same look: the hub's palette, with the status
   colors taken from the real set's red, green and amber, deepened where
   they carry text so it stays readable. */
const MOOD_SKIN = {
  ...REAL_SKIN,
  "--surface-page": "oklch(97.4% 0.004 250)",
  "--surface-sunken": "oklch(95.6% 0.006 250)",
  "--interactive-default": "oklch(54% 0.17 256)",
  "--interactive-on": "oklch(100% 0 0)",
  "--status-success": "oklch(62% 0.16 150)",
  "--status-warning": "oklch(70% 0.15 75)",
  "--status-danger": "oklch(59% 0.2 25)",
  "--text-success": "oklch(45% 0.13 150)",
  "--text-danger": "oklch(48% 0.18 25)",
} as CSSProperties;

const cardShadow = "shadow-[0_1px_3px_color-mix(in_oklab,var(--shadow-ink)_14%,transparent)]";
const link = "text-[var(--real-link)]";

function HiFrame({ children, address, tab }: { children: ReactNode; address: string; tab: string }) {
  return (
    <div data-scheme="light" className="bg-surface-sunken p-[30px]" style={{ width: HI_W }}>
      <RecreatedScreen address={address} tab={tab} width={SCREEN_W}>
        <div style={REAL_SKIN} className="min-h-[760px] bg-surface-page text-text-primary [&_.font-label]:[font-family:inherit]">
          {children}
        </div>
      </RecreatedScreen>
    </div>
  );
}

function Avatar({ size = "h-7 w-7" }: { size?: string }) {
  return (
    <span className={`grid ${size} shrink-0 place-items-center overflow-hidden rounded-full bg-[oklch(86%_0.03_250)]`}>
      <svg viewBox="0 0 24 24" className="mt-[18%] h-full w-full text-[oklch(62%_0.05_255)]" fill="currentColor" aria-hidden="true">
        <circle cx="12" cy="8.5" r="4.2" />
        <path d="M3.5 22c0-4.8 3.8-7.6 8.5-7.6s8.5 2.8 8.5 7.6z" />
      </svg>
    </span>
  );
}

const HIFI: { label: string; alt: string; address: string; tab: string; screen: ReactNode }[] = [
  {
    label: "Dashboard",
    address: "grcconnect.example/dashboard",
    tab: "GRC Connect",
    alt: "The dashboard, in its refined form: search in the bar, one status line for issues, maintenance and updates, a plain welcome column with recently viewed and help, the person's applications as cards that open their details, with Launch and status on the affected ones, and applications available to request, each with Request access.",
    screen: <RedesignDashboard />,
  },
  {
    label: "Application details",
    address: "grcconnect.example/apps/policy-library",
    tab: "GRC Connect",
    alt: "One application's details in a drawer beside the dashboard, its card still outlined: platform and category, a maintenance window, what it is for, access, category and both owners, recent updates with a link to past ones, with Launch and Documentation under the title.",
    screen: <RefinedDetails />,
  },
  {
    label: "Notifications",
    address: "grcconnect.example/notifications",
    tab: "GRC Connect",
    alt: "Notifications: a search and application checkboxes that filter as they are checked; Active and Past updates tabs; alerts grouped into issues, maintenance and updates, each row with the application, when, a line on what is happening and View.",
    screen: <RefinedNotifications />,
  },
  {
    label: "Feedback log",
    address: "grcconnect.example/feedback",
    tab: "GRC Connect",
    alt: "Your feedback: four items with an ID, when they were sent, what they were about and a status (1 reply, In review, Done, Draft), with Download and Share feedback.",
    screen: <RefinedFeedbackLog />,
  },
  {
    label: "Feedback form",
    address: "grcconnect.example/feedback/new",
    tab: "GRC Connect",
    alt: "Share feedback on its third of four steps, Tool usage: progress across the top, two questions side by side, and a grid rating training, demos and communications, with Previous, Save for later and Next.",
    screen: <RefinedFormToolUsage />,
  },
  {
    label: "Feedback form, errors",
    address: "grcconnect.example/feedback/new",
    tab: "GRC Connect",
    alt: "Share feedback after Next was pressed with answers missing: a summary, Answer 3 questions to continue, linking to each, and the two selects and the one to five scale outlined in red, each marked Choose one to continue.",
    screen: <RefinedFormErrors />,
  },
];

export function HiFiGallery() {
  return (
    <ImageGallery
      label="The high fidelity designs"
      columns={3}
      ratio="4/3"
      items={HIFI.map((h) => ({
        label: h.label,
        alt: `${h.alt} Recreated with invented content.`,
        width: HI_W,
        node: (
          <HiFrame address={h.address} tab={h.tab}>
            {h.screen}
          </HiFrame>
        ),
      }))}
    />
  );
}

/* --------------------------------------------------------------------------
   What I'd do now: a redesign, not what shipped (Alejandro, November 2026:
   review the shipped screens as a lead designer, give GRC Connect a homepage
   that explains the whole experience, and show it under What I'd do
   differently). Same product look and invented content as the shipped
   recreations, so the difference reads as design, not as styling.

   The dashboard changes answer the review: one layer of containers (the
   cards), recently viewed as a short list, one status line in place of
   three banners with the status on the affected cards, Launch as the one
   button on a card, search in the bar, and applications to request drawn
   as available rather than disabled, each with its own Request access. */

const CONNECT_APPS: { name: string; purpose: string; platform: string; status?: { tone: "warn" | "down"; text: string } }[] = [
  { name: "Policy Library", purpose: "Find, cite and attest to the current policies and standards.", platform: "Salesforce" },
  { name: "Issue Tracker", purpose: "Log control issues and track each one to closure.", platform: "ServiceNow", status: { tone: "warn", text: "Maintenance Sat, 2 to 4 AM" } },
  { name: "Risk Assessments", purpose: "Score and review risk by business area and owner.", platform: "Salesforce", status: { tone: "down", text: "Slow to load scores" } },
  { name: "Control Testing", purpose: "Plan control tests and record results and sign-offs.", platform: "Salesforce" },
  { name: "Incident Reporting", purpose: "Report an incident and follow it to resolution.", platform: "ServiceNow" },
  { name: "Regulatory Updates", purpose: "Track new rules and who in the business they affect.", platform: "React" },
];

const CONNECT_REQUEST: { name: string; purpose: string; platform: string }[] = [
  { name: "Audit Workpapers", purpose: "Prepare, review and sign off audit evidence.", platform: "Salesforce" },
  { name: "Vendor Risk", purpose: "Assess third parties before and after onboarding.", platform: "React" },
  { name: "Exam Management", purpose: "Coordinate regulator exams and their requests.", platform: "React" },
];

function ConnectBar({ active, search = true }: { active: string; search?: boolean }) {
  return (
    <div className="flex items-center gap-7 bg-[var(--hub-bar)] px-16 py-2.5 text-[var(--hub-on-bar)]">
      <span className="flex items-center gap-2">
        <span className="grid h-5 w-5 grid-cols-2 gap-[2px] rounded-[4px] bg-[color-mix(in_oklab,var(--hub-on-bar)_18%,transparent)] p-[3px]">
          <span className="rounded-[1px] bg-[var(--hub-on-bar)]" />
          <span className="rounded-[1px] bg-[var(--hub-on-bar)] opacity-60" />
          <span className="rounded-[1px] bg-[var(--hub-on-bar)] opacity-60" />
          <span className="rounded-[1px] bg-[var(--hub-on-bar)]" />
        </span>
        <span className="text-[15px] uppercase tracking-[0.08em]">
          <b className="font-bold">GRC</b> Connect
        </span>
      </span>
      <span className="flex items-center gap-6 self-stretch text-[12px]">
        {["Home", "Dashboard", "Notifications", "Feedback"].map((n) => (
          <span
            key={n}
            className={`-my-2.5 flex items-center border-b-2 ${
              n === active ? "border-[var(--hub-on-bar)] font-semibold" : "border-transparent text-[var(--hub-on-bar-muted)]"
            }`}
          >
            {n}
          </span>
        ))}
      </span>
      {search ? (
        <span className="ml-auto flex w-72 items-center gap-2 rounded-[4px] bg-[color-mix(in_oklab,var(--hub-on-bar)_12%,transparent)] px-3 py-1.5 text-[12px] text-[var(--hub-on-bar-muted)]">
          <Glyph d="search" className="h-3.5 w-3.5" />
          Search applications and docs
        </span>
      ) : (
        <span className="ml-auto" />
      )}
      <span className="relative">
        <Glyph d="bell" className="h-5 w-5" />
        <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full border border-[var(--hub-bar)] bg-[var(--real-red)]" />
      </span>
      <Avatar />
    </div>
  );
}

const AMBER = "oklch(70% 0.15 75)";

/* Status by shape as well as color (Alejandro, November 2026): red and amber
   are hard to tell apart for many people with color blindness, so each
   status has its own mark. An issue is a warning triangle, maintenance a
   clock (it is a scheduled window), an update an info circle, done a check. */
function StatusIcon({ tone, className = "h-3.5 w-3.5" }: { tone: "warn" | "down" | "info" | "up"; className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`shrink-0 ${className}`} aria-hidden="true">
      {tone === "down" ? (
        <>
          <path d="M8 1.6c.4 0 .7.2.9.5l6 10.6c.4.7-.1 1.6-.9 1.6H2c-.8 0-1.3-.9-.9-1.6l6-10.6c.2-.3.5-.5.9-.5Z" fill="var(--real-red)" />
          <path d="M8 5.6v3.6" stroke="white" strokeWidth={1.6} strokeLinecap="round" />
          <circle cx="8" cy="11.4" r=".95" fill="white" />
        </>
      ) : tone === "warn" ? (
        <>
          <circle cx="8" cy="8" r="7" fill={AMBER} />
          <path d="M8 4.4V8l2.4 1.6" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </>
      ) : tone === "info" ? (
        <>
          <circle cx="8" cy="8" r="7" fill="var(--real-action)" />
          <path d="M8 7.2v4" stroke="white" strokeWidth={1.6} strokeLinecap="round" />
          <circle cx="8" cy="4.9" r=".95" fill="white" />
        </>
      ) : (
        <>
          <circle cx="8" cy="8" r="7" fill="var(--real-green)" />
          <path d="m5 8.2 2 2 4-4.4" stroke="white" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </>
      )}
    </svg>
  );
}

function StatusLine() {
  return (
    <div className="flex items-center gap-5 border-b border-[var(--real-line)] bg-surface-raised px-16 py-2.5 text-[12px] text-text-primary">
      <span className="font-semibold">Today</span>
      {(
        [
          ["down", "1 issue"],
          ["warn", "2 maintenance windows"],
          ["info", "2 updates"],
        ] as const
      ).map(([t, l]) => (
        <span key={l} className="flex items-center gap-1.5">
          <StatusIcon tone={t} />
          {l}
        </span>
      ))}
      <span className={`ml-auto flex items-center gap-0.5 ${link}`}>
        See all notifications
        <RIcon i="right" className="h-3 w-3" />
      </span>
    </div>
  );
}

/* Squared to 4px, a smaller step of the 6px notice and cards, so tags and
   notices read as one family (Alejandro, November 2026) */
function StatusTag({ tone, children }: { tone: "warn" | "down"; children: ReactNode }) {
  const t =
    tone === "down"
      ? "bg-[color-mix(in_oklab,var(--real-red)_12%,white)] text-[oklch(46%_0.17_25)]"
      : "bg-[oklch(95%_0.05_80)] text-[oklch(42%_0.1_70)]";
  return (
    <span className={`inline-flex w-fit items-center gap-1 rounded-[4px] py-0.5 pr-2 pl-1.5 text-[10.5px] font-medium ${t}`}>
      <StatusIcon tone={tone} className="h-3 w-3" />
      {children}
    </span>
  );
}

/* The whole card opens the application's details, so the only action
   drawn on it is the one that leaves: Launch, or Request access (Alejandro,
   November 2026: View details as a link competed with Launch). A chevron at
   the top right says the card opens; one card is drawn as if under the
   pointer, so the picture shows the behavior too. */
function ConnectCard({
  name,
  purpose,
  platform,
  status,
  request = false,
  hovered = false,
  selected = false,
}: (typeof CONNECT_APPS)[number] & { request?: boolean; hovered?: boolean; selected?: boolean }) {
  return (
    <span
      className={`flex flex-col gap-2 rounded-[8px] border bg-surface-raised p-4 ${
        selected
          ? /* Open in the drawer: the card keeps a clear outline beside it */
            "border-[var(--real-action)] shadow-[0_0_0_1px_var(--real-action)]"
          : hovered
            ? "border-[color-mix(in_oklab,var(--real-action)_55%,white)] shadow-[0_6px_16px_color-mix(in_oklab,var(--shadow-ink)_14%,transparent)]"
            : `border-[var(--real-line)] ${cardShadow}`
      }`}
    >
      <span className="flex items-start gap-2">
        <span className="flex flex-col">
          <span className={`text-[13px] font-semibold ${hovered ? "text-[var(--real-link)] underline underline-offset-2" : "text-text-primary"}`}>
            {name}
          </span>
          <span className="text-[10.5px] text-text-tertiary">{platform}</span>
        </span>
        <span className={`ml-auto ${hovered ? "text-[var(--real-link)]" : "text-text-tertiary"}`}>
          {request ? <Glyph d="lock" className="h-4 w-4" /> : <RIcon i="right" className="h-4 w-4" />}
        </span>
      </span>
      {/* Status under the name, read before the purpose; no slot held when
          there is none, since Launch is pinned to the bottom */}
      {status && <StatusTag tone={status.tone}>{status.text}</StatusTag>}
      <span className="text-[11.5px] leading-snug text-text-secondary">{purpose}</span>
      <span className="mt-auto flex items-center pt-3 text-[11.5px]">
        {request ? (
          <span className={`rounded-[4px] bg-[color-mix(in_oklab,var(--real-action)_8%,white)] px-3 py-1.5 font-semibold ${link}`}>Request access</span>
        ) : (
          /* Secondary, not filled: six filled buttons on one screen were
             louder than the cards they sit in. A tint alone, no border
             (Alejandro, November 2026) */
          <span className="flex items-center gap-1 rounded-[4px] bg-[color-mix(in_oklab,var(--real-action)_8%,white)] px-3 py-1.5 font-semibold text-[var(--real-link)]">
            Launch
            <Glyph d="arrow" className="h-3 w-3" />
          </span>
        )}
      </span>
    </span>
  );
}

function SectionTitle({ title, count, note }: { title: string; count: number; note?: string }) {
  return (
    <span className="flex flex-col gap-0.5">
      <span className="flex items-baseline gap-2">
        <span className="text-[16px] font-semibold text-text-primary">{title}</span>
        <span className="text-[12px] text-text-tertiary">{count}</span>
      </span>
      {note && <span className="text-[11.5px] text-text-secondary">{note}</span>}
    </span>
  );
}

function RedesignDashboard({ selected, drawer }: { selected?: number; drawer?: ReactNode } = {}) {
  return (
    <>
      <ConnectBar active="Dashboard" />
      {/* The drawer opens under the bar, over the page, so the bar stays usable */}
      <div className="relative">
        <StatusLine />
      <div className="flex gap-8 px-16 pt-7 pb-10">
        {/* No box: the column is text on the page */}
        <span className="flex w-[180px] shrink-0 flex-col gap-6 text-[11.5px]">
          <span className="flex flex-col">
            <span className="text-[16px] font-semibold text-text-primary">Welcome back, Jordan</span>
            <span className="text-text-secondary">Compliance analyst</span>
          </span>
          <span className="flex flex-col gap-2">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-text-tertiary">Recently viewed</span>
            {[
              ["Control Testing", "Today"],
              ["Policy Library", "Yesterday"],
              ["Risk Assessments", "2 days ago"],
            ].map(([n, w]) => (
              <span key={n} className="flex flex-col">
                <span className={link}>{n}</span>
                <span className="text-[10.5px] text-text-tertiary">{w}</span>
              </span>
            ))}
          </span>
          <span className="flex flex-col gap-2">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-text-tertiary">Help</span>
            {["How GRC Connect works", "Who owns what", "Release notes"].map((l) => (
              <span key={l} className={link}>
                {l}
              </span>
            ))}
          </span>
        </span>

        <span className="flex min-w-0 flex-1 flex-col gap-4">
          <SectionTitle title="Your applications" count={6} />
          <span className="grid grid-cols-3 gap-3">
            {CONNECT_APPS.map((a, i) => (
              <ConnectCard key={a.name} {...a} hovered={selected === undefined && i === 3} selected={i === selected} />
            ))}
          </span>
          <span className="mt-4">
            <SectionTitle title="Available to request" count={10} note="Read what each one is for, then ask for access. Requests go to the application's owner." />
          </span>
          <span className="grid grid-cols-3 gap-3">
            {CONNECT_REQUEST.map((a) => (
              <ConnectCard key={a.name} {...a} request />
            ))}
          </span>
          <span className={`flex items-center gap-0.5 text-[11.5px] ${link}`}>
            Browse all 10
            <RIcon i="right" className="h-3 w-3" />
          </span>
        </span>
      </div>
        {drawer}
      </div>
    </>
  );
}

const AREAS: { area: string; apps: string[] }[] = [
  { area: "Policy and governance", apps: ["Policy Library", "Attestations", "Policy Exceptions", "Compliance Training"] },
  { area: "Risk and controls", apps: ["Risk Assessments", "Control Testing", "Control Library", "Vendor Risk"] },
  { area: "Issues and change", apps: ["Issue Tracker", "Incident Reporting", "Change Requests", "Quality Reviews"] },
  { area: "Audit and regulatory", apps: ["Audit Workpapers", "Exam Management", "Regulatory Updates", "Compliance Monitoring"] },
];

/* The homepage: what GRC Connect is, before what it holds */
function ConnectHome() {
  const h2 = "text-[18px] font-semibold text-text-primary";
  return (
    <>
      <ConnectBar active="Home" />
      {/* Purpose, and the way in */}
      {/* No rule under the hero: the three ways in below back up its promise,
          so space separates them, not a line (Alejandro, November 2026) */}
      <div className="grid grid-cols-[1.25fr_1fr] items-center gap-12 bg-surface-raised px-16 pt-12 pb-4">
        <span className="flex flex-col gap-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--real-link)]">Governance, Risk and Compliance</span>
          <span className="text-[30px] leading-tight font-semibold tracking-[-0.01em] text-balance text-text-primary">
            Every GRC application, in one place.
          </span>
          <span className="text-[14px] leading-relaxed text-pretty text-text-secondary">
            What each of the sixteen is for, whether it is up and how to get access. Start here when you are new, and
            come back whenever something changes.
          </span>
          <span className="mt-2 flex items-center gap-5 text-[12.5px]">
            <span className="flex items-center gap-1 rounded-[4px] bg-[var(--real-action)] px-4 py-2 font-semibold text-white">
              Go to your dashboard
              <RIcon i="right" className="h-3.5 w-3.5" />
            </span>
            <span className={link}>How access works</span>
          </span>
        </span>
        {/* Status right now, the reason most people come back */}
        <span className={`flex flex-col gap-3 rounded-[8px] border border-[var(--real-line)] bg-surface-page p-5 ${cardShadow}`}>
          <span className="flex items-baseline justify-between">
            <span className="text-[13px] font-semibold text-text-primary">Right now</span>
            <span className="text-[11px] text-text-tertiary">Updated 2 minutes ago</span>
          </span>
          <span className="flex items-end gap-2">
            <span className="text-[34px] leading-none font-semibold text-text-primary">13</span>
            <span className="pb-1 text-[12px] text-text-secondary">of 16 applications up</span>
          </span>
          <span className="flex h-2 overflow-hidden rounded-full">
            <span className="bg-[var(--real-green)]" style={{ width: `${(13 / 16) * 100}%` }} />
            <span className="bg-[oklch(70%_0.15_75)]" style={{ width: `${(2 / 16) * 100}%` }} />
            <span className="bg-[var(--real-red)]" style={{ width: `${(1 / 16) * 100}%` }} />
          </span>
          {[
            ["down", "Risk Assessments", "Slow to load scores"],
            ["warn", "Issue Tracker", "Maintenance Sat, 2 to 4 AM"],
            ["warn", "Policy Library", "Maintenance Sun, 6 to 8 PM"],
          ].map(([t, n, d]) => (
            <span key={n} className="flex items-center gap-2 border-t border-[var(--real-line)] pt-2.5 text-[11.5px]">
              <StatusIcon tone={t as "warn" | "down"} />
              <span className="font-semibold text-text-primary">{n}</span>
              <span className="text-text-secondary">{d}</span>
            </span>
          ))}
        </span>
      </div>

      <div className="flex flex-col gap-12 px-16 pt-6 pb-10">
        {/* What it does, as three ways in. The hero already says it in a
            sentence, so each one here earns its place with somewhere to go.
            Open columns, no box: containers are kept for objects (the status
            card, the areas), so the page does not turn into boxes
            (Alejandro, November 2026). The same three columns as the steps. */}
        <span className="grid grid-cols-3 gap-8">
          {[
            ["doc", "Every application, explained", "What each one is for, who owns it and where its docs live.", "Browse by area"],
            ["bell", "Status before you need it", "Maintenance and issues, announced before you try to log in.", "See notifications"],
            ["lock", "Access without guessing", "See what you can open, and ask the right owner for the rest.", "How access works"],
          ].map(([g, t, d, a]) => (
            <span key={t} className="flex items-start gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[8px] bg-[color-mix(in_oklab,var(--real-action)_10%,white)] text-[var(--real-link)]">
                <Glyph d={g as "doc" | "bell" | "lock"} className="h-[18px] w-[18px]" />
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-[13px] font-semibold text-text-primary">{t}</span>
                <span className="text-[11.5px] leading-snug text-pretty text-text-secondary">{d}</span>
                <span className={`mt-1 flex items-center gap-0.5 text-[11.5px] ${link}`}>
                  {a}
                  <RIcon i="right" className="h-3 w-3" />
                </span>
              </span>
            </span>
          ))}
        </span>

        {/* The sixteen, by area */}
        <span className="flex flex-col gap-4">
          <span className="flex items-baseline justify-between">
            <span className={h2}>The sixteen applications, by area</span>
            <span className={`text-[12px] ${link}`}>See them all on your dashboard</span>
          </span>
          <span className="grid grid-cols-4 gap-3">
            {AREAS.map((a) => (
              <span key={a.area} className={`flex flex-col gap-2 rounded-[8px] border border-[var(--real-line)] bg-surface-raised p-4 ${cardShadow}`}>
                <span className="text-[12.5px] font-semibold text-text-primary">{a.area}</span>
                {a.apps.map((n) => (
                  <span key={n} className={`text-[11.5px] ${link}`}>
                    {n}
                  </span>
                ))}
              </span>
            ))}
          </span>
        </span>

        {/* How access works */}
        <span className="flex flex-col gap-4">
          <span className={h2}>How access works</span>
          {/* The same grid as the three ways in above: the number sits where
              their icons sit and the text starts on the same line, so the
              columns run straight down the page (Alejandro, November 2026).
              The numbers carry the order, so no connecting line. Each
              number on the same tinted square as the icons above;
              one line under each title, no orphans. */}
          <span className="grid grid-cols-3 gap-8">
            {[
              ["1", "Find the application", "Search, or browse the sixteen by area."],
              ["2", "Request access", "It goes to the owner, with your role attached."],
              ["3", "Launch from your dashboard", "Once approved, it joins Your applications."],
            ].map(([n, t, d]) => (
              <span key={n} className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[8px] bg-[color-mix(in_oklab,var(--real-action)_10%,white)] text-[13px] font-semibold text-[var(--real-link)]">
                  {n}
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-[13px] font-semibold text-text-primary">{t}</span>
                  <span className="text-[11.5px] leading-snug text-text-secondary">{d}</span>
                </span>
              </span>
            ))}
          </span>
        </span>
      </div>

      <div className="flex items-center gap-6 border-t border-[var(--real-line)] bg-surface-raised px-16 py-4 text-[11.5px] text-text-secondary">
        <span>New to GRC?</span>
        {["Read the ecosystem guide", "Who owns what", "Contact the GRC team"].map((l) => (
          <span key={l} className={link}>
            {l}
          </span>
        ))}
      </div>
    </>
  );
}

function ConnectScreen({ address, children }: { address: string; children: ReactNode }) {
  return (
    <RecreatedScreen address={address} tab="GRC Connect" width={1100}>
      <div style={REAL_SKIN} className="bg-surface-page text-text-primary [&_.font-label]:[font-family:inherit]">
        {children}
      </div>
    </RecreatedScreen>
  );
}

export function ConnectHomeMock() {
  return (
    <div
      role="img"
      aria-label="A redesign: the GRC Connect homepage, recreated with invented content. A headline, Every GRC application, in one place, with a line on what GRC Connect is for, a Go to your dashboard button and a How access works link. Beside it, a Right now panel: 13 of 16 applications up, with one issue and two maintenance windows listed. Below, three ways in, each with a link (every application explained, status before you need it, access without guessing), the sixteen applications in four areas, and three numbered steps for getting access."
      className="h-full w-full"
    >
      {/* No backdrop or padding: the browser window is its own frame */}
      <ConnectScreen address="grcconnect.example">
        <ConnectHome />
      </ConnectScreen>
    </div>
  );
}

/* The next iteration, past the refined high fidelity (Alejandro, November
   2026: make the redesign more improved). It moves from a catalog to a
   workspace: start from the task, not the application; lead with what
   affects this person (an issue in an app they use, maintenance this week,
   an access request still waiting); list their applications as compact rows
   with status inline; and keep the ten they could request behind one link,
   since they are browsed rarely and the old grid buried the person's own. */

const MARKS: Record<string, string> = {
  "Policy Library": "PL",
  "Issue Tracker": "IT",
  "Risk Assessments": "RA",
  "Control Testing": "CT",
  "Incident Reporting": "IR",
  "Regulatory Updates": "RU",
};

function AttentionCard({ tone, title, body, action }: { tone: "warn" | "down" | "info"; title: string; body: string; action: string }) {
  const edge = { down: "border-l-[var(--real-red)]", warn: "border-l-[oklch(70%_0.15_75)]", info: "border-l-[var(--real-action)]" }[tone];
  return (
    <span className={`flex flex-col gap-1.5 rounded-[8px] border border-l-4 border-[var(--real-line)] ${edge} bg-surface-raised p-4 ${cardShadow}`}>
      <span className="flex items-center gap-2 text-[12.5px] font-semibold text-text-primary">
        <StatusIcon tone={tone} />
        {title}
      </span>
      <span className="text-[11.5px] leading-snug text-text-secondary">{body}</span>
      <span className={`mt-auto flex items-center gap-0.5 pt-1 text-[11.5px] font-semibold ${link}`}>
        {action}
        <RIcon i="right" className="h-3 w-3" />
      </span>
    </span>
  );
}

function NextDashboard() {
  const rows: { name: string; purpose: string; when: string; status?: { tone: "warn" | "down"; text: string }; pinned?: boolean }[] = [
    { name: "Control Testing", purpose: "Plan control tests and record results.", when: "Opened today", pinned: true },
    { name: "Policy Library", purpose: "Find, cite and attest to policies.", when: "Yesterday", pinned: true },
    { name: "Risk Assessments", purpose: "Score and review risk by business area.", when: "2 days ago", status: { tone: "down", text: "Slow to load" } },
    { name: "Issue Tracker", purpose: "Log control issues and track them to closure.", when: "Last week", status: { tone: "warn", text: "Down Sat, 2 to 4 AM" } },
    { name: "Incident Reporting", purpose: "Report an incident and follow it to resolution.", when: "Oct 12" },
    { name: "Regulatory Updates", purpose: "Track new rules and who they affect.", when: "Oct 3" },
  ];
  const label = "text-[10.5px] font-semibold uppercase tracking-[0.08em] text-text-tertiary";
  return (
    <>
      {/* The task search on the page replaces the one in the bar here */}
      <ConnectBar active="Dashboard" search={false} />
      <div className="flex flex-col gap-7 px-16 pt-8 pb-10">
        {/* Start from the task */}
        <span className="flex flex-col gap-3">
          <span className="text-[22px] font-semibold text-text-primary">Good morning, Jordan</span>
          <span className="flex items-center gap-2.5 rounded-[8px] border-2 border-[color-mix(in_oklab,var(--real-action)_55%,white)] bg-surface-raised px-4 py-3 text-[13px] text-text-tertiary shadow-[0_0_0_4px_color-mix(in_oklab,var(--real-action)_10%,transparent)]">
            <Glyph d="search" className="h-4 w-4 text-text-secondary" />
            What do you need to do? Try “report an incident” or “find a policy”
          </span>
          <span className="flex flex-wrap gap-2 text-[11.5px]">
            {["Report an incident", "Find a policy", "Request access", "Check a control test"].map((t) => (
              <span key={t} className={`rounded-full border border-[var(--real-line)] bg-surface-raised px-3 py-1 ${link}`}>
                {t}
              </span>
            ))}
          </span>
        </span>

        {/* What affects this person, first */}
        <span className="flex flex-col gap-3">
          <span className={label}>Needs your attention</span>
          <span className="grid grid-cols-3 gap-3">
            <AttentionCard tone="down" title="Risk Assessments is slow" body="Scores are slow to load. You used it 2 days ago; the team expects a fix today." action="Follow the fix" />
            <AttentionCard tone="warn" title="Issue Tracker, Saturday" body="Down 2 to 4 AM for an upgrade. Save drafts before Friday evening." action="Add to calendar" />
            <AttentionCard tone="info" title="Vendor Risk access" body="Your request is with Sam Ortiz, the owner, since Tuesday." action="View request" />
          </span>
        </span>

        <span className="grid grid-cols-[1fr_250px] gap-8">
          {/* Their applications, as rows: scannable, status inline */}
          <span className="flex flex-col gap-3">
            <span className="flex items-baseline justify-between">
              <span className={label}>Your applications · 6</span>
              <span className={`text-[11.5px] ${link}`}>Edit pinned</span>
            </span>
            <span className={`flex flex-col ${panel}`}>
              {rows.map((r, i) => (
                <span key={r.name} className={`flex items-center gap-3.5 px-4 py-3 ${i > 0 ? "border-t border-[var(--real-line)]" : ""}`}>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[6px] bg-[color-mix(in_oklab,var(--real-action)_10%,white)] text-[10.5px] font-semibold text-[var(--real-link)]">
                    {MARKS[r.name]}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="flex items-center gap-2 text-[12.5px] font-semibold text-text-primary">
                      {r.name}
                      {r.pinned && (
                        <svg viewBox="0 0 20 20" className="h-3 w-3 text-[oklch(70%_0.15_75)]" fill="currentColor" aria-hidden="true">
                          <path d="M10 2.8l2.1 4.4 4.8.6-3.5 3.3.9 4.8L10 13.6l-4.3 2.3.9-4.8-3.5-3.3 4.8-.6z" />
                        </svg>
                      )}
                    </span>
                    <span className="truncate text-[11.5px] text-text-secondary">{r.purpose}</span>
                  </span>
                  <span className="w-36 shrink-0">{r.status && <StatusTag tone={r.status.tone}>{r.status.text}</StatusTag>}</span>
                  <span className="w-20 shrink-0 text-right text-[11px] text-text-tertiary">{r.when}</span>
                  <span className={`${secondaryBtn} text-[11.5px]`}>
                    Launch
                    <Glyph d="arrow" className="h-3 w-3" />
                  </span>
                </span>
              ))}
            </span>
          </span>

          {/* Ahead, and beyond their own */}
          <span className="flex flex-col gap-6 text-[11.5px]">
            <span className="flex flex-col gap-3">
              <span className={label}>This week</span>
              {[
                ["Sat", "2", "Issue Tracker maintenance", "2 to 4 AM"],
                ["Sun", "3", "Policy Library maintenance", "6 to 8 PM"],
                ["Tue", "5", "Release notes published", "9:00 AM"],
              ].map(([d, n, t, w]) => (
                <span key={t} className="flex items-center gap-3">
                  <span className="flex w-9 shrink-0 flex-col items-center rounded-[6px] bg-surface-raised py-1 leading-tight shadow-[0_0_0_1px_var(--real-line)]">
                    <span className="text-[9.5px] text-text-tertiary">{d}</span>
                    <span className="text-[13px] font-semibold text-text-primary">{n}</span>
                  </span>
                  <span className="flex flex-col">
                    <span className="font-semibold text-text-primary">{t}</span>
                    <span className="text-text-tertiary">{w}</span>
                  </span>
                </span>
              ))}
            </span>
            <span className={`flex flex-col gap-2 p-4 ${panel}`}>
              <span className="font-semibold text-text-primary">10 more applications</span>
              <span className="leading-snug text-text-secondary">Audit, vendor risk, exams and more. See what each is for and request access.</span>
              <span className={`flex items-center gap-0.5 font-semibold ${link}`}>
                Explore applications
                <RIcon i="right" className="h-3 w-3" />
              </span>
            </span>
            <span className="flex flex-col gap-1.5">
              <span className={label}>Help</span>
              {["How GRC Connect works", "Who owns what"].map((l) => (
                <span key={l} className={link}>
                  {l}
                </span>
              ))}
            </span>
          </span>
        </span>
      </div>
    </>
  );
}

export function DashboardRedesign() {
  return (
    <CompareSlider
      label="Compare the dashboard in high fidelity with the next iteration"
      before={{
        node: (
          <ConnectScreen address="grcconnect.example/dashboard">
            <div className="min-h-[800px]">
              <RedesignDashboard />
            </div>
          </ConnectScreen>
        ),
        label: "High fidelity",
        alt: "The dashboard in high fidelity: search in the bar, one status line, a plain welcome column, the person's applications as cards that open their details, each with Launch, and applications available to request.",
      }}
      after={{
        node: (
          <ConnectScreen address="grcconnect.example/dashboard">
            <div className="min-h-[800px]">
              <NextDashboard />
            </div>
          </ConnectScreen>
        ),
        label: "Next iteration",
        alt: "The next iteration: a greeting with a task search and suggested tasks; Needs your attention, three cards for an issue in an app the person uses, maintenance this week and a pending access request; their applications as compact rows with pinned ones first, status inline, when last opened and Launch; and a side column with this week's events, a link to explore ten more applications, and help.",
      }}
    />
  );
}

/* --------------------------------------------------------------------------
   The rest of the refined set, in the same language as the refined
   dashboard (Alejandro, November 2026: make the other high fidelity screens
   consistent with it). One bar with search, sentence case, rounded cards as
   the only containers, secondary buttons in the cards and one primary
   action per screen, and the review's fixes: no more menu, a filter that
   applies as you check, a reply you can see, and errors that wait until
   someone tries to move on. */

const secondaryBtn =
  "inline-flex items-center gap-1 rounded-[4px] bg-[color-mix(in_oklab,var(--real-action)_8%,white)] px-3 py-1.5 font-semibold text-[var(--real-link)]";
const primaryBtn = "inline-flex items-center gap-1 rounded-[4px] bg-[var(--real-action)] px-4 py-1.5 font-semibold text-white";
/* One radius per size, across the hub and the mood board (Alejandro,
   November 2026): 8px for containers (cards, panels, notices, toasts), 6px
   for small tiles (icons, dates), 4px for tags and buttons. */
const panel = `rounded-[8px] border border-[var(--real-line)] bg-surface-raised ${cardShadow}`;

function PageHead({ back, title, actions }: { back?: string; title: string; actions?: ReactNode }) {
  return (
    <span className="flex items-end">
      <span className="flex flex-col gap-1.5">
        {back && (
          <span className={`flex items-center gap-0.5 text-[11.5px] ${link}`}>
            <RIcon i="left" className="-ml-1 h-3 w-3" />
            {back}
          </span>
        )}
        <span className="text-[20px] font-semibold text-text-primary">{title}</span>
      </span>
      {actions && <span className="ml-auto flex items-center gap-4 text-[11.5px]">{actions}</span>}
    </span>
  );
}

function CheckOn({ on = false }: { on?: boolean }) {
  return (
    <span
      className={`grid h-3.5 w-3.5 shrink-0 place-items-center rounded-[3px] border ${
        on ? "border-[var(--real-action)] bg-[var(--real-action)] text-white" : "border-[var(--real-line)] bg-surface-raised"
      }`}
    >
      {on && (
        <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.5 6.2 5 8.5l4.5-5" />
        </svg>
      )}
    </span>
  );
}

function RadioOn({ on = false, error = false }: { on?: boolean; error?: boolean }) {
  return (
    <span
      className={`grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full border ${
        on ? "border-[var(--real-action)]" : error ? "border-[var(--real-red)]" : "border-text-tertiary"
      }`}
    >
      {on && <span className="h-2 w-2 rounded-full bg-[var(--real-action)]" />}
    </span>
  );
}

/* Details, over the refined dashboard */
/* Details open in a drawer beside the grid, not a modal over it (Alejandro,
   November 2026): people compare applications, so the grid, the status line
   and the chosen card stay in view, and choosing another card swaps the
   drawer's contents. A light scrim; Launch and Documentation under the title. */
function RefinedDetails() {
  const item = (k: string, v: string) => (
    <span className="flex flex-col gap-0.5">
      <span className="text-[10.5px] font-semibold uppercase tracking-[0.06em] text-text-tertiary">
        {k}
      </span>
      <span className="text-[12px] text-text-primary">{v}</span>
    </span>
  );
  const head =
    "text-[10.5px] font-semibold uppercase tracking-[0.08em] text-text-tertiary";
  return (
    <RedesignDashboard
      selected={0}
      drawer={
        <>
          <div className="absolute inset-0 bg-[oklch(20%_0.02_256/0.12)]" />
          <div className="absolute inset-y-0 right-0 flex w-[420px] flex-col border-l border-[var(--real-line)] bg-surface-raised shadow-[-12px_0_32px_oklch(0%_0_0/0.14)]">
            <div className="flex items-start gap-3 px-6 pt-5 pb-3">
              <span className="flex flex-col">
                <span className="text-[17px] font-semibold text-text-primary">
                  Policy Library
                </span>
                <span className="text-[11px] text-text-tertiary">
                  Salesforce · Governance
                </span>
              </span>
              <span className="ml-auto grid h-7 w-7 place-items-center rounded-full text-text-secondary">
                <RIcon i="close" className="h-4 w-4" />
              </span>
            </div>
            {/* The actions sit under the title, where they are seen first */}
            <div className="flex items-center gap-4 border-b border-[var(--real-line)] px-6 py-3 text-[12px]">
              <span className={primaryBtn}>
                Launch
                <Glyph d="arrow" className="h-3 w-3" />
              </span>
              <span className={`flex items-center gap-1 ${link}`}>
                <Glyph d="doc" className="h-3.5 w-3.5" />
                Documentation
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-6 px-6 pt-5">
              {/* One notice for the state, shown only when there is one */}
              <span className="flex items-center gap-2 rounded-[8px] bg-[oklch(96%_0.045_85)] px-3 py-2.5 text-[11.5px] whitespace-nowrap text-[oklch(36%_0.08_70)]">
                <StatusIcon tone="warn" className="h-4 w-4" />
                <span>
                  <b className="font-semibold">Maintenance</b> · Down Sunday, 6 to 8 PM
                </span>
              </span>
              <span className="text-[12.5px] leading-relaxed text-text-secondary">
                The current policies and standards in one place, to find, cite
                and attest to. Every policy shows its owner, its last review and
                the controls that rely on it.
              </span>
              <span className="grid grid-cols-2 gap-x-6 gap-y-3">
                {item("Your access", "Editor")}
                {item("Category", "Governance")}
                {item("Application owner", "Riley Morgan, Technology")}
                {item("Business owner", "Sam Ortiz, Policy Office")}
              </span>
              <span className="flex flex-col gap-2.5">
                <span className="flex items-center">
                  <span className={head}>Recent updates</span>
                  <span className={`ml-auto text-[11px] ${link}`}>
                    Past updates
                  </span>
                </span>
                {[
                  ["Yesterday", "Search now filters by business area."],
                  [
                    "Oct 9",
                    "Attestations remind you a week before they are due.",
                  ],
                ].map(([w, t]) => (
                  <span
                    key={w}
                    className="flex flex-col border-l-2 border-[color-mix(in_oklab,var(--real-action)_35%,white)] pl-3"
                  >
                    <span className="text-[10.5px] text-text-tertiary">
                      {w}
                    </span>
                    <span className="text-[11.5px] text-text-primary">{t}</span>
                  </span>
                ))}
              </span>
            </div>
          </div>
        </>
      }
    />
  );
}

function RefinedNotifications() {
  const groups: { kind: string; tone: "warn" | "down" | "info"; rows: [string, string, string][] }[] = [
    { kind: "Issues", tone: "down", rows: [["Risk Assessments", "Since 9:40 AM", "Scores are slow to load. The team is working on it."]] },
    {
      kind: "Maintenance",
      tone: "warn",
      rows: [
        ["Issue Tracker", "Sat, 2 to 4 AM", "Down for a platform upgrade. Save drafts before Friday evening."],
        ["Policy Library", "Sun, 6 to 8 PM", "Down for scheduled changes."],
      ],
    },
    {
      kind: "Updates",
      tone: "info",
      rows: [
        ["Policy Library", "Yesterday", "Search now filters by business area."],
        ["Control Testing", "Oct 18", "Results export to a spreadsheet."],
      ],
    },
  ];
  return (
    <>
      <ConnectBar active="Notifications" />
      <div className="flex flex-col gap-5 px-16 pt-6 pb-10">
        <PageHead back="Dashboard" title="Notifications" />
        <div className="flex items-start gap-6">
          <span className="flex w-[210px] shrink-0 flex-col gap-3 text-[11.5px]">
            <span className="flex items-center gap-2 rounded-[4px] border border-[var(--real-line)] bg-surface-raised px-3 py-1.5 text-text-tertiary">
              <Glyph d="search" className="h-3.5 w-3.5" />
              Search notifications
            </span>
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-text-tertiary">Applications</span>
            {[
              ["All applications", true],
              ["Policy Library", true],
              ["Issue Tracker", true],
              ["Risk Assessments", true],
              ["Control Testing", true],
              ["Incident Reporting", false],
              ["Regulatory Updates", true],
            ].map(([n, on], i) => (
              <span key={n as string} className={`flex items-center gap-2 text-text-primary ${i === 0 ? "font-semibold" : ""}`}>
                <CheckOn on={on as boolean} />
                {n as string}
              </span>
            ))}
          </span>
          <span className="flex min-w-0 flex-1 flex-col gap-4">
            <span className="flex gap-6 border-b border-[var(--real-line)] text-[12px] text-text-secondary">
              <span className="-mb-px border-b-2 border-[var(--real-action)] pb-2 font-semibold text-text-primary">Active · 5</span>
              <span className="pb-2">Past updates · 22</span>
            </span>
            {groups.map((g) => (
              <span key={g.kind} className="flex flex-col gap-2">
                <span className="flex items-center gap-2 text-[12px] font-semibold text-text-primary">
                  <StatusIcon tone={g.tone} />
                  {g.kind}
                  <span className="font-normal text-text-tertiary">{g.rows.length}</span>
                </span>
                <span className={`flex flex-col ${panel}`}>
                  {g.rows.map(([app, when, text], i) => (
                    <span key={app + when} className={`flex items-start gap-3 px-4 py-3 ${i > 0 ? "border-t border-[var(--real-line)]" : ""}`}>
                      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <span className="text-[12px] text-text-primary">
                          <b className="font-semibold">{app}</b>
                          <span className="text-text-tertiary"> · {when}</span>
                        </span>
                        <span className="text-[11.5px] text-text-secondary">{text}</span>
                      </span>
                      <span className={`text-[11.5px] ${link}`}>View</span>
                    </span>
                  ))}
                </span>
              </span>
            ))}
          </span>
        </div>
      </div>
    </>
  );
}

function RefinedFeedbackLog() {
  return (
    <>
      <ConnectBar active="Feedback" />
      <div className="flex flex-col gap-5 px-16 pt-6 pb-10">
        <PageHead
          back="Dashboard"
          title="Your feedback"
          actions={
            <>
              <span className={`flex items-center gap-1.5 ${link}`}>
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 3.5v9m-4-4 4 4 4-4M4 16.5h12" />
                </svg>
                Download
              </span>
              <span className={primaryBtn}>Share feedback</span>
            </>
          }
        />
        <span className={`flex flex-col overflow-hidden text-[12px] ${panel}`}>
          <span className="grid grid-cols-[6rem_9rem_1fr_10rem] gap-4 border-b border-[var(--real-line)] bg-surface-page px-5 py-2.5 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-text-tertiary">
            <span>ID</span>
            <span>Sent</span>
            <span>About</span>
            <span>Status</span>
          </span>
          {[
            ["0004", "4 hours ago", "Search should include docs, not only applications.", "reply"],
            ["0003", "Oct 18, 2022", "The maintenance banner was easy to miss on a small screen.", "review"],
            ["0002", "Oct 11, 2022", "Add the owner to every application card.", "done"],
            ["0001", "Oct 3, 2022", "Request access should say who approves it.", "draft"],
          ].map(([id, d, t, st], i) => (
            <span key={id} className={`grid grid-cols-[6rem_9rem_1fr_10rem] items-center gap-4 px-5 py-3 ${i > 0 ? "border-t border-[var(--real-line)]" : ""}`}>
              <span className="text-text-tertiary">{id}</span>
              <span className="text-text-secondary">{d}</span>
              <span className="text-text-primary">{t}</span>
              <span>
                {st === "reply" ? (
                  <span className={`flex items-center gap-1.5 ${link}`}>
                    <RIcon i="comment" className="h-4 w-4" />1 reply
                  </span>
                ) : st === "review" ? (
                  <StatusTag tone="warn">In review</StatusTag>
                ) : st === "done" ? (
                  <span className="inline-flex items-center gap-1.5 rounded-[4px] bg-[color-mix(in_oklab,var(--real-green)_14%,white)] px-2 py-0.5 text-[10.5px] font-medium text-[oklch(42%_0.12_150)]">
                    <StatusIcon tone="up" className="h-3 w-3" />
                    Done
                  </span>
                ) : (
                  <span className="text-text-tertiary">Draft</span>
                )}
              </span>
            </span>
          ))}
        </span>
      </div>
    </>
  );
}

const FORM_STEPS = ["General questions", "Application satisfaction", "Tool usage", "Additional comments"];

function RefinedForm({ current, errors = false, children }: { current: number; errors?: boolean; children: ReactNode }) {
  return (
    <>
      <ConnectBar active="Feedback" />
      <div className="flex flex-col gap-5 px-16 pt-6 pb-10">
        <PageHead back="Your feedback" title="Share feedback" />
        {/* Steps across the top: where you are and what is left */}
        <span className="grid grid-cols-4 gap-2 text-[11.5px]">
          {FORM_STEPS.map((st, i) => {
            const done = i < current;
            const here = i === current;
            return (
              <span key={st} className="flex flex-col gap-1.5">
                <span className={`h-1 rounded-full ${done || here ? "bg-[var(--real-action)]" : "bg-[var(--real-line)]"}`} />
                <span className={`flex items-center gap-1.5 ${here ? "font-semibold text-text-primary" : done ? link : "text-text-tertiary"}`}>
                  {i + 1}. {st}
                </span>
              </span>
            );
          })}
        </span>
        <span className={`flex flex-col gap-5 p-6 text-[12px] text-text-primary ${panel}`}>
          {errors && (
            <span className="flex items-start gap-2.5 rounded-[8px] border border-[color-mix(in_oklab,var(--real-red)_40%,white)] bg-[color-mix(in_oklab,var(--real-red)_8%,white)] px-4 py-3">
              <RIcon i="error" className="mt-px h-4 w-4" />
              <span className="flex flex-col gap-0.5">
                <span className="font-semibold">Answer 3 questions to continue</span>
                <span className={`${link} underline underline-offset-2`}>Your role · Application · How well it helps</span>
              </span>
            </span>
          )}
          {children}
        </span>
        <span className="flex items-center gap-4 text-[12px]">
          {current > 0 && <span className={secondaryBtn}>Previous</span>}
          <span className={link}>Save for later</span>
          <span className={`ml-auto ${primaryBtn}`}>
            {current === FORM_STEPS.length - 1 ? "Submit" : "Next"}
            <RIcon i="right" className="h-3 w-3" />
          </span>
        </span>
      </div>
    </>
  );
}

function RefinedFormToolUsage() {
  const q = (title: string, opts: string[], on: number) => (
    <span className="flex flex-col gap-2">
      <span className="font-semibold">{title}</span>
      {opts.map((o, i) => (
        <span key={o} className="flex items-center gap-2 text-text-secondary">
          <RadioOn on={i === on} />
          {o}
        </span>
      ))}
    </span>
  );
  const cols = ["Very dissatisfied", "Dissatisfied", "Neutral", "Satisfied", "Very satisfied"];
  return (
    <RefinedForm current={2}>
      <span className="text-[15px] font-semibold">Tool usage</span>
      <span className="grid grid-cols-2 gap-6">
        {q("How often do you use this application?", ["Less than once a month", "Once a month", "Once a week", "Several times a week"], 2)}
        {q("How often has it been unavailable when you needed it?", ["Once a month", "Once a week", "More than once a week", "Never"], 3)}
      </span>
      <span className="flex flex-col gap-2">
        <span className="font-semibold">How satisfied are you with how the team prepared you?</span>
        <span className="grid grid-cols-[10rem_repeat(5,1fr)] items-center gap-y-2.5 text-text-secondary">
          <span />
          {cols.map((c) => (
            <span key={c} className="text-center text-[10.5px]">
              {c}
            </span>
          ))}
          {["Training", "Tool demos", "Communications"].map((r, ri) => (
            <span key={r} className="contents">
              <span>{r}</span>
              {cols.map((c, ci) => (
                <span key={c} className="flex justify-center">
                  <RadioOn on={ci === [3, 4, 3][ri]} />
                </span>
              ))}
            </span>
          ))}
        </span>
      </span>
    </RefinedForm>
  );
}

function RefinedFormErrors() {
  const required = (
    <span className="flex items-center gap-1.5 text-[11px] text-[oklch(48%_0.18_25)]">
      <RIcon i="error" className="h-3.5 w-3.5" />
      Choose one to continue
    </span>
  );
  const select = (label: string) => (
    <span className="flex flex-col gap-1.5">
      <span className="font-semibold">{label}</span>
      <span className="flex w-64 items-center justify-between rounded-[4px] border-2 border-[var(--real-red)] bg-surface-raised px-3 py-1.5 text-text-tertiary">
        Select
        <RIcon i="down" />
      </span>
      {required}
    </span>
  );
  return (
    <RefinedForm current={0} errors>
      <span className="text-[15px] font-semibold">General questions</span>
      <span className="grid grid-cols-2 gap-6">
        {select("Your role")}
        {select("Application")}
      </span>
      <span className="flex flex-col gap-2">
        <span className="font-semibold">How well does this application help you do your role?</span>
        <span className="flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n} className="grid h-8 w-12 place-items-center rounded-[4px] border-2 border-[var(--real-red)] bg-surface-raised">
              {n}
            </span>
          ))}
        </span>
        <span className="flex w-[17.6rem] justify-between text-[10.5px] text-text-tertiary">
          <span>Not well at all</span>
          <span>Extremely well</span>
        </span>
        {required}
      </span>
    </RefinedForm>
  );
}

/* --------------------------------------------------------------------------
   Who it was for (Alejandro, November 2026: a visual of who uses the tool
   and how). Four groups from the survey and about a dozen interviews, never
   named people and never photos: three placed on a map of how many
   applications they work across and how long they have been in GRC, and
   the application owners off the map, because they publish to everyone
   rather than reading. Each card pairs what the group needed with what the
   hub gave them. Follows the theme: it is a diagram, not a screen. */

/* Placed by what Alejandro said about each group, at the precision the
   interviews support, a quadrant and no finer: focused users tenured in one
   or two applications, power users tenured across many, new hires new and
   across the whole range (it varied by role), drawn as a span along the
   bottom rather than a point (Alejandro, November 2026: accurate, not
   aligned for looks). Owners are off the map, not dashed: the axes are about
   using applications, and owners publish to all of them. Numbered in
   reading order, so the cards follow the map. */
type Persona = { n: number; name: string; who: string; need: string; gets: string; cell: "tl" | "tr" | "b" | null };

const PERSONAS: Persona[] = [
  {
    n: 1,
    name: "Focused users",
    who: "Tenured, living in one or two applications.",
    need: "Know before their application goes down, and find its docs.",
    gets: "Maintenance on their own cards, and notifications filtered to their applications.",
    cell: "tl",
  },
  {
    n: 2,
    name: "Power users",
    who: "Tenured analysts who move across many applications every day.",
    need: "See everything’s status at once and jump between applications.",
    gets: "One status line, status on each card, recently viewed and search.",
    cell: "tr",
  },
  {
    n: 3,
    name: "New hires",
    who: "Still learning what GRC covers and which application does what.",
    need: "The big picture: what each application is for, and how to get access.",
    gets: "A purpose line on every card, and what they can open set apart from what they can request.",
    cell: "b",
  },
  {
    n: 4,
    name: "Application owners",
    who: "The teams behind each of the sixteen.",
    need: "One place to announce maintenance and changes to everyone.",
    gets: "Alerts and notifications that reach every user, and a feedback channel back.",
    cell: null,
  },
];

function PersonaMark({ n, className = "" }: { n: number; className?: string }) {
  return (
    <span
      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-interactive bg-surface-raised font-display text-sm font-semibold text-text-accent ${className}`}
    >
      {n}
    </span>
  );
}

/* --------------------------------------------------------------------------
   The argument I lost, as two fixes side by side (Alejandro, November 2026:
   a visual for the beat). The one I proposed, merging the sixteen where they
   overlapped into one experience, drawn dashed because it went to the
   backlog; the one that was built, the hub over the sixteen as they are,
   carrying what consolidation would have. The tiles are unnamed: the names
   are in the ecosystem figure, and here only the count and platform matter. */
const SIXTEEN = PLATFORMS.flatMap((p) => p.apps.map((app) => ({ app, key: p.key })));

function SixteenTiles({ faded = false }: { faded?: boolean }) {
  return (
    <span className={`grid grid-cols-8 gap-1.5 ${faded ? "opacity-55" : ""}`}>
      {SIXTEEN.map((t) => (
        <span key={t.app} className={`h-5 rounded-[3px] border-2 ${PLATFORM_TILE[t.key]}`} />
      ))}
    </span>
  );
}

function FixTag({ built, children }: { built: boolean; children: ReactNode }) {
  return (
    <span
      className={`rounded-[4px] px-2 py-0.5 font-label text-[11px] font-medium ${
        built ? "bg-interactive-subtle text-text-accent" : "border border-dashed border-border-strong text-text-secondary"
      }`}
    >
      {children}
    </span>
  );
}

export function TwoFixes() {
  const title = "text-sm font-semibold text-text-primary";
  const note = "text-xs leading-relaxed text-text-secondary";
  return (
    <div
      role="img"
      aria-label="Two fixes for sixteen applications. Proposed, and put in the backlog: merge the sixteen where they overlapped into one experience, organized in four areas (policy and governance, risk and controls, issues and change, audit and regulatory), so there would be less to learn and less for a hub to explain. Built: GRC Connect over the sixteen as they are, saying what each one is for, who it is for and when it is available, in one place, with one card per application so it shrinks as they merge."
      className="@container h-full w-full p-5 sm:p-8"
    >
      <div className="grid grid-cols-1 gap-4 @xl:grid-cols-2">
        {/* Proposed: dashed, because it was not built */}
        <div className="flex flex-col gap-4 rounded-md border border-dashed border-border-strong p-5">
          <span className="flex items-center justify-between gap-3">
            <span className={label}>Proposed</span>
            <FixTag built={false}>In the backlog</FixTag>
          </span>
          <span className={title}>Consolidate into one experience</span>
          <SixteenTiles faded />
          <span className="flex items-center gap-2 text-xs text-text-tertiary">
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M8 2.5v11M3.5 9 8 13.5 12.5 9" />
            </svg>
            Merge where they overlap
          </span>
          <span className="flex flex-col gap-1.5 rounded-md border-2 border-dashed border-border-strong p-3">
            <span className="text-xs font-semibold text-text-primary">One experience</span>
            {AREAS.map((a) => (
              <span key={a.area} className="rounded-[3px] bg-surface-sunken px-2 py-1 text-xs text-text-secondary">
                {a.area}
              </span>
            ))}
          </span>
          <span className={note}>Fewer places to learn, and less for any hub to explain.</span>
        </div>

        {/* Built: the hub over the sixteen as they are */}
        <div className="flex flex-col gap-4 rounded-md border border-border-subtle bg-surface-raised p-5">
          <span className="flex items-center justify-between gap-3">
            <span className={label}>Built</span>
            <FixTag built>Shipped</FixTag>
          </span>
          <span className={title}>Explain the sixteen in one place</span>
          <span className="flex flex-col gap-1.5 rounded-md border-2 border-interactive bg-interactive-subtle p-3">
            <span className="text-xs font-semibold text-text-primary">GRC Connect</span>
            {["What each one is for", "Who it is for", "When it is available"].map((l) => (
              <span key={l} className="rounded-[3px] bg-surface-raised px-2 py-1 text-xs text-text-primary">
                {l}
              </span>
            ))}
          </span>
          {/* The hub reaches every application; none of them change */}
          <span className="grid grid-cols-8 gap-1.5" aria-hidden="true">
            {Array.from({ length: 8 }, (_, i) => (
              <span key={i} className="mx-auto h-4 border-l border-dashed border-border-strong" />
            ))}
          </span>
          <SixteenTiles />
          <span className={note}>The sixteen stay as they are. One card for each, so the hub shrinks as they merge.</span>
        </div>
      </div>
    </div>
  );
}

export function UserMap() {
  const axis = "font-label text-xs uppercase tracking-[0.11em] text-text-tertiary";
  const at = (c: Persona["cell"]) => PERSONAS.find((p) => p.cell === c);
  return (
    <div
      role="img"
      aria-label="Who GRC Connect was for, mapped by how many applications people work across (one or two, to many) and how long they have been in GRC (new, to tenured). 1, focused users: tenured, one or two applications; they needed to know before theirs went down and got maintenance on their own cards and filtered notifications. 2, power users: tenured, many applications; they needed everything's status at once and got one status line, status on each card, recently viewed and search. 3, new hires: new, across the whole range of applications, still learning which application does what; they needed the big picture and got a purpose line on every card and the split between what they can open and what they can request. 4, application owners, off the map because they publish rather than read: they needed one place to announce maintenance and changes, and got alerts that reach everyone and a feedback channel back."
      className="@container h-full w-full p-5 sm:p-8"
    >
      {/* One grid for the map and the cards, so the cards start where the
          map does, past the side axis, and split where the map splits */}
      <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-6">
        {/* The map: four quadrants, each group centered in its own */}
        <span className={`${axis} flex items-center [writing-mode:vertical-rl] rotate-180`}>Time in GRC →</span>
        <div className="flex flex-col gap-2">
          <div className="grid aspect-[4/3] grid-cols-2 grid-rows-2 overflow-hidden rounded-md border border-border-subtle bg-surface-raised @xl:aspect-[16/7]">
            {(["tl", "tr"] as const).map((c) => {
              const p = at(c)!;
              return (
                <span
                  key={c}
                  className={`relative grid place-items-center border-b border-dashed border-border-default ${c === "tl" ? "border-r" : ""}`}
                >
                  {c === "tl" && <span className={`${axis} absolute top-3 left-3`}>Tenured</span>}
                  <span className="flex items-center gap-2">
                    <PersonaMark n={p.n} />
                    {/* Numbers only on a narrow map; the cards carry the names */}
                    <span className="hidden text-sm font-semibold whitespace-nowrap text-text-primary @xl:inline">{p.name}</span>
                  </span>
                </span>
              );
            })}
            {/* New hires: one span across the bottom, because how many
                applications they used varied by role */}
            <span className="relative col-span-2 grid place-items-center">
              <span className="absolute inset-y-0 left-1/2 border-l border-dashed border-border-default" />
              <span className={`${axis} absolute bottom-3 left-3`}>New</span>
              <span className="absolute inset-x-[10%] top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-[color-mix(in_oklab,var(--interactive-default)_30%,transparent)]" />
              <span className="relative flex items-center gap-2 rounded-full bg-surface-raised px-2">
                <PersonaMark n={at("b")!.n} />
                <span className="hidden text-sm font-semibold whitespace-nowrap text-text-primary @xl:inline">{at("b")!.name}</span>
              </span>
            </span>
          </div>
          <span className={`${axis} grid grid-cols-2 whitespace-nowrap`}>
            <span className="flex justify-between">
              <span>One or two</span>
              <span className="hidden translate-x-1/2 @xl:inline">Applications used →</span>
            </span>
            <span className="text-right">Many</span>
          </span>
        </div>

        {/* What each needed, and what the hub gave them, in the map's 2 by 2 */}
        {/* Each card spans two rows of a shared grid (subgrid), so two cards
            side by side split at the same height: their dividers and their
            Needed lines align across the row */}
        <div className="col-start-2 grid grid-cols-1 gap-3 @xl:grid-cols-2">
          {PERSONAS.map((p) => (
            <div
              key={p.n}
              className="row-span-2 grid grid-rows-subgrid gap-y-3 rounded-md border border-border-subtle bg-surface-raised p-4"
            >
              {/* Who: the mark beside the name, the line under the name */}
              <span className="grid grid-cols-[1.75rem_1fr_auto] content-start items-center gap-x-2.5 gap-y-0.5">
                <PersonaMark n={p.n} />
                <span className="text-sm font-semibold text-text-primary">{p.name}</span>
                {!p.cell ? (
                  <span className="rounded-[4px] bg-surface-sunken px-1.5 py-0.5 font-label text-[11px] whitespace-nowrap text-text-secondary">
                    Off the map
                  </span>
                ) : (
                  <span />
                )}
                <span className="col-span-2 col-start-2 text-xs leading-relaxed text-text-secondary">{p.who}</span>
              </span>
              {/* What they needed and got, on one line each where there is room */}
              <span className="ml-[2.375rem] grid content-start grid-cols-1 gap-x-3 gap-y-0.5 border-t border-border-subtle pt-3 text-xs leading-relaxed @md:grid-cols-[4rem_1fr] @md:gap-y-2">
                <span className={axis}>Needed</span>
                <span className="text-text-primary">{p.need}</span>
                <span className={`${axis} mt-1.5 @md:mt-0`}>Got</span>
                <span className="text-text-primary">{p.gets}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
