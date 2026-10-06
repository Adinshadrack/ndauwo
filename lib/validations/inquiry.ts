import { z } from "zod";

export const inquirySchema = z.object({
  name: z
    .string()
    .min(2, "Please enter your full name")
    .max(100, "Name is too long"),

  email: z
    .string()
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .min(7, "Please enter a valid phone number")
    .max(30, "Phone number is too long"),

  travelers: z
    .number()
    .int()
    .min(1, "At least one traveler is required")
    .max(100, "Please enter a valid number of travelers"),

  preferred_date: z.string().optional(),

  experience: z.string().max(100).optional(),

  message: z
    .string()
    .min(10, "Please tell us a little about your trip")
    .max(2000, "Message is too long"),

  tour_id: z.number().nullable().optional(),
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;