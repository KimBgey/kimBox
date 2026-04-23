import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curriculum Vitae — André Kim",
  description: "Développeur Web & Designer graphique basé à Abomey-Calavi, Bénin.",
};

const experiences = [
  {
    period: "03/2026 – Aujourd'hui",
    company: "Africa Samuraï",
    location: "Abomey Calavi",
    role: "Technicien d'exploitation informatique",
    desc: "Développement d'applications web et apport de solutions numériques pour petites, moyennes et grandes entreprises.",
    current: true,
  },
  {
    period: "12/2025 – Aujourd'hui",
    company: "HASIMEX SARL",
    location: "Cotonou (Remote)",
    role: "Graphiste",
    desc: "Réalisation de visuels d'impression, mise en place de mockups de présentation et de prospection. Gestion de bons de commande et pro-formas.",
    current: true,
  },
  {
    period: "10/2025 – 03/2026",
    company: "Rivael Système",
    location: "Abomey Calavi (Remote)",
    role: "Web Designer — Stage",
    desc: "Conception de maquettes web & mobile et création d'identités de marque. Stage en remote.",
  },
  {
    period: "02/2026 – 03/2026",
    company: "ALNYF BENIN GLOBAL SARL",
    location: "Cotonou",
    role: "Web Designer",
    desc: "Réalisation de maquettes web et mobile et mise en place d'identités visuelles.",
  },
  {
    period: "12/2024 – 07/2025",
    company: "Ministère de l'Économie et des Finances",
    location: "Cotonou",
    role: "Développeur Web — Stage Professionnel",
    desc: "Travail en environnement professionnel exigeant au sein d'une équipe technique. Perfectionnement des compétences en développement web.",
  },
  {
    period: "02/2024 – 05/2024",
    company: "TPAPY Educational Consulting Center",
    location: "Porto Novo",
    role: "Développeur Web — Stage Académique",
    desc: "Réalisation d'une application web de gestion de projets collaboratifs pour optimiser la planification et le suivi des tâches en équipe.",
  },
  {
    period: "01/2022 – Aujourd'hui",
    company: "À mon propre compte",
    location: "Abomey Calavi",
    role: "Designer Graphiste Freelance",
    desc: "Réalisation d'affiches publicitaires et d'identités visuelles pour sites web.",
    current: true,
  },
];

const formations = [
  {
    period: "09/2021 – 06/2024",
    school: "Institut Universitaire LES COURS SONOU",
    location: "Abomey Calavi",
    degree: "Licence Professionnelle",
    desc: "Ingénierie logicielle, développement web, bases de données et systèmes d'information.",
  },
  {
    period: "07/2023 – 09/2023",
    school: "Centre de Formation Professionnelle des Métiers du Digital",
    location: "Abomey-Calavi",
    degree: "Formation Para-Universitaire",
    desc: "Réseaux informatiques, développement d'applications web avec Laravel et Photoshop.",
  },
  {
    period: "2021",
    school: "Complexe Scolaire Sainte FÉLICITE",
    location: "Abomey Calavi",
    degree: "Baccalauréat Scientifique — Série D",
    desc: "",
  },
  {
    period: "2018",
    school: "Collège Catholique St Jean Paul II",
    location: "Djougou",
    degree: "BEPC",
    desc: "",
  },
];

const skills = [
  { label: "Figma", level: 4 },
  { label: "Photoshop / Illustrator", level: 4 },
  { label: "Next.js / React", level: 3 },
  { label: "JavaScript / TypeScript", level: 3 },
  { label: "NestJS / VueJS", level: 3 },
  { label: "Word / SourceTree", level: 4 },
  { label: "PowerPoint / Excel", level: 3 },
  { label: "Premiere Pro / CapCut", level: 2 },
];

const languages = [
  { label: "Français", level: 5 },
  { label: "Fon", level: 5 },
  { label: "Dendi", level: 4 },
  { label: "Anglais", level: 2 },
];

function Dots({ level }: { level: number }) {
  return (
    <div className="flex gap-1 mt-1">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={`w-2 h-2 rounded-full ${i <= level ? "bg-[var(--color-red)]" : "bg-black/10"}`} />
      ))}
    </div>
  );
}

