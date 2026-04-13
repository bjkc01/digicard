"use client";

import { useRef } from "react";
import { QrCode, ScanLine, Sparkles } from "lucide-react";
import { CardPreview } from "@/components/cards/card-preview";
import type { DigiCard } from "@/lib/data";

// rotateY positive → right side leans toward viewer
// main card is the rightmost element → it's the closest ✓
const RESTING = "perspective(1100px) rotateX(5deg) rotateY(16deg)";

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

const ghost1: DigiCard = {
  color: "from-violet-600 via-purple-500 to-pink-400",
  company: "Cornell University",
  email: "alex.kim@cornell.edu",
  id: 102,
  linkedin: "linkedin.com/in/alexkim",
  name: "Alex Kim",
  phone: "",
  template: "Horizon",
  title: "Product Design Intern",
  website: "alexkim.io",
};

const ghost2: DigiCard = {
  color: "from-amber-500 via-orange-400 to-rose-400",
  company: "NYU Stern",
  email: "j.patel@nyu.edu",
  id: 103,
  linkedin: "linkedin.com/in/jaypatel",
  name: "Jay Patel",
  phone: "",
  template: "Ember",
  title: "Finance & Strategy",
  website: "",
};

// Ghost cards peek 80px each from behind the main card on the left.
// paddingLeft = 80 * 2 = 160px creates the space for them to be visible.
const PEEK = 80;
const PAD_LEFT = PEEK * 2; // 160px

function PhoneFramedBlueprint() {
  return (
    <div className="relative aspect-[380/790] w-[338px]">
      <div className="absolute inset-0 rounded-[3.9rem] bg-[linear-gradient(180deg,#f8fbff_0%,#d7dee9_48%,#b9c3d2_100%)] shadow-[0_38px_90px_rgba(15,23,42,0.24),inset_0_2px_2px_rgba(255,255,255,0.95),inset_0_-4px_10px_rgba(71,85,105,0.28)]" />
      <div className="absolute inset-y-[12%] left-[1.4%] w-[1.4%] rounded-full bg-[linear-gradient(180deg,rgba(148,163,184,0.95),rgba(226,232,240,0.45))]" />
      <div className="absolute inset-y-[18%] left-[2.6%] h-[11%] w-[1.1%] rounded-full bg-[linear-gradient(180deg,rgba(148,163,184,0.95),rgba(226,232,240,0.5))]" />
      <div className="absolute inset-y-[28%] left-[2.6%] h-[15%] w-[1.1%] rounded-full bg-[linear-gradient(180deg,rgba(148,163,184,0.95),rgba(226,232,240,0.5))]" />

      <div className="absolute inset-[1.8%] rounded-[3.5rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.75),rgba(255,255,255,0.18))] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]" />

      <div className="absolute inset-[2.7%_5.8%_2.7%_5.8%] overflow-hidden rounded-[3rem] border border-[rgba(15,23,42,0.5)] bg-[linear-gradient(180deg,rgba(5,8,18,0.98),rgba(4,6,14,1))] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(82,103,217,0.22),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))]" />
        <div
          className="absolute left-1/2 top-[3.15rem] w-[31rem] origin-top"
          style={{ transform: "translateX(-50%) scale(0.64)" }}
        >
          <CardPreview card={mainCard} compact />
        </div>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-[4%] h-6 w-24 -translate-x-1/2 rounded-full bg-black shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" />
      <div className="pointer-events-none absolute left-1/2 top-[4.7%] h-1.5 w-10 -translate-x-1/2 rounded-full bg-white/10" />

      <div className="pointer-events-none absolute inset-0 rounded-[3.8rem] bg-[radial-gradient(circle_at_14%_10%,rgba(255,255,255,0.7),transparent_14%),radial-gradient(circle_at_84%_18%,rgba(255,255,255,0.22),transparent_18%),linear-gradient(105deg,transparent_18%,rgba(255,255,255,0.2)_35%,transparent_48%)] opacity-80" />
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
    el.style.transform = `perspective(1100px) rotateX(${5 + y * -14}deg) rotateY(${16 + x * 16}deg)`;
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
          paddingLeft: `${PAD_LEFT}px`,
          paddingBottom: "72px",
        }}
        className="relative"
      >
        {/* Ghost 2 — furthest back (amber/orange Ember card) */}
        <div
          className="pointer-events-none absolute top-[14px] z-[1] w-[276px] opacity-[0.38]"
          style={{ left: 0 }}
        >
          <CardPreview card={ghost2} compact />
        </div>

        {/* Ghost 1 — middle depth (purple Horizon card) */}
        <div
          className="pointer-events-none absolute top-[7px] z-[2] w-[276px] opacity-[0.62]"
          style={{ left: `${PEEK}px` }}
        >
          <CardPreview card={ghost1} compact />
        </div>

        {/* Main card — front (Blueprint card inside phone casing) */}
        <div className="relative z-[3] w-[328px]">
          <PhoneFramedBlueprint />
        </div>

        {/* Ground shadow under main card */}
        <div
          className="absolute h-8 rounded-full bg-[rgba(17,26,60,0.2)] blur-2xl"
          style={{ bottom: "52px", left: `${PAD_LEFT + 26}px`, right: "18px" }}
        />

        {/* QR badge — in the paddingBottom space, below the card, tilts with scene */}
        <div
          className="absolute z-[10] hidden rounded-2xl border border-white/10 bg-[rgba(8,12,26,0.86)] px-4 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl lg:block"
          style={{ bottom: "8px", left: `${PAD_LEFT + 58}px` }}
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
