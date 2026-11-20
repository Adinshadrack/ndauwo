import type { Tour } from "@/types/tour";

/**
 * Prices are stored as plain numbers; the site shows the currency code rather
 * than a symbol so TZS and USD read the same way on every card.
 */
export function formatAmount(currency: string, value: string | number): string {
  const amount = Number(value);

  if (!Number.isFinite(amount)) return `${currency} ${value}`;

  return `${currency} ${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(amount)}`;
}

export interface TourDuration {
  days: number;
  nights: number;
  label: string;
}

/**
 * The stored duration fields and the itinerary can disagree, so the longer of
 * the two wins: a tour with four itinerary days is not a one-day tour.
 */
export function tourDuration(
  tour: Pick<Tour, "duration_days" | "duration_nights" | "itinerary">,
): TourDuration {
  const days = Math.max(tour.duration_days ?? 0, tour.itinerary.length);
  const nights =
    days > 0
      ? Math.max(tour.duration_nights ?? 0, days - 1)
      : (tour.duration_nights ?? 0);

  if (days > 0) {
    return {
      days,
      nights,
      label: `${days} ${days === 1 ? "day" : "days"}, ${nights} ${
        nights === 1 ? "night" : "nights"
      }`,
    };
  }

  if (nights > 0) {
    return {
      days,
      nights,
      label: `${nights} ${nights === 1 ? "night" : "nights"}`,
    };
  }

  return { days: 0, nights: 0, label: "Flexible duration" };
}
