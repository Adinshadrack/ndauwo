import Image from "next/image";
import { Check, Compass, Heart, Leaf, ShieldCheck } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/ui/page-hero";
import { SectionCta } from "@/components/ui/section-cta";
import type { SiteSettings, Testimonial } from "@/types/api";

interface AboutPageProps {
  settings: SiteSettings;
  testimonials: Testimonial[];
}

const values = [
  {
    icon: Heart,
    title: "Passion",
    text: "We believe the best journeys are created by people who genuinely love Africa and the experiences they share.",
  },
  {
    icon: Compass,
    title: "Local Knowledge",
    text: "Our understanding of Tanzania helps us create journeys that feel authentic, personal and thoughtfully planned.",
  },
  {
    icon: Leaf,
    title: "Responsible Travel",
    text: "We value the landscapes, wildlife and communities that make Tanzania special.",
  },
  {
    icon: ShieldCheck,
    title: "Trust",
    text: "From your first inquiry to the end of your journey, we focus on clear communication and dependable service.",
  },
];

const promises = [
  "Personalized journeys",
  "Experienced local guides",
  "Authentic experiences",
  "Thoughtful planning",
];

const reasons = [
  {
    title: "Personal attention",
    text: "Your journey starts with understanding your interests and expectations.",
  },
  {
    title: "Local expertise",
    text: "Travel with people who understand the destinations you're visiting.",
  },
  {
    title: "Flexible experiences",
    text: "Your safari can be shaped around your priorities rather than a rigid template.",
  },
  {
    title: "Memorable moments",
    text: "We aim to create experiences you'll still be talking about years later.",
  },
];

