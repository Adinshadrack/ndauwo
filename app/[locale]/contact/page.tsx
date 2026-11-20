import type { Metadata } from "next";

import { ContactDetails } from "@/components/contact/contact-details";
import { ContactHero } from "@/components/contact/contact-hero";
import { Reveal } from "@/components/motion/reveal";
import { InquiryForm } from "@/components/contact/inquiry-form";
import { SiteMap } from "@/components/contact/site-map";
import { getSiteSettings } from "@/lib/api/settings";
import { getTours } from "@/lib/api/tours";

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

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const [{ tour: selectedTour }, settings, tours] = await Promise.all([
    searchParams,
    getSiteSettings(),
    getTours(),
  ]);

  const whatsappNumber = settings.whatsapp?.replace(/\D/g, "");
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}`
    : undefined;

  return (
    <main className="bg-canvas">
      <ContactHero imageUrl={settings.hero_image_url || undefined} />

      {/*
        The panel is pulled up over the photograph and cut on a diagonal, so a
        wedge of the picture stays visible above its right-hand edge.
      */}
      <section className="relative z-10 -mt-16 bg-canvas [clip-path:polygon(0_0,100%_56px,100%_100%,0_100%)]">
        <div className="container-page pb-12 pt-16 sm:pt-20 lg:pb-16">
          <Reveal y={34}>
          <div className="rounded-[20px] bg-white p-6 shadow-[0_40px_90px_-55px_rgba(17,17,15,0.65)] ring-1 ring-ink/5 sm:p-8 lg:p-11">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
              <ContactDetails
                phone={settings.phone || undefined}
                email={settings.email || undefined}
                whatsappUrl={whatsappUrl}
                address={settings.address || undefined}
              />

              <div className="min-w-0">
                <h2 className="text-[1.375rem] font-extrabold leading-tight tracking-[-0.02em] text-ink sm:text-[1.5rem]">
                  Send us a message
                </h2>

                <p className="mt-2.5 max-w-[42ch] text-[0.84375rem] leading-[1.75] text-ink-muted">
                  Where you want to go, when you can travel and how long for.
                  The planner replies with the route that fits.
                </p>

                <div className="mt-6">
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
            </div>
          </div>
          </Reveal>
        </div>
      </section>

      {/* Full-bleed: the office sits on the real map, not a picture of one. */}
      <SiteMap
        address={settings.address || "Arusha, Tanzania"}
        directionsHref={settings.google_maps_url || undefined}
      />
    </main>
  );
}
