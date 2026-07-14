"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
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
      tl.from(".hero-pill",  { opacity: 0, y: 16, duration: 0.5, ease: "power3.out" });
      tl.from(".hero-word",  { yPercent: 110, rotateX: -20, duration: 0.7, stagger: 0.08, ease: "power3.out" }, "-=0.2");
      tl.from(".hero-aside", { opacity: 0, y: 10, duration: 0.45, stagger: 0.08, ease: "power2.out" }, "-=0.35");
      tl.from(".hero-scroll",{ opacity: 0, duration: 0.6 }, "-=0.2");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] overflow-hidden bg-[var(--color-cream)] pt-[3.5rem] lg:pt-[5rem] flex flex-col"
    >

      {/* ── Layout : flex-col mobile → 2-col grid tablet+ ── */}
      <div className="flex-1 flex flex-col md:grid md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1.25fr]
                      relative z-10 px-5 md:px-8 lg:pl-14 lg:pr-0">

        {/* ─── Colonne texte ─── */}
        <div className="flex flex-col py-5 md:py-8 lg:py-10
                        items-center text-center md:items-start md:text-left">

          {/* Pill */}
          <div className="hero-pill relative inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-[var(--color-dark)]/20 text-sm font-medium text-[var(--color-dark)]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shrink-0" />
            Disponible — Designer &amp; Developer
            <svg width="30" height="22" viewBox="0 0 36 28" fill="none" className="absolute -top-3 -right-9 rotate-[15deg]">
              <path d="M4 24 C8 16, 16 8, 28 4" stroke="var(--color-red)" strokeWidth="2" strokeLinecap="round"/>
              <path d="M22 2 L28 4 L24 10" stroke="var(--color-red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Titre + stats */}
          <div className="mt-10 md:my-auto space-y-3 lg:space-y-5">
            <h1 className="font-display leading-[1] tracking-[-0.03em] text-[clamp(3rem,5.5vw,8.5rem)]">
              {["I'M", "ANDRÉ", "KIM,"].map((word, i) => (
                <div key={i} className="overflow-hidden">
                  <span className={`hero-word block ${word === "KIM," ? "text-[var(--color-red)]" : "text-[var(--color-dark)]"}`}>
                    {word}
                  </span>
                </div>
              ))}
            </h1>

            <div className="hero-aside flex items-center justify-center md:justify-start gap-4 flex-wrap">
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-[1.6rem] leading-none text-[var(--color-dark)]">+3</span>
                <span className="text-[0.6rem] text-[#bbb] uppercase tracking-widest">ans exp.</span>
              </div>
              <div className="w-px h-5 bg-black/10" />
              <div className="flex gap-0.5">
                {[0,1,2,3,4].map(i => (
                  <svg key={i} width="10" height="10" viewBox="0 0 18 18" fill="var(--color-red)">
                    <path d="M9 1.5l2.163 4.38 4.837.703-3.5 3.412.826 4.817L9 12.5l-4.326 2.312.826-4.817L2 6.583l4.837-.703L9 1.5z"/>
                  </svg>
                ))}
              </div>
              <div className="w-px h-5 bg-black/10" />
              <span className="text-[0.72rem] text-[#aaa]">Bénin, Afrique de l&apos;Ouest</span>
            </div>
          </div>

        </div>

        {/* ─── Colonne image (en bas sur mobile, à droite sur tablet+) ─── */}
        <div className="relative flex-1 md:mt-0 md:flex-none md:h-auto">

          {/* Cercle rouge */}


          {/* Photo */}
          <Image
            src="/images/a.png"
            alt="André Kim"
            width={560} height={720}
            priority
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2]
                        h-[38vh]
                        md:top-8 lg:top-12 md:translate-y-0 md:h-[76vh] lg:h-[64vh]
                        md:-rotate-[9deg]
                        md:[filter:drop-shadow(-6px_14px_32px_rgba(0,0,0,0.2))]
                        w-auto object-contain"
          />

        </div>

      </div>

      {/* ── Scroll indicator ── */}
      <div className="hero-scroll absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-2 z-[3]">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-[var(--color-dark)]/30" />
        <span className="text-[0.62rem] text-[#bbb] tracking-[0.15em] uppercase rotate-90 origin-center mt-2">Scroll</span>
      </div>

      {/* ── Ticker ── */}
      <div className="absolute bottom-0 left-0 right-0 z-[4] overflow-hidden border-t border-[var(--color-dark)]/[0.06] bg-[var(--color-cream)]/80 backdrop-blur-sm">
        <div className="flex items-center py-2.5">
          <div className="flex shrink-0 animate-marquee">
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
