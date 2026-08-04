"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SlideFrameProps = {
  children: ReactNode;
  duration: number;
  className?: string;
};

export function SlideFrame({ children, duration, className }: SlideFrameProps) {
  return (
    <motion.section
      className={
        className ??
        "absolute inset-0 flex h-full w-full flex-col justify-center overflow-hidden px-[6vw] py-[8vh]"
      }
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </motion.section>
  );
}
