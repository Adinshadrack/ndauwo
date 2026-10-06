import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { GalleryImage } from "@/types/api";

interface GalleryPreviewProps {
  images: GalleryImage[];
}

export function GalleryPreview({ images }: GalleryPreviewProps) {
  const displayedImages = images
    .filter((image) => image.image_url?.trim())
    .slice(0, 8);

  if (!displayedImages.length) return null;

  return (
    <section className="bg-[#FCFAF4] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        {/* Heading */}
        <div className="flex flex-col gap-6 border-b border-black/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-label">
              Safari Gallery
            </p>

            <h2 className="font-display mt-5 max-w-2xl text-[2.75rem] leading-[0.95] tracking-[-0.035em] sm:text-5xl lg:text-[4rem]">
              See Africa through
              <br />
              our eyes
            </h2>
          </div>

          <Link
            href="/gallery"
            className="group inline-flex items-center gap-3 self-start border-b border-black/30 pb-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[#11110F] transition-colors hover:border-[#F67A05] hover:text-[#F67A05] sm:self-auto"
          >
            View gallery

            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.5}
            />
          </Link>
        </div>

        {/* Gallery */}
        <div className="mt-12 grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
          {displayedImages.map((image, index) => {
            const featured = index === 0 || index === 5;

            return (
              <Link
                key={image.id}
                href="/gallery"
                className={`group relative overflow-hidden ${
                  featured
                    ? "col-span-2 aspect-[4/3] md:row-span-2 md:aspect-auto"
                    : "aspect-square"
                }`}
              >
                <Image
                  src={image.image_url}
                  alt={
                    image.alt_text ||
                    image.title ||
                    "Ndauwo Safaris"
                  }
                  fill
                  sizes={
                    featured
                      ? "(max-width: 768px) 100vw, 50vw"
                      : "(max-width: 768px) 50vw, 25vw"
                  }
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />

                {/* Subtle hover treatment */}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />

                {/* Image number */}
                <span className="absolute left-4 top-4 text-[9px] font-medium tracking-[0.16em] text-white/75">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Caption */}
                {image.title && (
                  <div className="absolute inset-x-0 bottom-0 translate-y-1 px-5 pb-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                      {image.title}
                    </p>
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Gallery footer */}
        <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4">
          <span className="text-[9px] uppercase tracking-[0.16em] text-black/35">
            Moments from Tanzania
          </span>

          <span className="text-[9px] uppercase tracking-[0.16em] text-black/35">
            {displayedImages.length} photographs
          </span>
        </div>
      </div>
    </section>
  );
}