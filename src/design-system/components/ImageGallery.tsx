"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ScaledFrame } from "./ScaledFrame";

type Base = {
  /** What the item shows. Read in the grid and in the larger view. */
  alt: string;
  /** A short name, shown under the thumbnail and above the larger view. */
  label?: string;
};

/**
 * An image, or a live drawing in its place (a recreated screen). A drawing
 * gives the width it is designed at; the thumbnail shows it scaled down and
 * cropped to the top, the larger view shows all of it.
 */
export type GalleryItem = Base &
  ({ src: StaticImageData; node?: never; width?: never } | { node: ReactNode; width: number; src?: never });

/**
 * A grid of thumbnails, each opening a larger view (Alejandro, November 2026:
 * twelve sketches on one sheet were too small to read, and the answer was a
 * grid you can open rather than a bigger sheet).
 *
 * Every thumbnail is a real button, so the grid works by keyboard, and the
 * larger view is a native <dialog> opened with showModal(): the page behind
 * it is inert, Escape closes it, and focus goes back to the thumbnail that
 * opened it. The name is centered at the top, the count under the picture,
 * and previous and next sit inside the window at the picture's sides. The
 * arrow keys step too, and a click on the backdrop closes it.
 *
 * The larger view is one fixed size for the whole set, and each image is
 * fitted inside it. Thumbnails share one ratio so the grid keeps even rows
 * whatever shape each item is.
 */
