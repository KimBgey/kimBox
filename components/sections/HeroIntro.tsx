"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function HeroIntro({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const andreRef = useRef<HTMLDivElement>(null);
  const kimRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const andreEl = andreRef.current;
    const kimEl = kimRef.current;
    if (!overlay || !andreEl || !kimEl) return;

    const andreSplit = new SplitText(andreEl, { type: "chars" });
    const kimSplit = new SplitText(kimEl, { type: "chars" });

    gsap.set([...andreSplit.chars, ...kimSplit.chars], { opacity: 0, yPercent: 80 });

    const tl = gsap.timeline({
      onComplete: () => {
        overlay.style.display = "none";
        onComplete();
      },
    });

    tl.to(andreSplit.chars, {
      opacity: 1,
      yPercent: 0,
      duration: 0.7,
      stagger: 0.06,
      ease: "power3.out",
    })
      .to(
        kimSplit.chars,
        {
          opacity: 1,
          yPercent: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.3"
      )
      .to({}, { duration: 0.55 })
      .to([...andreSplit.chars, ...kimSplit.chars], {
        opacity: 0,
        yPercent: -120,
        duration: 0.45,
        stagger: { each: 0.03, from: "random" },
        ease: "power2.in",
      })
      .to(
        overlay,
        { opacity: 0, duration: 0.35, ease: "power1.inOut" },
        "-=0.1"
      );

    return () => {
      tl.kill();
      andreSplit.revert();
      kimSplit.revert();
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9997,
        backgroundColor: "var(--color-dark)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.25rem",
        overflow: "hidden",
      }}
    >
      <div
        ref={andreRef}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(3.5rem, 10vw, 9rem)",
          color: "var(--color-cream)",
          lineHeight: 1,
          letterSpacing: "-0.03em",
          overflow: "hidden",
        }}
      >
        ANDRÉ
      </div>
      <div
        ref={kimRef}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(3.5rem, 10vw, 9rem)",
          color: "var(--color-red)",
          lineHeight: 1,
          letterSpacing: "-0.03em",
          overflow: "hidden",
        }}
      >
        KIM
      </div>
    </div>
  );
}
