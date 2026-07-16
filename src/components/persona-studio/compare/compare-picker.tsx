"use client";

import { useRouter } from "next/navigation";
import { Check, Users, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StudioLang } from "@/lib/persona-studio/utils/i18n";
import { tWorkshop } from "@/lib/persona-studio/utils/workshop-i18n";
import { MAX_COMPARE, MIN_COMPARE } from "@/lib/persona-studio/utils/persona-compare";

export interface ComparePickerPersona {
  id: string;
  name: string;
  archetype: string;
  accentColor: string;
}

/**
 * The only interactive piece of the Compare feature: it toggles personas in the
 * selection and writes the choice back to the URL (`?ids=`) so the comparison
 * itself is deep-linkable and re-derived on the server. Selection is capped at
 * MAX_COMPARE and hints when the minimum is not yet met.
 */
export function ComparePicker({
  projectId,
  personas,
  selectedIds,
  lang,
}: {
  projectId: string;
  personas: ComparePickerPersona[];
  selectedIds: string[];
  lang: StudioLang;
}) {
  const router = useRouter();
  const selected = new Set(selectedIds);
  const atMax = selected.size >= MAX_COMPARE;

  function pushIds(ids: string[]) {
    const base = `/studio/projects/${projectId}/compare`;
    const query = ids.length ? `?ids=${ids.join(",")}` : "";
    router.push(`${base}${query}`, { scroll: false });
  }

  function toggle(id: string) {
    if (selected.has(id)) {
      pushIds(selectedIds.filter((x) => x !== id));
    } else if (!atMax) {
      pushIds([...selectedIds, id]);
    }
  }

  return (
    <section
      aria-label={tWorkshop(lang, "selectPersonas")}
      className="rounded-3xl border border-[var(--studio-line)] bg-[var(--studio-paper)] p-5"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Users aria-hidden className="size-4 text-[var(--studio-accent)]" />
        <h2 className="studio-display text-sm font-semibold uppercase tracking-wider text-[var(--studio-ink)]">
          {tWorkshop(lang, "selectPersonas")}
        </h2>
        <span className="text-xs tabular-nums text-[var(--studio-muted)]">
          {selected.size}/{MAX_COMPARE} {tWorkshop(lang, "selectedCount")}
        </span>
        {selected.size > 0 && (
          <button
            type="button"
            onClick={() => pushIds([])}
            className="ml-auto inline-flex items-center gap-1 rounded-full border border-[var(--studio-line)] px-2.5 py-1 text-xs text-[var(--studio-muted)] hover:text-[var(--studio-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
          >
            <X aria-hidden className="size-3" />
            {tWorkshop(lang, "clearSelection")}
          </button>
        )}
      </div>

      <ul className="flex flex-wrap gap-2">
        {personas.map((p) => {
          const isSelected = selected.has(p.id);
          const disabled = !isSelected && atMax;
          return (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => toggle(p.id)}
                aria-pressed={isSelected}
                disabled={disabled}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]",
                  isSelected
                    ? "border-[var(--studio-accent)] bg-[var(--studio-accent)] text-white"
                    : "border-[var(--studio-line)] bg-[var(--studio-paper)] text-[var(--studio-ink)] hover:border-[var(--studio-accent)]",
                  disabled && "cursor-not-allowed opacity-40",
                )}
              >
                <span
                  aria-hidden
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: isSelected ? "#fff" : p.accentColor }}
                />
                <span className="font-medium">{p.name}</span>
                <span
                  className={cn(
                    "hidden text-xs sm:inline",
                    isSelected ? "text-white/80" : "text-[var(--studio-muted)]",
                  )}
                >
                  {p.archetype}
                </span>
                {isSelected && <Check aria-hidden className="size-3.5" />}
              </button>
            </li>
          );
        })}
      </ul>

      {selected.size < MIN_COMPARE && (
        <p className="mt-3 text-xs text-[var(--studio-muted)]">
          {tWorkshop(lang, "compareMin")}
        </p>
      )}
    </section>
  );
}
