import { notFound } from "next/navigation";
import Link from "next/link";
import { FileText, Plus, Route, Users } from "lucide-react";
import { getRepository } from "@/lib/persona-studio/repository";
import { familyTheme } from "@/lib/persona-studio/utils/persona-view";
import {
  langFromProject,
  tFamily,
  tResearchMode,
  tUI,
} from "@/lib/persona-studio/utils/i18n";
import {
  CORPORATE_TEMPLATE,
  TDF_TEMPLATE,
} from "@/lib/persona-studio/data/templates";
import { StudioNav } from "@/components/persona-studio/shared/studio-nav";
import { PersonaGalleryCard } from "@/components/persona-studio/personas/persona-gallery-card";

export default async function ProjectOverviewPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const repo = getRepository();
  const project = await repo.getProject(projectId);
  if (!project) notFound();

  const [personas, sources, journeys] = await Promise.all([
    repo.listPersonas(projectId),
    repo.listSources(projectId),
    repo.listJourneys(projectId),
  ]);

  const accent =
    project.family === "CORPORATE"
      ? CORPORATE_TEMPLATE.accentColor
      : TDF_TEMPLATE.accentColor;
  const lang = langFromProject(project);

  return (
    <div
      data-studio-theme={familyTheme(project.family)}
      style={{ ["--persona-accent" as string]: accent }}
    >
      <StudioNav
        crumbs={[{ label: project.name }]}
        actions={
          <>
            <Link
              href={`/studio/projects/${project.id}/sources`}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-[var(--studio-muted)] transition-colors hover:text-[var(--studio-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
            >
              <FileText aria-hidden className="size-4" />
              {tUI(lang, "manageSources")}
            </Link>
            <Link
              href={`/studio/projects/${project.id}/personas/new`}
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--studio-ink)] px-3.5 py-1.5 text-sm font-medium text-[var(--studio-paper)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
            >
              <Plus aria-hidden className="size-4" />
              {tUI(lang, "addPersona")}
            </Link>
          </>
        }
      />
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6">
        <header className="border-b border-[var(--studio-line)] pb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full studio-accent-soft px-2.5 py-1 text-xs font-medium">
            {tFamily(lang, project.family)}
          </span>
          <h1 className="studio-display mt-3 text-4xl font-bold leading-tight text-[var(--studio-ink)] sm:text-5xl">
            {project.name}
          </h1>
          <p className="mt-2 max-w-2xl text-lg text-[var(--studio-muted)]">
            {project.description}
          </p>

          <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <Meta label={tUI(lang, "client")} value={project.client} />
            <Meta label={tUI(lang, "segment")} value={project.segment} />
            <Meta label={tUI(lang, "region")} value={project.region} />
            <Meta label={tUI(lang, "language")} value={project.language} />
            <Meta
              label={tUI(lang, "researchMode")}
              value={tResearchMode(lang, project.researchMode)}
            />
          </dl>
        </header>

        <section className="mt-8" aria-label="Personas">
          <div className="mb-4 flex items-center gap-2">
            <Users aria-hidden className="size-4 text-[var(--studio-accent)]" />
            <h2 className="studio-display text-lg font-semibold text-[var(--studio-ink)]">
              {personas.length} {tUI(lang, "personas")}
            </h2>
            <Link
              href={`/studio/projects/${project.id}/personas`}
              className="ml-auto text-sm font-medium text-[var(--studio-accent)] hover:underline"
            >
              {tUI(lang, "openGallery")}
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {personas.map((persona) => (
              <PersonaGalleryCard
                key={persona.id}
                persona={persona}
                projectId={project.id}
                lang={lang}
              />
            ))}
          </div>
        </section>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Panel icon={<FileText className="size-4" />} title={tUI(lang, "sources")}>
            {sources.length === 0 ? (
              <p className="text-sm text-[var(--studio-muted)]">{tUI(lang, "noSources")}</p>
            ) : (
              <ul className="space-y-2">
                {sources.map((s) => (
                  <li
                    key={s.id}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span className="text-[var(--studio-ink)]">{s.name}</span>
                    <span className="text-xs uppercase tracking-wide text-[var(--studio-muted)]">
                      {s.confidentiality.replace(/_/g, " ")}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel icon={<Route className="size-4" />} title={tUI(lang, "journeys")}>
            {journeys.length === 0 ? (
              <p className="text-sm text-[var(--studio-muted)]">
                {tUI(lang, "noJourneys")}
              </p>
            ) : (
              <ul className="space-y-2">
                {journeys.map((j) => (
                  <li key={j.id} className="text-sm">
                    <span className="text-[var(--studio-ink)]">{j.name}</span>
                    <span className="text-[var(--studio-muted)]">
                      {" "}
                      · {j.steps.length} {tUI(lang, "steps")}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      </main>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-[var(--studio-muted)]">
        {label}
      </dt>
      <dd className="font-medium text-[var(--studio-ink)]">{value}</dd>
    </div>
  );
}

function Panel({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-[var(--studio-line)] bg-[var(--studio-paper)] p-6">
      <div className="mb-3 flex items-center gap-2 text-[var(--studio-accent)]">
        {icon}
        <h2 className="studio-display text-sm font-semibold uppercase tracking-wider text-[var(--studio-ink)]">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
