import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRepository } from "@/lib/persona-studio/repository";
import { familyTheme, topStatements } from "@/lib/persona-studio/utils/persona-view";
import { accentForFamily } from "@/lib/persona-studio/utils/family-theme";
import { langFromProject } from "@/lib/persona-studio/utils/i18n";
import { getLangPreference } from "@/lib/persona-studio/utils/lang-cookie";
import { parseCompareIds } from "@/lib/persona-studio/utils/persona-compare";
import { tWorkshop } from "@/lib/persona-studio/utils/workshop-i18n";
import {
  PersonaPresenter,
  type PresentPersona,
} from "@/components/persona-studio/present/persona-presenter";

type Params = Promise<{ projectId: string }>;
type SearchParams = Promise<{ ids?: string | string[]; i?: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { projectId } = await params;
  const project = await getRepository().getProject(projectId);
  return {
    title: project
      ? `${tWorkshop(langFromProject(project), "presentTitle")} — ${project.name}`
      : "Persona Studio",
  };
}

export default async function PresentPage({
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
  const all = await repo.listPersonas(projectId, lang);
  const idFilter = parseCompareIds(sp.ids);
  const personas =
    idFilter.length > 0
      ? idFilter
          .map((id) => all.find((p) => p.id === id))
          .filter((p): p is NonNullable<typeof p> => Boolean(p))
      : all;

  const slides: PresentPersona[] = personas.map((p) => {
    const toValidate = [...p.commonSections, ...p.domainSections]
      .flatMap((s) => s.statements)
      .filter((s) => s.evidenceStatus === "TO_VALIDATE" || s.evidenceStatus === "ASSUMPTION")
      .slice(0, 6)
      .map((s) => s.content);

    return {
      id: p.id,
      name: p.name,
      archetype: p.archetype,
      oneLineEssence: p.oneLineEssence,
      quote: p.quote,
      quoteType: p.quoteType,
      accentColor: p.accentColor,
      portraitUrl: p.portraitUrl,
      confidenceLevel: p.confidenceLevel,
      confidenceExplanation: p.confidenceExplanation,
      behaviouralTags: p.behaviouralTags,
      probeNotes: toValidate,
      topNeeds: topStatements(
        p,
        ["key_expectations", "needs", "workplace_expectations", "expectations"],
        3,
      ).map((s) => s.content),
      topFrustrations: topStatements(p, ["frustrations", "pains"], 3).map(
        (s) => s.content,
      ),
    };
  });

  const initialIndex = Math.max(0, Number.parseInt(sp.i ?? "0", 10) || 0);
  const accent = accentForFamily(project.family);

  return (
    <div
      data-studio-theme={familyTheme(project.family)}
      style={{ ["--persona-accent" as string]: accent }}
    >
      <PersonaPresenter
        projectId={project.id}
        personas={slides}
        lang={lang}
        initialIndex={initialIndex}
      />
    </div>
  );
}
