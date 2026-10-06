import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { SiteSettings } from "@/types/api";

interface AboutPreviewProps {
  settings: SiteSettings;
}

export function AboutPreview({ settings }: AboutPreviewProps) {
  return (
    <section className="bg-[#EDE1CF] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
          {/* Image */}
          <div className="relative">
            <div className="image-zoom relative aspect-[4/5] overflow-hidden">
              <Image
                src={
                  settings.hero_image_url ||
                  "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80"
                }
                alt="Ndauwo Safaris experience"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Editorial image label */}
            <div className="absolute -bottom-5 left-5 border border-black/15 bg-[#EDE1CF] px-4 py-3 sm:left-8">
              <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-black/45">
                Ndauwo Safaris
              </p>

              <p className="mt-1 font-display text-lg leading-none">
                Tanzania, East Africa
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="lg:py-8">
            <p className="section-label text-black/45">
              Why Ndauwo
            </p>

            <h2 className="font-display mt-6 max-w-xl text-[2.9rem] leading-[0.94] tracking-[-0.035em] text-[#11110F] sm:text-5xl lg:text-[4.25rem]">
              More than a safari.
              <br />
              A journey into Africa.
            </h2>

            <p className="mt-7 max-w-xl text-[15px] leading-7 text-black/60">
              {settings.about ||
                "We create memorable safari experiences built around incredible wildlife, beautiful landscapes and genuine hospitality."}
            </p>

            {/* Values */}
            <div className="mt-9 border-t border-black/15">
              {[
                "Local knowledge and experienced guides",
                "Personalized safari experiences",
                "Authentic African hospitality",
                "Responsible and memorable travel",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-5 border-b border-black/10 py-4"
                >
                  <span className="text-[9px] font-medium tracking-[0.15em] text-black/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-[13px] font-medium text-black/75">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/about"
              className="group mt-8 inline-flex items-center gap-3 border-b border-black/40 pb-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[#11110F] transition-colors duration-300 hover:border-[#C52A0E] hover:text-[#C52A0E]"
            >
              Discover Ndauwo

              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}