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
   The hub, in grayscale: the alert banner, then the applications you can
   open, then the ones you'd have to request. Users asked for that split in
   sketch testing. The profile column shows from a 40rem frame. */

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

export function HubSchematic() {
  return (
    <div
      role="img"
      aria-label="A grayscale schematic of the hub. A top bar, then a maintenance alert across the page. Below it, six applications the user can launch, each with a green status dot, and under them three applications the user would have to request access to, drawn in dashed outline."
      className="@container h-full w-full p-4 @md:p-8"
    >
      <div className="overflow-hidden rounded-md border border-border-default bg-surface-page">
        {/* Top bar */}
        <div className="flex items-center gap-3 border-b border-border-subtle bg-surface-raised px-4 py-3">
          <span className="h-4 w-4 rounded-sm bg-border-strong" />
          <Bar w="4.5rem" strong />
          <span className="ml-auto flex items-center gap-3">
            <span className="hidden @md:block">
              <Bar w="3rem" />
            </span>
            <span className="h-3.5 w-3.5 rounded-full border-2 border-border-strong" />
            <span className="h-5 w-5 rounded-full bg-border-default" />
          </span>
        </div>
        {/* The alert */}
        <div className="flex items-center gap-2 border-b border-border-subtle bg-[color-mix(in_oklab,var(--status-warning)_14%,var(--surface-raised))] px-4 py-2">
          <span className="h-2 w-2 shrink-0 rounded-full bg-status-warning" />
          <span className="font-label text-xs font-medium uppercase tracking-[0.08em] text-text-secondary">
            Scheduled maintenance
          </span>
          <span className="hidden flex-1 @md:block">
            <Bar w="40%" />
          </span>
        </div>

        <div className="flex gap-6 p-4 @md:p-6">
          {/* Profile column */}
          <div className="hidden w-32 shrink-0 flex-col gap-2.5 @2xl:flex">
            <span className="h-10 w-10 rounded-full bg-border-default" />
            <Bar w="80%" strong />
            <Bar w="100%" />
            <Bar w="60%" />
            <span className="mt-3 flex flex-col gap-2">
              <Bar w="70%" strong />
              <Bar w="90%" />
              <Bar w="85%" />
            </span>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <span className={label}>Your applications</span>
            <div className="grid grid-cols-2 gap-3 @lg:grid-cols-3">
              {Array.from({ length: 6 }, (_, i) => (
                <AppCard key={i} />
              ))}
            </div>
            <span className={`mt-3 ${label}`}>Request access</span>
            <div className="grid grid-cols-2 gap-3 @lg:grid-cols-3">
              {Array.from({ length: 3 }, (_, i) => (
                <span key={i} className={i === 2 ? "hidden @lg:block" : ""}>
                  <AppCard requestable />
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
