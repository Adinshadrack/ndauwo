import { apiFetch, publicEndpoint } from "@/lib/api/client";

export interface NewsletterSubscriptionPayload {
  email: string;
  firstName?: string;
}

export interface NewsletterSubscriptionResult {
  message: string;
  created: boolean;
  reactivated: boolean;
}

/**
 * Adds an email address to the tenant's newsletter list.
 *
 * Used from the newsletter route handler so the browser talks to the site's
 * own origin instead of the API cross-origin.
 */
export async function subscribeToNewsletter(
  payload: NewsletterSubscriptionPayload
): Promise<NewsletterSubscriptionResult> {
  return apiFetch<NewsletterSubscriptionResult>(publicEndpoint("subscribe"), {
    method: "POST",
    body: JSON.stringify({
      email: payload.email,
      first_name: payload.firstName ?? "",
    }),
  });
}
