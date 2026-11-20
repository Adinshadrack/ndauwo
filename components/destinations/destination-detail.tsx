import { ChevronRight, MapPin } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/reveal";
import { TourCard } from "@/components/tours/tour-card";
import { CtaLink } from "@/components/ui/cta";
import { ImageCta } from "@/components/ui/image-cta";
import { PhotoHero } from "@/components/ui/photo-hero";
import { CountChip } from "@/components/ui/pill";
import type { Destination, Tour } from "@/types/api";

interface DestinationDetailProps {
  destination: Destination;
  /** Programmes that actually run through this destination. */
  tours: Tour[];
  /** Site hero photography, used behind the closing band. */
  ctaImage?: string;
  phone?: string;
}

const metaRowClassName =
  "flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0";

/**
 * A destination is a place, not a product: the page opens on its own
 * photograph, says where it is and how many programmes reach it, and then hands
 * over to the safari cards. Nothing here is invented — the facts are the
 * region, the live programme count and the Arusha departure every trip shares.
 */
export function DestinationDetail({
  destination,
  tours,
  ctaImage,
  phone,
}: DestinationDetailProps) {
  const programmeCount = tours.length;
  const planHref = `/contact?destination=${encodeURIComponent(destination.name)}`;

  return (
    <main className="bg-canvas">
      <PhotoHero
        align="center"
        title={destination.name}
        backdropImage={destination.image_url || undefined}
        eyebrow={destination.region || "Destination"}
        breadcrumb={
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-white/55"
          >
            <Link
              href="/destinations"
              className="transition-colors hover:text-white"
            >
              Destinations
            </Link>

            <ChevronRight
              className="h-3 w-3 text-white/35"
              strokeWidth={2.2}
              aria-hidden="true"
            />

            <span className="text-white/85" aria-current="page">
              {destination.name}
            </span>
          </nav>
        }
        meta={[
          programmeCount > 0
            ? `${programmeCount} ${programmeCount === 1 ? "safari" : "safaris"}`
            : "Safaris on request",
          "Trips start in Arusha",
        ]}
      />

      {/* The long copy, with the facts it implies kept beside it. */}
      <section className="py-14 lg:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
          <Reveal>
            <p className="type-eyebrow text-gold">The destination</p>

            <div className="type-body mt-5 max-w-[68ch] whitespace-pre-line text-ink/70">
              {destination.description ||
                `${destination.name} is one of the places our safaris run through. Ask us for the programmes that reach it.`}
            </div>
          </Reveal>

          <Reveal as="aside" className="surface-card h-max p-6 lg:sticky lg:top-32" delay={0.1}>
            <p className="type-badge text-ink-soft">At a glance</p>

            <dl className="mt-4 divide-y divide-ink/8 border-t border-ink/8">
              {destination.region && (
                <div className={metaRowClassName}>
                  <dt className="flex items-center gap-2 text-[0.75rem] font-semibold text-ink-soft">
                    <MapPin className="h-3.5 w-3.5" strokeWidth={1.9} aria-hidden="true" />
                    Region
                  </dt>
                  <dd className="text-right text-[0.8125rem] font-bold text-ink">
                    {destination.region}
                  </dd>
                </div>
              )}

              <div className={metaRowClassName}>
                <dt className="text-[0.75rem] font-semibold text-ink-soft">
                  Programmes
                </dt>
                <dd className="text-right text-[0.8125rem] font-bold text-ink">
                  {programmeCount > 0 ? programmeCount : "On request"}
                </dd>
              </div>

              <div className={metaRowClassName}>
                <dt className="text-[0.75rem] font-semibold text-ink-soft">
                  Trips start in
                </dt>
                <dd className="text-right text-[0.8125rem] font-bold text-ink">
                  Arusha
                </dd>
              </div>
            </dl>

            <CtaLink
              href={planHref}
              shape="pill"
              size="lg"
              className="mt-6 w-full"
            >
              Plan a safari here
            </CtaLink>

            <Link
              href="/destinations"
              className="mt-3 flex items-center justify-center gap-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-ink"
            >
              All destinations
            </Link>
          </Reveal>
        </div>
      </section>

      {/* The programmes that reach it, in the same card as the rest of the site. */}
      <section className="border-t border-ink/10 py-14 lg:py-16">
        <div className="container-page">
          <Reveal className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="type-eyebrow text-gold">Safari programmes</p>

              <h2 className="type-display mt-3 max-w-[24ch] text-ink">
                Safaris through {destination.name}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <CountChip>
                {programmeCount} {programmeCount === 1 ? "safari" : "safaris"}
              </CountChip>

              <Link
                href="/tours"
                className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-ink-soft underline underline-offset-4 transition-colors hover:text-ink"
              >
                All safaris
              </Link>
            </div>
          </Reveal>

          {programmeCount > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tours.map((tour, index) => (
                <Reveal
                  key={tour.id}
                  className="h-full"
                  delay={Math.min(index, 6) * 0.07}
                >
                  <TourCard tour={tour} variant="minimal" />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="surface-card mt-8 px-6 py-12 text-center">
              <h3 className="type-section-title">
                No scheduled programme through {destination.name} yet
              </h3>

              <p className="mx-auto mt-3 max-w-md text-[0.84375rem] leading-relaxed text-ink-muted">
                The team builds custom routes here. Tell us your dates and we
                will put one together.
              </p>

              <CtaLink href={planHref} shape="pill" className="mt-6">
                Plan a custom route
              </CtaLink>
            </div>
          )}
        </div>
      </section>

      <ImageCta
        imageUrl={ctaImage}
        phone={phone}
        title={`Planning a safari in ${destination.name}?`}
        description="Send us your dates and how many days you have. We reply with the route, the lodges and the driving days around them."
        href={planHref}
        ctaLabel="Plan your safari"
        secondary={{ label: "All destinations", href: "/destinations" }}
      />
    </main>
  );
}
