"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface LoginFormProps {
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  error: string;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

function LoginForm({ email, setEmail, password, setPassword, error, loading, onSubmit }: LoginFormProps) {
  return (
    <div className="w-full max-w-[360px] mx-auto">
      <div className="flex items-center gap-3 mb-10">
        <Image src="/images/Fichier 1.png" alt="André Kim" width={34} height={34} className="object-contain" />
        <div>
          <p className="font-display text-xl text-[var(--color-dark)] leading-none">
            André Kim<span className="text-[var(--color-red)]">.</span>
          </p>
          <p className="text-[0.65rem] text-[#aaa] mt-0.5 tracking-widest uppercase">Panel admin</p>
        </div>
      </div>

      <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.2rem)] text-[var(--color-dark)] leading-tight mb-1">
        Connexion
      </h2>
      <p className="text-[0.82rem] text-[#999] mb-7">Accès réservé à André Kim.</p>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="section-label">Email</label>
          <input
            type="email" required value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="andrekimgbaguidi01@gmail.com"
            className="w-full px-4 py-2.5 border border-black/15 rounded-xl text-sm bg-white outline-none focus:border-[var(--color-red)] transition-colors [cursor:auto] placeholder:text-[#ccc]"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="section-label">Mot de passe</label>
          <input
            type="password" required value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-2.5 border border-black/15 rounded-xl text-sm bg-white outline-none focus:border-[var(--color-red)] transition-colors [cursor:auto]"
          />
        </div>

        {error && (
          <p className="text-[0.8125rem] text-[var(--color-red)] flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {error}
          </p>
        )}

        <button
          type="submit" disabled={loading}
          className="mt-1 py-3 rounded-xl bg-[var(--color-dark)] text-white text-sm font-semibold transition-opacity hover:opacity-80 disabled:opacity-50 [cursor:pointer]"
        >
          {loading ? "Connexion…" : "Se connecter →"}
        </button>
      </form>

      <p className="text-[0.68rem] text-[#ccc] mt-8 text-center">
        © {new Date().getFullYear()} André Kim — Tous droits réservés.
      </p>
    </div>
  );
}

export default function LoginPage() {
  const router   = useRouter();
  const [revealed, setRevealed] = useState(false);
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await signIn("credentials", { email: email.trim(), password, redirect: false });
    if (result?.error) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden [cursor:auto]">

      {/* ═══════════════════════════════════════════════════════
          PANEL IMAGE — plein écran par défaut, se rétrécit à droite
          sur desktop quand revealed. Toujours plein écran sur mobile.
      ═══════════════════════════════════════════════════════ */}
      <div
        className={`absolute inset-0 bg-[var(--color-dark)] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${revealed ? "left-[54%]" : "left-0"}`}
      >
        <Image
          src="/images/clown.jpg" alt="André Kim" fill priority
          className="object-cover object-center opacity-50"
        />
        {/* gradient bas */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)]/90 via-[var(--color-dark)]/20 to-transparent" />
        {/* Cercle rouge */}
        <div className="absolute -bottom-[15%] left-1/2 -translate-x-1/2 w-[60%]  opacity-70 blur-[1px]" />

        {/* Contenu bas — trigger */}
        <div className="absolute bottom-10 left-8 right-8">
          <p className="font-display text-[clamp(1.8rem,4vw,3rem)] text-white leading-[1.05] mb-6">
            Design. Code.<br/>
            <span className="text-[var(--color-red)]">Create.</span>
          </p>

          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="group flex items-center gap-3 [cursor:pointer] bg-transparent border-none p-0"
          >
            <div className="flex items-center gap-2.5">
              <Image src="/images/Fichier 3.png" alt="" width={28} height={28} className="object-contain opacity-50 group-hover:opacity-80 transition-opacity" />
              <span className="text-white/40 text-[0.82rem] group-hover:text-white/70 transition-colors">
                André Kim — Designer &amp; Développeur
              </span>
            </div>
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className="text-white/20 group-hover:text-[var(--color-red)] transition-colors -rotate-90 lg:rotate-0"
            >
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          PANEL FORMULAIRE — desktop: slide depuis la gauche
                             mobile: bottom sheet slide depuis le bas
      ═══════════════════════════════════════════════════════ */}

      {/* Desktop form panel */}
      <div
        className={`hidden lg:flex absolute inset-y-0 left-0 w-[54%] bg-[var(--color-cream)] flex-col justify-center px-14 xl:px-20 py-12 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${revealed ? "translate-x-0 opacity-100 pointer-events-auto" : "-translate-x-full opacity-0 pointer-events-none"}`}
      >
        <LoginForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} error={error} loading={loading} onSubmit={handleSubmit} />
      </div>

      {/* Mobile bottom sheet */}
      <div
        className={`lg:hidden fixed inset-x-0 bottom-0 z-20 bg-[var(--color-cream)] rounded-t-3xl px-7 py-8 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-2xl ${revealed ? "translate-y-0" : "translate-y-full"}`}
      >
        {/* Handle bar */}
        <div className="w-10 h-1 rounded-full bg-black/15 mx-auto mb-8" />
        <LoginForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} error={error} loading={loading} onSubmit={handleSubmit} />
      </div>

      {/* Overlay mobile (ferme la sheet si on clique en dehors) */}
      {revealed && (
        <button
          type="button"
          onClick={() => setRevealed(false)}
          className="lg:hidden fixed inset-0 z-10 bg-transparent border-none"
          aria-label="Fermer"
        />
      )}
    </div>
  );
}
