export type {
  Tour,
  TourDestination,
  TourItineraryItem,
} from "@/types/tour";

export interface Destination {
  id: number;

  name: string;
  slug: string;

  description: string;
  image_url: string;

  region: string;

  is_published: boolean;
}

export interface BlogPost {
  id: number;

  title: string;
  slug: string;

  content: string;
  excerpt: string;

  featured_image: string;

  category: string;
  author: string;

  seo_title: string;
  seo_description: string;

  is_published: boolean;

  published_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Testimonial {
  id: number;

  name: string;
  content: string;
  rating: number;

  is_published?: boolean;
  created_at?: string;
}

export interface FAQ {
  id: number;

  question: string;
  answer: string;

  is_published?: boolean;
  order: number;
}

export interface InquiryPayload {
  tenant: string;
  name: string;
  email?: string;
  phone?: string;
  tour_id?: number | null;
  travelers?: number | null;
  preferred_date?: string | null;
  experience?: string;
  message: string;
}

export interface GalleryImage {
  id: number;
  title: string;
  image_url: string;
  alt_text: string;
  is_published?: boolean;
  order: number;
  created_at?: string;
}


export interface SiteSettings {
  tagline: string;
  about: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  google_maps_url: string;
  facebook_url: string;
  instagram_url: string;
  website_url: string;
  logo_url: string;
  hero_image_url: string;
}