"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import type { FAQ } from "@/types/api";

interface FaqAccordionProps {
  faqs: FAQ[];
  defaultOpenIndex?: number | null;
  /** Caps how many questions render (homepage shows five). */
  limit?: number;
  className?: string;
}

/** Single-open accordion used on the homepage and the FAQ page. */
export function FaqAccordion({
  faqs,
  defaultOpenIndex = 0,
  limit,
  className,
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const visibleFaqs = typeof limit === "number" ? faqs.slice(0, limit) : faqs;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {visibleFaqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const buttonId = `faq-trigger-${faq.id}`;
        const panelId = `faq-panel-${faq.id}`;

        return (
          <div key={faq.id} className="overflow-hidden rounded-xl bg-sand-muted">
            <button
              id={buttonId}
              type="button"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full items-center justify-between gap-6 p-5 text-left outline-none sm:p-6"
            >
              <span className="font-[family-name:var(--font-primary)] text-base font-semibold text-ink sm:text-lg">
                {faq.question}
              </span>

              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ember text-ember">
                {isOpen ? (
                  <Minus className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                ) : (
                  <Plus className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                )}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <p className="type-body-sm px-5 pb-5 text-ink/65 sm:px-6 sm:pb-6">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
