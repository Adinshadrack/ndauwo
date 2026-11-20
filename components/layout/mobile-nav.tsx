"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  useGoogleTranslate,
  type LanguageOption,
} from "trans-google-translate";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { SiteSettings } from "@/types/api";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Safaris", href: "/tours" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "About us", href: "/about" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Contact", href: "/contact" },
];

// Use the exact same language config as the Header
const translationLanguages: LanguageOption[] = [
  { label: "English", value: "en", flag: "gb" },
  { label: "Français", value: "fr", flag: "fr" },
  { label: "Español", value: "es", flag: "es" },
  { label: "Kiswahili", value: "sw", flag: "tz" },
];

interface MobileNavProps {
  settings: Pick<SiteSettings, "logo_url">;
  onSearchClick?: () => void;
}

export function MobileNav({ settings, onSearchClick }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  
  // Setup Google Translate Hook
  const { currentLanguage, changeLanguage, languages } = useGoogleTranslate({
    defaultLanguage: "en",
    languages: translationLanguages,
  });
  
  const selectedLanguage =
    languages.find((language) => language.value === currentLanguage) ??
    translationLanguages[0];

  // Lock scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const handleSearch = () => {
    setOpen(false);
    if (onSearchClick) onSearchClick();
  };

  return (
    <>
      {/* Trigger Button */}
      {/* Below xl the same links live here: seven desktop items plus two mega
          menus do not fit the bar at 1024. */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[#11110F] transition-colors hover:bg-gray-100 xl:hidden"
        aria-label="Open navigation"
      >
        <Menu className="h-6 w-6" strokeWidth={1.5} />
      </button>

      {/* Full-screen Mobile Menu with Motion */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] flex h-[100dvh] w-full flex-col bg-[#F7F7F7] px-6 py-5 xl:hidden"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="relative flex h-8 items-center"
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
                  <span className="text-xl font-bold tracking-tight text-[#11110F]">
                    NDAUWO.
                  </span>
                )}
              </Link>

              <div className="flex items-center gap-2">
                {/* Search Icon at Top */}
                <button
                  onClick={handleSearch}
                  className="flex h-10 w-10 items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-gray-200 hover:text-black"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" strokeWidth={1.5} />
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-gray-200 hover:text-black"
                  aria-label="Close navigation"
                >
                  <X className="h-6 w-6" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Centered Navigation Links */}
            <div className="flex flex-1 flex-col items-center justify-center gap-6 py-8">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-[1.75rem] font-semibold tracking-tight text-[#11110F] transition-colors hover:text-[#F67A05]"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col gap-4 border-t border-gray-200 pt-6 pb-4">
              
              {/* Language & Book Now Row */}
              <div className="flex items-center gap-3 w-full">
                {/* Language Selector (Google Translate) */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex h-12 flex-1 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 text-sm font-semibold text-[#11110F] hover:border-gray-400 outline-none">
                    <span
                      className={`fi fi-${selectedLanguage.flag} fis text-base rounded-full`}
                    />
                    <span>{selectedLanguage.value.toUpperCase()}</span>
                    <ChevronDown className="h-3 w-3 text-gray-500" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-40">
                    {languages.map((language) => (
                      <DropdownMenuItem
                        key={language.value}
                        onClick={() => changeLanguage(language.value)}
                        className="cursor-pointer gap-2 font-medium py-2"
                      >
                        <span
                          className={`fi fi-${language.flag} fis text-lg rounded-full`}
                        ></span>
                        {language.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Book Now */}
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex h-12 flex-[2] items-center justify-center rounded-md bg-[#F67A05] text-[13px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#C52A0E]"
                >
                  Book Now
                </Link>
              </div>

              {/* Optional Contact Info */}
              <p className="mt-2 text-center text-xs text-gray-400 font-[family-name:var(--font-secondary)]">
                Need help? Call us at +255 743 913 002
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}