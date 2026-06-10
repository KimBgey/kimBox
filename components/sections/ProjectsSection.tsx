"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/db/schema";

gsap.registerPlugin(ScrollTrigger);

const FILTERS = ["Tous", "Design", "Dev"] as const;
type Filter = typeof FILTERS[number];

const PLACEHOLDER_PROJECTS: Omit<Project, "createdAt">[] = [
  { id: 1, title: "Brand Studio Kali", slug: "kali", category: "design", description: "Identité visuelle complète pour un studio créatif parisien.", caseStudy: null, images: [], tools: ["Figma", "Illustrator"], links: {}, featured: true, order: 0 },
  { id: 2, title: "App mobile Trackr", slug: "trackr", category: "dev", description: "Application de suivi de projets en temps réel.", caseStudy: null, images: [], tools: ["Next.js", "TypeScript"], links: {}, featured: true, order: 1 },
  { id: 3, title: "Motion Reel 2024", slug: "motion-2024", category: "design", description: "Showreel motion design pour présentation clients.", caseStudy: null, images: [], tools: ["After Effects", "Premiere"], links: {}, featured: false, order: 2 },
  { id: 4, title: "E-commerce Luxe", slug: "luxe", category: "both", description: "Boutique en ligne haut de gamme, design + intégration.", caseStudy: null, images: [], tools: ["Figma", "Next.js", "Stripe"], links: {}, featured: true, order: 3 },
  { id: 5, title: "Dashboard Analytics", slug: "analytics", category: "dev", description: "Interface d'analyse de données pour PME.", caseStudy: null, images: [], tools: ["React", "Recharts", "Drizzle"], links: {}, featured: false, order: 4 },
  { id: 6, title: "Packaging Café Noir", slug: "cafe-noir", category: "design", description: "Design packaging & identité pour une marque de café artisanal.", caseStudy: null, images: [], tools: ["Photoshop", "Illustrator"], links: {}, featured: false, order: 5 },
];

const CATEGORY_LABEL: Record<string, string> = { design: "Design", dev: "Dev", both: "Design + Dev" };
const CARD_COLORS = ["#1a1a1a", "#D43333", "#2a2a2a", "#8B7355", "#1e1e2e", "#B83232"];

