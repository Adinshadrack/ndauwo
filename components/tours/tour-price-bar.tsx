import { CtaLink } from "@/components/ui/cta";

interface TourPriceBarProps {
  priceLabel: string;
  priceNote?: string;
  enquiryHref: string;
}

/**
 * Price, the stored pricing note and the enquiry action in one bar. The note
 * is the CMS copy verbatim — it is the only place the disclaimer appears.
 */
export function TourPriceBar({
  priceLabel,
  priceNote,
  enquiryHref,
}: TourPriceBarProps) {
  return (
    <section className="container-page pt-8 sm:pt-11">
      <div className="surface-card grid gap-5 px-6 py-5 sm:py-[22px] lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-[26px]">
        <div>
          <span className="type-price text-[26px] text-ink">{priceLabel}</span>
          <p className="mt-2 text-[11.5px] text-ink-soft">per person</p>
        </div>

        {priceNote && (
          <p className="max-w-[66ch] text-[12.5px] leading-[1.7] text-ink-muted lg:border-l lg:border-ink/10 lg:pl-[26px]">
            {priceNote}
          </p>
        )}

        <div className="flex items-center gap-4">
          <p className="whitespace-nowrap text-[11px] leading-snug text-ink-soft">
            No online payment required
          </p>

          <CtaLink href={enquiryHref} variant="dark" shape="pill">
            Enquire
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
