"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Service } from "@/lib/db/schema";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_SERVICES = [
  {
    title: "Identité & Branding",
    typeKey: "design",
    typeLabel: "Design",
    description: "Logo, charte graphique, motion design et supports print pour construire une image forte.",
  },
  {
    title: "UI / Maquette Figma",
    typeKey: "design",
    typeLabel: "Design",
    description: "Interfaces web et mobile pensées pour l'expérience utilisateur, livrées prêtes à intégrer.",
  },
  {
    title: "Site & Application Web",
    typeKey: "dev",
    typeLabel: "Développement",
    description: "Sites vitrines, landing pages et apps web performants avec Next.js et TypeScript.",
  },
  {
    title: "Bundle Studio",
    typeKey: "bundle",
    typeLabel: "Design + Dev",
    description: "Du brief à la mise en ligne : design, développement et suivi réunis en une seule mission.",
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Brief",
    desc: "On échange sur votre projet, vos objectifs et vos contraintes pour cadrer la mission.",
  },
  {
    num: "02",
    title: "Conception",
    desc: "Design et/ou développement itératif avec vos retours à chaque étape clé.",
  },
  {
    num: "03",
    title: "Livraison",
    desc: "Mise en ligne, fichiers sources et suivi post-lancement inclus dans chaque projet.",
  },
];

const ICONS: Record<string, React.ReactNode> = {
  design: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  ),
  dev: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  bundle: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
    </svg>
  ),
};

export default function ServicesSection({ dbServices }: { comeupUrl?: string; dbServices?: Service[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  const displayServices = dbServices && dbServices.length > 0
    ? dbServices.map(s => ({
        title: s.title,
        typeKey: s.type,
        typeLabel: s.type === "design" ? "Design" : s.type === "dev" ? "Développement" : "Design + Dev",
        description: s.description,
      }))
    : DEFAULT_SERVICES;

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context>;

    const init = () => {
      ctx = gsap.context(() => {
        gsap.from(".service-heading", {
          opacity: 0, y: 30, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".service-heading", start: "top 92%", once: true },
        });
        gsap.from(".services-grid", {
          opacity: 0, y: 28, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".services-grid", start: "top 88%", once: true },
        });
        gsap.from(".process-step", {
          opacity: 0, y: 28, duration: 0.6, stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger: ".process-block", start: "top 92%", once: true },
        });
        ScrollTrigger.refresh();
      }, sectionRef);
    };

    const timer = setTimeout(init, 50);
    return () => { clearTimeout(timer); ctx?.revert(); };
  }, []);

  return (
    <section ref={sectionRef} id="services" className="bg-[var(--color-cream)] py-16 md:py-24 px-5 md:px-10 lg:px-20 overflow-hidden">

      {/* ── Layout principal : titre à gauche + grille à droite ── */}
      <div className="service-heading grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 md:mb-20">

        {/* Colonne texte */}
        <div>
          <p className="section-label text-[var(--color-dark)]/40 mb-4">Services</p>
          <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] leading-[1.05] tracking-[-0.02em] text-[var(--color-dark)] mb-5">
            Ce que je fais<br />pour vous
          </h2>
          <p className="text-[0.9rem] text-[#888] leading-relaxed max-w-xs">
            J'accompagne les entreprises, entrepreneurs et porteurs de projets dans la création d'expériences digitales modernes. 
            De la conception visuelle au développement technique, chaque solution est pensée pour être esthétique, performante et adaptée à vos objectifs.
          </p>
        </div>

        {/* Grille 2×2 */}
        <div className="services-grid rounded-2xl overflow-hidden border border-black/[0.08] bg-white shadow-sm">
          <div className="grid grid-cols-2">
            {displayServices.map((s, i) => {
              const isDark = i === 0 || i === displayServices.length - 1;
              return (
              <a
                key={i}
                href="/#contact"
                className={`service-card group no-underline cursor-pointer flex flex-col gap-4 p-6 md:p-7 transition-all duration-200
                  ${i < 2 ? `border-b ${isDark ? "border-white/[0.08]" : "border-black/[0.07]"}` : ""}
                  ${i % 2 === 0 ? `border-r ${isDark ? "border-white/[0.08]" : "border-black/[0.07]"}` : ""}
                  ${isDark ? "bg-[var(--color-dark)] hover:bg-[#1e1e1e]" : "bg-white hover:bg-[var(--color-cream)]"}
                `}
              >
                {/* Icône */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  i === 0 || i === displayServices.length - 1
                    ? "bg-white/10 text-white"
                    : "bg-[var(--color-dark)] text-white group-hover:bg-[var(--color-red)] transition-colors duration-200"
                }`}>
                  {ICONS[s.typeKey] ?? ICONS.design}
                </div>

                {/* Texte */}
                <div className="flex-1">
                  <h3 className={`font-semibold text-[0.95rem] leading-snug mb-2 ${
                    i === 0 || i === displayServices.length - 1 ? "text-white" : "text-[var(--color-dark)]"
                  }`}>
                    {s.title}
                  </h3>
                  <p className={`text-[0.8rem] leading-relaxed line-clamp-3 ${
                    i === 0 || i === displayServices.length - 1 ? "text-white/45" : "text-[#999]"
                  }`}>
                    {s.description}
                  </p>
                </div>

                {/* Lien */}
                <div className={`flex items-center gap-1.5 text-[0.75rem] font-medium transition-colors
                  ${i === 0 || i === displayServices.length - 1
                    ? "text-white/35 group-hover:text-white"
                    : "text-[var(--color-dark)]/30 group-hover:text-[var(--color-red)]"}
                `}>
                  En savoir plus
                  <svg width="9" height="9" viewBox="0 0 13 13" fill="none" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </a>
            );
          })}
          </div>
        </div>
      </div>

      {/* ── Process ── */}
      <div className="process-block mt-16 md:mt-20 bg-[var(--color-dark)] rounded-2xl overflow-hidden">

        {/* Barre titre style terminal */}
        <div className="flex items-center justify-between px-7 md:px-10 py-5 border-b border-white/[0.06]">
          <p className="font-mono text-[0.6875rem] font-medium tracking-[0.14em] uppercase text-white/30">Comment je travaille</p>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-red)]/60" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">
          {PROCESS_STEPS.map((s, i) => (
            <div key={i} className="process-step relative flex flex-col gap-4 p-8 md:p-10 overflow-hidden">

              {/* Numéro décoratif en fond */}
              <span className="pointer-events-none select-none absolute -bottom-3 right-5 font-display text-[7rem] leading-none text-white/[0.03]">
                {s.num}
              </span>

              {/* Indicateur d'étape */}
              <div className="flex items-center gap-3 mb-1">
                <span className="flex items-center justify-center w-7 h-7 rounded-full border border-white/[0.12] shrink-0">
                  <span className="font-mono text-[0.58rem] text-white/30 leading-none">{s.num}</span>
                </span>
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden md:block flex-1 h-px bg-white/[0.05]" />
                )}
              </div>

              <h4 className="font-display text-[1.8rem] leading-none tracking-[-0.02em] text-white">
                {s.title}
              </h4>
              <p className="text-[0.84rem] text-white/35 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
