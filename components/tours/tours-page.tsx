"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { TourCard } from "@/components/tours/tour-card";
import { ImageCta } from "@/components/ui/image-cta";
import { PhotoHero } from "@/components/ui/photo-hero";
import type { Tour } from "@/types/tour";

interface ToursPageProps {
  tours: Tour[];
  initialCategory?: string;
  /** A safari photograph, held behind the opening copy. */
  heroImage?: string;
  /** Site hero photography, used behind the closing band. */
  ctaImage?: string;
  phone?: string;
}

const selectClassName =
  "h-11 w-full appearance-none rounded-lg border border-ink/12 bg-white pl-4 pr-10 text-[0.8125rem] font-semibold text-ink outline-none transition-colors focus:border-ember sm:w-auto sm:min-w-[190px]";

export function ToursPage({
  tours,
  initialCategory,
  heroImage,
  ctaImage,
  phone,
}: ToursPageProps) {
  const [category, setCategory] = useState(initialCategory ?? "All");
  const [destination, setDestination] = useState("All");

  const categories = useMemo(() => {
    const values = tours.map((tour) => tour.category).filter(Boolean);

    return ["All", ...Array.from(new Set(values))];
  }, [tours]);

  const destinations = useMemo(() => {
    const values = tours
      .map((tour) => tour.destination?.name)
      .filter(Boolean) as string[];

    return ["All", ...Array.from(new Set(values))];
  }, [tours]);

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      const matchesCategory =
        category === "All" || tour.category === category;

      const matchesDestination =
        destination === "All" || tour.destination?.name === destination;

      return matchesCategory && matchesDestination;
    });
  }, [tours, category, destination]);

  const hasFilters = category !== "All" || destination !== "All";

  const clearFilters = () => {
    setCategory("All");
    setDestination("All");
  };

  const heroMeta = [
    `${tours.length} ${tours.length === 1 ? "programme" : "programmes"}`,
    `${destinations.length - 1} ${
      destinations.length === 2 ? "destination" : "destinations"
    }`,
  ];

  return (
    <main className="bg-canvas">
      {/*
        Every collection front opens the same way: a centred photograph of the
        collection, the count kept in the foot rule. The filter bar is the one
        card sitting on it, cut from the same cloth as the safaris below.
      */}
      <PhotoHero
        title="Safaris"
        description="Tanzania's parks, from the Serengeti plains to the Ngorongoro highlands, arranged as programmes you can compare at a glance."
        backdropImage={heroImage}
        eyebrow="Safari collection"
        align="center"
        meta={tours.length ? heroMeta : undefined}
        // The filter card overlaps this edge, so the foot opens up for it.
        className="pb-20 lg:pb-24"
      />

      <div className="container-page relative z-10 -mt-9">
        <div className="animate-rise flex flex-wrap items-center gap-3 rounded-[20px] border border-ink/8 bg-white px-5 py-4 shadow-card [animation-delay:200ms]">
          <span className="type-badge text-ink-soft">Filter</span>

          <label className="relative w-full sm:w-auto">
            <span className="sr-only">Filter by category</span>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className={selectClassName}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All categories" : item}
                </option>
              ))}
            </select>

            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
              strokeWidth={1.6}
            />
          </label>

          <label className="relative w-full sm:w-auto">
            <span className="sr-only">Filter by destination</span>

            <select
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              className={selectClassName}
            >
              {destinations.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All destinations" : item}
                </option>
              ))}
            </select>

            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
              strokeWidth={1.6}
            />
          </label>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="pill pill-outline h-10 px-4 text-[12px]"
            >
              Clear filters
            </button>
          )}

          <span className="type-meta ml-auto uppercase text-ink-soft">
            {filteredTours.length}{" "}
            {filteredTours.length === 1 ? "safari" : "safaris"}
          </span>
        </div>
      </div>

      <section className="bg-canvas pb-10 pt-9 lg:pb-16">
        <div className="container-page">
          <h2 className="sr-only">Safari results</h2>

          {filteredTours.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTours.map((tour, index) => (
                <Reveal
                  key={tour.id}
                  className="h-full"
                  delay={Math.min(index, 6) * 0.07}
                >
                  <TourCard tour={tour} variant="minimal" />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="surface-card px-6 py-14 text-center">
              <h2 className="type-section-title">No safaris match</h2>

              <p className="mx-auto mt-3 max-w-md text-[0.84375rem] leading-relaxed text-ink-muted">
                Nothing matches that combination of category and destination
                yet.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="pill pill-dark mt-6 h-11 px-5 text-[12.5px]"
              >
                Show all safaris
              </button>
            </div>
          )}
        </div>
      </section>

      <ImageCta imageUrl={ctaImage} phone={phone} />
    </main>
  );
}
