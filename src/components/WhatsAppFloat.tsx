import { whatsappUrl } from "../lib/whatsapp";
import { WhatsAppIcon } from "./ui/WhatsAppIcon";

/** Botão flutuante: respeita safe-area e fica fora da área de leitura no mobile. */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl("Olá! Vim pelo site e quero saber mais sobre o Emagrece na Praia.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com o Emagrece na Praia no WhatsApp (abre em nova aba)"
      className="fixed z-40 grid h-14 w-14 place-items-center rounded-full bg-sun-400 text-navy-950 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.55)] transition-transform duration-150 hover:scale-105 active:scale-95"
      style={{
        right: "max(1rem, env(safe-area-inset-right))",
        bottom: "max(1rem, env(safe-area-inset-bottom))",
      }}
    >
      <WhatsAppIcon size={26} />
    </a>
  );
}
