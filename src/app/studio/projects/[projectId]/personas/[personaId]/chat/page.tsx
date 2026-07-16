import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRepository } from "@/lib/persona-studio/repository";
import { familyTheme } from "@/lib/persona-studio/utils/persona-view";
import { langFromProject, tUI } from "@/lib/persona-studio/utils/i18n";
import { getLangPreference } from "@/lib/persona-studio/utils/lang-cookie";
import { StudioNav } from "@/components/persona-studio/shared/studio-nav";
import {
  PersonaChat,
  type PersonaChatViewModel,
} from "@/components/persona-studio/chat/persona-chat";

type Params = Promise<{ projectId: string; personaId: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { personaId } = await params;
  const persona = await getRepository().getPersona(personaId);
  return {
    title: persona
      ? `Chat — ${persona.name} — Persona Studio`
      : "Persona Studio",
  };
}

export default async function PersonaChatPage({
  params,
}: {
  params: Params;
}) {
  const { projectId, personaId } = await params;
  const repo = getRepository();
  const preference = await getLangPreference();
  const [project, persona] = await Promise.all([
    repo.getProject(projectId, preference),
    repo.getPersona(personaId, preference),
  ]);
  if (!project || !persona || persona.projectId !== project.id) notFound();

  const lang = preference ?? langFromProject(project);
  const projectSources = await repo.listSources(projectId, lang);

  // Only source names the persona actually references are exposed to the client.
  const referenced = new Set<string>(persona.sourceIds);
  for (const section of [...persona.commonSections, ...persona.domainSections]) {
    for (const s of section.statements) {
      for (const id of s.sourceIds) referenced.add(id);
    }
  }
  const sourceNames: Record<string, string> = {};
  for (const source of projectSources) {
    if (referenced.has(source.id)) sourceNames[source.id] = source.name;
  }

  const viewModel: PersonaChatViewModel = {
    projectId: project.id,
    personaId: persona.id,
    name: persona.name,
    archetype: persona.archetype,
    portraitUrl: persona.portraitUrl,
    confidenceLevel: persona.confidenceLevel,
    confidenceExplanation: persona.confidenceExplanation,
    sourceNames,
    lang,
  };

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
          { label: lang === "fr" ? "Discussion" : "Chat" },
        ]}
      />
      <PersonaChat persona={viewModel} />
    </div>
  );
}
