import { DestinationCard } from "@/components/destinations/destination-card";
import { Reveal } from "@/components/motion/reveal";
import { ImageCta } from "@/components/ui/image-cta";
import { PhotoHero } from "@/components/ui/photo-hero";
import type { Destination } from "@/types/api";

interface DestinationsPageProps {
  destinations: Destination[];
  /** A destination photograph, held behind the opening copy. */
  heroImage?: string;
  /** Site hero photography, used behind the closing band. */
  ctaImage?: string;
  phone?: string;
}

export function DestinationsPage({
  destinations,
  heroImage,
  ctaImage,
  phone,
}: DestinationsPageProps) {
  const regions = new Set(
    destinations.map((destination) => destination.region).filter(Boolean),
  );

  const heroMeta = [
    `${destinations.length} ${destinations.length === 1 ? "place" : "places"}`,
    ...(regions.size > 0
      ? [`${regions.size} ${regions.size === 1 ? "region" : "regions"}`]
      : []),
  ];

  return (
    <main className="bg-canvas">
      {/*
        The opening is a photograph, not a second listing: the places appear
        once, as cards. Only the counts are carried into the hero.
      */}
      <PhotoHero
        title="Destinations"
        description="Parks and regions we run safaris through, from the Serengeti plains to the Ngorongoro highlands and out to the coast."
        backdropImage={heroImage}
        eyebrow="Where we go"
        align="center"
        meta={destinations.length ? heroMeta : undefined}
      />

      <section className="bg-canvas pb-12 pt-10 lg:pb-14 lg:pt-12">
        <div className="container-page">
          {!destinations.length ? (
            <div className="surface-card px-6 py-14 text-center">
              <h2 className="type-section-title">Destinations coming soon</h2>
              <p className="mx-auto mt-3 max-w-md text-[0.84375rem] leading-relaxed text-ink-muted">
                Our destination collection is being prepared.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {destinations.map((destination, index) => (
                <Reveal key={destination.id} delay={Math.min(index, 7) * 0.06}>
                  <DestinationCard destination={destination} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <ImageCta
        imageUrl={ctaImage}
        phone={phone}
        title="Plan around a place"
        description="Tell us which parks you want to see and we build the route, the lodges and the driving days around them."
      />
    </main>
  );
}
