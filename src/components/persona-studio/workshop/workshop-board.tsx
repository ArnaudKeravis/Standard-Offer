"use client";

import { useEffect, useState } from "react";
import {
  Lightbulb,
  Plus,
  StickyNote as StickyIcon,
  Trash2,
  Vote,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { StickyNote } from "@/lib/persona-studio/ai/schemas/workshop";
import type { StudioLang } from "@/lib/persona-studio/utils/i18n";
import { tWorkshop } from "@/lib/persona-studio/utils/workshop-i18n";
import {
  clearBoard,
  emptyBoard,
  loadBoard,
  newNoteId,
  saveBoard,
  synthesiseBoard,
  type BoardState,
} from "@/lib/persona-studio/workshop/board-store";

export interface WorkshopPersonaOption {
  id: string;
  name: string;
  accentColor: string;
}

type NoteKind = StickyNote["kind"];

const KINDS: NoteKind[] = ["NOTE", "ASSUMPTION", "QUESTION", "OPPORTUNITY"];

/**
 * Lightweight facilitator board: sticky notes, persona assignment, voting,
 * assumptions/questions/opportunities, and a deterministic synthesis. Persists
 * in localStorage (see board-store) — no realtime multiplayer.
 */
export function WorkshopBoard({
  projectId,
  personas,
  lang,
}: {
  projectId: string;
  personas: WorkshopPersonaOption[];
  lang: StudioLang;
}) {
  const [board, setBoard] = useState<BoardState>(() =>
    emptyBoard(
      projectId,
      personas.map((p) => p.id),
    ),
  );
  const [hydrated, setHydrated] = useState(false);
  const [text, setText] = useState("");
  const [kind, setKind] = useState<NoteKind>("NOTE");
  const [assignTo, setAssignTo] = useState<string>("");
  const [showSynthesis, setShowSynthesis] = useState(false);

  const byId = new Map(personas.map((p) => [p.id, p]));

  useEffect(() => {
    setBoard(loadBoard(projectId, personas.map((p) => p.id)));
    setHydrated(true);
  }, [projectId, personas]);

  useEffect(() => {
    if (!hydrated) return;
    saveBoard(board);
  }, [board, hydrated]);

  function addNote(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    const note: StickyNote = {
      id: newNoteId(),
      workshopId: `local-${projectId}`,
      text: trimmed,
      personaId: assignTo || undefined,
      votes: 0,
      kind,
      createdAt: new Date().toISOString(),
    };
    setBoard((prev) => ({ ...prev, notes: [note, ...prev.notes] }));
    setText("");
    setShowSynthesis(false);
  }

  function vote(id: string) {
    setBoard((prev) => ({
      ...prev,
      notes: prev.notes.map((n) =>
        n.id === id ? { ...n, votes: n.votes + 1 } : n,
      ),
    }));
  }

  function remove(id: string) {
    setBoard((prev) => ({
      ...prev,
      notes: prev.notes.filter((n) => n.id !== id),
    }));
  }

  function handleClear() {
    if (!window.confirm(tWorkshop(lang, "clearBoardConfirm"))) return;
    clearBoard(projectId);
    setBoard(emptyBoard(projectId, personas.map((p) => p.id)));
    setShowSynthesis(false);
  }

  const synthesis = showSynthesis ? synthesiseBoard(board) : null;

  return (
    <div className="space-y-8">
      <p className="text-sm text-[var(--studio-muted)]">
        {tWorkshop(lang, "workshopIntro")}
      </p>

      <section aria-label={tWorkshop(lang, "boardPersonas")}>
        <h2 className="studio-display text-sm font-semibold uppercase tracking-wider text-[var(--studio-ink)]">
          {tWorkshop(lang, "boardPersonas")}
        </h2>
        <ul className="mt-2 flex flex-wrap gap-2">
          {personas.map((p) => (
            <li
              key={p.id}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--studio-line)] px-3 py-1 text-sm"
            >
              <span
                aria-hidden
                className="size-2.5 rounded-full"
                style={{ backgroundColor: p.accentColor }}
              />
              {p.name}
            </li>
          ))}
        </ul>
      </section>

      <form
        onSubmit={addNote}
        className="rounded-3xl border border-[var(--studio-line)] bg-[var(--studio-paper)] p-5"
      >
        <div className="flex flex-wrap items-end gap-3">
          <label className="min-w-[12rem] flex-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--studio-muted)]">
              {tWorkshop(lang, "notePlaceholder")}
            </span>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={tWorkshop(lang, "notePlaceholder")}
              className="mt-1 w-full rounded-2xl border border-[var(--studio-line)] px-3 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
            />
          </label>
          <label>
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--studio-muted)]">
              {tWorkshop(lang, "noteKind")}
            </span>
            <select
              value={kind}
              onChange={(e) => setKind(e.target.value as NoteKind)}
              className="mt-1 block rounded-2xl border border-[var(--studio-line)] bg-[var(--studio-paper)] px-3 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
            >
              {KINDS.map((k) => (
                <option key={k} value={k}>
                  {kindLabel(lang, k)}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--studio-muted)]">
              {tWorkshop(lang, "assignTo")}
            </span>
            <select
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              className="mt-1 block rounded-2xl border border-[var(--studio-line)] bg-[var(--studio-paper)] px-3 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
            >
              <option value="">{tWorkshop(lang, "unassigned")}</option>
              {personas.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--studio-ink)] px-4 py-2.5 text-sm font-medium text-[var(--studio-paper)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
          >
            <Plus aria-hidden className="size-4" />
            {tWorkshop(lang, "addNote")}
          </button>
        </div>
      </form>

      <div className="flex flex-wrap items-center gap-3">
        <p className="text-sm text-[var(--studio-muted)]">
          {board.notes.length} {tWorkshop(lang, "noteCount")}
        </p>
        <button
          type="button"
          onClick={() => setShowSynthesis(true)}
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--studio-line)] px-3.5 py-1.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
        >
          <Lightbulb aria-hidden className="size-4" />
          {tWorkshop(lang, "generateSynthesis")}
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-[var(--studio-muted)] hover:text-rose-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
        >
          <Trash2 aria-hidden className="size-4" />
          {tWorkshop(lang, "clearBoard")}
        </button>
      </div>

      {board.notes.length === 0 ? (
        <p className="text-sm text-[var(--studio-muted)]">
          {tWorkshop(lang, "emptyBoard")}
        </p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {board.notes.map((note) => {
            const persona = note.personaId
              ? byId.get(note.personaId)
              : undefined;
            return (
              <li
                key={note.id}
                className={cn(
                  "rounded-2xl border border-[var(--studio-line)] p-4",
                  kindTone(note.kind),
                )}
              >
                <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wide text-[var(--studio-muted)]">
                  <StickyIcon aria-hidden className="size-3.5" />
                  {kindLabel(lang, note.kind)}
                  {persona && (
                    <span className="ml-auto inline-flex items-center gap-1.5 normal-case tracking-normal">
                      <span
                        aria-hidden
                        className="size-2 rounded-full"
                        style={{ backgroundColor: persona.accentColor }}
                      />
                      {persona.name}
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-[var(--studio-ink)]">
                  {note.text}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => vote(note.id)}
                    className="inline-flex items-center gap-1 rounded-full border border-[var(--studio-line)] px-2.5 py-1 text-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
                  >
                    <Vote aria-hidden className="size-3.5" />
                    {tWorkshop(lang, "vote")}
                    <span className="tabular-nums font-medium">
                      {note.votes}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(note.id)}
                    className="ml-auto text-xs text-[var(--studio-muted)] hover:text-rose-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
                  >
                    {tWorkshop(lang, "removeNote")}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {synthesis && (
        <section
          aria-labelledby="board-synthesis"
          className="rounded-3xl border border-[var(--studio-line)] bg-[var(--studio-paper)] p-6"
        >
          <h2
            id="board-synthesis"
            className="studio-display text-sm font-semibold uppercase tracking-wider text-[var(--studio-ink)]"
          >
            {tWorkshop(lang, "synthesis")}
          </h2>
          {board.notes.length === 0 ? (
            <p className="mt-3 text-sm text-[var(--studio-muted)]">
              {tWorkshop(lang, "synthesisEmpty")}
            </p>
          ) : (
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              <SynthList
                title={tWorkshop(lang, "topVoted")}
                notes={synthesis.topVoted}
              />
              <SynthList
                title={tWorkshop(lang, "openAssumptions")}
                notes={synthesis.assumptions}
              />
              <SynthList
                title={tWorkshop(lang, "openQuestions")}
                notes={synthesis.questions}
              />
              <SynthList
                title={tWorkshop(lang, "opportunities")}
                notes={synthesis.opportunities}
              />
              <div className="md:col-span-2">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--studio-muted)]">
                  {tWorkshop(lang, "byPersona")}
                </h3>
                <ul className="mt-2 space-y-2 text-sm">
                  {Object.entries(synthesis.byPersona).map(([key, notes]) => (
                    <li key={key}>
                      <span className="font-medium">
                        {key === "__unassigned__"
                          ? tWorkshop(lang, "unassigned")
                          : (byId.get(key)?.name ?? key)}
                      </span>
                      : {notes.length} {tWorkshop(lang, "noteCount")}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

function SynthList({ title, notes }: { title: string; notes: StickyNote[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--studio-muted)]">
        {title}
      </h3>
      {notes.length === 0 ? (
        <p className="mt-1 text-sm text-[var(--studio-muted)]">—</p>
      ) : (
        <ul className="mt-1 list-disc space-y-0.5 pl-4 text-sm">
          {notes.map((n) => (
            <li key={n.id}>
              {n.text}
              {n.votes > 0 ? ` (${n.votes})` : ""}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function kindLabel(lang: StudioLang, kind: NoteKind): string {
  switch (kind) {
    case "ASSUMPTION":
      return tWorkshop(lang, "kindAssumption");
    case "QUESTION":
      return tWorkshop(lang, "kindQuestion");
    case "OPPORTUNITY":
      return tWorkshop(lang, "kindOpportunity");
    default:
      return tWorkshop(lang, "kindNote");
  }
}

function kindTone(kind: NoteKind): string {
  switch (kind) {
    case "ASSUMPTION":
      return "bg-amber-50/60";
    case "QUESTION":
      return "bg-sky-50/60";
    case "OPPORTUNITY":
      return "bg-emerald-50/60";
    default:
      return "bg-[var(--studio-paper)]";
  }
}
