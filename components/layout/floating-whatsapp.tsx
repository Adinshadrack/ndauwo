
import type { SiteSettings } from "@/types/api";

interface FloatingWhatsAppProps {
  settings: Pick<SiteSettings, "whatsapp">;
}

export function FloatingWhatsApp({
  settings,
}: FloatingWhatsAppProps) {
  const phone = settings.whatsapp?.replace(/\D/g, "");

  if (!phone) return null;

  const whatsappUrl = `https://wa.me/${phone}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Ndauwo Safaris on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-all duration-300 hover:scale-105 hover:bg-[#20BD5A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366] sm:bottom-6 sm:right-6"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-[22px] w-[22px] fill-current"
      >
        <path d="M20.52 3.48A11.84 11.84 0 0 0 12.07 0C5.54 0 .22 5.32.22 11.85c0 2.09.55 4.13 1.59 5.93L.12 24l6.36-1.67a11.82 11.82 0 0 0 5.58 1.42h.01c6.53 0 11.85-5.32 11.85-11.85 0-3.17-1.23-6.15-3.4-8.42ZM12.07 21.75h-.01a9.84 9.84 0 0 1-5.02-1.37l-.36-.21-3.78.99 1.01-3.69-.23-.38a9.84 9.84 0 0 1-1.51-5.24c0-5.43 4.42-9.85 9.86-9.85a9.79 9.79 0 0 1 6.97 2.89 9.79 9.79 0 0 1 2.88 6.97c0 5.43-4.42 9.85-9.81 9.85Zm5.41-7.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.51-1.79-1.69-2.09-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.11 3.22 5.11 4.52.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
      </svg>

      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap border border-black/10 bg-[#FCFAF4] px-3 py-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[#11110F] opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100 sm:block">
        Chat on WhatsApp
      </span>
    </a>
  );
}

