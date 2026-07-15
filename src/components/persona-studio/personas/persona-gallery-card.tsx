import Link from "next/link";
import { Quote } from "lucide-react";
import type { Persona } from "@/lib/persona-studio/ai/schemas/persona";
import {
  FRUSTRATION_KEYS,
  NEEDS_KEYS,
  familyTheme,
  topStatements,
} from "@/lib/persona-studio/utils/persona-view";
import { ConfidenceBadge } from "@/components/persona-studio/shared/confidence-badge";
import { CoverageMeter } from "@/components/persona-studio/shared/coverage-meter";
import { PersonaPortrait } from "@/components/persona-studio/shared/persona-portrait";

export function PersonaGalleryCard({
  persona,
  projectId,
}: {
  persona: Persona;
  projectId: string;
}) {
  const needs = topStatements(persona, NEEDS_KEYS, 3);
  const frustrations = topStatements(persona, FRUSTRATION_KEYS, 3);

  return (
    <Link
      href={`/studio/projects/${projectId}/personas/${persona.id}`}
      data-studio-theme={familyTheme(persona.family)}
      style={{ ["--persona-accent" as string]: persona.accentColor }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-[var(--studio-line)] bg-[var(--studio-paper)] transition-all hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
    >
      <div className="flex gap-4 p-5">
        <PersonaPortrait
          name={persona.name}
          className="size-20 shrink-0"
          rounded="rounded-2xl"
        />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--studio-accent)]">
            {persona.archetype}
          </p>
          <h2 className="studio-display truncate text-xl font-semibold text-[var(--studio-ink)]">
            {persona.name}
          </h2>
          <p className="mt-1 line-clamp-2 text-sm text-[var(--studio-muted)]">
            {persona.oneLineEssence}
          </p>
        </div>
      </div>

      {persona.quote && (
        <blockquote className="mx-5 flex gap-2 rounded-xl studio-accent-soft px-3 py-2.5 text-sm italic">
          <Quote aria-hidden className="mt-0.5 size-3.5 shrink-0 opacity-70" />
          <span className="line-clamp-2">{persona.quote}</span>
        </blockquote>
      )}

      <div className="grid grid-cols-2 gap-4 p-5 pt-4">
        <div>
          <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--studio-muted)]">
            Top needs
          </h3>
          <ul className="space-y-1 text-sm text-[var(--studio-ink)]">
            {needs.map((s) => (
              <li key={s.id} className="line-clamp-1">
                {s.content}
              </li>
            ))}
            {needs.length === 0 && (
              <li className="italic text-[var(--studio-muted)]">—</li>
            )}
          </ul>
        </div>
        <div>
          <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--studio-muted)]">
            Top frustrations
          </h3>
          <ul className="space-y-1 text-sm text-[var(--studio-ink)]">
            {frustrations.map((s) => (
              <li key={s.id} className="line-clamp-1">
                {s.content}
              </li>
            ))}
            {frustrations.length === 0 && (
              <li className="italic text-[var(--studio-muted)]">—</li>
            )}
          </ul>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-[var(--studio-line)] p-5 pt-4">
        <ConfidenceBadge level={persona.confidenceLevel} />
        <CoverageMeter
          coverage={persona.evidenceCoverage}
          showLabel={false}
          className="max-w-28"
        />
      </div>
    </Link>
  );
}
