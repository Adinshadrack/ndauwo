"use client";

import Image from "next/image";
import { useEffect } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import type { GalleryImage } from "@/types/api";

interface GalleryLightboxProps {
  images: GalleryImage[];
  activeIndex: number | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export function GalleryLightbox({
  images,
  activeIndex,
  onClose,
  onPrevious,
  onNext,
}: GalleryLightboxProps) {
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrevious();
      if (event.key === "ArrowRight") onNext();
    };

    document.addEventListener("keydown", handleKeyDown);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [activeIndex, onClose, onPrevious, onNext]);

  if (activeIndex === null) return null;

  const image = images[activeIndex];

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#11110F]/[0.98] p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={image.title || "Gallery image"}
      onClick={onClose}
    >
      {/* CLOSE */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center border border-white/20 text-white transition-colors hover:border-white hover:bg-white hover:text-black"
      >
        <X className="h-4 w-4" />
      </button>

      {/* PREVIOUS */}
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onPrevious();
        }}
        aria-label="Previous image"
        className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/20 text-white transition-colors hover:border-white hover:bg-white hover:text-black sm:left-8"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* IMAGE */}
      <div
        className="relative h-[78vh] w-full max-w-6xl"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={image.image_url}
          alt={
            image.alt_text ||
            image.title ||
            "Ndauwo Safaris"
          }
          fill
          sizes="100vw"
          className="object-contain"
          priority
        />

        {(image.title || image.alt_text) && (
          <div className="absolute bottom-0 left-1/2 w-full max-w-xl -translate-x-1/2 translate-y-full pt-5 text-center">
            {image.title && (
              <p className="font-display text-xl text-white">
                {image.title}
              </p>
            )}

            {image.alt_text && (
              <p className="mt-1 text-xs leading-5 text-white/45">
                {image.alt_text}
              </p>
            )}
          </div>
        )}
      </div>

      {/* NEXT */}
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onNext();
        }}
        aria-label="Next image"
        className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/20 text-white transition-colors hover:border-white hover:bg-white hover:text-black sm:right-8"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* COUNTER */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[0.65rem] uppercase tracking-[0.18em] text-white/45">
        {String(activeIndex + 1).padStart(2, "0")}{" "}
        /{" "}
        {String(images.length).padStart(2, "0")}
      </div>
    </div>
  );
}