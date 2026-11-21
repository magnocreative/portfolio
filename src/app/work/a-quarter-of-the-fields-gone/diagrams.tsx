import { CompareSlider } from "@/design-system/components/CompareSlider";
import { RecreatedScreen } from "@/design-system/components/RecreatedScreen";
import { ImageGallery, type GalleryItem } from "@/design-system/components/ImageGallery";
import type { CSSProperties, ReactNode } from "react";
import sketch1 from "@/assets/audit/sketch-1.png";
import sketch2 from "@/assets/audit/sketch-2.png";
import sketch3 from "@/assets/audit/sketch-3.png";
import sketch4 from "@/assets/audit/sketch-4.png";
import sketch5 from "@/assets/audit/sketch-5.png";
import sketch6 from "@/assets/audit/sketch-6.png";

/* The evidence for the audit records study, drawn live like the GRC study's.
   Every one is made for this site with invented content: no USAA screen, no
   application name, no real person, and no vendor's own look. The two
   platforms are recreated generically, the way the GRC study recreates a
   platform's default list view: Classic as a dense page of labeled fields
   under section strips, Lightning as a header with highlights over grouped
   sections. Made of the system's roles, never its primitives.

   The field labels and the page structure follow Alejandro's own designs;
   the people, courses, numbers and dates are invented, and so is which four
   fields were cut. What is Alejandro's (November 2026): about a quarter of
   the fields went, the rest were grouped so related content sits together,
   and the homepage used three columns with one record type each. */

const label = "font-label text-xs font-medium uppercase tracking-[0.11em] text-text-tertiary";

/* A gray bar standing in for a line of text. */
function Bar({ w, strong = false, dashed = false }: { w: string; strong?: boolean; dashed?: boolean }) {
  return (
    <span
      className={`block h-1.5 rounded-full ${
        dashed ? "border border-dashed border-border-strong" : strong ? "bg-border-strong" : "bg-border-default"
      }`}
      style={{ width: w }}
    />
  );
}

/* --------------------------------------------------------------------------
   Hero subject: one long list of fields above three short groups. Upright,
   to fit the hero's 16.125rem column, in the same language as the other two
   studies: a label, the thing, a dashed link, the next thing.

   Eight rows become six, a quarter fewer. The two that go are drawn in
   dashed outline, so the cut never rests on color alone. */

const CLASSIC_ROWS: { label: string; value: string; cut?: boolean }[] = [
  { label: "2.5rem", value: "90%" },
  { label: "3rem", value: "70%" },
  { label: "2rem", value: "100%", cut: true },
  { label: "3.25rem", value: "60%" },
  { label: "2.5rem", value: "80%" },
  { label: "2.75rem", value: "75%", cut: true },
  { label: "3rem", value: "95%" },
  { label: "2.25rem", value: "70%" },
];

export function HeroSubject() {
  const link = (
    <span className="flex flex-col items-center" aria-hidden="true">
      <span className="h-12 border-l-2 border-dashed border-border-strong" />
      <span className="-mt-1 h-2.5 w-2.5 rounded-full bg-border-strong" />
    </span>
  );
  return (
    <div className="flex flex-col items-center gap-4">
      <span className={label}>Salesforce Classic</span>
      <span className="flex w-56 flex-col gap-3 rounded-lg border border-border-default bg-surface-sunken p-4">
        {CLASSIC_ROWS.map((row, i) => (
          <span key={i} className="flex items-center gap-3">
            <span className="shrink-0" style={{ width: row.label }}>
              <Bar w="100%" dashed={row.cut} />
            </span>
            <span className="flex-1">
              <Bar w={row.value} strong={!row.cut} dashed={row.cut} />
            </span>
          </span>
        ))}
      </span>
      {link}
      <span className={label}>Lightning, out of the box</span>
      <span className="grid w-56 grid-cols-3 gap-2">
        {[0, 1, 2].map((g) => (
          <span
            key={g}
            className="flex flex-col gap-2.5 rounded-lg border border-border-subtle bg-surface-raised p-3 shadow-[0_8px_24px_color-mix(in_oklab,var(--shadow-ink)_8%,transparent)]"
          >
            <span className="block h-1.5 w-8 rounded-full bg-interactive" />
            <Bar w="100%" strong />
            <Bar w="75%" />
          </span>
        ))}
      </span>
    </div>
  );
}

/* --------------------------------------------------------------------------
   The record, before and after. The application held three kinds of record,
   training, résumé and conflicts of interest; the training record stands in
   for all three. Its structure follows Alejandro's own Lightning designs
   (November 2026, from his old portfolio export, reference only): a
   highlights row, a Draft, Submitted, Complete path, a certificate section,
   then General Information, Training Event and Record Information, with a
   panel listing the sections still to fill. The labels are generic; the
   person, course, numbers and dates are invented.

   Classic carries sixteen fields and Lightning twelve. The four that go
   (Region, Cost Center, Legacy Course Code, Secondary Sponsor) are invented
   too: the kind of field longtime users told the team nobody filled in any
   more. */

const PERSON = { name: "Jordan Ellis", id: "E-204817", team: "IT Audit", unit: "AU-118" };
const COURSE = { title: "Data Analytics for Auditors", number: "DA-210", start: "Oct 3", end: "Oct 21" };

const CLASSIC_SECTIONS: { title: string; open: boolean; fields: [string, string][] }[] = [
  {
    title: "Training Information",
    open: true,
    fields: [
      ["Employee Name", PERSON.name],
      ["Employee ID", PERSON.id],
      ["Audit Team", PERSON.team],
      ["Audit Unit", PERSON.unit],
      ["Region", ""],
      ["Cost Center", ""],
    ],
  },
  {
    title: "Training Event",
    open: true,
    fields: [
      ["Course Title", COURSE.title],
      ["Course Number", COURSE.number],
      ["Start Date", COURSE.start],
      ["End Date", COURSE.end],
      ["Credit Hours", "12"],
      ["Course Status", "Attended"],
      ["Legacy Course Code", ""],
      ["Secondary Sponsor", ""],
    ],
  },
  { title: "Certification", open: false, fields: [["Certification", "Yes"]] },
  {
    title: "System Information",
    open: true,
    fields: [["Created By", "J. Ellis"]],
  },
];

