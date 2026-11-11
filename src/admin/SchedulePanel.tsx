import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Save } from "lucide-react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { SCHEDULE } from "../data/content";

const WEEKDAYS = [
  { day: "Segunda", short: "Seg" },
  { day: "Terça", short: "Ter" },
  { day: "Quarta", short: "Qua" },
  { day: "Quinta", short: "Qui" },
  { day: "Sexta", short: "Sex" },
  { day: "Sábado", short: "Sáb" },
  { day: "Domingo", short: "Dom" },
] as const;

type Row = { slots: string; note: string };
type Rows = Record<string, Row>;
type DayLike = { day: string; slots: readonly string[]; note?: string };

function buildRows(days: readonly DayLike[]): Rows {
  const byDay = new Map(days.map((d) => [d.day, d]));
  const rows: Rows = {};
  for (const w of WEEKDAYS) {
    const existing = byDay.get(w.day);
    rows[w.day] = { slots: existing?.slots.join(", ") ?? "", note: existing?.note ?? "" };
  }
  return rows;
}

export function SchedulePanel() {
  const [rows, setRows] = useState<Rows>(() => buildRows(SCHEDULE));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!db) return;
    getDoc(doc(db, "config", "schedule")).then((snap) => {
      const data = snap.data();
      if (Array.isArray(data?.days) && data.days.length > 0) {
        setRows(buildRows(data.days as DayLike[]));
      }
    });
  }, []);

  const setRow = (day: string, patch: Partial<Row>) => setRows((r) => ({ ...r, [day]: { ...r[day], ...patch } }));

  const onSave = async () => {
    if (!db) return;
    setSaving(true);
    setSaved(false);
    const days = WEEKDAYS.map((w) => ({
      day: w.day,
      short: w.short,
      slots: rows[w.day].slots
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      ...(rows[w.day].note.trim() ? { note: rows[w.day].note.trim() } : {}),
    }));
    await setDoc(doc(db, "config", "schedule"), { days });
    setSaving(false);
    setSaved(true);
  };

  return (
    <div>
      <h2 className="display text-3xl">Horários da semana</h2>
      <p className="mt-2 text-[var(--muted)]">
        Liste os horários de cada dia separados por vírgula (ex.: 6h, 17h, 18h). Deixe em branco os dias sem aula.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {WEEKDAYS.map((w) => (
          <div key={w.day} className="rounded-2xl border-2 border-[var(--line)] bg-white p-4">
            <p className="display text-xl">{w.day}</p>
            <label htmlFor={`slots-${w.day}`} className="mb-1.5 mt-3 block text-sm font-semibold">
              Horários
            </label>
            <input
              id={`slots-${w.day}`}
              className="field"
              placeholder="Ex.: 6h, 17h, 18h"
              value={rows[w.day]?.slots ?? ""}
              onChange={(e) => setRow(w.day, { slots: e.target.value })}
            />
            <label htmlFor={`note-${w.day}`} className="mb-1.5 mt-3 block text-sm font-semibold">
              Observação (opcional)
            </label>
            <input
              id={`note-${w.day}`}
              className="field"
              placeholder="Ex.: Uma vez ao mês"
              value={rows[w.day]?.note ?? ""}
              onChange={(e) => setRow(w.day, { note: e.target.value })}
            />
          </div>
        ))}
      </div>

      <button type="button" onClick={onSave} disabled={saving} className="btn btn-primary mt-6">
        {saving ? <Loader2 className="animate-spin" size={20} aria-hidden="true" /> : <Save size={20} aria-hidden="true" />}
        Salvar horários
      </button>
      {saved && (
        <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-[#0b6f2a]">
          <CheckCircle2 size={16} aria-hidden="true" />
          Horários atualizados no site.
        </p>
      )}
    </div>
  );
}
