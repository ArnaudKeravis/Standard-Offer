/** @vitest-environment jsdom */

import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useTimer } from "@/lib/workshops/tech-ambition/use-timer";

describe("useTimer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(1_000_000);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("starts idle at the declared duration and does not auto-start", () => {
    const { result } = renderHook(() => useTimer({ durationSec: 120 }));
    expect(result.current.durationSec).toBe(120);
    expect(result.current.leftSec).toBe(120);
    expect(result.current.running).toBe(false);
    expect(result.current.tone).toBe("idle");
  });

  it("counts down from Date.now() deltas, not interval accumulation", () => {
    const { result } = renderHook(() => useTimer({ durationSec: 120 }));
    act(() => {
      result.current.start();
    });
    act(() => {
      vi.setSystemTime(1_000_000 + 10_250);
      vi.advanceTimersByTime(200);
    });
    expect(result.current.leftSec).toBe(110);
    expect(result.current.running).toBe(true);
  });

  it("fires onZero once when the clock crosses zero", () => {
    const onZero = vi.fn();
    const { result } = renderHook(() =>
      useTimer({ durationSec: 5, onZero }),
    );
    act(() => {
      result.current.start();
    });
    act(() => {
      vi.setSystemTime(1_000_000 + 6_000);
      vi.advanceTimersByTime(200);
    });
    expect(result.current.leftSec).toBe(0);
    expect(result.current.running).toBe(false);
    expect(onZero).toHaveBeenCalledTimes(1);

    act(() => {
      vi.setSystemTime(1_000_000 + 7_000);
      vi.advanceTimersByTime(200);
    });
    expect(onZero).toHaveBeenCalledTimes(1);
  });

  it("fires onMark once when remaining crosses swapAtSec", () => {
    const onMark = vi.fn();
    const { result } = renderHook(() =>
      useTimer({ durationSec: 1200, swapAtSec: 900, onMark }),
    );
    act(() => {
      result.current.start();
    });
    act(() => {
      vi.setSystemTime(1_000_000 + 301_000);
      vi.advanceTimersByTime(200);
    });
    expect(onMark).toHaveBeenCalledTimes(1);
    expect(onMark).toHaveBeenCalledWith(900);
  });

  it("resets to the new duration when the slide duration changes", () => {
    const { result, rerender } = renderHook(
      ({ durationSec }) => useTimer({ durationSec }),
      { initialProps: { durationSec: 1200 } },
    );
    act(() => {
      result.current.start();
    });
    rerender({ durationSec: 900 });
    expect(result.current.durationSec).toBe(900);
    expect(result.current.leftSec).toBe(900);
    expect(result.current.running).toBe(false);
    expect(result.current.tone).toBe("idle");
  });

  it("resets and stays idle when the slide key changes", () => {
    const { result, rerender } = renderHook(
      ({ resetKey }) => useTimer({ durationSec: 1200, resetKey }),
      { initialProps: { resetKey: "fy26-results" } },
    );
    act(() => {
      result.current.start();
    });
    act(() => {
      vi.setSystemTime(1_000_000 + 15_000);
      vi.advanceTimersByTime(200);
    });
    expect(result.current.running).toBe(true);
    rerender({ resetKey: "fy26-questions" });
    expect(result.current.leftSec).toBe(1200);
    expect(result.current.running).toBe(false);
    expect(result.current.tone).toBe("idle");
  });
});
