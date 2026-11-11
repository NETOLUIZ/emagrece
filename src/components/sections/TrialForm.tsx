import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useSchedule } from "../../lib/liveContent";
import { hasWhatsappNumber, whatsappUrl } from "../../lib/whatsapp";
import { WhatsAppIcon } from "../ui/WhatsAppIcon";

type Values = { name: string; phone: string; time: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Informe seu nome.";
  const digits = v.phone.replace(/\D/g, "").replace(/^55(?=\d{10,11}$)/, "");
  if (!/^\d{10,11}$/.test(digits)) e.phone = "Informe o WhatsApp com DDD, por exemplo (85) 99999-9999.";
  if (!v.time) e.time = "Escolha o melhor horário.";
  if (v.message.length > 300) e.message = "Use no máximo 300 caracteres.";
  return e;
}

function maskPhone(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function TrialForm() {
  const schedule = useSchedule();
  const TIME_OPTIONS = [
    ...schedule.filter((d) => d.slots.length > 0).flatMap((d) => d.slots.map((s) => `${d.day}, ${s}`)),
    "Ainda não sei, quero ajuda para escolher",
  ];

  const [values, setValues] = useState<Values>({ name: "", phone: "", time: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "copied">("idle");

  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const val = k === "phone" ? maskPhone(e.target.value) : e.target.value;
    setValues((v) => ({ ...v, [k]: val }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`trial-${first}`)?.focus();
      return;
    }

    setStatus("sending");
    const text = [
      "Olá! Quero agendar minha aula experimental no Emagrece na Praia.",
      `Nome: ${values.name.trim()}`,
      `WhatsApp: ${values.phone}`,
      `Melhor horário: ${values.time}`,
      values.message.trim() ? `Mensagem: ${values.message.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    if (db) {
      try {
        await addDoc(collection(db, "bookings"), {
          name: values.name.trim(),
          phone: values.phone,
          time: values.time,
          message: values.message.trim(),
          status: "pending",
          createdAt: serverTimestamp(),
        });
      } catch {
        /* Se o Firestore falhar, o fluxo do WhatsApp abaixo continua funcionando normalmente. */
      }
    }

    if (hasWhatsappNumber()) {
      window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
      setStatus("done");
    } else {
      // Sem número configurado: abre o link oficial da bio e entrega a mensagem pronta para colar.
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        /* clipboard indisponível: o usuário ainda chega ao WhatsApp */
      }
      window.open(whatsappUrl(), "_blank", "noopener,noreferrer");
      setStatus("copied");
    }
  };

  return (
    <section id="aula-experimental" className="section theme-dark section-pad relative isolate overflow-hidden" aria-labelledby="aula-title">
      <div aria-hidden="true" className="absolute -right-24 top-10 -z-10 h-72 w-72 rounded-full bg-sky-500/25 blur-3xl" />
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p data-reveal="up" className="eyebrow">Aula experimental</p>
          <h2 id="aula-title" data-reveal="up" className="display mt-3 text-[clamp(2.6rem,5vw,4.5rem)]">
            Sua transformação começa com o <span className="highlight">primeiro passo.</span>
          </h2>
          <p data-reveal="up" className="mt-6 text-lg text-[var(--muted)]">
            Preencha em menos de um minuto e continue a conversa direto no WhatsApp da assessoria.
          </p>
          <p data-reveal="up" className="mt-4 text-sm text-[var(--muted)]">
            Seus dados vão para o WhatsApp da assessoria e ficam disponíveis só para a equipe, para confirmar seu horário.
          </p>
        </div>

        <form data-reveal="up" onSubmit={onSubmit} noValidate className="theme-light rounded-[2rem] bg-white p-6 text-navy-950 shadow-2xl sm:p-10 lg:col-span-7" aria-describedby="form-status">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="trial-name" className="mb-1.5 block font-semibold">Nome <span aria-hidden="true">*</span></label>
              <input id="trial-name" name="name" autoComplete="name" required value={values.name} onChange={set("name")} className="field" aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} />
              {errors.name && <p id="err-name" className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-[#b71c1c]"><AlertCircle size={16} aria-hidden="true" />{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="trial-phone" className="mb-1.5 block font-semibold">WhatsApp <span aria-hidden="true">*</span></label>
              <input id="trial-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel-national" required placeholder="(85) 99999-9999" value={values.phone} onChange={set("phone")} className="field" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "err-phone" : undefined} />
              {errors.phone && <p id="err-phone" className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-[#b71c1c]"><AlertCircle size={16} aria-hidden="true" />{errors.phone}</p>}
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="trial-time" className="mb-1.5 block font-semibold">Melhor horário para treinar <span aria-hidden="true">*</span></label>
            <select id="trial-time" name="time" required value={values.time} onChange={set("time")} className="field" aria-invalid={!!errors.time} aria-describedby={errors.time ? "err-time" : undefined}>
              <option value="">Selecione…</option>
              {TIME_OPTIONS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            {errors.time && <p id="err-time" className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-[#b71c1c]"><AlertCircle size={16} aria-hidden="true" />{errors.time}</p>}
          </div>

          <div className="mt-5">
            <label htmlFor="trial-message" className="mb-1.5 block font-semibold">Mensagem <span className="font-normal text-[var(--muted)]">(opcional)</span></label>
            <textarea id="trial-message" name="message" rows={3} maxLength={300} value={values.message} onChange={set("message")} className="field" aria-invalid={!!errors.message} />
          </div>

          <button type="submit" disabled={status === "sending"} className="btn btn-primary mt-7 w-full">
            {status === "sending" ? <Loader2 className="animate-spin" size={22} aria-hidden="true" /> : <WhatsAppIcon />}
            Agendar minha aula experimental
          </button>

          <div id="form-status" role="status" aria-live="polite" className="mt-4 min-h-6 text-sm font-semibold">
            {status === "done" && (
              <p className="flex items-start gap-2 text-[#0b6f2a]"><CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden="true" />Abrimos o WhatsApp com a sua mensagem. É só enviar!</p>
            )}
            {status === "copied" && (
              <p className="flex items-start gap-2 text-[#0b6f2a]"><CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden="true" />Abrimos o WhatsApp da assessoria. Sua mensagem foi copiada: é só colar e enviar.</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
