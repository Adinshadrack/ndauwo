import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Destination } from "@/types/api";

interface DestinationsProps {
  destinations: Destination[];
}

const fallbackImages = [
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1200&q=80",
];

export function Destinations({ destinations }: DestinationsProps) {
  if (!destinations.length) return null;

  return (
    <section className="bg-[#11110F] py-20 text-white sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        {/* Section introduction */}
        <div className="flex flex-col gap-8 border-b border-white/15 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
              <span className="h-px w-7 bg-[#F67A05]" />
              Explore Tanzania
            </p>

            <h2 className="font-display mt-5 text-[2.75rem] leading-[0.95] tracking-[-0.035em] sm:text-5xl lg:text-[4rem]">
              Places that stay
              <br />
              with you
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-white/55 lg:pb-1">
            From legendary wildlife destinations to spectacular landscapes,
            discover the places that make Tanzania unforgettable.
          </p>
        </div>

        {/* Destination list */}
        <div className="mt-12">
          {destinations.slice(0, 6).map((destination, index) => {
            const image =
              destination.image_url ||
              fallbackImages[index % fallbackImages.length];

            return (
              <Link
                key={destination.id}
                href={`/destinations/${destination.slug}`}
                className="group grid border-b border-white/10 py-7 first:border-t md:grid-cols-[72px_1fr_1.2fr_auto] md:items-center md:gap-6 lg:grid-cols-[90px_1fr_1.4fr_auto] lg:py-8"
              >
                {/* Number */}
                <span className="hidden text-[10px] font-medium tracking-[0.16em] text-white/35 md:block">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Name */}
                <div>
                  {destination.region && (
                    <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.16em] text-white/40">
                      {destination.region}
                    </p>
                  )}

                  <h3 className="font-display text-[2rem] leading-none tracking-[-0.025em] text-white transition-colors duration-300 group-hover:text-[#F67A05] sm:text-[2.35rem]">
                    {destination.name}
                  </h3>
                </div>

                {/* Image */}
                <div className="image-zoom relative mt-5 aspect-[16/8] overflow-hidden md:mt-0">
                  <Image
                    src={image}
                    alt={destination.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover"
                  />
                </div>

                {/* Action */}
                <span className="mt-5 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white/45 transition-colors duration-300 group-hover:text-white md:mt-0">
                  Explore

                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.5}
                  />
                </span>
              </Link>
            );
          })}
        </div>

        {/* Mobile / collection footer */}
        <div className="mt-8 flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-[0.16em] text-white/30">
            Our destinations
          </span>

          <span className="text-[9px] uppercase tracking-[0.16em] text-white/30">
            {destinations.length} places
          </span>
        </div>
      </div>
    </section>
  );
}