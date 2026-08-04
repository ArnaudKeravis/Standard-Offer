import Link from "next/link";
import {
  Lightbulb,
  Presentation,
  StickyNote,
  UsersRound,
  Waypoints,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { StudioLang } from "@/lib/persona-studio/utils/i18n";
import { tWorkshop } from "@/lib/persona-studio/utils/workshop-i18n";

export type WorkshopToolId =
  | "session"
  | "compare"
  | "present"
  | "challenge"
  | "board";

/**
 * Workshop tools strip — facilitator surfaces for a project.
 * Used near the top of area pages and as a compact nav affordance.
 */
export function WorkshopToolsStrip({
  projectId,
  lang,
  variant = "cards",
  className,
  id = "workshop-tools",
}: {
  projectId: string;
  lang: StudioLang;
  variant?: "cards" | "compact";
  className?: string;
  id?: string;
}) {
  const base = `/studio/projects/${projectId}`;
  const tools: {
    id: WorkshopToolId;
    href: string;
    icon: React.ReactNode;
    title: string;
    description: string;
  }[] = [
    {
      id: "session",
      href: `${base}/session`,
      icon: <Waypoints className="size-4" />,
      title: tWorkshop(lang, "facilitatorSession"),
      description: tWorkshop(lang, "facilitatorSessionDesc"),
    },
    {
      id: "compare",
      href: `${base}/compare`,
      icon: <UsersRound className="size-4" />,
      title: tWorkshop(lang, "compare"),
      description: tWorkshop(lang, "compareDesc"),
    },
    {
      id: "present",
      href: `${base}/present`,
      icon: <Presentation className="size-4" />,
      title: tWorkshop(lang, "present"),
      description: tWorkshop(lang, "presentDesc"),
    },
    {
      id: "challenge",
      href: `${base}/challenge`,
      icon: <Lightbulb className="size-4" />,
      title: tWorkshop(lang, "challenge"),
      description: tWorkshop(lang, "challengeDesc"),
    },
    {
      id: "board",
      href: `${base}/workshop`,
      icon: <StickyNote className="size-4" />,
      title: tWorkshop(lang, "workshopBoard"),
      description: tWorkshop(lang, "workshopBoardDesc"),
    },
  ];

  if (variant === "compact") {
    return (
      <nav
        id={id}
        aria-label={tWorkshop(lang, "workshopTools")}
        className={cn(
          "flex flex-wrap items-center gap-1.5",
          className,
        )}
      >
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href}
            title={tool.description}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--studio-line)] bg-[var(--studio-paper)] px-3 py-1.5 text-xs font-medium text-[var(--studio-ink)] transition-colors hover:border-[var(--studio-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
          >
            <span className="text-[var(--studio-accent)]">{tool.icon}</span>
            {tool.title}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("scroll-mt-24", className)}
    >
      <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2
            id={`${id}-title`}
            className="studio-display text-lg font-semibold text-[var(--studio-ink)] sm:text-xl"
          >
            {tWorkshop(lang, "workshopTools")}
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-[var(--studio-muted)]">
            {tWorkshop(lang, "workshopToolsIntro")}
          </p>
        </div>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {tools.map((tool) => (
          <li key={tool.id}>
            <Link
              href={tool.href}
              className="flex h-full flex-col rounded-3xl border border-[var(--studio-line)] bg-[var(--studio-paper)] p-5 transition-colors hover:border-[var(--studio-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
            >
              <span className="text-[var(--studio-accent)]">{tool.icon}</span>
              <span className="studio-display mt-3 text-sm font-semibold text-[var(--studio-ink)]">
                {tool.title}
              </span>
              <span className="mt-1 text-xs leading-relaxed text-[var(--studio-muted)]">
                {tool.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
