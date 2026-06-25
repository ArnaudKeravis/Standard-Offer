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

const CATEGORY_GRID = [
  { title: "Supply", body: "Procurement, inventory, and supplier coordination across sites." },
  { title: "Digital Operations", body: "Workflow automation, compliance, and real-time site performance." },
  { title: "Menu Management", body: "Planning, costing, and nutritional data at scale." },
  { title: "Site & Asset Management", body: "Equipment lifecycle, maintenance, and space utilisation." },
  { title: "Health & Management", body: "Safety protocols, audits, and regulatory reporting." },
  { title: "People & Automation", body: "Staffing, scheduling, and AI-assisted decision support." },
  { title: "Sales & Marketing", body: "Client engagement, upsell, and brand experience." },
  { title: "Food & Beverage", body: "Production quality, guest satisfaction, and service rhythm." },
  { title: "Pricing", body: "Margin control, dynamic offers, and contract alignment." },
  { title: "Sustainability & Impact", body: "Carbon, waste, and social value made visible." },
  { title: "Dynamic Operations", body: "Adaptive service models for changing demand." },
];

const EXPERIENCE_KEYWORDS = [
  { label: "Retention & productivity", goal: "g1", color: "var(--spark-xp)" },
  { label: "Service efficiency & ROI", goal: "g2", color: "var(--spark-os)" },
  { label: "CSR & sustainability", goal: "g3", color: "var(--spark-iq)" },
  { label: "Asset life & TCO", goal: "g4", color: "var(--spark-amber)" },
];

const JOURNEY_MOMENTS = [
  "Commute",
  "Kick-off & early check",
  "Order, planning & maintenance",
  "Kitchen / back kitchen FM round",
  "Office time",
  "Food & Beverage area",
];

