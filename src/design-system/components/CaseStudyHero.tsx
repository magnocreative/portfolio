import type { ReactNode } from "react";
import { PageHeader } from "./PageHeader";
import type { Crumb } from "./Breadcrumbs";
import { Container } from "@/design-system/primitives/Container";

/**
 * The fade on the hero's ground. The ground runs the full width of the band,
 * behind the text as well as the art (Alejandro, November 2026: continue the
 * dots on the left), so the hero reads as one canvas. Behind the text it is
 * held at 45%, rising to full strength from 52% to 72% across, where the
 * subject sits, and it fades out over the bottom quarter. Intersected, so the
 * two fades multiply rather than one painting over the other.
 *
 * The dots are the faint border color on the page's own ground, so the
 * title and lede keep their contrast against the page; at 45% they are a
 * texture under the words, not a pattern competing with them.
 */
const heroFade = {
  maskImage:
    "linear-gradient(to right, rgb(0 0 0 / 0.45) 52%, black 72%), linear-gradient(to bottom, black 72%, transparent)",
  maskComposite: "intersect",
  WebkitMaskImage:
    "linear-gradient(to right, rgb(0 0 0 / 0.45) 52%, black 72%), linear-gradient(to bottom, black 72%, transparent)",
  WebkitMaskComposite: "source-in",
} as const;

/**
 * The opening band of a case study: the breadcrumb, the title and the intro
 * on the left, and art on the right, on one dotted ground across both.
 *
 * The art comes in two layers, because they want opposite things from a wide
 * screen:
 *
 *   art: the ground. A picture or a pattern that bleeds off both edges of
 *     the window, quieter behind the text and full strength around the
 *     subject. The fade is a mask to transparent, not a gradient to a color,
 *     so whatever ground the page has shows through and one piece of art
 *     serves both themes. It fades at the bottom so the band ends in the
 *     page. Only a faint pattern belongs here, since it sits under the title.
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
 * so they line up with the text and the nav. The subject centers 129px in
 * from the content edge at 1440.
 *
 * Desktop only, from 1280 (xl). From 1440 the text column widens to 51rem so
 * a 64px title of this length sets in three lines (Alejandro, November 2026);
 * between 1280 and 1439 the title takes four.
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
                className="absolute inset-y-0 right-[min(0px,calc((84rem_-_100vw)/2))] left-[min(0px,calc((84rem_-_100vw)/2))]"
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
        {/* The column is sized against the subject, so the text never runs
            into it. From 1280 the column is 40rem. From 1440 there is
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

/**
 * The default ground for a case study hero: a faint dotted canvas, the part
 * that fades and the part that fills a wide screen. Moved here from the first
 * study once the second needed it too.
 */
export function DottedGround() {
  return (
    <div
      className="h-full w-full"
      style={{
        backgroundImage: "radial-gradient(var(--border-default) 1.2px, transparent 1.6px)",
        backgroundSize: "28px 28px",
      }}
    />
  );
}
