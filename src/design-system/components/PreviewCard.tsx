import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@/design-system/components/Icon";

/**
 * A link to somewhere else on the site that shows a piece of what is there
 * before anyone follows it. First use: the components page's Foundations,
 * where three bare buttons pointed at the system page and asked to be taken
 * on trust (Alejandro, November 2026).
 *
 * The preview is the thing itself, drawn live from the same tokens and lists
 * as the page it links to, never a screenshot of that page: a picture of a
 * table is a second copy of it, and the first to go stale. It sits on the
 * sunken surface, a well the content is shown in, and is hidden from
 * assistive tech; the title and the line under it say what the preview shows.
 *
 * The card is one link, named by its title, whose ::after covers the card,
 * the same pattern as WorkEntry: anywhere on the card opens the page, and a
 * screen reader hears one link rather than the whole card read aloud. So the
 * preview must hold nothing interactive (see Button's `specimen`). Hover
 * firms the edge to border/default, settles the fill to surface/page, takes
 * the title to the accent and nudges the arrow: WorkEntry's hover, so every
 * card that is a link answers the same way.
 */
export function PreviewCard({
  href,
  title,
  description,
  action,
  preview,
  className = "",
}: {
  href: string;
  title: string;
  /** One line on what is behind the link. */
  description: ReactNode;
  /** The label at the foot, such as "Read the tiers". */
  action: string;
  /** The piece of the destination, drawn live. Nothing interactive. */
  preview: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-sm border border-border-subtle bg-surface-raised transition-[border-color,background-color] duration-[160ms] hover:border-border-default hover:bg-surface-page active:bg-surface-page has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-focus-ring ${className}`}
    >
      <div
        aria-hidden="true"
        className="flex h-48 items-center justify-center border-b border-border-subtle bg-surface-sunken px-5"
      >
        {preview}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-lg leading-[1.3] text-text-primary transition-colors duration-[160ms] group-hover:text-text-accent">
          <Link href={href} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-[1.6] text-text-secondary">{description}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 font-label text-xs uppercase tracking-[0.11em] text-text-accent">
          {action}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-[160ms] group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
