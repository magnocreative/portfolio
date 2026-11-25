import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isHiddenDraft } from "@/content/case-studies";
import { CaseStudyLayout } from "@/design-system/components/CaseStudyLayout";
import { DottedGround } from "@/design-system/components/CaseStudyHero";
import { CaseStudyBeat, CaseStudyPart } from "@/design-system/components/CaseStudyPart";
import { FactsPanel } from "@/design-system/components/FactsPanel";
import { Figure } from "@/design-system/components/Figure";
import { Tag } from "@/design-system/components/Tag";
import { ORG_LOGOS } from "@/design-system/brand/OrgLogos";
import { CalendarIcon, PenNibIcon, RoleIcon, ScopeIcon } from "@/design-system/components/Icon";
import { DashboardMock, DashboardSketches, HeroSubject, OnboardingSketches, PageChoice, SigninSketches } from "./diagrams";

const STANDFIRST =
  "An innovation lab wanted members to reach three outside companies from one place. I gave each company its own page, and found the step where members stopped trusting the idea: signing in on someone else’s site.";

export const metadata: Metadata = {
  title: "One front door, three companies behind it",
  description: STANDFIRST,
};

/* The fourth study: two concepts from USAA's innovation lab, Small Business
   and College Bound, told as one idea tested twice (Alejandro, November
   2026). Small Business carries the study: its decision (a page per
   provider), its onboarding and its dashboard. College Bound comes in for
   one finding, the sign-in on a partner's site.

   Named: the employer (USAA) and the two concepts. Not named: the six
   partner companies, or anyone on the team. The partners are described by
   what they did, and their names are out of his sketches.

   Every fact is Alejandro's account (November 2026) or his earlier
   portfolio: December 2017, the only designer, with a strategic innovation
   director as product partner and a design thinking partner and a
   researcher from the contracting firm; three of College Bound's ten
   interviews and four for Small Business; presented to the director's
   leadership to decide on investment; folded into other work, and he moved
   to another account that month; the video he made, liked and cut when the
   MVP narrowed to the landing page and dashboard; the page per provider and
   why users preferred it; four dashboard layouts, the second preferred and
   the third too busy; Make Payment added after testers asked how to pay;
   Sketch, InVision, Mural, After Effects and Premiere. */

const contents = [
  {
    id: "what-changed",
    label: "What changed",
    children: [
      { id: "situation", label: "The situation" },
      { id: "result", label: "The result" },
      { id: "role", label: "My role" },
    ],
  },
  {
    id: "how",
    label: "How I got there",
    children: [
      { id: "constraint", label: "The constraint" },
      { id: "decision", label: "The decision" },
      { id: "progression", label: "From sketch to screen" },
      { id: "argument", label: "The argument I lost" },
      { id: "differently", label: "What I’d do differently" },
    ],
  },
];

const UsaaLogo = ORG_LOGOS.usaa;

