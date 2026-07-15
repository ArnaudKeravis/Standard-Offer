import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRepository } from "@/lib/persona-studio/repository";
import { familyTheme } from "@/lib/persona-studio/utils/persona-view";
import { StudioNav } from "@/components/persona-studio/shared/studio-nav";
import { PersonaDetail } from "@/components/persona-studio/personas/persona-detail";

type Params = Promise<{ projectId: string; personaId: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { personaId } = await params;
  const persona = await getRepository().getPersona(personaId);
  return {
    title: persona ? `${persona.name} — Persona Studio` : "Persona Studio",
  };
}

export default async function PersonaDetailPage({
  params,
}: {
  params: Params;
}) {
  const { projectId, personaId } = await params;
  const repo = getRepository();
  const [project, persona] = await Promise.all([
    repo.getProject(projectId),
    repo.getPersona(personaId),
  ]);
  if (!project || !persona || persona.projectId !== project.id) notFound();

  const allSources = await repo.listSources(projectId);
  const sources = allSources.filter((s) => persona.sourceIds.includes(s.id));

  return (
    <div
      data-studio-theme={familyTheme(persona.family)}
      style={{ ["--persona-accent" as string]: persona.accentColor }}
    >
      <StudioNav
        crumbs={[
          { label: project.name, href: `/studio/projects/${project.id}` },
          {
            label: "Personas",
            href: `/studio/projects/${project.id}/personas`,
          },
          { label: persona.name },
        ]}
      />
      <PersonaDetail persona={persona} sources={sources} />
    </div>
  );
}
