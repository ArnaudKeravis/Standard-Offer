"use client";

import type { ReactNode } from "react";

import { FY27_ACCEL } from "@/lib/workshops/tech-ambition/run-of-show";

function Frame({
  title,
  kicker,
  children,
}: {
  title: string;
  kicker?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative flex h-full w-full flex-col bg-white px-[4.4vw] pb-0 pt-[10vh]">
      <h1 className="ws-display max-w-[92%] text-[clamp(1.7rem,3.1vw,2.55rem)] leading-tight text-[var(--ws-ink)]">
        {title}
      </h1>
      {kicker ? (
        <p className="mt-2 text-[1.02rem] text-[var(--ws-muted)]">{kicker}</p>
      ) : null}
      <div className="mt-5 flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
}

function FooterBar({ children }: { children: ReactNode }) {
  return (
    <div className="-mx-[4.4vw] mt-4 bg-[#0E1428] px-[4.4vw] py-3.5 text-[0.92rem] font-semibold text-white">
      {children}
    </div>
  );
}

function PrioritiesSlide() {
  const { title, what, how, footer } = FY27_ACCEL.priorities;
  return (
    <Frame title={title}>
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--ws-muted)]">
        What
      </p>
      <div className="mt-2 grid grid-cols-3 gap-3">
        {what.map((item) => (
          <article key={item.n} className="rounded-[22px] bg-[#f5f6f8] px-5 py-5">
            <p className="flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-[var(--ws-ink)]">
              <span
                className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[0.7rem] text-white"
                style={{ background: item.accent }}
              >
                {item.n}
              </span>
              {item.title}
            </p>
            <p className="mt-3 text-[0.98rem] leading-snug text-[var(--ws-ink)]">{item.body}</p>
            <p className="mt-2 text-[0.82rem] text-[var(--ws-muted)]">{item.tools}</p>
            <p className="mt-4 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-[var(--ws-navy)]">
              {item.outcome}
            </p>
            <p className="mt-1 text-[1.15rem] font-semibold" style={{ color: item.accent }}>
              {item.share}
            </p>
          </article>
        ))}
      </div>
      <p className="mt-5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--ws-muted)]">
        How
      </p>
      <div className="mt-2 grid flex-1 grid-cols-3 gap-3">
        {how.map((item) => (
          <article key={item.title} className="flex flex-col">
            <p className="font-semibold text-[var(--ws-ink)]">{item.title}</p>
            <ul className="mt-3 space-y-2 text-[0.92rem] leading-snug text-[var(--ws-muted)]">
              {item.points.map((point) => (
                <li key={point} className="flex gap-2">
                  <span className="mt-1.5 h-2 w-2 shrink-0" style={{ background: item.accent }} />
                  {point}
                </li>
              ))}
            </ul>
            <p className="mt-auto rounded-full border border-[var(--ws-ink)]/10 bg-[#f5f6f8] px-4 py-2 text-center text-[0.78rem] font-semibold text-[var(--ws-navy)]">
              {item.account}
            </p>
          </article>
        ))}
      </div>
      <FooterBar>{footer}</FooterBar>
    </Frame>
  );
}

