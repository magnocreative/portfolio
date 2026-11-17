import type { ReactNode } from "react";
import { Button } from "@/design-system/components/Button";
import { Tag } from "@/design-system/components/Tag";
import { ArrowRight } from "@/design-system/components/Icon";
import { Logo } from "@/design-system/brand/Logo";
import { ScaledFrame } from "@/design-system/components/ScaledFrame";

/**
 * Atomic design, Brad Frost's five stages, drawn with this site's own parts
 * (Alejandro, November 2026: it was the frame that made design systems make
 * sense to him when he started). Each stage is built from the one before it,
 * and the pictures show that literally: the button and the status tag in the
 * atoms are the same ones inside the molecule, the card, the template and the
 * page.
 *
 * Specimens, not controls: Button's `specimen` draws a span, so nothing here
 * takes focus. The whole ladder is one picture to assistive tech, named by
 * its label; the stage names and lines beside each picture are real text.
 *
 * Page code, not a library component: it is a lesson about the library.
 */

const bar = (w: string, tone = "bg-border-default") => <span className={`block h-1.5 rounded-full ${tone}`} style={{ width: w }} />;

/* The field above its button, both the full width of the panel, so the
   molecule reads as one unit (Alejandro, November 2026). */
function Search() {
  return (
    <span className="flex w-full max-w-56 flex-col gap-2">
      <span className="flex h-9 w-full items-center gap-1.5 rounded-sm border border-border-default bg-surface-page px-2.5 text-xs text-text-tertiary">
        <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
          <path d="M9 15.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Zm4.6-1.9L17.5 17.5" />
        </svg>
        Search
      </span>
      <Button specimen variant="primary" fillOnPhone={false} className="w-full justify-center">Go</Button>
    </span>
  );
}

/* `bare` drops the card's own edge and fill: in the organisms panel the
   panel is the card, so a second container inside it was a card in a card
   (Alejandro, November 2026). */
function AppCard({ title, compact = false, bare = false }: { title?: string; compact?: boolean; bare?: boolean }) {
  const frame = bare ? "" : "rounded-md border border-border-subtle bg-surface-raised";
  return (
    <span className={`flex flex-col ${frame} ${compact ? "gap-2.5 p-2.5" : bare ? "w-full gap-2.5" : "w-full max-w-56 gap-2.5 p-3"}`}>
      <span className="flex items-center justify-between gap-2">
        {title ? (
          <span className={`${compact ? "text-[11px] leading-tight" : "text-sm"} font-semibold text-text-primary`}>{title}</span>
        ) : (
          bar("55%", "bg-border-strong")
        )}
        {compact ? <span className="h-2 w-2 shrink-0 rounded-full bg-status-success" /> : <Tag tone="pass">Up</Tag>}
      </span>
      {compact ? bar("80%") : <span className="text-xs text-text-secondary">Find and attest to policies</span>}
      {compact ? (
        <span className="block h-4 w-full rounded-[4px] bg-interactive" />
      ) : (
        <span>
          <Button specimen variant="primary" fillOnPhone={false} className={bare ? "w-full justify-center" : ""}>
            Launch
          </Button>
        </span>
      )}
    </span>
  );
}

/* Templates and pages are drawn small, as a page in miniature: the same
   layout twice, once with placeholder bars and once with real words. The
   panel is the page, with no frame inside it, and each card's button runs
   its full width, the same treatment as the organism (Alejandro, November
   2026). */
function Mini({ real }: { real: boolean }) {
  return (
    <span className="flex w-full flex-col gap-4">
      <span className="flex items-center justify-between border-b border-border-subtle pb-2.5">
        {real ? <Logo className="h-4 w-auto" /> : <span className="block h-4 w-5 rounded-[3px] bg-border-default" />}
        <span className="flex gap-1.5">{[0, 1, 2].map((i) => <span key={i} className="block h-1.5 w-5 rounded-full bg-border-default" />)}</span>
      </span>
      {real ? (
        <span className="font-display text-sm font-semibold leading-tight text-text-primary">Sixteen applications, one front door</span>
      ) : (
        <span className="flex flex-col gap-2 py-0.5">{bar("90%", "bg-border-strong")}{bar("60%", "bg-border-strong")}</span>
      )}
      <span className="grid grid-cols-2 gap-2">
        <AppCard compact title={real ? "Policy Library" : undefined} />
        <AppCard compact title={real ? "Risk Reviews" : undefined} />
      </span>
    </span>
  );
}

