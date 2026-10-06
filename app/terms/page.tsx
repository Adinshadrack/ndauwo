import type { Metadata } from "next";
import Link from "next/link";

import { HeroVideo } from "@/components/media/hero-video";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the terms and conditions governing safari inquiries, bookings, payments, cancellations, and travel with Ndauwo Safaris.",
};

export default function TermsPage() {
  return (
    <main className="bg-[#FCFAF4] text-[#11110F]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#11110F] text-white">
        <HeroVideo />
        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-36 lg:px-8 lg:pb-32 lg:pt-44">
          <div className="max-w-5xl">
            <p className="eyebrow text-[#F67A05]">
              Ndauwo Safaris
            </p>

            <h1 className="font-display mt-6 max-w-4xl text-5xl leading-[0.92] tracking-[-0.035em] sm:text-6xl lg:text-[7rem]">
              Terms &
              <br />
              <span className="text-[#F67A05]">conditions.</span>
            </h1>

            <div className="mt-9 flex max-w-2xl items-start gap-5">
              <span className="mt-3 hidden h-px w-12 shrink-0 bg-white/30 sm:block" />

              <p className="text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
                Important information about inquiries, bookings, payments,
                cancellations and travelling with Ndauwo Safaris.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      </section>

      {/* CONTENT */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
          {/* SIDEBAR */}
          <aside className="lg:sticky lg:top-10 lg:self-start">
            <p className="section-label">
              Legal information
            </p>

            <p className="mt-5 max-w-sm text-sm leading-7 text-black/50">
              Please read these terms carefully before confirming a safari
              or making any payment to Ndauwo Safaris.
            </p>

            <div className="mt-8 border-t border-black/10">
              <a
                href="#booking"
                className="block border-b border-black/10 py-4 text-xs uppercase tracking-[0.14em] text-black/45 transition-colors hover:text-[#C52A0E]"
              >
                Booking & confirmation
              </a>

              <a
                href="#payments"
                className="block border-b border-black/10 py-4 text-xs uppercase tracking-[0.14em] text-black/45 transition-colors hover:text-[#C52A0E]"
              >
                Payments
              </a>

              <a
                href="#cancellation"
                className="block border-b border-black/10 py-4 text-xs uppercase tracking-[0.14em] text-black/45 transition-colors hover:text-[#C52A0E]"
              >
                Cancellation
              </a>

              <a
                href="#responsibilities"
                className="block border-b border-black/10 py-4 text-xs uppercase tracking-[0.14em] text-black/45 transition-colors hover:text-[#C52A0E]"
              >
                Traveller responsibilities
              </a>

              <a
                href="#liability"
                className="block border-b border-black/10 py-4 text-xs uppercase tracking-[0.14em] text-black/45 transition-colors hover:text-[#C52A0E]"
              >
                Liability
              </a>
            </div>

            <p className="mt-8 text-[0.65rem] uppercase tracking-[0.14em] text-black/30">
              Last updated: October 2026
            </p>
          </aside>

          {/* TERMS */}
          <article className="max-w-3xl">
            <div className="border-t border-black/10">
              <section className="border-b border-black/10 py-10">
                <p className="eyebrow text-[#C52A0E]">01</p>

                <h2 className="font-display mt-4 text-3xl tracking-[-0.02em] sm:text-4xl">
                  General terms
                </h2>

                <div className="mt-6 space-y-5 text-sm leading-8 text-black/60 sm:text-base">
                  <p>
                    These Terms and Conditions apply to safari inquiries,
                    reservations, bookings and travel arrangements made with
                    Ndauwo Safaris.
                  </p>

                  <p>
                    By requesting or confirming a safari with us, you
                    acknowledge that you have read, understood and agreed to
                    these terms.
                  </p>

                  <p>
                    Safari itineraries, accommodation, transportation and
                    activities may vary depending on availability, weather,
                    park regulations and other circumstances beyond our
                    reasonable control.
                  </p>
                </div>
              </section>

              <section
                id="booking"
                className="scroll-mt-10 border-b border-black/10 py-10"
              >
                <p className="eyebrow text-[#C52A0E]">02</p>

                <h2 className="font-display mt-4 text-3xl tracking-[-0.02em] sm:text-4xl">
                  Safari inquiries & booking confirmation
                </h2>

                <div className="mt-6 space-y-5 text-sm leading-8 text-black/60 sm:text-base">
                  <p>
                    Submitting an inquiry through our website does not
                    automatically constitute a confirmed booking.
                  </p>

                  <p>
                    A booking becomes confirmed only after Ndauwo Safaris has
                    confirmed the arrangements and any required deposit or
                    payment has been received.
                  </p>

                  <p>
                    Safari prices and availability may change before a booking
                    is confirmed. We will communicate any applicable changes
                    before requesting confirmation.
                  </p>
                </div>
              </section>

              <section
                id="payments"
                className="scroll-mt-10 border-b border-black/10 py-10"
              >
                <p className="eyebrow text-[#C52A0E]">03</p>

                <h2 className="font-display mt-4 text-3xl tracking-[-0.02em] sm:text-4xl">
                  Prices & payments
                </h2>

                <div className="mt-6 space-y-5 text-sm leading-8 text-black/60 sm:text-base">
                  <p>
                    Safari prices will be communicated to the client as part
                    of the quotation or booking process.
                  </p>

                  <p>
                    Any deposit, balance or payment deadline applicable to a
                    booking will be communicated before the booking is
                    confirmed.
                  </p>

                  <p>
                    Certain costs may not be included in the quoted safari
                    price. These can include personal expenses, international
                    flights, visas, travel insurance, tips and other items
                    specifically excluded from the itinerary.
                  </p>

                  <p>
                    Clients are responsible for ensuring that payments are
                    made using the agreed payment method and within the
                    applicable deadlines.
                  </p>
                </div>
              </section>

              <section
                id="cancellation"
                className="scroll-mt-10 border-b border-black/10 py-10"
              >
                <p className="eyebrow text-[#C52A0E]">04</p>

                <h2 className="font-display mt-4 text-3xl tracking-[-0.02em] sm:text-4xl">
                  Cancellation & changes
                </h2>

                <div className="mt-6 space-y-5 text-sm leading-8 text-black/60 sm:text-base">
                  <p>
                    Cancellation and amendment conditions may vary depending
                    on the safari, accommodation providers, park fees,
                    transport arrangements and other suppliers involved in
                    the booking.
                  </p>

                  <p>
                    Any applicable cancellation charges or non-refundable
                    amounts will be communicated to the client as part of the
                    booking terms.
                  </p>

                  <p>
                    Requests to change travel dates, accommodation, activities
                    or other arrangements are subject to availability and may
                    result in additional charges.
                  </p>

                  <p>
                    We recommend that all travellers obtain appropriate travel
                    insurance that covers cancellation, medical emergencies,
                    delays and other unexpected travel circumstances.
                  </p>
                </div>
              </section>

              <section className="border-b border-black/10 py-10">
                <p className="eyebrow text-[#C52A0E]">05</p>

                <h2 className="font-display mt-4 text-3xl tracking-[-0.02em] sm:text-4xl">
                  Safari itineraries
                </h2>

                <div className="mt-6 space-y-5 text-sm leading-8 text-black/60 sm:text-base">
                  <p>
                    We make reasonable efforts to operate safaris according
                    to the agreed itinerary. However, safari conditions can
                    change due to weather, wildlife movements, road
                    conditions, park regulations, safety considerations or
                    other circumstances.
                  </p>

                  <p>
                    Ndauwo Safaris reserves the right to make reasonable
                    changes to an itinerary where necessary for operational,
                    environmental or safety reasons.
                  </p>

                  <p>
                    Any significant changes will be communicated to the client
                    where reasonably possible.
                  </p>
                </div>
              </section>

              <section
                id="responsibilities"
                className="scroll-mt-10 border-b border-black/10 py-10"
              >
                <p className="eyebrow text-[#C52A0E]">06</p>

                <h2 className="font-display mt-4 text-3xl tracking-[-0.02em] sm:text-4xl">
                  Traveller responsibilities
                </h2>

                <div className="mt-6 space-y-5 text-sm leading-8 text-black/60 sm:text-base">
                  <p>
                    Travellers are responsible for providing accurate
                    information required for their safari arrangements,
                    including names, travel dates and other relevant details.
                  </p>

                  <p>
                    Travellers are responsible for carrying valid passports,
                    visas, permits, travel documents and any other
                    documentation required for their journey.
                  </p>

                  <p>
                    Travellers should obtain appropriate travel and medical
                    insurance before travelling.
                  </p>

                  <p>
                    Guests are expected to follow reasonable instructions from
                    guides, park authorities, accommodation providers and
                    other service providers, particularly where necessary for
                    safety.
                  </p>
                </div>
              </section>

              <section className="border-b border-black/10 py-10">
                <p className="eyebrow text-[#C52A0E]">07</p>

                <h2 className="font-display mt-4 text-3xl tracking-[-0.02em] sm:text-4xl">
                  Health & safety
                </h2>

                <div className="mt-6 space-y-5 text-sm leading-8 text-black/60 sm:text-base">
                  <p>
                    Safari travel involves outdoor activities and environments
                    that may present inherent risks, including wildlife,
                    uneven terrain, weather conditions and remote locations.
                  </p>

                  <p>
                    Travellers should consider their personal health,
                    fitness, medical requirements and any vaccinations or
                    health precautions recommended for their destination.
                  </p>

                  <p>
                    Travellers should inform Ndauwo Safaris of any relevant
                    requirements that may affect the safe operation of their
                    safari.
                  </p>
                </div>
              </section>

              <section
                id="liability"
                className="scroll-mt-10 border-b border-black/10 py-10"
              >
                <p className="eyebrow text-[#C52A0E]">08</p>

                <h2 className="font-display mt-4 text-3xl tracking-[-0.02em] sm:text-4xl">
                  Liability
                </h2>

                <div className="mt-6 space-y-5 text-sm leading-8 text-black/60 sm:text-base">
                  <p>
                    Ndauwo Safaris will take reasonable care in arranging the
                    services included in a confirmed safari.
                  </p>

                  <p>
                    However, we cannot be responsible for circumstances beyond
                    our reasonable control, including extreme weather, natural
                    events, government restrictions, park closures, delays,
                    illness, accidents, airline disruptions or actions of
                    independent third-party suppliers.
                  </p>

                  <p>
                    Nothing in these terms is intended to exclude or limit any
                    liability that cannot lawfully be excluded or limited
                    under applicable law.
                  </p>
                </div>
              </section>

              <section className="border-b border-black/10 py-10">
                <p className="eyebrow text-[#C52A0E]">09</p>

                <h2 className="font-display mt-4 text-3xl tracking-[-0.02em] sm:text-4xl">
                  Photography & media
                </h2>

                <div className="mt-6 space-y-5 text-sm leading-8 text-black/60 sm:text-base">
                  <p>
                    Ndauwo Safaris may use photographs and media created by
                    our team for marketing purposes where appropriate.
                  </p>

                  <p>
                    We will not intentionally use identifiable images of
                    guests for promotional purposes where consent is required
                    without obtaining the appropriate permission.
                  </p>
                </div>
              </section>

              <section className="py-10">
                <p className="eyebrow text-[#C52A0E]">10</p>

                <h2 className="font-display mt-4 text-3xl tracking-[-0.02em] sm:text-4xl">
                  Applicable law & contact
                </h2>

                <div className="mt-6 space-y-5 text-sm leading-8 text-black/60 sm:text-base">
                  <p>
                    These terms are intended to be interpreted in accordance
                    with the laws applicable to Ndauwo Safaris and the services
                    provided.
                  </p>

                  <p>
                    If you have questions about these Terms and Conditions or
                    about a specific safari booking, please contact us before
                    making a payment or confirming your arrangements.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="group mt-8 inline-flex items-center gap-3 border-b border-black/25 pb-2 text-xs font-medium uppercase tracking-[0.16em] transition-colors hover:border-[#C52A0E] hover:text-[#C52A0E]"
                >
                  Contact Ndauwo Safaris
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </section>
            </div>
          </article>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#C52A0E] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="eyebrow text-white/60">
                Ready when you are
              </p>

              <h2 className="font-display mt-5 max-w-3xl text-4xl leading-[0.98] tracking-[-0.025em] sm:text-5xl lg:text-6xl">
                Your Tanzania adventure starts with a conversation.
              </h2>
            </div>

            <Link
              href="/contact"
              className="group inline-flex w-fit items-center gap-3 border-b border-white/40 pb-2 text-xs font-medium uppercase tracking-[0.16em] transition-colors hover:border-white"
            >
              Start an inquiry
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}