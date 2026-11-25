import { ImageGallery, type GalleryItem } from "@/design-system/components/ImageGallery";
import { RecreatedScreen } from "@/design-system/components/RecreatedScreen";
import type { ReactNode } from "react";
import onboarding1 from "@/assets/labs/onboarding-1.png";
import onboarding2 from "@/assets/labs/onboarding-2.png";
import onboarding3 from "@/assets/labs/onboarding-3.png";
import onboarding4 from "@/assets/labs/onboarding-4.png";
import onboarding5 from "@/assets/labs/onboarding-5.png";
import dashboard1 from "@/assets/labs/dashboard-1.png";
import dashboard2 from "@/assets/labs/dashboard-2.png";
import dashboard3 from "@/assets/labs/dashboard-3.png";
import dashboard4 from "@/assets/labs/dashboard-4.png";
import signin1 from "@/assets/labs/signin-1.png";
import signin2 from "@/assets/labs/signin-2.png";

/* The evidence for the innovation lab study (Alejandro, November 2026).

   Two kinds of picture. His own sketches, from his earlier portfolio, with
   every mark that named a company taken out: the employer's wordmark in each
   header, and the partners' names where he had written them. And drawings
   made for this site: the hero, the choice between one page and a page per
   provider, and the final dashboard, recreated with an invented business,
   invented people and invented numbers, and no employer or partner logo.

   The sketches stay as he drew them, so they read the same in both themes.
   The hero and the page choice are diagrams and follow the theme. The
   dashboard is a recreated screen, light in both, like the other studies'. */

const label = "font-label text-xs font-medium uppercase tracking-[0.11em] text-text-tertiary";

/* --------------------------------------------------------------------------
   The hero: one front door, three companies behind it. The door is a card
   listing what a member came for; each company sits below it with its own
   lock, because each kept its own sign-in, which is where members stopped.
   Upright, to fit the hero's 16.125rem column. A diagram, so it follows the
   theme. The link is solid: in these studies dashed means not built. */

const OFFERS = ["Business checking", "Funding", "A website"];

function FrontDoor() {
  return (
    <span className="flex w-60 flex-col gap-3 rounded-lg border border-border-subtle bg-surface-raised p-4 shadow-[0_8px_24px_color-mix(in_oklab,var(--shadow-ink)_8%,transparent)]">
      <span className="flex items-center gap-2 text-sm font-semibold text-text-primary">
        <span className="grid h-5 w-5 place-items-center rounded-[4px] bg-interactive" aria-hidden="true">
          <span className="h-2 w-2 rounded-[1px] border-[1.5px] border-interactive-on" />
        </span>
        Small Business
      </span>
      <span className="flex flex-col gap-1.5">
        {OFFERS.map((o) => (
          <span key={o} className="flex items-center justify-between rounded-[4px] bg-surface-sunken px-2.5 py-1.5 text-xs text-text-secondary">
            {o}
            <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3 w-3 text-text-tertiary" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </span>
        ))}
      </span>
    </span>
  );
}

function Lock({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="10" height="7" rx="1.5" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
    </svg>
  );
}

/* Three companies, each a plain tile with its own sign-in */
function Companies() {
  return (
    <span className="grid w-60 grid-cols-3 gap-2.5">
      {OFFERS.map((o, i) => (
        <span key={o} className="flex flex-col items-center gap-2 rounded-md border-2 border-border-strong bg-surface-raised px-2 py-3">
          <span
            aria-hidden="true"
            className={`h-5 w-5 bg-border-strong ${i === 0 ? "rounded-full" : i === 1 ? "rounded-[4px]" : "rotate-45 rounded-[3px] scale-[0.85]"}`}
          />
          <span className="flex items-center gap-1 text-[11px] font-medium text-text-secondary">
            <Lock className="h-3 w-3" />
            Sign in
          </span>
        </span>
      ))}
    </span>
  );
}

