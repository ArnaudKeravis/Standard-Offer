"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type SlideAccentProps = {
  src: string;
  /** Tailwind-ish position classes for the wrapper */
  className?: string;
  /** Width hint for next/image sizes */
  sizes?: string;
  delay?: number;
};

/** Floating PPT illustration — never used as a full-bleed background. */
export function SlideAccent({
  src,
  className = "absolute right-[4vw] bottom-[8vh] w-[min(38vw,420px)]",
  sizes = "38vw",
  delay = 0.2,
}: SlideAccentProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none z-[1] ${className}`}
      initial={reduce ? false : { opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: reduce ? 0 : 0.65,
        delay: reduce ? 0 : delay,
        ease: [0.25, 1, 0.5, 1],
      }}
    >
      <Image
        src={src}
        alt=""
        width={1200}
        height={900}
        sizes={sizes}
        className="h-auto w-full object-contain drop-shadow-[0_18px_40px_rgba(11,16,32,0.18)]"
        priority={false}
      />
    </motion.div>
  );
}
