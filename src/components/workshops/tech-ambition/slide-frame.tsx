"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { labsSpringStagger, labsSpringUi } from "@/lib/sodexo-labs/motion";

export function SlideFrame({
  children,
  direction = 1,
}: {
  children: ReactNode;
  direction?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.section
      className="absolute inset-0 h-full w-full overflow-hidden will-change-transform"
      initial={
        reduce ? { opacity: 0 } : { opacity: 0, x: direction * 48, scale: 0.988 }
      }
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={
        reduce ? { opacity: 0 } : { opacity: 0, x: direction * -36, scale: 1.01 }
      }
      transition={reduce ? { duration: 0 } : labsSpringUi}
    >
      {children}
    </motion.section>
  );
}

export function StaggerIn({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
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
            staggerChildren: reduce ? 0 : 0.06,
            delayChildren: reduce ? 0 : 0.06,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: labsSpringStagger,
  },
};
