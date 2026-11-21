import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

/**
 * One piece of evidence in a case study: an image and the claim it proves.
 *
 * The caption is not a label. "Final dashboard" names a picture; "the status
 * rail sits above the fold because seven of nine people checked it first"
 * makes a claim the picture has to back up. A figure whose caption can't be
 * written as a claim is decoration, and the case study guide says to cut it.
 * So `caption` is required and the component has no title slot to fall back on.
 *
 * Until the image exists the frame holds its place at the same proportion,
 * labelled, like the cover on the work index, so a draft reads at the shape
 * it will have and nobody mistakes the gap for a broken image.
 *
 * Every image here is made for the site. Never a screen or anything exported
 * from an employer's tools.
 *
 * Whether the screens are recreated is said once per study, in the facts
 * panel's note, not on each figure (Alejandro, November 2026). Each recreated
 * figure's alt or aria-label still says so, for anyone who meets it alone.
 *
 * Captions break with text-wrap: pretty, so a last word never sits alone on
 * its line.
 *
 * `children` replaces the image with something live in the same frame, such
 * as a CompareSlider. It fills the frame, so it gets the same ratio, edge and
 * caption as a still. A live figure also gets an actions cell at the right of
 * the caption row (`data-figure-actions`; under the caption on a phone, where
 * the caption needs the width), where the content can put its own
 * controls, like the slider's Reset, outside the image so they never cover
 * what is being compared. The caption stays the figure's last child, as the
 * spec asks; the grid places the two side by side.
 */
export function Figure({
  src,
  alt,
  caption,
  ratio = "16/10",
  sizes = "(min-width: 1024px) 56rem, 100vw",
  className = "",
  children,
  bare = false,
}: {
  /** Optional until the image is made. A static import reserves its box. */
  src?: StaticImageData | string;
  /**
   * Describe what the image shows, not what it proves; the caption does that.
   * Not needed with `children`, which carry their own.
   */
  alt?: string;
  /** The claim the image proves. One or two sentences. */
  caption: string;
  /** Width over height, as CSS aspect-ratio takes it. */
  ratio?: string;
  sizes?: string;
  className?: string;
  /** Live content in place of the image, filling the frame. */
  children?: ReactNode;
  /**
   * No frame: drops the edge and the ground behind live content that brings
   * its own, such as an ImageGallery, whose thumbnails are already framed
   * (Alejandro, November 2026: the ground behind the grid was a frame
   * around frames).
   */
  bare?: boolean;
}) {
  return (
    <figure
      className={`max-w-measure ${children ? "grid grid-flow-row-dense grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-x-6" : ""} ${className}`}
    >
      {/* Above the picture, at its right edge: a label read before the
          picture is, so the caption row holds only the claim and any
          controls (Alejandro, November 2026: the tag and Reset together
          crowded the right of the caption) */}
      <div
        className={`relative w-full ${bare ? "" : "overflow-hidden rounded-sm border border-border-default bg-surface-inset"} ${children ? "col-span-full" : ""}`}
        style={{ aspectRatio: ratio }}
      >
        {children ? (
          children
        ) : src ? (
          <Image src={src} alt={alt ?? ""} fill sizes={sizes} className="object-cover" />
        ) : (
          <span
            role="img"
            aria-label={alt}
            className="absolute inset-0 flex items-center justify-center font-label text-xs uppercase tracking-[0.11em] text-text-tertiary"
          >
            Image
          </span>
        )}
      </div>
      {/* The content's own controls, like the slider's Reset, at the right of
          the caption row (under the caption on a phone) */}
      {children && <div data-figure-actions className="flex items-start max-sm:order-last sm:col-start-2" />}
      <figcaption
        className={`mt-4 max-w-[40rem] text-sm text-pretty text-text-secondary ${children ? "sm:col-start-1" : ""}`}
      >
        {caption}
      </figcaption>
    </figure>
  );
}
