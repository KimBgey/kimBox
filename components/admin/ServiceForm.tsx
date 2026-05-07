"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createService, updateService, deleteService } from "@/lib/actions/services";
import type { Service } from "@/lib/db/schema";

const field = "flex flex-col gap-1.5";
const lbl = "text-[0.7rem] font-semibold text-[#999] uppercase tracking-wider";
const inp = "w-full px-3.5 py-2.5 text-sm bg-[#fafafa] border border-black/[0.08] rounded-xl outline-none focus:bg-white focus:border-[var(--color-red)] focus:ring-2 focus:ring-[var(--color-red)]/10 transition-all placeholder:text-[#ccc]";
const card = "bg-white rounded-2xl border border-black/[0.06] p-6 space-y-5";
const sectionTitle = "text-[0.65rem] font-semibold text-[#bbb] uppercase tracking-widest pb-1 border-b border-black/[0.05]";

export default function ServiceForm({ service }: { service?: Service }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const isEdit = !!service;

  const features = Array.isArray(service?.features) ? (service.features as string[]).join("\n") : "";

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await (isEdit ? updateService(service.id, formData) : createService(formData));
      if (result?.error) toast.error(result.error);
      else { toast.success(isEdit ? "Service mis à jour !" : "Service créé avec succès !"); router.push("/admin/services"); }
    });
  }

  function handleDelete() {
    if (!service) return;
    toast("Supprimer « " + service.title + " » ?", {
      description: "Cette action est irréversible.",
      action: {
        label: "Supprimer",
        onClick: () =>
          startTransition(async () => {
            const result = await deleteService(service.id);
            if (result?.error) toast.error(result.error);
            else { toast.success("Service supprimé."); router.push("/admin/services"); }
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
            <p className={sectionTitle}>Identité</p>
            <div className="grid grid-cols-2 gap-4">
              <div className={field}>
                <label className={lbl}>Titre *</label>
                <input name="title" required defaultValue={service?.title} className={inp} placeholder="ex: Identité Visuelle" />
              </div>
              <div className={field}>
                <label className={lbl}>Type *</label>
                <select name="type" required defaultValue={service?.type ?? "design"} title="Type de service" className={inp}>
                  <option value="design">Design</option>
                  <option value="dev">Développement</option>
                  <option value="bundle">Bundle</option>
                </select>
              </div>
            </div>
            <div className={field}>
              <label className={lbl}>Description *</label>
              <textarea name="description" required rows={4} defaultValue={service?.description} className={`${inp} resize-none`} placeholder="Ce service inclut…" />
            </div>
          </div>

          <div className={card}>
            <p className={sectionTitle}>Fonctionnalités incluses <span className="normal-case font-normal text-[#ccc]">— une par ligne</span></p>
            <textarea name="features" rows={8} defaultValue={features} className={`${inp} resize-y font-mono text-[0.8rem]`} placeholder={"Logo + charte graphique\nMaquette Figma\nIntégration responsive\n…"} />
          </div>
        </div>

        {/* ── Colonne latérale ── */}
        <div className="space-y-5">

          <div className={card}>
            <p className={sectionTitle}>Tarification</p>
            <div className={field}>
              <label className={lbl}>Fourchette de prix</label>
              <input name="priceRange" defaultValue={service?.priceRange ?? ""} className={inp} placeholder="500€ – 1 500€" />
            </div>
          </div>

          <div className={card}>
            <p className={sectionTitle}>Options</p>
            <div className={field}>
              <label className={lbl}>Ordre d'affichage</label>
              <input name="order" type="number" defaultValue={service?.order ?? 0} title="Ordre" className={inp} />
            </div>
          </div>

          <div className={card}>
            <button type="submit" disabled={pending} className="w-full py-3 rounded-xl bg-[var(--color-dark)] text-white text-sm font-semibold hover:opacity-80 disabled:opacity-50 transition-opacity cursor-pointer">
              {pending ? "Enregistrement…" : isEdit ? "Sauvegarder" : "Créer le service"}
            </button>
            <button type="button" onClick={() => router.push("/admin/services")} className="w-full py-2.5 rounded-xl border border-black/10 text-sm text-[#888] hover:text-[var(--color-dark)] hover:border-black/20 transition-colors cursor-pointer">
              Annuler
            </button>
            {isEdit && (
              <button type="button" onClick={handleDelete} disabled={pending} className="w-full py-2.5 rounded-xl text-sm text-[#cc3333] border border-[#cc3333]/20 hover:bg-[#cc3333]/5 transition-colors cursor-pointer mt-2">
                Supprimer le service
              </button>
            )}
          </div>

        </div>
      </div>
    </form>
  );
}
