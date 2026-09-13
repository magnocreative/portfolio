import Link from "next/link";
import type { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonShape = "rounded" | "pill";

type Common = {
  children: ReactNode;
  variant?: ButtonVariant;
  shape?: ButtonShape;
  /** Sits before the label. Pass any icon; the component sizes and aligns it. */
  iconBefore?: ReactNode;
  /** Sits after the label. The usual case: an arrow on a forward action. */
  iconAfter?: ReactNode;
  disabled?: boolean;
  /**
   * The current choice, not a moment of contact. Holds the deepest tint for as
   * long as it is true, and announces itself: `aria-pressed` on a button,
   * `aria-current="page"` on a link. Pressing already borrows the same value
   * through `:active`, so the two never drift out of step, but pressing lasts
   * 100ms and this lasts until something else is chosen.
   */
  selected?: boolean;
  className?: string;
};

type AsLink = Common & { href: string; onClick?: never; type?: never };
type AsButton = Common & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
};

export type ButtonProps = AsLink | AsButton;

/**
 * One component, two elements.
 *
 * Given an `href` it renders an anchor; otherwise a real `<button>`. That
 * distinction is not cosmetic. A link navigates and belongs in the tab order
 * as a link; a button performs an action and responds to Space as well as
 * Enter. Styling one to look like the other is fine. Using the wrong element
 * breaks keyboard behaviour and lies to a screen reader, and it is the single
 * most common defect in a hand-rolled button component.
 *
 * The label is Inter at 14px, not the mono uppercase the rest of the interface
 * furniture uses. Mono uppercase is a labelling voice: it names a thing. A
 * button asks you to do a thing, and asking reads better in the same face and
 * the same case as the sentence that just made the argument. It is also the
 * one size on this site that has to survive being read at a glance by someone
 * who has already decided to click.
 */

const shapes: Record<ButtonShape, string> = {
  rounded: "rounded-sm",
  pill: "rounded-[var(--radius-pill)]",
};

/**
 * Three fills, not two fills and an outline.
 *
 * The obvious way to build a secondary button is an outline: transparent
 * inside, a border to give it presence. It is also the weaker way. An outlined
 * button sits at almost the same visual weight as a disabled one, it competes
 * with every hairline rule on a page like this one, and the moment you put it
 * next to a solid primary the pair reads as one real button and one ghost.
 *
 * A tinted fill solves all three. Secondary is the same blue as primary at a
 * fraction of the strength, so the two are obviously the same family at two
 * volumes, and the tint gives it a shape without adding another line to a page
 * already full of them. Every variant carries a transparent border regardless,
 * so the three stand exactly the same height and a mixed row sits on one
 * baseline.
 *
 * Only the secondary variant carries a visible edge, and only because a tint
 * that faint cannot hold a shape on its own. Primary does not need one; it is
 * a solid block of colour. Tertiary should not have one; it is text.
 */
const variants: Record<ButtonVariant, string> = {
  // Solid. The loudest object available, so it should be rare on a page.
  primary:
    "bg-interactive text-interactive-on border border-transparent hover:bg-interactive-hover active:bg-interactive-selected",
  // The same blue, quietly. Fill at rest, deepening on hover and when it is
  // the current choice, with a hairline holding the shape.
  //
  // The tint alone measures about 1.1:1 against whatever is behind it, so the
  // fill gives the control no real boundary. The hairline roughly doubles that
  // to 1.9:1, which is enough to see a shape and not enough to meet the 3:1
  // non-text bar. That is a stated trade, not a miss: the label at 6.35:1
  // inside a real button element is what identifies the control. See the
  // token for the full argument.
  secondary:
    "bg-interactive-subtle text-text-accent border border-border-interactive hover:bg-interactive-subtle-hover active:bg-interactive-subtle-selected",
  // Text alone, and it stays text: it underlines on hover rather than taking a
  // fill, because a tertiary that fills on hover turns into a secondary and
  // the distinction you spent three variants building disappears on contact.
  tertiary:
    "bg-transparent text-text-accent border border-transparent underline-offset-[0.3em] decoration-1 hover:text-interactive-hover hover:underline",
};

// The current choice, held. Same values `:active` borrows, so a press is a
// preview of what being selected looks like rather than a separate idea.
const selectedStyles: Record<ButtonVariant, string> = {
  primary: "bg-interactive-selected text-interactive-on border border-transparent",
  secondary: "bg-interactive-subtle-selected text-text-accent border border-border-interactive",
  // Two pixels, not one. A tertiary hover already underlines, so a selected
  // tertiary drawn the same way is indistinguishable from a cursor passing
  // over it. The heavier rule is what says this one is staying.
  tertiary:
    "bg-transparent text-text-accent border border-transparent underline underline-offset-[0.3em] decoration-2",
};

// Explicit colours rather than opacity. An opacity-dimmed button has a
// contrast ratio nobody can predict, because it depends on whatever happens to
// be behind it. These are measurable. It stays a fill, like the other two, so
// disabled reads as the same object drained of colour rather than a different
// kind of control.
const disabledStyles =
  "bg-interactive-disabled text-text-tertiary border border-transparent cursor-not-allowed";

function Inner({
  children,
  iconBefore,
  iconAfter,
}: Pick<Common, "children" | "iconBefore" | "iconAfter">) {
  return (
    <>
      {iconBefore && <span className="-ml-0.5 h-4 w-4 shrink-0">{iconBefore}</span>}
      <span>{children}</span>
      {iconAfter && <span className="-mr-0.5 h-4 w-4 shrink-0">{iconAfter}</span>}
    </>
  );
}

export function Button({
  children,
  variant = "secondary",
  shape = "rounded",
  iconBefore,
  iconAfter,
  disabled = false,
  selected = false,
  className = "",
  ...rest
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center gap-2",
    "px-5 py-2.5 min-h-[2.5rem]",
    "font-sans text-sm font-medium leading-[1.2] whitespace-nowrap",
    "transition-colors duration-[160ms] ease-[var(--ease-out-quart)]",
    shapes[shape],
    disabled
      ? disabledStyles
      : selected
        ? selectedStyles[variant]
        : variants[variant],
    className,
  ].join(" ");

  const inner = <Inner iconBefore={iconBefore} iconAfter={iconAfter}>{children}</Inner>;

  if ("href" in rest && rest.href !== undefined) {
    // A disabled link is not a thing. Render it as a disabled button so it
    // leaves the tab order rather than staying focusable and inert.
    if (disabled) {
      return (
        <button type="button" className={classes} disabled aria-disabled="true">
          {inner}
        </button>
      );
    }
    return (
      <Link href={rest.href} className={classes} aria-current={selected ? "page" : undefined}>
        {inner}
      </Link>
    );
  }

  const { onClick, type = "button" } = rest as AsButton;
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected ? true : undefined}
    >
      {inner}
    </button>
  );
}
