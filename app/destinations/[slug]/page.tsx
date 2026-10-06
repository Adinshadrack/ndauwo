import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { notFound } from "next/navigation";

import {
  getDestination,
  getDestinations,
} from "@/lib/api/destinations";
import { getTours } from "@/lib/api/tours";

interface DestinationDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const destinations = await getDestinations();

  return destinations.map((destination) => ({
    slug: destination.slug,
  }));
}

export async function generateMetadata({
  params,
}: DestinationDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  const destination = await getDestination(slug);

  const title = `${destination.name} | Ndauwo Safaris`;

  const description =
    destination.description ||
    `Discover ${destination.name} with Ndauwo Safaris.`;

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      images: destination.image_url
        ? [
            {
              url: destination.image_url,
              width: 1200,
              height: 630,
              alt: destination.name,
            },
          ]
        : undefined,
    },

    alternates: {
      canonical: `/destinations/${destination.slug}`,
    },
  };
}

export default async function DestinationDetailPage({
  params,
}: DestinationDetailPageProps) {
  const { slug } = await params;

  let destination;

  try {
    destination = await getDestination(slug);
  } catch {
    notFound();
  }

  const tours = await getTours();

  const relatedTours = tours.filter(
    (tour) =>
      tour.destination?.id === destination.id ||
      tour.destination?.slug === destination.slug
  );

  return (
    <main className="bg-[#FCFAF4]">
      {/* HERO */}
      <section className="relative min-h-[72vh] overflow-hidden bg-[#11110F]">
        <Image
          src={destination.image_url}
          alt={destination.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[72vh] max-w-7xl items-end px-6 pb-12 lg:px-8 lg:pb-16">
          <div className="w-full max-w-5xl text-white">
            <Link
              href="/destinations"
              className="mb-10 inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.18em] text-white/65 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All destinations
            </Link>

            {destination.region && (
              <p className="mb-4 text-[0.65rem] uppercase tracking-[0.2em] text-white/60">
                {destination.region}
              </p>
            )}

            <h1 className="font-display max-w-4xl text-5xl leading-[0.9] tracking-[-0.035em] sm:text-6xl lg:text-[7rem]">
              {destination.name}
            </h1>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-[#FCFAF4] py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div>
            <p className="section-label">
              Discover {destination.name}
            </p>

            <h2 className="font-display mt-6 max-w-3xl text-4xl leading-[1] tracking-[-0.025em] sm:text-5xl lg:text-6xl">
              An unforgettable part of Tanzania.
            </h2>

            <div className="mt-8 max-w-3xl whitespace-pre-line text-base leading-8 text-black/60 sm:text-lg sm:leading-9">
              {destination.description ||
                `Discover the landscapes, wildlife and experiences that make ${destination.name} special.`}
            </div>
          </div>

          <aside className="border-t border-black/15 pt-6 lg:mt-2">
            <p className="text-[0.65rem] uppercase tracking-[0.18em] text-[#C52A0E]">
              Why visit
            </p>

            <div className="mt-7">
              {[
                "Exceptional landscapes",
                "Authentic wildlife experiences",
                "Experienced local guides",
                "Tailor-made safari opportunities",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-4 border-b border-black/10 py-4 first:border-t"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-[#F67A05] text-[#F67A05]">
                    <Check className="h-3 w-3" />
                  </span>

                  <span className="text-sm text-[#11110F]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* RELATED TOURS */}
      {relatedTours.length > 0 && (
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 border-b border-black/10 pb-6 md:flex-row md:items-end">
              <div>
                <p className="section-label">
                  Safari packages
                </p>

                <h2 className="font-display mt-5 text-4xl leading-none tracking-[-0.025em] sm:text-5xl">
                  Explore {destination.name}
                </h2>
              </div>

              <Link
                href="/tours"
                className="group inline-flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.16em] text-black/60 transition-colors hover:text-[#F67A05]"
              >
                View all safaris
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {relatedTours.slice(0, 6).map((tour) => (
                <Link
                  key={tour.id}
                  href={`/tours/${tour.slug}`}
                  className="group block"
                >
                  <div className="image-zoom relative aspect-[4/3] overflow-hidden bg-[#EDE1CF]">
                    <Image
                      src={tour.featured_image}
                      alt={tour.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="border-b border-black/10 py-5">
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <p className="text-[0.65rem] uppercase tracking-[0.16em] text-black/40">
                          {tour.category || "Safari"}
                        </p>

                        <h3 className="font-display mt-2 text-2xl leading-tight">
                          {tour.name}
                        </h3>
                      </div>

                      <ArrowUpRight
                        className="mt-1 h-4 w-4 shrink-0 text-black/35 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#F67A05]"
                      />
                    </div>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-black/55">
                      {tour.short_description}
                    </p>

                    <span className="mt-4 inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.16em] text-black/50 transition-colors group-hover:text-[#F67A05]">
                      View safari
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#11110F] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
            <div>
              <p className="section-label text-white/45">
                Start planning
              </p>

              <h2 className="font-display mt-6 max-w-xl text-4xl leading-[0.98] tracking-[-0.025em] sm:text-5xl lg:text-6xl">
                Ready to explore {destination.name}?
              </h2>
            </div>

            <div className="border-t border-white/15 pt-6 lg:border-t-0 lg:border-l lg:pl-10">
              <p className="max-w-xl text-base leading-7 text-white/55">
                Tell us what you're looking for and we'll help you
                create the right safari experience.
              </p>

              <Link
                href={`/contact?destination=${encodeURIComponent(
                  destination.name
                )}`}
                className="group mt-8 inline-flex items-center gap-3 border-b border-white/30 pb-2 text-xs font-medium uppercase tracking-[0.16em] transition-colors hover:border-[#F67A05] hover:text-[#F67A05]"
              >
                Plan your safari
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}