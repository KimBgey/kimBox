import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProjectsPageClient from "@/components/ProjectsPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projets — André Kim",
  description: "Tous les projets de design et développement d'André Kim.",
};

export default async function ProjectsPage() {
  const allProjects = await db.select().from(projects).orderBy(projects.order);

  return (
    <>
      <Nav />
      <ProjectsPageClient projects={allProjects} />
      <Footer />
    </>
  );
}
