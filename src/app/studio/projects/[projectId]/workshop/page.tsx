import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getRepository } from "@/lib/persona-studio/repository";
import { familyTheme } from "@/lib/persona-studio/utils/persona-view";
import { accentForFamily } from "@/lib/persona-studio/utils/family-theme";
import { langFromProject } from "@/lib/persona-studio/utils/i18n";
import { getLangPreference } from "@/lib/persona-studio/utils/lang-cookie";
import { tWorkshop } from "@/lib/persona-studio/utils/workshop-i18n";
import { StudioNav } from "@/components/persona-studio/shared/studio-nav";
import { WorkshopBoard } from "@/components/persona-studio/workshop/workshop-board";

type Params = Promise<{ projectId: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { projectId } = await params;
  const project = await getRepository().getProject(projectId);
  return {
    title: project
      ? `${tWorkshop(langFromProject(project), "workshopTitle")} — ${project.name}`
      : "Persona Studio",
  };
}

export default async function WorkshopPage({
  params,
}: {
  params: Params;
}) {
  const { projectId } = await params;
  const repo = getRepository();
  const preference = await getLangPreference();
  const project = await repo.getProject(projectId, preference);
  if (!project) notFound();

  const lang = preference ?? langFromProject(project);
  const personas = await repo.listPersonas(projectId, lang);

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
          { label: tWorkshop(lang, "workshopTitle") },
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
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6">
        <header className="mb-8 border-b border-[var(--studio-line)] pb-6">
          <h1 className="studio-display text-3xl font-bold text-[var(--studio-ink)] sm:text-4xl">
            {tWorkshop(lang, "workshopTitle")}
          </h1>
        </header>
        <WorkshopBoard
          projectId={project.id}
          personas={personas.map((p) => ({
            id: p.id,
            name: p.name,
            accentColor: p.accentColor,
            statements: [...p.commonSections, ...p.domainSections]
              .flatMap((section) =>
                section.statements.map((st) => ({
                  id: st.id,
                  label:
                    (st.label?.trim() || st.content.slice(0, 72)) +
                    (st.content.length > 72 && !st.label ? "…" : ""),
                })),
              )
              .slice(0, 40),
          }))}
          lang={lang}
        />
      </main>
    </div>
  );
}
