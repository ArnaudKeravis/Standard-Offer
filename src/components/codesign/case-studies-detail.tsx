"use client";

import { useState } from "react";
import { HelpCircle, Compass, Flag, Quote } from "lucide-react";

type CaseStudy = {
  client: string;
  context: string;
  hmw: string;
  challenge: string;
  approach: string[];
  outcome: string[];
  result: string;
};

const CASES: CaseStudy[] = [
  {
    client: "AstraZeneca",
    context: "Flagship campus · Cambridge",
    hmw: "How might we design a seamless, high-impact workplace experience that supports innovation, collaboration and scientific excellence?",
    challenge:
      "Elevate the daily campus experience across spaces, services and touchpoints — aligning operational excellence with employee expectations in a world-class research environment.",
    approach: [
      "Immersive site research, persona mapping & collaborative workshops",
      "Employee journeys & campus rhythms",
      "Food & hospitality activation",
      "Community & collaboration spaces",
      "Digital enablement & service integration",
    ],
    outcome: [
      "Future-state experience principles defined",
      "High-impact initiatives prioritized",
      "Quick wins & long-term transformation levers identified",
      "Phased roadmap aligned with operational delivery",
    ],
    result:
      "A cohesive, future-ready campus experience vision — strengthening engagement, supporting performance and enhancing the site's innovation culture.",
  },
  {
    client: "Eli Lilly — The Cell",
    context: "Greenfield giga factory",
    hmw: "How might we design a seamless, human-centered workplace experience framework for Lilly's new giga factory — built to scale with the business?",
    challenge:
      "Design a safer, smoother and future-ready onsite experience aligned with Lilly's operational excellence and growth ambition.",
    approach: [
      "Immersive research: site visits, user interviews, benchmark",
      "Workshops with Lilly teams",
      "Personas & key journeys mapped",
      "Opportunities structured across Spaces, Services, Technologies & Ways of Working",
    ],
    outcome: [
      "Strategic Experience Playbook — vision for the future site",
      "Future employee & visitor journeys",
      "Clear experience standards & prioritized initiatives",
      "Phased roadmap: quick wins, mid-term, long-term",
    ],
    result:
      "A scalable, people-centered workplace ecosystem that enhances operational flow, strengthens engagement and supports long-term growth.",
  },
  {
    client: "Cooper University Hospital",
    context: "Best-in-class patient experience",
    hmw: "How might we rethink foodservice from the ground up for a once-in-a-generation campus expansion?",
    challenge:
      "A $3B campus transformation and 2.5M patient visits a year create the right moment to turn the future café into a Sodexo hospitality showcase.",
    approach: [
      "Discover: on-site immersion & technology / market trends",
      "Define: personas, opportunity map & pain-point analysis",
      "Co-create: workshops with patients, staff and site teams",
      "Test & deliver: idea sheets scored on effort / impact / risk",
    ],
    outcome: [
      "New flagship hospitality experience concept",
      "Digital-first, frictionless ordering journey",
      "Prioritized 70/20/10 innovation roadmap",
      "Experience playbook — replicable across sites",
    ],
    result:
      "A co-designed foodservice experience that meets hospitality-grade expectations while reinforcing long-term client retention.",
  },
  {
    client: "Clariane",
    context: "Care & memory units",
    hmw: "How might we redesign the dining experience across dining rooms, floors and memory-care units to create more joyful, meaningful moments?",
    challenge:
      "Move beyond functional food delivery to create moments of pleasure, autonomy and social connection for residents — while supporting staff efficiency.",
    approach: [
      "Site immersions & stakeholder interviews",
      "Resident personas & daily rhythms",
      "Meal journey & service touchpoints",
      "Menu personalization & staff-process alignment",
    ],
    outcome: [
      "Redesigned experience framework",
      "Weekly co-creation workshops for menu planning",
      "Structured resident participation model",
      "Roadmap to scale across dining rooms & care units",
    ],
    result:
      "A more human-centered dining experience — increasing resident engagement, strengthening autonomy and improving care satisfaction.",
  },
  {
    client: "Les Jardins d'Arcadie",
    context: "Next-gen senior residences",
    hmw: "How can we rethink the life experience of seniors to meet Baby-Boomer expectations and position the brand as a real destination?",
    challenge:
      "Adapt services and community provision to changing expectations — moving from the traditional senior-residence model to a dynamic, lifestyle-oriented one.",
    approach: [
      "Site visits, interviews & personal observation",
      "Future resident pathways (Boomer expectations)",
      "Community life & social engagement",
      "Wellness, services & the food experience",
    ],
    outcome: [
      "7 resident personas defined",
      "24 experience initiatives prioritized",
      "Transformation roadmap structured",
      "New value proposition to differentiate the brand",
    ],
    result:
      "A modern, lifestyle-oriented offer reinforcing attractiveness, differentiation and long-term competitiveness.",
  },
  {
    client: "Saint-Gatien",
    context: "Sustainability roadmap · 2030",
    hmw: "How might we redesign and prioritize the sustainability journey to build a shared 2030 roadmap aligned with the group's vision?",
    challenge:
      "Move from dispersed initiatives to a structured trajectory — integrating environmental, social and operational priorities while ensuring feasibility across sites.",
    approach: [
      "Site inputs, workshops, voting sessions & interviews",
      "Employee wellbeing & safety",
      "Sustainable cleaning & responsible food",
      "Responsible sourcing & water management",
    ],
    outcome: [
      "12 priority initiatives sequenced by impact & feasibility",
      "Pilots & progressive deployment across sites",
      "Operational toolkits (safety, water, cleaning, food)",
      "Shared Saint-Gatien × Sodexo CSR framework",
    ],
    result:
      "A clear, shared and actionable sustainability trajectory — strengthening safety culture and accelerating environmental transitions.",
  },
];

