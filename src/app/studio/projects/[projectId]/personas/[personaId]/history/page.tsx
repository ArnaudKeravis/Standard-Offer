import { notFound } from "next/navigation";
import { History } from "lucide-react";
import { getWritableRepository } from "@/lib/persona-studio/repository";
import { familyTheme, coveragePct } from "@/lib/persona-studio/utils/persona-view";
import { langFromProject, tUI } from "@/lib/persona-studio/utils/i18n";
import { StudioNav } from "@/components/persona-studio/shared/studio-nav";
import { ConfidenceBadge } from "@/components/persona-studio/shared/confidence-badge";
import { RestoreButton } from "@/components/persona-studio/editor/restore-button";

export default async function PersonaHistoryPage({
  params,
}: {
  params: Promise<{ projectId: string; personaId: string }>;
}) {
  const { projectId, personaId } = await params;
  const repo = getWritableRepository();
  const [project, persona] = await Promise.all([
    repo.getProject(projectId),
    repo.getPersona(personaId),
  ]);
  if (!project || !persona || persona.projectId !== project.id) notFound();

  const versions = await repo.listPersonaVersions(personaId);
  const lang = langFromProject(project);

  return (
    <div
      data-studio-theme={familyTheme(persona.family)}
      style={{ ["--persona-accent" as string]: persona.accentColor }}
    >
      <StudioNav
        crumbs={[
          { label: project.name, href: `/studio/projects/${project.id}` },
          {
            label: persona.name,
            href: `/studio/projects/${project.id}/personas/${persona.id}`,
          },
          { label: tUI(lang, "versionHistory") },
        ]}
      />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-8 sm:px-6">
        <div className="flex items-center gap-2">
          <History className="size-5 text-[var(--studio-accent)]" />
          <h1 className="studio-display text-2xl font-bold text-[var(--studio-ink)]">
            {tUI(lang, "versionHistory")}
          </h1>
        </div>
        <p className="mt-1 text-[var(--studio-muted)]">{persona.name}</p>

        {/* Current version */}
        <section className="mt-6 rounded-2xl border border-[var(--studio-accent)] studio-accent-soft p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-[var(--studio-ink)]">
                {tUI(lang, "version")} {persona.version} ·{" "}
                {tUI(lang, "currentVersion")}
              </p>
              <p className="mt-1 text-xs text-[var(--studio-muted)]">
                {tUI(lang, "evidenceCoverage")}:{" "}
                {coveragePct(persona.evidenceCoverage)}
              </p>
            </div>
            <ConfidenceBadge level={persona.confidenceLevel} lang={lang} />
          </div>
        </section>

        {versions.length === 0 ? (
          <p className="mt-6 text-sm text-[var(--studio-muted)]">
            {tUI(lang, "noVersions")}
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {versions.map((v) => (
              <li
                key={v.id}
                className="rounded-2xl border border-[var(--studio-line)] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-[var(--studio-ink)]">
                      {tUI(lang, "version")} {v.version}
                    </p>
                    <p className="mt-1 text-xs text-[var(--studio-muted)]">
                      {tUI(lang, "savedAt")}:{" "}
                      {new Date(v.createdAt).toLocaleString()}
                    </p>
                    {v.note && (
                      <p className="mt-1 text-xs text-[var(--studio-muted)]">
                        {tUI(lang, "changeNote")}: {v.note}
                      </p>
                    )}
                    <p className="mt-2 text-sm text-[var(--studio-ink)]">
                      {v.snapshot.name} — {v.snapshot.archetype}
                    </p>
                    <p className="mt-1 text-xs text-[var(--studio-muted)]">
                      {tUI(lang, "evidenceCoverage")}:{" "}
                      {coveragePct(v.snapshot.evidenceCoverage)}
                    </p>
                  </div>
                  <RestoreButton
                    projectId={projectId}
                    personaId={personaId}
                    version={v.version}
                    lang={lang}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
