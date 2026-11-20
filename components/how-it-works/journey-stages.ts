import {
  CalendarCheck,
  FileText,
  Luggage,
  MessageSquare,
  PlaneLanding,
  Route,
  type LucideIcon,
} from "lucide-react";

export interface JourneyStage {
  id: string;
  title: string;
  /** What happens at this stage, in the planner's words. */
  body: string;
  /** One line tying the photograph to the stage. */
  note: string;
  action: { label: string; href: string };
  icon: LucideIcon;
}

/**
 * The booking journey, in the order it actually happens. Nothing is paid on the
 * site, so the deposit only appears once the quotation has been read.
 */
export const journeyStages: readonly JourneyStage[] = [
  {
    id: "enquiry",
    title: "Send an enquiry",
    body: "Tell us the dates you have, how many are travelling and the parks you want to see. If you have already looked at one of our safaris, send its name or a link.",
    note: "Your dates, party size and the parks you are considering.",
    action: { label: "Send an enquiry", href: "/contact" },
    icon: MessageSquare,
  },
  {
    id: "programme",
    title: "We build the programme",
    body: "A planner replies with the day-by-day route: the parks, the lodges or camps, the driving days and what each day includes.",
    note: "The route we propose, with the lodges and the driving days.",
    action: { label: "See the safari programmes", href: "/tours" },
    icon: Route,
  },
  {
    id: "quotation",
    title: "Review the quotation",
    body: "The price comes per person, with what is included and what is not. Ask for changes and the route is adjusted until it fits.",
    note: "The quotation per person and anything the price does not cover.",
    action: { label: "Read the booking terms", href: "/terms" },
    icon: FileText,
  },
  {
    id: "confirm",
    title: "Confirm the booking",
    body: "You accept the terms and pay the deposit stated in the quotation. Dates and lodges are held once that payment is confirmed.",
    note: "Your place on the dates, once the deposit is confirmed.",
    action: { label: "Talk to the team", href: "/contact" },
    icon: CalendarCheck,
  },
  {
    id: "prepare",
    title: "Prepare for departure",
    body: "We send the meeting point in Arusha, your arrival details and a packing list, and answer questions on visas, health and luggage.",
    note: "Meeting point, packing list and answers before you fly.",
    action: { label: "Read the questions we get", href: "/faq" },
    icon: Luggage,
  },
  {
    id: "travel",
    title: "Travel, then go home",
    body: "Your guide meets you at the start of the programme, drives the route and drops you back at the end. Write to us afterwards if anything is left open.",
    note: "The guided programme, and the follow-up after you land home.",
    action: { label: "Read guest reviews", href: "/reviews" },
    icon: PlaneLanding,
  },
] as const;

/** What the team needs before it can write an accurate programme. */
export const enquiryNeeds: readonly string[] = [
  "Travel dates, or the month you are aiming for",
  "How many travellers and their ages",
  "The parks or animals you most want to see",
  "A rough budget per person, and how you would like to stay",
];

/** What comes back in the first written reply. */
export const firstReply: readonly string[] = [
  "A day-by-day programme with the driving days marked",
  "Lodges or camps named, with the room basis",
  "The price per person, and what it does not cover",
  "Deposit and cancellation terms in writing",
];
