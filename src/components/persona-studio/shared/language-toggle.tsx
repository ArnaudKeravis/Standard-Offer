"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import type { StudioLang } from "@/lib/persona-studio/utils/i18n";
import { setStudioLanguage } from "@/app/studio/language-actions";

const OPTIONS: { value: StudioLang; label: string; aria: string }[] = [
  { value: "fr", label: "FR", aria: "Français" },
  { value: "en", label: "EN", aria: "English" },
];

/**
 * Accessible FR/EN segmented control.
 *
 * The only client component in the studio chrome. It persists the choice in a
 * cookie via a server action, then calls `router.refresh()` so all Server
 * Components re-render with content + labels in the chosen language. It never
 * imports the repository.
 *
 * A11y: real `<button>`s in a labelled group, `aria-pressed` marks the active
 * language (never colour-only), keyboard focusable with a visible focus ring.
 */
export function LanguageToggle({ current }: { current: StudioLang }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function choose(lang: StudioLang) {
    if (lang === current) return;
    startTransition(async () => {
      await setStudioLanguage(lang);
      router.refresh();
    });
  }

  return (
    <div
      role="group"
      aria-label="Language / Langue"
      className="inline-flex items-center rounded-full border border-[var(--studio-line)] p-0.5"
    >
      {OPTIONS.map((opt) => {
        const active = opt.value === current;
        return (
          <button
            key={opt.value}
            type="button"
            lang={opt.value}
            aria-pressed={active}
            aria-label={opt.aria}
            disabled={isPending}
            onClick={() => choose(opt.value)}
            className={cn(
              "min-w-9 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide transition-colors",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]",
              "disabled:cursor-progress",
              active
                ? "bg-[var(--studio-ink)] text-[var(--studio-paper)]"
                : "text-[var(--studio-muted)] hover:text-[var(--studio-ink)]",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
