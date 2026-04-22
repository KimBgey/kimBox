"use client";

import { useTransition } from "react";
import { createTestimonial, updateTestimonial, deleteTestimonial } from "@/lib/actions/testimonials";
import type { Testimonial, Project } from "@/lib/db/schema";

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

export default function TestimonialForm({
  testimonial,
  allProjects,
}: {
  testimonial?: Testimonial;
  allProjects: Pick<Project, "id" | "title">[];
}) {
  const [pending, startTransition] = useTransition();
  const isEdit = !!testimonial;

  const action = isEdit
    ? (formData: FormData) => startTransition(() => updateTestimonial(testimonial.id, formData))
    : (formData: FormData) => startTransition(() => createTestimonial(formData));

  const handleDelete = () => {
    if (!testimonial) return;
    if (!confirm("Supprimer ce témoignage ?")) return;
    startTransition(() => deleteTestimonial(testimonial.id));
  };

  return (
    <form action={action} style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: "540px" }}>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Auteur *</label>
          <input name="author" required defaultValue={testimonial?.author} style={inputStyle} placeholder="Prénom Nom" />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Rôle / Entreprise</label>
          <input name="role" defaultValue={testimonial?.role ?? ""} style={inputStyle} placeholder="CEO, Acme Corp" />
        </div>
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Témoignage *</label>
        <textarea name="text" required rows={4} defaultValue={testimonial?.text} style={{ ...inputStyle, resize: "vertical" }} placeholder="Le témoignage complet…" />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Projet associé</label>
        <select name="projectId" defaultValue={testimonial?.projectId?.toString() ?? ""} style={inputStyle}>
          <option value="">— Aucun —</option>
          {allProjects.map((p) => (
            <option key={p.id} value={p.id.toString()}>{p.title}</option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <input
          type="checkbox"
          name="visible"
          id="visible"
          defaultChecked={testimonial?.visible ?? true}
          style={{ width: 16, height: 16, accentColor: "var(--color-red)", cursor: "pointer" }}
        />
        <label htmlFor="visible" style={{ fontSize: "0.875rem", cursor: "pointer" }}>Visible sur le site</label>
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
          {pending ? "Enregistrement…" : isEdit ? "Sauvegarder" : "Créer le témoignage"}
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
