"use client";

import { useState } from "react";
import { Check, Loader2, RotateCcw, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IdeaChallengeResponse } from "@/lib/persona-studio/ai/schemas/challenge";
import type { StudioLang } from "@/lib/persona-studio/utils/i18n";
import { tWorkshop } from "@/lib/persona-studio/utils/workshop-i18n";
import { ConfidenceBadge } from "@/components/persona-studio/shared/confidence-badge";

export interface ChallengePersonaOption {
  id: string;
  name: string;
  archetype: string;
  accentColor: string;
}

/**
 * Client form for Idea Challenge. Posts to /api/ai/challenge; never imports
 * repository or AI providers.
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
      if (!res.ok) {
        throw new Error("challenge failed");
      }
      const data = (await res.json()) as {
        response: IdeaChallengeResponse;
        isMock: boolean;
      };
      setResult({ response: data.response, isMock: data.isMock });
    } catch {
      setError(tWorkshop(lang, "challengeError"));
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    const { response, isMock } = result;
    return (
      <div className="space-y-8">
        <div className="flex flex-wrap items-center gap-3">
          <p className="rounded-2xl border border-[var(--studio-line)] bg-[var(--studio-panel)] px-4 py-3 text-sm text-[var(--studio-muted)]">
            <span className="font-medium text-[var(--studio-ink)]">
              {tWorkshop(lang, "simulationNotTruth")}.
            </span>{" "}
            {tWorkshop(lang, "derivedNote")}
            {isMock && (
              <span className="ml-2 text-xs uppercase tracking-wide">
                (demo)
              </span>
            )}
          </p>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--studio-line)] px-3.5 py-1.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
          >
            <RotateCcw aria-hidden className="size-3.5" />
            {tWorkshop(lang, "reset")}
          </button>
        </div>

        <section aria-labelledby="reactions-title">
          <h2
            id="reactions-title"
            className="studio-display text-sm font-semibold uppercase tracking-wider text-[var(--studio-ink)]"
          >
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
                        backgroundColor: persona?.accentColor ?? "var(--studio-accent)",
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
                  <Field
                    label={tWorkshop(lang, "initialReaction")}
                    value={r.initialReaction}
                  />
                  <Field
                    label={tWorkshop(lang, "perceivedBenefit")}
                    value={r.perceivedBenefit}
                  />
                  <Field
                    label={tWorkshop(lang, "mainConcern")}
                    value={r.mainConcern}
                  />
                  <Field
                    label={tWorkshop(lang, "adoptionTrigger")}
                    value={r.adoptionTrigger}
                  />
                  <Field
                    label={tWorkshop(lang, "rejectionTrigger")}
                    value={r.rejectionTrigger}
                  />
                  <Field
                    label={tWorkshop(lang, "improvementRecommendation")}
                    value={r.improvementRecommendation}
                  />
                  <div className="mt-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--studio-muted)]">
                      {tWorkshop(lang, "missingInformation")}
                    </p>
                    {r.missingInformation.length === 0 ? (
                      <p className="mt-1 text-sm text-[var(--studio-muted)]">
                        {tWorkshop(lang, "none")}
                      </p>
                    ) : (
                      <ul className="mt-1 list-disc space-y-0.5 pl-4 text-sm">
                        {r.missingInformation.map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="mt-3 rounded-2xl bg-[var(--studio-panel)] px-3 py-2 text-xs text-[var(--studio-muted)]">
                    <p className="font-semibold uppercase tracking-wide">
                      {tWorkshop(lang, "evidenceBasis")}
                    </p>
                    <p className="mt-1">
                      statements: {r.basis.personaStatementIds.length || "—"} ·
                      sources: {r.basis.sourceIds.length || "—"}
                    </p>
                    {r.basis.evidenceExcerpts.slice(0, 2).map((ex, i) => (
                      <p key={i} className="mt-1 italic">
                        “{ex.excerpt}”
                      </p>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section
          aria-labelledby="synthesis-title"
          className="rounded-3xl border border-[var(--studio-line)] bg-[var(--studio-paper)] p-6"
        >
          <div className="mb-3 flex items-center gap-2 text-[var(--studio-accent)]">
            <Sparkles aria-hidden className="size-4" />
            <h2
              id="synthesis-title"
              className="studio-display text-sm font-semibold uppercase tracking-wider text-[var(--studio-ink)]"
            >
              {tWorkshop(lang, "crossPersonaSynthesis")}
            </h2>
          </div>
          <StringList
            label={tWorkshop(lang, "universalStrengths")}
            items={response.synthesis.universalStrengths}
            empty={tWorkshop(lang, "none")}
          />
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--studio-muted)]">
              {tWorkshop(lang, "personaSpecificBenefits")}
            </p>
            {response.synthesis.personaSpecificBenefits.length === 0 ? (
              <p className="mt-1 text-sm text-[var(--studio-muted)]">
                {tWorkshop(lang, "none")}
              </p>
            ) : (
              <ul className="mt-1 space-y-1 text-sm">
                {response.synthesis.personaSpecificBenefits.map((b) => (
                  <li key={b.personaId}>
                    <span className="font-medium">
                      {byId.get(b.personaId)?.name ?? b.personaId}:
                    </span>{" "}
                    {b.benefit}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <StringList
            label={tWorkshop(lang, "risks")}
            items={response.synthesis.risks}
            empty={tWorkshop(lang, "none")}
          />
          <StringList
            label={tWorkshop(lang, "questionsToTest")}
            items={response.synthesis.questionsToTest}
            empty={tWorkshop(lang, "none")}
          />
          <Field
            label={tWorkshop(lang, "suggestedPrototype")}
            value={response.synthesis.suggestedPrototype}
          />
        </section>
      </div>
    );
  }

  return (
    <form onSubmit={runChallenge} className="space-y-6">
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
            className="mt-1 w-full rounded-2xl border border-[var(--studio-line)] bg-[var(--studio-paper)] px-3 py-2.5 text-sm text-[var(--studio-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
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
            className="mt-1 w-full rounded-2xl border border-[var(--studio-line)] bg-[var(--studio-paper)] px-3 py-2.5 text-sm text-[var(--studio-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
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
            className="mt-1 w-full rounded-2xl border border-[var(--studio-line)] bg-[var(--studio-paper)] px-3 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
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
            className="mt-1 w-full rounded-2xl border border-[var(--studio-line)] bg-[var(--studio-paper)] px-3 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
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
            className="mt-1 w-full rounded-2xl border border-[var(--studio-line)] bg-[var(--studio-paper)] px-3 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
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
                    "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]",
                    isSelected
                      ? "border-[var(--studio-accent)] bg-[var(--studio-accent)] text-white"
                      : "border-[var(--studio-line)] text-[var(--studio-ink)]",
                  )}
                >
                  <span
                    aria-hidden
                    className="size-2.5 rounded-full"
                    style={{
                      backgroundColor: isSelected ? "#fff" : p.accentColor,
                    }}
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
        className="inline-flex items-center gap-2 rounded-full bg-[var(--studio-ink)] px-5 py-2.5 text-sm font-medium text-[var(--studio-paper)] transition-opacity hover:opacity-90 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
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

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--studio-muted)]">
        {label}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-[var(--studio-ink)]">
        {value}
      </p>
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
