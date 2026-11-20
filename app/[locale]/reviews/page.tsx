import { getTestimonials } from "@/lib/api/testimonials";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/ui/page-hero";
import { SectionCta } from "@/components/ui/section-cta";
import { TestimonialCard } from "@/components/ui/testimonial-card";

export const metadata = {
  title: "Guest Reviews",
  description:
    "Read what guests say about their safari experiences with Ndauwo Safaris.",
};

export default async function ReviewsPage() {
  const testimonials = await getTestimonials();

  return (
    <main className="bg-canvas">
      <PageHero
        eyebrow="All guest reviews"
        title="Memories from the wild"
        description="Read what our guests have to say about their unforgettable safari experiences with Ndauwo Safaris."
      />

      <section className="bg-canvas section-pad">
        <div className="container-page">
          {testimonials.length ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((review, index) => (
                <Reveal
                  key={review.id}
                  className="h-full"
                  delay={Math.min(index, 6) * 0.07}
                >
                  <TestimonialCard testimonial={review} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-sand-muted px-6 py-16 text-center">
              <p className="type-eyebrow text-gold">Guest reviews</p>

              <h2 className="type-display mt-4 text-ink">Reviews coming soon</h2>

              <p className="type-body-sm mx-auto mt-4 max-w-md text-ink/65">
                We&apos;re collecting the first stories from our guests.
              </p>
            </div>
          )}
        </div>
      </section>

      <SectionCta
        eyebrow="Ready when you are"
        title="The next story could be yours."
        description="Tell us what you are dreaming of and we will shape the journey around you."
        primary={{ label: "Plan your safari", href: "/contact" }}
        secondary={{ label: "Read the journal", href: "/blog" }}
      />
    </main>
  );
}
