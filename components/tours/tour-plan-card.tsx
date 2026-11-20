import { MessageCircle } from "lucide-react";

import { CtaLink } from "@/components/ui/cta";

interface TourPlanCardProps {
  priceLabel: string;
  enquiryHref: string;
  whatsappHref: string | null;
}

/** The dark rail card: one price, two ways to start a conversation. */
export function TourPlanCard({
  priceLabel,
  enquiryHref,
  whatsappHref,
}: TourPlanCardProps) {
  return (
    <div className="rounded-[20px] bg-pine px-6 pb-5 pt-6 text-white shadow-[0_24px_50px_-28px_rgba(11,30,17,0.9)]">
      <div className="flex items-center justify-between gap-3">
        <p className="type-badge text-white/55">Starting from</p>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-2.5 py-1 text-[10px] font-semibold text-white/85">
          <span className="h-1.5 w-1.5 rounded-full bg-[#6ee7a8]" aria-hidden="true" />
          Enquiry only
        </span>
      </div>

      <div className="mt-2.5 flex items-baseline gap-2">
        <span className="type-price text-[28px] text-white">{priceLabel}</span>
        <span className="whitespace-nowrap text-[11px] text-white/55">
          per person
        </span>
      </div>

      <div className="mt-[18px] flex flex-col gap-2.5">
        <CtaLink
          href={enquiryHref}
          shape="pill"
          className="h-[46px] w-full text-[13px]"
        >
          Enquire about this safari
        </CtaLink>

        {whatsappHref && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="pill pill-cream h-[46px] w-full text-[13px]"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />
            WhatsApp us
          </a>
        )}
      </div>

      <p className="mt-3 text-[10px] leading-[1.6] text-white/45">
        No online payment. We reply with a final quotation for your dates.
      </p>
    </div>
  );
}
