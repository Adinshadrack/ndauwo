import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { cn } from "@/lib/utils";

interface ContactRow {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  icon: "phone" | "mail" | "chat" | "pin";
}

const icons = {
  phone: Phone,
  mail: Mail,
  chat: MessageCircle,
  pin: MapPin,
} as const;

interface ContactDetailsProps {
  phone?: string;
  email?: string;
  whatsappUrl?: string;
  address?: string;
  className?: string;
}

/**
 * Left half of the contact card: the four ways to reach the office, each behind
 * a solid disc. Rows are dropped when the setting is empty rather than printed
 * with a placeholder.
 */
export function ContactDetails({
  phone,
  email,
  whatsappUrl,
  address,
  className,
}: ContactDetailsProps) {
  const rows = (
    [
      address
        ? { label: "Head office", value: address, icon: "pin" }
        : null,
      email
        ? {
            label: "Email us",
            value: email,
            href: `mailto:${email}`,
            icon: "mail",
          }
        : null,
      phone
        ? {
            label: "Call us",
            value: phone,
            href: `tel:${phone.replace(/\s/g, "")}`,
            icon: "phone",
          }
        : null,
      whatsappUrl
        ? {
            label: "WhatsApp",
            value: "Message the team directly",
            href: whatsappUrl,
            external: true,
            icon: "chat",
          }
        : null,
    ] as Array<ContactRow | null>
  ).filter((row): row is ContactRow => row !== null);

  return (
    <div className={cn("min-w-0", className)}>
      <h2 className="text-[1.375rem] font-extrabold leading-tight tracking-[-0.02em] text-ink sm:text-[1.5rem]">
        Get in touch
      </h2>

      <p className="mt-2.5 max-w-[38ch] text-[0.84375rem] leading-[1.75] text-ink-muted">
        Questions about a route, a date or a quotation? Reach the office on any
        of these, and the reply comes from the team that plans the safaris.
      </p>

      <ul className="mt-7 space-y-5">
        {rows.map((row) => {
          const Icon = icons[row.icon];

          const body = (
            <>
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-ember text-white shadow-[0_10px_20px_-12px_rgba(246,122,5,0.9)]">
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} aria-hidden="true" />
              </span>

              <span className="min-w-0">
                <span className="block text-[0.875rem] font-bold leading-none text-ink">
                  {row.label}
                </span>

                <span className="mt-1.5 block break-words text-[0.8125rem] leading-[1.7] text-ink-muted transition-colors group-hover:text-ink">
                  {row.value}
                </span>
              </span>
            </>
          );

          return (
            <li key={row.label}>
              {row.href ? (
                <a
                  href={row.href}
                  target={row.external ? "_blank" : undefined}
                  rel={row.external ? "noopener noreferrer" : undefined}
                  className="group flex items-start gap-4"
                >
                  {body}
                </a>
              ) : (
                <div className="group flex items-start gap-4">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
