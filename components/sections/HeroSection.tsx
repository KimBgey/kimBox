"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";

const TICKER_ITEMS = [
  "UI / UX Design", "Branding", "Next.js", "Motion Design",
  "Figma", "TypeScript", "Identité Visuelle", "React",
  "After Effects", "Tailwind CSS", "Packaging",
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      // Pill
      tl.from(".hero-pill", { opacity: 0, y: 16, duration: 0.5, ease: "power3.out" });

      // Titre — mot par mot
      tl.from(".hero-word", {
        opacity: 0, yPercent: 110, rotateX: -20,
        duration: 0.65, stagger: 0.07,
        ease: "power3.out",
      }, "-=0.2");

      // Sous-titre
      tl.from(".hero-sub", { opacity: 0, y: 14, duration: 0.55, ease: "power2.out" }, "-=0.35");

      // Infos latérales
      tl.from(".hero-aside", { opacity: 0, y: 12, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.4");

      // CTAs
      tl.from(".hero-cta", { opacity: 0, y: 14, scale: 0.96, duration: 0.5, stagger: 0.08, ease: "back.out(1.5)" }, "-=0.3");

      // Scroll indicator
      tl.from(".hero-scroll", { opacity: 0, duration: 0.6 }, "-=0.1");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[100svh] overflow-hidden bg-[var(--color-cream)] pt-[3.5rem] lg:pt-[5rem] flex flex-col">

      {/* ── Grid principale ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] flex-1 items-start gap-0 lg:gap-6 px-5 md:px-8 lg:px-10 pt-2 lg:pt-8 relative z-10">

        {/* Gauche */}
        <aside className="hidden lg:flex flex-col gap-3 pt-14">
          <svg width="24" height="16" viewBox="0 0 28 20" fill="none" className="opacity-20">
            <path d="M0 20V12C0 5.373 5.373 0 12 0h2v4h-2C8.686 4 6 6.686 6 10v2h6v8H0zm16 0V12C16 5.373 21.373 0 28 0h0v4c-3.314 0-6 2.686-6 6v2h6v8H16z" fill="var(--color-dark)" />
          </svg>
          <p className="hero-aside text-[0.78rem] text-[#777] leading-[1.85] max-w-[180px]">
            Je suis développeur web et designer, spécialisé dans la création de sites, d'applications et d'identités visuelles modernes.
          </p>
          <div className="hero-aside">
            <div className="flex gap-0.5 mt-1">
              {[0,1,2,3,4].map(i => (
                <svg key={i} width="11" height="11" viewBox="0 0 18 18" fill="var(--color-red)">
                  <path d="M9 1.5l2.163 4.38 4.837.703-3.5 3.412.826 4.817L9 12.5l-4.326 2.312.826-4.817L2 6.583l4.837-.703L9 1.5z"/>
                </svg>
              ))}
            </div>
          </div>
        </aside>

        {/* Centre */}
        <div className="flex flex-col items-center gap-3 md:gap-4 pt-1 mt-[6svh] md:mt-0 lg:pt-8">

          {/* Pill */}
          <div className="hero-pill relative inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-[var(--color-dark)]/20 text-sm font-medium text-[var(--color-dark)]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shrink-0" />
            Disponible — Designer &amp; Developer
            <svg width="30" height="22" viewBox="0 0 36 28" fill="none" className="absolute -top-3 -right-6 rotate-[15deg]">
              <path d="M4 24 C8 16, 16 8, 28 4" stroke="var(--color-red)" strokeWidth="2" strokeLinecap="round"/>
              <path d="M22 2 L28 4 L24 10" stroke="var(--color-red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Titre — overflow hidden par ligne pour animation */}
          <div className="text-center overflow-hidden px-2 mt-4 md:mt-0">
            <div className="overflow-hidden">
              <h1 className="font-display text-[clamp(2.8rem,5.5vw,6rem)] leading-[0.95] tracking-[-0.025em] text-[var(--color-dark)]">
                {"I'm André Kim,".split(" ").map((word, i) => (
                  <span key={i} className="hero-word inline-block mr-[0.25em] last:mr-0 origin-bottom">
                    {word === "Kim," ? <span className="text-[var(--color-red)]">{word}</span> : word}
                  </span>
                ))}
              </h1>
            </div>
          </div>

          {/* Déco */}
          <svg width="80" height="18" viewBox="0 0 96 22" fill="none" className="hero-sub opacity-60">
            <path d="M4 17 C18 3, 38 19, 58 7 C68 2, 78 14, 92 9" stroke="var(--color-red)" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>

          {/* Mobile — stats + description (remplace asides cachées) */}
          <div className="hero-aside lg:hidden flex items-center justify-center gap-5 mt-3 px-4">
            <div className="text-center">
              <div className="font-display text-[2rem] leading-none text-[var(--color-dark)]">+3</div>
              <div className="text-[0.6rem] text-[#bbb] uppercase tracking-widest mt-0.5">Ans d&apos;exp.</div>
            </div>
            <div className="w-px h-8 bg-black/10 shrink-0" />
            <div className="text-center max-w-[130px]">
              <p className="text-[0.75rem] text-[#999] leading-relaxed">
                Designer &amp; Développeur, Bénin.
              </p>
              <div className="flex justify-center gap-0.5 mt-1.5">
                {[0,1,2,3,4].map(i => (
                  <svg key={i} width="9" height="9" viewBox="0 0 18 18" fill="var(--color-red)">
                    <path d="M9 1.5l2.163 4.38 4.837.703-3.5 3.412.826 4.817L9 12.5l-4.326 2.312.826-4.817L2 6.583l4.837-.703L9 1.5z"/>
                  </svg>
                ))}
              </div>
            </div>
            <div className="w-px h-8 bg-black/10 shrink-0" />
            <div className="text-center">
              <div className="font-display text-[2rem] leading-none text-[var(--color-dark)]">50+</div>
              <div className="text-[0.6rem] text-[#bbb] uppercase tracking-widest mt-0.5">Projets</div>
            </div>
          </div>

        </div>

        {/* Droite */}
        <aside className="hidden lg:flex flex-col items-end gap-1 pt-14">
          <div className="hero-aside flex gap-[3px]">
            {[0,1,2,3,4].map(i => (
              <svg key={i} width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path d="M9 1.5l2.163 4.38 4.837.703-3.5 3.412.826 4.817L9 12.5l-4.326 2.312.826-4.817L2 6.583l4.837-.703L9 1.5z" fill="var(--color-red)"/>
              </svg>
            ))}
          </div>
          <div className="hero-aside font-display text-[clamp(2.2rem,3vw,3rem)] leading-none text-[var(--color-dark)]">
            +3 Years
          </div>
          <div className="hero-aside text-[0.68rem] text-[#999] tracking-widest uppercase">Experience</div>
          <div className="hero-aside mt-6 text-right">
            <p className="text-[0.72rem] text-[#bbb] uppercase tracking-wider">Basé à</p>
            <p className="text-[0.82rem] font-semibold text-[var(--color-dark)]">Bénin, Afrique de l&apos;Ouest</p>
          </div>
        </aside>
      </div>

      {/* ── Grand cercle rouge ── */}
      <div className="absolute -bottom-[28%] left-1/2 -translate-x-1/2 w-[78vw] md:w-[58vw] lg:w-[min(500px,44vw)] aspect-square rounded-full bg-[var(--color-red)] z-0" />

      {/* ── Personnage ── */}
      <Image
        src="/images/a.png"
        alt="André Kim"
        width={560} height={720}
        priority
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[68vh] md:h-[58vh] lg:h-[64vh] w-auto object-contain object-bottom z-[2]"
      />

      {/* ── CTAs ── */}
      <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-[3] flex gap-3">
        <Link href="/projects"
          className="hero-cta inline-flex items-center gap-2 px-6 md:px-7 py-2.5 md:py-3 rounded-full text-sm md:text-[0.9375rem] font-semibold text-white bg-[var(--color-red)] [box-shadow:0_4px_24px_rgba(212,51,51,0.4)] no-underline hover:opacity-90 transition-opacity cursor-pointer">
          Portfolio
          <svg width="12" height="12" viewBox="0 0 13 13" fill="none"><path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </Link>
        <Link href="/#contact"
          className="hero-cta inline-flex items-center px-6 md:px-7 py-2.5 md:py-3 rounded-full text-sm md:text-[0.9375rem] font-semibold text-[var(--color-dark)] bg-white/80 backdrop-blur-md border border-white/60 no-underline hover:opacity-90 transition-opacity cursor-pointer">
          Hire me
        </Link>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="hero-scroll absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-2 z-[3]">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-[var(--color-dark)]/30" />
        <span className="text-[0.62rem] text-[#bbb] tracking-[0.15em] uppercase rotate-90 origin-center mt-2">Scroll</span>
      </div>

      {/* ── Ticker de compétences (bas) ── */}
      <div className="absolute bottom-0 left-0 right-0 z-[4] pb-0 overflow-hidden border-t border-[var(--color-dark)]/[0.06] bg-[var(--color-cream)]/80 backdrop-blur-sm">
        <div className="flex items-center gap-0 py-2.5">
          <div className="flex shrink-0 animate-marquee gap-0">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="shrink-0 flex items-center gap-3 px-5 text-[0.72rem] font-medium text-[var(--color-dark)]/40 uppercase tracking-wider">
                {item}
                <span className="w-1 h-1 rounded-full bg-[var(--color-red)]/50 shrink-0" />
              </span>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
