import { cn } from "@/lib/utils";
import type { PersonaSection } from "@/lib/persona-studio/ai/schemas/section";
import type { SourceDocument } from "@/lib/persona-studio/ai/schemas/evidence";
import type { StudioLang } from "@/lib/persona-studio/utils/i18n";
import { sectionIcon } from "@/lib/persona-studio/utils/section-icon";
import { StatementList } from "./statement-list";

/**
 * Renders one persona section according to its `type`. This is the single
 * component that makes both persona families work: the layout is driven by
 * data, not by hard-coded family templates.
 */
export function SectionCard({
  section,
  sourcesById,
  lang = "en",
  className,
}: {
  section: PersonaSection;
  sourcesById?: Map<string, SourceDocument>;
  lang?: StudioLang;
  className?: string;
}) {
  const isText = section.type === "text" || section.type === "quote";
  const Icon = sectionIcon(section.key);

  return (
    <section
      className={cn(
        "rounded-2xl border border-[var(--studio-line)] bg-[var(--studio-paper)] p-5 sm:p-6",
        className,
      )}
      aria-labelledby={`sec-${section.id}`}
    >
      <div className="mb-3 flex items-center gap-2.5">
        <span
          aria-hidden
          className="flex size-8 shrink-0 items-center justify-center rounded-lg studio-accent-soft text-[var(--studio-accent)]"
        >
          <Icon className="size-4" />
        </span>
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
          lang={lang}
        />
      )}
    </section>
  );
}
