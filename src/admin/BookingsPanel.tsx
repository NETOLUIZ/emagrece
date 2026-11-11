import { useEffect, useMemo, useState } from "react";
import { CalendarCheck, CheckCircle2, Circle, ExternalLink } from "lucide-react";
import { collection, doc, onSnapshot, orderBy, query, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

type Booking = {
  id: string;
  name: string;
  phone: string;
  time: string;
  message: string;
  status: "pending" | "contacted";
  createdAt: Timestamp | null;
};

function formatDate(ts: Booking["createdAt"]) {
  if (!ts) return "—";
  return ts.toDate().toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" });
}

function toIsoDate(ts: Booking["createdAt"]) {
  if (!ts) return "";
  const d = ts.toDate();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function BookingsPanel() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [timeFilter, setTimeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snap) => {
      setBookings(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Booking, "id">) })));
    });
  }, []);

  const timeOptions = useMemo(() => Array.from(new Set(bookings.map((b) => b.time))).sort(), [bookings]);

  const filtered = bookings.filter((b) => {
    if (timeFilter && b.time !== timeFilter) return false;
    if (dateFilter && toIsoDate(b.createdAt) !== dateFilter) return false;
    return true;
  });

  const toggleStatus = async (b: Booking) => {
    if (!db) return;
    await updateDoc(doc(db, "bookings", b.id), { status: b.status === "pending" ? "contacted" : "pending" });
  };

  return (
    <div>
      <h2 className="display text-3xl">Agendamentos</h2>
      <p className="mt-2 text-[var(--muted)]">Pedidos de aula experimental enviados pelo site.</p>

      <div className="mt-6 flex flex-wrap items-end gap-4">
        <div>
          <label htmlFor="filter-time" className="mb-1.5 block text-sm font-semibold">
            Horário
          </label>
          <select id="filter-time" className="field" value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
            <option value="">Todos os horários</option>
            {timeOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="filter-date" className="mb-1.5 block text-sm font-semibold">
            Data do pedido
          </label>
          <input id="filter-date" type="date" className="field" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
        </div>
        {(timeFilter || dateFilter) && (
          <button
            type="button"
            onClick={() => {
              setTimeFilter("");
              setDateFilter("");
            }}
            className="btn btn-ghost"
          >
            Limpar filtros
          </button>
        )}
      </div>

      <ul className="mt-6 flex flex-col gap-3">
        {filtered.map((b) => (
          <li key={b.id} className="flex flex-col gap-3 rounded-2xl border-2 border-[var(--line)] bg-white p-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-lg font-bold">{b.name}</p>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-bold uppercase ${
                    b.status === "contacted" ? "bg-teal-500/15 text-[#0b6f7a]" : "bg-sun-400/25 text-[#8a6300]"
                  }`}
                >
                  {b.status === "contacted" ? "Contatado" : "Pendente"}
                </span>
              </div>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {formatDate(b.createdAt)} · Horário: {b.time}
              </p>
              <a
                href={`https://wa.me/55${b.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-sm font-semibold"
                style={{ color: "#0b6f7a" }}
              >
                {b.phone}
                <ExternalLink size={14} aria-hidden="true" />
              </a>
              {b.message && <p className="mt-2 text-sm">{b.message}</p>}
            </div>
            <button type="button" onClick={() => toggleStatus(b)} className="btn btn-ghost shrink-0">
              {b.status === "contacted" ? <Circle size={18} aria-hidden="true" /> : <CheckCircle2 size={18} aria-hidden="true" />}
              {b.status === "contacted" ? "Marcar pendente" : "Marcar contatado"}
            </button>
          </li>
        ))}
      </ul>
      {filtered.length === 0 && (
        <p className="mt-6 flex items-center gap-2 text-[var(--muted)]">
          <CalendarCheck size={18} aria-hidden="true" />
          Nenhum agendamento encontrado.
        </p>
      )}
    </div>
  );
}
