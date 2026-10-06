import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
} from "lucide-react";

import type { SiteSettings } from "@/types/api";

const explore = [
  ["Safaris", "/tours"],
  ["Destinations", "/destinations"],
  ["Gallery", "/gallery"],
  ["Travel Journal", "/blog"],
];

const company = [
  ["About Us", "/about"],
  ["Contact Us", "/contact"],
  ["FAQs", "/faq"],
  ["Terms & Conditions", "/terms"],
];

interface FooterProps {
  settings: SiteSettings;
}

function getWhatsAppUrl(value: string) {
  if (!value) return "";

  // Keep only numbers for wa.me
  const phone = value.replace(/\D/g, "");

  return phone ? `https://wa.me/${phone}` : "";
}

export function Footer({ settings }: FooterProps) {
  const whatsappUrl = settings.whatsapp
    ? getWhatsAppUrl(settings.whatsapp)
    : "";

  return (
    <footer className="bg-[#11110F] text-white">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        {/* Main footer */}
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.5fr_0.7fr_0.7fr_1fr] lg:gap-16 lg:pb-20">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center"
            >
              {settings.logo_url ? (
                <img
                  src={settings.logo_url}
                  alt="Ndauwo Safaris"
                  className="h-9 w-auto object-contain"
                />
              ) : (
                <span className="font-display text-3xl tracking-[-0.03em]">
                  Ndauwo
                  <span className="text-[#F67A05]">.</span>
                </span>
              )}
            </Link>

            <p className="mt-6 max-w-sm text-[13px] leading-6 text-white/45">
              {settings.about ||
                "Thoughtfully crafted safari journeys through Tanzania. Discover wild places, meaningful encounters and unforgettable moments."}
            </p>

            {/* Social links */}
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
              {settings.instagram_url && (
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="group inline-flex items-center text-[10px] font-medium uppercase tracking-[0.14em] text-white/45 transition-colors duration-300 hover:text-white"
                >
                  Instagram

                  <ArrowUpRight
                    className="ml-1.5 h-3 w-3 text-white/25 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.25}
                  />
                </a>
              )}

              {settings.facebook_url && (
                <a
                  href={settings.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="group inline-flex items-center text-[10px] font-medium uppercase tracking-[0.14em] text-white/45 transition-colors duration-300 hover:text-white"
                >
                  Facebook

                  <ArrowUpRight
                    className="ml-1.5 h-3 w-3 text-white/25 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.25}
                  />
                </a>
              )}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/35">
              Explore
            </h3>

            <nav className="mt-6 flex flex-col gap-3">
              {explore.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="group inline-flex w-fit items-center text-[13px] text-white/55 transition-colors duration-300 hover:text-white"
                >
                  {label}

                  <ArrowUpRight
                    className="ml-1.5 h-3 w-3 -translate-x-1 text-white/0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-white/40"
                    strokeWidth={1.25}
                  />
                </Link>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/35">
              Company
            </h3>

            <nav className="mt-6 flex flex-col gap-3">
              {company.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="group inline-flex w-fit items-center text-[13px] text-white/55 transition-colors duration-300 hover:text-white"
                >
                  {label}

                  <ArrowUpRight
                    className="ml-1.5 h-3 w-3 -translate-x-1 text-white/0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-white/40"
                    strokeWidth={1.25}
                  />
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/35">
              Let&apos;s talk
            </h3>

            <div className="mt-6 space-y-4">
              {settings.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="group flex gap-3 text-[13px] leading-5 text-white/50 transition-colors duration-300 hover:text-white"
                >
                  <Mail
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/30 transition-colors group-hover:text-[#F67A05]"
                    strokeWidth={1.25}
                  />

                  <span className="break-all">
                    {settings.email}
                  </span>
                </a>
              )}

              {settings.phone && (
                <a
                  href={`tel:${settings.phone.replace(/\s/g, "")}`}
                  className="group flex gap-3 text-[13px] leading-5 text-white/50 transition-colors duration-300 hover:text-white"
                >
                  <Phone
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/30 transition-colors group-hover:text-[#F67A05]"
                    strokeWidth={1.25}
                  />

                  <span>{settings.phone}</span>
                </a>
              )}

              {settings.address && (
                <a
                  href={settings.google_maps_url || "#"}
                  target={
                    settings.google_maps_url
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    settings.google_maps_url
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group flex gap-3 text-[13px] leading-5 text-white/50 transition-colors duration-300 hover:text-white"
                >
                  <MapPin
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/30 transition-colors group-hover:text-[#F67A05]"
                    strokeWidth={1.25}
                  />

                  <span>{settings.address}</span>
                </a>
              )}

              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center text-[10px] font-medium uppercase tracking-[0.14em] text-[#F67A05] transition-colors duration-300 hover:text-white"
                >
                  Chat on WhatsApp

                  <ArrowUpRight
                    className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.25}
                  />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[9px] uppercase tracking-[0.14em] text-white/25">
            © {new Date().getFullYear()} Ndauwo Safaris. All rights reserved.
          </p>

          <p className="text-[9px] uppercase tracking-[0.14em] text-white/25">
            Crafted with care in Tanzania.
          </p>
        </div>
      </div>
    </footer>
  );
}