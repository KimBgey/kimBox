import { pgTable, text, integer, boolean, jsonb, timestamp, serial } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category", { enum: ["design", "dev", "both"] }).notNull().default("both"),
  description: text("description").notNull(),
  caseStudy: text("case_study"),
  images: jsonb("images").$type<string[]>().default([]),
  tools: jsonb("tools").$type<string[]>().default([]),
  links: jsonb("links").$type<{ live?: string; behance?: string; github?: string }>().default({}),
  featured: boolean("featured").default(false),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type", { enum: ["design", "dev", "bundle"] }).notNull(),
  description: text("description").notNull(),
  priceRange: text("price_range"),
  features: jsonb("features").$type<string[]>().default([]),
  order: integer("order").default(0),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  author: text("author").notNull(),
  role: text("role"),
  text: text("text").notNull(),
  projectId: integer("project_id").references(() => projects.id, { onDelete: "set null" }),
  visible: boolean("visible").default(true),
});

export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;
export type Testimonial = typeof testimonials.$inferSelect;
