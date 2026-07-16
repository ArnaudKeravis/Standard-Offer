import { cn } from "@/lib/utils";
import type { Persona } from "@/lib/persona-studio/ai/schemas/persona";
import {
  reviewPersona,
  summariseReview,
  type ReviewCategory,
} from "@/lib/persona-studio/utils/review";
import { computeDifferentiation } from "@/lib/persona-studio/utils/differentiation";
import { tUI, type StudioLang } from "@/lib/persona-studio/utils/i18n";

/**
 * Read-only anti-stereotype review + differentiation score on the persona sheet.
 * Rule-based — explainable for facilitators, never AI-generated judgments.
 */
export function PersonaAuditPanel({
  persona,
  peers,
  lang = "en",
  className,
}: {
  persona: Persona;
  peers: Persona[];
  lang?: StudioLang;
  className?: string;
}) {
  const review = reviewPersona(persona);
  const summary = summariseReview(review);
  const diff = computeDifferentiation(persona, peers);
  const overallLabel =
    review.overall === "PASS"
      ? tUI(lang, "auditPass")
      : review.overall === "WARN"
        ? tUI(lang, "auditWarn")
        : tUI(lang, "auditFail");

  return (
    <section
      aria-labelledby="persona-audit-heading"
      className={cn(
        "rounded-3xl border border-[var(--studio-line)] bg-[var(--studio-paper)] p-6 sm:p-8",
        className,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2
            id="persona-audit-heading"
            className="studio-display text-xl font-semibold text-[var(--studio-ink)]"
          >
            {tUI(lang, "auditTitle")}
          </h2>
          <p className="mt-1 text-sm text-[var(--studio-muted)]">
            {tUI(lang, "differentiationIntro")}
          </p>
        </div>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold",
            review.overall === "PASS"
              ? "bg-emerald-50 text-emerald-800"
              : review.overall === "WARN"
                ? "bg-amber-50 text-amber-800"
                : "bg-rose-50 text-rose-800",
          )}
        >
          {overallLabel}
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[var(--studio-line)] bg-[var(--studio-panel)]/50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--studio-muted)]">
            {tUI(lang, "differentiationTitle")}
          </p>
          <p className="studio-display mt-2 text-3xl font-bold tabular-nums text-[var(--studio-ink)]">
            {Math.round(diff.score * 100)}
            <span className="text-base font-medium text-[var(--studio-muted)]">
              /100
            </span>
          </p>
          {diff.peerCount === 0 ? (
            <p className="mt-2 text-xs text-[var(--studio-muted)]">
              {tUI(lang, "noPeers")}
            </p>
          ) : (
            <dl className="mt-3 grid grid-cols-2 gap-2 text-xs text-[var(--studio-muted)]">
              <div>
                <dt>{tUI(lang, "uniqueThemes")}</dt>
                <dd className="font-medium text-[var(--studio-ink)]">
                  {diff.uniqueNeedThemes.length}
                </dd>
              </div>
              <div>
                <dt>{tUI(lang, "sharedThemes")}</dt>
                <dd className="font-medium text-[var(--studio-ink)]">
                  {diff.sharedNeedThemes.length}
                </dd>
              </div>
            </dl>
          )}
        </div>

        <div className="rounded-2xl border border-[var(--studio-line)] bg-[var(--studio-panel)]/50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--studio-muted)]">
            {tUI(lang, "overall")}
          </p>
          {review.findings.length === 0 ? (
            <p className="mt-3 text-sm text-emerald-800">
              {tUI(lang, "noFindings")}
            </p>
          ) : (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {(Object.keys(summary) as ReviewCategory[])
                .filter((c) => summary[c] > 0)
                .map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-[var(--studio-line)] px-2 py-0.5 text-xs text-[var(--studio-muted)]"
                  >
                    {c.replace(/_/g, " ").toLowerCase()}: {summary[c]}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>

      {review.findings.length > 0 ? (
        <ul className="mt-5 space-y-2">
          {review.findings.slice(0, 4).map((f) => (
            <li
              key={f.id}
              className="rounded-xl border border-[var(--studio-line)] p-3 text-sm"
            >
              <p className="text-[var(--studio-ink)]">{f.problematicStatement}</p>
              <p className="mt-1 text-xs text-[var(--studio-muted)]">{f.reason}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
