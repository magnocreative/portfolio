import type { ReactNode } from "react";
import { Label } from "@/design-system/primitives/Container";
import { Breadcrumbs, type Crumb } from "@/design-system/components/Breadcrumbs";

/**
 * The header at the top of every page: an eyebrow (or a breadcrumb trail),
 * the h1, and an intro paragraph. Mirrors the Page header component in
 * Figma, type for type.
 *
 * It was written out by hand on all six pages before this, which meant a
 * change to the gap under the headline, or to the intro, took six edits and
 * left room for six slightly different answers.
 *
 * The type sets the headline's size and measure, because that is what
 * decides where it breaks:
 *
 *   hero: Home only. 48 on a phone, 64 from sm, 84 from lg. From lg it is
 *     capped at 12em and wraps plainly instead of balancing, which holds it at
 *     three lines from 1280 ("Hey there, I design the / systems behind the /
 *     tools people use all day."). Below that it takes four lines on a
 *     tablet and six on a phone. Balance would even the lines out and move
 *     words down.
 *   subhero: a top-level page with no section nav (Work). 48, then 64 from
 *     lg, balanced, capped at 24ch so a shorter title does not run the full
 *     column.
 *   withSectionNav: the left column beside the section nav (About, Design
 *     system, Components). The column is narrower, so the cap is 15ch until
 *     xl and 24ch from there.
 *   resume: the name, uncapped and unbalanced, followed by a subtitle and a
 *     contact row before the intro. The name is the h1 on this page and
 *     nowhere else: the page is the document, so the document gets its title.
 *
 * The intro sits 56px under the headline everywhere except the résumé, where
 * the contact row above it takes 48px. It is capped at 46rem.
 *
 * Use `breadcrumb` instead of `eyebrow` only a level down (Design system /
 * Components). The trail's last item names the page, so there is no eyebrow
 * under it repeating the same word.
 */

export type PageHeaderType = "hero" | "subhero" | "withSectionNav" | "resume";

const TITLE: Record<PageHeaderType, string> = {
  hero: "max-w-[15ch] text-4xl sm:text-5xl leading-[1.04] text-balance lg:max-w-[12em] lg:text-wrap lg:text-6xl",
  subhero: "max-w-[24ch] text-4xl leading-[1.06] text-balance lg:text-5xl",
  withSectionNav: "max-w-[15ch] text-4xl leading-[1.06] text-balance xl:max-w-[24ch] lg:text-5xl",
  resume: "text-4xl leading-[1.06] lg:text-5xl",
};

export function PageHeader({
  type,
  eyebrow,
  breadcrumb,
  title,
  lede,
  subtitle,
  meta,
  actions,
}: {
  type: PageHeaderType;
  /** The uppercase label above the headline. Leave out when `breadcrumb` is given. */
  eyebrow?: ReactNode;
  /** A trail, for pages a level down. Replaces the eyebrow. */
  breadcrumb?: Crumb[];
  title: ReactNode;
  lede: ReactNode;
  /** Résumé only: the line under the name. */
  subtitle?: ReactNode;
  /** Résumé only: the contact row, as inline items. */
  meta?: ReactNode;
  /** Résumé only: what follows the intro, such as the PDF button. */
  actions?: ReactNode;
}) {
  return (
    <section className="pt-24 pb-4 md:pt-32">
      {breadcrumb ? <Breadcrumbs items={breadcrumb} /> : <Label>{eyebrow}</Label>}

      <h1
        className={`text-optical mt-10 font-display tracking-[-0.025em] text-text-primary ${TITLE[type]}`}
      >
        {title}
      </h1>

      {subtitle && (
        <p className="mt-5 max-w-measure text-lg leading-[1.55] text-text-secondary">{subtitle}</p>
      )}

      {/* The résumé's facts beside its intro from 1280: the intro keeps the
          page's left edge like every other page's, and the facts sit in the
          fourth column of the same four-column grid Skills uses further down,
          so they start on the line where "Tools" does (Alejandro, November
          2026). Narrower, the facts sit in a row above the intro as before.
          In the source the facts come first either way, so a phone and a
          screen reader meet them in the same order. */}
      <div className={meta ? "xl:mt-12 xl:grid xl:grid-cols-4 xl:gap-x-10" : ""}>
        {meta && (
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-label text-xs uppercase tracking-[0.11em] text-text-tertiary xl:col-start-4 xl:row-start-1 xl:mt-1 xl:flex-col xl:items-start xl:gap-y-3">
            {meta}
          </div>
        )}

        <div className={meta ? "xl:col-span-3 xl:col-start-1 xl:row-start-1" : ""}>
          {/* One paragraph or several. An array becomes one <p> each, 20px
              apart, because a paragraph cannot hold another and a line break
              inside one is not a paragraph. */}
          <div
            className={`${
              type === "resume" ? "mt-12" : "mt-14"
            } ${meta ? "xl:mt-0" : ""} flex max-w-[46rem] flex-col gap-5 text-lg leading-[1.65] text-text-secondary`}
          >
            {(Array.isArray(lede) ? lede : [lede]).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {actions && <div className="mt-8">{actions}</div>}
        </div>
      </div>
    </section>
  );
}
