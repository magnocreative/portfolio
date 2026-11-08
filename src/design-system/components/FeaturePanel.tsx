import type { ReactNode } from "react";
import { Label } from "@/design-system/primitives/Container";

/**
 * A raised panel with a main column and an aside: the home page's design
 * system panel, the mark on About, and "Read the source" on the design system
 * page. Mirrors Feature panel in Figma.
 *
 * Before this, the three were written out by hand and had drifted: the gap
 * between the columns was 64px on two and 80px on the third, and stacked on a
 * phone it was 48px on one and 40px on the others. None of that was a
 * decision. The spacing now lives here: 32px inside on a phone, 48px from
 * 768, 40px between the columns when they stack, 64px when they sit side by
 * side.
 *
 * Side by side from 1280, not 1024. At 1024 the design system page's panel
 * left its heading a 194px column, five lines for six words, and the home
 * panel's text ran 318px wide beside the specimen. Stacked, both read.
 *
 * What does differ is real, so it is a prop rather than a copy:
 *
 *   asideWidth: the aside is sized by what it holds. "narrow" (15rem) for
 *     the mark, "medium" (22rem) for file paths, "wide" (26rem) for a row of
 *     three buttons.
 *   asideSide: the mark leads its text, so it sits at the start; facts and
 *     specimens follow theirs, at the end. Source order follows the visual
 *     order either way.
 *   align: "center" when the two columns are of a similar height, "start"
 *     when the main column is long prose beside a short aside, where centering
 *     would float the aside halfway down the text.
 *
 * The main column takes an optional eyebrow, heading and action. A string
 * body is set as one paragraph at 52ch; anything else is placed as given, for
 * prose that brings its own paragraphs.
 */
const widths = {
  narrow: "xl:grid-cols-[1fr_15rem]",
  medium: "xl:grid-cols-[1fr_22rem]",
  wide: "xl:grid-cols-[1fr_26rem]",
} as const;

const widthsAtStart = {
  narrow: "xl:grid-cols-[15rem_1fr]",
  medium: "xl:grid-cols-[22rem_1fr]",
  wide: "xl:grid-cols-[26rem_1fr]",
} as const;

export function FeaturePanel({
  eyebrow,
  heading,
  headingAs: Heading = "h2",
  action,
  aside,
  asideWidth = "medium",
  asideSide = "end",
  align = "center",
  inset = "default",
  className = "",
  children,
}: {
  /** Optional. A small accent label above the heading. */
  eyebrow?: ReactNode;
  /** Optional. Display type, 3xl. */
  heading?: ReactNode;
  /** h2 when the panel opens its own section; h3 under a SectionHead. */
  headingAs?: "h2" | "h3";
  /** Optional. Usually a Button, 28px under the body. */
  action?: ReactNode;
  /** The second column: facts, a specimen, the mark. */
  aside: ReactNode;
  asideWidth?: keyof typeof widths;
  asideSide?: "start" | "end";
  align?: "center" | "start";
  /**
   * "tight" takes the padding to 24px where the columns sit side by side,
   * for an aside that is itself a bordered box. At 48px the two borders, the
   * panel's and the box's, stood far enough apart to read as a heavy double
   * frame; at 24 the box sits close to the panel's edge and the pair reads as
   * one object (Alejandro, on the home page's specimen). Stacked, below
   * 1280, the usual padding applies.
   */
  inset?: "default" | "tight";
  className?: string;
  children?: ReactNode;
}) {
  const cols = asideSide === "start" ? widthsAtStart[asideWidth] : widths[asideWidth];
  const main = (
    <div>
      {eyebrow && <Label className="!text-text-accent">{eyebrow}</Label>}
      {heading && (
        <Heading
          className={`${eyebrow ? "mt-5 " : ""}max-w-[24ch] font-display text-3xl leading-[1.2] tracking-[-0.018em] text-text-primary`}
        >
          {heading}
        </Heading>
      )}
      {typeof children === "string" ? (
        <p className={`${heading ? "mt-5 " : ""}max-w-[52ch] text-base text-text-secondary`}>{children}</p>
      ) : (
        children
      )}
      {action && <div className="mt-7">{action}</div>}
    </div>
  );

  return (
    <div
      className={[
        "grid grid-cols-1 gap-10 rounded-sm border border-border-subtle bg-surface-raised p-8 md:p-12 xl:gap-16",
        inset === "tight" ? "xl:p-6" : "",
        cols,
        align === "center" ? "xl:items-center" : "",
        className,
      ].join(" ")}
    >
      {asideSide === "start" ? (
        <>
          {aside}
          {main}
        </>
      ) : (
        <>
          {main}
          {aside}
        </>
      )}
    </div>
  );
}
