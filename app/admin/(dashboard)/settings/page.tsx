import { db } from "@/lib/db";
import { settings } from "@/lib/db/schema";
import SettingsForm from "@/components/admin/SettingsForm";

const SETTINGS_GROUPS = [
  {
    title: "Disponibilité",
    keys: [
      { key: "availability", label: "Statut affiché", placeholder: "ex: Disponible — Mars 2025" },
    ],
  },
  {
    title: "Réseaux sociaux",
    keys: [
      { key: "behance", label: "Behance", placeholder: "https://behance.net/..." },
      { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/..." },
      { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/..." },
    ],
  },
  {
    title: "Contact",
    keys: [
      { key: "email", label: "Email", placeholder: "contact@..." },
      { key: "whatsapp", label: "WhatsApp", placeholder: "+229 ..." },
      { key: "comeup_url", label: "Lien Comeup", placeholder: "https://comeup.com/..." },
    ],
  },
];

export default async function SettingsPage() {
  const rows = await db.select().from(settings);
  const values = Object.fromEntries(rows.map((r) => [r.key, r.value]));

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <p className="font-mono text-[0.6rem] text-[#bbb] uppercase tracking-widest mb-1">Admin</p>
        <h1 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] leading-tight text-[var(--color-dark)]">
          Paramètres
        </h1>
        <p className="text-[0.8125rem] text-[#aaa] mt-0.5">Configuration du site public.</p>
      </div>
      <SettingsForm groups={SETTINGS_GROUPS} values={values} />
    </div>
  );
}
