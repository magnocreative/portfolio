import { CompareSlider } from "@/design-system/components/CompareSlider";
import { RecreatedScreen } from "@/design-system/components/RecreatedScreen";
import { Button } from "@/design-system/components/Button";
import { ScaledFrame } from "@/design-system/components/ScaledFrame";
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

/* The hub at near-shipped fidelity, recreated for this site with invented
   content: every application name, description, person, address and time
   below is made up, and the colors are this system's, not USAA's brand.

   Fidelity is spent where it carries evidence. Each detail answers something
   the research found: a status on every application and a banner for
   maintenance (46% didn't know when systems were down), a purpose line and a
   Docs link on every card (42% didn't know where documentation was), the
   open and request-access split (asked for in sketch testing), recently
   viewed with when (frequently visited applications), and search and
   platform filters (keeping track of the whole ecosystem).

   A picture, not an interface: the whole frame is role="img" and inert, and
   nothing in it is a link or a button, only drawn to look like one. */

type MockApp = {
  name: string;
  short: string;
  purpose: string;
  platform: "Salesforce" | "ServiceNow" | "React";
  maintenance?: boolean;
};

const MY_APPS: MockApp[] = [
  {
    name: "Policy Library",
    short: "PL",
    purpose: "Find and cite the current policies and standards.",
    platform: "Salesforce",
  },
  {
    name: "Issue Tracker",
    short: "IT",
    purpose: "Log control issues and track them to closure.",
    platform: "ServiceNow",
    maintenance: true,
  },
  {
    name: "Risk Assessments",
    short: "RA",
    purpose: "Score and review risk by business area.",
    platform: "Salesforce",
  },
  {
    name: "Control Testing",
    short: "CT",
    purpose: "Plan tests and record results for each control.",
    platform: "Salesforce",
  },
  {
    name: "Incident Reporting",
    short: "IR",
    purpose: "Report an incident and follow its status.",
    platform: "ServiceNow",
  },
  {
    name: "Regulatory Updates",
    short: "RU",
    purpose: "Track new rules and who they affect.",
    platform: "React",
  },
];

const REQUEST_APPS: MockApp[] = [
  {
    name: "Audit Workpapers",
    short: "AW",
    purpose: "Prepare and review audit evidence.",
    platform: "Salesforce",
  },
  {
    name: "Vendor Risk",
    short: "VR",
    purpose: "Assess third parties before onboarding.",
    platform: "React",
  },
  {
    name: "Compliance Training",
    short: "TR",
    purpose: "Assign and track required training.",
    platform: "ServiceNow",
  },
];

const PLATFORM_KEY: Record<MockApp["platform"], Platform> = {
  Salesforce: "salesforce",
  ServiceNow: "servicenow",
  React: "react",
};

const mockLabel = "font-label text-xs font-medium uppercase tracking-[0.11em] text-text-tertiary";

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

function StatusChip({ maintenance = false }: { maintenance?: boolean }) {
  return maintenance ? (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-[var(--radius-pill)] border border-[color-mix(in_oklab,var(--status-warning)_45%,transparent)] bg-[color-mix(in_oklab,var(--status-warning)_12%,transparent)] px-2 py-0.5 font-label text-xs font-medium text-text-primary">
      <span className="h-1.5 w-1.5 rounded-full bg-status-warning" />
      Maintenance
    </span>
  ) : (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-[var(--radius-pill)] border border-[color-mix(in_oklab,var(--status-success)_35%,transparent)] bg-[color-mix(in_oklab,var(--status-success)_8%,transparent)] px-2 py-0.5 font-label text-xs font-medium text-text-success">
      <span className="h-1.5 w-1.5 rounded-full bg-status-success" />
      Up
    </span>
  );
}

