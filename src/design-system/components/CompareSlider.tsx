"use client";

import Image, { type StaticImageData } from "next/image";
import { useId, useRef, useState, type PointerEvent } from "react";
import { ArrowLeft, ArrowRight } from "./Icon";

type Side = { src: StaticImageData | string; alt: string; label: string };

/**
 * Two images of the same thing, one over the other, with a divider the
 * reader drags to compare them: light and dark, before and after. Built for
 * the design system case study, where the claim is that one variable mode
 * switches a whole sheet between themes; a slider lets the reviewer flip it
 * themselves instead of taking the caption's word for it. Mirrors the
 * Compare slider component in Figma.
 *
 * Sits inside a Figure, which gives it the frame, the ratio and the claim.
 *
 * How it moves, and why two inputs:
 *
 *   Pointer: press anywhere on the image and drag, or tap to jump. The frame
 *     sets `touch-action: pan-y`, so on a phone a vertical swipe still
 *     scrolls the page and only a sideways drag moves the divider. A native
 *     range input laid over the image cannot do that: on iOS only its thumb
 *     drags, and a full-size one swallows the scroll.
 *
 *   Keyboard and screen readers: a real range input, visually hidden, holds
 *   the value. Arrow keys move it in 1% steps, Page Up and Down in 10%,
 *   Home and End to either edge, and it is announced as a slider with a
 *   name and a value. When it has focus the handle shows the focus ring, so
 *   the control a keyboard user is on is the one they can see.
 *
 * The handle is a round grip with arrows on the divider, so nobody has to
 * guess it moves. Labels in the bottom corners say which side is which; at the top
 * they covered the very navigation one of the comparisons is about. There
 * is no animation to reduce: the divider moves only as fast as the hand.
 */
export function CompareSlider({
  before,
  after,
  label,
  initial = 50,
  sizes = "(min-width: 1024px) 56rem, 100vw",
}: {
  /** Shown on the left of the divider. */
  before: Side;
  /** Shown on the right of the divider. */
  after: Side;
  /** Names the control for assistive technology: "Compare light and dark". */
  label: string;
  /** Where the divider starts, in percent from the left. */
  initial?: number;
  sizes?: string;
}) {
  const [pos, setPos] = useState(initial);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const inputId = useId();

  const fromClientX = (x: number) => {
    const box = frame.current?.getBoundingClientRect();
    if (!box) return;
    setPos(Math.min(100, Math.max(0, ((x - box.left) / box.width) * 100)));
  };
  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    fromClientX(e.clientX);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) fromClientX(e.clientX);
  };
  const onUp = () => {
    dragging.current = false;
  };

  // Offset of the grip from the line, so it never crosses the frame's edge.
  const handleShift = `clamp(calc(1.5rem - ${pos}cqw), 0px, calc(${100 - pos}cqw - 1.5rem))`;

  const tag =
    "pointer-events-none absolute bottom-3 rounded-[var(--radius-pill)] border border-border-subtle bg-surface-raised/90 px-2.5 py-0.5 font-label text-xs font-medium uppercase tracking-[0.11em] text-text-secondary sm:bottom-4";

  return (
    <div
      ref={frame}
      className="@container group/compare absolute inset-0 cursor-ew-resize touch-pan-y select-none"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      <Image src={after.src} alt={after.alt} fill sizes={sizes} className="object-cover" draggable={false} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before.src} alt={before.alt} fill sizes={sizes} className="object-cover" draggable={false} />
      </div>

      <span aria-hidden="true" className={`${tag} left-3 sm:left-4`}>
        {before.label}
      </span>
      <span aria-hidden="true" className={`${tag} right-3 sm:right-4`}>
        {after.label}
      </span>

      {/* The divider and its grip. The grip stays a whole grip at either end:
          it stops 1.5rem in from the edge while the line goes all the way. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -left-px w-0.5 bg-surface-raised shadow-[0_0_0_1px_var(--border-default)]" />
        <div
          className="absolute top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-0.5 rounded-full border border-border-default bg-surface-raised text-text-primary group-has-[input:focus-visible]/compare:outline-2 group-has-[input:focus-visible]/compare:outline-offset-2 group-has-[input:focus-visible]/compare:outline-focus-ring"
          style={{ left: handleShift }}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>

      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <input
        id={inputId}
        type="range"
        min={0}
        max={100}
        step={1}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-valuetext={`${Math.round(pos)}% ${before.label}, ${100 - Math.round(pos)}% ${after.label}`}
        className="sr-only"
      />
    </div>
  );
}
