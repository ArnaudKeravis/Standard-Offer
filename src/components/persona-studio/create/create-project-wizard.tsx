"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  FileText,
  Loader2,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";
import type { PersonaTemplate, Persona } from "@/lib/persona-studio/ai/schemas/persona";
import type {
  PersonaFamily,
  ResearchMode,
} from "@/lib/persona-studio/ai/schemas/common";
import type {
  ProjectVisibility,
} from "@/lib/persona-studio/ai/schemas/project";
import type { SourceDocument } from "@/lib/persona-studio/ai/schemas/evidence";
import type {
  BehaviouralCluster,
  GenerationMeta,
  SourceAnalysisResult,
} from "@/lib/persona-studio/ai/schemas/analysis";
import {
  langFromLanguage,
  tFamily,
  tResearchMode,
  tSourceCategory,
  tConfidentiality,
  tVisibility,
  tUI,
} from "@/lib/persona-studio/utils/i18n";
import { familyTheme, coveragePct } from "@/lib/persona-studio/utils/persona-view";
import { newId } from "@/lib/persona-studio/utils/persona-factory";
import {
  reviewPersona,
  summariseReview,
  type ReviewCategory,
} from "@/lib/persona-studio/utils/review";
import { StatementList } from "@/components/persona-studio/shared/statement-list";
import { ConfidenceBadge } from "@/components/persona-studio/shared/confidence-badge";
import {
  Button,
  Field,
  Select,
  TextArea,
  TextInput,
} from "@/components/persona-studio/shared/form-controls";
import {
  analyseAndClusterAction,
  createProjectAction,
  generatePersonasAction,
} from "@/app/studio/projects/new/actions";
import { cn } from "@/lib/utils";

const SOURCE_CATEGORIES = [
  "INTERVIEW",
  "OBSERVATION",
  "SURVEY",
  "EXISTING_PERSONA",
  "BRIEF",
  "DESK_RESEARCH",
  "OTHER",
] as const;
const CONFIDENTIALITY_LABELS = [
  "PUBLIC",
  "INTERNAL",
  "CLIENT_CONFIDENTIAL",
  "RESTRICTED",
] as const;
const VISIBILITIES: ProjectVisibility[] = ["PRIVATE", "TEAM", "CLIENT_SHARED"];
const DRAFT_PROJECT_ID = "draft";

interface WizardState {
  name: string;
  client: string;
  family: PersonaFamily;
  segment: string;
  region: string;
  language: string;
  researchMode: ResearchMode;
  description: string;
  workshopObjective: string;
  audienceText: string;
  desiredPersonaCount: string;
  templateId: string;
  sources: SourceDocument[];
  analysis: SourceAnalysisResult | null;
  clusters: BehaviouralCluster[];
  clusterMeta: GenerationMeta | null;
  approvedClusterIds: string[];
  personas: Persona[];
  visibility: ProjectVisibility;
  shareNote: string;
}

const STEP_KEYS = [
  "stepContext",
  "stepSources",
  "stepAnalyse",
  "stepGenerate",
  "stepReview",
  "stepPublish",
] as const;

