"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealTag =
  | "div"
  | "li"
  | "article"
  | "figure"
  | "section"
  | "header"
  | "aside";

/** Motion tags, so a reveal can be a list item without breaking the list. */
const tags: Record<RevealTag, typeof motion.div> = {
  div: motion.div,
  li: motion.li as typeof motion.div,
  article: motion.article as typeof motion.div,
  figure: motion.figure as typeof motion.div,
  section: motion.section as typeof motion.div,
  header: motion.header as typeof motion.div,
  aside: motion.aside as typeof motion.div,
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** How far the block travels upward, in px. */
  y?: number;
  delay?: number;
  duration?: number;
  /**
   * How much of the block has to be visible before it runs. Defaults to
   * "some" so a block taller than the viewport — a long article, say — still
   * reveals instead of waiting for a share of itself it can never show.
   */
  amount?: number | "some" | "all";
  once?: boolean;
  as?: RevealTag;
}

/**
 * Scroll-reveal used across the marketing pages: the block rises into place the
 * first time it enters the viewport. It renders nothing extra for visitors who
 * ask for reduced motion — the content is simply there.
 */
export function Reveal({
  children,
  className,
  y = 26,
  delay = 0,
  duration = 0.6,
  amount = "some",
  once = true,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Component = tags[as];

  return (
    <Component
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount, margin: "0px 0px -60px 0px" }}
      transition={{
        duration: reduce ? 0 : duration,
        delay: reduce ? 0 : delay,
        ease: EASE,
      }}
    >
      {children}
    </Component>
  );
}
