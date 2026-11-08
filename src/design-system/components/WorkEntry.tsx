import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/content/case-studies";
import { Tag } from "@/design-system/components/Tag";


/**
 * The image slot, for a visual from the case study. Until a study has one,
 * the slot holds its place at the same 4:3 proportion so the index already reads at the shape it
 * will have, and nobody mistakes the gap for a broken image.
 */
function Cover({ study }: { study: CaseStudy }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-border-subtle bg-surface-sunken">
      {study.cover ? (
        <Image
          src={study.cover.src}
          alt={study.cover.alt}
          fill
          sizes="(min-width: 1024px) 30rem, (min-width: 768px) 40vw, 100vw"
          className="object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center font-label text-xs uppercase tracking-[0.11em] text-text-tertiary"
        >
          Image
        </span>
      )}
    </div>
  );
}

/**
 * One row of the work index: an image at 40% and the record at 60%.
 *
 * Single column, so every study gets the full width of the page and the image
 * can be large enough to carry something. The record keeps the order a reader
 * scans in: number and period, the title (the decision), the standfirst (the
 * argument, never truncated), then employer and discipline.
 *
 * Below md the image stacks above the text at full width.
 *
 * Drafts are marked, never dimmed. Fading them would make the most important
 * content on the page the least legible thing on it.
 */
export function WorkEntry({
  study,
  index,
  divider = true,
}: {
  study: CaseStudy;
  index: number;
  /**
   * The 1px rule under the row. It separates one study from the next in the
   * index; shown alone, as the specimen on the components page, there is no
   * next row and it reads as a stray line, so the specimen turns it off.
   */
  divider?: boolean;
}) {
  const isDraft = study.status === "draft";

  const body = (
    <div className="grid grid-cols-1 gap-y-6 py-10 md:grid-cols-[2fr_3fr] md:gap-x-10 lg:gap-x-12">
      <Cover study={study} />

      <div className="flex flex-col">
        <span className="font-label text-xs text-text-tertiary">
          {String(index + 1).padStart(2, "0")}
        </span>

        <h3 className="mt-4 max-w-[28ch] font-display text-2xl leading-[1.2] tracking-[-0.015em] text-text-primary text-balance transition-colors duration-[160ms] group-hover:text-text-accent">
          {study.title}
        </h3>

        {/* Capped at 40rem, about 75 characters a line. Without the rail the
            column is 700px wide at 1440, and an uncapped standfirst ran to
            110 characters: long enough to lose the start of the next line. */}
        <p className="mt-3 max-w-[40rem] text-base text-text-secondary">{study.standfirst}</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-label text-xs text-text-tertiary">
          {/* The period joins the other facts here rather than sitting alone at
              the far right of the column, 700px from the number it belonged
              beside. Employer, discipline, when: one line to read. */}
          <span>{study.employer}</span>
          <span aria-hidden="true">·</span>
          <span>{study.disciplines[0]}</span>
          <span aria-hidden="true">·</span>
          <span>{study.period}</span>
        </div>

        {isDraft && (
          <div className="mt-3">
            <Tag dot>In writing</Tag>
          </div>
        )}
      </div>
    </div>
  );

  // A draft is not a link, so it gets no hover and no pointer. Nobody should
  // click into a page that has not been written. `group` lives on the link
  // alone: when the draft branch carried it too, hovering a draft turned its
  // title accent blue and promised a page that was not there.
  //
  // The one exception is local development: there a draft links through, so a
  // study can be read in place while it is written. `npm run build` and every
  // deployment are production, where the draft stays unlinked and its page
  // answers not found (see isHiddenDraft in content/case-studies).
  if (isDraft && process.env.NODE_ENV !== "development") {
    return <div className={divider ? "border-b border-border-subtle" : ""}>{body}</div>;
  }

  return (
    <Link
      href={`/work/${study.slug}`}
      className={`group block ${divider ? "border-b border-border-subtle" : ""}`}
    >
      {body}
    </Link>
  );
}
