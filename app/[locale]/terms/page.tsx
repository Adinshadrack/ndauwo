import type { Metadata } from "next";

import {
  LegalAsideCard,
  LegalDocument,
  type LegalSection,
} from "@/components/legal/legal-document";
import { PageHero } from "@/components/ui/page-hero";
import { SectionCta } from "@/components/ui/section-cta";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the terms and conditions governing safari inquiries, bookings, payments, cancellations, and travel with Ndauwo Safaris.",
};

const termsSections: readonly LegalSection[] = [
  {
    id: "general",
    title: "General terms",
    paragraphs: [
      "These Terms and Conditions apply to safari inquiries, reservations, bookings and travel arrangements made with Ndauwo Safaris.",
      "By requesting or confirming a safari with us, you acknowledge that you have read, understood and agreed to these terms.",
      "Safari itineraries, accommodation, transportation and activities may vary depending on availability, weather, park regulations and other circumstances beyond our reasonable control.",
    ],
  },
  {
    id: "booking",
    title: "Safari inquiries & booking confirmation",
    paragraphs: [
      "Submitting an inquiry through our website does not automatically constitute a confirmed booking.",
      "A booking becomes confirmed only after Ndauwo Safaris has confirmed the arrangements and any required deposit or payment has been received.",
      "Safari prices and availability may change before a booking is confirmed. We will communicate any applicable changes before requesting confirmation.",
    ],
  },
  {
    id: "payments",
    title: "Prices & payments",
    paragraphs: [
      "Safari prices will be communicated to the client as part of the quotation or booking process.",
      "Any deposit, balance or payment deadline applicable to a booking will be communicated before the booking is confirmed.",
      "Certain costs may not be included in the quoted safari price. These can include personal expenses, international flights, visas, travel insurance, tips and other items specifically excluded from the itinerary.",
      "Clients are responsible for ensuring that payments are made using the agreed payment method and within the applicable deadlines.",
    ],
  },
  {
    id: "cancellation",
    title: "Cancellation & changes",
    paragraphs: [
      "Cancellation and amendment conditions may vary depending on the safari, accommodation providers, park fees, transport arrangements and other suppliers involved in the booking.",
      "Any applicable cancellation charges or non-refundable amounts will be communicated to the client as part of the booking terms.",
      "Requests to change travel dates, accommodation, activities or other arrangements are subject to availability and may result in additional charges.",
      "We recommend that all travellers obtain appropriate travel insurance that covers cancellation, medical emergencies, delays and other unexpected travel circumstances.",
    ],
  },
  {
    id: "itineraries",
    title: "Safari itineraries",
    paragraphs: [
      "We make reasonable efforts to operate safaris according to the agreed itinerary. However, safari conditions can change due to weather, wildlife movements, road conditions, park regulations, safety considerations or other circumstances.",
      "Ndauwo Safaris reserves the right to make reasonable changes to an itinerary where necessary for operational, environmental or safety reasons.",
      "Any significant changes will be communicated to the client where reasonably possible.",
    ],
  },
  {
    id: "responsibilities",
    title: "Traveller responsibilities",
    paragraphs: [
      "Travellers are responsible for providing accurate information required for their safari arrangements, including names, travel dates and other relevant details.",
      "Travellers are responsible for carrying valid passports, visas, permits, travel documents and any other documentation required for their journey.",
      "Travellers should obtain appropriate travel and medical insurance before travelling.",
      "Guests are expected to follow reasonable instructions from guides, park authorities, accommodation providers and other service providers, particularly where necessary for safety.",
    ],
  },
  {
    id: "health",
    title: "Health & safety",
    paragraphs: [
      "Safari travel involves outdoor activities and environments that may present inherent risks, including wildlife, uneven terrain, weather conditions and remote locations.",
      "Travellers should consider their personal health, fitness, medical requirements and any vaccinations or health precautions recommended for their destination.",
      "Travellers should inform Ndauwo Safaris of any relevant requirements that may affect the safe operation of their safari.",
    ],
  },
  {
    id: "liability",
    title: "Liability",
    paragraphs: [
      "Ndauwo Safaris will take reasonable care in arranging the services included in a confirmed safari.",
      "However, we cannot be responsible for circumstances beyond our reasonable control, including extreme weather, natural events, government restrictions, park closures, delays, illness, accidents, airline disruptions or actions of independent third-party suppliers.",
      "Nothing in these terms is intended to exclude or limit any liability that cannot lawfully be excluded or limited under applicable law.",
    ],
  },
  {
    id: "photography",
    title: "Photography & media",
    paragraphs: [
      "Ndauwo Safaris may use photographs and media created by our team for marketing purposes where appropriate.",
      "We will not intentionally use identifiable images of guests for promotional purposes where consent is required without obtaining the appropriate permission.",
    ],
  },
  {
    id: "law",
    title: "Applicable law & contact",
    paragraphs: [
      "These terms are intended to be interpreted in accordance with the laws applicable to Ndauwo Safaris and the services provided.",
      "If you have questions about these Terms and Conditions or about a specific safari booking, please contact us before making a payment or confirming your arrangements.",
    ],
  },
] as const;

export default function TermsPage() {
  return (
    <main className="bg-canvas">
      <PageHero
        eyebrow="Legal"
        title={
          <>
            Terms &<br />
            <span className="italic text-ember">conditions.</span>
          </>
        }
        description="Important information about inquiries, bookings, payments, cancellations and travelling with Ndauwo Safaris."
      />

      <LegalDocument
        sections={termsSections}
        updated="October 2026"
        crossLink={{ label: "Privacy policy", href: "/privacy" }}
        aside={
          <LegalAsideCard
            eyebrow="Before you book"
            title="Ask before you pay."
            action={{ label: "Contact the team", href: "/contact" }}
          >
            Read these terms before confirming a safari or making a payment, and
            put any question to us first. We answer in writing.
          </LegalAsideCard>
        }
      />

      <SectionCta
        eyebrow="Before you confirm"
        title="A conversation clears the terms faster."
        description="Ask about deposits, dates and cancellations before anything is paid. The planner who would run your safari answers the question."
        primary={{ label: "Talk to the team", href: "/contact" }}
        secondary={{ label: "Read the privacy policy", href: "/privacy" }}
      />
    </main>
  );
}
