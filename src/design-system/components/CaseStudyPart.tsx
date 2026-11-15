import type { ReactNode } from "react";
import { SectionHead } from "./SectionHead";
import { TextBlock } from "./TextBlock";

/**
 * One of a case study's two halves: What changed, then How I got there
 * (the storytelling guide, November 2026). Mirrors the Case study part
 * component in Figma.
 *
 * The result comes first, in a half that stands on its own, and the argument
 * for the judgment behind it follows. So the page has two levels and only
 * two: the half, with a SectionHead and an eyebrow saying which half it is,
 * and the beats inside it (CaseStudyBeat), each with its own small heading.
 * A skimmer reading only the headings gets the shape of the argument, which
 * is why the beat headings are the guide's words: The situation, The result,
 * My role, The constraint, The decision, The argument I lost, What I'd do
 * differently.
 *
 * The eyebrow says "Part one" and "Part two" in words. A numeral beside a
 * title reads as a count elsewhere in the system (SectionHead's `count`), and
 * this is an order, not a count.
 *
 * Spacing above the part belongs to the page, through `className`. The first
 * beat sits 40px under the head, and each beat after it 64px under the last.
 */
export function CaseStudyPart({
  id,
  eyebrow,
  title,
  className = "",
  children,
}: {
  /** The anchor the contents list points at. */
  id: string;
  /** Which half: "Part one", "Part two". */
  eyebrow: string;
  title: ReactNode;
  className?: string;
  /** CaseStudyBeat elements. */
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={className}>
      <p className="max-w-measure font-label text-xs font-medium uppercase tracking-[0.14em] text-text-tertiary">
        {eyebrow}
      </p>
      <SectionHead id={`${id}-heading`} className="mt-3 max-w-measure">
        {title}
      </SectionHead>
      <div className="mt-10 flex flex-col gap-16">{children}</div>
    </section>
  );
}

/**
 * One beat of a half: a heading in the guide's words, the prose under it,
 * and, when the beat has evidence, the figures after the prose.
 *
 * Evidence sits in the beat it proves rather than in a gallery at the end.
 * A figure next to the claim it backs is read as proof; the same figure in an
 * Evidence section forty seconds later is read as decoration.
 */
export function CaseStudyBeat({
  id,
  heading,
  after,
  children,
}: {
  /** The anchor the contents list points at. */
  id: string;
  heading: ReactNode;
  /** Figures or a stat grid that back the beat, 40px under the prose. */
  after?: ReactNode;
  /** One paragraph as a string, or several <p> elements. */
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <TextBlock heading={heading} headingId={`${id}-heading`}>
        {children}
      </TextBlock>
      {after && <div className="mt-10 flex flex-col gap-14">{after}</div>}
    </section>
  );
}