export function CreateProjectWizard({
  templates,
  ownerId,
}: {
  templates: PersonaTemplate[];
  ownerId: string;
}) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const defaultTemplate =
    templates.find((t) => t.family === "SPORTS_HOSPITALITY") ?? templates[0];

  const [state, setState] = useState<WizardState>({
    name: "",
    client: "",
    family: defaultTemplate?.family ?? "SPORTS_HOSPITALITY",
    segment: "",
    region: "",
    language: "English",
    researchMode: "RESEARCH_GROUNDED",
    description: "",
    workshopObjective: "",
    audienceText: "",
    desiredPersonaCount: "4",
    templateId: defaultTemplate?.id ?? "",
    sources: [],
    analysis: null,
    clusters: [],
    clusterMeta: null,
    approvedClusterIds: [],
    personas: [],
    visibility: "TEAM",
    shareNote: "",
  });

  const lang = langFromLanguage(state.language);
  const update = (patch: Partial<WizardState>) =>
    setState((s) => ({ ...s, ...patch }));

  const familyTemplates = templates.filter((t) => t.family === state.family);

  const canAdvance = useMemo(() => {
    if (step === 0) {
      return (
        state.name.trim() &&
        state.client.trim() &&
        state.segment.trim() &&
        state.region.trim() &&
        state.language.trim() &&
        state.templateId
      );
    }
    return true;
  }, [step, state]);

  function onFamilyChange(family: PersonaFamily) {
    const tpl = templates.find((t) => t.family === family) ?? templates[0];
    update({ family, templateId: tpl?.id ?? state.templateId });
  }

  function runAnalysis() {
    setError(null);
    startTransition(async () => {
      try {
        const { analysis, clusters } = await analyseAndClusterAction({
          project: {
            id: DRAFT_PROJECT_ID,
            name: state.name || "Untitled",
            language: state.language,
            family: state.family,
          },
          sources: state.sources,
          desiredClusterCount: Number(state.desiredPersonaCount) || undefined,
        });
        update({
          analysis,
          clusters: clusters.clusters,
          clusterMeta: clusters.meta,
          approvedClusterIds: clusters.clusters.map((c) => c.id),
        });
      } catch (e) {
        setError(e instanceof Error ? e.message : "Analysis failed");
      }
    });
  }

  function runGeneration() {
    setError(null);
    const approved = state.clusters.filter((c) =>
      state.approvedClusterIds.includes(c.id),
    );
    startTransition(async () => {
      try {
        const personas = await generatePersonasAction({
          clusters: approved,
          project: {
            id: DRAFT_PROJECT_ID,
            family: state.family,
            language: state.language,
          },
          templateId: state.templateId,
        });
        update({ personas });
      } catch (e) {
        setError(e instanceof Error ? e.message : "Generation failed");
      }
    });
  }

  function publish() {
    setError(null);
    startTransition(async () => {
      try {
        const { projectId } = await createProjectAction({
          ownerId,
          project: {
            name: state.name,
            client: state.client,
            family: state.family,
            segment: state.segment,
            region: state.region,
            language: state.language,
            researchMode: state.researchMode,
            description: state.description,
            workshopObjective: state.workshopObjective || undefined,
            audience: state.audienceText
              .split(",")
              .map((a) => a.trim())
              .filter(Boolean),
            desiredPersonaCount: Number(state.desiredPersonaCount) || undefined,
            templateId: state.templateId,
            visibility: state.visibility,
            shareNote: state.shareNote || undefined,
          },
          sources: state.sources,
          personas: state.personas,
        });
        router.push(`/studio/projects/${projectId}`);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Publish failed");
      }
    });
  }

  return (
    <div
      data-studio-theme={familyTheme(state.family)}
      style={{ ["--persona-accent" as string]: currentAccent(templates, state) }}
    >
      <p className="text-sm font-semibold uppercase tracking-widest text-[var(--studio-accent)]">
        {tUI(lang, "createProject")}
      </p>
      <Stepper step={step} lang={lang} />

      <div className="mt-8 min-h-[22rem]">
        {step === 0 && (
          <StepContext
            state={state}
            update={update}
            lang={lang}
            familyTemplates={familyTemplates}
            onFamilyChange={onFamilyChange}
          />
        )}
        {step === 1 && (
          <StepSources state={state} update={update} lang={lang} />
        )}
        {step === 2 && (
          <StepAnalyse
            state={state}
            update={update}
            lang={lang}
            pending={pending}
            runAnalysis={runAnalysis}
          />
        )}
        {step === 3 && (
          <StepGenerate
            state={state}
            lang={lang}
            pending={pending}
            runGeneration={runGeneration}
          />
        )}
        {step === 4 && <StepReview state={state} lang={lang} />}
        {step === 5 && <StepPublish state={state} update={update} lang={lang} />}
      </div>

      {error && (
        <p className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </p>
      )}

      <div className="mt-8 flex items-center justify-between border-t border-[var(--studio-line)] pt-5">
        <Button
          variant="ghost"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0 || pending}
        >
          <ChevronLeft className="size-4" />
          {tUI(lang, "previous")}
        </Button>

        {step < 5 ? (
          <Button
            variant="primary"
            onClick={() => setStep((s) => Math.min(5, s + 1))}
            disabled={!canAdvance || pending}
          >
            {tUI(lang, "next")}
            <ChevronRight className="size-4" />
          </Button>
        ) : (
          <Button variant="primary" onClick={publish} disabled={pending}>
            {pending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Check className="size-4" />
            )}
            {tUI(lang, "finishPublish")}
          </Button>
        )}
      </div>
    </div>
  );
}

