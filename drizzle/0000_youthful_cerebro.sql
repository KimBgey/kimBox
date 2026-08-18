CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"category" text DEFAULT 'both' NOT NULL,
	"description" text NOT NULL,
	"case_study" text,
	"images" jsonb DEFAULT '[]'::jsonb,
	"tools" jsonb DEFAULT '[]'::jsonb,
	"links" jsonb DEFAULT '{}'::jsonb,
	"featured" boolean DEFAULT false,
	"order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"type" text NOT NULL,
	"description" text NOT NULL,
	"price_range" text,
	"features" jsonb DEFAULT '[]'::jsonb,
	"order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"key" text PRIMARY KEY NOT NULL,
	"value" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" serial PRIMARY KEY NOT NULL,
	"author" text NOT NULL,
	"role" text,
	"text" text NOT NULL,
	"project_id" integer,
	"visible" boolean DEFAULT true
);
--> statement-breakpoint
ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;