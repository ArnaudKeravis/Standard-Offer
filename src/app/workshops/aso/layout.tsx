import { Barlow_Condensed, Inter, Source_Serif_4 } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/components/workshops/aso/tokens.css";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-aso-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-aso-sans",
  display: "swap",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["italic", "normal"],
  variable: "--font-aso-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ASO · Tour de France · Atelier CoDesign",
  description:
    "Support de salle 16:9 pour l'atelier ASO × Sodexo Live! aux Labs. 13–14 octobre 2026.",
};

export default function AsoWorkshopLayout({ children }: { children: ReactNode }) {
  return (
    <div
      data-aso-root
      className={`${display.variable} ${sans.variable} ${serif.variable} aso-body min-h-svh bg-[var(--aso-papier)] text-[var(--aso-ink)] antialiased`}
    >
      {children}
    </div>
  );
}
