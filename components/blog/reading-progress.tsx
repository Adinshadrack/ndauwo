"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/**
 * Ember rule that grows across the seam under the fixed header as the reader
 * moves through a story. It is pinned to the header's height at each
 * breakpoint (`main` clears the same offsets) so it never covers the header.
 */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.001,
  });

  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: reduce ? scrollYProgress : smooth }}
      className="pointer-events-none fixed inset-x-0 top-[88px] z-40 h-[3px] origin-left bg-ember sm:top-[100px] lg:top-[114px]"
    />
  );
}
