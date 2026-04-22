import ServiceForm from "@/components/admin/ServiceForm";
import Link from "next/link";

export default function NewServicePage() {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
        <Link href="/admin/services" style={{ fontSize: "0.8125rem", color: "#888", textDecoration: "none" }}>
          ← Services
        </Link>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", margin: 0 }}>
          Nouveau service
        </h1>
      </div>
      <ServiceForm />
    </div>
  );
}
