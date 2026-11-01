import { Children, isValidElement, type ReactNode } from "react";

/**
 * A run of prose at the reading measure: an optional heading, the body, and
 * an optional action under it. Mirrors the Text block component in Figma.
 *
 * Before this, the same pieces were written out by hand in fifteen places
 * across four pages, and they had drifted: two line heights for the same body
 * text (1.65 and 1.7), two trackings for the same heading, paragraphs 20px
 * apart in one spot and 24px everywhere else, and a button 28px under the
 * text on one page and 32px on the next. None of those differences was a
 * decision. Now there is one answer.
 *
 * The body is Body/Long-form, 16px at 1.7. Pass a string for a single
 * paragraph, or several <p> elements; they sit 24px apart, which is the
 * paragraph spacing on the Figma style too.
 *
 * Leave out `heading` when the block sits straight under a SectionHead, which
 * already names it. Spacing above the block belongs to the page, through
 * `className`, because it depends on what comes before it.
 */
export function TextBlock({
  heading,
  headingAs: Heading = "h3",
  action,
  className = "",
  children,
}: {
  /** Optional. The block's own title, set in the display face. */
  heading?: ReactNode;
  /** The heading level. h3 under a SectionHead, which is the h2. */
  headingAs?: "h2" | "h3" | "h4";
  /** Optional. Usually a Button, 32px under the body. */
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  // Several <p> elements pass straight through. Anything else, a string or a
  // string with inline code in it, is one paragraph and gets wrapped.
  const kids = Children.toArray(children);
  const paragraphs = kids.length > 0 && kids.every((c) => isValidElement(c) && c.type === "p");
  const body = paragraphs ? children : <p>{children}</p>;

  return (
    <div className={`max-w-measure ${className}`}>
      {heading && (
        <Heading className="font-display text-xl leading-[1.25] tracking-[-0.012em] text-text-primary">
          {heading}
        </Heading>
      )}
      <div className={`${heading ? "mt-3 " : ""}flex flex-col gap-6 text-base leading-[1.7] text-text-secondary`}>
        {body}
      </div>
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}
