"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
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
const CARD_SIZES = ["lg:col-span-2 lg:row-span-2", "lg:col-span-1", "lg:col-span-1", "lg:col-span-1", "lg:col-span-1", "lg:col-span-2"];
const CARD_COLORS = ["#1a1a1a", "#D43333", "#2a2a2a", "#8B7355", "#1a1a1a", "#D43333"];

export default function ProjectsSection({ projects = PLACEHOLDER_PROJECTS }: { projects?: typeof PLACEHOLDER_PROJECTS }) {
  const [filter, setFilter] = useState<Filter>("Tous");
  const sectionRef = useRef<HTMLDivElement>(null);

  const visible = filter === "Tous"
    ? projects
    : projects.filter(p =>
        filter === "Design" ? p.category === "design" || p.category === "both"
        : p.category === "dev" || p.category === "both"
      );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        opacity: 0, y: 36, scale: 0.97,
        duration: 0.7, stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".projects-grid", start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [filter]);

  return (
    <div ref={sectionRef} id="projects" className="bg-[var(--color-cream)] py-24 md:py-32 px-5 md:px-10 lg:px-20">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
        <div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-dark)]">
            Travaux récents
          </h2>
        </div>

        {/* Filtres */}
        <div className="flex gap-2 flex-wrap">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors cursor-pointer ${
                filter === f
                  ? "bg-[var(--color-dark)] text-white border-[var(--color-dark)]"
                  : "bg-transparent text-[var(--color-dark)] border-[var(--color-dark)]/20 hover:border-[var(--color-dark)]/60"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grille magazine */}
      <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[240px] md:auto-rows-[280px] gap-4">
        {visible.map((project, i) => (
          <Link
            key={project.id}
            href={`/projects/${project.slug}`}
            className={`project-card group relative rounded-2xl overflow-hidden no-underline ${CARD_SIZES[i % CARD_SIZES.length]}`}
          >
            {/* Background */}
            <div
              className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]"
              style={{ backgroundColor: CARD_COLORS[i % CARD_COLORS.length] }}
            />

            {/* Numéro de parution */}
            <span className="absolute top-4 left-5 section-label text-white/30">
              N°{String(i + 1).padStart(2, "0")}
            </span>

            {/* Catégorie */}
            <span className="absolute top-4 right-5 text-[0.7rem] px-3 py-1 rounded-full bg-white/10 text-white font-medium tracking-wide">
              {CATEGORY_LABEL[project.category]}
            </span>

            {/* Contenu bas */}
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent">
              <h3 className="font-display text-xl md:text-2xl text-white leading-tight mb-1">
                {project.title}
              </h3>
              <p className="text-white/60 text-sm leading-snug line-clamp-2">
                {project.description}
              </p>
            </div>

            {/* Hover arrow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[var(--color-red)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg width="16" height="16" viewBox="0 0 13 13" fill="none">
                <path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA voir tous */}
      <div className="mt-10 text-center">
        <Link href="/projects"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-[var(--color-dark)]/20 text-sm font-medium text-[var(--color-dark)] no-underline hover:bg-[var(--color-dark)] hover:text-white transition-colors">
          Voir tous les projets
          <svg width="12" height="12" viewBox="0 0 13 13" fill="none"><path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </Link>
      </div>
    </div>
  );
}
