import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/content/case-studies";
import { Tag } from "@/design-system/components/Tag";
import { ArrowRight } from "@/design-system/components/Icon";


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
 * One row of the work index: a raised card, the image at 40% and the record
 * at 60%.
 *
 * The card is the snug panel's language, the same one the home page's design
 * system panel uses: the image sits 16px from the card's top, bottom and left
 * edge, and the record keeps a full 48px around it. The cover is itself a
 * framed box, and at the record's 48px the two frames read as a heavy double
 * border; tucked in at 16 they read as one object.
 *
 * The record keeps the order a reader scans in: number, the title (the
 * decision), the standfirst (the argument, never truncated), then a footer
 * bar on a hairline with the facts on the left and the status on the right.
 * The status is the row's promise: "In writing" for a draft, "Read the case
 * study" for a finished one, in the same place, so the row says whether it
 * can be opened before anyone tries.
 *
 * Side by side only when the CARD is 64rem wide or more, a container query
 * rather than a breakpoint. With a 4:3 cover beside text that wraps longer as
 * the card narrows, a narrower card left the image small and floating in the
 * middle of a tall card (at 768, and in the components page's 862px stage).
 * Below 64rem the image stacks above the record at full width. Below 640 the card runs to the
 * screen's edges like the résumé cards (square, no side borders), and both
 * the image and the record keep the page's 24px gutter, so nothing is
 * narrower than it was before the card existed. Cards sit 16px apart: the
 * border does the separating.
 *
 * Drafts are marked, never dimmed. Fading them would make the most important
 * content on the page the least legible thing on it.
 */
export function WorkEntry({ study, index }: { study: CaseStudy; index: number }) {
  const isDraft = study.status === "draft";

  const body = (
    <div className="grid grid-cols-1 @5xl:grid-cols-[2fr_3fr] @5xl:items-center">
      <div className="px-6 pt-6 sm:px-4 sm:pt-4 @5xl:py-4 @5xl:pr-0 @5xl:pl-4">
        <Cover study={study} />
      </div>

      <div className="flex flex-col px-6 pt-7 pb-8 sm:px-8 sm:pb-10 @5xl:p-12">
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

        <div className="mt-7 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-border-subtle pt-4">
          {/* Employer, discipline, when: one line to read. */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-label text-xs text-text-tertiary">
            <span>{study.employer}</span>
            <span aria-hidden="true">·</span>
            <span>{study.disciplines[0]}</span>
            <span aria-hidden="true">·</span>
            <span>{study.period}</span>
          </div>

          {isDraft ? (
            <Tag dot>In writing</Tag>
          ) : (
            <span className="inline-flex items-center gap-1.5 font-label text-xs font-medium uppercase tracking-[0.11em] text-text-accent">
              Read the case study
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-[160ms] group-hover:translate-x-0.5" />
            </span>
          )}
        </div>
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
    return <article className="@container rounded-sm border border-border-subtle bg-surface-raised max-sm:-mx-6 max-sm:rounded-none max-sm:border-x-0">{body}</article>;
  }

  return (
    <article>
      <Link
        href={`/work/${study.slug}`}
        className="group block @container rounded-sm border border-border-subtle bg-surface-raised max-sm:-mx-6 max-sm:rounded-none max-sm:border-x-0 transition-colors duration-[160ms] hover:border-border-default"
      >
        {body}
      </Link>
    </article>
  );
}
