import { CompareSlider } from "@/design-system/components/CompareSlider";
import { RecreatedScreen } from "@/design-system/components/RecreatedScreen";

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
            <span key={b} className="rounded-sm border border-border-strong bg-surface-sunken px-2 py-0.5 text-text-secondary">
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
              <span className="rounded-sm border border-border-strong bg-surface-raised px-2 text-text-secondary">New</span>
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
      ["Course number", COURSE.number],
      ["Credit hours", "12"],
      ["Course status", "Attended"],
    ],
  },
  {
    title: "Record information",
    fields: [["Created by", "J. Ellis"]],
  },
];

/* The path: three stages as chevrons, the way the platform draws its own.
   Done stages carry a check as well as the success fill, and the current one
   is named, so the stage never rests on color alone. */
function Path() {
  const stages: { name: string; state: "done" | "current" | "todo" }[] = [
    { name: "Draft", state: "current" },
    { name: "Submitted", state: "todo" },
    { name: "Complete", state: "todo" },
  ];
  return (
    <div className="flex">
      {stages.map((s, i) => (
        <span
          key={s.name}
          className={`-ml-2 flex h-6 flex-1 items-center justify-center text-xs font-medium first:ml-0 ${
            s.state === "done"
              ? "bg-status-success text-surface-raised"
              : s.state === "current"
                ? "bg-interactive text-interactive-on"
                : "bg-border-default text-text-secondary"
          }`}
          style={{
            clipPath:
              i === 0
                ? "polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%)"
                : i === stages.length - 1
                  ? "polygon(0 0, 100% 0, 100% 100%, 0 100%, 10px 50%)"
                  : "polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%, 10px 50%)",
            borderRadius: i === 0 ? "9999px 0 0 9999px" : i === stages.length - 1 ? "0 9999px 9999px 0" : undefined,
          }}
        >
          {s.state === "done" ? "✓" : s.name}
        </span>
      ))}
    </div>
  );
}

