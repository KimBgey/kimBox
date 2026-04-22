"use client";

import { useTransition } from "react";
import { createProject, updateProject, deleteProject } from "@/lib/actions/projects";
import type { Project } from "@/lib/db/schema";

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

export default function ProjectForm({ project }: { project?: Project }) {
  const [pending, startTransition] = useTransition();
  const isEdit = !!project;

  const action = isEdit
    ? (formData: FormData) => startTransition(() => updateProject(project.id, formData))
    : (formData: FormData) => startTransition(() => createProject(formData));

  const handleDelete = () => {
    if (!project) return;
    if (!confirm("Supprimer ce projet ?")) return;
    startTransition(() => deleteProject(project.id));
  };

  const links = project?.links as { live?: string; behance?: string; github?: string } | null;
  const tools = Array.isArray(project?.tools) ? (project.tools as string[]).join(", ") : "";

  return (
    <form action={action} style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: "640px" }}>

      <div style={fieldStyle}>
        <label style={labelStyle}>Titre *</label>
        <input name="title" required defaultValue={project?.title} style={inputStyle} placeholder="Nom du projet" />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Slug (URL)</label>
        <input name="slug" defaultValue={project?.slug} style={inputStyle} placeholder="auto-généré depuis le titre" />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Catégorie *</label>
        <select name="category" required defaultValue={project?.category ?? "both"} style={inputStyle}>
          <option value="design">Design</option>
          <option value="dev">Développement</option>
          <option value="both">Les deux</option>
        </select>
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Description *</label>
        <textarea name="description" required rows={3} defaultValue={project?.description} style={{ ...inputStyle, resize: "vertical" }} placeholder="Courte description du projet…" />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Étude de cas</label>
        <textarea name="caseStudy" rows={6} defaultValue={project?.caseStudy ?? ""} style={{ ...inputStyle, resize: "vertical" }} placeholder="Contenu long (Markdown possible)…" />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Outils (séparés par virgule)</label>
        <input name="tools" defaultValue={tools} style={inputStyle} placeholder="Figma, Next.js, Tailwind…" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Lien live</label>
          <input name="link_live" defaultValue={links?.live ?? ""} style={inputStyle} placeholder="https://…" />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Behance</label>
          <input name="link_behance" defaultValue={links?.behance ?? ""} style={inputStyle} placeholder="https://…" />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>GitHub</label>
          <input name="link_github" defaultValue={links?.github ?? ""} style={inputStyle} placeholder="https://…" />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Ordre d&#39;affichage</label>
          <input name="order" type="number" defaultValue={project?.order ?? 0} style={inputStyle} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", paddingTop: "1.5rem" }}>
          <input type="checkbox" name="featured" id="featured" defaultChecked={project?.featured ?? false} style={{ width: 16, height: 16, accentColor: "var(--color-red)", cursor: "pointer" }} />
          <label htmlFor="featured" style={{ fontSize: "0.875rem", cursor: "pointer" }}>Projet mis en avant</label>
        </div>
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
          {pending ? "Enregistrement…" : isEdit ? "Sauvegarder" : "Créer le projet"}
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
