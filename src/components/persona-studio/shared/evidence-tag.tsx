import { CircleCheck, CircleHelp, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import type { EvidenceStatus } from "@/lib/persona-studio/ai/schemas/common";
import { tEvidence, type StudioLang } from "@/lib/persona-studio/utils/i18n";

const META: Record<
  EvidenceStatus,
  { Icon: typeof CircleCheck; className: string }
> = {
  EVIDENCE: {
    Icon: CircleCheck,
    className: "text-emerald-800 bg-emerald-50 border-emerald-200",
  },
  ASSUMPTION: {
    Icon: CircleHelp,
    className: "text-sky-800 bg-sky-50 border-sky-200",
  },
  TO_VALIDATE: {
    Icon: TriangleAlert,
    className: "text-orange-800 bg-orange-50 border-orange-200",
  },
};

/**
 * The evidence status of a statement. Uses icon + text so the meaning is never
 * carried by colour alone. This is the visible face of evidence transparency.
 */
export function EvidenceTag({
  status,
  lang = "en",
  className,
}: {
  status: EvidenceStatus;
  lang?: StudioLang;
  className?: string;
}) {
  const { Icon, className: tone } = META[status];
  const label = tEvidence(lang, status);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-wide",
        tone,
        className,
      )}
    >
      <Icon aria-hidden className="size-3" />
      {label}
    </span>
  );
}
