"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type FormStatus = "idle" | "submitting" | "success" | "error";

const inputClassName =
  "h-10 w-full border border-transparent bg-white px-3 font-[family-name:var(--font-secondary)] text-[13px] text-[#11110F] outline-none transition-colors placeholder:text-[#8A8780] focus:border-[#F67A05] aria-invalid:border-[#C52A0E]";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");

  const isSubmitting = status === "submitting";
  const isInvalidEmail = status === "error" && !EMAIL_PATTERN.test(email.trim());

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setStatus("error");
      setFeedback("Enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          firstName: firstName.trim(),
        }),
      });

      const data = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        throw new Error(
          data?.message || "We could not add you to the list. Please try again."
        );
      }

      setStatus("success");
      setFeedback("You're on the list. Safari updates are on the way.");
      setEmail("");
      setFirstName("");
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error && error.message
          ? error.message
          : "We could not add you to the list. Please try again."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2" noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        name="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          if (status === "error") setStatus("idle");
        }}
        placeholder="Email"
        autoComplete="email"
        inputMode="email"
        required
        aria-invalid={isInvalidEmail}
        aria-describedby="newsletter-feedback"
        disabled={isSubmitting}
        className={inputClassName}
      />

      <div className="flex gap-2">
        <label htmlFor="newsletter-first-name" className="sr-only">
          First name
        </label>
        <input
          id="newsletter-first-name"
          type="text"
          name="firstName"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          placeholder="First Name"
          autoComplete="given-name"
          disabled={isSubmitting}
          className={inputClassName}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="group flex h-10 shrink-0 items-center justify-center gap-1.5 bg-[#F67A05] px-4 font-[family-name:var(--font-primary)] text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#C52A0E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F67A05] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
              <span>Sending</span>
            </>
          ) : (
            <>
              <span>Sign Up</span>
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </>
          )}
        </button>
      </div>

      <p
        id="newsletter-feedback"
        role="status"
        aria-live="polite"
        className={`min-h-[1rem] text-left text-[11px] leading-relaxed transition-opacity ${
          status === "success"
            ? "flex items-center gap-1 text-[#8FD3A6]"
            : status === "error"
              ? "text-[#F3A08E]"
              : "text-transparent"
        }`}
      >
        {status === "success" && (
          <Check className="h-3 w-3 shrink-0" aria-hidden="true" />
        )}
        {feedback || "Newsletter status"}
      </p>
    </form>
  );
}
