import { auth } from "@/lib/auth";
import cloudinary, { extractPublicId } from "@/lib/cloudinary";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return Response.json({ error: "Non autorisé" }, { status: 401 });

    const { url } = await req.json() as { url: string };
    if (!url) return Response.json({ error: "URL manquante" }, { status: 400 });

    const publicId = extractPublicId(url);
    if (!publicId) return Response.json({ error: "Public ID introuvable" }, { status: 400 });

    const resourceType = url.includes("/video/") ? "video" : "image";
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });

    return Response.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur serveur";
    return Response.json({ error: message }, { status: 500 });
  }
}
