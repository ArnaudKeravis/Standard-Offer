import { leadHandoffs } from "@/lib/people-board/handoffs";
import { LANE_META } from "@/lib/people-board/lanes";
import { formatEuro, STATUS_LABEL } from "@/lib/people-board/labels";
import { periodLabel } from "@/lib/people-board/periods";
import type { PersonSeat } from "@/lib/people-board/schemas";

function isInterim(seat: PersonSeat): boolean {
  return /interim/i.test(seat.role);
}

export function PeopleDetail({
  selected,
  seats,
}: {
  selected: PersonSeat;
  seats: PersonSeat[];
}) {
  const handoffs = leadHandoffs(seats);
  const selectedHandoff = selected.handoffId
    ? handoffs.find((row) => row.id === selected.handoffId)
    : null;
  const selectedChain = selected.handoffId
    ? seats.filter((seat) => seat.handoffId === selected.handoffId)
    : selected.chainId
      ? seats.filter((seat) => seat.chainId === selected.chainId)
      : selected.decisionId
        ? seats.filter((seat) => seat.decisionId === selected.decisionId)
        : [];

  return (
    <aside
      className="rounded-2xl border border-[var(--spark-line)] bg-white p-5 md:p-6 lg:sticky lg:top-4"
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
        {selected.supplier ? (
          <span className="rounded-sm bg-[color:color-mix(in_oklab,var(--spark-paper),var(--spark-ink)_8%)] px-1.5 py-0.5 text-[10px] font-semibold tracking-[0.08em]">
            {selected.supplier}
          </span>
        ) : null}
      </h2>
      <p className="mt-1 text-sm text-[color:color-mix(in_oklab,var(--spark-ink),transparent_28%)]">
        {selected.role}
        {selected.supplier ? ` · ${selected.supplier}` : ""} · {selected.location}{" "}
        · {selected.costCenter}
      </p>
      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
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
      {selectedHandoff ? (
        <p className="mt-4 text-sm font-medium text-[var(--spark-ink)]">
          Lead handoff:{" "}
          {seats.find((seat) => seat.id === selectedHandoff.fromId)?.displayName}{" "}
          to {seats.find((seat) => seat.id === selectedHandoff.toId)?.displayName}{" "}
          at {periodLabel(selectedHandoff.atPeriod)}
        </p>
      ) : selectedChain.length > 1 ? (
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
  );
}
