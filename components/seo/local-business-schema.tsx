import { getSiteSettings } from "@/lib/api/settings";

export async function LocalBusinessSchema() {
  const settings = await getSiteSettings();

  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",

    name: "Ndauwo Safaris",

    description:
      settings.tagline ||
      "Tanzania safari experiences and wildlife adventures.",

    url:
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://ndauwosafaris.com",

    logo: settings.logo_url || undefined,

    telephone: settings.phone || undefined,

    email: settings.email || undefined,

    address: settings.address
      ? {
          "@type": "PostalAddress",
          streetAddress: settings.address,
        }
      : undefined,

    sameAs: [
      settings.facebook_url,
      settings.instagram_url,
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}