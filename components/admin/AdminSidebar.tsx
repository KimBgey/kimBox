"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const links = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/projects", label: "Projets" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/testimonials", label: "Témoignages" },
  { href: "/admin/settings", label: "Paramètres" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      width: "220px",
      minHeight: "100vh",
      backgroundColor: "var(--color-dark)",
      padding: "2rem 1.25rem",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
    }}>
      <Link href="/admin" style={{ textDecoration: "none" }}>
        <span style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.5rem",
          color: "#fff",
        }}>
          KIM<span style={{ color: "var(--color-red)" }}>.</span>
        </span>
        <div style={{ fontSize: "0.6875rem", color: "#666", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "2px" }}>
          Admin
        </div>
      </Link>

      <nav style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        {links.map(({ href, label, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              style={{
                padding: "0.5rem 0.75rem",
                borderRadius: "8px",
                fontSize: "0.875rem",
                color: active ? "#fff" : "#888",
                backgroundColor: active ? "rgba(255,255,255,0.08)" : "transparent",
                textDecoration: "none",
                transition: "background 0.15s, color 0.15s",
              }}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <div style={{ marginTop: "auto" }}>
        <Link
          href="/"
          target="_blank"
          style={{ display: "block", fontSize: "0.75rem", color: "#555", marginBottom: "0.75rem", textDecoration: "none" }}
        >
          Voir le site ↗
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          style={{
            background: "none",
            border: "none",
            color: "#555",
            fontSize: "0.75rem",
            cursor: "pointer",
            padding: 0,
          }}
        >
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
