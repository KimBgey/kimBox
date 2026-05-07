"use server";

import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseArray(val: string): string[] {
  return val.split(",").map(s => s.trim()).filter(Boolean);
}

export async function createProject(formData: FormData): Promise<{ error?: string }> {
  try {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string || slugify(title);
    const category = formData.get("category") as "design" | "dev" | "both";
    const description = formData.get("description") as string;
    const caseStudy = (formData.get("caseStudy") as string) || null;
    const tools = parseArray(formData.get("tools") as string || "");
    const links = {
      live: (formData.get("link_live") as string) || undefined,
      behance: (formData.get("link_behance") as string) || undefined,
      github: (formData.get("link_github") as string) || undefined,
    };
    const featured = formData.get("featured") === "on";
    const order = parseInt(formData.get("order") as string || "0", 10);

    const imagesRaw = formData.get("images") as string | null;
    const images: string[] = imagesRaw ? JSON.parse(imagesRaw) : [];

    await db.insert(projects).values({ title, slug, category, description, caseStudy, tools, links, featured, order, images });
    revalidatePath("/admin/projects");
    revalidatePath("/");
    return {};
  } catch {
    return { error: "Erreur lors de la création du projet." };
  }
}

export async function updateProject(id: number, formData: FormData): Promise<{ error?: string }> {
  try {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string || slugify(title);
    const category = formData.get("category") as "design" | "dev" | "both";
    const description = formData.get("description") as string;
    const caseStudy = (formData.get("caseStudy") as string) || null;
    const tools = parseArray(formData.get("tools") as string || "");
    const links = {
      live: (formData.get("link_live") as string) || undefined,
      behance: (formData.get("link_behance") as string) || undefined,
      github: (formData.get("link_github") as string) || undefined,
    };
    const featured = formData.get("featured") === "on";
    const order = parseInt(formData.get("order") as string || "0", 10);

    const imagesRaw = formData.get("images") as string | null;
    const images: string[] = imagesRaw ? JSON.parse(imagesRaw) : [];

    await db.update(projects).set({ title, slug, category, description, caseStudy, tools, links, featured, order, images }).where(eq(projects.id, id));
    revalidatePath("/admin/projects");
    revalidatePath("/");
    return {};
  } catch {
    return { error: "Erreur lors de la mise à jour." };
  }
}

export async function deleteProject(id: number): Promise<{ error?: string }> {
  try {
    await db.delete(projects).where(eq(projects.id, id));
    revalidatePath("/admin/projects");
    revalidatePath("/");
    return {};
  } catch {
    return { error: "Erreur lors de la suppression." };
  }
}
