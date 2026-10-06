
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Tour } from "@/types/tour";

type TourCardProps = {
  tour: Tour;
};

function formatDuration(tour: Tour) {
  if (tour.duration_days && tour.duration_nights) {
    return `${tour.duration_days} Days / ${tour.duration_nights} Nights`;
  }

  if (tour.duration_days) {
    return `${tour.duration_days} Days`;
  }

  if (tour.duration_nights) {
    return `${tour.duration_nights} Nights`;
  }

  return "Flexible duration";
}

function formatPrice(tour: Tour) {
  if (!tour.price) {
    return "Request price";
  }

  return `${tour.currency} ${Number(tour.price).toLocaleString()}`;
}

export function TourCard({ tour }: TourCardProps) {
  const duration = formatDuration(tour);
  const price = formatPrice(tour);

  return (
    <article className="group">
      <Link href={`/tours/${tour.slug}`} className="block">
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

          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />

          <span className="absolute left-4 top-4 text-[9px] font-medium tracking-[0.16em] text-white/75">
            Safari
          </span>

          {tour.category && (
            <span className="absolute bottom-4 left-4 text-[9px] font-medium uppercase tracking-[0.18em] text-white">
              {tour.category}
            </span>
          )}

          <span className="absolute bottom-4 right-4 text-[9px] font-medium uppercase tracking-[0.14em] text-white/75">
            {duration}
          </span>
        </div>

        <div className="border-b border-black/10 pb-6 pt-5">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[9px] font-medium uppercase tracking-[0.14em] text-black/40">
            {tour.destination && <span>{tour.destination.name}</span>}
            <span>{duration}</span>
          </div>

          <div className="mt-3 flex items-start justify-between gap-5">
            <div>
              <h2 className="font-display text-[1.8rem] leading-none tracking-[-0.025em] text-[#11110F] transition-colors duration-300 group-hover:text-[#8A5A3C] sm:text-[2rem]">
                {tour.name}
              </h2>

              {tour.short_description && (
                <p className="mt-3 max-w-md text-[13px] leading-6 text-black/55">
                  {tour.short_description}
                </p>
              )}
            </div>

            <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center border border-black/15 text-black/45 transition-all duration-300 group-hover:border-[#F67A05] group-hover:bg-[#F67A05] group-hover:text-white">
              <ArrowUpRight
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.25}
              />
            </span>
          </div>

          <div className="mt-5 flex items-baseline gap-2 border-t border-black/10 pt-4">
            <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-black/35">
              From
            </span>

            <span className="text-[13px] font-medium text-[#11110F]">
              {price}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

