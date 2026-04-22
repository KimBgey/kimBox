"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email: email.trim(),
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-cream)] [cursor:auto] px-5">
      <div className="w-full max-w-[360px]">

        <div className="flex items-center gap-3 mb-8">
          <Image src="/images/Fichier 1.png" alt="André Kim" width={32} height={32} className="object-contain" />
          <div>
            <h1 className="font-display text-2xl text-[var(--color-dark)] leading-none">
              André Kim<span className="text-[var(--color-red)]">.</span>
            </h1>
            <p className="text-[0.75rem] text-[#888] mt-0.5">Panel admin</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="section-label">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="andrekimgbaguidi01@gmail.com"
              className="w-full px-4 py-2.5 border border-black/15 rounded-lg text-sm bg-white outline-none focus:border-[var(--color-red)] transition-colors [cursor:auto] placeholder:text-[#bbb]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="section-label">Mot de passe</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-black/15 rounded-lg text-sm bg-white outline-none focus:border-[var(--color-red)] transition-colors [cursor:auto]"
            />
          </div>

          {error && <p className="text-[0.8125rem] text-[var(--color-red)]">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 py-2.5 rounded-lg bg-[var(--color-red)] text-white text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-60 [cursor:pointer]"
          >
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>

      </div>
    </div>
  );
}
