
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  X,
} from "lucide-react";

import { getTour, getTours } from "@/lib/api/tours";

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
    tour.short_description ||
    `Explore ${tour.name} with Ndauwo Safaris.`;

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

function formatDuration(
  days: number | null,
  nights: number | null
) {
  if (days && nights) {
    return `${days} Days / ${nights} Nights`;
  }

  if (days) {
    return `${days} Days`;
  }

  if (nights) {
    return `${nights} Nights`;
  }

  return "Flexible duration";
}

function formatPrice(price: string, currency: string) {
  if (!price) {
    return "Price on request";
  }

  return `${currency} ${Number(price).toLocaleString()}`;
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

  const duration = formatDuration(
    tour.duration_days,
    tour.duration_nights
  );

  const price = formatPrice(tour.price, tour.currency);

  return (
    <main className="bg-[#FCFAF4]">
      {/* HERO */}
      <section className="relative min-h-[78svh] overflow-hidden bg-[#11110F] text-white">
        <div className="absolute inset-0">
          {tour.featured_image ? (
            <Image
              src={tour.featured_image}
              alt={tour.name}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          ) : (
            <div className="h-full w-full bg-[#8A5A3C]" />
          )}

          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/10" />
        </div>

        <div className="relative mx-auto flex min-h-[78svh] max-w-[1400px] items-end px-5 pb-12 pt-32 sm:px-8 sm:pb-16 lg:px-10 lg:pb-20">
          <div className="w-full">
            <Link
              href="/tours"
              className="group mb-8 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.15em] text-white/55 transition-colors hover:text-white"
            >
              <ArrowLeft
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1"
                strokeWidth={1.25}
              />
              Back to safaris
            </Link>

            <div className="mb-6 flex flex-wrap items-center gap-5 text-[9px] font-medium uppercase tracking-[0.18em] text-white/60">
              {tour.category && <span>{tour.category}</span>}

              {tour.destination && (
                <>
                  <span className="h-1 w-1 bg-[#F67A05]" />
                  <span>{tour.destination.name}</span>
                </>
              )}

              <span className="h-1 w-1 bg-white/35" />

              <span>{duration}</span>
            </div>

            <h1 className="font-display max-w-5xl text-[3.75rem] leading-[0.88] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-[7rem]">
              {tour.name}
            </h1>

            {tour.short_description && (
              <p className="mt-7 max-w-2xl text-sm leading-6 text-white/70 sm:text-[15px]">
                {tour.short_description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* QUICK DETAILS */}
      <section className="border-b border-black/10 bg-[#FCFAF4]">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
          <div className="grid border-x border-black/10 md:grid-cols-3">
            <div className="border-b border-black/10 px-5 py-6 md:border-b-0 md:border-r">
              <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-black/35">
                Destination
              </p>

              <p className="font-display mt-2 text-[1.4rem] leading-none text-[#11110F]">
                {tour.destination?.name ?? "Tanzania"}
              </p>
            </div>

            <div className="border-b border-black/10 px-5 py-6 md:border-b-0 md:border-r">
              <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-black/35">
                Duration
              </p>

              <p className="font-display mt-2 text-[1.4rem] leading-none text-[#11110F]">
                {duration}
              </p>
            </div>

            <div className="px-5 py-6">
              <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-black/35">
                Starting from
              </p>

              <p className="mt-2 text-[15px] font-medium text-[#C52A0E]">
                {price}
              </p>

              {tour.price_note && (
                <p className="mt-1 text-[10px] text-black/35">
                  {tour.price_note}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-[1fr_340px] lg:gap-20">
          <div>
            {/* OVERVIEW */}
            <section className="max-w-3xl">
              <p className="section-label">About this journey</p>

              <h2 className="font-display mt-6 text-[2.75rem] leading-[0.95] tracking-[-0.035em] text-[#11110F] sm:text-5xl">
                Experience Tanzania
                <br />
                differently.
              </h2>

              <div className="mt-8 space-y-5 text-[15px] leading-7 text-black/60">
                {tour.description
                  .split(/\n\s*\n/)
                  .filter(Boolean)
                  .map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
              </div>
            </section>

            {/* HIGHLIGHTS */}
            {tour.highlights.length > 0 && (
              <section className="mt-20 border-t border-black/10 pt-12">
                <p className="section-label">Highlights</p>

                <h2 className="font-display mt-6 text-[2.3rem] leading-none tracking-[-0.03em] text-[#11110F] sm:text-4xl">
                  What makes this journey special
                </h2>

                <div className="mt-8 grid border-t border-black/10 sm:grid-cols-2">
                  {tour.highlights.map((highlight, index) => (
                    <div
                      key={highlight}
                      className="flex gap-4 border-b border-black/10 py-5 sm:px-5 sm:first:pl-0 sm:nth-[2n+1]:pl-0"
                    >
                      <span className="text-[9px] font-medium tracking-[0.15em] text-black/30">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="max-w-md text-[13px] leading-6 text-black/65">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ITINERARY */}
            {tour.itinerary.length > 0 && (
              <section className="mt-20 border-t border-black/10 pt-12">
                <p className="section-label">Itinerary</p>

                <h2 className="font-display mt-6 text-[2.3rem] leading-none tracking-[-0.03em] text-[#11110F] sm:text-4xl">
                  Your journey,
                  <br />
                  day by day.
                </h2>

                <div className="mt-10 border-t border-black/10">
                  {tour.itinerary.map((item) => (
                    <div
                      key={`${item.day}-${item.title}`}
                      className="grid grid-cols-[45px_1fr] gap-5 border-b border-black/10 py-7 sm:grid-cols-[70px_1fr] sm:gap-8"
                    >
                      <span className="font-display text-2xl leading-none text-black/25 sm:text-3xl">
                        {String(item.day).padStart(2, "0")}
                      </span>

                      <div>
                        <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#C52A0E]">
                          Day {item.day}
                        </p>

                        <h3 className="font-display mt-2 text-[1.45rem] leading-none tracking-[-0.02em] text-[#11110F] sm:text-[1.7rem]">
                          {item.title}
                        </h3>

                        <p className="mt-3 max-w-2xl text-[13px] leading-6 text-black/55">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* INCLUDED / EXCLUDED */}
            {(tour.included.length > 0 || tour.excluded.length > 0) && (
              <section className="mt-20 border-t border-black/10 pt-12">
                <p className="section-label">Journey details</p>

                <h2 className="font-display mt-6 text-[2.3rem] leading-none tracking-[-0.03em] text-[#11110F] sm:text-4xl">
                  What's included
                </h2>

                <div className="mt-8 grid border-t border-black/10 md:grid-cols-2 md:gap-10">
                  {tour.included.length > 0 && (
                    <div className="border-b border-black/10 py-7 md:border-b-0">
                      <h3 className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#11110F]">
                        Included
                      </h3>

                      <ul className="mt-6 space-y-4">
                        {tour.included.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-[13px] leading-6 text-black/60"
                          >
                            <Check
                              aria-hidden="true"
                              className="mt-1 h-3.5 w-3.5 shrink-0 text-[#F67A05]"
                              strokeWidth={1.5}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {tour.excluded.length > 0 && (
                    <div className="py-7">
                      <h3 className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#11110F]">
                        Not included
                      </h3>

                      <ul className="mt-6 space-y-4">
                        {tour.excluded.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-[13px] leading-6 text-black/60"
                          >
                            <X
                              aria-hidden="true"
                              className="mt-1 h-3.5 w-3.5 shrink-0 text-[#C52A0E]"
                              strokeWidth={1.5}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* BOOKING / INQUIRY */}
          <aside>
            <div className="lg:sticky lg:top-24">
              <div className="border-y border-black/10 py-7">
                <p className="section-label">Plan this journey</p>

                <h2 className="font-display mt-5 text-[2rem] leading-none tracking-[-0.025em] text-[#11110F]">
                  {tour.name}
                </h2>

                <div className="mt-7 border-y border-black/10 py-5">
                  <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-black/35">
                    From
                  </p>

                  <p className="mt-1 text-xl font-medium text-[#C52A0E]">
                    {price}
                  </p>

                  {tour.price_note && (
                    <p className="mt-1 text-[10px] text-black/35">
                      {tour.price_note}
                    </p>
                  )}
                </div>

                <div className="mt-5 space-y-3 text-[12px]">
                  <div className="flex justify-between gap-4">
                    <span className="text-black/40">Destination</span>
                    <span className="text-right font-medium text-[#11110F]">
                      {tour.destination?.name ?? "Tanzania"}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-black/40">Duration</span>
                    <span className="text-right font-medium text-[#11110F]">
                      {duration}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-black/40">Difficulty</span>
                    <span className="text-right font-medium text-[#11110F]">
                      {tour.difficulty || "Moderate"}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/contact?tour=${encodeURIComponent(tour.slug)}`}
                  className="group mt-7 inline-flex h-11 w-full items-center justify-center gap-3 border border-[#11110F] bg-[#11110F] px-5 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:border-[#F67A05] hover:bg-[#F67A05]"
                >
                  Plan This Safari
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.25}
                  />
                </Link>

                <p className="mt-4 text-[10px] leading-5 text-black/35">
                  No payment is required online. Our team will contact you to
                  discuss your trip.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#EDE1CF]">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="flex flex-col gap-10 border-y border-black/15 py-14 sm:py-16 md:flex-row md:items-end md:justify-between lg:py-20">
            <div className="max-w-3xl">
              <p className="section-label text-black/45">
                Not sure yet?
              </p>

              <h2 className="font-display mt-6 text-[3rem] leading-[0.9] tracking-[-0.04em] text-[#11110F] sm:text-6xl lg:text-[5rem]">
                Let's create your
                <br />
                perfect safari.
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-6 text-black/55 sm:text-[15px]">
                Tell us what you want to experience and our team can help shape
                the right journey for you.
              </p>
            </div>

            <Link
              href="/contact"
              className="group inline-flex h-11 shrink-0 items-center justify-center gap-3 border border-[#11110F] bg-[#11110F] px-5 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-[#F67A05] hover:text-white"
            >
              Talk to Ndauwo
              <ArrowUpRight
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.25}
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

