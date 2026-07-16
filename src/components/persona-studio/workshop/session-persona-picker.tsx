"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { tWorkshop } from "@/lib/persona-studio/utils/workshop-i18n";
import type { StudioLang } from "@/lib/persona-studio/utils/i18n";

export function SessionPersonaPicker({
  projectId,
  personas,
  selectedIds,
  lang = "en",
  className,
}: {
  projectId: string;
  personas: { id: string; name: string }[];
  selectedIds: string[];
  lang?: StudioLang;
  className?: string;
}) {
  const router = useRouter();
  const selected = new Set(selectedIds);

  function toggle(id: string) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    const ids = [...next].join(",");
    const params = new URLSearchParams(window.location.search);
    if (ids) params.set("ids", ids);
    else params.delete("ids");
    const qs = params.toString();
    router.push(
      `/studio/projects/${projectId}/session${qs ? `?${qs}` : ""}`,
    );
  }

  return (
    <section
      className={cn(className)}
      aria-label={tWorkshop(lang, "sessionPersonas")}
    >
      <h2 className="studio-display text-sm font-semibold uppercase tracking-wider text-[var(--studio-ink)]">
        {tWorkshop(lang, "sessionPersonas")}
      </h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {personas.map((p) => {
          const on = selected.has(p.id);
          return (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => toggle(p.id)}
                aria-pressed={on}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm transition-colors",
                  on
                    ? "border-[var(--studio-accent)] bg-[var(--studio-accent)] text-white"
                    : "border-[var(--studio-line)] text-[var(--studio-ink)] hover:border-[var(--studio-accent)]",
                )}
              >
                {p.name}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
