"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Holds its children back until the element `target` names has mostly
 * scrolled away, then fades them in; scrolling back up fades them out again.
 * Built for the section nav on a case study, which waits until the hero has
 * had the reader's full attention.
 *
 * "Mostly" is the hero's bottom edge passing the middle of the viewport: by
 * then the reader has started the content, and the nav arrives as they need
 * it rather than the moment they touch the wheel.
 *
 * Hidden means hidden for everyone, not just to the eye: while faded out the
 * children are inert and aria-hidden, so the nav is not in the tab order and
 * a screen reader does not announce links nobody can see. People who ask the
 * system for reduced motion get the change without the fade.
 *
 * This element is the grid cell, so it stretches the full height of the
 * content beside it; the sticky nav inside needs that tall box to travel
 * down. Pass the cell's classes through `className`.
 *
 * If the target is missing, the children simply show.
 */
export function RevealAfter({
  target,
  className = "",
  children,
}: {
  target: string;
  className?: string;
  children: ReactNode;
}) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = document.getElementById(target);
    if (!el) {
      setShown(true);
      return;
    }
    // The bottom half of the viewport is cut off the root, so the target
    // stops intersecting once its bottom edge rises past the middle.
    const io = new IntersectionObserver(
      ([entry]) => setShown(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { rootMargin: "0px 0px -50% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <div
      className={`transition-opacity duration-300 ease-[var(--ease-out-quart)] motion-reduce:transition-none ${
        shown ? "opacity-100" : "opacity-0"
      } ${className}`}
      inert={!shown}
      aria-hidden={!shown}
    >
      {children}
    </div>
  );
}
