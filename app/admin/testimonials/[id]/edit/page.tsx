import { db } from "@/lib/db";
import { testimonials, projects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import TestimonialForm from "@/components/admin/TestimonialForm";
import Link from "next/link";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, parseInt(id, 10)));

  if (!testimonial) notFound();

  const allProjects = await db.select({ id: projects.id, title: projects.title }).from(projects);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
        <Link href="/admin/testimonials" style={{ fontSize: "0.8125rem", color: "#888", textDecoration: "none" }}>
          ← Témoignages
        </Link>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", margin: 0 }}>
          {testimonial.author}
        </h1>
      </div>
      <TestimonialForm testimonial={testimonial} allProjects={allProjects} />
    </div>
  );
}