export function AboutPage({ settings, testimonials }: AboutPageProps) {
  const image =
    settings.hero_image_url ||
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1800&q=85";

  return (
    <main className="bg-canvas">
      <PageHero
        eyebrow="About Ndauwo Safaris"
        title={
          <>
            We don&apos;t just take you
            <br />
            to Africa.
            <br />
            <span className="italic text-ember">
              We help you experience it.
            </span>
          </>
        }
        description="Discover the story, values and people behind Ndauwo Safaris."
        video
      />

      {/* Our story */}
      <section className="bg-canvas section-pad">
        <div className="container-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal className="image-zoom relative aspect-[4/5] overflow-hidden bg-sand">
            <Image
              src={image}
              alt="Ndauwo Safaris guides in the field"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />

            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
          </Reveal>

          <Reveal className="lg:pl-6" delay={0.1}>
            <p className="type-eyebrow text-gold">Our story</p>

            <h2 className="type-display mt-5 max-w-2xl text-ink">
              Built around a love for Tanzania.
            </h2>

            <div className="type-body mt-8 max-w-2xl space-y-5 text-ink/65">
              <p>
                {settings.about ||
                  "Ndauwo Safaris is dedicated to creating memorable journeys through Tanzania, combining incredible wildlife, beautiful landscapes and genuine African hospitality."}
              </p>

              <p>
                We believe a safari should be more than checking destinations off
                a list. It should give you time to slow down, discover, connect
                and create memories that stay with you long after you return
                home.
              </p>
            </div>

            <div className="mt-9 border-t border-ink/10">
              {promises.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 border-b border-ink/10 py-4"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-ember text-ember">
                    <Check className="h-3 w-3" aria-hidden="true" />
                  </span>

                  <span className="text-sm text-ink">{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission / vision */}
      <section className="bg-sand">
        <div className="container-page section-pad">
          <Reveal className="grid border-y border-ink/15 md:grid-cols-2">
            <div className="border-b border-ink/15 py-10 md:border-b-0 md:border-r md:pr-12 lg:py-14">
              <p className="type-eyebrow text-gold">Our mission</p>

              <h2 className="type-display mt-5 max-w-xl text-ink">
                Create journeys people remember.
              </h2>

              <p className="type-body-sm mt-5 max-w-xl text-ink/65">
                To create meaningful safari experiences that connect travelers
                with Tanzania&apos;s wildlife, landscapes, culture and people.
              </p>
            </div>

            <div className="py-10 md:pl-12 lg:py-14">
              <p className="type-eyebrow text-gold">Our vision</p>

              <h2 className="type-display mt-5 max-w-xl text-ink">
                Tanzania experienced authentically.
              </h2>

              <p className="type-body-sm mt-5 max-w-xl text-ink/65">
                To be a trusted safari partner for travelers seeking authentic,
                responsible and unforgettable experiences in Tanzania.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-canvas section-pad">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="type-eyebrow text-gold">What we stand for</p>

            <h2 className="type-display mt-5 text-ink">
              The values behind every journey.
            </h2>
          </div>

          <Reveal className="mt-12 grid border-t border-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className={`py-8 ${
                    index % 2 === 0
                      ? "sm:pr-8"
                      : "sm:border-l sm:border-ink/10 sm:pl-8"
                  } ${
                    index > 1 ? "lg:border-t-0" : ""
                  } lg:border-l lg:border-ink/10 lg:px-8 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0`}
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-10 w-10 items-center justify-center border border-ink/15">
                      <Icon className="h-4 w-4 text-gold" aria-hidden="true" />
                    </span>

                    <span className="type-badge text-ink/30">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="type-card-title mt-7 text-ink">{value.title}</h3>

                  <p className="type-body-sm mt-3 text-ink/60">{value.text}</p>
                </div>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* Why Ndauwo */}
      <section className="bg-forest-900 text-white">
        <div className="container-page section-pad grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="type-eyebrow text-gold">Why Ndauwo</p>

            <h2 className="type-display mt-5 max-w-2xl text-white">
              Your journey deserves more than a standard itinerary.
            </h2>

            <p className="type-body mt-7 max-w-xl text-white/60">
              We focus on understanding what you want from your safari and
              creating an experience around it.
            </p>
          </Reveal>

          <Reveal className="border-t border-white/15" delay={0.1}>
            {reasons.map((item, index) => (
              <div key={item.title} className="border-b border-white/10 py-6">
                <div className="grid grid-cols-[2.5rem_1fr] gap-4">
                  <span className="type-badge text-ember">0{index + 1}</span>

                  <div>
                    <h3 className="type-card-title text-white">{item.title}</h3>

                    <p className="type-body-sm mt-2 max-w-xl text-white/50">
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Guest quotes */}
      {testimonials.length > 0 && (
        <section className="bg-canvas section-pad">
          <div className="container-page">
            <div className="flex flex-col justify-between gap-5 border-b border-ink/10 pb-6 md:flex-row md:items-end">
              <div>
                <p className="type-eyebrow text-gold">Guest experiences</p>

                <h2 className="type-display mt-5 text-ink">
                  What our guests say.
                </h2>
              </div>

              <span className="type-meta uppercase text-ink/35">
                From the road
              </span>
            </div>

            <div className="mt-10 grid border-t border-ink/10 md:grid-cols-3">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <Reveal
                  as="article"
                  key={testimonial.id}
                  delay={index * 0.08}
                  className={`py-8 md:px-7 ${
                    index > 0
                      ? "border-t border-ink/10 md:border-l md:border-t-0"
                      : ""
                  }`}
                >
                  <div
                    className="text-sm tracking-[0.2em] text-ember"
                    aria-label={`${testimonial.rating} out of 5 stars`}
                  >
                    {"★".repeat(testimonial.rating)}
                  </div>

                  <blockquote className="mt-6 font-[family-name:var(--font-accent)] text-2xl leading-[1.35] text-ink">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>

                  <div className="mt-8 flex items-center gap-3">
                    <span aria-hidden="true" className="h-px w-6 bg-ink/20" />

                    <p className="type-meta uppercase text-ink/45">
                      {testimonial.name}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <SectionCta
        eyebrow="Start your story"
        title="Let's create your Tanzania story."
        description="Tell us what kind of adventure you're imagining and we'll help you take the first step."
        primary={{ label: "Start planning", href: "/contact" }}
      />
    </main>
  );
}
