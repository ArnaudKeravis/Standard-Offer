import type { Journey } from "@/lib/persona-studio/ai/schemas/workshop";
import { tUI, type StudioLang } from "@/lib/persona-studio/utils/i18n";

/**
 * Journey Lens — a horizontal, numbered step strip. Steps are connected by a
 * hairline and scroll on overflow. Rendered as an ordered list so the sequence
 * is conveyed to assistive tech, not only visually.
 */
export function JourneyLens({
  journey,
  lang = "en",
  className,
}: {
  journey: Journey;
  lang?: StudioLang;
  className?: string;
}) {
  const steps = [...journey.steps].sort((a, b) => a.order - b.order);

  return (
    <div className={className}>
      <p className="mb-3 text-sm font-medium text-[var(--studio-ink)]">
        {journey.name}
        <span className="text-[var(--studio-muted)]">
          {" "}
          · {steps.length} {tUI(lang, "steps")}
        </span>
      </p>
      <div className="overflow-x-auto scrollbar-none pb-1">
        <ol className="flex min-w-max items-center">
          {steps.map((step, i) => (
            <li
              key={step.id}
              className="studio-enter flex items-center"
              style={{ ["--stagger-index" as string]: i }}
            >
              <div className="flex items-center gap-2 rounded-full border border-[var(--studio-line)] bg-[var(--studio-panel)] py-1.5 pl-1.5 pr-3.5">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full studio-accent-soft text-xs font-semibold tabular-nums">
                  {i + 1}
                </span>
                <span className="whitespace-nowrap text-sm text-[var(--studio-ink)]">
                  {step.title}
                </span>
              </div>
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="mx-1.5 h-px w-6 shrink-0 bg-[var(--studio-line)]"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
