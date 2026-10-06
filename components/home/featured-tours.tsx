import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import type { Tour } from "@/types/tour";

interface FeaturedToursProps {
  tours: Tour[];
}

function duration(tour: Tour) {
  if (tour.duration_days && tour.duration_nights) {
    return `${tour.duration_days} Days / ${tour.duration_nights} Nights`;
  }

  if (tour.duration_days) {
    return `${tour.duration_days} Days`;
  }

  return "Tailor-made journey";
}

function price(tour: Tour) {
  return new Intl.NumberFormat("en-TZ").format(Number(tour.price));
}

export function FeaturedTours({ tours }: FeaturedToursProps) {
  if (!tours.length) return null;

  return (
    <section className="bg-[#FCFAF4] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        {/* Section heading */}
        <div className="flex flex-col gap-8 border-b border-black/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label">
              Safari Collection
            </p>

            <h2 className="font-display mt-5 max-w-2xl text-[2.75rem] leading-[0.95] tracking-[-0.035em] text-[#11110F] sm:text-5xl lg:text-[4rem]">
              Journeys made
              <br />
              for the wild
            </h2>
          </div>

          <Link
            href="/tours"
            className="group inline-flex items-center gap-3 self-start border-b border-black/30 pb-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[#11110F] transition-colors hover:border-[#F67A05] hover:text-[#F67A05] md:self-auto"
          >
            View all safaris

            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.5}
            />
          </Link>
        </div>

        {/* Tour grid */}
        <div className="mt-12 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-7 lg:gap-y-16">
          {tours.slice(0, 6).map((tour, index) => (
            <Link
              key={tour.id}
              href={`/tours/${tour.slug}`}
              className="group block"
            >
              {/* Image */}
              <div className="image-zoom relative aspect-[4/3] overflow-hidden bg-[#EDE1CF]">
                {tour.featured_image?.trim() ? (
                  <Image
                    src={tour.featured_image}
                    alt={tour.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-br from-[#8A5A3C] to-[#EDE1CF]"
                  />
                )}

                {/* Index */}
                <span className="absolute left-4 top-4 text-[10px] font-medium tracking-[0.15em] text-white/85">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Category */}
                <span className="absolute bottom-4 left-4 text-[9px] font-medium uppercase tracking-[0.18em] text-white">
                  {tour.category || "Safari"}
                </span>
              </div>

              {/* Content */}
              <div className="pt-5">
                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] font-medium uppercase tracking-[0.12em] text-black/45">
                  <span>{duration(tour)}</span>

                  {tour.destination && (
                    <>
                      <span className="h-1 w-1 rounded-full bg-black/25" />
                      <span>{tour.destination.name}</span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-display mt-3 text-[1.75rem] leading-none tracking-[-0.025em] text-[#11110F] transition-colors duration-300 group-hover:text-[#8A5A3C] sm:text-3xl">
                  {tour.name}
                </h3>

                {/* Description */}
                <p className="mt-3 max-w-lg text-[13px] leading-6 text-black/55">
                  {tour.short_description}
                </p>

                {/* Bottom row */}
                <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-black/40">
                      From
                    </span>

                    <span className="text-sm font-medium text-[#11110F]">
                      {tour.currency} {price(tour)}
                    </span>
                  </div>

                  <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-black/50 transition-colors duration-300 group-hover:text-[#11110F]">
                    Discover

                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.5}
                    />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}