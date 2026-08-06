import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import type { ReactNode } from "react";

import "@/components/sodexo-labs/labs-tokens.css";

const labsDisplay = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-labs-display",
  display: "swap",
});

const labsSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-labs-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sodexo Labs",
  description:
    "Co-creating experiences in presentation mode — curated Sodexo Labs credentials for client workshops.",
};

/** Labs-scoped type: Instrument Serif display + DM Sans body (spec pair). */
export default function LabsLayout({ children }: { children: ReactNode }) {
  return (
    <div
      data-labs-root
      className={`${labsDisplay.variable} ${labsSans.variable} labs-body min-h-screen bg-[var(--labs-paper)] text-[var(--labs-ink)] antialiased`}
    >
      {children}
    </div>
  );
}
