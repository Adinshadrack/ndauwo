export interface Testimonial {
  id: number;
  name: string;
  content: string;
  rating: number;
  platform: 'tripadvisor' | 'google' | 'safaribookings' | 'direct';
  review_url?: string | null;
  reviewer_title?: string | null;
  avatar_url?: string | null;
  review_date?: string | null;
  is_published?: boolean;
  created_at?: string;
}