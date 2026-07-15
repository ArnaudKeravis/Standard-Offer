import { CircleCheck, CircleDot, CircleHelp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ConfidenceLevel } from "@/lib/persona-studio/ai/schemas/common";

const META: Record<
  ConfidenceLevel,
  { label: string; Icon: typeof CircleCheck; className: string }
> = {
  HIGH: {
    label: "High confidence",
    Icon: CircleCheck,
    className: "text-emerald-700 bg-emerald-50 border-emerald-200",
  },
  MEDIUM: {
    label: "Medium confidence",
    Icon: CircleDot,
    className: "text-amber-700 bg-amber-50 border-amber-200",
  },
  LOW: {
    label: "Low confidence",
    Icon: CircleHelp,
    className: "text-rose-700 bg-rose-50 border-rose-200",
  },
};

/**
 * Confidence is communicated with an icon + text label (never colour alone),
 * satisfying the accessibility rule. Pair it with an explanation nearby.
 */
export function ConfidenceBadge({
  level,
  className,
}: {
  level: ConfidenceLevel;
  className?: string;
}) {
  const { label, Icon, className: tone } = META[level];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        tone,
        className,
      )}
    >
      <Icon aria-hidden className="size-3.5" />
      {label}
    </span>
  );
}
