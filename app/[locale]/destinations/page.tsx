import type { Metadata } from "next";

import { getDestinations } from "@/lib/api/destinations";
import { getSiteSettings } from "@/lib/api/settings";
import { DestinationsPage } from "@/components/destinations/destinations-page";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Explore Tanzania's incredible safari destinations with Ndauwo Safaris.",
};

interface DestinationsPageRouteProps {
  searchParams: Promise<{
    region?: string;
  }>;
}

export default async function DestinationsPageRoute({
  searchParams,
}: DestinationsPageRouteProps) {
  const [{ region }, destinations, settings] = await Promise.all([
    searchParams,
    getDestinations(),
    getSiteSettings(),
  ]);
  const filteredDestinations = region
    ? destinations.filter(
        (destination) =>
          destination.region.trim().toLowerCase() === region.trim().toLowerCase()
      )
    : destinations;

  return (
    <DestinationsPage
      destinations={filteredDestinations}
      /* The first park photograph opens the page; the count stays live. */
      heroImage={destinations[0]?.image_url || settings.hero_image_url || undefined}
      ctaImage={settings.hero_image_url || undefined}
      phone={settings.phone || undefined}
    />
  );
}
