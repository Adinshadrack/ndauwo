import { NextResponse } from "next/server";

import { ApiError } from "@/lib/api/client";
import { createInquiry } from "@/lib/api/inquiries";
import { inquirySchema } from "@/lib/validations/inquiry";

/**
 * The contact form posts here, not to the API.
 *
 * A browser cannot post to the API cross-origin unless the origin is on the
 * API's CORS allowlist, which no preview deployment can be relied on to be —
 * a blocked preflight surfaces to the visitor as a bare "CORS error". Doing
 * the call server-side removes the browser from the equation: it only ever
 * talks to this site's own origin.
 */
export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Could not read the enquiry. Please try again." },
      { status: 400 }
    );
  }

  const parsed = inquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message:
          parsed.error.issues[0]?.message ??
          "Please check the form and try again.",
      },
      { status: 400 }
    );
  }

  try {
    const result = await createInquiry(parsed.data);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    // A rejection the visitor can act on keeps its own status; anything else
    // (the API being down, a bad gateway) is reported as upstream trouble.
    const status =
      error instanceof ApiError && error.status < 500 ? error.status : 502;

    return NextResponse.json(
      {
        message:
          error instanceof Error && error.message
            ? error.message
            : "We could not send your message right now. Please try again.",
      },
      { status }
    );
  }
}
