import { NextResponse } from "next/server";

import { subscribeToNewsletter } from "@/lib/api/newsletter";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface SubscribeBody {
  email?: unknown;
  firstName?: unknown;
}

export async function POST(request: Request) {
  let body: SubscribeBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Could not read the subscription request." },
      { status: 400 }
    );
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const firstName =
    typeof body.firstName === "string" ? body.firstName.trim() : "";

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { message: "Enter a valid email address." },
      { status: 400 }
    );
  }

  try {
    const result = await subscribeToNewsletter({ email, firstName });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : "We could not add you to the list right now. Please try again.";

    return NextResponse.json({ message }, { status: 502 });
  }
}
