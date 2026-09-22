"use client";

import type { ReactNode } from "react";

import { GBS_DECK } from "@/lib/workshops/tech-ambition/run-of-show";

function Stage({
  title,
  kicker,
  children,
}: {
  title: string;
  kicker?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative flex h-full w-full flex-col bg-white px-[3.6vw] pb-[3vh] pt-[10vh]">
      <h1 className="ws-display text-[clamp(1.55rem,2.7vw,2.2rem)] text-[var(--ws-ink)]">
        {title}
      </h1>
      {kicker ? <p className="mt-1 text-[0.92rem] text-[var(--ws-muted)]">{kicker}</p> : null}
      <div className="mt-4 flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
}

function ScopeSlide() {
  const { title, foot, themes } = GBS_DECK.scope;
  return (
    <Stage title={title} kicker={foot}>
      <div className="grid min-h-0 flex-1 grid-cols-3 grid-rows-2 gap-3">
        {themes.map((theme) => (
          <article key={theme.name} className="flex flex-col overflow-hidden rounded-[18px] bg-[#f7f8fa]">
            <div className="flex items-center justify-between px-4 py-2.5 text-white" style={{ background: theme.accent }}>
              <p className="ws-display text-[1.35rem]">{theme.name}</p>
              <p className="rounded-full bg-white/20 px-2.5 py-0.5 text-[0.72rem] font-semibold">
                {theme.count}
              </p>
            </div>
            <ul className="space-y-1 px-4 py-3 text-[0.82rem] leading-snug text-[var(--ws-ink)]">
              {theme.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Stage>
  );
}

function StatusSlide() {
  const { title, rows, related } = GBS_DECK.status;
  return (
    <Stage title={title}>
      <div className="mb-2 flex justify-end gap-4 text-[0.72rem] text-[var(--ws-muted)]">
        <span>● On-track</span>
        <span>● At-risk</span>
        <span>● Delayed</span>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden rounded-[16px] border border-[var(--ws-line)]">
        <table className="w-full table-fixed text-left text-[0.78rem] leading-snug">
          <thead className="bg-[#2B5CFF] text-white">
            <tr>
              {["Business", "Date", "Status", "Status Detail", "Next Steps", "Risks / Issues"].map((h) => (
                <th key={h} className="px-2.5 py-2 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.business} className="border-t border-[var(--ws-line)] align-top">
                <td className="px-2.5 py-2">
                  <p className="font-semibold text-[var(--ws-ink)]">{row.business}</p>
                  <p className="mt-1 text-[var(--ws-muted)]">{row.owners}</p>
                </td>
                <td className="px-2.5 py-2 text-[var(--ws-muted)]">{row.date}</td>
                <td className="px-2.5 py-2">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-[0.68rem] font-semibold ${
                      row.tone === "track"
                        ? "bg-[#e5f6ea] text-[#1f7a3a]"
                        : "bg-[#fff4d6] text-[#8a6a00]"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-2.5 py-2 text-[var(--ws-ink)]">
                  {row.detail.map((line) => (
                    <p key={line} className="mb-1.5 last:mb-0">
                      {line}
                    </p>
                  ))}
                </td>
                <td className="px-2.5 py-2 text-[var(--ws-ink)]">
                  {row.next.map((line) => (
                    <p key={line} className="mb-1.5 last:mb-0">
                      {line}
                    </p>
                  ))}
                </td>
                <td className="px-2.5 py-2 text-[var(--ws-muted)]">{row.risk || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 rounded-[14px] bg-[#f5f6f8] px-4 py-3">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[var(--ws-blue)]">
          Related Updates
        </p>
        {related.map((line) => (
          <p key={line} className="mt-1.5 text-[0.82rem] leading-snug text-[var(--ws-ink)]">
            {line}
          </p>
        ))}
      </div>
    </Stage>
  );
}

function SutSlide() {
  const { title, rows } = GBS_DECK.sut;
  return (
    <Stage title={title}>
      <div className="min-h-0 flex-1 overflow-hidden rounded-[16px] border border-[var(--ws-line)]">
        <table className="w-full table-fixed text-left text-[0.74rem] leading-snug">
          <thead className="bg-[#2B5CFF] text-white">
            <tr>
              {["Use Case", "Solution Summary", "Status", "Intangible Value", "Tangible Value (Validated)", "Days", "€"].map(
                (h) => (
                  <th key={h} className="px-2 py-2 font-semibold">
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-t border-[var(--ws-line)] align-top">
                <td className="px-2 py-2 font-semibold text-[var(--ws-ink)]">{row.name}</td>
                <td className="px-2 py-2 text-[var(--ws-muted)]">{row.solution}</td>
                <td className="px-2 py-2 text-[var(--ws-navy)]">{row.status}</td>
                <td className="px-2 py-2 text-[var(--ws-ink)]">{row.intangible}</td>
                <td className="px-2 py-2 text-[var(--ws-ink)]">{row.tangible}</td>
                <td className="px-2 py-2 font-semibold">{row.days}</td>
                <td className="px-2 py-2 font-semibold">{row.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Stage>
  );
}

function WorkflowSlide() {
  return (
    <div className="relative flex h-full w-full flex-col bg-white px-[2vw] pb-[2.4vh] pt-[10vh]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/workshops/tech-ambition/gbs-tax-workflow.png"
        alt="Tax Compliance Workflow Management – End to End Workflow"
        className="h-full w-full object-contain object-center"
      />
    </div>
  );
}

function PipelineSlide() {
  const { title, rows } = GBS_DECK.pipeline;
  return (
    <Stage title={title}>
      <div className="min-h-0 flex-1 overflow-hidden rounded-[16px] border border-[var(--ws-line)]">
        <table className="w-full table-fixed text-left text-[0.68rem] leading-snug">
          <thead className="bg-[#2B5CFF] text-white">
            <tr>
              {["Track", "Use Case", "Possible Solution", "Area", "Priority Finance", "Priority Operation"].map(
                (h) => (
                  <th key={h} className="px-2 py-2 font-semibold">
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.use} className="border-t border-[var(--ws-line)] align-top">
                <td className="px-2 py-1.5 font-semibold text-[var(--ws-navy)]">{row.track}</td>
                <td className="px-2 py-1.5 font-semibold text-[var(--ws-ink)]">{row.use}</td>
                <td className="px-2 py-1.5 text-[var(--ws-muted)]">{row.solution}</td>
                <td className="px-2 py-1.5">{row.area}</td>
                <td className="px-2 py-1.5">{row.finance || "—"}</td>
                <td className="px-2 py-1.5">{row.ops || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Stage>
  );
}

export function GbsDeckSlide({ screenId }: { screenId: string }) {
  switch (screenId) {
    case "roadmap-gbs-scope":
      return <ScopeSlide />;
    case "roadmap-gbs-status":
      return <StatusSlide />;
    case "roadmap-gbs-sut":
      return <SutSlide />;
    case "roadmap-gbs-workflow":
      return <WorkflowSlide />;
    case "roadmap-gbs-pipeline":
      return <PipelineSlide />;
    default:
      return <ScopeSlide />;
  }
}
