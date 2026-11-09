import type { ReactNode } from "react";
import { PageHeader } from "./PageHeader";
import type { Crumb } from "./Breadcrumbs";
import { Container } from "@/design-system/primitives/Container";

/**
 * The fade on the hero's ground. Transparent for its first 140px, solid from
 * 405px, and faded again over the bottom quarter. Intersected, so the two
 * fades multiply rather than one painting over the other.
 *
 * In pixels, not percentages: the ground grows with the window, and a
 * percentage fade grew with it, so at 2560 the dots stayed transparent until
 * well past the subject and it floated on nothing. 140 and 405 are 22% and
 * 64% of the ground at 1440, so that width is unchanged; at 1280 the text
 * column still ends before the first dot shows.
 */
const heroFade = {
  maskImage:
    "linear-gradient(to right, transparent 140px, black 405px), linear-gradient(to bottom, black 72%, transparent)",
  maskComposite: "intersect",
  WebkitMaskImage:
    "linear-gradient(to right, transparent 140px, black 405px), linear-gradient(to bottom, black 72%, transparent)",
  WebkitMaskComposite: "source-in",
} as const;

/**
 * The opening band of a case study: the breadcrumb, the title and the intro
 * on the left, on the page's own ground, and art on the right.
 *
 * The art comes in two layers, because they want opposite things from a wide
 * screen:
 *
 *   art: the ground. A picture or a pattern that bleeds off the right edge of
 *     the window and fades out toward the text. The fade is a mask to
 *     transparent, not a gradient to a color, so whatever ground the page has
 *     shows through and one piece of art serves both themes. It is fully
 *     transparent before it reaches the text, so the title's contrast never
 *     depends on it, and it fades at the bottom so the band ends in the page.
 *
 *   subject: the thing the art is of, kept solid. It sits in a 16.125rem
 *     column against the content's right edge, the edge the nav's controls
 *     end on. It used to sit at 62% across the art, and the art is a share of
 *     the window, so on a 1920 or 2560 display the subject drifted past the
 *     content and left a hole between it and the title. Tied to the content
 *     box instead, it holds its place at every width, and only the ground
 *     grows into the extra room.
 *
 * Both layers are measured from a box with the Container's cap and gutters,
 * so they line up with the text and the nav. At 1440 the ground starts 56.4%
 * into that box (806px, the same place as before) and the subject centers
 * 129px in from the content edge.
 *
 * Desktop only, from 1280 (xl). From 1440 the text column widens to 51rem so
 * a 64px title of this length sets in three lines (Alejandro, November 2026);
 * between 1280 and 1439 the ground starts at 44% and the title takes four.
 * Below 1280 the band is the plain page header on the plain ground: on a
 * phone a side image has no room, and an image above the title pushes the
 * title halfway down the first screen.
 *
 * Both layers are decorative: hidden from assistive technology and inert, so
 * nothing in them can take focus. Anything a reader needs belongs in the text.
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
  subject,
}: {
  id?: string;
  breadcrumb: Crumb[];
  title: ReactNode;
  lede: ReactNode;
  /** The ground: bleeds off the right edge and fades toward the text. */
  art?: ReactNode;
  /** Solid, centered in a column at the content's right edge. */
  subject?: ReactNode;
}) {
  return (
    <section id={id} aria-label="Introduction" className="relative overflow-hidden">
      {(art || subject) && (
        <div aria-hidden="true" inert className="pointer-events-none absolute inset-0 hidden xl:block">
          <div className="relative mx-auto h-full max-w-wide px-16">
            {art && (
              <div
                className="absolute inset-y-0 right-[min(0px,calc((84rem_-_100vw)/2))] left-[44%] min-[1440px]:left-[56.4%]"
                style={heroFade}
              >
                {art}
              </div>
            )}
            {subject && (
              <div className="absolute inset-y-0 right-16 flex w-[16.125rem] items-center justify-center">
                {subject}
              </div>
            )}
          </div>
        </div>
      )}

      <Container>
        {/* The column is sized against the art, so the text never sits on
            it: where the column ends, the ground's mask is still fully
            transparent. From 1280 the column is 40rem. From 1440 there is
            room for a 51rem column, which sets a 64px title of this length
            in three lines rather than four (Alejandro, November 2026).
            Between 1280 and 1439 both cannot fit, and the title takes four
            lines. */}
        <div className="relative pb-6 xl:pb-24 min-[1280px]:max-w-[40rem] min-[1440px]:max-w-[51rem]">
          <PageHeader type="withSectionNav" breadcrumb={breadcrumb} title={title} lede={lede} />
        </div>
      </Container>
    </section>
  );
}
