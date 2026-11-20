"use client";

import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Star } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { CtaLink } from "@/components/ui/cta";
import { temporaryImages } from "@/lib/constants/images";
import type { SiteSettings, Tour } from "@/types/api";

const HEADLINE_LINES = ["A Journey Into The", "Heart Of Africa"] as const;

/** Hero-featured tours rotate as offer slides; cap the set so the counter stays meaningful. */
const HERO_SLIDE_LIMIT = 5;
const AUTOPLAY_MS = 7000;

const TRUST_POINTS = [
  "All trips are 100% tailor made",
  "5 star customer reviews",
  "Expert local guides",
  "24/7 trip support",
] as const;

interface HeroProps {
  settings: SiteSettings;
  tours: Tour[];
}

interface HeroSlide {
  tour: Tour;
  image: string;
}

function formatAmount(currency: string, value: string | number) {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return `${currency} ${value}`;
  }

  return `${currency} ${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(amount)}`;
}

interface DiscountInfo {
  original: number;
  percentage: number;
  discounted: number;
}

function discountInfo(tour: Tour): DiscountInfo | null {
  const original = Number(tour.original_price);
  const current = Number(tour.price);

  if (!Number.isFinite(original) || original <= 0) {
    return null;
  }

  // Derive the saving from the actual prices first, so the badge can never
  // contradict the struck-through amount shown next to it.
  const computedPercentage =
    Number.isFinite(current) && current > 0 && current < original
      ? Math.round(((original - current) / original) * 100)
      : null;

  const storedPercentage =
    tour.discount_percentage && tour.discount_percentage > 0
      ? tour.discount_percentage
      : null;

  const percentage = computedPercentage ?? storedPercentage;

  if (!percentage) {
    return null;
  }

  return {
    original,
    percentage,
    discounted: Math.round(original * (1 - percentage / 100)),
  };
}

function durationLabel(tour: Tour) {
  if (!tour.duration_days) {
    return null;
  }

  return `${tour.duration_days} ${tour.duration_days === 1 ? "Day" : "Days"}`;
}

