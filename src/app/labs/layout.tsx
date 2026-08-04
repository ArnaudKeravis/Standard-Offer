import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import type { ReactNode } from "react";

import "@/components/sodexo-labs/labs-tokens.css";

const labsBody = DM_Sans({
  subsets: ["latin"],
  variable: "--font-labs-body",
});

const labsDisplay = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-labs-display",
});

export const metadata: Metadata = {
  title: "Sodexo Labs",
  description:
    "Co-creating experiences in presentation mode — curated Sodexo Labs credentials for client workshops.",
};

export default function LabsLayout({ children }: { children: ReactNode }) {
  return (
    <div
      data-labs-root
      className={`${labsBody.variable} ${labsDisplay.variable} min-h-screen bg-[var(--labs-paper)] text-[var(--labs-ink)] antialiased`}
    >
      {children}
    </div>
  );
}
