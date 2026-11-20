import { Reveal } from "@/components/motion/reveal";
import { CtaLink } from "@/components/ui/cta";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { PageHero } from "@/components/ui/page-hero";
import { SectionCta } from "@/components/ui/section-cta";
import { getFAQs } from "@/lib/api/faqs";

export const metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find answers to common questions about planning a safari with Ndauwo Safaris.",
};

export default async function FAQPage() {
  const faqs = await getFAQs();

  return (
    <main className="bg-canvas">
      <PageHero
        eyebrow="Need to know"
        title={
          <>
            Frequently asked
            <br />
            <span className="italic text-ember">questions.</span>
          </>
        }
        description="Helpful answers to common questions as you plan your Tanzania safari."
        video
      />

      <section className="bg-canvas section-pad">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
            <Reveal className="flex flex-col justify-between lg:sticky lg:top-32 lg:h-[60vh]">
              <h2 className="type-script text-ink">
                Frequently Asked <br />
                Questions
              </h2>

              <div className="mt-12 lg:mt-0">
                <h3 className="font-[family-name:var(--font-primary)] text-lg font-bold text-ink">
                  Still have a question?
                </h3>
                <p className="type-body-sm mt-2 max-w-xs text-ink/60">
                  Message us and we will reply as quickly as possible.
                </p>
                <CtaLink href="/contact" className="mt-6">
                  Contact Us
                </CtaLink>
              </div>
            </Reveal>

            <Reveal className="w-full" delay={0.1}>
              {faqs.length ? (
                <FaqAccordion faqs={faqs} />
              ) : (
                <div className="rounded-xl bg-sand-muted px-6 py-14 text-center">
                  <p className="type-eyebrow text-gold">Questions</p>

                  <h3 className="type-display mt-4 text-ink">
                    No questions published yet
                  </h3>

                  <p className="type-body-sm mx-auto mt-4 max-w-md text-ink/65">
                    Ask us anything in the meantime and we will answer directly.
                  </p>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      <SectionCta
        tone="sand"
        eyebrow="Still wondering?"
        title="Every safari is different."
        description="If you can't find the answer you're looking for, speak with the Ndauwo Safaris team. We're happy to help you plan the details."
        primary={{ label: "Ask us directly", href: "/contact" }}
      />
    </main>
  );
}
