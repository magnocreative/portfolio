import type { ReactNode } from "react";
import { Container } from "@/design-system/primitives/Container";
import { CaseStudyHero } from "./CaseStudyHero";
import { RevealAfter } from "./RevealAfter";
import { SectionNav, type Section } from "./SectionNav";
import type { Crumb } from "./Breadcrumbs";

/**
 * The frame every case study shares: the hero, then the content column with
 * the facts panel at its head, and the sticky contents list beside it.
 *
 * Written out by hand on the first study, and the second would have copied
 * it: the grid, the 13rem rail, the nav that waits for the hero. One frame
 * means a change to how case studies read happens once.
 *
 * The contents list takes the page's two halves as its two groups (the
 * section nav's one level of nesting), so the list itself shows What changed
 * and How I got there and the beats inside each. Desktop only, as on About:
 * on a phone it would push the title down the first screen.
 */
export function CaseStudyLayout({
  breadcrumb,
  title,
  lede,
  art,
  subject,
  facts,
  contents,
  children,
}: {
  breadcrumb: Crumb[];
  title: ReactNode;
  lede: ReactNode;
  /** The hero's ground. See CaseStudyHero. */
  art?: ReactNode;
  /** The hero's subject. See CaseStudyHero. */
  subject?: ReactNode;
  /** The FactsPanel, at the head of the column. */
  facts: ReactNode;
  /** The contents list: each half, with its beats as children. */
  contents: Section[];
  /** The two CaseStudyPart halves. */
  children: ReactNode;
}) {
  return (
    <main>
      <CaseStudyHero breadcrumb={breadcrumb} title={title} lede={lede} art={art} subject={subject} />

      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_13rem] lg:gap-16">
          <div className="min-w-0">
            {facts}
            {children}
          </div>

          {/* Faded out, and out of the tab order, while the hero has the
              screen; in once the reader is into the content. */}
          <RevealAfter target="hero" className="hidden lg:block">
            <SectionNav items={contents} orientation="vertical" sticky label="On this page" />
          </RevealAfter>
        </div>
      </Container>
    </main>
  );
}
