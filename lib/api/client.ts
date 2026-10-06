const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const TENANT_SLUG =
  process.env.NEXT_PUBLIC_TENANT_SLUG || "ndauwo-safaris";

type ApiOptions = RequestInit & {
  next?: {
    revalidate?: number;
    tags?: string[];
  };
};

export async function apiFetch<T>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> {
  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...options.headers,
      },
    },
  );

  if (!response.ok) {
    let message = `API request failed: ${response.status}`;

    try {
      const error = await response.json();

      if (error?.detail) {
        message = error.detail;
      }
    } catch {
      // Keep default message.
    }

    throw new Error(message);
  }

  return response.json();
}

export function publicEndpoint(
  resource: string,
  path = "",
) {
  return `/api/v1/public/${TENANT_SLUG}/${resource}${path}`;
}

export {
  API_URL,
  TENANT_SLUG,
};