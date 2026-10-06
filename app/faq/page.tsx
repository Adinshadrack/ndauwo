import { ArrowRight } from "lucide-react";

import { HeroVideo } from "@/components/media/hero-video";
import { getFAQs } from "@/lib/api/faqs";

export const metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find answers to common questions about planning a safari with Ndauwo Safaris.",
};

export default async function FAQPage() {
  const faqs = await getFAQs();

  return (
    <main className="bg-[#FCFAF4]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#11110F] text-white">
        <HeroVideo />
        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-36 lg:px-8 lg:pb-32 lg:pt-44">
          <div className="max-w-5xl">
            <p className="eyebrow text-[#F67A05]">
              Need to know
            </p>

            <h1 className="font-display mt-6 max-w-5xl text-5xl leading-[0.92] tracking-[-0.035em] sm:text-6xl lg:text-[7rem]">
              Frequently asked
              <br />
              <span className="text-[#F67A05]">questions.</span>
            </h1>

            <div className="mt-9 flex max-w-2xl items-start gap-5">
              <span className="mt-3 hidden h-px w-12 shrink-0 bg-white/30 sm:block" />

              <p className="text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
                Helpful answers to common questions as you plan your Tanzania
                safari.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      </section>

      {/* FAQ LIST */}
      <section className="bg-[#FCFAF4] py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          {faqs.length ? (
            <div className="border-t border-black/10">
              {faqs.map((faq, index) => (
                <details
                  key={faq.id}
                  className="group border-b border-black/10"
                >
                  <summary className="flex cursor-pointer list-none items-start gap-6 py-7 marker:hidden sm:py-8">
                    <span className="pt-1 text-[0.65rem] uppercase tracking-[0.16em] text-[#F67A05]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="flex flex-1 items-start justify-between gap-6">
                      <span className="font-display max-w-3xl text-2xl leading-[1.15] tracking-[-0.015em] text-[#11110F] sm:text-3xl">
                        {faq.question}
                      </span>

                      <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center border border-black/15 text-black/50 transition-all duration-300 group-open:border-[#F67A05] group-open:text-[#C52A0E]">
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-open:rotate-90" />
                      </span>
                    </span>
                  </summary>

                  <div className="grid grid-cols-[2.5rem_1fr] gap-6 pb-8">
                    <span />

                    <p className="max-w-3xl text-sm leading-7 text-black/55 sm:text-base sm:leading-8">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          ) : (
            <div className="border-y border-black/10 py-20 text-center">
              <p className="section-label justify-center">
                Safari information
              </p>

              <h2 className="font-display mt-5 text-3xl text-[#11110F] sm:text-4xl">
                Questions coming soon
              </h2>

              <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-black/50">
                There are no frequently asked questions available right now.
                Please contact us if you need help planning your safari.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="bg-[#EDE1CF]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
            <div>
              <p className="section-label">
                Still wondering?
              </p>

              <h2 className="font-display mt-6 max-w-3xl text-4xl leading-[0.98] tracking-[-0.025em] sm:text-5xl lg:text-6xl">
                Every safari is different.
              </h2>
            </div>

            <div className="border-t border-black/10 pt-6 lg:border-l lg:border-t-0 lg:pl-10">
              <p className="max-w-xl text-base leading-7 text-black/55">
                If you can&apos;t find the answer you&apos;re looking for,
                speak with the Ndauwo Safaris team. We&apos;re happy to help
                you plan the details.
              </p>

              <a
                href="/contact"
                className="group mt-8 inline-flex items-center gap-3 border-b border-black/25 pb-2 text-xs font-medium uppercase tracking-[0.16em] text-[#11110F] transition-colors hover:border-[#C52A0E] hover:text-[#C52A0E]"
              >
                Ask us directly
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}