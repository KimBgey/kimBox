"use client";

import { useState } from "react";
import Link from "next/link";

const SOCIALS = [
  { label: "LinkedIn", href: "#" },
  { label: "Behance", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "WhatsApp", href: "#" },
  { label: "Email", href: "mailto:andrekimgbaguidi01@gmail.com" },
];

type FormData = { name: string; email: string; type: string; message: string };

export default function ContactSection({ available = true }: { available?: boolean }) {
  const [form, setFormData] = useState<FormData>({ name: "", email: "", type: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData(f => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setSent(true);
    setLoading(false);
  }

  return (
    <section id="contact" className="bg-[var(--color-cream)] py-24 md:py-32 px-5 md:px-10 lg:px-20">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-20">
        <div>
          <p className="section-label mb-3">06 — Contact</p>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-dark)]">
            Travaillons ensemble
          </h2>
        </div>
        {/* Badge disponibilité */}
        <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border ${
          available
            ? "border-green-200 bg-green-50 text-green-700"
            : "border-orange-200 bg-orange-50 text-orange-700"
        }`}>
          <span className={`w-2 h-2 rounded-full animate-pulse ${available ? "bg-green-500" : "bg-orange-400"}`} />
          {available ? "Disponible pour de nouveaux projets" : "Actuellement occupé — bientôt libre"}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-start">

        {/* Formulaire */}
        {!sent ? (
          <form onSubmit={submit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="section-label">Nom</label>
                <input
                  required
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-sm outline-none focus:border-[var(--color-red)] transition-colors placeholder:text-[#aaa]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="section-label">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="votre@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-sm outline-none focus:border-[var(--color-red)] transition-colors placeholder:text-[#aaa]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="section-label">Type de projet</label>
              <select
                required
                value={form.type}
                onChange={set("type")}
                className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-sm outline-none focus:border-[var(--color-red)] transition-colors text-[var(--color-dark)] appearance-none cursor-pointer"
              >
                <option value="" disabled>Choisir...</option>
                <option>Design uniquement</option>
                <option>Développement uniquement</option>
                <option>Design + Développement</option>
                <option>Autre</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="section-label">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={set("message")}
                placeholder="Décrivez votre projet, vos besoins, votre délai..."
                className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-sm outline-none focus:border-[var(--color-red)] transition-colors resize-none placeholder:text-[#aaa]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="self-start inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--color-dark)] text-white text-sm font-semibold transition-opacity hover:opacity-80 disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Envoi…" : "Envoyer le message"}
              {!loading && (
                <svg width="12" height="12" viewBox="0 0 13 13" fill="none"><path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              )}
            </button>
          </form>
        ) : (
          <div className="flex flex-col gap-4 py-12">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10l4.5 4.5L16 6" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="font-display text-2xl text-[var(--color-dark)]">Message reçu !</h3>
            <p className="text-[#555] text-sm leading-relaxed max-w-sm">
              Je reviendrai vers vous sous 24h. En attendant, consultez mes projets.
            </p>
          </div>
        )}

        {/* Réseaux */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="section-label mb-4">Réseaux</p>
            <div className="flex flex-col gap-2">
              {SOCIALS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  className="group flex items-center justify-between px-5 py-3.5 rounded-xl border border-black/8 bg-white text-sm font-medium text-[var(--color-dark)] no-underline hover:border-[var(--color-red)]/40 transition-colors"
                >
                  {label}
                  <svg width="12" height="12" viewBox="0 0 13 13" fill="none" className="opacity-30 group-hover:opacity-100 transition-opacity">
                    <path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Email direct */}
          <div className="rounded-xl bg-[var(--color-dark)] p-5 text-white">
            <p className="section-label text-white/40 mb-2">Email direct</p>
            <a href="mailto:andrekimgbaguidi01@gmail.com" className="text-sm font-medium text-white/80 hover:text-white transition-colors break-all no-underline">
              andrekimgbaguidi01@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
