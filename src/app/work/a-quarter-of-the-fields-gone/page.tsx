import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isHiddenDraft } from "@/content/case-studies";
import { CaseStudyLayout } from "@/design-system/components/CaseStudyLayout";
import { DottedGround } from "@/design-system/components/CaseStudyHero";
import { CaseStudyBeat, CaseStudyPart } from "@/design-system/components/CaseStudyPart";
import { FactsPanel } from "@/design-system/components/FactsPanel";
import { Figure } from "@/design-system/components/Figure";
import { OutcomeStats } from "@/design-system/components/OutcomeStats";
import { PointCards } from "@/design-system/components/PointCards";
import { Tag } from "@/design-system/components/Tag";
import { CalendarIcon, CodeIcon, PenNibIcon, RoleIcon, ScopeIcon } from "@/design-system/components/Icon";
import { HeroSubject, HomeMock, RecordComparison, RecordFlow } from "./diagrams";

export const metadata: Metadata = {
  title: "A quarter of the fields gone, and the users who missed the old system told us which ones",
  description:
    "About 150 auditors were moving off a Salesforce application they had used for years, and the rebuild had to stay out of the box. The users who resisted the change told us which fields to cut. I argued for custom record pages, and lost.",
};

/* The third study, and the second from USAA's Governance, Risk and Compliance
   organization. It is the GRC study's opposite on purpose: there Alejandro
   argued against out of the box and won; here out of the box was the rule,
   he designed inside it, and he lost the argument for going further. Read
   together, they show judgment in both directions.

   Named: the employer (USAA) and the platform (Salesforce Classic and
   Lightning), as the GRC study names Salesforce. Not named: the
   application, anyone on the team, or the separate design team whose
   discovery the build went ahead without (left out by Alejandro's choice,
   November 2026: it reads as a complaint and adds nothing the constraint
   does not already say). Every figure is drawn for this site (./diagrams).

   Every fact is Alejandro's account (November 2026): 2021 to 2022, a team of
   four, about 150 auditors and 4 interviewed, 30 fields to 22 across six areas (training, résumé,
   conflicts of interest, skills assessment, third-party performance survey
   and reports), one path for every record type with approval only for
   conflicts of interest (from his user flow),
   the out-of-the-box rule and that even the Lightning Design System counted
   as custom, App Builder, Sketch and InVision, the one-hour proof-of-concept
   touchpoints he hosted twice a week (about 40), the three-column homepage,
   the art-of-the-possible prototype, the optional switch during the MVP, and
   that the users who resisted told the team which fields were unused. */

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
      { id: "argument", label: "The argument I lost" },
      { id: "differently", label: "What I’d do differently" },
    ],
  },
];

