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
 * `children` replaces the image with something live in the same frame, such
 * as a CompareSlider. It fills the frame, so it gets the same ratio, edge and
 * caption as a still.
 */
export function Figure({
  src,
  alt,
  caption,
  ratio = "16/10",
  sizes = "(min-width: 1024px) 56rem, 100vw",
  className = "",
  children,
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
}) {
  return (
    <figure className={`max-w-measure ${className}`}>
      <div
        className="relative w-full overflow-hidden rounded-sm border border-border-subtle bg-surface-sunken"
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
      <figcaption className="mt-4 max-w-[40rem] text-sm text-text-secondary">{caption}</figcaption>
    </figure>
  );
}
