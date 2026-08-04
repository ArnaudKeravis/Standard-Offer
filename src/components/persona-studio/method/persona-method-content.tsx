import {
  Brain,
  ClipboardCheck,
  MapPinned,
  MessageCircle,
  QrCode,
  Scale,
  Sparkles,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { tUI, type StudioLang } from "@/lib/persona-studio/utils/i18n";

/**
 * Methodology page content — three presentation beats from the Standard
 * Persona Profiles deck: how we build · Personix / Eating Moments · site flow.
 */
export function PersonaMethodContent({
  lang,
  className,
}: {
  lang: StudioLang;
  className?: string;
}) {
  const steps = [
    {
      n: "01",
      title: tUI(lang, "methodStep1Title"),
      body: tUI(lang, "methodStep1Body"),
      icon: Users,
    },
    {
      n: "02",
      title: tUI(lang, "methodStep2Title"),
      body: tUI(lang, "methodStep2Body"),
      icon: Scale,
    },
    {
      n: "03",
      title: tUI(lang, "methodStep3Title"),
      body: tUI(lang, "methodStep3Body"),
      icon: MessageCircle,
    },
    {
      n: "04",
      title: tUI(lang, "methodStep4Title"),
      body: tUI(lang, "methodStep4Body"),
      icon: Sparkles,
    },
  ] as const;

  const dimensions = [
    tUI(lang, "methodDimWho"),
    tUI(lang, "methodDimWhy"),
    tUI(lang, "methodDimWhat"),
    tUI(lang, "methodDimWhere"),
    tUI(lang, "methodDimWithWhom"),
    tUI(lang, "methodDimWhen"),
  ];

  const siteFlow = [
    {
      n: "1",
      title: tUI(lang, "methodFlow1Title"),
      body: tUI(lang, "methodFlow1Body"),
      icon: QrCode,
    },
    {
      n: "2",
      title: tUI(lang, "methodFlow2Title"),
      body: tUI(lang, "methodFlow2Body"),
      icon: MapPinned,
    },
    {
      n: "3",
      title: tUI(lang, "methodFlow3Title"),
      body: tUI(lang, "methodFlow3Body"),
      icon: ClipboardCheck,
    },
  ] as const;

  return (
    <div className={cn("space-y-20", className)}>
      {/* Intro */}
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--studio-accent)]">
          {tUI(lang, "methodEyebrow")}
        </p>
        <h1 className="studio-display mt-3 text-4xl font-bold leading-tight tracking-tight text-[var(--studio-ink)] sm:text-5xl">
          {tUI(lang, "methodTitle")}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-[var(--studio-muted)]">
          {tUI(lang, "methodIntro")}
        </p>
      </header>

      {/* Slide 1 — How we build */}
      <section aria-labelledby="method-build-heading">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--studio-accent)]">
              {tUI(lang, "methodBuildEyebrow")}
            </p>
            <h2
              id="method-build-heading"
              className="studio-display mt-2 text-2xl font-bold text-[var(--studio-ink)] sm:text-3xl"
            >
              {tUI(lang, "methodBuildTitle")}
            </h2>
          </div>
        </div>

        <ol className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <li
                key={step.n}
                className="studio-enter relative flex flex-col rounded-3xl border border-[var(--studio-line)] bg-[var(--studio-paper)] p-6"
                style={{ ["--stagger-index" as string]: i }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="studio-display text-3xl font-bold tabular-nums text-[var(--studio-accent)]">
                    {step.n}
                  </span>
                  <span className="flex size-10 items-center justify-center rounded-2xl studio-accent-soft text-[var(--studio-accent)]">
                    <Icon aria-hidden className="size-5" />
                  </span>
                </div>
                <h3 className="studio-display mt-5 text-lg font-semibold text-[var(--studio-ink)]">
                  {step.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--studio-muted)]">
                  {step.body}
                </p>
              </li>
            );
          })}
        </ol>

        <aside className="mt-6 flex gap-3 rounded-2xl border border-[var(--studio-line)] bg-[var(--studio-panel)]/70 px-5 py-4">
          <Brain
            aria-hidden
            className="mt-0.5 size-5 shrink-0 text-[var(--studio-accent)]"
          />
          <div>
            <p className="text-sm font-semibold text-[var(--studio-ink)]">
              {tUI(lang, "methodValidationTitle")}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-[var(--studio-muted)]">
              {tUI(lang, "methodValidationBody")}
            </p>
          </div>
        </aside>
      </section>

      {/* Slide 2 — Personix / Eating Moments */}
      <section aria-labelledby="method-personix-heading">
        <div className="rounded-3xl border border-[var(--studio-line)] bg-[var(--studio-paper)] p-6 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--studio-accent)]">
            {tUI(lang, "methodPersonixEyebrow")}
          </p>
          <h2
            id="method-personix-heading"
            className="studio-display mt-2 text-2xl font-bold text-[var(--studio-ink)] sm:text-3xl"
          >
            {tUI(lang, "methodPersonixTitle")}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--studio-muted)]">
            {tUI(lang, "methodPersonixIntro")}
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
            <dl className="grid gap-4 sm:grid-cols-2">
              <Stat
                value={tUI(lang, "methodStatMomentsValue")}
                label={tUI(lang, "methodStatMomentsLabel")}
              />
              <Stat
                value={tUI(lang, "methodStatSurveyValue")}
                label={tUI(lang, "methodStatSurveyLabel")}
              />
              <Stat
                value={tUI(lang, "methodStatPeopleValue")}
                label={tUI(lang, "methodStatPeopleLabel")}
              />
              <Stat
                value={tUI(lang, "methodStatCountriesValue")}
                label={tUI(lang, "methodStatCountriesLabel")}
              />
            </dl>

            <div>
              <p className="text-sm font-semibold text-[var(--studio-ink)]">
                {tUI(lang, "methodDimsTitle")}
              </p>
              <p className="mt-1 text-sm text-[var(--studio-muted)]">
                {tUI(lang, "methodDimsIntro")}
              </p>
              <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {dimensions.map((dim) => (
                  <li
                    key={dim}
                    className="rounded-2xl border border-[var(--studio-line)] bg-[var(--studio-panel)]/60 px-3 py-3 text-center text-sm font-medium text-[var(--studio-ink)]"
                  >
                    {dim}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 3 — How it works on site */}
      <section aria-labelledby="method-flow-heading">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--studio-accent)]">
            {tUI(lang, "methodFlowEyebrow")}
          </p>
          <h2
            id="method-flow-heading"
            className="studio-display mt-2 text-2xl font-bold text-[var(--studio-ink)] sm:text-3xl"
          >
            {tUI(lang, "methodFlowTitle")}
          </h2>
          <p className="mt-3 max-w-2xl text-base text-[var(--studio-muted)]">
            {tUI(lang, "methodFlowIntro")}
          </p>
        </div>

        <ol className="grid gap-0 md:grid-cols-3">
          {siteFlow.map((step, i) => {
            const Icon = step.icon;
            return (
              <li
                key={step.n}
                className="relative flex flex-col border border-[var(--studio-line)] bg-[var(--studio-paper)] p-6 first:rounded-t-3xl last:rounded-b-3xl md:first:rounded-l-3xl md:first:rounded-tr-none md:last:rounded-r-3xl md:last:rounded-bl-none md:[&:not(:first-child)]:border-l-0"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-2xl bg-[var(--studio-ink)] text-sm font-semibold text-[var(--studio-paper)]">
                    {step.n}
                  </span>
                  <Icon
                    aria-hidden
                    className="size-5 text-[var(--studio-accent)]"
                  />
                </div>
                <h3 className="studio-display mt-5 text-lg font-semibold text-[var(--studio-ink)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--studio-muted)]">
                  {step.body}
                </p>
                {i < siteFlow.length - 1 ? (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-0 top-1/2 hidden h-px w-4 translate-x-full bg-[var(--studio-line)] md:block"
                  />
                ) : null}
              </li>
            );
          })}
        </ol>

        <p className="mt-6 text-sm text-[var(--studio-muted)]">
          {tUI(lang, "methodFlowNote")}
        </p>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-[var(--studio-line)] bg-[var(--studio-panel)]/50 px-4 py-5">
      <dt className="studio-display text-2xl font-bold tracking-tight text-[var(--studio-ink)] sm:text-3xl">
        {value}
      </dt>
      <dd className="mt-1 text-sm leading-snug text-[var(--studio-muted)]">
        {label}
      </dd>
    </div>
  );
}
