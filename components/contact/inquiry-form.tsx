"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Check, ChevronDown } from "lucide-react";

import { CtaButton } from "@/components/ui/cta";
import { createInquiry } from "@/lib/api/inquiries";
import {
  inquirySchema,
  type InquiryFormValues,
} from "@/lib/validations/inquiry";
import { cn } from "@/lib/utils";

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

/* Filled, borderless fields on the card's white ground. */
const fieldClass =
  "w-full rounded-lg bg-field px-3.5 py-3 text-[0.84375rem] text-ink outline-none transition-shadow placeholder:text-ink-soft focus:ring-2 focus:ring-ember/30 aria-invalid:ring-2 aria-invalid:ring-clay/45";

const selectClass = cn(fieldClass, "appearance-none pr-10");

const labelClass = "mb-1.5 block text-[0.8125rem] font-semibold text-ink";

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

function Field({ id, label, error, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>

      {children}

      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[0.6875rem] text-clay">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectChevron() {
  return (
    <ChevronDown
      aria-hidden="true"
      className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
      strokeWidth={1.8}
    />
  );
}

export function InquiryForm({ tours, selectedTourSlug }: InquiryFormProps) {
  // A deep link (?tour=slug) seeds the form once, instead of syncing in an effect.
  const [values, setValues] = useState<InquiryFormValues>(() => {
    const preselected = selectedTourSlug
      ? tours.find((tour) => tour.slug === selectedTourSlug)
      : undefined;

    return preselected
      ? { ...initialValues, tour_id: preselected.id }
      : initialValues;
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  function updateField<K extends keyof InquiryFormValues>(
    field: K,
    value: InquiryFormValues[K]
  ) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
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

      formRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
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

  if (success) {
    return (
      <motion.div
        ref={formRef}
        role="status"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl bg-field px-6 py-10 text-center"
      >
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ember text-white">
          <Check className="h-5 w-5" strokeWidth={2.4} aria-hidden="true" />
        </span>

        <h3 className="mt-5 text-[1.125rem] font-extrabold tracking-[-0.02em] text-ink">
          Message received
        </h3>

        <p className="mx-auto mt-2 max-w-sm text-[0.8125rem] leading-[1.75] text-ink-muted">
          The team will reply with a route and a quotation. No payment is needed
          at this stage.
        </p>

        <CtaButton
          shape="pill"
          variant="dark"
          className="mt-6"
          onClick={() => setSuccess(false)}
        >
          Send another message
        </CtaButton>
      </motion.div>
    );
  }

  return (
    <div ref={formRef}>
      <form onSubmit={handleSubmit} noValidate>
        {serverError && (
          <div
            role="alert"
            className="mb-5 rounded-lg border-l-2 border-clay bg-clay/10 px-4 py-3 text-[0.8125rem] leading-relaxed text-clay"
          >
            {serverError}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="inquiry-name" label="Name" error={errors.name}>
            <input
              id="inquiry-name"
              type="text"
              value={values.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Your full name"
              autoComplete="name"
              className={fieldClass}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "inquiry-name-error" : undefined}
            />
          </Field>

          <Field id="inquiry-email" label="Email" error={errors.email}>
            <input
              id="inquiry-email"
              type="email"
              value={values.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className={fieldClass}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "inquiry-email-error" : undefined}
            />
          </Field>

          <Field id="inquiry-phone" label="Phone" error={errors.phone}>
            <input
              id="inquiry-phone"
              type="tel"
              value={values.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              placeholder="+255 ..."
              autoComplete="tel"
              className={fieldClass}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "inquiry-phone-error" : undefined}
            />
          </Field>

          <Field
            id="inquiry-experience"
            label="Service you're interested in"
            error={errors.experience}
          >
            <div className="relative">
              <select
                id="inquiry-experience"
                value={values.experience}
                onChange={(event) =>
                  updateField("experience", event.target.value)
                }
                className={cn(selectClass, "text-ink-muted")}
                aria-invalid={Boolean(errors.experience)}
                aria-describedby={
                  errors.experience ? "inquiry-experience-error" : undefined
                }
              >
                <option value="">Choose an option</option>
                <option value="Wildlife Safari">Wildlife Safari</option>
                <option value="Big Five Safari">Big Five Safari</option>
                <option value="Family Safari">Family Safari</option>
                <option value="Luxury Safari">Luxury Safari</option>
                <option value="Budget Safari">Budget Safari</option>
                <option value="Cultural Experience">Cultural Experience</option>
                <option value="Beach & Safari">Beach &amp; Safari</option>
                <option value="Other">Other</option>
              </select>

              <SelectChevron />
            </div>
          </Field>

          <Field
            id="inquiry-tour"
            label="Safari package"
            className="sm:col-span-2"
          >
            <div className="relative">
              <select
                id="inquiry-tour"
                value={values.tour_id ?? ""}
                onChange={(event) =>
                  updateField(
                    "tour_id",
                    event.target.value ? Number(event.target.value) : null
                  )
                }
                className={cn(selectClass, "text-ink-muted")}
              >
                <option value="">Optional — pick a programme</option>

                {tours.map((tour) => (
                  <option key={tour.id} value={tour.id}>
                    {tour.name}
                  </option>
                ))}
              </select>

              <SelectChevron />
            </div>
          </Field>

          <Field
            id="inquiry-travelers"
            label="Travelers"
            error={errors.travelers}
          >
            <input
              id="inquiry-travelers"
              type="number"
              min={1}
              max={100}
              value={values.travelers}
              onChange={(event) =>
                updateField("travelers", Number(event.target.value))
              }
              className={fieldClass}
              aria-invalid={Boolean(errors.travelers)}
              aria-describedby={
                errors.travelers ? "inquiry-travelers-error" : undefined
              }
            />
          </Field>

          <Field id="inquiry-date" label="Preferred date">
            <input
              id="inquiry-date"
              type="date"
              value={values.preferred_date}
              onChange={(event) =>
                updateField("preferred_date", event.target.value)
              }
              className={cn(fieldClass, "cursor-pointer text-ink-muted")}
            />
          </Field>

          <Field
            id="inquiry-message"
            label="Message"
            error={errors.message}
            className="sm:col-span-2"
          >
            <textarea
              id="inquiry-message"
              rows={5}
              value={values.message}
              onChange={(event) => updateField("message", event.target.value)}
              placeholder="Where you want to go, how many days you have, and anything the trip needs to include."
              className={cn(fieldClass, "resize-none")}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={
                errors.message ? "inquiry-message-error" : undefined
              }
            />
          </Field>
        </div>

        <CtaButton
          type="submit"
          shape="pill"
          size="lg"
          className="mt-5 w-full"
          disabled={submitting}
          arrow={!submitting}
        >
          {submitting ? "Sending..." : "Send message"}
        </CtaButton>

        <p className="mt-3 text-center text-[0.6875rem] leading-relaxed text-ink-soft">
          No payment is required at this stage. Replies come within one working
          day.
        </p>
      </form>
    </div>
  );
}
