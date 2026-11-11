import { SITE } from "../data/content";

/** Monta o link do WhatsApp. Sem número configurado, usa o link oficial da bio. */
export function whatsappUrl(message?: string): string {
  if (SITE.whatsappNumber && message) {
    return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }
  if (SITE.whatsappNumber) return `https://wa.me/${SITE.whatsappNumber}`;
  return SITE.whatsappLink;
}

export const hasWhatsappNumber = () => Boolean(SITE.whatsappNumber);
