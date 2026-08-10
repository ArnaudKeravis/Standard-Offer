"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import {
  labsSpringStagger,
  labsSpringUi,
} from "@/lib/sodexo-labs/motion";

type SlideFrameProps = {
  children: ReactNode;
  direction?: number;
  className?: string;
};

export function SlideFrame({
  children,
  direction = 1,
  className,
}: SlideFrameProps) {
  const reduce = useReducedMotion();

  return (
    <motion.section
      className={
        className ??
        "absolute inset-0 flex h-full w-full flex-col justify-center overflow-hidden"
      }
      initial={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, x: direction * 56, scale: 0.985 }
      }
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, x: direction * -40, scale: 1.01 }
      }
      transition={reduce ? { duration: 0 } : labsSpringUi}
    >
      {children}
    </motion.section>
  );
}

/** Stagger children on slide enter — for lists/cards inside a slide. */
export function StaggerIn({
  children,
  className,
  delay = 0.07,
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
            delayChildren: reduce ? 0 : 0.08,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: labsSpringStagger,
  },
};
