/* The evidence for this study, drawn live rather than exported, the way the
   first study draws its token chain. Every one is a schematic made for this
   site: no USAA screen, no application name and no persona photo, which is
   the guide's rule and the reason they are drawn here at all. They follow the
   theme because they are made of the system's roles, never its primitives.

   The three platforms are told apart by fill as well as color, so the split
   never rests on color alone: Salesforce a blue tint, ServiceNow a gray fill,
   React an outline. The split itself is approximate (about half, a quarter
   and a quarter): which application ran where isn't remembered, so the tiles
   are grouped by platform and never named. */

type Platform = "salesforce" | "servicenow" | "react";

const PLATFORM_TILE: Record<Platform, string> = {
  salesforce:
    "border-[color-mix(in_oklab,var(--interactive-default)_45%,var(--surface-raised))] bg-[color-mix(in_oklab,var(--interactive-default)_22%,var(--surface-raised))]",
  servicenow: "border-border-strong bg-surface-sunken",
  react: "border-dashed border-border-strong bg-transparent",
};

const PLATFORMS: { key: Platform; label: string; count: number }[] = [
  { key: "salesforce", label: "Salesforce", count: 8 },
  { key: "servicenow", label: "ServiceNow", count: 4 },
  { key: "react", label: "React", count: 4 },
];

const label = "font-label text-xs font-medium uppercase tracking-[0.11em] text-text-tertiary";