export default function ProjectsSection({ projects = PLACEHOLDER_PROJECTS }: { projects?: typeof PLACEHOLDER_PROJECTS }) {
  const [filter, setFilter] = useState<Filter>("Tous");
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  const visible = filter === "Tous"
    ? projects
    : projects.filter(p =>
        filter === "Design" ? p.category === "design" || p.category === "both"
        : p.category === "dev" || p.category === "both"
      );

  /* ── Tracking de la card active ── */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const update = () => {
      const center = el.scrollLeft + el.clientWidth / 2;
      const cards = el.querySelectorAll<HTMLElement>(".project-slide");
      let closest = 0, minDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      setActiveIndex(closest);
    };

    el.addEventListener("scroll", update, { passive: true });
    update();
    return () => el.removeEventListener("scroll", update);
  }, [visible.length]);

  /* ── Scroll vers une card ── */
  const scrollTo = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>(".project-slide");
    const card = cards[index];
    if (!card) return;
    const target = card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2;
    el.scrollTo({ left: target, behavior: "smooth" });
  }, []);

  /* ── Drag to scroll (desktop) ── */
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX;
    scrollStart.current = scrollRef.current!.scrollLeft;
  };

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    scrollRef.current.scrollLeft = scrollStart.current - (e.pageX - startX.current) * 1.4;
  }, []);

  const onMouseUp = useCallback(() => { isDragging.current = false; }, []);

  /* ── Animation section entrée ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".projects-header", {
        opacity: 0, y: 20, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ".projects-header", start: "top 88%", once: true },
      });
      gsap.from(".projects-carousel", {
        opacity: 0, y: 36, duration: 0.75, ease: "power3.out",
        scrollTrigger: { trigger: ".projects-carousel", start: "top 90%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} id="projects" className="bg-[var(--color-cream)] py-16 md:py-24 overflow-hidden">

      {/* ── Header ── */}
      <div className="projects-header px-5 md:px-10 lg:px-20 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12">
        <div>
          <p className="section-label text-[var(--color-dark)]/40 mb-3">Projets</p>
          <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-dark)]">
            Travaux récents
          </h2>
        </div>

        <div className="flex items-center gap-5">
          {/* Filtres */}
          <div className="flex gap-2">
            {FILTERS.map(f => (
              <button
                key={f}
                type="button"
                onClick={() => { setFilter(f); setActiveIndex(0); }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors cursor-pointer ${
                  filter === f
                    ? "bg-[var(--color-dark)] text-white border-[var(--color-dark)]"
                    : "bg-transparent text-[var(--color-dark)] border-[var(--color-dark)]/20 hover:border-[var(--color-dark)]/60"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Nav arrows */}
          <div className="hidden md:flex gap-2">
            <button
              type="button"
              aria-label="Projet précédent"
              onClick={() => scrollTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              className="w-9 h-9 rounded-full border border-[var(--color-dark)]/15 flex items-center justify-center text-[var(--color-dark)]/40 hover:border-[var(--color-dark)]/40 hover:text-[var(--color-dark)] disabled:opacity-20 transition-all cursor-pointer disabled:cursor-not-allowed"
            >
              <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
                <path d="M11.5 1.5L1.5 11.5M1.5 11.5H8.5M1.5 11.5V4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              type="button"
              aria-label="Projet suivant"
              onClick={() => scrollTo(activeIndex + 1)}
              disabled={activeIndex === visible.length - 1}
              className="w-9 h-9 rounded-full border border-[var(--color-dark)]/15 flex items-center justify-center text-[var(--color-dark)]/40 hover:border-[var(--color-dark)]/40 hover:text-[var(--color-dark)] disabled:opacity-20 transition-all cursor-pointer disabled:cursor-not-allowed"
            >
              <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
                <path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Carousel ── */}
      <div
        ref={scrollRef}
        className="projects-carousel carousel-padding flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden select-none cursor-grab active:cursor-grabbing"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {visible.map((project, i) => {
          const distance = Math.abs(i - activeIndex);
          const isActive = distance === 0;
          const isAdjacent = distance === 1;

          return (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              draggable={false}
              className={`project-slide flex-shrink-0 snap-center relative rounded-3xl overflow-hidden no-underline
                w-[76vw] md:w-[310px] h-[420px] md:h-[440px]
                transition-all duration-500 ease-out
                ${isActive ? "scale-100 opacity-100" : isAdjacent ? "scale-[0.92] opacity-60" : "scale-[0.85] opacity-35"}
              `}
            >
              {/* Fond couleur */}
              <div className="absolute inset-0" style={{ backgroundColor: CARD_COLORS[i % CARD_COLORS.length] }} />

              {/* Image projet */}
              {(project.images as string[])?.[0] && (
                <Image
                  src={(project.images as string[])[0]}
                  alt={project.title}
                  fill
                  className="object-cover"
                  draggable={false}
                  sizes="(max-width: 768px) 76vw, 310px"
                />
              )}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

              {/* Badge catégorie — haut gauche */}
              <div className="absolute top-4 left-4">
                <span className="font-mono text-[0.6rem] uppercase tracking-widest text-white/50">
                  {CATEGORY_LABEL[project.category]}
                </span>
              </div>

              {/* Numéro — haut droite */}
              <span className="absolute top-4 right-4 font-display text-[2.5rem] leading-none text-white/[0.07] select-none">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Contenu bas */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-[1.5rem] leading-tight text-white mb-3">
                  {project.title}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5 flex-wrap">
                    {(project.tools as string[]).slice(0, 2).map(tool => (
                      <span
                        key={tool}
                        className="text-[0.62rem] px-2 py-0.5 rounded-full bg-white/10 text-white/55 font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 hover:bg-[var(--color-red)] transition-colors">
                    <svg width="10" height="10" viewBox="0 0 13 13" fill="none">
                      <path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── Dots ── */}
      <div className="flex justify-center items-center gap-1.5 mt-6">
        {visible.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Aller au projet ${i + 1}`}
            onClick={() => scrollTo(i)}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              i === activeIndex
                ? "w-5 h-[5px] bg-[var(--color-dark)]"
                : "w-[5px] h-[5px] bg-[var(--color-dark)]/20 hover:bg-[var(--color-dark)]/40"
            }`}
          />
        ))}
      </div>

      {/* ── CTA ── */}
      <div className="mt-10 text-center px-5">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-[var(--color-dark)]/20 text-sm font-medium text-[var(--color-dark)] no-underline hover:bg-[var(--color-dark)] hover:text-white transition-colors"
        >
          Voir tous les projets
          <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
            <path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}