export function SharePointOsWireframe() {
  const t = useTranslations("sparkOsWireframe");
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
      />

      {/* SharePoint-style page recreation */}
      <article className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-xl bg-[var(--spark-ink-deep)]">
          <div
            className="absolute inset-0 bg-[linear-gradient(135deg,rgba(14,26,74,0.85)_0%,rgba(20,184,166,0.35)_100%)]"
            aria-hidden
          />
          <div className="relative px-8 py-16 md:px-14 md:py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              Sodexo Spark OS
            </p>
            <h2 className="mt-3 max-w-xl font-[var(--font-display)] text-3xl font-extrabold leading-tight tracking-[-0.03em] text-white md:text-5xl">
              Operations Efficiency &amp; AI automation
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/80 md:text-base">
              {t("page.heroLead")}
            </p>
          </div>
        </section>

        {/* Stats bar */}
        <section className="-mt-6 grid gap-4 px-4 sm:grid-cols-3 md:-mt-8 md:px-8">
          {[
            { value: "$28.7B", label: t("page.stat1") },
            { value: "48%", label: t("page.stat2") },
            { value: "-25%", label: t("page.stat3") },
          ].map((stat) => (
            <div
              key={stat.value}
              className="rounded-lg border border-[var(--spark-line)] bg-white px-6 py-5 shadow-sm"
            >
              <p className="font-[var(--font-display)] text-3xl font-bold tabular-nums text-[var(--spark-amber)] md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
                {stat.label}
              </p>
            </div>
          ))}
        </section>

        {/* ZONE 1 — Persona */}
        <section className="mt-10">
          <InsertionShell
            zone="persona"
            preview={active.persona}
            active={active}
            onToggle={toggle}
            rationale={t("zones.persona.rationale")}
            accentBorder="border-[color:color-mix(in_oklab,var(--spark-os),transparent_50%)] bg-[color:color-mix(in_oklab,var(--spark-os),transparent_92%)]"
            accentBadge="bg-[var(--spark-os)]"
            icon={User}
          >
            <div className="flex flex-col items-center gap-6 rounded-xl border border-[var(--spark-line)] bg-[color:color-mix(in_oklab,var(--spark-os),transparent_94%)] p-6 md:flex-row md:items-start">
              <div className="relative size-28 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-md md:size-32">
                <Image
                  src="/demos/persona-operator.png"
                  alt=""
                  fill
                  className="object-cover object-[center_20%] scale-150"
                  sizes="128px"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--spark-os)]">
                  {t("zones.persona.role")}
                </p>
                <h3 className="mt-1 font-[var(--font-display)] text-2xl font-bold text-[var(--spark-ink)]">
                  Marina Bardi
                </h3>
                <p className="mt-0.5 text-sm font-medium text-[var(--spark-os)]">
                  {t("zones.persona.title")}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_30%)]">
                  {t("zones.persona.description")}
                </p>
                <blockquote className="mt-4 border-l-2 border-[var(--spark-os)] pl-4 text-sm italic text-[color:color-mix(in_oklab,var(--spark-ink),transparent_25%)]">
                  {t("zones.persona.quote")}
                </blockquote>
              </div>
            </div>
          </InsertionShell>
        </section>

        {/* Intro copy + ZONE 2 — Experience */}
        <section className="mt-10 rounded-xl border border-[var(--spark-line)] bg-white px-6 py-10 md:px-10 md:py-12">
          <h3 className="text-center font-[var(--font-display)] text-2xl font-bold text-[var(--spark-amber)] md:text-3xl">
            {t("page.introHeadline")}
          </h3>
          <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_30%)]">
            {t("page.introBody")}
          </p>
          <p className="mt-6 text-center text-sm font-semibold text-[var(--spark-ink)]">
            {t("page.prioritiesLabel")}
          </p>

          <div className="mt-8">
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
              <div className="rounded-xl border border-[var(--spark-line)] bg-white p-6">
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
                      className="rounded-full border px-3 py-1.5 text-xs font-semibold"
                      style={{
                        borderColor: `color-mix(in oklab, ${color}, transparent 60%)`,
                        backgroundColor: `color-mix(in oklab, ${color}, transparent 88%)`,
                        color: "var(--spark-ink)",
                      }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {EXPERIENCE_KEYWORDS.map(({ label, goal, color }) => (
                    <div
                      key={goal}
                      className="rounded-lg border border-[var(--spark-line)] p-4"
                    >
                      <div
                        className="mb-2 h-1 w-8 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      <p className="text-xs font-bold uppercase tracking-wide" style={{ color }}>
                        {label}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
                        {t(`zones.experience.goals.${goal}` as "zones.experience.goals.g1")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </InsertionShell>
          </div>
        </section>

        {/* Transition heading */}
        <section className="relative mt-14 py-8 text-center">
          <p
            className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none font-[var(--font-display)] text-5xl font-extrabold tracking-[-0.04em] text-[color:color-mix(in_oklab,var(--spark-amber),transparent_82%)] md:text-7xl"
            aria-hidden
          >
            From priorities to practical solutions
          </p>
          <h3 className="relative font-[var(--font-display)] text-2xl font-bold text-[var(--spark-amber)] md:text-4xl">
            From priorities to practical solutions.
          </h3>
          <p className="relative mx-auto mt-4 max-w-2xl text-sm text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
            {t("page.transitionBody")}
          </p>
        </section>

        {/* Category grid */}
        <section className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORY_GRID.map((item) => (
            <article
              key={item.title}
              className="rounded-lg border border-[var(--spark-line)] bg-white p-5 shadow-sm"
            >
              <h4 className="font-semibold text-[var(--spark-ink)]">{item.title}</h4>
              <p className="mt-2 text-xs leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_38%)]">
                {item.body}
              </p>
            </article>
          ))}
        </section>

        {/* ZONE 3 — Journey */}
        <section className="mt-10">
          <InsertionShell
            zone="journey"
            preview={active.journey}
            active={active}
            onToggle={toggle}
            rationale={t("zones.journey.rationale")}
            accentBorder="border-[color:color-mix(in_oklab,var(--spark-iq),transparent_50%)] bg-[color:color-mix(in_oklab,var(--spark-iq),transparent_94%)]"
            accentBadge="bg-[var(--spark-iq)]"
            icon={Route}
          >
            <div className="overflow-hidden rounded-xl border border-[var(--spark-line)] bg-white">
              <div className="border-b border-[var(--spark-line)] px-6 py-5 text-center md:px-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:color-mix(in_oklab,var(--spark-ink),transparent_45%)]">
                  {t("zones.journey.kicker")}
                </p>
                <h4 className="mt-2 font-[var(--font-display)] text-xl text-[var(--spark-ink)] md:text-2xl">
                  {t("zones.journey.headline")}{" "}
                  <span className="text-[var(--spark-os)]">Operator</span>
                </h4>
                <p className="mx-auto mt-2 max-w-2xl text-sm text-[color:color-mix(in_oklab,var(--spark-ink),transparent_32%)]">
                  {t("zones.journey.body")}
                </p>
              </div>
              <div className="relative aspect-[21/10] w-full bg-[#e8f4f8]">
                <Image
                  src="/demos/journey-operator.png"
                  alt=""
                  fill
                  className="object-contain object-center p-2 md:p-3"
                  sizes="(max-width: 768px) 100vw, 1152px"
                  priority
                />
              </div>
              <div className="flex flex-wrap justify-center gap-2 border-t border-[var(--spark-line)] px-4 py-4">
                {JOURNEY_MOMENTS.map((moment, i) => (
                  <span
                    key={moment}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[color:color-mix(in_oklab,var(--spark-iq),transparent_90%)] px-3 py-1 text-[11px] font-medium text-[var(--spark-ink)]"
                  >
                    <span className="flex size-4 items-center justify-center rounded-full bg-[var(--spark-iq)] text-[9px] font-bold text-white">
                      {i + 1}
                    </span>
                    {moment}
                  </span>
                ))}
              </div>
            </div>
          </InsertionShell>
        </section>

        {/* Our Solutions */}
        <section className="mt-10 rounded-xl bg-[color:color-mix(in_oklab,var(--spark-iq),transparent_90%)] px-6 py-12 text-center md:px-10">
          <h3 className="font-[var(--font-display)] text-2xl font-extrabold uppercase tracking-wide text-[var(--spark-ink)] md:text-3xl">
            Our Solutions
          </h3>
          <div className="mx-auto mt-8 grid max-w-lg gap-6 sm:grid-cols-2">
            {["Digital Tools", "Operational Apps"].map((label) => (
              <div
                key={label}
                className="flex aspect-square flex-col items-center justify-center rounded-2xl border border-[var(--spark-line)] bg-white shadow-sm"
              >
                <div className="mb-3 size-14 rounded-xl bg-[color:color-mix(in_oklab,var(--spark-iq),transparent_85%)]" />
                <p className="text-sm font-semibold text-[var(--spark-ink)]">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-10 grid gap-6 rounded-xl border border-[var(--spark-line)] bg-white p-6 md:grid-cols-2 md:p-8">
          <div>
            <h4 className="font-[var(--font-display)] text-lg font-bold text-[var(--spark-ink)]">
              {t("page.ctaTitle")}
            </h4>
            <p className="mt-2 text-sm text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
              {t("page.ctaBody")}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-[var(--spark-iq)] p-5 text-white">
              <p className="text-sm font-semibold">Spark IQ</p>
              <button
                type="button"
                className="mt-4 rounded-lg bg-white/20 px-3 py-1.5 text-xs font-semibold"
              >
                Learn More
              </button>
            </div>
            <div className="rounded-xl bg-[var(--spark-os)] p-5 text-white">
              <p className="text-sm font-semibold">Spark OS</p>
              <button
                type="button"
                className="mt-4 rounded-lg bg-white/20 px-3 py-1.5 text-xs font-semibold"
              >
                Learn More
              </button>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
