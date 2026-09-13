import Link from "next/link";

export type Crumb = {
  label: string;
  /** Omit on the last item. A crumb without an href is the page you are on. */
  href?: string;
};

/**
 * Where you are, and the way back out.
 *
 * Two things make a breadcrumb correct rather than decorative, and both are
 * invisible on screen.
 *
 * It is an ordered list inside a labelled nav. The order is the hierarchy, so
 * a screen reader announces "list, 3 items" and the position within it. A row
 * of divs separated by slashes conveys none of that, and it is what most
 * hand-built breadcrumbs are.
 *
 * The last crumb is not a link. It is the page you are already on, so it gets
 * `aria-current="page"` and no href. This is also why there is no hover state
 * on it: a hover on something you cannot click is a lie about what will happen
 * next. The trail has two states, not four, and that is the honest number.
 *
 * The separator is `aria-hidden` and lives in its own element, so it is never
 * read aloud and never lands inside a link's accessible name.
 */

export function Breadcrumbs({
  items,
  label = "Breadcrumb",
  className = "",
}: {
  items: Crumb[];
  /**
   * The nav landmark's accessible name. Leave it alone on a normal page. Two
   * landmarks sharing a name is a real defect rather than a lint nit: a screen
   * reader lists landmarks to navigate by, and two entries both called
   * "Breadcrumb" are two doors with the same sign. Override it on the rare page
   * carrying a second trail.
   */
  label?: string;
  className?: string;
}) {
  return (
    <nav aria-label={label} className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs font-medium uppercase tracking-[0.11em]">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-x-2">
              {i > 0 && (
                <span aria-hidden="true" className="text-text-tertiary">
                  /
                </span>
              )}

              {isLast || !item.href ? (
                // The current page. Truncated rather than allowed to wrap,
                // because a case study title set in uppercase mono will run
                // past any sensible trail length. Pass a short label here; the
                // full one is already the <h1> six pixels below.
                //
                // 28ch, not 22ch. `ch` measures the zero glyph and takes no
                // account of letterspacing, so at 0.11em tracking about a fifth
                // of the budget is gaps rather than characters. 22ch was
                // cutting "Self-service portal", which is exactly the length of
                // label this is asking callers to pass.
                <span
                  aria-current={isLast ? "page" : undefined}
                  title={item.label}
                  className="inline-block max-w-[28ch] truncate align-bottom text-text-primary"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-text-secondary transition-colors duration-[160ms] ease-[var(--ease-out-quart)] hover:text-text-primary"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
