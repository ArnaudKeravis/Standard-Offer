import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PersonaStatement } from "@/lib/persona-studio/ai/schemas/statement";
import type { SourceDocument } from "@/lib/persona-studio/ai/schemas/evidence";
import { tUI, type StudioLang } from "@/lib/persona-studio/utils/i18n";
import { EvidenceTag } from "./evidence-tag";

/**
 * Renders persona statements with their evidence tags. Each statement can
 * expose its supporting sources in a native <details> disclosure, keeping the
 * "why does this exist" traceability fully keyboard-accessible with no JS.
 */
export function StatementList({
  statements,
  sourcesById,
  variant = "bullets",
  lang = "en",
  className,
}: {
  statements: PersonaStatement[];
  sourcesById?: Map<string, SourceDocument>;
  variant?: "bullets" | "plain" | "moments";
  lang?: StudioLang;
  className?: string;
}) {
  if (statements.length === 0) {
    return (
      <p className="text-sm italic text-[var(--studio-muted)]">
        {tUI(lang, "nothingRecorded")}
      </p>
    );
  }

  return (
    <ul className={cn("space-y-2.5", className)}>
      {statements.map((s) => (
        <li key={s.id} className="text-sm leading-relaxed">
          <div className="flex flex-wrap items-start gap-x-2 gap-y-1">
            {variant === "bullets" && (
              <span
                aria-hidden
                className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--studio-accent)]"
              />
            )}
            <span className="flex-1 text-[var(--studio-ink)]">
              {s.label && variant === "moments" && (
                <span className="mr-1.5 font-semibold uppercase tracking-wide text-[0.72rem] text-[var(--studio-muted)]">
                  {s.label}
                </span>
              )}
              {s.content}
            </span>
            <EvidenceTag status={s.evidenceStatus} lang={lang} />
          </div>

          {s.sourceIds.length > 0 && sourcesById && (
            <details className="group mt-1 ml-3.5">
              <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-xs text-[var(--studio-muted)] hover:text-[var(--studio-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]">
                <FileText aria-hidden className="size-3" />
                {s.sourceIds.length} source
                {s.sourceIds.length > 1 ? "s" : ""}
              </summary>
              <ul className="mt-1 space-y-0.5 border-l border-[var(--studio-line)] pl-3">
                {s.sourceIds.map((id) => (
                  <li key={id} className="text-xs text-[var(--studio-muted)]">
                    {sourcesById.get(id)?.name ?? id}
                  </li>
                ))}
              </ul>
            </details>
          )}
        </li>
      ))}
    </ul>
  );
}
