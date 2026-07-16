import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StudioLang } from "@/lib/persona-studio/utils/i18n";
import { LanguageToggle } from "./language-toggle";

export type Crumb = { label: string; href?: string };

/**
 * Minimal, editorial top navigation for Persona Studio. Deliberately quiet:
 * a wordmark, breadcrumbs, the FR/EN toggle and optional actions. No dashboard
 * chrome.
 */
export function StudioNav({
  crumbs = [],
  actions,
  lang,
}: {
  crumbs?: Crumb[];
  actions?: React.ReactNode;
  /** Current display language; renders the global FR/EN toggle when provided. */
  lang?: StudioLang;
}) {
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
          {actions}
          {lang && <LanguageToggle current={lang} />}
        </div>
      </div>
    </header>
  );
}
