import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DestinationDetail } from "@/components/destinations/destination-detail";
import {
  getDestination,
  getDestinations,
} from "@/lib/api/destinations";
import { getSiteSettings } from "@/lib/api/settings";
import { getTours } from "@/lib/api/tours";

interface DestinationDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const destinations = await getDestinations();

  return destinations.map((destination) => ({
    slug: destination.slug,
  }));
}

export async function generateMetadata({
  params,
}: DestinationDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  const destination = await getDestination(slug);

  const title = `${destination.name} | Ndauwo Safaris`;

  const description =
    destination.description ||
    `Discover ${destination.name} with Ndauwo Safaris.`;

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      images: destination.image_url
        ? [
            {
              url: destination.image_url,
              width: 1200,
              height: 630,
              alt: destination.name,
            },
          ]
        : undefined,
    },

    alternates: {
      canonical: `/destinations/${destination.slug}`,
    },
  };
}

export default async function DestinationDetailPage({
  params,
}: DestinationDetailPageProps) {
  const { slug } = await params;

  let destination;

  try {
    destination = await getDestination(slug);
  } catch {
    notFound();
  }

  const [tours, settings] = await Promise.all([getTours(), getSiteSettings()]);

  const relatedTours = tours.filter(
    (tour) =>
      tour.destination?.id === destination.id ||
      tour.destination?.slug === destination.slug
  );

  return (
    <DestinationDetail
      destination={destination}
      tours={relatedTours}
      ctaImage={settings.hero_image_url || undefined}
      phone={settings.phone || undefined}
    />
  );
}
