"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin",             label: "Dashboard",   exact: true },
  { href: "/admin/projects",    label: "Projets"                  },
  { href: "/admin/services",    label: "Services"                 },
  { href: "/admin/testimonials",label: "Témoignages"              },
  { href: "/admin/settings",    label: "Paramètres"               },
];

function NavItems({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  return (
    <>
      {links.map(({ href, label, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className={cn(
              "block px-3.5 py-2 rounded-lg text-[0.875rem] no-underline transition-colors duration-150 whitespace-nowrap",
              active ? "bg-white/[0.08] text-white" : "text-[#888] hover:text-white hover:bg-white/[0.04]"
            )}
          >
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
      {/* ── Desktop sidebar ─────────────────────────────── */}
      <aside className="hidden lg:flex w-[220px] shrink-0 flex-col bg-[var(--color-dark)] px-5 py-8 sticky top-0 h-screen overflow-y-auto">
        <Link href="/admin" className="no-underline block">
          <Image src="/images/Fichier 2.png" alt="André Kim" width={32} height={32} className="object-contain opacity-80" />
          <div className="text-[0.65rem] text-[#666] tracking-[0.1em] uppercase mt-1.5">Admin</div>
        </Link>

        <nav className="mt-10 flex flex-col gap-0.5">
          <NavItems />
        </nav>

        <div className="mt-auto flex flex-col gap-2">
          <Link href="/" target="_blank" className="text-[0.75rem] text-[#555] no-underline hover:text-[#888] transition-colors">
            Voir le site ↗
          </Link>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="text-left text-[0.75rem] text-[#555] hover:text-[#888] bg-transparent border-none cursor-pointer p-0 transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </aside>

      {/* ── Mobile top bar ──────────────────────────────── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-[var(--color-dark)]">
        <Link href="/admin" className="no-underline">
          <Image src="/images/Fichier 4.png" alt="André Kim" width={26} height={26} className="object-contain opacity-80" />
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen(o => !o)}
          className="bg-transparent border-none cursor-pointer p-1"
          aria-label="Menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            {mobileOpen
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
            }
          </svg>
        </button>
      </div>

      {/* ── Mobile drawer ───────────────────────────────── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 top-[52px]">
          <div
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-black/50"
          />
          <div className="absolute top-0 left-0 bottom-0 w-[220px] bg-[var(--color-dark)] px-5 py-6 flex flex-col gap-0.5 z-10">
            <NavItems onClose={() => setMobileOpen(false)} />
            <div className="mt-auto pt-4">
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className="text-[0.75rem] text-[#555] bg-transparent border-none cursor-pointer p-0"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Spacer mobile pour compenser le fixed top bar */}
      <div className="lg:hidden h-[52px] shrink-0" />
    </>
  );
}
