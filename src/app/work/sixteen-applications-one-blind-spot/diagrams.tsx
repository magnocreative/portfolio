import { CompareSlider } from "@/design-system/components/CompareSlider";
import { RecreatedScreen } from "@/design-system/components/RecreatedScreen";

/* The evidence for this study, drawn live rather than exported, the way the
   first study draws its token chain. Every one is a schematic made for this
   site: no USAA screen, no application name and no persona photo, which is
   the guide's rule and the reason they are drawn here at all. They follow the
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

function HubScreen({ open }: { open?: "search" | "menu" }) {
  return (
    <>
            {/* App header */}
            <div className="flex items-center gap-5 border-b border-border-subtle bg-surface-raised px-4 py-3 @md:px-5">
              <span className="flex items-center gap-2">
                <span className="grid h-6 w-6 grid-cols-2 gap-0.5 rounded-sm bg-interactive p-1">
                  <span className="rounded-[1px] bg-interactive-on" />
                  <span className="rounded-[1px] bg-interactive-on opacity-60" />
                  <span className="rounded-[1px] bg-interactive-on opacity-60" />
                  <span className="rounded-[1px] bg-interactive-on" />
                </span>
                <span className="text-sm font-semibold text-text-primary">Hub</span>
              </span>
              <span className="hidden items-center gap-4 text-xs text-text-secondary @2xl:flex">
                <span className="font-medium text-text-primary">Home</span>
                <span>Notifications</span>
                <span>Help</span>
              </span>
              <span className="ml-auto flex items-center gap-3">
                {/* Search, filled in: what a person types, and what the hub
                finds across all sixteen, applications and docs together. */}
                <span className="relative hidden @xl:block">
                  <span
                    className={`flex w-64 items-center gap-2 rounded-sm border bg-surface-page px-3 py-1.5 text-xs ${
                      open === "search"
                        ? "border-border-interactive ring-2 ring-[color-mix(in_oklab,var(--interactive-default)_20%,transparent)]"
                        : "border-border-default"
                    }`}
                  >
                    <Glyph d="search" className="h-3.5 w-3.5 text-text-tertiary" />
                    {open === "search" ? (
                      <span className="text-text-primary">
                        risk
                        <span className="ml-px inline-block h-3.5 w-px translate-y-0.5 bg-text-primary" />
                      </span>
                    ) : (
                      <span className="text-text-tertiary">Search applications and docs</span>
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
                <span className="text-text-secondary @xl:hidden">
                  <Glyph d="search" className="h-5 w-5" />
                </span>
                <span className="relative text-text-secondary">
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
                      open === "menu" ? "bg-surface-sunken" : ""
                    }`}
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-interactive-subtle font-label text-xs font-semibold text-text-accent">
                      JR
                    </span>
                    <Glyph d="chevron" className="h-3.5 w-3.5 text-text-tertiary" />
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
    </>
  );
}

export function HubMock({ open = "search" }: { open?: "search" | "menu" }) {
  return (
    <div
      role="img"
      aria-label="The hub, recreated with invented content, in a browser window. In the header, search has the word risk typed in, and its results list two applications, Risk Assessments (up) and Vendor Risk (request access), and a doc on how risk scores are calculated. Beside it, notifications with two unread and the account menu, which holds Report an incident. A maintenance banner reads: Issue Tracker is down Saturday, 2 to 4 AM. Filters for all platforms, Salesforce, ServiceNow and React sit above the applications. Under Your applications, six cards, each with the application's mark, name, platform, one line on what it's for, a status (Up, or Maintenance for the one going down), a Launch button and a Docs link. Under Request access, three cards in dashed outline with a Request access button and a Docs link. On the left, a welcome, the user's role, recently viewed applications with when, and resources."
      className="h-full w-full p-3 sm:p-6"
    >
      <RecreatedScreen address="hub.example">
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
          <RecreatedScreen address="platform.example">
            <ListScreen />
          </RecreatedScreen>
        ),
        label: "Out of the box",
        alt: "Out of the box, recreated with invented content: a platform's default list view titled All Applications, with a row of tabs and a table of application names, platforms, owners and last-modified dates. Nothing says what an application is for or whether it's up.",
      }}
      after={{
        node: (
          <RecreatedScreen address="hub.example">
            <HubScreen />
          </RecreatedScreen>
        ),
        label: "What we built",
        alt: "The hub as built, recreated with invented content: a maintenance banner, platform filters, and application cards that each say what the application is for, its status, and how to launch it or read its docs.",
      }}
    />
  );
}
