import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Destination } from "@/lib/data/destinations";

type DestinationCardProps = {
  destination: Destination;
  large?: boolean;
};

export function DestinationCard({
  destination,
  large = false,
}: DestinationCardProps) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group block"
    >
      <div
        className={`image-zoom relative overflow-hidden bg-[#EDE1CF] ${
          large ? "aspect-[4/5]" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          sizes={
            large
              ? "(max-width: 768px) 100vw, 50vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center border border-white/50 text-white opacity-0 transition-all duration-300 group-hover:border-[#F67A05] group-hover:bg-[#F67A05] group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-7">
          {destination.region && (
            <p className="mb-2 text-[0.65rem] uppercase tracking-[0.18em] text-white/65">
              {destination.region}
            </p>
          )}

          <h2 className="font-display text-3xl leading-none sm:text-4xl">
            {destination.name}
          </h2>
        </div>
      </div>

      <div className="flex items-start justify-between gap-6 border-b border-black/10 py-4">
        <p className="max-w-md text-sm leading-6 text-black/55">
          {destination.shortDescription}
        </p>

        <span className="hidden shrink-0 text-[0.65rem] uppercase tracking-[0.16em] text-black/40 transition-colors group-hover:text-[#F67A05] sm:block">
          Discover
        </span>
      </div>
    </Link>
  );
}