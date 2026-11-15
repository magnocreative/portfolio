import type { ReactNode } from "react";

/**
 * The ground a component is shown on when the page is about the component:
 * the components page gives every specimen one (Alejandro, November 2026,
 * promoted from that page's own code once it was used five times and drawn
 * as loose frames in Figma).
 *
 * One surface, so nothing is flattered by a background chosen to suit it.
 * `surface-raised` is also the ground the homepage panel uses, which is where
 * several of these actually appear. A component that is itself a raised card,
 * such as WorkEntry, goes without one: on the stage it would be a card inside
 * a card, a container that appears nowhere on the site.
 *
 * No outer margin: the page spaces it, like any other block.
 */
export function SpecimenStage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-sm border border-border-subtle bg-surface-raised p-6 md:p-10 ${className}`}>{children}</div>
  );
}

/**
 * A labelled cell inside a stage. The caption is the state's real name, in
 * the same label face the rest of the site uses for metadata, so a reader can
 * match what they are looking at to the prop that produces it.
 *
 * Full width on a phone, so the specimen behaves the way the component does
 * in a page: a button there fills its column, and showing it at label width
 * here would document a phone layout the site never uses.
 */
export function SpecimenCell({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-3 sm:w-auto">
      <span className="font-label text-xs uppercase tracking-[0.11em] text-text-tertiary">{caption}</span>
      <div className="flex items-center">{children}</div>
    </div>
  );
}
