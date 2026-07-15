import { cn } from "@/lib/utils";
import type { PersonaSection } from "@/lib/persona-studio/ai/schemas/section";
import type { SourceDocument } from "@/lib/persona-studio/ai/schemas/evidence";
import { StatementList } from "./statement-list";

/**
 * Renders one persona section according to its `type`. This is the single
 * component that makes both persona families work: the layout is driven by
 * data, not by hard-coded family templates.
 */
export function SectionCard({
  section,
  sourcesById,
  className,
}: {
  section: PersonaSection;
  sourcesById?: Map<string, SourceDocument>;
  className?: string;
}) {
  const isText = section.type === "text" || section.type === "quote";

  return (
    <section
      className={cn(
        "rounded-2xl border border-[var(--studio-line)] bg-[var(--studio-paper)] p-5 sm:p-6",
        className,
      )}
      aria-labelledby={`sec-${section.id}`}
    >
      <div className="mb-3 flex items-center gap-2">
        <span aria-hidden className="h-4 w-1 rounded-full studio-accent-bar" />
        <h3
          id={`sec-${section.id}`}
          className="studio-display text-sm font-semibold uppercase tracking-wider text-[var(--studio-ink)]"
        >
          {section.title}
        </h3>
      </div>

      {section.description && (
        <p className="mb-3 text-xs text-[var(--studio-muted)]">
          {section.description}
        </p>
      )}

      {isText ? (
        <div className="space-y-3">
          {section.statements.map((s) => (
            <p
              key={s.id}
              className={cn(
                "text-[var(--studio-ink)]",
                section.type === "quote"
                  ? "studio-display text-lg leading-snug"
                  : "text-sm leading-relaxed",
              )}
            >
              {s.content}
            </p>
          ))}
        </div>
      ) : (
        <StatementList
          statements={section.statements}
          sourcesById={sourcesById}
          variant={section.type === "moments" ? "moments" : "bullets"}
        />
      )}
    </section>
  );
}
