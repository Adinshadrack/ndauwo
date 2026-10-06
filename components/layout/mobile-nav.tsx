"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

import type { SiteSettings } from "@/types/api";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Tours", href: "/tours" },
  { label: "Destinations", href: "/destinations" },
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

interface MobileNavProps {
  settings: Pick<SiteSettings, "logo_url">;
  scrolled?: boolean;
}

export function MobileNav({ settings, scrolled = false }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  // Prevent background page scrolling while the menu is open.
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  return (
    <>
      {/* Menu trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        className={`flex h-9 w-9 items-center justify-center transition-colors duration-300 lg:hidden ${
          scrolled ? "text-[#11110F]" : "text-white"
        }`}
      >
        <Menu className="h-[18px] w-[18px]" strokeWidth={1.5} />
      </button>

      {/* Full-screen navigation */}
      {open && (
        <div
          id="mobile-navigation"
          className="fixed inset-0 z-[9999] min-h-[100svh] bg-[#11110F] text-white lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex min-h-[100svh] w-full flex-col bg-[#11110F] px-5 py-5 sm:px-8">
            {/* Header */}
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/15">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                aria-label="Ndauwo Safaris home"
                className="relative flex h-9 items-center"
              >
                {settings.logo_url ? (
                  <Image
                    src={settings.logo_url}
                    alt="Ndauwo Safaris"
                    width={180}
                    height={48}
                    className="h-8 w-auto object-contain"
                  />
                ) : (
                  <span className="flex items-baseline">
                    <span className="font-display text-[1.6rem] leading-none tracking-[-0.03em]">
                      Ndauwo
                    </span>

                    <span className="ml-1 text-[9px] font-medium uppercase tracking-[0.18em] text-white/45">
                      Safaris
                    </span>

                    <span className="ml-1 text-[#F67A05]">.</span>
                  </span>
                )}
              </Link>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
                className="flex h-9 w-9 items-center justify-center text-white"
              >
                <X className="h-[19px] w-[19px]" strokeWidth={1.5} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="mt-10">
              <p className="mb-5 flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.2em] text-white/35">
                <span aria-hidden="true" className="h-px w-6 bg-[#F67A05]" />
                Navigation
              </p>

              <div>
                {navigation.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between border-b border-white/10 py-4"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="text-[9px] font-medium tracking-[0.15em] text-white/25">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="font-display text-[2rem] leading-none tracking-[-0.025em] text-white/90 transition-colors duration-300 group-hover:text-[#F67A05] sm:text-[2.25rem]">
                        {item.label}
                      </span>
                    </div>

                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 text-white/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#F67A05]"
                      strokeWidth={1.25}
                    />
                  </Link>
                ))}
              </div>
            </nav>

            {/* Bottom CTA */}
            <div className="mt-auto border-t border-white/10 py-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.18em] text-white/30">
                    Tanzania · East Africa
                  </p>

                  <p className="mt-1 text-[11px] text-white/50">
                    Your adventure starts here.
                  </p>
                </div>

                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="group inline-flex h-11 items-center justify-center gap-3 border border-white bg-white px-5 text-[10px] font-medium uppercase tracking-[0.14em] text-black transition-colors duration-300 hover:bg-transparent hover:text-white"
                >
                  Plan Your Safari
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.5}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