export function ImageGallery({
  items,
  label,
  ratio = "16/9",
  columns = 4,
  rows,
  className = "",
}: {
  items: GalleryItem[];
  /** Names the set for assistive tech. */
  label: string;
  /** The thumbnails' shared ratio, width over height. */
  ratio?: string;
  /**
   * Columns on a wide frame. A narrow frame swipes through them instead. Two
   * for screens finer than a sketch, so their detail reads at thumbnail size
   * (Alejandro, November 2026: the audit study's roughs and high fidelity).
   */
  columns?: 2 | 3 | 4;
  /**
   * Fill the wide grid down each column instead of across each row, in this
   * many rows. The order stays the same everywhere else (the carousel, the
   * keyboard, the larger view), so a set grouped by topic can give each topic
   * its own column (Alejandro, November 2026: the sketches, one column each
   * for home, details and notifications).
   */
  rows?: 2 | 3 | 4;
  className?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  // Which half of the picture the pointer is over in the larger view.
  const [half, setHalf] = useState<"previous" | "next" | null>(null);
  const track = useRef<HTMLUListElement>(null);
  const [at, setAt] = useState(0);
  const onScroll = () => {
    const t = track.current;
    const first = t?.firstElementChild as HTMLElement | null;
    if (!t || !first) return;
    const pitch = first.offsetWidth + 12;
    setAt(Math.min(items.length - 1, Math.round(t.scrollLeft / pitch)));
  };

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open !== null && !d.open) {
      d.showModal();
      // Focus the window itself rather than its first button, so opening it
      // never lights a focus ring on Close (Alejandro, November 2026).
      // Keyboard users Tab from here to Close and the step buttons, and see
      // the ring there; Escape and the arrow keys work from the window.
      d.focus();
    }
    if (open === null && d.open) d.close();
  }, [open]);

  const step = (by: number) => setOpen((i) => (i === null ? i : (i + by + items.length) % items.length));
  const item = open === null ? null : items[open];
  const wide = [
    { 2: "@2xl:grid-cols-2", 3: "@2xl:grid-cols-3", 4: "@2xl:grid-cols-4" }[columns],
    rows ? `@2xl:grid-flow-col ${{ 2: "@2xl:grid-rows-2", 3: "@2xl:grid-rows-3", 4: "@2xl:grid-rows-4" }[rows]}` : "",
  ].join(" ");

  return (
    <div className={`@container ${className}`}>
      {/* On a narrow frame the grid becomes a carousel you swipe, each
          thumbnail most of the width so the next one peeks in and says there
          is more (Alejandro, November 2026). From @2xl it is a grid again. */}
      <ul
        ref={track}
        aria-label={label}
        onScroll={onScroll}
        className={`-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden @2xl:mx-0 @2xl:grid @2xl:gap-4 @2xl:overflow-visible @2xl:px-0 @2xl:pb-0 ${wide}`}
      >
        {items.map((it, i) => (
          <li key={it.label ?? i} className="w-[82%] shrink-0 snap-start @2xl:w-auto">
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`${it.label ? `${it.label}. ` : ""}${it.alt} Open larger.`}
              aria-haspopup="dialog"
              className="group flex w-full flex-col gap-2 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
            >
              {/* Light in both themes: what the gallery shows is drawn on paper
                  or recreated in the light scheme, like every recreated
                  screen on this site. The label beneath follows the theme. */}
              <span
                data-scheme="light"
                className={[
                  "relative block w-full overflow-hidden rounded-sm border border-border-default bg-surface-raised",
                  // Hover and keyboard focus say "this opens": a 2px edge in
                  // the interactive blue, and the thumbnail lifts 4px onto a
                  // soft shadow (Alejandro, November 2026). A 1px tint of the
                  // edge was too quiet to notice. Still for anyone who asks
                  // for reduced motion; the edge alone carries it.
                  // The slow step on the house curve: a lift you see happen rather
                  // than a jump (Alejandro, November 2026: slower, smoother).
                  "transition-[border-color,translate,box-shadow] duration-[var(--duration-slow)] ease-[var(--ease-out-quart)]",
                  "motion-safe:group-hover:-translate-y-1 group-hover:border-interactive group-hover:ring-1 group-hover:ring-interactive group-hover:shadow-[var(--shadow-lift)]",
                  "motion-safe:group-focus-visible:-translate-y-1 group-focus-visible:border-interactive group-focus-visible:ring-1 group-focus-visible:ring-interactive group-focus-visible:shadow-[var(--shadow-lift)]",
                ].join(" ")}
                style={{ aspectRatio: ratio }}
              >
                {it.src ? (
                  <Image src={it.src} alt="" fill sizes="(min-width: 1024px) 14rem, 50vw" className="object-contain p-2" />
                ) : (
                  <span inert aria-hidden="true" className="absolute inset-0 block">
                    <ScaledFrame width={it.width}>{it.node}</ScaledFrame>
                  </span>
                )}
                {/* An expand mark, shown on hover and focus, so the thumbnail
                    says it opens without a label on every one. */}
                <span
                  aria-hidden="true"
                  className="absolute right-1.5 bottom-1.5 grid h-7 w-7 place-items-center rounded-sm border border-border-default bg-surface-raised text-text-secondary opacity-0 transition-opacity duration-[160ms] group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3.5h4.5V8M8 16.5H3.5V12M16.5 3.5 11 9M3.5 16.5 9 11" />
                  </svg>
                </span>
              </span>
              {it.label && (
                /* Sentence case, as written, not an all-caps label: these
                    name pictures, and read better as words (Alejandro,
                    November 2026). */
                <span className="text-sm text-text-secondary group-hover:text-text-primary">
                  {it.label}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
      {/* Where you are in the carousel. Narrow frames only; decoration, since
          every thumbnail is reachable and named on its own. */}
      <div aria-hidden="true" className="mt-3 flex justify-center gap-1.5 @2xl:hidden">
        {items.map((it, i) => (
          <span
            key={it.label ?? i}
            className={`h-1.5 rounded-full transition-all duration-[160ms] ${i === at ? "w-4 bg-text-secondary" : "w-1.5 bg-border-strong"}`}
          />
        ))}
      </div>

      <dialog
        ref={dialog}
        tabIndex={-1}
        aria-label={item ? `${label}: ${item.label ?? item.alt}` : label}
        onClose={() => {
          setOpen(null);
          setHalf(null);
        }}
        onClick={(e) => {
          if (e.target === dialog.current) setOpen(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            step(1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            step(-1);
          }
        }}
        className={[
          // One size for every item, so stepping through a set never resizes
          // the window under the pointer (Alejandro, November 2026: no
          // dancing). Wide and tall pictures are fitted inside it; a drawing
          // taller than the window scrolls within it.
          "m-auto h-[min(calc(100dvh-2rem),24rem)] w-[min(calc(100vw-2rem),64rem)] max-h-none max-w-none sm:h-[min(calc(100dvh-2rem),46rem)]",
          "overflow-hidden rounded-lg border border-[light-dark(var(--border-subtle),var(--border-default))] bg-surface-raised p-0 text-text-primary outline-none",
          "shadow-[var(--shadow-dialog)]",
          // The backdrop: frosted page in light; in dark, a near-black scrim,
          // since the page's own dark is already darker than the window and
          // a tint of it left the two almost the same (Alejandro, November
          // 2026). The window gets the firmer edge in dark for the same
          // reason.
          "backdrop:bg-[light-dark(color-mix(in_oklab,var(--surface-page)_70%,transparent),oklch(0%_0_0/0.62))] backdrop:backdrop-blur-[10px]",
        ].join(" ")}
      >
        {item && open !== null && (
          <div className="flex h-full flex-col">
            {/* The name, centered, with Close at the right; the empty cell at
                the left balances it so the name sits on the window's middle
                (Alejandro, November 2026). */}
            <div className="grid shrink-0 grid-cols-[2.5rem_1fr_2.5rem] items-center gap-3 border-b border-border-subtle px-3 py-1.5">
              <span />
              <span className="truncate text-center text-sm font-medium text-text-primary">{item.label}</span>
              <span>
                <IconButton label="Close" onClick={() => setOpen(null)}>
                  {/* 24px with the carets' 1.75 stroke, so the window's three
                      controls read as one set (Alejandro, November 2026) */}
                  <svg viewBox="0 0 20 20" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" aria-hidden="true">
                    <path d="M5.5 5.5l9 9M14.5 5.5l-9 9" />
                  </svg>
                </IconButton>
              </span>
            </div>

            {/* Previous and next sit inside the window, at the picture's left
                and right edges, centered on its height (Alejandro, November
                2026: outside the window they read as part of the page). They
                sit outside the scrolling area, so a tall drawing scrolls
                beneath them and they stay put.

                The picture itself steps too: a click on its left half goes
                back, on its right half forward, and the pointer and the
                matching button say which (Alejandro, November 2026). The
                click is read on the scrolling area rather than on covering
                buttons, so a tall drawing still scrolls under the wheel. A
                pointer convenience only; the buttons and the arrow keys are
                the accessible way, so nothing here needs a name. */}
            <div className="relative flex min-h-0 flex-1 flex-col">
              <div
                key={open /* a new item starts at its top */}
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  setHalf(e.clientX - r.left < r.width / 2 ? "previous" : "next");
                }}
                onMouseLeave={() => setHalf(null)}
                onClick={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  step(e.clientX - r.left < r.width / 2 ? -1 : 1);
                }}
                className={`min-h-0 flex-1 overflow-y-auto px-14 py-2 sm:px-20 sm:py-3 ${
                  half === "previous" ? "cursor-w-resize" : "cursor-e-resize"
                }`}
              >
                {item.src ? (
                  <div data-scheme="light" className="relative h-full rounded-sm bg-surface-raised">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 64rem, 100vw"
                      className="object-contain p-1 sm:p-6"
                    />
                  </div>
                ) : (
                  <div role="img" aria-label={item.alt} className="mx-auto" style={{ maxWidth: item.width }}>
                    {/* Clipped to the same corner as an image in this view and
                        the thumbnails, so a drawing's own ground does not
                        meet the window in a square corner (Alejandro,
                        November 2026) */}
                    <div inert className="overflow-hidden rounded-sm">
                      <ScaledFrame width={item.width}>{item.node}</ScaledFrame>
                    </div>
                  </div>
                )}
              </div>

              <span className="absolute top-1/2 left-3 -translate-y-1/2">
                <StepButton dir="previous" onClick={() => step(-1)} hinted={half === "previous"} />
              </span>
              <span className="absolute top-1/2 right-3 -translate-y-1/2">
                <StepButton dir="next" onClick={() => step(1)} hinted={half === "next"} />
              </span>
            </div>

            {/* The count under the picture, centered */}
            <p aria-live="polite" className="shrink-0 border-t border-border-subtle py-2.5 text-center text-sm text-text-secondary sm:py-3">
              {open + 1} of {items.length}
            </p>
          </div>
        )}
      </dialog>
    </div>
  );
}

/* Carets, not arrows: on this site an arrow means going somewhere (a link,
   Launch), and a caret means stepping through what is already here
   (Alejandro, November 2026). The caret alone, 24px, in a 40px target that
   shows its circle only on hover. */
function StepButton({ dir, onClick, hinted = false }: { dir: "previous" | "next"; onClick: () => void; hinted?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "next" ? "Next" : "Previous"}
      // A mouse press does not move focus here, so clicking never leaves a
      // ring behind; Tab and Enter still reach and show it (Alejandro,
      // November 2026)
      onMouseDown={(e) => e.preventDefault()}
      className={[
        "grid h-10 w-10 place-items-center rounded-full",
        hinted ? "text-text-accent" : "text-text-secondary",
        // A circle only under the pointer: the caret stands alone until it is
        // the thing being pointed at (Alejandro, November 2026). Light keeps
        // the sunken surface; dark uses the text color at 14%, since the
        // sunken surface there was too close to the window to see.
        "transition-colors duration-[160ms] hover:bg-[light-dark(var(--surface-sunken),color-mix(in_oklab,var(--text-primary)_14%,transparent))] hover:text-text-primary",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]",
      ].join(" ")}
    >
      <svg viewBox="0 0 20 20" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={dir === "next" ? "M8 4.5 13.5 10 8 15.5" : "M12 4.5 6.5 10l5.5 5.5"} />
      </svg>
    </button>
  );
}

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      onMouseDown={(e) => e.preventDefault()}
      className="grid h-10 w-10 place-items-center rounded-full text-text-secondary transition-colors duration-[160ms] hover:bg-[light-dark(var(--surface-sunken),color-mix(in_oklab,var(--text-primary)_14%,transparent))] hover:text-text-primary focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
    >
      {children}
    </button>
  );
}
