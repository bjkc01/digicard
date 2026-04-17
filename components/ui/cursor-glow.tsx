"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.setProperty("--cx", `${e.clientX}px`);
      glowRef.current.style.setProperty("--cy", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        background: `radial-gradient(380px circle at var(--cx, -999px) var(--cy, -999px), rgba(123, 151, 255, 0.10), transparent 70%)`,
      }}
    />
  );
}
