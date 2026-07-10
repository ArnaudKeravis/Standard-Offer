import {
  ArrowRight,
  Compass,
  TrendingUp,
  Sparkles,
  Leaf,
  Search,
  Target,
  Users,
  Rocket,
  Mail,
  Map as MapIcon,
  Route,
  Lightbulb,
  UserRound,
  BarChart3,
} from "lucide-react";
import { OutlinedHeadline } from "@/components/brand/outlined-headline";
import { CaseStudiesDetail } from "@/components/codesign/case-studies-detail";

/* ── Content model (mirrors the CoDesign sales pitch + Cooper proposal) ────── */

const IMPACT_STATS = [
  { value: "25", label: "Large clients supported every year" },
  { value: "3 yrs", label: "Deployed globally across segments" },
  { value: "€1B", label: "Revenue perimeter influenced annually" },
  { value: "+3%", label: "Renewal uplift on supported contracts" },
];

const GROWTH_MODEL = [
  { move: "Co-create before contract", win: "Higher win rate" },
  { move: "Accelerate alignment", win: "Shorter sales cycles" },
  { move: "Innovate beyond signature", win: "Retention & cross-sell" },
  { move: "Make innovation tangible", win: "Premium brand positioning" },
];

const PILLARS = [
  {
    n: "01",
    title: "Envision & Strategize",
    tag: "Reinvent the vision.",
    body: "Plan the next food & FM services, align leadership and set a strategic roadmap that exceeds expectations.",
    icon: Compass,
  },
  {
    n: "02",
    title: "Grow the Account",
    tag: "Shape where the account grows.",
    body: "Co-design across the whole client lifecycle to protect renewals, de-risk rebids and unlock cross-sell.",
    icon: TrendingUp,
  },
  {
    n: "03",
    title: "Design Experiences",
    tag: "Define the on-site experience.",
    body: "Define or upgrade the consumer & employee experience on-site to truly reflect your ambition.",
    icon: Sparkles,
  },
  {
    n: "04",
    title: "Optimize Ops & Carbon",
    tag: "Do more, for less — lower-carbon.",
    body: "Improve existing processes and solutions to be more efficient, impactful and sustainable.",
    icon: Leaf,
  },
];

const METHOD = [
  {
    phase: "Discover",
    mode: "Divergent",
    body: "Understand market context, user experiences and data to create meaningful insights.",
    icon: Search,
    accent: "var(--spark-iq)",
  },
  {
    phase: "Define",
    mode: "Convergent",
    body: "Define the best experience possible, based on unique learnings from your objectives.",
    icon: Target,
    accent: "var(--spark-os)",
  },
  {
    phase: "Co-Create",
    mode: "Divergent",
    body: "Co-create with your teams the best experiences and identify areas of opportunity to innovate.",
    icon: Users,
    accent: "var(--spark-amber)",
  },
  {
    phase: "Test & Deliver",
    mode: "Convergent",
    body: "Bring solutions to life with a test-and-learn approach, scaling for long-term value.",
    icon: Rocket,
    accent: "var(--spark-xp)",
  },
];

const PRINCIPLES = [
  "User-centric",
  "Collective work",
  "Holistic thinking",
  "Concrete & actionable",
  "Qualitative & quantitative",
  "Sustainability",
  "Inclusivity",
];

const PROMISES = [
  {
    title: "End-to-end support, from vision to action",
    body: "We guide you from strategic planning to deployment, turning recommendations into reality at scale.",
  },
  {
    title: "The right data — and sense made of it",
    body: "Qualitative user research meets quantitative, data-led advisory, with extra care on sensitive data.",
  },
  {
    title: "Tailor-made solutions, made for & with you",
    body: "We adapt our tools & co-creation methods to your needs, deadlines, consumers and employees.",
  },
  {
    title: "Positive impact for people, planet & profit",
    body: "Pragmatic solutions on waste, energy sufficiency and wellbeing — for a sustainable, inclusive future.",
  },
];

const ENGAGEMENTS = [
  {
    name: "One-Shot Workshop",
    focus: "Time-to-value",
    duration: "1 week",
    deliverable: "Facilitated workshop + synthesis, proto-persona & proto-journey.",
    invest: "No recharge",
  },
  {
    name: "Light Engagement",
    focus: "Time-to-value",
    duration: "2 weeks",
    deliverable: "Light research, service playbook, experience roadmap & concept sheets.",
    invest: "Availability-based",
  },
  {
    name: "Medium Engagement",
    focus: "Experience quality",
    duration: "4–8 weeks",
    deliverable: "Personas, journeys, concept sheets, opportunity maps & recommendations.",
    invest: "€5–10K account investment",
    featured: true,
  },
  {
    name: "Premium Engagement",
    focus: "Retention & upsell",
    duration: "8–12 weeks",
    deliverable: "Full report, impact map, D&AI experience roadmap & value proposition.",
    invest: "€15–20K account investment",
  },
];

