import { CircleCheck, CircleDot, CircleHelp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ConfidenceLevel } from "@/lib/persona-studio/ai/schemas/common";
import { tConfidence, type StudioLang } from "@/lib/persona-studio/utils/i18n";

const META: Record<
  ConfidenceLevel,
  { Icon: typeof CircleCheck; className: string }
> = {
  HIGH: {
    Icon: CircleCheck,
    className: "text-emerald-700 bg-emerald-50 border-emerald-200",
  },
  MEDIUM: {
    Icon: CircleDot,
    className: "text-amber-700 bg-amber-50 border-amber-200",
  },
  LOW: {
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
  lang = "en",
  className,
}: {
  level: ConfidenceLevel;
  lang?: StudioLang;
  className?: string;
}) {
  const { Icon, className: tone } = META[level];
  const label = tConfidence(lang, level);
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
