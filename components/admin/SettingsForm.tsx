"use client";

import { useState } from "react";
import { toast } from "sonner";

type Key = { key: string; label: string; placeholder: string };

const input = "w-full px-3.5 py-2.5 text-sm bg-white border border-black/10 rounded-xl outline-none focus:border-[var(--color-red)] focus:ring-2 focus:ring-[var(--color-red)]/10 transition-all placeholder:text-[#ccc]";
const labelCls = "text-[0.7rem] font-semibold text-[#999] uppercase tracking-wider";

export default function SettingsForm({
  keys,
  values,
}: {
  keys: Key[];
  values: Record<string, string>;
}) {
  const [form, setForm] = useState<Record<string, string>>(values);
  const [saving, setSaving] = useState(false);

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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="bg-white rounded-2xl border border-black/[0.06] p-6 space-y-5">
        <p className="text-[0.7rem] font-semibold text-[#bbb] uppercase tracking-widest">Configuration</p>

        {keys.map(({ key, label, placeholder }) => (
          <div key={key} className="flex flex-col gap-1.5">
            <label className={labelCls}>{label}</label>
            <input
              type="text"
              value={form[key] ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
              placeholder={placeholder}
              title={label}
              className={input}
            />
          </div>
        ))}
      </div>

      <button
        type="submit" disabled={saving}
        className="px-6 py-2.5 rounded-xl bg-[var(--color-dark)] text-white text-sm font-semibold hover:opacity-80 disabled:opacity-50 transition-opacity cursor-pointer"
      >
        {saving ? "Enregistrement…" : "Enregistrer les paramètres"}
      </button>
    </form>
  );
}