export default function ResumePage() {
  return (
    <>
      <Nav />
      <main className="bg-[var(--color-cream)] min-h-screen">

        {/* ── Hero ────────────────────────────────────────────── */}
        <div className="bg-[var(--color-dark)] pt-32 pb-20 px-5 md:px-10 lg:px-20">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <p className="section-label text-white/30 mb-4">Curriculum Vitae</p>
              <h1 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.95] tracking-[-0.02em] text-white mb-3">
                André Kim<span className="text-[var(--color-red)]">.</span>
              </h1>
              <p className="text-white/50 text-lg font-medium">Développeur Web &amp; Web Designer</p>
              <div className="flex flex-wrap gap-4 mt-5 text-[0.8rem] text-white/30">
                <span>andrekimgbaguidi01@gmail.com</span>
                <span className="hidden md:inline text-white/10">·</span>
                <span>+229 0166337219</span>
                <span className="hidden md:inline text-white/10">·</span>
                <span>Abomey Calavi, Bénin</span>
              </div>
            </div>
            <a
              href="/cv/André_Kim_GBAGUIDI.pdf"
              download
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[var(--color-red)] text-white text-sm font-semibold no-underline hover:opacity-90 transition-opacity shrink-0"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Télécharger le CV
            </a>
          </div>
        </div>

        {/* ── Corps ───────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-5 md:px-10 lg:px-20 py-20 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-14 lg:gap-20">

          {/* ── Colonne principale ─────────────────────────── */}
          <div className="space-y-20">

            {/* Expériences */}
            <section>
              <p className="section-label mb-10">Expérience Professionnelle</p>
              <div className="relative">
                {/* Ligne verticale */}
                <div className="absolute left-0 top-2 bottom-0 w-px bg-black/10 hidden md:block" />

                <div className="space-y-10">
                  {experiences.map((xp, i) => (
                    <div key={i} className="md:pl-8 relative">
                      {/* Dot sur la ligne */}
                      <div className="hidden md:block absolute left-0 top-2 w-2 h-2 rounded-full -translate-x-[3.5px] border-2 border-[var(--color-red)] bg-[var(--color-cream)]" />

                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-1 mb-2">
                        <div>
                          <h3 className="font-semibold text-[var(--color-dark)] text-[0.95rem] leading-tight">
                            {xp.company}
                            {xp.current && (
                              <span className="ml-2 text-[0.65rem] px-2 py-0.5 rounded-full bg-[var(--color-red)]/10 text-[var(--color-red)] font-medium align-middle">
                                En cours
                              </span>
                            )}
                          </h3>
                          <p className="text-[var(--color-red)] text-[0.8rem] font-medium mt-0.5">{xp.role}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[0.75rem] text-[#888] whitespace-nowrap">{xp.period}</p>
                          <p className="text-[0.7rem] text-[#aaa]">{xp.location}</p>
                        </div>
                      </div>
                      {xp.desc && <p className="text-[0.85rem] text-[#666] leading-relaxed">{xp.desc}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Formations */}
            <section>
              <p className="section-label mb-10">Formations</p>
              <div className="space-y-8">
                {formations.map((f, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-start justify-between gap-1 pb-8 border-b border-black/[0.06] last:border-none last:pb-0">
                    <div>
                      <h3 className="font-semibold text-[var(--color-dark)] text-[0.95rem]">{f.degree}</h3>
                      <p className="text-[0.82rem] text-[#666] mt-0.5">{f.school}</p>
                      {f.desc && <p className="text-[0.8rem] text-[#999] mt-1 leading-relaxed italic">{f.desc}</p>}
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[0.75rem] text-[#888] whitespace-nowrap">{f.period}</p>
                      <p className="text-[0.7rem] text-[#aaa]">{f.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* ── Sidebar ────────────────────────────────────────── */}
          <aside className="space-y-12 lg:border-l lg:border-black/[0.06] lg:pl-12">

            {/* Compétences */}
            <section>
              <p className="section-label mb-6">Compétences</p>
              <div className="space-y-4">
                {skills.map(s => (
                  <div key={s.label}>
                    <p className="text-[0.82rem] text-[var(--color-dark)] font-medium mb-1">{s.label}</p>
                    <Dots level={s.level} />
                  </div>
                ))}
              </div>
            </section>

            {/* Langues */}
            <section>
              <p className="section-label mb-6">Langues</p>
              <div className="space-y-4">
                {languages.map(l => (
                  <div key={l.label}>
                    <p className="text-[0.82rem] text-[var(--color-dark)] font-medium mb-1">{l.label}</p>
                    <Dots level={l.level} />
                  </div>
                ))}
              </div>
            </section>

            {/* Certification */}
            <section>
              <p className="section-label mb-6">Certification</p>
              <div className="rounded-xl border border-black/[0.07] p-4 bg-white">
                <p className="font-semibold text-[var(--color-dark)] text-[0.875rem]">Figma</p>
                <p className="text-[0.75rem] text-[#888] mt-1 leading-relaxed">
                  Outil collaboratif de design et prototypage d&apos;interfaces.
                  <br />Formation suivie sur Dyma.
                </p>
              </div>
            </section>

            {/* Intérêts */}
            <section>
              <p className="section-label mb-6">Intérêts</p>
              <div className="flex flex-wrap gap-2">
                {["Sport", "Musique", "Jeux vidéo"].map(i => (
                  <span key={i} className="px-4 py-2 rounded-full bg-[var(--color-dark)] text-white text-[0.78rem] font-medium">
                    {i}
                  </span>
                ))}
              </div>
            </section>

            {/* Contact rapide */}
            <section className="rounded-2xl bg-[var(--color-dark)] p-6 text-white">
              <p className="section-label text-white/30 mb-4">Contact</p>
              <a href="mailto:andrekimgbaguidi01@gmail.com" className="block text-[0.8rem] text-white/60 hover:text-white no-underline transition-colors mb-2">
                andrekimgbaguidi01@gmail.com
              </a>
              <p className="text-[0.8rem] text-white/40">+229 0166337219</p>
              <a href="/#contact" className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full bg-[var(--color-red)] text-white text-[0.8rem] font-medium no-underline hover:opacity-90 transition-opacity">
                Me contacter
              </a>
            </section>

          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
