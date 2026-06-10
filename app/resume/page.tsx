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
    period: "01/2022 – Aujourd'hui",
    company: "Freelance",
    location: "Abomey Calavi",
    role: "Designer Graphiste",
    desc: "Réalisation d'affiches publicitaires et d'identités visuelles pour sites web.",
    current: true,
  },
  {
    period: "02/2026 – 03/2026",
    company: "ALNYF BENIN GLOBAL SARL",
    location: "Cotonou",
    role: "Web Designer",
    desc: "Réalisation de maquettes web et mobile et mise en place d'identités visuelles.",
  },
  {
    period: "10/2025 – 03/2026",
    company: "Rivael Système",
    location: "Abomey Calavi (Remote)",
    role: "Web Designer — Stage",
    desc: "Conception de maquettes web & mobile et création d'identités de marque.",
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
    desc: "Réalisation d'une application web de gestion de projets collaboratifs pour optimiser la planification et le suivi des tâches.",
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
  { label: "Premiere Pro / CapCut", level: 2 },
  { label: "PowerPoint / Excel", level: 4 },
];

const languages = [
  { label: "Français", level: 5 },
  { label: "Fon", level: 5 },
  { label: "Dendi", level: 4 },
  { label: "Anglais", level: 2 },
];

const LEVEL_WIDTH = ["w-0", "w-1/5", "w-2/5", "w-3/5", "w-4/5", "w-full"];
const LEVEL_LABEL = ["", "Débutant", "Notions", "Avancé", "Expert", "Natif"];

function SkillBar({ label, level }: { label: string; level: number }) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[0.82rem] font-medium text-[var(--color-dark)]">{label}</span>
        <span className="font-mono text-[0.6rem] uppercase tracking-wider text-[#ccc] group-hover:text-[var(--color-red)] transition-colors">
          {LEVEL_LABEL[level]}
        </span>
      </div>
      <div className="h-[3px] bg-black/[0.07] rounded-full overflow-hidden">
        <div className={`h-full bg-[var(--color-red)] rounded-full transition-all ${LEVEL_WIDTH[level]}`} />
      </div>
    </div>
  );
}

