import { CompareSlider } from "@/design-system/components/CompareSlider";
import { RecreatedScreen } from "@/design-system/components/RecreatedScreen";

/* The evidence for the audit records study, drawn live like the GRC study's.
   Every one is made for this site with invented content: no USAA screen, no
   application name, no real person, and no vendor's own look. The two
   platforms are recreated generically, the way the GRC study recreates a
   platform's default list view: Classic as a dense page of labeled fields
   under section strips, Lightning as a header with highlights over grouped
   sections. Made of the system's roles, never its primitives.

   The fields are invented, and so is which four were cut. What is Alejandro's
   (November 2026): about a quarter of the fields went, the rest were grouped
   so related content sits together, and the homepage used three columns with
   one topic each. The figures show that shape, not the real records. */

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
   The record, before and after. One invented auditor, sixteen fields in
   Classic and twelve in Lightning. Fax, Pager, Legacy ID and Record Type Code
   are the four that go: the kind of field longtime users told us nobody
   filled in any more. */

const PERSON = { name: "Jordan Ellis", title: "Senior Auditor", department: "Internal Audit" };

const CLASSIC_SECTIONS: { title: string; open: boolean; fields: [string, string][] }[] = [
  {
    title: "Auditor Information",
    open: true,
    fields: [
      ["Auditor Name", PERSON.name],
      ["Employee ID", "E-204817"],
      ["Title", PERSON.title],
      ["Department", PERSON.department],
      ["Manager", "R. Alvarez"],
      ["Phone", "(555) 010-4471"],
      ["Fax", ""],
    ],
  },
  {
    title: "Experience",
    open: true,
    fields: [
      ["Years in Audit", "9"],
      ["Certifications", "CIA, CISA"],
      ["Areas of Expertise", "IT controls, Vendor risk"],
      ["Prior Employers", "Two, see attachment"],
    ],
  },
  { title: "Independence", open: false, fields: [["Conflicts Disclosed", "None"], ["Last Attestation", "Jan 14"]] },
  {
    title: "System Information",
    open: true,
    fields: [
      ["Legacy ID", "AUD-0091-X"],
      ["Pager", ""],
      ["Record Type Code", "A2"],
    ],
  },
];

