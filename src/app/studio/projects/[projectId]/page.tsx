import { notFound } from "next/navigation";
import Link from "next/link";
import { FileText, Route, Users } from "lucide-react";
import { getRepository } from "@/lib/persona-studio/repository";
import { familyLabel, familyTheme } from "@/lib/persona-studio/utils/persona-view";
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

  return (
    <div
      data-studio-theme={familyTheme(project.family)}
      style={{ ["--persona-accent" as string]: accent }}
    >
      <StudioNav crumbs={[{ label: project.name }]} />
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6">
        <header className="border-b border-[var(--studio-line)] pb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full studio-accent-soft px-2.5 py-1 text-xs font-medium">
            {familyLabel(project.family)}
          </span>
          <h1 className="studio-display mt-3 text-4xl font-bold leading-tight text-[var(--studio-ink)] sm:text-5xl">
            {project.name}
          </h1>
          <p className="mt-2 max-w-2xl text-lg text-[var(--studio-muted)]">
            {project.description}
          </p>

          <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <Meta label="Client" value={project.client} />
            <Meta label="Segment" value={project.segment} />
            <Meta label="Region" value={project.region} />
            <Meta label="Language" value={project.language} />
            <Meta
              label="Research mode"
              value={
                project.researchMode === "RESEARCH_GROUNDED"
                  ? "Research-grounded"
                  : "Proto-persona"
              }
            />
          </dl>
        </header>

        <section className="mt-8" aria-label="Personas">
          <div className="mb-4 flex items-center gap-2">
            <Users aria-hidden className="size-4 text-[var(--studio-accent)]" />
            <h2 className="studio-display text-lg font-semibold text-[var(--studio-ink)]">
              {personas.length} personas
            </h2>
            <Link
              href={`/studio/projects/${project.id}/personas`}
              className="ml-auto text-sm font-medium text-[var(--studio-accent)] hover:underline"
            >
              Open gallery
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {personas.map((persona) => (
              <PersonaGalleryCard
                key={persona.id}
                persona={persona}
                projectId={project.id}
              />
            ))}
          </div>
        </section>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Panel icon={<FileText className="size-4" />} title="Sources">
            {sources.length === 0 ? (
              <p className="text-sm text-[var(--studio-muted)]">No sources yet.</p>
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

          <Panel icon={<Route className="size-4" />} title="Journeys">
            {journeys.length === 0 ? (
              <p className="text-sm text-[var(--studio-muted)]">
                No journeys yet.
              </p>
            ) : (
              <ul className="space-y-2">
                {journeys.map((j) => (
                  <li key={j.id} className="text-sm">
                    <span className="text-[var(--studio-ink)]">{j.name}</span>
                    <span className="text-[var(--studio-muted)]">
                      {" "}
                      · {j.steps.length} steps
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
