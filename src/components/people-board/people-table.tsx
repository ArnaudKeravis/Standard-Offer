import { LANE_META } from "@/lib/people-board/lanes";
import { formatEuro, STATUS_LABEL } from "@/lib/people-board/labels";
import { periodLabel } from "@/lib/people-board/periods";
import type { PersonSeat } from "@/lib/people-board/schemas";
import { cn } from "@/lib/utils";

export function PeopleTable({
  seats,
  selectedId,
  onSelect,
}: {
  seats: PersonSeat[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--spark-line)] bg-white">
      <table className="min-w-[920px] w-full text-left text-sm">
        <thead className="bg-[color:color-mix(in_oklab,var(--spark-paper),white_40%)] text-xs uppercase tracking-[0.12em] text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
          <tr>
            <th className="px-4 py-3 font-semibold">Seat</th>
            <th className="px-3 py-3 font-semibold">Lane</th>
            <th className="px-3 py-3 font-semibold">Supplier</th>
            <th className="px-3 py-3 font-semibold">Status</th>
            <th className="px-3 py-3 font-semibold">Cover</th>
            <th className="px-3 py-3 font-semibold">Cost</th>
            <th className="px-3 py-3 font-semibold">Funding</th>
          </tr>
        </thead>
        <tbody>
          {seats.map((seat) => {
            const selected = selectedId === seat.id;
            return (
              <tr key={seat.id} className="border-t border-[var(--spark-line)]">
                <td className="px-4 py-3">
                  <button
                    type="button"
                    id={`seat-${seat.id}`}
                    aria-pressed={selected}
                    onClick={() => onSelect(seat.id)}
                    className={cn(
                      "text-left font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[var(--spark-amber)]",
                      selected && "text-[var(--spark-ink)] underline",
                    )}
                  >
                    {seat.displayName}
                  </button>
                  <p className="mt-0.5 text-xs text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
                    {seat.role}
                  </p>
                </td>
                <td className="px-3 py-3 text-xs">{LANE_META[seat.lane].label}</td>
                <td className="px-3 py-3">{seat.supplier ?? "-"}</td>
                <td className="px-3 py-3">
                  {STATUS_LABEL[seat.status]}
                  {seat.budgetGap ? " · no budget" : ""}
                </td>
                <td className="px-3 py-3">
                  {seat.startPeriod === 13
                    ? "Not in budget"
                    : `${periodLabel(seat.startPeriod)} to ${periodLabel(seat.endPeriod)}`}
                </td>
                <td className="px-3 py-3 font-semibold tabular-nums">
                  {formatEuro(seat.annualCostFromStart)}
                </td>
                <td className="px-3 py-3">{seat.funding}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