/* A gray bar standing in for a line of text. */
function Bar({ w, strong = false }: { w: string; strong?: boolean }) {
  return <span className={`block h-1.5 rounded-full ${strong ? "bg-border-strong" : "bg-border-default"}`} style={{ width: w }} />;
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
      <span className="flex w-56 flex-col gap-2.5 rounded-lg border border-border-subtle bg-surface-raised p-4 shadow-[0_8px_24px_rgb(3_16_33/0.08)]">
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
   The ecosystem: sixteen tiles in three platform groups, with nothing joining
   them. Side by side from a 34rem frame, stacked below that. */

export function Ecosystem() {
  return (
    <div
      role="img"
      aria-label="Sixteen unlabeled application tiles in three groups: about half Salesforce, a quarter ServiceNow and a quarter React. Nothing connects the groups."
      className="@container flex h-full w-full items-center justify-center p-6 @md:p-10"
    >
      <div className="grid w-full grid-cols-1 gap-8 @xl:grid-cols-[2fr_1fr_1fr] @xl:gap-10">
        {PLATFORMS.map((p) => (
          <div key={p.key} className="flex flex-col gap-3">
            <span className={label}>{p.label}</span>
            <div className={`grid gap-2.5 ${p.count === 8 ? "grid-cols-4" : "grid-cols-4 @xl:grid-cols-2"}`}>
              {Array.from({ length: p.count }, (_, i) => (
                <span
                  key={i}
                  className={`flex aspect-square flex-col justify-end gap-1.5 rounded-md border-2 p-2 ${PLATFORM_TILE[p.key]}`}
                >
                  <Bar w="70%" strong />
                  <Bar w="45%" />
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
   The hub. AppCard is its grayscale form, used in the build comparison
   below; HubMock is the near-shipped form the result shows. */

function AppCard({ requestable = false }: { requestable?: boolean }) {
  return (
    <span
      className={`flex flex-col gap-2 rounded-md border p-3 ${
        requestable ? "border-dashed border-border-default bg-transparent" : "border-border-subtle bg-surface-raised"
      }`}
    >
      <span className="flex items-center gap-1.5">
        {!requestable && <span className="h-2 w-2 shrink-0 rounded-full bg-status-success" />}
        <Bar w="65%" strong={!requestable} />
      </span>
      <Bar w="100%" />
      <Bar w="80%" />
      {/* Launch or request: a solid pill or a dashed one. The labels over
          the two rows say which is which, at the type scale's floor; a word
          inside a pill this size would have to go below it. */}
      <span
        className={`mt-1 h-3.5 w-12 rounded-full border ${
          requestable ? "border-dashed border-border-default" : "border-border-strong bg-surface-sunken"
        }`}
      />
    </span>
  );
}

/* The hub at near-shipped fidelity, recreated for this site with invented
   content: every application name, description, person and time below is
   made up, and the colors are this system's, not USAA's brand. What it keeps
   from the real hub is the thinking: each application says what it's for and
   whether it's up, the ones you can open sit apart from the ones you'd have
   to request, and maintenance is announced before you run into it.

   A picture, not an interface: the whole frame is role="img" and inert, and
   nothing in it is a link or a button, only drawn to look like one. */

type MockApp = {
  name: string;
  purpose: string;
  platform: string;
  maintenance?: boolean;
};

const MY_APPS: MockApp[] = [
  { name: "Policy Library", purpose: "Find and cite the current policies and standards.", platform: "Salesforce" },
  { name: "Issue Tracker", purpose: "Log control issues and track them to closure.", platform: "ServiceNow", maintenance: true },
  { name: "Risk Assessments", purpose: "Score and review risk by business area.", platform: "Salesforce" },
  { name: "Control Testing", purpose: "Plan tests and record results for each control.", platform: "Salesforce" },
  { name: "Incident Reporting", purpose: "Report an incident and follow its status.", platform: "ServiceNow" },
  { name: "Regulatory Change", purpose: "Track new rules and who they affect.", platform: "React" },
];

const REQUEST_APPS: MockApp[] = [
  { name: "Audit Workpapers", purpose: "Prepare and review audit evidence.", platform: "Salesforce" },
  { name: "Vendor Risk", purpose: "Assess third parties before onboarding.", platform: "React" },
  { name: "Compliance Training", purpose: "Assign and track required training.", platform: "ServiceNow" },
];

const mockLabel = "font-label text-xs font-medium uppercase tracking-[0.11em] text-text-tertiary";

function MockCard({ app, requestable = false }: { app: MockApp; requestable?: boolean }) {
  return (
    <span
      className={`flex h-full flex-col rounded-md border p-4 ${
        requestable ? "border-dashed border-border-default bg-transparent" : "border-border-subtle bg-surface-raised"
      }`}
    >
      <span className={`text-sm font-semibold leading-snug ${requestable ? "text-text-secondary" : "text-text-primary"}`}>
        {app.name}
      </span>
      {/* The platform and the status share a row, so a long name keeps the
          card's full width. In a narrow card the status drops under the
          platform rather than pushing past the edge. */}
      <span className="mt-1.5 flex min-h-6 flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
        <span className="font-label text-xs uppercase tracking-[0.08em] text-text-tertiary">{app.platform}</span>
        {!requestable &&
          (app.maintenance ? (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-[var(--radius-pill)] border border-[color-mix(in_oklab,var(--status-warning)_45%,transparent)] bg-[color-mix(in_oklab,var(--status-warning)_12%,transparent)] px-2 py-0.5 font-label text-xs font-medium text-text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-status-warning" />
              Maintenance
            </span>
          ) : (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-[var(--radius-pill)] border border-[color-mix(in_oklab,var(--status-success)_35%,transparent)] bg-[color-mix(in_oklab,var(--status-success)_8%,transparent)] px-2 py-0.5 font-label text-xs font-medium text-text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-status-success" />
              Up
            </span>
          ))}
      </span>
      <span className="mt-2 text-xs leading-relaxed text-text-secondary">{app.purpose}</span>
      <span className="mt-auto pt-4">
        <span
          className={`inline-block whitespace-nowrap rounded-sm px-3 py-1.5 text-xs font-medium ${
            requestable
              ? "border border-border-default text-text-secondary"
              : "bg-interactive text-interactive-on"
          }`}
        >
          {requestable ? "Request access" : "Launch"}
        </span>
      </span>
    </span>
  );
}

export function HubMock() {
  return (
    <div
      role="img"
      aria-label="The hub, recreated with invented content. A maintenance banner reads: Issue Tracker is down for scheduled maintenance Saturday, 2 to 4 AM. Under Your applications, six cards, each with the application's name, one line on what it's for, its platform, a status (Up, or Maintenance for the one that's going down) and a Launch button. Under Request access, three cards in dashed outline with a Request access button. On the left, a welcome, the user's role and recently viewed applications."
      className="@container h-full w-full p-3 @md:p-6"
    >
      <div inert className="overflow-hidden rounded-md border border-border-default bg-surface-page shadow-[0_8px_24px_rgb(3_16_33/0.06)]">
        {/* Top bar */}
        <div className="flex items-center gap-4 border-b border-border-subtle bg-surface-raised px-4 py-3 @md:px-5">
          <span className="flex items-center gap-2">
            <span className="grid h-6 w-6 grid-cols-2 gap-0.5 rounded-sm bg-interactive p-1">
              <span className="rounded-[1px] bg-interactive-on" />
              <span className="rounded-[1px] bg-interactive-on opacity-60" />
              <span className="rounded-[1px] bg-interactive-on opacity-60" />
              <span className="rounded-[1px] bg-interactive-on" />
            </span>
            <span className="text-sm font-semibold text-text-primary">Hub</span>
          </span>
          <span className="hidden items-center gap-4 text-xs text-text-secondary @lg:flex">
            <span className="font-medium text-text-primary">Home</span>
            <span>Notifications</span>
            <span>Help</span>
          </span>
          <span className="ml-auto flex items-center gap-3">
            <span className="relative h-4 w-4 rounded-full border-2 border-text-tertiary">
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-status-danger" />
            </span>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-surface-sunken font-label text-xs font-medium text-text-secondary">
              JR
            </span>
          </span>
        </div>

        {/* The alert: maintenance announced before anyone runs into it */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 border-b border-[color-mix(in_oklab,var(--status-warning)_35%,var(--surface-raised))] bg-[color-mix(in_oklab,var(--status-warning)_12%,var(--surface-raised))] px-4 py-2.5 text-xs @md:px-5">
          <span className="h-2 w-2 shrink-0 rounded-full bg-status-warning" />
          <span className="font-semibold text-text-primary">Scheduled maintenance</span>
          <span className="text-text-secondary">Issue Tracker is down Saturday, 2 to 4 AM.</span>
          <span className="font-medium text-text-accent underline decoration-1 underline-offset-2">Details</span>
        </div>

        <div className="flex gap-6 p-4 @md:p-6">
          {/* Profile and recents */}
          <div className="hidden w-40 shrink-0 flex-col @2xl:flex">
            <span className="text-sm font-semibold text-text-primary">Welcome back, Jordan</span>
            <span className="mt-0.5 text-xs text-text-secondary">Compliance analyst</span>
            <span className={`mt-6 ${mockLabel}`}>Recently viewed</span>
            <span className="mt-2 flex flex-col gap-2 text-xs text-text-secondary">
              <span>Control Testing</span>
              <span>Policy Library</span>
              <span>Risk Assessments</span>
            </span>
            <span className={`mt-6 ${mockLabel}`}>New here?</span>
            <span className="mt-2 text-xs leading-relaxed text-text-secondary">
              Sixteen applications, three platforms. Start with what each one is for.
            </span>
          </div>

          <div className="flex min-w-0 flex-1 flex-col">
            <span className="flex items-baseline gap-2">
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
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   The decision: the same content two ways. On the left, what out of the box
   would have given: a platform's default list view, dense tabs and rows,
   nothing about what an application is for. On the right, the hub as built.
   Side by side from a 40rem frame. */

function OutOfTheBox() {
  return (
    <div className="flex flex-col overflow-hidden rounded-md border border-border-default bg-surface-raised">
      <div className="flex items-center gap-2 border-b border-border-subtle bg-surface-sunken px-3 py-2">
        <span className="h-3 w-3 rounded-sm bg-border-strong" />
        <Bar w="3rem" strong />
        <span className="ml-auto">
          <Bar w="4rem" />
        </span>
      </div>
      <div className="flex gap-1 border-b border-border-subtle px-3 pt-2">
        {["3rem", "2.5rem", "3.5rem", "2rem", "3rem"].map((w, i) => (
          <span key={i} className={`rounded-t-sm border border-b-0 px-2 py-1.5 ${i === 0 ? "border-border-default bg-surface-page" : "border-transparent"}`}>
            <Bar w={w} strong={i === 0} />
          </span>
        ))}
      </div>
      <div className="flex flex-col px-3 py-2">
        <div className="grid grid-cols-[1.4fr_1fr_1fr_0.8fr] gap-2 border-b border-border-default py-1.5">
          {["80%", "70%", "60%", "70%"].map((w, i) => (
            <Bar key={i} w={w} strong />
          ))}
        </div>
        {Array.from({ length: 9 }, (_, r) => (
          <div key={r} className="grid grid-cols-[1.4fr_1fr_1fr_0.8fr] gap-2 border-b border-border-subtle py-1.5 last:border-0">
            {["90%", "60%", "75%", "50%"].map((w, i) => (
              <Bar key={i} w={w} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function AsBuilt() {
  return (
    <div className="flex flex-col overflow-hidden rounded-md border border-border-default bg-surface-page">
      <div className="flex items-center gap-2 border-b border-border-subtle bg-surface-raised px-3 py-2">
        <span className="h-3 w-3 rounded-sm bg-border-strong" />
        <Bar w="3rem" strong />
        <span className="ml-auto h-4 w-4 rounded-full bg-border-default" />
      </div>
      <div className="grid grid-cols-2 gap-2.5 p-3">
        {Array.from({ length: 4 }, (_, i) => (
          <AppCard key={i} />
        ))}
      </div>
    </div>
  );
}

export function BuildComparison() {
  return (
    <div
      role="img"
      aria-label="Two schematics side by side. Left, labeled Out of the box: a platform's default list view with a row of tabs and a dense table of rows and columns. Right, labeled What we built: the hub, four application cards with a status dot, a short description and a launch button each."
      className="@container h-full w-full p-4 @md:p-8"
    >
      <div className="grid grid-cols-1 gap-6 @2xl:grid-cols-2">
        <div className="flex flex-col gap-3">
          <span className={label}>Out of the box</span>
          <OutOfTheBox />
        </div>
        <div className="flex flex-col gap-3">
          <span className={label}>What we built</span>
          <AsBuilt />
        </div>
      </div>
    </div>
  );
}
