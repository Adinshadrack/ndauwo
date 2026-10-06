
"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

import { MobileNav } from "./mobile-nav";
import type { SiteSettings } from "@/types/api";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations", dropdown: true },
  { label: "Tours", href: "/tours", dropdown: true },
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

interface HeaderProps {
  settings: SiteSettings;
}

export function Header({ settings }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-black/10 bg-[#FCFAF4]/95 text-[#11110F] backdrop-blur-md"
          : "bg-transparent text-white"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between border-b transition-all duration-300 ${
            scrolled
              ? "h-14 border-transparent"
              : "h-14 border-white/20"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Ndauwo Safaris home"
            className="relative flex h-9 w-auto shrink-0 items-center"
          >
            {settings.logo_url ? (
              <Image
                src={settings.logo_url}
                alt="Ndauwo Safaris"
                width={180}
                height={48}
                priority
                className="h-8 w-auto object-contain"
              />
            ) : (
              <span
                className={`font-display text-[1.65rem] leading-none tracking-[-0.03em] transition-colors duration-300 ${
                  scrolled ? "text-[#11110F]" : "text-white"
                }`}
              >
                Ndauwo
                <span className="ml-1 text-[#F67A05]">.</span>
              </span>
            )}
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-6 lg:flex xl:gap-7"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-1 text-[12px] font-medium tracking-wide transition-colors duration-300 ${
                  scrolled
                    ? "text-black/65 hover:text-[#11110F]"
                    : "text-white/85 hover:text-white"
                }`}
              >
                {item.label}

                {item.dropdown && (
                  <ChevronDown
                    className={`h-3 w-3 transition-transform duration-300 group-hover:translate-y-0.5 ${
                      scrolled ? "text-black/40" : "text-white/50"
                    }`}
                    strokeWidth={1.5}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-4 lg:flex">
            <Link
              href="/contact"
              className={`inline-flex h-9 items-center border px-4 text-[11px] font-medium uppercase tracking-[0.12em] transition-all duration-300 ${
                scrolled
                  ? "border-black/25 text-[#11110F] hover:border-[#11110F] hover:bg-[#11110F] hover:text-white"
                  : "border-white/40 text-white hover:border-white hover:bg-white hover:text-black"
              }`}
            >
              Plan Your Safari
            </Link>
          </div>

          {/* Mobile */}
          <MobileNav settings={settings} scrolled={scrolled} />
        </div>
      </div>
    </header>
  );
}
