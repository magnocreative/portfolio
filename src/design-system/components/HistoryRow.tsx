import type { ComponentType, SVGProps } from "react";

type Mark = ComponentType<SVGProps<SVGSVGElement>>;

/**
 * One line of history that needs no card: a mark, a title, and where and when
 * under it. The résumé's Education and early career section uses two, the
 * earlier roles and the degree, so they read as a pair rather than as a
 * coda and a lone row (Alejandro, November 2026). Mirrors the History row
 * component in Figma.
 *
 * The mark is 48px and centered on the two lines beside it, 16px from the
 * text: the gap every 48px mark on the page keeps. Pass `logo` for an
 * organization's own mark. With no logo to show, pass `icon` and it is drawn
 * in a tile the logo's size and corner (rx 8 on 40, 20%), outlined rather
 * than filled, so it holds the column without pretending to be a brand.
 *
 * The period rides with the detail, not out at the right edge: alone on a
 * full-width row it sat in a field of empty space, a long way from what it
 * dates (Alejandro, November 2026). On a phone the title wraps, so the mark
 * holds to the top, beside the title it belongs to.
 */
export function HistoryRow({
  logo: Logo,
  icon: Icon,
  title,
  detail,
  period,
}: {
  /** An organization's mark, drawn at 48px. */
  logo?: Mark;
  /** A stroke icon from Icon.tsx, set in an outlined tile when there is no logo. */
  icon?: Mark;
  title: string;
  detail: string;
  period: string;
}) {
  return (
    <div className="flex items-start gap-4 sm:items-center">
      {Logo ? (
        <Logo className="h-12 w-12 shrink-0" />
      ) : Icon ? (
        <span
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[20%] border border-border-subtle bg-surface-raised text-text-secondary"
        >
          <Icon className="h-6 w-6" />
        </span>
      ) : null}
      <div className="min-w-0">
        <div className="font-display text-lg leading-[1.3] text-text-primary">{title}</div>
        <div className="mt-1 text-base text-text-secondary">
          {detail}
          <span aria-hidden="true" className="px-2 text-text-tertiary">
            ·
          </span>
          <span className="sr-only">, </span>
          {period}
        </div>
      </div>
    </div>
  );
}
