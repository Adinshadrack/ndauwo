import { Reveal } from "@/components/motion/reveal";
import { CtaLink } from "@/components/ui/cta";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { ImageCta } from "@/components/ui/image-cta";
import { PhotoHero } from "@/components/ui/photo-hero";
import { getFAQs } from "@/lib/api/faqs";
import { getSiteSettings } from "@/lib/api/settings";

export const metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find answers to common questions about planning a safari with Ndauwo Safaris.",
};

export default async function FAQPage() {
  const [faqs, settings] = await Promise.all([getFAQs(), getSiteSettings()]);

  return (
    <main className="bg-canvas">
      <PhotoHero
        align="center"
        eyebrow="Need to know"
        title="Frequently asked questions"
        description="Answers to what travellers ask before they book a safari with us, from deposits and dates to what a day on the road looks like."
        backdropImage={settings.hero_image_url || undefined}
        meta={[
          faqs.length
            ? `${faqs.length} ${faqs.length === 1 ? "answer" : "answers"}`
            : "Answers on request",
          "Replies in writing",
        ]}
      />

      <section className="bg-canvas section-pad">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_1.5fr] lg:gap-16 xl:gap-20">
            <Reveal className="lg:sticky lg:top-[132px] lg:self-start">
              <div className="surface-card px-6 py-6">
                <p className="type-eyebrow text-gold">Not answered here</p>

                <h2 className="type-section-title mt-3 text-ink">
                  Ask the team directly.
                </h2>

                <p className="type-body-sm mt-3 text-ink-muted">
                  Message us the dates you have in mind and the parks you want to
                  see. The planner who would run the safari replies, usually the
                  same day.
                </p>

                <CtaLink
                  href="/contact"
                  size="md"
                  className="mt-5 w-full justify-center"
                >
                  Send a question
                </CtaLink>
              </div>
            </Reveal>

            <Reveal className="w-full" delay={0.1}>
              {faqs.length ? (
                <FaqAccordion faqs={faqs} />
              ) : (
                <div className="surface-card px-6 py-14 text-center">
                  <p className="type-eyebrow text-gold">Questions</p>

                  <h3 className="type-display mt-4 text-ink">
                    No questions published yet
                  </h3>

                  <p className="type-body-sm mx-auto mt-4 max-w-md text-ink-muted">
                    Ask us anything in the meantime and we will answer directly.
                  </p>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      <ImageCta
        imageUrl={settings.hero_image_url || undefined}
        eyebrow="Next step"
        title="Put the question to a planner."
        description="Deposits, group sizes, lodges, the driving days — ask before you book anything. Nothing is paid online, so a conversation costs you nothing."
        href="/contact"
        ctaLabel="Ask us directly"
        secondary={{ label: "Browse safaris", href: "/tours" }}
        phone={settings.phone || undefined}
      />
    </main>
  );
}
