import type { ReactNode } from "react";
import { LockIcon } from "./Icon";
import { ScaledFrame } from "./ScaledFrame";

/**
 * A product screen recreated for a case study, in a browser window. Mirrors
 * the Recreated screen component in Figma.
 *
 * Employer screens never go on this site. When a case study needs to show
 * what a product looked like, it is redrawn here with invented names, people,
 * times and addresses, in this system's colors rather than the employer's
 * brand. This component is the frame those recreations sit in, so every case
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
 */
export function RecreatedScreen({
  address,
  width = 840,
  children,
}: {
  /** The invented address in the window's bar. */
  address: string;
  /** The width the screen is drawn at, in pixels. */
  width?: number;
  /** The recreated screen. */
  children: ReactNode;
}) {
  return (
    <ScaledFrame width={width}>
      <div className="@container">
        <div
          inert
          data-scheme="light"
          className="overflow-hidden rounded-lg border border-border-default bg-surface-page shadow-[0_12px_32px_rgb(3_16_33/0.10)]"
        >
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
          {children}
        </div>
      </div>
    </ScaledFrame>
  );
}