function ClassicScreen() {
  return (
    <div className="bg-surface-raised text-[11px] leading-[1.4]">
      {/* The app's tabs, in a band */}
      <div className="flex items-center gap-1 border-b-2 border-border-strong bg-surface-sunken px-3 pt-2">
        {["Home", "Training", "Résumé", "Conflicts of Interest", "Reports"].map((t) => (
          <span
            key={t}
            className={`rounded-t-sm px-3 py-1 ${
              t === "Training" ? "bg-border-strong font-semibold text-surface-raised" : "text-text-secondary"
            }`}
          >
            {t}
          </span>
        ))}
      </div>

      {/* The record's title and button row */}
      <div className="flex items-end justify-between gap-4 px-4 pt-4 pb-3">
        <span className="flex flex-col">
          <span className="text-text-tertiary">Training Record</span>
          <span className="text-lg font-semibold text-text-primary">TR-0412</span>
        </span>
        <span className="flex gap-1">
          {["Edit", "Delete", "Clone", "Submit for Approval", "Printable View"].map((b) => (
            <span key={b} className="rounded-[4px] border border-border-strong bg-surface-sunken px-2 py-0.5 text-text-secondary">
              {b}
            </span>
          ))}
        </span>
      </div>

      {/* Sections: a strip with a toggle, then labels right-aligned beside
          their values, two to a row. One is closed, the way a user left it. */}
      <div className="flex flex-col gap-2 px-4 pb-4">
        {CLASSIC_SECTIONS.map((s) => (
          <div key={s.title} className="border border-border-default">
            <div className="flex items-center gap-1.5 bg-surface-sunken px-2 py-1 font-semibold text-text-primary">
              <span className="text-text-tertiary">{s.open ? "▾" : "▸"}</span>
              {s.title}
            </div>
            {s.open && (
              <div className="grid grid-cols-2">
                {s.fields.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[8.5rem_1fr] gap-3 border-t border-border-subtle px-2 py-1">
                    <span className="text-right font-semibold text-text-tertiary">{k}</span>
                    <span className="text-text-primary">{v || " "}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Related lists, stacked under the fields: the record keeps going
            below the first screenful, which is how it read in Classic. */}
        {["Notes & Attachments", "Approval History", "Open Activities"].map((t) => (
          <div key={t} className="border border-border-default">
            <div className="flex items-center justify-between bg-surface-sunken px-2 py-1">
              <span className="font-semibold text-text-primary">{t}</span>
              <span className="rounded-[4px] border border-border-strong bg-surface-raised px-2 text-text-secondary">New</span>
            </div>
            <div className="border-t border-border-subtle px-2 py-1 text-text-tertiary">
              {t === "Notes & Attachments" ? "1 record, show more »" : "No records to display"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Lightning, recreated. One set of screens drawn two ways (Alejandro,
   November 2026: bring in the grayscale and the high fidelity, as in the GRC
   study, then make both hyper realistic): `wire` draws the grayscale rough,
   with every value a gray bar and every color gray; without it, the high
   fidelity. Both are the platform's stock screens as a browser shows them:
   the global header with search and utility icons, the app's navigation bar,
   object icon tiles, report charts, the list view's toolbar and table, the
   record's highlights, path, collapsible sections with inline edit, and the
   file upload dialog. They follow his designs region for region; every name,
   number, date and course is invented, and so are the app's name and mark.
   No employer or Salesforce logo is drawn.

   Look: the platform's own, not this site's. Neutral buttons are white with
   a border, the one brand button is filled, as the stock components draw
   them (accuracy over the GRC study's custom look). Containers keep 8px. */

const LX_SKIN = {
  "--surface-page": "oklch(96.2% 0.002 250)",
  "--surface-sunken": "oklch(97.6% 0.002 250)",
  "--surface-raised": "oklch(100% 0 0)",
  "--border-subtle": "oklch(93% 0.002 70)",
  "--border-default": "oklch(89% 0.003 70)",
  "--border-strong": "oklch(80% 0.003 70)",
  "--text-primary": "oklch(21% 0 0)",
  "--text-secondary": "oklch(37% 0.003 70)",
  "--text-tertiary": "oklch(50% 0.006 70)",
  "--text-accent": "oklch(48% 0.15 254)",
  "--interactive-default": "oklch(55% 0.17 250)",
  "--interactive-on": "oklch(100% 0 0)",
  "--status-success": "oklch(62% 0.15 148)",
  fontFamily: '"Salesforce Sans", Arial, Helvetica, sans-serif',
} as CSSProperties;

/* In a rough, the platform's colors go gray with the rest */
const LX_WIRE_SKIN = {
  ...LX_SKIN,
  "--text-accent": "oklch(40% 0 0)",
  "--interactive-default": "oklch(42% 0 0)",
  "--status-success": "oklch(55% 0 0)",
} as CSSProperties;

/* A value, or in a rough a gray bar where the value would be */
function V({ wire, children, w = "70%" }: { wire?: boolean; children: ReactNode; w?: string }) {
  return wire ? (
    <span className="flex h-[1.5em] w-full flex-1 items-center">
      <Bar w={w} />
    </span>
  ) : (
    <>{children}</>
  );
}

const box = "rounded-[8px] border border-border-default bg-surface-raised shadow-[0_2px_2px_oklch(0%_0_0/0.06)]";
const neutralBtn =
  "inline-flex items-center gap-1.5 whitespace-nowrap rounded-[4px] border border-border-strong bg-surface-raised px-3 py-[5px] text-[13px] text-text-accent";
const brandBtn =
  "inline-flex items-center gap-1.5 whitespace-nowrap rounded-[4px] border border-interactive bg-interactive px-3 py-[5px] text-[13px] text-interactive-on";

/* The icons, drawn for this site in the platform's manner: line icons for
   utilities, white glyphs on a colored tile for objects. */
const ICONS: Record<string, ReactNode> = {
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 5 5" />
    </>
  ),
  chevron: <path d="m6 9 6 6 6-6" />,
  star: <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z" />,
  plus: <path d="M12 5v14M5 12h14" />,
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.6 9.4a2.5 2.5 0 0 1 4.8.9c0 1.7-2.4 2.2-2.4 3.7M12 17.2v.3" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.8v3M12 18.2v3M2.8 12h3M18.2 12h3M5.5 5.5l2.1 2.1M16.4 16.4l2.1 2.1M5.5 18.5l2.1-2.1M16.4 7.6l2.1-2.1" />
    </>
  ),
  bell: (
    <>
      <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15z" />
      <path d="M10 20.5a2 2 0 0 0 4 0" />
    </>
  ),
  pencil: <path d="m4.5 19.5 1-4.2L15.8 5a1.8 1.8 0 0 1 2.6 0l.6.6a1.8 1.8 0 0 1 0 2.6L8.7 18.5z" />,
  refresh: (
    <>
      <path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3" />
      <path d="M19.5 4.5v4h-4" />
    </>
  ),
  filter: <path d="M4 5h16l-6.2 7.4V19l-3.6-1.8v-4.8z" />,
  table: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="1.5" />
      <path d="M3.5 10h17M3.5 14.5h17M9.5 10v9" />
    </>
  ),
  pin: <path d="M9 4h6l-1 5 3 3v1.5H7V12l3-3zM12 13.5V20" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  arrowDown: <path d="M12 5v14M6.5 13.5 12 19l5.5-5.5" />,
  upload: <path d="M12 16V5M7 9.5 12 4.5l5 5M5 19.5h14" />,
};

function Ico({ name, className = "h-4 w-4" }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

/* Object icon tiles: a white glyph on the object's color */
const TILE_GLYPHS: Record<string, ReactNode> = {
  training: (
    <>
      <path d="M3 9.5 12 5l9 4.5-9 4.5z" />
      <path d="M7 11.5v4c1.4 1.3 3 2 5 2s3.6-.7 5-2v-4M21 9.5V15" />
    </>
  ),
  resume: (
    <>
      <rect x="5.5" y="3.5" width="13" height="17" rx="1.5" />
      <circle cx="12" cy="9" r="2.2" />
      <path d="M8.5 14.5h7M8.5 17.5h5" />
    </>
  ),
  conflict: (
    <>
      <path d="M12 3.5 19.5 6.5v5c0 4.4-3.1 7.8-7.5 9-4.4-1.2-7.5-4.6-7.5-9v-5z" />
      <path d="M12 8.5v4.5M12 16v.3" />
    </>
  ),
  report: <path d="M5 19.5V12M10 19.5V6M15 19.5v-9M20 19.5V9M3.5 19.5h18" />,
  file: (
    <>
      <path d="M6.5 3.5h7l4 4v13h-11z" />
      <path d="M13.5 3.5v4h4" />
    </>
  ),
  checklist: <path d="m4.5 7 1.5 1.5 3-3M4.5 13l1.5 1.5 3-3M4.5 19l1.5 1.5 3-3M12 7h7.5M12 13h7.5M12 19h7.5" />,
  recent: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
};

const TILE_COLORS: Record<string, string> = {
  training: "bg-[oklch(57%_0.17_300)]",
  resume: "bg-[oklch(64%_0.12_195)]",
  conflict: "bg-[oklch(70%_0.16_55)]",
  report: "bg-[oklch(66%_0.13_165)]",
  file: "bg-[oklch(62%_0.07_250)]",
  checklist: "bg-[oklch(62%_0.14_150)]",
  recent: "bg-[oklch(60%_0.12_235)]",
};

function Tile({ kind, size = "h-8 w-8" }: { kind: string; size?: string }) {
  return (
    <span className={`grid ${size} shrink-0 place-items-center rounded-[4px] ${TILE_COLORS[kind]} text-white`}>
      <svg viewBox="0 0 24 24" className="h-[62%] w-[62%]" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {TILE_GLYPHS[kind]}
      </svg>
    </span>
  );
}

/* A file's type, as the platform's small file tiles show it */
function PdfTile() {
  return (
    <span className="grid h-8 w-7 shrink-0 place-items-center rounded-[3px] bg-[oklch(55%_0.2_27)] text-[8px] font-bold tracking-wide text-white">
      PDF
    </span>
  );
}

/* The platform's checkbox, read-only */
function Check({ on }: { on: boolean }) {
  return (
    <span
      className={`grid h-3.5 w-3.5 place-items-center rounded-[2px] border ${
        on ? "border-interactive bg-interactive text-interactive-on" : "border-border-strong bg-surface-raised"
      }`}
    >
      {on && <Ico name="check" className="h-2.5 w-2.5" />}
    </span>
  );
}

/* The app's mark: its initials in white on a blue tile */
function AppMark() {
  return (
    <svg viewBox="0 0 40 30" className="h-[26px] w-[35px]" aria-hidden="true">
      <rect width="40" height="30" rx="7" fill="oklch(52% 0.15 250)" />
      <text x="20" y="15.5" textAnchor="middle" dominantBaseline="central" fontSize="15" fontWeight="700" letterSpacing="0.5" fill="white" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
        AR
      </text>
    </svg>
  );
}

/* The global header and the app's navigation bar, the same on every screen */
const NAV = ["Home", "My training", "My résumé", "Conflicts of interest", "Performance survey", "Skills assessment"];

function Chrome({ active, wire }: { active: string; wire?: boolean }) {
  return (
    <div className="relative z-10">
      <div className="flex h-11 items-center gap-3 bg-surface-raised px-3">
        {/* The app's mark, where the platform puts a logo (Salesforce's own,
            in the real project). Invented for this site: the app's initials
            on a blue tile (Alejandro,
            November 2026: no employer or platform logo here). */}
        <span className="flex w-52 items-center">
          <AppMark />
        </span>
        <span className="mx-auto flex h-8 w-[25rem] items-center overflow-hidden rounded-[4px] border border-border-strong bg-surface-raised text-[13px] text-text-tertiary">
          <span className="flex h-full items-center gap-1 border-r border-border-strong px-2 text-text-secondary">
            All
            <Ico name="chevron" className="h-3 w-3" />
          </span>
          <span className="flex items-center gap-2 px-2.5">
            <Ico name="search" className="h-3.5 w-3.5" />
            Search Audit Records and more…
          </span>
        </span>
        <span className="flex w-52 items-center justify-end gap-3 text-text-tertiary">
          <span className="flex items-center rounded-[4px] border border-border-strong">
            <span className="px-1 py-[3px]">
              <Ico name="star" className="h-3.5 w-3.5" />
            </span>
            <span className="border-l border-border-strong px-0.5 py-[3px]">
              <Ico name="chevron" className="h-3 w-3" />
            </span>
          </span>
          <span className="grid h-[22px] w-[22px] place-items-center rounded-[4px] bg-text-tertiary text-surface-raised">
            <Ico name="plus" className="h-3.5 w-3.5" />
          </span>
          <Ico name="help" />
          <Ico name="gear" />
          <span className="relative">
            <Ico name="bell" />
            {!wire && (
              <span className="absolute -top-1 -right-1.5 grid h-3.5 min-w-3.5 place-items-center rounded-full bg-[oklch(55%_0.2_27)] px-0.5 text-[8px] font-bold text-white">
                2
              </span>
            )}
          </span>
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[oklch(66%_0.08_45)] text-[10px] font-bold text-white">JE</span>
        </span>
      </div>
      <div className="flex h-10 items-stretch overflow-hidden border-b-[3px] border-interactive bg-surface-raised pl-3 shadow-[0_2px_3px_oklch(0%_0_0/0.1)]">
        <span className="mr-4 grid grid-cols-3 content-center gap-[3px]">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} className="h-[4px] w-[4px] rounded-full bg-text-secondary" />
          ))}
        </span>
        <span className="mr-4 flex items-center text-[17px] whitespace-nowrap text-text-primary">Audit Records</span>
        {NAV.map((t) => (
          <span
            key={t}
            className={`flex items-center gap-1 px-2.5 text-[12.5px] whitespace-nowrap ${
              t === active
                ? "-mb-[3px] border-b-[3px] border-[oklch(37%_0.11_256)] bg-[color-mix(in_oklab,var(--interactive-default)_9%,var(--surface-raised))] text-text-primary"
                : "text-text-secondary"
            }`}
          >
            {t}
            <Ico name="chevron" className="h-3 w-3 text-text-tertiary" />
          </span>
        ))}
        <span className="ml-auto flex items-center px-3 text-text-tertiary">
          <Ico name="pencil" className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
}

/* The page behind the cards: the platform's plain gray, as in his designs */
function Page({ wire, children, active }: { wire?: boolean; children: ReactNode; active: string }) {
  return (
    <div style={wire ? LX_WIRE_SKIN : LX_SKIN} className="relative bg-surface-page text-[13px] leading-normal text-text-primary">
      <Chrome active={active} wire={wire} />
      <div className="relative p-3">{children}</div>
    </div>
  );
}

/* The path, as the platform draws it: stages in chevrons, a check on the
   done ones, the current one dark */
function Path({ current = 0 }: { current?: number }) {
  const names = ["Draft", "Submitted", "Complete"];
  return (
    <div className="flex">
      {names.map((name, i) => {
        const state = i < current ? "done" : i === current ? "current" : "todo";
        return (
          <span
            key={name}
            className={`-ml-1.5 flex h-8 flex-1 items-center justify-center gap-1 text-[13px] first:ml-0 ${
              state === "done"
                ? "bg-status-success text-white"
                : state === "current"
                  ? "bg-[oklch(37%_0.11_256)] text-white"
                  : "bg-[oklch(93.5%_0.003_70)] text-text-secondary"
            }`}
            style={{
              clipPath:
                i === 0
                  ? "polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)"
                  : i === names.length - 1
                    ? "polygon(0 0, 100% 0, 100% 100%, 0 100%, 12px 50%)"
                    : "polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%, 12px 50%)",
              borderRadius: i === 0 ? "9999px 0 0 9999px" : i === names.length - 1 ? "0 9999px 9999px 0" : undefined,
            }}
          >
            {state === "done" ? <Ico name="check" className="h-4 w-4" /> : name}
          </span>
        );
      })}
    </div>
  );
}

/* A section's title: the platform's collapsible bar */
function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 rounded-[4px] bg-[oklch(95.5%_0.002_70)] px-2 py-1.5 text-sm text-text-primary">
      <Ico name="chevron" className="h-3.5 w-3.5 text-text-secondary" />
      {children}
    </div>
  );
}

/* A field in a record: label over value, a rule under, the inline edit
   pencil at right; an empty one shows the platform's placeholder */
function Field({ k, v, wire, link }: { k: string; v: string; wire?: boolean; link?: boolean }) {
  return (
    <div className="flex items-end gap-2 border-b border-border-default pt-2 pb-1">
      <span className="flex flex-1 flex-col">
        <span className="text-xs text-text-tertiary">{k}</span>
        {v ? (
          <span className={link ? "text-text-accent" : "text-text-primary"}>
            <V wire={wire}>{v}</V>
          </span>
        ) : (
          <span className="text-text-tertiary/70 italic">Type here…</span>
        )}
      </span>
      <span className="pb-0.5 text-text-tertiary">
        <Ico name="pencil" className="h-3.5 w-3.5" />
      </span>
    </div>
  );
}

const LIGHTNING_SECTIONS: { title: string; fields: [string, string][] }[] = [
  {
    title: "General information",
    fields: [
      ["Employee name", PERSON.name],
      ["Employee ID", PERSON.id],
      ["Audit team", PERSON.team],
      ["Audit unit", PERSON.unit],
    ],
  },
  {
    title: "Training event",
    fields: [
      ["Start date", COURSE.start],
      ["End date", COURSE.end],
      ["Course title", COURSE.title],
      ["Course number", COURSE.number],
      ["Credit hours", "12"],
      ["Course status", "Attended"],
    ],
  },
  {
    title: "Record information",
    fields: [
      ["Created by", PERSON.name],
      ["Last modified by", PERSON.name],
    ],
  },
];

/* The record page, laid out as his high fidelity: the header with its
   highlights, the path across, then the details in sections beside the list
   of sections still to fill and the record's feed. `upload` shows the
   certificate: attached (the finished record), still to attach (the
   rough), or uploading in the platform's dialog (the high fidelity of that
   moment). */
function LightningScreen({ wire = false, upload = "attached" }: { wire?: boolean; upload?: "attached" | "empty" | "uploading" }) {
  const attached = upload === "attached";
  const remaining = attached ? [] : ["Certificate of completion"];
  return (
    <Page wire={wire} active="My training">
      <div className="flex flex-col gap-3">
        {/* The header and its highlights */}
        <div className={box}>
          <div className="flex items-center gap-3 rounded-t-[8px] bg-surface-sunken px-4 py-3">
            <Tile kind="training" />
            <span className="flex flex-1 flex-col">
              <span className="text-xs text-text-secondary">My training</span>
              <span className="text-lg leading-tight font-bold text-text-primary">TR-0412</span>
            </span>
            <span className={neutralBtn}>
              <Ico name="plus" className="h-3.5 w-3.5" />
              Follow
            </span>
            <span className="flex">
              <span className={`${neutralBtn} rounded-r-none`}>Edit</span>
              <span className={`${neutralBtn} -ml-px rounded-l-none`}>Delete</span>
            </span>
          </div>
          <div className="flex gap-12 border-t border-border-subtle px-4 py-2.5">
            {[
              ["Certification", ""],
              ["Start date", COURSE.start],
              ["End date", COURSE.end],
              ["Course title", COURSE.title],
              ["Course status", "Attended"],
            ].map(([k, v]) => (
              <span key={k} className="flex min-w-16 flex-col gap-0.5">
                <span className="text-xs text-text-tertiary">{k}</span>
                <span className="text-text-primary">
                  {k === "Certification" ? <Check on={attached} /> : <V wire={wire}>{v}</V>}
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className={`p-3 ${box}`}>
          <Path current={0} />
        </div>

        <div className="grid grid-cols-[1fr_22.5rem] items-start gap-3">
          <div className={box}>
            <div className="flex gap-1 border-b border-border-default px-4 text-[13px] text-text-secondary">
              {["Details", "History"].map((t, i) => (
                <span key={t} className={`px-3 py-2.5 ${i === 0 ? "-mb-px border-b-2 border-interactive text-text-primary" : ""}`}>
                  {t}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-3 p-3">
              <div>
                <SectionTitle>Certificate of completion</SectionTitle>
                <div className="flex flex-col gap-2 px-2 pt-2">
                  <div className="border-b border-border-default pb-2">
                    <div className="text-xs text-text-tertiary">Certificate of completion help text</div>
                    <p className="text-text-primary">
                      A certificate of completion is required to complete the record. If you do not have one, ask
                      the training team.
                    </p>
                  </div>
                  <div className="border-b border-border-default pb-2">
                    <div className="mb-1 text-xs text-text-tertiary">Certificate of completion file attached</div>
                    <Check on={attached} />
                  </div>
                  <div className="overflow-hidden rounded-[4px] border border-border-default">
                    <div className="flex items-center gap-2.5 bg-surface-sunken px-3 py-2">
                      <Tile kind="file" size="h-6 w-6" />
                      <span className="flex-1 text-sm font-bold text-text-primary">Files ({attached ? 1 : 0})</span>
                      <span className={`${neutralBtn} px-1 py-0.5`}>
                        <Ico name="chevron" className="h-3 w-3" />
                      </span>
                    </div>
                    {attached ? (
                      <div className="flex items-center gap-2.5 border-t border-border-default px-3 py-2.5">
                        <PdfTile />
                        <span className="flex flex-col">
                          <span className="text-text-accent">
                            <V wire={wire} w="11rem">
                              Certificate of completion.pdf
                            </V>
                          </span>
                          <span className="text-xs text-text-tertiary">Oct 21 · 212KB · pdf</span>
                        </span>
                      </div>
                    ) : (
                      <div className="m-3 flex flex-col items-center gap-1.5 rounded-[4px] border border-dashed border-border-strong py-4 text-text-secondary">
                        <span className={neutralBtn}>
                          <Ico name="upload" className="h-3.5 w-3.5" />
                          Upload Files
                        </span>
                        Or drop files
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {LIGHTNING_SECTIONS.map((s) => (
                <div key={s.title}>
                  <SectionTitle>{s.title}</SectionTitle>
                  <div className="grid grid-cols-2 gap-x-6 px-2">
                    {s.fields.map(([k, v]) => (
                      <Field key={k} k={k} v={v} wire={wire} link={k === "Employee name" || k.endsWith(" by")} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className={`px-3 py-3.5 ${box}`}>
              <div className="mb-2 text-xs font-bold whitespace-nowrap text-text-primary">Progress towards completion: remaining sections</div>
              {remaining.length ? (
                remaining.map((r) => (
                  <div key={r} className="py-1 text-text-secondary">
                    {r}
                  </div>
                ))
              ) : (
                <div className="flex items-center gap-2 py-1 text-text-secondary">
                  <span className="grid h-4 w-4 place-items-center rounded-full bg-status-success text-white">
                    <Ico name="check" className="h-3 w-3" />
                  </span>
                  Every section is complete
                </div>
              )}
            </div>

            {/* The record's feed, as the platform puts it beside a record */}
            <div className={box}>
              <div className="border-b border-border-default px-4">
                <span className="-mb-px inline-block border-b-2 border-interactive py-2.5 text-text-primary">Chatter</span>
              </div>
              <div className="flex flex-col gap-3 p-3">
                <div className="overflow-hidden rounded-[4px] border border-border-default">
                  <div className="flex gap-5 bg-surface-sunken px-3 pt-2 text-xs text-text-secondary">
                    {["Post", "Poll", "Question"].map((t, i) => (
                      <span key={t} className={`pb-1.5 ${i === 0 ? "border-b-2 border-interactive text-text-primary" : ""}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 border-t border-border-default p-2">
                    <span className="flex-1 rounded-[4px] border border-border-strong px-2 py-1 text-xs text-text-tertiary">
                      Share an update…
                    </span>
                    <span className={`${brandBtn} px-2.5 py-1 text-xs`}>Share</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`${neutralBtn} px-1.5 py-1`}>
                    <Ico name="arrowDown" className="h-3 w-3" />
                    <Ico name="chevron" className="h-3 w-3" />
                  </span>
                  <span className="flex flex-1 items-center gap-1.5 rounded-[4px] border border-border-strong px-2 py-1 text-xs text-text-tertiary">
                    <Ico name="search" className="h-3 w-3" />
                    Search this feed…
                  </span>
                  <span className="text-text-tertiary">
                    <Ico name="refresh" className="h-3.5 w-3.5" />
                  </span>
                </div>
                <div className="flex flex-col gap-2 border-t border-border-subtle pt-3">
                  <div className="flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[oklch(68%_0.07_160)] text-[10px] font-bold text-white">SR</span>
                    <span className="flex flex-col leading-tight">
                      <span className="text-text-accent">Sam Rivera</span>
                      <span className="text-xs text-text-tertiary">Just now</span>
                    </span>
                  </div>
                  <p className="text-text-primary">
                    <V wire={wire} w="90%">
                      Attach your certificate before you submit, and reach out to me with any questions.
                    </V>
                  </p>
                  <div className="flex gap-5 border-t border-border-subtle pt-2 text-xs text-text-secondary">
                    <span>Like</span>
                    <span>Comment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The upload, in the platform's dialog over a dimmed page */}
      {upload === "uploading" && !wire && (
        <div className="absolute inset-0 z-20 flex items-start justify-center bg-[oklch(18%_0.01_260/0.6)] pt-56">
          <div className="relative w-[34rem]">
            <span className="absolute -top-9 right-0 grid h-7 w-7 place-items-center text-white">
              <Ico name="close" className="h-5 w-5" />
            </span>
            <div className="overflow-hidden rounded-[8px] bg-surface-raised shadow-[0_8px_32px_oklch(0%_0_0/0.3)]">
              <div className="border-b border-border-default px-5 py-4 text-center text-xl text-text-primary">Upload Files</div>
              <div className="flex items-center gap-3 px-6 py-6">
                <PdfTile />
                <span className="flex flex-1 flex-col gap-1.5">
                  <span className="text-text-accent">Certificate of completion.pdf</span>
                  <span className="text-xs text-text-tertiary">212KB</span>
                </span>
                <span className="h-1.5 w-40 rounded-full bg-status-success" />
                <span className="grid h-5 w-5 place-items-center rounded-full bg-status-success text-white">
                  <Ico name="check" className="h-3.5 w-3.5" />
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-border-default bg-surface-sunken px-5 py-3">
                <span className="text-text-secondary">1 of 1 file uploaded</span>
                <span className={brandBtn}>Done</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Page>
  );
}

/* Drawn at 900 rather than the default 840, so both records fit the 4:3
   frame at every width: below 900 the screen scales down as a picture. */
export function RecordComparison() {
  return (
    <CompareSlider
      label="Compare the training record in Classic with the record in Lightning"
      before={{
        node: (
          <RecreatedScreen address="records.example" width={900}>
            <ClassicScreen />
          </RecreatedScreen>
        ),
        label: "Classic",
        alt: "Classic, recreated with invented content: a training record as a dense page of sixteen labeled fields under section strips, Training Information, Training Event, a closed Certification section and System Information, with Region, Cost Center, Legacy Course Code and Secondary Sponsor left empty, and related lists stacked below.",
      }}
      after={{
        node: (
          <RecreatedScreen address="records.example" width={900}>
            <LightningScreen />
          </RecreatedScreen>
        ),
        label: "Lightning",
        alt: "Lightning, recreated with invented content: the same training record with its highlights in the header, a path from Draft to Submitted to Complete with Draft current, the certificate attached, twelve fields in three sections, General information, Training event and Record information, each with an edit pencil, and beside them the sections still to fill and the record's feed.",
      }}
    />
  );
}

/* --------------------------------------------------------------------------
   The homepage: three columns, one record type each, in a layout the
   platform offered as it came. Each column is two stock components, a report
   chart over a list of recent records, which is the point: nothing here
   needed building. Laid out as his high fidelity; the counts, names and
   records are invented. */

function Donut({ parts }: { parts: { value: number; tone: string }[] }) {
  const total = parts.reduce((a, p) => a + p.value, 0);
  const r = 30;
  const c = 2 * Math.PI * r;
  const offsets = parts.map((_, i) => parts.slice(0, i).reduce((a, p) => a + (p.value / total) * c, 0));
  return (
    <svg viewBox="0 0 72 72" className="h-28 w-28 -rotate-90">
      {parts.map((p, i) => {
        const len = (p.value / total) * c;
        return (
          <circle
            key={i}
            cx="36"
            cy="36"
            r={r}
            fill="none"
            strokeWidth="9"
            className={p.tone}
            stroke="currentColor"
            strokeDasharray={`${len - 0.6} ${c - len + 0.6}`}
            strokeDashoffset={-offsets[i]}
          />
        );
      })}
    </svg>
  );
}

const TONES = {
  light: "text-[oklch(80%_0.11_185)]",
  mid: "text-[oklch(60%_0.15_250)]",
  dark: "text-[oklch(35%_0.11_258)]",
};

const HOME_COLUMNS: {
  title: string;
  legendTitle: string;
  asOf: string;
  parts: { label: string; value: number; tone: string }[];
  recent: { title: string; tile: string; count: number; total: number; sort: string; rows: { id: string; fields: [string, string][] }[] };
}[] = [
  {
    title: "My training status: all user records",
    legendTitle: "Course status",
    asOf: "9:41 AM",
    parts: [
      { label: "Planned", value: 14, tone: TONES.light },
      { label: "Attended", value: 31, tone: TONES.mid },
      { label: "Cancelled", value: 9, tone: TONES.dark },
    ],
    recent: {
      title: "My training: recent records",
      tile: "training",
      count: 3,
      total: 14,
      sort: "training number",
      rows: [
        { id: "TR-0412", fields: [["Certification", "check:0"], ["Start date", "10/3/2022"], ["End date", "10/21/2022"], ["Course title", COURSE.title], ["Course status", "Attended"]] },
        { id: "TR-0398", fields: [["Certification", "check:1"], ["Start date", "9/8/2022"], ["End date", "9/9/2022"], ["Course title", "Third-Party Risk Basics"], ["Course status", "Attended"]] },
        { id: "TR-0391", fields: [["Certification", "check:1"], ["Start date", "8/14/2022"], ["End date", "8/16/2022"], ["Course title", "Audit Sampling in Practice"], ["Course status", "Planned"]] },
      ],
    },
  },
  {
    title: "My résumé status: all user records",
    legendTitle: "Résumé status",
    asOf: "9:41 AM",
    parts: [
      { label: "Current", value: 17, tone: TONES.mid },
      { label: "Needs review", value: 6, tone: TONES.light },
    ],
    recent: {
      title: "My résumé: recent records",
      tile: "resume",
      count: 3,
      total: 6,
      sort: "résumé number",
      rows: [
        { id: "RS-0077", fields: [["Employee", PERSON.name], ["Job title", "Auditor II"], ["Employee status", "Active"], ["Group", "Audit services"], ["Employee ID", PERSON.id]] },
        { id: "RS-0071", fields: [["Employee", "Priya Shah"], ["Job title", "Senior auditor"], ["Employee status", "Active"], ["Group", "Audit services"], ["Employee ID", "E-198342"]] },
        { id: "RS-0064", fields: [["Employee", "Marcus Bell"], ["Job title", "Auditor I"], ["Employee status", "Active"], ["Group", "Audit services"], ["Employee ID", "E-211906"]] },
      ],
    },
  },
  {
    title: "COI status: all user records",
    legendTitle: "Completion status",
    asOf: "9:41 AM",
    parts: [
      { label: "Complete", value: 16, tone: TONES.mid },
      { label: "Incomplete", value: 22, tone: TONES.dark },
    ],
    recent: {
      title: "COI status: recent records",
      tile: "conflict",
      count: 3,
      total: 12,
      sort: "COI number",
      rows: [
        { id: "CI-0033", fields: [["Owner", PERSON.name], ["Supervisor", "Dana Cole"], ["Status", "Complete"], ["Group", "Audit services"], ["Completion date", "12/20/2022"]] },
        { id: "CI-0029", fields: [["Owner", "Elena Ruiz"], ["Supervisor", "Dana Cole"], ["Status", "Complete"], ["Group", "Audit services"], ["Completion date", "1/16/2023"]] },
        { id: "CI-0024", fields: [["Owner", "Priya Shah"], ["Supervisor", "Dana Cole"], ["Status", "Incomplete"], ["Group", "Audit services"], ["Completion date", ""]] },
      ],
    },
  },
];

function HomeScreen({ wire = false }: { wire?: boolean }) {
  return (
    <Page wire={wire} active="Home">
      <div className="grid grid-cols-3 items-start gap-3">
        {HOME_COLUMNS.map((col) => {
          const total = col.parts.reduce((a, p) => a + p.value, 0);
          return (
            <div key={col.title} className="flex flex-col gap-3">
              {/* The report chart */}
              <div className={box}>
                <div className="truncate px-3 pt-3 text-[13px] font-bold text-text-primary">{col.title}</div>
                <div className="flex items-center gap-3 px-3 py-3">
                  <span className="relative">
                    <Donut parts={col.parts} />
                    <span className="absolute inset-0 flex flex-col items-center justify-center leading-none">
                      <span className="text-2xl text-text-primary">{total}</span>
                      <span className="mt-1 text-[11px] text-text-secondary">Records</span>
                    </span>
                  </span>
                  <span className="flex flex-1 flex-col gap-1.5 text-xs">
                    <span className="mb-0.5 text-right text-text-secondary">{col.legendTitle}</span>
                    {col.parts.map((p) => (
                      <span key={p.label} className="flex items-center justify-end gap-2 text-text-secondary">
                        <V wire={wire} w="70%">
                          {p.label}
                        </V>
                        <span className={`h-2.5 w-2.5 shrink-0 rounded-full bg-current ${p.tone}`} />
                      </span>
                    ))}
                  </span>
                </div>
                <div className="flex justify-between border-t border-border-subtle px-3 py-2 text-xs">
                  <span className="text-text-accent">View Report</span>
                  <span className="text-text-tertiary">As of today at {col.asOf}</span>
                </div>
              </div>

              {/* The recent records under it */}
              <div className={box}>
                <div className="flex items-center gap-2.5 rounded-t-[8px] bg-surface-sunken px-3 py-2.5">
                  <Tile kind={col.recent.tile} />
                  <span className="flex min-w-0 flex-col leading-tight whitespace-nowrap">
                    <span className="truncate text-[13px] font-bold text-text-primary">
                      {col.recent.title} ({col.recent.count})
                    </span>
                    <span className="truncate text-xs text-text-tertiary">
                      {col.recent.total} items, sorted by {col.recent.sort}
                    </span>
                  </span>
                </div>
                {col.recent.rows.map((row) => (
                  <div key={row.id} className="border-t border-border-subtle px-3 py-2.5 text-xs">
                    <div className="mb-1 text-[13px] text-text-accent">{row.id}</div>
                    {row.fields.map(([k, v]) => (
                      <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-2 py-[3px]">
                        <span className="text-text-tertiary">{k}:</span>
                        <span className="text-text-primary">
                          {v.startsWith("check:") ? <Check on={v === "check:1"} /> : v ? <V wire={wire}>{v}</V> : null}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
                <div className="border-t border-border-subtle py-2 text-center text-xs text-text-accent">View All</div>
              </div>
            </div>
          );
        })}
      </div>
    </Page>
  );
}

export function HomeMock() {
  return (
    <div
      role="img"
      aria-label="The homepage, recreated with invented content, in a browser window: three columns of equal width, one record type each, training, résumé and conflicts of interest. Each column has a report chart of all users' records as a ring, with the total in the middle and a legend, over a card of the most recent records with their key fields."
      className="h-full w-full"
    >
      {/* No backdrop or padding: the browser window is its own frame */}
      <RecreatedScreen address="records.example" width={1000}>
        <HomeScreen />
      </RecreatedScreen>
    </div>
  );
}

/* The list view: the platform's stock list of one record type */
const TRAINING_ROWS: [string, boolean, string, string, string, string][] = [
  ["TR-0412", false, "10/3/2022", "10/21/2022", COURSE.title, "Attended"],
  ["TR-0398", true, "9/8/2022", "9/9/2022", "Third-Party Risk Basics", "Attended"],
  ["TR-0391", true, "8/14/2022", "8/16/2022", "Audit Sampling in Practice", "Planned"],
  ["TR-0377", true, "7/22/2022", "7/22/2022", "Writing Clear Findings", "Attended"],
  ["TR-0365", false, "6/10/2022", "6/12/2022", "Cloud Controls Overview", "Cancelled"],
  ["TR-0352", true, "5/6/2022", "5/7/2022", "Fraud Risk Indicators", "Attended"],
  ["TR-0341", true, "4/15/2022", "4/15/2022", "Ethics Refresher", "Attended"],
  ["TR-0336", false, "3/18/2022", "3/20/2022", "Data Privacy Basics", "Cancelled"],
  ["TR-0322", true, "2/9/2022", "2/10/2022", "Continuous Auditing", "Attended"],
  ["TR-0310", true, "1/12/2022", "1/13/2022", "Model Risk Fundamentals", "Attended"],
  ["TR-0298", false, "12/6/2021", "12/8/2021", "Audit Sampling in Practice", "Planned"],
  ["TR-0285", true, "11/15/2021", "11/16/2021", "Writing Clear Findings", "Attended"],
  ["TR-0274", true, "10/4/2021", "10/5/2021", "Third-Party Risk Basics", "Attended"],
  ["TR-0261", false, "9/13/2021", "9/14/2021", "Cloud Controls Overview", "Planned"],
];

function ListScreen({ wire = false }: { wire?: boolean }) {
  const cols = ["My training number", "Certification", "Start date", "End date", "Course title", "Course status"];
  const grid = "grid grid-cols-[2rem_1.75rem_10.5rem_7rem_7rem_6.5rem_1fr_8rem_2rem]";
  return (
    <Page wire={wire} active="My training">
      <div className={box}>
        <div className="flex items-start justify-between gap-4 rounded-t-[8px] bg-surface-sunken px-4 pt-3">
          <span className="flex items-center gap-3">
            <Tile kind="training" />
            <span className="flex flex-col leading-tight">
              <span className="text-xs text-text-secondary">My training</span>
              <span className="flex items-center gap-1.5 text-lg font-bold text-text-primary">
                Recently Viewed
                <Ico name="chevron" className="h-4 w-4" />
                <span className="ml-1 grid h-5 w-5 place-items-center rounded-[4px] border border-border-strong bg-surface-raised text-text-accent">
                  <Ico name="pin" className="h-3 w-3" />
                </span>
              </span>
            </span>
          </span>
          <span className="flex">
            <span className={`${neutralBtn} rounded-r-none`}>New</span>
            <span className={`${neutralBtn} -ml-px rounded-none`}>Import</span>
            <span className={`${neutralBtn} -ml-px rounded-l-none px-1.5`}>
              <Ico name="chevron" className="h-3.5 w-3.5" />
            </span>
          </span>
        </div>
        <div className="flex items-center justify-between gap-4 bg-surface-sunken px-4 py-2.5">
          <span className="text-xs text-text-secondary">
            {TRAINING_ROWS.length} items · Sorted by Start date · Updated a few seconds ago
          </span>
          <span className="flex items-center gap-1.5 text-text-tertiary">
            <span className="flex w-56 items-center gap-1.5 rounded-[4px] border border-border-strong bg-surface-raised px-2 py-[5px] text-xs">
              <Ico name="search" className="h-3 w-3" />
              Search this list…
            </span>
            {["gear", "table"].map((n) => (
              <span key={n} className="flex items-center gap-0.5 rounded-[4px] border border-border-strong bg-surface-raised px-1.5 py-[5px]">
                <Ico name={n} className="h-3.5 w-3.5" />
                <Ico name="chevron" className="h-2.5 w-2.5" />
              </span>
            ))}
            {["refresh", "pencil", "filter"].map((n) => (
              <span key={n} className="rounded-[4px] border border-border-strong bg-surface-raised px-1.5 py-[5px]">
                <Ico name={n} className="h-3.5 w-3.5" />
              </span>
            ))}
          </span>
        </div>
        <div className={`${grid} items-center border-y border-border-default bg-surface-sunken text-xs text-text-secondary`}>
          <span />
          <span className="flex justify-center py-2">
            <Check on={false} />
          </span>
          {cols.map((c) => (
            <span key={c} className="flex items-center justify-between gap-1 border-l border-border-default px-2 py-2 whitespace-nowrap">
              <span className="flex items-center gap-1">
                {c}
                {c === "Start date" && <Ico name="arrowDown" className="h-3 w-3" />}
              </span>
              <Ico name="chevron" className="h-3 w-3 text-text-tertiary" />
            </span>
          ))}
          <span className="border-l border-border-default py-2" />
        </div>
        {TRAINING_ROWS.map(([id, cert, start, end, title, status], i) => (
          <div key={id} className={`${grid} items-center border-b border-border-subtle text-[13px] last:border-b-0`}>
            <span className="py-2 text-center text-xs text-text-secondary">{i + 1}</span>
            <span className="flex justify-center">
              <Check on={false} />
            </span>
            <span className="px-2 text-text-accent">{id}</span>
            <span className="px-2 text-text-primary">{cert && <Ico name="check" className="h-3.5 w-3.5" />}</span>
            <span className="px-2 text-text-primary">
              <V wire={wire} w="75%">{start}</V>
            </span>
            <span className="px-2 text-text-primary">
              <V wire={wire} w="75%">{end}</V>
            </span>
            <span className="px-2 text-text-primary">
              <V wire={wire} w="80%">{title}</V>
            </span>
            <span className="px-2 text-text-primary">
              <V wire={wire} w="70%">{status}</V>
            </span>
            <span className="flex justify-center">
              <span className="grid h-4 w-4 place-items-center rounded-[3px] border border-border-strong text-text-tertiary">
                <Ico name="chevron" className="h-2.5 w-2.5" />
              </span>
            </span>
          </div>
        ))}
      </div>
    </Page>
  );
}

/* --------------------------------------------------------------------------
   From sketch to screen: the three stages, in galleries like the GRC
   study's. The sketches are Alejandro's own, from his earlier portfolio, with
   the product's name taken out of each; the roughs and the high fidelity are
   the recreations above. */

const SKETCH_ITEMS: GalleryItem[] = [
  { src: sketch1, label: "Homepage 1", alt: "A homepage in three columns, each a ring chart over a stack of record cards." },
  { src: sketch2, label: "Homepage 2", alt: "A homepage in three rows, each a ring chart beside a wide card of records." },
  { src: sketch3, label: "Homepage 3", alt: "A homepage with three ring charts across the top and a list of records below." },
  { src: sketch4, label: "List view", alt: "A list view: a header with a title, search and buttons, then a long table of records with checkboxes." },
  { src: sketch5, label: "Record page 1", alt: "A record page: a header, a path in three stages, two tabs of fields with edit icons, a collapsed section, and a files panel at the side." },
  { src: sketch6, label: "Record page 2", alt: "A second record page: the header and path, a row of tabs over fields, collapsed sections, and a files section across the foot." },
];

export function SketchSheet() {
  return <ImageGallery items={SKETCH_ITEMS} label="My first sketches" ratio="4/3" columns={3} />;
}


/* The GRC study's frames and sizes, so the two progressions match */
const W = 1100;
const HI_W = 1160;
const SCREEN_W = 1100;
/* The screens are drawn about 960 wide, as his were; at 1100 their type
   would read small, so they are scaled up to fill the frame. Each frame is a
   fixed height, the way a screenshot is the browser's window, not the page. */
const ZOOM = 1.15;

/* A rough on its artboard: gray, no browser */
function Artboard({ children }: { children: ReactNode }) {
  return (
    <div data-scheme="light" className="bg-surface-sunken p-10" style={{ width: W }}>
      <div className="relative h-[720px] overflow-hidden border border-border-default bg-surface-raised text-text-primary shadow-[var(--shadow-chip)] [filter:grayscale(1)]">
        <div style={{ zoom: ZOOM }}>{children}</div>
      </div>
    </div>
  );
}

/* A high fidelity screen in its browser */
function HiFrame({ children, address }: { children: ReactNode; address: string }) {
  return (
    <div data-scheme="light" className="bg-surface-sunken p-[30px]" style={{ width: HI_W }}>
      <RecreatedScreen address={address} tab="Audit Records" width={SCREEN_W}>
        <div className="h-[760px] overflow-hidden bg-surface-page text-text-primary">
          <div style={{ zoom: ZOOM }}>{children}</div>
        </div>
      </RecreatedScreen>
    </div>
  );
}

const STAGES: { label: string; alt: string; address: string; screen: (wire: boolean) => ReactNode; wireAlt?: string }[] = [
  {
    label: "Homepage",
    address: "records.example",
    alt: "The homepage in three columns, one record type each: a report chart of all users' records as a ring, over a card of recent records with their key fields.",
    screen: (wire) => <HomeScreen wire={wire} />,
  },
  {
    label: "List view",
    address: "records.example/training",
    alt: "The training list, Recently Viewed: New and Import, a count and sort line, a search and the list tools, and a table of records with number, certification, dates, course and status.",
    screen: (wire) => <ListScreen wire={wire} />,
  },
  {
    label: "Record page",
    address: "records.example/training/TR-0412",
    alt: "A training record: a header with Follow, Edit and Delete over its highlights, a path from Draft to Complete, the certificate attached and fields in collapsible sections with edit pencils, and beside them the sections still to fill and the record's feed.",
    screen: (wire) => <LightningScreen wire={wire} />,
  },
  {
    label: "Certificate",
    address: "records.example/training/TR-0412",
    wireAlt: "The same record before its certificate: the certificate section with its help text, an empty Files card with Upload Files and a place to drop files, and the certificate listed as the section still to fill.",
    alt: "The certificate uploading over the record: a dialog with the file, a full progress bar, 1 of 1 file uploaded, and Done.",
    screen: (wire) => <LightningScreen wire={wire} upload={wire ? "empty" : "uploading"} />,
  },
];

export function WireframeMock() {
  return (
    <ImageGallery
      label="The grayscale roughs"
      columns={2}
      ratio="4/3"
      items={STAGES.map((st) => ({
        label: st.label,
        alt: `${st.wireAlt ?? st.alt} A grayscale rough, recreated with invented content.`,
        width: W,
        node: <Artboard>{st.screen(true)}</Artboard>,
      }))}
    />
  );
}

export function HiFiGallery() {
  return (
    <ImageGallery
      label="The high fidelity designs"
      columns={2}
      ratio="4/3"
      items={STAGES.map((st) => ({
        label: st.label,
        alt: `${st.alt} Recreated with invented content.`,
        width: HI_W,
        node: <HiFrame address={st.address}>{st.screen(false)}</HiFrame>,
      }))}
    />
  );
}

/* --------------------------------------------------------------------------
   The flow: Alejandro's user flow, recreated in full (November 2026: make it
   much more authentic to the original), without its sign-in steps. In his
   flowchart's own notation: blue boxes for screens, bracketed shapes for
   what the user does, diamonds for decisions, green for success, pink for
   failure. The homepage, the page links, and five lanes, one per record
   type, each status, list, select, record, edit, save, with Cancel looping
   back and a saved change returning to the record; and the one exception,
   conflict of interest changes waiting on approval.

   Cropped (Alejandro, November 2026): his flow also ran sign-in, retry,
   password reset and registration up the left side. That is the platform's
   standard behavior, not a decision of his, and it took attention from the
   point the figure proves: five identical lanes and one that branches. The
   product's name is left out ("Homepage"). A picture of his flowchart, so
   it stays light in both themes, as the original was. */

const FW = 1220;
const FH = 830;
const FC = {
  screen: "oklch(88.5% 0.055 228)",
  screenEdge: "oklch(72% 0.07 230)",
  decision: "oklch(66% 0.14 235)",
  ok: "oklch(83% 0.11 135)",
  okEdge: "oklch(64% 0.1 135)",
  bad: "oklch(86% 0.07 5)",
  badEdge: "oklch(68% 0.11 5)",
  line: "oklch(32% 0.02 260)",
  text: "oklch(24% 0.02 260)",
};

function Lines({ x, y, lines, size = 13 }: { x: number; y: number; lines: string[]; size?: number }) {
  const lh = size * 1.18;
  const top = y - ((lines.length - 1) * lh) / 2;
  return (
    <text x={x} textAnchor="middle" dominantBaseline="central" fontSize={size} fill={FC.text}>
      {lines.map((l, i) => (
        <tspan key={i} x={x} y={top + i * lh}>
          {l}
        </tspan>
      ))}
    </text>
  );
}

type Tone = "screen" | "ok" | "bad";
function FBox({ x, y, lines, w = 118, h = 56, tone = "screen" }: { x: number; y: number; lines: string[]; w?: number; h?: number; tone?: Tone }) {
  const fill = tone === "ok" ? FC.ok : tone === "bad" ? FC.bad : FC.screen;
  const edge = tone === "ok" ? FC.okEdge : tone === "bad" ? FC.badEdge : FC.screenEdge;
  return (
    <g>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={2.5} fill={fill} stroke={edge} strokeWidth={1.2} />
      <Lines x={x} y={y} lines={lines} />
    </g>
  );
}

function FDiamond({ x, y, lines, w = 124, h = 76 }: { x: number; y: number; lines: string[]; w?: number; h?: number }) {
  return (
    <g>
      <path d={`M${x} ${y - h / 2} L${x + w / 2} ${y} L${x} ${y + h / 2} L${x - w / 2} ${y} Z`} fill="white" stroke={FC.decision} strokeWidth={1.4} strokeLinejoin="round" />
      <Lines x={x} y={y} lines={lines} size={12.5} />
    </g>
  );
}

/* What the user does: a shape bracketed top and bottom, as in his flow */
function FAction({ x, y, lines, w = 116, h = 48 }: { x: number; y: number; lines: string[]; w?: number; h?: number }) {
  const x0 = x - w / 2;
  const x1 = x + w / 2;
  const y0 = y - h / 2;
  const y1 = y + h / 2;
  return (
    <g>
      <rect x={x0} y={y0} width={w} height={h} fill="white" />
      <path
        d={`M${x0 + 3} ${y0 + 9} Q${x0 + 3} ${y0} ${x0 + 13} ${y0} L${x1 - 13} ${y0} Q${x1 - 3} ${y0} ${x1 - 3} ${y0 + 9} M${x0 + 3} ${y1 - 9} Q${x0 + 3} ${y1} ${x0 + 13} ${y1} L${x1 - 13} ${y1} Q${x1 - 3} ${y1} ${x1 - 3} ${y1 - 9}`}
        fill="none"
        stroke={FC.decision}
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      <Lines x={x} y={y} lines={lines} />
    </g>
  );
}

/* A connector: a polyline, with an arrowhead at its end unless told not to */
function L({ p, end = true }: { p: [number, number][]; end?: boolean }) {
  return (
    <polyline
      points={p.map((q) => q.join(",")).join(" ")}
      fill="none"
      stroke={FC.line}
      strokeWidth={1.4}
      strokeLinejoin="round"
      markerEnd={end ? "url(#flow-arrow)" : undefined}
    />
  );
}

/* A connector's label, on a white ground so the line breaks around it */
function LLabel({ x, y, t }: { x: number; y: number; t: string }) {
  const w = t.length * 6 + 8;
  return (
    <g>
      <rect x={x - w / 2} y={y - 8} width={w} height={16} fill="white" />
      <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize={10.5} fontWeight={700} fill={FC.text}>
        {t}
      </text>
    </g>
  );
}

const C = { home: 70, links: 215, status: 365, list: 515, select: 665, detail: 815, edit: 965, save: 1115 };
const BW = 118; // box width
const BH = 56;
const DW = 110; // save diamond
const DH = 72;

const LANES: { y: number; status: string[]; list: string[]; detail: string[]; approval?: boolean }[] = [
  { y: 70, status: ["Skills", "assessment", "status"], list: ["Skills", "assessment", "list records"], detail: ["Skills", "assessment", "record detail"] },
  { y: 215, status: ["Performance", "survey status"], list: ["Performance", "survey", "list records"], detail: ["Performance", "survey", "record detail"] },
  { y: 360, status: ["Conflict of", "interest status"], list: ["My COI", "list records"], detail: ["COI record", "detail"], approval: true },
  { y: 600, status: ["My résumé", "status"], list: ["My résumé", "list records"], detail: ["My résumé", "record detail"] },
  { y: 745, status: ["My training", "status"], list: ["My training", "list records"], detail: ["My training", "record detail"] },
];

function Lane({ y, status, list, detail, approval }: (typeof LANES)[number]) {
  const right = C.save + DW / 2;
  return (
    <g>
      <L p={[[C.links, y], [C.status - BW / 2, y]]} end />
      <FBox x={C.status} y={y} lines={status} />
      <L p={[[C.status + BW / 2, y], [C.list - BW / 2, y]]} />
      <FBox x={C.list} y={y} lines={list} />
      <L p={[[C.list + BW / 2, y], [C.select - 58, y]]} />
      <FAction x={C.select} y={y} lines={["User selects", "record"]} />
      <L p={[[C.select + 58, y], [C.detail - BW / 2, y]]} />
      <FBox x={C.detail} y={y} lines={detail} />
      <L p={[[C.detail + BW / 2, y], [C.edit - 58, y]]} />
      <FAction x={C.edit} y={y} lines={["User edits", "record"]} />
      <L p={[[C.edit + 58, y], [C.save - DW / 2, y]]} />

      {/* Cancel returns to the record */}
      <L p={[[right, y], [1195, y], [1195, y - 52], [C.detail, y - 52], [C.detail, y - BH / 2]]} />
      <LLabel x={1010} y={y - 52} t="Cancel" />

      {approval ? (
        <>
          {/* Saved, then waiting on approval, then back to the record either way */}
          <L p={[[C.save, y + DH / 2], [C.save, y + 100 - 25]]} />
          <LLabel x={C.save} y={y + 52} t="Yes" />
          <FBox x={C.save} y={y + 100} w={112} h={50} lines={["Change saved,", "approval pending"]} />
          <L p={[[C.save - 56, y + 100], [1035, y + 100]]} end={false} />
          <L p={[[1035, y + 80], [1035, y + 122]]} end={false} />
          <L p={[[1035, y + 80], [C.edit + 48, y + 80]]} end={false} />
          <L p={[[1035, y + 122], [C.edit + 48, y + 122]]} end={false} />
          <FBox x={C.edit} y={y + 80} w={96} h={34} tone="ok" lines={["Change(s)", "approved"]} />
          <FBox x={C.edit} y={y + 122} w={96} h={34} tone="bad" lines={["Changes", "not approved"]} />
          <L p={[[C.edit - 48, y + 80], [C.detail, y + 80]]} end={false} />
          <L p={[[C.edit - 48, y + 122], [C.detail, y + 122], [C.detail, y + BH / 2]]} />
          <LLabel x={866} y={y + 80} t="Updated content" />
          <LLabel x={866} y={y + 122} t="Denied content" />
        </>
      ) : (
        <>
          {/* A saved change returns to the record */}
          <L p={[[C.save, y + DH / 2], [C.save, y + 58], [C.edit + 48, y + 58]]} end={false} />
          <LLabel x={1066} y={y + 58} t="Yes" />
          <FBox x={C.edit} y={y + 58} w={96} h={34} tone="ok" lines={["Change(s)", "successful"]} />
          <L p={[[C.edit - 48, y + 58], [C.detail, y + 58], [C.detail, y + BH / 2]]} />
        </>
      )}
      <FDiamond x={C.save} y={y} w={DW} h={DH} lines={["Save", "change?"]} />
    </g>
  );
}

const FLOW_ALT =
  "My user flow, recreated without its sign-in steps. From the homepage the user picks a page: skills assessment, performance survey, conflict of interest, résumé or training. Each goes from its status, to its list, to a selected record, to an edit; saving shows the change as successful and returns to the record, and cancel returns to the record without saving. Conflict of interest is the one exception: a saved change waits as approval pending, then comes back to the record as approved, with the updated content, or not approved, with the content denied.";

export function RecordFlow() {
  return (
    <div role="img" aria-label={FLOW_ALT} className="h-full w-full overflow-x-auto bg-white">
      <svg viewBox={`0 0 ${FW} ${FH}`} className="block w-full min-w-[46rem]" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
        <defs>
          <marker id="flow-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill={FC.line} />
          </marker>
        </defs>

        {/* The homepage, the page links and the trunk to every lane */}
        <L p={[[C.home + BW / 2, 360], [C.links - 58, 360]]} />
        <L p={[[C.links, 336], [C.links, LANES[0].y]]} end={false} />
        <L p={[[C.links, 384], [C.links, LANES[4].y]]} end={false} />
        {LANES.map((lane) => (
          <Lane key={lane.y} {...lane} />
        ))}
        <FBox x={C.home} y={360} w={112} lines={["Homepage"]} />
        <FAction x={C.links} y={360} lines={["User selects", "page/object links"]} w={124} />
      </svg>
    </div>
  );
}

/* --------------------------------------------------------------------------
   The cover, for the work index: Lightning in front of Classic, the study's
   result in one picture, the new record replacing the old (Alejandro,
   November 2026: chosen over a slant, which left an empty wedge at the
   bottom). Rendered at 800 by 600 at twice the density and saved as
   src/assets/covers/a-quarter-of-the-fields-gone.png; kept here so it can be
   rendered again. Invented content throughout. */

const COVER_LABEL = "font-label text-[11px] font-medium uppercase tracking-[0.14em] text-text-tertiary";

export function CoverArt() {
  return (
    <div data-scheme="light" className="relative h-[600px] w-[800px] overflow-hidden bg-[oklch(96.5%_0.004_90)]">
      <span className={`${COVER_LABEL} absolute top-[36px] left-[44px]`}>Salesforce Classic</span>
      <div className="absolute top-[64px] left-[44px] h-[400px] w-[430px] overflow-hidden rounded-[10px] border border-border-default bg-white shadow-[0_10px_30px_oklch(0%_0_0/0.10)]">
        <div className="w-[620px]" style={{ zoom: 1.2 }}>
          <ClassicScreen />
        </div>
      </div>
      <span className={`${COVER_LABEL} absolute top-[176px] right-[44px]`}>Lightning, out of the box</span>
      <div className="absolute top-[204px] left-[300px] h-[360px] w-[456px] overflow-hidden rounded-[10px] border border-border-default shadow-[0_22px_56px_oklch(0%_0_0/0.20)]">
        {/* From the app bar down: the search row above it is left out */}
        <div className="-mt-[44px] w-[720px]">
          <LightningScreen />
        </div>
      </div>
    </div>
  );
}
