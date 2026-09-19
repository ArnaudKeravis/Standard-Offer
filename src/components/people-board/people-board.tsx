"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PeopleDetail } from "@/components/people-board/people-detail";
import { PeopleRecs } from "@/components/people-board/people-recs";
import { PeopleTable } from "@/components/people-board/people-table";
import {
  COLLAPSED_LANES_KEY,
  parseCollapsedLanes,
  serializeCollapsedLanes,
  toggleCollapsedLane,
} from "@/lib/people-board/collapsed-lanes";
import { seatsToCsv } from "@/lib/people-board/export";
import {
  SEAT_FILTERS,
  matchesSeatFilters,
  type SeatFilter,
} from "@/lib/people-board/filters";
import {
  clusterLaneSeats,
  handoffForCluster,
  handoffMarkerLeft,
  leadHandoffs,
} from "@/lib/people-board/handoffs";
import { coverageHoles, holeOnSeat } from "@/lib/people-board/holes";
import { LANE_META, LANE_ORDER } from "@/lib/people-board/lanes";
import { formatEuro, STATUS_LABEL } from "@/lib/people-board/labels";
import { laneMoney, moneyForSeats, supplierRollup } from "@/lib/people-board/money";
import {
  currentFyPeriod,
  FY27_PERIODS,
  ganttSpan,
  periodLabel,
} from "@/lib/people-board/periods";
import {
  peopleQueryString,
  type BoardView,
  type PeopleQuery,
} from "@/lib/people-board/query";
import type {
  LaneId,
  PersonSeat,
  ValidationStatus,
} from "@/lib/people-board/schemas";
import {
  recommendations,
  type Recommendation,
} from "@/lib/people-board/recommend";
import { applyScenarios, type ScenarioId } from "@/lib/people-board/scenarios";
import { peopleSignals } from "@/lib/people-board/signals";
import { cn } from "@/lib/utils";

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

const FILTER_LABEL: Record<SeatFilter, string> = {
  pr2: "Pr2",
  "budget-gap": "No budget",
  external: "External",
  lead: "Lead seats",
};

function isInterim(seat: PersonSeat): boolean {
  return /interim/i.test(seat.role);
}

function fundingLine(funding: { BOOST: number; ACC: number; BAU: number }): string {
  return (["BOOST", "ACC", "BAU"] as const)
    .filter((key) => funding[key] > 0)
    .map((key) => `${key} ${formatEuro(funding[key])}`)
    .join(" · ");
}

function SeatTags({ seat }: { seat: PersonSeat }) {
  return (
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
      {seat.supplier ? (
        <span className="rounded-sm bg-[color:color-mix(in_oklab,var(--spark-paper),var(--spark-ink)_8%)] px-1 py-px text-[9px] font-semibold tracking-[0.08em] text-[var(--spark-ink)]">
          {seat.supplier}
        </span>
      ) : null}
    </span>
  );
}

function SeatRow({
  seat,
  selectedId,
  selected,
  onSelect,
  inHandoff,
  hole,
}: {
  seat: PersonSeat;
  selectedId: string | null;
  selected: PersonSeat | null;
  onSelect: (id: string) => void;
  inHandoff: boolean;
  hole: ReturnType<typeof holeOnSeat>;
}) {
  const span = ganttSpan(seat);
  const isSelected = selectedId === seat.id;
  const inFocus =
    isSelected ||
    (selected?.handoffId && selected.handoffId === seat.handoffId) ||
    (selected?.chainId && selected.chainId === seat.chainId) ||
    (selected?.decisionId && selected.decisionId === seat.decisionId);
  const left = ((span.start - 1) / 12) * 100;
  const width = ((span.end - span.start + 1) / 12) * 100;
  const holeLeft = hole ? ((hole.start - 1) / 12) * 100 : 0;
  const holeWidth = hole ? ((hole.end - hole.start + 1) / 12) * 100 : 0;

  return (
    <li>
      <button
        type="button"
        id={`seat-${seat.id}`}
        onClick={() => onSelect(seat.id)}
        aria-pressed={isSelected}
        className={cn(
          "grid w-full grid-cols-[220px_1fr] border-t border-[var(--spark-line)] text-left outline-none hover:bg-[color:color-mix(in_oklab,var(--spark-paper),white_20%)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--spark-amber)] md:grid-cols-[280px_1fr]",
          inFocus ? "bg-[var(--spark-amber-soft)]" : "bg-white",
        )}
      >
        <span className={cn("px-4 py-3", inHandoff && "pl-7 md:pl-8")}>
          <SeatTags seat={seat} />
          <span className="mt-1 block text-xs text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
            {seat.role} · {seat.location}
          </span>
          <span className="mt-1 inline-flex flex-wrap items-center gap-1.5 text-[11px] font-medium">
            <span
              aria-hidden
              className={cn("h-1.5 w-1.5 rounded-full", STATUS_DOT[seat.status])}
            />
            {STATUS_LABEL[seat.status]}
            {seat.budgetGap ? (
              <span className="text-[#c23b4a]">No budget</span>
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
                {span.end !== span.start ? ` to ${periodLabel(span.end)}` : ""}
              </span>
            </span>
          ) : (
            <span className="relative z-10 ml-2 inline-flex rounded-full border border-[var(--spark-line)] px-2 py-1 text-[11px] font-semibold text-[color:color-mix(in_oklab,var(--spark-ink),transparent_20%)]">
              Not in budget
            </span>
          )}
          {hole ? (
            <span
              className="absolute top-[calc(50%+14px)] flex h-5 -translate-y-1/2 items-center rounded-sm px-1.5 text-[9px] font-semibold tracking-[0.08em] uppercase text-white [background-image:repeating-linear-gradient(135deg,#8a2a35,#8a2a35_6px,rgba(255,255,255,0.22)_6px,rgba(255,255,255,0.22)_8px)]"
              style={{ left: `${holeLeft}%`, width: `${holeWidth}%` }}
            >
              {hole.label}
            </span>
          ) : null}
        </span>
      </button>
    </li>
  );
}

