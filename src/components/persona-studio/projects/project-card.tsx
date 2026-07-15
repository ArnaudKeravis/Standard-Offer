import Link from "next/link";
import { ArrowRight, FileText, Users } from "lucide-react";
import type { Project } from "@/lib/persona-studio/ai/schemas/project";
import { familyLabel, familyTheme } from "@/lib/persona-studio/utils/persona-view";
import { CORPORATE_TEMPLATE, TDF_TEMPLATE } from "@/lib/persona-studio/data/templates";

const STATUS_LABEL: Record<Project["status"], string> = {
  DRAFT: "Draft",
  IN_REVIEW: "In review",
  PUBLISHED: "Published",
  ARCHIVED: "Archived",
};

export function ProjectCard({ project }: { project: Project }) {
  const accent =
    project.family === "CORPORATE"
      ? CORPORATE_TEMPLATE.accentColor
      : TDF_TEMPLATE.accentColor;

  return (
    <Link
      href={`/studio/projects/${project.id}`}
      data-studio-theme={familyTheme(project.family)}
      style={{ ["--persona-accent" as string]: accent }}
      className="group flex flex-col rounded-3xl border border-[var(--studio-line)] bg-[var(--studio-paper)] p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full studio-accent-soft px-2.5 py-1 text-xs font-medium">
          {familyLabel(project.family)}
        </span>
        <span className="text-xs font-medium text-[var(--studio-muted)]">
          {STATUS_LABEL[project.status]}
        </span>
      </div>

      <h2 className="studio-display mt-4 text-xl font-semibold leading-tight text-[var(--studio-ink)]">
        {project.name}
      </h2>
      <p className="mt-1 text-sm text-[var(--studio-muted)]">{project.client}</p>

      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[var(--studio-ink)]/80">
        {project.description}
      </p>

      <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-[var(--studio-muted)]">
        <div className="flex items-center gap-1.5">
          <Users aria-hidden className="size-3.5" />
          <dt className="sr-only">Personas</dt>
          <dd>{project.personaCount} personas</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <FileText aria-hidden className="size-3.5" />
          <dt className="sr-only">Sources</dt>
          <dd>{project.sourceCount} sources</dd>
        </div>
        <div>
          <dt className="sr-only">Segment</dt>
          <dd>{project.segment}</dd>
        </div>
        <div>
          <dt className="sr-only">Region</dt>
          <dd>{project.region}</dd>
        </div>
      </dl>

      <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[var(--studio-accent)]">
        Open project
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}
