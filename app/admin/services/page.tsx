import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";
import Link from "next/link";

export default async function AdminServices() {
  const allServices = await db.select().from(services).orderBy(services.order);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem" }}>Services</h1>
        <Link
          href="/admin/services/new"
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

      {allServices.length === 0 ? (
        <div style={{ padding: "3rem", textAlign: "center", color: "#888", backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #e8e6e1" }}>
          Aucun service.{" "}
          <Link href="/admin/services/new" style={{ color: "var(--color-red)" }}>
            Créer le premier
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {allServices.map((service) => (
            <div
              key={service.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem 1.25rem",
                backgroundColor: "#fff",
                borderRadius: "12px",
                border: "1px solid #e8e6e1",
              }}
            >
              <div>
                <div style={{ fontWeight: 500, fontSize: "0.9375rem" }}>{service.title}</div>
                <div style={{ fontSize: "0.75rem", color: "#888", marginTop: "2px" }}>
                  {service.type} — {service.priceRange}
                </div>
              </div>
              <Link
                href={`/admin/services/${service.id}/edit`}
                style={{ fontSize: "0.8125rem", color: "var(--color-dark)", textDecoration: "none" }}
              >
                Modifier
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
