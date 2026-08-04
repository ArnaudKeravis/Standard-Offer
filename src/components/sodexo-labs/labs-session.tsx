"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";

import { getLabsPackAction } from "@/app/labs/actions";
import { AudienceGate } from "@/components/sodexo-labs/gates/audience-gate";
import { TerritoryGate } from "@/components/sodexo-labs/gates/territory-gate";
import { accentForLabsArea } from "@/lib/sodexo-labs/area-theme";
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

/**
 * Temporary full-bleed ready screen.
 * Task 6: swap `LabsReadyScreen` for `<LabsDeck pack={pack} />` in LabsSession.
 */
export function LabsReadyScreen({ pack }: { pack: LabsPack }) {
  const reduceMotion = useReducedMotion();
  const { audience, area } = pack.session;
  const accent = accentForLabsArea(area);

  return (
    <motion.section
      className="labs-body relative flex min-h-screen flex-col justify-center px-[6vw] py-[8vh]"
      aria-labelledby="labs-ready-title"
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
      transition={{ duration: reduceMotion ? 0 : 0.45 }}
      style={
        {
          "--labs-accent": accent,
        } as CSSProperties
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 70% at 50% 0%, color-mix(in srgb, var(--labs-navy) 22%, transparent), transparent 60%),
            radial-gradient(ellipse 50% 40% at 85% 90%, color-mix(in srgb, ${accent} 18%, transparent), transparent 50%),
            linear-gradient(180deg, #0B1020 0%, #121a36 55%, #0B1020 100%)
          `,
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl text-white">
        <p className="mb-4 text-sm font-medium tracking-[0.2em] text-[color-mix(in_srgb,white_55%,transparent)] uppercase">
          Session ready
        </p>
        <h1
          id="labs-ready-title"
          className="labs-display mb-10 text-[clamp(2.75rem,7vw,5rem)] leading-[1.05]"
        >
          Sodexo Labs
        </h1>

        <dl className="grid gap-6 sm:grid-cols-3">
          <div>
            <dt className="mb-1 text-xs tracking-[0.16em] text-[color-mix(in_srgb,white_45%,transparent)] uppercase">
              Audience
            </dt>
            <dd className="text-xl capitalize">{audience}</dd>
          </div>
          <div>
            <dt className="mb-1 text-xs tracking-[0.16em] text-[color-mix(in_srgb,white_45%,transparent)] uppercase">
              Area
            </dt>
            <dd className="text-xl capitalize" style={{ color: accent }}>
              {area}
            </dd>
          </div>
          <div>
            <dt className="mb-1 text-xs tracking-[0.16em] text-[color-mix(in_srgb,white_45%,transparent)] uppercase">
              Persona
            </dt>
            <dd className="text-xl">{pack.persona.name}</dd>
          </div>
        </dl>

        <p className="mt-14 max-w-md text-base text-[color-mix(in_srgb,white_55%,transparent)]">
          Deck arrives in next task
        </p>
      </div>
    </motion.section>
  );
}

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

  const stageKey = !audience
    ? "audience"
    : !area
      ? "territory"
      : pack
        ? "ready"
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

        {stageKey === "ready" && pack ? (
          <LabsReadyScreen key="ready" pack={pack} />
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
