"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, Star } from "lucide-react";
import {  FaGoogle } from "react-icons/fa6";
import {  FaTripadvisor, } from "react-icons/fa";
import type { Testimonial } from "@/types/api";

interface TestimonialModalProps {
  testimonial: Testimonial | null;
  onClose: () => void;
}

const PlatformIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case "tripadvisor":
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#34E0A1] text-black">
          <FaTripadvisor className="h-4 w-4" />
        </div>
      );
    case "google":
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white">
          <FaGoogle className="h-4 w-4 text-[#4285F4]" />
        </div>
      );
    case "safaribookings":
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F67A05] text-white">
          <span className="text-[12px] font-bold">SB</span>
        </div>
      );
    default:
      return null;
  }
};

const formatDate = (dateString?: string | null) => {
  if (!dateString) return "Recently";
  try {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).replace(/(\d+)(st|nd|rd|th)?/, "$1th");
  } catch (e) {
    return "Recently";
  }
};

export function TestimonialModal({ testimonial, onClose }: TestimonialModalProps) {
  return (
    <AnimatePresence>
      {testimonial && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200 hover:text-black"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex max-h-[85vh] flex-col items-center overflow-y-auto px-6 py-10 sm:px-10">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-md">
                {testimonial.avatar_url ? (
                  <Image 
                    src={testimonial.avatar_url} 
                    alt={testimonial.name} 
                    fill 
                    className="object-cover" 
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gold text-3xl font-bold text-white">
                    {testimonial.name.charAt(0)}
                  </div>
                )}
              </div>

              <h3 className="mt-5 text-center font-[family-name:var(--font-primary)] text-2xl font-bold text-[#11110F]">
                {testimonial.name} {testimonial.reviewer_title ? `· ${testimonial.reviewer_title}` : ""}
              </h3>

              <p className="mt-1 text-center font-[family-name:var(--font-primary)] text-sm text-[#77736B]">
                {formatDate(testimonial.review_date)}
              </p>

              <div className="mt-4 flex items-center justify-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 ${
                      i < testimonial.rating ? "fill-[#F67A05] text-[#F67A05]" : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
                <span className="ml-2 font-[family-name:var(--font-primary)] text-lg font-bold text-[#11110F]">
                  {testimonial.rating.toFixed(1)}
                </span>
              </div>

              <p className="mt-6 text-center font-[family-name:var(--font-primary)] text-base font-semibold leading-[1.7] text-[#292824]">
                "{testimonial.content}"
              </p>

              <div className="mt-8">
                {testimonial.review_url ? (
                  <a 
                    href={testimonial.review_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-[14px] font-medium text-[#292824] hover:text-black"
                  >
                    <PlatformIcon platform={testimonial.platform} />
                    <span className="border-b border-gray-400 pb-0.5 group-hover:border-black">
                      View original on {testimonial.platform === "tripadvisor" ? "TripAdvisor" : testimonial.platform === "safaribookings" ? "SafariBookings" : "Google"}
                    </span>
                  </a>
                ) : (
                  <span className="flex items-center gap-3 text-[14px] font-medium text-gray-500">
                    <PlatformIcon platform={testimonial.platform} />
                    Verified {testimonial.platform} Review
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}