"use client";

import Lenis from "lenis";
import { type ReactNode, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { LenisContext } from "@/components/providers/lenis-context";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      setLenis(null);
      ScrollTrigger.refresh();
      return;
    }

    const lenisInstance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.15,
      wheelMultiplier: 0.9,
      anchors: true,
    });

    lenisInstance.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenisInstance.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    setLenis(lenisInstance);

    const onRefresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onRefresh);

    return () => {
      window.removeEventListener("resize", onRefresh);
      gsap.ticker.remove(ticker);
      lenisInstance.destroy();
      setLenis(null);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ScrollTrigger.clearScrollMemory();
      ScrollTrigger.refresh();
    };
  }, [reducedMotion]);

  return (
    <LenisContext.Provider value={{ lenis, reducedMotion }}>
      {children}
    </LenisContext.Provider>
  );
}
