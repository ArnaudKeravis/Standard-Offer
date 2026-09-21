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
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { HeaderClock, TimerRail } from "@/components/workshops/tech-ambition/header-clock";
import { HintStrip } from "@/components/workshops/tech-ambition/hint-strip";
import { WorkshopHud } from "@/components/workshops/tech-ambition/hud";
import { SlideFrame } from "@/components/workshops/tech-ambition/slide-frame";
import { renderWorkshopSlide } from "@/components/workshops/tech-ambition/slides";
import type { Fy26BriefHandle } from "@/components/workshops/tech-ambition/slides/fy26";
import { TimeFlash } from "@/components/workshops/tech-ambition/time-flash";
import { TimerDock } from "@/components/workshops/tech-ambition/timer-dock";
import { resolveActiveTimer } from "@/lib/workshops/tech-ambition/active-timer";
import {
  createClock,
  displayedRemaining,
  isFreshClock,
  jumpClock,
  justCrossedMark,
  justFinished,
  minutesToMs,
  pauseClock,
  resetClock,
  startClock,
  syncClock,
  timerTone,
  toggleClock,
  type Clock,
} from "@/lib/workshops/tech-ambition/clock";
import { playEndTone, unlockWorkshopAudio } from "@/lib/workshops/tech-ambition/end-tone";
import {
  freezeClock,
  readSnapshot,
  thawClock,
  writeSnapshot,
} from "@/lib/workshops/tech-ambition/persist";
import {
  CLINIC_ROUND_MS,
  PROUD_SPEAKER_MS,
  SCREENS,
  blockById,
  clinicDuration,
  hourbackDuration,
} from "@/lib/workshops/tech-ambition/run-of-show";
import { useTimer } from "@/lib/workshops/tech-ambition/use-timer";
import {
  labsSpringChrome,
  labsSpringMomentum,
  labsSpringUi,
  projectVelocity,
  rubberband,
} from "@/lib/sodexo-labs/motion";
import type {
  BlockId,
  ClinicRound,
  HourbackStep,
} from "@/lib/workshops/tech-ambition/types";

const SWIPE_HYSTERESIS_PX = 10;
const COMMIT_DISTANCE_PX = 72;

const RITUAL_KINDS = new Set([
  "proud-ritual",
  "clinics-ritual",
  "hourback-ritual",
  "break",
]);

function isInteractiveTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest("a, button, input, textarea, select, [role='button'], [data-ws-hud]"),
  );
}

type PointerSample = { x: number; t: number };

function useTickingClock(initial: Clock) {
  const [clock, setClock] = useState(initial);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => {
      const t = Date.now();
      setNow(t);
      setClock((current) => syncClock(current, t));
    }, 200);
    return () => window.clearInterval(id);
  }, []);

  return {
    clock,
    setClock,
    now,
    remainingMs: displayedRemaining(clock, now),
    running: clock.running && displayedRemaining(clock, now) > 0,
  };
}