function LightningScreen() {
  return (
    <div className="bg-surface-sunken text-xs leading-[1.4]">
      {/* The app's bar and tabs */}
      <div className="flex items-center gap-4 border-b border-border-default bg-surface-raised px-4 py-2.5">
        <span className="grid h-5 w-5 grid-cols-3 gap-0.5">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} className="rounded-[1px] bg-text-tertiary" />
          ))}
        </span>
        <span className="text-sm font-semibold text-text-primary">Auditor Records</span>
        <span className="flex items-center gap-4 text-text-secondary">
          <span>Home</span>
          <span className="border-b-2 border-interactive pb-0.5 font-medium text-text-primary">Training</span>
          <span>Résumé</span>
          <span>Conflicts of interest</span>
        </span>
      </div>

      <div className="flex flex-col gap-3 p-3">
        {/* Header with the highlights, then the path */}
        <div className="flex flex-col gap-3 rounded-md border border-border-subtle bg-surface-raised px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <span className="flex flex-col">
              <span className="text-text-tertiary">Training</span>
              <span className="text-base font-semibold text-text-primary">TR-0412</span>
            </span>
            <span className="flex gap-6">
              {[
                ["Course title", COURSE.title],
                ["Certification", "✓"],
              ].map(([k, v]) => (
                <span key={k} className="flex flex-col">
                  <span className="text-text-tertiary">{k}</span>
                  <span className="text-text-primary">{v}</span>
                </span>
              ))}
            </span>
            <span className="rounded-sm border border-border-default px-3 py-1 font-medium text-text-accent">Submit</span>
          </div>
          <Path />
        </div>

        {/* Details in three sections, and what is left to fill beside them */}
        <div className="grid grid-cols-[1fr_15rem] gap-3">
          <div className="rounded-md border border-border-subtle bg-surface-raised">
            <div className="flex gap-5 border-b border-border-subtle px-4 pt-2.5 text-text-secondary">
              <span className="border-b-2 border-interactive pb-2 font-medium text-text-primary">Details</span>
              <span className="pb-2">History</span>
            </div>
            <div className="flex flex-col gap-3 px-4 py-3">
              {LIGHTNING_SECTIONS.map((s) => (
                <div key={s.title}>
                  <div className="mb-1 text-sm font-semibold text-text-primary">{s.title}</div>
                  <div className="grid grid-cols-2 gap-x-6">
                    {s.fields.map(([k, v]) => (
                      <div key={k} className="flex flex-col border-b border-border-subtle py-1">
                        <span className="text-text-tertiary">{k}</span>
                        <span className="text-text-primary">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="rounded-md border border-border-subtle bg-surface-raised p-3">
              <div className="mb-2 font-semibold text-text-primary">Remaining sections</div>
              {[
                ["Certificate of completion", true],
                ["General information", true],
                ["Training event", false],
              ].map(([r, done]) => (
                <div key={r as string} className="flex items-center gap-2 border-t border-border-subtle py-1.5 text-text-secondary">
                  <span className={done ? "text-status-success" : "text-text-tertiary"}>{done ? "✓" : "○"}</span>
                  {r}
                </div>
              ))}
            </div>
            <div className="rounded-md border border-border-subtle bg-surface-raised p-3">
              <div className="mb-2 font-semibold text-text-primary">Files (1)</div>
              <div className="border-t border-border-subtle py-1.5 text-text-accent">Certificate of completion.pdf</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Drawn at 900 rather than the default 840, so both records fit the 4:3
   frame at every width: below 900 the screen scales down as a picture, and
   at 840 the taller one ran 30px past the frame. */
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
        alt: "Lightning, recreated with invented content: the same training record with the course title and certification in its header, a path from Draft to Submitted to Complete with Draft current, twelve fields in three sections, General information, Training event and Record information, and beside them a list of the sections still to fill and the attached certificate.",
      }}
    />
  );
}

/* --------------------------------------------------------------------------
   The homepage: three columns, one record type each, in a layout the
   platform offered as it came. Each column is two stock components, a report
   chart over a list of recent records, which is the point: nothing here
   needed building. The counts are invented. */

function Donut({ parts }: { parts: { value: number; tone: string }[] }) {
  const total = parts.reduce((a, p) => a + p.value, 0);
  const r = 26;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg viewBox="0 0 72 72" className="h-20 w-20 -rotate-90">
      {parts.map((p, i) => {
        const len = (p.value / total) * c;
        const el = (
          <circle
            key={i}
            cx="36"
            cy="36"
            r={r}
            fill="none"
            strokeWidth="11"
            className={p.tone}
            stroke="currentColor"
            strokeDasharray={`${len} ${c - len}`}
            strokeDashoffset={-offset}
          />
        );
        offset += len;
        return el;
      })}
    </svg>
  );
}

const HOME_COLUMNS = [
  {
    title: "My training",
    total: 14,
    parts: [
      { label: "Complete", value: 9, tone: "text-interactive" },
      { label: "Submitted", value: 3, tone: "text-[color-mix(in_oklab,var(--interactive-default)_45%,var(--surface-raised))]" },
      { label: "Draft", value: 2, tone: "text-border-default" },
    ],
    recent: [
      ["TR-0412", COURSE.title],
      ["TR-0398", "Third-Party Risk Basics"],
    ],
  },
  {
    title: "My résumé",
    total: 6,
    parts: [
      { label: "Current", value: 5, tone: "text-interactive" },
      { label: "Needs review", value: 1, tone: "text-border-default" },
    ],
    recent: [
      ["RS-0077", "Vendor risk review"],
      ["RS-0071", "IT general controls"],
    ],
  },
  {
    title: "Conflicts of interest",
    total: 2,
    parts: [
      { label: "Complete", value: 1, tone: "text-interactive" },
      { label: "Due", value: 1, tone: "text-border-default" },
    ],
    recent: [
      ["CI-0033", "Annual disclosure, due Jan 31"],
      ["CI-0029", "Annual disclosure, complete"],
    ],
  },
];

function HomeScreen() {
  return (
    <div className="bg-surface-sunken text-xs leading-[1.4]">
      <div className="flex items-center gap-4 border-b border-border-default bg-surface-raised px-4 py-2.5">
        <span className="grid h-5 w-5 grid-cols-3 gap-0.5">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} className="rounded-[1px] bg-text-tertiary" />
          ))}
        </span>
        <span className="text-sm font-semibold text-text-primary">Auditor Records</span>
        <span className="flex items-center gap-4 text-text-secondary">
          <span className="border-b-2 border-interactive pb-0.5 font-medium text-text-primary">Home</span>
          <span>Training</span>
          <span>Résumé</span>
          <span>Conflicts of interest</span>
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 p-3">
        {HOME_COLUMNS.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            {/* The report chart */}
            <div className="rounded-md border border-border-subtle bg-surface-raised p-4">
              <div className="text-sm font-semibold text-text-primary">{col.title}</div>
              <div className="mt-3 flex items-center gap-4">
                <span className="relative">
                  <Donut parts={col.parts} />
                  <span className="absolute inset-0 flex items-center justify-center text-base font-semibold text-text-primary">
                    {col.total}
                  </span>
                </span>
                <span className="flex flex-col gap-1.5">
                  {col.parts.map((p) => (
                    <span key={p.label} className="flex items-center gap-2 text-text-secondary">
                      <span className={`h-2.5 w-2.5 rounded-full bg-current ${p.tone}`} />
                      {p.label} ({p.value})
                    </span>
                  ))}
                </span>
              </div>
            </div>
            {/* The recent records under it */}
            <div className="rounded-md border border-border-subtle bg-surface-raised">
              <div className="border-b border-border-subtle px-4 py-2.5 font-semibold text-text-primary">Recent records</div>
              {col.recent.map(([id, name]) => (
                <div key={id} className="flex flex-col border-b border-border-subtle px-4 py-2 last:border-b-0">
                  <span className="text-text-accent">{id}</span>
                  <span className="text-text-secondary">{name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HomeMock() {
  return (
    <div
      role="img"
      aria-label="The homepage, recreated with invented content, in a browser window: three columns of equal width, one record type each, My training, My résumé and Conflicts of interest. Each column has a ring chart of the auditor's records by status, with the total in the middle and a legend, over a list of the two most recent records."
      className="h-full w-full p-3 sm:p-6"
    >
      <RecreatedScreen address="records.example">
        <HomeScreen />
      </RecreatedScreen>
    </div>
  );
}
