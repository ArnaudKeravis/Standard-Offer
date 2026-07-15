import { notFound } from "next/navigation";
import { getRepository } from "@/lib/persona-studio/repository";
import { familyTheme } from "@/lib/persona-studio/utils/persona-view";
import { langFromProject, tUI } from "@/lib/persona-studio/utils/i18n";
import { scaffoldPersona } from "@/lib/persona-studio/utils/persona-factory";
import { StudioNav } from "@/components/persona-studio/shared/studio-nav";
import { PersonaEditor } from "@/components/persona-studio/editor/persona-editor";

export default async function NewPersonaPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const repo = getRepository();
  const project = await repo.getProject(projectId);
  if (!project) notFound();

  const [sources, template] = await Promise.all([
    repo.listSources(projectId),
    project.templateId
      ? repo.getTemplate(project.templateId)
      : Promise.resolve(null),
  ]);
  const templates = await repo.listTemplates();
  const chosen =
    template ?? templates.find((t) => t.family === project.family) ?? templates[0];
  if (!chosen) notFound();

  const draft = scaffoldPersona({
    projectId,
    template: chosen,
    family: project.family,
    name: "",
    archetype: "",
    category: "",
    accentColor: chosen.accentColor,
  });
  const lang = langFromProject(project);

  return (
    <div
      data-studio-theme={familyTheme(project.family)}
      style={{ ["--persona-accent" as string]: chosen.accentColor }}
    >
      <StudioNav
        crumbs={[
          { label: project.name, href: `/studio/projects/${project.id}` },
          {
            label: tUI(lang, "personaGallery"),
            href: `/studio/projects/${project.id}/personas`,
          },
          { label: tUI(lang, "editorNewPersona") },
        ]}
      />
      <PersonaEditor
        persona={draft}
        sources={sources}
        projectId={projectId}
        lang={lang}
        mode="create"
      />
    </div>
  );
}
