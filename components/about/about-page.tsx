import Image from "next/image";
import {
  ArrowRight,
  Binoculars,
  CalendarDays,
  Luggage,
  Route,
  type LucideIcon,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/reveal";
import { ImageCta } from "@/components/ui/image-cta";
import { PhotoHero } from "@/components/ui/photo-hero";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import type { GalleryImage, SiteSettings, Testimonial } from "@/types/api";

interface AboutPageProps {
  settings: SiteSettings;
  testimonials: Testimonial[];
  /** Site photographs; the page picks three different frames from it. */
  gallery: GalleryImage[];
}

interface Service {
  icon: LucideIcon;
  title: string;
  body: string;
}

/** The four things the team owns, from first email to the last drop-off. */
const services: readonly Service[] = [
  {
    icon: Route,
    title: "Route, lodges and budget",
    body: "We build the day-by-day programme around your dates, the parks you want and what you can spend, then quote it per person.",
  },
  {
    icon: CalendarDays,
    title: "Dates and interests",
    body: "Wildlife, walking, photography or the migration: the season and the parks follow from what you actually want to see.",
  },
  {
    icon: Luggage,
    title: "Pick-up and drop-off",
    body: "Hotel collection in Arusha, the vehicle for the whole safari, and the drop-off at the end of the programme.",
  },
  {
    icon: Binoculars,
    title: "Guiding in the parks",
    body: "Our own guides drive and read the parks, and adjust each day around what the wildlife is doing.",
  },
] as const;

const promises = [
  "Tanzania safaris",
  "Trip planning",
  "Local guiding",
] as const;

/** A gallery frame chosen by what it shows, so captions stay truthful. */
function pickPhoto(
  gallery: GalleryImage[],
  keywords: string[],
  fallback: GalleryImage | undefined,
) {
  const match = gallery.find((photo) => {
    const haystack = `${photo.title} ${photo.alt_text}`.toLowerCase();

    return keywords.some((keyword) => haystack.includes(keyword));
  });

  return match ?? fallback;
}

/**
 * The About page: an editorial opening, the story beside a photograph, the
 * work the team owns in one rounded panel, and what guests wrote about it.
 * Everything printed here is a stored field or a fixed statement of service.
 */
export function AboutPage({ settings, testimonials, gallery }: AboutPageProps) {
  const fallbackPhoto = gallery[0];

  const backdropImage =
    settings.hero_image_url || fallbackPhoto?.image_url || undefined;

  const storyPhoto = pickPhoto(
    gallery,
    ["tourists", "watching"],
    fallbackPhoto,
  );

  const panelPhoto = pickPhoto(gallery, ["elephant"], fallbackPhoto);

  const reviews = testimonials.slice(0, 3);

  const meta = [
    testimonials.length
      ? `${testimonials.length} guest ${
          testimonials.length === 1 ? "review" : "reviews"
        }`
      : null,
    "Arusha-based team",
    "No online payment",
  ].filter((item): item is string => Boolean(item));

  return (
    <main className="bg-canvas">
      <PhotoHero
        align="center"
        eyebrow="About Ndauwo Safaris"
        title="A small Arusha team that runs its own safaris."
        description="We plan the route, drive the vehicle and guide the days ourselves, in the parks we grew up travelling through."
        backdropImage={backdropImage}
        meta={meta}
      />

      {/* Our story — the photograph carries one column, the words the other. */}
      <section className="bg-canvas pb-14 pt-16 lg:pb-20 lg:pt-20">
        <div className="container-page">
          <Reveal className="max-w-3xl">
            <h2 className="type-script text-ink">Our story</h2>

            <p className="type-display mt-3 text-ink">
              A safari should give you time to slow down and look properly.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            {storyPhoto?.image_url && (
              <Reveal>
                <figure className="image-zoom overflow-hidden rounded-[20px] bg-sand">
                  <div className="relative aspect-[4/3] lg:aspect-[16/11]">
                    <Image
                      src={storyPhoto.image_url}
                      alt={storyPhoto.alt_text || storyPhoto.title || ""}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover object-center"
                    />
                  </div>
                </figure>
              </Reveal>
            )}

            <Reveal className="lg:pt-2" delay={0.1}>
              <p className="type-eyebrow text-gold">Tanzania safaris</p>

              <div className="type-body mt-4 max-w-[46ch] space-y-4 text-ink-muted">
                <p>
                  Ndauwo Safaris plans journeys through Tanzania that combine
                  wildlife, landscapes and genuine hospitality. We would rather
                  ask two more questions than send an itinerary that fits nobody.
                </p>

                <p>
                  We believe a safari should be more than checking destinations
                  off a list: it should give you time to slow down, discover and
                  connect.
                </p>
              </div>

              <ul className="mt-6 flex flex-wrap gap-2">
                {promises.map((promise) => (
                  <li
                    key={promise}
                    className="rounded-full border border-ink/12 bg-white px-3.5 py-1.5 text-[0.72rem] font-semibold text-ink-muted"
                  >
                    {promise}
                  </li>
                ))}
              </ul>

              <Link
                href="/how-it-works"
                className="type-meta group mt-7 inline-flex items-center gap-2.5 uppercase text-ink transition-colors hover:text-clay"
              >
                How a safari comes together
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What we take care of — the rounded panel from the reference. */}
      <section className="bg-canvas pb-16 lg:pb-20">
        <div className="container-page">
          <Reveal className="rounded-[28px] bg-sand px-6 py-9 sm:px-9 sm:py-11 lg:rounded-[32px] lg:px-14 lg:py-14">
            <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:gap-14">
              <div>
                <h2 className="type-script text-ink">What we take care of</h2>

                <p className="type-body-sm mt-4 max-w-[34ch] text-ink-muted">
                  Four things sit on our side of the table, from the first email
                  to the drive back to the airport.
                </p>

                {panelPhoto?.image_url && (
                  <figure className="mt-7 overflow-hidden rounded-2xl">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={panelPhoto.image_url}
                        alt={panelPhoto.alt_text || panelPhoto.title || ""}
                        fill
                        sizes="(max-width: 1024px) 100vw, 380px"
                        className="object-cover object-center"
                      />
                    </div>
                  </figure>
                )}
              </div>

              <div className="grid gap-3.5 sm:grid-cols-2">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  const feature = index === 0;

                  return (
                    <article
                      key={service.title}
                      className={
                        feature
                          ? "flex h-full flex-col rounded-[18px] bg-forest-900 px-6 py-6 text-white"
                          : "flex h-full flex-col rounded-[18px] bg-white px-6 py-6"
                      }
                    >
                      <span
                        className={
                          feature
                            ? "flex h-[38px] w-[38px] items-center justify-center rounded-[11px] bg-white/15 text-white"
                            : "flex h-[38px] w-[38px] items-center justify-center rounded-[11px] bg-ink/5 text-forest-800"
                        }
                      >
                        <Icon
                          className="h-[18px] w-[18px]"
                          strokeWidth={1.9}
                          aria-hidden="true"
                        />
                      </span>

                      <h3
                        className={
                          feature
                            ? "mt-4 text-[1rem] font-extrabold leading-snug tracking-[-0.01em] text-white"
                            : "mt-4 text-[1rem] font-extrabold leading-snug tracking-[-0.01em] text-ink"
                        }
                      >
                        {service.title}
                      </h3>

                      <p
                        className={
                          feature
                            ? "mt-2 text-[0.8125rem] leading-[1.65] text-white/72"
                            : "mt-2 text-[0.8125rem] leading-[1.65] text-ink-muted"
                        }
                      >
                        {service.body}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {reviews.length > 0 && (
        <section className="bg-sand-muted section-pad">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="type-script text-ink">What guests say</h2>

              <Link
                href="/reviews"
                className="type-meta group inline-flex items-center gap-2.5 pb-1 uppercase text-ink-muted transition-colors hover:text-clay"
              >
                All reviews
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
              </Link>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review, index) => (
                <Reveal
                  key={review.id}
                  className="h-full"
                  delay={index * 0.07}
                >
                  <TestimonialCard
                    testimonial={review}
                    className="h-full border border-ink/10 shadow-card"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <ImageCta
        imageUrl={settings.hero_image_url || undefined}
        eyebrow="Next step"
        title="Tell us about your safari."
        description="Send the dates you have and the parks you want to see. We reply with a programme, the driving days and a final quotation."
        href="/contact"
        ctaLabel="Send an enquiry"
        secondary={{ label: "Browse safaris", href: "/tours" }}
        phone={settings.phone || undefined}
      />
    </main>
  );
}