function Link() {
  return (
    <span className="flex flex-col items-center" aria-hidden="true">
      <span className="h-12 border-l-2 border-border-strong" />
      <span className="-mt-1 h-2.5 w-2.5 rounded-full bg-border-strong" />
    </span>
  );
}

export function HeroSubject() {
  return (
    <div className="flex flex-col items-center gap-4">
      <span className={label}>One front door</span>
      <FrontDoor />
      <Link />
      <span className={label}>Three companies behind it</span>
      <Companies />
    </div>
  );
}

/* --------------------------------------------------------------------------
   College Bound's sign-in, in his sketches: the employer's logon, then the
   partner's own page to create an account. The wordmark and the partner's
   name are taken out; the empty space under the title is where the
   partner's name was. */

const SIGNIN_ITEMS: GalleryItem[] = [
  {
    src: signin1,
    label: "Sign in",
    alt: "A sketch of a sign-in page: a header, a hatched welcome area with a title and two lines, and a logon box at the right with two fields and a button.",
  },
  {
    src: signin2,
    label: "The partner’s page",
    alt: "A sketch of the next page: the title College Bound, a space where the partner's name was, then Create Account over two fields and a line.",
  },
];

export function SigninSketches() {
  return <ImageGallery items={SIGNIN_ITEMS} label="College Bound's sign-in, in my sketches" ratio="5/4" columns={2} />;
}

/* --------------------------------------------------------------------------
   The decision: one page for all three providers, against a main page and a
   page for each. Small pages drawn in the container's width, so each scales
   as one picture (1px of a 200px design = 0.5cqw). A diagram of the choice,
   not a recreation of either page, so it follows the theme. */

function MiniPage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`@container block w-full ${className}`}>
      <span className="flex w-full flex-col gap-[4cqw] overflow-hidden rounded-[3cqw] border border-border-default bg-surface-raised p-[5cqw]">
        <span className="flex items-center gap-[3cqw]">
          <span className="h-[6cqw] w-[6cqw] rounded-[1.5cqw] bg-interactive" />
          <span className="h-[2.5cqw] w-[24cqw] rounded-full bg-border-default" />
        </span>
        {children}
      </span>
    </span>
  );
}

function Bars({ widths, strong = false }: { widths: string[]; strong?: boolean }) {
  return (
    <span className="flex flex-col gap-[3cqw]">
      {widths.map((w, i) => (
        <span key={i} className={`block h-[2.5cqw] rounded-full ${strong && i === 0 ? "bg-border-strong" : "bg-border-default"}`} style={{ width: w }} />
      ))}
    </span>
  );
}

/* The three providers' marks, as plain shapes in place of their logos */
const SHAPES = ["rounded-full", "rounded-[1.5cqw]", "rotate-45 rounded-[1cqw] scale-[0.8]"];

/* One provider's offer: its mark and a few lines */
function Offer({ shape, dense = false }: { shape: number; dense?: boolean }) {
  const mark = SHAPES[shape];
  return (
    <span className={`flex items-start gap-[4cqw] rounded-[2cqw] border border-border-subtle bg-surface-sunken ${dense ? "p-[3cqw]" : "p-[5cqw]"}`}>
      <span className={`h-[9cqw] w-[9cqw] shrink-0 bg-border-strong ${mark}`} />
      <span className="flex-1">
        <Bars widths={dense ? ["70%", "95%", "88%", "60%"] : ["60%", "92%", "80%"]} strong />
      </span>
    </span>
  );
}

function Chosen() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] border border-[color-mix(in_oklab,var(--text-accent)_35%,transparent)] bg-interactive-subtle px-2 py-px font-label text-[11px] font-medium uppercase tracking-[0.11em] text-text-accent">
      Chosen
    </span>
  );
}

/* The main page's three cards and the provider pages below share one grid,
   inset by the page's own padding, so each link drops straight from its
   card to its page. cqw here are the side's width, the same as the main
   page's own, so the columns line up exactly. */
