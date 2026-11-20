import { getTours } from "@/lib/api/tours";
import { getDestinations } from "@/lib/api/destinations";
import { getTestimonials } from "@/lib/api/testimonials";
import { getSiteSettings } from "@/lib/api/settings";
import { getFAQs } from "@/lib/api/faqs";

import { Hero } from "@/components/home/hero";
import { MeetTheTeam } from "@/components/home/meet-the-team";
import { FeaturedTours } from "@/components/home/featured-tours";
import { Destinations } from "@/components/home/destinations";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { Testimonials } from "@/components/home/testimonials";
import { HomeCTA } from "@/components/home/home-cta";
import { FAQs } from "@/components/home/faqs";

export default async function HomePage() {
  const [tours, destinations, testimonials, settings, faqs] = await Promise.all([
    getTours(),
    getDestinations(),
    getTestimonials(),
    getSiteSettings(),
    getFAQs(),
  ]);

  const featuredTours = tours.filter((tour) => tour.is_featured);

  return (
    <>
      <Hero settings={settings} tours={tours} />
      <MeetTheTeam />
      <FeaturedTours tours={featuredTours.length ? featuredTours : tours} />
      <Destinations destinations={destinations} tours={tours} />
      <WhyChooseUs />
      <Testimonials testimonials={testimonials} />
      <HomeCTA settings={settings} />
      <FAQs faqs={faqs} />
    </>
  );
}
