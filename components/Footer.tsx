import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-dark)] border-t border-white/5 py-10 px-5 md:px-10 lg:px-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Image src="/images/Fichier 3.png" alt="André Kim" width={28} height={28} className="opacity-60" />
          <span className="font-display text-lg text-white/60">André Kim</span>
        </div>
        <p className="text-[0.75rem] text-white/30 text-center">
          © {new Date().getFullYear()} André Kim — Designer &amp; Développeur. Tous droits réservés.
        </p>
        <Link href="/admin" className="text-[0.75rem] text-white/20 hover:text-white/40 transition-colors no-underline">
          Admin
        </Link>
      </div>
    </footer>
  );
}
