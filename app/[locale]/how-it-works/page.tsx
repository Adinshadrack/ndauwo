import type { Metadata } from "next";

import { HowItWorksPage } from "@/components/how-it-works/how-it-works-page";
import { getGallery } from "@/lib/api/gallery";
import { getSiteSettings } from "@/lib/api/settings";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "The six stages of booking a safari with Ndauwo Safaris, from the first enquiry and the written programme to the deposit, the pre-departure details and the flight home.",
};

export default async function HowItWorksRoute() {
  const [settings, gallery] = await Promise.all([
    getSiteSettings(),
    getGallery().catch(() => []),
  ]);

  return (
    <HowItWorksPage
      gallery={gallery}
      heroImage={settings.hero_image_url || undefined}
      phone={settings.phone || undefined}
    />
  );
}