const DELIVERABLES = [
  { label: "Benchmark", icon: BarChart3 },
  { label: "Insights", icon: Lightbulb },
  { label: "Personae", icon: UserRound },
  { label: "Journey", icon: Route },
  { label: "Concepts", icon: Sparkles },
  { label: "Roadmap", icon: MapIcon },
];

const CLIENTS = [
  "AstraZeneca",
  "Eli Lilly",
  "Microsoft",
  "L'Oréal",
  "Sanofi",
  "Johnson & Johnson",
  "GSK",
  "MSD",
  "Danone",
  "Colgate",
  "P&G",
  "Santander",
  "Thales",
  "Diageo",
  "Salesforce",
  "Disney",
  "ASML",
  "Arsenal",
  "Clariane",
  "Ameriprise",
];

const TEAM = [
  {
    name: "Arnaud Keravis",
    role: "Global Head of Design, Experience & Sodexo Labs — Digital, AI & Innovation",
    email: "arnaud.keravis@sodexo.com",
  },
  {
    name: "Noël Kerjean",
    role: "Service Design Lead",
    email: "noel.kerjan@sodexo.com",
  },
  {
    name: "Diane Barbat",
    role: "Service Designer — UX & Service Design",
    email: null,
  },
  {
    name: "Gabriel De Roquefeuil",
    role: "Sodexo Labs Service Designer",
    email: null,
  },
];

/* ── Small presentational helpers ─────────────────────────────────────────── */

