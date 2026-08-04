"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  useCallback,
  useEffect,
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
  FormatsSlide,
  MethodSlide,
  NetworkSlide,
  OffersSlide,
  PersonaSlide,
  WelcomeSlide,
  ZonesSlide,
} from "@/components/sodexo-labs/deck/slides";
import { labsCssVars } from "@/lib/sodexo-labs/area-theme";
import type { LabsPack } from "@/lib/sodexo-labs/schemas";

const SLIDE_COUNT = 11;
const DARK_SLIDES = new Set([0, 1, 7, 10]);

type LabsDeckProps = {
  pack: LabsPack;
  onChangeSession: () => void;
};

function renderSlide(index: number, pack: LabsPack): ReactNode {
  switch (index) {
    case 0:
      return <CoverSlide pack={pack} />;
    case 1:
      return <WelcomeSlide pack={pack} />;
    case 2:
      return <OffersSlide pack={pack} />;
    case 3:
      return <MethodSlide pack={pack} />;
    case 4:
      return <ZonesSlide pack={pack} />;
    case 5:
      return <PersonaSlide pack={pack} />;
    case 6:
      return <CasesSlide pack={pack} />;
    case 7:
      return <NetworkSlide />;
    case 8:
      return <FormatsSlide pack={pack} />;
    case 9:
      return <CredentialsSlide pack={pack} />;
    case 10:
      return <CloseSlide pack={pack} />;
    default:
      return null;
  }
}

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
  const [index, setIndex] = useState(0);
  const directionRef = useRef(1);
  const [direction, setDirection] = useState(1);

  const goNext = useCallback(() => {
    directionRef.current = 1;
    setDirection(1);
    setIndex((current) => Math.min(current + 1, SLIDE_COUNT - 1));
  }, []);

  const goPrev = useCallback(() => {
    directionRef.current = -1;
    setDirection(-1);
    setIndex((current) => Math.max(current - 1, 0));
  }, []);

  const goTo = useCallback((next: number) => {
    setIndex((current) => {
      const dir = next >= current ? 1 : -1;
      directionRef.current = dir;
      setDirection(dir);
      return Math.max(0, Math.min(next, SLIDE_COUNT - 1));
    });
  }, []);

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
          goTo(SLIDE_COUNT - 1);
          break;
        default:
          break;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev, goTo]);

  function onStageClick(event: MouseEvent<HTMLDivElement>) {
    if (isInteractiveTarget(event.target)) return;
    goNext();
  }

  const dark = DARK_SLIDES.has(index);
  const slide = renderSlide(index, pack);
  const progress = ((index + 1) / SLIDE_COUNT) * 100;

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
            key={index}
            duration={duration}
            direction={direction}
            className="absolute inset-0 h-full w-full overflow-hidden"
          >
            {slide}
          </SlideFrame>
        </AnimatePresence>
      </div>

      {/* Easy-going progress rail */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-1 bg-black/10"
        aria-hidden
      >
        <motion.div
          className="h-full origin-left"
          style={{ background: "var(--labs-accent)" }}
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.25, 1, 0.5, 1] }}
        />
      </div>

      <LabsHud
        audience={pack.session.audience}
        area={pack.session.area}
        index={index}
        total={SLIDE_COUNT}
        dark={dark}
        onSelectSlide={goTo}
        onChangeSession={onChangeSession}
      />
    </div>
  );
}