export default function ResumePage() {
  const currentXps = experiences.filter(x => x.current);
  const pastXps = experiences.filter(x => !x.current);

  return (
    <>
      <Nav />
      <main className="bg-[var(--color-cream)] min-h-screen">

        {/* ── Hero ── */}
        <div className="bg-[var(--color-dark)] pt-28 pb-16 px-5 md:px-10 lg:px-20">
          <div className="max-w-5xl mx-auto">

            {/* Top row */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-10">
              <div>
                <p className="font-mono text-[0.6875rem] font-medium tracking-[0.14em] uppercase text-white/25 mb-4">
                  Curriculum Vitae
                </p>
                <h1 className="font-display text-[clamp(2.8rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.025em] text-white mb-2">
                  André Kim<span className="text-[var(--color-red)]">.</span>
                </h1>
                <p className="text-white/40 text-[0.95rem] font-medium">
                  Développeur Web &amp; Web Designer
                </p>
              </div>

              <a
                href="/cv/André_Kim_GBAGUIDI.pdf"
                download
                className="inline-flex items-center gap-2.5 self-start px-6 py-3 rounded-full bg-[var(--color-red)] text-white text-sm font-semibold no-underline hover:opacity-90 transition-opacity shrink-0"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Télécharger le CV
              </a>
            </div>

            {/* Profil */}
            <div className="border-t border-white/[0.07] pt-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-end">
              <p className="text-white/50 text-[0.9rem] leading-relaxed max-w-xl">
                Designer et développeur web avec 3+ ans d&apos;expérience, basé à Abomey-Calavi, Bénin.
                Je transforme des idées en interfaces digitales soignées — de la maquette Figma au site en production.
              </p>
              <div className="flex flex-wrap gap-3 text-[0.75rem] text-white/25 font-mono">
                <span>andrekimgbaguidi01@gmail.com</span>
                <span className="hidden md:inline">·</span>
                <span>+229 0166337219</span>
              </div>
            </div>

          </div>
        </div>

        {/* ── Corps ── */}
        <div className="max-w-5xl mx-auto px-5 md:px-10 lg:px-20 py-16 md:py-20 grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-14 lg:gap-16">

          {/* ── Colonne principale ── */}
          <div className="space-y-16">

            {/* Postes en cours */}
            {currentXps.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <p className="font-mono text-[0.6875rem] font-medium tracking-[0.14em] uppercase text-[var(--color-dark)]/40">
                    En cours
                  </p>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                </div>
                <div className="space-y-6">
                  {currentXps.map((xp, i) => (
                    <div key={i} className="rounded-2xl border border-[var(--color-dark)]/[0.07] bg-white p-5 md:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                        <div>
                          <h3 className="font-semibold text-[var(--color-dark)] text-[0.95rem] leading-tight">
                            {xp.company}
                          </h3>
                          <p className="text-[var(--color-red)] text-[0.8rem] font-medium mt-0.5">{xp.role}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[0.72rem] text-[#aaa] whitespace-nowrap font-mono">{xp.period}</p>
                          <p className="text-[0.68rem] text-[#ccc]">{xp.location}</p>
                        </div>
                      </div>
                      {xp.desc && <p className="text-[0.83rem] text-[#777] leading-relaxed">{xp.desc}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Expériences passées */}
            <section>
              <p className="font-mono text-[0.6875rem] font-medium tracking-[0.14em] uppercase text-[var(--color-dark)]/40 mb-8">
                Expériences passées
              </p>

              <div className="relative">
                <div className="absolute left-0 top-2 bottom-0 w-px bg-black/[0.07] hidden md:block" />
                <div className="space-y-8">
                  {pastXps.map((xp, i) => (
                    <div key={i} className="md:pl-8 relative">
                      <div className="hidden md:block absolute left-0 top-2 w-2 h-2 rounded-full -translate-x-[3.5px] border-2 border-[var(--color-dark)]/20 bg-[var(--color-cream)]" />
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 mb-2">
                        <div>
                          <h3 className="font-semibold text-[var(--color-dark)] text-[0.9rem] leading-tight">
                            {xp.company}
                          </h3>
                          <p className="text-[var(--color-red)] text-[0.78rem] font-medium mt-0.5">{xp.role}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[0.72rem] text-[#aaa] whitespace-nowrap font-mono">{xp.period}</p>
                          <p className="text-[0.68rem] text-[#ccc]">{xp.location}</p>
                        </div>
                      </div>
                      {xp.desc && <p className="text-[0.82rem] text-[#888] leading-relaxed">{xp.desc}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Formations */}
            <section>
              <p className="font-mono text-[0.6875rem] font-medium tracking-[0.14em] uppercase text-[var(--color-dark)]/40 mb-8">
                Formation
              </p>
              <div className="space-y-6">
                {formations.map((f, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-6 border-b border-black/[0.05] last:border-none last:pb-0">
                    <div>
                      <h3 className="font-semibold text-[var(--color-dark)] text-[0.9rem] leading-tight">{f.degree}</h3>
                      <p className="text-[0.8rem] text-[#888] mt-0.5">{f.school}</p>
                      {f.desc && <p className="text-[0.78rem] text-[#aaa] mt-1 leading-relaxed">{f.desc}</p>}
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[0.72rem] text-[#aaa] whitespace-nowrap font-mono">{f.period}</p>
                      <p className="text-[0.68rem] text-[#ccc]">{f.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* ── Sidebar ── */}
          <aside className="space-y-10 lg:border-l lg:border-black/[0.06] lg:pl-10">

            {/* Compétences */}
            <section>
              <p className="font-mono text-[0.6875rem] font-medium tracking-[0.14em] uppercase text-[var(--color-dark)]/40 mb-6">
                Compétences
              </p>
              <div className="space-y-5">
                {skills.map(s => <SkillBar key={s.label} label={s.label} level={s.level} />)}
              </div>
            </section>

            {/* Langues */}
            <section>
              <p className="font-mono text-[0.6875rem] font-medium tracking-[0.14em] uppercase text-[var(--color-dark)]/40 mb-6">
                Langues
              </p>
              <div className="space-y-5">
                {languages.map(l => <SkillBar key={l.label} label={l.label} level={l.level} />)}
              </div>
            </section>

            {/* Certification */}
            <section>
              <p className="font-mono text-[0.6875rem] font-medium tracking-[0.14em] uppercase text-[var(--color-dark)]/40 mb-5">
                Certification
              </p>
              <div className="rounded-xl border border-black/[0.07] bg-white p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-[var(--color-dark)] text-[0.875rem]">Figma</p>
                  <span className="text-[0.6rem] font-mono text-[var(--color-red)] uppercase tracking-widest">Dyma</span>
                </div>
                <p className="text-[0.75rem] text-[#aaa] leading-relaxed">
                  Design d&apos;interfaces et prototypage collaboratif.
                </p>
              </div>
            </section>

            {/* Intérêts */}
            <section>
              <p className="font-mono text-[0.6875rem] font-medium tracking-[0.14em] uppercase text-[var(--color-dark)]/40 mb-5">
                Intérêts
              </p>
              <div className="flex flex-wrap gap-2">
                {["Sport", "Musique", "Jeux vidéo"].map(item => (
                  <span key={item} className="px-3.5 py-1.5 rounded-full bg-[var(--color-dark)] text-white text-[0.75rem] font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </section>

          </aside>
        </div>

      </main>
      <Footer />
    </>
  );
}
