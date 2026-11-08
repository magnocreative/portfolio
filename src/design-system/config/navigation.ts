/**
 * Where the main navigation lives on wide screens, from 1280px up.
 *
 * "top" puts the four links in the banner, beside the theme control. The
 * site has four destinations, which fit one row, and a persistent sidebar
 * spent 240px of every desktop page on them. That space now goes to the work.
 *
 * "rail" is the fixed left rail it replaced (November 2026): icons and labels
 * in a column, collapsible to icons only, with the collapsed state remembered
 * across visits. It is retired, not deleted. Every piece of it still works and
 * reads this one constant:
 *
 *   - SiteHeader.tsx renders <Rail /> and drops the banner's links.
 *   - railInitScript restores the collapsed state before first paint.
 *   - layout.tsx insets the content column by --rail-width.
 *   - globals.css turns the overscroll bounce off at 1280 and up, where a
 *     fixed rail would otherwise stay put while the banner bounced.
 *
 * To bring the rail back, set NAV_LAYOUT to "rail". Below 1280 nothing
 * changes either way: phones and tablets use the banner's menu.
 *
 * The Figma side is preserved the same way: the Rail component stays in the
 * Components file, and "Archive: rail navigation" in the Site file holds a
 * desktop page as it looked with the rail.
 */
export type NavLayout = "top" | "rail";

export const NAV_LAYOUT: NavLayout = "top";
