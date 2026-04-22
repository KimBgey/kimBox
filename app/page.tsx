import { db } from "@/lib/db";
import { projects, services, settings } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import HomeClient from "@/components/HomeClient";

export default async function Home() {
  const [dbProjects, dbServices, dbSettings] = await Promise.all([
    db.select().from(projects).orderBy(projects.order, desc(projects.createdAt)),
    db.select().from(services).orderBy(services.order),
    db.select().from(settings),
  ]);

  const settingsMap = Object.fromEntries(dbSettings.map(r => [r.key, r.value]));

  return (
    <HomeClient
      dbProjects={dbProjects}
      dbServices={dbServices}
      comeupUrl={settingsMap.comeup_url ?? ""}
    />
  );
}
