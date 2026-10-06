"use client";

import Image from "next/image";
import { useState } from "react";

import type { GalleryImage } from "@/types/api";
import { GalleryLightbox } from "./gallery-lightbox";
import { HeroVideo } from "@/components/media/hero-video";

interface GalleryPageProps {
  images: GalleryImage[];
}

export function GalleryPage({ images }: GalleryPageProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closeLightbox = () => setActiveIndex(null);

  const showPrevious = () => {
    setActiveIndex((current) => {
      if (current === null) return null;

      return current === 0 ? images.length - 1 : current - 1;
    });
  };

  const showNext = () => {
    setActiveIndex((current) => {
      if (current === null) return null;

      return current === images.length - 1 ? 0 : current + 1;
    });
  };

  return (
    <>
      <main className="bg-[#FCFAF4]">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#11110F] text-white">
          <HeroVideo />
          <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-36 lg:px-8 lg:pb-32 lg:pt-44">
            <div className="max-w-4xl">
              <p className="eyebrow text-[#F67A05]">
                Safari gallery
              </p>

              <h1 className="font-display mt-6 max-w-4xl text-5xl leading-[0.92] tracking-[-0.035em] sm:text-6xl lg:text-[7rem]">
                Moments worth
                <br />
                remembering.
              </h1>

              <div className="mt-8 flex max-w-2xl items-start gap-5">
                <span className="mt-3 hidden h-px w-12 shrink-0 bg-white/30 sm:block" />

                <p className="text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
                  A glimpse into the landscapes, wildlife and experiences
                  that make Tanzania unforgettable.
                </p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
        </section>

        {/* GALLERY */}
        <section className="bg-[#FCFAF4] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {!images.length ? (
              <div className="border-y border-black/10 py-20 text-center">
                <p className="section-label justify-center">
                  The gallery
                </p>

                <h2 className="font-display mt-5 text-3xl text-[#11110F] sm:text-4xl">
                  Gallery coming soon
                </h2>

                <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-black/55">
                  We're preparing moments from our safari journeys.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-10 flex items-end justify-between border-b border-black/10 pb-5">
                  <p className="section-label">
                    From the road
                  </p>

                  <span className="text-[0.65rem] uppercase tracking-[0.16em] text-black/35">
                    {images.length}{" "}
                    {images.length === 1 ? "image" : "images"}
                  </span>
                </div>

                <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
                  {images.map((image, index) => (
                    <button
                      key={image.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className="group mb-6 block w-full break-inside-avoid text-left"
                      aria-label={`Open ${
                        image.title || "gallery image"
                      }`}
                    >
                      <div className="image-zoom relative overflow-hidden bg-[#EDE1CF]">
                        <Image
                          src={image.image_url}
                          alt={
                            image.alt_text ||
                            image.title ||
                            "Ndauwo Safaris"
                          }
                          width={1200}
                          height={900}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="h-auto w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />

                        <div className="absolute left-4 top-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <span className="text-[0.65rem] uppercase tracking-[0.18em] text-white">
                            View
                          </span>
                        </div>

                        {image.title && (
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent px-5 pb-5 pt-16 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <p className="font-display text-xl text-white">
                              {image.title}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between border-b border-black/10 py-3">
                        <span className="text-[0.6rem] uppercase tracking-[0.16em] text-black/35">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        {image.title && (
                          <span className="max-w-[80%] truncate text-xs text-black/50">
                            {image.title}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* CLOSING STATEMENT */}
        {images.length > 0 && (
          <section className="bg-[#EDE1CF]">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
              <div className="max-w-3xl">
                <p className="section-label text-black/45">
                  Beyond the photograph
                </p>

                <h2 className="font-display mt-6 text-4xl leading-[1] tracking-[-0.025em] text-[#11110F] sm:text-5xl lg:text-6xl">
                  Some places are better experienced than explained.
                </h2>
              </div>
            </div>
          </section>
        )}
      </main>

      <GalleryLightbox
        images={images}
        activeIndex={activeIndex}
        onClose={closeLightbox}
        onPrevious={showPrevious}
        onNext={showNext}
      />
    </>
  );
}