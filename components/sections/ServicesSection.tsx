"use client";

import { useState } from "react";
import type { Service } from "@/lib/db/schema";

type Step = 0 | 1 | 2 | 3;

const DEFAULT_SERVICES = [
  {
    type: "Design",
    price: "dès 150€",
    items: ["Identité visuelle & logo", "Charte graphique", "Motion design", "UI / Maquette Figma", "Flyer, affiche, packaging"],
  },
  {
    type: "Développement",
    price: "dès 500€",
    items: ["Site vitrine Next.js", "Application web", "Landing page optimisée", "Intégration API & back-end", "E-commerce"],
  },
  {
    type: "Bundle Studio",
    price: "dès 800€",
    badge: "⭐ Recommandé",
    items: ["Design + Développement complet", "Branding jusqu'à la mise en ligne", "Maintenance incluse 1 mois", "Suivi & révisions"],
  },
];

const BRIEF_STEPS = [
  {
    question: "De quoi avez-vous besoin ?",
    choices: ["Design uniquement", "Développement uniquement", "Les deux (Bundle Studio)"],
  },
  {
    question: "Quel est votre budget estimé ?",
    choices: ["< 500€", "500 – 2 000€", "> 2 000€"],
  },
  {
    question: "Quel est votre délai ?",
    choices: ["Urgent (< 2 semaines)", "1 – 3 mois", "Flexible"],
  },
];

export default function ServicesSection({ comeupUrl = "", dbServices }: { comeupUrl?: string; dbServices?: Service[] }) {
  const [step, setStep] = useState<Step>(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const displayServices = dbServices && dbServices.length > 0
    ? dbServices.map(s => ({
        type: s.type === "design" ? "Design" : s.type === "dev" ? "Développement" : "Bundle Studio",
        price: s.priceRange ?? "",
        items: Array.isArray(s.features) ? s.features as string[] : [],
        badge: s.type === "bundle" ? "⭐ Recommandé" : undefined,
      }))
    : DEFAULT_SERVICES;

  const choose = (choice: string) => {
    const next = [...answers, choice];
    setAnswers(next);
    if (step < 2) {
      setStep((step + 1) as Step);
    } else {
      // Générer le brief pré-rempli
      const brief = `Bonjour André Kim,\n\nBesoin : ${next[0]}\nBudget : ${next[1]}\nDélai : ${next[2]}\n\nPouvez-vous me donner plus d'infos ?`;
      if (comeupUrl) {
        window.open(comeupUrl, "_blank");
      } else {
        const wa = `https://wa.me/message/PLACEHOLDER?text=${encodeURIComponent(brief)}`;
        window.open(wa, "_blank");
      }
      setStep(3);
    }
  };

  const reset = () => { setStep(0); setAnswers([]); };

  return (
    <section id="services" className="bg-[#F2F0EC] py-24 md:py-32 px-5 md:px-10 lg:px-20">

      <p className="section-label mb-3">04 — Services</p>
      <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-dark)] mb-14 md:mb-20">
        Ce que je fais
      </h2>

      {/* Cartes services */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20 md:mb-28">
        {displayServices.map((s) => (
          <div
            key={s.type}
            className={`relative rounded-2xl p-6 md:p-8 flex flex-col gap-4 border transition-shadow hover:shadow-lg ${
              s.badge
                ? "bg-[var(--color-dark)] text-white border-[var(--color-dark)]"
                : "bg-white text-[var(--color-dark)] border-black/8"
            }`}
          >
            {s.badge && (
              <span className="absolute top-5 right-5 text-[0.7rem] bg-[var(--color-red)] text-white px-3 py-1 rounded-full font-medium">
                {s.badge}
              </span>
            )}
            <div>
              <p className="section-label mb-2" style={{ color: s.badge ? "rgba(255,255,255,0.4)" : undefined }}>
                {s.type}
              </p>
              <p className={`font-display text-3xl md:text-4xl ${s.badge ? "text-white" : "text-[var(--color-dark)]"}`}>
                {s.price}
              </p>
            </div>
            <ul className="space-y-2 flex-1">
              {s.items.map(item => (
                <li key={item} className={`text-sm flex items-start gap-2 ${s.badge ? "text-white/70" : "text-[#555]"}`}>
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--color-red)] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Brief interactif */}
      <div className="max-w-xl mx-auto">
        <p className="section-label text-center mb-4">Brief interactif</p>
        <h3 className="font-display text-2xl md:text-3xl text-center text-[var(--color-dark)] mb-8 leading-tight">
          Décrivez votre projet en 3 questions
        </h3>

        <div className="bg-white rounded-2xl p-6 md:p-8 border border-black/8 [box-shadow:0_4px_32px_rgba(0,0,0,0.06)]">
          {step < 3 ? (
            <>
              {/* Progress */}
              <div className="flex gap-1.5 mb-6">
                {[0,1,2].map(i => (
                  <div key={i} className={`h-1 rounded-full flex-1 transition-colors ${i <= step ? "bg-[var(--color-red)]" : "bg-black/10"}`} />
                ))}
              </div>

              <p className="text-[0.8rem] text-[#888] mb-2">Question {step + 1} / 3</p>
              <p className="font-semibold text-[var(--color-dark)] text-lg mb-5">
                {BRIEF_STEPS[step].question}
              </p>

              <div className="flex flex-col gap-3">
                {BRIEF_STEPS[step].choices.map(choice => (
                  <button
                    key={choice}
                    onClick={() => choose(choice)}
                    className="w-full text-left px-5 py-3.5 rounded-xl border border-black/10 text-sm font-medium text-[var(--color-dark)] hover:border-[var(--color-red)] hover:bg-[var(--color-red)]/5 transition-colors cursor-pointer"
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="text-3xl mb-3">🎯</div>
              <p className="font-semibold text-[var(--color-dark)] mb-2">Brief envoyé !</p>
              <p className="text-sm text-[#888] mb-6">Vous allez être redirigé vers Comeup avec votre résumé pré-rempli.</p>
              <button onClick={reset} className="text-sm text-[var(--color-red)] underline cursor-pointer bg-transparent border-none">
                Recommencer
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
