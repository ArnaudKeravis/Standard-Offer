"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type SlideBackdropProps = {
  src: string;
  alt?: string;
  /** 0–1 overlay darkness */
  dim?: number;
  /** Optional accent wash */
  accent?: boolean;
};

/** Full-bleed photographic stage for presentation slides. */
export function SlideBackdrop({
  src,
  alt = "",
  dim = 0.45,
  accent = true,
}: SlideBackdropProps) {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: reduce ? 0 : 1.1, ease: [0.25, 1, 0.5, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background: `
            ${accent ? `radial-gradient(ellipse 60% 50% at 85% 15%, color-mix(in srgb, var(--labs-accent) 28%, transparent), transparent 55%),` : ""}
            linear-gradient(180deg, rgba(11,16,32,${dim * 0.85}) 0%, rgba(11,16,32,${dim}) 45%, rgba(11,16,32,${Math.min(dim + 0.15, 0.85)}) 100%)
          `,
        }}
      />
    </div>
  );
}
