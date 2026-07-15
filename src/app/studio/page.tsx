import { getRepository } from "@/lib/persona-studio/repository";
import { StudioNav } from "@/components/persona-studio/shared/studio-nav";
import { ProjectLibrary } from "@/components/persona-studio/projects/project-library";

export default async function StudioLibraryPage() {
  const repo = getRepository();
  const projects = await repo.listProjects();

  return (
    <>
      <StudioNav />
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
