import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/motion/reveal";
import { JourneyStrip } from "@/components/tours/journey-strip";
import { RelatedTours } from "@/components/tours/related-tours";
import { RouteMap } from "@/components/tours/route-map";
import { TourHero } from "@/components/tours/tour-hero";
import { TourHighlightsCard } from "@/components/tours/tour-highlights-card";
import { TourOverviewCard } from "@/components/tours/tour-overview-card";
import { TourPlanCard } from "@/components/tours/tour-plan-card";
import { TourPriceBar } from "@/components/tours/tour-price-bar";
import { TourScope } from "@/components/tours/tour-scope";
import { ImageCta } from "@/components/ui/image-cta";
import { formatAmount, tourDuration } from "@/lib/format";
import { getSiteSettings } from "@/lib/api/settings";
import { getTour, getTours } from "@/lib/api/tours";
import {
  ARUSHA_ORIGIN,
  coordinatesForPlace,
  openStreetMapLink,
} from "@/lib/map/places";

type TourDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const tours = await getTours();

  return tours.map((tour) => ({
    slug: tour.slug,
  }));
}

export async function generateMetadata({
  params,
}: TourDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;

  const tour = await getTour(slug);

  const title = `${tour.name} | Ndauwo Safaris`;

  const description =
    tour.short_description || `Explore ${tour.name} with Ndauwo Safaris.`;

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      type: "website",

      images: tour.featured_image
        ? [
            {
              url: tour.featured_image,
              width: 1200,
              height: 630,
              alt: tour.name,
            },
          ]
        : undefined,
    },

    alternates: {
      canonical: `/tours/${tour.slug}`,
    },
  };
}

export default async function TourDetailsPage({
  params,
}: TourDetailsPageProps) {
  const { slug } = await params;

  let tour;

  try {
    tour = await getTour(slug);
  } catch {
    notFound();
  }

  if (!tour) {
    notFound();
  }

  const [settings, tours] = await Promise.all([getSiteSettings(), getTours()]);

  const relatedTours = tours
    .filter((item) => item.slug !== tour.slug)
    .slice(0, 3);

  const duration = tourDuration(tour);
  const priceLabel = tour.price
    ? formatAmount(tour.currency, tour.price)
    : "Price on request";
  const enquiryHref = `/contact?tour=${encodeURIComponent(tour.slug)}`;

  const whatsappNumber = settings.whatsapp?.replace(/\D/g, "");
  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        `Hello Ndauwo Safaris, I'd like to ask about ${tour.name}.`,
      )}`
    : null;

  // The API does not carry coordinates yet; the known places resolve locally
  // and anything else falls back to the departure pin only.
  const destinationCoordinates = coordinatesForPlace(tour.destination?.name);
  const destination =
    tour.destination && destinationCoordinates
      ? { name: tour.destination.name, ...destinationCoordinates }
      : null;
  const mapPoints = destination ? [ARUSHA_ORIGIN, destination] : [ARUSHA_ORIGIN];

  return (
    <main className="bg-canvas">
      <TourHero tour={tour} durationLabel={duration.label} />

      {tour.price && (
        <TourPriceBar
          priceLabel={priceLabel}
          priceNote={tour.price_note || undefined}
          enquiryHref={enquiryHref}
        />
      )}

      <div className="mt-8 bg-sand-muted py-16 sm:mt-11 lg:py-[72px]">
        <div className="container-page grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_352px] lg:gap-9">
          <Reveal className="flex flex-col gap-6">
            <TourOverviewCard tour={tour} durationLabel={duration.label} />
            <TourHighlightsCard highlights={tour.highlights} />
          </Reveal>

          <Reveal as="aside" className="flex flex-col gap-5 lg:sticky lg:top-[130px]" delay={0.12}>
            <RouteMap
              origin={ARUSHA_ORIGIN}
              destination={destination}
              caption={
                destination
                  ? `${ARUSHA_ORIGIN.name} to ${
                      tour.destination?.name ?? destination.name
                    }`
                  : `Departures from ${ARUSHA_ORIGIN.name}`
              }
              largerMapHref={openStreetMapLink(mapPoints)}
            />

            <TourPlanCard
              priceLabel={priceLabel}
              enquiryHref={enquiryHref}
              whatsappHref={whatsappHref}
            />
          </Reveal>
        </div>
      </div>

      {tour.itinerary.length > 0 && (
        <Reveal className="container-page py-16 lg:py-[72px]">
          <JourneyStrip itinerary={tour.itinerary} dayCount={duration.days} />
        </Reveal>
      )}

      <Reveal>
        <TourScope
          included={tour.included}
          excluded={tour.excluded}
          photo={tour.featured_image || undefined}
          asidePhoto={settings.hero_image_url || undefined}
        />
      </Reveal>

      <Reveal>
        <RelatedTours tours={relatedTours} className="py-16 lg:py-20" />
      </Reveal>

      {/*
        The same photography band that closes the listings: the footer opens
        with a forest block, so a plain green section here read as one slab.
      */}
      <ImageCta
        imageUrl={settings.hero_image_url}
        title="Plan this safari"
        description={`Send your travel dates for ${tour.name} and we reply with availability, accommodation options and a final quotation.`}
        href={enquiryHref}
        ctaLabel="Send an enquiry"
        secondary={{ label: "Browse safaris", href: "/tours" }}
        phone={settings.phone}
        tone="sand"
      />
    </main>
  );
}
