import type { Metadata } from "next";

import { getDestinations } from "@/lib/api/destinations";
import { DestinationsPage } from "@/components/destinations/destinations-page";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Explore Tanzania's incredible safari destinations with Ndauwo Safaris.",
};

export default async function DestinationsPageRoute() {
  const destinations = await getDestinations();

  return <DestinationsPage destinations={destinations} />;
}