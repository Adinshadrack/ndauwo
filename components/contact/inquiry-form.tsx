"use client";

import { useEffect, useState } from "react";
import { createInquiry } from "@/lib/api/inquiries";
import {
  inquirySchema,
  type InquiryFormValues,
} from "@/lib/validations/inquiry";

interface TourOption {
  id: number;
  name: string;
  slug: string;
}

interface InquiryFormProps {
  tours: TourOption[];
  selectedTourSlug?: string;
}

const initialValues: InquiryFormValues = {
  name: "",
  email: "",
  phone: "",
  travelers: 1,
  preferred_date: "",
  experience: "",
  message: "",
  tour_id: null,
};

export function InquiryForm({
  tours,
  selectedTourSlug,
}: InquiryFormProps) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (!selectedTourSlug) return;

    const selectedTour = tours.find(
      (tour) => tour.slug === selectedTourSlug
    );

    if (selectedTour) {
      setValues((current) => ({
        ...current,
        tour_id: selectedTour.id,
      }));
    }
  }, [selectedTourSlug, tours]);

  function updateField<K extends keyof InquiryFormValues>(
    field: K,
    value: InquiryFormValues[K]
  ) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: "",
    }));

    setServerError("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSuccess(false);
    setServerError("");

    const result = inquirySchema.safeParse(values);

    if (!result.success) {
      const nextErrors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0];

        if (typeof field === "string" && !nextErrors[field]) {
          nextErrors[field] = issue.message;
        }
      });

      setErrors(nextErrors);
      return;
    }

    try {
      setSubmitting(true);

      await createInquiry(result.data);

      setSuccess(true);
      setValues(initialValues);
      setErrors({});

      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full border-b border-black/15 bg-transparent px-0 py-4 text-sm text-[#11110F] outline-none transition-colors placeholder:text-black/30 focus:border-[#F67A05]";

  const labelClass =
    "mb-1 block text-[0.65rem] font-medium uppercase tracking-[0.16em] text-black/40";

  return (
    <div className="w-full">
      {success ? (
        <div className="border-y border-black/10 py-16 sm:py-20">
          <div className="max-w-xl">
            <div className="flex h-12 w-12 items-center justify-center border border-[#F67A05] text-[#C52A0E]">
              ✓
            </div>

            <p className="eyebrow mt-8 text-[#C52A0E]">
              Inquiry received
            </p>

            <h2 className="font-display mt-4 text-4xl leading-[1] tracking-[-0.025em] sm:text-5xl">
              Thank you.
            </h2>

            <p className="mt-6 max-w-lg text-base leading-8 text-black/55">
              Your safari inquiry has been received. Our team will review
              your request and get back to you shortly.
            </p>

            <button
              type="button"
              onClick={() => setSuccess(false)}
              className="group mt-8 inline-flex items-center gap-3 border-b border-black/25 pb-2 text-xs font-medium uppercase tracking-[0.16em] text-[#11110F] transition-colors hover:border-[#C52A0E] hover:text-[#C52A0E]"
            >
              Send another inquiry
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            {/* FORM INTRO */}
            <div className="mb-10 border-b border-black/10 pb-7">
              <div className="flex items-center justify-between gap-5">
                <p className="eyebrow text-[#F67A05]">
                  Your journey
                </p>

                <span className="text-[0.6rem] uppercase tracking-[0.16em] text-black/30">
                  Safari inquiry
                </span>
              </div>

              <h2 className="font-display mt-5 text-3xl leading-[1] tracking-[-0.025em] sm:text-4xl">
                Tell us about your trip.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-black/50">
                Share a few details and our team will help you shape the
                right safari experience.
              </p>
            </div>

            {/* SERVER ERROR */}
            {serverError && (
              <div
                role="alert"
                className="mb-8 border-l-2 border-red-600 bg-red-50 px-5 py-4 text-sm leading-6 text-red-700"
              >
                {serverError}
              </div>
            )}

            <div className="space-y-9">
              {/* NAME */}
              <div>
                <label
                  htmlFor="inquiry-name"
                  className={labelClass}
                >
                  Full name
                </label>

                <input
                  id="inquiry-name"
                  type="text"
                  value={values.name}
                  onChange={(event) =>
                    updateField("name", event.target.value)
                  }
                  placeholder="Your full name"
                  className={inputClass}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={
                    errors.name ? "inquiry-name-error" : undefined
                  }
                />

                {errors.name && (
                  <p
                    id="inquiry-name-error"
                    className="mt-2 text-xs text-red-600"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              {/* EMAIL + PHONE */}
              <div className="grid gap-9 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="inquiry-email"
                    className={labelClass}
                  >
                    Email address
                  </label>

                  <input
                    id="inquiry-email"
                    type="email"
                    value={values.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    placeholder="you@example.com"
                    className={inputClass}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? "inquiry-email-error" : undefined
                    }
                  />

                  {errors.email && (
                    <p
                      id="inquiry-email-error"
                      className="mt-2 text-xs text-red-600"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="inquiry-phone"
                    className={labelClass}
                  >
                    Phone / WhatsApp
                  </label>

                  <input
                    id="inquiry-phone"
                    type="tel"
                    value={values.phone}
                    onChange={(event) =>
                      updateField("phone", event.target.value)
                    }
                    placeholder="+255 ..."
                    className={inputClass}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={
                      errors.phone ? "inquiry-phone-error" : undefined
                    }
                  />

                  {errors.phone && (
                    <p
                      id="inquiry-phone-error"
                      className="mt-2 text-xs text-red-600"
                    >
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* TOUR + TRAVELERS */}
              <div className="grid gap-9 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="inquiry-tour"
                    className={labelClass}
                  >
                    Safari package
                  </label>

                  <select
                    id="inquiry-tour"
                    value={values.tour_id ?? ""}
                    onChange={(event) =>
                      updateField(
                        "tour_id",
                        event.target.value
                          ? Number(event.target.value)
                          : null
                      )
                    }
                    className={`${inputClass} cursor-pointer`}
                  >
                    <option value="">I&apos;m not sure yet</option>

                    {tours.map((tour) => (
                      <option key={tour.id} value={tour.id}>
                        {tour.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="inquiry-travelers"
                    className={labelClass}
                  >
                    Number of travelers
                  </label>

                  <input
                    id="inquiry-travelers"
                    type="number"
                    min={1}
                    max={100}
                    value={values.travelers}
                    onChange={(event) =>
                      updateField(
                        "travelers",
                        Number(event.target.value)
                      )
                    }
                    className={inputClass}
                    aria-invalid={Boolean(errors.travelers)}
                    aria-describedby={
                      errors.travelers
                        ? "inquiry-travelers-error"
                        : undefined
                    }
                  />

                  {errors.travelers && (
                    <p
                      id="inquiry-travelers-error"
                      className="mt-2 text-xs text-red-600"
                    >
                      {errors.travelers}
                    </p>
                  )}
                </div>
              </div>

              {/* DATE + EXPERIENCE */}
              <div className="grid gap-9 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="inquiry-date"
                    className={labelClass}
                  >
                    Preferred travel date
                  </label>

                  <input
                    id="inquiry-date"
                    type="date"
                    value={values.preferred_date}
                    onChange={(event) =>
                      updateField(
                        "preferred_date",
                        event.target.value
                      )
                    }
                    className={`${inputClass} cursor-pointer`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="inquiry-experience"
                    className={labelClass}
                  >
                    Experience type
                  </label>

                  <select
                    id="inquiry-experience"
                    value={values.experience}
                    onChange={(event) =>
                      updateField(
                        "experience",
                        event.target.value
                      )
                    }
                    className={`${inputClass} cursor-pointer`}
                  >
                    <option value="">
                      Select an experience
                    </option>
                    <option value="Wildlife Safari">
                      Wildlife Safari
                    </option>
                    <option value="Big Five Safari">
                      Big Five Safari
                    </option>
                    <option value="Family Safari">
                      Family Safari
                    </option>
                    <option value="Luxury Safari">
                      Luxury Safari
                    </option>
                    <option value="Budget Safari">
                      Budget Safari
                    </option>
                    <option value="Cultural Experience">
                      Cultural Experience
                    </option>
                    <option value="Beach & Safari">
                      Beach & Safari
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* MESSAGE */}
              <div>
                <label
                  htmlFor="inquiry-message"
                  className={labelClass}
                >
                  Tell us about your plans
                </label>

                <textarea
                  id="inquiry-message"
                  rows={6}
                  value={values.message}
                  onChange={(event) =>
                    updateField("message", event.target.value)
                  }
                  placeholder="Tell us what kind of safari you're looking for, your interests, preferred dates, budget, or anything else you'd like us to know..."
                  className={`${inputClass} resize-none`}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message
                      ? "inquiry-message-error"
                      : undefined
                  }
                />

                {errors.message && (
                  <p
                    id="inquiry-message-error"
                    className="mt-2 text-xs text-red-600"
                  >
                    {errors.message}
                  </p>
                )}
              </div>
            </div>

            {/* SUBMIT */}
            <div className="mt-10  pt-7">
              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex w-full items-center justify-center gap-3 bg-[#F67A05] px-7 py-4 text-xs font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#C52A0E] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Sending inquiry..." : "Send safari inquiry"}

                {!submitting && (
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                )}
              </button>

              <p className="mt-4 text-center text-xs leading-6 text-black/35">
                No payment is required at this stage. Our team will contact
                you to discuss your safari.
              </p>
            </div>
          </form>
        </>
      )}
    </div>
  );
}