export function Hero({ settings, tours }: HeroProps) {
  const heroTours = useMemo(
    () => tours.filter((tour) => tour.is_hero_featured),
    [tours],
  );

  const featuredTours = useMemo(
    () => tours.filter((tour) => tour.is_featured),
    [tours],
  );

  const slides = useMemo<HeroSlide[]>(() => {
    const pool = heroTours.length
      ? heroTours
      : featuredTours.length
        ? featuredTours
        : tours;

    return pool.slice(0, HERO_SLIDE_LIMIT).map((tour) => ({
      tour,
      image:
        tour.featured_image?.trim() ||
        settings.hero_image_url?.trim() ||
        temporaryImages.hero,
    }));
  }, [heroTours, featuredTours, tours, settings.hero_image_url]);

  const [index, setIndex] = useState(0);
  const [interacting, setInteracting] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const reduceMotion = useReducedMotion();

  const count = slides.length;
  const activeIndex = count ? index % count : 0;
  const active = slides[activeIndex] ?? null;

  const move = useCallback(
    (step: number) => {
      if (count < 2) return;

      setIndex((previous) => (previous + step + count) % count);
    },
    [count],
  );

  useEffect(() => {
    const syncVisibility = () => setPageHidden(document.hidden);

    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);

    return () =>
      document.removeEventListener("visibilitychange", syncVisibility);
  }, []);

  useEffect(() => {
    if (count < 2 || interacting || pageHidden) return;

    const timer = window.setInterval(
      () => setIndex((previous) => (previous + 1) % count),
      AUTOPLAY_MS,
    );

    return () => window.clearInterval(timer);
  }, [count, interacting, pageHidden]);

  const backdrop =
    settings.hero_image_url?.trim() || active?.image || temporaryImages.hero;

  const discount = active ? discountInfo(active.tour) : null;
  const finalPrice = active ? Number(active.tour.price) : NaN;
  const fade = reduceMotion ? 0 : 0.6;

  return (
    <section
      aria-roledescription={count > 1 ? "carousel" : undefined}
      aria-label="Featured safari offers"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={() => setInteracting(false)}
      className="relative isolate overflow-hidden bg-ink font-[family-name:var(--font-body)] text-white"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 -z-10">
        <AnimatePresence initial={false}>
          <motion.div
            key={backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={backdrop}
              alt=""
              fill
              priority
              sizes="100vw"
              className="scale-[1.03] object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/40 to-ink/5" />
      </div>

      {/* Main content */}
      <div className="container-page flex flex-col gap-10 pb-10 pt-12 sm:pt-14 lg:min-h-[calc(100svh-114px)] lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:pb-10 lg:pt-10">
        {/* Left: copy + actions */}
        <div className="max-w-[40rem] lg:min-w-0 lg:flex-1">
          <div className="animate-rise flex flex-col items-start">
            <span className="max-w-full font-[family-name:var(--font-accent)] text-[1.6rem] leading-none text-sand sm:text-[1.85rem]">
              {settings.tagline?.trim() || "More Than A Safari"}
            </span>

            <svg
              viewBox="0 0 200 14"
              aria-hidden="true"
              preserveAspectRatio="none"
              className="mt-1 h-[9px] w-[10rem] text-ember sm:w-[11.5rem]"
            >
              <path
                d="M2 4.4C45 1.3 100 0.7 198 2.7l0 .9C120 7 60 9 2 11.4Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <h1 className="type-display animate-rise mt-5 text-white [animation-delay:90ms]">
            {HEADLINE_LINES.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <div className="animate-rise mt-8 flex w-full flex-col items-stretch gap-3 [animation-delay:180ms] sm:flex-row sm:items-center">
            <CtaLink href="/contact" size="lg" className="w-full sm:w-auto">
              Plan My Trip
            </CtaLink>

            <CtaLink
              href="/tours"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              Explore Safaris
            </CtaLink>
          </div>

          {count > 1 && (
            <div className="animate-fade mt-9 flex items-center gap-2 [animation-delay:280ms]">
              <button
                type="button"
                onClick={() => move(-1)}
                aria-label="Show previous featured offer"
                className="flex h-9 w-9 items-center justify-center rounded-sm border border-white/30 text-white/70 transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink"
              >
                <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
              </button>

              <button
                type="button"
                onClick={() => move(1)}
                aria-label="Show next featured offer"
                className="flex h-9 w-9 items-center justify-center rounded-sm border border-white/60 text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink"
              >
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </button>

              <p className="ml-3 flex items-baseline gap-1.5 text-[10px] font-semibold tracking-[0.28em] text-white/45">
                <span className="text-white/90">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <span>/</span>
                <span>{String(count).padStart(2, "0")}</span>
              </p>
            </div>
          )}
        </div>

        {/* Right: rotating offer card */}
        {active && (
          <div
            className={`relative w-full max-w-[360px] shrink-0 lg:w-[300px] xl:w-[340px] 2xl:w-[360px] ${
              count > 1 ? "lg:mr-14 xl:mr-16" : ""
            }`}
          >
            {count > 1 && (
              <button
                type="button"
                onClick={() => move(1)}
                aria-label="Show next featured offer"
                className="absolute -right-12 top-[38%] z-10 hidden h-11 w-11 items-center justify-center rounded-full bg-ink text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:scale-105 lg:flex"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </button>
            )}

            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={active.tour.id}
                aria-roledescription="slide"
                aria-label={`${activeIndex + 1} of ${count}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: fade, ease: [0.22, 1, 0.36, 1] }}
                className="bg-pine shadow-[0_30px_60px_-28px_rgba(0,0,0,0.75)]"
              >
                {/* Tour image + badges */}
                <div className="relative h-48 w-full overflow-hidden bg-forest/70 sm:h-52 lg:h-[clamp(7rem,20vh,13rem)]">
                  <Image
                    src={active.image}
                    alt={active.tour.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 360px"
                    className="object-cover object-center"
                  />

                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/55 to-transparent" />

                  <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-1.5">
                    {durationLabel(active.tour) && (
                      <span className="type-badge bg-black/40 px-2.5 py-1 text-white backdrop-blur-[2px]">
                        {durationLabel(active.tour)}
                      </span>
                    )}

                    {active.tour.category?.trim() && (
                      <span className="type-badge bg-ember px-2.5 py-1 text-white">
                        {active.tour.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Discount ribbon */}
                {active.tour.discount_tag?.trim() && (
                  <p className="bg-clay px-4 py-2 text-center text-[10px] font-bold uppercase leading-[1.45] tracking-[0.1em] text-white">
                    {active.tour.discount_tag}
                  </p>
                )}

                {/* Offer details */}
                <div className="px-4 pb-4 pt-3.5">
                  <h2 className="type-card-title line-clamp-2 text-white">
                    {active.tour.name}
                  </h2>

                  <p className="mt-2 text-[11px] leading-[1.5] text-white/65">
                    {active.tour.destination?.name?.trim() || "Tanzania"}
                  </p>

                  <div className="mt-3 bg-stone px-3 py-2.5">
                    {discount && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-tour text-[10.5px] font-semibold text-black/45 line-through">
                          {formatAmount(active.tour.currency, discount.original)}
                        </span>

                        <span className="bg-clay px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.06em] text-white">
                          Save {discount.percentage}%
                        </span>

                        {Math.abs(discount.discounted - finalPrice) >= 1 && (
                          <span className="font-tour text-[10.5px] font-bold text-ink">
                            ({formatAmount(active.tour.currency, discount.discounted)})
                          </span>
                        )}
                      </div>
                    )}

                    <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <span className="type-price text-ink">
                        {formatAmount(active.tour.currency, active.tour.price)}
                      </span>

                      <span className="text-[11px] font-medium text-black/55">
                        Per Person
                      </span>
                    </div>
                  </div>

                  {active.tour.price_note?.trim() && (
                    <p className="mt-2 line-clamp-2 text-[9.5px] leading-[1.5] text-white/50">
                      {active.tour.price_note}
                    </p>
                  )}

                  <Link
                    href={`/tours/${active.tour.slug}`}
                    className="group mt-3 flex w-full items-center justify-center gap-2 bg-ember py-3 text-[13px] font-bold text-white transition-colors duration-300 hover:bg-clay"
                  >
                    View Offer

                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={2.25}
                    />
                  </Link>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Trust strip */}
      <div className="relative border-t border-white/15 bg-ink/25">
        <div className="container-page grid grid-cols-2 gap-x-5 gap-y-4 py-4 lg:flex lg:items-center lg:justify-between lg:py-[18px]">
          {TRUST_POINTS.map((point, position) => (
            <Fragment key={point}>
              <div className="flex items-center gap-2.5">
                <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border border-white/45">
                  <Check className="h-3 w-3 text-white" strokeWidth={2.5} />
                </span>

                <span className="max-w-[10rem] text-[11px] font-medium leading-[1.45] text-white sm:text-[12px]">
                  {point}
                </span>
              </div>

              {position < TRUST_POINTS.length - 1 && (
                <Star
                  aria-hidden="true"
                  className="hidden h-3.5 w-3.5 shrink-0 fill-current text-ember lg:block"
                  strokeWidth={0}
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}