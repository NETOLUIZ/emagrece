import { MessageCircle } from "lucide-react";

/** Ícone de conversa (Lucide) para CTAs de WhatsApp: mesmo traço dos demais ícones. */
export function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return <MessageCircle size={size} strokeWidth={2} aria-hidden="true" />;
}
