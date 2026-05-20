"use client";

import type Lenis from "lenis";
import { createContext, useContext } from "react";

export type LenisContextValue = {
  lenis: Lenis | null;
  reducedMotion: boolean;
};

export const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  reducedMotion: false,
});

export function useLenisContext() {
  return useContext(LenisContext);
}
