import { db } from "@/lib/db";
import { projects, services, testimonials } from "@/lib/db/schema";
import { count } from "drizzle-orm";

export default async function AdminDashboard() {
  const [projectCount] = await db.select({ count: count() }).from(projects);
  const [serviceCount] = await db.select({ count: count() }).from(services);
  const [testimonialCount] = await db.select({ count: count() }).from(testimonials);

  const stats = [
    { label: "Projets", value: projectCount.count, href: "/admin/projects" },
    { label: "Services", value: serviceCount.count, href: "/admin/services" },
    { label: "Témoignages", value: testimonialCount.count, href: "/admin/testimonials" },
  ];

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", marginBottom: "0.25rem" }}>
        Dashboard
      </h1>
      <p style={{ fontSize: "0.8125rem", color: "#888", marginBottom: "2rem" }}>
        Bienvenue dans le panel admin de KIM.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
        {stats.map((stat) => (
          <a
            key={stat.label}
            href={stat.href}
            style={{
              display: "block",
              padding: "1.5rem",
              backgroundColor: "#fff",
              borderRadius: "12px",
              border: "1px solid #e8e6e1",
              textDecoration: "none",
              transition: "border-color 0.2s",
            }}
          >
            <div style={{
              fontSize: "2.5rem",
              fontFamily: "var(--font-display)",
              color: "var(--color-dark)",
            }}>
              {stat.value}
            </div>
            <div style={{ fontSize: "0.8125rem", color: "#888", marginTop: "0.25rem" }}>
              {stat.label}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
