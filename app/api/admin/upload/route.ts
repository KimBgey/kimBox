import { auth } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import { NextRequest } from "next/server";

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif", "video/mp4", "video/webm"];

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return Response.json({ error: "Non autorisé" }, { status: 401 });

    if (!process.env.CLOUDINARY_API_SECRET) {
      return Response.json({ error: "Cloudinary non configuré — ajoute CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY et CLOUDINARY_API_SECRET dans .env.local" }, { status: 500 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const projectId = formData.get("projectId") as string | null;

    if (!file) return Response.json({ error: "Aucun fichier fourni" }, { status: 400 });
    if (file.size > MAX_SIZE) return Response.json({ error: "Fichier trop volumineux (max 10 Mo)" }, { status: 400 });
    if (!ALLOWED_TYPES.includes(file.type)) return Response.json({ error: "Format non supporté" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const folder = projectId ? `kimbox/projects/${projectId}` : "kimbox/projects/tmp";
    const resourceType = file.type.startsWith("video/") ? "video" : "image";

    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder, resource_type: resourceType, overwrite: false },
        (error, res) => (error ? reject(error) : resolve(res!))
      ).end(buffer);
    });

    return Response.json({ url: result.secure_url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur serveur";
    return Response.json({ error: message }, { status: 500 });
  }
}
