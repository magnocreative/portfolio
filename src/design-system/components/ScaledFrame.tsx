"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

/**
 * Shows its child at one fixed design width, scaled down to whatever room
 * there is, the way an image of a screen would be. Never scaled up: with
 * room to spare, the child simply takes the full width, as its own layout
 * would on a wider screen.
 *
 * For recreations of products that only had one layout. The hub in the GRC
 * case study was responsive but never had a mobile design, so on a phone it
 * would be wrong to reflow it into one: that would show work that didn't
 * happen (Alejandro, November 2026). Scaled, it reads as what it is, a
 * picture of a desktop screen.
 *
 * The height follows the scale, so the frame never leaves a gap under the
 * picture or crops it. Measured before paint, so a phone doesn't see the
 * full-size layout for a frame first.
 */
export function ScaledFrame({
  width,
  className = "",
  children,
}: {
  /** The width the child is designed at, in pixels. */
  width: number;
  className?: string;
  children: ReactNode;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<{ scale: number; inner: number; height?: number }>({ scale: 1, inner: width });

  useLayoutEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    const measure = () => {
      const room = o.clientWidth;
      const scale = Math.min(1, room / width);
      setFit({ scale, inner: Math.max(width, room), height: i.offsetHeight * scale });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(o);
    ro.observe(i);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div ref={outer} className={`w-full overflow-hidden ${className}`} style={{ height: fit.height }}>
      <div ref={inner} style={{ width: fit.inner, transform: `scale(${fit.scale})`, transformOrigin: "top left" }}>
        {children}
      </div>
    </div>
  );
}
