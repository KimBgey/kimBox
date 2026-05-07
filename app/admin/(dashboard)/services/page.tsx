import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

const TYPE_LABEL: Record<string, string> = {
  design: "Design",
  dev: "Développement",
  bundle: "Bundle",
};

export default async function AdminServices() {
  const allServices = await db.select().from(services).orderBy(services.order);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl md:text-4xl text-[var(--color-dark)]">Services</h1>
          <p className="text-[0.8125rem] text-[#999] mt-1">{allServices.length} service{allServices.length !== 1 ? "s" : ""}</p>
        </div>
        <Link href="/admin/services/new" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-dark)] text-white text-sm font-semibold no-underline hover:opacity-80 transition-opacity">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Nouveau service
        </Link>
      </div>

      {allServices.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-black/[0.06]">
          <p className="text-[#bbb] text-sm mb-3">Aucun service pour l&apos;instant.</p>
          <Link href="/admin/services/new" className="text-sm text-[var(--color-red)] no-underline hover:opacity-70">Créer le premier →</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allServices.map((service) => (
            <div key={service.id} className="group bg-white rounded-2xl border border-black/[0.06] p-5 hover:border-black/10 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <span className="text-[0.68rem] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/[0.05] text-[#666]">
                  {TYPE_LABEL[service.type] ?? service.type}
                </span>
                <span className="text-[0.72rem] text-[#bbb]">#{service.order}</span>
              </div>

              <h3 className="font-medium text-[var(--color-dark)] text-[0.9375rem] mb-1">{service.title}</h3>
              {service.priceRange && (
                <p className="text-[0.8rem] text-[var(--color-red)] font-medium mb-2">{service.priceRange}</p>
              )}
              <p className="text-[0.8rem] text-[#888] line-clamp-2 mb-4">{service.description}</p>

              <div className="flex items-center gap-4 pt-3 border-t border-black/[0.05]">
                <Link href={`/admin/services/${service.id}/edit`} className="text-[0.8125rem] text-[var(--color-dark)] no-underline hover:text-[var(--color-red)] transition-colors font-medium">
                  Modifier
                </Link>
                <DeleteButton id={service.id} type="service" name={service.title} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
