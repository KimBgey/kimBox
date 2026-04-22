import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import TestimonialForm from "@/components/admin/TestimonialForm";
import Link from "next/link";

export default async function NewTestimonialPage() {
  const allProjects = await db.select({ id: projects.id, title: projects.title }).from(projects);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
        <Link href="/admin/testimonials" style={{ fontSize: "0.8125rem", color: "#888", textDecoration: "none" }}>
          ← Témoignages
        </Link>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", margin: 0 }}>
          Nouveau témoignage
        </h1>
      </div>
      <TestimonialForm allProjects={allProjects} />
    </div>
  );
}
