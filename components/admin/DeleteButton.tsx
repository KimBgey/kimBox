"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteProject } from "@/lib/actions/projects";
import { deleteService } from "@/lib/actions/services";
import { deleteTestimonial } from "@/lib/actions/testimonials";

type ResourceType = "project" | "service" | "testimonial";

const LABELS: Record<ResourceType, string> = {
  project: "projet",
  service: "service",
  testimonial: "témoignage",
};

const ACTIONS: Record<ResourceType, (id: number) => Promise<{ error?: string }>> = {
  project: deleteProject,
  service: deleteService,
  testimonial: deleteTestimonial,
};

const REDIRECT: Record<ResourceType, string> = {
  project: "/admin/projects",
  service: "/admin/services",
  testimonial: "/admin/testimonials",
};

export default function DeleteButton({
  id,
  type,
  name,
}: {
  id: number;
  type: ResourceType;
  name: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    toast(`Supprimer « ${name} » ?`, {
      description: "Cette action est irréversible.",
      action: {
        label: "Supprimer",
        onClick: () =>
          startTransition(async () => {
            const result = await ACTIONS[type](id);
            if (result?.error) {
              toast.error(result.error);
            } else {
              toast.success(`${LABELS[type].charAt(0).toUpperCase() + LABELS[type].slice(1)} supprimé.`);
              router.refresh();
            }
          }),
      },
      cancel: { label: "Annuler", onClick: () => {} },
      duration: 8000,
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={pending}
      className="text-[0.8125rem] text-[#cc3333]/70 hover:text-[#cc3333] disabled:opacity-40 transition-colors cursor-pointer bg-transparent border-none p-0"
    >
      {pending ? "…" : "Supprimer"}
    </button>
  );
}
