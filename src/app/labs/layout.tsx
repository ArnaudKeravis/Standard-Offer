import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import type { ReactNode } from "react";

import "@/components/sodexo-labs/labs-tokens.css";

/** Sodexo brand stack — Open Sans (Sensa Pro not licensed in repo). */
const labsSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-labs-sans",
  display: "swap",
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
      className={`${labsSans.variable} labs-body min-h-screen bg-[var(--labs-paper)] text-[var(--labs-ink)] antialiased`}
    >
      {children}
    </div>
  );
}
