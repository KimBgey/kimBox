import { db } from "@/lib/db";
import { testimonials, projects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminTestimonials() {
  const rows = await db
    .select({ t: testimonials, projectTitle: projects.title })
    .from(testimonials)
    .leftJoin(projects, eq(testimonials.projectId, projects.id));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl md:text-4xl text-[var(--color-dark)]">Témoignages</h1>
          <p className="text-[0.8125rem] text-[#999] mt-1">{rows.length} témoignage{rows.length !== 1 ? "s" : ""}</p>
        </div>
        <Link href="/admin/testimonials/new" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-dark)] text-white text-sm font-semibold no-underline hover:opacity-80 transition-opacity">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Nouveau témoignage
        </Link>
      </div>

      {rows.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-black/[0.06]">
          <p className="text-[#bbb] text-sm mb-3">Aucun témoignage pour l&apos;instant.</p>
          <Link href="/admin/testimonials/new" className="text-sm text-[var(--color-red)] no-underline hover:opacity-70">Créer le premier →</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rows.map(({ t, projectTitle }) => (
            <div key={t.id} className="bg-white rounded-2xl border border-black/[0.06] p-5 hover:border-black/10 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="font-medium text-[var(--color-dark)] text-[0.9375rem]">{t.author}</span>
                  {t.role && <span className="text-[#888] text-[0.8125rem]"> — {t.role}</span>}
                  {projectTitle && (
                    <p className="text-[0.72rem] text-[#bbb] mt-0.5">{projectTitle}</p>
                  )}
                </div>
                {!t.visible && (
                  <span className="text-[0.68rem] px-2 py-0.5 rounded-full bg-black/[0.05] text-[#aaa]">Masqué</span>
                )}
              </div>

              <p className="text-[0.8375rem] text-[#666] leading-relaxed line-clamp-3 mb-4">&ldquo;{t.text}&rdquo;</p>

              <div className="flex items-center gap-4 pt-3 border-t border-black/[0.05]">
                <Link href={`/admin/testimonials/${t.id}/edit`} className="text-[0.8125rem] text-[var(--color-dark)] no-underline hover:text-[var(--color-red)] transition-colors font-medium">
                  Modifier
                </Link>
                <DeleteButton id={t.id} type="testimonial" name={t.author} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
