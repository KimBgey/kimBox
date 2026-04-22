"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const tick = () => {
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;
      gsap.set(cursor, { x: cursorX, y: cursorY });
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMouseMove);

    // Changement de style selon la zone
    const handleEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A" || target.tagName === "BUTTON" || target.dataset.cursor === "cta") {
        cursor.className = "cursor--cta";
      } else if (target.tagName === "P" || target.tagName === "H1" || target.tagName === "H2" || target.tagName === "H3" || target.tagName === "SPAN") {
        cursor.className = "cursor--text";
      } else if (target.tagName === "IMG" || target.dataset.cursor === "image") {
        cursor.className = "cursor--image";
      } else {
        cursor.className = "";
      }
    };

    document.addEventListener("mouseover", handleEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleEnter);
    };
  }, []);

  return null;
}
