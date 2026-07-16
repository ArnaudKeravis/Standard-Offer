"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  MessageCircle,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ConfidenceLevel } from "@/lib/persona-studio/ai/schemas/common";
import type { StudioLang } from "@/lib/persona-studio/utils/i18n";
import { tWorkshop } from "@/lib/persona-studio/utils/workshop-i18n";
import { PersonaPortrait } from "@/components/persona-studio/shared/persona-portrait";
import { ConfidenceBadge } from "@/components/persona-studio/shared/confidence-badge";

export interface PresentPersona {
  id: string;
  name: string;
  archetype: string;
  oneLineEssence: string;
  quote: string;
  quoteType: string;
  accentColor: string;
  portraitUrl?: string;
  confidenceLevel: ConfidenceLevel;
  confidenceExplanation: string;
  behaviouralTags: string[];
  /** Open questions / to-validate statements for facilitator notes. */
  probeNotes: string[];
  topNeeds: string[];
  topFrustrations: string[];
}

/**
 * Full-screen presentation deck: one persona at a time, large type, keyboard
 * ←/→/Esc. Facilitator notes toggle. View Transitions are a progressive
 * enhancement when supported and motion is allowed.
 */
export function PersonaPresenter({
  projectId,
  personas,
  lang,
  initialIndex = 0,
}: {
  projectId: string;
  personas: PresentPersona[];
  lang: StudioLang;
  initialIndex?: number;
}) {
  const router = useRouter();
  const [index, setIndex] = useState(
    Math.min(Math.max(initialIndex, 0), Math.max(personas.length - 1, 0)),
  );
  const [showNotes, setShowNotes] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const go = useCallback(
    (next: number) => {
      if (personas.length === 0) return;
      const clamped = (next + personas.length) % personas.length;
      const apply = () => setIndex(clamped);
      const doc = document as Document & {
        startViewTransition?: (cb: () => void) => void;
      };
      if (!reduceMotion && typeof doc.startViewTransition === "function") {
        doc.startViewTransition(apply);
      } else {
        apply();
      }
    },
    [personas.length, reduceMotion],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(index + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(index - 1);
      } else if (e.key === "Escape") {
        e.preventDefault();
        router.push(`/studio/projects/${projectId}`);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, projectId, router]);

  if (personas.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--studio-paper)] p-8 text-[var(--studio-muted)]">
        {tWorkshop(lang, "needPersonas")}
      </div>
    );
  }

  const persona = personas[index];
  const idsQuery = personas.map((p) => p.id).join(",");

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-[var(--studio-paper)] text-[var(--studio-ink)]"
      style={{ ["--persona-accent" as string]: persona.accentColor }}
      role="region"
      aria-label={tWorkshop(lang, "presentTitle")}
    >
      <header className="flex shrink-0 items-center gap-3 border-b border-[var(--studio-line)] px-4 py-3 sm:px-6">
        <p className="studio-display text-sm font-semibold tracking-tight">
          {tWorkshop(lang, "presentTitle")}
        </p>
        <span className="text-sm tabular-nums text-[var(--studio-muted)]">
          {index + 1} {tWorkshop(lang, "personaOf")} {personas.length}
        </span>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowNotes((v) => !v)}
            aria-pressed={showNotes}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--studio-line)] px-3 py-1.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
          >
            {showNotes ? (
              <EyeOff aria-hidden className="size-4" />
            ) : (
              <Eye aria-hidden className="size-4" />
            )}
            {showNotes
              ? tWorkshop(lang, "hideNotes")
              : tWorkshop(lang, "showNotes")}
          </button>
          <Link
            href={`/studio/projects/${projectId}/compare?ids=${idsQuery}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--studio-line)] px-3 py-1.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
          >
            <Users aria-hidden className="size-4" />
            {tWorkshop(lang, "openCompare")}
          </Link>
          <Link
            href={`/studio/projects/${projectId}/personas/${persona.id}/chat`}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--studio-accent)] px-3 py-1.5 text-sm font-medium text-[var(--studio-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
          >
            <MessageCircle aria-hidden className="size-4" />
            {tWorkshop(lang, "askThisPersona")}
          </Link>
          <Link
            href={`/studio/projects/${projectId}`}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-[var(--studio-muted)] hover:text-[var(--studio-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
          >
            <X aria-hidden className="size-4" />
            {tWorkshop(lang, "exitPresent")}
          </Link>
        </div>
      </header>

      <main
        className={cn(
          "relative mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center overflow-y-auto px-6 py-8 sm:aspect-video sm:max-h-[calc(100vh-7.5rem)] sm:px-12 lg:px-16",
          !reduceMotion && "motion-safe:transition-opacity",
        )}
        style={
          !reduceMotion
            ? ({ viewTransitionName: "persona-slide" } as React.CSSProperties)
            : undefined
        }
      >
        <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[minmax(12rem,22vw)_1fr] lg:items-center">
          <PersonaPortrait
            name={persona.name}
            src={persona.portraitUrl}
            className="aspect-[4/5] w-40 sm:w-48 lg:w-full lg:max-w-[18rem]"
            sizes="(max-width: 1024px) 192px, 22vw"
          />
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--studio-muted)]">
              {persona.archetype}
            </p>
            <h1 className="studio-display mt-2 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[clamp(3.5rem,6vw,5.5rem)]">
              {persona.name}
            </h1>
            <p className="mt-4 max-w-3xl text-xl leading-relaxed text-[var(--studio-muted)] sm:text-2xl lg:text-[1.65rem]">
              {persona.oneLineEssence}
            </p>
            {persona.quote && persona.quoteType !== "NONE" && (
              <blockquote className="mt-8 border-l-4 border-[var(--studio-accent)] pl-5 text-2xl italic leading-snug text-[var(--studio-ink)] sm:text-3xl">
                “{persona.quote}”
              </blockquote>
            )}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <ConfidenceBadge level={persona.confidenceLevel} lang={lang} />
              {persona.behaviouralTags.slice(0, 5).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--studio-line)] px-3 py-1 text-sm text-[var(--studio-muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Link
              href={`/studio/projects/${projectId}/personas/${persona.id}/chat`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--studio-accent)] px-6 py-3 text-base font-semibold text-white shadow-[var(--studio-shadow-soft)] transition-opacity hover:opacity-90"
            >
              <MessageCircle aria-hidden className="size-5" />
              {tWorkshop(lang, "askThisPersona")}
            </Link>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <ProbeList
                title={tWorkshop(lang, "dimensionNeeds")}
                items={persona.topNeeds}
              />
              <ProbeList
                title={tWorkshop(lang, "dimensionFrustrations")}
                items={persona.topFrustrations}
              />
            </div>
          </div>
        </div>

        {showNotes ? (
          <aside
            aria-label={tWorkshop(lang, "facilitatorNotes")}
            className="mx-auto mt-10 w-full max-w-5xl rounded-3xl border border-dashed border-[var(--studio-accent)] bg-[var(--studio-panel)] p-5"
          >
            <h2 className="studio-display text-sm font-semibold uppercase tracking-wider">
              {tWorkshop(lang, "facilitatorNotes")} — {tWorkshop(lang, "whatToProbe")}
            </h2>
            {persona.probeNotes.length === 0 ? (
              <p className="mt-2 text-sm text-[var(--studio-muted)]">
                {tWorkshop(lang, "noNotes")}
              </p>
            ) : (
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
                {persona.probeNotes.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            )}
            <p className="mt-3 text-xs text-[var(--studio-muted)]">
              {persona.confidenceExplanation}
            </p>
          </aside>
        ) : (
          <p className="mx-auto mt-8 text-center text-xs text-[var(--studio-muted)]">
            {tWorkshop(lang, "notesHidden")}
          </p>
        )}
      </main>

      <footer className="flex shrink-0 items-center justify-between border-t border-[var(--studio-line)] px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label={tWorkshop(lang, "prevPersona")}
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--studio-line)] px-4 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
        >
          <ChevronLeft aria-hidden className="size-4" />
          {tWorkshop(lang, "prevPersona")}
        </button>
        <p className="hidden text-xs text-[var(--studio-muted)] sm:block">
          {tWorkshop(lang, "keyboardHint")}
        </p>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label={tWorkshop(lang, "nextPersona")}
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--studio-line)] px-4 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
        >
          {tWorkshop(lang, "nextPersona")}
          <ChevronRight aria-hidden className="size-4" />
        </button>
      </footer>
    </div>
  );
}

function ProbeList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--studio-muted)]">
        {title}
      </h3>
      <ul className="mt-2 space-y-1.5 text-base leading-snug sm:text-lg">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span
              aria-hidden
              className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--studio-accent)]"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
