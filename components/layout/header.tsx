"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronDown, Mail, Phone, Search } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import { FaTripadvisor } from "react-icons/fa";
import {
  useGoogleTranslate,
  type LanguageOption,
} from "trans-google-translate";
import { Link } from "@/i18n/navigation";
import { MobileNav } from "./mobile-nav";
import { DesktopNav } from "./desktop-nav";
import { SearchDialog } from "./search-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { SiteSettings, Tour, Destination } from "@/types/api";

// Custom Google Icon with official colors
const GoogleIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5 text-[#F67A05]">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          viewBox="0 0 24 24"
          className={`h-3 w-3 ${star <= rating ? "fill-current" : "fill-transparent stroke-current stroke-1"}`}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
};

const translationLanguages: LanguageOption[] = [
  { label: "English", value: "en", flag: "gb" },
  { label: "Français", value: "fr", flag: "fr" },
  { label: "Español", value: "es", flag: "es" },
  { label: "Kiswahili", value: "sw", flag: "tz" },
];

interface HeaderProps {
  settings: SiteSettings;
  tours: Tour[];
  destinations: Destination[];
}

export function Header({ settings, tours, destinations }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { currentLanguage, changeLanguage, languages } = useGoogleTranslate({
    defaultLanguage: "en",
    languages: translationLanguages,
  });
  const selectedLanguage =
    languages.find((language) => language.value === currentLanguage) ??
    translationLanguages[0];
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex flex-col font-[family-name:var(--font-body)]">
      {/* ================= TOP UTILITY BAR ================= */}
      <div className="block bg-[#0B3D1F] text-white">
        <div className="mx-auto flex h-8 max-w-[1400px] items-center justify-between px-3 text-[9px] font-medium sm:h-9 sm:px-6 sm:text-[10px] lg:h-[42px] lg:px-8 lg:text-[11px]">
          <div className="flex items-center gap-3 lg:gap-6">
            <a
              href={`tel:${(settings.phone || "+255 743 913 002").replace(/\s/g, "")}`}
              className="flex items-center gap-2 hover:text-[#F67A05] transition-colors"
            >
              <Phone className="h-3 w-3 text-[#F67A05] lg:h-3.5 lg:w-3.5" strokeWidth={2} />
              <span>{settings.phone || "+255 743 913 002"}</span>
            </a>
            <a
              href={`mailto:${settings.email || "info@ndauwosafaris.com"}`}
              className="hidden items-center gap-2 hover:text-[#F67A05] transition-colors sm:flex"
            >
              <Mail className="h-3.5 w-3.5 text-[#F67A05]" strokeWidth={2} />
              <span>{settings.email || "info@ndauwosafaris.com"}</span>
            </a>
          </div>

          <div className="hidden items-center gap-6 lg:flex">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#34E0A1] text-black">
                <FaTripadvisor className="h-3.5 w-3.5" />
              </div>
              <div className="flex flex-col">
                <StarRating rating={4} />
                <span className="text-[9px] text-white/70">
                  Based on 200 reviews
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
                {/* Google SVG Updated */}
                <GoogleIcon className="h-3.5 w-3.5" />
              </div>
              <div className="flex flex-col">
                <StarRating rating={4} />
                <span className="text-[9px] text-white/70">
                  Based on 200 reviews
                </span>
              </div>
            </div>
          </div>

          {(settings.instagram_url || settings.facebook_url) && (
            <div className="flex items-center gap-2 lg:gap-3">
              <span className="hidden text-white/80 sm:inline">Follow us</span>
              <div className="flex items-center gap-2">
                {settings.instagram_url && (
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-5 w-5 items-center justify-center rounded border border-[#F67A05] text-[#F67A05] hover:bg-[#F67A05] hover:text-white transition-colors lg:h-6 lg:w-6"
                >
                  <FaInstagram className="h-3 w-3" />
                </a>
              )}
              {settings.facebook_url && (
                <a
                  href={settings.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-5 w-5 items-center justify-center rounded border border-[#F67A05] text-[#F67A05] hover:bg-[#F67A05] hover:text-white transition-colors lg:h-6 lg:w-6"
                >
                  <FaFacebookF className="h-3 w-3" />
                </a>
              )}
              </div>
            </div>
          )}
          </div>
        </div>

      {/* ================= MAIN NAV BAR ================= */}
      <div
        className={`bg-white transition-shadow duration-300 ${scrolled ? "shadow-md" : "border-b border-gray-100"}`}
      >
        <div className="mx-auto max-w-[1400px] px-3 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between sm:h-16 lg:h-[72px]">
            <Link
              href="/"
              aria-label="Ndauwo Safaris home"
              className="relative flex shrink-0 items-center"
            >
              {settings.logo_url ? (
                <Image
                  src={settings.logo_url}
                  alt="Ndauwo Safaris"
                  width={180}
                  height={48}
                  priority
                  className="h-9 w-auto object-contain sm:h-10 lg:h-12"
                />
              ) : (
                <div className="flex flex-col items-center leading-none">
                  <span className="text-[1.4rem] font-bold tracking-tight text-[#C52A0E]">
                    NDAUWO
                  </span>
                  <span className="text-[0.55rem] font-semibold tracking-[0.2em] text-gray-500 uppercase">
                    Safaris & Adventures
                  </span>
                </div>
              )}
            </Link>

            {/* Desktop Nav Links (Now handles Mega Menus) */}
            <DesktopNav tours={tours} destinations={destinations} />

            {/* Right Actions */}
            <div className="hidden items-center gap-5 lg:flex">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-[#0B3D1F] hover:bg-gray-200 transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex h-9 items-center gap-2 rounded-full border border-gray-300 px-3 text-[12px] font-semibold text-[#11110F] hover:border-gray-400 outline-none transition-colors">
                  {/* Use fis for square flags, and add text-lg to size them. 
                      You can also use rounded-full on the span for circular flags if the CSS supports it, 
                      but standard square usually looks cleaner in dropdowns. */}
                  <span
                    className={`fi fi-${selectedLanguage.flag} fis text-lg rounded-full`}
                  ></span>
                  <span>{selectedLanguage.value.toUpperCase()}</span>
                  <ChevronDown className="h-3 w-3 text-gray-500" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  {languages.map((language) => (
                    <DropdownMenuItem
                      key={language.value}
                      onClick={() => changeLanguage(language.value)}
                      className="cursor-pointer gap-2 font-medium py-2"
                    >
                      <span
                        className={`fi fi-${language.flag} fis text-lg rounded-full`}
                      ></span>{" "}
                      {language.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                href="/contact"
                className="inline-flex h-10 items-center justify-center rounded-[4px] bg-[#0B3D1F] px-6 text-[12px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#0B3D1F]/90"
              >
                <span>Book Now</span>
              </Link>
            </div>

            <MobileNav
              settings={settings}
              onSearchClick={() => setSearchOpen(true)}
            />
          </div>
        </div>
      </div>
      <SearchDialog
        tours={tours}
        destinations={destinations}
        open={searchOpen}
        setOpen={setSearchOpen}
      />
    </header>
  );
}
