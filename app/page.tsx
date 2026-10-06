import { getTours } from "@/lib/api/tours";
import { getDestinations } from "@/lib/api/destinations";
import { getTestimonials } from "@/lib/api/testimonials";
import { getGallery } from "@/lib/api/gallery";
import { getBlogPosts } from "@/lib/api/blog";
import { getSiteSettings } from "@/lib/api/settings";

import { Hero } from "@/components/home/hero";
import { FeaturedTours } from "@/components/home/featured-tours";
import { Destinations } from "@/components/home/destinations";
import { AboutPreview } from "@/components/home/about-preview";
import { Experiences } from "@/components/home/experiences";
import { Testimonials } from "@/components/home/testimonials";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { BlogPreview } from "@/components/home/blog-preview";
import { HomeCTA } from "@/components/home/home-cta";

export default async function HomePage() {
  const [
    tours,
    destinations,
    testimonials,
    gallery,
    blogPosts,
    settings,
  ] = await Promise.all([
    getTours(),
    getDestinations(),
    getTestimonials(),
    getGallery(),
    getBlogPosts(),
    getSiteSettings(),
  ]);

  const featuredTours = tours.filter((tour) => tour.is_featured);

  return (
    <>
      <Hero settings={settings} />

      <FeaturedTours tours={featuredTours.length ? featuredTours : tours} />

      <Destinations destinations={destinations} />

      <AboutPreview settings={settings} />

      <Experiences />

      <Testimonials testimonials={testimonials} />

      <GalleryPreview images={gallery} />

      <BlogPreview posts={blogPosts} />

      <HomeCTA settings={settings} />
    </>
  );
}