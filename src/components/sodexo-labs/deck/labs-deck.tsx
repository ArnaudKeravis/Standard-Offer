"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
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
import {
  labsSpringChrome,
  labsSpringMomentum,
  labsSpringUi,
  projectVelocity,
  rubberband,
} from "@/lib/sodexo-labs/motion";
import type { LabsAudience, LabsPack } from "@/lib/sodexo-labs/schemas";

export type LabsSlideId =
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

const DARK_SLIDES = new Set<LabsSlideId>([
  "cover",
  "welcome",
  "network",
  "close",
]);

const SWIPE_HYSTERESIS_PX = 10;
const COMMIT_DISTANCE_PX = 72;

function slideIdsForAudience(audience: LabsAudience): LabsSlideId[] {
  const head: LabsSlideId[] = ["cover", "welcome"];
  const internal: LabsSlideId[] =
    audience === "internal" ? ["kpi", "growth"] : [];
  const rest: LabsSlideId[] = [
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

function renderSlide(id: LabsSlideId, pack: LabsPack): ReactNode {
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

type PointerSample = { x: number; t: number };

export function LabsDeck({ pack, onChangeSession }: LabsDeckProps) {
  const reduceMotion = useReducedMotion();
  const slides = useMemo(
    () => slideIdsForAudience(pack.session.audience),
    [pack.session.audience],
  );
  const slideCount = slides.length;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const indexRef = useRef(0);
  const dragX = useMotionValue(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const pointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const samplesRef = useRef<PointerSample[]>([]);
  const draggingRef = useRef(false);
  const suppressClickRef = useRef(false);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    setIndex((current) => Math.min(current, slideCount - 1));
  }, [slideCount]);

  const settleDrag = useCallback(
    (velocityX = 0) => {
      if (reduceMotion) {
        dragX.set(0);
        return;
      }
      void animate(dragX, 0, {
        ...labsSpringMomentum,
        velocity: velocityX,
      });
    },
    [dragX, reduceMotion],
  );

  const bumpEdge = useCallback(
    (dir: 1 | -1) => {
      if (reduceMotion) return;
      const width = stageRef.current?.clientWidth ?? 800;
      const bump = dir * Math.min(28, width * 0.035);
      dragX.set(bump);
      void animate(dragX, 0, labsSpringUi);
    },
    [dragX, reduceMotion],
  );

  const goNext = useCallback(() => {
    const current = indexRef.current;
    if (current >= slideCount - 1) {
      bumpEdge(-1);
      return;
    }
    setDirection(1);
    setIndex(current + 1);
  }, [bumpEdge, slideCount]);

  const goPrev = useCallback(() => {
    const current = indexRef.current;
    if (current <= 0) {
      bumpEdge(1);
      return;
    }
    setDirection(-1);
    setIndex(current - 1);
  }, [bumpEdge]);

  const goTo = useCallback(
    (next: number) => {
      setIndex((current) => {
        const clamped = Math.max(0, Math.min(next, slideCount - 1));
        setDirection(clamped >= current ? 1 : -1);
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

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    if (isInteractiveTarget(event.target)) return;
    pointerIdRef.current = event.pointerId;
    startXRef.current = event.clientX;
    samplesRef.current = [{ x: event.clientX, t: event.timeStamp }];
    draggingRef.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (pointerIdRef.current !== event.pointerId) return;
    const rawDx = event.clientX - startXRef.current;
    const samples = samplesRef.current;
    samples.push({ x: event.clientX, t: event.timeStamp });
    if (samples.length > 5) samples.shift();

    if (!draggingRef.current) {
      if (Math.abs(rawDx) < SWIPE_HYSTERESIS_PX) return;
      draggingRef.current = true;
      suppressClickRef.current = true;
    }

    const width = stageRef.current?.clientWidth ?? 800;
    const atStart = indexRef.current <= 0;
    const atEnd = indexRef.current >= slideCount - 1;
    // Swipe left (negative) → next; swipe right (positive) → prev
    let dx = rawDx;
    if ((atStart && dx > 0) || (atEnd && dx < 0)) {
      dx = rubberband(dx, width);
    } else if (reduceMotion) {
      dx = 0;
    }

    dragX.set(dx);
  }

  function onPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (pointerIdRef.current !== event.pointerId) return;
    pointerIdRef.current = null;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      /* already released */
    }

    const samples = samplesRef.current;
    const last = samples[samples.length - 1];
    const prev = samples[0];
    let velocityX = 0;
    if (last && prev && last.t !== prev.t) {
      velocityX = ((last.x - prev.x) / (last.t - prev.t)) * 1000;
    }

    const dx = event.clientX - startXRef.current;
    const projected = dx + projectVelocity(velocityX);
    const wasDragging = draggingRef.current;
    draggingRef.current = false;

    if (!wasDragging) {
      // Tap → advance (unless suppressed by a prior drag ending)
      if (suppressClickRef.current) {
        suppressClickRef.current = false;
        settleDrag(0);
        return;
      }
      settleDrag(0);
      goNext();
      return;
    }

    const commit =
      Math.abs(projected) > COMMIT_DISTANCE_PX ||
      Math.abs(dx) > COMMIT_DISTANCE_PX;

    if (commit) {
      // Negative projection → next; positive → prev
      if (projected < 0 || (projected === 0 && dx < 0)) {
        goNext();
      } else {
        goPrev();
      }
      settleDrag(velocityX);
    } else {
      settleDrag(velocityX);
    }

    // Swallow the synthetic click after a drag
    suppressClickRef.current = true;
    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 0);
  }

  function onPointerCancel(event: ReactPointerEvent<HTMLDivElement>) {
    if (pointerIdRef.current !== event.pointerId) return;
    pointerIdRef.current = null;
    draggingRef.current = false;
    settleDrag(0);
  }

  const slideId = slides[index] ?? "cover";
  const dark = DARK_SLIDES.has(slideId);
  const slide = renderSlide(slideId, pack);
  const progress = ((index + 1) / slideCount) * 100;
  const slideLabels = slides.map((id) => pack.chrome.slideNav[id]);

  return (
    <div
      ref={stageRef}
      className="labs-body relative h-svh w-screen touch-pan-y overflow-hidden bg-[var(--labs-paper)]"
      style={labsCssVars(pack.session.area) as CSSProperties}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      role="presentation"
    >
      <motion.div
        className="relative h-full w-full"
        style={{ x: dragX }}
        aria-live="polite"
      >
        <AnimatePresence initial={false} mode="sync" custom={direction}>
          <SlideFrame
            key={slideId}
            direction={direction}
            className="absolute inset-0 h-full w-full overflow-hidden will-change-transform"
          >
            {slide}
          </SlideFrame>
        </AnimatePresence>
      </motion.div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-1 bg-black/10"
        aria-hidden
      >
        <motion.div
          className="h-full origin-left"
          style={{ background: "var(--labs-accent)" }}
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={reduceMotion ? { duration: 0 } : labsSpringChrome}
        />
      </div>

      <LabsHud
        lang={pack.session.lang}
        audience={pack.session.audience}
        area={pack.session.area}
        index={index}
        total={slideCount}
        dark={dark}
        slideLabels={slideLabels}
        credentialsLabel={pack.chrome.hudCredentials}
        changeLabel={pack.chrome.hudChange}
        onSelectSlide={goTo}
        onChangeSession={onChangeSession}
      />
    </div>
  );
}