function currentAccent(templates: PersonaTemplate[], state: WizardState): string {
  return (
    templates.find((t) => t.id === state.templateId)?.accentColor ?? "#111111"
  );
}

function Stepper({ step, lang }: { step: number; lang: "en" | "fr" }) {
  return (
    <ol className="mt-4 flex flex-wrap gap-2">
      {STEP_KEYS.map((key, i) => {
        const active = i === step;
        const done = i < step;
        return (
          <li key={key} className="flex items-center gap-2">
            <span
              className={cn(
                "flex size-6 items-center justify-center rounded-full text-xs font-semibold",
                active
                  ? "bg-[var(--studio-accent)] text-white"
                  : done
                    ? "studio-accent-soft"
                    : "border border-[var(--studio-line)] text-[var(--studio-muted)]",
              )}
            >
              {done ? <Check className="size-3.5" /> : i + 1}
            </span>
            <span
              className={cn(
                "text-sm",
                active
                  ? "font-semibold text-[var(--studio-ink)]"
                  : "text-[var(--studio-muted)]",
              )}
            >
              {tUI(lang, key)}
            </span>
            {i < STEP_KEYS.length - 1 && (
              <ChevronRight className="size-3.5 text-[var(--studio-muted)]" />
            )}
          </li>
        );
      })}
    </ol>
  );
}

type StepProps = {
  state: WizardState;
  update: (patch: Partial<WizardState>) => void;
  lang: "en" | "fr";
};

