/**
 * Short facts as label and value pairs, label left in the tertiary color and
 * value right in the primary, on hairlines between the rows. Mirrors the Key
 * value row component in Figma.
 *
 * It was written out three times (the home page's system panel, the mark on
 * About, the "read the source" panel on the design system page) and the
 * copies had drifted the usual way: 12px of row padding in two of them and 8
 * in the third, a rule under every row in one and only between rows in the
 * others, and only one of them allowed a long value to wrap. So at 390 the
 * home page would have pushed "paper / slate" off the edge if it had ever
 * been longer, and the design system page did not.
 *
 * One answer now: 12px above and below each row, a rule between rows and not
 * after the last (the panel it sits in is the edge), and a value that drops
 * under its label rather than overflowing when the row runs out of room.
 *
 * A real <dl>: the pairs are terms and their definitions, and a screen reader
 * announces them that way.
 */
export function KeyValueList({
  items,
  className = "",
}: {
  items: { key: string; value: string }[];
  className?: string;
}) {
  return (
    <dl className={`font-label text-xs ${className}`}>
      {items.map((item, i) => (
        <div
          key={item.key}
          className={`flex flex-wrap justify-between gap-x-4 gap-y-1 py-3 ${
            i < items.length - 1 ? "border-b border-border-subtle" : ""
          }`}
        >
          <dt className="text-text-tertiary">{item.key}</dt>
          <dd className="text-text-primary">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
