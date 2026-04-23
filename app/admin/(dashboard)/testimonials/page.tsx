import { db } from "@/lib/db";
import { testimonials, projects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

export default async function AdminTestimonials() {
  const rows = await db
    .select({ t: testimonials, projectTitle: projects.title })
    .from(testimonials)
    .leftJoin(projects, eq(testimonials.projectId, projects.id));

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem" }}>Témoignages</h1>
        <Link
          href="/admin/testimonials/new"
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

      {rows.length === 0 ? (
        <div style={{ padding: "3rem", textAlign: "center", color: "#888", backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #e8e6e1" }}>
          Aucun témoignage.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {rows.map(({ t, projectTitle }) => (
            <div
              key={t.id}
              style={{
                padding: "1rem 1.25rem",
                backgroundColor: "#fff",
                borderRadius: "12px",
                border: "1px solid #e8e6e1",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <div>
                  <span style={{ fontWeight: 500 }}>{t.author}</span>
                  {t.role && <span style={{ color: "#888", fontSize: "0.8125rem" }}> — {t.role}</span>}
                  {projectTitle && <span style={{ color: "#aaa", fontSize: "0.75rem" }}> · {projectTitle}</span>}
                </div>
                <Link
                  href={`/admin/testimonials/${t.id}/edit`}
                  style={{ fontSize: "0.8125rem", color: "var(--color-dark)", textDecoration: "none" }}
                >
                  Modifier
                </Link>
              </div>
              <p style={{ fontSize: "0.875rem", color: "#555", lineHeight: 1.6 }}>&ldquo;{t.text}&rdquo;</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
