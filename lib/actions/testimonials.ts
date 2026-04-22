"use server";

import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTestimonial(formData: FormData) {
  const author = formData.get("author") as string;
  const role = (formData.get("role") as string) || null;
  const text = formData.get("text") as string;
  const projectIdRaw = formData.get("projectId") as string;
  const projectId = projectIdRaw ? parseInt(projectIdRaw, 10) : null;
  const visible = formData.get("visible") === "on";

  await db.insert(testimonials).values({ author, role, text, projectId, visible });

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: number, formData: FormData) {
  const author = formData.get("author") as string;
  const role = (formData.get("role") as string) || null;
  const text = formData.get("text") as string;
  const projectIdRaw = formData.get("projectId") as string;
  const projectId = projectIdRaw ? parseInt(projectIdRaw, 10) : null;
  const visible = formData.get("visible") === "on";

  await db.update(testimonials).set({ author, role, text, projectId, visible })
    .where(eq(testimonials.id, id));

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: number) {
  await db.delete(testimonials).where(eq(testimonials.id, id));
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}
