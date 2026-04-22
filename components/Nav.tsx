"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const allLinks = [
  { href: "/", label: "Home", exact: true },
  { href: "/about", label: "About" },
  { href: "/services", label: "Service" },
  { href: "/resume", label: "Resume" },
  { href: "/projects", label: "Project" },
  { href: "/contact", label: "Contact" },
];

const leftLinks = allLinks.slice(0, 3);
const rightLinks = allLinks.slice(3);

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Fermer au changement de route
  useEffect(() => { setOpen(false); }, [pathname]);
  // Bloquer le scroll quand menu ouvert
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <>
      {/* ── Desktop nav ─────────────────────────────────────── */}
      <nav className="hidden lg:flex fixed top-5 left-1/2 -translate-x-1/2 z-[100] items-center gap-1 rounded-full py-[0.35rem] px-[0.4rem] [background:rgba(250,250,248,0.9)] backdrop-blur-[14px] [box-shadow:0_2px_28px_rgba(0,0,0,0.07),0_0_0_1px_rgba(0,0,0,0.05)]">
        <div className="flex gap-[0.15rem]">
          {leftLinks.map(({ href, label, exact }) => (
            <NavLink key={href} href={href} active={isActive(href, exact)}>{label}</NavLink>
          ))}
        </div>

        {/* Logo — libre, sans cercle */}
        <Link href="/" aria-label="Accueil" className="mx-2 shrink-0 opacity-90 hover:opacity-100 transition-opacity">
          <Image src="/images/Fichier 1.png" alt="André Kim" width={34} height={34} className="object-contain" />
        </Link>

        <div className="flex gap-[0.15rem]">
          {rightLinks.map(({ href, label }) => (
            <NavLink key={href} href={href} active={isActive(href)}>{label}</NavLink>
          ))}
        </div>
      </nav>

      {/* ── Mobile top bar ──────────────────────────────────── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-5 py-4 [background:rgba(250,250,248,0.92)] backdrop-blur-[12px] [box-shadow:0_1px_0_rgba(0,0,0,0.06)]">
        <Link href="/" className="opacity-90 hover:opacity-100 transition-opacity">
          <Image src="/images/Fichier 1.png" alt="André Kim" width={28} height={28} className="object-contain" />
        </Link>

        <button
          onClick={() => setOpen(o => !o)}
          className="w-9 h-9 flex flex-col items-center justify-center gap-[5px] [cursor:pointer]"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <span className={cn("block h-[1.5px] w-5 bg-[var(--color-dark)] transition-all duration-300 origin-center", open && "translate-y-[6.5px] rotate-45")} />
          <span className={cn("block h-[1.5px] w-5 bg-[var(--color-dark)] transition-all duration-300", open && "opacity-0 scale-x-0")} />
          <span className={cn("block h-[1.5px] w-5 bg-[var(--color-dark)] transition-all duration-300 origin-center", open && "-translate-y-[6.5px] -rotate-45")} />
        </button>
      </div>

      {/* ── Mobile menu overlay ──────────────────────────────── */}
      <div className={cn(
        "lg:hidden fixed inset-0 z-[99] bg-[var(--color-dark)] flex flex-col items-center justify-center gap-2 transition-all duration-500",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        {allLinks.map(({ href, label, exact }, i) => (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={cn(
              "font-display text-[clamp(2rem,8vw,3.5rem)] leading-tight tracking-[-0.02em] no-underline transition-colors duration-200",
              open ? "opacity-100" : "opacity-0",
              isActive(href, exact) ? "text-[var(--color-red)]" : "text-white hover:text-[var(--color-red)]"
            )}
            style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
          >
            {label}
          </Link>
        ))}

        <div className="absolute bottom-8 flex gap-3">
          <Link href="mailto:andrekimgbaguidi01@gmail.com" className="text-[0.75rem] text-white/30 hover:text-white/60 no-underline transition-colors">
            Email
          </Link>
          <span className="text-white/20">·</span>
          <Link href="/admin" className="text-[0.75rem] text-white/30 hover:text-white/60 no-underline transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "px-[0.9rem] py-[0.45rem] rounded-full text-[0.875rem] font-medium transition-colors duration-200 whitespace-nowrap no-underline",
        active ? "bg-[var(--color-red)] text-white" : "text-[var(--color-dark)] hover:bg-black/[0.05]"
      )}
    >
      {children}
    </Link>
  );
}
