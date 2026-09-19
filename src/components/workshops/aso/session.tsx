"use client";

import {
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
  type PointerEvent as ReactPointerEvent,
} from "react";

import { HeaderClock, TimerRail } from "@/components/workshops/aso/header-clock";
import { HintStrip } from "@/components/workshops/aso/hint-strip";
import { AsoHud } from "@/components/workshops/aso/hud";
import { AsoSlide } from "@/components/workshops/aso/slides";
import { StageProfile } from "@/components/workshops/aso/stage-profile";
import { TimeFlash } from "@/components/workshops/aso/time-flash";
import { playEndTone, unlockWorkshopAudio } from "@/lib/workshops/tech-ambition/end-tone";
import { useTimer } from "@/lib/workshops/tech-ambition/use-timer";
import { labsSpringMomentum, labsSpringUi, projectVelocity, rubberband } from "@/lib/sodexo-labs/motion";
import { readSnapshot, writeSnapshot } from "@/lib/workshops/aso/persist";
import {
  PHASES,
  profileFor,
  proofScreenId,
  screensFor,
  sequenceById,
  sequencesFor,
} from "@/lib/workshops/aso/run-of-show";
import type { DayId, PhaseId } from "@/lib/workshops/aso/types";

const SWIPE_HYSTERESIS_PX = 10;
const COMMIT_DISTANCE_PX = 72;

function isInteractiveTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest("a, button, input, textarea, select, [role='button'], [data-aso-hud]"),
  );
}

type PointerSample = { x: number; t: number };

