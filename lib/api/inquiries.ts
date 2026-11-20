import { apiFetch, TENANT_SLUG } from "@/lib/api/client";

export interface InquiryPayload {
  name: string;
  email: string;
  phone: string;
  tour_id?: number | null;
  travelers: number;
  preferred_date?: string;
  experience?: string;
  message: string;
}

export interface InquiryResponse {
  id: number;
  message?: string;
}

/**
 * Files an enquiry against this site's tenant.
 *
 * Used from the inquiries route handler, so the browser posts to the site's own
 * origin instead of the API cross-origin. The API reads the tenant from the
 * body rather than the path: `POST /api/v1/inquiries/public`.
 */
export async function createInquiry(
  data: InquiryPayload
): Promise<InquiryResponse> {
  const preferredDate = data.preferred_date?.trim();
  const experience = data.experience?.trim();

  return apiFetch<InquiryResponse>("/api/v1/inquiries/public", {
    method: "POST",
    body: JSON.stringify({
      tenant: TENANT_SLUG,

      name: data.name,
      email: data.email,
      phone: data.phone,

      tour_id: data.tour_id ?? null,
      travelers: data.travelers,

      // A date field cannot store "" — an empty optional date has to be null,
      // otherwise the API fails while writing the record.
      preferred_date: preferredDate ? preferredDate : null,

      experience: experience ?? "",
      message: data.message,
    }),
  });
}
