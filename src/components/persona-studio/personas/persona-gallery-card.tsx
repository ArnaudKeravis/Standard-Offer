import Link from "next/link";
import { Frown, Quote, Target } from "lucide-react";
import type { Persona } from "@/lib/persona-studio/ai/schemas/persona";
import {
  FRUSTRATION_KEYS,
  NEEDS_KEYS,
  familyTheme,
  topStatements,
} from "@/lib/persona-studio/utils/persona-view";
import { tUI, type StudioLang } from "@/lib/persona-studio/utils/i18n";
import { ConfidenceBadge } from "@/components/persona-studio/shared/confidence-badge";
import { CoverageMeter } from "@/components/persona-studio/shared/coverage-meter";
import { PersonaPortrait } from "@/components/persona-studio/shared/persona-portrait";

export function PersonaGalleryCard({
  persona,
  projectId,
  lang = "en",
  staggerIndex = 0,
}: {
  persona: Persona;
  projectId: string;
  lang?: StudioLang;
  staggerIndex?: number;
}) {
  const needs = topStatements(persona, NEEDS_KEYS, 3);
  const frustrations = topStatements(persona, FRUSTRATION_KEYS, 3);

  const base =
    "group studio-enter studio-lift studio-focusable flex flex-col overflow-hidden rounded-3xl border border-[var(--studio-line)] bg-[var(--studio-paper)]";

  return (
    <Link
      href={`/studio/projects/${projectId}/personas/${persona.id}`}
      data-studio-theme={familyTheme(persona.family)}
      style={{
        ["--persona-accent" as string]: persona.accentColor,
        ["--stagger-index" as string]: staggerIndex,
      }}
      className={base}
    >
      <div className="flex gap-4 p-5">
        <PersonaPortrait
          name={persona.name}
          src={persona.portraitUrl}
          className="size-20 shrink-0"
          rounded="rounded-2xl"
          sizes="80px"
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
        <NeedsBlock
          title={tUI(lang, "topNeeds")}
          icon={<Target aria-hidden className="size-3.5 text-[var(--studio-accent)]" />}
          statements={needs}
        />
        <NeedsBlock
          title={tUI(lang, "topFrustrations")}
          icon={<Frown aria-hidden className="size-3.5 text-[var(--studio-accent)]" />}
          statements={frustrations}
        />
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-[var(--studio-line)] p-5 pt-4">
        <ConfidenceBadge level={persona.confidenceLevel} lang={lang} />
        <CoverageMeter
          coverage={persona.evidenceCoverage}
          lang={lang}
          showLabel={false}
          className="max-w-28"
        />
      </div>
    </Link>
  );
}

function NeedsBlock({
  title,
  icon,
  statements,
}: {
  title: string;
  icon: React.ReactNode;
  statements: { id: string; content: string }[];
}) {
  return (
    <div>
      <h3 className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--studio-muted)]">
        {icon}
        {title}
      </h3>
      <ul className="space-y-1 text-sm text-[var(--studio-ink)]">
        {statements.map((s) => (
          <li key={s.id} className="line-clamp-1">
            {s.content}
          </li>
        ))}
        {statements.length === 0 && (
          <li className="italic text-[var(--studio-muted)]">—</li>
        )}
      </ul>
    </div>
  );
}
