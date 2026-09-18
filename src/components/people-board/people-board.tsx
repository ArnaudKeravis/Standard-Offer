"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { LANE_META, LANE_ORDER } from "@/lib/people-board/lanes";
import { formatEuro, STATUS_LABEL } from "@/lib/people-board/labels";
import {
  currentFyPeriod,
  FY27_PERIODS,
  ganttSpan,
  periodLabel,
} from "@/lib/people-board/periods";
import type {
  LaneId,
  PeopleSignal,
  PersonSeat,
  ValidationStatus,
} from "@/lib/people-board/schemas";

type AreaFilter = "product" | "codesign" | "all";

const STATUS_BAR: Record<ValidationStatus, string> = {
  pr0: "bg-[var(--spark-os)]",
  pr1: "bg-[var(--spark-amber)]",
  pr2: "bg-[#c23b4a]",
  external: "bg-[var(--spark-iq)]",
};

const STATUS_DOT: Record<ValidationStatus, string> = {
  pr0: "bg-[var(--spark-os)]",
  pr1: "bg-[var(--spark-amber)]",
  pr2: "bg-[#c23b4a]",
  external: "bg-[var(--spark-iq)]",
};

function isInterim(seat: PersonSeat): boolean {
  return /interim/i.test(seat.role);
}

