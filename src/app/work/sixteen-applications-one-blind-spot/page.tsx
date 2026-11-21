import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isHiddenDraft } from "@/content/case-studies";
import { CaseStudyLayout } from "@/design-system/components/CaseStudyLayout";
import { DottedGround } from "@/design-system/components/CaseStudyHero";
import { CaseStudyBeat, CaseStudyPart } from "@/design-system/components/CaseStudyPart";
import { FactsPanel } from "@/design-system/components/FactsPanel";
import { Figure } from "@/design-system/components/Figure";
import { StatGrid } from "@/design-system/components/StatGrid";
import { Tag } from "@/design-system/components/Tag";
import { CalendarIcon, PenNibIcon, RoleIcon, ScopeIcon } from "@/design-system/components/Icon";
import {
  BuildComparison,
  ConnectHomeMock,
  DashboardRedesign,
  Ecosystem,
  HeroSubject,
  HiFiGallery,
  HubMock,
  MoodBoard,
  SketchSheet,
  WireframeMock,
} from "./diagrams";

export const metadata: Metadata = {
  title: "Sixteen applications, and no way to know when any of them would go down",
  description:
    "Eighty-two people said they didn't need better applications; they needed to see the system. I argued for building the hub in React instead of Salesforce, and won. I argued for fewer applications, and lost.",
};

/* The first study written in the two halves the storytelling guide settled on
   in November 2026: What changed, then How I got there. The result comes
   first, in a half that stands on its own, and the judgment behind it
   follows. The evidence sits in the beat it proves, not in a gallery.

   Named: the employer (USAA) and the organization (Governance, Risk and
   Compliance), as the résumé does, and the hub itself, GRC Connect
   (Alejandro's call, November 2026; his earlier portfolio named it too).
   Not named: any of the sixteen applications, or anyone on the team. Every figure is
   a schematic drawn for this site (./diagrams), never a USAA screen. The one
   exception is his own sketches in From sketch to screen, with the product's
   name taken out (November 2026).

   Every fact is Alejandro's account (November 2026): the 82-person survey and
   its four numbers, about 400 users, the React argument and who backed it,
   the consolidation proposal that went to the backlog, and the feedback form
   handed over in iteration. "Still in use" is as of the last time he heard
   from the team, and is worded that way. */

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

