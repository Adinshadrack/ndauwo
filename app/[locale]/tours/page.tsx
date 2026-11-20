// app/tours/page.tsx

import { getSiteSettings } from "@/lib/api/settings";
import { getTours } from "@/lib/api/tours";
import { ToursPage } from "@/components/tours/tours-page";

interface ToursPageRouteProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function Page({ searchParams }: ToursPageRouteProps) {
  const [{ category }, tours, settings] = await Promise.all([
    searchParams,
    getTours(),
    getSiteSettings(),
  ]);
  const initialCategory = category
    ? tours.find(
        (tour) =>
          tour.category.trim().toLowerCase() === category.trim().toLowerCase()
      )?.category
    : undefined;

  return (
    <ToursPage
      key={initialCategory ?? ""}
      tours={tours}
      initialCategory={initialCategory}
      /* The first programme's photograph opens the page. */
      heroImage={tours[0]?.featured_image || settings.hero_image_url || undefined}
      ctaImage={settings.hero_image_url || undefined}
      phone={settings.phone || undefined}
    />
  );
}
