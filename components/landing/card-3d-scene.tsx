"use client";

import { useRef } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

// rotateY positive → right side leans toward viewer
// main card is the rightmost element → it's the closest ✓
const RESTING = "perspective(1100px) rotateX(4deg) rotateY(10deg)";

function PhoneFramedBlueprint() {
  return (
    <div className="relative aspect-[1920/1440] w-[620px] max-w-full">
      <div className="pointer-events-none absolute inset-0 rounded-[3rem] bg-[radial-gradient(circle_at_52%_24%,rgba(82,103,217,0.2),transparent_22%),radial-gradient(circle_at_48%_58%,rgba(56,189,248,0.12),transparent_26%),radial-gradient(circle_at_38%_75%,rgba(255,255,255,0.62),transparent_28%)] blur-[2px]" />
      <div className="absolute left-[36.3%] top-[7.65%] h-[64.8%] w-[24.7%] overflow-hidden rounded-[2.45rem] bg-[linear-gradient(180deg,#0a1020_0%,#060a15_100%)] shadow-[0_24px_40px_rgba(15,23,42,0.2)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(82,103,217,0.18),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]" />
        <div className="absolute inset-[0.18rem] overflow-hidden rounded-[2.28rem]">
          <Image
            src="/jordan-lin-card.png"
            alt="Jordan Lin DigiCard example displayed inside the homepage phone mockup"
            fill
            sizes="(max-width: 768px) 28vw, 160px"
            className="object-contain object-center"
            priority
          />
        </div>
      </div>
      <Image
        src="/hand-phone-hero.png"
        alt="Hand holding a phone previewing the DigiCard blueprint demo"
        fill
        sizes="(max-width: 768px) 90vw, 620px"
        className="pointer-events-none select-none object-contain drop-shadow-[0_34px_80px_rgba(15,23,42,0.24)]"
        priority
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_36%_72%,rgba(255,255,255,0.26),transparent_18%),radial-gradient(circle_at_53%_13%,rgba(255,255,255,0.12),transparent_14%)]" />
    </div>
  );
}

export function Card3DScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = sceneRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1100px) rotateX(${4 + y * -10}deg) rotateY(${10 + x * 10}deg)`;
  }

  function handleMouseLeave() {
    const el = sceneRef.current;
    if (!el) return;
    el.style.transform = RESTING;
  }

  return (
    <div className="relative flex justify-center py-10">

      {/* Ambient glows — no overflow-hidden so blur is visible */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[5%] top-[10%] h-80 w-80 rounded-full bg-[rgba(82,103,217,0.22)] blur-[100px]" />
        <div className="absolute right-[8%] top-[38%] h-64 w-64 rounded-full bg-[rgba(6,182,212,0.14)] blur-[80px]" />
        <div className="absolute bottom-[5%] left-[28%] h-56 w-56 rounded-full bg-[rgba(139,92,246,0.16)] blur-[70px]" />
      </div>

      {/* "Your card. One scan." — outside the tilt, stays flat as a label */}
      <div className="absolute right-0 top-0 z-20 hidden items-center gap-2 rounded-full border border-[rgba(82,103,217,0.15)] bg-white/90 px-4 py-2 text-sm font-semibold text-[var(--ink)] shadow-[0_10px_28px_rgba(21,32,58,0.1)] backdrop-blur lg:inline-flex">
        <Sparkles className="h-4 w-4 text-[var(--brand)]" />
        Your card. One scan.
      </div>

      {/* ── 3D tilting scene ───────────────────────────────────────────────── */}
      {/*
        Layout (left → right = back → front in 3D with rotateY +16deg):
          ghost2 at left:0       → visible 0–80px  (amber bar + "JP" + "Jay...")
          ghost1 at left:80px    → visible 80–160px (purple bar + "AK" + "Alex...")
          main   at left:160px   → full 280px visible (Blueprint card)
          QR badge: below main card, left:160px, in paddingBottom space
      */}
      <div
        ref={sceneRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: RESTING,
          transition: "transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)",
          willChange: "transform",
          paddingBottom: "78px",
        }}
        className="relative"
      >
        {/* Ghost 2 — furthest back (amber/orange Ember card) */}
        {/* Ghost 1 — middle depth (purple Horizon card) */}
        {/* Main card — front (Blueprint card inside phone casing) */}
        <div className="relative z-[3] w-[620px] max-w-full">
          <PhoneFramedBlueprint />
        </div>

        {/* Ground shadow under main card */}
        <div
          className="absolute h-8 rounded-full bg-[rgba(17,26,60,0.2)] blur-2xl"
          style={{ bottom: "54px", left: "104px", right: "104px" }}
        />

        {/* QR badge — in the paddingBottom space, below the card, tilts with scene */}
      </div>
    </div>
  );
}
