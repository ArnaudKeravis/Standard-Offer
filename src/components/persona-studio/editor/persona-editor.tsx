"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  Loader2,
  Plus,
  Save,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import type { Persona } from "@/lib/persona-studio/ai/schemas/persona";
import type { PersonaSection } from "@/lib/persona-studio/ai/schemas/section";
import type { PersonaStatement } from "@/lib/persona-studio/ai/schemas/statement";
import type { SourceDocument } from "@/lib/persona-studio/ai/schemas/evidence";
import type {
  ConfidenceLevel,
  EvidenceStatus,
  QuoteType,
  SectionType,
} from "@/lib/persona-studio/ai/schemas/common";
import {
  tConfidence,
  tEvidence,
  tQuoteType,
  tSectionType,
  tUI,
  type StudioLang,
} from "@/lib/persona-studio/utils/i18n";
import {
  collectStatements,
  computeEvidenceCoverage,
} from "@/lib/persona-studio/utils/confidence";
import { coveragePct } from "@/lib/persona-studio/utils/persona-view";
import {
  CONFIDENCE_LEVELS,
  EVIDENCE_STATUSES,
  QUOTE_TYPES,
  blankSection,
  blankStatement,
  slugifyKey,
} from "@/lib/persona-studio/utils/persona-factory";
import { reviewPersona } from "@/lib/persona-studio/utils/review";
import { ConfidenceBadge } from "@/components/persona-studio/shared/confidence-badge";
import { EvidenceTag } from "@/components/persona-studio/shared/evidence-tag";
import {
  Button,
  Field,
  Select,
  TextArea,
  TextInput,
} from "@/components/persona-studio/shared/form-controls";
import {
  createPersonaAction,
  deletePersonaAction,
  saveTemplateAction,
  updatePersonaAction,
} from "@/app/studio/projects/[projectId]/personas/actions";
import { cn } from "@/lib/utils";

const SECTION_TYPES: SectionType[] = [
  "bullets",
  "text",
  "quote",
  "metrics",
  "moments",
  "needs",
  "journey",
  "custom",
];

type Scope = "COMMON" | "DOMAIN";
type EditorSection = PersonaSection & { scope: Scope };

