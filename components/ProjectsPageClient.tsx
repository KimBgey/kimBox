"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/db/schema";

const CATEGORY_LABEL: Record<string, string> = {
  design: "Design",
  dev: "Développement",
  both: "Design + Dev",
};

const CARD_BG = [
  "bg-[#1a1a1a]",
  "bg-[#D43333]",
  "bg-[#2a2a2a]",
  "bg-[#8B7355]",
  "bg-[#1e1e2e]",
  "bg-[#B83232]",
];

type Filter = "Tous" | "Design" | "Dev";

function ProjectCard({ project, index }: { project: Omit<Project, "createdAt">; index: number }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block rounded-2xl overflow-hidden aspect-[4/3] no-underline"
    >
      <div className={`absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04] ${CARD_BG[index % CARD_BG.length]}`}>
        {(project.images as string[])?.[0] && (
          <Image
            src={(project.images as string[])[0]}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Badge catégorie */}
      <span className="absolute top-4 left-4 font-mono text-[0.6rem] uppercase tracking-widest text-white/40">
        {CATEGORY_LABEL[project.category]}
      </span>

      {/* Hover arrow */}
      <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-[var(--color-red)] transition-all duration-200">
        <svg width="10" height="10" viewBox="0 0 13 13" fill="none">
          <path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Contenu bas */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        {(project.tools as string[])?.length > 0 && (
          <div className="flex gap-1.5 mb-2.5">
            {(project.tools as string[]).slice(0, 2).map(tool => (
              <span key={tool} className="text-[0.62rem] px-2 py-0.5 rounded-full bg-white/10 text-white/50 font-medium">
                {tool}
              </span>
            ))}
          </div>
        )}
        <h3 className="font-display text-xl md:text-2xl text-white leading-tight mb-1">{project.title}</h3>
        <p className="text-white/50 text-sm leading-snug line-clamp-2">{project.description}</p>
      </div>
    </Link>
  );
}

function SectionBlock({
  title,
  count,
  projects,
}: {
  title: string;
  count: number;
  projects: Omit<Project, "createdAt">[];
}) {
  return (
    <div>
      {/* En-tête de section */}
      <div className="flex items-center gap-5 mb-6">
        <h2 className="font-display text-[clamp(1.6rem,3vw,2.5rem)] leading-none tracking-[-0.02em] text-[var(--color-dark)] shrink-0">
          {title}
        </h2>
        <span className="font-mono text-[0.65rem] text-[var(--color-dark)]/25 shrink-0">{count}</span>
        <div className="flex-1 h-px bg-[var(--color-dark)]/[0.07]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </div>
  );
}

export default function ProjectsPageClient({
  projects,
}: {
  projects: Omit<Project, "createdAt">[];
}) {
  const [filter, setFilter] = useState<Filter>("Tous");

  const designProjects = projects.filter(p => p.category === "design");
  const devProjects = projects.filter(p => p.category === "dev");
  const bothProjects = projects.filter(p => p.category === "both");

  const designAll = projects.filter(p => p.category === "design" || p.category === "both");
  const devAll = projects.filter(p => p.category === "dev" || p.category === "both");

  const FILTERS: { key: Filter; label: string; count: number }[] = [
    { key: "Tous", label: "Tous", count: projects.length },
    { key: "Design", label: "Design", count: designAll.length },
    { key: "Dev", label: "Développement", count: devAll.length },
  ];

  return (
    <main className="min-h-screen bg-[var(--color-cream)] pt-28 pb-32 px-5 md:px-10 lg:px-20">

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-14">
        <div>
          <p className="section-label text-[var(--color-dark)]/40 mb-3">Portfolio</p>
          <h1 className="font-display text-[clamp(2rem,3.5vw,3rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-dark)]">
            Tous les projets
          </h1>
        </div>
        <p className="text-[0.8rem] text-[#aaa]">
          {projects.length} projet{projects.length > 1 ? "s" : ""}
        </p>
      </div>

      {/* ── Filtres ── */}
      <div className="flex gap-2 flex-wrap mb-12 md:mb-16">
        {FILTERS.map(({ key, label, count }) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium border transition-colors cursor-pointer ${
              filter === key
                ? "bg-[var(--color-dark)] text-white border-[var(--color-dark)]"
                : "bg-transparent text-[var(--color-dark)]/60 border-[var(--color-dark)]/20 hover:border-[var(--color-dark)]/50 hover:text-[var(--color-dark)]"
            }`}
          >
            {label}
            <span className={`font-mono text-[0.62rem] ${filter === key ? "text-white/40" : "text-[var(--color-dark)]/25"}`}>
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* ── Contenu ── */}
      {projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[#bbb] mb-3">Aucun projet pour l&apos;instant.</p>
          <Link href="/admin/projects/new" className="text-[var(--color-red)] text-sm">
            Ajouter depuis l&apos;admin →
          </Link>
        </div>
      ) : filter === "Tous" ? (
        <div className="space-y-16 md:space-y-20">
          {devProjects.length > 0 && (
            <SectionBlock title="Développement" count={devProjects.length} projects={devProjects} />
          )}
          {designProjects.length > 0 && (
            <SectionBlock title="Design" count={designProjects.length} projects={designProjects} />
          )}
          {bothProjects.length > 0 && (
            <SectionBlock title="Design + Dev" count={bothProjects.length} projects={bothProjects} />
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(filter === "Design" ? designAll : devAll).map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      )}
    </main>
  );
}