export function PeopleBoard({
  seats,
  signals,
}: {
  seats: PersonSeat[];
  signals: PeopleSignal[];
}) {
  const [area, setArea] = useState<AreaFilter>("product");
  const [selectedId, setSelectedId] = useState<string | null>(
    "dsm-internal-pt",
  );
  const today = currentFyPeriod(new Date());

  const visible = useMemo(() => {
    const filtered =
      area === "all"
        ? seats
        : seats.filter((seat) => LANE_META[seat.lane].area === area);
    return [...filtered].sort((a, b) => {
      const laneDelta =
        LANE_ORDER.indexOf(a.lane) - LANE_ORDER.indexOf(b.lane);
      if (laneDelta !== 0) return laneDelta;
      return a.sortOrder - b.sortOrder;
    });
  }, [seats, area]);

  const groups = useMemo(() => {
    const map = new Map<LaneId, PersonSeat[]>();
    for (const seat of visible) {
      const list = map.get(seat.lane) ?? [];
      list.push(seat);
      map.set(seat.lane, list);
    }
    return LANE_ORDER.filter((lane) => map.has(lane)).map((lane) => ({
      lane,
      meta: LANE_META[lane],
      seats: map.get(lane) ?? [],
    }));
  }, [visible]);

  const selected = seats.find((seat) => seat.id === selectedId) ?? null;
  const selectedChain = selected?.chainId
    ? seats.filter((seat) => seat.chainId === selected.chainId)
    : selected?.decisionId
      ? seats.filter((seat) => seat.decisionId === selected.decisionId)
      : [];

  const inBudgetCost = visible
    .filter((seat) => seat.inBudget)
    .reduce((sum, seat) => sum + seat.annualCostFromStart, 0);
  const pr2Count = visible.filter((seat) => seat.status === "pr2").length;

  function selectSignal(signal: PeopleSignal) {
    const lane = seats.find((seat) => seat.id === signal.personIds[0])?.lane;
    if (lane && area !== "all") {
      setArea(LANE_META[lane].area);
    }
    setSelectedId(signal.personIds[signal.personIds.length - 1]);
  }

  return (
    <main className="min-h-[100dvh]">
      <header className="border-b border-[var(--spark-line)] bg-[var(--spark-ink-deep)] text-white">
        <div className="mx-auto max-w-[1400px] px-4 py-8 md:px-8">
          <Link
            href="/"
            className="mb-6 inline-flex text-xs font-semibold tracking-[0.18em] text-[color:color-mix(in_oklab,white,transparent_35%)] hover:text-white"
          >
            ← Hub
          </Link>
          <h1 className="font-[var(--font-display)] text-3xl tracking-[-0.03em] md:text-4xl">
            FY27 people coverage
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[color:color-mix(in_oklab,white,transparent_28%)] md:text-base">
            Lanes, handoffs, and where cover breaks if a Pr2 seat stays open.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-4 py-6 md:px-8 md:py-8">
        <ul className="grid gap-3 lg:grid-cols-3">
          {signals.map((signal) => (
            <li key={signal.id}>
              <button
                type="button"
                onClick={() => selectSignal(signal)}
                className={cn(
                  "w-full rounded-2xl border p-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--spark-amber)] focus-visible:ring-offset-2",
                  signal.kind === "coverage-risk" && signal.active
                    ? "border-[#c23b4a]/40 bg-[#c23b4a]/8"
                    : "border-[var(--spark-line)] bg-white",
                )}
              >
                <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[color:color-mix(in_oklab,var(--spark-ink),transparent_40%)]">
                  {signal.kind === "coverage-risk"
                    ? "Coverage risk"
                    : "Align / arbitrate"}
                </p>
                <p className="mt-2 font-[var(--font-display)] text-lg tracking-[-0.02em] text-[var(--spark-ink)]">
                  {signal.headline}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_30%)]">
                  {signal.detail}
                </p>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Area filter"
          >
            {(
              [
                ["product", "Product design"],
                ["codesign", "Co-Design"],
                ["all", "All"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={area === value}
                onClick={() => setArea(value)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[var(--spark-amber)]",
                  area === value
                    ? "bg-[var(--spark-ink)] text-white"
                    : "border border-[var(--spark-line)] bg-white text-[var(--spark-ink)]",
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="text-sm text-[color:color-mix(in_oklab,var(--spark-ink),transparent_30%)]">
            {visible.length} seats · {pr2Count} Pr2 · {formatEuro(inBudgetCost)}{" "}
            in budget from start
          </p>
        </div>

        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[color:color-mix(in_oklab,var(--spark-ink),transparent_25%)]">
          {(Object.keys(STATUS_LABEL) as ValidationStatus[]).map((status) => (
            <li key={status} className="inline-flex items-center gap-2">
              <span
                aria-hidden
                className={cn("h-2.5 w-2.5 rounded-sm", STATUS_DOT[status])}
              />
              {STATUS_LABEL[status]}
            </li>
          ))}
          <li className="inline-flex items-center gap-2">
            <span className="rounded-sm border border-[var(--spark-ink)] px-1 text-[10px] font-semibold tracking-wide">
              INTERNAL
            </span>
            Internal hire
          </li>
        </ul>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-[var(--spark-line)] bg-white">
          <div className="min-w-[980px]">
            <div className="sticky top-0 z-10 grid grid-cols-[220px_1fr] border-b border-[var(--spark-line)] bg-white md:grid-cols-[280px_1fr]">
              <p className="px-4 py-3 text-xs font-semibold tracking-[0.12em] uppercase text-[color:color-mix(in_oklab,var(--spark-ink),transparent_40%)]">
                Seat
              </p>
              <div className="relative grid grid-cols-12">
                {FY27_PERIODS.map((period) => (
                  <p
                    key={period.id}
                    className={cn(
                      "px-1 py-3 text-center text-[10px] font-semibold tracking-wide",
                      period.id === today
                        ? "text-[var(--spark-ink)]"
                        : "text-[color:color-mix(in_oklab,var(--spark-ink),transparent_40%)]",
                    )}
                  >
                    P{period.id}
                    <span className="mt-0.5 block font-medium">
                      {period.month}
                    </span>
                  </p>
                ))}
                <div
                  aria-hidden
                  className="pointer-events-none absolute top-0 bottom-0 w-px bg-[var(--spark-ink)]"
                  style={{ left: `${((today - 1) / 12) * 100}%` }}
                />
              </div>
            </div>

            {groups.map((group) => (
              <section
                key={group.lane}
                className="border-t border-[var(--spark-line)]"
              >
                <div className="bg-[color:color-mix(in_oklab,var(--spark-paper),white_40%)] px-4 py-3">
                  <h2 className="text-xs font-semibold tracking-[0.14em] uppercase text-[var(--spark-ink)]">
                    {group.meta.label}
                  </h2>
                  {group.meta.succession ? (
                    <p className="mt-1 text-sm font-medium leading-snug text-[var(--spark-ink)]">
                      {group.meta.succession}
                    </p>
                  ) : null}
                </div>
                <ul>
                  {group.seats.map((seat) => {
                    const span = ganttSpan(seat);
                    const isSelected = selectedId === seat.id;
                    const inFocus =
                      isSelected ||
                      (selected?.chainId &&
                        selected.chainId === seat.chainId) ||
                      (selected?.decisionId &&
                        selected.decisionId === seat.decisionId);
                    const left = ((span.start - 1) / 12) * 100;
                    const width = ((span.end - span.start + 1) / 12) * 100;
                    return (
                      <li key={seat.id}>
                        <button
                          type="button"
                          onClick={() => setSelectedId(seat.id)}
                          aria-pressed={isSelected}
                          className={cn(
                            "grid w-full grid-cols-[220px_1fr] border-t border-[var(--spark-line)] text-left outline-none hover:bg-[color:color-mix(in_oklab,var(--spark-paper),white_20%)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--spark-amber)] md:grid-cols-[280px_1fr]",
                            inFocus
                              ? "bg-[var(--spark-amber-soft)]"
                              : "bg-white",
                          )}
                        >
                          <span className="px-4 py-3">
                            <span className="flex flex-wrap items-center gap-1.5">
                              <span className="text-sm font-semibold text-[var(--spark-ink)]">
                                {seat.displayName}
                              </span>
                              {seat.kind === "internal" ? (
                                <span className="rounded-sm border border-[var(--spark-ink)] px-1 py-px text-[9px] font-semibold tracking-[0.12em]">
                                  INTERNAL
                                </span>
                              ) : null}
                              {isInterim(seat) ? (
                                <span className="rounded-sm bg-[var(--spark-ink)] px-1 py-px text-[9px] font-semibold tracking-[0.12em] text-white">
                                  INTERIM
                                </span>
                              ) : null}
                            </span>
                            <span className="mt-1 block text-xs text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
                              {seat.role} · {seat.location}
                            </span>
                            <span className="mt-1 inline-flex flex-wrap items-center gap-1.5 text-[11px] font-medium">
                              <span
                                aria-hidden
                                className={cn(
                                  "h-1.5 w-1.5 rounded-full",
                                  STATUS_DOT[seat.status],
                                )}
                              />
                              {STATUS_LABEL[seat.status]}
                              {seat.budgetGap ? (
                                <span className="text-[#c23b4a]">
                                  No budget
                                </span>
                              ) : null}
                            </span>
                          </span>
                          <span className="relative min-h-[4.5rem] px-1 py-3">
                            <span
                              aria-hidden
                              className="absolute inset-y-0 grid w-full grid-cols-12"
                            >
                              {FY27_PERIODS.map((period) => (
                                <span
                                  key={period.id}
                                  className="border-l border-[var(--spark-line)] first:border-l-0"
                                />
                              ))}
                            </span>
                            {span.visible ? (
                              <span
                                className={cn(
                                  "absolute top-1/2 flex h-7 -translate-y-1/2 items-center rounded-md px-2 text-[10px] font-semibold text-white",
                                  STATUS_BAR[seat.status],
                                  (seat.status === "pr2" || seat.budgetGap) &&
                                    "opacity-90 [background-image:repeating-linear-gradient(135deg,transparent,transparent_6px,rgba(255,255,255,0.28)_6px,rgba(255,255,255,0.28)_8px)]",
                                )}
                                style={{ left: `${left}%`, width: `${width}%` }}
                              >
                                <span className="truncate">
                                  {periodLabel(span.start)}
                                  {span.end !== span.start
                                    ? ` to ${periodLabel(span.end)}`
                                    : ""}
                                </span>
                              </span>
                            ) : (
                              <span className="relative z-10 ml-2 inline-flex rounded-full border border-[var(--spark-line)] px-2 py-1 text-[11px] font-semibold text-[color:color-mix(in_oklab,var(--spark-ink),transparent_20%)]">
                                Not in budget
                              </span>
                            )}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        </div>

        {selected ? (
          <aside
            className="mt-6 rounded-2xl border border-[var(--spark-line)] bg-white p-5 md:p-6"
            aria-live="polite"
          >
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[color:color-mix(in_oklab,var(--spark-ink),transparent_40%)]">
              {LANE_META[selected.lane].label} · {selected.funding}
            </p>
            <h2 className="mt-2 flex flex-wrap items-center gap-2 font-[var(--font-display)] text-2xl tracking-[-0.03em]">
              {selected.displayName}
              {selected.kind === "internal" ? (
                <span className="rounded-sm border border-[var(--spark-ink)] px-1.5 py-0.5 text-[10px] font-semibold tracking-[0.14em]">
                  INTERNAL
                </span>
              ) : null}
              {isInterim(selected) ? (
                <span className="rounded-sm bg-[var(--spark-ink)] px-1.5 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-white">
                  INTERIM
                </span>
              ) : null}
            </h2>
            <p className="mt-1 text-sm text-[color:color-mix(in_oklab,var(--spark-ink),transparent_28%)]">
              {selected.role} · {selected.location} · {selected.costCenter}
            </p>
            <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <dt className="text-xs text-[color:color-mix(in_oklab,var(--spark-ink),transparent_40%)]">
                  Status
                </dt>
                <dd className="mt-1 text-sm font-semibold">
                  {STATUS_LABEL[selected.status]}
                  {selected.budgetGap ? " · no budget" : ""}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[color:color-mix(in_oklab,var(--spark-ink),transparent_40%)]">
                  Cover
                </dt>
                <dd className="mt-1 text-sm font-semibold">
                  {selected.startPeriod === 13
                    ? "Not in budget"
                    : `${periodLabel(selected.startPeriod)} to ${periodLabel(selected.endPeriod)}`}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[color:color-mix(in_oklab,var(--spark-ink),transparent_40%)]">
                  Cost from start
                </dt>
                <dd className="mt-1 text-sm font-semibold">
                  {formatEuro(selected.annualCostFromStart)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[color:color-mix(in_oklab,var(--spark-ink),transparent_40%)]">
                  OPEX / CAPEX
                </dt>
                <dd className="mt-1 text-sm font-semibold">
                  {formatEuro(selected.opex)} / {formatEuro(selected.capex)}
                </dd>
              </div>
            </dl>
            {selected.notes ? (
              <p className="mt-4 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_25%)]">
                {selected.notes}
              </p>
            ) : null}
            {selectedChain.length > 1 ? (
              <p className="mt-4 text-sm font-medium text-[var(--spark-ink)]">
                Handoff:{" "}
                {selectedChain
                  .slice()
                  .sort((a, b) => a.sortOrder - b.sortOrder)
                  .map((seat) => seat.displayName)
                  .join(" → ")}
              </p>
            ) : null}
            {selected.dailyRate ? (
              <p className="mt-2 text-xs text-[color:color-mix(in_oklab,var(--spark-ink),transparent_40%)]">
                {selected.fte} FTE · €{selected.dailyRate}/day
                {selected.days ? ` · ${selected.days} days` : ""}
              </p>
            ) : null}
          </aside>
        ) : null}
      </div>
    </main>
  );
}