function Tree() {
  return (
    <span className="@container block w-full">
      <MiniPage>
        <span className="flex flex-col gap-[4cqw]">
          <Bars widths={["62%", "42%"]} strong />
          <span className="grid grid-cols-3 gap-[3cqw]">
            {[0, 1, 2].map((s) => (
              <span key={s} className="flex flex-col items-center gap-[2.5cqw] rounded-[2cqw] border border-border-subtle bg-surface-sunken px-[2cqw] py-[3.5cqw]">
                <span className={`h-[6cqw] w-[6cqw] bg-border-strong ${SHAPES[s]}`} />
                <span className="block h-[2cqw] w-[70%] rounded-full bg-border-default" />
              </span>
            ))}
          </span>
        </span>
      </MiniPage>
      <span className="grid grid-cols-3 gap-[3cqw] px-[5cqw]">
        {[0, 1, 2].map((s) => (
          <span key={s} className="flex flex-col items-center">
            <span aria-hidden="true" className="h-[7cqw] border-l-2 border-border-strong" />
            <span aria-hidden="true" className="-mt-[0.6cqw] mb-[1.5cqw] h-[1.8cqw] w-[1.8cqw] rounded-full bg-border-strong" />
            <MiniPage>
              <Offer shape={s} />
            </MiniPage>
          </span>
        ))}
      </span>
    </span>
  );
}

export function PageChoice() {
  return (
    <div
      role="img"
      aria-label="The choice, as small pages. On one side, one page for all three providers: three dense blocks stacked under one header. On the other, the one I chose: a main page with three short cards, each leading down to a page of its own for that provider."
      className="@container h-full w-full p-5 @lg:p-7"
    >
      <div className="grid grid-cols-[minmax(0,1fr)] gap-y-8 @2xl:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] @2xl:gap-x-10">
        <div className="flex flex-col items-center gap-3 @2xl:items-stretch">
          <span className="text-[13px] font-medium text-text-primary">One page for all three</span>
          <span className="w-full max-w-64 @2xl:max-w-none">
            <MiniPage>
              <span className="flex flex-col gap-[3cqw]">
                <Offer shape={0} dense />
                <Offer shape={1} dense />
                <Offer shape={2} dense />
              </span>
            </MiniPage>
          </span>
        </div>
        <div className="flex flex-col items-center gap-3 @2xl:items-stretch">
          <span className="flex items-center gap-2 text-[13px] font-medium text-text-primary">
            A main page, then a page each
            <Chosen />
          </span>
          <span className="w-full max-w-80 @2xl:max-w-none">
            <Tree />
          </span>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   From sketch to screen: his sketches, as galleries like the other studies'.
   Onboarding for Small Business, then the four dashboard layouts he put in
   front of users. The employer's wordmark is out of every header, and the
   website builder's name out of the fourth onboarding step. */

const ONBOARDING_ITEMS: GalleryItem[] = [
  {
    src: onboarding1,
    label: "Get started",
    alt: "A sketch titled Let's Get Started: three cards side by side, one per provider, each with a short line and a button, and Back and Next below.",
  },
  {
    src: onboarding2,
    label: "Funding",
    alt: "A sketch of the Funding step: a row of steps with the first marked, two short fields, a wide field, and two option cards with radio buttons.",
  },
  {
    src: onboarding3,
    label: "Business checking",
    alt: "A sketch of the Business checking step: two wide fields and two boxes below them.",
  },
  {
    src: onboarding4,
    label: "Website",
    alt: "A sketch titled Let's set up your web: an empty box where the website builder's name was, beside three fields.",
  },
  {
    src: onboarding5,
    label: "Review",
    alt: "A sketch titled Almost there! Let's Review: the answers from each step in fields and option cards, ready to confirm.",
  },
];

export function OnboardingSketches() {
  return <ImageGallery items={ONBOARDING_ITEMS} label="Onboarding, in my sketches" ratio="5/4" columns={3} />;
}

const DASHBOARD_ITEMS: GalleryItem[] = [
  {
    src: dashboard1,
    label: "Layout 1",
    alt: "A dashboard sketch with navigation across the top: invoices, taxes and profits down the left, cash flow and profit and loss in the middle, and four numbers stacked at the right.",
  },
  {
    src: dashboard2,
    label: "Layout 2",
    alt: "A dashboard sketch with a rail down the left: invoices, taxes and profits in one column and cash flow and profit and loss beside them.",
  },
  {
    src: dashboard3,
    label: "Layout 3",
    alt: "A busier dashboard sketch with the left rail: a row of numbers across the top, more numbers under the rail, and invoices, taxes, profits, cash flow and profit and loss filling the rest.",
  },
  {
    src: dashboard4,
    label: "Layout 4",
    alt: "A dashboard sketch with navigation across the top: a row of numbers, cash flow and profit and loss side by side, and invoices, taxes, profits and more numbers along the bottom.",
  },
];

export function DashboardSketches() {
  return <ImageGallery items={DASHBOARD_ITEMS} label="Four dashboard layouts, in my sketches" ratio="5/4" columns={2} />;
}

/* --------------------------------------------------------------------------
   The final dashboard, recreated from his last iteration, region for region:
   the rail, the welcome, four numbers, invoices and bills with Make payment,
   cash flow, accounts, and profit and loss. Invented business, person and
   numbers; an invented mark where the employer's logo was, and plain tiles
   where the partners' were. The rail's dark blue and the amber of the
   current page follow his screen. Light in both themes, like every
   recreated screen. */

const SCREEN_W = 1100;

const RAIL = "oklch(27% 0.055 252)";
const RAIL_ACTIVE = "oklch(33% 0.06 252)";
const AMBER = "oklch(80% 0.14 75)";
const UP = "oklch(52% 0.13 150)";
const DOWN = "oklch(55% 0.19 27)";
const INK = "oklch(30% 0.06 252)";
const LINK = "oklch(48% 0.13 255)";

const NAV_ICONS: Record<string, ReactNode> = {
  Dashboard: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  Sales: <path d="M4 17l5-5 4 4 7-8M15 8h5v5" />,
  Purchases: (
    <>
      <path d="M3 4h2l2.4 11h10.6l2-8H6.2" />
      <circle cx="9" cy="19.5" r="1.5" />
      <circle cx="17" cy="19.5" r="1.5" />
    </>
  ),
  Accounting: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 8h6M9 12h6M9 16h3" />
    </>
  ),
  Banking: <path d="M3 9l9-5 9 5M5 10v8M10 10v8M14 10v8M19 10v8M3 20h18" />,
  Payroll: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
    </>
  ),
  Reports: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 3h6v3H9zM9 11l2 2 4-4M9 17h6" />
    </>
  ),
  "My website": (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
};

