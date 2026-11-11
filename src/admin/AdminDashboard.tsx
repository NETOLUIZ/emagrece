import { useState } from "react";
import { CalendarCheck, Clock, Images, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { PhotosPanel } from "./PhotosPanel";
import { SchedulePanel } from "./SchedulePanel";
import { BookingsPanel } from "./BookingsPanel";

const TABS = [
  { id: "agendamentos", label: "Agendamentos", icon: CalendarCheck },
  { id: "fotos", label: "Fotos", icon: Images },
  { id: "horarios", label: "Horários", icon: Clock },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function AdminDashboard() {
  const [tab, setTab] = useState<TabId>("agendamentos");

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <header className="flex items-center justify-between border-b-2 border-[var(--line)] bg-white px-6 py-4">
        <div>
          <p className="eyebrow">Emagrece na Praia</p>
          <h1 className="display text-2xl">Administração</h1>
        </div>
        <button type="button" onClick={() => auth && signOut(auth)} className="btn btn-ghost">
          <LogOut size={18} aria-hidden="true" />
          Sair
        </button>
      </header>

      <nav className="flex gap-2 overflow-x-auto border-b-2 border-[var(--line)] bg-white px-6 py-3">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            aria-current={tab === t.id ? "page" : undefined}
            className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 font-semibold transition-colors ${
              tab === t.id ? "bg-navy-950 text-white" : "text-[var(--muted)] hover:bg-sand-100"
            }`}
          >
            <t.icon size={18} aria-hidden="true" />
            {t.label}
          </button>
        ))}
      </nav>

      <main className="container-x py-8">
        {tab === "agendamentos" && <BookingsPanel />}
        {tab === "fotos" && <PhotosPanel />}
        {tab === "horarios" && <SchedulePanel />}
      </main>
    </div>
  );
}
