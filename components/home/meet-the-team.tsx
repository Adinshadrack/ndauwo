"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { CtaLink } from "@/components/ui/cta";
import { PolaroidCollage } from "./polaroid-collage";

export function MeetTheTeam() {
  return (
    <section className="relative w-full overflow-hidden bg-canvas pt-20 pb-32 sm:pt-24 lg:pt-28 lg:pb-48">
      <div className="container-page relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="type-eyebrow text-gold"
            >
              Meet the Team
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="type-script mt-3 text-ink"
            >
              A Tanzanian company, built on <span className="italic">local knowledge</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="type-body mt-6 text-ink/70"
            >
              At Ndauwo Safaris, we believe every journey should be extraordinary.
              Rooted in the beauty and spirit of Tanzania, we create authentic,
              personalized and unforgettable safari experiences that bring travelers
              closer to Africa&apos;s breathtaking landscapes, incredible wildlife and
              rich culture. Through exceptional service, genuine hospitality and
              thoughtfully designed journeys, we make discovering Africa meaningful,
              memorable and accessible to every traveler.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-10"
            >
              <CtaLink href="/about" size="lg">
                About Us
              </CtaLink>
            </motion.div>
          </div>

          {/* Collage */}
          <div className="hidden w-full lg:block">
            <PolaroidCollage />
          </div>
        </div>
      </div>

      {/* Brush transition into the safari collection band. */}
      <div className="pointer-events-none absolute -bottom-10 left-0 z-20 w-full lg:-bottom-16">
        <Image
          src="/images/brush-transition.png"
          alt=""
          aria-hidden="true"
          width={1920}
          height={150}
          className="h-auto w-full object-cover object-bottom"
        />
      </div>
    </section>
  );
}
