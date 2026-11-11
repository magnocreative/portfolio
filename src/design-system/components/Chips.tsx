/**
 * A list of short keywords as quiet chips: the skills under each group on the
 * résumé, where a run of commas made six phrases read as one long sentence
 * (Alejandro, November 2026). Mirrors the Chip component in Figma.
 *
 * Deliberately not the Tag. A tag is a status in uppercase capitals ("In
 * writing", "AA"); these are nouns in sentence case, and a page of twenty
 * uppercase tags would shout. Deliberately not a button either: they do
 * nothing, so they carry no accent, no hover and no pointer, so nobody
 * mistakes them for filters.
 *
 * A sunken fill and no border, set on a raised surface (a card). The first
 * version had a hairline too and sat on the open page, where the fill was one
 * step from the ground and the chips read as smudges; inside a card, a border
 * was one outline too many (Alejandro, November 2026). On the bare page they
 * would blend again, so keep them in a card.
 *
 * A real list, so a screen reader announces how many there are and reads them
 * one by one instead of as a comma run.
 */
export function Chips({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((item) => (
        <li
          key={item}
          className="rounded-[var(--radius-pill)] bg-surface-sunken px-3 py-1 text-sm leading-[1.4] text-text-secondary"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
