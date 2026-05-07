"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createProject, updateProject, deleteProject } from "@/lib/actions/projects";
import ImageUpload from "@/components/admin/ImageUpload";
import type { Project } from "@/lib/db/schema";

const field = "flex flex-col gap-1.5";
const lbl = "text-[0.7rem] font-semibold text-[#999] uppercase tracking-wider";
const inp = "w-full px-3.5 py-2.5 text-sm bg-[#fafafa] border border-black/[0.08] rounded-xl outline-none focus:bg-white focus:border-[var(--color-red)] focus:ring-2 focus:ring-[var(--color-red)]/10 transition-all placeholder:text-[#ccc]";
const card = "bg-white rounded-2xl border border-black/[0.06] p-6 space-y-5";
const sectionTitle = "text-[0.65rem] font-semibold text-[#bbb] uppercase tracking-widest pb-1 border-b border-black/[0.05]";

export default function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const isEdit = !!project;

  const [category, setCategory] = useState<"design" | "dev" | "both">(project?.category ?? "both");
  const links = project?.links as { live?: string; behance?: string; github?: string } | null;
  const tools = Array.isArray(project?.tools) ? (project.tools as string[]).join(", ") : "";
  const initialImages = Array.isArray(project?.images) ? (project.images as string[]) : [];

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await (isEdit
        ? updateProject(project.id, formData)
        : createProject(formData));
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(isEdit ? "Projet mis à jour !" : "Projet créé avec succès !");
        router.push("/admin/projects");
      }
    });
  }

  function handleDelete() {
    if (!project) return;
    toast("Supprimer « " + project.title + " » ?", {
      description: "Cette action est irréversible.",
      action: {
        label: "Supprimer",
        onClick: () =>
          startTransition(async () => {
            const result = await deleteProject(project.id);
            if (result?.error) toast.error(result.error);
            else { toast.success("Projet supprimé."); router.push("/admin/projects"); }
          }),
      },
      cancel: { label: "Annuler", onClick: () => {} },
      duration: 8000,
    });
  }

  return (
    <form action={handleSubmit}>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">

        {/* ── Colonne principale (2/3) ── */}
        <div className="xl:col-span-2 space-y-5">

          {/* Identité */}
          <div className={card}>
            <p className={sectionTitle}>Identité</p>
            <div className={field}>
              <label className={lbl}>Titre *</label>
              <input name="title" required defaultValue={project?.title} className={inp} placeholder="Nom du projet" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className={field}>
                <label className={lbl}>Slug (URL)</label>
                <input name="slug" defaultValue={project?.slug} className={inp} placeholder="auto-généré" />
              </div>
              <div className={field}>
                <label className={lbl}>Catégorie *</label>
                <select name="category" required value={category} onChange={e => setCategory(e.target.value as "design" | "dev" | "both")} title="Catégorie" className={inp}>
                  <option value="design">Design</option>
                  <option value="dev">Développement</option>
                  <option value="both">Les deux</option>
                </select>
              </div>
            </div>
            <div className={field}>
              <label className={lbl}>Description *</label>
              <textarea name="description" required rows={3} defaultValue={project?.description} className={`${inp} resize-none`} placeholder="Courte description visible sur la carte projet…" />
            </div>
          </div>

          {/* Médias */}
          <div className={card}>
            <p className={sectionTitle}>
              {category === "design" ? "Galerie de travaux" : category === "dev" ? "Captures d'écran" : "Médias du projet"}
            </p>
            <ImageUpload initialImages={initialImages} projectId={project?.id} category={category} />
          </div>

          {/* Contenu */}
          <div className={card}>
            <p className={sectionTitle}>Étude de cas</p>
            <div className={field}>
              <label className={lbl}>Contenu long <span className="normal-case font-normal text-[#ccc]">— Markdown supporté</span></label>
              <textarea name="caseStudy" rows={10} defaultValue={project?.caseStudy ?? ""} className={`${inp} resize-y font-mono text-[0.8rem]`} placeholder="## Contexte&#10;&#10;Décris le projet en détail…" />
            </div>
          </div>

          {/* Outils */}
          <div className={card}>
            <p className={sectionTitle}>Stack & outils</p>
            <div className={field}>
              <label className={lbl}>Outils <span className="normal-case font-normal text-[#ccc]">séparés par virgule</span></label>
              <input name="tools" defaultValue={tools} className={inp} placeholder="Figma, Next.js, Tailwind CSS, Framer…" />
            </div>
          </div>
        </div>

        {/* ── Colonne latérale (1/3) ── */}
        <div className="space-y-5">

          {/* Liens */}
          <div className={card}>
            <p className={sectionTitle}>Liens</p>
            <div className={field}>
              <label className={lbl}>Site live</label>
              <input name="link_live" defaultValue={links?.live ?? ""} className={inp} placeholder="https://…" />
            </div>
            <div className={field}>
              <label className={lbl}>Behance</label>
              <input name="link_behance" defaultValue={links?.behance ?? ""} className={inp} placeholder="https://behance.net/…" />
            </div>
            <div className={field}>
              <label className={lbl}>GitHub</label>
              <input name="link_github" defaultValue={links?.github ?? ""} className={inp} placeholder="https://github.com/…" />
            </div>
          </div>

          {/* Options */}
          <div className={card}>
            <p className={sectionTitle}>Options</p>
            <div className={field}>
              <label className={lbl}>Ordre d'affichage</label>
              <input name="order" type="number" defaultValue={project?.order ?? 0} title="Ordre" className={inp} />
            </div>
            <label className="flex items-center gap-3 cursor-pointer select-none pt-1">
              <div className="relative shrink-0">
                <input type="checkbox" name="featured" id="featured" defaultChecked={project?.featured ?? false} title="Mettre en avant" className="peer sr-only" />
                <div className="w-10 h-6 rounded-full bg-black/10 peer-checked:bg-[var(--color-red)] transition-colors" />
                <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow peer-checked:translate-x-4 transition-transform" />
              </div>
              <div>
                <span className="text-sm font-medium text-[var(--color-dark)]">Mis en avant</span>
                <p className="text-[0.72rem] text-[#bbb]">Affiché en priorité sur le site</p>
              </div>
            </label>
          </div>

          {/* Actions */}
          <div className={card}>
            <button type="submit" disabled={pending} className="w-full py-3 rounded-xl bg-[var(--color-dark)] text-white text-sm font-semibold hover:opacity-80 disabled:opacity-50 transition-opacity cursor-pointer">
              {pending ? "Enregistrement…" : isEdit ? "Sauvegarder les modifications" : "Créer le projet"}
            </button>
            <button type="button" onClick={() => router.push("/admin/projects")} className="w-full py-2.5 rounded-xl border border-black/10 text-sm text-[#888] hover:text-[var(--color-dark)] hover:border-black/20 transition-colors cursor-pointer">
              Annuler
            </button>
            {isEdit && (
              <button type="button" onClick={handleDelete} disabled={pending} className="w-full py-2.5 rounded-xl text-sm text-[#cc3333] border border-[#cc3333]/20 hover:bg-[#cc3333]/5 transition-colors cursor-pointer mt-2">
                Supprimer le projet
              </button>
            )}
          </div>

        </div>
      </div>
    </form>
  );
}
