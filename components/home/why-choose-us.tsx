"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { CtaLink } from "@/components/ui/cta";
import { SectionHeading } from "@/components/ui/section-heading";

const fadeIn = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
} as const;

export function WhyChooseUs() {
  return (
    <section className="bg-canvas section-pad">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Why Travelers Choose Ndauwo"
            description="Local guides, carefully planned routes and a team that answers quickly — the reasons our guests send us their friends."
            className="mb-12"
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-[292px_auto] lg:gap-6">
          {/* Local knowledge — tall left cell */}
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col bg-tile md:row-span-2"
          >
            <div className="p-4 pb-0">
              <div className="relative h-[400px] w-full overflow-hidden lg:h-[500px]">
                <Image
                  src="/images/about/giraffes.png"
                  alt="Giraffes in Tanzania"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between p-6 lg:p-7">
              <h3 className="font-[family-name:var(--font-primary)] text-xl font-bold leading-tight text-ink">
                Local knowledge and experienced guides
              </h3>
              <CtaLink href="/about" variant="dark" className="mt-6">
                Discover Ndauwo
              </CtaLink>
            </div>
          </motion.div>

          {/* Trust */}
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col bg-tile"
          >
            <div className="relative h-[210px] w-full">
              <Image
                src="/images/about/handshake.png"
                alt="Travelers shaking hands with our team"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-5 lg:p-7">
              <h3 className="font-[family-name:var(--font-primary)] text-[2rem] font-semibold leading-tight text-ink">
                Trusted by <span className="text-gold">Travelers</span> worldwide
              </h3>
            </div>
          </motion.div>

          {/* Coverage */}
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative overflow-hidden bg-tile"
          >
            <div className="absolute inset-0">
              <Image
                src="/images/about/tanzania-map.png"
                alt=""
                aria-hidden="true"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain object-right-top"
              />
            </div>

            <div className="absolute bottom-4 left-5 z-10 lg:bottom-6 lg:left-7">
              <p className="font-[family-name:var(--font-primary)] text-[2.5rem] font-black leading-none text-ink">
                100%
              </p>
              <p className="mt-1 font-[family-name:var(--font-primary)] text-base font-semibold leading-snug text-gold">
                Personalized Safari
                <br />
                Experiences
              </p>
            </div>
          </motion.div>

          {/* Hospitality */}
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative flex min-h-[300px] flex-col overflow-hidden bg-tile md:col-span-2 md:min-h-[350px]"
          >
            <div className="absolute bottom-0 right-0 h-full w-full lg:w-[55%]">
              <Image
                src="/images/about/jeeps.png"
                alt="Ndauwo Safari Land Cruisers"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-contain object-right-bottom"
              />
            </div>

            <div className="relative z-10 flex h-full flex-col justify-center p-6 pr-[40%] lg:p-8 lg:pr-[45%]">
              <h3 className="font-[family-name:var(--font-primary)] text-[2rem] font-semibold leading-tight text-ink">
                Authentic African hospitality
              </h3>
              <p className="mt-1 font-[family-name:var(--font-primary)] text-[2rem] font-semibold leading-tight text-gold">
                Responsible and
                <br />
                memorable travel
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
