"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ConfidenceLevel } from "@/lib/persona-studio/ai/schemas/common";
import type { PersonaChatResponse } from "@/lib/persona-studio/ai/schemas/chat";
import type { ChatTurn } from "@/lib/persona-studio/ai/schemas/chat-request";
import { PersonaPortrait } from "@/components/persona-studio/shared/persona-portrait";
import { ConfidenceBadge } from "@/components/persona-studio/shared/confidence-badge";
import { ResearchBasis } from "@/components/persona-studio/chat/research-basis";
import {
  starterQuestions,
  tChat,
} from "@/lib/persona-studio/utils/chat-i18n";
import type { StudioLang } from "@/lib/persona-studio/utils/i18n";
import {
  clearConversation,
  loadConversation,
  newId,
  saveConversation,
  type StoredConversation,
  type StoredMessage,
} from "@/lib/persona-studio/chat/conversation-store";

export interface PersonaChatViewModel {
  projectId: string;
  personaId: string;
  name: string;
  archetype: string;
  portraitUrl?: string;
  confidenceLevel: ConfidenceLevel;
  confidenceExplanation: string;
  sourceNames: Record<string, string>;
  lang: StudioLang;
}

const MAX_HISTORY_TURNS = 12;

export function PersonaChat({ persona }: { persona: PersonaChatViewModel }) {
  const { lang } = persona;
  const [scenario, setScenario] = useState("");
  const [messages, setMessages] = useState<StoredMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const listEndRef = useRef<HTMLDivElement>(null);

  // Hydrate from the (client-only) conversation store after mount.
  useEffect(() => {
    const stored = loadConversation(persona.projectId, persona.personaId);
    setScenario(stored.scenario);
    setMessages(stored.messages);
    setHydrated(true);
  }, [persona.projectId, persona.personaId]);

  // Persist whenever the conversation changes.
  useEffect(() => {
    if (!hydrated) return;
    const conversation: StoredConversation = {
      personaId: persona.personaId,
      projectId: persona.projectId,
      scenario,
      messages,
      updatedAt: new Date().toISOString(),
    };
    saveConversation(conversation);
  }, [hydrated, scenario, messages, persona.personaId, persona.projectId]);

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  async function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    setError(null);
    const userMessage: StoredMessage = {
      id: newId(),
      role: "user",
      content: trimmed,
      createdAt: new Date().toISOString(),
    };
    const history: ChatTurn[] = [...messages, userMessage]
      .slice(-MAX_HISTORY_TURNS)
      .map((m) => ({
        role: m.role,
        content: m.content,
      }));

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: persona.projectId,
          personaId: persona.personaId,
          scenario: scenario.trim() || undefined,
          question: trimmed,
          history: history.slice(0, -1),
          lang: persona.lang,
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = (await res.json()) as {
        response: PersonaChatResponse;
        isMock: boolean;
      };
      const personaMessage: StoredMessage = {
        id: newId(),
        role: "persona",
        content: data.response.personaResponse,
        response: data.response,
        isMock: data.isMock,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, personaMessage]);
    } catch {
      setError(tChat(lang, "error"));
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    clearConversation(persona.personaId);
    setMessages([]);
    setError(null);
  }

  const isEmpty = messages.length === 0;

  return (
    <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-3xl flex-col px-4 pb-6 pt-6 sm:px-6">
      {/* Header */}
      <header className="flex items-start gap-4 border-b border-[var(--studio-line)] pb-5">
        <PersonaPortrait
          name={persona.name}
          src={persona.portraitUrl}
          className="size-16 shrink-0"
          rounded="rounded-2xl"
          sizes="64px"
        />
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--studio-accent)]">
            {persona.archetype}
          </p>
          <h1 className="studio-display truncate text-2xl font-bold text-[var(--studio-ink)]">
            {persona.name}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <ConfidenceBadge level={persona.confidenceLevel} lang={lang} />
            <span className="inline-flex items-center gap-1.5 rounded-full studio-accent-soft px-2.5 py-1 text-xs font-medium">
              <Sparkles aria-hidden className="size-3.5" />
              {tChat(lang, "researchGroundedSimulation")}
            </span>
          </div>
        </div>
        {!isEmpty && (
          <button
            type="button"
            onClick={handleClear}
            className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-[var(--studio-line)] px-2.5 py-1.5 text-xs text-[var(--studio-muted)] hover:text-[var(--studio-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
          >
            <Trash2 aria-hidden className="size-3.5" />
            {tChat(lang, "clear")}
          </button>
        )}
      </header>

      <p className="mt-3 text-xs text-[var(--studio-muted)]">
        {tChat(lang, "simulationDisclaimer")}
      </p>

      {/* Scenario */}
      <div className="mt-4">
        <label
          htmlFor="scenario"
          className="text-xs font-semibold text-[var(--studio-ink)]"
        >
          {tChat(lang, "scenarioLabel")}
        </label>
        <textarea
          id="scenario"
          value={scenario}
          onChange={(e) => setScenario(e.target.value)}
          placeholder={tChat(lang, "scenarioPlaceholder")}
          rows={2}
          className="mt-1 w-full resize-none rounded-xl border border-[var(--studio-line)] bg-[var(--studio-paper)] px-3 py-2 text-sm text-[var(--studio-ink)] placeholder:text-[var(--studio-muted)] focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[var(--studio-accent)]"
        />
      </div>

      {/* Messages */}
      <div className="mt-5 flex-1 space-y-4">
        {isEmpty && (
          <div className="rounded-2xl border border-dashed border-[var(--studio-line)] p-5 text-sm text-[var(--studio-muted)]">
            {tChat(lang, "emptyState")}
          </div>
        )}

        {messages.map((m) =>
          m.role === "user" ? (
            <div key={m.id} className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-[var(--studio-accent)] px-4 py-2.5 text-sm text-white">
                {m.content}
              </div>
            </div>
          ) : (
            <div key={m.id} className="flex flex-col items-start">
              <div className="max-w-[90%] rounded-2xl rounded-bl-sm border border-[var(--studio-line)] bg-[var(--studio-paper)] px-4 py-2.5 text-sm leading-relaxed text-[var(--studio-ink)]">
                {m.content}
              </div>
              <div className="w-full max-w-[90%]">
                <ResearchBasis
                  basis={m.response.basis}
                  suggestedResearchQuestion={m.response.suggestedResearchQuestion}
                  sourceNames={persona.sourceNames}
                  lang={lang}
                />
                {m.isMock && (
                  <p className="mt-1 text-[0.66rem] text-[var(--studio-muted)]">
                    {tChat(lang, "poweredByMock")}
                  </p>
                )}
              </div>
            </div>
          ),
        )}

        {loading && (
          <div className="flex items-center gap-2 text-sm text-[var(--studio-muted)]">
            <span className="inline-flex gap-1">
              <Dot /> <Dot /> <Dot />
            </span>
            {tChat(lang, "thinking")}
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
          >
            {error}
          </div>
        )}
        <div ref={listEndRef} />
      </div>

      {/* Starter questions */}
      {isEmpty && (
        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold text-[var(--studio-muted)]">
            {tChat(lang, "starterHeading")}
          </p>
          <div className="flex flex-wrap gap-2">
            {starterQuestions(lang).map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => ask(q)}
                className="rounded-full border border-[var(--studio-line)] bg-[var(--studio-paper)] px-3 py-1.5 text-left text-xs text-[var(--studio-ink)] hover:border-[var(--studio-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
        className="sticky bottom-0 mt-4 flex items-end gap-2 bg-[var(--studio-paper)] pt-2"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              ask(input);
            }
          }}
          placeholder={tChat(lang, "inputPlaceholder")}
          rows={1}
          className="max-h-32 min-h-[2.75rem] flex-1 resize-none rounded-2xl border border-[var(--studio-line)] bg-[var(--studio-paper)] px-4 py-3 text-sm text-[var(--studio-ink)] placeholder:text-[var(--studio-muted)] focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[var(--studio-accent)]"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          aria-label={tChat(lang, "send")}
          className={cn(
            "inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--studio-accent)] text-white transition-opacity",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]",
            (loading || !input.trim()) && "opacity-40",
          )}
        >
          <Send aria-hidden className="size-4" />
        </button>
      </form>
    </div>
  );
}

function Dot() {
  return (
    <span className="inline-block size-1.5 animate-pulse rounded-full bg-[var(--studio-muted)]" />
  );
}