export function PersonaEditor({
  persona,
  sources,
  projectId,
  lang = "en",
  mode,
}: {
  persona: Persona;
  sources: SourceDocument[];
  projectId: string;
  lang?: StudioLang;
  mode: "create" | "edit";
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [showReview, setShowReview] = useState(false);

  const [meta, setMeta] = useState({
    name: persona.name,
    archetype: persona.archetype,
    category: persona.category,
    oneLineEssence: persona.oneLineEssence,
    accentColor: persona.accentColor,
    quote: persona.quote,
    quoteType: persona.quoteType,
    confidenceLevel: persona.confidenceLevel,
    confidenceExplanation: persona.confidenceExplanation,
    behaviouralTags: persona.behaviouralTags,
    demographicContext: { ...persona.demographicContext },
  });

  const [sections, setSections] = useState<EditorSection[]>(() =>
    [
      ...persona.commonSections.map((s) => ({ ...s, scope: "COMMON" as Scope })),
      ...persona.domainSections.map((s) => ({ ...s, scope: "DOMAIN" as Scope })),
    ].sort((a, b) => a.order - b.order),
  );

  const built = useMemo(
    () => buildPersona(persona, meta, sections),
    [persona, meta, sections],
  );
  const coverage = useMemo(
    () =>
      computeEvidenceCoverage(
        collectStatements([...built.commonSections, ...built.domainSections]),
      ),
    [built],
  );
  const review = useMemo(() => reviewPersona(built), [built]);

  function updateMeta<K extends keyof typeof meta>(key: K, value: (typeof meta)[K]) {
    setMeta((m) => ({ ...m, [key]: value }));
  }

  function updateSection(id: string, patch: Partial<EditorSection>) {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    );
  }

  function moveSection(index: number, dir: -1 | 1) {
    setSections((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next.map((s, i) => ({ ...s, order: i }));
    });
  }

  function removeSection(id: string) {
    setSections((prev) =>
      prev.filter((s) => s.id !== id).map((s, i) => ({ ...s, order: i })),
    );
  }

  function addSection() {
    setSections((prev) => [
      ...prev,
      { ...blankSection(prev.length), scope: "DOMAIN" },
    ]);
  }

  function addStatement(sectionId: string) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? { ...s, statements: [...s.statements, blankStatement(s.id)] }
          : s,
      ),
    );
  }

  function updateStatement(
    sectionId: string,
    statementId: string,
    patch: Partial<PersonaStatement>,
  ) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              statements: s.statements.map((st) =>
                st.id === statementId ? { ...st, ...patch } : st,
              ),
            }
          : s,
      ),
    );
  }

  function removeStatement(sectionId: string, statementId: string) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? { ...s, statements: s.statements.filter((st) => st.id !== statementId) }
          : s,
      ),
    );
  }

  function save() {
    setError(null);
    startTransition(async () => {
      try {
        if (mode === "create") {
          const { personaId } = await createPersonaAction(projectId, built);
          router.push(`/studio/projects/${projectId}/personas/${personaId}`);
        } else {
          await updatePersonaAction(projectId, persona.id, built);
          router.push(`/studio/projects/${projectId}/personas/${persona.id}`);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Save failed");
      }
    });
  }

  function remove() {
    if (!window.confirm(`${tUI(lang, "remove")} — ${meta.name}?`)) return;
    setError(null);
    startTransition(async () => {
      try {
        await deletePersonaAction(projectId, persona.id);
        router.push(`/studio/projects/${projectId}/personas`);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Delete failed");
      }
    });
  }

  const [templateName, setTemplateName] = useState("");
  const [templateSaved, setTemplateSaved] = useState(false);
  function saveTemplate() {
    if (!templateName.trim()) return;
    setError(null);
    startTransition(async () => {
      try {
        await saveTemplateAction({
          name: templateName.trim(),
          family: persona.family,
          accentColor: meta.accentColor,
          sections: sections.map((s) => ({
            key: s.key,
            title: s.title,
            type: s.type,
            order: s.order,
            visible: s.visible,
            description: s.description,
            scope: s.scope,
          })),
        });
        setTemplateSaved(true);
        setTemplateName("");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Template save failed");
      }
    });
  }

  return (
    <main className="mx-auto max-w-4xl px-4 pb-32 pt-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="studio-display text-2xl font-bold text-[var(--studio-ink)]">
          {mode === "create" ? tUI(lang, "editorNewPersona") : meta.name}
        </h1>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[var(--studio-muted)]">
            {tUI(lang, "evidenceCoverage")}: {coveragePct(coverage)}
          </span>
          <ConfidenceBadge level={meta.confidenceLevel} lang={lang} />
        </div>
      </div>

      {/* Identity */}
      <SectionShell title={tUI(lang, "identity")}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={tUI(lang, "name")} required>
            {({ id }) => (
              <TextInput
                id={id}
                value={meta.name}
                onChange={(e) => updateMeta("name", e.target.value)}
              />
            )}
          </Field>
          <Field label={tUI(lang, "archetype")} required>
            {({ id }) => (
              <TextInput
                id={id}
                value={meta.archetype}
                onChange={(e) => updateMeta("archetype", e.target.value)}
              />
            )}
          </Field>
          <Field label={tUI(lang, "category")} required>
            {({ id }) => (
              <TextInput
                id={id}
                value={meta.category}
                onChange={(e) => updateMeta("category", e.target.value)}
              />
            )}
          </Field>
          <Field label={tUI(lang, "accentColour")}>
            {({ id }) => (
              <div className="flex items-center gap-2">
                <input
                  id={id}
                  type="color"
                  value={meta.accentColor}
                  onChange={(e) => updateMeta("accentColor", e.target.value)}
                  className="h-9 w-12 cursor-pointer rounded border border-[var(--studio-line)] bg-transparent"
                />
                <TextInput
                  value={meta.accentColor}
                  onChange={(e) => updateMeta("accentColor", e.target.value)}
                  aria-label={tUI(lang, "accentColour")}
                />
              </div>
            )}
          </Field>
          <Field label={tUI(lang, "oneLineEssence")} className="sm:col-span-2">
            {({ id }) => (
              <TextInput
                id={id}
                value={meta.oneLineEssence}
                onChange={(e) => updateMeta("oneLineEssence", e.target.value)}
              />
            )}
          </Field>
        </div>
      </SectionShell>

      {/* Quote + confidence */}
      <SectionShell title={tUI(lang, "quote")}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={tUI(lang, "quote")} className="sm:col-span-2">
            {({ id }) => (
              <TextArea
                id={id}
                value={meta.quote}
                onChange={(e) => updateMeta("quote", e.target.value)}
              />
            )}
          </Field>
          <Field label={tUI(lang, "quoteType")}>
            {({ id }) => (
              <Select
                id={id}
                value={meta.quoteType}
                onChange={(e) =>
                  updateMeta("quoteType", e.target.value as QuoteType)
                }
              >
                {QUOTE_TYPES.map((q) => (
                  <option key={q} value={q}>
                    {tQuoteType(lang, q)}
                  </option>
                ))}
              </Select>
            )}
          </Field>
          <Field label={tUI(lang, "confidence")}>
            {({ id }) => (
              <Select
                id={id}
                value={meta.confidenceLevel}
                onChange={(e) =>
                  updateMeta("confidenceLevel", e.target.value as ConfidenceLevel)
                }
              >
                {CONFIDENCE_LEVELS.map((c) => (
                  <option key={c} value={c}>
                    {tConfidence(lang, c)}
                  </option>
                ))}
              </Select>
            )}
          </Field>
          <Field
            label={tUI(lang, "confidenceExplanation")}
            required
            className="sm:col-span-2"
          >
            {({ id }) => (
              <TextArea
                id={id}
                value={meta.confidenceExplanation}
                onChange={(e) =>
                  updateMeta("confidenceExplanation", e.target.value)
                }
              />
            )}
          </Field>
        </div>
      </SectionShell>

      {/* Behavioural tags */}
      <SectionShell title={tUI(lang, "behaviouralTags")}>
        <TagEditor
          tags={meta.behaviouralTags}
          onChange={(tags) => updateMeta("behaviouralTags", tags)}
          lang={lang}
        />
      </SectionShell>

      {/* Demographic context */}
      <SectionShell title={tUI(lang, "demographics")}>
        <div className="grid gap-4 sm:grid-cols-2">
          {(
            [
              ["ageRange", "ageRange"],
              ["location", "location"],
              ["tenure", "tenure"],
              ["authorityLevel", "authorityLevel"],
              ["incomeLevel", "incomeLevel"],
            ] as const
          ).map(([key, label]) => (
            <Field key={key} label={tUI(lang, label)}>
              {({ id }) => (
                <TextInput
                  id={id}
                  value={meta.demographicContext[key] ?? ""}
                  onChange={(e) =>
                    updateMeta("demographicContext", {
                      ...meta.demographicContext,
                      [key]: e.target.value || undefined,
                    })
                  }
                />
              )}
            </Field>
          ))}
          <Field label={tUI(lang, "relevanceNote")} className="sm:col-span-2">
            {({ id }) => (
              <TextArea
                id={id}
                value={meta.demographicContext.relevanceNote ?? ""}
                onChange={(e) =>
                  updateMeta("demographicContext", {
                    ...meta.demographicContext,
                    relevanceNote: e.target.value || undefined,
                  })
                }
              />
            )}
          </Field>
        </div>
      </SectionShell>

      {/* Sections */}
      <div className="mt-8 flex items-center justify-between">
        <h2 className="studio-display text-sm font-semibold uppercase tracking-wider text-[var(--studio-ink)]">
          {tUI(lang, "sections")}
        </h2>
        <Button variant="secondary" onClick={addSection}>
          <Plus className="size-4" />
          {tUI(lang, "addCustomSection")}
        </Button>
      </div>

      <div className="mt-4 space-y-4">
        {sections.map((section, index) => (
          <SectionEditor
            key={section.id}
            section={section}
            index={index}
            total={sections.length}
            sources={sources}
            lang={lang}
            onUpdate={(patch) => updateSection(section.id, patch)}
            onMove={(dir) => moveSection(index, dir)}
            onRemove={() => removeSection(section.id)}
            onAddStatement={() => addStatement(section.id)}
            onUpdateStatement={(stId, patch) =>
              updateStatement(section.id, stId, patch)
            }
            onRemoveStatement={(stId) => removeStatement(section.id, stId)}
          />
        ))}
      </div>

      {/* Review panel */}
      <div className="mt-8 rounded-2xl border border-[var(--studio-line)]">
        <button
          type="button"
          onClick={() => setShowReview((v) => !v)}
          className="flex w-full items-center justify-between gap-2 p-4 text-left"
        >
          <span className="flex items-center gap-2 text-sm font-semibold text-[var(--studio-ink)]">
            <ShieldCheck className="size-4 text-[var(--studio-accent)]" />
            {tUI(lang, "reviewPanel")} · {review.overall} ({review.findings.length})
          </span>
          <ChevronDown
            className={cn("size-4 transition-transform", showReview && "rotate-180")}
          />
        </button>
        {showReview && (
          <div className="border-t border-[var(--studio-line)] p-4">
            {review.findings.length === 0 ? (
              <p className="text-sm text-emerald-700">{tUI(lang, "noFindings")}</p>
            ) : (
              <ul className="space-y-2">
                {review.findings.map((f) => (
                  <li
                    key={f.id}
                    className="rounded-lg border border-[var(--studio-line)] p-3 text-sm"
                  >
                    <p className="text-[var(--studio-ink)]">
                      {f.problematicStatement}
                    </p>
                    <p className="mt-1 text-xs text-[var(--studio-muted)]">
                      {f.reason}
                    </p>
                    <p className="mt-1 text-xs text-[var(--studio-accent)]">
                      → {f.suggestedCorrection}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Save as template */}
      <SectionShell title={tUI(lang, "saveAsTemplate")}>
        <div className="flex flex-wrap items-end gap-3">
          <Field label={tUI(lang, "template")} className="flex-1">
            {({ id }) => (
              <TextInput
                id={id}
                value={templateName}
                onChange={(e) => {
                  setTemplateName(e.target.value);
                  setTemplateSaved(false);
                }}
                placeholder={`${meta.archetype} template`}
              />
            )}
          </Field>
          <Button
            variant="secondary"
            onClick={saveTemplate}
            disabled={!templateName.trim() || pending}
          >
            {tUI(lang, "saveAsTemplate")}
          </Button>
          {templateSaved && (
            <span className="text-sm text-emerald-700">
              {tUI(lang, "templateSaved")}
            </span>
          )}
        </div>
      </SectionShell>

      {error && (
        <p className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </p>
      )}

      {/* Action bar */}
      <div className="sticky bottom-0 mt-8 flex items-center justify-between gap-3 border-t border-[var(--studio-line)] bg-[var(--studio-paper)]/90 py-4 backdrop-blur">
        <div className="flex items-center gap-2">
          {mode === "edit" && (
            <Button variant="danger" onClick={remove} disabled={pending}>
              <Trash2 className="size-4" />
              {tUI(lang, "remove")}
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={() =>
              router.push(
                mode === "edit"
                  ? `/studio/projects/${projectId}/personas/${persona.id}`
                  : `/studio/projects/${projectId}/personas`,
              )
            }
            disabled={pending}
          >
            {tUI(lang, "cancel")}
          </Button>
          <Button variant="primary" onClick={save} disabled={pending}>
            {pending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            {tUI(lang, "save")}
          </Button>
        </div>
      </div>
    </main>
  );
}

function SectionShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6 rounded-2xl border border-[var(--studio-line)] p-5">
      <h2 className="studio-display mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--studio-ink)]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function TagEditor({
  tags,
  onChange,
  lang,
}: {
  tags: string[];
  onChange: (tags: string[]) => void;
  lang: StudioLang;
}) {
  const [value, setValue] = useState("");
  function add() {
    const v = value.trim();
    if (!v || tags.includes(v)) return;
    onChange([...tags, v]);
    setValue("");
  }
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-1 rounded-full studio-accent-soft px-2.5 py-1 text-sm"
          >
            {t}
            <button
              type="button"
              onClick={() => onChange(tags.filter((x) => x !== t))}
              aria-label={`${tUI(lang, "remove")} ${t}`}
              className="text-[var(--studio-muted)] hover:text-rose-600"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <TextInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder={tUI(lang, "addTag")}
        />
        <Button variant="secondary" onClick={add}>
          {tUI(lang, "add")}
        </Button>
      </div>
    </div>
  );
}

function SectionEditor({
  section,
  index,
  total,
  sources,
  lang,
  onUpdate,
  onMove,
  onRemove,
  onAddStatement,
  onUpdateStatement,
  onRemoveStatement,
}: {
  section: EditorSection;
  index: number;
  total: number;
  sources: SourceDocument[];
  lang: StudioLang;
  onUpdate: (patch: Partial<EditorSection>) => void;
  onMove: (dir: -1 | 1) => void;
  onRemove: () => void;
  onAddStatement: () => void;
  onUpdateStatement: (statementId: string, patch: Partial<PersonaStatement>) => void;
  onRemoveStatement: (statementId: string) => void;
}) {
  return (
    <section className="rounded-2xl border border-[var(--studio-line)] p-4">
      <div className="flex flex-wrap items-center gap-2">
        <TextInput
          value={section.title}
          onChange={(e) =>
            onUpdate({
              title: e.target.value,
              key: slugifyKey(e.target.value),
            })
          }
          aria-label={tUI(lang, "sectionTitle")}
          className="max-w-xs font-semibold"
        />
        <Select
          value={section.type}
          onChange={(e) => onUpdate({ type: e.target.value as SectionType })}
          aria-label={tUI(lang, "sectionType")}
          className="max-w-[10rem]"
        >
          {SECTION_TYPES.map((t) => (
            <option key={t} value={t}>
              {tSectionType(lang, t)}
            </option>
          ))}
        </Select>
        <label className="flex items-center gap-1.5 text-sm text-[var(--studio-muted)]">
          <input
            type="checkbox"
            checked={section.visible}
            onChange={(e) => onUpdate({ visible: e.target.checked })}
            className="size-4 accent-[var(--studio-accent)]"
          />
          {section.visible ? tUI(lang, "visible") : tUI(lang, "hidden")}
        </label>
        <div className="ml-auto flex items-center gap-1">
          <IconButton
            label={tUI(lang, "moveUp")}
            onClick={() => onMove(-1)}
            disabled={index === 0}
          >
            <ArrowUp className="size-4" />
          </IconButton>
          <IconButton
            label={tUI(lang, "moveDown")}
            onClick={() => onMove(1)}
            disabled={index === total - 1}
          >
            <ArrowDown className="size-4" />
          </IconButton>
          <IconButton label={tUI(lang, "removeSection")} onClick={onRemove} danger>
            <Trash2 className="size-4" />
          </IconButton>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {section.statements.map((st) => (
          <StatementEditor
            key={st.id}
            statement={st}
            sources={sources}
            lang={lang}
            onUpdate={(patch) => onUpdateStatement(st.id, patch)}
            onRemove={() => onRemoveStatement(st.id)}
          />
        ))}
      </div>

      <Button variant="ghost" onClick={onAddStatement} className="mt-3">
        <Plus className="size-4" />
        {tUI(lang, "addStatement")}
      </Button>
    </section>
  );
}

function StatementEditor({
  statement,
  sources,
  lang,
  onUpdate,
  onRemove,
}: {
  statement: PersonaStatement;
  sources: SourceDocument[];
  lang: StudioLang;
  onUpdate: (patch: Partial<PersonaStatement>) => void;
  onRemove: () => void;
}) {
  const [showSources, setShowSources] = useState(false);
  function toggleSource(id: string) {
    const set = new Set(statement.sourceIds);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    onUpdate({ sourceIds: [...set] });
  }
  return (
    <div className="rounded-xl border border-[var(--studio-line)] bg-[var(--studio-panel)]/40 p-3">
      <TextArea
        value={statement.content}
        onChange={(e) => onUpdate({ content: e.target.value })}
        aria-label={tUI(lang, "statementContent")}
        className="min-h-16 bg-[var(--studio-paper)]"
      />
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <label className="flex items-center gap-1.5 text-xs">
          <span className="text-[var(--studio-muted)]">
            {tUI(lang, "evidenceStatusLabel")}
          </span>
          <select
            value={statement.evidenceStatus}
            onChange={(e) =>
              onUpdate({ evidenceStatus: e.target.value as EvidenceStatus })
            }
            className="rounded-md border border-[var(--studio-line)] bg-[var(--studio-paper)] px-2 py-1 text-xs"
          >
            {EVIDENCE_STATUSES.map((s) => (
              <option key={s} value={s}>
                {tEvidence(lang, s)}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-1.5 text-xs">
          <span className="text-[var(--studio-muted)]">
            {tUI(lang, "confidence")}
          </span>
          <select
            value={statement.confidence}
            onChange={(e) =>
              onUpdate({ confidence: e.target.value as ConfidenceLevel })
            }
            className="rounded-md border border-[var(--studio-line)] bg-[var(--studio-paper)] px-2 py-1 text-xs"
          >
            {CONFIDENCE_LEVELS.map((c) => (
              <option key={c} value={c}>
                {tConfidence(lang, c)}
              </option>
            ))}
          </select>
        </label>
        <EvidenceTag status={statement.evidenceStatus} lang={lang} />
        <button
          type="button"
          onClick={() => setShowSources((v) => !v)}
          className="text-xs text-[var(--studio-muted)] underline-offset-2 hover:underline"
        >
          {tUI(lang, "linkedSources")} ({statement.sourceIds.length})
        </button>
        <button
          type="button"
          onClick={onRemove}
          aria-label={tUI(lang, "removeStatement")}
          className="ml-auto rounded p-1 text-[var(--studio-muted)] hover:text-rose-600"
        >
          <Trash2 className="size-4" />
        </button>
      </div>
      {showSources && (
        <div className="mt-2 space-y-1 border-t border-[var(--studio-line)] pt-2">
          {sources.length === 0 ? (
            <p className="text-xs text-[var(--studio-muted)]">
              {tUI(lang, "noSources")}
            </p>
          ) : (
            sources.map((s) => (
              <label
                key={s.id}
                className="flex items-center gap-2 text-xs text-[var(--studio-ink)]"
              >
                <input
                  type="checkbox"
                  checked={statement.sourceIds.includes(s.id)}
                  onChange={() => toggleSource(s.id)}
                  className="size-3.5 accent-[var(--studio-accent)]"
                />
                {s.name}
              </label>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function IconButton({
  label,
  onClick,
  disabled,
  danger,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={cn(
        "rounded-md p-1.5 text-[var(--studio-muted)] transition-colors hover:bg-[var(--studio-panel)] disabled:opacity-30",
        danger ? "hover:text-rose-600" : "hover:text-[var(--studio-ink)]",
      )}
    >
      {children}
    </button>
  );
}

/** Reconstruct a full Persona from edited identity + sections. */
function buildPersona(
  original: Persona,
  meta: {
    name: string;
    archetype: string;
    category: string;
    oneLineEssence: string;
    accentColor: string;
    quote: string;
    quoteType: QuoteType;
    confidenceLevel: ConfidenceLevel;
    confidenceExplanation: string;
    behaviouralTags: string[];
    demographicContext: Persona["demographicContext"];
  },
  sections: EditorSection[],
): Persona {
  const reindexed = sections.map((s, i) => ({ ...s, order: i }));
  const commonSections = reindexed
    .filter((s) => s.scope === "COMMON")
    .map(stripScope);
  const domainSections = reindexed
    .filter((s) => s.scope === "DOMAIN")
    .map(stripScope);

  return {
    ...original,
    name: meta.name,
    archetype: meta.archetype,
    category: meta.category,
    oneLineEssence: meta.oneLineEssence,
    accentColor: meta.accentColor,
    quote: meta.quote,
    quoteType: meta.quoteType,
    confidenceLevel: meta.confidenceLevel,
    confidenceExplanation: meta.confidenceExplanation,
    behaviouralTags: meta.behaviouralTags,
    demographicContext: meta.demographicContext,
    commonSections,
    domainSections,
  };
}

function stripScope(section: EditorSection): PersonaSection {
  const { scope: _scope, ...rest } = section;
  void _scope;
  return rest;
}
