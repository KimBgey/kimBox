import ProjectForm from "@/components/admin/ProjectForm";
import Link from "next/link";

export default function NewProjectPage() {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
        <Link href="/admin/projects" style={{ fontSize: "0.8125rem", color: "#888", textDecoration: "none" }}>
          ← Projets
        </Link>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", margin: 0 }}>
          Nouveau projet
        </h1>
      </div>
      <ProjectForm />
    </div>
  );
}
