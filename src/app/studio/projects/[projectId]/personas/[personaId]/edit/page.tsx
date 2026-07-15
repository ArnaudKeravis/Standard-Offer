import { notFound } from "next/navigation";
import { getRepository } from "@/lib/persona-studio/repository";
import { familyTheme } from "@/lib/persona-studio/utils/persona-view";
import { langFromProject, tUI } from "@/lib/persona-studio/utils/i18n";
import { StudioNav } from "@/components/persona-studio/shared/studio-nav";
import { PersonaEditor } from "@/components/persona-studio/editor/persona-editor";

export default async function EditPersonaPage({
  params,
}: {
  params: Promise<{ projectId: string; personaId: string }>;
}) {
  const { projectId, personaId } = await params;
  const repo = getRepository();
  const [project, persona] = await Promise.all([
    repo.getProject(projectId),
    repo.getPersona(personaId),
  ]);
  if (!project || !persona || persona.projectId !== project.id) notFound();

  const sources = await repo.listSources(projectId);
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
            label: tUI(lang, "personaGallery"),
            href: `/studio/projects/${project.id}/personas`,
          },
          {
            label: persona.name,
            href: `/studio/projects/${project.id}/personas/${persona.id}`,
          },
          { label: tUI(lang, "editPersona") },
        ]}
      />
      <PersonaEditor
        persona={persona}
        sources={sources}
        projectId={projectId}
        lang={lang}
        mode="edit"
      />
    </div>
  );
}
