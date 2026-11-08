import type { Metadata } from "next";
import { Container } from "@/design-system/primitives/Container";
import { Button } from "@/design-system/components/Button";
import { ArrowRight } from "@/design-system/components/Icon";
import { WorkEntry } from "@/design-system/components/WorkEntry";
import { caseStudies } from "@/content/case-studies";
import { SectionHead } from "@/design-system/components/SectionHead";
import { TextBlock } from "@/design-system/components/TextBlock";
import { PageHeader } from "@/design-system/components/PageHeader";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from ten years of internal software, written as decisions: the call that was made, what it cost, and what happened after.",
};

/* The index and the homepage list the same studies, so the two pages have
   to earn their difference somewhere other than the entries. The homepage shows
   the work as evidence for a claim about the person. This page is where a
   reader who already decided to look at the work arrives, so it says how the
   studies are written and why there are no screens in them, before the reader
   goes looking for screens and wonders where they are.

   The entries are the same component in the same list. A second design for
   the same data would be two answers to one question. */
// Small counts read as words in a sentence ("All five"), as house style does.
const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

export default function Work() {
  const published = caseStudies.filter((s) => s.status === "published").length;

  return (
    <main>
      <Container>
        <PageHeader
          type="subhero"
          eyebrow="Work"
          title="Each of these is a decision, not a project."
          lede="Internal software rarely leaves a screen worth showing, and the screens it does leave belong to the companies that paid for them. What I can show is the call that was made, what it cost, and what happened after. The products stay unnamed. The employers and the outcomes do not."
        />
      </Container>

      <Container>
        <section className="pt-32" aria-labelledby="studies-heading">
          <SectionHead id="studies-heading" count={caseStudies.length}>Case studies</SectionHead>

          {/* Said once, here, rather than left for the draft tags to imply.
              A reader who meets four unlinked entries with no explanation reads
              a broken page; the same four entries under one honest sentence read
              as a schedule. The sentence disappears on its own when the last
              study is published. */}
          {published < caseStudies.length && (
            <TextBlock className="mt-6">
              {published === 0
                ? `All ${WORDS[caseStudies.length] ?? caseStudies.length} are being written now. Each one opens here as it is finished.`
                : `${caseStudies.length - published} of these are still being written. Each one opens here as it is finished.`}
            </TextBlock>
          )}

          <div>
            {caseStudies.map((study, i) => (
              <WorkEntry key={study.slug} study={study} index={i} />
            ))}
          </div>
        </section>
      </Container>

      {/* The one piece of work a reader can inspect in full today. Secondary,
          not primary: the homepage already spends its single primary on this
          link, and here it is a pointer at the end of a list, not the page's
          main ask. */}
      <Container>
        <section className="pt-28" aria-labelledby="inspect-heading">
          <SectionHead id="inspect-heading">Open to inspection</SectionHead>

          <TextBlock
            className="mt-10"
            action={
              <Button href="/system" variant="secondary" iconAfter={<ArrowRight />}>
                Read the system
              </Button>
            }
          >
            The design system this site runs on is live and published in full: the tokens, the
            components, the contrast measurements and the reasoning behind each decision. It is
            the one project here you can check rather than take on trust.
          </TextBlock>
        </section>
      </Container>
    </main>
  );
}
