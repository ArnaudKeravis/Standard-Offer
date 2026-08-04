import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/components/sodexo-labs/labs-tokens.css";

export const metadata: Metadata = {
  title: "CoDesign Sandbox · Sodexo",
  description:
    "Hub for Sodexo CoDesign artefacts — Labs, Persona Studio, Spark deck, demos and CoDesign OS.",
};

/** Root hub — uses Spark Inter / Inter Tight from root layout. */
export default function SandboxLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--spark-paper)] text-[var(--spark-ink)] antialiased">
      {children}
    </div>
  );
}
