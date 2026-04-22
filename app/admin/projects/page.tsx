import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";

export default async function AdminProjects() {
  const allProjects = await db.select().from(projects).orderBy(desc(projects.createdAt));

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem" }}>Projets</h1>
        <Link
          href="/admin/projects/new"
          style={{
            padding: "0.5rem 1.25rem",
            backgroundColor: "var(--color-red)",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          + Nouveau
        </Link>
      </div>

      {allProjects.length === 0 ? (
        <div style={{ padding: "3rem", textAlign: "center", color: "#888", backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #e8e6e1" }}>
          Aucun projet pour l&#39;instant.{" "}
          <Link href="/admin/projects/new" style={{ color: "var(--color-red)" }}>
            Créer le premier
          </Link>
        </div>
      ) : (
        <div style={{ backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #e8e6e1", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e8e6e1" }}>
                {["Titre", "Catégorie", "Mis en avant", "Actions"].map((h) => (
                  <th key={h} style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", color: "#888", fontWeight: 500 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allProjects.map((project) => (
                <tr key={project.id} style={{ borderBottom: "1px solid #f0ede8" }}>
                  <td style={{ padding: "0.875rem 1rem", fontSize: "0.875rem", fontWeight: 500 }}>
                    {project.title}
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <span style={{
                      fontSize: "0.75rem",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "999px",
                      backgroundColor: "#f0ede8",
                      color: "#555",
                    }}>
                      {project.category}
                    </span>
                  </td>
                  <td style={{ padding: "0.875rem 1rem", fontSize: "0.875rem", color: project.featured ? "var(--color-red)" : "#ccc" }}>
                    {project.featured ? "Oui" : "—"}
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      style={{ fontSize: "0.8125rem", color: "var(--color-dark)", textDecoration: "none", marginRight: "1rem" }}
                    >
                      Modifier
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