export function AsoSession() {
  const reduceMotion = useReducedMotion();
  const [day, setDay] = useState<DayId>("j1");
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [ready, setReady] = useState(false);
  const [hintDismissed, setHintDismissed] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [blackout, setBlackout] = useState(false);
  const [flash, setFlash] = useState<"TIME" | null>(null);
  const indexRef = useRef(0);
  const dragX = useMotionValue(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const pointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const samplesRef = useRef<PointerSample[]>([]);
  const draggingRef = useRef(false);
  const suppressClickRef = useRef(false);

  const screens = useMemo(() => screensFor(day), [day]);
  const points = useMemo(() => profileFor(day), [day]);
  const slideCount = screens.length;
  const screen = screens[Math.min(index, slideCount - 1)] ?? screens[0];
  const sequence = screen.sequenceId ? sequenceById(screen.sequenceId) : null;
  const phase: PhaseId = sequence?.phase ?? "pause";

  const timer = useTimer({
    durationSec: screen.durationSec ?? 15 * 60,
    resetKey: `${day}-${screen.id}`,
    onZero: () => {
      playEndTone();
      setFlash("TIME");
    },
  });

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    const snap = readSnapshot();
    if (snap) {
      setDay(snap.day);
      const nextScreens = screensFor(snap.day);
      setIndex(Math.min(snap.index, nextScreens.length - 1));
      setHintDismissed(snap.hintDismissed);
      setBlackout(snap.blackout);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    writeSnapshot({
      version: 1,
      day,
      index,
      hintDismissed,
      blackout,
    });
  }, [blackout, day, hintDismissed, index, ready]);

  useEffect(() => {
    if (!flash) return;
    const id = window.setTimeout(() => setFlash(null), 1600);
    return () => window.clearTimeout(id);
  }, [flash]);

  const settleDrag = useCallback(
    (velocityX = 0) => {
      if (reduceMotion) {
        dragX.set(0);
        return;
      }
      void animate(dragX, 0, { ...labsSpringMomentum, velocity: velocityX });
    },
    [dragX, reduceMotion],
  );

  const bumpEdge = useCallback(
    (dir: 1 | -1) => {
      if (reduceMotion) return;
      const width = stageRef.current?.clientWidth ?? 800;
      dragX.set(dir * Math.min(28, width * 0.035));
      void animate(dragX, 0, labsSpringUi);
    },
    [dragX, reduceMotion],
  );

  const goTo = useCallback(
    (next: number) => {
      setHintDismissed(true);
      setOverlay(false);
      setIndex((current) => {
        const clamped = Math.max(0, Math.min(next, slideCount - 1));
        setDirection(clamped >= current ? 1 : -1);
        return clamped;
      });
    },
    [slideCount],
  );

  const goNext = useCallback(() => {
    const current = indexRef.current;
    if (current >= slideCount - 1) {
      bumpEdge(-1);
      return;
    }
    goTo(current + 1);
  }, [bumpEdge, goTo, slideCount]);

  const goPrev = useCallback(() => {
    const current = indexRef.current;
    if (current <= 0) {
      bumpEdge(1);
      return;
    }
    goTo(current - 1);
  }, [bumpEdge, goTo]);

  const jumpSequence = useCallback(
    (sequenceId: string) => {
      const next = screens.findIndex((item) => item.sequenceId === sequenceId);
      if (next >= 0) goTo(next);
    },
    [goTo, screens],
  );

  const switchDay = useCallback((next: DayId) => {
    setDay(next);
    setIndex(0);
    setDirection(1);
    setOverlay(false);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
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
        case " ":
          event.preventDefault();
          unlockWorkshopAudio();
          timer.toggle();
          break;
        case "r":
        case "R":
          event.preventDefault();
          timer.reset();
          break;
        case "+":
        case "=":
          event.preventDefault();
          timer.jump(60);
          break;
        case "-":
        case "_":
          event.preventDefault();
          timer.jump(-60);
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
        case "g":
        case "G":
        case "0":
          event.preventDefault();
          setOverlay((open) => !open);
          break;
        case "b":
        case "B":
          event.preventDefault();
          setBlackout((open) => !open);
          break;
        case "m":
        case "M": {
          event.preventDefault();
          const proof = proofScreenId(day);
          if (proof) {
            const next = screens.findIndex((item) => item.id === proof);
            if (next >= 0) goTo(next);
          }
          break;
        }
        case "1":
          event.preventDefault();
          switchDay("j1");
          break;
        case "2":
          event.preventDefault();
          switchDay("j2");
          break;
        case "Escape":
          setOverlay(false);
          setBlackout(false);
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
  }, [day, goNext, goPrev, goTo, screens, slideCount, switchDay, timer]);

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    unlockWorkshopAudio();
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
    let dx = rawDx;
    if ((atStart && dx > 0) || (atEnd && dx < 0)) dx = rubberband(dx, width);
    else if (reduceMotion) dx = 0;
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
      Math.abs(projected) > COMMIT_DISTANCE_PX || Math.abs(dx) > COMMIT_DISTANCE_PX;
    if (commit) {
      if (projected < 0 || (projected === 0 && dx < 0)) goNext();
      else goPrev();
      settleDrag(velocityX);
    } else {
      settleDrag(velocityX);
    }
    suppressClickRef.current = true;
    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 0);
  }

  if (!ready) {
    return <div className="aso-body h-svh w-screen bg-[var(--aso-noir)]" />;
  }

  const dark = screen.tone === "dark";
  const showTimer = Boolean(screen.timed && screen.durationSec);
  const title = sequence?.title ?? screen.label;
  const start = sequence?.start ?? (day === "j1" ? "09:00" : "09:00");

  return (
    <div
      ref={stageRef}
      className="aso-body relative h-svh w-screen touch-pan-y overflow-hidden bg-[var(--aso-papier)]"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        pointerIdRef.current = null;
        draggingRef.current = false;
        settleDrag(0);
      }}
      role="presentation"
    >
      <motion.div className="relative h-full w-full" style={{ x: dragX }} aria-live="polite">
        <AsoSlide
          key={`${day}-${screen.id}`}
          screen={screen}
          sequence={sequence}
          points={points}
          direction={direction}
          onSelectSequence={jumpSequence}
        />
      </motion.div>

      <AsoHud
        day={day}
        phase={phase}
        title={title}
        start={start}
        index={index}
        total={slideCount}
        dark={dark}
        reserveClock={showTimer}
        points={points}
        activeSequenceId={sequence?.id}
        onJumpSequence={jumpSequence}
        onToggleDay={() => switchDay(day === "j1" ? "j2" : "j1")}
      />

      {showTimer ? (
        <div className="pointer-events-none absolute right-[3vw] top-[2vh] z-20">
          <HeaderClock
            remainingMs={timer.remainingMs}
            durationSec={timer.durationSec}
            running={timer.running}
            tone={timer.tone}
            dark={dark}
            onToggle={() => {
              unlockWorkshopAudio();
              timer.toggle();
            }}
          />
        </div>
      ) : null}

      {showTimer ? (
        <div className="absolute inset-x-0 top-[calc(1.6vh+7.6rem)] z-30">
          <TimerRail
            remainingMs={timer.remainingMs}
            durationSec={timer.durationSec}
            tone={timer.tone}
          />
        </div>
      ) : null}

      {!hintDismissed && index === 0 ? (
        <div className="pointer-events-none absolute inset-x-0 top-[7.6vh] z-20 px-[3vw]">
          <HintStrip dark={dark} onDismiss={() => setHintDismissed(true)} />
        </div>
      ) : null}

      <TimeFlash word={flash} />

      {overlay ? (
        <div
          className="absolute inset-0 z-40 bg-[var(--aso-noir)]/96 px-[5vw] py-[6vh] text-white"
          data-aso-hud
        >
          <div className="mx-auto flex h-full max-w-[1440px] flex-col">
            <div className="flex items-baseline justify-between">
              <h2 className="aso-display text-[3rem]">
                {day === "j1" ? "Étape 1" : "Étape 2"}
              </h2>
              <button type="button" onClick={() => setOverlay(false)} className="aso-kicker">
                Fermer · G
              </button>
            </div>
            <div className="mt-4 h-[28vh]">
              <StageProfile
                points={points}
                activeId={sequence?.id}
                onSelect={jumpSequence}
              />
            </div>
            <ol className="mt-4 grid flex-1 grid-cols-2 gap-x-8 gap-y-1 overflow-auto text-[1.05rem]">
              {sequencesFor(day).map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => jumpSequence(item.id)}
                    className={`flex w-full items-baseline gap-3 border-b border-white/10 py-2 text-left ${
                      item.id === sequence?.id ? "text-[var(--aso-jaune)]" : ""
                    }`}
                  >
                    <span className="w-14 tabular-nums text-white/50">{item.start}</span>
                    <span
                      className="aso-kicker w-16"
                      style={{ color: PHASES[item.phase].color }}
                    >
                      {PHASES[item.phase].short}
                    </span>
                    <span className="font-semibold">{item.title}</span>
                    <span className="ml-auto text-white/40">{item.durationMin}′</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      ) : null}

      {blackout ? (
        <div className="absolute inset-0 z-50 bg-black" data-aso-hud />
      ) : null}
    </div>
  );
}
