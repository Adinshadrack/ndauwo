import { ChevronRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { PhotoHero } from "@/components/ui/photo-hero";
import type { Tour } from "@/types/tour";

interface TourHeroProps {
  tour: Tour;
  durationLabel: string;
}

/**
 * The programme's own photograph behind centred copy, with the trip facts in
 * the meta rule: how long it runs, where it goes and how hard the driving is.
 * Everything printed here is a stored field.
 */
export function TourHero({ tour, durationLabel }: TourHeroProps) {
  const meta = [
    durationLabel,
    tour.destination?.name ?? "Tanzania",
    tour.difficulty?.trim() || null,
  ].filter((item): item is string => Boolean(item));

  return (
    <PhotoHero
      align="center"
      title={tour.name}
      description={tour.short_description || undefined}
      backdropImage={tour.featured_image || undefined}
      eyebrow={tour.category?.trim() || "Safari programme"}
      meta={meta}
      breadcrumb={
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-white/55"
        >
          <Link href="/tours" className="transition-colors hover:text-white">
            Safaris
          </Link>

          <ChevronRight
            className="h-3 w-3 text-white/35"
            strokeWidth={2.2}
            aria-hidden="true"
          />

          <span className="text-white/85" aria-current="page">
            {tour.name}
          </span>
        </nav>
      }
    />
  );
}
