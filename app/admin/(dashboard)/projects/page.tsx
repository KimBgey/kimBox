import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import Image from "next/image";
import DeleteButton from "@/components/admin/DeleteButton";

const CATEGORY_LABEL: Record<string, string> = {
  design: "Design",
  dev: "Dev",
  both: "Design + Dev",
};

const CATEGORY_COLOR: Record<string, string> = {
  design: "bg-[#1a1a1a]",
  dev: "bg-[var(--color-red)]",
  both: "bg-[#8B7355]",
};

const CATEGORY_BADGE: Record<string, string> = {
  design: "bg-black/[0.06] text-[#666]",
  dev: "bg-[var(--color-red)]/10 text-[var(--color-red)]",
  both: "bg-[#8B7355]/10 text-[#8B7355]",
};

export default async function AdminProjects() {
  const allProjects = await db.select().from(projects).orderBy(desc(projects.createdAt));

  return (
    <div className="max-w-5xl">

      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <div>
          <p className="font-mono text-[0.6rem] text-[#bbb] uppercase tracking-widest mb-1">Admin</p>
          <h1 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] leading-tight text-[var(--color-dark)]">Projets</h1>
          <p className="text-[0.8125rem] text-[#aaa] mt-0.5">
            {allProjects.length} projet{allProjects.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-dark)] text-white text-[0.8125rem] font-semibold no-underline hover:opacity-80 transition-opacity shrink-0"
        >
          <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="10" y1="3" x2="10" y2="17" /><line x1="3" y1="10" x2="17" y2="10" />
          </svg>
          <span className="hidden sm:inline">Nouveau projet</span>
          <span className="sm:hidden">Nouveau</span>
        </Link>
      </div>

      {allProjects.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-black/[0.06]">
          <p className="text-[#bbb] text-sm mb-3">Aucun projet pour l&apos;instant.</p>
          <Link href="/admin/projects/new" className="text-sm text-[var(--color-red)] no-underline hover:opacity-70">
            Créer le premier →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">

          {/* Header table — caché sur très petit écran */}
          <div className="hidden sm:grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-4 px-5 py-3 border-b border-black/[0.05]">
            <div className="w-10" />
            <p className="text-[0.65rem] font-semibold text-[#bbb] uppercase tracking-wider">Titre</p>
            <p className="text-[0.65rem] font-semibold text-[#bbb] uppercase tracking-wider w-[90px]">Catégorie</p>
            <p className="text-[0.65rem] font-semibold text-[#bbb] uppercase tracking-wider w-[60px] text-center">Featured</p>
            <p className="text-[0.65rem] font-semibold text-[#bbb] uppercase tracking-wider w-[100px] text-right">Actions</p>
          </div>

          <div className="divide-y divide-black/[0.04]">
            {allProjects.map((project) => {
              const firstImg = (project.images as string[])?.[0];
              return (
                <div
                  key={project.id}
                  className="group grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1fr_auto_auto_auto] items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3.5 hover:bg-[#fafafa] transition-colors"
                >
                  {/* Thumbnail */}
                  <div className={`w-10 h-10 rounded-xl overflow-hidden shrink-0 relative ${CATEGORY_COLOR[project.category] ?? "bg-[#1a1a1a]"}`}>
                    {firstImg ? (
                      <Image src={firstImg} alt={project.title} fill className="object-cover" sizes="40px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-white/30 text-[0.5rem] font-mono uppercase">{project.category.slice(0, 2)}</span>
                      </div>
                    )}
                  </div>

                  {/* Titre + catégorie sur mobile */}
                  <div className="min-w-0">
                    <p className="text-[0.875rem] font-medium text-[var(--color-dark)] truncate">{project.title}</p>
                    <p className="sm:hidden text-[0.7rem] text-[#bbb]">{CATEGORY_LABEL[project.category]}</p>
                  </div>

                  {/* Catégorie — desktop only */}
                  <div className="hidden sm:block w-[90px]">
                    <span className={`text-[0.68rem] px-2.5 py-1 rounded-full font-medium ${CATEGORY_BADGE[project.category] ?? "bg-black/[0.05] text-[#666]"}`}>
                      {CATEGORY_LABEL[project.category]}
                    </span>
                  </div>

                  {/* Featured — desktop only */}
                  <div className="hidden sm:flex w-[60px] justify-center">
                    {project.featured ? (
                      <svg width="15" height="15" viewBox="0 0 20 20" fill="var(--color-red)">
                        <path d="M10 2l2.09 4.26L17 7.27l-3.5 3.41.83 4.82L10 13.27l-4.33 2.23.83-4.82L3 7.27l4.91-.71L10 2z" />
                      </svg>
                    ) : (
                      <span className="text-[#e0e0e0] text-lg leading-none">—</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 sm:w-[100px] sm:justify-end">
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-dark)]/[0.05] text-[var(--color-dark)] text-[0.75rem] font-medium no-underline hover:bg-[var(--color-dark)] hover:text-white transition-colors"
                    >
                      <svg width="11" height="11" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 3a2 2 0 012.83 2.83L6 16.66l-4 1 1-4L14 3z" />
                      </svg>
                      <span className="hidden sm:inline">Modifier</span>
                    </Link>
                    <DeleteButton id={project.id} type="project" name={project.title} />
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
