import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { SiteSettings } from "@/types/api";

interface HeroProps {
  settings: SiteSettings;
}

export function Hero({ settings }: HeroProps) {
  return (
    <section className="relative min-h-[92svh] overflow-hidden bg-black text-white">
      {/* Hero video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={settings.hero_image_url || undefined}
        aria-hidden="true"
      >
        <source
          src="/videos/ndauwo-hero.mp4"
          type="video/mp4"
        />
      </video>

      {/* Video treatment */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-[1400px] items-end px-5 pb-12 pt-28 sm:px-8 sm:pb-16 lg:px-10 lg:pb-20">
        <div className="w-full">
          {/* Top editorial label */}
          <div className="mb-8 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-white/75">
            <span className="h-px w-7 bg-[#F67A05]" />
            Tanzania · East Africa
          </div>

          {/* Main heading */}
          <h1 className="font-display max-w-4xl text-[3.5rem] leading-[0.9] tracking-[-0.035em] sm:text-[4.75rem] md:text-[5.75rem] lg:text-[7rem] xl:text-[7.5rem]">
            {settings.tagline || "Wild Africa. Unforgettable journeys."}
          </h1>

          {/* Bottom information row */}
          <div className="mt-8 flex flex-col gap-8 border-t border-white/20 pt-6 lg:flex-row lg:items-end lg:justify-between">
            {/* Description */}
            <p className="max-w-xl text-sm leading-6 text-white/75 sm:text-[15px]">
              {settings.about ||
                "Discover extraordinary landscapes, incredible wildlife and authentic African experiences with Ndauwo Safaris."}
            </p>

            {/* Actions */}
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link
                href="/tours"
                className="group inline-flex h-11 items-center justify-center gap-3 border border-white bg-white px-5 text-[11px] font-medium uppercase tracking-[0.14em] text-black transition-colors duration-300 hover:bg-transparent hover:text-white"
              >
                Explore Safaris

                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </Link>

              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center border border-white/40 px-5 text-[11px] font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-black"
              >
                Plan Your Journey
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Video indicator */}
      <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-white/50 sm:left-8 lg:left-10">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#F67A05]" />
        Film · Tanzania
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 right-6 z-20 hidden items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-white/55 sm:flex lg:right-10">
        <span>Scroll</span>
        <span className="h-px w-8 bg-white/30" />
      </div>
    </section>
  );
}