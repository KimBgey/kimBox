"use server";

import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function parseArray(val: string): string[] {
  return val.split("\n").map(s => s.trim()).filter(Boolean);
}

export async function createService(formData: FormData) {
  const title = formData.get("title") as string;
  const type = formData.get("type") as "design" | "dev" | "bundle";
  const description = formData.get("description") as string;
  const priceRange = (formData.get("priceRange") as string) || null;
  const features = parseArray(formData.get("features") as string || "");
  const order = parseInt(formData.get("order") as string || "0", 10);

  await db.insert(services).values({ title, type, description, priceRange, features, order });

  revalidatePath("/admin/services");
  revalidatePath("/");
  redirect("/admin/services");
}

export async function updateService(id: number, formData: FormData) {
  const title = formData.get("title") as string;
  const type = formData.get("type") as "design" | "dev" | "bundle";
  const description = formData.get("description") as string;
  const priceRange = (formData.get("priceRange") as string) || null;
  const features = parseArray(formData.get("features") as string || "");
  const order = parseInt(formData.get("order") as string || "0", 10);

  await db.update(services).set({ title, type, description, priceRange, features, order })
    .where(eq(services.id, id));

  revalidatePath("/admin/services");
  revalidatePath("/");
  redirect("/admin/services");
}

export async function deleteService(id: number) {
  await db.delete(services).where(eq(services.id, id));
  revalidatePath("/admin/services");
  revalidatePath("/");
  redirect("/admin/services");
}