export function CaseStudiesDetail() {
  const [active, setActive] = useState(0);
  const c = CASES[active];

  return (
    <section className="border-y border-[var(--spark-line)] bg-[color:color-mix(in_oklab,var(--spark-iq),transparent_96%)]">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:color-mix(in_oklab,var(--spark-ink),transparent_45%)]">
            Proof · Selected work
          </p>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl tracking-[-0.03em] text-[var(--spark-ink)] md:text-4xl">
            Co-designed with clients, across the globe.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_32%)]">
            Pick a project to see the challenge, our approach and the outcome we delivered together.
          </p>
        </div>

        {/* Client selector */}
        <div aria-label="Case studies" className="mt-10 flex flex-wrap gap-2">
          {CASES.map((cs, i) => (
            <button
              key={cs.client}
              type="button"
              aria-current={i === active ? "true" : undefined}
              onClick={() => setActive(i)}
              className={
                "rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spark-amber)] " +
                (i === active
                  ? "border-[var(--spark-ink)] bg-[var(--spark-ink)] text-white"
                  : "border-[var(--spark-line)] bg-white text-[var(--spark-ink)] hover:border-[var(--spark-iq)]")
              }
            >
              {cs.client}
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <article className="mt-8 overflow-hidden rounded-3xl border border-[var(--spark-line)] bg-white shadow-sm">
          <div className="border-b border-[var(--spark-line)] bg-[var(--spark-ink-deep)] px-6 py-8 md:px-10 md:py-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:color-mix(in_oklab,var(--spark-amber),transparent_15%)]">
              {c.context}
            </p>
            <h3 className="mt-2 font-[var(--font-display)] text-2xl tracking-[-0.02em] text-white md:text-3xl">
              {c.client}
            </h3>
            <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-white/75 md:text-base">
              <HelpCircle className="mt-0.5 size-4 shrink-0 text-[var(--spark-amber)]" aria-hidden />
              <span className="italic">{c.hmw}</span>
            </p>
          </div>

          <div className="grid gap-8 px-6 py-8 md:grid-cols-3 md:px-10 md:py-10">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--spark-xp)]">
                <Flag className="size-4" aria-hidden /> Challenge
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_28%)]">
                {c.challenge}
              </p>
            </div>

            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--spark-iq)]">
                <Compass className="size-4" aria-hidden /> Approach
              </p>
              <ul className="mt-3 space-y-2">
                {c.approach.map((a) => (
                  <li
                    key={a}
                    className="flex gap-2 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_28%)]"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--spark-iq)]" aria-hidden />
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--spark-os)]">
                <Compass className="size-4" aria-hidden /> Outcome
              </p>
              <ul className="mt-3 space-y-2">
                {c.outcome.map((o) => (
                  <li
                    key={o}
                    className="flex gap-2 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_28%)]"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--spark-os)]" aria-hidden />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-[var(--spark-line)] bg-[var(--spark-amber-soft)] px-6 py-6 md:px-10">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--spark-ink)]">Result</p>
            <p className="mt-2 text-sm font-medium leading-relaxed text-[var(--spark-ink)] md:text-base">
              {c.result}
            </p>
          </div>
        </article>

        <figure className="mx-auto mt-14 max-w-3xl text-center">
          <Quote className="mx-auto size-7 text-[var(--spark-amber)]" aria-hidden />
          <blockquote className="mt-4 font-[var(--font-display)] text-xl leading-snug text-[var(--spark-ink)] md:text-2xl">
            &ldquo;Insight comes from being there. The richest understanding of any experience starts with
            observing real people in real contexts.&rdquo;
          </blockquote>
          <figcaption className="mt-4 text-sm font-medium text-[color:color-mix(in_oklab,var(--spark-ink),transparent_40%)]">
            Kevin Roberts, ex-CEO Saatchi &amp; Saatchi
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
