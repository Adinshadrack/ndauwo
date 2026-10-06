import type { Metadata } from "next";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { getSiteSettings } from "@/lib/api/settings";
import { LocalBusinessSchema } from "@/components/seo/local-business-schema";
import "./globals.css";

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

  authors: [
    {
      name: "Ndauwo Safaris",
    },
  ],

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

  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <html lang="en">
      <body>
        <LocalBusinessSchema />
        <Header settings={settings} />
        <main>{children}</main>
        <Footer settings={settings} />
        <FloatingWhatsApp settings={settings} />
      </body>
    </html>
  );
}