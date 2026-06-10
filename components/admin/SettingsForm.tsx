"use client";

import { useState } from "react";
import { toast } from "sonner";

type Key   = { key: string; label: string; placeholder: string };
type Group = { title: string; keys: Key[] };

const inp = "w-full px-3.5 py-2.5 text-sm bg-[#fafafa] border border-black/[0.08] rounded-xl outline-none focus:bg-white focus:border-[var(--color-red)] focus:ring-2 focus:ring-[var(--color-red)]/10 transition-all placeholder:text-[#ccc]";
const lbl = "text-[0.68rem] font-semibold text-[#aaa] uppercase tracking-wider";

export default function SettingsForm({
  groups,
  values,
}: {
  groups: Group[];
  values: Record<string, string>;
}) {
  const [form, setForm]       = useState<Record<string, string>>(values);
  const [saving, setSaving]   = useState(false);

  const isDirty = JSON.stringify(form) !== JSON.stringify(values);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast.success("Paramètres enregistrés !");
    } catch {
      toast.error("Erreur lors de l'enregistrement.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>

      {/* ── Barre save sticky ── */}
      <div className="sticky top-[69px] lg:top-0 z-10 flex items-center justify-between gap-4 bg-[#f4f3f0]/90 backdrop-blur-md py-3 mb-8 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-10 lg:px-10 border-b border-black/[0.07]">
        <p className="text-[0.75rem] text-[#bbb]">
          {isDirty
            ? <span className="text-amber-500 font-medium">Modifications non enregistrées</span>
            : "Tout est à jour"}
        </p>
        <button
          type="submit"
          disabled={saving || !isDirty}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[var(--color-dark)] text-white text-[0.8125rem] font-semibold hover:opacity-80 disabled:opacity-40 transition-opacity cursor-pointer"
        >
          {saving ? (
            <>
              <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
              Enregistrement…
            </>
          ) : "Enregistrer"}
        </button>
      </div>

      {/* ── Groupes ── */}
      <div className="divide-y divide-black/[0.06]">
        {groups.map((group) => (
          <div
            key={group.title}
            className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-10 py-7"
          >
            {/* Titre du groupe */}
            <div className="sm:w-[160px] shrink-0">
              <p className="text-[0.875rem] font-semibold text-[var(--color-dark)]">{group.title}</p>
            </div>

            {/* Champs */}
            <div className="flex-1 space-y-3">
              {group.keys.map(({ key, label, placeholder }) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <label className={lbl}>{label}</label>
                  <input
                    type="text"
                    value={form[key] ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    title={label}
                    className={inp}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </form>
  );
}
