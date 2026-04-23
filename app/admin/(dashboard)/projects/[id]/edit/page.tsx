import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";
import Link from "next/link";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [project] = await db.select().from(projects).where(eq(projects.id, parseInt(id, 10)));

  if (!project) notFound();

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
        <Link href="/admin/projects" style={{ fontSize: "0.8125rem", color: "#888", textDecoration: "none" }}>
          ← Projets
        </Link>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", margin: 0 }}>
          {project.title}
        </h1>
      </div>
      <ProjectForm project={project} />
    </div>
  );
}
