"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FileText, Loader2, Plus, Trash2, Upload } from "lucide-react";
import type { SourceDocument } from "@/lib/persona-studio/ai/schemas/evidence";
import type {
  ConfidentialityLabel,
  SourceCategory,
} from "@/lib/persona-studio/ai/schemas/common";
import {
  tConfidentiality,
  tSourceCategory,
  tUI,
  type StudioLang,
} from "@/lib/persona-studio/utils/i18n";
import {
  Button,
  Field,
  Select,
  TextArea,
  TextInput,
} from "@/components/persona-studio/shared/form-controls";
import {
  addSourceAction,
  deleteSourceAction,
  uploadSourceAction,
} from "@/app/studio/projects/[projectId]/sources/actions";

const SOURCE_CATEGORIES: SourceCategory[] = [
  "INTERVIEW",
  "OBSERVATION",
  "SURVEY",
  "EXISTING_PERSONA",
  "BRIEF",
  "DESK_RESEARCH",
  "OTHER",
];
const CONFIDENTIALITY_LABELS: ConfidentialityLabel[] = [
  "PUBLIC",
  "INTERNAL",
  "CLIENT_CONFIDENTIAL",
  "RESTRICTED",
];

export function SourceManager({
  projectId,
  sources,
  lang = "en",
}: {
  projectId: string;
  sources: SourceDocument[];
  lang?: StudioLang;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState<SourceCategory>("INTERVIEW");
  const [confidentiality, setConfidentiality] =
    useState<ConfidentialityLabel>("INTERNAL");
  const [participantRef, setParticipantRef] = useState("");
  const [text, setText] = useState("");

  function add() {
    if (!name.trim()) return;
    setError(null);
    setNotice(null);
    startTransition(async () => {
      try {
        await addSourceAction(projectId, {
          name: name.trim(),
          type: "text",
          category,
          confidentiality,
          participantRef: participantRef.trim() || undefined,
          extractedText: text.trim(),
        });
        setName("");
        setParticipantRef("");
        setText("");
        setNotice(tUI(lang, "chunksReady"));
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to add source");
      }
    });
  }

  function upload(fileList: FileList | null) {
    const file = fileList?.[0];
    if (!file) return;
    setError(null);
    setNotice(null);
    const formData = new FormData();
    formData.set("file", file);
    formData.set("category", category);
    formData.set("confidentiality", confidentiality);
    if (participantRef.trim()) {
      formData.set("participantRef", participantRef.trim());
    }
    if (name.trim()) formData.set("name", name.trim());
    startTransition(async () => {
      try {
        const result = await uploadSourceAction(projectId, formData);
        setNotice(
          result.warning
            ? `${tUI(lang, "chunksReady")} ${result.warning}`
            : tUI(lang, "chunksReady"),
        );
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Upload failed");
      }
    });
  }

  function remove(id: string) {
    setError(null);
    startTransition(async () => {
      try {
        await deleteSourceAction(projectId, id);
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to remove source");
      }
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
                    setCategory(e.target.value as SourceCategory)
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
                    setConfidentiality(e.target.value as ConfidentialityLabel)
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
          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              onClick={add}
              disabled={!name.trim() || pending}
            >
              {pending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Plus className="size-4" />
              )}
              {tUI(lang, "addSource")}
            </Button>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[var(--studio-line)] px-3 py-2 text-sm font-medium text-[var(--studio-ink)] hover:border-[var(--studio-accent)]">
              {pending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Upload className="size-4" />
              )}
              {pending ? tUI(lang, "uploading") : tUI(lang, "uploadFile")}
              <input
                type="file"
                accept=".txt,.md,.markdown,.csv,.json,.pdf,text/plain,application/pdf"
                className="sr-only"
                disabled={pending}
                onChange={(e) => {
                  upload(e.target.files);
                  e.target.value = "";
                }}
              />
            </label>
          </div>
          <p className="text-xs text-[var(--studio-muted)]">
            {tUI(lang, "uploadHint")}
          </p>
          {notice && <p className="text-sm text-emerald-700">{notice}</p>}
          {error && <p className="text-sm text-rose-600">{error}</p>}
        </div>
      </div>

      <div>
        <h2 className="studio-display mb-4 text-sm font-semibold uppercase tracking-wider">
          {tUI(lang, "sources")} ({sources.length})
        </h2>
        {sources.length === 0 ? (
          <p className="text-sm text-[var(--studio-muted)]">
            {tUI(lang, "noSources")}
          </p>
        ) : (
          <ul className="space-y-2">
            {sources.map((s) => (
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
                  onClick={() => remove(s.id)}
                  disabled={pending}
                  aria-label={tUI(lang, "remove")}
                  className="rounded-md p-1 text-[var(--studio-muted)] hover:bg-[var(--studio-panel)] hover:text-rose-600 disabled:opacity-40"
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
