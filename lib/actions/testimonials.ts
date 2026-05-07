"use server";

import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createTestimonial(formData: FormData): Promise<{ error?: string }> {
  try {
    const author = formData.get("author") as string;
    const role = (formData.get("role") as string) || null;
    const text = formData.get("text") as string;
    const projectIdRaw = formData.get("projectId") as string;
    const projectId = projectIdRaw ? parseInt(projectIdRaw, 10) : null;
    const visible = formData.get("visible") === "on";

    await db.insert(testimonials).values({ author, role, text, projectId, visible });
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return {};
  } catch {
    return { error: "Erreur lors de la création du témoignage." };
  }
}

export async function updateTestimonial(id: number, formData: FormData): Promise<{ error?: string }> {
  try {
    const author = formData.get("author") as string;
    const role = (formData.get("role") as string) || null;
    const text = formData.get("text") as string;
    const projectIdRaw = formData.get("projectId") as string;
    const projectId = projectIdRaw ? parseInt(projectIdRaw, 10) : null;
    const visible = formData.get("visible") === "on";

    await db.update(testimonials).set({ author, role, text, projectId, visible }).where(eq(testimonials.id, id));
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return {};
  } catch {
    return { error: "Erreur lors de la mise à jour." };
  }
}

export async function deleteTestimonial(id: number): Promise<{ error?: string }> {
  try {
    await db.delete(testimonials).where(eq(testimonials.id, id));
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return {};
  } catch {
    return { error: "Erreur lors de la suppression." };
  }
}
