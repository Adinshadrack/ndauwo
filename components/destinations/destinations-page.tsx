import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Destination } from "@/types/api";
import { HeroVideo } from "@/components/media/hero-video";

interface DestinationsPageProps {
  destinations: Destination[];
}

const fallbackImages = [
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=85",
  "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1600&q=85",
  "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1600&q=85",
];

export function DestinationsPage({
  destinations,
}: DestinationsPageProps) {
  return (
    <main className="bg-[#FCFAF4]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#11110F] text-white">
        <HeroVideo />
        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-36 lg:px-8 lg:pb-32 lg:pt-44">
          <div className="max-w-4xl">
            <p className="eyebrow text-[#F67A05]">
              Explore Tanzania
            </p>

            <h1 className="font-display mt-6 max-w-4xl text-5xl leading-[0.94] tracking-[-0.035em] sm:text-6xl lg:text-[7rem]">
              Places that stay
              <br />
              with you.
            </h1>

            <div className="mt-8 flex max-w-2xl items-start gap-5">
              <span className="mt-3 hidden h-px w-12 shrink-0 bg-white/30 sm:block" />

              <p className="max-w-xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
                Discover Tanzania's legendary wildlife parks, dramatic
                landscapes and unforgettable safari destinations.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      </section>

      {/* DESTINATIONS */}
      <section className="bg-[#FCFAF4] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {!destinations.length ? (
            <div className="border-y border-black/10 py-20 text-center">
              <p className="section-label justify-center">
                Destinations
              </p>

              <h2 className="font-display mt-5 text-3xl text-[#11110F] sm:text-4xl">
                Destinations coming soon
              </h2>

              <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-black/55">
                Our destination collection is being prepared.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-10 flex items-end justify-between border-b border-black/10 pb-5">
                <div>
                  <p className="section-label">
                    The destinations
                  </p>
                </div>

                <span className="hidden text-xs uppercase tracking-[0.16em] text-black/40 sm:block">
                  {destinations.length}{" "}
                  {destinations.length === 1
                    ? "destination"
                    : "destinations"}
                </span>
              </div>

              <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
                {destinations.map((destination, index) => {
                  const image =
                    destination.image_url ||
                    fallbackImages[index % fallbackImages.length];

                  return (
                    <Link
                      key={destination.id}
                      href={`/destinations/${destination.slug}`}
                      className="group block"
                    >
                      <div className="image-zoom relative aspect-[4/3] overflow-hidden bg-[#EDE1CF]">
                        <Image
                          src={image}
                          alt={destination.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />

                        <div className="absolute left-5 top-5">
                          <span className="font-body text-[0.65rem] uppercase tracking-[0.18em] text-white/80">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
                          <div className="flex items-end justify-between gap-6">
                            <div>
                              {destination.region && (
                                <p className="mb-2 text-[0.65rem] uppercase tracking-[0.18em] text-white/65">
                                  {destination.region}
                                </p>
                              )}

                              <h2 className="font-display text-3xl leading-none text-white sm:text-4xl">
                                {destination.name}
                              </h2>
                            </div>

                            <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/40 text-white transition-colors duration-300 group-hover:border-[#F67A05] group-hover:bg-[#F67A05]">
                              <ArrowUpRight className="h-4 w-4" />
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="border-b border-black/10 py-5">
                        <div className="flex items-start justify-between gap-6">
                          <p className="max-w-xl text-sm leading-6 text-black/55">
                            {destination.description}
                          </p>

                          <span className="hidden shrink-0 text-[0.65rem] uppercase tracking-[0.16em] text-black/40 transition-colors group-hover:text-[#F67A05] sm:block">
                            Discover
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* EDITORIAL CTA */}
      <section className="bg-[#EDE1CF]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:items-end">
            <div>
              <p className="section-label text-black/50">
                Go further
              </p>

              <h2 className="font-display mt-5 max-w-md text-4xl leading-[0.98] text-[#11110F] sm:text-5xl">
                The best journeys begin with a place.
              </h2>
            </div>

            <div className="flex flex-col justify-between gap-8 border-t border-black/15 pt-6 sm:flex-row sm:items-end">
              <p className="max-w-lg text-sm leading-7 text-black/60">
                Explore the destinations that make Tanzania one of the
                world's great safari countries, then find the journey
                that takes you there.
              </p>

              <Link
                href="/tours"
                className="group inline-flex shrink-0 items-center gap-3 border-b border-black/30 pb-2 text-xs font-medium uppercase tracking-[0.16em] text-[#11110F] transition-colors hover:border-[#F67A05] hover:text-[#F67A05]"
              >
                Explore safaris
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}