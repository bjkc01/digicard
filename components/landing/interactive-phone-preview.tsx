import { BadgeCheck, Link2, QrCode, Sparkles } from "lucide-react";
import { CardPreview } from "@/components/cards/card-preview";
import type { DigiCard } from "@/lib/data";
import { Phone3DTilt } from "./phone-3d-tilt";

const heroPreviewCard: DigiCard = {
  color: "from-blue-700 via-cyan-500 to-emerald-400",
  company: "University of Maryland",
  email: "maya.carter@umd-example.edu",
  id: 101,
  linkedin: "linkedin.com/in/mayacarter",
  name: "Maya Carter",
  phone: "+1 (555) 210-0284",
  template: "Blueprint",
  title: "Computer Science Student",
  website: "maya.dev",
};

const statusPills = [
  {
    copy: "Recruiter-ready intro",
    icon: BadgeCheck,
  },
  {
    copy: "One-scan profile share",
    icon: QrCode,
  },
  {
    copy: "Resume and portfolio linked",
    icon: Link2,
  },
] as const;

export function InteractivePhonePreview() {
  return (
    <div className="relative mx-auto max-w-[34rem] px-4">

      {/* Floating badge — original light style */}
      <div className="absolute -left-3 top-14 z-10 hidden rounded-full border border-white/70 bg-white/88 px-4 py-2 text-sm font-semibold text-[var(--ink)] shadow-[0_18px_36px_rgba(21,32,58,0.12)] backdrop-blur md:inline-flex">
        <Sparkles className="mr-2 h-4 w-4 text-[var(--brand)]" />
        Built for in-person networking
      </div>

      {/* Floating "Why it clicks" card — original light style */}
      <div className="absolute -right-2 bottom-14 z-10 hidden rounded-[1.35rem] border border-[rgba(25,35,61,0.08)] bg-white/92 p-4 shadow-[0_18px_36px_rgba(21,32,58,0.12)] backdrop-blur md:block">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
          Why it clicks
        </p>
        <div className="mt-3 space-y-2.5">
          {statusPills.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.copy} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-2xl bg-[rgba(82,103,217,0.12)] text-[var(--brand)]">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="max-w-[11rem] text-sm leading-6 text-[var(--ink)]">{item.copy}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3D tilt wraps only the phone — floating panels stay flat */}
      <Phone3DTilt className="relative" maxRotation={10}>
        {/* Soft ground shadow / depth layer */}
        <div className="absolute -bottom-6 left-1/2 h-16 w-4/5 -translate-x-1/2 rounded-full bg-[rgba(17,26,46,0.18)] blur-2xl" />

        {/* Blue glow behind the phone */}
        <div className="absolute inset-x-6 -bottom-4 -top-2 -z-10 rounded-[2.8rem] bg-[rgba(82,103,217,0.14)] blur-3xl" />

        {/* Phone shell */}
        <div className="relative rounded-[2.8rem] border border-[rgba(18,28,51,0.14)] bg-[linear-gradient(170deg,_rgba(28,40,70,0.98),_rgba(9,13,24,1))] p-3 shadow-[0_40px_80px_rgba(17,26,46,0.28),_0_16px_40px_rgba(82,103,217,0.18),_inset_0_1px_0_rgba(255,255,255,0.07)]">
          {/* Top highlight line */}
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)]" />

          {/* Notch */}
          <div className="absolute left-1/2 top-3 h-6 w-32 -translate-x-1/2 rounded-full bg-black/60 ring-1 ring-white/6" />

          {/* Side buttons */}
          <div className="absolute left-[-2px] top-32 h-20 w-1 rounded-r-full bg-white/14" />
          <div className="absolute right-[-2px] top-24 h-16 w-1 rounded-l-full bg-white/14" />
          <div className="absolute right-[-2px] top-44 h-24 w-1 rounded-l-full bg-white/14" />

          <div className="overflow-hidden rounded-[2.2rem] border border-white/6 bg-[linear-gradient(180deg,_rgba(24,35,64,0.92),_rgba(9,13,24,0.98))] px-2 pb-2 pt-10">
            <div className="rounded-[1.8rem] border border-white/5 bg-[radial-gradient(circle_at_top,_rgba(82,103,217,0.18),_transparent_40%),linear-gradient(180deg,_rgba(255,255,255,0.04),_rgba(255,255,255,0.02))] p-2">
              <CardPreview card={heroPreviewCard} compact />
            </div>
          </div>
        </div>
      </Phone3DTilt>
    </div>
  );
}