export default function SixteenApplications() {
  // A draft is readable on localhost and answers not found once deployed.
  if (isHiddenDraft("sixteen-applications-one-blind-spot")) notFound();

  return (
    <CaseStudyLayout
      breadcrumb={[{ label: "Work", href: "/work" }, { label: "Sixteen applications" }]}
      title="Sixteen applications, and no way to know when any of them would go down."
      lede="A compliance organization ran its work across sixteen applications on three platforms, and nothing tied them together. I led the design of GRC Connect, the hub that did: one front door showing every application, what it’s for and whether it’s up."
      art={<DottedGround />}
      subject={<HeroSubject />}
      contents={contents}
      facts={
        <FactsPanel
          className="mt-8 max-w-measure xl:mt-0"
          status={<Tag tone="pass">Shipped</Tag>}
          items={[
            { key: "Role", value: "Lead designer, with one design partner", icon: RoleIcon },
            { key: "Period", value: "2022, USAA", icon: CalendarIcon },
            { key: "Scope", value: "Research, the hub, alerts, notifications", icon: ScopeIcon },
            { key: "Tools", value: "Sketch, InVision", icon: PenNibIcon },
          ]}
        />
      }
    >
      <CaseStudyPart id="what-changed" eyebrow="Part one" title="What changed" className="mt-28">
        <CaseStudyBeat
          id="situation"
          heading="The situation"
          after={
            <StatGrid
              className="max-w-measure"
              items={[
                { value: "81%", label: "called the whole system unnecessarily complex" },
                { value: "46%", label: "didn’t know when systems were down" },
                { value: "42%", label: "weren’t sure where to find documentation" },
                { value: "25%", label: "knew how to report an incident" },
              ]}
              note="From a survey of 82 people across Governance, Risk and Compliance, 2022."
            />
          }
        >
          <p>
            USAA&rsquo;s Governance, Risk and Compliance organization, the people who make sure
            the company follows the law and its own policies, ran its daily work across sixteen
            applications: more than half in Salesforce, the rest split between ServiceNow and
            React, midway through a three-year modernization. Nothing tied them together. When one
            went down for maintenance, the people who depended on it found out by trying to open it.
          </p>
          <p>
            We surveyed 82 of them. They weren&rsquo;t asking for better applications. They were
            asking to see the system.
          </p>
        </CaseStudyBeat>

        <CaseStudyBeat
          id="result"
          heading="The result"
          after={
            <Figure
              ratio="auto"
              recreated
              caption="Every application says what it’s for, maintenance, issues and updates are announced across the top before anyone runs into them, and the applications you can open sit apart from the ones you’d have to request, a split users asked for in sketch testing."
            >
              <HubMock />
            </Figure>
          }
        >
          <p>
            GRC Connect gave all sixteen applications one front door: every application, what it&rsquo;s
            for and whether it&rsquo;s up, with alerts and notifications for maintenance and outages.
            It launched to about 400 people, from occasional users to power users, new hires to people
            who&rsquo;d been there for years, and was still in use the last time I heard from the team.
          </p>
          <p>
            New users got the big picture for the first time. One wrote: &ldquo;Love the big picture
            approach. I get to learn and understand the purpose of each CRM available within
            GRC.&rdquo; Long-time users got status in one place instead of sixteen.
          </p>
        </CaseStudyBeat>

        <CaseStudyBeat id="role" heading="My role">
          <p>
            I was the lead designer, from research through the hub, alerts and notifications, with a
            contract designer as my design partner. Twice a week we worked through requirements and
            design reviews with our product owner, who carried them to the owners of each
            application. When I left USAA, the feedback form was in iteration and landing well with
            product; I handed it to my design partner to finish.
          </p>
        </CaseStudyBeat>
      </CaseStudyPart>

      <CaseStudyPart id="how" eyebrow="Part two" title="How I got there" className="mt-28">
        <CaseStudyBeat
          id="constraint"
          heading="The constraint"
          after={
            <Figure ratio="auto" recreated caption="Sixteen applications on three platforms, and no shared front door. Building the hub inside one of them meant reaching the other two from the outside. The split between platforms is approximate.">
              <Ecosystem />
            </Figure>
          }
        >
          <p>
            Technology leadership wanted the hub built out of the box in Salesforce, to keep tech debt
            down: a Salesforce app linking out to the rest. Most of our engineers were Salesforce
            engineers, so it was also the path of least resistance. Product was split.
          </p>
          <p>
            But out of the box couldn&rsquo;t reach the ServiceNow and React applications in any
            useful way, and the hub had to make a heavy load of information easy to take in, which
            Salesforce&rsquo;s defaults weren&rsquo;t built for. Our design team sat in technology, so
            making that case meant arguing inside our own organization.
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
                caption="The mood board I made the case with, broken down from atoms to components: color, type, buttons, status and inputs, then the banner, card, summary, steps and feedback form built from them. Each was pinned for something the research asked for, and most of it became the hub."
              >
                <MoodBoard />
              </Figure>
              <Figure
                ratio="3/2"
                recreated
                caption="The same sixteen applications, two builds, as a person first sees them. Out of the box gave a list of names, owners and dates; the custom build, shown in its refined high fidelity, says what each application is for, what is down or changing, and which ones you can open. Drag to compare."
              >
                <BuildComparison />
              </Figure>
            </>
          }
        >
          <p>
            I argued to build it in React, on USAA&rsquo;s internal brand library, instead of in
            Salesforce. My case was that the experience should come before ease of release: the hub
            would be in front of people for years, so it should be built as the experience we wanted to
            keep, not as a version of the platform users were trying to see past. I made the case with
            a mood board rather than a memo, so people could see the difference.
          </p>
          <p>
            Engineering pushed back. My manager backed the proposal, and product came around to custom
            where it was needed. We settled on a trade: ship the hub, alerts and notifications as an
            MVP, and move everything else, including feedback and admin analytics, to later releases.
          </p>
          <p>
            That cost us scope at launch and put the build on the smaller group of React engineers. It
            bought an interface new users could understand without being taught.
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
                caption="My first sketches, four takes each on the home page, an application’s details and notifications. Testing them settled the card, one per application, and added a line users asked for between the applications they could open and the ones they had to request. Select any sketch to see it larger; the product’s name is taken out."
              >
                <SketchSheet />
              </Figure>
              <Figure
                ratio="auto"
                bare
                recreated
                caption="The grayscale roughs that followed, from the first home with its side navigation to the one users preferred, with a header across the top and the applications a person can open set apart from the ones they would request. The details, notifications and feedback screens came next; feedback moved to a later release."
              >
                <WireframeMock />
              </Figure>
              <Figure
                ratio="auto"
                bare
                recreated
                caption="High fidelity, shown in the refined form I describe under What I’d do differently: one bar with search, status in one line and on the cards it affects, cards as the only containers, one primary action per screen, and a form that waits to show errors until someone tries to move on. The home as shipped is under The result; the feedback log and form were designed for a later release, still in iteration when I left."
              >
                <HiFiGallery />
              </Figure>
            </>
          }
        >
          <p>
            I started on paper. Twelve sketches tried four ways each to lay out the home page, open
            one application&rsquo;s details and read notifications. Users understood the card idea
            right away: one card per application, with what it is for and a way in. They also asked
            for something I had not drawn, a clear line between the applications they could open
            and the ones they would have to request.
          </p>
          <p>
            From there I moved to digital roughs in grayscale, so feedback stayed on structure
            rather than color, and kept testing layouts until users settled on one. High fidelity
            came last, on the internal brand library, with status, maintenance and alerts carried
            through.
          </p>
        </CaseStudyBeat>

        <CaseStudyBeat id="argument" heading="The argument I lost">
          <p>
            We chose interview participants to cover both ends: power users, and newer people still
            learning the GRC space. Some worked inside one or two applications. Others moved across a
            wide range of them every day, and for those people the number of applications was the
            problem.
          </p>
          <p>
            So I proposed the long-term fix: rebuild the applications into a single experience,
            consolidating where they overlapped, so the hub would eventually have less to explain. It
            was turned down for now and put in the backlog. I designed the hub to carry what
            consolidation would have: what each application is for, who it&rsquo;s for and when
            it&rsquo;s available, in one place.
          </p>
        </CaseStudyBeat>

        <CaseStudyBeat
          id="differently"
          heading="What I’d do differently"
          after={
            <>
              <Figure
                ratio="auto"
                recreated
                caption="A redesign, not what shipped: a homepage for GRC Connect that explains the whole experience before anyone opens an application. What it is for, the status right now, the sixteen applications by area and how access works, with the dashboard one click away."
              >
                <ConnectHomeMock />
              </Figure>
              <Figure
                ratio="3/2"
                recreated
                caption="The dashboard in high fidelity, and the next iteration I would take it to: from a catalog to a workspace. It starts from the task, leads with what affects this person (an issue in an application they use, maintenance this week, an access request still waiting), lists their applications as compact rows with status inline, and keeps the ten they could request behind one link. Drag to compare."
              >
                <DashboardRedesign />
              </Figure>
            </>
          }
        >
          <p>
            I&rsquo;d ship the explanation with the hub, not after it. The hub showed people that
            sixteen applications existed and what each was for, but not how to use them. A user guide,
            and a step-by-step view of what each application can do, would have turned the map into
            directions.
          </p>
          <p>
            That was where newer users got stuck first, so I would start GRC Connect on a homepage of
            its own: what it is, the sixteen applications by area, how status works and how to get
            access, with the dashboard one click away.
          </p>
          <p>
            Reviewing the shipped dashboard now, as a lead designer, I would also simplify it. It placed
            cards inside boxed sections inside a boxed page, so I would let the cards be the only
            containers and turn recently viewed into a short list. Three alert bars greeted people on
            every visit, so I would summarize them in one line and mark the affected cards instead. And
            the applications people could not yet open looked disabled while still offering Launch, so
            each would get its own Request access and a real description, since those are the ones
            people are deciding about.
          </p>
        </CaseStudyBeat>
      </CaseStudyPart>
    </CaseStudyLayout>
  );
}
