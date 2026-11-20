import { getTestimonials } from "@/lib/api/testimonials";
import { getSiteSettings } from "@/lib/api/settings";
import { Reveal } from "@/components/motion/reveal";
import { ImageCta } from "@/components/ui/image-cta";
import { PhotoHero } from "@/components/ui/photo-hero";
import { TestimonialCard } from "@/components/ui/testimonial-card";

export const metadata = {
  title: "Guest Reviews",
  description:
    "Read what guests say about their safari experiences with Ndauwo Safaris.",
};

export default async function ReviewsPage() {
  const [testimonials, settings] = await Promise.all([
    getTestimonials(),
    getSiteSettings(),
  ]);

  const platforms = Array.from(
    new Set(
      testimonials
        .map((review) => review.platform?.trim())
        .filter((platform): platform is string => Boolean(platform)),
    ),
  );

  return (
    <main className="bg-canvas">
      <PhotoHero
        align="center"
        eyebrow="Guest reviews"
        title="Memories from the wild"
        description="What guests wrote after the safari, in their own words, on the platforms where they left them."
        backdropImage={settings.hero_image_url || undefined}
        meta={[
          ...(testimonials.length
            ? [`${testimonials.length} ${testimonials.length === 1 ? "review" : "reviews"}`]
            : []),
          ...(platforms.length ? [platforms.join(" & ")] : []),
        ]}
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
            <div className="surface-card px-6 py-16 text-center">
              <p className="type-eyebrow text-gold">Guest reviews</p>

              <h2 className="type-display mt-4 text-ink">Reviews coming soon</h2>

              <p className="type-body-sm mx-auto mt-4 max-w-md text-ink-muted">
                We&apos;re collecting the first stories from our guests.
              </p>
            </div>
          )}
        </div>
      </section>

      <ImageCta
        imageUrl={settings.hero_image_url || undefined}
        eyebrow="Ready when you are"
        title="The next story could be yours."
        description="Tell us what you are dreaming of and we will shape the journey around you."
        href="/contact"
        ctaLabel="Plan your safari"
        secondary={{ label: "Read the journal", href: "/blog" }}
        phone={settings.phone || undefined}
      />
    </main>
  );
}
