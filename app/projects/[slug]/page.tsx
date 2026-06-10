import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import ImageGallery from "@/components/ImageGallery";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [project] = await db.select().from(projects).where(eq(projects.slug, slug));
  if (!project) return { title: "Projet introuvable" };
  const firstImage = (project.images as string[])?.[0];
  return {
    title: `${project.title} — André Kim`,
    description: project.description,
    openGraph: { images: firstImage ? [firstImage] : [] },
  };
}

const CATEGORY_LABEL: Record<string, string> = {
  design: "Design",
  dev: "Développement",
  both: "Design + Développement",
};

const CARD_BG: Record<string, string> = {
  design: "bg-[#1a1a1a]",
  dev: "bg-[#D43333]",
  both: "bg-[#2a2a2a]",
};

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;

  const [project, allProjects] = await Promise.all([
    db.select().from(projects).where(eq(projects.slug, slug)).then(r => r[0]),
    db.select({
      id: projects.id,
      title: projects.title,
      slug: projects.slug,
      category: projects.category,
      images: projects.images,
      order: projects.order,
    }).from(projects).orderBy(asc(projects.order)),
  ]);

  if (!project) notFound();

  const tools  = Array.isArray(project.tools)  ? project.tools  as string[] : [];
  const images = Array.isArray(project.images) ? project.images as string[] : [];
  const links  = project.links as { live?: string; behance?: string; github?: string } | null;

  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const prevProject  = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject  = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  const year = project.createdAt ? new Date(project.createdAt).getFullYear() : null;

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[var(--color-cream)]">

        {/* ── Hero ── */}
        <div className="relative bg-[var(--color-dark)] pt-28 pb-16 px-5 md:px-10 lg:px-20 overflow-hidden">

          {/* Image de fond avec overlay */}
          {images[0] && (
            <>
              <Image
                src={images[0]}
                alt={project.title}
                fill
                priority
                className="object-cover opacity-[0.18]"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-dark)]/50 via-[var(--color-dark)]/75 to-[var(--color-dark)]" />
            </>
          )}

          <div className="relative z-10 max-w-4xl">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-8 font-mono text-[0.68rem] text-white/20">
              <Link href="/" className="hover:text-white/50 transition-colors no-underline">Accueil</Link>
              <span>/</span>
              <Link href="/projects" className="hover:text-white/50 transition-colors no-underline">Projets</Link>
              <span>/</span>
              <span className="text-white/45">{project.title}</span>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2.5 mb-6 flex-wrap">
              <span className="inline-flex items-center px-3 py-1 rounded-full border border-[var(--color-red)]/40 text-[var(--color-red)] text-[0.65rem] font-mono uppercase tracking-wider">
                {CATEGORY_LABEL[project.category]}
              </span>
              {project.featured && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/[0.07] text-white/35 text-[0.65rem] font-mono uppercase tracking-wider">
                  Featured
                </span>
              )}
              {year && (
                <span className="text-white/20 text-[0.65rem] font-mono">{year}</span>
              )}
            </div>

            {/* Titre */}
            <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.025em] text-white mb-5">
              {project.title}
            </h1>

            {/* Description */}
            <p className="text-white/40 text-[0.9rem] leading-relaxed max-w-lg">
              {project.description}
            </p>
          </div>
        </div>

        {/* ── Contenu principal ── */}
        <div className="lg:grid lg:grid-cols-[1fr_300px] min-h-[60vh]">

          {/* ── Visuels ── */}
          <div className="bg-[#0d0d0d] px-5 md:px-10 py-12">
            {images.length > 0 ? (
              <ImageGallery images={images} title={project.title} />
            ) : (
              <div className={`flex items-end min-h-[55vh] rounded-2xl p-8 relative overflow-hidden ${CARD_BG[project.category] ?? "bg-[#1a1a1a]"}`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="relative z-10">
                  <p className="font-mono text-[0.58rem] text-white/25 uppercase tracking-widest mb-2">
                    {CATEGORY_LABEL[project.category]}
                  </p>
                  <p className="font-display text-[clamp(2rem,5vw,4rem)] text-white leading-tight mb-2">
                    {project.title}
                  </p>
                  <p className="text-white/25 text-[0.8rem]">Visuels à venir</p>
                </div>
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <aside className="bg-[var(--color-cream)] border-l border-black/[0.06] lg:sticky lg:top-[5rem] lg:self-start lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto">

            <div className="px-6 py-8 space-y-7">

              {/* Numéro + catégorie */}
              <div className="flex items-center justify-between pb-5 border-b border-black/[0.06]">
                <span className="font-mono text-[0.58rem] text-[#ccc] uppercase tracking-widest">
                  N°{String(currentIndex + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[0.62rem] text-[var(--color-red)] uppercase tracking-wider">
                  {CATEGORY_LABEL[project.category]}
                </span>
              </div>

              {/* Outils */}
              {tools.length > 0 && (
                <div>
                  <p className="section-label mb-3">Outils</p>
                  <div className="flex flex-wrap gap-1.5">
                    {tools.map(t => (
                      <span key={t} className="px-3 py-1 rounded-full bg-[var(--color-dark)] text-white text-[0.7rem] font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Liens */}
              {links && (links.live || links.behance || links.github) && (
                <div>
                  <p className="section-label mb-3">Liens</p>
                  <div className="flex flex-col gap-2">
                    {links.live && (
                      <a href={links.live} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-[var(--color-red)] text-white text-[0.78rem] font-medium no-underline hover:opacity-90 transition-opacity">
                        Voir le site live
                        <svg width="9" height="9" viewBox="0 0 13 13" fill="none"><path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </a>
                    )}
                    {links.behance && (
                      <a href={links.behance} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl border border-black/10 text-[var(--color-dark)] text-[0.78rem] font-medium no-underline hover:bg-black/[0.04] transition-colors">
                        Behance
                        <svg width="9" height="9" viewBox="0 0 13 13" fill="none"><path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </a>
                    )}
                    {links.github && (
                      <a href={links.github} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl border border-black/10 text-[var(--color-dark)] text-[0.78rem] font-medium no-underline hover:bg-black/[0.04] transition-colors">
                        GitHub
                        <svg width="9" height="9" viewBox="0 0 13 13" fill="none"><path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="rounded-xl bg-[var(--color-dark)] p-5">
                <p className="text-[0.76rem] text-white/35 leading-relaxed mb-4">
                  Un projet similaire ? Discutons-en.
                </p>
                <Link href="/#contact"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-red)] text-white text-[0.72rem] font-semibold no-underline hover:opacity-90 transition-opacity">
                  Me contacter
                  <svg width="8" height="8" viewBox="0 0 13 13" fill="none"><path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>

              {/* Retour */}
              <Link href="/projects"
                className="inline-flex items-center gap-1.5 text-[0.75rem] text-[#bbb] no-underline hover:text-[var(--color-dark)] transition-colors">
                <svg width="10" height="10" viewBox="0 0 13 13" fill="none">
                  <path d="M11.5 1.5L1.5 11.5M1.5 11.5H8.5M1.5 11.5V4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Tous les projets
              </Link>

            </div>
          </aside>
        </div>

        {/* ── Étude de cas ── */}
        {project.caseStudy && (
          <div className="border-t border-black/[0.06] px-5 md:px-10 lg:px-20 py-16 md:py-24">
            <div className="max-w-2xl">
              <p className="section-label mb-8">Étude de cas</p>
              <div className="space-y-5">
                {project.caseStudy.split(/\n\n+/).map((para, i) => (
                  <p key={i} className="text-[#555] text-[0.95rem] leading-[1.9]">
                    {para.split("\n").map((line, j, arr) => (
                      <span key={j}>
                        {line}
                        {j < arr.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Navigation précédent / suivant ── */}
        {(prevProject || nextProject) && (
          <div className="border-t border-black/[0.06]">
            <div className="grid grid-cols-1 md:grid-cols-2">

              {prevProject ? (
                <Link
                  href={`/projects/${prevProject.slug}`}
                  className="group relative flex flex-col justify-between gap-4 p-8 md:p-12 md:border-r border-black/[0.06] no-underline overflow-hidden hover:bg-black/[0.02] transition-colors"
                >
                  {(prevProject.images as string[])?.[0] && (
                    <Image
                      src={(prevProject.images as string[])[0]}
                      alt={prevProject.title}
                      fill
                      className="object-cover opacity-[0.04] group-hover:opacity-[0.08] transition-opacity"
                      sizes="50vw"
                    />
                  )}
                  <p className="relative font-mono text-[0.6rem] text-[#bbb] uppercase tracking-widest flex items-center gap-2">
                    <svg width="9" height="9" viewBox="0 0 13 13" fill="none">
                      <path d="M11.5 1.5L1.5 11.5M1.5 11.5H8.5M1.5 11.5V4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Précédent
                  </p>
                  <div className="relative">
                    <p className="font-mono text-[0.6rem] text-[#ccc] uppercase tracking-wider mb-2">
                      {CATEGORY_LABEL[prevProject.category]}
                    </p>
                    <h3 className="font-display text-[1.5rem] md:text-[1.8rem] leading-tight text-[var(--color-dark)] group-hover:text-[var(--color-red)] transition-colors">
                      {prevProject.title}
                    </h3>
                  </div>
                </Link>
              ) : <div className="hidden md:block" />}

              {nextProject ? (
                <Link
                  href={`/projects/${nextProject.slug}`}
                  className="group relative flex flex-col justify-between gap-4 p-8 md:p-12 md:text-right no-underline overflow-hidden hover:bg-black/[0.02] transition-colors border-t md:border-t-0 border-black/[0.06]"
                >
                  {(nextProject.images as string[])?.[0] && (
                    <Image
                      src={(nextProject.images as string[])[0]}
                      alt={nextProject.title}
                      fill
                      className="object-cover opacity-[0.04] group-hover:opacity-[0.08] transition-opacity"
                      sizes="50vw"
                    />
                  )}
                  <p className="relative font-mono text-[0.6rem] text-[#bbb] uppercase tracking-widest flex items-center gap-2 md:justify-end">
                    Suivant
                    <svg width="9" height="9" viewBox="0 0 13 13" fill="none">
                      <path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </p>
                  <div className="relative">
                    <p className="font-mono text-[0.6rem] text-[#ccc] uppercase tracking-wider mb-2">
                      {CATEGORY_LABEL[nextProject.category]}
                    </p>
                    <h3 className="font-display text-[1.5rem] md:text-[1.8rem] leading-tight text-[var(--color-dark)] group-hover:text-[var(--color-red)] transition-colors">
                      {nextProject.title}
                    </h3>
                  </div>
                </Link>
              ) : <div className="hidden md:block" />}

            </div>
          </div>
        )}

      </main>
      <Footer />
    </>
  );
}
