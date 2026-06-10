"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const links = [
  {
    href: "/admin",
    label: "Dashboard",
    exact: true,
    icon: (
      <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor">
        <rect x="2" y="2" width="7" height="7" rx="1.5" />
        <rect x="11" y="2" width="7" height="7" rx="1.5" />
        <rect x="2" y="11" width="7" height="7" rx="1.5" />
        <rect x="11" y="11" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    href: "/admin/projects",
    label: "Projets",
    icon: (
      <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2.5" y="3.5" width="15" height="13" rx="2" />
        <path d="M2.5 13l4.5-4 3.5 3.5 2.5-2 4.5 3.5" />
        <circle cx="7" cy="8" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "/admin/services",
    label: "Services",
    icon: (
      <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2l2.09 4.26L17 7.27l-3.5 3.41.83 4.82L10 13.27l-4.33 2.23.83-4.82L3 7.27l4.91-.71L10 2z" />
      </svg>
    ),
  },
  {
    href: "/admin/testimonials",
    label: "Témoignages",
    icon: (
      <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 3.5H2.5a1 1 0 00-1 1v9a1 1 0 001 1H6l2.5 2.5 2.5-2.5h6a1 1 0 001-1v-9a1 1 0 00-1-1z" />
        <path d="M6.5 8.5h7M6.5 11h5" />
      </svg>
    ),
  },
  {
    href: "/admin/settings",
    label: "Paramètres",
    icon: (
      <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <line x1="3" y1="5.5" x2="17" y2="5.5" />
        <line x1="3" y1="10" x2="17" y2="10" />
        <line x1="3" y1="14.5" x2="17" y2="14.5" />
        <circle cx="7.5" cy="5.5" r="2" fill="var(--color-dark)" stroke="currentColor" />
        <circle cx="13" cy="10" r="2" fill="var(--color-dark)" stroke="currentColor" />
        <circle cx="7" cy="14.5" r="2" fill="var(--color-dark)" stroke="currentColor" />
      </svg>
    ),
  },
];

function NavItems({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  return (
    <>
      {links.map(({ href, label, exact, icon }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[0.8125rem] font-medium no-underline transition-all duration-150 relative",
              active
                ? "bg-white/[0.09] text-white"
                : "text-[#666] hover:text-[#aaa] hover:bg-white/[0.04]"
            )}
          >
            {active && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-r-full bg-[var(--color-red)]" />
            )}
            <span className={active ? "text-white" : "text-[#555]"}>{icon}</span>
            {label}
          </Link>
        );
      })}
    </>
  );
}

export default function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:flex w-[220px] shrink-0 flex-col bg-[var(--color-dark)] px-4 py-7 sticky top-0 h-screen overflow-y-auto border-r border-white/[0.04]">

        {/* Logo */}
        <Link href="/admin" className="no-underline flex items-center gap-2.5 px-1 mb-8">
          <Image src="/images/Fichier 2.png" alt="André Kim" width={26} height={26} className="object-contain opacity-90" />
          <div>
            <div className="text-[0.8rem] font-semibold text-white/80 leading-none">KIM</div>
            <div className="text-[0.58rem] text-[#555] tracking-[0.12em] uppercase mt-0.5">Admin</div>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex flex-col gap-0.5">
          <p className="px-3.5 mb-2 text-[0.58rem] font-semibold text-[#444] uppercase tracking-[0.12em]">Menu</p>
          <NavItems />
        </nav>

        {/* Bottom */}
        <div className="mt-auto space-y-2 pt-4 border-t border-white/[0.05]">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-[0.75rem] text-[#555] no-underline hover:text-[#888] hover:bg-white/[0.03] transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
            Voir le site
            <svg width="8" height="8" viewBox="0 0 13 13" fill="none" className="ml-auto">
              <path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.04]">
            <div className="w-7 h-7 rounded-full bg-[var(--color-red)] flex items-center justify-center text-[0.6rem] font-bold text-white shrink-0">
              AK
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[0.75rem] font-medium text-white/60 truncate">André Kim</p>
            </div>
            <button
              type="button"
              title="Déconnexion"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="text-[#555] hover:text-[#999] transition-colors bg-transparent border-none cursor-pointer p-0.5 shrink-0"
            >
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 5l5 5-5 5M18 10H7" />
                <path d="M7 3H3a1 1 0 00-1 1v12a1 1 0 001 1h4" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* ── Mobile top bar ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-[var(--color-dark)] border-b border-white/[0.05]">
        <Link href="/admin" className="no-underline flex items-center gap-2">
          <Image src="/images/Fichier 2.png" alt="André Kim" width={22} height={22} className="object-contain opacity-90" />
          <span className="text-[0.75rem] font-semibold text-white/70 tracking-wide">KIM Admin</span>
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen(o => !o)}
          className="bg-transparent border-none cursor-pointer p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors"
          aria-label="Menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            {mobileOpen
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
            }
          </svg>
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 top-[49px]">
          <div onClick={() => setMobileOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="absolute top-0 left-0 bottom-0 w-[240px] bg-[var(--color-dark)] px-4 py-5 flex flex-col border-r border-white/[0.05] z-10">
            <p className="px-3.5 mb-2 text-[0.58rem] font-semibold text-[#444] uppercase tracking-[0.12em]">Menu</p>
            <nav className="flex flex-col gap-0.5">
              <NavItems onClose={() => setMobileOpen(false)} />
            </nav>
            <div className="mt-auto pt-4 border-t border-white/[0.05] space-y-2">
              <a href="/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-[0.75rem] text-[#555] no-underline hover:text-[#888] transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Voir le site ↗
              </a>
              <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.04]">
                <div className="w-7 h-7 rounded-full bg-[var(--color-red)] flex items-center justify-center text-[0.6rem] font-bold text-white shrink-0">
                  AK
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[0.75rem] font-medium text-white/60 truncate">André Kim</p>
                </div>
                <button
                  type="button"
                  title="Déconnexion"
                  onClick={() => signOut({ callbackUrl: "/admin/login" })}
                  className="text-[#555] hover:text-[#999] bg-transparent border-none cursor-pointer p-0.5 shrink-0"
                >
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 5l5 5-5 5M18 10H7" />
                    <path d="M7 3H3a1 1 0 00-1 1v12a1 1 0 001 1h4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer mobile */}
      <div className="lg:hidden h-[49px] w-0 shrink-0" />
    </>
  );
}