function MockCard({ app, requestable = false }: { app: MockApp; requestable?: boolean }) {
  return (
    <span
      className={`flex h-full flex-col rounded-md border p-4 ${
        requestable ? "border-dashed border-border-default bg-transparent" : "border-border-subtle bg-surface-raised"
      }`}
    >
      {/* Room for a two-line name, always (Alejandro, November 2026). A name
          that fit on one line pulled its card's description up, so Vendor
          Risk's sat a line higher than Audit Workpapers' beside it, and the
          row read as ragged. 60px is two lines of name and the platform
          under them, measured at the frame's fixed 840 design width. */}
      <span className="flex min-h-[3.75rem] items-start gap-3">
        {/* The application's mark, in its platform's fill, so the platform
            reads at a glance as it does in the ecosystem figure. */}
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-md border-2 font-label text-xs font-semibold ${
            requestable ? "text-text-tertiary" : "text-text-secondary"
          } ${PLATFORM_TILE[PLATFORM_KEY[app.platform]]}`}
        >
          {app.short}
        </span>
        <span className="flex min-w-0 flex-col">
          <span
            className={`text-sm font-semibold leading-snug ${requestable ? "text-text-secondary" : "text-text-primary"}`}
          >
            {app.name}
          </span>
          <span className="mt-0.5 font-label text-xs uppercase tracking-[0.08em] text-text-tertiary">
            {app.platform}
          </span>
        </span>
      </span>
      <span className="mt-3 text-xs leading-relaxed text-text-secondary">{app.purpose}</span>
      {/* The status sits with the actions, at the foot of the card, so a
          row's chips line up however long each description runs; above the
          footer they followed the text and stepped down card by card. */}
      {!requestable && (
        <span className="mt-auto pt-3">
          <StatusChip maintenance={app.maintenance} />
        </span>
      )}
      <span className={`${requestable ? "mt-auto" : ""} flex flex-wrap items-center gap-x-4 gap-y-2 pt-4`}>
        <span
          className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-sm px-3 py-1.5 text-xs font-medium ${
            requestable ? "border border-border-default text-text-secondary" : "bg-interactive text-interactive-on"
          }`}
        >
          {requestable ? (
            <>
              <Glyph d="lock" className="h-3.5 w-3.5" />
              Request access
            </>
          ) : (
            <>
              Launch
              <Glyph d="arrow" className="h-3.5 w-3.5" />
            </>
          )}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-text-accent">
          <Glyph d="doc" className="h-3.5 w-3.5" />
          Docs
        </span>
      </span>
    </span>
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

function HubSkin({ children }: { children: ReactNode }) {
  return (
    <div style={HUB_SKIN} className="bg-surface-page text-text-primary [&_.font-label]:[font-family:inherit]">
      {children}
    </div>
  );
}

/* The hub's header, shared by every recreated screen: the mark, the
   navigation, search, notifications and the account menu. `open` shows
   search or the menu open; `nav` and `active` set the links, so a screen
   from a later release can carry the link it added. */
function HubHeader({
  open,
  nav = ["Home", "Notifications", "Help"],
  active = "Home",
}: {
  open?: "search" | "menu";
  nav?: string[];
  active?: string;
}) {
  return (
    <>
      {/* App header */}
      <div className="flex items-center gap-5 bg-[var(--hub-bar)] px-4 py-2.5 text-[var(--hub-on-bar)] shadow-[0_1px_0_color-mix(in_oklab,var(--shadow-ink)_30%,transparent)] @md:px-5">
        <span className="flex items-center gap-2">
          <span className="grid h-6 w-6 grid-cols-2 gap-0.5 rounded-[5px] bg-[var(--hub-mark)] p-1">
            <span className="rounded-[1px] bg-interactive-on" />
            <span className="rounded-[1px] bg-interactive-on opacity-60" />
            <span className="rounded-[1px] bg-interactive-on opacity-60" />
            <span className="rounded-[1px] bg-interactive-on" />
          </span>
          <span className="text-sm font-semibold tracking-[-0.01em]">Hub</span>
        </span>
        <span className="hidden items-center gap-5 self-stretch text-xs text-[var(--hub-on-bar-muted)] @2xl:flex">
          {nav.map((n) => (
            <span
                key={n}
                className={`-mb-2.5 flex items-center self-stretch border-b-2 pb-0.5 ${
                  n === active ? "border-[var(--hub-accent)] font-medium text-[var(--hub-on-bar)]" : "border-transparent"
                }`}
              >
              {n}
            </span>
          ))}
        </span>
        <span className="ml-auto flex items-center gap-3">
          {/* Search, filled in: what a person types, and what the hub
          finds across all sixteen, applications and docs together. */}
          <span className="relative hidden @xl:block">
            <span
              className={`flex w-64 items-center gap-2 rounded-md border px-3 py-1.5 text-xs ${
                open === "search"
                  ? "border-transparent bg-surface-raised ring-2 ring-[color-mix(in_oklab,var(--hub-accent)_60%,transparent)]"
                  : "border-[color-mix(in_oklab,var(--hub-on-bar)_18%,transparent)] bg-[color-mix(in_oklab,var(--hub-on-bar)_10%,transparent)]"
              }`}
            >
              <Glyph
                d="search"
                className={`h-3.5 w-3.5 ${open === "search" ? "text-text-tertiary" : "text-[var(--hub-on-bar-muted)]"}`}
              />
              {open === "search" ? (
                <span className="text-text-primary">
                  risk
                  <span className="ml-px inline-block h-3.5 w-px translate-y-0.5 bg-text-primary" />
                </span>
              ) : (
                <span className="text-[var(--hub-on-bar-muted)]">Search applications and docs</span>
              )}
            </span>
            {open === "search" && (
              <span className="absolute top-full right-0 z-10 mt-1.5 flex w-72 flex-col rounded-md border border-border-default bg-surface-raised py-2 text-xs shadow-[0_12px_32px_color-mix(in_oklab,var(--shadow-ink)_16%,transparent)]">
                <span className={`px-3 pb-1 ${mockLabel}`}>Applications</span>
                {[
                  {
                    name: "Risk Assessments",
                    meta: "Salesforce",
                    status: <StatusChip />,
                  },
                  {
                    name: "Vendor Risk",
                    meta: "React",
                    status: (
                      <span className="inline-flex items-center gap-1 text-text-tertiary">
                        <Glyph d="lock" className="h-3 w-3" />
                        Request access
                      </span>
                    ),
                  },
                ].map((r, i) => (
                  <span
                    key={r.name}
                    className={`flex items-center justify-between gap-3 px-3 py-2 ${i === 0 ? "bg-interactive-subtle" : ""}`}
                  >
                    <span className="flex flex-col">
                      {/* The typed letters marked in each match. */}
                      <span className="text-text-secondary">
                        {r.name.split(/(Risk)/).map((part, j) =>
                          part === "Risk" ? (
                            <b key={j} className="font-semibold text-text-primary">
                              {part}
                            </b>
                          ) : (
                            part
                          ),
                        )}
                      </span>
                      <span className="text-text-tertiary">{r.meta}</span>
                    </span>
                    {r.status}
                  </span>
                ))}
                <span className="mx-3 my-1.5 border-t border-border-subtle" />
                <span className={`px-3 pb-1 ${mockLabel}`}>Docs</span>
                <span className="flex items-center gap-2 px-3 py-2 text-text-primary">
                  <Glyph d="doc" className="h-3.5 w-3.5 text-text-tertiary" />
                  How risk scores are calculated
                </span>
                <span className="mx-3 my-1.5 border-t border-border-subtle" />
                <span className="px-3 pt-1 font-medium text-text-accent">See all 4 results</span>
              </span>
            )}
          </span>
          <span className="text-[var(--hub-on-bar-muted)] @xl:hidden">
            <Glyph d="search" className="h-5 w-5" />
          </span>
          <span className="relative text-[var(--hub-on-bar-muted)]">
            <Glyph d="bell" className="h-5 w-5" />
            <span className="absolute -top-1.5 -right-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-status-danger px-1 font-label text-xs leading-none font-semibold text-text-inverse">
              2
            </span>
          </span>
          {/* The account menu, where Report an incident lives: one place
          to raise a problem with any of the sixteen. */}
          <span className="relative">
            <span
              className={`flex items-center gap-1 rounded-full py-0.5 pr-1.5 pl-0.5 ${
                open === "menu" ? "bg-[color-mix(in_oklab,var(--hub-on-bar)_14%,transparent)]" : ""
              }`}
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--hub-accent)] text-xs font-semibold text-[var(--hub-bar)]">
                JR
              </span>
              <Glyph d="chevron" className="h-3.5 w-3.5 text-[var(--hub-on-bar-muted)]" />
            </span>
            {open === "menu" && (
              <span className="absolute top-full right-0 z-10 mt-1.5 flex w-60 flex-col rounded-md border border-border-default bg-surface-raised py-2 text-xs shadow-[0_12px_32px_color-mix(in_oklab,var(--shadow-ink)_16%,transparent)]">
                <span className="flex flex-col px-3 pt-1 pb-2">
                  <span className="text-sm font-semibold text-text-primary">Jordan Reyes</span>
                  <span className="text-text-tertiary">Compliance analyst</span>
                </span>
                <span className="mx-3 mb-1.5 border-t border-border-subtle" />
                <span className="flex items-center gap-2 bg-interactive-subtle px-3 py-2 font-medium text-text-accent">
                  <Glyph d="alert" className="h-3.5 w-3.5" />
                  Report an incident
                </span>
                {["My access", "Notification settings", "Help"].map((item) => (
                  <span key={item} className="px-3 py-2 pl-[2.375rem] text-text-secondary">
                    {item}
                  </span>
                ))}
                <span className="mx-3 my-1.5 border-t border-border-subtle" />
                <span className="px-3 py-1 pl-[2.375rem] text-text-secondary">Sign out</span>
              </span>
            )}
          </span>
        </span>
      </div>
    </>
  );
}

