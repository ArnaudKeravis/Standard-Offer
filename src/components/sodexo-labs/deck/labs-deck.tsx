"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";

import { SlideFrame } from "@/components/sodexo-labs/deck/slide-frame";
import { LabsHud } from "@/components/sodexo-labs/deck/labs-hud";
import {
  CasesSlide,
  CloseSlide,
  CoverSlide,
  CredentialsSlide,
  EngagementsSlide,
  GrowthSlide,
  KpiSlide,
  LifecycleSlide,
  MethodSlide,
  NetworkSlide,
  OffersSlide,
  PersonaSlide,
  WelcomeSlide,
  ZonesSlide,
} from "@/components/sodexo-labs/deck/slides";
import { labsCssVars } from "@/lib/sodexo-labs/area-theme";
import type { LabsAudience, LabsPack } from "@/lib/sodexo-labs/schemas";

type SlideId =
  | "cover"
  | "welcome"
  | "kpi"
  | "growth"
  | "offers"
  | "method"
  | "zones"
  | "persona"
  | "cases"
  | "network"
  | "lifecycle"
  | "engagements"
  | "credentials"
  | "close";

const DARK_SLIDES = new Set<SlideId>([
  "cover",
  "welcome",
  "network",
  "close",
]);

function slideIdsForAudience(audience: LabsAudience): SlideId[] {
  const head: SlideId[] = ["cover", "welcome"];
  const internal: SlideId[] =
    audience === "internal" ? ["kpi", "growth"] : [];
  const rest: SlideId[] = [
    "offers",
    "method",
    "zones",
    "persona",
    "cases",
    "network",
    "lifecycle",
    "engagements",
    "credentials",
    "close",
  ];
  return [...head, ...internal, ...rest];
}

function renderSlide(id: SlideId, pack: LabsPack): ReactNode {
  switch (id) {
    case "cover":
      return <CoverSlide pack={pack} />;
    case "welcome":
      return <WelcomeSlide pack={pack} />;
    case "kpi":
      return <KpiSlide pack={pack} />;
    case "growth":
      return <GrowthSlide pack={pack} />;
    case "offers":
      return <OffersSlide pack={pack} />;
    case "method":
      return <MethodSlide pack={pack} />;
    case "zones":
      return <ZonesSlide pack={pack} />;
    case "persona":
      return <PersonaSlide pack={pack} />;
    case "cases":
      return <CasesSlide pack={pack} />;
    case "network":
      return <NetworkSlide pack={pack} />;
    case "lifecycle":
      return <LifecycleSlide pack={pack} />;
    case "engagements":
      return <EngagementsSlide pack={pack} />;
    case "credentials":
      return <CredentialsSlide pack={pack} />;
    case "close":
      return <CloseSlide pack={pack} />;
    default:
      return null;
  }
}

type LabsDeckProps = {
  pack: LabsPack;
  onChangeSession: () => void;
};

function isInteractiveTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest(
      "a, button, input, textarea, select, [role='button'], [data-labs-hud]",
    ),
  );
}

export function LabsDeck({ pack, onChangeSession }: LabsDeckProps) {
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0 : 0.5;
  const slides = useMemo(
    () => slideIdsForAudience(pack.session.audience),
    [pack.session.audience],
  );
  const slideCount = slides.length;
  const [index, setIndex] = useState(0);
  const directionRef = useRef(1);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    setIndex((current) => Math.min(current, slideCount - 1));
  }, [slideCount]);

  const goNext = useCallback(() => {
    directionRef.current = 1;
    setDirection(1);
    setIndex((current) => Math.min(current + 1, slideCount - 1));
  }, [slideCount]);

  const goPrev = useCallback(() => {
    directionRef.current = -1;
    setDirection(-1);
    setIndex((current) => Math.max(current - 1, 0));
  }, []);

  const goTo = useCallback(
    (next: number) => {
      setIndex((current) => {
        const clamped = Math.max(0, Math.min(next, slideCount - 1));
        const dir = clamped >= current ? 1 : -1;
        directionRef.current = dir;
        setDirection(dir);
        return clamped;
      });
    },
    [slideCount],
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
        case " ":
        case "PageDown":
          event.preventDefault();
          goNext();
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          event.preventDefault();
          goPrev();
          break;
        case "f":
        case "F":
          event.preventDefault();
          if (!document.fullscreenElement) {
            void document.documentElement.requestFullscreen?.();
          } else {
            void document.exitFullscreen?.();
          }
          break;
        case "Home":
          event.preventDefault();
          goTo(0);
          break;
        case "End":
          event.preventDefault();
          goTo(slideCount - 1);
          break;
        default:
          break;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev, goTo, slideCount]);

  function onStageClick(event: MouseEvent<HTMLDivElement>) {
    if (isInteractiveTarget(event.target)) return;
    goNext();
  }

  const slideId = slides[index] ?? "cover";
  const dark = DARK_SLIDES.has(slideId);
  const slide = renderSlide(slideId, pack);
  const progress = ((index + 1) / slideCount) * 100;

  return (
    <div
      className="labs-body relative h-svh w-screen overflow-hidden bg-[var(--labs-paper)]"
      style={labsCssVars(pack.session.area) as CSSProperties}
      onClick={onStageClick}
      role="presentation"
    >
      <div className="relative h-full w-full" aria-live="polite">
        <AnimatePresence mode="wait" custom={direction}>
          <SlideFrame
            key={slideId}
            duration={duration}
            direction={direction}
            className="absolute inset-0 h-full w-full overflow-hidden"
          >
            {slide}
          </SlideFrame>
        </AnimatePresence>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-1 bg-black/10"
        aria-hidden
      >
        <motion.div
          className="h-full origin-left"
          style={{ background: "var(--labs-accent)" }}
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{
            duration: reduceMotion ? 0 : 0.35,
            ease: [0.25, 1, 0.5, 1],
          }}
        />
      </div>

      <LabsHud
        lang={pack.session.lang}
        audience={pack.session.audience}
        area={pack.session.area}
        index={index}
        total={slideCount}
        dark={dark}
        credentialsLabel={pack.chrome.hudCredentials}
        changeLabel={pack.chrome.hudChange}
        onSelectSlide={goTo}
        onChangeSession={onChangeSession}
      />
    </div>
  );
}
