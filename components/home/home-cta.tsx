import { ImageCta } from "@/components/ui/image-cta";
import type { SiteSettings } from "@/types/api";

interface HomeCTAProps {
  settings?: Pick<SiteSettings, "whatsapp" | "phone" | "hero_image_url"> | null;
}

/**
 * Closes the homepage with the same photography band used at the end of the
 * listing pages, so the band above the footer reads the same site-wide.
 */
export function HomeCTA({ settings }: HomeCTAProps) {
  const whatsapp = settings?.whatsapp?.replace(/\D/g, "");

  return (
    <ImageCta
      imageUrl={settings?.hero_image_url || "/images/home/cta-cheetah.jpg"}
      eyebrow="Plan your safari"
      title="Tell us the trip you have in mind"
      description="Send your dates, how many of you are travelling and what you want to see. We reply with a programme, lodge options and a final quotation."
      href="/contact"
      ctaLabel="Plan your safari"
      phone={settings?.phone}
      secondary={
        whatsapp
          ? {
              label: "WhatsApp us",
              href: `https://wa.me/${whatsapp}`,
              external: true,
            }
          : undefined
      }
      className="pt-4 pb-16 sm:pb-20 lg:pb-24"
    />
  );
}
