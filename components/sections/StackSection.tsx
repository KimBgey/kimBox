const DESIGN_TOOLS = [
  "Figma", "Photoshop", "Illustrator", "After Effects", "Premiere Pro",
  "Canva Pro", "Framer", "Spline", "Blender", "InDesign",
  "Figma", "Photoshop", "Illustrator", "After Effects", "Premiere Pro",
  "Canva Pro", "Framer", "Spline", "Blender", "InDesign",
];

const DEV_TOOLS = [
  "Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js",
  "PostgreSQL", "Drizzle ORM", "GSAP", "Framer Motion", "Vercel",
  "Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js",
  "PostgreSQL", "Drizzle ORM", "GSAP", "Framer Motion", "Vercel",
];

export default function StackSection() {
  return (
    <section id="stack" className="bg-[var(--color-dark)] py-24 md:py-32 overflow-hidden">
      <div className="px-5 md:px-10 lg:px-20 mb-12 md:mb-16">
        <p className="section-label text-white/40 mb-3">05 — Stack</p>
        <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.02em] text-white">
          Mes outils
        </h2>
      </div>

      {/* Marquee Design */}
      <div className="mb-4 overflow-hidden">
        <p className="section-label text-[var(--color-red)] px-5 md:px-10 lg:px-20 mb-3">Design</p>
        <div className="flex overflow-hidden">
          <div className="marquee-track flex shrink-0 gap-3 pr-3">
            {DESIGN_TOOLS.map((tool, i) => (
              <span key={i} className="shrink-0 px-5 py-2.5 rounded-full border border-white/10 text-white/70 text-sm font-medium whitespace-nowrap hover:border-[var(--color-red)]/50 hover:text-white transition-colors">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee Dev (sens inverse) */}
      <div className="overflow-hidden">
        <p className="section-label text-[var(--color-red)] px-5 md:px-10 lg:px-20 mb-3">Développement</p>
        <div className="flex overflow-hidden">
          <div className="marquee-track-reverse flex shrink-0 gap-3 pr-3">
            {DEV_TOOLS.map((tool, i) => (
              <span key={i} className="shrink-0 px-5 py-2.5 rounded-full border border-white/10 text-white/70 text-sm font-medium whitespace-nowrap hover:border-[var(--color-red)]/50 hover:text-white transition-colors">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
