"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "50+", label: "Projets livrés" },
  { value: "30+", label: "Clients satisfaits" },
  { value: "10", label: "Années d'expérience" },
];

const designSkills = ["UI / UX Design", "Branding & Logo", "Motion Design", "Maquettage Figma", "Photoshop / Illustrator", "After Effects"];
const devSkills = ["Next.js / React", "TypeScript", "Node.js / API REST", "PostgreSQL", "Tailwind CSS", "Framer Motion"];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Manifeste — reveal ligne par ligne
      gsap.from(".manifeste-line", {
        opacity: 0, yPercent: 100,
        duration: 0.9, stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".manifeste-block", start: "top 75%", once: true },
      });

      // Stats — compteur
      document.querySelectorAll<HTMLElement>(".stat-num").forEach((el) => {
        const target = parseInt(el.dataset.target ?? "0");
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to({ val: 0 }, {
              val: target, duration: 1.6, ease: "power2.out",
              onUpdate() { el.textContent = Math.round((this as gsap.core.Tween).targets()[0].val) + (el.dataset.suffix ?? ""); },
            });
          },
        });
      });

      // Skills & blocs
      gsap.from(".about-reveal", {
        opacity: 0, y: 24,
        duration: 0.8, stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".about-grid", start: "top 80%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="bg-[var(--color-dark)] text-white py-24 md:py-32 px-5 md:px-10 lg:px-20 overflow-hidden">

      {/* Label */}
      <p className="section-label text-white/40 mb-8 md:mb-12">02 — À propos</p>

      {/* Manifeste */}
      <div className="manifeste-block mb-16 md:mb-24 max-w-4xl">
        <div className="clip-reveal">
          <p className="manifeste-line font-display text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.1] tracking-[-0.02em]">
            Je design ce que
          </p>
        </div>
        <div className="clip-reveal">
          <p className="manifeste-line font-display text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.1] tracking-[-0.02em] text-[var(--color-red)]">
            les autres imaginent.
          </p>
        </div>
        <div className="clip-reveal">
          <p className="manifeste-line font-display text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.1] tracking-[-0.02em] text-white/50">
            Je code ce qu&apos;ils dessinent.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 md:gap-8 mb-16 md:mb-24 border-t border-white/10 pt-8 md:pt-12">
        {stats.map(({ value, label }) => {
          const num = parseInt(value);
          const suffix = value.replace(String(num), "");
          return (
            <div key={label} className="about-reveal">
              <div className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none text-white">
                <span className="stat-num" data-target={num} data-suffix={suffix}>0{suffix}</span>
              </div>
              <div className="text-white/40 text-sm mt-2 leading-snug">{label}</div>
            </div>
          );
        })}
      </div>

      {/* Double identité */}
      <div className="about-grid grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
        {/* Design */}
        <div className="about-reveal rounded-2xl border border-white/10 p-6 md:p-8 hover:border-[var(--color-red)]/40 transition-colors">
          <p className="section-label text-[var(--color-red)] mb-4">Design</p>
          <h3 className="font-display text-2xl md:text-3xl mb-6 leading-tight">
            L&apos;esthétique<br/>au service de l&apos;usage.
          </h3>
          <ul className="space-y-2">
            {designSkills.map(s => (
              <li key={s} className="flex items-center gap-3 text-[0.9rem] text-white/70">
                <span className="w-1 h-1 rounded-full bg-[var(--color-red)] shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Dev */}
        <div className="about-reveal rounded-2xl border border-white/10 p-6 md:p-8 hover:border-[var(--color-red)]/40 transition-colors">
          <p className="section-label text-[var(--color-red)] mb-4">Développement</p>
          <h3 className="font-display text-2xl md:text-3xl mb-6 leading-tight">
            Des interfaces qui<br/>vivent et performent.
          </h3>
          <ul className="space-y-2">
            {devSkills.map(s => (
              <li key={s} className="flex items-center gap-3 text-[0.9rem] text-white/70">
                <span className="w-1 h-1 rounded-full bg-[var(--color-red)] shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
