import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";

import type { SiteSettings } from "@/types/api";

interface HomeCTAProps {
  settings?: Pick<SiteSettings, "whatsapp"> | null;
}

export function HomeCTA({ settings }: HomeCTAProps) {
  const whatsapp = settings?.whatsapp?.replace(/\D/g, "");

  return (
    <section className="bg-[#11110F] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="border-y border-white/15 py-14 sm:py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
            {/* Message */}
            <div>
              <p className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white/45">
                <span className="h-px w-7 bg-[#F67A05]" />
                Your adventure starts here
              </p>

              <h2 className="font-display mt-6 max-w-4xl text-[3.25rem] leading-[0.9] tracking-[-0.04em] sm:text-6xl lg:text-[6rem]">
                Ready to experience
                <br />
                Tanzania?
              </h2>

              <p className="mt-7 max-w-xl text-sm leading-6 text-white/55 sm:text-[15px]">
                Tell us what you&apos;re dreaming of and we&apos;ll help turn it
                into an unforgettable safari experience.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-start gap-4">
              <Link
                href="/contact"
                className="group inline-flex h-12 items-center gap-4 border border-white bg-white px-6 text-[11px] font-medium uppercase tracking-[0.14em] text-black transition-colors duration-300 hover:bg-transparent hover:text-white"
              >
                Plan Your Safari

                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </Link>

              {whatsapp && (
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-12 items-center gap-3 border-b border-white/25 pb-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/65 transition-colors duration-300 hover:border-[#F67A05] hover:text-white"
                >
                  <MessageCircle
                    className="h-3.5 w-3.5"
                    strokeWidth={1.5}
                  />

                  WhatsApp Us
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Closing line */}
        <div className="flex items-center justify-between pt-5">
          <span className="text-[9px] uppercase tracking-[0.16em] text-white/25">
            Ndauwo Safaris
          </span>

          <span className="text-[9px] uppercase tracking-[0.16em] text-white/25">
            Tanzania · East Africa
          </span>
        </div>
      </div>
    </section>
  );
}