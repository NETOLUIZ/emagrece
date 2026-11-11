import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth, isFirebaseConfigured } from "../lib/firebase";
import { AdminLogin } from "./AdminLogin";
import { AdminDashboard } from "./AdminDashboard";

export function AdminApp() {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!auth) {
      setChecking(false);
      return;
    }
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setChecking(false);
    });
  }, []);

  if (!isFirebaseConfigured) {
    return (
      <div className="grid min-h-screen place-items-center bg-[var(--bg)] p-6 text-center">
        <div>
          <p className="eyebrow">Painel administrativo</p>
          <h1 className="display mt-3 text-4xl">Firebase ainda não configurado</h1>
          <p className="mt-4 max-w-md text-[var(--muted)]">
            Preencha o arquivo <code>.env</code> com as chaves do seu projeto Firebase (veja o README) para
            habilitar fotos, horários e agendamentos.
          </p>
        </div>
      </div>
    );
  }

  if (checking) {
    return <div className="grid min-h-screen place-items-center bg-[var(--bg)]" />;
  }

  return user ? <AdminDashboard /> : <AdminLogin />;
}
