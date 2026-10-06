
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";

import type { Tour } from "@/types/tour";
import { TourCard } from "@/components/tours/tour-card";
import { HeroVideo } from "@/components/media/hero-video";

type ToursPageProps = {
  tours: Tour[];
};

export function ToursPage({ tours }: ToursPageProps) {
  const [category, setCategory] = useState("All");
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
        destination === "All" ||
        tour.destination?.name === destination;

      return matchesCategory && matchesDestination;
    });
  }, [tours, category, destination]);

  const hasFilters = category !== "All" || destination !== "All";

  const clearFilters = () => {
    setCategory("All");
    setDestination("All");
  };

  return (
    <main className="bg-[#FCFAF4]">
      {/* HERO */}
      <section className="relative min-h-[72svh] overflow-hidden bg-[#11110F] text-white">
        <HeroVideo />

        <div className="relative z-10 mx-auto flex min-h-[72svh] max-w-[1400px] items-end px-5 pb-12 pt-32 sm:px-8 sm:pb-16 lg:px-10 lg:pb-20">
          <div className="w-full">
            <div className="mb-7 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-white/65">
              <span className="h-px w-7 bg-[#F67A05]" />
              Safari collection
            </div>

            <h1 className="font-display max-w-5xl text-[3.75rem] leading-[0.88] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-[7rem]">
              Journeys into
              <br />
              the wild.
            </h1>

            <div className="mt-8 flex flex-col gap-6 border-t border-white/20 pt-6 lg:flex-row lg:items-end lg:justify-between">
              <p className="max-w-xl text-sm leading-6 text-white/70 sm:text-[15px]">
                Discover unforgettable journeys across Tanzania's extraordinary
                landscapes, from legendary wildlife destinations to remote
                wilderness escapes.
              </p>

              <span className="text-[9px] uppercase tracking-[0.18em] text-white/35">
                {tours.length} journeys · Tanzania
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="border-b border-black/10 bg-[#FCFAF4]">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col border-b border-black/10 py-5 md:flex-row md:items-center md:justify-between md:gap-8">
            <div className="flex items-center gap-4">
              <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-black/35">
                Filter journeys
              </span>

              <span className="h-px w-7 bg-black/15" />

              <span className="text-[10px] uppercase tracking-[0.14em] text-black/45">
                {filteredTours.length}{" "}
                {filteredTours.length === 1 ? "journey" : "journeys"}
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 md:mt-0 md:flex">
              <label className="relative">
                <span className="sr-only">Filter by category</span>

                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="h-10 min-w-[190px] appearance-none border border-black/15 bg-transparent px-4 pr-10 text-[10px] font-medium uppercase tracking-[0.12em] text-[#11110F] outline-none transition-colors focus:border-[#F67A05]"
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item === "All" ? "All categories" : item}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-black/40"
                  strokeWidth={1.5}
                />
              </label>

              <label className="relative">
                <span className="sr-only">Filter by destination</span>

                <select
                  value={destination}
                  onChange={(event) => setDestination(event.target.value)}
                  className="h-10 min-w-[190px] appearance-none border border-black/15 bg-transparent px-4 pr-10 text-[10px] font-medium uppercase tracking-[0.12em] text-[#11110F] outline-none transition-colors focus:border-[#F67A05]"
                >
                  {destinations.map((item) => (
                    <option key={item} value={item}>
                      {item === "All" ? "All destinations" : item}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-black/40"
                  strokeWidth={1.5}
                />
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* TOUR RESULTS */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        {filteredTours.length > 0 ? (
          <>
            <div className="mb-12 flex flex-col gap-6 border-b border-black/10 pb-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="section-label">Explore</p>

                <h2 className="font-display mt-5 text-[2.75rem] leading-[0.95] tracking-[-0.035em] text-[#11110F] sm:text-5xl lg:text-[4rem]">
                  Find your
                  <br />
                  adventure.
                </h2>
              </div>

              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="group inline-flex items-center gap-2 self-start border-b border-black/30 pb-1 text-[10px] font-medium uppercase tracking-[0.14em] text-black/55 transition-colors hover:border-[#F67A05] hover:text-[#F67A05] md:self-auto"
                >
                  Clear filters
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.5}
                  />
                </button>
              )}
            </div>

            <div className="grid gap-x-7 gap-y-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-20">
              {filteredTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </>
        ) : (
          <div className="border-y border-black/10 py-20 text-center">
            <p className="section-label justify-center text-[#C52A0E]">
              No journeys found
            </p>

            <h2 className="font-display mt-6 text-4xl leading-none tracking-[-0.03em] text-[#11110F] sm:text-5xl">
              Try another filter.
            </h2>

            <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-black/50">
              We couldn't find a safari matching those filters. Try another
              destination or category.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="group mt-7 inline-flex items-center gap-3 border-b border-black/40 pb-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#11110F] transition-colors hover:border-[#F67A05] hover:text-[#F67A05]"
            >
              View all safaris
              <ArrowUpRight
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </button>
          </div>
        )}
      </section>

      {/* WHY NDAUWO */}
      <section className="bg-[#EDE1CF]">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="flex flex-col gap-10 border-b border-black/15 pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-label text-black/45">Why Ndauwo</p>

              <h2 className="font-display mt-5 max-w-2xl text-[2.75rem] leading-[0.95] tracking-[-0.035em] text-[#11110F] sm:text-5xl lg:text-[4rem]">
                More than
                <br />
                a safari.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-black/50 lg:pb-1">
              Thoughtful journeys built around local knowledge, personal
              service and the extraordinary nature of Tanzania.
            </p>
          </div>

          <div className="grid border-t border-black/10 sm:grid-cols-3">
            {[
              {
                number: "01",
                title: "Local expertise",
                text: "Experienced guides who know Tanzania beyond the usual routes.",
              },
              {
                number: "02",
                title: "Personal journeys",
                text: "Safari experiences shaped around what you want to discover.",
              },
              {
                number: "03",
                title: "Wild at heart",
                text: "Meaningful encounters with landscapes, wildlife and people.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="border-b border-black/10 py-7 sm:border-b-0 sm:border-l sm:px-7 lg:px-8"
              >
                <span className="text-[9px] font-medium tracking-[0.16em] text-black/30">
                  {item.number}
                </span>

                <h3 className="font-display mt-10 text-[1.7rem] leading-none tracking-[-0.02em] text-[#11110F]">
                  {item.title}
                </h3>

                <p className="mt-4 max-w-sm text-[13px] leading-6 text-black/55">
                  {item.text}
                </p>

                <div className="mt-7 h-px w-8 bg-[#C52A0E]" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#11110F] text-white">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="flex flex-col gap-10 border-y border-white/15 py-14 sm:py-16 lg:flex-row lg:items-end lg:justify-between lg:py-20">
            <div className="max-w-3xl">
              <p className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white/45">
                <span className="h-px w-7 bg-[#F67A05]" />
                Start planning
              </p>

              <h2 className="font-display mt-6 text-[3.25rem] leading-[0.9] tracking-[-0.04em] sm:text-6xl lg:text-[5.5rem]">
                Your wild story
                <br />
                starts here.
              </h2>

              <p className="mt-7 max-w-xl text-sm leading-6 text-white/55 sm:text-[15px]">
                Tell us what kind of experience you're looking for and our
                team will help you plan your journey.
              </p>
            </div>

            <Link
              href="/contact"
              className="group inline-flex h-11 shrink-0 items-center justify-center gap-3 border border-white bg-white px-5 text-[10px] font-medium uppercase tracking-[0.14em] text-black transition-colors duration-300 hover:bg-transparent hover:text-white"
            >
              Plan my safari
              <ArrowUpRight
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