export default function AQuarterOfTheFields() {
  // A draft is readable on localhost and answers not found once deployed.
  if (isHiddenDraft("a-quarter-of-the-fields-gone")) notFound();

  return (
    <CaseStudyLayout
      breadcrumb={[{ label: "Work", href: "/work" }, { label: "A quarter of the fields" }]}
      title="A quarter of the fields gone, and the users who missed the old system told us which ones."
      lede="USAA’s auditors kept their professional records in a Salesforce Classic application that was being retired: their training, their background experience, and their conflict of interest disclosures. I designed its move to Lightning, under one rule: nothing custom."
      art={<DottedGround />}
      subject={<HeroSubject />}
      contents={contents}
      facts={
        <FactsPanel
          className="mt-8 max-w-measure xl:mt-0"
          status={<Tag tone="pass">Shipped</Tag>}
          items={[
            { key: "Role", value: "UX designer, on a team of four", icon: RoleIcon },
            { key: "Period", value: "2021 to 2022, USAA", icon: CalendarIcon },
            { key: "Scope", value: "Interviews, homepage, list views, record pages", icon: ScopeIcon },
            { key: "Tools", value: "Sketch, InVision, Lightning App Builder", icon: PenNibIcon },
          ]}
        />
      }
    >
      <CaseStudyPart id="what-changed" eyebrow="Part one" title="What changed" className="mt-28">
        <CaseStudyBeat id="situation" heading="The situation">
          <p>
            Salesforce Classic was retiring, and the audit department, about 150 auditors, had used this
            application for years. Each record was one long page of fields, with sections collapsed and
            reopened by hand. In four interviews, people described the layout as overwhelming, with related
            information sitting far apart.
          </p>
          <p>
            Some of them welcomed the move. Others had mastered Classic and had no wish to lose it. The
            change was coming either way.
          </p>
        </CaseStudyBeat>

        <CaseStudyBeat
          id="result"
          heading="The result"
          after={
            <>
              <OutcomeStats
                items={[
                  { value: "30 → 22", label: "fields across all six areas, from training to reports" },
                  { value: "About 150", label: "auditors, all moved to Lightning before Classic retired" },
                  { value: "About 40", label: "one-hour touchpoints with product and engineering" },
                ]}
              />
              <Figure
                ratio="4/3"
                recreated
                caption="One training record, before and after. The fields nobody used are gone, the rest sit in sections in the order an auditor fills them in, and a path shows where the record stands, from draft to complete, beside the sections still to fill. Drag to compare."
              >
                <RecordComparison />
              </Figure>
            </>
          }
        >
          <p>
            An MVP shipped, and every auditor moved to Lightning. Across the six areas, training, résumé,
            conflicts of interest, skills assessments, performance surveys and reports, the fields went
            from 30 to 22, and what remains is grouped into sections that follow the way an auditor works
            through a record.
          </p>
          <p>
            The rollout let people choose before they had to. During the MVP, auditors could switch between
            Classic and Lightning on their own, until Classic was retired for good. More features were planned
            for later releases, with product still shaping them.
          </p>
          <p>
            The cuts came from an unexpected place. The longtime users who were least happy about Lightning
            knew Classic best, and they told us which fields and data types nobody used anymore. Their
            reluctance is a large part of why the new experience is more concise.
          </p>
        </CaseStudyBeat>

        <CaseStudyBeat
          id="role"
          heading="My role"
          after={
            /* What the touchpoints covered, in Alejandro's words (November
               2026): timeline deliveries, design progression, MVP and
               non-MVP requirements, and technical items. */
            <PointCards
              layout="grid"
              header="inline"
              items={[
                {
                  icon: CalendarIcon,
                  title: "Timeline",
                  body: "Where each delivery stood, and what the next one needed from design.",
                },
                {
                  icon: PenNibIcon,
                  title: "Design progression",
                  body: "What had changed since the last session, shown in the prototype.",
                },
                {
                  icon: ScopeIcon,
                  title: "MVP or later",
                  body: "Each requirement sorted into the first release or a later one.",
                },
                {
                  icon: CodeIcon,
                  title: "Technical questions",
                  body: "What App Builder could and could not do, settled with the engineers.",
                },
              ]}
            />
          }
        >
          <p>
            I was the UX designer on a team of four, with a tech lead and two engineers, working alongside a
            product partner and an agility lead who ran the backlog and stand-ups. I interviewed the users,
            designed the homepage, list views and record pages, and prototyped every screen.
          </p>
          <p>
            Twice a week, for about forty sessions, I hosted a one-hour proof-of-concept touchpoint with
            product and engineering. It was where design met delivery: we checked the timeline, walked
            through how the designs had progressed, sorted requirements into MVP and later, and settled
            technical questions together.
          </p>
        </CaseStudyBeat>
      </CaseStudyPart>

      <CaseStudyPart id="how" eyebrow="Part two" title="How I got there" className="mt-28">
        <CaseStudyBeat id="constraint" heading="The constraint">
          <p>
            Technology leadership set one rule: build it out of the box, to keep technical debt down. In
            practice that meant Lightning App Builder in the development sandbox and nothing else. Even the
            Salesforce Lightning Design System components counted as custom for this team.
          </p>
          <p>
            That rule decided what a design could be before any design existed. App Builder offers a fixed
            set of page layouts and components, and anything outside them was off the table.
          </p>
        </CaseStudyBeat>

        <CaseStudyBeat
          id="decision"
          heading="The decision"
          after={
            <>
              <Figure
                ratio="auto"
                recreated
                caption="The homepage in three columns, one record type each: training, résumé and conflicts of interest. Each column is a stock chart over a stock list, in a layout App Builder offered as it came."
              >
                <HomeMock />
              </Figure>
              <Figure
                ratio="auto"
                caption="One path for every record type, built from the platform’s stock list view and record page. Conflict of interest changes are the one exception: they wait for approval before they count. Simplified from my user flow."
              >
                <RecordFlow />
              </Figure>
            </>
          }
        >
          <p>
            I chose to design with the platform&rsquo;s own parts rather than against them. Every prototype
            was built from components App Builder offered, assembled into flows in InVision, and proven with
            the engineers at those touchpoints before it reached users. When I showed users
            alternate layouts, I told them which parts were out of the box and which would count as custom,
            so their feedback was about choices we were able to make.
          </p>
          <p>
            The homepage is the clearest example. App Builder allows only certain layouts, so I proposed three
            columns, one for each kind of record: training, résumé and conflicts of interest. Every column
            answers one question, and the page asks nothing of
            the platform that it is unable to do.
          </p>
          <p>
            The same thinking carried through the records. Every record type, from training to the
            performance survey, followed the same five steps: status, list, record, edit, save. Designing
            one meant designing all of them, and the only exception was the approval that conflict of
            interest changes required.
          </p>
          <p>
            The cost was range. Some of what users asked for, such as a more interactive way to track
            progress toward goals, sat outside what App Builder could do, and it stayed outside. What it
            bought was a design engineering could ship as drawn, on components Salesforce maintains, keeps
            accessible and updates.
          </p>
        </CaseStudyBeat>

        <CaseStudyBeat id="argument" heading="The argument I lost">
          <p>
            For the record pages and list views, I argued for going beyond out of the box, and built an
            art-of-the-possible prototype to show what a custom approach could do. Technology leadership held
            to out of the box, to avoid technical debt, and the build went ahead that way.
          </p>
          <p>
            So I designed what out of the box could carry. If the components were unable to change, the
            content could: the quarter of the fields we removed, and the regrouping of the rest, came from
            that decision.
          </p>
        </CaseStudyBeat>

        <CaseStudyBeat id="differently" heading="What I’d do differently">
          <p>
            I would push for a more custom approach, and aim the push more narrowly. The step this team
            counted as custom was the Lightning Design System itself, not a bespoke build. I would make the
            case for those components on the one page auditors used most, priced against the technical debt
            leadership was worried about, instead of presenting the art of the possible across the whole
            application.
          </p>
        </CaseStudyBeat>
      </CaseStudyPart>
    </CaseStudyLayout>
  );
}
