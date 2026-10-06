import { apiFetch, publicEndpoint } from "@/lib/api/client";

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

export async function createInquiry(
  data: InquiryPayload
): Promise<InquiryResponse> {
  return apiFetch<InquiryResponse>(publicEndpoint("inquiries"), {
    method: "POST",
    body: JSON.stringify(data),
  });
}