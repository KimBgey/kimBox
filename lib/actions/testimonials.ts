"use server";

import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { testimonialSchema, firstIssueMessage } from "@/lib/validations";

export async function createTestimonial(formData: FormData): Promise<{ error?: string }> {
  if (!(await auth())) return { error: "Non autorisé" };
  try {
    const author = formData.get("author") as string;
    const role = (formData.get("role") as string) || null;
    const text = formData.get("text") as string;
    const projectIdRaw = formData.get("projectId") as string;
    const projectId = projectIdRaw ? parseInt(projectIdRaw, 10) : null;
    const visible = formData.get("visible") === "on";

    const parsed = testimonialSchema.safeParse({ author, role, text, projectId, visible });
    if (!parsed.success) return { error: firstIssueMessage(parsed.error) };

    await db.insert(testimonials).values(parsed.data);
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return {};
  } catch {
    return { error: "Erreur lors de la création du témoignage." };
  }
}

export async function updateTestimonial(id: number, formData: FormData): Promise<{ error?: string }> {
  if (!(await auth())) return { error: "Non autorisé" };
  try {
    const author = formData.get("author") as string;
    const role = (formData.get("role") as string) || null;
    const text = formData.get("text") as string;
    const projectIdRaw = formData.get("projectId") as string;
    const projectId = projectIdRaw ? parseInt(projectIdRaw, 10) : null;
    const visible = formData.get("visible") === "on";

    const parsed = testimonialSchema.safeParse({ author, role, text, projectId, visible });
    if (!parsed.success) return { error: firstIssueMessage(parsed.error) };

    await db.update(testimonials).set(parsed.data).where(eq(testimonials.id, id));
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return {};
  } catch {
    return { error: "Erreur lors de la mise à jour." };
  }
}

export async function deleteTestimonial(id: number): Promise<{ error?: string }> {
  if (!(await auth())) return { error: "Non autorisé" };
  try {
    await db.delete(testimonials).where(eq(testimonials.id, id));
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return {};
  } catch {
    return { error: "Erreur lors de la suppression." };
  }
}
