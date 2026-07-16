import type { Metadata } from "next";
import Link from "next/link";
import {
  History,
  MessageCircle,
  Pencil,
  Presentation,
  UsersRound,
} from "lucide-react";
import { notFound } from "next/navigation";
import { getRepository } from "@/lib/persona-studio/repository";
import {
  canWriteStudio,
  isWriteGateEnabled,
} from "@/lib/persona-studio/auth/access";
import { familyTheme } from "@/lib/persona-studio/utils/persona-view";
import { langFromProject, tUI } from "@/lib/persona-studio/utils/i18n";
import { getLangPreference } from "@/lib/persona-studio/utils/lang-cookie";
import { tWorkshop } from "@/lib/persona-studio/utils/workshop-i18n";
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
  const preference = await getLangPreference();
  const [project, persona] = await Promise.all([
    repo.getProject(projectId, preference),
    repo.getPersona(personaId, preference),
  ]);
  if (!project || !persona || persona.projectId !== project.id) notFound();

  const lang = preference ?? langFromProject(project);
  const [allSources, peers] = await Promise.all([
    repo.listSources(projectId, lang),
    repo.listPersonas(projectId, lang),
  ]);
  const sources = allSources.filter((s) => persona.sourceIds.includes(s.id));
  const canWrite = await canWriteStudio();
  const gateOn = isWriteGateEnabled();

  return (
    <div
      data-studio-theme={familyTheme(persona.family)}
      style={{ ["--persona-accent" as string]: persona.accentColor }}
    >
      <StudioNav
        lang={lang}
        crumbs={[
          { label: tUI(lang, "areasCrumb"), href: "/studio" },
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
              href={`/studio/projects/${project.id}/compare?ids=${persona.id}`}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-[var(--studio-muted)] transition-colors hover:text-[var(--studio-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
            >
              <UsersRound aria-hidden className="size-4" />
              {tWorkshop(lang, "compare")}
            </Link>
            <Link
              href={`/studio/projects/${project.id}/present?ids=${persona.id}`}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-[var(--studio-muted)] transition-colors hover:text-[var(--studio-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
            >
              <Presentation aria-hidden className="size-4" />
              {tWorkshop(lang, "present")}
            </Link>
            <Link
              href={`/studio/projects/${project.id}/personas/${persona.id}/history`}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-[var(--studio-muted)] transition-colors hover:text-[var(--studio-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
            >
              <History aria-hidden className="size-4" />
              {tUI(lang, "history")}
            </Link>
            {canWrite ? (
              <Link
                href={`/studio/projects/${project.id}/personas/${persona.id}/edit`}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--studio-line)] px-3.5 py-1.5 text-sm font-medium text-[var(--studio-ink)] transition-colors hover:border-[var(--studio-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
              >
                <Pencil aria-hidden className="size-4" />
                {tUI(lang, "editPersona")}
              </Link>
            ) : gateOn ? (
              <Link
                href={`/studio/unlock?next=${encodeURIComponent(`/studio/projects/${project.id}/personas/${persona.id}/edit`)}`}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-[var(--studio-muted)]"
              >
                {tUI(lang, "unlockFacilitator")}
              </Link>
            ) : null}
            <Link
              href={`/studio/projects/${project.id}/personas/${persona.id}/chat`}
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--studio-accent)] px-3.5 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
            >
              <MessageCircle aria-hidden className="size-4" />
              {tWorkshop(lang, "askThisPersona")}
            </Link>
          </>
        }
      />
      <PersonaDetail
        persona={persona}
        peers={peers}
        sources={sources}
        lang={lang}
      />
    </div>
  );
}
