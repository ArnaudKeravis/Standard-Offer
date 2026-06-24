"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Sparkles, User, Route } from "lucide-react";
import {
  InsertionShell,
  WireframeLegend,
  type PreviewKey,
} from "@/components/demos/wireframe-zones";

const VALUE_PILLARS = [
  { title: "Faster service resolution", body: "Requests, bookings, and food orders handled in one mobile flow — fewer tickets, faster closure." },
  { title: "Higher adoption & employee satisfaction", body: "Services employees actually use: pre-order, space booking, perks — measured by NPS and daily active users." },
  { title: "Data-driven operational performance", body: "Occupancy, usage, and satisfaction signals feed back into site operations and client reporting." },
];

const FEATURES = [
  "Access to all services in one place",
  "Food ordering on the move — Click & Collect, Scan & Go, delivery",
  "Mobile-first building access",
  "Real-time occupancy reporting",
  "Amenity booking & concierge services",
];

const BUSINESS_IMPACT = [
  "Increased productivity and focus during the workday",
  "Improved employee experience and talent retention",
  "Higher adoption of on-site services vs. off-site alternatives",
  "Data-driven insights for FM and catering teams",
];

const RESOURCES = [
  "Sales Deck",
  "Product Deck",
  "External One Pager",
  "Client Case Study",
  "Demo Video",
  "Implementation Guide",
  "Pricing Framework",
  "Competitive Battlecard",
  "CoDesign Workshop Kit",
];

const CONNECTED = ["Spark Analytics", "MyWay", "Click & Collect", "Scan & Go", "Concierge", "Wellbeing Hub"];

const EXPERIENCE_KEYWORDS = [
  { label: "Retention & productivity", goal: "g1", color: "var(--spark-xp)" },
  { label: "Adoption & satisfaction", goal: "g1b", color: "var(--spark-amber)" },
  { label: "CSR & sustainability", goal: "g3", color: "var(--spark-iq)" },
  { label: "Seamless digital experience", goal: "g1c", color: "var(--spark-os)" },
];

const JOURNEY_MOMENTS = [
  "Commute",
  "Welcome area",
  "Workplace",
  "Food & Beverage",
  "Well-being & break",
];

