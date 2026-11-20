import type { Metadata } from "next";
import { MotionConfig } from "motion/react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { getSiteSettings } from "@/lib/api/settings";
import { getTours } from "@/lib/api/tours";
import { getDestinations } from "@/lib/api/destinations";
import { LocalBusinessSchema } from "@/components/seo/local-business-schema";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { isLocale } from "@/i18n/routing";
import { notFound } from "next/navigation";
import "./globals.css";
import "flag-icons/css/flag-icons.min.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://ndauwosafaris.com"
  ),
  title: {
    default: "Ndauwo Safaris | Tanzania Safari Adventures",
    template: "%s | Ndauwo Safaris",
  },
  description:
    "Experience unforgettable Tanzania safari adventures with Ndauwo Safaris. Discover wildlife, breathtaking landscapes and authentic African experiences.",
  keywords: [
    "Tanzania safaris",
    "Tanzania safari",
    "African safari",
    "Serengeti safari",
    "Ngorongoro safari",
    "wildlife safari Tanzania",
    "Ndauwo Safaris",
  ],
  authors: [{ name: "Ndauwo Safaris" }],
  creator: "Ndauwo Safaris",
  publisher: "Ndauwo Safaris",
  openGraph: {
    type: "website",
    siteName: "Ndauwo Safaris",
    title: "Ndauwo Safaris | Tanzania Safari Adventures",
    description:
      "Discover unforgettable wildlife experiences and Tanzania safari adventures with Ndauwo Safaris.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ndauwo Safaris Tanzania",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ndauwo Safaris | Tanzania Safari Adventures",
    description:
      "Discover unforgettable Tanzania safari adventures with Ndauwo Safaris.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const [settings, tours, destinations] = await Promise.all([
    getSiteSettings(),
    getTours(),
    getDestinations(),
  ]);
  const messages = await getMessages();
  return (
    <html lang="en">
      <body className="font-body antialiased bg-[#FCFAF4]">
        <NextIntlClientProvider messages={messages} locale={locale}>
          {/* Every motion component honours the visitor's reduced-motion setting. */}
          <MotionConfig reducedMotion="user">
            <LocalBusinessSchema />
            <Header settings={settings} tours={tours} destinations={destinations} />
            <main className="pt-[88px] sm:pt-[100px] lg:pt-[114px]">{children}</main>
            <Footer settings={settings} />
            <FloatingWhatsApp settings={settings} />
          </MotionConfig>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
