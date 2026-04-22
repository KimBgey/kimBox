"use client";

import { useTransition } from "react";
import { createService, updateService, deleteService } from "@/lib/actions/services";
import type { Service } from "@/lib/db/schema";

const inputStyle = {
  width: "100%",
  padding: "0.5rem 0.75rem",
  border: "1px solid #e0ddd8",
  borderRadius: "8px",
  fontSize: "0.875rem",
  backgroundColor: "#fff",
  outline: "none",
  boxSizing: "border-box" as const,
};

const labelStyle = {
  display: "block",
  fontSize: "0.75rem",
  fontWeight: 500,
  color: "#888",
  marginBottom: "0.375rem",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};

const fieldStyle = { display: "flex", flexDirection: "column" as const, gap: "0.25rem" };

export default function ServiceForm({ service }: { service?: Service }) {
  const [pending, startTransition] = useTransition();
  const isEdit = !!service;

  const action = isEdit
    ? (formData: FormData) => startTransition(() => updateService(service.id, formData))
    : (formData: FormData) => startTransition(() => createService(formData));

  const handleDelete = () => {
    if (!service) return;
    if (!confirm("Supprimer ce service ?")) return;
    startTransition(() => deleteService(service.id));
  };

  const features = Array.isArray(service?.features)
    ? (service.features as string[]).join("\n")
    : "";

  return (
    <form action={action} style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: "540px" }}>

      <div style={fieldStyle}>
        <label style={labelStyle}>Titre *</label>
        <input name="title" required defaultValue={service?.title} style={inputStyle} placeholder="ex: Identité Visuelle" />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Type *</label>
        <select name="type" required defaultValue={service?.type ?? "design"} style={inputStyle}>
          <option value="design">Design</option>
          <option value="dev">Développement</option>
          <option value="bundle">Bundle</option>
        </select>
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Description *</label>
        <textarea name="description" required rows={3} defaultValue={service?.description} style={{ ...inputStyle, resize: "vertical" }} />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Fourchette de prix</label>
        <input name="priceRange" defaultValue={service?.priceRange ?? ""} style={inputStyle} placeholder="ex: 500€ – 1 500€" />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Fonctionnalités incluses (une par ligne)</label>
        <textarea name="features" rows={5} defaultValue={features} style={{ ...inputStyle, resize: "vertical" }} placeholder={"Logo + charte graphique\nMaquette Figma\n..."} />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Ordre d&#39;affichage</label>
        <input name="order" type="number" defaultValue={service?.order ?? 0} style={{ ...inputStyle, width: "120px" }} />
      </div>

      <div style={{ display: "flex", gap: "0.75rem", paddingTop: "0.5rem" }}>
        <button
          type="submit"
          disabled={pending}
          style={{
            padding: "0.6rem 1.5rem",
            backgroundColor: "var(--color-red)",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "0.875rem",
            fontWeight: 500,
            cursor: pending ? "not-allowed" : "pointer",
            opacity: pending ? 0.6 : 1,
          }}
        >
          {pending ? "Enregistrement…" : isEdit ? "Sauvegarder" : "Créer le service"}
        </button>

        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={pending}
            style={{
              padding: "0.6rem 1.5rem",
              backgroundColor: "transparent",
              color: "#cc3333",
              border: "1px solid #cc3333",
              borderRadius: "8px",
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
          >
            Supprimer
          </button>
        )}
      </div>
    </form>
  );
}