export function SharePointWrxWireframe() {
  const t = useTranslations("sparkXpWireframe");
  const [active, setActive] = useState<Record<PreviewKey, boolean>>({
    persona: true,
    experience: true,
    journey: true,
  });

  const toggle = (key: PreviewKey) =>
    setActive((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="bg-[#f4f5f8]">
      <WireframeLegend
        kicker={t("legend.kicker")}
        title={t("legend.title")}
        sub={t("legend.sub")}
        personaAccent="bg-[var(--spark-xp)]"
        journeyAccent="bg-[var(--spark-xp)]"
      />

      <article className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        {/* Hero — Spark XP teal */}
        <section className="grid overflow-hidden rounded-xl bg-[var(--spark-os)] md:grid-cols-2">
          <div className="flex flex-col justify-center px-8 py-12 md:px-12 md:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              Sodexo Spark XP
            </p>
            <h2 className="mt-3 font-[var(--font-display)] text-4xl font-extrabold tracking-[-0.03em] text-white md:text-5xl">
              Sodexo WRX
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/90 md:text-base">
              {t("page.heroLead")}
            </p>
          </div>
          <div className="relative min-h-[220px] bg-[color:color-mix(in_oklab,var(--spark-ink),transparent_80%)] md:min-h-0">
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="aspect-[9/16] w-36 rounded-2xl border-4 border-white/30 bg-white/10 shadow-2xl md:w-44" />
            </div>
          </div>
        </section>

        {/* Why Sodexo WRX? */}
        <section className="mt-10 grid gap-8 rounded-xl border border-[var(--spark-line)] bg-white p-6 md:grid-cols-2 md:p-10">
          <div>
            <h3 className="font-[var(--font-display)] text-xl font-bold text-[var(--spark-os)] md:text-2xl">
              {t("page.whyTitle")}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_30%)]">
              {t("page.whyBody1")}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_30%)]">
              {t("page.whyBody2")}
            </p>
          </div>
          <div className="flex items-center justify-center gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="aspect-[9/16] w-20 rounded-xl border border-[var(--spark-line)] bg-[color:color-mix(in_oklab,var(--spark-os),transparent_90%)] shadow-sm md:w-24"
                style={{ transform: `rotate(${(i - 1) * 6}deg) translateY(${Math.abs(i - 1) * 8}px)` }}
              />
            ))}
          </div>
        </section>

        {/* ZONE 1 — Persona (Consumer) */}
        <section className="mt-10">
          <InsertionShell
            zone="persona"
            preview={active.persona}
            active={active}
            onToggle={toggle}
            rationale={t("zones.persona.rationale")}
            accentBorder="border-[color:color-mix(in_oklab,var(--spark-xp),transparent_50%)] bg-[color:color-mix(in_oklab,var(--spark-xp),transparent_92%)]"
            accentBadge="bg-[var(--spark-xp)] text-[var(--spark-ink)]"
            icon={User}
          >
            <div className="flex flex-col items-center gap-6 rounded-xl border border-[var(--spark-line)] bg-[color:color-mix(in_oklab,var(--spark-xp),transparent_94%)] p-6 md:flex-row md:items-start">
              <div className="relative size-28 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-md md:size-32">
                <Image
                  src="/demos/persona-consumer.png"
                  alt=""
                  fill
                  className="object-cover object-[center_15%] scale-150"
                  sizes="128px"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--spark-xp)]">
                  {t("zones.persona.role")}
                </p>
                <h3 className="mt-1 font-[var(--font-display)] text-2xl font-bold text-[var(--spark-ink)]">
                  David Miller
                </h3>
                <p className="mt-0.5 text-sm font-medium text-[var(--spark-os)]">
                  {t("zones.persona.title")}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_30%)]">
                  {t("zones.persona.description")}
                </p>
                <blockquote className="mt-4 border-l-2 border-[var(--spark-xp)] pl-4 text-sm italic text-[color:color-mix(in_oklab,var(--spark-ink),transparent_25%)]">
                  {t("zones.persona.quote")}
                </blockquote>
              </div>
            </div>
          </InsertionShell>
        </section>

        {/* Value pillars */}
        <section className="mt-10 grid gap-4 md:grid-cols-3">
          {VALUE_PILLARS.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-lg border border-[var(--spark-line)] bg-[color:color-mix(in_oklab,var(--spark-ink),transparent_96%)] p-6"
            >
              <h4 className="font-semibold text-[var(--spark-os)]">{pillar.title}</h4>
              <p className="mt-2 text-xs leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
                {pillar.body}
              </p>
            </article>
          ))}
        </section>

        {/* What WRX makes possible + ZONE 2 — Experience */}
        <section className="mt-12 rounded-xl border border-[var(--spark-line)] bg-white px-6 py-10 md:px-10">
          <h3 className="text-center font-[var(--font-display)] text-2xl font-bold text-[var(--spark-os)] md:text-3xl">
            {t("page.makesPossibleTitle")}
          </h3>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide text-[var(--spark-ink)]">
                {t("page.featuresTitle")}
              </h4>
              <ul className="mt-4 space-y-3">
                {FEATURES.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 text-sm text-[color:color-mix(in_oklab,var(--spark-ink),transparent_25%)]"
                  >
                    <span className="mt-1.5 size-2 shrink-0 rounded-sm bg-[var(--spark-os)]" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide text-[var(--spark-ink)]">
                {t("page.impactTitle")}
              </h4>
              <ul className="mt-4 space-y-3">
                {BUSINESS_IMPACT.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm text-[color:color-mix(in_oklab,var(--spark-ink),transparent_25%)]"
                  >
                    <span className="mt-1.5 size-2 shrink-0 rounded-sm bg-[var(--spark-amber)]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <InsertionShell
              zone="experience"
              preview={active.experience}
              active={active}
              onToggle={toggle}
              rationale={t("zones.experience.rationale")}
              accentBorder="border-[color:color-mix(in_oklab,var(--spark-amber),transparent_45%)] bg-[color:color-mix(in_oklab,var(--spark-amber-soft),transparent_40%)]"
              accentBadge="bg-[var(--spark-amber)] text-[var(--spark-ink)]"
              icon={Sparkles}
            >
              <div className="rounded-xl border border-[var(--spark-line)] bg-[color:color-mix(in_oklab,var(--spark-xp),transparent_94%)] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:color-mix(in_oklab,var(--spark-ink),transparent_45%)]">
                  {t("zones.experience.kicker")}
                </p>
                <h4 className="mt-2 font-[var(--font-display)] text-xl text-[var(--spark-ink)]">
                  {t("zones.experience.headline")}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_32%)]">
                  {t("zones.experience.body")}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {EXPERIENCE_KEYWORDS.map(({ label, color }) => (
                    <span
                      key={label}
                      className="rounded-full border px-3 py-1.5 text-xs font-semibold text-[var(--spark-ink)]"
                      style={{
                        borderColor: `color-mix(in oklab, ${color}, transparent 60%)`,
                        backgroundColor: `color-mix(in oklab, ${color}, transparent 88%)`,
                      }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {(["g1", "g1b", "g3", "g1c"] as const).map((goal) => {
                    const kw = EXPERIENCE_KEYWORDS.find((k) => k.goal === goal)!;
                    return (
                      <div key={goal} className="rounded-lg border border-[var(--spark-line)] bg-white p-4">
                        <div
                          className="mb-2 h-1 w-8 rounded-full"
                          style={{ backgroundColor: kw.color }}
                        />
                        <p className="text-xs font-bold uppercase tracking-wide" style={{ color: kw.color }}>
                          {kw.label}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
                          {t(`zones.experience.goals.${goal}`)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </InsertionShell>
          </div>
        </section>

        {/* ZONE 3 — Journey (Consumer) */}
        <section className="mt-10">
          <InsertionShell
            zone="journey"
            preview={active.journey}
            active={active}
            onToggle={toggle}
            rationale={t("zones.journey.rationale")}
            accentBorder="border-[color:color-mix(in_oklab,var(--spark-xp),transparent_50%)] bg-[color:color-mix(in_oklab,var(--spark-xp),transparent_94%)]"
            accentBadge="bg-[var(--spark-xp)] text-[var(--spark-ink)]"
            icon={Route}
          >
            <div className="overflow-hidden rounded-xl border border-[var(--spark-line)] bg-white">
              <div className="border-b border-[var(--spark-line)] px-6 py-5 text-center md:px-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:color-mix(in_oklab,var(--spark-ink),transparent_45%)]">
                  {t("zones.journey.kicker")}
                </p>
                <h4 className="mt-2 font-[var(--font-display)] text-xl text-[var(--spark-ink)] md:text-2xl">
                  {t("zones.journey.headline")}{" "}
                  <span className="text-[var(--spark-xp)]">Consumer</span>
                </h4>
                <p className="mx-auto mt-2 max-w-2xl text-sm text-[color:color-mix(in_oklab,var(--spark-ink),transparent_32%)]">
                  {t("zones.journey.body")}
                </p>
              </div>
              <div className="relative aspect-[16/9] w-full bg-[color:color-mix(in_oklab,var(--spark-xp),transparent_94%)]">
                <Image
                  src="/demos/journey-consumer.png"
                  alt=""
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 1152px"
                />
              </div>
              <div className="flex flex-wrap justify-center gap-2 border-t border-[var(--spark-line)] px-4 py-4">
                {JOURNEY_MOMENTS.map((moment, i) => (
                  <span
                    key={moment}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[color:color-mix(in_oklab,var(--spark-xp),transparent_88%)] px-3 py-1 text-[11px] font-medium text-[var(--spark-ink)]"
                  >
                    <span className="flex size-4 items-center justify-center rounded-full bg-[var(--spark-xp)] text-[9px] font-bold text-[var(--spark-ink)]">
                      {i + 1}
                    </span>
                    {moment}
                  </span>
                ))}
              </div>
            </div>
          </InsertionShell>
        </section>

        {/* Resources & Sales Tools */}
        <section className="mt-10 rounded-xl bg-[color:color-mix(in_oklab,var(--spark-ink),transparent_96%)] px-6 py-10 md:px-10">
          <h3 className="font-[var(--font-display)] text-xl font-bold text-[var(--spark-ink)]">
            {t("page.resourcesTitle")}
          </h3>
          <p className="mt-2 text-sm text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
            {t("page.resourcesSub")}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RESOURCES.map((title) => (
              <article
                key={title}
                className="rounded-lg border border-[var(--spark-line)] bg-white p-5 shadow-sm"
              >
                <h4 className="text-sm font-semibold text-[var(--spark-iq)]">{title}</h4>
                <p className="mt-2 text-xs text-[color:color-mix(in_oklab,var(--spark-ink),transparent_40%)]">
                  Sales enablement asset for WRX pitches and client workshops.
                </p>
                <button type="button" className="mt-3 text-xs font-semibold text-[var(--spark-os)]">
                  Read more →
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* Connected Products */}
        <section className="mt-10">
          <h3 className="font-[var(--font-display)] text-lg font-bold text-[var(--spark-ink)]">
            {t("page.connectedTitle")}
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {CONNECTED.map((name) => (
              <span
                key={name}
                className="rounded-full bg-[color:color-mix(in_oklab,var(--spark-os),transparent_88%)] px-4 py-2 text-xs font-medium text-[var(--spark-ink)]"
              >
                {name}
              </span>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-10 rounded-xl border border-[var(--spark-line)] bg-white px-6 py-10 md:px-10">
          <h3 className="font-[var(--font-display)] text-xl font-bold text-[var(--spark-os)]">
            {t("page.faqTitle")}
          </h3>
          <dl className="mt-6 space-y-6">
            {[1, 2, 3].map((n) => (
              <div key={n}>
                <dt className="text-sm font-bold text-[var(--spark-os)]">
                  {t(`page.faq.q${n}` as "page.faq.q1")}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_30%)]">
                  {t(`page.faq.a${n}` as "page.faq.a1")}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Bottom CTA */}
        <section className="mt-10 grid gap-6 rounded-xl border border-[var(--spark-line)] bg-[color:color-mix(in_oklab,var(--spark-ink),transparent_96%)] p-6 md:grid-cols-2 md:p-8">
          <div>
            <h4 className="font-[var(--font-display)] text-lg font-bold text-[var(--spark-ink)]">
              {t("page.ctaTitle")}
            </h4>
            <p className="mt-2 text-sm text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
              {t("page.ctaBody")}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {["Spark XP", "Spark IQ", "Spark OS"].map((label) => (
              <div
                key={label}
                className="rounded-xl bg-[var(--spark-os)] p-4 text-white"
              >
                <p className="text-xs font-semibold">{label}</p>
                <button type="button" className="mt-3 rounded-lg bg-white/20 px-2 py-1 text-[10px] font-semibold">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
