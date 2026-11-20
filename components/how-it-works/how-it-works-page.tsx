"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { CtaLink } from "@/components/ui/cta";
import { ImageCta } from "@/components/ui/image-cta";
import { PhotoHero } from "@/components/ui/photo-hero";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/types/api";

import { enquiryNeeds, firstReply, journeyStages } from "./journey-stages";

interface HowItWorksPageProps {
  /** Gallery photographs, one per stage, in upload order. */
  gallery: GalleryImage[];
  /** Site photography, used for the opening and the closing band. */
  heroImage?: string;
  phone?: string;
}

/**
 * The booking journey. One photograph per stage, and the six stages stay
 * visible: on desktop beside a sticky photograph, on phones as an accordion
 * whose open stage carries its own frame.
 */
export function HowItWorksPage({
  gallery,
  heroImage,
  phone,
}: HowItWorksPageProps) {
  const [selected, setSelected] = useState(0);
  const activeStage = journeyStages[selected];

  /** A photograph and its description for one stage, never a broken frame. */
  function photoFor(index: number) {
    const photo = gallery.length ? gallery[index % gallery.length] : null;

    return {
      src: photo?.image_url || heroImage,
      alt: photo?.alt_text || photo?.title || journeyStages[index].title,
    };
  }

  return (
    <main className="bg-canvas">
      <PhotoHero
        align="center"
        eyebrow="Booking"
        title="How a safari comes together."
        description="Six stages from your first message to the drive back at the end of the programme. Nothing is paid online, and nothing is confirmed until you have the quotation in front of you."
        backdropImage={heroImage}
        meta={["6 stages", "Reply in writing", "No online payment"]}
      />

      <section className="bg-canvas pb-16 pt-14 lg:pb-20 lg:pt-16">
        <div className="container-page">
          <Reveal className="flex flex-wrap items-end justify-between gap-5">
            <h2 className="type-script text-ink">From enquiry to home</h2>

            <p className="max-w-[42ch] text-[0.8125rem] leading-relaxed text-ink-muted">
              Select a stage to see the photograph that goes with it and what
              happens on both sides.
            </p>
          </Reveal>

          <div className="mt-9 grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16">
            {/* Sticky photograph, desktop only — phones carry the frame inside
                the open stage so it never sits a screen away from its copy. */}
            <Reveal className="hidden lg:block">
              <div className="sticky top-[132px]">
                <figure className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-sand shadow-card">
                  {journeyStages.map((stage, index) => {
                    const photo = photoFor(index);

                    if (!photo.src) return null;

                    return (
                      <Image
                        key={stage.id}
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 520px"
                        className={cn(
                          "object-cover object-center transition-opacity duration-500",
                          index === selected ? "opacity-100" : "opacity-0",
                        )}
                      />
                    );
                  })}

                  <figcaption className="absolute bottom-5 left-5 z-10 inline-flex items-center gap-2 rounded-full bg-canvas/95 px-4 py-2 text-[11.5px] font-bold tracking-[0.06em] text-forest-900">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-ember"
                    />
                    Stage {selected + 1} of {journeyStages.length}
                  </figcaption>
                </figure>

                <p className="mt-4 text-[0.8125rem] leading-relaxed text-ink-soft">
                  {activeStage.note}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <ol className="relative">
                {journeyStages.map((stage, index) => {
                  const active = index === selected;
                  const Icon = stage.icon;
                  const photo = photoFor(index);
                  const panelId = `stage-panel-${stage.id}`;

                  return (
                    <li key={stage.id} className="relative">
                      {index < journeyStages.length - 1 && (
                        <span
                          aria-hidden="true"
                          className={cn(
                            "absolute bottom-0 left-[21px] top-[46px] w-0.5 transition-colors duration-300",
                            active ? "bg-forest-900" : "bg-ink/10",
                          )}
                        />
                      )}

                      <button
                        type="button"
                        onClick={() => setSelected(index)}
                        aria-expanded={active}
                        aria-controls={panelId}
                        className="group relative flex w-full items-start gap-4 pb-6 text-left outline-none sm:gap-5"
                      >
                        <span
                          className={cn(
                            "relative z-10 flex h-11 w-11 flex-none items-center justify-center rounded-[13px] transition-colors duration-300",
                            active
                              ? "bg-ember text-white shadow-[0_10px_22px_-12px_rgba(246,122,5,0.9)]"
                              : "bg-sand-muted text-forest-900 group-hover:bg-sand",
                          )}
                        >
                          <Icon
                            className="h-[18px] w-[18px]"
                            strokeWidth={1.9}
                            aria-hidden="true"
                          />
                        </span>

                        <span
                          className={cn(
                            "min-w-0 flex-1 pt-2 text-[1.0625rem] font-extrabold leading-snug tracking-[-0.015em] transition-colors duration-300",
                            active
                              ? "text-ink"
                              : "text-ink/70 group-hover:text-ink",
                          )}
                        >
                          {stage.title}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {active && (
                          <motion.div
                            id={panelId}
                            role="region"
                            aria-label={stage.title}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.32, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="pb-7 pl-[60px] sm:pl-16">
                              {photo.src && (
                                <figure className="relative mb-5 aspect-[4/3] overflow-hidden rounded-2xl bg-sand lg:hidden">
                                  <Image
                                    src={photo.src}
                                    alt={photo.alt}
                                    fill
                                    sizes="(max-width: 1024px) 90vw, 520px"
                                    className="object-cover object-center"
                                  />
                                </figure>
                              )}

                              <p className="max-w-[52ch] text-[0.875rem] leading-[1.75] text-ink-muted">
                                {stage.body}
                              </p>

                              <CtaLink
                                href={stage.action.href}
                                variant="dark"
                                shape="pill"
                                size="md"
                                className="mt-4"
                              >
                                {stage.action.label}
                              </CtaLink>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-sand-muted section-pad">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="type-script text-ink">What we need from you</h2>

            <p className="type-body-sm mt-4 max-w-[46ch] text-ink-muted">
              The first reply is only as good as the details behind it. Four
              things make the programme accurate from the start.
            </p>

            <ul className="mt-7 grid gap-3">
              {enquiryNeeds.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check
                    className="mt-0.5 h-4 w-4 flex-none text-ember"
                    strokeWidth={2.6}
                    aria-hidden="true"
                  />
                  <span className="text-[0.875rem] leading-relaxed text-ink">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="surface-card h-full px-6 py-7 sm:px-8">
              <h3 className="text-[1.05rem] font-extrabold tracking-[-0.02em] text-ink">
                What comes back
              </h3>

              <ul className="mt-5 grid gap-3">
                {firstReply.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      className="mt-0.5 h-4 w-4 flex-none text-forest-900"
                      strokeWidth={2.6}
                      aria-hidden="true"
                    />
                    <span className="text-[0.875rem] leading-relaxed text-ink">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 flex items-center gap-2 border-t border-ink/10 pt-5 text-[0.78125rem] leading-relaxed text-ink-soft">
                <ArrowRight
                  className="h-3.5 w-3.5 flex-none text-ember"
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
                Nothing is confirmed and nothing is paid until you have read it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <ImageCta
        imageUrl={heroImage}
        title="Start with the dates you have."
        description="Send them with the parks on your list. The reply is a programme and a quotation, not a booking."
        href="/contact"
        ctaLabel="Send an enquiry"
        secondary={{ label: "Browse safaris", href: "/tours" }}
        phone={phone}
        tone="canvas"
      />
    </main>
  );
}
