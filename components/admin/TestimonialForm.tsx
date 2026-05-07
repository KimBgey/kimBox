"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createTestimonial, updateTestimonial, deleteTestimonial } from "@/lib/actions/testimonials";
import type { Testimonial, Project } from "@/lib/db/schema";

const field = "flex flex-col gap-1.5";
const lbl = "text-[0.7rem] font-semibold text-[#999] uppercase tracking-wider";
const inp = "w-full px-3.5 py-2.5 text-sm bg-[#fafafa] border border-black/[0.08] rounded-xl outline-none focus:bg-white focus:border-[var(--color-red)] focus:ring-2 focus:ring-[var(--color-red)]/10 transition-all placeholder:text-[#ccc]";
const card = "bg-white rounded-2xl border border-black/[0.06] p-6 space-y-5";
const sectionTitle = "text-[0.65rem] font-semibold text-[#bbb] uppercase tracking-widest pb-1 border-b border-black/[0.05]";

export default function TestimonialForm({
  testimonial,
  allProjects,
}: {
  testimonial?: Testimonial;
  allProjects: Pick<Project, "id" | "title">[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const isEdit = !!testimonial;

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await (isEdit
        ? updateTestimonial(testimonial.id, formData)
        : createTestimonial(formData));
      if (result?.error) toast.error(result.error);
      else { toast.success(isEdit ? "Témoignage mis à jour !" : "Témoignage créé !"); router.push("/admin/testimonials"); }
    });
  }

  function handleDelete() {
    if (!testimonial) return;
    toast("Supprimer le témoignage de « " + testimonial.author + " » ?", {
      description: "Cette action est irréversible.",
      action: {
        label: "Supprimer",
        onClick: () =>
          startTransition(async () => {
            const result = await deleteTestimonial(testimonial.id);
            if (result?.error) toast.error(result.error);
            else { toast.success("Témoignage supprimé."); router.push("/admin/testimonials"); }
          }),
      },
      cancel: { label: "Annuler", onClick: () => {} },
      duration: 8000,
    });
  }

  return (
    <form action={handleSubmit}>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">

        {/* ── Colonne principale ── */}
        <div className="xl:col-span-2 space-y-5">

          <div className={card}>
            <p className={sectionTitle}>Auteur</p>
            <div className="grid grid-cols-2 gap-4">
              <div className={field}>
                <label className={lbl}>Nom *</label>
                <input name="author" required defaultValue={testimonial?.author} className={inp} placeholder="Prénom Nom" />
              </div>
              <div className={field}>
                <label className={lbl}>Rôle / Entreprise</label>
                <input name="role" defaultValue={testimonial?.role ?? ""} className={inp} placeholder="CEO, Acme Corp" />
              </div>
            </div>
          </div>

          <div className={card}>
            <p className={sectionTitle}>Témoignage</p>
            <div className={field}>
              <label className={lbl}>Contenu *</label>
              <textarea name="text" required rows={7} defaultValue={testimonial?.text} className={`${inp} resize-none`} placeholder="« Ce que le client a dit de votre travail… »" />
            </div>
          </div>
        </div>

        {/* ── Colonne latérale ── */}
        <div className="space-y-5">

          <div className={card}>
            <p className={sectionTitle}>Association</p>
            <div className={field}>
              <label className={lbl}>Projet lié</label>
              <select name="projectId" defaultValue={testimonial?.projectId?.toString() ?? ""} title="Projet associé" className={inp}>
                <option value="">— Aucun —</option>
                {allProjects.map((p) => (
                  <option key={p.id} value={p.id.toString()}>{p.title}</option>
                ))}
              </select>
            </div>

            <label className="flex items-center gap-3 cursor-pointer select-none pt-1">
              <div className="relative shrink-0">
                <input type="checkbox" name="visible" id="visible" defaultChecked={testimonial?.visible ?? true} title="Visible sur le site" className="peer sr-only" />
                <div className="w-10 h-6 rounded-full bg-black/10 peer-checked:bg-[var(--color-red)] transition-colors" />
                <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow peer-checked:translate-x-4 transition-transform" />
              </div>
              <div>
                <span className="text-sm font-medium text-[var(--color-dark)]">Visible sur le site</span>
                <p className="text-[0.72rem] text-[#bbb]">Affiché dans la section témoignages</p>
              </div>
            </label>
          </div>

          <div className={card}>
            <button type="submit" disabled={pending} className="w-full py-3 rounded-xl bg-[var(--color-dark)] text-white text-sm font-semibold hover:opacity-80 disabled:opacity-50 transition-opacity cursor-pointer">
              {pending ? "Enregistrement…" : isEdit ? "Sauvegarder" : "Créer le témoignage"}
            </button>
            <button type="button" onClick={() => router.push("/admin/testimonials")} className="w-full py-2.5 rounded-xl border border-black/10 text-sm text-[#888] hover:text-[var(--color-dark)] hover:border-black/20 transition-colors cursor-pointer">
              Annuler
            </button>
            {isEdit && (
              <button type="button" onClick={handleDelete} disabled={pending} className="w-full py-2.5 rounded-xl text-sm text-[#cc3333] border border-[#cc3333]/20 hover:bg-[#cc3333]/5 transition-colors cursor-pointer mt-2">
                Supprimer le témoignage
              </button>
            )}
          </div>

        </div>
      </div>
    </form>
  );
}
