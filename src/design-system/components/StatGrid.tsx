import { Fragment, type ReactNode } from "react";

/**
 * A path or an address may break after a slash, or after a dot when more than
 * an extension follows it ("storybook." then "magnocreative.com", never
 * "magnocreative." then "com"). Nowhere else: not at the hyphen in
 * design-system, which the browser would otherwise take.
 */
function breakable(text: string) {
  // Words wrap as words; only a path or an address needs the rule.
  if (/\s/.test(text)) return text;
  return text.split(/(?<=\/)|(?<=\.)(?=[^./]{4,})/).map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <wbr />}
      <span className="whitespace-nowrap">{part}</span>
    </Fragment>
  ));
}

/**
 * A label wraps at its comma or not at all: "tokens," over "in one file",
 * never "tokens, in one" over "file". Each label is the noun and then where
 * it is, and in a phone's narrow cell the break belongs between the two
 * (Alejandro, November 2026). At the aside's full width every label fits on
 * one line.
 */
function phrased(label: string) {
  const i = label.indexOf(", ");
  if (i < 0) return label;
  return (
    <>
      {label.slice(0, i + 1)} <span className="whitespace-nowrap">{label.slice(i + 2)}</span>
    </>
  );
}

export type Stat = {
  /** The number, set in display type. */
  value: string;
  /** What it counts, finishing the sentence the number starts: "tokens, in one file". */
  label: string;
  /** Where to check it: a path or an address, in label type. With `href`, a link. */
  detail?: string;
  href?: string;
};

/**
 * Two by two numbers, each with what it counts and where to check it: the
 * "Read the source" panel on /system, in place of a list of file paths that
 * named places without saying why they mattered (Alejandro, November 2026).
 * Mirrors the Stat grid component in Figma.
 *
 * Sizes, not outcomes, which is why this is not OutcomeStats: that row is for
 * what the work did, and argues it at the measure. This one sits in a panel's
 * aside and says how much there is to check, and where. Each cell keeps the
 * path the list used to carry, so nothing that was useful is lost.
 *
 * Hairlines between cells and none round the edge, the KeyValueList's rule:
 * the panel it sits in is the edge. Two columns from 16rem of its own width
 * (a container query), so a phone keeps the two by two too: as one column
 * of four the panel ran 1,500px tall at 390. A path or address breaks only
 * after a slash or a dot ("storybook." over "magnocreative.com"), never
 * mid-word or at a hyphen.
 * A detail with `href` is a link the way KeyValueList's are: accent, an
 * underline at rest, heavier on hover rather than a color change.
 */
export function StatGrid({
  items,
  note,
  className = "",
}: {
  items: Stat[];
  /** Optional. One line under the grid, in label type: how the numbers were got. */
  note?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`@container ${className}`}>
      <ul className="grid grid-cols-1 @3xs:grid-cols-2">
        {items.map((item, i) => (
          <li
            key={item.label}
            className={[
              "flex flex-col py-5",
              // Rows: a rule above every cell but the first (one column) or the
              // first row (two columns). Columns: a rule left of the second.
              i > 0 ? "border-t border-border-subtle" : "",
              i === 1 ? "@3xs:border-t-0" : "",
              i % 2 === 1 ? "@3xs:border-l @3xs:border-border-subtle @3xs:pl-5 @xs:pl-6" : "@3xs:pr-5 @xs:pr-6",
            ].join(" ")}
          >
            <span className="font-display text-3xl leading-[1.2] text-text-primary">{item.value}</span>
            <span className="mt-1 text-sm text-text-secondary">{phrased(item.label)}</span>
            {item.detail && (
              <span className="mt-3 font-label text-xs text-text-tertiary">
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-text-accent underline decoration-1 underline-offset-[0.3em] hover:decoration-2"
                  >
                    {breakable(item.detail)}
                  </a>
                ) : (
                  breakable(item.detail)
                )}
              </span>
            )}
          </li>
        ))}
      </ul>
      {note && <p className="mt-2 font-label text-xs text-text-tertiary text-pretty">{note}</p>}
    </div>
  );
}
