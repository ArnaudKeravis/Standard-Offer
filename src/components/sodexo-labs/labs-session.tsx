"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getLabsPackAction } from "@/app/labs/actions";
import { LabsDeck } from "@/components/sodexo-labs/deck/labs-deck";
import { AudienceGate } from "@/components/sodexo-labs/gates/audience-gate";
import { TerritoryGate } from "@/components/sodexo-labs/gates/territory-gate";
import type {
  LabsArea,
  LabsAudience,
  LabsPack,
} from "@/lib/sodexo-labs/schemas";

type LabsSessionProps = {
  initialAudience: LabsAudience | null;
  initialArea: LabsArea | null;
  initialPack: LabsPack | null;
};

export function LabsSession({
  initialAudience,
  initialArea,
  initialPack,
}: LabsSessionProps) {
  const router = useRouter();
  const [audience, setAudience] = useState(initialAudience);
  const [area, setArea] = useState(initialArea);
  const [pack, setPack] = useState(initialPack);
  const [loadingPack, setLoadingPack] = useState(false);

  useEffect(() => {
    setAudience(initialAudience);
    setArea(initialArea);
    setPack(initialPack);
  }, [initialAudience, initialArea, initialPack]);

  useEffect(() => {
    if (!audience || !area || pack) return;

    let cancelled = false;
    setLoadingPack(true);

    void getLabsPackAction({ audience, area })
      .then((resolved) => {
        if (!cancelled) setPack(resolved);
      })
      .finally(() => {
        if (!cancelled) setLoadingPack(false);
      });

    return () => {
      cancelled = true;
    };
  }, [audience, area, pack]);

  function selectAudience(next: LabsAudience) {
    setAudience(next);
    setArea(null);
    setPack(null);
    router.replace(`/labs?audience=${next}`);
  }

  function selectArea(next: LabsArea) {
    if (!audience) return;
    setArea(next);
    setPack(null);
    router.replace(`/labs?audience=${audience}&area=${next}`);
  }

  function changeSession() {
    setAudience(null);
    setArea(null);
    setPack(null);
    router.push("/labs");
  }

  const stageKey = !audience
    ? "audience"
    : !area
      ? "territory"
      : pack
        ? "deck"
        : "loading";

  return (
    <main className="min-h-screen">
      <AnimatePresence mode="wait">
        {stageKey === "audience" ? (
          <AudienceGate key="audience" onSelect={selectAudience} />
        ) : null}

        {stageKey === "territory" ? (
          <TerritoryGate key="territory" onSelect={selectArea} />
        ) : null}

        {stageKey === "loading" ? (
          <LabsLoadingScreen key="loading" loading={loadingPack} />
        ) : null}

        {stageKey === "deck" && pack ? (
          <LabsDeck key="deck" pack={pack} onChangeSession={changeSession} />
        ) : null}
      </AnimatePresence>
    </main>
  );
}

function LabsLoadingScreen({ loading }: { loading: boolean }) {
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
      <p className="text-lg text-[var(--labs-muted)]">Preparing session…</p>
    </motion.section>
  );
}
