import { notFound } from "next/navigation";
import { FileText } from "lucide-react";
import { getRepository } from "@/lib/persona-studio/repository";
import { familyTheme } from "@/lib/persona-studio/utils/persona-view";
import { langFromProject, tUI } from "@/lib/persona-studio/utils/i18n";
import { StudioNav } from "@/components/persona-studio/shared/studio-nav";
import { SourceManager } from "@/components/persona-studio/sources/source-manager";

export default async function ProjectSourcesPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const repo = getRepository();
  const project = await repo.getProject(projectId);
  if (!project) notFound();

  const sources = await repo.listSources(projectId);
  const lang = langFromProject(project);

  return (
    <div data-studio-theme={familyTheme(project.family)}>
      <StudioNav
        crumbs={[
          { label: project.name, href: `/studio/projects/${project.id}` },
          { label: tUI(lang, "sources") },
        ]}
      />
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-8 sm:px-6">
        <div className="flex items-center gap-2">
          <FileText className="size-5 text-[var(--studio-accent)]" />
          <h1 className="studio-display text-2xl font-bold text-[var(--studio-ink)]">
            {tUI(lang, "manageSources")}
          </h1>
        </div>
        <p className="mt-1 text-[var(--studio-muted)]">{project.name}</p>
        <div className="mt-8">
          <SourceManager projectId={projectId} sources={sources} lang={lang} />
        </div>
      </main>
    </div>
  );
}
