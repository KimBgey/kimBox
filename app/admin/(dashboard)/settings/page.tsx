import { db } from "@/lib/db";
import { settings } from "@/lib/db/schema";
import SettingsForm from "@/components/admin/SettingsForm";

const SETTINGS_KEYS = [
  { key: "availability", label: "Statut de disponibilité", placeholder: "ex: Disponible — Mars 2025" },
  { key: "comeup_url", label: "Lien Comeup", placeholder: "https://comeup.com/..." },
  { key: "whatsapp", label: "Numéro WhatsApp", placeholder: "+33 6 12 34 56 78" },
  { key: "behance", label: "URL Behance", placeholder: "https://behance.net/..." },
  { key: "instagram", label: "URL Instagram", placeholder: "https://instagram.com/..." },
  { key: "linkedin", label: "URL LinkedIn", placeholder: "https://linkedin.com/in/..." },
  { key: "email", label: "Email de contact", placeholder: "contact@..." },
];

export default async function SettingsPage() {
  const rows = await db.select().from(settings);
  const values = Object.fromEntries(rows.map((r) => [r.key, r.value]));

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", marginBottom: "1.5rem" }}>
        Paramètres
      </h1>
      <SettingsForm keys={SETTINGS_KEYS} values={values} />
    </div>
  );
}
