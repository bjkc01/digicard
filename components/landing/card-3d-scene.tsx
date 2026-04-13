"use client";

import { useRef } from "react";
import Image from "next/image";
import { AtSign, Globe, Mail, Phone, QrCode, ScanLine, Sparkles } from "lucide-react";
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

const phoneDetails = [
  { icon: Mail, label: "Email", value: "maya.car..." },
  { icon: Phone, label: "Phone", value: "+1 (555)..." },
  { icon: AtSign, label: "LinkedIn", value: "linkedin.c..." },
  { icon: Globe, label: "Website", value: "maya.dev" },
] as const;

function PhoneScreenDemo() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(16,19,31,0.98),rgba(7,10,20,1))] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(82,103,217,0.24),transparent_34%),radial-gradient(circle_at_100%_0%,rgba(34,211,238,0.14),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]" />
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-700 via-cyan-500 to-emerald-400" />
      <div className="relative flex h-full flex-col px-3 pb-3 pt-3">
        <div className="mx-auto inline-flex rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[7px] font-semibold uppercase tracking-[0.22em] text-slate-300">
          Blueprint
        </div>

        <div className="mt-3 flex items-start gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] text-sm font-semibold shadow-[0_10px_24px_rgba(0,0,0,0.22)]">
            MC
          </div>
          <div className="min-w-0">
            <p className="text-[15px] font-semibold leading-[1.05] tracking-[-0.04em] text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">Maya Carter</p>
            <p className="mt-0.5 text-[9px] font-medium leading-4 text-cyan-100/90">Computer Science Student</p>
            <p className="mt-0.5 text-[9px] leading-4 text-slate-300">University of Maryland</p>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          {phoneDetails.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-[16px] border border-white/10 bg-white/[0.05] px-2 py-2 backdrop-blur">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-cyan-100">
                    <Icon className="h-3 w-3" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[7px] font-semibold uppercase tracking-[0.22em] text-slate-500">{item.label}</p>
                    <p className="mt-0.5 truncate text-[10px] font-semibold leading-4 text-slate-100 [text-shadow:0_1px_1px_rgba(0,0,0,0.35)]">{item.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-2.5 grid grid-cols-3 gap-2">
          {[
            { label: "Template", value: "Blueprint" },
            { label: "Links", value: "4" },
            { label: "Status", value: "Ready" },
          ].map((item) => (
            <div key={item.label} className="rounded-[16px] border border-white/10 bg-black/20 px-2 py-2 text-center">
              <p className="text-[12px] font-semibold tracking-[-0.04em] text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.35)]">{item.value}</p>
              <p className="mt-1 text-[7px] font-semibold uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-2.5 border-t border-white/10 pt-2.5">
          <p className="text-[7px] font-semibold uppercase tracking-[0.24em] text-slate-500">Share identity</p>
          <div className="mt-1 flex items-end justify-between gap-3">
            <p className="max-w-[12rem] text-[9px] leading-4 text-slate-300">
              QR opens your website so every scan has a working destination.
            </p>
            <span className="text-[7px] font-semibold uppercase tracking-[0.24em] text-slate-500">DigiCard</span>
          </div>
        </div>

        <div className="mt-auto rounded-[18px] border border-white/10 bg-[rgba(12,17,34,0.88)] px-3 py-2.5 shadow-[0_14px_30px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.05)]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[rgba(82,103,217,0.22)]">
              <QrCode className="h-3.5 w-3.5 text-[#7c9aff]" />
            </div>
            <div>
              <p className="text-[10px] font-semibold leading-4 text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.35)]">Scan to connect</p>
              <div className="mt-0.5 flex items-center gap-1.5">
                <ScanLine className="h-3 w-3 text-[#7c9aff]" />
                <p className="text-[8.5px] leading-3.5 text-white/55">Opens your profile instantly</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneFramedBlueprint() {
  return (
    <div className="relative aspect-[1920/1440] w-[560px] max-w-full">
      <div className="pointer-events-none absolute inset-0 rounded-[3rem] bg-[radial-gradient(circle_at_52%_24%,rgba(82,103,217,0.2),transparent_22%),radial-gradient(circle_at_48%_58%,rgba(56,189,248,0.12),transparent_26%),radial-gradient(circle_at_38%_75%,rgba(255,255,255,0.62),transparent_28%)] blur-[2px]" />
      <div className="absolute left-[35.4%] top-[6.7%] h-[70.4%] w-[28.4%] overflow-hidden rounded-[2.55rem] bg-[linear-gradient(180deg,#0a1020_0%,#060a15_100%)] shadow-[0_24px_40px_rgba(15,23,42,0.2)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(82,103,217,0.18),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]" />
        <div
          className="absolute inset-[0.35rem_0.45rem_0.35rem_0.4rem]"
        >
          <PhoneScreenDemo />
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
      </div>
    </div>
  );
}
