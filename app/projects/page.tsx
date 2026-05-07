import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projets — André Kim",
  description: "Tous les projets de design et développement d'André Kim.",
};

const CATEGORY_LABEL: Record<string, string> = { design: "Design", dev: "Dev", both: "Design + Dev" };
const CARD_COLORS = ["#1a1a1a", "#D43333", "#2a2a2a", "#8B7355", "#1a1a1a", "#D43333"];

export default async function ProjectsPage() {
  const allProjects = await db.select().from(projects).orderBy(projects.order);

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[var(--color-cream)] pt-24 pb-32 px-5 md:px-10 lg:px-20">
        <div className="mb-14">
          <h1 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-dark)]">
            Tous les projets
          </h1>
        </div>

        {allProjects.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl aspect-[4/3] animate-pulse" style={{ backgroundColor: CARD_COLORS[i % CARD_COLORS.length], opacity: 0.15 }} />
            ))}
            <div className="col-span-full text-center text-[#888] text-sm pt-4">
              Aucun projet encore. <Link href="/admin/projects/new" className="text-[var(--color-red)]">Ajouter depuis l&apos;admin →</Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[280px] gap-4">
            {allProjects.map((project, i) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className={`group relative rounded-2xl overflow-hidden no-underline ${i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
              >
                <div
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]"
                  style={{ backgroundColor: CARD_COLORS[i % CARD_COLORS.length] }}
                >
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
                {(project.images as string[])?.[0] && (
                  <div className="absolute inset-0 bg-black/40" />
                )}
                <span className="absolute top-4 left-5 section-label text-white/30">
                  N°{String(i + 1).padStart(2, "0")}
                </span>
                <span className="absolute top-4 right-5 text-[0.7rem] px-3 py-1 rounded-full bg-white/10 text-white font-medium tracking-wide">
                  {CATEGORY_LABEL[project.category]}
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent">
                  <h2 className="font-display text-xl md:text-2xl text-white leading-tight mb-1">{project.title}</h2>
                  <p className="text-white/60 text-sm leading-snug line-clamp-2">{project.description}</p>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[var(--color-red)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg width="16" height="16" viewBox="0 0 13 13" fill="none">
                    <path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
