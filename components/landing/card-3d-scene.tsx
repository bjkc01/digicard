"use client";

import { useRef } from "react";
import Image from "next/image";
import { AtSign, Globe, Mail, Phone, Sparkles } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

// rotateY positive → right side leans toward viewer
// main card is the rightmost element → it's the closest ✓
const RESTING = "perspective(1100px) rotateX(4deg) rotateY(10deg)";

const heroContactRows = [
  { icon: Mail, value: "j.lin.student@example.edu" },
  { icon: Phone, value: "+1 (555) 019-3847" },
  { icon: AtSign, value: "linkedin.com/in/jordan-lin-cs" },
  { icon: Globe, value: "jordanlin.dev/portfolio" },
] as const;

function JordanLinPhoneCard() {
  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden rounded-[2.95rem] border border-white/10 bg-[linear-gradient(180deg,#101525_0%,#090d18_100%)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]"
      style={{ WebkitFontSmoothing: "antialiased", textRendering: "geometricPrecision" }}
    >
      <div className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,#2563eb,#22d3ee,#10b981)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(82,103,217,0.2),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]" />

      <div className="relative flex h-full flex-col px-[0.82rem] pb-[0.72rem] pt-[0.8rem]">
        <div className="flex h-7 w-7 items-center justify-center rounded-[0.95rem] border border-white/10 bg-white/[0.08] text-[0.72rem] font-semibold text-white">
          JL
        </div>

        <div className="mt-3.5">
          <p className="text-[1.5rem] font-semibold leading-[0.95] tracking-[-0.055em] text-white">
            Jordan Lin
          </p>
          <p className="mt-1.5 text-[0.58rem] font-medium leading-[1.2] text-slate-300">
            Undergrad Student, Computer Science
          </p>
          <p className="mt-1 text-[0.56rem] leading-none text-slate-500">State University</p>
        </div>

        <div className="mt-3.5 flex flex-col">
          {heroContactRows.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.value}
                className={`flex items-center gap-2 py-[0.38rem] ${
                  index > 0 ? "border-t border-white/[0.07]" : ""
                }`}
              >
                <Icon className="h-3 w-3 shrink-0 text-slate-500" />
                <p className="truncate text-[0.56rem] font-medium leading-none text-slate-300">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-auto flex justify-center pt-3">
          <div className="rounded-[1rem] bg-white p-2 shadow-[0_16px_36px_rgba(0,0,0,0.32)]">
            <QRCodeSVG
              value="https://digicard.example/jordan-lin"
              size={62}
              bgColor="#ffffff"
              fgColor="#0f172a"
            />
          </div>
        </div>

        <div className="mt-3 flex items-center justify-center gap-1.5">
          <span className="text-[0.39rem] font-medium uppercase tracking-[0.24em] text-slate-600">
            Scan to connect
          </span>
          <span className="text-[0.39rem] text-slate-700">•</span>
          <span className="text-[0.44rem] font-bold uppercase tracking-[0.24em] text-slate-400">
            DigiCard
          </span>
        </div>
      </div>
    </div>
  );
}

function PhoneFramedBlueprint() {
  return (
    <div className="relative aspect-[1920/1440] w-[620px] max-w-full">
      <div className="pointer-events-none absolute inset-0 rounded-[3rem] bg-[radial-gradient(circle_at_52%_24%,rgba(82,103,217,0.2),transparent_22%),radial-gradient(circle_at_48%_58%,rgba(56,189,248,0.12),transparent_26%),radial-gradient(circle_at_38%_75%,rgba(255,255,255,0.62),transparent_28%)] blur-[2px]" />
      <div className="absolute left-[36.05%] top-[6.85%] h-[70.25%] w-[25.95%] overflow-hidden rounded-[3.05rem] bg-black shadow-[0_24px_40px_rgba(15,23,42,0.2)]">
        <div className="absolute inset-[0.12rem] overflow-hidden rounded-[2.92rem]">
          <JordanLinPhoneCard />
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