function HubScreen({ open }: { open?: "search" | "menu" }) {
  return (
    <HubSkin>
            <HubHeader open={open} />

            {/* The alert: maintenance announced before anyone runs into it */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 border-b border-[color-mix(in_oklab,var(--status-warning)_35%,var(--surface-raised))] bg-[color-mix(in_oklab,var(--status-warning)_12%,var(--surface-raised))] px-4 py-2.5 text-xs @md:px-5">
              <span className="text-[color-mix(in_oklab,var(--status-warning)_80%,var(--text-primary))]">
                <Glyph d="alert" className="h-4 w-4" />
              </span>
              <span className="font-semibold text-text-primary">Scheduled maintenance</span>
              <span className="text-text-secondary">Issue Tracker is down Saturday, 2 to 4 AM.</span>
              <span className="font-medium text-text-accent underline decoration-1 underline-offset-2">Details</span>
            </div>

            <div className="flex gap-6 p-4 @md:p-6">
              {/* Profile, recents and resources */}
              <div className="hidden w-44 shrink-0 flex-col @2xl:flex">
                <span className="text-sm font-semibold text-text-primary">Welcome back, Jordan</span>
                <span className="mt-0.5 text-xs text-text-secondary">Compliance analyst</span>
                <span className={`mt-6 ${mockLabel}`}>Recently viewed</span>
                <span className="mt-2 flex flex-col gap-2.5">
                  {[
                    ["Control Testing", "Today"],
                    ["Policy Library", "Yesterday"],
                    ["Risk Assessments", "2 days ago"],
                  ].map(([name, when]) => (
                    <span key={name} className="flex flex-col">
                      <span className="text-xs font-medium text-text-primary">{name}</span>
                      <span className="text-xs text-text-tertiary">{when}</span>
                    </span>
                  ))}
                </span>
                <span className={`mt-6 ${mockLabel}`}>Resources</span>
                <span className="mt-2 flex flex-col gap-2 text-xs font-medium text-text-accent">
                  <span>Ecosystem wiki</span>
                  <span>Release notes</span>
                  <span>Who owns what</span>
                </span>
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                {/* Filters by platform */}
                <span className="flex flex-wrap items-center gap-2">
                  {["All", "Salesforce", "ServiceNow", "React"].map((f, i) => (
                    <span
                      key={f}
                      className={`rounded-[var(--radius-pill)] border px-3 py-1 text-xs font-medium ${
                        i === 0
                          ? "border-border-interactive bg-interactive-subtle text-text-accent"
                          : "border-border-default text-text-secondary"
                      } ${i === 3 ? "hidden @md:inline" : ""}`}
                    >
                      {f}
                    </span>
                  ))}
                </span>

                <span className="mt-5 flex items-baseline gap-2">
                  <span className="text-base font-semibold text-text-primary">Your applications</span>
                  <span className="font-label text-xs text-text-tertiary">06</span>
                </span>
                <div className="mt-3 grid grid-cols-1 gap-3 @md:grid-cols-2 @3xl:grid-cols-3">
                  {MY_APPS.map((app, i) => (
                    <span key={app.name} className={i >= 4 ? "hidden @3xl:block" : i >= 2 ? "hidden @md:block" : ""}>
                      <MockCard app={app} />
                    </span>
                  ))}
                </div>

                <span className="mt-6 flex items-baseline gap-2">
                  <span className="text-base font-semibold text-text-primary">Request access</span>
                  <span className="font-label text-xs text-text-tertiary">03</span>
                </span>
                <div className="mt-3 grid grid-cols-1 gap-3 @md:grid-cols-2 @3xl:grid-cols-3">
                  {REQUEST_APPS.map((app, i) => (
                    <span key={app.name} className={i >= 2 ? "hidden @3xl:block" : i >= 1 ? "hidden @md:block" : ""}>
                      <MockCard app={app} requestable />
                    </span>
                  ))}
                </div>
              </div>
            </div>
    </HubSkin>
  );
}

export function HubMock({ open = "search" }: { open?: "search" | "menu" }) {
  return (
    <div
      role="img"
      aria-label="The hub, recreated with invented content, in a browser window. In the header, search has the word risk typed in, and its results list two applications, Risk Assessments (up) and Vendor Risk (request access), and a doc on how risk scores are calculated. Beside it, notifications with two unread and the account menu, which holds Report an incident. A maintenance banner reads: Issue Tracker is down Saturday, 2 to 4 AM. Filters for all platforms, Salesforce, ServiceNow and React sit above the applications. Under Your applications, six cards, each with the application's mark, name, platform, one line on what it's for, a status (Up, or Maintenance for the one going down), a Launch button and a Docs link. Under Request access, three cards in dashed outline with a Request access button and a Docs link. On the left, a welcome, the user's role, recently viewed applications with when, and resources."
      className="h-full w-full p-3 sm:p-6"
    >
      <RecreatedScreen address="hub.example/home" tab="Home · Hub">
        <HubScreen open={open} />
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
          /* The accurate home, the same one as in From sketch to screen,
             drawn at the same width as the list so the two line up under
             the divider (Alejandro, November 2026) */
          <RecreatedScreen address="hub.example/home" tab="Hub" width={1100}>
            <div style={REAL_SKIN} className="min-h-[800px] bg-surface-page text-text-primary [&_.font-label]:[font-family:inherit]">
              <RealHome />
            </div>
          </RecreatedScreen>
        ),
        label: "What we built",
        alt: "The hub as built, recreated with invented content: maintenance, issue and update banners across the top, a welcome column with resources, recently viewed applications, then the applications the person can open, each with a line on what it is for, View Details and Launch.",
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
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${statusChip[tone]}`}>{children}</span>;
}

function Dot({ tone }: { tone: "up" | "warn" | "down" }) {
  const c = { up: "bg-status-success", warn: "bg-status-warning", down: "bg-status-danger" }[tone];
  return <span className={`h-1.5 w-1.5 rounded-full ${c}`} />;
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
      <Chip tone="up"><Dot tone="up" />Up</Chip>
      <Chip tone="warn"><Dot tone="warn" />Maintenance</Chip>
      <Chip tone="down"><Dot tone="down" />Down</Chip>
      <Chip tone="info">In progress</Chip>
      <Chip tone="neutral">Draft</Chip>
    </div>
  );
}

function IconAtom() {
  const icons: (keyof typeof GLYPHS)[] = ["search", "bell", "lock", "doc", "alert", "arrow"];
  return (
    <div className="grid grid-cols-3 gap-2 @md:grid-cols-6">
      {icons.map((g) => (
        <span key={g} className="flex aspect-square items-center justify-center rounded-md bg-surface-sunken text-text-secondary">
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

function BannerComponent() {
  return (
    <div className="flex flex-col gap-2">
    <div className="flex items-center gap-3 rounded-md border border-[color-mix(in_oklab,var(--status-warning)_40%,var(--surface-raised))] bg-[color-mix(in_oklab,var(--status-warning)_10%,var(--surface-raised))] px-3 py-2.5 text-xs">
      <span className="text-[color-mix(in_oklab,var(--status-warning)_80%,var(--text-primary))]">
        <Glyph d="alert" className="h-4 w-4" />
      </span>
      <span className="text-text-primary">
        <b className="font-semibold">Issue Tracker</b> is down for maintenance Saturday, 2 to 4 AM.
      </span>
      <span className="ml-auto whitespace-nowrap font-medium text-text-accent">Details</span>
    </div>
    <div className="flex items-center gap-3 rounded-md border border-[color-mix(in_oklab,var(--interactive-default)_30%,var(--surface-raised))] bg-[color-mix(in_oklab,var(--interactive-default)_8%,var(--surface-raised))] px-3 py-2.5 text-xs">
      <span className="text-text-accent">
        <Glyph d="bell" className="h-4 w-4" />
      </span>
      <span className="text-text-primary">
        <b className="font-semibold">Exam Management</b> is now open to every team.
      </span>
      <span className="ml-auto whitespace-nowrap font-medium text-text-accent">Open</span>
    </div>
    </div>
  );
}

function CardComponent() {
  return (
    <div className="flex flex-col gap-2.5 rounded-md border border-border-subtle p-3">
      <span className="flex items-start justify-between">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-surface-sunken text-text-tertiary">
          <Glyph d="doc" />
        </span>
        <Chip tone="up"><Dot tone="up" />Up</Chip>
      </span>
      <span className="flex flex-col">
        <span className="text-sm font-semibold text-text-primary">Policy Library</span>
        <span className="text-xs text-text-tertiary">Find and attest to policies</span>
      </span>
      <span className="flex items-center gap-2">
        <Button specimen variant="primary" fillOnPhone={false}>Launch</Button>
        <span className="text-xs font-medium text-text-accent">Docs</span>
      </span>
    </div>
  );
}

function SummaryComponent() {
  const parts = [
    { label: "Up", value: 13, tone: "text-status-success" },
    { label: "Maintenance", value: 2, tone: "text-status-warning" },
    { label: "Down", value: 1, tone: "text-status-danger" },
  ];
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
            <span className={`h-2 w-2 rounded-full bg-current ${p.tone}`} />
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
          <span className="flex w-9 flex-col items-center rounded-md bg-[color-mix(in_oklab,var(--interactive-default)_12%,var(--surface-raised))] py-1 leading-tight">
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

function ToastComponent() {
  return (
    <div className="flex flex-col gap-2">
      <span className="flex items-center gap-2 rounded-md bg-[color-mix(in_oklab,var(--status-success)_12%,var(--surface-raised))] px-3 py-2 text-xs text-text-primary">
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-status-success text-[9px] text-surface-raised">✓</span>
        Incident report sent
      </span>
      <span className="flex items-center gap-2 rounded-md bg-[color-mix(in_oklab,var(--status-danger)_10%,var(--surface-raised))] px-3 py-2 text-xs text-text-primary">
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-status-danger text-[9px] text-surface-raised">!</span>
        Something went wrong. Try again.
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
      <span className="font-label text-sm font-semibold uppercase tracking-[0.14em] text-surface-raised">Hub</span>
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
        <span className="font-label text-xs font-semibold uppercase tracking-[0.14em]">Hub</span>
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

function RealBar({ active = "Home" }: { active?: string }) {
  return (
    <div className="flex items-center gap-6 bg-[var(--hub-bar)] px-6 py-2.5 text-[var(--hub-on-bar)]">
      <span className="flex items-center gap-2">
        <span className="grid h-5 w-5 grid-cols-2 gap-[2px] rounded-[4px] bg-[color-mix(in_oklab,var(--hub-on-bar)_18%,transparent)] p-[3px]">
          <span className="rounded-[1px] bg-[var(--hub-on-bar)]" />
          <span className="rounded-[1px] bg-[var(--hub-on-bar)] opacity-60" />
          <span className="rounded-[1px] bg-[var(--hub-on-bar)] opacity-60" />
          <span className="rounded-[1px] bg-[var(--hub-on-bar)]" />
        </span>
        <span className="text-[15px] font-semibold uppercase tracking-[0.08em]">Hub</span>
      </span>
      <span className="ml-auto flex items-center gap-7 self-stretch text-[12px]">
        {["Home", "Feedback"].map((n) => (
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
      <span className="relative">
        <Glyph d="bell" className="h-5 w-5" />
        <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full border border-[var(--hub-bar)] bg-[var(--real-red)]" />
      </span>
      <Avatar />
    </div>
  );
}

function Pill({ children, tone }: { children: ReactNode; tone: "plain" | "red" | "green" }) {
  const t =
    tone === "red"
      ? "bg-[var(--real-red)] text-white"
      : tone === "green"
        ? "bg-[var(--real-green)] text-white"
        : "border border-[var(--real-line)] bg-surface-raised text-text-primary";
  return <span className={`inline-flex shrink-0 rounded-full px-2.5 py-[3px] text-[10px] font-semibold ${t}`}>{children}</span>;
}

/* The three alerts, stacked across the top, each with Read More and a close */
function Banners() {
  const rows: [ReactNode, "plain" | "red" | "green", ReactNode][] = [
    [
      "Maintenance (3)",
      "plain",
      <>
        <b className="font-semibold">IT:</b> 10-29-22 (2:00 AM to 4:00 AM), <b className="font-semibold">PL:</b> 10-30-22 (6:00 PM to 8:00 PM)
      </>,
    ],
    [
      "Issues (2)",
      "red",
      <>
        <b className="font-semibold">RA:</b> Scores are slow to load. <b className="font-semibold">IR:</b> Attachments fail to upload on…
      </>,
    ],
    [
      "Updates (2)",
      "green",
      <>
        <b className="font-semibold">PL:</b> Search now filters by business area. <b className="font-semibold">CT:</b> Export results to a…
      </>,
    ],
  ];
  return (
    <div className="flex flex-col">
      {rows.map(([label, tone, text], i) => (
        <span key={i} className="flex items-center gap-3 border-b border-[var(--real-line)] bg-[var(--real-off)] px-5 py-1.5 text-[11px] text-text-primary">
          <Pill tone={tone}>{label}</Pill>
          <span className="truncate">{text}</span>
          <span className={`shrink-0 ${link}`}>Read More</span>
          <span className="ml-auto text-text-primary">
            <RIcon i="close" />
          </span>
        </span>
      ))}
    </div>
  );
}

const HOME_MINE: [string, string][] = [
  ["Policy Library (PL)", "Centralized location to find, cite and attest to the current policies and standards."],
  ["Issue Tracker (IT)", "Logs control issues and tracks each one through remediation to closure."],
  ["Risk Assessments (RA)", "Scores and reviews operational risk by business area and control owner."],
  ["Control Testing (CT)", "Plans control tests and records results, exceptions and sign-offs."],
  ["Incident Reporting (IR)", "Reports an incident and follows its status from intake to resolution."],
  ["Regulatory Updates (RU)", "Tracks new and amended rules, and who in the business they affect."],
];

const HOME_OTHER = [
  "Audit Workpapers (AW)",
  "Vendor Risk (VR)",
  "Compliance Training (CTR)",
  "Exam Management (EM)",
  "Quality Reviews (QR)",
  "Change Requests (CR)",
];

function AppTile({ name, text, other = false }: { name: string; text: string; other?: boolean }) {
  return (
    <span className={`flex flex-col rounded-[3px] border border-[var(--real-line)] ${other ? "bg-[var(--real-off)]" : "bg-surface-raised"} ${cardShadow}`}>
      <span className="flex items-start gap-2 px-2.5 pt-2.5">
        <span className="text-[11px] leading-snug font-semibold text-text-primary">{name}</span>
        <span className="ml-auto -mr-1 text-text-secondary">
          <RIcon i="kebab" />
        </span>
      </span>
      <span className="mt-1.5 min-h-[3.4rem] px-2.5 text-[10.5px] leading-snug text-text-secondary">{text}</span>
      <span className={`mt-2 grid grid-cols-2 border-t border-[var(--real-line)] py-1.5 text-center text-[10.5px] ${other ? "text-text-primary" : link}`}>
        <span>View Details</span>
        <span>Launch</span>
      </span>
    </span>
  );
}

function Panel({ title, sub, action, off = false, children }: { title: string; sub?: string; action?: ReactNode; off?: boolean; children: ReactNode }) {
  return (
    <span className={`flex flex-col gap-3 rounded-[3px] border border-[var(--real-line)] p-3.5 ${off ? "bg-[var(--real-off)]" : "bg-surface-raised"} ${cardShadow}`}>
      <span className="flex items-center">
        <span className="text-[15px] font-medium text-text-primary">
          {title}
          {sub && <span className="font-normal"> {sub}</span>}
        </span>
        {action && <span className="ml-auto">{action}</span>}
      </span>
      {children}
    </span>
  );
}

function RealHome() {
  return (
    <>
      <RealBar />
      <Banners />
      <div className="flex items-start gap-3 px-16 pt-5 pb-8">
        {/* Welcome, roles, resources, newsletter */}
        <span className={`flex w-[210px] shrink-0 flex-col rounded-[3px] border border-[var(--real-line)] bg-surface-raised text-[11px] ${cardShadow}`}>
          <span className="flex flex-col gap-2.5 px-4 pt-4 pb-3">
            <Avatar size="h-14 w-14" />
            <span className="text-[15px] font-medium text-text-primary">Welcome, Jordan!</span>
          </span>
          {[
            ["Application Roles", <span key="r" className="text-text-secondary">Risk and Compliance starts here, connecting people, processes, and platforms.</span>],
            [
              "Resources",
              <span key="s" className="flex flex-col gap-1">
                {["Ecosystem Wiki", "Who Owns What"].map((l) => (
                  <span key={l} className={`flex justify-between ${link}`}>
                    {l}
                    <RIcon i="right" className="h-3 w-3" />
                  </span>
                ))}
              </span>,
            ],
            [
              "Newsletter Announcements",
              <span key="n" className="flex flex-col gap-1">
                {["October Release Notes", "Quarterly Controls Review"].map((l) => (
                  <span key={l} className={`flex justify-between ${link}`}>
                    {l}
                    <RIcon i="right" className="h-3 w-3" />
                  </span>
                ))}
              </span>,
            ],
          ].map(([h, body]) => (
            <span key={h as string} className="flex flex-col gap-1.5 border-t border-[var(--real-line)] px-4 py-3">
              <span className="font-semibold text-text-primary">{h}</span>
              {body}
            </span>
          ))}
        </span>

        <span className="flex min-w-0 flex-1 flex-col gap-3">
          <Panel title="Recently Viewed Applications">
            <span className="grid grid-cols-3 gap-2.5">
              {HOME_MINE.slice(0, 2).map(([n, t]) => (
                <AppTile key={n} name={n} text={t} />
              ))}
            </span>
          </Panel>
          <Panel title="GRC Applications" sub="(My Access)">
            <span className="grid grid-cols-3 gap-2.5">
              {HOME_MINE.map(([n, t]) => (
                <AppTile key={n} name={n} text={t} />
              ))}
            </span>
          </Panel>
          <Panel
            title="Other GRC Applications"
            sub="(Requires Access)"
            off
            action={<span className="rounded-[3px] bg-[var(--real-action)] px-3 py-1 text-[10.5px] font-semibold text-white">Request Access</span>}
          >
            <span className="grid grid-cols-3 gap-2.5">
              {HOME_OTHER.map((n) => (
                <AppTile key={n} name={n} text={LOREM} other />
              ))}
            </span>
          </Panel>
        </span>
      </div>
    </>
  );
}

/* One application's details, in a modal over the dimmed home */
function RealDetails() {
  const item = (k: string, v: ReactNode) => (
    <span className="flex flex-col gap-0.5">
      <span className="text-[11px] font-semibold text-text-primary">{k}</span>
      <span className="text-[11px] text-text-secondary">{v}</span>
    </span>
  );
  return (
    <div className="relative">
      <RealHome />
      <div className="absolute inset-0 flex justify-center bg-[oklch(20%_0.02_256/0.62)] pt-14">
        <div className="h-fit w-[560px] rounded-[3px] bg-surface-raised shadow-[0_18px_48px_oklch(0%_0_0/0.3)]">
          <div className="flex items-center justify-between px-5 pt-4 pb-3">
            <span className="text-[16px] font-medium text-text-primary">Policy Library (PL)</span>
            <span className="text-text-primary">
              <RIcon i="close" className="h-4 w-4" />
            </span>
          </div>
          <div className="flex flex-col gap-2.5 bg-[var(--real-off)] px-5 py-3 text-[11px]">
            <span className="flex items-start gap-3">
              <Pill tone="plain">Maintenance</Pill>
              <span className="flex flex-col">
                <span className="text-text-primary">10-30-22 (6:00 PM to 8:00 PM)</span>
                <span className="text-text-secondary">System will be down for changes during evening times (US CST).</span>
              </span>
            </span>
            <span className="flex items-start gap-3">
              <Pill tone="green">Update</Pill>
              <span className="flex flex-col">
                <span className="text-text-primary">New Search Filters</span>
                <span className="text-text-secondary">Search now filters policies by business area.</span>
              </span>
            </span>
          </div>
          <div className="grid grid-cols-[180px_1fr] gap-x-6 px-5 pt-4 pb-8">
            <span className="flex flex-col gap-3">
              {item("Your Access", "Editor, Compliance Analyst")}
              {item("Application Owner", "Riley Morgan (Technology)")}
              {item("Business Owner", "Sam Ortiz (Policy Office)")}
              {item("Application Category", "Governance")}
            </span>
            {item(
              "Application Description",
              <span className="flex flex-col gap-2">
                <span>
                  Centralized location to find, cite and attest to the current policies and standards across the
                  organization. Every policy shows its owner, its last review and the controls that rely on it.
                </span>
                <span>{LOREM}</span>
              </span>,
            )}
          </div>
          <div className="flex items-center gap-2 px-5 pb-4">
            <span className={`rounded-[3px] border border-[var(--real-action)] px-3 py-1.5 text-[11px] ${link}`}>Documentation</span>
            <span className={`grid h-[27px] w-8 place-items-center rounded-[3px] border border-[var(--real-action)] ${link}`}>
              <RIcon i="more" />
            </span>
            <span className="ml-auto rounded-[3px] bg-[var(--real-action)] px-4 py-1.5 text-[11px] font-semibold text-white">Launch App</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Above the page's title, where a breadcrumb sits, so where you came from
   reads before where you are (Alejandro, November 2026; the real set had it
   under the title). */
function BackLink({ to }: { to: string }) {
  return (
    <span className={`flex items-center gap-0.5 text-[11px] ${link}`}>
      <RIcon i="left" className="-ml-1 h-3 w-3" />
      Go back to {to}
    </span>
  );
}

function Check({ on = false }: { on?: boolean }) {
  return (
    <span className={`grid h-3.5 w-3.5 shrink-0 place-items-center rounded-[2px] border ${on ? "border-text-primary" : "border-[var(--real-line)]"}`}>
      {on && (
        <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.5 6.2 5 8.5l4.5-5" />
        </svg>
      )}
    </span>
  );
}

/* Notifications: search and filter by application; alerts grouped by kind */
function RealNotifications() {
  const groups: [string, "plain" | "red" | "green", [string, string][]][] = [
    ["Maintenance (3)", "plain", [["IT: 10-29-22 (2:00 AM to 4:00 AM)", LOREM_SHORT], ["PL: 10-30-22 (6:00 PM to 8:00 PM)", LOREM_SHORT], ["CT: 11-01-22 (9:00 PM to 11:00 PM)", LOREM_SHORT]]],
    ["Issues (2)", "red", [["RA: Scores are slow to load", LOREM_SHORT], ["IR: Attachments fail to upload", LOREM_SHORT]]],
    ["Updates (2)", "green", [["PL: Search filters by business area", LOREM_SHORT], ["CT: Export results to a spreadsheet", LOREM_SHORT]]],
  ];
  return (
    <>
      <RealBar />
      <div className="flex flex-col gap-1.5 px-24 pt-6 pb-10">
        <BackLink to="Home" />
        <span className="text-[17px] font-medium text-text-primary">Notifications</span>
        <div className="mt-4 flex items-start gap-4">
          <span className="flex w-[220px] shrink-0 flex-col gap-2.5">
            <span className="flex items-center gap-2 rounded-[3px] border border-[var(--real-line)] px-2.5 py-1.5 text-[11px] text-text-tertiary">
              <Glyph d="search" className="h-3.5 w-3.5" />
              Search Notifications
            </span>
            <span className={`flex flex-col gap-2 rounded-[3px] border border-[var(--real-line)] bg-surface-raised p-3 text-[11px] ${cardShadow}`}>
              <span className="font-semibold text-text-primary">Filter Notifications</span>
              <span className="flex items-center gap-2 text-text-primary">
                <Check on />
                Show All
              </span>
              <span className="border-t border-[var(--real-line)]" />
              {HOME_MINE.map(([n]) => (
                <span key={n} className="flex items-center gap-2 pl-2 text-text-secondary">
                  <Check />
                  {n}
                </span>
              ))}
              <span className="mt-1 rounded-[3px] bg-[var(--real-off)] py-1.5 text-center font-semibold text-text-secondary">Make Selection to Apply Filter</span>
            </span>
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="flex text-[11px]">
              <span className={`rounded-t-[3px] border-x border-t-2 border-[var(--real-line)] border-t-[var(--real-action)] bg-surface-raised px-3 py-1.5 ${link}`}>Active (7)</span>
              <span className="border-b border-[var(--real-line)] px-3 py-1.5 text-text-primary">Past Updates (22)</span>
              <span className="flex-1 border-b border-[var(--real-line)]" />
            </span>
            <span className={`flex flex-col border-x border-b border-[var(--real-line)] bg-surface-raised text-[11px] ${cardShadow}`}>
              <span className={`px-3 py-2 ${link}`}>Expand All | Close All</span>
              {groups.map(([g, tone, rows]) => (
                <span key={g} className="flex flex-col">
                  <span className="flex items-center gap-2 border-t border-[var(--real-line)] bg-[var(--real-off)] px-3 py-1.5">
                    <span className="text-text-primary">
                      <RIcon i="up" />
                    </span>
                    <Pill tone={tone}>{g}</Pill>
                  </span>
                  {rows.map(([h, t]) => (
                    <span key={h} className="flex flex-col gap-0.5 border-t border-[var(--real-line)] px-3 py-2">
                      <span className="font-semibold text-text-primary">{h}</span>
                      <span className="text-text-secondary">{t}</span>
                    </span>
                  ))}
                </span>
              ))}
            </span>
          </span>
        </div>
      </div>
    </>
  );
}

/* The feedback log: what a person has sent, and where it stands */
function RealFeedbackLog() {
  return (
    <>
      <RealBar active="Feedback" />
      <div className="flex flex-col gap-0.5 px-24 pt-6 pb-10">
        <span className="flex items-end">
          <span className="flex flex-col gap-1.5">
            <BackLink to="Home" />
            <span className="text-[17px] font-medium text-text-primary">Feedback Log</span>
          </span>
          <span className="ml-auto flex items-center gap-4 text-[11px]">
            <span className={`flex items-center gap-1.5 ${link}`}>
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 3.5v9m-4-4 4 4 4-4M4 16.5h12" />
              </svg>
              Download Data
            </span>
            <span className={`rounded-[3px] border border-[var(--real-action)] px-4 py-1.5 font-semibold ${link}`}>Add New</span>
          </span>
        </span>
        <span className={`mt-4 flex flex-col rounded-[3px] border border-[var(--real-line)] bg-surface-raised text-[11px] ${cardShadow}`}>
          <span className="px-3 py-2 text-text-secondary">2 item(s) · Updated 5 minutes ago</span>
          <span className="grid grid-cols-[2.5rem_8rem_1fr_14rem] items-center border-y border-[var(--real-line)] bg-[var(--real-off)] px-3 py-2 font-semibold text-text-primary">
            <Check />
            <span>ID</span>
            <span>Date Created</span>
            <span>Status</span>
          </span>
          {[
            ["0001", "4 hours ago", "Acknowledged"],
            ["0002", "10-26-2022", "Draft"],
          ].map(([id, d, st]) => (
            <span key={id} className="grid grid-cols-[2.5rem_8rem_1fr_14rem] items-center border-b border-[var(--real-line)] px-3 py-2.5 text-text-primary last:border-b-0">
              <Check />
              <span>{id}</span>
              <span>{d}</span>
              <span className={st === "Acknowledged" ? `flex items-center gap-1.5 ${link}` : ""}>
                {st}
                {st === "Acknowledged" && <RIcon i="comment" className="h-4 w-4" />}
              </span>
            </span>
          ))}
        </span>
      </div>
    </>
  );
}

const STEPS = ["General Questions", "Application Satisfaction", "Tool Usage", "Additional Comments"];

function Radio({ on = false }: { on?: boolean }) {
  return (
    <span className="grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full border border-text-secondary">
      {on && <span className="h-2 w-2 rounded-full bg-text-primary" />}
    </span>
  );
}

function FormShell({ current, errors = false, children }: { current: number; errors?: boolean; children: ReactNode }) {
  const errorDot = (
    <RIcon i="error" className="h-4 w-4" />
  );
  return (
    <>
      <RealBar active="Feedback" />
      <div className="flex flex-col gap-1.5 px-24 pt-6 pb-10">
        <BackLink to="Feedback Log" />
        <span className="text-[17px] font-medium text-text-primary">User Feedback Form</span>
        <div className="mt-4 flex items-start gap-4">
          <span className={`flex w-[230px] shrink-0 flex-col gap-3 rounded-[3px] border border-[var(--real-line)] bg-surface-raised p-3 text-[11px] ${cardShadow}`}>
            <span className="text-text-secondary">Please complete the following sections:</span>
            <span className="flex flex-col rounded-[3px] border border-[var(--real-line)]">
              {STEPS.map((st, i) => (
                <span
                  key={st}
                  className={`flex items-center gap-2 border-l-[3px] px-2.5 py-2 ${i > 0 ? "border-t border-t-[var(--real-line)]" : ""} ${
                    i === current ? "border-l-[var(--real-action)] bg-[var(--real-off)] text-text-primary" : `border-l-transparent ${link}`
                  }`}
                >
                  {i + 1}) {st}
                  {errors && i < 2 && <span className="ml-auto">{errorDot}</span>}
                </span>
              ))}
            </span>
            <span className="grid grid-cols-2 gap-2">
              <span className={`flex items-center justify-center gap-0.5 rounded-[3px] border border-[var(--real-action)] py-1.5 ${link}`}>
                <RIcon i="left" className="h-3 w-3" />
                Previous
              </span>
              <span
                className={`flex items-center justify-center gap-0.5 rounded-[3px] py-1.5 font-semibold ${
                  errors ? "bg-[var(--real-off)] text-text-tertiary" : "bg-[var(--real-action)] text-white"
                }`}
              >
                Next
                <RIcon i="right" className="h-3 w-3" />
              </span>
            </span>
            <span className={`rounded-[3px] border border-[var(--real-action)] py-1.5 text-center ${link}`}>Save for Later</span>
            {errors && (
              <>
                <span className="flex items-center gap-2 rounded-[3px] bg-[color-mix(in_oklab,var(--real-red)_14%,white)] px-2.5 py-2 text-text-primary">
                  {errorDot}
                  <span>
                    To continue, <span className={`underline ${link}`}>fix four errors</span>
                  </span>
                </span>
                <span className="rounded-[3px] bg-[var(--real-action)] py-1.5 text-center font-semibold text-white">Submit</span>
              </>
            )}
          </span>
          <span className={`flex min-w-0 flex-1 flex-col gap-3.5 rounded-[3px] border border-[var(--real-line)] bg-surface-raised p-4 text-[11px] text-text-primary ${cardShadow}`}>
            {children}
          </span>
        </div>
      </div>
    </>
  );
}

function RealFormToolUsage() {
  const cols = ["Very dissatisfied", "Dissatisfied", "Neither satisfied nor dissatisfied", "Satisfied", "Very satisfied"];
  return (
    <FormShell current={2}>
      <span className="text-[14px] font-medium">Tool Usage</span>
      <span className="flex flex-col gap-2">
        <span className="font-semibold">How often do you use the selected application?</span>
        {["Less than once a month", "Once a month", "More than once a month", "Once a week", "Several times a week"].map((o) => (
          <span key={o} className="flex items-center gap-2 text-text-secondary">
            <Radio on={o === "Once a week"} />
            {o}
          </span>
        ))}
      </span>
      <span className="flex flex-col gap-2">
        <span className="font-semibold">How often has the selected application been unavailable to you?</span>
        {["Once a month", "Once a week", "More than once a week", "Never, it has always been available when I need it"].map((o, i) => (
          <span key={o} className="flex items-center gap-2 text-text-secondary">
            <Radio on={i === 3} />
            {o}
          </span>
        ))}
      </span>
      <span className="flex flex-col gap-2">
        <span className="font-semibold">How satisfied are you with the following tool readiness activities?</span>
        <span className="grid grid-cols-[9rem_repeat(5,1fr)] items-center gap-y-2.5 text-text-secondary">
          <span />
          {cols.map((c) => (
            <span key={c} className="px-1 text-center text-[10px] leading-tight">
              {c}
            </span>
          ))}
          {["Training provided", "Tool demos", "Communications", "No training required"].map((r, ri) => (
            <span key={r} className="contents">
              <span>{r}</span>
              {cols.map((c, ci) => (
                <span key={c} className="flex justify-center">
                  <Radio on={ri < 3 && ci === [3, 4, 3][ri]} />
                </span>
              ))}
            </span>
          ))}
        </span>
      </span>
    </FormShell>
  );
}

function RealFormErrors() {
  const required = (
    <span className="flex items-center gap-1.5 text-[var(--real-red)]">
      <RIcon i="error" />
      Response is required
    </span>
  );
  const select = (label: string) => (
    <span className="flex flex-col gap-1.5">
      <span className="font-semibold">{label}</span>
      <span className="flex w-52 items-center justify-between rounded-[3px] border-2 border-[var(--real-red)] px-2 py-1 text-text-tertiary">
        <span />
        <span className="flex items-center self-stretch border-l border-[var(--real-line)] pl-1.5 text-text-primary">
          <RIcon i="down" />
        </span>
      </span>
      {required}
    </span>
  );
  return (
    <FormShell current={0} errors>
      <span className="text-[14px] font-medium">General Questions</span>
      {select("Select your role")}
      {select("Select an application")}
      <span className="flex flex-col gap-1.5">
        <span className="font-semibold">How well does the selected application help you do your role?</span>
        <span className="text-text-secondary">Scale: 1 = Not well at all, 5 = Extremely well</span>
        <span className="flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n} className="grid h-7 w-14 place-items-center rounded-[3px] border-2 border-[var(--real-red)]">
              {n}
            </span>
          ))}
        </span>
        {required}
      </span>
    </FormShell>
  );
}

const HIFI: { label: string; alt: string; address: string; tab: string; screen: ReactNode }[] = [
  {
    label: "Home",
    address: "hub.example/home",
    tab: "Hub",
    alt: "The home: a dark bar with Home, Feedback, notifications and an avatar; three alert banners stacked across the top for maintenance, issues and updates, each with Read More; a welcome column with application roles, resources and newsletter announcements; then recently viewed applications, the applications the person can open, and, in gray with Request Access, the ones they would request. Every card has View Details and Launch.",
    screen: <RealHome />,
  },
  {
    label: "Application details",
    address: "hub.example/home/policy-library",
    tab: "Hub",
    alt: "One application's details in a modal over the dimmed home: a maintenance window and an update, the person's access, both owners, the category and a description, with Documentation, a more menu and Launch App.",
    screen: <RealDetails />,
  },
  {
    label: "Notifications",
    address: "hub.example/notifications",
    tab: "Hub",
    alt: "Notifications: a search and a filter by application, with Make Selection to Apply Filter; on the right, Active and Past Updates tabs, Expand All and Close All, and alerts grouped under maintenance, issues and updates.",
    screen: <RealNotifications />,
  },
  {
    label: "Feedback log",
    address: "hub.example/feedback",
    tab: "Hub",
    alt: "The feedback log: two items with an ID, the date created and a status, one acknowledged and one a draft, with Download Data and Add New.",
    screen: <RealFeedbackLog />,
  },
  {
    label: "Feedback form",
    address: "hub.example/feedback/new",
    tab: "Hub",
    alt: "The feedback form on its third of four sections, Tool usage: how often the person uses the application, how often it has been unavailable, and a grid rating training, demos and communications from very dissatisfied to very satisfied.",
    screen: <RealFormToolUsage />,
  },
  {
    label: "Feedback form, errors",
    address: "hub.example/feedback/new",
    tab: "Hub",
    alt: "The feedback form with its errors showing: the first two sections marked, Next unavailable, a note to fix four errors, and on the right two selects and a one to five scale outlined in red, each marked Response is required.",
    screen: <RealFormErrors />,
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
