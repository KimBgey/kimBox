import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import ServiceForm from "@/components/admin/ServiceForm";
import Link from "next/link";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [service] = await db.select().from(services).where(eq(services.id, parseInt(id, 10)));

  if (!service) notFound();

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
        <Link href="/admin/services" style={{ fontSize: "0.8125rem", color: "#888", textDecoration: "none" }}>
          ← Services
        </Link>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", margin: 0 }}>
          {service.title}
        </h1>
      </div>
      <ServiceForm service={service} />
    </div>
  );
}
