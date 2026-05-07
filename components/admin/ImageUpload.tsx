"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

interface Props {
  initialImages?: string[];
  projectId?: number;
  category?: "design" | "dev" | "both";
}

const HINT: Record<string, string> = {
  design: "Maquettes, mockups, visuels du process — JPG, PNG, WebP (max 10 Mo)",
  dev: "Screenshots, démonstrations, GIF — JPG, PNG, WebP, GIF (max 10 Mo)",
  both: "Visuels du projet — JPG, PNG, WebP (max 10 Mo)",
};

export default function ImageUpload({ initialImages = [], projectId, category = "both" }: Props) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [dragOver, setDragOver] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (file: File): Promise<string | null> => {
    const id = `${Date.now()}-${Math.random()}`;
    setUploadProgress(p => ({ ...p, [id]: 0 }));

    const formData = new FormData();
    formData.append("file", file);
    if (projectId) formData.append("projectId", String(projectId));

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const text = await res.text();
      let data: { url?: string; error?: string } = {};
      try { data = JSON.parse(text); } catch { data = { error: `Réponse invalide du serveur (${res.status})` }; }
      if (!res.ok || data.error) {
        setErrors(e => [...e, `${file.name} : ${data.error ?? "Erreur inconnue"}`]);
        return null;
      }
      return data.url as string;
    } finally {
      setUploadProgress(p => { const n = { ...p }; delete n[id]; return n; });
    }
  }, [projectId]);

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    const arr = Array.from(files).filter(f => f.type.startsWith("image/") || f.type.startsWith("video/"));
    if (!arr.length) return;
    setErrors([]);
    setUploading(true);

    const results = await Promise.all(arr.map(uploadFile));
    const urls = results.filter(Boolean) as string[];
    setImages(prev => [...prev, ...urls]);
    setUploading(false);
  }, [uploadFile]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleDelete = async (url: string) => {
    setImages(prev => prev.filter(u => u !== url));
    await fetch("/api/admin/upload/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
  };

  const move = (from: number, to: number) => {
    setImages(prev => {
      const arr = [...prev];
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return arr;
    });
  };

  const uploadCount = Object.keys(uploadProgress).length;

  return (
    <div className="space-y-4">
      {/* Hidden field with JSON images array */}
      <input type="hidden" name="images" value={JSON.stringify(images)} />

      {/* Hint */}
      <p className="text-[0.72rem] text-[#bbb]">{HINT[category]}</p>

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed cursor-pointer transition-colors py-8 px-4
          ${dragOver ? "border-[var(--color-red)] bg-[var(--color-red)]/5" : "border-black/10 bg-[#fafafa] hover:border-black/20 hover:bg-white"}`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*,video/mp4,video/webm"
          className="hidden"
          onChange={e => e.target.files && handleFiles(e.target.files)}
        />
        {uploading ? (
          <>
            <div className="w-8 h-8 rounded-full border-2 border-[var(--color-red)]/30 border-t-[var(--color-red)] animate-spin" />
            <p className="text-sm text-[#888]">
              Envoi en cours{uploadCount > 1 ? ` (${uploadCount} fichiers)` : ""}…
            </p>
          </>
        ) : (
          <>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#bbb]">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
            </svg>
            <p className="text-sm text-[#888]">
              <span className="font-medium text-[var(--color-dark)]">Glisser-déposer</span>{" "}ou cliquer pour ajouter
            </p>
            <p className="text-[0.7rem] text-[#ccc]">JPG, PNG, WebP, GIF, MP4 — max 10 Mo</p>
          </>
        )}
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <div className="space-y-1">
          {errors.map((err, i) => (
            <p key={i} className="text-[0.75rem] text-[var(--color-red)] flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {err}
            </p>
          ))}
        </div>
      )}

      {/* Preview grid */}
      {images.length > 0 && (
        <div>
          <p className="text-[0.7rem] font-semibold text-[#bbb] uppercase tracking-wider mb-3">
            {images.length} fichier{images.length !== 1 ? "s" : ""} — La 1ère image est la couverture
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {images.map((url, i) => (
              <div key={url} className="group relative aspect-square rounded-xl overflow-hidden border border-black/[0.06] bg-[#f0ede8]">

                {/* Thumbnail */}
                {url.match(/\.(mp4|webm)$/i) ? (
                  <video src={url} className="w-full h-full object-cover" muted />
                ) : (
                  <Image src={url} alt={`Media ${i + 1}`} fill className="object-cover" sizes="160px" />
                )}

                {/* Cover badge */}
                {i === 0 && (
                  <div className="absolute top-1 left-1 text-[0.6rem] font-semibold bg-[var(--color-dark)]/80 text-white px-1.5 py-0.5 rounded-md">
                    Cover
                  </div>
                )}

                {/* Overlay actions */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                  {/* Move left */}
                  {i > 0 && (
                    <button type="button" onClick={() => move(i, i - 1)} title="Déplacer à gauche"
                      className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors cursor-pointer">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                  )}
                  {/* Delete */}
                  <button type="button" onClick={() => handleDelete(url)} title="Supprimer"
                    className="w-7 h-7 rounded-full bg-[#cc3333] flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                  {/* Move right */}
                  {i < images.length - 1 && (
                    <button type="button" onClick={() => move(i, i + 1)} title="Déplacer à droite"
                      className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors cursor-pointer">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