export function PeopleBoard({
  seats,
  initialQuery,
}: {
  seats: PersonSeat[];
  initialQuery: PeopleQuery;
}) {
  const [area, setArea] = useState<AreaFilter>(() => {
    if (!initialQuery.lane) return "product";
    return LANE_META[initialQuery.lane].area;
  });
  const [selectedId, setSelectedId] = useState<string | null>(
    initialQuery.seat ?? "dsm-internal-pt",
  );
  const [collapsed, setCollapsed] = useState<Set<LaneId>>(new Set());
  const [filters, setFilters] = useState<Set<SeatFilter>>(initialQuery.filters);
  const [scenarios, setScenarios] = useState<Set<ScenarioId>>(
    initialQuery.scenarios,
  );
  const [view, setView] = useState<BoardView>(initialQuery.view);
  const today = currentFyPeriod(new Date());

  const derived = useMemo(
    () => applyScenarios(seats, scenarios),
    [seats, scenarios],
  );
  const signals = useMemo(() => peopleSignals(derived), [derived]);
  const recs = useMemo(() => recommendations(derived), [derived]);
  const handoffs = useMemo(() => leadHandoffs(derived), [derived]);
  const holes = useMemo(() => coverageHoles(derived), [derived]);

  useEffect(() => {
    const stored = parseCollapsedLanes(
      sessionStorage.getItem(COLLAPSED_LANES_KEY),
    );
    if (initialQuery.lane) stored.delete(initialQuery.lane);
    setCollapsed(stored);
  }, [initialQuery.lane]);

  useEffect(() => {
    const href = peopleQueryString({
      lane: selectedId
        ? (derived.find((seat) => seat.id === selectedId)?.lane ?? null)
        : null,
      seat: selectedId,
      view,
      filters,
      scenarios,
    });
    window.history.replaceState(null, "", href);
  }, [derived, filters, scenarios, selectedId, view]);

  const visible = useMemo(() => {
    const filtered = derived.filter((seat) => {
      if (area !== "all" && LANE_META[seat.lane].area !== area) return false;
      return matchesSeatFilters(seat, filters);
    });
    return [...filtered].sort((a, b) => {
      const laneDelta = LANE_ORDER.indexOf(a.lane) - LANE_ORDER.indexOf(b.lane);
      if (laneDelta !== 0) return laneDelta;
      return a.sortOrder - b.sortOrder;
    });
  }, [derived, area, filters]);

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

  const selected = derived.find((seat) => seat.id === selectedId) ?? null;
  const totals = moneyForSeats(visible);
  const suppliers = supplierRollup(visible);
  const pr2Count = visible.filter((seat) => seat.status === "pr2").length;

  function persistCollapsed(next: Set<LaneId>) {
    sessionStorage.setItem(COLLAPSED_LANES_KEY, serializeCollapsedLanes(next));
    setCollapsed(next);
  }

  function focusLane(lane: LaneId, seatId: string) {
    if (area !== "all") setArea(LANE_META[lane].area);
    persistCollapsed(
      collapsed.has(lane) ? toggleCollapsedLane(collapsed, lane) : collapsed,
    );
    setSelectedId(seatId);
    window.setTimeout(() => {
      const node =
        document.getElementById(`seat-${seatId}`) ??
        document.getElementById(`lane-${lane}`);
      node?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  }

  function selectSignal(signal: Recommendation) {
    const seatId = signal.personIds[signal.personIds.length - 1];
    focusLane(signal.lane, seatId);
  }

  function toggleLane(lane: LaneId) {
    persistCollapsed(toggleCollapsedLane(collapsed, lane));
  }

  function toggleFilter(filter: SeatFilter) {
    const next = new Set(filters);
    if (next.has(filter)) next.delete(filter);
    else next.add(filter);
    setFilters(next);
  }

  function toggleScenario(id: ScenarioId) {
    const next = new Set(scenarios);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setScenarios(next);
  }

  function downloadCsv() {
    const blob = new Blob([seatsToCsv(visible)], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "fy27-people-coverage.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-[100dvh]">
      <header className="border-b border-[var(--spark-line)] bg-[var(--spark-ink-deep)] text-white">
        <div className="mx-auto max-w-[1600px] px-4 py-5 md:px-8">
          <Link
            href="/"
            className="mb-3 inline-flex text-xs font-semibold tracking-[0.18em] text-[color:color-mix(in_oklab,white,transparent_35%)] hover:text-white"
          >
            ← Hub
          </Link>
          <h1 className="font-[var(--font-display)] text-2xl tracking-[-0.03em] md:text-3xl">
            FY27 people coverage
          </h1>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-4 py-6 md:px-8 md:py-8 lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-6">
        <div>
          <PeopleRecs
            recs={recs}
            selectedId={selectedId}
            onSelect={selectSignal}
          />

          <div className="mt-6 flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={scenarios.has("validate-dsm")}
              onClick={() => toggleScenario("validate-dsm")}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[var(--spark-amber)]",
                scenarios.has("validate-dsm")
                  ? "bg-[var(--spark-ink)] text-white"
                  : "border border-[var(--spark-line)] bg-white",
              )}
            >
              If DSM is validated
            </button>
            <button
              type="button"
              aria-pressed={scenarios.has("validate-b2b-lead")}
              onClick={() => toggleScenario("validate-b2b-lead")}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[var(--spark-amber)]",
                scenarios.has("validate-b2b-lead")
                  ? "bg-[var(--spark-ink)] text-white"
                  : "border border-[var(--spark-line)] bg-white",
              )}
            >
              If B2B Lead is funded
            </button>
          </div>

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
              <button
                type="button"
                aria-pressed={view === "gantt"}
                onClick={() => setView("gantt")}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[var(--spark-amber)]",
                  view === "gantt"
                    ? "bg-[var(--spark-ink)] text-white"
                    : "border border-[var(--spark-line)] bg-white",
                )}
              >
                Gantt
              </button>
              <button
                type="button"
                aria-pressed={view === "table"}
                onClick={() => setView("table")}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[var(--spark-amber)]",
                  view === "table"
                    ? "bg-[var(--spark-ink)] text-white"
                    : "border border-[var(--spark-line)] bg-white",
                )}
              >
                Table
              </button>
              <button
                type="button"
                onClick={downloadCsv}
                className="rounded-full border border-[var(--spark-line)] bg-white px-4 py-2 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[var(--spark-amber)]"
              >
                Export CSV
              </button>
            </div>
            <p className="text-sm text-[color:color-mix(in_oklab,var(--spark-ink),transparent_30%)]">
              {visible.length} seats · {pr2Count} Pr2 · {formatEuro(totals.total)}{" "}
              in budget · OPEX {formatEuro(totals.opex)} / CAPEX{" "}
              {formatEuro(totals.capex)}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2" aria-label="Seat filters">
            {SEAT_FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                aria-pressed={filters.has(filter)}
                onClick={() => toggleFilter(filter)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[var(--spark-amber)]",
                  filters.has(filter)
                    ? "bg-[var(--spark-ink)] text-white"
                    : "border border-[var(--spark-line)] bg-white",
                )}
              >
                {FILTER_LABEL[filter]}
              </button>
            ))}
          </div>

          {suppliers.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[color:color-mix(in_oklab,var(--spark-ink),transparent_20%)]">
              {suppliers.map((row) => (
                <li key={row.supplier}>
                  <span className="font-semibold text-[var(--spark-ink)]">
                    {row.supplier}
                  </span>{" "}
                  {formatEuro(row.total)} · {row.count}
                </li>
              ))}
            </ul>
          ) : null}

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
            <li>Hatched red: uncovered if the seat stays open</li>
          </ul>

          {view === "table" ? (
            <div className="mt-6">
              <PeopleTable
                seats={visible}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </div>
          ) : (
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

                {groups.map((group) => {
                  const isCollapsed = collapsed.has(group.lane);
                  const strip = laneMoney(derived, group.lane);
                  const laneRisk = signals.find(
                    (signal) =>
                      signal.lane === group.lane &&
                      signal.kind === "coverage-risk" &&
                      signal.active,
                  );
                  const clusters = clusterLaneSeats(group.seats);
                  const rowId = `lane-${group.lane}-rows`;

                  return (
                    <section
                      key={group.lane}
                      id={`lane-${group.lane}`}
                      className="border-t border-[var(--spark-line)]"
                    >
                      <h2>
                        <button
                          type="button"
                          aria-expanded={!isCollapsed}
                          aria-controls={rowId}
                          onClick={() => toggleLane(group.lane)}
                          className="flex min-h-11 w-full items-start gap-3 bg-[color:color-mix(in_oklab,var(--spark-paper),white_40%)] px-4 py-3 text-left outline-none hover:bg-[color:color-mix(in_oklab,var(--spark-paper),white_10%)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--spark-amber)]"
                        >
                          <svg
                            aria-hidden
                            viewBox="0 0 16 16"
                            className={cn(
                              "mt-0.5 h-4 w-4 shrink-0 text-[var(--spark-ink)] transition-transform duration-200",
                              isCollapsed && "-rotate-90",
                            )}
                          >
                            <path
                              d="M4 6l4 4 4-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="min-w-0 flex-1">
                            <span className="flex flex-wrap items-center gap-2">
                              <span className="text-xs font-semibold tracking-[0.14em] uppercase text-[var(--spark-ink)]">
                                {group.meta.label}
                              </span>
                              {laneRisk ? (
                                <span className="rounded-sm bg-[#c23b4a] px-1.5 py-px text-[9px] font-semibold tracking-[0.12em] text-white">
                                  Risk
                                </span>
                              ) : null}
                            </span>
                            <span className="mt-1 block text-sm font-medium leading-snug text-[var(--spark-ink)]">
                              {formatEuro(strip.total)} · OPEX{" "}
                              {formatEuro(strip.opex)} / CAPEX{" "}
                              {formatEuro(strip.capex)}
                              {fundingLine(strip.funding)
                                ? ` · ${fundingLine(strip.funding)}`
                                : ""}
                            </span>
                            <span className="mt-1 block text-xs text-[color:color-mix(in_oklab,var(--spark-ink),transparent_30%)]">
                              {isCollapsed
                                ? `${group.seats.length} seats`
                                : group.meta.succession}
                            </span>
                          </span>
                        </button>
                      </h2>
                      {isCollapsed ? null : (
                        <div id={rowId}>
                          {clusters.map((cluster) => {
                            const handoff = handoffForCluster(handoffs, cluster);
                            return (
                              <div
                                key={
                                  cluster.handoffId ??
                                  cluster.seats.map((seat) => seat.id).join("-")
                                }
                                className="relative"
                              >
                                {handoff ? (
                                  <div
                                    aria-hidden
                                    className="pointer-events-none absolute inset-0 z-[1] grid grid-cols-[220px_1fr] md:grid-cols-[280px_1fr]"
                                  >
                                    <span className="relative">
                                      <span className="absolute top-6 bottom-6 left-[14px] w-0.5 rounded-full bg-[var(--spark-ink)] md:left-[18px]" />
                                    </span>
                                    <span className="relative">
                                      <span
                                        className="absolute top-8 bottom-8 w-0.5 bg-[var(--spark-ink)]"
                                        style={{
                                          left: `${handoffMarkerLeft(handoff.atPeriod)}%`,
                                        }}
                                      />
                                    </span>
                                  </div>
                                ) : null}
                                <ul>
                                  {cluster.seats.map((seat) => (
                                    <SeatRow
                                      key={seat.id}
                                      seat={seat}
                                      selectedId={selectedId}
                                      selected={selected}
                                      onSelect={setSelectedId}
                                      inHandoff={Boolean(handoff)}
                                      hole={holeOnSeat(holes, seat)}
                                    />
                                  ))}
                                </ul>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </section>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 lg:mt-0">
          {selected ? (
            <PeopleDetail selected={selected} seats={derived} />
          ) : null}
        </div>
      </div>
    </main>
  );
}
