import { Button } from "@/components/ui/button";
import { ArrowDown, Mail, MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 01 — HERO */}
      <section id="hero" className="min-h-screen flex items-center relative bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-display mb-6">STUDIO</h1>
          <p className="text-2xl md:text-4xl text-[var(--noir-soft)] max-w-3xl mx-auto">
            Design <span className="text-[var(--rouge)]">×</span> Development
          </p>
          <div className="mt-12 flex gap-4 justify-center">
            <Button size="lg" className="bg-[var(--rouge)] hover:bg-[var(--rouge-deep)] text-white">
              Voir les projets
            </Button>
            <Button size="lg" variant="outline" className="border-[var(--brun)]">
              Commander un projet
            </Button>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <ArrowDown className="w-6 h-6 animate-bounce text-[var(--brun)]" />
          </div>
        </div>
      </section>

      {/* 02 — MANIFESTE / À PROPOS */}
      <section id="manifeste" className="py-24 bg-[var(--creme-sec)]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-h2 mb-12">Manifeste</h2>
          <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
            {/* Tu mettras ton texte long ici */}
            Je suis un designer et développeur qui croit que la forme et le fond doivent se renforcer mutuellement...
          </p>
          {/* Double portrait + Timeline + Chiffres à venir */}
        </div>
      </section>

      {/* 03 — PROJETS */}
      <section id="projets" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-h2 mb-12">Projets</h2>
          {/* Filtres + Grille Masonry à venir en V1 */}
          <p className="text-center text-[var(--brun)]">Grille de projets en cours de construction (V1)</p>
        </div>
      </section>

      {/* 04 — SERVICES */}
      <section id="services" className="py-24 bg-[var(--creme-sec)]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-h2 mb-16 text-center">Services</h2>
          {/* Deux colonnes + Bundle + FAQ à venir */}
        </div>
      </section>

      {/* 05 — STACK & COMPÉTENCES */}
      <section id="stack" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-h2 mb-12">Stack & Compétences</h2>
          {/* Logo wall + barres de maîtrise à venir */}
        </div>
      </section>

      {/* 06 — CONTACT */}
      <section id="contact" className="py-24 bg-[var(--noir)] text-[var(--creme)]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-h2 mb-8 text-[var(--creme)]">Prêt à commencer un projet ?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[var(--rouge)] hover:bg-white hover:text-[var(--noir)]">
              <MessageCircle className="mr-2" /> WhatsApp
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              <Mail className="mr-2" /> Par email
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}