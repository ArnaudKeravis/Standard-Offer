import type { ReactNode } from "react";
import { DeckFooter } from "@/components/site/deck-footer";
import { DeckTopBar } from "@/components/site/deck-top-bar";

export default function DeckLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DeckTopBar />
      <main id="content" className="flex-1">
        {children}
      </main>
      <DeckFooter />
    </>
  );
}
