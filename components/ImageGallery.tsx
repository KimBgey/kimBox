"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const open = (i: number) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);

  const prev = useCallback(() =>
    setLightboxIndex(i => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]);

  const next = useCallback(() =>
    setLightboxIndex(i => (i === null ? null : (i + 1) % images.length)),
    [images.length]);

  /* Keyboard navigation */
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")      close();
      else if (e.key === "ArrowLeft")  prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, prev, next]);

  /* Lock body scroll when open */
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  return (
    <>
      {/* ── Gallery stacked (normal view) ── */}
      <div className="flex flex-col gap-3">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => open(i)}
            className="group relative w-full rounded-xl overflow-hidden cursor-zoom-in bg-[#0d0d0d] border-none p-0"
            style={{ aspectRatio: "16/9" }}
            aria-label={`Ouvrir ${title} — visuel ${i + 1}`}
          >
            <Image
              src={src}
              alt={`${title} — visuel ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, calc(100vw - 360px)"
              priority={i === 0}
            />
            {/* Zoom hint overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white/0 group-hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all scale-75 group-hover:scale-100 opacity-0 group-hover:opacity-100">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex flex-col"
          onClick={close}
        >
          {/* Top bar */}
          <div
            className="shrink-0 flex items-center justify-between px-5 py-4"
            onClick={e => e.stopPropagation()}
          >
            <span className="text-white/40 text-sm font-medium">
              {title}
            </span>
            <div className="flex items-center gap-4">
              <span className="text-white/30 text-sm tabular-nums">
                {lightboxIndex + 1} / {images.length}
              </span>
              <button
                type="button" onClick={close}
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors cursor-pointer bg-transparent"
                aria-label="Fermer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Main image area */}
          <div
            className="flex-1 min-h-0 relative flex items-center justify-center px-16 py-4"
            onClick={e => e.stopPropagation()}
          >
            {/* Prev arrow */}
            {images.length > 1 && (
              <button
                type="button" onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors cursor-pointer bg-transparent z-10"
                aria-label="Image précédente"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
            )}

            {/* Image */}
            <div className="relative w-full h-full">
              <Image
                src={images[lightboxIndex]}
                alt={`${title} — visuel ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Next arrow */}
            {images.length > 1 && (
              <button
                type="button" onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors cursor-pointer bg-transparent z-10"
                aria-label="Image suivante"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            )}
          </div>

          {/* Thumbnails strip */}
          {images.length > 1 && (
            <div
              className="shrink-0 flex items-center gap-2 px-5 py-4 overflow-x-auto"
              onClick={e => e.stopPropagation()}
            >
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className={`relative shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer bg-transparent p-0 ${
                    i === lightboxIndex ? "border-white opacity-100" : "border-transparent opacity-40 hover:opacity-70"
                  }`}
                  aria-label={`Aller au visuel ${i + 1}`}
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="56px" />
                </button>
              ))}
            </div>
          )}

          {/* Click outside hint */}
          <p className="shrink-0 text-center text-white/20 text-[0.7rem] pb-3">
            Clic en dehors ou <kbd className="font-mono bg-white/10 px-1 rounded">Esc</kbd> pour fermer · <kbd className="font-mono bg-white/10 px-1 rounded">←</kbd><kbd className="font-mono bg-white/10 px-1 rounded">→</kbd> pour naviguer
          </p>
        </div>
      )}
    </>
  );
}
