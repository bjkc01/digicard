"use client";

import { useRef } from "react";
import Image from "next/image";
import { QrCode, ScanLine, Sparkles } from "lucide-react";
import { CardPreview } from "@/components/cards/card-preview";
import type { DigiCard } from "@/lib/data";

// rotateY positive → right side leans toward viewer
// main card is the rightmost element → it's the closest ✓
const RESTING = "perspective(1100px) rotateX(4deg) rotateY(10deg)";

const mainCard: DigiCard = {
  color: "from-blue-700 via-cyan-500 to-emerald-400",
  company: "University of Maryland",
  email: "maya.carter@umd-ex.edu",
  id: 101,
  linkedin: "linkedin.com/in/mayacarter",
  name: "Maya Carter",
  phone: "+1 (555) 210-0284",
  template: "Blueprint",
  title: "Computer Science Student",
  website: "maya.dev",
};

function PhoneFramedBlueprint() {
  return (
    <div className="relative aspect-[1920/1440] w-[560px] max-w-full">
      <div className="pointer-events-none absolute inset-0 rounded-[3rem] bg-[radial-gradient(circle_at_52%_24%,rgba(82,103,217,0.2),transparent_22%),radial-gradient(circle_at_48%_58%,rgba(56,189,248,0.12),transparent_26%),radial-gradient(circle_at_38%_75%,rgba(255,255,255,0.62),transparent_28%)] blur-[2px]" />
      <div className="absolute left-[34.9%] top-[6.2%] h-[72.2%] w-[30.1%] overflow-hidden rounded-[2.8rem] bg-[linear-gradient(180deg,#0a1020_0%,#060a15_100%)] shadow-[0_24px_40px_rgba(15,23,42,0.2)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(82,103,217,0.18),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]" />
        <div
          className="absolute left-1/2 top-[0.5rem] w-[280px] origin-top"
          style={{ transform: "translateX(-50%) perspective(900px) rotateZ(1.2deg) rotateY(-7deg) scale(0.54)" }}
        >
          <CardPreview card={mainCard} compact />
        </div>
      </div>
      <Image
        src="/hand-phone-hero.png"
        alt="Hand holding a phone previewing the DigiCard blueprint demo"
        fill
        sizes="(max-width: 768px) 90vw, 560px"
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
        <div className="relative z-[3] w-[560px] max-w-full">
          <PhoneFramedBlueprint />
        </div>

        {/* Ground shadow under main card */}
        <div
          className="absolute h-8 rounded-full bg-[rgba(17,26,60,0.2)] blur-2xl"
          style={{ bottom: "50px", left: "88px", right: "88px" }}
        />

        {/* QR badge — in the paddingBottom space, below the card, tilts with scene */}
        <div
          className="absolute z-[10] hidden rounded-2xl border border-white/10 bg-[rgba(8,12,26,0.86)] px-4 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl lg:block"
          style={{ bottom: "0px", left: "50%", transform: "translateX(-50%)" }}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(82,103,217,0.22)]">
              <QrCode className="h-4 w-4 text-[#7c9aff]" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-white/90">Scan to connect</p>
              <div className="mt-0.5 flex items-center gap-1.5">
                <ScanLine className="h-3 w-3 text-[#7c9aff]" />
                <p className="text-[10px] text-white/45">Opens your profile instantly</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
