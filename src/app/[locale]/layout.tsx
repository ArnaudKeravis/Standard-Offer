import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { DeckFooter } from "@/components/site/deck-footer";
import { DeckTopBar } from "@/components/site/deck-top-bar";
import { locales, type Locale } from "@/i18n/routing";

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <LenisProvider>
        <div className="min-h-full flex flex-col">
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:ring-2 focus:ring-[var(--spark-amber)]"
          >
            Skip to content
          </a>

          <DeckTopBar />
          <main id="content" className="flex-1">
            {children}
          </main>
          <DeckFooter />
        </div>
      </LenisProvider>
    </NextIntlClientProvider>
  );
}
