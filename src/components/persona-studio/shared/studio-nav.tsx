import Link from "next/link";
import { BookOpen, ChevronRight, Waypoints } from "lucide-react";
import { cn } from "@/lib/utils";
import { tUI, type StudioLang } from "@/lib/persona-studio/utils/i18n";
import { tWorkshop } from "@/lib/persona-studio/utils/workshop-i18n";
import { LanguageToggle } from "./language-toggle";
import { WorkshopToolsStrip } from "@/components/persona-studio/workshop/workshop-tools-strip";

export type Crumb = { label: string; href?: string };

/**
 * Minimal, editorial top navigation for Persona Studio.
 * When `projectId` is set, workshop tools stay reachable from the header.
 */
export function StudioNav({
  crumbs = [],
  actions,
  lang,
  projectId,
  showWorkshopBar = false,
  showMethodLink = true,
}: {
  crumbs?: Crumb[];
  actions?: React.ReactNode;
  /** Current display language; renders the global FR/EN toggle when provided. */
  lang?: StudioLang;
  /** When set, exposes workshop tools for this project in the header. */
  projectId?: string;
  /** Show the compact workshop pill strip under the main nav. */
  showWorkshopBar?: boolean;
  /** Method link in the header (hide on dense persona sheets). */
  showMethodLink?: boolean;
}) {
  const showBar = Boolean(projectId && lang && showWorkshopBar);

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--studio-line)] bg-[var(--studio-paper)]/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Link
          href="/studio"
          className="flex items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
        >
          <span aria-hidden className="size-2.5 rounded-full studio-accent-bar" />
          <span className="studio-display text-sm font-semibold tracking-tight text-[var(--studio-ink)]">
            Persona Studio
          </span>
        </Link>

        {crumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="flex min-w-0 items-center gap-1 text-sm text-[var(--studio-muted)]"
          >
            {crumbs.map((c, i) => (
              <span key={i} className="flex min-w-0 items-center gap-1">
                <ChevronRight aria-hidden className="size-3.5 shrink-0" />
                {c.href ? (
                  <Link
                    href={c.href}
                    className={cn(
                      "truncate rounded hover:text-[var(--studio-ink)]",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]",
                    )}
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span className="truncate text-[var(--studio-ink)]">
                    {c.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}

        <div className="ml-auto flex items-center gap-2">
          {lang && projectId ? (
            <Link
              href={`/studio/projects/${projectId}/session`}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--studio-line)] px-3 py-1.5 text-sm font-medium text-[var(--studio-ink)] transition-colors hover:border-[var(--studio-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
            >
              <Waypoints aria-hidden className="size-4 text-[var(--studio-accent)]" />
              <span className="hidden sm:inline">
                {tWorkshop(lang, "workshopTools")}
              </span>
            </Link>
          ) : null}
          {lang && showMethodLink ? (
            <Link
              href="/studio/method"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-[var(--studio-muted)] transition-colors hover:text-[var(--studio-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
            >
              <BookOpen aria-hidden className="size-4" />
              <span className="hidden sm:inline">{tUI(lang, "methodNav")}</span>
            </Link>
          ) : null}
          {actions}
          {lang && <LanguageToggle current={lang} />}
        </div>
      </div>

      {showBar && projectId && lang ? (
        <div className="border-t border-[var(--studio-line)]">
          <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto px-4 py-2.5 sm:px-6">
            <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--studio-muted)]">
              {tWorkshop(lang, "workshopTools")}
            </span>
            <WorkshopToolsStrip
              projectId={projectId}
              lang={lang}
              variant="compact"
              id="workshop-tools-nav"
            />
          </div>
        </div>
      ) : null}
    </header>
  );
}
