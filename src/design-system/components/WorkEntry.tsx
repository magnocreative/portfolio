import Link from "next/link";
import type { CaseStudy } from "@/content/case-studies";

function DraftTag() {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.11em] text-text-tertiary">
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-border-strong" />
      In writing
    </span>
  );
}

/**
 * One card in the work index.
 *
 * This began as a full-width row, four columns wide: number, argument,
 * disciplines, date. That held up at three entries and fell apart at four. The
 * metadata columns sat 350px to the right of where the summary stopped, so
 * every row carried a hole down the middle of the page, and the page grew by a
 * full screen for every two case studies added.
 *
 * Two columns of cards is 25% shorter at four entries and the cards actually
 * fill. The single-column card was built and rejected on the way here: it came
 * out the same height as the rows it replaced, so it bought the look of the
 * change without the scaling that motivated it, and it drew a border around
 * the same empty space instead of removing it.
 *
 * What survives from the row version is the thing that matters. The summary is
 * fully present, not truncated to fit a card, because the standfirst IS the
 * argument and a reviewer skimming four titles should still get it. A card
 * here is a record with a sentence in it, not a thumbnail.
 *
 * Drafts are marked, never dimmed. Fading them would make the most important
 * content on the page the least legible thing on it.
 */
export function WorkEntry({ study, index }: { study: CaseStudy; index: number }) {
  const isDraft = study.status === "draft";

  const body = (
    <>
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-xs text-text-tertiary">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-mono text-xs text-text-tertiary">{study.period}</span>
      </div>

      {/* 28ch, not the 22ch this started at. The card's inner width is 538px
          and 22ch measured 349, so every title sat 189px short of its own
          right edge and the longer ones broke to three lines against empty
          space. 28ch is 444px: two lines for every current title, and the
          leftover reads as rag rather than a hole. Not wider — at 30ch the
          shortest title collapses to one line, and a single-line title beside
          two-line ones unbalances the row. */}
      <h3 className="mt-5 max-w-[28ch] font-display text-2xl leading-[1.2] tracking-[-0.015em] text-text-primary text-balance transition-colors duration-[160ms] group-hover:text-text-accent">
        {study.title}
      </h3>

      <p className="mt-3 text-base text-text-secondary">{study.standfirst}</p>

      {/* `mt-auto` pins the metadata to the bottom of the card. Grid rows
          stretch, so two cards in a row are the same height whatever their
          copy length, and without this the footers would float at different
          heights and the row would read as broken rather than varied. */}
      <div className="mt-auto pt-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-text-tertiary">
          <span>{study.employer}</span>
          <span aria-hidden="true">·</span>
          <span>{study.disciplines[0]}</span>
        </div>
        {isDraft && (
          <div className="mt-3">
            <DraftTag />
          </div>
        )}
      </div>
    </>
  );

  const shell =
    "flex h-full flex-col rounded-sm border bg-surface-raised p-7 transition-colors duration-[160ms] ease-[var(--ease-out-quart)]";

  // A draft is not a link, so it gets no hover and no pointer. Nobody should
  // click into a page that has not been written. `group` lives here rather
  // than in `shell` for that reason: while both branches carried it, hovering
  // a draft turned its title accent blue and promised a link that was not
  // there.
  if (isDraft) {
    return <div className={`${shell} border-border-subtle`}>{body}</div>;
  }

  return (
    <Link
      href={`/work/${study.slug}`}
      className={`group ${shell} border-border-subtle hover:border-border-interactive`}
    >
      {body}
    </Link>
  );
}