function EverydaySlide() {
  const { title, kicker, columns, also } = FY27_ACCEL.everyday;
  return (
    <Frame title={title} kicker={kicker}>
      <div className="grid min-h-0 flex-1 grid-cols-3 gap-3">
        {columns.map((col) => (
          <article key={col.n} className="flex flex-col rounded-[22px] bg-[#f5f6f8] px-5 py-5">
            <p className="text-[0.78rem] font-semibold text-[var(--ws-blue)]">
              {col.n} {col.title}
            </p>
            <p className="mt-3 text-[1.05rem] font-semibold leading-snug text-[var(--ws-ink)]">
              {col.body}
            </p>
            <ul className="mt-4 space-y-3">
              {col.rows.map((row) => (
                <li key={row.label} className="rounded-2xl bg-white px-4 py-3">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[var(--ws-blue)]">
                    {row.label}
                  </p>
                  <p className="mt-1 text-[0.95rem] text-[var(--ws-ink)]">{row.value}</p>
                </li>
              ))}
            </ul>
            {"metrics" in col && col.metrics ? (
              <p className="mt-auto pt-4 text-[0.95rem] font-semibold text-[var(--ws-navy)]">
                {col.metrics.join("   ")}
              </p>
            ) : null}
            {"stats" in col && col.stats ? (
              <div className="mt-auto pt-4">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[var(--ws-blue)]">
                  {col.rollout}
                </p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {col.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="ws-display text-[1.4rem] text-[var(--ws-ink)]">{stat.value}</p>
                      <p className="text-[0.75rem] text-[var(--ws-muted)]">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-[0.85rem] text-[var(--ws-navy)]">{col.foot}</p>
              </div>
            ) : null}
          </article>
        ))}
      </div>
      <FooterBar>
        <div className="grid grid-cols-[auto_1fr_1fr_1fr] items-center gap-6">
          <span className="text-white/55">And also…</span>
          {also.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </FooterBar>
    </Frame>
  );
}

function ProvidersSlide() {
  const { title, rows } = FY27_ACCEL.providers;
  const [one, two, three] = rows;
  return (
    <Frame title={title}>
      <div className="flex min-h-0 flex-1 flex-col gap-3">
        <article className="grid grid-cols-[5.5rem_minmax(0,1.4fr)_repeat(3,minmax(0,0.7fr))] items-center gap-4 rounded-[22px] bg-[#f5f6f8] px-6 py-5">
          <p className="ws-display text-[1.8rem] text-[var(--ws-blue)]">{one.n}</p>
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[var(--ws-blue)]">
              {one.kicker}
            </p>
            <p className="mt-1 text-[1.2rem] font-semibold text-[var(--ws-ink)]">{one.title}</p>
            <p className="mt-1 text-[0.95rem] text-[var(--ws-muted)]">{one.body}</p>
          </div>
          {one.facts?.map((fact) => (
            <div key={fact.label}>
              <p className="ws-display text-[1.6rem] text-[var(--ws-ink)]">{fact.value}</p>
              <p className="text-[0.78rem] text-[var(--ws-muted)]">{fact.label}</p>
            </div>
          ))}
        </article>
        <article className="rounded-[22px] bg-[#f5f6f8] px-6 py-5">
          <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-start gap-4">
            <p className="ws-display text-[1.8rem] text-[var(--ws-blue)]">{two.n}</p>
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[var(--ws-blue)]">
                {two.kicker}
              </p>
              <p className="mt-1 text-[1.2rem] font-semibold text-[var(--ws-ink)]">{two.title}</p>
              <div className="mt-4 grid grid-cols-2 gap-8">
                {two.split?.map((side) => (
                  <div key={side.name}>
                    <p className="font-semibold text-[var(--ws-ink)]">{side.name}</p>
                    <p className="mt-1 text-[0.95rem] text-[var(--ws-muted)]">{side.body}</p>
                    <p className="mt-2 text-[0.88rem] text-[var(--ws-navy)]">{side.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
        <article className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-4 rounded-[22px] bg-[#f5f6f8] px-6 py-5">
          <p className="ws-display text-[1.8rem] text-[var(--ws-blue)]">{three.n}</p>
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[var(--ws-blue)]">
              {three.kicker}
            </p>
            <p className="mt-1 text-[1.2rem] font-semibold text-[var(--ws-ink)]">{three.title}</p>
          </div>
        </article>
      </div>
    </Frame>
  );
}

function PlatformsSlide() {
  const { title, lede, okrs, pillars, next } = FY27_ACCEL.platforms;
  return (
    <Frame title={title} kicker={lede}>
      <div className="grid grid-cols-5 rounded-2xl bg-[#f5f6f8] px-4 py-3 text-center text-[0.82rem] font-semibold text-[var(--ws-navy)]">
        {okrs.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
      <div className="mt-4 grid min-h-0 flex-1 grid-cols-4 gap-3">
        {pillars.map((item) => (
          <article key={item.n} className="flex flex-col px-2">
            <p className="text-[0.85rem] font-semibold text-[var(--ws-ink)]">
              {item.n} {item.title}
            </p>
            <div className="mt-2 h-1 w-full" style={{ background: item.accent }} />
            <p className="mt-4 text-[0.95rem] leading-snug text-[var(--ws-muted)]">{item.body}</p>
            <p className="mt-auto pt-4 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[var(--ws-navy)]">
              Accountable
            </p>
            <p className="mt-1 text-[0.92rem] font-semibold text-[var(--ws-ink)]">{item.account}</p>
          </article>
        ))}
      </div>
      <FooterBar>
        <div className="grid grid-cols-[8rem_1fr_1fr_1fr] items-start gap-6">
          <span className="text-white/55">Next 90 days</span>
          {next.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </FooterBar>
    </Frame>
  );
}

function DeliverySlide() {
  const { title, models } = FY27_ACCEL.delivery;
  return (
    <Frame title={title}>
      <div className="grid grid-cols-3 gap-4">
        {models.map((item) => (
          <article key={item.n} className="rounded-[22px] bg-[#f5f6f8] px-5 py-5">
            <p className="flex items-center gap-2 text-[0.82rem] font-semibold text-[var(--ws-ink)]">
              <span
                className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[0.68rem] text-white"
                style={{ background: item.accent }}
              >
                {item.n}
              </span>
              {item.title}
            </p>
            <p className="mt-4 text-[0.95rem] leading-snug text-[var(--ws-muted)]">{item.body}</p>
          </article>
        ))}
      </div>
      <p className="mt-5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--ws-muted)]">
        Examples
      </p>
      <div className="mt-2 grid flex-1 grid-cols-3 gap-4">
        {models.map((item) => (
          <article key={item.exampleTitle}>
            <p className="rounded-2xl bg-[#f5f6f8] px-4 py-3 font-semibold text-[var(--ws-ink)]">
              <span className="mr-2 inline-block h-3 w-1 align-middle" style={{ background: item.accent }} />
              {item.exampleTitle}
              {"exampleKicker" in item && item.exampleKicker ? (
                <span className="ml-2 font-normal text-[var(--ws-muted)]">{item.exampleKicker}</span>
              ) : null}
            </p>
            <p className="mt-3 text-[0.95rem] leading-snug text-[var(--ws-muted)]">{item.example}</p>
          </article>
        ))}
      </div>
    </Frame>
  );
}

function AgenticSlide() {
  const { title, control, mid, platforms, platformPoints, fabric } = FY27_ACCEL.agentic;
  return (
    <Frame title={title}>
      <div className="-mx-[4.4vw] bg-[#0E1428] px-[4.4vw] py-4 text-white">
        <p className="text-[0.95rem] font-semibold">
          {control.title}
          <span className="ml-3 font-normal text-white/70">{control.lede}</span>
        </p>
        <div className="mt-3 grid grid-cols-4 gap-4">
          {control.items.map((item) => (
            <div key={item.title}>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-white/55">
                {item.title}
              </p>
              <p className="mt-1 text-[0.88rem] leading-snug text-white/90">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="py-3 text-center text-[0.85rem] font-semibold text-[var(--ws-blue)]">{mid}</p>
      <div className="grid flex-1 grid-cols-5 gap-3">
        {platforms.map((name) => (
          <article key={name} className="rounded-[18px] bg-[#f5f6f8] px-3 py-4">
            <p className="font-semibold text-[var(--ws-ink)]">{name}</p>
            <ul className="mt-3 space-y-1.5 text-[0.78rem] text-[var(--ws-muted)]">
              {platformPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="-mx-[4.4vw] mt-3 bg-[#eef7f2] px-[4.4vw] py-4">
        <p className="text-[0.95rem] font-semibold text-[var(--ws-ink)]">
          {fabric.title}
          <span className="ml-3 font-normal text-[var(--ws-muted)]">{fabric.lede}</span>
        </p>
        <div className="mt-3 grid grid-cols-2 gap-6">
          {fabric.items.map((item) => (
            <div key={item.title}>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[var(--ws-navy)]">
                {item.title}
              </p>
              <p className="mt-1 text-[0.9rem] leading-snug text-[var(--ws-muted)]">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function FactoriesSlide() {
  const { title, steps, bar, proofs } = FY27_ACCEL.factories;
  return (
    <Frame title={title}>
      <div className="grid flex-1 grid-cols-7 gap-2">
        {steps.map((step) => (
          <article key={step.n} className="rounded-[18px] bg-[#f5f6f8] px-3 py-4">
            <p className="text-[0.72rem] font-semibold text-[var(--ws-blue)]">{step.n}</p>
            <p className="mt-2 font-semibold text-[var(--ws-ink)]">{step.title}</p>
            <p className="mt-3 text-[0.78rem] leading-snug text-[var(--ws-muted)]">{step.body}</p>
          </article>
        ))}
      </div>
      <FooterBar>
        <p className="text-center">{bar}</p>
      </FooterBar>
      <ul className="mt-4 space-y-2 pb-5 text-[1.02rem] text-[var(--ws-ink)]">
        {proofs.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </Frame>
  );
}

export function StrategyAccelSlide({ screenId }: { screenId: string }) {
  switch (screenId) {
    case "strategy-priorities":
      return <PrioritiesSlide />;
    case "strategy-everyday":
      return <EverydaySlide />;
    case "strategy-providers":
      return <ProvidersSlide />;
    case "strategy-platforms":
      return <PlatformsSlide />;
    case "strategy-delivery":
      return <DeliverySlide />;
    case "strategy-agentic":
      return <AgenticSlide />;
    case "strategy-factories":
      return <FactoriesSlide />;
    default:
      return <PrioritiesSlide />;
  }
}
