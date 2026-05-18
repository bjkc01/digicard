"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const canUseGlow = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!canUseGlow.matches || reducedMotion.matches) {
      return;
    }

    const move = (e: PointerEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        glowRef.current?.style.setProperty("--cx", `${x}px`);
        glowRef.current?.style.setProperty("--cy", `${y}px`);
      });
    };

    window.addEventListener("pointermove", move, { passive: true });

    return () => {
      window.removeEventListener("pointermove", move);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 hidden lg:block"
      style={{
        background: `radial-gradient(380px circle at var(--cx, -999px) var(--cy, -999px), rgba(123, 151, 255, 0.10), transparent 70%)`,
      }}
    />
  );
}
