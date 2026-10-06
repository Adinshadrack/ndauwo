import Image from "next/image";
import { HeroVideo } from "@/components/media/hero-video";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Compass,
  Heart,
  Leaf,
  ShieldCheck,
} from "lucide-react";

import type {
  SiteSettings,
  Testimonial,
} from "@/types/api";

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

export function AboutPage({
  settings,
  testimonials,
}: AboutPageProps) {
  const image =
    settings.hero_image_url ||
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1800&q=85";

  return (
    <main className="bg-[#FCFAF4]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#11110F] text-white">
        <HeroVideo />
        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-36 lg:px-8 lg:pb-32 lg:pt-44">
          <div className="max-w-5xl">
            <p className="eyebrow text-[#F67A05]">
              About Ndauwo Safaris
            </p>

            <h1 className="font-display mt-6 text-5xl leading-[0.92] tracking-[-0.035em] sm:text-6xl lg:text-[6.8rem]">
              We don't just take you
              <br />
              to Africa.
              <br />
              <span className="text-[#F67A05]">
                We help you experience it.
              </span>
            </h1>

            <div className="mt-9 flex max-w-2xl items-start gap-5">
              <span className="mt-3 hidden h-px w-12 shrink-0 bg-white/30 sm:block" />

              <p className="text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
                Discover the story, values and people behind Ndauwo Safaris.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      </section>

      {/* OUR STORY */}
      <section className="bg-[#FCFAF4] py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div className="image-zoom relative aspect-[4/5] overflow-hidden bg-[#EDE1CF]">
            <Image
              src={image}
              alt="Ndauwo Safaris"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />

            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          <div className="lg:pl-6">
            <p className="section-label">
              Our story
            </p>

            <h2 className="font-display mt-6 max-w-2xl text-4xl leading-[1] tracking-[-0.025em] sm:text-5xl lg:text-6xl">
              Built around a love for Tanzania.
            </h2>

            <div className="mt-8 max-w-2xl space-y-5 text-base leading-8 text-black/60 sm:text-lg sm:leading-9">
              <p>
                {settings.about ||
                  "Ndauwo Safaris is dedicated to creating memorable journeys through Tanzania, combining incredible wildlife, beautiful landscapes and genuine African hospitality."}
              </p>

              <p>
                We believe a safari should be more than checking destinations
                off a list. It should give you time to slow down, discover,
                connect and create memories that stay with you long after you
                return home.
              </p>
            </div>

            <div className="mt-9 border-t border-black/10">
              {[
                "Personalized journeys",
                "Experienced local guides",
                "Authentic experiences",
                "Thoughtful planning",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 border-b border-black/10 py-4"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-[#F67A05] text-[#F67A05]">
                    <Check className="h-3 w-3" />
                  </span>

                  <span className="text-sm text-[#11110F]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="bg-[#EDE1CF]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid border-y border-black/15 md:grid-cols-2">
            <div className="border-b border-black/15 py-10 md:border-b-0 md:border-r md:pr-12 lg:py-14">
              <p className="eyebrow text-[#C52A0E]">
                Our Mission
              </p>

              <h2 className="font-display mt-6 max-w-xl text-3xl leading-[1] sm:text-4xl lg:text-5xl">
                Create journeys people remember.
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-black/60">
                To create meaningful safari experiences that connect travelers
                with Tanzania's wildlife, landscapes, culture and people.
              </p>
            </div>

            <div className="py-10 md:pl-12 lg:py-14">
              <p className="eyebrow text-[#C52A0E]">
                Our Vision
              </p>

              <h2 className="font-display mt-6 max-w-xl text-3xl leading-[1] sm:text-4xl lg:text-5xl">
                Tanzania experienced authentically.
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-black/60">
                To be a trusted safari partner for travelers seeking authentic,
                responsible and unforgettable experiences in Tanzania.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[#FCFAF4] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="section-label">
              What we stand for
            </p>

            <h2 className="font-display mt-6 text-4xl leading-[1] tracking-[-0.025em] sm:text-5xl">
              The values behind every journey.
            </h2>
          </div>

          <div className="mt-12 grid border-t border-black/10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className={`py-8 ${
                    index % 2 === 0
                      ? "sm:pr-8"
                      : "sm:border-l sm:border-black/10 sm:pl-8"
                  } ${
                    index > 1
                      ? "lg:border-t-0"
                      : ""
                  } lg:border-l lg:border-black/10 lg:px-8 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0`}
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-10 w-10 items-center justify-center border border-black/15">
                      <Icon className="h-4 w-4 text-[#C52A0E]" />
                    </span>

                    <span className="text-[0.65rem] uppercase tracking-[0.16em] text-black/30">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="font-display mt-7 text-2xl text-[#11110F]">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-black/55">
                    {value.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY NDAUWO */}
      <section className="bg-[#11110F] text-white">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8 lg:py-28">
          <div>
            <p className="section-label text-white/45">
              Why Ndauwo
            </p>

            <h2 className="font-display mt-6 max-w-2xl text-4xl leading-[0.98] tracking-[-0.025em] sm:text-5xl lg:text-6xl">
              Your journey deserves more than a standard itinerary.
            </h2>

            <p className="mt-7 max-w-xl text-base leading-7 text-white/55 sm:text-lg sm:leading-8">
              We focus on understanding what you want from your safari and
              creating an experience around it.
            </p>
          </div>

          <div className="border-t border-white/15">
            {[
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
            ].map((item, index) => (
              <div
                key={item.title}
                className="border-b border-white/10 py-6"
              >
                <div className="grid grid-cols-[2.5rem_1fr] gap-4">
                  <span className="text-xs tracking-[0.1em] text-[#F67A05]">
                    0{index + 1}
                  </span>

                  <div>
                    <h3 className="font-display text-2xl">
                      {item.title}
                    </h3>

                    <p className="mt-2 max-w-xl text-sm leading-7 text-white/45">
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="bg-[#FCFAF4] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-5 border-b border-black/10 pb-6 md:flex-row md:items-end">
              <div>
                <p className="section-label">
                  Guest experiences
                </p>

                <h2 className="font-display mt-6 text-4xl leading-none tracking-[-0.025em] sm:text-5xl">
                  What our guests say.
                </h2>
              </div>

              <span className="text-[0.65rem] uppercase tracking-[0.16em] text-black/35">
                From the road
              </span>
            </div>

            <div className="mt-10 grid border-t border-black/10 md:grid-cols-3">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <article
                  key={testimonial.id}
                  className={`py-8 md:px-7 ${
                    index > 0
                      ? "border-t border-black/10 md:border-l md:border-t-0 md:border-black/10"
                      : ""
                  }`}
                >
                  <div
                    className="text-sm tracking-[0.2em] text-[#F67A05]"
                    aria-label={`${testimonial.rating} out of 5 stars`}
                  >
                    {"★".repeat(testimonial.rating)}
                  </div>

                  <blockquote className="font-display mt-6 text-2xl leading-[1.3] text-[#11110F]">
                    “{testimonial.content}”
                  </blockquote>

                  <div className="mt-8 flex items-center gap-3">
                    <span className="h-px w-6 bg-black/20" />

                    <p className="text-[0.65rem] uppercase tracking-[0.16em] text-black/45">
                      {testimonial.name}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#C52A0E] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
            <div>
              <p className="eyebrow text-white/60">
                Start your story
              </p>

              <h2 className="font-display mt-6 max-w-2xl text-4xl leading-[0.98] tracking-[-0.025em] sm:text-5xl lg:text-6xl">
                Let's create your Tanzania story.
              </h2>
            </div>

            <div className="border-t border-white/20 pt-6 lg:border-t-0 lg:border-l lg:pl-10">
              <p className="max-w-xl text-base leading-7 text-white/75">
                Tell us what kind of adventure you're imagining and we'll help
                you take the first step.
              </p>

              <Link
                href="/contact"
                className="group mt-8 inline-flex items-center gap-3 border-b border-white/40 pb-2 text-xs font-medium uppercase tracking-[0.16em] transition-colors hover:border-white"
              >
                Start planning
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}