function ClassicScreen() {
  return (
    <div className="bg-surface-raised text-[11px] leading-[1.4]">
      {/* The app's tabs, in a band */}
      <div className="flex items-center gap-1 border-b-2 border-border-strong bg-surface-sunken px-3 pt-2">
        {["Home", "Auditors", "Reports", "Dashboards"].map((t) => (
          <span
            key={t}
            className={`rounded-t-sm px-3 py-1 ${
              t === "Auditors" ? "bg-border-strong font-semibold text-surface-raised" : "text-text-secondary"
            }`}
          >
            {t}
          </span>
        ))}
      </div>

      {/* The record's title and button row */}
      <div className="flex items-end justify-between gap-4 px-4 pt-4 pb-3">
        <span className="flex flex-col">
          <span className="text-text-tertiary">Auditor</span>
          <span className="text-lg font-semibold text-text-primary">{PERSON.name}</span>
        </span>
        <span className="flex gap-1">
          {["Edit", "Delete", "Clone", "Sharing", "Printable View"].map((b) => (
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
        {["Experience Entries", "Open Activities", "Notes & Attachments"].map((t) => (
          <div key={t} className="border border-border-default">
            <div className="flex items-center justify-between bg-surface-sunken px-2 py-1">
              <span className="font-semibold text-text-primary">{t}</span>
              <span className="rounded-sm border border-border-strong bg-surface-raised px-2 text-text-secondary">New</span>
            </div>
            <div className="border-t border-border-subtle px-2 py-1 text-text-tertiary">
              {t === "Experience Entries" ? "3 records, show more »" : "No records to display"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const LIGHTNING_SECTIONS: { title: string; fields: [string, string][] }[] = [
  {
    title: "Profile",
    fields: [
      ["Employee ID", "E-204817"],
      ["Manager", "R. Alvarez"],
      ["Department", PERSON.department],
      ["Phone", "(555) 010-4471"],
    ],
  },
  {
    title: "Experience",
    fields: [
      ["Years in audit", "9"],
      ["Certifications", "CIA, CISA"],
      ["Areas of expertise", "IT controls, Vendor risk"],
      ["Prior employers", "Two, see attachment"],
    ],
  },
  {
    title: "Independence",
    fields: [
      ["Conflicts disclosed", "None"],
      ["Last attestation", "Jan 14"],
    ],
  },
];

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
          <span className="border-b-2 border-interactive pb-0.5 font-medium text-text-primary">Auditors</span>
          <span>Reports</span>
        </span>
      </div>

      <div className="flex flex-col gap-3 p-3">
        {/* Header with the highlights: who, what, and when they last attested */}
        <div className="flex items-center justify-between gap-4 rounded-md border border-border-subtle bg-surface-raised px-4 py-3">
          <span className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-interactive text-sm font-semibold text-interactive-on">
              JE
            </span>
            <span className="flex flex-col">
              <span className="text-text-tertiary">Auditor</span>
              <span className="text-base font-semibold text-text-primary">{PERSON.name}</span>
            </span>
          </span>
          <span className="flex gap-6">
            {[
              ["Title", PERSON.title],
              ["Department", PERSON.department],
              ["Last attestation", "Jan 14"],
            ].map(([k, v]) => (
              <span key={k} className="flex flex-col">
                <span className="text-text-tertiary">{k}</span>
                <span className="text-text-primary">{v}</span>
              </span>
            ))}
          </span>
          <span className="rounded-sm border border-border-default px-3 py-1 font-medium text-text-accent">Edit</span>
        </div>

        {/* Details in three sections, related records beside them */}
        <div className="grid grid-cols-[1fr_15rem] gap-3">
          <div className="rounded-md border border-border-subtle bg-surface-raised">
            <div className="flex gap-5 border-b border-border-subtle px-4 pt-2.5 text-text-secondary">
              <span className="border-b-2 border-interactive pb-2 font-medium text-text-primary">Details</span>
              <span className="pb-2">Related</span>
            </div>
            <div className="flex flex-col gap-3 px-4 py-3">
              {LIGHTNING_SECTIONS.map((s) => (
                <div key={s.title}>
                  <div className="mb-1 text-sm font-semibold text-text-primary">{s.title}</div>
                  <div className="grid grid-cols-2 gap-x-6">
                    {s.fields.map(([k, v]) => (
                      <div key={k} className="flex flex-col border-b border-border-subtle py-1.5">
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
            {[
              { title: "Experience entries (3)", rows: ["Vendor risk review", "IT general controls", "Branch operations"] },
              { title: "Disclosures (1)", rows: ["Annual attestation, Jan 14"] },
            ].map((list) => (
              <div key={list.title} className="rounded-md border border-border-subtle bg-surface-raised p-3">
                <div className="mb-2 font-semibold text-text-primary">{list.title}</div>
                {list.rows.map((r) => (
                  <div key={r} className="border-t border-border-subtle py-1.5 text-text-accent">
                    {r}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function RecordComparison() {
  return (
    <CompareSlider
      label="Compare the auditor record in Classic with the record in Lightning"
      before={{
        node: (
          <RecreatedScreen address="records.example">
            <ClassicScreen />
          </RecreatedScreen>
        ),
        label: "Classic",
        alt: "Classic, recreated with invented content: one auditor's record as a dense page of sixteen labeled fields under section strips, Auditor Information, Experience, a closed Independence section, and System Information with Legacy ID, Pager and Record Type Code. Fax and Pager are empty.",
      }}
      after={{
        node: (
          <RecreatedScreen address="records.example">
            <LightningScreen />
          </RecreatedScreen>
        ),
        label: "Lightning",
        alt: "Lightning, recreated with invented content: the same record with a header showing the auditor's title, department and last attestation, twelve fields in three sections, Profile, Experience and Independence, and related lists of experience entries and disclosures beside them.",
      }}
    />
  );
}

/* --------------------------------------------------------------------------
   The homepage: three columns, one topic each, in a layout the platform
   offered as it came. Each column is a stock component (a record card, a
   list, a list), which is the point: nothing here needed building. */

function HomeScreen() {
  const card = "flex flex-col rounded-md border border-border-subtle bg-surface-raised";
  const head = "border-b border-border-subtle px-4 py-3 text-sm font-semibold text-text-primary";
  const row = "flex items-center justify-between gap-3 border-b border-border-subtle px-4 py-2.5 last:border-b-0";
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
          <span>Auditors</span>
          <span>Reports</span>
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 p-3">
        {/* Column one: my record */}
        <div className={card}>
          <div className={head}>My record</div>
          {[
            ["Name", PERSON.name],
            ["Title", PERSON.title],
            ["Department", PERSON.department],
            ["Last updated", "Mar 2"],
          ].map(([k, v]) => (
            <div key={k} className={row}>
              <span className="text-text-tertiary">{k}</span>
              <span className="text-text-primary">{v}</span>
            </div>
          ))}
        </div>

        {/* Column two: what is due */}
        <div className={card}>
          <div className={head}>Disclosures due</div>
          {[
            ["Annual attestation", "Due Jan 31"],
            ["Conflict of interest review", "Due Feb 15"],
          ].map(([k, v]) => (
            <div key={k} className={row}>
              <span className="text-text-accent">{k}</span>
              <span className="whitespace-nowrap text-text-secondary">{v}</span>
            </div>
          ))}
        </div>

        {/* Column three: what was added lately */}
        <div className={card}>
          <div className={head}>Recent experience</div>
          {[
            ["Vendor risk review", "Feb 20"],
            ["IT general controls", "Jan 8"],
            ["Branch operations", "Nov 30"],
          ].map(([k, v]) => (
            <div key={k} className={row}>
              <span className="text-text-accent">{k}</span>
              <span className="whitespace-nowrap text-text-secondary">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HomeMock() {
  return (
    <div
      role="img"
      aria-label="The homepage, recreated with invented content, in a browser window: three columns of equal width, one topic each. My record shows the auditor's name, title, department and when the record was last updated. Disclosures due lists an annual attestation and a conflict of interest review with their due dates. Recent experience lists three entries with dates."
      className="h-full w-full p-3 sm:p-6"
    >
      <RecreatedScreen address="records.example">
        <HomeScreen />
      </RecreatedScreen>
    </div>
  );
}
