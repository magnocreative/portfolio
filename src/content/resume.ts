/**
 * The résumé, in one place. The /resume page and the PDF both read from here,
 * so the download cannot say something the page does not (Alejandro, November
 * 2026). Change the résumé here, then regenerate the PDF: `npm run resume:pdf`
 * with the dev server running.
 */

export type OrgLogo = "jpmc" | "usaa" | "hcl" | "uiw" | "swbc" | "m7";

export type Employer = {
  employer: string;
  id: string;
  logo: OrgLogo;
  location: string;
  roles: { title: string; period: string; bullets: string[] }[];
};

export const name = "Alejandro Magno Fernandini";
export const subtitle = "Experience Designer. Design systems and complex operational tools.";
export const location = "Dallas–Fort Worth, Texas";
export const relocation = "Open to relocation";
export const email = "alejandini@gmail.com";
export const linkedin = "https://www.linkedin.com/in/alejandro-m-fernandini";
export const site = "https://magnocreative.com";

export const lede = [
  "Ten years in design, with an engineering background to match. I design the internal tools people use all day to do difficult work, own the design system our CRM teams build on, and prototype in code to prove a design works before engineering commits to it.",
  "I work in the double diamond: understand the problem, then design the solution. Agentic tools make delivery faster, and with that comes the temptation to skip discovery. I don’t. Understanding the problem first is what lets engineering move fast and get it right, because fast work only pays off if it still holds up long after it ships.",
];


/** The PDF's file name, also the path it is served from in /public. */
export const pdfFile = "Alejandro-Magno-Fernandini-Resume.pdf";

/* Dates and titles here must match the Google Doc exactly. They were corrected
   once already: the USAA range originally absorbed the HCL contract, which
   overstated the employment by twenty months and would not have survived an
   employment verification. The title is the title of record, not the
   functional one, for the same reason.

   Periods read "to" rather than an en dash, matching the case study index. */
export const experience: Employer[] = [
  {
    employer: "JPMorganChase",
    id: "jpmorganchase",
    logo: "jpmc",
    location: "Plano, Texas",
    roles: [
      {
        title: "Experience Designer",
        period: "June 2024 to present",
        bullets: [
          "Led design and documentation for the platform’s self-service portal, a reference product other lines of business use to adopt shared CRM patterns. Rated exceeding expectations; partners credited the work with high project impact.",
          "Own and maintain the Salesforce Lightning Design System used by every CRM team in the group: component architecture, auto layout and slot patterns, and the usage documentation designers work from.",
          "Drove the analysis behind the team’s decision to leave Salesforce and build an in-house design system, after the vendor’s platform shift left the existing system unable to meet cross-line-of-business needs.",
          "Replaced static prototypes with coded ones, removing a translation step between design and engineering. Built the workflow, the components and the specification format, established the team’s first version-controlled workspace, and taught both to the team.",
        ],
      },
      {
        title: "Software Engineer",
        period: "November 2022 to June 2024",
        bullets: [
          "Maintained and updated the SQL jobs behind the bank’s submission for the Federal Reserve’s Comprehensive Capital Analysis and Review, the annual stress test that sets how much capital a large bank must hold. Daily run cycle handed to a team in India overnight, working to a fixed month-end delivery date.",
          "Automating parts of the pipeline made it faster and more fragile. Rebuilt the jobs so they stopped breaking, shipping each fix through a verification deployment before production. Stability was the goal, and month-end data went out on schedule.",
        ],
      },
    ],
  },
  {
    employer: "USAA",
    id: "usaa",
    logo: "usaa",
    location: "San Antonio and Plano, Texas",
    roles: [
      {
        title: "Designer",
        period: "October 2018 to November 2022",
        bullets: [
          "Designed across governance, risk and compliance, audit, and enterprise reporting: internal platforms where the users are specialists and the cost of a bad interface is measured in rework and missed controls.",
          "Surveyed 82 people across a compliance organization running on sixteen interconnected applications, and found the problem was not the applications. Nobody could tell when any of them was down or in maintenance.",
          "Designed the consolidated status view that replaced checking sixteen systems by hand. Shipped to several hundred staff and still in use, with a feedback channel inside it so what got built next came from the people using it.",
          "Recommended a common design language across all sixteen applications. When platform leadership chose to keep each system’s defaults, redesigned the approach to deliver value without requiring sixteen teams to migrate.",
        ],
      },
    ],
  },
  {
    employer: "HCL Technologies",
    id: "hcl",
    logo: "hcl",
    location: "On-site at USAA, San Antonio, Texas",
    roles: [
      {
        title: "Visual Designer",
        period: "February 2017 to October 2018",
        bullets: [
          "Designed web pages for USAA’s public site within the bank team, and prototyped concepts for USAA Labs that directors used to socialize new ideas internally. Converted to a full-time USAA role at the end of the engagement.",
        ],
      },
    ],
  },
];

/* Each skill is a short noun phrase, so the page can set them as chips and
   the PDF can join them with commas (Alejandro, November 2026). Keep them
   to a few words: a chip that wraps onto two lines is a sentence in a box. */
export const skills: { group: string; items: string[] }[] = [
  {
    group: "Design systems",
    items: ["Component architecture", "Design tokens", "Auto layout", "Slot patterns", "Usage documentation", "Adoption and governance"],
  },
  {
    group: "Product design",
    items: ["Discovery", "User research", "Interviews", "Information architecture", "Interaction design", "Prototyping", "Accessibility (WCAG)"],
  },
  {
    group: "Design engineering",
    items: ["Coded prototypes", "Version control", "Branching workflows", "AI-assisted prototyping", "Design-to-engineering handoff"],
  },
  {
    group: "Tools",
    items: ["Figma", "FigJam", "VS Code", "Storybook", "Salesforce Lightning Design System", "Jira", "Adobe Creative Suite"],
  },
];

/* Education and early career: one section for everything before 2017, newest
   first. Alone, the earlier roles were a one-line coda under Experience and
   the degree a one-row section, and both looked left over; together they are
   where the career starts, the degree, then the design work that led to HCL
   (Alejandro, November 2026). One row per employer, each with its logo, so
   the dates are each role's own. M7 Aerospace was a subsidiary of Elbit
   Systems of America from December 2010, so the row names both, as M7's own
   logo does. Its title is the title of record, which a background check
   verifies; the work it was, technical illustration, rides beside it rather
   than replacing it, and three years from June 2013 says the rest (Alejandro,
   November 2026). A row with no logo gets the briefcase tile. */
export const background: { title: string; detail: string; period: string; logo?: OrgLogo }[] = [
  {
    title: "Graphic Designer",
    detail: "SWBC",
    period: "May 2016 to February 2017",
    logo: "swbc",
  },
  {
    title: "Graphic Designer Intern, technical illustration",
    detail: "M7 Aerospace, an Elbit Systems of America company",
    period: "June 2013 to May 2016",
    logo: "m7",
  },
  {
    title: "Bachelor of Fine Arts, Computer Graphic Arts",
    detail: "University of the Incarnate Word",
    period: "Class of 2015",
    logo: "uiw",
  },
];

export const backgroundLabel = "Education and early career";
