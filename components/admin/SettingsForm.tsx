"use client";

import { useState } from "react";

type Key = { key: string; label: string; placeholder: string };

export default function SettingsForm({
  keys,
  values,
}: {
  keys: Key[];
  values: Record<string, string>;
}) {
  const [form, setForm] = useState<Record<string, string>>(values);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        border: "1px solid #e8e6e1",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        maxWidth: "560px",
      }}
    >
      {keys.map(({ key, label, placeholder }) => (
        <div key={key}>
          <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 500, marginBottom: "0.375rem", color: "#555" }}>
            {label}
          </label>
          <input
            type="text"
            value={form[key] ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
            placeholder={placeholder}
            style={{
              width: "100%",
              padding: "0.625rem 0.875rem",
              border: "1px solid #d0cec8",
              borderRadius: "8px",
              fontSize: "0.875rem",
              outline: "none",
            }}
          />
        </div>
      ))}

      <button
        type="submit"
        disabled={saving}
        style={{
          alignSelf: "flex-start",
          padding: "0.625rem 1.5rem",
          backgroundColor: saved ? "#0F6E56" : "var(--color-red)",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontSize: "0.875rem",
          fontWeight: 500,
          cursor: saving ? "not-allowed" : "pointer",
          transition: "background 0.3s",
        }}
      >
        {saved ? "Enregistré ✓" : saving ? "Enregistrement…" : "Enregistrer"}
      </button>
    </form>
  );
}
