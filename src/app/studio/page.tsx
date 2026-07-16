import Link from "next/link";
import { LayoutTemplate, Plus } from "lucide-react";
import { getRepository } from "@/lib/persona-studio/repository";
import { getLangPreference } from "@/lib/persona-studio/utils/lang-cookie";
import { tUI } from "@/lib/persona-studio/utils/i18n";
import { StudioNav } from "@/components/persona-studio/shared/studio-nav";
import { ProjectLibrary } from "@/components/persona-studio/projects/project-library";

export default async function StudioLibraryPage() {
  const repo = getRepository();
  const lang = (await getLangPreference()) ?? "en";
  const projects = await repo.listProjects(lang);

  return (
    <>
      <StudioNav
        lang={lang}
        actions={
          <>
            <Link
              href="/studio/templates"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-[var(--studio-muted)] transition-colors hover:text-[var(--studio-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
            >
              <LayoutTemplate aria-hidden className="size-4" />
              {tUI(lang, "templates")}
            </Link>
            <Link
              href="/studio/projects/new"
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--studio-ink)] px-3.5 py-1.5 text-sm font-medium text-[var(--studio-paper)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
            >
              <Plus aria-hidden className="size-4" />
              {tUI(lang, "newProject")}
            </Link>
          </>
        }
      />
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--studio-accent)]">
          Persona Studio
        </p>
        <h1 className="studio-display mt-2 max-w-3xl text-4xl font-bold leading-[1.05] text-[var(--studio-ink)] sm:text-5xl">
          {tUI(lang, "heroTitle")}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-[var(--studio-muted)]">
          {tUI(lang, "heroSubtitle")}
        </p>

        <section className="mt-10" aria-label={tUI(lang, "projectLibrary")}>
          <ProjectLibrary projects={projects} lang={lang} />
        </section>
      </main>
    </>
  );
}