export default function OneFrontDoor() {
  // A draft is readable on localhost and answers not found once deployed.
  if (isHiddenDraft("one-front-door-three-companies")) notFound();

  return (
    <CaseStudyLayout
      breadcrumb={[{ label: "Work", href: "/work" }, { label: "One front door" }]}
      title="One front door, three companies behind it."
      lede="In 2017, USAA’s innovation lab wanted members to reach trusted outside companies from one place. As the only designer, I took that idea through two concepts: one for people starting a small business, one for students heading to college."
      art={<DottedGround />}
      subject={<HeroSubject />}
      contents={contents}
      facts={
        <FactsPanel
          className="mt-8 max-w-measure xl:mt-0"
          status={<Tag tone="neutral" dot>Concept</Tag>}
          note="Every screen here is recreated with invented content. The sketches are my originals, with company names removed."
          org={
            <>
              <UsaaLogo mono className="-my-1 h-8 w-8 shrink-0" />
              USAA
              <span aria-hidden="true" className="opacity-50">
                ·
              </span>
              Innovation lab concept
            </>
          }
          items={[
            { key: "Role", value: "Only designer, on a team of four", icon: RoleIcon },
            { key: "Period", value: "2017", icon: CalendarIcon },
            { key: "Scope", value: "Interviews, landing pages, onboarding, dashboard", icon: ScopeIcon },
            { key: "Tools", value: "Sketch, InVision, Mural, After Effects, Premiere", icon: PenNibIcon },
          ]}
        />
      }
    >
      <CaseStudyPart id="what-changed" eyebrow="Part one" title="What changed" className="mt-28">
        <CaseStudyBeat id="situation" heading="The situation">
          <p>
            Starting a small business means finding a bank account, money to grow and a way to be found
            online, from companies that do not talk to each other. Heading to college is the same maze:
            scholarships in one place, loans in another.
          </p>
          <p>
            USAA&rsquo;s innovation lab wanted to test one idea twice. Members start at USAA, and USAA
            introduces them to three outside companies that already do each job well.
          </p>
        </CaseStudyBeat>

        <CaseStudyBeat
          id="result"
          heading="The result"
          after={
            <Figure
              ratio="auto"
              bare
              caption="College Bound’s sign-in, in my sketches: USAA’s logon, then the partner’s own page to create an account. The partner’s name is removed."
            >
              <SigninSketches />
            </Figure>
          }
        >
          <p>
            I designed two concepts on that idea, Small Business and College Bound, from first sketches to
            high fidelity: a landing page, a page for each provider, a short questionnaire and a dashboard. In
            December 2017 we presented them to the lab&rsquo;s leadership, to decide whether the direction was
            worth USAA&rsquo;s investment.
          </p>
          <p>
            Neither shipped as designed. The lab folded the work into its wider banking innovation efforts,
            and I moved to another account that same month, so I never saw what became of it.
          </p>
          <p>
            What outlasted the concepts was one finding. Members expected to stay inside USAA. When College
            Bound sent them to a partner&rsquo;s site to sign in, with sensitive information on the line, they
            stopped to ask where they were going.
          </p>
        </CaseStudyBeat>

        <CaseStudyBeat id="role" heading="My role">
          <p>
            I was the only designer, working with a strategic innovation director as product partner, a design
            thinking partner and a researcher. We ran research and discovery together; I ran three of College
            Bound&rsquo;s ten interviews and four for Small Business. The sketches, low fidelity and high
            fidelity were mine.
          </p>
        </CaseStudyBeat>
      </CaseStudyPart>

      <CaseStudyPart id="how" eyebrow="Part two" title="How I got there" className="mt-28">
        <CaseStudyBeat id="constraint" heading="The constraint">
          <p>
            USAA did not own any of the six services. The partners kept their own products, their own accounts
            and their own sign-in. USAA could explain, recommend and pass a member along; it could not change
            what happened on the other side.
          </p>
          <p>
            So the design was an introduction, not a product: explain three very different offers on
            USAA&rsquo;s site, then hand members off at the right moment. And it was a concept for a leadership
            decision, not a build, so every screen had to make the idea clear to people who would never use it.
          </p>
        </CaseStudyBeat>

        <CaseStudyBeat
          id="decision"
          heading="The decision"
          after={
            <Figure
              ratio="auto"
              caption="One page for all three providers, against the one I chose: a main page that leads to a page for each."
            >
              <PageChoice />
            </Figure>
          }
        >
          <p>
            I gave each provider its own page instead of putting all three on one. On one page, a checking
            account, a lending marketplace and a website builder competed for the same scroll. The people we
            tested with understood the offers better with a main page that introduced the idea and a page for
            each provider.
          </p>
          <p>
            It cost a click: nobody saw a provider without choosing one first, and the lab had three pages to
            keep current instead of one. It bought clarity, and a pattern that could take a fourth provider
            without a redesign, which mattered because the lab planned to add more.
          </p>
        </CaseStudyBeat>

        <CaseStudyBeat
          id="progression"
          heading="From sketch to screen"
          after={
            <>
              <Figure
                ratio="auto"
                bare
                caption="Onboarding, in my sketches: choose your providers, a step for each, then a review. Select one to see it larger."
              >
                <OnboardingSketches />
              </Figure>
              <Figure
                ratio="auto"
                bare
                caption="The four dashboard layouts I tested with users, two with navigation across the top and two down the left."
              >
                <DashboardSketches />
              </Figure>
              <Figure
                ratio="auto"
                bare
                caption="The final dashboard, recreated: the left rail users picked, and Make payment under the invoices and bills."
              >
                <DashboardMock />
              </Figure>
            </>
          }
        >
          <p>
            Onboarding came first. Members said which providers they already used, then set goals with each
            one, a step at a time, and reviewed it all at the end.
          </p>
          <p>
            The dashboard got the same treatment. I sketched four layouts and put them in front of users, two
            with navigation across the top and two with it down the left. Users picked the second, for how
            easy the left rail was to reach; the third, with more packed beside the rail, was too busy to take
            in at a glance. Three digital roughs followed, and because people testing them asked how they
            would pay, the final one put a Make Payment action on the invoices.
          </p>
        </CaseStudyBeat>

        <CaseStudyBeat id="argument" heading="The argument I lost">
          <p>
            I argued for a short video at the start, to show members what the service could do before asking
            them to fill in a questionnaire or leave for a partner&rsquo;s site. I made it myself. The lab liked
            it, but the concept was narrowed to a minimum viable product focused on the landing page and the
            dashboard, and the video did not make it.
          </p>
          <p>
            The sign-in finding later showed the gap it was meant to fill: members did not know they would be
            leaving USAA until they had.
          </p>
        </CaseStudyBeat>

        <CaseStudyBeat id="differently" heading="What I’d do differently">
          <p>
            I would test the handoff before the dashboard. Most of my iterations went into the dashboard, but
            whether a member ever reached it depended on the moment they left USAA. I would have put that
            sign-in step in front of users in the first round, and designed what members see before they go:
            where they are going, why, and how to come back.
          </p>
        </CaseStudyBeat>
      </CaseStudyPart>
    </CaseStudyLayout>
  );
}
