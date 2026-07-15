import type { Metadata } from "next";
import Link from "next/link";
import { History, MessageCircle, Pencil } from "lucide-react";
import { notFound } from "next/navigation";
import { getRepository } from "@/lib/persona-studio/repository";
import { familyTheme } from "@/lib/persona-studio/utils/persona-view";
import { langFromProject, tUI } from "@/lib/persona-studio/utils/i18n";
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
          { label: persona.name },
        ]}
        actions={
          <>
            <Link
              href={`/studio/projects/${project.id}/personas/${persona.id}/history`}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-[var(--studio-muted)] transition-colors hover:text-[var(--studio-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
            >
              <History aria-hidden className="size-4" />
              {tUI(lang, "history")}
            </Link>
            <Link
              href={`/studio/projects/${project.id}/personas/${persona.id}/edit`}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--studio-line)] px-3.5 py-1.5 text-sm font-medium text-[var(--studio-ink)] transition-colors hover:border-[var(--studio-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
            >
              <Pencil aria-hidden className="size-4" />
              {tUI(lang, "editPersona")}
            </Link>
            <Link
              href={`/studio/projects/${project.id}/personas/${persona.id}/chat`}
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--studio-accent)] px-3.5 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
            >
              <MessageCircle aria-hidden className="size-4" />
              {lang === "fr" ? "Parler à ce persona" : "Ask this persona"}
            </Link>
          </>
        }
      />
      <PersonaDetail persona={persona} sources={sources} lang={lang} />
    </div>
  );
}