const stages: { n: string; name: string; line: string; picture: ReactNode }[] = [
  {
    n: "01",
    name: "Atoms",
    line: "The smallest parts that still mean something: a button, a status, an icon.",
    picture: (
      <span className="flex flex-col items-center gap-3">
        <Tag tone="pass">Up</Tag>
        <span className="flex h-9 w-9 items-center justify-center rounded-md border border-border-subtle bg-surface-raised text-text-secondary">
          <ArrowRight className="h-4 w-4" />
        </span>
        <Button specimen variant="primary" fillOnPhone={false}>Launch</Button>
      </span>
    ),
  },
  {
    n: "02",
    name: "Molecules",
    line: "A couple of atoms doing one job together: a field and its button make a search.",
    picture: <Search />,
  },
  {
    n: "03",
    name: "Organisms",
    line: "Molecules and atoms forming a section a person recognizes: an application card.",
    picture: <AppCard title="Policy Library" bare />,
  },
  {
    n: "04",
    name: "Templates",
    line: "Organisms arranged into a layout, with placeholders where the content will go.",
    picture: <Mini real={false} />,
  },
  {
    n: "05",
    name: "Pages",
    line: "The template with real content in it, which is what a person actually sees.",
    picture: <Mini real />,
  },
];

/* The five stages as one large picture (Alejandro, November 2026: the row of
   cards read as a list, not a progression). On a wide frame it is drawn at
   1100px on the case studies' dotted ground and scaled to fit, so every part
   keeps its proportions: five equal columns, a numbered marker for each on
   one quiet line, the pictures in panels of one size, and the names and
   lines on one baseline beneath. Nothing in a row is taller than its
   neighbors, so the columns read as steps of one idea. Below 52rem of
   frame the same stages stack, joined by the same line. */

const marker =
  "relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 border-interactive bg-surface-page font-display text-lg font-semibold text-text-accent";

function Wide() {
  return (
    <div className="relative px-10 pt-10 pb-12" style={{ width: 1100 }}>
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{ backgroundImage: "radial-gradient(var(--border-default) 1.2px, transparent 1.6px)", backgroundSize: "28px 28px" }}
      />
      <ol className="relative grid grid-cols-5 gap-6">
        {stages.map((s, i) => (
          <li key={s.name} className="relative flex flex-col items-center gap-5">
            {/* A 2px line from this marker to the next, stopping 6px short
                of each circle (Alejandro, November 2026). The
                marker is 2.75rem across and centered in its column; the
                columns are 1.5rem apart. */}
            {i < stages.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute h-0.5 bg-border-default"
                style={{
                  top: "calc(1.375rem - 1px)",
                  left: "calc(50% + 1.375rem + 6px)",
                  width: "calc(100% + 1.5rem - 2.75rem - 12px)",
                }}
              />
            )}
            <span aria-hidden="true" className={marker}>{Number(s.n)}</span>
            <span
              aria-hidden="true"
              className="flex h-60 w-full items-center justify-center rounded-lg border border-border-subtle bg-surface-raised p-4 shadow-[var(--shadow-chip)]"
            >
              {s.picture}
            </span>
            <span className="flex w-full flex-col gap-1.5 px-1">
              <span className="font-display text-2xl leading-tight text-text-primary">{s.name}</span>
              <span className="text-[15px] leading-[1.5] text-text-secondary">{s.line}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Narrow() {
  return (
    <ol className="relative flex flex-col gap-6 p-5">
      {stages.map((s, i) => (
        <li key={s.name} className="relative grid grid-cols-[2.75rem_1fr] gap-4">
          {/* The same 2px line, down to the next marker, 6px clear of each circle */}
          {i < stages.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute w-0.5 bg-border-default"
              style={{ left: "calc(1.375rem - 1px)", top: "calc(2.75rem + 6px)", bottom: "calc(-1.5rem + 6px)" }}
            />
          )}
          <span aria-hidden="true" className={marker}>{Number(s.n)}</span>
          <span className="flex flex-col gap-3">
            <span className="flex flex-col gap-1 pt-1.5">
              <span className="font-display text-xl leading-tight text-text-primary">{s.name}</span>
              <span className="text-sm leading-[1.55] text-text-secondary">{s.line}</span>
            </span>
            <span
              aria-hidden="true"
              className="flex min-h-36 items-center justify-center rounded-lg border border-border-subtle bg-surface-raised p-4"
            >
              {s.picture}
            </span>
          </span>
        </li>
      ))}
    </ol>
  );
}

export function AtomicLadder() {
  return (
    <figure
      aria-label="Atomic design in five stages, drawn with this site's parts. 1, atoms: a button, a status tag and an icon. 2, molecules: a search field with its button. 3, organisms: an application card with a name, a status and a Launch button. 4, templates: a page layout with placeholder bars and two cards. 5, pages: the same layout with the logo, a title and named cards."
      className="@container overflow-hidden rounded-sm border border-border-subtle bg-surface-sunken"
    >
      <div className="hidden @min-[52rem]:block">
        <ScaledFrame width={1100}>
          <Wide />
        </ScaledFrame>
      </div>
      <div className="@min-[52rem]:hidden">
        <Narrow />
      </div>
    </figure>
  );
}
