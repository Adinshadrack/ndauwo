import { TourCard } from "@/components/tours/tour-card";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { Tour } from "@/types/tour";

interface RelatedToursProps {
  tours: Tour[];
  className?: string;
}

/** Other programmes, shown as cards under the tour being viewed. */
export function RelatedTours({ tours, className }: RelatedToursProps) {
  if (tours.length === 0) return null;

  return (
    <section className={cn("bg-canvas", className)}>
      <div className="container-page">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="type-section-title">More safaris</h2>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-muted">
              Other programmes that depart from Arusha.
            </p>
          </div>

          <Link
            href="/tours"
            className="pill pill-outline h-10 px-4 text-[12.5px]"
          >
            View all safaris
          </Link>
        </div>

        <div
          className={cn(
            "grid gap-6 sm:grid-cols-2",
            tours.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2",
          )}
        >
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  );
}
