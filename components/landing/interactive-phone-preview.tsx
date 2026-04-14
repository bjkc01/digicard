"use client";

import { useRef } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { CardPreview } from "@/components/cards/card-preview";
import type { DigiCard } from "@/lib/data";

const RESTING_TRANSFORM = "perspective(1150px) rotateX(4deg) rotateY(10deg)";

const heroPreviewCard: DigiCard = {
  color: "from-blue-700 via-cyan-500 to-emerald-400",
  company: "State University",
  email: "j.lin.student@example.edu",
  id: 101,
  linkedin: "linkedin.com/in/jordan-lin-cs",
  name: "Jordan Lin",
  phone: "+1 (555) 019-3847",
  template: "Blueprint",
  title: "Undergrad Student, Computer Science",
  website: "jordanlin.dev/portfolio",
};

export function InteractivePhonePreview() {
  const sceneRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const scene = sceneRef.current;
    if (!scene) return;

    const rect = scene.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    scene.style.transform = `perspective(1150px) rotateX(${4 + y * -9}deg) rotateY(${10 + x * 11}deg)`;
  }

  function handleMouseLeave() {
    const scene = sceneRef.current;
    if (!scene) return;

    scene.style.transform = RESTING_TRANSFORM;
  }

  return (
    <div className="relative mx-auto flex max-w-[40rem] justify-center py-10">
      {/* Floating badge — original light style */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[5%] top-[10%] h-72 w-72 rounded-full bg-[rgba(82,103,217,0.2)] blur-[95px]" />
        <div className="absolute right-[6%] top-[36%] h-64 w-64 rounded-full bg-[rgba(56,189,248,0.15)] blur-[85px]" />
        <div className="absolute bottom-[2%] left-[30%] h-52 w-52 rounded-full bg-[rgba(255,255,255,0.8)] blur-[60px]" />
      </div>

      {/* Floating "Why it clicks" card — original light style */}
      <div className="absolute right-0 top-0 z-20 hidden items-center gap-2 rounded-full border border-[rgba(82,103,217,0.15)] bg-white/90 px-4 py-2 text-sm font-semibold text-[var(--ink)] shadow-[0_10px_28px_rgba(21,32,58,0.1)] backdrop-blur lg:inline-flex">
        <Sparkles className="h-4 w-4 text-[var(--brand)]" />
        Your card. One scan.
      </div>

      <div
        ref={sceneRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-[620px]"
        style={{
          transform: RESTING_TRANSFORM,
          transition: "transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)",
          willChange: "transform",
        }}
      >
        <div className="relative aspect-[1920/1440] w-full">
          <div className="pointer-events-none absolute inset-0 rounded-[3rem] bg-[radial-gradient(circle_at_50%_24%,rgba(82,103,217,0.2),transparent_22%),radial-gradient(circle_at_48%_58%,rgba(56,189,248,0.12),transparent_26%),radial-gradient(circle_at_38%_75%,rgba(255,255,255,0.62),transparent_28%)] blur-[2px]" />

          <div className="absolute left-[36.05%] top-[6.85%] h-[70.25%] w-[25.95%] overflow-hidden rounded-[3.05rem] bg-black shadow-[0_24px_40px_rgba(15,23,42,0.2)]">
            <div className="absolute inset-[0.12rem] overflow-hidden rounded-[2.92rem] bg-[linear-gradient(180deg,rgba(11,16,28,0.98),rgba(5,8,16,1))]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(99,102,241,0.25),transparent_34%),radial-gradient(circle_at_20%_72%,rgba(34,211,238,0.16),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]" />
              <div className="absolute inset-[-3%_-7%_-5%_-7%]">
                <CardPreview card={heroPreviewCard} compact phoneHero />
              </div>
            </div>
          </div>

          <Image
            src="/hand-phone-hero.png"
            alt="Hand holding a phone previewing the DigiCard blueprint template"
            fill
            sizes="(max-width: 768px) 90vw, 620px"
            className="pointer-events-none select-none object-contain drop-shadow-[0_34px_80px_rgba(15,23,42,0.24)]"
            priority
          />

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_36%_72%,rgba(255,255,255,0.26),transparent_18%),radial-gradient(circle_at_53%_13%,rgba(255,255,255,0.12),transparent_14%)]" />
        </div>
      </div>
    </div>
  );
}