export function WorkshopSession() {
  const reduceMotion = useReducedMotion();
  const slideCount = SCREENS.length;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const indexRef = useRef(0);
  const dragX = useMotionValue(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const pointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const samplesRef = useRef<PointerSample[]>([]);
  const draggingRef = useRef(false);
  const suppressClickRef = useRef(false);

  const [blockClocks, setBlockClocks] = useState<Partial<Record<BlockId, Clock>>>({});
  const [blockNow, setBlockNow] = useState(() => Date.now());
  const proud = useTickingClock(createClock(PROUD_SPEAKER_MS));
  const clinic = useTickingClock(createClock(CLINIC_ROUND_MS));
  const hourback = useTickingClock(createClock(hourbackDuration(1)));
  const setProudClock = proud.setClock;
  const setClinicClock = clinic.setClock;
  const setHourClock = hourback.setClock;
  const [clinicRound, setClinicRound] = useState<ClinicRound>(1);
  const [hourStep, setHourStep] = useState<HourbackStep>(1);
  const [ready, setReady] = useState(false);
  const [hintDismissed, setHintDismissed] = useState(false);
  const [flash, setFlash] = useState<"TIME" | "SWAP" | null>(null);
  const fy26BriefRef = useRef<Fy26BriefHandle>(null);
  const remainingPrev = useRef({
    proud: -1,
    clinic: -1,
    hourback: -1,
    block: -1,
  });

  const screen = SCREENS[index] ?? SCREENS[0];
  const block = blockById(screen.blockId);
  const fy26Header = screen.blockId === "fy26" && Boolean(screen.durationSec);
  const headerTimer = useTimer({
    durationSec: screen.durationSec ?? 20 * 60,
    resetKey: screen.id,
    swapAtSec: screen.swapAtSec,
    onZero: () => setFlash("TIME"),
    onMark: () => setFlash("SWAP"),
  });
  const blockClock =
    block.durationMin != null
      ? (blockClocks[block.id] ?? createClock(minutesToMs(block.durationMin)))
      : null;

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    const snap = readSnapshot();
    const now = Date.now();
    if (snap) {
      setIndex(Math.min(snap.index, SCREENS.length - 1));
      setClinicRound(snap.clinicRound);
      setHourStep(snap.hourStep);
      setHintDismissed(snap.hintDismissed);
      setProudClock(thawClock(snap.proud, now));
      setClinicClock(thawClock(snap.clinic, now));
      setHourClock(thawClock(snap.hourback, now));
      const restored: Partial<Record<BlockId, Clock>> = {};
      for (const [id, clock] of Object.entries(snap.blocks)) {
        if (clock) restored[id as BlockId] = thawClock(clock, now);
      }
      setBlockClocks(restored);
    }
    setReady(true);
  }, [setClinicClock, setHourClock, setProudClock]);

  useEffect(() => {
    if (!ready) return;
    writeSnapshot({
      version: 1,
      index,
      clinicRound,
      hourStep,
      hintDismissed,
      proud: freezeClock(proud.clock),
      clinic: freezeClock(clinic.clock),
      hourback: freezeClock(hourback.clock),
      blocks: Object.fromEntries(
        Object.entries(blockClocks).flatMap(([id, clock]) =>
          clock ? [[id, freezeClock(clock)]] : [],
        ),
      ) as Partial<Record<BlockId, Clock>>,
    });
  }, [
    blockClocks,
    clinic.clock,
    clinicRound,
    hintDismissed,
    hourStep,
    hourback.clock,
    index,
    proud.clock,
    ready,
  ]);

  useEffect(() => {
    if (!ready) return;
    const t = Date.now();
    if (screen.kind === "proud-ritual") {
      setProudClock((clock) => (isFreshClock(clock) ? startClock(clock, t) : clock));
    } else if (screen.kind === "clinics-ritual") {
      setClinicClock((clock) => (isFreshClock(clock) ? startClock(clock, t) : clock));
    } else if (screen.kind === "hourback-ritual") {
      setHourClock((clock) => (isFreshClock(clock) ? startClock(clock, t) : clock));
    } else if (screen.kind === "break") {
      setBlockClocks((current) => {
        const existing = current.break ?? createClock(minutesToMs(10));
        if (!isFreshClock(existing)) return current;
        return { ...current, break: startClock(existing, t) };
      });
    } else if (screen.blockId === "roadmap" && screen.timed) {
      setBlockClocks((current) => {
        const existing = current.roadmap ?? createClock(minutesToMs(20));
        if (!isFreshClock(existing)) return current;
        return { ...current, roadmap: startClock(existing, t) };
      });
    }
  }, [ready, screen.blockId, screen.kind, screen.timed, setClinicClock, setHourClock, setProudClock]);

  useEffect(() => {
    const id = window.setInterval(() => {
      const t = Date.now();
      setBlockNow(t);
      setBlockClocks((current) => {
        const next: Partial<Record<BlockId, Clock>> = {};
        for (const [key, clock] of Object.entries(current)) {
          if (clock) next[key as BlockId] = syncClock(clock, t);
        }
        return next;
      });
    }, 200);
    return () => window.clearInterval(id);
  }, []);

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

  const goNext = useCallback(() => {
    const current = indexRef.current;
    if (SCREENS[current]?.kind === "fy26-brief" && fy26BriefRef.current?.next()) {
      setHintDismissed(true);
      return;
    }
    if (current >= slideCount - 1) {
      bumpEdge(-1);
      return;
    }
    setHintDismissed(true);
    setDirection(1);
    setIndex(current + 1);
  }, [bumpEdge, slideCount]);

  const goPrev = useCallback(() => {
    const current = indexRef.current;
    if (SCREENS[current]?.kind === "fy26-brief" && fy26BriefRef.current?.prev()) {
      return;
    }
    if (current <= 0) {
      bumpEdge(1);
      return;
    }
    setDirection(-1);
    setIndex(current - 1);
  }, [bumpEdge]);

  useLayoutEffect(() => {
    if (screen.kind !== "fy26-brief") return;
    fy26BriefRef.current?.enterFrom(direction);
  }, [direction, screen.id, screen.kind]);

  const goTo = useCallback((next: number) => {
    setHintDismissed(true);
    setIndex((current) => {
      const clamped = Math.max(0, Math.min(next, slideCount - 1));
      setDirection(clamped >= current ? 1 : -1);
      return clamped;
    });
  }, [slideCount]);

  const jumpBlock = useCallback((blockId: BlockId) => {
    const next = SCREENS.findIndex((item) => item.blockId === blockId);
    if (next >= 0) goTo(next);
  }, [goTo]);

  const patchBlock = useCallback(
    (updater: (clock: Clock) => Clock) => {
      const durationMin = block.durationMin;
      if (durationMin == null) return;
      setBlockClocks((current) => {
        const existing =
          current[block.id] ?? createClock(minutesToMs(durationMin));
        return { ...current, [block.id]: updater(existing) };
      });
    },
    [block],
  );

  const activeRitual = useMemo(() => {
    switch (screen.kind) {
      case "proud-ritual":
        return "proud" as const;
      case "clinics-ritual":
        return "clinic" as const;
      case "hourback-ritual":
        return "hourback" as const;
      case "break":
        return "block" as const;
      default:
        return screen.timed ? ("block" as const) : null;
    }
  }, [screen.kind, screen.timed]);

  const toggleHeaderTimer = headerTimer.toggle;
  const resetHeaderTimer = headerTimer.reset;

  const toggleActive = useCallback(() => {
    if (fy26Header) {
      toggleHeaderTimer();
      return;
    }
    const t = Date.now();
    if (activeRitual === "proud") setProudClock((c) => toggleClock(c, t));
    else if (activeRitual === "clinic") setClinicClock((c) => toggleClock(c, t));
    else if (activeRitual === "hourback") setHourClock((c) => toggleClock(c, t));
    else if (activeRitual === "block") patchBlock((c) => toggleClock(c, t));
  }, [
    activeRitual,
    patchBlock,
    setClinicClock,
    setHourClock,
    setProudClock,
    fy26Header,
    toggleHeaderTimer,
  ]);

  const resetActive = useCallback(() => {
    if (fy26Header) {
      resetHeaderTimer();
      return;
    }
    if (activeRitual === "proud") setProudClock((c) => resetClock(c));
    else if (activeRitual === "clinic") setClinicClock((c) => resetClock(c));
    else if (activeRitual === "hourback") setHourClock((c) => resetClock(c));
    else if (activeRitual === "block") patchBlock((c) => resetClock(c));
  }, [
    activeRitual,
    patchBlock,
    resetHeaderTimer,
    setClinicClock,
    setHourClock,
    setProudClock,
    fy26Header,
  ]);

  const jumpActive = useCallback(
    (deltaSec: number) => {
      if (fy26Header) {
        headerTimer.jump(deltaSec);
        return;
      }
      const t = Date.now();
      if (activeRitual === "proud") setProudClock((c) => jumpClock(c, deltaSec, t));
      else if (activeRitual === "clinic") setClinicClock((c) => jumpClock(c, deltaSec, t));
      else if (activeRitual === "hourback") setHourClock((c) => jumpClock(c, deltaSec, t));
      else if (activeRitual === "block") patchBlock((c) => jumpClock(c, deltaSec, t));
    },
    [
      activeRitual,
      fy26Header,
      headerTimer,
      patchBlock,
      setClinicClock,
      setHourClock,
      setProudClock,
    ],
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
        case "t":
        case "T":
          event.preventDefault();
          unlockWorkshopAudio();
          toggleActive();
          break;
        case "r":
        case "R":
          event.preventDefault();
          resetActive();
          break;
        case "+":
        case "=":
          event.preventDefault();
          jumpActive(60);
          break;
        case "-":
        case "_":
          event.preventDefault();
          jumpActive(-60);
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
  }, [goNext, goPrev, goTo, jumpActive, resetActive, slideCount, toggleActive]);

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

  const changeClinicRound = (round: ClinicRound) => {
    setClinicRound(round);
    setClinicClock(startClock(createClock(clinicDuration(round)), Date.now()));
  };

  const changeHourStep = (step: HourbackStep) => {
    setHourStep(step);
    setHourClock(startClock(createClock(hourbackDuration(step)), Date.now()));
  };

  const dark = screen.tone === "dark";
  const progress = ((index + 1) / slideCount) * 100;
  const blockRemaining = blockClock
    ? displayedRemaining(blockClock, blockNow)
    : 0;
  const roomTimer = resolveActiveTimer({
    kind: screen.kind,
    timed: screen.timed,
    proud: {
      remainingMs: proud.remainingMs,
      durationMs: proud.clock.durationMs,
      running: proud.running,
    },
    clinic: {
      remainingMs: clinic.remainingMs,
      durationMs: clinic.clock.durationMs,
      running: clinic.running,
    },
    hourback: {
      remainingMs: hourback.remainingMs,
      durationMs: hourback.clock.durationMs,
      running: hourback.running,
    },
    block: blockClock
      ? {
          remainingMs: blockRemaining,
          durationMs: blockClock.durationMs,
          running: Boolean(blockClock.running && blockRemaining > 0),
        }
      : null,
  });
  const headerView = fy26Header
    ? {
        remainingMs: headerTimer.remainingMs,
        durationSec: headerTimer.durationSec,
        running: headerTimer.running,
        tone: headerTimer.tone,
      }
    : roomTimer
      ? {
          remainingMs: roomTimer.remainingMs,
          durationSec: Math.round(roomTimer.durationMs / 1000),
          running: roomTimer.running,
          tone: timerTone(
            Math.max(0, Math.ceil(roomTimer.remainingMs / 1000)),
            Math.round(roomTimer.durationMs / 1000),
            roomTimer.running,
          ),
        }
      : null;
  const showHeaderTimer = Boolean(headerView);
  const showDock = Boolean(
    screen.timed &&
      !RITUAL_KINDS.has(screen.kind) &&
      blockClock &&
      !showHeaderTimer,
  );

  useEffect(() => {
    if (!ready) return;
    const next = {
      proud: proud.remainingMs,
      clinic: clinic.remainingMs,
      hourback: hourback.remainingMs,
      block: blockRemaining,
    };
    const prev = remainingPrev.current;
    const crossed =
      (prev.proud >= 0 && justFinished(prev.proud, next.proud)) ||
      (prev.clinic >= 0 && justFinished(prev.clinic, next.clinic)) ||
      (prev.hourback >= 0 && justFinished(prev.hourback, next.hourback)) ||
      (prev.block >= 0 && justFinished(prev.block, next.block));
    const swapped =
      roomTimer?.swapAtSec &&
      prev.hourback >= 0 &&
      justCrossedMark(prev.hourback, next.hourback, roomTimer.swapAtSec);
    remainingPrev.current = next;
    if (swapped) {
      playEndTone();
      setFlash("SWAP");
      return;
    }
    if (!crossed) return;
    playEndTone();
    setFlash("TIME");
  }, [
    blockRemaining,
    clinic.remainingMs,
    hourback.remainingMs,
    proud.remainingMs,
    ready,
    roomTimer?.swapAtSec,
  ]);

  useEffect(() => {
    if (!flash) return;
    const id = window.setTimeout(() => setFlash(null), 1600);
    return () => window.clearTimeout(id);
  }, [flash]);

  const clockApi = (pack: ReturnType<typeof useTickingClock>) => ({
    clock: pack.clock,
    now: pack.now,
    remainingMs: pack.remainingMs,
    running: pack.running,
    onStart: () => {
      unlockWorkshopAudio();
      pack.setClock((c) => startClock(c, Date.now()));
    },
    onPause: () => pack.setClock((c) => pauseClock(c, Date.now())),
    onReset: () => pack.setClock((c) => resetClock(c)),
  });

  if (!ready) {
    return <div className="ws-body h-svh w-screen bg-[var(--ws-dark)]" />;
  }

  return (
    <div
      ref={stageRef}
      className="ws-body relative h-svh w-screen touch-pan-y overflow-hidden bg-[var(--ws-paper)]"
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
        <SlideFrame key={screen.id} direction={direction}>
          {renderWorkshopSlide(screen.kind, screen.blockId, screen.id, {
            proud: clockApi(proud),
            clinic: { ...clockApi(clinic), round: clinicRound, onRound: changeClinicRound },
            hourback: { ...clockApi(hourback), step: hourStep, onStep: changeHourStep },
            block: {
              clock: blockClock ?? createClock(0),
              now: blockNow,
              remainingMs: blockRemaining,
              running: Boolean(blockClock?.running && blockRemaining > 0),
              onStart: () => patchBlock((c) => startClock(c, Date.now())),
              onPause: () => patchBlock((c) => pauseClock(c, Date.now())),
              onReset: () => patchBlock((c) => resetClock(c)),
            },
            fy26BriefRef,
          })}
        </SlideFrame>
      </motion.div>

      <WorkshopHud
        blockId={block.id}
        label={block.label}
        start={block.start}
        index={index}
        total={slideCount}
        dark={dark}
        reserveClock={showHeaderTimer}
        onJumpBlock={jumpBlock}
      />

      {headerView ? (
        <div className="pointer-events-none absolute right-[3vw] top-[2.2vh] z-20">
          <HeaderClock
            remainingMs={headerView.remainingMs}
            durationSec={headerView.durationSec}
            running={headerView.running}
            tone={headerView.tone}
            dark={dark}
            onToggle={() => {
              unlockWorkshopAudio();
              toggleActive();
            }}
          />
        </div>
      ) : null}

      {headerView ? (
        <div className="absolute inset-x-0 top-[calc(2.2vh+7.45rem)] z-30">
          <TimerRail
            remainingMs={headerView.remainingMs}
            durationSec={headerView.durationSec}
            tone={headerView.tone}
          />
        </div>
      ) : null}

      {!hintDismissed && index === 0 ? (
        <div className="pointer-events-none absolute inset-x-0 top-[7.8vh] z-20 px-[3vw]">
          <HintStrip dark={dark} onDismiss={() => setHintDismissed(true)} />
        </div>
      ) : null}

      <TimeFlash word={flash} />

      {showDock && blockClock ? (
        <div className="pointer-events-none absolute bottom-[3.2vh] right-[3vw] z-20">
          <TimerDock
            remainingMs={blockRemaining}
            durationMs={blockClock.durationMs}
            running={Boolean(blockClock.running && blockRemaining > 0)}
            dark={dark}
            label={block.label}
            onStart={() => patchBlock((c) => startClock(c, Date.now()))}
            onPause={() => patchBlock((c) => pauseClock(c, Date.now()))}
            onReset={() => patchBlock((c) => resetClock(c))}
          />
        </div>
      ) : null}

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-1 bg-black/10"
        aria-hidden
      >
        <motion.div
          className="h-full origin-left bg-[var(--ws-accent)]"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={reduceMotion ? { duration: 0 } : labsSpringChrome}
        />
      </div>
    </div>
  );
}
