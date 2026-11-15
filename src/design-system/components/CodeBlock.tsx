import type { ReactNode } from "react";

/**
 * A few lines of code, in the site's own colors, so they follow the theme
 * like everything else rather than sitting on the page as a picture of a
 * light editor (Alejandro, November 2026). First use: the token lines in the
 * design system case study, quoted from tokens.css at build time.
 *
 * Highlighting is deliberately small: comments in tertiary, custom property
 * names in the accent, everything else primary. Enough to show which names
 * are the system's, not an editor theme. Set in the site's one family, like
 * every other figure. Lines wrap rather than scroll: a code sample a reader
 * has to scroll sideways to finish is one they don't finish.
 */
function highlight(line: string): ReactNode[] {
  if (/^\s*\/\*.*\*\/\s*$/.test(line)) return [<span key="c" className="text-text-tertiary">{line}</span>];
  return line.split(/(--[a-z0-9-]+)/g).map((part, i) =>
    part.startsWith("--") ? (
      <span key={i} className="text-text-accent">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function CodeBlock({ lines, className = "" }: { lines: string[]; className?: string }) {
  return (
    <pre
      className={`rounded-sm border border-border-subtle bg-surface-raised px-5 py-4 font-sans text-sm leading-[1.8] whitespace-pre-wrap break-words text-text-primary sm:px-6 sm:py-5 ${className}`}
    >
      <code>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {highlight(line)}
          </span>
        ))}
      </code>
    </pre>
  );
}