function NavIcon({ name }: { name: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      {NAV_ICONS[name]}
    </svg>
  );
}

const NAV: { name: string; badge?: number }[] = [
  { name: "Dashboard", badge: 2 },
  { name: "Sales", badge: 1 },
  { name: "Purchases" },
  { name: "Accounting" },
  { name: "Banking" },
  { name: "Payroll" },
  { name: "Reports", badge: 1 },
  { name: "My website" },
];

function Rail() {
  return (
    <aside className="flex w-[220px] shrink-0 flex-col gap-1 px-3 pt-6 pb-8 text-white" style={{ background: RAIL }}>
      {/* An invented mark where the employer's logo was */}
      <span className="mb-6 ml-3 grid h-10 w-10 place-items-center rounded-[6px] border-2 border-white/80 text-[13px] font-bold tracking-wide">SB</span>
      {NAV.map((n, i) => (
        <span
          key={n.name}
          className="relative flex items-center gap-3.5 rounded-[6px] px-3.5 py-2.5 text-[15px]"
          style={i === 0 ? { background: RAIL_ACTIVE, color: AMBER, fontWeight: 600 } : undefined}
        >
          <span className="relative">
            <NavIcon name={n.name} />
            {n.badge && (
              <span className="absolute -top-1.5 -right-2 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[10px] font-semibold text-white" style={{ background: DOWN }}>
                {n.badge}
              </span>
            )}
          </span>
          {n.name}
        </span>
      ))}
    </aside>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-[8px] border border-[oklch(90%_0.005_252)] bg-white p-5 ${className}`}>{children}</div>;
}

function Info() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke={LINK} strokeWidth={1.4} strokeLinecap="round">
      <circle cx="8" cy="8" r="6.25" />
      <path d="M8 7.25V11M8 5v.01" />
    </svg>
  );
}

function Download() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke={INK} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 3v10M6 9l4 4 4-4M4 16h12" />
    </svg>
  );
}

function CardHead({ title, tabs, active }: { title: string; tabs?: string[]; active?: string }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <span className="text-[19px] font-semibold" style={{ color: INK }}>
        {title}
      </span>
      <Info />
      <span className="ml-auto flex items-center gap-5 text-[14px]" style={{ color: INK }}>
        {tabs?.map((t) => (
          <span key={t} className={t === active ? "border-b-2 pb-0.5 font-semibold" : "pb-[3px] text-[oklch(45%_0.03_252)]"} style={t === active ? { borderColor: INK } : undefined}>
            {t}
          </span>
        ))}
        <Download />
      </span>
    </div>
  );
}

function Stat({ title, value, note, trend }: { title: string; value: string; note: string; trend?: "up" | "down" }) {
  return (
    <Card className="flex flex-col gap-1 py-4">
      <span className="text-[14px] text-[oklch(40%_0.02_252)]">{title}</span>
      <span className="text-[34px] leading-tight font-semibold" style={{ color: INK }}>
        {value}
      </span>
      <span className="flex items-center gap-1 text-[13px] whitespace-nowrap text-[oklch(40%_0.02_252)]">
        {trend && (
          <span style={{ color: trend === "up" ? UP : DOWN }} aria-hidden="true">
            {trend === "up" ? "▲" : "▼"}
          </span>
        )}
        {note}
      </span>
    </Card>
  );
}

const INVOICES = [
  { what: "Invoice #318 · Riverside Florist", when: "Past due · January 3", amount: "$642.10", late: true },
  { what: "Invoice #322 · Oak Street Bakery", when: "Due January 16", amount: "$1,208.40" },
  { what: "Bill · Business insurance", when: "Due January 28", amount: "$96.10" },
];

function Invoices() {
  return (
    <Card>
      <CardHead title="Invoices and bills" />
      <div className="flex flex-col gap-2.5">
        {INVOICES.map((v) => (
          <div
            key={v.what}
            className="flex items-center justify-between gap-4 rounded-[6px] border px-4 py-3"
            style={v.late ? { background: "oklch(96% 0.025 27)", borderColor: "oklch(80% 0.09 27)" } : { borderColor: "oklch(90% 0.005 252)" }}
          >
            <span className="flex flex-col">
              <span className="text-[14px] whitespace-nowrap text-[oklch(25%_0.02_252)]">{v.what}</span>
              <span className="text-[12px]" style={{ color: v.late ? DOWN : LINK }}>
                {v.when}
              </span>
            </span>
            <span className="text-[17px]" style={{ color: v.late ? DOWN : "oklch(25% 0.02 252)" }}>
              {v.amount}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-[6px] border-2 py-2 text-center text-[15px] font-semibold" style={{ borderColor: LINK, color: LINK }}>
        Make payment
      </div>
      <div className="mt-3 text-center text-[13px]" style={{ color: LINK }}>
        See more
      </div>
    </Card>
  );
}

const ACCOUNTS = [
  { name: "Business checking", seen: "Updated 2 hours ago", amount: "$7,412.36", note: "Checking ending 2290", shape: "rounded-full" },
  { name: "Line of credit", seen: "Updated 3 days ago", amount: "$15,000.00", note: "Available to draw", shape: "rounded-[6px]" },
];

function Accounts() {
  return (
    <Card>
      <CardHead title="Accounts" />
      <div className="flex flex-col gap-2.5">
        {ACCOUNTS.map((a) => (
          <div key={a.name} className="flex items-start justify-between rounded-[6px] border border-[oklch(90%_0.005_252)] px-4 py-3">
            <span className="flex items-start gap-3">
              {/* A plain tile where the partner's logo was */}
              <span className={`mt-0.5 h-9 w-9 shrink-0 ${a.shape}`} style={{ background: "oklch(88% 0.02 252)" }} />
              <span className="flex flex-col">
                <span className="text-[15px] text-[oklch(25%_0.02_252)]">{a.name}</span>
                <span className="text-[12px]" style={{ color: LINK }}>
                  {a.seen}
                </span>
                <span className="mt-1 text-[13px] text-[oklch(40%_0.02_252)]">{a.note}</span>
              </span>
            </span>
            <span className="text-[22px]" style={{ color: INK }}>
              {a.amount}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/* A small line chart in thousands, 0 to 5, drawn in an SVG that scales */
function Chart({ series, area }: { series: { values: number[]; color: string; width?: number; fill?: boolean }[]; area?: boolean }) {
  const W = 560;
  const H = 250;
  const L = 44;
  const B = 22;
  const x = (i: number) => L + (i * (W - L - 8)) / 11;
  const y = (v: number) => 8 + (1 - v / 5) * (H - B - 8);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
      {[0, 1, 2, 3, 4, 5].map((v) => (
        <g key={v}>
          <line x1={L} x2={W - 8} y1={y(v)} y2={y(v)} stroke="oklch(92% 0.005 252)" />
          <text x={L - 8} y={y(v) + 4} textAnchor="end" fontSize="10.5" fill="oklch(45% 0.02 252)">
            {v ? `${v},000` : "0"}
          </text>
        </g>
      ))}
      {MONTHS.map((m, i) => (
        <text key={m} x={x(i)} y={H - 4} textAnchor="middle" fontSize="10.5" fill="oklch(45% 0.02 252)">
          {m}
        </text>
      ))}
      {series.map((s, k) => {
        const pts = s.values.map((v, i) => `${x(i)},${y(v)}`).join(" ");
        return (
          <g key={k}>
            {(area || s.fill) && <polygon points={`${x(0)},${y(0)} ${pts} ${x(11)},${y(0)}`} fill={s.color} opacity={0.14} />}
            <polyline points={pts} fill="none" stroke={s.color} strokeWidth={s.width ?? 1.6} strokeLinejoin="round" />
          </g>
        );
      })}
    </svg>
  );
}

function Legend({ items }: { items: { label: string; color: string; line?: boolean }[] }) {
  return (
    <span className="mb-2 inline-flex items-center gap-4 rounded-full border border-[oklch(90%_0.005_252)] px-3 py-1 text-[12px] text-[oklch(35%_0.02_252)]">
      {items.map((it) => (
        <span key={it.label} className="flex items-center gap-1.5">
          {it.line ? (
            <span className="h-[3px] w-4 rounded-full" style={{ background: it.color }} />
          ) : (
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: it.color }} />
          )}
          {it.label}
        </span>
      ))}
    </span>
  );
}

const MONEY_IN = [1.6, 1.2, 2.4, 2.3, 1.3, 1.5, 2.1, 2.0, 3.1, 1.8, 1.5, 2.2];
const MONEY_OUT = [1.0, 1.5, 1.4, 1.7, 1.6, 1.1, 1.8, 1.4, 1.5, 2.0, 1.2, 1.4];
const NET = [0.6, 1.0, 0.8, 1.7, 1.5, 1.0, 1.7, 1.4, 1.6, 1.3, 0.9, 1.2];
const PROFIT = [2.1, 2.0, 2.6, 1.5, 1.3, 1.4, 2.4, 2.3, 1.8, 2.5, 2.7, 2.2];

function CashFlow() {
  return (
    <Card>
      <CardHead title="Cash flow" tabs={["Daily", "Week", "Monthly"]} active="Monthly" />
      <Legend
        items={[
          { label: "Money in", color: UP },
          { label: "Money out", color: DOWN },
          { label: "Net", color: INK, line: true },
        ]}
      />
      <Chart
        series={[
          { values: MONEY_IN, color: UP, fill: true },
          { values: MONEY_OUT, color: DOWN },
          { values: NET, color: INK, width: 2.4 },
        ]}
      />
      <div className="mt-1 text-center text-[13px]" style={{ color: LINK }}>
        See more
      </div>
    </Card>
  );
}

function ProfitLoss() {
  return (
    <Card className="flex-1">
      <CardHead title="Profit and loss" tabs={["Daily", "Week", "Monthly"]} active="Week" />
      <Legend
        items={[
          { label: "Profit", color: UP },
          { label: "Loss", color: DOWN },
        ]}
      />
      <Chart series={[{ values: PROFIT, color: UP, fill: true }]} />
    </Card>
  );
}

function DashboardScreen() {
  return (
    <div className="flex bg-[oklch(97%_0.004_252)] text-[oklch(25%_0.02_252)]">
      <Rail />
      <div className="min-w-0 flex-1">
        <header className="flex items-center gap-3.5 border-b border-[oklch(90%_0.005_252)] bg-white px-6 py-4">
          <span className="grid h-12 w-12 place-items-center rounded-full text-[15px] font-semibold text-white" style={{ background: "oklch(55% 0.08 200)" }}>
            DR
          </span>
          <span className="flex flex-col">
            <span className="text-[20px] font-semibold" style={{ color: INK }}>
              Welcome, Dana!
            </span>
            <span className="text-[14px] text-[oklch(40%_0.02_252)]">Member since 2014</span>
          </span>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="ml-auto h-7 w-7" fill="none" stroke={INK} strokeWidth={1.6} strokeLinecap="round">
            {/* Settings, as two sliders */}
            <path d="M4 8h9.5M18.5 8H20M4 16h1.5M10.5 16H20" />
            <circle cx="16" cy="8" r="2.5" />
            <circle cx="8" cy="16" r="2.5" />
          </svg>
        </header>
        <div className="flex flex-col gap-4 px-5 pt-5 pb-6">
          <span className="text-[24px]" style={{ color: INK }}>
            Small Business
          </span>
          <div className="grid grid-cols-4 gap-3">
            <Stat title="Payroll" value="Jan 14" note="Every two weeks" />
            <Stat title="Money in" value="$14.2K" note="$2.1K from last month" trend="up" />
            <Stat title="Money out" value="$9.6K" note="$0.8K from last month" trend="down" />
            <Stat title="Sales" value="3,412" note="284 from last year" trend="up" />
          </div>
          <div className="grid grid-cols-[1fr_1.3fr] items-stretch gap-4">
            <div className="flex flex-col gap-4">
              <Invoices />
              <Accounts />
            </div>
            <div className="flex h-full flex-col gap-4">
              <CashFlow />
              <ProfitLoss />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const DASHBOARD_ALT =
  "The final dashboard, recreated with an invented business: a dark blue rail with Dashboard, Sales, Purchases, Accounting, Banking, Payroll, Reports and My website; a welcome with the member's name; four numbers for payroll, money in, money out and sales; invoices and bills, one past due, with Make payment under them; the business's accounts; and charts of cash flow and of profit and loss.";

export function DashboardMock() {
  return (
    <div role="img" aria-label={DASHBOARD_ALT} className="h-full w-full">
      <RecreatedScreen address="business.example/dashboard" width={SCREEN_W}>
        <DashboardScreen />
      </RecreatedScreen>
    </div>
  );
}

/* The cover: the dashboard itself, edge to edge, rendered at 800 by 600 at
   twice the density and saved as
   src/assets/covers/one-front-door-three-companies.png. */
export function CoverArt() {
  return (
    <div data-scheme="light" className="relative h-[600px] w-[800px] overflow-hidden bg-white">
      <div className="w-[1100px]" style={{ zoom: 800 / 1100 }}>
        <DashboardScreen />
      </div>
    </div>
  );
}
