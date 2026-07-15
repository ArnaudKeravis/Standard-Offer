import { notFound } from "next/navigation";
import { getRepository } from "@/lib/persona-studio/repository";
import { familyTheme } from "@/lib/persona-studio/utils/persona-view";
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

  return (
    <div data-studio-theme={familyTheme(project.family)}>
      <StudioNav
        crumbs={[
          { label: project.name, href: `/studio/projects/${project.id}` },
          { label: "Personas" },
        ]}
      />
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6">
        <h1 className="studio-display text-3xl font-bold text-[var(--studio-ink)]">
          Persona gallery
        </h1>
        <p className="mt-1 text-[var(--studio-muted)]">
          {personas.length} personas · {project.name}
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {personas.map((persona) => (
            <PersonaGalleryCard
              key={persona.id}
              persona={persona}
              projectId={project.id}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
