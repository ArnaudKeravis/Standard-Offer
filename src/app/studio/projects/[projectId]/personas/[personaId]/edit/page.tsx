import { notFound } from "next/navigation";
import { getRepository } from "@/lib/persona-studio/repository";
import { redirectUnlessCanWrite } from "@/lib/persona-studio/auth/require-write-page";
import { familyTheme } from "@/lib/persona-studio/utils/persona-view";
import { langFromProject, tUI } from "@/lib/persona-studio/utils/i18n";
import { getLangPreference } from "@/lib/persona-studio/utils/lang-cookie";
import { StudioNav } from "@/components/persona-studio/shared/studio-nav";
import { PersonaEditor } from "@/components/persona-studio/editor/persona-editor";

export default async function EditPersonaPage({
  params,
}: {
  params: Promise<{ projectId: string; personaId: string }>;
}) {
  const { projectId, personaId } = await params;
  await redirectUnlessCanWrite(
    `/studio/projects/${projectId}/personas/${personaId}/edit`,
  );
  const repo = getRepository();
  const preference = await getLangPreference();
  const [project, persona] = await Promise.all([
    repo.getProject(projectId, preference),
    repo.getPersona(personaId, preference),
  ]);
  if (!project || !persona || persona.projectId !== project.id) notFound();

  const lang = preference ?? langFromProject(project);
  const sources = await repo.listSources(projectId, lang);

  return (
    <div
      data-studio-theme={familyTheme(persona.family)}
      style={{ ["--persona-accent" as string]: persona.accentColor }}
    >
      <StudioNav
        lang={lang}
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
