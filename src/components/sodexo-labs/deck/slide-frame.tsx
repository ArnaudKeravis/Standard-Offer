"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.25, 1, 0.5, 1] as const;

type SlideFrameProps = {
  children: ReactNode;
  duration: number;
  direction?: number;
  className?: string;
};

export function SlideFrame({
  children,
  duration,
  direction = 1,
  className,
}: SlideFrameProps) {
  const reduce = useReducedMotion();
  const d = reduce ? 0 : duration;

  return (
    <motion.section
      className={
        className ??
        "absolute inset-0 flex h-full w-full flex-col justify-center overflow-hidden"
      }
      initial={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, x: direction * 48, scale: 0.985 }
      }
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, x: direction * -36, scale: 1.01 }
      }
      transition={{ duration: d, ease: EASE }}
    >
      {children}
    </motion.section>
  );
}

/** Stagger children on slide enter — for lists/cards inside a slide. */
export function StaggerIn({
  children,
  className,
  delay = 0.08,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: reduce ? 0 : delay,
            delayChildren: reduce ? 0 : 0.12,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE },
  },
};
