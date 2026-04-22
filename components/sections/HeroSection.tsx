"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        opacity: 0, y: 32,
        duration: 0.9, stagger: 0.1,
        ease: "power3.out", delay: 0.2,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[100svh] overflow-hidden bg-[var(--color-cream)] pt-[3.5rem] lg:pt-[5rem]">

      {/* ── Grille 3 colonnes ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] h-full items-start gap-0 lg:gap-6 px-5 md:px-8 lg:px-10 pt-4 lg:pt-6 relative z-10">

        {/* Gauche — témoignage (masqué mobile) */}
        <aside className="hidden lg:flex flex-col gap-3 pt-16">
          <svg width="26" height="18" viewBox="0 0 28 20" fill="none" className="opacity-20">
            <path d="M0 20V12C0 5.373 5.373 0 12 0h2v4h-2C8.686 4 6 6.686 6 10v2h6v8H0zm16 0V12C16 5.373 21.373 0 28 0h0v4h0c-3.314 0-6 2.686-6 6v2h6v8H16z" fill="var(--color-dark)" />
          </svg>
          <p className="text-[0.8rem] text-[#666] leading-[1.8] max-w-[190px]">
            André&apos;s exceptional product design ensured our website&apos;s success. Highly recommended.
          </p>
          <p className="text-[0.75rem] font-semibold text-[var(--color-dark)]">Jenny M.</p>
        </aside>

        {/* Centre — texte */}
        <div className="flex flex-col items-center gap-3 md:gap-4 pt-6 lg:pt-10">
          {/* Hello pill */}
          <div className="hero-reveal relative inline-flex">
            <span className="inline-flex items-center px-5 py-1.5 rounded-full border border-[var(--color-dark)] text-sm font-medium tracking-wide">
              Designer &amp; Developer
            </span>
{/*             <h2 className="font-body text-[clamp(1.25rem,1.5vw,2.5rem)] font-semibold leading-[1.1] text-[var(--color-dark)] mt-2 m-0 tracking-[-0.01em]">
              Designer &amp; Developer
            </h2> */}
            <svg width="34" height="26" viewBox="0 0 36 28" fill="none" className="absolute -top-3 -right-7 rotate-[15deg]">
              <path d="M4 24 C8 16, 16 8, 28 4" stroke="var(--color-red)" strokeWidth="2" strokeLinecap="round"/>
              <path d="M22 2 L28 4 L24 10" stroke="var(--color-red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Titre principal — Sunroll (police display) */}
          <div className="hero-reveal text-center">
            <h1 className="font-display text-[clamp(3rem,4vw,6rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-dark)] m-0">
              I&apos;m <span className="text-[var(--color-red)]">André Kim,</span>
            </h1>

          </div>

          {/* Scribble déco */}
          <div className="hero-reveal">
            <svg width="96" height="22" viewBox="0 0 96 22" fill="none">
              <path d="M4 17 C18 3, 38 19, 58 7 C68 2, 78 14, 92 9" stroke="var(--color-red)" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Droite — expérience (masqué mobile) */}
        <aside className="hidden lg:flex flex-col items-end gap-1 pt-16">
          <div className="flex gap-[3px]">
            {[0,1,2,3,4].map(i => (
              <svg key={i} width="17" height="17" viewBox="0 0 18 18" fill="none">
                <path d="M9 1.5l2.163 4.38 4.837.703-3.5 3.412.826 4.817L9 12.5l-4.326 2.312.826-4.817L2 6.583l4.837-.703L9 1.5z" fill="var(--color-red)"/>
              </svg>
            ))}
          </div>
          <div className="font-display text-[clamp(2rem,3vw,2.75rem)] leading-none text-[var(--color-dark)]">
             +3 Years
          </div>
          <div className="text-sm text-[#888] tracking-widest uppercase text-[0.7rem]">Experience</div>
        </aside>
      </div>

      {/* ── Grand cercle rouge ── */}
      <div className="absolute -bottom-[28%] left-1/2 -translate-x-1/2 w-[78vw] md:w-[58vw] lg:w-[min(500px,44vw)] aspect-square rounded-full bg-[var(--color-red)] z-0" />

      {/* ── Personnage ── */}
      <Image
        src="/images/character.png"
        alt="André Kim"
        width={560} height={720}
        priority
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[54vh] md:h-[58vh] lg:h-[64vh] w-auto object-contain object-bottom z-[2]"
      />

      {/* ── CTAs sur l'image ── */}
      <div className="hero-reveal absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-[3] flex gap-3">
        <Link href="/projects" data-cursor="cta"
          className="inline-flex items-center gap-2 px-6 md:px-7 py-2.5 md:py-3 rounded-full text-sm md:text-[0.9375rem] font-semibold text-white bg-[var(--color-red)] [box-shadow:0_4px_24px_rgba(212,51,51,0.4)] no-underline hover:opacity-90 transition-opacity">
          Portfolio
          <svg width="12" height="12" viewBox="0 0 13 13" fill="none"><path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </Link>
        <Link href="/contact" data-cursor="cta"
          className="inline-flex items-center px-6 md:px-7 py-2.5 md:py-3 rounded-full text-sm md:text-[0.9375rem] font-semibold text-[var(--color-dark)] [background:rgba(255,255,255,0.75)] backdrop-blur-md border border-white/50 no-underline hover:opacity-90 transition-opacity">
          Hire me
        </Link>
      </div>
    </section>
  );
}
