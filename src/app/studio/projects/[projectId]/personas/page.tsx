import { notFound } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getRepository } from "@/lib/persona-studio/repository";
import { familyTheme } from "@/lib/persona-studio/utils/persona-view";
import { langFromProject, tUI } from "@/lib/persona-studio/utils/i18n";
import { StudioNav } from "@/components/persona-studio/shared/studio-nav";
import { PersonaGalleryCard } from "@/components/persona-studio/personas/persona-gallery-card";

export default async function PersonaGalleryPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const repo = getRepository();
  const project = await repo.getProject(projectId);
  if (!project) notFound();
  const personas = await repo.listPersonas(projectId);
  const lang = langFromProject(project);

  return (
    <div data-studio-theme={familyTheme(project.family)}>
      <StudioNav
        crumbs={[
          { label: project.name, href: `/studio/projects/${project.id}` },
          { label: tUI(lang, "personaGallery") },
        ]}
        actions={
          <Link
            href={`/studio/projects/${project.id}/personas/new`}
            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--studio-ink)] px-3.5 py-1.5 text-sm font-medium text-[var(--studio-paper)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
          >
            <Plus aria-hidden className="size-4" />
            {tUI(lang, "addPersona")}
          </Link>
        }
      />
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6">
        <h1 className="studio-display text-3xl font-bold text-[var(--studio-ink)]">
          {tUI(lang, "personaGallery")}
        </h1>
        <p className="mt-1 text-[var(--studio-muted)]">
          {personas.length} {tUI(lang, "personas")} · {project.name}
        </p>
        <div className="mt-8 grid auto-rows-min gap-5 md:grid-cols-2 xl:grid-cols-3">
          {personas.map((persona, i) => (
            <PersonaGalleryCard
              key={persona.id}
              persona={persona}
              projectId={project.id}
              lang={lang}
              staggerIndex={i}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
