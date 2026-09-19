import { IBM_Plex_Mono, Open_Sans } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/components/workshops/tech-ambition/tokens.css";

const workshopSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-ws-sans",
  display: "swap",
});

const workshopMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-ws-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tech Ambition · CoDesign & AI Workshop",
  description:
    "Live 16:9 room runner for the Tech Ambition CoDesign & AI workshop. Chantilly, 22 September 2026.",
};

export default function TechAmbitionLayout({ children }: { children: ReactNode }) {
  return (
    <div
      data-ws-root
      className={`${workshopSans.variable} ${workshopMono.variable} ws-body min-h-svh bg-[var(--ws-paper)] text-[var(--ws-ink)] antialiased`}
    >
      {children}
    </div>
  );
}
