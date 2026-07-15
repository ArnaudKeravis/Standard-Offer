"use client";

import { useState } from "react";
import {
  ChevronDown,
  FileText,
  FlaskConical,
  HelpCircle,
  Quote,
  Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { PersonaChatResponse } from "@/lib/persona-studio/ai/schemas/chat";
import { ConfidenceBadge } from "@/components/persona-studio/shared/confidence-badge";
import { tChat } from "@/lib/persona-studio/utils/chat-i18n";
import type { StudioLang } from "@/lib/persona-studio/utils/i18n";

/**
 * Level B of every persona answer: the collapsible "Research basis" panel. It
 * makes the simulation auditable — evidence used, persona statement ids, source
 * references, assumptions, missing information and the answer's confidence.
 */
export function ResearchBasis({
  basis,
  suggestedResearchQuestion,
  sourceNames,
  lang,
}: {
  basis: PersonaChatResponse["basis"];
  suggestedResearchQuestion: string | null;
  sourceNames: Record<string, string>;
  lang: StudioLang;
}) {
  const [open, setOpen] = useState(false);

  const sourceLabel = (id: string) => sourceNames[id] ?? id;

  return (
    <div className="mt-2 rounded-xl border border-[var(--studio-line)] bg-[var(--studio-panel)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-xs font-semibold text-[var(--studio-ink)]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)]",
        )}
      >
        <span className="inline-flex items-center gap-1.5">
          <FlaskConical aria-hidden className="size-3.5 text-[var(--studio-accent)]" />
          {tChat(lang, "researchBasis")}
        </span>
        <span className="inline-flex items-center gap-2 text-[var(--studio-muted)]">
          <ConfidenceBadge level={basis.confidence} lang={lang} />
          <ChevronDown
            aria-hidden
            className={cn("size-4 transition-transform", open && "rotate-180")}
          />
        </span>
      </button>

      {open && (
        <div className="space-y-3 border-t border-[var(--studio-line)] px-3 py-3 text-xs text-[var(--studio-ink)]/90">
          <BasisBlock
            icon={<Quote aria-hidden className="size-3.5" />}
            title={tChat(lang, "evidenceUsed")}
            empty={basis.evidenceExcerpts.length === 0}
            emptyLabel={tChat(lang, "none")}
          >
            <ul className="space-y-1.5">
              {basis.evidenceExcerpts.map((e, i) => (
                <li
                  key={`${e.sourceId}-${i}`}
                  className="rounded-lg border border-[var(--studio-line)] bg-[var(--studio-paper)] p-2"
                >
                  <span className="italic">“{e.excerpt}”</span>
                  <span className="mt-1 block text-[0.68rem] font-medium text-[var(--studio-muted)]">
                    {sourceLabel(e.sourceId)}
                  </span>
                </li>
              ))}
            </ul>
          </BasisBlock>

          <BasisBlock
            icon={<Tag aria-hidden className="size-3.5" />}
            title={tChat(lang, "personaTraits")}
            empty={basis.personaStatementIds.length === 0}
            emptyLabel={tChat(lang, "none")}
          >
            <ul className="flex flex-wrap gap-1">
              {basis.personaStatementIds.map((id) => (
                <li
                  key={id}
                  className="rounded border border-[var(--studio-line)] bg-[var(--studio-paper)] px-1.5 py-0.5 font-mono text-[0.66rem] text-[var(--studio-muted)]"
                >
                  {id}
                </li>
              ))}
            </ul>
          </BasisBlock>

          <BasisBlock
            icon={<FileText aria-hidden className="size-3.5" />}
            title={tChat(lang, "sourceReferences")}
            empty={basis.sourceIds.length === 0}
            emptyLabel={tChat(lang, "none")}
          >
            <ul className="flex flex-wrap gap-1">
              {basis.sourceIds.map((id) => (
                <li
                  key={id}
                  className="rounded border border-[var(--studio-line)] bg-[var(--studio-paper)] px-1.5 py-0.5 text-[0.68rem] text-[var(--studio-ink)]/80"
                >
                  {sourceLabel(id)}
                </li>
              ))}
            </ul>
          </BasisBlock>

          <BasisBlock
            icon={<HelpCircle aria-hidden className="size-3.5" />}
            title={tChat(lang, "assumptionsUsed")}
            empty={basis.assumptionsUsed.length === 0}
            emptyLabel={tChat(lang, "none")}
          >
            <ul className="list-disc space-y-1 pl-4">
              {basis.assumptionsUsed.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </BasisBlock>

          <BasisBlock
            icon={<HelpCircle aria-hidden className="size-3.5" />}
            title={tChat(lang, "missingInformation")}
            empty={basis.missingInformation.length === 0}
            emptyLabel={tChat(lang, "none")}
          >
            <ul className="list-disc space-y-1 pl-4">
              {basis.missingInformation.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </BasisBlock>

          {suggestedResearchQuestion && (
            <div className="rounded-lg border border-dashed border-[var(--studio-accent)]/50 bg-[var(--studio-paper)] p-2">
              <p className="text-[0.68rem] font-semibold uppercase tracking-wide text-[var(--studio-accent)]">
                {tChat(lang, "suggestedResearch")}
              </p>
              <p className="mt-1 text-[var(--studio-ink)]/90">
                {suggestedResearchQuestion}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function BasisBlock({
  icon,
  title,
  empty,
  emptyLabel,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  empty: boolean;
  emptyLabel: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h4 className="mb-1 inline-flex items-center gap-1.5 font-semibold text-[var(--studio-ink)]">
        <span className="text-[var(--studio-muted)]">{icon}</span>
        {title}
      </h4>
      {empty ? (
        <p className="text-[var(--studio-muted)]">{emptyLabel}</p>
      ) : (
        children
      )}
    </section>
  );
}
