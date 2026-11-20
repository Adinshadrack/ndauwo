import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";

import { Link } from "@/i18n/navigation";
import { NewsletterForm } from "./newsletter-form";
import type { SiteSettings } from "@/types/api";

const exploreLinks = [
  { label: "Safaris", href: "/tours" },
  { label: "Destinations", href: "/destinations" },
  { label: "Gallery", href: "/gallery" },
  { label: "Travel Journal", href: "/blog" },
] as const;

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "FAQs", href: "/faq" },
  { label: "Terms and Conditions", href: "/terms" },
] as const;

const columnHeadingClassName =
  "text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45";

const columnLinkClassName =
  "w-max text-[12.5px] leading-relaxed text-white/75 transition-colors hover:text-[#F67A05]";

interface FooterProps {
  settings: SiteSettings;
}

export function Footer({ settings }: FooterProps) {
  const phoneDial = settings.phone?.replace(/[^\d+]/g, "");
  const socials = [
    { label: "Instagram", href: settings.instagram_url, Icon: FaInstagram },
    { label: "Facebook", href: settings.facebook_url, Icon: FaFacebookF },
  ].filter((social) => Boolean(social.href));

  return (
    <footer className="relative w-full">
      {/* Wildlife band sits on the page canvas so the silhouettes read against it. */}
      <div className="bg-[#FCFAF4] leading-none">
        <Image
          src="/images/footer-animals.png"
          alt=""
          aria-hidden="true"
          width={1440}
          height={187}
          sizes="100vw"
          className="h-auto w-full select-none"
        />
      </div>

      <div className="bg-[#1B291E] font-[family-name:var(--font-primary)]">
        <div className="mx-auto w-full max-w-[1280px] px-5 pb-6 pt-12 sm:px-8 lg:px-10">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-0">
            {/* Explore + Company */}
            <div className="grid grid-cols-2 gap-6 lg:pr-10">
              <div>
                <h2 className={columnHeadingClassName}>Explore</h2>
                <nav aria-label="Explore" className="mt-4 flex flex-col gap-2">
                  {exploreLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={columnLinkClassName}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {socials.length > 0 && (
                  <div className="mt-7 flex items-center gap-2">
                    {socials.map(({ href, label, Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex h-7 w-7 items-center justify-center border border-white/25 text-white/70 transition-colors hover:border-[#F67A05] hover:bg-[#F67A05] hover:text-white"
                      >
                        <Icon className="h-3 w-3" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h2 className={columnHeadingClassName}>Company</h2>
                <nav aria-label="Company" className="mt-4 flex flex-col gap-2">
                  {companyLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={columnLinkClassName}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            {/* Newsletter */}
            <div className="flex flex-col items-center border-t border-white/12 pt-9 text-center md:border-t-0 md:pt-0 lg:border-l lg:border-t-0 lg:px-12">
              <h2 className="font-[family-name:var(--font-accent)] text-[1.85rem] leading-none text-[#F67A05]">
                Get Updates
              </h2>
              <p className="mt-3 max-w-[18rem] text-[11.5px] leading-[1.75] text-white/60">
                Subscribe to our newsletter to receive updates and special
                announcements
              </p>
              <div className="mt-4 w-full max-w-[23rem]">
                <NewsletterForm />
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col border-t border-white/12 pt-9 md:col-span-2 md:flex-row md:items-end md:justify-between md:gap-10 lg:col-span-1 lg:flex-col lg:items-stretch lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <div>
                <Link
                  href="/contact"
                  className="group inline-flex w-max items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-white/80"
                >
                  Send us a Message
                  <ArrowRight
                    className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>

                <div className="mt-4 flex flex-col gap-2 text-[12.5px] leading-relaxed text-white/75">
                  {settings.phone && (
                    <a
                      href={`tel:${phoneDial}`}
                      className="w-max transition-colors hover:text-[#F67A05]"
                    >
                      {settings.phone}
                    </a>
                  )}

                  {settings.address && (
                    <p className="max-w-[13rem] text-white/60">
                      {settings.address}
                    </p>
                  )}

                  {settings.email && (
                    <a
                      href={`mailto:${settings.email}`}
                      className="w-max break-all transition-colors hover:text-[#F67A05]"
                    >
                      {settings.email}
                    </a>
                  )}
                </div>
              </div>

              <div className="mt-8 md:mt-0 lg:mt-auto lg:pt-8">
                {settings.logo_url ? (
                  <Link href="/" aria-label="Ndauwo Safaris home">
                    <Image
                      src={settings.logo_url}
                      alt="Ndauwo Safaris"
                      width={180}
                      height={56}
                      className="h-8 w-auto object-contain"
                    />
                  </Link>
                ) : (
                  <Link
                    href="/"
                    className="text-xl font-bold tracking-tight text-white"
                  >
                    NDAUWO<span className="text-[#F67A05]">.</span>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Bottom bar. The right padding on narrower viewports keeps the
              privacy link clear of the fixed WhatsApp button in the corner. */}
          <div className="mt-8 flex flex-col gap-2 border-t border-white/12 pt-5 text-[10px] text-white/35 max-[1343px]:pr-16 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Ndauwo Safaris. All rights reserved.</p>
            <Link
              href="/privacy"
              className="w-max transition-colors hover:text-white/70"
            >
              Privacy policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
