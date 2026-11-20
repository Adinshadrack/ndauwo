"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import type { GalleryImage } from "@/types/api";

const EASE = [0.22, 1, 0.36, 1] as const;

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
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  const image = activeIndex === null ? null : images[activeIndex] ?? null;

  useEffect(() => {
    if (activeIndex === null) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrevious();
      if (event.key === "ArrowRight") onNext();
    };

    document.addEventListener("keydown", handleKeyDown);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus?.();
    };
  }, [activeIndex, onClose, onPrevious, onNext]);

  return (
    <AnimatePresence>
      {image && activeIndex !== null && (
        <motion.div
          key="gallery-lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={image.title || "Gallery image"}
          onClick={onClose}
        >
          {/* CLOSE */}
          <button
            ref={closeButtonRef}
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

          {/* IMAGE — keyed by the photograph so paging cross-fades */}
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.965 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE }}
            className="relative h-[78vh] w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={image.image_url}
              alt={image.alt_text || image.title || "Ndauwo Safaris"}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />

            {(image.title || image.alt_text) && (
              <div className="absolute bottom-0 left-1/2 w-full max-w-xl -translate-x-1/2 translate-y-full pt-5 text-center">
                {image.title && (
                  <p className="type-card-title text-white">{image.title}</p>
                )}

                {image.alt_text && (
                  <p className="mt-1 text-xs leading-5 text-white/45">
                    {image.alt_text}
                  </p>
                )}
              </div>
            )}
          </motion.div>

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
          <div className="type-badge absolute bottom-6 left-6 text-white/45 sm:left-8">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
