"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

/**
 * Legacy catalogue route — product is now a single selling deck.
 */
export default function ExploreRedirectPage() {
  const params = useParams<{ locale: string }>();

  useEffect(() => {
    const locale = params.locale ?? "en";
    window.location.replace(`/${locale}#offerings`);
  }, [params.locale]);

  return (
    <div className="flex min-h-[40vh] items-center justify-center bg-[var(--spark-paper)] px-6 text-sm text-[color:color-mix(in_oklab,var(--spark-ink),transparent_40%)]">
      Redirecting to the deck…
    </div>
  );
}
