"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
  { label: "LinkedIn", href: "#" },
  { label: "Behance", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "WhatsApp", href: "#" },
];

type FormData = { name: string; email: string; type: string; message: string };

export default function ContactSection({ available = true }: { available?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setFormData] = useState<FormData>({ name: "", email: "", type: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context>;

    const init = () => {
      ctx = gsap.context(() => {
        gsap.from(".contact-label", {
          opacity: 0, y: 16, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-label", start: "top 92%", once: true },
        });
        gsap.from(".contact-line", {
          opacity: 0, y: 40,
          duration: 0.85, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-title", start: "top 92%", once: true },
        });
        gsap.from(".contact-badge", {
          opacity: 0, y: 16, duration: 0.55, ease: "power2.out",
          scrollTrigger: { trigger: ".contact-badge", start: "top 92%", once: true },
        });
        gsap.from(".contact-desc", {
          opacity: 0, y: 14, duration: 0.55, ease: "power2.out",
          scrollTrigger: { trigger: ".contact-desc", start: "top 92%", once: true },
        });
        gsap.from(".contact-social-item", {
          opacity: 0, x: -16, duration: 0.45, stagger: 0.07, ease: "power2.out",
          scrollTrigger: { trigger: ".contact-socials", start: "top 92%", once: true },
        });
        gsap.from(".contact-form-card", {
          opacity: 0, y: 44, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-form-card", start: "top 92%", once: true },
        });
ScrollTrigger.refresh();
      }, sectionRef);
    };

    const timer = setTimeout(init, 50);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, []);

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData(f => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setSent(true);
    setLoading(false);
  }

  return (
    <section ref={sectionRef} id="contact" className="bg-[var(--color-dark)] py-16 md:py-24 px-5 md:px-10 lg:px-20 overflow-hidden">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20 md:mb-28">

        {/* Left — Heading + infos */}
        <div className="flex flex-col justify-between gap-10">
          <div>
            <p className="contact-label section-label text-white/25 mb-6">Contact</p>

            {/* Big typographic title */}
            <div className="contact-title mb-8">
              <h2 className="contact-line font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.9] tracking-[-0.025em] text-white">
                Travaillons
              </h2>
              <h2 className="contact-line font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.9] tracking-[-0.025em] text-[var(--color-red)]">
                ensemble.
              </h2>
            </div>

            {/* Availability */}
            <div className={`contact-badge inline-flex items-center gap-2 px-4 py-2 rounded-full text-[0.72rem] font-medium border mb-7 ${
              available
                ? "border-green-500/25 bg-green-500/8 text-green-400"
                : "border-orange-400/25 bg-orange-400/8 text-orange-300"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${available ? "bg-green-400" : "bg-orange-300"}`} />
              {available ? "Disponible pour de nouveaux projets" : "Actuellement occupé — bientôt libre"}
            </div>

            <p className="contact-desc text-[0.875rem] text-white/35 leading-relaxed max-w-[280px]">
              Vous avez un projet ? Décrivez-le moi et je reviens vers vous sous 24h.
            </p>
          </div>

          {/* Socials */}
          <div className="contact-socials">
            <p className="section-label text-white/20 mb-4">Réseaux & contact direct</p>
            <div className="flex flex-wrap gap-2">
              {SOCIALS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  className="contact-social-item inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.09] text-[0.75rem] font-medium text-white/45 no-underline hover:border-white/25 hover:text-white/80 transition-all duration-200 cursor-pointer"
                >
                  {label}
                  <svg width="9" height="9" viewBox="0 0 13 13" fill="none">
                    <path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              ))}
              <a
                href="mailto:andrekimgbaguidi01@gmail.com"
                className="contact-social-item inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-red)]/30 text-[0.75rem] font-medium text-[var(--color-red)]/80 no-underline hover:bg-[var(--color-red)] hover:text-white hover:border-[var(--color-red)] transition-all duration-200 cursor-pointer"
              >
                andrekimgbaguidi01@gmail.com
                <svg width="9" height="9" viewBox="0 0 13 13" fill="none">
                  <path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right — Form card */}
        <div className="contact-form-card rounded-2xl p-7 md:p-9 border border-white/[0.07] bg-white/[0.03]">
          {!sent ? (
            <form onSubmit={submit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[0.62rem] font-semibold uppercase tracking-widest text-white/25">Nom</label>
                  <input
                    required
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Votre nom"
                    className="w-full px-4 py-3 rounded-xl border border-white/[0.09] bg-white/[0.04] text-white text-sm outline-none focus:border-[var(--color-red)]/50 transition-colors placeholder:text-white/15"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[0.62rem] font-semibold uppercase tracking-widest text-white/25">Email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="votre@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-white/[0.09] bg-white/[0.04] text-white text-sm outline-none focus:border-[var(--color-red)]/50 transition-colors placeholder:text-white/15"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[0.62rem] font-semibold uppercase tracking-widest text-white/25">Type de projet</label>
                <select
                  required
                  aria-label="Type de projet"
                  value={form.type}
                  onChange={set("type")}
                  className="select-dark w-full px-4 py-3 rounded-xl border border-white/[0.09] bg-white/[0.04] text-white text-sm outline-none focus:border-[var(--color-red)]/50 transition-colors appearance-none cursor-pointer"
                >
                  <option value="" disabled>Choisir...</option>
                  <option>Design uniquement</option>
                  <option>Développement uniquement</option>
                  <option>Design + Développement</option>
                  <option>Autre</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[0.62rem] font-semibold uppercase tracking-widest text-white/25">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Décrivez votre projet, vos besoins, votre délai..."
                  className="w-full px-4 py-3 rounded-xl border border-white/[0.09] bg-white/[0.04] text-white text-sm outline-none focus:border-[var(--color-red)]/50 transition-colors resize-none placeholder:text-white/15"
                />
              </div>

              <div className="flex items-center justify-between mt-1">
                <p className="text-[0.72rem] text-white/20">Réponse sous 24h garantie</p>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[var(--color-red)] text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity cursor-pointer"
                >
                  {loading ? "Envoi…" : "Envoyer"}
                  {!loading && (
                    <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
                      <path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center gap-5 py-14 text-center">
              <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div>
                <p className="font-display text-2xl text-white mb-2">Message reçu !</p>
                <p className="text-sm text-white/35 leading-relaxed max-w-[240px] mx-auto">
                  Je reviendrai vers vous sous 24h. En attendant, consultez mes projets.
                </p>
              </div>
              <button
                type="button"
                onClick={() => { setSent(false); setFormData({ name: "", email: "", type: "", message: "" }); }}
                className="text-[0.75rem] text-[var(--color-red)] font-medium cursor-pointer bg-transparent border-none hover:opacity-70 transition-opacity"
              >
                Envoyer un autre message →
              </button>
            </div>
          )}
        </div>
      </div>


    </section>
  );
}