function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:color-mix(in_oklab,var(--spark-ink),transparent_45%)]">
      {children}
    </p>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export function CoDesignSharePoint() {
  return (
    <div className="bg-[var(--spark-paper)] text-[var(--spark-ink)]">
      {/* SharePoint section · Hero (Layered web part) */}
      <section className="relative overflow-hidden bg-[var(--spark-ink-deep)]">
        <div
          className="absolute inset-0 bg-[linear-gradient(135deg,rgba(5,11,46,0.96)_0%,rgba(14,26,74,0.85)_45%,rgba(30,58,138,0.55)_100%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-[color:color-mix(in_oklab,var(--spark-amber),transparent_75%)] blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:color-mix(in_oklab,var(--spark-amber),transparent_15%)]">
            Digital, AI &amp; Innovation · CoDesign Services
          </p>
          <div className="mt-6">
            <OutlinedHeadline solid="CoDesign" outline="Innovate by design" tone="dark" />
          </div>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            A way to innovate <span className="font-semibold text-white">by design, with your clients</span>. We
            co-create best-in-class experiences — turning digital, AI, tech and non-tech innovation into
            measurable growth and retention.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--spark-amber)] px-5 py-3 text-sm font-semibold text-[var(--spark-ink)] shadow-sm transition-transform hover:-translate-y-0.5"
            >
              Talk to the team
              <ArrowRight className="size-4" aria-hidden />
            </a>
            <a
              href="#method"
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Explore the method
            </a>
          </div>
        </div>
      </section>

      {/* SharePoint section · Mission (Text web part, soft background) */}
      <section className="border-b border-[var(--spark-line)] bg-white">
        <div className="mx-auto max-w-5xl px-6 py-14 md:px-12 md:py-16">
          <SectionKicker>Our mission</SectionKicker>
          <p className="mt-4 font-[var(--font-display)] text-2xl leading-snug tracking-[-0.02em] text-[var(--spark-ink)] md:text-3xl">
            To harness the power of digital, AI, tech and non-tech innovation
            <span className="text-[color:color-mix(in_oklab,var(--spark-ink),transparent_45%)]">
              {" "}
              — to improve the quality of life of our clients&apos; communities and drive economic, social &amp;
              environmental progress where we operate.
            </span>
          </p>
        </div>
      </section>

      {/* SharePoint section · Value + stats (Text + Quick Links) */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-20">
        <div className="max-w-3xl">
          <SectionKicker>Why CoDesign</SectionKicker>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl tracking-[-0.03em] text-[var(--spark-ink)] md:text-4xl">
            More than a methodology — a growth &amp; retention engine.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_32%)]">
            CoDesign is not experimental. It is embedded in major commercial cycles, converting innovation into
            measurable growth and protecting a €1B portfolio across renewals and new bids.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {IMPACT_STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-[var(--spark-line)] bg-white px-6 py-6 shadow-sm"
            >
              <p className="font-[var(--font-display)] text-4xl font-bold tabular-nums tracking-[-0.03em] text-[var(--spark-amber)]">
                {s.value}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {GROWTH_MODEL.map((g) => (
            <div
              key={g.move}
              className="flex flex-col gap-2 rounded-2xl border border-[var(--spark-line)] bg-[color:color-mix(in_oklab,var(--spark-iq),transparent_95%)] p-5"
            >
              <p className="text-sm font-semibold text-[var(--spark-ink)]">{g.move}</p>
              <p className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--spark-iq)]">
                <ArrowRight className="size-3.5" aria-hidden />
                {g.win}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SharePoint section · 4 pillars (full-width, strong dark background) */}
      <section className="bg-black">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-400/80">
            Our four pillars of work
          </p>
          <h2 className="mt-3 max-w-2xl font-[var(--font-display)] text-3xl tracking-[-0.03em] text-white md:text-4xl">
            Four ways we co-design value with clients.
          </h2>

          <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.n} className="border-t border-white/15 pt-6">
                  <div className="flex items-center justify-between">
                    <span className="font-[var(--font-display)] text-5xl font-bold tracking-[-0.04em] text-blue-500">
                      {p.n}
                    </span>
                    <Icon className="size-6 text-blue-400/70" aria-hidden />
                  </div>
                  <h3 className="mt-5 font-[var(--font-display)] text-xl leading-snug text-blue-300">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-blue-400">{p.tag}</p>
                  <p className="mt-4 text-sm leading-relaxed text-white/55">{p.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SharePoint section · Method (Text web part) */}
      <section id="method" className="scroll-mt-20 border-b border-[var(--spark-line)] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-20">
          <div className="max-w-3xl">
            <SectionKicker>Our approach</SectionKicker>
            <h2 className="mt-3 font-[var(--font-display)] text-3xl tracking-[-0.03em] text-[var(--spark-ink)] md:text-4xl">
              An end-to-end method to co-design &amp; innovate at scale.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_32%)]">
              A double-diamond flow — diverging to explore, converging to decide — blending what users do
              (rational) with what users think (emotional).
            </p>
          </div>

          <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {METHOD.map((m, i) => {
              const Icon = m.icon;
              return (
                <li
                  key={m.phase}
                  className="relative flex flex-col rounded-2xl border border-[var(--spark-line)] bg-[var(--spark-paper)] p-6"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="flex size-10 items-center justify-center rounded-xl text-white"
                      style={{ backgroundColor: m.accent }}
                    >
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:color-mix(in_oklab,var(--spark-ink),transparent_50%)]">
                      {m.mode}
                    </span>
                  </div>
                  <h3 className="mt-4 font-[var(--font-display)] text-lg text-[var(--spark-ink)]">
                    <span className="mr-2 text-[color:color-mix(in_oklab,var(--spark-ink),transparent_60%)]">
                      0{i + 1}
                    </span>
                    {m.phase}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
                    {m.body}
                  </p>
                </li>
              );
            })}
          </ol>

          <div className="mt-8 flex flex-wrap gap-2">
            {PRINCIPLES.map((p) => (
              <span
                key={p}
                className="rounded-full border border-[var(--spark-line)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--spark-ink)]"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SharePoint section · Promise (2-column Text web parts) */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-20">
        <div className="max-w-3xl">
          <SectionKicker>Our promise</SectionKicker>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl tracking-[-0.03em] text-[var(--spark-ink)] md:text-4xl">
            What we commit to, on every engagement.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {PROMISES.map((p, i) => (
            <div
              key={p.title}
              className="flex gap-4 rounded-2xl border border-[var(--spark-line)] bg-white p-6 shadow-sm"
            >
              <span className="font-[var(--font-display)] text-2xl font-bold tabular-nums text-[var(--spark-amber)]">
                0{i + 1}
              </span>
              <div>
                <h3 className="font-[var(--font-display)] text-lg text-[var(--spark-ink)]">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SharePoint section · Engagement models (Quick Links / cards, neutral bg) */}
      <section className="border-y border-[var(--spark-line)] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-20">
          <div className="max-w-3xl">
            <SectionKicker>Engagement models</SectionKicker>
            <h2 className="mt-3 font-[var(--font-display)] text-3xl tracking-[-0.03em] text-[var(--spark-ink)] md:text-4xl">
              From a single workshop to a premium program.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_32%)]">
              Timeboxed project consulting, from 2 weeks to 8 months — scaled to the value at stake.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {ENGAGEMENTS.map((e) => (
              <div
                key={e.name}
                className={
                  "flex flex-col rounded-2xl border p-6 " +
                  (e.featured
                    ? "border-[var(--spark-amber)] bg-[var(--spark-amber-soft)] shadow-md"
                    : "border-[var(--spark-line)] bg-[var(--spark-paper)]")
                }
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:color-mix(in_oklab,var(--spark-ink),transparent_50%)]">
                  {e.focus}
                </p>
                <h3 className="mt-2 font-[var(--font-display)] text-lg text-[var(--spark-ink)]">{e.name}</h3>
                <p className="mt-1 text-sm font-semibold text-[var(--spark-iq)]">{e.duration}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
                  {e.deliverable}
                </p>
                <p className="mt-5 border-t border-[var(--spark-line)] pt-4 text-sm font-semibold text-[var(--spark-ink)]">
                  {e.invest}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SharePoint section · Deliverables (Quick Links, grid style) */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-20">
        <div className="max-w-3xl">
          <SectionKicker>Our deliverables</SectionKicker>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl tracking-[-0.03em] text-[var(--spark-ink)] md:text-4xl">
            Tangible outputs you can act on.
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {DELIVERABLES.map((d) => {
            const Icon = d.icon;
            return (
              <div
                key={d.label}
                className="flex flex-col items-center gap-3 rounded-2xl border border-[var(--spark-line)] bg-white p-6 text-center shadow-sm"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--spark-iq),transparent_90%)] text-[var(--spark-iq)]">
                  <Icon className="size-6" aria-hidden />
                </span>
                <p className="text-sm font-semibold text-[var(--spark-ink)]">{d.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SharePoint section · Proof — interactive case studies (Highlighted content) */}
      <CaseStudiesDetail />

      {/* SharePoint section · Logo wall (Quick Links / image grid) */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-20">
          <div className="max-w-3xl">
            <SectionKicker>We collaborated with them</SectionKicker>
            <h2 className="mt-3 font-[var(--font-display)] text-3xl tracking-[-0.03em] text-[var(--spark-ink)] md:text-4xl">
              Trusted across sectors, worldwide.
            </h2>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--spark-line)] bg-[var(--spark-line)] sm:grid-cols-3 lg:grid-cols-5">
            {CLIENTS.map((name) => (
              <li
                key={name}
                className="flex items-center justify-center bg-white px-4 py-7 text-center text-sm font-bold uppercase tracking-[0.08em] text-[color:color-mix(in_oklab,var(--spark-ink),transparent_45%)] transition-colors hover:bg-[var(--spark-paper)] hover:text-[var(--spark-ink)]"
              >
                {name}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-[color:color-mix(in_oklab,var(--spark-ink),transparent_55%)]">
            Selection of clients engaged through CoDesign, Data-led CoDesign and Innovation practices.
          </p>
        </div>
      </section>

      {/* SharePoint section · Team + Contact (People + Call to action) */}
      <section id="contact" className="scroll-mt-20 bg-[var(--spark-ink-deep)]">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:color-mix(in_oklab,var(--spark-amber),transparent_15%)]">
            Let&apos;s co-design your future
          </p>
          <h2 className="mt-3 max-w-2xl font-[var(--font-display)] text-3xl tracking-[-0.03em] text-white md:text-4xl">
            A panel of experts, mobilized around your objectives.
          </h2>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m) => (
              <div key={m.name} className="rounded-2xl border border-white/12 bg-white/5 p-6">
                <p className="font-[var(--font-display)] text-lg text-white">{m.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{m.role}</p>
                {m.email && (
                  <a
                    href={`mailto:${m.email}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--spark-amber)] hover:underline"
                  >
                    <Mail className="size-3.5" aria-hidden />
                    {m.email}
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <a
              href="mailto:arnaud.keravis@sodexo.com"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--spark-amber)] px-6 py-3 text-sm font-semibold text-[var(--spark-ink)] shadow-sm transition-transform hover:-translate-y-0.5"
            >
              Start a CoDesign conversation
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
