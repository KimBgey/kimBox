import { z } from "zod";

const optionalUrl = z.string().trim().url().optional();

export const projectSchema = z.object({
  title: z.string().trim().min(1, "Le titre est requis.").max(200),
  slug: z
    .string()
    .trim()
    .min(1, "Le slug est requis.")
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Le slug ne peut contenir que des lettres minuscules, chiffres et tirets."),
  category: z.enum(["design", "dev", "both"]),
  description: z.string().trim().min(1, "La description est requise."),
  caseStudy: z.string().trim().max(20000).nullable(),
  tools: z.array(z.string().trim().min(1)).max(50),
  links: z.object({
    live: optionalUrl,
    behance: optionalUrl,
    github: optionalUrl,
  }),
  featured: z.boolean(),
  order: z.number().int(),
  images: z.array(z.string().trim().min(1)).max(50),
});

export const serviceSchema = z.object({
  title: z.string().trim().min(1, "Le titre est requis.").max(200),
  type: z.enum(["design", "dev", "bundle"]),
  description: z.string().trim().min(1, "La description est requise."),
  priceRange: z.string().trim().max(100).nullable(),
  features: z.array(z.string().trim().min(1)).max(50),
  order: z.number().int(),
});

export const testimonialSchema = z.object({
  author: z.string().trim().min(1, "L'auteur est requis.").max(200),
  role: z.string().trim().max(200).nullable(),
  text: z.string().trim().min(1, "Le témoignage est requis."),
  projectId: z.number().int().nullable(),
  visible: z.boolean(),
});

export function firstIssueMessage(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Données invalides.";
}
