import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Lightbulb,
  Presentation,
  StickyNote,
  UsersRound,
} from "lucide-react";
import { getRepository } from "@/lib/persona-studio/repository";
import { familyTheme } from "@/lib/persona-studio/utils/persona-view";
import { accentForFamily } from "@/lib/persona-studio/utils/family-theme";
import { langFromProject, tUI } from "@/lib/persona-studio/utils/i18n";
import { getLangPreference } from "@/lib/persona-studio/utils/lang-cookie";
import { tWorkshop } from "@/lib/persona-studio/utils/workshop-i18n";
import { parseCompareIds } from "@/lib/persona-studio/utils/persona-compare";
import { StudioNav } from "@/components/persona-studio/shared/studio-nav";
import { SessionPersonaPicker } from "@/components/persona-studio/workshop/session-persona-picker";

const STEPS = [
  {
    id: "challenge",
    titleKey: "challenge" as const,
    descKey: "challengeDesc" as const,
    icon: Lightbulb,
    href: (projectId: string, ids: string) =>
      `/studio/projects/${projectId}/challenge${ids ? `?ids=${ids}` : ""}`,
  },
  {
    id: "present",
    titleKey: "present" as const,
    descKey: "presentDesc" as const,
    icon: Presentation,
    href: (projectId: string, ids: string) =>
      `/studio/projects/${projectId}/present${ids ? `?ids=${ids}` : ""}`,
  },
  {
    id: "compare",
    titleKey: "compare" as const,
    descKey: "compareDesc" as const,
    icon: UsersRound,
    href: (projectId: string, ids: string) =>
      `/studio/projects/${projectId}/compare${ids ? `?ids=${ids}` : ""}`,
  },
  {
    id: "board",
    titleKey: "workshopBoard" as const,
    descKey: "workshopBoardDesc" as const,
    icon: StickyNote,
    href: (projectId: string) => `/studio/projects/${projectId}/workshop`,
  },
] as const;

export default async function FacilitatorSessionPage({
  params,
  searchParams,
}: {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ ids?: string; step?: string }>;
}) {
  const { projectId } = await params;
  const { ids: rawIds, step: rawStep } = await searchParams;
  const repo = getRepository();
  const preference = await getLangPreference();
  const project = await repo.getProject(projectId, preference);
  if (!project) notFound();

  const lang = preference ?? langFromProject(project);
  const personas = await repo.listPersonas(projectId, lang);
  const selectedIds = parseCompareIds(rawIds);
  const idsQuery = selectedIds.join(",");
  const found = STEPS.findIndex((s) => s.id === rawStep);
  const stepIndex = found === -1 ? 0 : found;
  const current = STEPS[stepIndex];
  const next = STEPS[Math.min(stepIndex + 1, STEPS.length - 1)];
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
          { label: tWorkshop(lang, "sessionTitle") },
        ]}
      />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-10 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--studio-accent)]">
          {tWorkshop(lang, "sessionStep")} {stepIndex + 1}{" "}
          {tWorkshop(lang, "sessionOf")} {STEPS.length}
        </p>
        <h1 className="studio-display mt-2 text-3xl font-bold text-[var(--studio-ink)] sm:text-4xl">
          {tWorkshop(lang, "sessionTitle")}
        </h1>
        <p className="mt-3 text-[var(--studio-muted)]">
          {tWorkshop(lang, "sessionIntro")}
        </p>
        <p className="mt-2 text-xs text-[var(--studio-muted)]">
          {tWorkshop(lang, "sessionLocalNote")}
        </p>

        <SessionPersonaPicker
          projectId={project.id}
          personas={personas.map((p) => ({ id: p.id, name: p.name }))}
          selectedIds={selectedIds}
          lang={lang}
          className="mt-8"
        />

        <ol className="mt-10 space-y-3">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const active = step.id === current.id;
            return (
              <li key={step.id}>
                <Link
                  href={`/studio/projects/${project.id}/session?step=${step.id}${idsQuery ? `&ids=${idsQuery}` : ""}`}
                  className={`flex items-start gap-4 rounded-2xl border p-4 transition-colors ${
                    active
                      ? "border-[var(--studio-accent)] bg-[var(--studio-panel)]"
                      : "border-[var(--studio-line)] hover:border-[var(--studio-accent)]"
                  }`}
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--studio-ink)] text-sm font-semibold tabular-nums text-[var(--studio-paper)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <Icon className="size-4 text-[var(--studio-accent)]" />
                      <span className="studio-display font-semibold text-[var(--studio-ink)]">
                        {tWorkshop(lang, step.titleKey)}
                      </span>
                    </span>
                    <span className="mt-1 block text-sm text-[var(--studio-muted)]">
                      {tWorkshop(lang, step.descKey)}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={current.href(project.id, idsQuery)}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--studio-ink)] px-5 py-2.5 text-sm font-medium text-[var(--studio-paper)]"
          >
            {tWorkshop(lang, "sessionOpen")}: {tWorkshop(lang, current.titleKey)}
            <ArrowRight className="size-4" />
          </Link>
          {next.id !== current.id ? (
            <Link
              href={`/studio/projects/${project.id}/session?step=${next.id}${idsQuery ? `&ids=${idsQuery}` : ""}`}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--studio-line)] px-5 py-2.5 text-sm font-medium text-[var(--studio-ink)]"
            >
              {tWorkshop(lang, "sessionNext")}
            </Link>
          ) : null}
          <Link
            href={`/studio/projects/${project.id}`}
            className="inline-flex items-center px-3 py-2.5 text-sm text-[var(--studio-muted)] hover:text-[var(--studio-ink)]"
          >
            {tUI(lang, "back")}
          </Link>
        </div>
      </main>
    </div>
  );
}
