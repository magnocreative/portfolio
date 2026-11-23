import Image from "next/image";
import type { ReactNode } from "react";
import { Button } from "@/design-system/components/Button";
import { FeaturePanel } from "@/design-system/components/FeaturePanel";
import { Figure } from "@/design-system/components/Figure";
import { StorybookIcon } from "@/design-system/components/Icon";
import { StatGrid } from "@/design-system/components/StatGrid";
import { systemCounts } from "@/content/system-counts";
import { interactiveRoles, storybookAlt, textRoles } from "@/content/system";
import storybookLight from "@/assets/evidence/storybook-light.png";
import storybookDark from "@/assets/evidence/storybook-dark.png";

/**
 * The way into Storybook, with what is behind it: the capture of the
 * Button's States story and the system counted at build time. Read the
 * source on /system, and the close of the components page, where a sentence
 * and a button used to stand in for it (Alejandro, November 2026). One
 * composition for both, so the two can't disagree about the counts.
 */
/* The capture's sidebar is exactly its left quarter (600 of 2400px) */
const phoneCrop = "max-sm:left-[-33.333%]! max-sm:w-[133.333%]! max-sm:max-w-none";

export function StorybookPanel({
  eyebrow,
  heading,
  contrastHref,
  children,
}: {
  eyebrow: string;
  heading: string;
  /** Where "colors, measured live" points: #contrast on /system, the full
   *  path from anywhere else. */
  contrastHref: string;
  children: ReactNode;
}) {
  return (
    <FeaturePanel
      eyebrow={eyebrow}
      heading={heading}
      asideWidth="medium"
      action={
        // Published on its own domain (November 2026), so a reader can
        // check every state without cloning anything.
        <Button href="https://storybook.magnocreative.com" variant="secondary" iconBefore={<StorybookIcon />} iconSize="lg">
          Open in Storybook
        </Button>
      }
      media={
        // What is behind the button, so the claim has something to
        // point at, in the panel's full-width media row (Alejandro,
        // November 2026): not in the 26rem aside, where Storybook drew
        // at a third of its size, and not under the panel, where it
        // read as a separate thing. Taken from the published Storybook
        // by scripts/storybook-shot.mjs, in both themes, and swapped
        // with the page (scheme-dark, globals.css): a light Storybook
        // on a dark page read as a hole in it.
        <Figure
          ratio="16/10"
          caption="The Button's States story: every variant at rest, hover, selected and disabled, with the controls to change any of it. Captured from storybook.magnocreative.com."
        >
          {/* On a phone, a closer crop: Storybook's sidebar (the left
              quarter of the capture) is left out and the rest drawn 4/3 as
              large, so the button states and the top of the controls read
              instead of shrinking to 7px (Alejandro, November 2026). The
              image is widened by a third and shifted left by the sidebar's
              width; the frame keeps its 16:10 ratio. */}
          <Image src={storybookLight} alt={storybookAlt} fill sizes="(min-width: 1024px) 56rem, 134vw" className={`${phoneCrop} object-cover object-left-top scheme-dark:hidden`} />
          <Image src={storybookDark} alt={storybookAlt} fill sizes="(min-width: 1024px) 56rem, 134vw" className={`${phoneCrop} hidden object-cover object-left-top scheme-dark:block`} />
        </Figure>
      }
      aside={
        // What there is to check and where, counted from the code at
        // build time (src/content/system-counts.ts), so the panel that
        // says every claim is checkable can't drift from the system.
        // Replaced a list of four paths that named places without
        // saying why they mattered (Alejandro, November 2026).
        <StatGrid
          items={[
            { value: String(systemCounts.tokens), label: "tokens, in one file", detail: "src/styles/tokens.css" },
            { value: String(systemCounts.components), label: "components, in code", detail: "src/design-system/" },
            {
              value: String(systemCounts.stories),
              label: "stories, published",
              detail: "storybook.magnocreative.com",
              href: "https://storybook.magnocreative.com",
            },
            {
              value: String(textRoles.length + interactiveRoles.length),
              // Short enough for one line in the cell, like the
              // other three labels; the detail under it says what was
              // measured (Alejandro, November 2026).
              label: "colors, measured live",
              detail: "Contrast, measured",
              href: contrastHref,
            },
          ]}
          note="Counted from the code when the site is built."
        />
      }
    >
      {children}
    </FeaturePanel>
  );
}
