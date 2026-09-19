"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  createClock,
  displayedRemaining,
  jumpClock,
  justCrossedMark,
  justFinished,
  pauseClock,
  resetClock,
  setClockDuration,
  startClock,
  syncClock,
  timerTone,
  toggleClock,
  type Clock,
  type TimerTone,
} from "@/lib/workshops/tech-ambition/clock";

export type UseTimerOptions = {
  durationSec: number;
  resetKey?: string;
  swapAtSec?: number;
  onZero?: () => void;
  onMark?: (sec: number) => void;
};

export type UseTimerApi = {
  durationSec: number;
  leftSec: number;
  remainingMs: number;
  running: boolean;
  tone: TimerTone;
  start: () => void;
  pause: () => void;
  toggle: () => void;
  reset: () => void;
  setDuration: (sec: number) => void;
  jump: (deltaSec: number) => void;
};

function secondsFromMs(ms: number): number {
  return Math.max(0, Math.ceil(ms / 1000));
}

export function useTimer({
  durationSec,
  resetKey,
  swapAtSec,
  onZero,
  onMark,
}: UseTimerOptions): UseTimerApi {
  const [clock, setClock] = useState<Clock>(() =>
    createClock(durationSec * 1000),
  );
  const [now, setNow] = useState(() => Date.now());
  const previousMs = useRef(durationSec * 1000);
  const zeroFired = useRef(false);
  const markFired = useRef(false);
  const onZeroRef = useRef(onZero);
  const onMarkRef = useRef(onMark);

  onZeroRef.current = onZero;
  onMarkRef.current = onMark;

  useEffect(() => {
    setClock(setClockDuration(durationSec * 1000));
    previousMs.current = durationSec * 1000;
    zeroFired.current = false;
    markFired.current = false;
    setNow(Date.now());
  }, [durationSec, resetKey]);

  useEffect(() => {
    const id = window.setInterval(() => {
      const t = Date.now();
      setNow(t);
      setClock((current) => {
        const shown = displayedRemaining(current, t);
        const prev = previousMs.current;
        if (!zeroFired.current && justFinished(prev, shown)) {
          zeroFired.current = true;
          onZeroRef.current?.();
        }
        if (
          swapAtSec &&
          !markFired.current &&
          justCrossedMark(prev, shown, swapAtSec)
        ) {
          markFired.current = true;
          onMarkRef.current?.(swapAtSec);
        }
        previousMs.current = shown;
        return syncClock(current, t);
      });
    }, 200);
    return () => window.clearInterval(id);
  }, [swapAtSec]);

  const remainingMs = displayedRemaining(clock, now);
  const running = clock.running && remainingMs > 0;
  const leftSec = secondsFromMs(remainingMs);

  const start = useCallback(() => {
    setClock((current) => startClock(current, Date.now()));
  }, []);

  const pause = useCallback(() => {
    setClock((current) => pauseClock(current, Date.now()));
  }, []);

  const toggle = useCallback(() => {
    setClock((current) => toggleClock(current, Date.now()));
  }, []);

  const reset = useCallback(() => {
    zeroFired.current = false;
    markFired.current = false;
    setClock((current) => resetClock(current));
    setNow(Date.now());
  }, []);

  const setDuration = useCallback((sec: number) => {
    zeroFired.current = false;
    markFired.current = false;
    setClock(setClockDuration(sec * 1000));
    setNow(Date.now());
  }, []);

  const jump = useCallback((deltaSec: number) => {
    setClock((current) => jumpClock(current, deltaSec, Date.now()));
  }, []);

  return {
    durationSec: Math.round(clock.durationMs / 1000),
    leftSec,
    remainingMs,
    running,
    tone: timerTone(leftSec, Math.round(clock.durationMs / 1000), running),
    start,
    pause,
    toggle,
    reset,
    setDuration,
    jump,
  };
}
