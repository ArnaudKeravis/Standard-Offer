"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Project } from "@/lib/persona-studio/ai/schemas/project";
import type { PersonaFamily } from "@/lib/persona-studio/ai/schemas/common";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./project-card";

type FamilyFilter = "ALL" | PersonaFamily;

const FILTERS: { id: FamilyFilter; label: string }[] = [
  { id: "ALL", label: "All" },
  { id: "CORPORATE", label: "Corporate" },
  { id: "SPORTS_HOSPITALITY", label: "Sports hospitality" },
];

/**
 * Client-side searchable / filterable project library. Data is fetched on the
 * server and passed in; this component only handles local interaction.
 */
export function ProjectLibrary({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState<FamilyFilter>("ALL");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (family !== "ALL" && p.family !== family) return false;
      if (!q) return true;
      return [p.name, p.client, p.segment, p.region, p.description]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [projects, query, family]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--studio-muted)]"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects and clients"
            aria-label="Search projects"
            className="w-full rounded-full border border-[var(--studio-line)] bg-[var(--studio-paper)] py-2 pl-9 pr-4 text-sm outline-none focus-visible:border-[var(--studio-accent)] focus-visible:ring-2 focus-visible:ring-[var(--studio-accent)]/30"
          />
        </div>

        <div className="flex items-center gap-1 rounded-full border border-[var(--studio-line)] p-1">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFamily(f.id)}
              aria-pressed={family === f.id}
              className={cn(
                "rounded-full px-3 py-1 text-sm transition-colors",
                family === f.id
                  ? "bg-[var(--studio-ink)] text-[var(--studio-paper)]"
                  : "text-[var(--studio-muted)] hover:text-[var(--studio-ink)]",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-[var(--studio-muted)]">
          No projects match your search.
        </p>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
