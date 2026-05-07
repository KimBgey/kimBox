import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

const CATEGORY_LABEL: Record<string, string> = {
  design: "Design",
  dev: "Dev",
  both: "Design + Dev",
};

export default async function AdminProjects() {
  const allProjects = await db.select().from(projects).orderBy(desc(projects.createdAt));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl md:text-4xl text-[var(--color-dark)]">Projets</h1>
          <p className="text-[0.8125rem] text-[#999] mt-1">{allProjects.length} projet{allProjects.length !== 1 ? "s" : ""}</p>
        </div>
        <Link href="/admin/projects/new" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-dark)] text-white text-sm font-semibold no-underline hover:opacity-80 transition-opacity">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Nouveau projet
        </Link>
      </div>

      {allProjects.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-black/[0.06]">
          <p className="text-[#bbb] text-sm mb-3">Aucun projet pour l&apos;instant.</p>
          <Link href="/admin/projects/new" className="text-sm text-[var(--color-red)] no-underline hover:opacity-70">Créer le premier →</Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-black/[0.06]">
                {["Titre", "Catégorie", "Mis en avant", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[0.7rem] font-semibold text-[#bbb] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allProjects.map((project) => (
                <tr key={project.id} className="border-b border-black/[0.04] last:border-0 hover:bg-[#fafafa] transition-colors group">
                  <td className="px-5 py-4 text-sm font-medium text-[var(--color-dark)]">{project.title}</td>
                  <td className="px-5 py-4">
                    <span className="text-[0.72rem] px-2.5 py-1 rounded-full bg-black/[0.05] text-[#666]">
                      {CATEGORY_LABEL[project.category] ?? project.category}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {project.featured ? (
                      <span className="text-[0.72rem] px-2.5 py-1 rounded-full bg-[var(--color-red)]/10 text-[var(--color-red)]">Oui</span>
                    ) : (
                      <span className="text-[#ccc] text-sm">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-4">
                      <Link href={`/admin/projects/${project.id}/edit`} className="text-[0.8125rem] text-[var(--color-dark)] no-underline hover:text-[var(--color-red)] transition-colors">
                        Modifier
                      </Link>
                      <DeleteButton id={project.id} type="project" name={project.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
