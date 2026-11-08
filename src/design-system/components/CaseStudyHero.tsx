import type { ReactNode } from "react";
import { Container } from "@/design-system/primitives/Container";
import { PageHeader } from "./PageHeader";
import type { Crumb } from "./Breadcrumbs";

/**
 * The hero's fade, as a style object. Transparent until 22% of the way in,
 * solid from 64%, and faded again over the bottom quarter. Intersected, so the
 * two fades multiply rather than one painting over the other. Exported for art
 * that fades only part of itself (a background), passing `fade={false}`.
 */
export const heroFade = {
  maskImage:
    "linear-gradient(to right, transparent 22%, black 64%), linear-gradient(to bottom, black 72%, transparent)",
  maskComposite: "intersect",
  WebkitMaskImage:
    "linear-gradient(to right, transparent 22%, black 64%), linear-gradient(to bottom, black 72%, transparent)",
  WebkitMaskComposite: "source-in",
} as const;

/**
 * The opening band of a case study: the breadcrumb, the title and the intro
 * on the left, on the page's own ground, and a piece of art on the right that
 * fades out toward the text.
 *
 * The fade is a mask, not a gradient to a color. It fades the art to
 * transparent, so whatever ground the page has, light or dark, shows through,
 * and one piece of art serves both themes. It is fully transparent before it
 * reaches the text column, so the title and intro never sit on the art and
 * their contrast never depends on it. The art also fades at the bottom edge,
 * so the band ends in the page rather than on a hard line.
 *
 * The art is desktop only, from 1280 (xl), where the text column and the art
 * each have room. Below that the band is the plain page header on the plain
 * ground: on a phone a side image has no room, and an image above the title
 * pushes the title halfway down the first screen.
 *
 * `art` is a slot. Pass live components (the design system study renders its
 * own tokens and Button there, so the art follows the theme) or an Image with
 * `fill` for a study whose visual is a picture. It is decorative: hidden from
 * assistive technology and inert, so nothing in it can take focus. Anything a
 * reader needs from it belongs in the text instead.
 *
 * `id` lets the page's section nav wait until the hero has scrolled away
 * (see RevealAfter).
 */
export function CaseStudyHero({
  id = "hero",
  breadcrumb,
  title,
  lede,
  art,
  fade = true,
}: {
  id?: string;
  breadcrumb: Crumb[];
  title: ReactNode;
  lede: ReactNode;
  art?: ReactNode;
  /**
   * Fade the whole art (right for a picture). Pass false when the art fades
   * only its own background and keeps its subject solid, with `heroFade`.
   */
  fade?: boolean;
}) {
  return (
    <section id={id} aria-label="Introduction" className="relative overflow-hidden">
      {art && (
        <div
          aria-hidden="true"
          inert
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[56%] xl:block"
          style={fade ? heroFade : undefined}
        >
          {art}
        </div>
      )}

      <Container>
        {/* 40rem holds the text clear of the art: at 1280 the art's mask is
            still fully transparent where this column ends. */}
        <div className="relative pb-6 xl:max-w-[40rem] xl:pb-24">
          <PageHeader type="withSectionNav" breadcrumb={breadcrumb} title={title} lede={lede} />
        </div>
      </Container>
    </section>
  );
}
