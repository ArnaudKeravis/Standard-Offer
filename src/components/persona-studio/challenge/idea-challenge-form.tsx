"use client";

import { useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { IdeaChallengeResponse } from "@/lib/persona-studio/ai/schemas/challenge";
import type { StudioLang } from "@/lib/persona-studio/utils/i18n";
import { tWorkshop } from "@/lib/persona-studio/utils/workshop-i18n";
import {
  deriveChallengeConflicts,
  fieldQuestionsPack,
} from "@/lib/persona-studio/utils/challenge-pack";
import { ConfidenceBadge } from "@/components/persona-studio/shared/confidence-badge";

export interface ChallengePersonaOption {
  id: string;
  name: string;
  archetype: string;
  accentColor: string;
}

type PackStage = "reactions" | "conflicts" | "questions";

/**
 * Challenge Pack — default workshop move.
 * Idea → multi-persona reactions → conflict synthesis → 3 field questions.
 */
export function IdeaChallengeForm({
  projectId,
  personas,
  initialSelectedIds,
  lang,
}: {
  projectId: string;
  personas: ChallengePersonaOption[];
  initialSelectedIds: string[];
  lang: StudioLang;
}) {
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(initialSelectedIds),
  );
  const [ideaTitle, setIdeaTitle] = useState("");
  const [ideaDescription, setIdeaDescription] = useState("");
  const [journeyMoment, setJourneyMoment] = useState("");
  const [intendedBenefit, setIntendedBenefit] = useState("");
  const [operationalConstraints, setOperationalConstraints] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [packStage, setPackStage] = useState<PackStage>("reactions");
  const [result, setResult] = useState<{
    response: IdeaChallengeResponse;
    isMock: boolean;
  } | null>(null);

  const byId = new Map(personas.map((p) => [p.id, p]));

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function reset() {
    setResult(null);
    setError(null);
    setPackStage("reactions");
    setIdeaTitle("");
    setIdeaDescription("");
    setJourneyMoment("");
    setIntendedBenefit("");
    setOperationalConstraints("");
  }

  async function runChallenge(e: React.FormEvent) {
    e.preventDefault();
    if (!ideaTitle.trim()) {
      setError(tWorkshop(lang, "needIdeaTitle"));
      return;
    }
    if (selected.size === 0) {
      setError(tWorkshop(lang, "needPersonas"));
      return;
    }
    setError(null);
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/ai/challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          personaIds: [...selected],
          ideaTitle: ideaTitle.trim(),
          ideaDescription: ideaDescription.trim(),
          journeyMoment: journeyMoment.trim() || undefined,
          intendedBenefit: intendedBenefit.trim() || undefined,
          operationalConstraints: operationalConstraints.trim() || undefined,
          lang,
        }),
      });
      if (!res.ok) throw new Error("challenge failed");
      const data = (await res.json()) as {
        response: IdeaChallengeResponse;
        isMock: boolean;
      };
      setPackStage("reactions");
      setResult({ response: data.response, isMock: data.isMock });
    } catch {
      setError(tWorkshop(lang, "challengeError"));
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    const { response, isMock } = result;
    const conflicts = deriveChallengeConflicts(response);
    const questions = fieldQuestionsPack(response, 3);

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <p className="rounded-2xl border border-[var(--studio-line)] bg-[var(--studio-panel)] px-4 py-3 text-sm text-[var(--studio-muted)]">
            <span className="font-medium text-[var(--studio-ink)]">
              {tWorkshop(lang, "simulationNotTruth")}.
            </span>{" "}
            {tWorkshop(lang, "derivedNote")}
            {isMock && (
              <span className="ml-2 text-xs uppercase tracking-wide">(demo)</span>
            )}
          </p>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--studio-line)] px-3.5 py-1.5 text-sm"
          >
            <RotateCcw aria-hidden className="size-3.5" />
            {tWorkshop(lang, "reset")}
          </button>
        </div>

        <nav aria-label="Challenge pack" className="flex flex-wrap gap-2">
          {(
            [
              ["reactions", "packStepReactions"],
              ["conflicts", "packStepConflicts"],
              ["questions", "packStepQuestions"],
            ] as const
          ).map(([id, key]) => (
            <button
              key={id}
              type="button"
              onClick={() => setPackStage(id)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium",
                packStage === id
                  ? "border-[var(--studio-accent)] bg-[var(--studio-accent)] text-white"
                  : "border-[var(--studio-line)] text-[var(--studio-muted)]",
              )}
            >
              {tWorkshop(lang, key)}
            </button>
          ))}
        </nav>

        {packStage === "reactions" && (
          <section>
            <h2 className="studio-display text-sm font-semibold uppercase tracking-wider text-[var(--studio-ink)]">
              {tWorkshop(lang, "perPersonaReactions")}
            </h2>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              {response.reactions.map((r) => {
                const persona = byId.get(r.personaId);
                return (
                  <article
                    key={r.personaId}
                    className="rounded-3xl border border-[var(--studio-line)] bg-[var(--studio-paper)] p-5"
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <span
                        aria-hidden
                        className="size-2.5 rounded-full"
                        style={{
                          backgroundColor:
                            persona?.accentColor ?? "var(--studio-accent)",
                        }}
                      />
                      <h3 className="font-semibold text-[var(--studio-ink)]">
                        {persona?.name ?? r.personaId}
                      </h3>
                      <ConfidenceBadge
                        level={r.basis.confidence}
                        lang={lang}
                        className="ml-auto"
                      />
                    </div>
                    <Field label={tWorkshop(lang, "initialReaction")} value={r.initialReaction} />
                    <Field label={tWorkshop(lang, "perceivedBenefit")} value={r.perceivedBenefit} />
                    <Field label={tWorkshop(lang, "mainConcern")} value={r.mainConcern} />
                    <Field label={tWorkshop(lang, "rejectionTrigger")} value={r.rejectionTrigger} />
                  </article>
                );
              })}
            </div>
            <PackNav lang={lang} onNext={() => setPackStage("conflicts")} />
          </section>
        )}

        {packStage === "conflicts" && (
          <section className="space-y-6">
            <div className="rounded-3xl border border-[var(--studio-line)] bg-[var(--studio-paper)] p-6">
              <h2 className="studio-display text-sm font-semibold uppercase tracking-wider text-[var(--studio-ink)]">
                {tWorkshop(lang, "packConflictsTitle")}
              </h2>
              <p className="mt-2 text-sm text-[var(--studio-muted)]">
                {tWorkshop(lang, "packConflictsIntro")}
              </p>
              {conflicts.length === 0 ? (
                <p className="mt-4 text-sm text-[var(--studio-muted)]">
                  {tWorkshop(lang, "packNoConflicts")}
                </p>
              ) : (
                <ul className="mt-4 space-y-4">
                  {conflicts.map((c) => (
                    <li key={c.theme} className="rounded-2xl border border-[var(--studio-line)] p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--studio-accent)]">
                        {c.label}
                      </p>
                      <ul className="mt-2 space-y-2 text-sm">
                        {c.byPersona.map((entry) => (
                          <li key={entry.personaId}>
                            <span className="font-medium">
                              {byId.get(entry.personaId)?.name ?? entry.personaId}:
                            </span>{" "}
                            {entry.text}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="rounded-3xl border border-[var(--studio-line)] bg-[var(--studio-paper)] p-6">
              <div className="mb-3 flex items-center gap-2 text-[var(--studio-accent)]">
                <Sparkles aria-hidden className="size-4" />
                <h2 className="studio-display text-sm font-semibold uppercase tracking-wider text-[var(--studio-ink)]">
                  {tWorkshop(lang, "crossPersonaSynthesis")}
                </h2>
              </div>
              <StringList
                label={tWorkshop(lang, "universalStrengths")}
                items={response.synthesis.universalStrengths}
                empty={tWorkshop(lang, "none")}
              />
              <StringList
                label={tWorkshop(lang, "risks")}
                items={response.synthesis.risks}
                empty={tWorkshop(lang, "none")}
              />
              <Field
                label={tWorkshop(lang, "suggestedPrototype")}
                value={response.synthesis.suggestedPrototype}
              />
            </div>
            <PackNav
              lang={lang}
              onBack={() => setPackStage("reactions")}
              onNext={() => setPackStage("questions")}
            />
          </section>
        )}

        {packStage === "questions" && (
          <section className="rounded-3xl border border-[var(--studio-line)] bg-[var(--studio-paper)] p-6 sm:p-8">
            <h2 className="studio-display text-2xl font-bold text-[var(--studio-ink)]">
              {tWorkshop(lang, "packQuestionsTitle")}
            </h2>
            <p className="mt-2 text-sm text-[var(--studio-muted)]">
              {tWorkshop(lang, "packQuestionsIntro")}
            </p>
            {questions.length === 0 ? (
              <p className="mt-6 text-sm text-[var(--studio-muted)]">
                {tWorkshop(lang, "none")}
              </p>
            ) : (
              <ol className="mt-8 space-y-4">
                {questions.map((q, i) => (
                  <li
                    key={i}
                    className="flex gap-4 rounded-2xl border border-[var(--studio-line)] bg-[var(--studio-panel)]/50 p-5"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--studio-ink)] text-sm font-semibold tabular-nums text-[var(--studio-paper)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-base leading-relaxed text-[var(--studio-ink)]">{q}</p>
                  </li>
                ))}
              </ol>
            )}
            <PackNav lang={lang} onBack={() => setPackStage("conflicts")} />
          </section>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={runChallenge} className="space-y-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--studio-accent)]">
        {tWorkshop(lang, "packStepIdea")}
      </p>
      <p className="text-sm text-[var(--studio-muted)]">
        {tWorkshop(lang, "challengeIntro")}
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--studio-muted)]">
            {tWorkshop(lang, "ideaTitle")}
          </span>
          <input
            value={ideaTitle}
            onChange={(e) => setIdeaTitle(e.target.value)}
            placeholder={tWorkshop(lang, "ideaTitlePlaceholder")}
            className="mt-1 w-full rounded-2xl border border-[var(--studio-line)] bg-[var(--studio-paper)] px-3 py-2.5 text-sm"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--studio-muted)]">
            {tWorkshop(lang, "ideaDescription")}
          </span>
          <textarea
            value={ideaDescription}
            onChange={(e) => setIdeaDescription(e.target.value)}
            placeholder={tWorkshop(lang, "ideaDescriptionPlaceholder")}
            rows={3}
            className="mt-1 w-full rounded-2xl border border-[var(--studio-line)] bg-[var(--studio-paper)] px-3 py-2.5 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--studio-muted)]">
            {tWorkshop(lang, "journeyMoment")}
          </span>
          <input
            value={journeyMoment}
            onChange={(e) => setJourneyMoment(e.target.value)}
            placeholder={tWorkshop(lang, "journeyMomentPlaceholder")}
            className="mt-1 w-full rounded-2xl border border-[var(--studio-line)] bg-[var(--studio-paper)] px-3 py-2.5 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--studio-muted)]">
            {tWorkshop(lang, "intendedBenefit")}
          </span>
          <input
            value={intendedBenefit}
            onChange={(e) => setIntendedBenefit(e.target.value)}
            placeholder={tWorkshop(lang, "intendedBenefitPlaceholder")}
            className="mt-1 w-full rounded-2xl border border-[var(--studio-line)] bg-[var(--studio-paper)] px-3 py-2.5 text-sm"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--studio-muted)]">
            {tWorkshop(lang, "operationalConstraints")}
          </span>
          <input
            value={operationalConstraints}
            onChange={(e) => setOperationalConstraints(e.target.value)}
            placeholder={tWorkshop(lang, "operationalConstraintsPlaceholder")}
            className="mt-1 w-full rounded-2xl border border-[var(--studio-line)] bg-[var(--studio-paper)] px-3 py-2.5 text-sm"
          />
        </label>
      </div>
      <fieldset>
        <legend className="text-xs font-semibold uppercase tracking-wide text-[var(--studio-muted)]">
          {tWorkshop(lang, "evaluateAgainst")}
        </legend>
        <ul className="mt-2 flex flex-wrap gap-2">
          {personas.map((p) => {
            const isSelected = selected.has(p.id);
            return (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => toggle(p.id)}
                  aria-pressed={isSelected}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm",
                    isSelected
                      ? "border-[var(--studio-accent)] bg-[var(--studio-accent)] text-white"
                      : "border-[var(--studio-line)] text-[var(--studio-ink)]",
                  )}
                >
                  <span
                    aria-hidden
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: isSelected ? "#fff" : p.accentColor }}
                  />
                  {p.name}
                  {isSelected && <Check aria-hidden className="size-3.5" />}
                </button>
              </li>
            );
          })}
        </ul>
      </fieldset>
      {error && (
        <p className="text-sm text-rose-700" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-full bg-[var(--studio-ink)] px-5 py-2.5 text-sm font-medium text-[var(--studio-paper)] disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 aria-hidden className="size-4 animate-spin" />
            {tWorkshop(lang, "challenging")}
          </>
        ) : (
          <>
            <Sparkles aria-hidden className="size-4" />
            {tWorkshop(lang, "runChallenge")}
          </>
        )}
      </button>
    </form>
  );
}

function PackNav({
  lang,
  onBack,
  onNext,
}: {
  lang: StudioLang;
  onBack?: () => void;
  onNext?: () => void;
}) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--studio-line)] px-4 py-2 text-sm"
        >
          <ChevronLeft className="size-4" />
          {tWorkshop(lang, "packBack")}
        </button>
      ) : null}
      {onNext ? (
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--studio-ink)] px-4 py-2 text-sm font-medium text-[var(--studio-paper)]"
        >
          {tWorkshop(lang, "packNext")}
          <ChevronRight className="size-4" />
        </button>
      ) : null}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--studio-muted)]">
        {label}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-[var(--studio-ink)]">{value}</p>
    </div>
  );
}

function StringList({
  label,
  items,
  empty,
}: {
  label: string;
  items: string[];
  empty: string;
}) {
  return (
    <div className="mt-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--studio-muted)]">
        {label}
      </p>
      {items.length === 0 ? (
        <p className="mt-1 text-sm text-[var(--studio-muted)]">{empty}</p>
      ) : (
        <ul className="mt-1 list-disc space-y-0.5 pl-4 text-sm">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
