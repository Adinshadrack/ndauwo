import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Pill } from "@/components/ui/pill";
import { formatAmount, tourDuration } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Tour } from "@/types/tour";

type TourCardVariant = "showcase" | "minimal";

interface TourCardProps {
  tour: Tour;
  /**
   * "showcase" carries the destination, a short summary and an action disc for
   * the homepage and related tours; "minimal" is the listing card — photo,
   * name, duration and price only.
   */
  variant?: TourCardVariant;
}

function discountInfo(tour: Tour) {
  const original = Number(tour.original_price);
  const current = Number(tour.price);

  if (!Number.isFinite(original) || original <= 0) return null;

  // Price-derived saving wins, so the badge always agrees with the struck price.
  const computedPercentage =
    Number.isFinite(current) && current > 0 && current < original
      ? Math.round(((original - current) / original) * 100)
      : null;

  const storedPercentage =
    tour.discount_percentage && tour.discount_percentage > 0
      ? tour.discount_percentage
      : null;

  const percentage = computedPercentage ?? storedPercentage;

  return percentage
    ? { original, percentage, discounted: Math.round(original * (1 - percentage / 100)) }
    : null;
}

function durationLabel(tour: Tour) {
  const { days, nights } = tourDuration(tour);

  if (!days) return null;

  return `${days} ${days === 1 ? "Day" : "Days"} / ${nights} ${
    nights === 1 ? "Night" : "Nights"
  }`;
}

/** Where the safari goes, falling back to its category and then the country. */
function tourEyebrow(tour: Tour) {
  return tour.destination?.name?.trim() || tour.category?.trim() || "Tanzania";
}

export function TourCard({ tour, variant = "showcase" }: TourCardProps) {
  const discount = discountInfo(tour);
  const duration = durationLabel(tour);
  const price = tour.price
    ? formatAmount(tour.currency, tour.price)
    : "Price on request";

  return (
    <Link
      href={`/tours/${tour.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[20px] border border-ink/8 bg-white",
        "shadow-card transition-transform duration-300 hover:-translate-y-1",
      )}
    >
      <div
        className={cn(
          "relative shrink-0 overflow-hidden bg-sand",
          variant === "showcase" ? "aspect-[3/2]" : "aspect-[4/3]",
        )}
      >
        {tour.featured_image ? (
          <Image
            src={tour.featured_image}
            alt={tour.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div aria-hidden="true" className="absolute inset-0 bg-forest/40" />
        )}

        {variant === "showcase" && (
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/45 to-transparent"
          />
        )}

        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          {variant === "showcase" && duration ? (
            <Pill tone="glass">
              <Clock className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
              {duration}
            </Pill>
          ) : (
            <span />
          )}

          {discount && (
            <span className="rounded-full bg-clay px-2.5 py-1 text-[9.5px] font-extrabold uppercase leading-none tracking-[0.08em] text-white">
              {discount.percentage}% off
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        {variant === "showcase" && (
          <p className="type-badge text-ember">{tourEyebrow(tour)}</p>
        )}

        <h2
          className={cn(
            "line-clamp-2 font-extrabold tracking-[-0.025em] text-ink",
            variant === "showcase"
              ? "mt-2 text-[1.15rem] leading-[1.25]"
              : "text-[1.0625rem] leading-snug",
          )}
        >
          {tour.name}
        </h2>

        {variant === "minimal" && duration && (
          <p className="mt-2 flex items-center gap-1.5 text-[0.75rem] text-ink-muted">
            <Clock className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
            {duration}
          </p>
        )}

        {variant === "showcase" && tour.short_description?.trim() && (
          <p className="mt-2 line-clamp-2 text-[0.78125rem] leading-[1.6] text-ink-muted">
            {tour.short_description}
          </p>
        )}

        <div className="mt-auto pt-5">
          <div
            className={cn(
              "flex items-end justify-between gap-3",
              variant === "showcase" && "border-t border-ink/10 pt-4",
            )}
          >
            <div className="min-w-0">
              {discount && (
                <p className="font-tour text-[10.5px] font-semibold leading-none text-ink-soft line-through">
                  {formatAmount(tour.currency, discount.original)}
                </p>
              )}

              <p
                className={cn(
                  "type-price text-ink",
                  variant === "showcase"
                    ? "mt-1 text-[1.25rem]"
                    : "text-[1.1rem]",
                )}
              >
                {price}
              </p>

              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-soft">
                per person
              </p>
            </div>

            {variant === "showcase" ? (
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-forest-900 text-white transition-colors duration-300 group-hover:bg-ember">
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
              </span>
            ) : (
              <ArrowRight
                className="mb-1 h-4 w-4 flex-none text-ink-soft transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-ember"
                strokeWidth={2}
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
