import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [project] = await db.select().from(projects).where(eq(projects.slug, slug));
  if (!project) return { title: "Projet introuvable" };
  return { title: `${project.title} — André Kim`, description: project.description };
}

const CATEGORY_LABEL: Record<string, string> = {
  design: "Design",
  dev: "Développement",
  both: "Design + Développement",
};

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const [project] = await db.select().from(projects).where(eq(projects.slug, slug));

  if (!project) notFound();

  const tools  = Array.isArray(project.tools)  ? project.tools  as string[] : [];
  const images = Array.isArray(project.images) ? project.images as string[] : [];
  const links  = project.links as { live?: string; behance?: string; github?: string } | null;

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[var(--color-cream)]">

        {/* ── Header ──────────────────────────────────────────── */}
        <div className="bg-[var(--color-dark)] pt-28 pb-16 px-5 md:px-10 lg:px-20">
          <div className="flex items-center gap-2 mb-8 text-[0.8rem] text-white/30">
            <Link href="/" className="hover:text-white/60 transition-colors no-underline">Accueil</Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-white/60 transition-colors no-underline">Projets</Link>
            <span>/</span>
            <span className="text-white/60">{project.title}</span>
          </div>

          <span className="inline-flex items-center px-3 py-1 rounded-full border border-[var(--color-red)]/40 text-[var(--color-red)] text-[0.7rem] font-medium tracking-wide mb-5">
            {CATEGORY_LABEL[project.category]}
          </span>
          <h1 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em] text-white max-w-3xl">
            {project.title}
          </h1>
        </div>

        {/* ── Behance layout : visuel gauche / détails droite ── */}
        <div className="lg:grid lg:grid-cols-[1fr_360px] min-h-[70vh]">

          {/* ── Gauche : visuels ────────────────────────────────── */}
          <div className="bg-[#111] px-5 md:px-10 py-12 flex flex-col gap-6">
            {images.length > 0 ? (
              images.map((src, i) => (
                <div key={i} className="relative w-full rounded-xl overflow-hidden aspect-video">
                  <Image src={src} alt={`${project.title} — visuel ${i + 1}`} fill className="object-cover" />
                </div>
              ))
            ) : (
              /* Placeholder Behance-style */
              <div className="flex-1 flex items-center justify-center min-h-[50vh]">
                <div className="text-center">
                  <span className="font-display text-[clamp(3rem,8vw,7rem)] text-white/[0.06] leading-none block">
                    {project.title}
                  </span>
                  <p className="text-white/20 text-sm mt-4">Visuels à venir</p>
                </div>
              </div>
            )}
          </div>

          {/* ── Droite : métadonnées (sticky) ──────────────────── */}
          <aside className="bg-[var(--color-cream)] border-l border-black/[0.06] px-7 py-12 lg:sticky lg:top-[5rem] lg:self-start">

            <p className="text-[#999] text-[0.8rem] leading-relaxed mb-8 border-b border-black/10 pb-8">
              {project.description}
            </p>

            {tools.length > 0 && (
              <div className="mb-8">
                <p className="section-label mb-3">Outils</p>
                <div className="flex flex-wrap gap-2">
                  {tools.map(t => (
                    <span key={t} className="px-3 py-1 rounded-full bg-black/[0.05] text-[0.8rem] text-[var(--color-dark)] font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {links && (links.live || links.behance || links.github) && (
              <div className="mb-8">
                <p className="section-label mb-3">Liens</p>
                <div className="flex flex-col gap-2">
                  {links.live && (
                    <a href={links.live} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center justify-between px-5 py-3 rounded-xl bg-[var(--color-red)] text-white text-sm font-medium no-underline hover:opacity-90 transition-opacity">
                      Voir le site live
                      <svg width="11" height="11" viewBox="0 0 13 13" fill="none"><path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </a>
                  )}
                  {links.behance && (
                    <a href={links.behance} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center justify-between px-5 py-3 rounded-xl border border-black/12 text-[var(--color-dark)] text-sm font-medium no-underline hover:bg-black/[0.04] transition-colors">
                      Behance
                      <svg width="11" height="11" viewBox="0 0 13 13" fill="none"><path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </a>
                  )}
                  {links.github && (
                    <a href={links.github} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center justify-between px-5 py-3 rounded-xl border border-black/12 text-[var(--color-dark)] text-sm font-medium no-underline hover:bg-black/[0.04] transition-colors">
                      GitHub
                      <svg width="11" height="11" viewBox="0 0 13 13" fill="none"><path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </a>
                  )}
                </div>
              </div>
            )}

            <div className="pt-8 border-t border-black/10">
              <Link href="/projects"
                className="inline-flex items-center gap-2 text-sm text-[#888] no-underline hover:text-[var(--color-dark)] transition-colors">
                ← Tous les projets
              </Link>
            </div>
          </aside>
        </div>

        {/* ── Étude de cas (pleine largeur) ───────────────────── */}
        {project.caseStudy && (
          <div className="px-5 md:px-10 lg:px-20 py-20 md:py-28 border-t border-black/[0.06] max-w-3xl">
            <p className="section-label mb-6">Étude de cas</p>
            <div className="text-[#444] text-[1rem] leading-[1.9] whitespace-pre-wrap">
              {project.caseStudy}
            </div>
          </div>
        )}

      </main>
      <Footer />
    </>
  );
}
