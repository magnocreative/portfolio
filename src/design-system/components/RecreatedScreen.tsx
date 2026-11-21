import type { ReactNode } from "react";
import { LockIcon } from "./Icon";
import { ScaledFrame } from "./ScaledFrame";

/**
 * A product screen recreated for a case study, in a browser window. Mirrors
 * the Recreated screen component in Figma.
 *
 * Employer screens never go on this site. When a case study needs to show
 * what a product looked like, it is redrawn here with invented names, people,
 * times and addresses, in this system's colors or an invented product look,
 * never the employer's brand. This component is the frame those recreations sit in, so every case
 * study shows them the same way (first used for the hub in the GRC study,
 * November 2026). The screen inside belongs to the case study, not the system.
 *
 * Three things it decides, so no case study has to:
 *
 *   Light only. The products these recreate only ever had a light theme, and
 *   this is a picture of them, the way a screenshot would be.
 *   data-scheme="light" recomputes every role inside in its light value
 *   (tokens.css), whatever theme the page is in.
 *
 *   Desktop only, scaled. A product that never had a mobile design is not
 *   reflowed into one on a phone; it is drawn at `width` and scaled down,
 *   like an image (ScaledFrame). The @container inside is that fixed width,
 *   so the screen's own layout never changes, only its size.
 *
 *   A picture, not an interface. It is inert: nothing inside is focusable or
 *   clickable, even what is drawn to look like a button. Name it from the
 *   outside, with role="img" and an aria-label on the figure's content, or
 *   with a CompareSlider side's alt.
 *
 * The address is invented and neutral ("hub.example"), never a real domain.
 *
 * `tab` draws the full browser instead of the bare frame: a tab with the
 * page's title, the window's colored controls, back, forward and reload, and
 * the address with its path. For a study that wants its screens to read as
 * captured from a real browser (Alejandro, November 2026: hyper realistic
 * high fidelity in the GRC study). Without it, the quiet frame.
 */
export function RecreatedScreen({
  address,
  width = 840,
  tab,
  children,
}: {
  /** The invented address in the window's bar. */
  address: string;
  /** The width the screen is drawn at, in pixels. */
  width?: number;
  /** The page's title, on a tab. Turns on the full browser. */
  tab?: string;
  /** The recreated screen. */
  children: ReactNode;
}) {
  return (
    <ScaledFrame width={width}>
      <div className="@container">
        <div
          inert
          data-scheme="light"
          className="overflow-hidden rounded-lg border border-border-default bg-surface-page shadow-[var(--shadow-window)]"
        >
          {tab ? (
            <Browser address={address} tab={tab} />
          ) : (
            <div className="flex items-center gap-3 border-b border-border-subtle bg-surface-sunken px-3 py-2">
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                <span className="h-2.5 w-2.5 rounded-full bg-border-default" />
                <span className="h-2.5 w-2.5 rounded-full bg-border-default" />
              </span>
              <span className="mx-auto flex min-w-64 items-center gap-1.5 rounded-sm bg-surface-raised px-3 py-1 text-xs text-text-tertiary">
                <LockIcon className="h-3 w-3" />
                {address}
              </span>
              <span className="w-10" />
            </div>
          )}
          {children}
        </div>
      </div>
    </ScaledFrame>
  );
}

const glyph = {
  back: "M12.5 4.5 7 10l5.5 5.5",
  forward: "M7.5 4.5 13 10l-5.5 5.5",
  reload: "M15.5 9.5a5.5 5.5 0 1 1-1.6-3.9M15.5 3.5v3.2h-3.2",
  star: "M10 3.2l2 4.2 4.6.6-3.4 3.2.9 4.6L10 13.6l-4.1 2.2.9-4.6-3.4-3.2 4.6-.6z",
  plus: "M10 5v10M5 10h10",
  close: "M6.5 6.5l7 7M13.5 6.5l-7 7",
} as const;

function G({ d, className = "h-3.5 w-3.5" }: { d: keyof typeof glyph; className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={glyph[d]} />
    </svg>
  );
}

/* The full browser: a tab strip over a toolbar, as a desktop browser draws
   them. The window controls take the status colors, the nearest roles to a
   real window's red, amber and green. */
function Browser({ address, tab }: { address: string; tab: string }) {
  return (
    <div className="border-b border-border-default bg-surface-sunken">
      <div className="flex items-end gap-2 px-3 pt-2">
        <span className="mr-2 flex gap-1.5 self-center pb-1.5">
          <span className="h-3 w-3 rounded-full bg-status-danger" />
          <span className="h-3 w-3 rounded-full bg-status-warning" />
          <span className="h-3 w-3 rounded-full bg-status-success" />
        </span>
        <span className="flex w-56 items-center gap-2 rounded-t-lg bg-surface-raised px-3 py-1.5 text-xs text-text-primary shadow-[0_-1px_0_var(--border-subtle)]">
          <span className="grid h-3.5 w-3.5 shrink-0 grid-cols-2 gap-px rounded-[3px] bg-interactive p-[2px]">
            <span className="rounded-[1px] bg-interactive-on" />
            <span className="rounded-[1px] bg-interactive-on opacity-60" />
            <span className="rounded-[1px] bg-interactive-on opacity-60" />
            <span className="rounded-[1px] bg-interactive-on" />
          </span>
          <span className="truncate">{tab}</span>
          <span className="ml-auto text-text-tertiary">
            <G d="close" className="h-3 w-3" />
          </span>
        </span>
        <span className="self-center pb-1 text-text-tertiary">
          <G d="plus" className="h-3.5 w-3.5" />
        </span>
      </div>
      <div className="flex items-center gap-3 bg-surface-raised px-3 py-1.5 text-text-secondary">
        <G d="back" />
        <G d="forward" className="h-3.5 w-3.5 opacity-40" />
        <G d="reload" />
        <span className="flex flex-1 items-center gap-1.5 rounded-full bg-surface-sunken px-3 py-1 text-xs">
          <LockIcon className="h-3 w-3 text-text-tertiary" />
          <span>
            <span className="text-text-primary">{address.split("/")[0]}</span>
            <span className="text-text-tertiary">{address.includes("/") ? "/" + address.split("/").slice(1).join("/") : ""}</span>
          </span>
          <span className="ml-auto text-text-tertiary">
            <G d="star" />
          </span>
        </span>
        <span className="grid h-5 w-5 place-items-center rounded-full bg-border-default text-[9px] font-semibold text-text-secondary">J</span>
      </div>
    </div>
  );
}
