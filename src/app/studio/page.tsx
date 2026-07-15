import Link from "next/link";
import { LayoutTemplate, Plus } from "lucide-react";
import { getRepository } from "@/lib/persona-studio/repository";
import { StudioNav } from "@/components/persona-studio/shared/studio-nav";
import { ProjectLibrary } from "@/components/persona-studio/projects/project-library";

export default async function StudioLibraryPage() {
  const repo = getRepository();
  const projects = await repo.listProjects();

  return (
    <>
      <StudioNav
        actions={
          <>
            <Link
              href="/studio/templates"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-[var(--studio-muted)] transition-colors hover:text-[var(--studio-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
            >
              <LayoutTemplate aria-hidden className="size-4" />
              Templates
            </Link>
            <Link
              href="/studio/projects/new"
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--studio-ink)] px-3.5 py-1.5 text-sm font-medium text-[var(--studio-paper)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
            >
              <Plus aria-hidden className="size-4" />
              New project
            </Link>
          </>
        }
      />
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--studio-accent)]">
          Persona Studio
        </p>
        <h1 className="studio-display mt-2 max-w-3xl text-4xl font-bold leading-[1.05] text-[var(--studio-ink)] sm:text-5xl">
          Create, understand and design with the people you serve.
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-[var(--studio-muted)]">
          Evidence-based personas for CoDesign workshops. Every statement is
          traceable, every confidence score is explained.
        </p>

        <section className="mt-10" aria-label="Project library">
          <ProjectLibrary projects={projects} />
        </section>
      </main>
    </>
  );
}
