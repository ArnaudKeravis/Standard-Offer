"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getLabsPackAction } from "@/app/labs/actions";
import { LabsDeck } from "@/components/sodexo-labs/deck/labs-deck";
import { AudienceGate } from "@/components/sodexo-labs/gates/audience-gate";
import { LanguageGate } from "@/components/sodexo-labs/gates/language-gate";
import { TerritoryGate } from "@/components/sodexo-labs/gates/territory-gate";
import { getLabsChrome } from "@/lib/sodexo-labs/data/chrome";
import { labsSessionQuery } from "@/lib/sodexo-labs/parse-session";
import type {
  LabsArea,
  LabsAudience,
  LabsLang,
  LabsPack,
} from "@/lib/sodexo-labs/schemas";

type LabsSessionProps = {
  initialLang: LabsLang | null;
  initialAudience: LabsAudience | null;
  initialArea: LabsArea | null;
  initialPack: LabsPack | null;
};

export function LabsSession({
  initialLang,
  initialAudience,
  initialArea,
  initialPack,
}: LabsSessionProps) {
  const router = useRouter();
  const [lang, setLang] = useState(initialLang);
  const [audience, setAudience] = useState(initialAudience);
  const [area, setArea] = useState(initialArea);
  const [pack, setPack] = useState(initialPack);
  const [loadingPack, setLoadingPack] = useState(false);

  useEffect(() => {
    setLang(initialLang);
    setAudience(initialAudience);
    setArea(initialArea);
    setPack(initialPack);
  }, [initialLang, initialAudience, initialArea, initialPack]);

  useEffect(() => {
    if (!lang || !audience || !area || pack) return;

    let cancelled = false;
    setLoadingPack(true);

    void getLabsPackAction({ lang, audience, area })
      .then((resolved) => {
        if (!cancelled) setPack(resolved);
      })
      .finally(() => {
        if (!cancelled) setLoadingPack(false);
      });

    return () => {
      cancelled = true;
    };
  }, [lang, audience, area, pack]);

  function selectLang(next: LabsLang) {
    setLang(next);
    setAudience(null);
    setArea(null);
    setPack(null);
    router.replace(`/labs${labsSessionQuery({ lang: next })}`);
  }

  function selectAudience(next: LabsAudience) {
    if (!lang) return;
    setAudience(next);
    setArea(null);
    setPack(null);
    router.replace(`/labs${labsSessionQuery({ lang, audience: next })}`);
  }

  function selectArea(next: LabsArea) {
    if (!lang || !audience) return;
    setArea(next);
    setPack(null);
    router.replace(
      `/labs${labsSessionQuery({ lang, audience, area: next })}`,
    );
  }

  function changeSession() {
    setLang(null);
    setAudience(null);
    setArea(null);
    setPack(null);
    router.push("/labs");
  }

  const stageKey = !lang
    ? "language"
    : !audience
      ? "audience"
      : !area
        ? "territory"
        : pack
          ? "deck"
          : "loading";

  return (
    <main className="min-h-screen">
      <AnimatePresence mode="wait">
        {stageKey === "language" ? (
          <LanguageGate key="language" onSelect={selectLang} />
        ) : null}

        {stageKey === "audience" && lang ? (
          <AudienceGate
            key="audience"
            lang={lang}
            onSelect={selectAudience}
          />
        ) : null}

        {stageKey === "territory" && lang ? (
          <TerritoryGate
            key="territory"
            lang={lang}
            onSelect={selectArea}
          />
        ) : null}

        {stageKey === "loading" ? (
          <LabsLoadingScreen
            key="loading"
            loading={loadingPack}
            message={getLabsChrome(lang ?? "en").preparingSession}
          />
        ) : null}

        {stageKey === "deck" && pack ? (
          <LabsDeck key="deck" pack={pack} onChangeSession={changeSession} />
        ) : null}
      </AnimatePresence>
    </main>
  );
}

function LabsLoadingScreen({
  loading,
  message,
}: {
  loading: boolean;
  message: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      className="labs-body flex min-h-screen items-center justify-center px-[6vw]"
      aria-busy={loading}
      aria-live="polite"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduceMotion ? undefined : { opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.3 }}
    >
      <p className="text-lg text-[var(--labs-muted)]">{message}</p>
    </motion.section>
  );
}
