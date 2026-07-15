import type { Metadata } from "next";
import { LayoutTemplate } from "lucide-react";
import { getRepository } from "@/lib/persona-studio/repository";
import { tFamily, tSectionType } from "@/lib/persona-studio/utils/i18n";
import { familyTheme } from "@/lib/persona-studio/utils/persona-view";
import { StudioNav } from "@/components/persona-studio/shared/studio-nav";

export const metadata: Metadata = {
  title: "Templates — Persona Studio",
};

export default async function TemplatesPage() {
  const templates = await getRepository().listTemplates();

  return (
    <>
      <StudioNav crumbs={[{ label: "Templates" }]} />
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-8 sm:px-6">
        <div className="flex items-center gap-2">
          <LayoutTemplate className="size-5 text-[var(--studio-accent)]" />
          <h1 className="studio-display text-2xl font-bold text-[var(--studio-ink)]">
            Persona templates
          </h1>
        </div>
        <p className="mt-1 max-w-2xl text-[var(--studio-muted)]">
          Templates define the sections a persona family carries. They are how
          one product serves two families — and you can save your own from the
          editor.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {templates.map((t) => (
            <article
              key={t.id}
              data-studio-theme={familyTheme(t.family)}
              style={{ ["--persona-accent" as string]: t.accentColor }}
              className="rounded-3xl border border-[var(--studio-line)] p-6"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full studio-accent-soft px-2.5 py-1 text-xs font-medium">
                {tFamily("en", t.family)}
              </span>
              <h2 className="studio-display mt-3 text-xl font-semibold text-[var(--studio-ink)]">
                {t.name}
              </h2>
              {t.description && (
                <p className="mt-2 text-sm text-[var(--studio-muted)]">
                  {t.description}
                </p>
              )}
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[var(--studio-muted)]">
                {t.sections.length} sections
              </p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {t.sections
                  .slice()
                  .sort((a, b) => a.order - b.order)
                  .map((s) => (
                    <li
                      key={s.key}
                      className="rounded-full border border-[var(--studio-line)] px-2 py-0.5 text-xs text-[var(--studio-ink)]"
                      title={tSectionType("en", s.type)}
                    >
                      {s.title}
                    </li>
                  ))}
              </ul>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
