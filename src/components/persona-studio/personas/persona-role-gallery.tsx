"use client";

import { useMemo, useState } from "react";
import type { Persona } from "@/lib/persona-studio/ai/schemas/persona";
import type { StakeholderRole } from "@/lib/persona-studio/ai/schemas/common";
import { STAKEHOLDER_ROLES } from "@/lib/persona-studio/utils/stakeholder-role";
import { tUI, type StudioLang } from "@/lib/persona-studio/utils/i18n";
import { cn } from "@/lib/utils";
import { PersonaGalleryCard } from "@/components/persona-studio/personas/persona-gallery-card";

type FilterValue = "ALL" | StakeholderRole;

/**
 * Client / Operator / Consumer tab filter above the persona card grid.
 * Renders only roles that exist in the current list (plus All).
 */
export function PersonaRoleGallery({
  personas,
  projectId,
  lang,
}: {
  personas: Persona[];
  projectId: string;
  lang: StudioLang;
}) {
  const counts = useMemo(() => {
    const map: Record<StakeholderRole, number> = {
      CLIENT: 0,
      OPERATOR: 0,
      CONSUMER: 0,
    };
    for (const p of personas) {
      map[p.stakeholderRole ?? "CONSUMER"] += 1;
    }
    return map;
  }, [personas]);

  const availableRoles = STAKEHOLDER_ROLES.filter((role) => counts[role] > 0);
  const showFilter = availableRoles.length > 1;

  const [filter, setFilter] = useState<FilterValue>("ALL");

  const visible = useMemo(() => {
    if (filter === "ALL") return personas;
    return personas.filter(
      (p) => (p.stakeholderRole ?? "CONSUMER") === filter,
    );
  }, [personas, filter]);

  const activeFilter =
    filter === "ALL" || counts[filter] > 0 ? filter : "ALL";

  return (
    <div>
      {showFilter ? (
        <div
          role="tablist"
          aria-label={tUI(lang, "stakeholderFilter")}
          className="mb-5 flex flex-wrap gap-1 rounded-full border border-[var(--studio-line)] bg-[var(--studio-paper)] p-1"
        >
          <FilterTab
            active={activeFilter === "ALL"}
            label={tUI(lang, "stakeholderAll")}
            count={personas.length}
            onClick={() => setFilter("ALL")}
          />
          {availableRoles.map((role) => (
            <FilterTab
              key={role}
              active={activeFilter === role}
              label={tUI(lang, stakeholderLabelKey(role))}
              count={counts[role]}
              onClick={() => setFilter(role)}
            />
          ))}
        </div>
      ) : null}

      <div className="grid auto-rows-min gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((persona, i) => (
          <PersonaGalleryCard
            key={persona.id}
            persona={persona}
            projectId={projectId}
            lang={lang}
            staggerIndex={i}
          />
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-6 text-sm text-[var(--studio-muted)]">
          {tUI(lang, "stakeholderEmpty")}
        </p>
      ) : null}
    </div>
  );
}

function stakeholderLabelKey(
  role: StakeholderRole,
): "stakeholderClient" | "stakeholderOperator" | "stakeholderConsumer" {
  switch (role) {
    case "CLIENT":
      return "stakeholderClient";
    case "OPERATOR":
      return "stakeholderOperator";
    case "CONSUMER":
      return "stakeholderConsumer";
  }
}

function FilterTab({
  active,
  label,
  count,
  onClick,
}: {
  active: boolean;
  label: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]",
        active
          ? "bg-[var(--studio-ink)] text-[var(--studio-paper)]"
          : "text-[var(--studio-muted)] hover:text-[var(--studio-ink)]",
      )}
    >
      {label}
      <span
        className={cn(
          "rounded-full px-1.5 text-xs tabular-nums",
          active
            ? "bg-[var(--studio-paper)]/20 text-[var(--studio-paper)]"
            : "bg-[var(--studio-line)] text-[var(--studio-muted)]",
        )}
      >
        {count}
      </span>
    </button>
  );
}
