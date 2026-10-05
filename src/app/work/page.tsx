import type { Metadata } from "next";
import { Container, Label } from "@/design-system/primitives/Container";
import { Button } from "@/design-system/components/Button";
import { ArrowRight } from "@/design-system/components/Icon";
import { WorkEntry } from "@/design-system/components/WorkEntry";
import { caseStudies } from "@/content/case-studies";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from ten years of internal software, written as decisions: the call that was made, what it cost, and what happened after.",
};

/* The index and the homepage list the same four studies, so the two pages have
   to earn their difference somewhere other than the cards. The homepage shows
   the work as evidence for a claim about the person. This page is where a
   reader who already decided to look at the work arrives, so it says how the
   studies are written and why there are no screens in them, before the reader
   goes looking for screens and wonders where they are.

   The cards are the same component in the same grid. A second card design for
   the same data would be two answers to one question. */
export default function Work() {
  const published = caseStudies.filter((s) => s.status === "published").length;

  return (
    <main>
      <Container>
        <section className="pt-24 pb-4 md:pt-32">
          <Label>Work</Label>

          <h1 className="text-optical mt-10 max-w-[24ch] font-display text-4xl leading-[1.06] tracking-[-0.025em] text-text-primary text-balance lg:text-5xl">
            Each of these is a decision, not a project.
          </h1>

          <div className="mt-14 flex max-w-[46rem] gap-6">
            <div aria-hidden="true" className="w-px shrink-0 bg-interactive" />
            <p className="text-lg leading-[1.65] text-text-secondary">
              Internal software rarely leaves a screen worth showing, and the screens it does leave
              belong to the companies that paid for them. What I can show is the call that was
              made, what it cost, and what happened after. The products stay unnamed. The
              employers and the outcomes do not.
            </p>
          </div>
        </section>
      </Container>

      <Container>
        <section className="pt-32" aria-labelledby="studies-heading">
          <div className="flex items-baseline justify-between border-b border-border-rule pb-4">
            <Label as="h2" className="!text-text-primary">
              <span id="studies-heading">Case studies</span>
            </Label>
            <span className="font-mono text-xs tracking-[0.14em] text-text-tertiary">
              {String(caseStudies.length).padStart(2, "0")}
            </span>
          </div>

          {/* Said once, here, rather than left for the dimmed cards to imply.
              A reader who meets four unlinked cards with no explanation reads
              a broken page; the same four cards under one honest sentence read
              as a schedule. The sentence disappears on its own when the last
              study is published. */}
          {published < caseStudies.length && (
            <p className="mt-6 max-w-measure text-base text-text-secondary">
              {published === 0
                ? "All four are being written now. Each one opens here as it is finished."
                : `${caseStudies.length - published} of these are still being written. Each one opens here as it is finished.`}
            </p>
          )}

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
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
          <div className="border-b border-border-rule pb-4">
            <Label as="h2" className="!text-text-primary">
              <span id="inspect-heading">Open to inspection</span>
            </Label>
          </div>

          <div className="mt-10 max-w-measure">
            <p className="text-base text-text-secondary">
              The design system this site runs on is live and published in full: the tokens, the
              components, the contrast measurements and the reasoning behind each decision. It is
              the one project here you can check rather than take on trust.
            </p>
            <div className="mt-7">
              <Button href="/system" variant="secondary" iconAfter={<ArrowRight />}>
                Read the system
              </Button>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
