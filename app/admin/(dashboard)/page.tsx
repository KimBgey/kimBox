import { db } from "@/lib/db";
import { projects, services, testimonials } from "@/lib/db/schema";
import { count, desc } from "drizzle-orm";
import Link from "next/link";
import Image from "next/image";

const CATEGORY_LABEL: Record<string, string> = {
  design: "Design",
  dev: "Dev",
  both: "Design + Dev",
};

const CATEGORY_DOT: Record<string, string> = {
  design: "bg-[#1a1a1a]",
  dev: "bg-[var(--color-red)]",
  both: "bg-[#8B7355]",
};

export default async function AdminDashboard() {
  const [projectCount, serviceCount, testimonialCount, lastProjects] = await Promise.all([
    db.select({ count: count() }).from(projects).then(r => r[0].count),
    db.select({ count: count() }).from(services).then(r => r[0].count),
    db.select({ count: count() }).from(testimonials).then(r => r[0].count),
    db.select({
      id: projects.id,
      title: projects.title,
      slug: projects.slug,
      category: projects.category,
      images: projects.images,
      featured: projects.featured,
    }).from(projects).orderBy(desc(projects.createdAt)).limit(4),
  ]);

  const stats = [
    {
      label: "Projets",
      value: projectCount,
      href: "/admin/projects",
      icon: (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2.5" y="3.5" width="15" height="13" rx="2" />
          <path d="M2.5 13l4-3.5 3.5 3.5 2.5-2.5 5 4" />
          <circle cx="7" cy="8.5" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      label: "Services",
      value: serviceCount,
      href: "/admin/services",
      icon: (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2l2.09 4.26L17 7.27l-3.5 3.41.83 4.82L10 13.27l-4.33 2.23.83-4.82L3 7.27l4.91-.71L10 2z" />
        </svg>
      ),
    },
    {
      label: "Témoignages",
      value: testimonialCount,
      href: "/admin/testimonials",
      icon: (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.5 3.5H2.5a1 1 0 00-1 1v8a1 1 0 001 1H6l2.5 2.5 2.5-2.5h6a1 1 0 001-1v-8a1 1 0 00-1-1z" />
          <line x1="6" y1="8" x2="14" y2="8" />
          <line x1="6" y1="10.5" x2="11" y2="10.5" />
        </svg>
      ),
    },
  ];

  const quickLinks = [
    {
      label: "Nouveau projet",
      href: "/admin/projects/new",
      icon: (
        <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <rect x="2.5" y="3.5" width="15" height="13" rx="2" />
          <line x1="10" y1="7" x2="10" y2="13" /><line x1="7" y1="10" x2="13" y2="10" />
        </svg>
      ),
    },
    {
      label: "Nouveau service",
      href: "/admin/services/new",
      icon: (
        <svg width="13" height="13" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2l2.09 4.26L17 7.27l-3.5 3.41.83 4.82L10 13.27l-4.33 2.23.83-4.82L3 7.27l4.91-.71L10 2z" />
        </svg>
      ),
    },
    {
      label: "Nouveau témoignage",
      href: "/admin/testimonials/new",
      icon: (
        <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.5 3.5H2.5a1 1 0 00-1 1v8a1 1 0 001 1H6l2.5 2.5 2.5-2.5h6a1 1 0 001-1v-8a1 1 0 00-1-1z" />
        </svg>
      ),
    },
    {
      label: "Paramètres",
      href: "/admin/settings",
      icon: (
        <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="5.5" x2="17" y2="5.5" /><line x1="3" y1="10" x2="17" y2="10" /><line x1="3" y1="14.5" x2="17" y2="14.5" />
          <circle cx="7.5" cy="5.5" r="2" fill="white" stroke="currentColor" />
          <circle cx="13" cy="10" r="2" fill="white" stroke="currentColor" />
          <circle cx="7" cy="14.5" r="2" fill="white" stroke="currentColor" />
        </svg>
      ),
    },
  ];

  return (
    <div className="max-w-5xl space-y-8">

      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[0.6rem] text-[#bbb] uppercase tracking-widest mb-2">Panel Admin</p>
          <h1 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] leading-tight text-[var(--color-dark)]">
            Bonjour, André<span className="text-[var(--color-red)]">.</span>
          </h1>
          <p className="text-[0.8125rem] text-[#aaa] mt-1">Gérez le contenu de votre portfolio.</p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-black/[0.08] bg-white text-[0.78rem] text-[var(--color-dark)] no-underline hover:border-black/20 transition-colors shrink-0 font-medium"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0 animate-pulse" />
          Site en ligne
          <svg width="9" height="9" viewBox="0 0 13 13" fill="none">
            <path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group flex flex-col gap-3 p-4 md:p-5 bg-white rounded-2xl border border-black/[0.06] no-underline hover:border-[var(--color-red)]/25 hover:shadow-sm transition-all duration-200"
          >
            <div className="w-8 h-8 rounded-xl bg-[var(--color-dark)]/[0.05] flex items-center justify-center text-[var(--color-dark)]/50 group-hover:bg-[var(--color-red)]/10 group-hover:text-[var(--color-red)] transition-colors">
              {stat.icon}
            </div>
            <div>
              <div className="font-display text-[2rem] md:text-[2.5rem] leading-none text-[var(--color-dark)] group-hover:text-[var(--color-red)] transition-colors">
                {stat.value}
              </div>
              <div className="text-[0.72rem] md:text-[0.8125rem] text-[#aaa] mt-1">{stat.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Grille inférieure ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">

        {/* Derniers projets */}
        <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.05]">
            <p className="font-mono text-[0.62rem] font-semibold text-[#aaa] uppercase tracking-widest">Derniers projets</p>
            <Link href="/admin/projects" className="text-[0.75rem] text-[var(--color-red)] no-underline hover:opacity-70 transition-opacity font-medium">
              Voir tous →
            </Link>
          </div>
          {lastProjects.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <p className="text-[0.8rem] text-[#ccc]">Aucun projet pour l&apos;instant.</p>
              <Link href="/admin/projects/new" className="text-[0.8rem] text-[var(--color-red)] no-underline hover:opacity-70 mt-2 inline-block">
                Créer le premier →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-black/[0.04]">
              {lastProjects.map((p) => {
                const firstImg = (p.images as string[])?.[0];
                return (
                  <Link
                    key={p.id}
                    href={`/admin/projects/${p.id}/edit`}
                    className="group flex items-center gap-3.5 px-5 py-3.5 no-underline hover:bg-[#fafafa] transition-colors"
                  >
                    {/* Thumbnail */}
                    <div className={`w-10 h-10 rounded-lg overflow-hidden shrink-0 relative ${CATEGORY_DOT[p.category] ?? "bg-[#1a1a1a]"}`}>
                      {firstImg ? (
                        <Image src={firstImg} alt={p.title} fill className="object-cover" sizes="40px" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-white/30 text-[0.55rem] font-mono uppercase">{p.category.slice(0, 2)}</span>
                        </div>
                      )}
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[0.875rem] font-medium text-[var(--color-dark)] truncate group-hover:text-[var(--color-red)] transition-colors">
                        {p.title}
                      </p>
                      <p className="text-[0.7rem] text-[#bbb]">{CATEGORY_LABEL[p.category]}</p>
                    </div>
                    {p.featured && (
                      <span className="text-[0.6rem] font-mono px-2 py-0.5 rounded-full bg-[var(--color-red)]/10 text-[var(--color-red)] uppercase tracking-wider shrink-0">
                        Featured
                      </span>
                    )}
                    <svg width="11" height="11" viewBox="0 0 13 13" fill="none" className="text-[#ddd] group-hover:text-[var(--color-red)] transition-colors shrink-0">
                      <path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Actions rapides */}
        <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
          <div className="px-5 py-4 border-b border-black/[0.05]">
            <p className="font-mono text-[0.62rem] font-semibold text-[#aaa] uppercase tracking-widest">Actions rapides</p>
          </div>
          <div className="divide-y divide-black/[0.04]">
            {quickLinks.map(({ label, href, icon }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center gap-3 px-5 py-3.5 no-underline hover:bg-[#fafafa] transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-[var(--color-dark)]/[0.05] flex items-center justify-center text-[var(--color-dark)]/40 group-hover:bg-[var(--color-red)]/10 group-hover:text-[var(--color-red)] transition-colors shrink-0">
                  {icon}
                </div>
                <span className="text-[0.84rem] font-medium text-[var(--color-dark)] group-hover:text-[var(--color-red)] transition-colors flex-1">
                  {label}
                </span>
                <svg width="10" height="10" viewBox="0 0 13 13" fill="none" className="text-[#ddd] group-hover:text-[var(--color-red)] transition-colors shrink-0">
                  <path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