function StepContext({
  state,
  update,
  lang,
  familyTemplates,
  onFamilyChange,
}: StepProps & {
  familyTemplates: PersonaTemplate[];
  onFamilyChange: (f: PersonaFamily) => void;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <Field label={tUI(lang, "projectName")} required>
        {({ id }) => (
          <TextInput
            id={id}
            value={state.name}
            onChange={(e) => update({ name: e.target.value })}
            placeholder="Tour de France Hospitality"
          />
        )}
      </Field>
      <Field label={tUI(lang, "client")} required>
        {({ id }) => (
          <TextInput
            id={id}
            value={state.client}
            onChange={(e) => update({ client: e.target.value })}
          />
        )}
      </Field>
      <Field label={tUI(lang, "family")}>
        {({ id }) => (
          <Select
            id={id}
            value={state.family}
            onChange={(e) => onFamilyChange(e.target.value as PersonaFamily)}
          >
            <option value="SPORTS_HOSPITALITY">
              {tFamily(lang, "SPORTS_HOSPITALITY")}
            </option>
            <option value="CORPORATE">{tFamily(lang, "CORPORATE")}</option>
          </Select>
        )}
      </Field>
      <Field label={tUI(lang, "template")}>
        {({ id }) => (
          <Select
            id={id}
            value={state.templateId}
            onChange={(e) => update({ templateId: e.target.value })}
          >
            {familyTemplates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </Select>
        )}
      </Field>
      <Field label={tUI(lang, "segment")} required>
        {({ id }) => (
          <TextInput
            id={id}
            value={state.segment}
            onChange={(e) => update({ segment: e.target.value })}
          />
        )}
      </Field>
      <Field label={tUI(lang, "region")} required>
        {({ id }) => (
          <TextInput
            id={id}
            value={state.region}
            onChange={(e) => update({ region: e.target.value })}
          />
        )}
      </Field>
      <Field label={tUI(lang, "language")} required hint="e.g. English, Français">
        {({ id }) => (
          <TextInput
            id={id}
            value={state.language}
            onChange={(e) => update({ language: e.target.value })}
          />
        )}
      </Field>
      <Field label={tUI(lang, "researchMode")}>
        {({ id }) => (
          <Select
            id={id}
            value={state.researchMode}
            onChange={(e) =>
              update({ researchMode: e.target.value as ResearchMode })
            }
          >
            <option value="RESEARCH_GROUNDED">
              {tResearchMode(lang, "RESEARCH_GROUNDED")}
            </option>
            <option value="PROTO_PERSONA">
              {tResearchMode(lang, "PROTO_PERSONA")}
            </option>
          </Select>
        )}
      </Field>
      <Field label={tUI(lang, "desiredPersonaCount")}>
        {({ id }) => (
          <TextInput
            id={id}
            type="number"
            min={1}
            value={state.desiredPersonaCount}
            onChange={(e) => update({ desiredPersonaCount: e.target.value })}
          />
        )}
      </Field>
      <Field label={tUI(lang, "workshopObjective")} className="sm:col-span-2">
        {({ id }) => (
          <TextInput
            id={id}
            value={state.workshopObjective}
            onChange={(e) => update({ workshopObjective: e.target.value })}
          />
        )}
      </Field>
      <Field
        label={tUI(lang, "audience")}
        hint="Comma-separated"
        className="sm:col-span-2"
      >
        {({ id }) => (
          <TextInput
            id={id}
            value={state.audienceText}
            onChange={(e) => update({ audienceText: e.target.value })}
            placeholder="VIP clients, Families, Sponsors"
          />
        )}
      </Field>
      <Field label={tUI(lang, "description")} className="sm:col-span-2">
        {({ id }) => (
          <TextArea
            id={id}
            value={state.description}
            onChange={(e) => update({ description: e.target.value })}
          />
        )}
      </Field>
    </div>
  );
}

function StepSources({ state, update, lang }: StepProps) {
  const [name, setName] = useState("");
  const [category, setCategory] =
    useState<(typeof SOURCE_CATEGORIES)[number]>("INTERVIEW");
  const [confidentiality, setConfidentiality] =
    useState<(typeof CONFIDENTIALITY_LABELS)[number]>("INTERNAL");
  const [participantRef, setParticipantRef] = useState("");
  const [text, setText] = useState("");

  function addSource() {
    if (!name.trim()) return;
    const source: SourceDocument = {
      id: newId("src"),
      projectId: DRAFT_PROJECT_ID,
      name: name.trim(),
      type: "text",
      category,
      extractedText: text.trim(),
      processingStatus: "READY",
      participantRef: participantRef.trim() || undefined,
      confidentiality,
      createdAt: new Date().toISOString(),
    };
    update({ sources: [...state.sources, source], analysis: null, clusters: [] });
    setName("");
    setParticipantRef("");
    setText("");
  }

  function removeSource(id: string) {
    update({
      sources: state.sources.filter((s) => s.id !== id),
      analysis: null,
      clusters: [],
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-[var(--studio-line)] p-5">
        <h2 className="studio-display mb-4 text-sm font-semibold uppercase tracking-wider">
          {tUI(lang, "addSource")}
        </h2>
        <div className="flex flex-col gap-4">
          <Field label={tUI(lang, "sourceName")} required>
            {({ id }) => (
              <TextInput
                id={id}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label={tUI(lang, "sourceCategory")}>
              {({ id }) => (
                <Select
                  id={id}
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value as (typeof SOURCE_CATEGORIES)[number],
                    )
                  }
                >
                  {SOURCE_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {tSourceCategory(lang, c)}
                    </option>
                  ))}
                </Select>
              )}
            </Field>
            <Field label={tUI(lang, "confidentiality")}>
              {({ id }) => (
                <Select
                  id={id}
                  value={confidentiality}
                  onChange={(e) =>
                    setConfidentiality(
                      e.target.value as (typeof CONFIDENTIALITY_LABELS)[number],
                    )
                  }
                >
                  {CONFIDENTIALITY_LABELS.map((c) => (
                    <option key={c} value={c}>
                      {tConfidentiality(lang, c)}
                    </option>
                  ))}
                </Select>
              )}
            </Field>
          </div>
          <Field
            label={tUI(lang, "participantRef")}
            hint="Anonymous reference only (e.g. P07) — never a real name."
          >
            {({ id }) => (
              <TextInput
                id={id}
                value={participantRef}
                onChange={(e) => setParticipantRef(e.target.value)}
                placeholder="P07"
              />
            )}
          </Field>
          <Field label={tUI(lang, "pasteText")}>
            {({ id }) => (
              <TextArea
                id={id}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-28"
              />
            )}
          </Field>
          <Button variant="secondary" onClick={addSource} disabled={!name.trim()}>
            <Plus className="size-4" />
            {tUI(lang, "addSource")}
          </Button>
        </div>
      </div>

      <div>
        <h2 className="studio-display mb-4 text-sm font-semibold uppercase tracking-wider">
          {tUI(lang, "sources")} ({state.sources.length})
        </h2>
        {state.sources.length === 0 ? (
          <p className="text-sm text-[var(--studio-muted)]">
            {tUI(lang, "noSourcesYet")}
          </p>
        ) : (
          <ul className="space-y-2">
            {state.sources.map((s) => (
              <li
                key={s.id}
                className="flex items-start justify-between gap-3 rounded-xl border border-[var(--studio-line)] p-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <FileText className="size-4 shrink-0 text-[var(--studio-accent)]" />
                    <span className="truncate text-sm font-medium text-[var(--studio-ink)]">
                      {s.name}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[var(--studio-muted)]">
                    {tSourceCategory(lang, s.category)} ·{" "}
                    {tConfidentiality(lang, s.confidentiality)}
                    {s.participantRef ? ` · ${s.participantRef}` : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeSource(s.id)}
                  aria-label={tUI(lang, "remove")}
                  className="rounded-md p-1 text-[var(--studio-muted)] hover:bg-[var(--studio-panel)] hover:text-rose-600"
                >
                  <Trash2 className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function StepAnalyse({
  state,
  lang,
  pending,
  runAnalysis,
  update,
}: StepProps & { pending: boolean; runAnalysis: () => void }) {
  function toggleCluster(id: string) {
    const set = new Set(state.approvedClusterIds);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    update({ approvedClusterIds: [...set] });
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-xl text-sm text-[var(--studio-muted)]">
          {tUI(lang, "approveClustersHint")}
        </p>
        <Button variant="secondary" onClick={runAnalysis} disabled={pending}>
          {pending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Sparkles className="size-4" />
          )}
          {state.analysis ? tUI(lang, "reAnalyse") : tUI(lang, "runAnalysis")}
        </Button>
      </div>

      {state.clusterMeta && <MockNotice disclaimer={state.clusterMeta.disclaimer} lang={lang} />}

      {state.analysis && (
        <div className="mt-6">
          <h3 className="studio-display text-sm font-semibold uppercase tracking-wider text-[var(--studio-ink)]">
            {tUI(lang, "insights")}
          </h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {state.analysis.insights.map((ins) => (
              <li
                key={ins.id}
                className="rounded-xl border border-[var(--studio-line)] p-3"
              >
                <p className="text-sm font-medium text-[var(--studio-ink)]">
                  {ins.theme}
                </p>
                <p className="mt-1 text-xs text-[var(--studio-muted)]">
                  {ins.summary}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {state.clusters.length > 0 ? (
        <div className="mt-6">
          <h3 className="studio-display text-sm font-semibold uppercase tracking-wider text-[var(--studio-ink)]">
            {tUI(lang, "behaviouralClusters")}
          </h3>
          <ul className="mt-3 space-y-3">
            {state.clusters.map((c) => {
              const approved = state.approvedClusterIds.includes(c.id);
              return (
                <li
                  key={c.id}
                  className={cn(
                    "rounded-2xl border p-4 transition-colors",
                    approved
                      ? "border-[var(--studio-accent)] studio-accent-soft"
                      : "border-[var(--studio-line)]",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-[var(--studio-ink)]">
                        {c.label}
                      </p>
                      <p className="mt-1 text-xs text-[var(--studio-muted)]">
                        {c.summary}
                      </p>
                    </div>
                    <label className="flex shrink-0 cursor-pointer items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={approved}
                        onChange={() => toggleCluster(c.id)}
                        className="size-4 accent-[var(--studio-accent)]"
                      />
                      {approved ? tUI(lang, "approved") : tUI(lang, "approve")}
                    </label>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {c.behaviouralTags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-[var(--studio-line)] px-2 py-0.5 text-xs text-[var(--studio-muted)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        !state.analysis && (
          <p className="mt-6 text-sm text-[var(--studio-muted)]">
            {tUI(lang, "noInsightsYet")}
          </p>
        )
      )}
    </div>
  );
}

function StepGenerate({
  state,
  lang,
  pending,
  runGeneration,
}: {
  state: WizardState;
  lang: "en" | "fr";
  pending: boolean;
  runGeneration: () => void;
}) {
  const approvedCount = state.approvedClusterIds.length;
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[var(--studio-muted)]">
          {approvedCount} {tUI(lang, "approved").toLowerCase()}
        </p>
        <Button
          variant="secondary"
          onClick={runGeneration}
          disabled={pending || approvedCount === 0}
        >
          {pending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Sparkles className="size-4" />
          )}
          {tUI(lang, "generatePersonas")}
        </Button>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {state.personas.map((p) => (
          <PersonaDraftCard key={p.id} persona={p} lang={lang} />
        ))}
      </div>
      {state.personas.length === 0 && (
        <p className="mt-6 text-sm text-[var(--studio-muted)]">
          {tUI(lang, "generatedPersonas")}: 0
        </p>
      )}
    </div>
  );
}

function PersonaDraftCard({
  persona,
  lang,
}: {
  persona: Persona;
  lang: "en" | "fr";
}) {
  const sections = [...persona.commonSections, ...persona.domainSections]
    .filter((s) => s.visible && s.statements.length > 0)
    .sort((a, b) => a.order - b.order)
    .slice(0, 3);
  return (
    <article className="rounded-2xl border border-[var(--studio-line)] p-5">
      <div className="flex items-center justify-between gap-2">
        <h3 className="studio-display text-lg font-semibold text-[var(--studio-ink)]">
          {persona.name}
        </h3>
        <ConfidenceBadge level={persona.confidenceLevel} lang={lang} />
      </div>
      <p className="mt-1 text-sm text-[var(--studio-muted)]">
        {persona.archetype}
      </p>
      <p className="mt-2 text-sm text-[var(--studio-ink)]">
        {persona.oneLineEssence}
      </p>
      <p className="mt-3 text-xs text-[var(--studio-muted)]">
        {tUI(lang, "evidenceCoverage")}: {coveragePct(persona.evidenceCoverage)}
      </p>
      <div className="mt-4 space-y-3">
        {sections.map((s) => (
          <div key={s.id}>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--studio-muted)]">
              {s.title}
            </p>
            <StatementList
              statements={s.statements.slice(0, 3)}
              lang={lang}
              className="mt-1"
            />
          </div>
        ))}
      </div>
    </article>
  );
}

function StepReview({
  state,
  lang,
}: {
  state: WizardState;
  lang: "en" | "fr";
}) {
  return (
    <div>
      <p className="max-w-2xl text-sm text-[var(--studio-muted)]">
        {tUI(lang, "reviewIntro")}
      </p>
      <div className="mt-6 space-y-6">
        {state.personas.map((p) => (
          <PersonaReviewCard key={p.id} persona={p} lang={lang} />
        ))}
      </div>
      {state.personas.length === 0 && (
        <p className="mt-6 text-sm text-[var(--studio-muted)]">
          {tUI(lang, "generatedPersonas")}: 0
        </p>
      )}
    </div>
  );
}

const CATEGORY_LABEL: Record<ReviewCategory, string> = {
  UNSUPPORTED_EVIDENCE: "catUnsupported",
  ASSUMPTION: "catAssumption",
  MISSING_EVIDENCE: "catMissing",
  POTENTIAL_STEREOTYPE: "catStereotype",
  DUPLICATE: "catDuplicate",
  WEAK_QUOTE: "catWeakQuote",
};

function PersonaReviewCard({
  persona,
  lang,
}: {
  persona: Persona;
  lang: "en" | "fr";
}) {
  const review = reviewPersona(persona);
  const summary = summariseReview(review);
  return (
    <article className="rounded-2xl border border-[var(--studio-line)] p-5">
      <div className="flex items-center justify-between gap-2">
        <h3 className="studio-display text-lg font-semibold text-[var(--studio-ink)]">
          {persona.name}
        </h3>
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-semibold",
            review.overall === "PASS"
              ? "bg-emerald-50 text-emerald-700"
              : review.overall === "WARN"
                ? "bg-amber-50 text-amber-700"
                : "bg-rose-50 text-rose-700",
          )}
        >
          {tUI(lang, "overall")}: {review.overall}
        </span>
      </div>

      {review.findings.length === 0 ? (
        <p className="mt-3 text-sm text-emerald-700">{tUI(lang, "noFindings")}</p>
      ) : (
        <>
          <div className="mt-3 flex flex-wrap gap-2">
            {(Object.keys(summary) as ReviewCategory[])
              .filter((c) => summary[c] > 0)
              .map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-[var(--studio-line)] px-2 py-0.5 text-xs text-[var(--studio-muted)]"
                >
                  {tUI(lang, CATEGORY_LABEL[c])}: {summary[c]}
                </span>
              ))}
          </div>
          <ul className="mt-4 space-y-2">
            {review.findings.slice(0, 6).map((f) => (
              <li
                key={f.id}
                className="rounded-lg border border-[var(--studio-line)] p-3 text-sm"
              >
                <p className="text-[var(--studio-ink)]">{f.problematicStatement}</p>
                <p className="mt-1 text-xs text-[var(--studio-muted)]">
                  {f.reason}
                </p>
                <p className="mt-1 text-xs text-[var(--studio-accent)]">
                  → {f.suggestedCorrection}
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </article>
  );
}

function StepPublish({ state, update, lang }: StepProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-5">
        <h2 className="studio-display text-sm font-semibold uppercase tracking-wider">
          {tUI(lang, "publishSettings")}
        </h2>
        <Field label={tUI(lang, "sharing")}>
          {({ id }) => (
            <Select
              id={id}
              value={state.visibility}
              onChange={(e) =>
                update({ visibility: e.target.value as ProjectVisibility })
              }
            >
              {VISIBILITIES.map((v) => (
                <option key={v} value={v}>
                  {tVisibility(lang, v)}
                </option>
              ))}
            </Select>
          )}
        </Field>
        <Field label={tUI(lang, "shareNote")}>
          {({ id }) => (
            <TextArea
              id={id}
              value={state.shareNote}
              onChange={(e) => update({ shareNote: e.target.value })}
            />
          )}
        </Field>
      </div>

      <div className="rounded-2xl border border-[var(--studio-line)] p-5">
        <h2 className="studio-display mb-3 text-sm font-semibold uppercase tracking-wider">
          {state.name || "—"}
        </h2>
        <dl className="space-y-2 text-sm">
          <Row label={tUI(lang, "client")} value={state.client} />
          <Row label={tUI(lang, "family")} value={tFamily(lang, state.family)} />
          <Row label={tUI(lang, "sources")} value={String(state.sources.length)} />
          <Row
            label={tUI(lang, "personas")}
            value={String(state.personas.length)}
          />
          <Row
            label={tUI(lang, "sharing")}
            value={tVisibility(lang, state.visibility)}
          />
        </dl>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-[var(--studio-muted)]">{label}</dt>
      <dd className="font-medium text-[var(--studio-ink)]">{value}</dd>
    </div>
  );
}

function MockNotice({
  disclaimer,
  lang,
}: {
  disclaimer: string;
  lang: "en" | "fr";
}) {
  return (
    <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
      <Sparkles className="mt-0.5 size-4 shrink-0" />
      <div>
        <span className="font-semibold">{tUI(lang, "mockAiBadge")}</span>
        <p className="mt-0.5">{disclaimer}</p>
      </div>
    </div>
  );
}
