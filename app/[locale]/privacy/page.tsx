import type { Metadata } from "next";

import {
  LegalAsideCard,
  LegalDocument,
  type LegalSection,
} from "@/components/legal/legal-document";
import { ImageCta } from "@/components/ui/image-cta";
import { PhotoHero } from "@/components/ui/photo-hero";
import { getSiteSettings } from "@/lib/api/settings";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Ndauwo Safaris collects, uses and protects the details you share through newsletter sign-ups and safari enquiries.",
};

const privacySections: readonly LegalSection[] = [
  {
    id: "what-we-collect",
    title: "What we collect",
    paragraphs: [
      "Newsletter sign-up: your email address and, if you choose to share it, your first name.",
      "Safari enquiry: your name, email address and phone number, plus the trip details you describe such as travel dates, party size and preferred destinations.",
      "Site usage: aggregated page views that tell us which safaris and destinations are being read. This data is not linked to your identity.",
    ],
  },
  {
    id: "how-we-use-it",
    title: "How we use it",
    paragraphs: [
      "To reply to your enquiry and prepare a quote or itinerary.",
      "To send the newsletter you signed up for, including occasional announcements about new itineraries.",
      "To keep the website working and understand which pages are useful.",
      "We do not sell, rent or trade your details to anyone, and we do not add you to the newsletter because you sent an enquiry.",
    ],
  },
  {
    id: "newsletter",
    title: "Newsletter",
    paragraphs: [
      "Signing up in the footer is optional and takes one field.",
      "Every newsletter includes a way to leave the list, and you can also write to us at any time and we will remove you from it.",
      "Leaving the list does not affect an enquiry or booking you already have with us.",
    ],
  },
  {
    id: "service-providers",
    title: "Service providers",
    paragraphs: [
      "We use a small number of providers to run the site and our email: website hosting, image storage and an email delivery service.",
      "They process data on our instructions only, and only for the purpose of delivering these services.",
    ],
  },
  {
    id: "retention",
    title: "How long we keep it",
    paragraphs: [
      "Newsletter subscriptions stay on file until you ask to leave the list.",
      "Enquiry details are kept while we work with you and for a reasonable period afterwards so we can pick up a returning conversation.",
      "Records we are required to keep for accounting or legal reasons are kept for as long as the law requires.",
    ],
  },
  {
    id: "your-choices",
    title: "Your choices",
    paragraphs: [
      "Ask us for a copy of the details we hold about you.",
      "Ask us to correct or delete them.",
      "Withdraw your newsletter consent at any time.",
      "Send these requests to our email address and we will action them within a reasonable period.",
    ],
  },
] as const;

export default async function PrivacyPage() {
  const settings = await getSiteSettings();

  return (
    <main className="bg-canvas">
      <PhotoHero
        align="center"
        eyebrow="Privacy"
        title="Privacy policy"
        description="What we collect when you subscribe to the newsletter or send an enquiry, why we hold it, and how to have it removed."
        backdropImage={settings.hero_image_url || undefined}
        meta={[
          `${privacySections.length} sections`,
          "No data sold or traded",
        ]}
      />

      <LegalDocument
        sections={privacySections}
        crossLink={{ label: "Terms & conditions", href: "/terms" }}
        aside={
          <LegalAsideCard
            eyebrow="Your details"
            title="Ask us what we hold."
            action={{ label: "Contact the team", href: "/contact" }}
          >
            {settings.email ? (
              <>
                Write to{" "}
                <a
                  href={`mailto:${settings.email}`}
                  className="font-semibold text-clay underline underline-offset-4"
                >
                  {settings.email}
                </a>{" "}
                to see, correct or delete the details on file.
              </>
            ) : (
              "Write to the team to see, correct or delete the details we hold."
            )}
          </LegalAsideCard>
        }
      />

      <ImageCta
        imageUrl={settings.hero_image_url || undefined}
        title="One email is enough to change or remove them."
        description="We confirm what is on file, action the request, and tell you when it is done. Leaving the newsletter does not touch an enquiry you already have with us."
        href="/contact"
        ctaLabel="Contact us"
        secondary={{ label: "Read the terms", href: "/terms" }}
        phone={settings.phone || undefined}
      />
    </main>
  );
}
