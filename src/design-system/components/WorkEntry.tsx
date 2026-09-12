import Link from "next/link";
import type { CaseStudy } from "@/content/case-studies";

function DraftTag() {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-2xs font-medium uppercase tracking-[0.11em] text-text-tertiary">
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-border-strong" />
      In writing
    </span>
  );
}

/**
 * One row of the work index.
 *
 * A four-column record — number, argument, disciplines, date — because the
 * site is written in a documentation register and a list of work is a table
 * of contents, not a gallery. Cards would put the image first; here the
 * sentence comes first, which is the entire point.
 *
 * Drafts are marked, never dimmed. Fading them would make the most important
 * content on the page the least legible thing on it.
 */
export function WorkEntry({ study, index }: { study: CaseStudy; index: number }) {
  const isDraft = study.status === "draft";

  const body = (
    <div className="grid grid-cols-1 gap-x-6 gap-y-4 py-9 md:grid-cols-[3rem_1fr] lg:grid-cols-[3rem_1fr_13rem_8rem]">
      <div className="font-mono text-xs text-text-tertiary lg:pt-2">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div>
        <h3 className="max-w-[24ch] font-display text-2xl leading-[1.2] tracking-[-0.015em] text-text-primary transition-colors duration-[160ms] group-hover:text-text-accent md:text-3xl">
          {study.title}
        </h3>
        <p className="mt-3 max-w-[52ch] text-base text-text-secondary">{study.standfirst}</p>

        {/* Below lg the metadata columns fold into this one rather than
            disappearing — the employer and date are part of the record. */}
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-text-tertiary lg:hidden">
          <span>{study.employer}</span>
          <span aria-hidden="true">·</span>
          <span>{study.period}</span>
          <span aria-hidden="true">·</span>
          <span>{study.disciplines[0]}</span>
        </div>

        {isDraft && (
          <div className="mt-4 lg:hidden">
            <DraftTag />
          </div>
        )}
      </div>

      <div className="hidden font-mono text-xs leading-[1.9] text-text-tertiary lg:block lg:pt-2">
        {study.disciplines.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="hidden text-right font-mono text-xs text-text-tertiary lg:block lg:pt-2">
        <div>{study.employer}</div>
        <div className="mt-1">{study.period}</div>
        {isDraft && (
          <div className="mt-4">
            <DraftTag />
          </div>
        )}
      </div>
    </div>
  );

  if (isDraft) {
    return <div className="group border-b border-border-subtle">{body}</div>;
  }

  return (
    <Link
      href={`/work/${study.slug}`}
      className="group block border-b border-border-subtle transition-colors duration-[160ms] hover:bg-surface-sunken"
    >
      {body}
    </Link>
  );
}
