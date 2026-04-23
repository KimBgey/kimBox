import { db } from "@/lib/db";
import { projects, services, testimonials } from "@/lib/db/schema";
import { count } from "drizzle-orm";
import Link from "next/link";

export default async function AdminDashboard() {
  const [projectCount] = await db.select({ count: count() }).from(projects);
  const [serviceCount] = await db.select({ count: count() }).from(services);
  const [testimonialCount] = await db.select({ count: count() }).from(testimonials);

  const stats = [
    { label: "Projets",     value: projectCount.count,     href: "/admin/projects",     icon: "🗂️" },
    { label: "Services",    value: serviceCount.count,     href: "/admin/services",     icon: "⚙️" },
    { label: "Témoignages", value: testimonialCount.count, href: "/admin/testimonials", icon: "💬" },
  ];

  const quickLinks = [
    { label: "Nouveau projet",     href: "/admin/projects/new"     },
    { label: "Nouveau service",    href: "/admin/services/new"     },
    { label: "Nouveau témoignage", href: "/admin/testimonials/new" },
    { label: "Paramètres",         href: "/admin/settings"         },
  ];

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl text-[var(--color-dark)]">Dashboard</h1>
        <p className="text-[0.8125rem] text-[#999] mt-1">Bienvenue dans le panel admin de KIM.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group flex flex-col gap-3 p-5 md:p-6 bg-white rounded-2xl border border-black/[0.06] no-underline hover:border-[var(--color-red)]/30 hover:shadow-sm transition-all duration-200"
          >
            <span className="text-2xl">{stat.icon}</span>
            <div>
              <div className="font-display text-[2.5rem] leading-none text-[var(--color-dark)] group-hover:text-[var(--color-red)] transition-colors">
                {stat.value}
              </div>
              <div className="text-[0.8125rem] text-[#999] mt-1">{stat.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Actions rapides */}
      <p className="text-[0.75rem] font-semibold text-[#bbb] tracking-widest uppercase mb-4">Actions rapides</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
        {quickLinks.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-center justify-between px-5 py-3.5 bg-white rounded-xl border border-black/[0.06] no-underline text-[0.875rem] text-[var(--color-dark)] font-medium hover:border-[var(--color-red)]/30 transition-all duration-150"
          >
            {label}
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="text-[#ccc] group-hover:text-[var(--color-red)] transition-colors">
              <path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        ))}
      </div>

      <div className="pt-6 border-t border-black/[0.06]">
        <Link href="/" target="_blank" className="text-[0.8125rem] text-[#bbb] no-underline hover:text-[var(--color-dark)] transition-colors">
          Voir le site public ↗
        </Link>
      </div>
    </div>
  );
}
