import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/content/case-studies";
import { Tag } from "@/design-system/components/Tag";
import { ArrowRight } from "@/design-system/components/Icon";
import { ORG_LOGOS } from "@/design-system/brand/OrgLogos";


/**
 * The image slot, for a visual from the case study. Until a study has one,
 * the slot holds its place at the same 4:3 proportion so the index already reads at the shape it
 * will have, and nobody mistakes the gap for a broken image.
 */
function Cover({ study }: { study: CaseStudy }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-border-subtle bg-surface-sunken @min-[54rem]:h-full">
      {study.cover ? (
        <Image
          src={study.cover.src}
          alt={study.cover.alt}
          fill
          // Side by side from a 54rem card (27rem of cover at most, half of
          // it from 54 to 64rem); stacked below that, the cover is the card's
          // width less its inset.
          sizes="(min-width: 1024px) 30rem, (min-width: 640px) 42rem, 100vw"
          // A static import carries a tiny blurred copy; show it while the
          // full image loads instead of an empty box.
          placeholder={typeof study.cover.src === "string" ? "empty" : "blur"}
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
 * Side by side when the CARD is 54rem wide or more, a container query rather
 * than a breakpoint, so a tablet in landscape reads like the desktop
 * (Alejandro, November 2026). It used to stack below 64rem, because a 4:3
 * cover centered beside text that wraps longer as the card narrows floated
 * in the middle of a tall card. Now the cover stretches to the card's height,
 * so it never floats; the limit is how much of the cover a narrow column
 * crops. From 54rem to 64rem the card splits evenly and the record takes
 * 32px in, which keeps the cover close to 4:3 (about 1.1:1 at a 1024 screen);
 * from 64rem it is 40/60 with 48px, as before. Under 54rem the cover would be
 * cropped to a portrait strip that loses the sides of its picture, so the
 * image stacks above the record at full width. Below 640 the card runs to the
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
  // A draft is not a link in production: nobody should click into a page that
  // has not been written. Locally it links through, so a study can be read in
  // place while it is written (its page answers not found once deployed; see
  // isHiddenDraft in content/case-studies).
  const linked = !isDraft || process.env.NODE_ENV === "development";
  const Logo = ORG_LOGOS[study.logo];

  const body = (
    <div className="grid grid-cols-1 @min-[54rem]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @5xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] @min-[54rem]:items-center">
      {/* Side by side, the cover holds 16px from the card's top, bottom and
          left whatever the record's length. It used to sit centered at 4:3,
          so a study whose title ran to three lines made a taller card and
          the cover floated in it with more room above and below than its
          neighbor had (Alejandro, November 2026). Now the cell stretches
          to the row and the cover fills it: 4:3 is still its least height,
          so a short record never squashes it, and a long one crops a little
          off the cover's sides rather than adding margin. The tracks are
          minmax(0, …) because a stretched 4:3 box otherwise reports its
          height times 4/3 as its least width, and the taller card's cover
          column grew wider than its neighbor's. */}
      <div className="px-6 pt-6 sm:px-4 sm:pt-4 @min-[54rem]:self-stretch @min-[54rem]:py-4 @min-[54rem]:pr-0 @min-[54rem]:pl-4">
        <Cover study={study} />
      </div>

      {/* The top row answers who, what and when before the title: the index
          at the left and the facts at the right, wrapping under the index
          when a phone has no room for both on one line. The footer holds
          only the action, at the left where the eye returns after the
          standfirst (Alejandro, November 2026).

          Spacing: the facts are metadata, so they get more air above the
          title (24px, 20 on a phone) than the title gets above the
          standfirst (16px), which belongs to it. Wrapped fact lines sit 8px
          apart so a phone reads them as one row broken, not a stack, and the
          separators are half strength so the facts, not the dots, carry the
          row. */}
      <div className="flex flex-col px-6 pt-7 pb-8 sm:px-8 sm:pb-10 @min-[54rem]:p-8 @5xl:p-12">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <span className="font-label text-xs text-text-tertiary">{String(index + 1).padStart(2, "0")}</span>
          {/* Employer, discipline, when: one line to read. The employer
              leads with its mark, the same traced tile as on the résumé, at
              20px so it sits on the line rather than above it. A logo is
              recognized faster than a name is read; the name stays beside it
              because at this size the tile's lettering isn't legible, and
              the mark is hidden from screen readers so the name is heard
              once (Alejandro, November 2026). Beside the facts, never on
              the cover: the cover is art made for the site, and a company
              mark on it would make it read as that company's material. */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-label text-xs text-text-tertiary">
            <span className="inline-flex items-center gap-2">
              <Logo className="h-5 w-5 shrink-0" />
              {study.employer}
            </span>
            <span aria-hidden="true" className="opacity-50">·</span>
            <span>{study.disciplines[0]}</span>
            <span aria-hidden="true" className="opacity-50">·</span>
            <span>{study.period}</span>
          </div>
        </div>

        {/* The title is the link, and its ::after stretches over the whole
            card, so anywhere on the card opens the study while a screen reader
            hears one link named by the title, not the whole card read aloud.
            The ring is drawn on the card (has-focus-visible below), not around
            the title's text. */}
        <h3 className="mt-5 max-w-[28ch] sm:mt-6 font-display text-2xl leading-[1.2] tracking-[-0.015em] text-text-primary text-balance transition-colors duration-[160ms] group-hover:text-text-accent">
          {linked ? (
            <Link
              href={`/work/${study.slug}`}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {study.title}
            </Link>
          ) : (
            study.title
          )}
        </h3>

        {/* Capped at 40rem, about 75 characters a line. Without the rail the
            column is 700px wide at 1440, and an uncapped standfirst ran to
            110 characters: long enough to lose the start of the next line. */}
        <p className="mt-4 max-w-[40rem] text-base text-text-secondary">{study.standfirst}</p>

        {/* On a phone the action is drawn as a full-width primary button,
            the same rule every action on the site follows below 640: a phone
            has no hover to say the card is a link, so the thing to tap has to
            look like one, and on a phone it is the one thing on the card to do
            (Alejandro, November 2026). Drafts have no button, so only
            published studies carry one. It is still not a second link: the
            title's link already covers the card, so this is its look, not a
            control. From 640 it is the quiet uppercase label with an arrow,
            over a rule.

            It darkens only when it is the thing pressed. It used to darken
            whenever the card was pressed, and on a phone a finger that lands
            on a card to scroll the list presses it: the button flashed its
            pressed color under a thumb that was nowhere near it (Alejandro,
            November 2026). Now a press on the button is the button's, and a
            press anywhere else is the card's (see below); both open the study. */}
        <div className="mt-6 sm:mt-7 sm:border-t sm:border-border-subtle sm:pt-4">
          {isDraft ? (
            <Tag dot>In writing</Tag>
          ) : (
            linked ? (
              // Its own link to the same page, raised above the title's
              // stretched link (relative z-10), so a finger on the button
              // presses the button and a finger anywhere else on the card
              // presses the card. Hidden from the tab order and from screen
              // readers: the title is still the card's one link for them.
              <Link
                href={`/work/${study.slug}`}
                tabIndex={-1}
                aria-hidden="true"
                data-card-button=""
                className="relative z-10 flex min-h-[2.5rem] w-full items-center justify-center gap-2 rounded-sm border border-transparent bg-interactive px-5 py-2.5 font-sans text-sm font-medium leading-[1.2] text-interactive-on sm:inline-flex sm:min-h-0 sm:w-auto sm:justify-start sm:gap-1.5 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:text-text-accent sm:font-label sm:text-xs sm:uppercase sm:tracking-[0.11em] active:bg-interactive-selected sm:active:bg-transparent"
              >
                Read the case study
                <ArrowRight className="h-4 w-4 transition-transform duration-[160ms] group-hover:translate-x-0.5 sm:h-3.5 sm:w-3.5" />
              </Link>
            ) : (
              <span className="flex min-h-[2.5rem] w-full items-center justify-center gap-2 rounded-sm border border-transparent bg-interactive px-5 py-2.5 font-sans text-sm font-medium leading-[1.2] text-interactive-on sm:inline-flex sm:min-h-0 sm:w-auto sm:justify-start sm:gap-1.5 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:text-text-accent sm:font-label sm:text-xs sm:uppercase sm:tracking-[0.11em]">
                Read the case study
                <ArrowRight className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );

  // The whole card is the target, but it is not one big link: see the title.
  // On hover the edge firms to border/default, the title takes the accent, the
  // arrow nudges, and the fill settles from surface/raised to surface/page:
  // the same hover surface the top nav uses, so no new role. It is kept very
  // quiet on purpose (Alejandro, November 2026); the edge keeps the card's
  // shape while the fill meets the page. Only border and fill animate: the
  // focus ring must not fade in from currentColor.
  //
  // border/default, the quietest step up from the resting edge (Alejandro,
  // November 2026). border/strong and border/rule both read as a frame
  // snapping on. In the light theme the edge nearly meets the page once the
  // fill does; the accent title and the arrow carry the hover from there.
  //
  // Pressed, the card takes the same surface/page fill, the one feedback a
  // phone gets, since it has no hover. It is the card that was touched, so
  // the card answers, not the button drawn on it; and at this quiet a press
  // that turns out to be the start of a scroll costs nothing. A press on the
  // button is the button's alone, so the card keeps its fill then.
  //
  // A draft in production gets none of that: no `group`, no hover, no pointer,
  // so it never promises a page that is not there.
  if (!linked) {
    return <article className="@container rounded-sm border border-border-subtle bg-surface-raised max-sm:-mx-6 max-sm:rounded-none max-sm:border-x-0">{body}</article>;
  }

  return (
    <article
      className="group relative @container rounded-sm border border-border-subtle bg-surface-raised max-sm:-mx-6 max-sm:rounded-none max-sm:border-x-0 transition-[border-color,background-color] duration-[160ms] hover:border-border-default hover:bg-surface-page active:bg-surface-page has-[[data-card-button]:active]:bg-surface-raised has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-focus-ring"
    >
      {body}
    </article>
  );
}
