import type { Metadata } from "next";

import { getSiteSettings } from "@/lib/api/settings";
import { getTours } from "@/lib/api/tours";
import { InquiryForm } from "@/components/contact/inquiry-form";
import { HeroVideo } from "@/components/media/hero-video";

export const metadata: Metadata = {
  title: "Contact & Safari Inquiry",
  description:
    "Contact Ndauwo Safaris and start planning your Tanzania safari adventure.",
};

interface ContactPageProps {
  searchParams: Promise<{
    tour?: string;
  }>;
}

export default async function ContactPage({
  searchParams,
}: ContactPageProps) {
  const [{ tour: selectedTour }, settings, tours] = await Promise.all([
    searchParams,
    getSiteSettings(),
    getTours(),
  ]);

  return (
    <main className="bg-[#FCFAF4]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#11110F] text-white">
        <HeroVideo poster={settings.hero_image_url || undefined} />
        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-36 lg:px-8 lg:pb-32 lg:pt-44">
          <div className="max-w-5xl">
            <p className="eyebrow text-[#F67A05]">
              Contact Ndauwo Safaris
            </p>

            <h1 className="font-display mt-6 max-w-5xl text-5xl leading-[0.92] tracking-[-0.035em] sm:text-6xl lg:text-[7rem]">
              Let&apos;s plan your
              <br />
              <span className="text-[#F67A05]">adventure.</span>
            </h1>

            <div className="mt-9 flex max-w-2xl items-start gap-5">
              <span className="mt-3 hidden h-px w-12 shrink-0 bg-white/30 sm:block" />

              <p className="text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
                Tell us what you&apos;re dreaming about and we&apos;ll help
                turn it into a Tanzania safari worth remembering.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      </section>

      {/* CONTACT + FORM */}
      <section className="bg-[#FCFAF4] py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          {/* CONTACT INFO */}
          <div className="lg:pt-3">
            <p className="section-label text-[#C52A0E]">
              Get in touch
            </p>

            <h2 className="font-display mt-6 max-w-md text-4xl leading-[1] tracking-[-0.025em] sm:text-5xl">
              Start with a conversation.
            </h2>

            <p className="mt-6 max-w-md text-base leading-8 text-black/55">
              Whether you already know which safari you want or need help
              choosing, send us an inquiry and we&apos;ll help shape the
              journey around you.
            </p>

            <div className="mt-10 border-t border-black/10">
              {settings.phone && (
                <a
                  href={`tel:${settings.phone}`}
                  className="group flex items-center justify-between border-b border-black/10 py-5"
                >
                  <div>
                    <span className="eyebrow text-black/35">
                      Phone
                    </span>

                    <span className="mt-2 block text-sm text-[#11110F]">
                      {settings.phone}
                    </span>
                  </div>

                  <span className="text-lg text-black/25 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#C52A0E]">
                    →
                  </span>
                </a>
              )}

              {settings.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="group flex items-center justify-between border-b border-black/10 py-5"
                >
                  <div className="min-w-0 pr-5">
                    <span className="eyebrow text-black/35">
                      Email
                    </span>

                    <span className="mt-2 block break-all text-sm text-[#11110F]">
                      {settings.email}
                    </span>
                  </div>

                  <span className="shrink-0 text-lg text-black/25 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#C52A0E]">
                    →
                  </span>
                </a>
              )}

              {settings.whatsapp && (
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(
                    /\D/g,
                    ""
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between border-b border-black/10 py-5"
                >
                  <div>
                    <span className="eyebrow text-[#C52A0E]">
                      WhatsApp
                    </span>

                    <span className="mt-2 block text-sm text-[#11110F]">
                      Chat with us directly
                    </span>
                  </div>

                  <span className="text-lg text-black/25 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#C52A0E]">
                    →
                  </span>
                </a>
              )}

              {settings.address && (
                <div className="border-b border-black/10 py-5">
                  <span className="eyebrow text-black/35">
                    Location
                  </span>

                  <span className="mt-2 block max-w-sm text-sm leading-6 text-[#11110F]">
                    {settings.address}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-8">
              <p className="text-[0.65rem] uppercase tracking-[0.16em] text-black/30">
                Your journey starts with a question.
              </p>
            </div>
          </div>

          {/* FORM */}
          <div className="border-t border-black/10 pt-8 lg:border-t-0 lg:border-l lg:pl-14 lg:pt-3">
            

            <InquiryForm
              tours={tours.map((tour) => ({
                id: tour.id,
                name: tour.name,
                slug: tour.slug,
              }))}
              selectedTourSlug={selectedTour}
            />
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-[#C52A0E] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="eyebrow text-white/60">
                Prefer a direct conversation?
              </p>

              <h2 className="font-display mt-5 max-w-3xl text-4xl leading-[0.98] tracking-[-0.025em] sm:text-5xl lg:text-6xl">
                Sometimes the best place to start is a conversation.
              </h2>
            </div>

            {settings.whatsapp && (
              <a
                href={`https://wa.me/${settings.whatsapp.replace(
                  /\D/g,
                  ""
                )}`}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex w-fit items-center gap-3 border-b border-white/40 pb-2 text-xs font-medium uppercase tracking-[0.16em] transition-colors hover:border-white"
              >
                Chat on WhatsApp
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}