import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getRepository } from "@/lib/persona-studio/repository";
import { familyTheme } from "@/lib/persona-studio/utils/persona-view";
import { accentForFamily } from "@/lib/persona-studio/utils/family-theme";
import { langFromProject } from "@/lib/persona-studio/utils/i18n";
import { getLangPreference } from "@/lib/persona-studio/utils/lang-cookie";
import { parseCompareIds } from "@/lib/persona-studio/utils/persona-compare";
import { tWorkshop } from "@/lib/persona-studio/utils/workshop-i18n";
import { StudioNav } from "@/components/persona-studio/shared/studio-nav";
import { IdeaChallengeForm } from "@/components/persona-studio/challenge/idea-challenge-form";

type Params = Promise<{ projectId: string }>;
type SearchParams = Promise<{ ids?: string | string[] }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { projectId } = await params;
  const project = await getRepository().getProject(projectId);
  return {
    title: project
      ? `${tWorkshop(langFromProject(project), "challengeTitle")} — ${project.name}`
      : "Persona Studio",
  };
}

export default async function ChallengePage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { projectId } = await params;
  const sp = await searchParams;
  const repo = getRepository();
  const preference = await getLangPreference();
  const project = await repo.getProject(projectId, preference);
  if (!project) notFound();

  const lang = preference ?? langFromProject(project);
  const personas = await repo.listPersonas(projectId, lang);
  const initialSelectedIds = parseCompareIds(sp.ids).filter((id) =>
    personas.some((p) => p.id === id),
  );

  const accent = accentForFamily(project.family);

  return (
    <div
      data-studio-theme={familyTheme(project.family)}
      style={{ ["--persona-accent" as string]: accent }}
    >
      <StudioNav
        lang={lang}
        crumbs={[
          { label: project.name, href: `/studio/projects/${project.id}` },
          { label: tWorkshop(lang, "challengeTitle") },
        ]}
        actions={
          <Link
            href={`/studio/projects/${project.id}`}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-[var(--studio-muted)] transition-colors hover:text-[var(--studio-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
          >
            <ArrowLeft aria-hidden className="size-4" />
            {tWorkshop(lang, "backToProject")}
          </Link>
        }
      />
      <main className="mx-auto max-w-4xl px-4 pb-24 pt-8 sm:px-6">
        <header className="mb-8 border-b border-[var(--studio-line)] pb-6">
          <h1 className="studio-display text-3xl font-bold text-[var(--studio-ink)] sm:text-4xl">
            {tWorkshop(lang, "challengeTitle")}
          </h1>
        </header>
        <IdeaChallengeForm
          projectId={project.id}
          personas={personas.map((p) => ({
            id: p.id,
            name: p.name,
            archetype: p.archetype,
            accentColor: p.accentColor,
          }))}
          initialSelectedIds={
            initialSelectedIds.length > 0
              ? initialSelectedIds
              : personas.map((p) => p.id)
          }
          lang={lang}
        />
      </main>
    </div>
  );
}
