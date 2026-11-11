import { useState } from "react";
import { AlertCircle, Loader2, Lock } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ADMIN_EMAIL, auth } from "../lib/firebase";

export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, ADMIN_EMAIL, password);
    } catch {
      setError("Senha incorreta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-[var(--bg)] p-6">
      <form onSubmit={onSubmit} noValidate className="w-full max-w-sm rounded-[2rem] bg-white p-8 shadow-2xl">
        <div className="mb-6 grid h-14 w-14 place-items-center rounded-full bg-navy-950 text-white">
          <Lock aria-hidden="true" />
        </div>
        <h1 className="display text-3xl">Área da administração</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">Digite a senha de acesso para gerenciar o site.</p>

        <label htmlFor="admin-password" className="mb-1.5 mt-6 block font-semibold">
          Senha
        </label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="field"
          aria-invalid={!!error}
          aria-describedby={error ? "admin-login-error" : undefined}
        />
        {error && (
          <p id="admin-login-error" className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-[#b71c1c]">
            <AlertCircle size={16} aria-hidden="true" />
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} className="btn btn-primary mt-6 w-full">
          {loading ? <Loader2 className="animate-spin" size={20} aria-hidden="true" /> : <Lock size={20} aria-hidden="true" />}
          Entrar
        </button>
      </form>
    </div>
  );
}
