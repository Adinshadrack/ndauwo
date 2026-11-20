import Image from "next/image";
import { MapPin } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Pill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";
import type { Destination } from "@/types/api";

interface DestinationCardProps {
  destination: Destination;
  /** Real number of tours in this destination; hidden when unknown. */
  tripCount?: number;
  className?: string;
}

/** The region when we have it, otherwise the first sentence of the copy. */
function placeTagline(destination: Destination): string {
  if (destination.region?.trim()) return destination.region;

  const firstSentence = destination.description?.split(/[.!?]/)[0]?.trim();

  return firstSentence ?? "";
}

/** Photo card: the place name, its region and a pin that turns ember on hover. */
export function DestinationCard({
  destination,
  tripCount,
  className,
}: DestinationCardProps) {
  const tagline = placeTagline(destination);
  const hasTrips = typeof tripCount === "number" && tripCount > 0;

  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className={cn(
        "group relative block aspect-[5/4] overflow-hidden rounded-2xl bg-forest-900 shadow-card",
        className,
      )}
    >
      {destination.image_url && (
        <Image
          src={destination.image_url}
          alt={destination.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

      {hasTrips && (
        <Pill tone="glass" className="absolute left-3 top-3">
          {tripCount} {tripCount === 1 ? "safari" : "safaris"}
        </Pill>
      )}

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
        <div className="min-w-0">
          <h3 className="truncate text-[1rem] font-extrabold tracking-[-0.02em] text-white">
            {destination.name}
          </h3>

          {tagline && (
            <p className="mt-1 line-clamp-1 text-[11.5px] text-white/75">
              {tagline}
            </p>
          )}
        </div>

        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-ink transition-colors duration-300 group-hover:bg-ember group-hover:text-white">
          <MapPin className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
