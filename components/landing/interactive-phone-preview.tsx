"use client";

import { useEffect, useState } from "react";
import { QRCode } from "@/components/ui/qr-code";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Link2,
  Mail,
  MoveRight,
  QrCode,
  ScanLine,
  Share2,
  Sparkles,
  UserRound,
} from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "links", label: "Links", icon: Link2 },
  { id: "share", label: "Share", icon: Share2 },
] as const;

type TabId = (typeof tabs)[number]["id"];

const quickFacts = [
  { label: "Focus", value: "Software Engineering" },
  { label: "Email", value: "maya.carter@umd-example.edu" },
];

const linkCards = [
  {
    label: "LinkedIn",
    value: "linkedin.com/in/mayacarter",
    description: "A polished public profile for recruiters and mentors.",
    icon: Link2,
  },
  {
    label: "Portfolio",
    value: "mayacarter.dev",
    description: "Selected projects, class work, and technical writeups.",
    icon: BriefcaseBusiness,
  },
] as const;

export function InteractivePhonePreview() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  useEffect(() => {
    const order: TabId[] = ["profile", "links", "share"];
    const interval = window.setInterval(() => {
      setActiveTab((current) => order[(order.indexOf(current) + 1) % order.length]);
    }, 3600);

    return () => window.clearInterval(interval);
  }, []);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 12;
    const rotateX = (0.5 - y) * 10;

    setTilt({ rotateX, rotateY });
  }

  function resetTilt() {
    setTilt({ rotateX: 0, rotateY: 0 });
  }

  return (
    <div className="relative mx-auto w-full max-w-[470px]">
      <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-[rgba(255,141,87,0.22)] blur-3xl" />
      <div className="absolute -right-10 bottom-12 h-40 w-40 rounded-full bg-[rgba(82,103,217,0.22)] blur-3xl" />

      <div className="absolute -top-5 right-6 hidden rounded-full border border-white/70 bg-white/92 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand)] shadow-[0_18px_36px_rgba(22,32,58,0.12)] backdrop-blur lg:inline-flex">
        Interactive preview
      </div>

      <div
        className="relative rounded-[2.6rem] border border-[rgba(255,255,255,0.72)] bg-[linear-gradient(180deg,_rgba(246,249,255,0.96),_rgba(231,238,255,0.94))] p-3 shadow-[0_36px_100px_rgba(17,24,39,0.16)] transition-transform duration-200 ease-out"
        style={{
          transform: `perspective(1400px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        }}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
      >
        <div className="rounded-[2.2rem] border border-[rgba(25,35,61,0.08)] bg-[#f4f7ff] p-3">
          <div className="relative overflow-hidden rounded-[2rem] border border-[rgba(25,35,61,0.08)] bg-[linear-gradient(180deg,_#172340_0%,_#243967_48%,_#556be2_100%)] p-4 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.14),_transparent_26%),radial-gradient(circle_at_bottom_left,_rgba(255,141,87,0.18),_transparent_28%)]" />

            <div className="relative z-10">
              <div className="mx-auto mb-4 h-1.5 w-24 rounded-full bg-white/20" />

              <div className="mb-4 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/76">
                  <Sparkles className="h-3.5 w-3.5" />
                  Maya&apos;s card
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[11px] font-semibold text-white/72">
                  <ScanLine className="h-3.5 w-3.5" />
                  Live demo
                </div>
              </div>

              <div className="rounded-[1.7rem] bg-white/[0.08] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12">
                    <UserRound className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-[1.7rem] font-semibold tracking-[-0.05em]">Maya Carter</h3>
                    <p className="mt-1 text-sm text-white/76">Computer Science Student</p>
                    <p className="text-sm text-white/62">University of Maryland</p>
                  </div>
                </div>

                <p className="mt-4 max-w-[16rem] text-[0.93rem] leading-6 text-white/76">
                  A quick profile built for career fairs, QR sharing, and clean first impressions.
                </p>

                <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
                  {tabs.map(({ id, icon: Icon, label }) => {
                    const active = activeTab === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setActiveTab(id)}
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition ${
                          active
                            ? "border-white/40 bg-white text-[#1a2850] shadow-[0_12px_24px_rgba(255,255,255,0.16)]"
                            : "border-white/12 bg-white/8 text-white/76 hover:bg-white/14"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 min-h-[290px] rounded-[1.7rem] bg-white p-4 text-[var(--ink)] shadow-[0_24px_40px_rgba(17,24,39,0.14)] transition duration-300">
                {activeTab === "profile" ? (
                  <div className="animate-[fadeIn_280ms_ease]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                      Live profile preview
                    </p>
                    <h4 className="mt-2 text-[1.55rem] font-semibold leading-[1.02] tracking-[-0.05em]">
                      Everything someone needs after a quick conversation
                    </h4>
                    <p className="mt-3 max-w-[18rem] text-sm leading-6 text-[var(--muted)]">
                      Open one polished profile with your intro, contact details, and professional links already organized.
                    </p>

                    <div className="mt-5 grid gap-2.5">
                      {quickFacts.map((item) => (
                        <div
                          key={item.label}
                          className="rounded-2xl bg-[var(--soft)] px-4 py-3.5"
                        >
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                            {item.label}
                          </p>
                          <p className="mt-1.5 text-[0.88rem] font-medium leading-6 text-[var(--ink)]">
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {activeTab === "links" ? (
                  <div className="animate-[fadeIn_280ms_ease]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                      Quick access links
                    </p>
                    <h4 className="mt-2 text-[1.4rem] font-semibold leading-[1.04] tracking-[-0.05em]">
                      Keep the most useful follow-up actions one tap away
                    </h4>

                    <div className="mt-5 grid gap-3">
                      {linkCards.map((item) => {
                        const Icon = item.icon;
                        return (
                          <div
                            key={item.label}
                            className="rounded-[1.35rem] border border-[rgba(25,35,61,0.08)] px-4 py-4"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                                  {item.label}
                                </p>
                                <p className="mt-1.5 truncate pr-3 text-[0.92rem] font-medium text-[var(--ink)]">
                                  {item.value}
                                </p>
                                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                                  {item.description}
                                </p>
                              </div>
                              <div className="rounded-2xl bg-[var(--soft)] p-2 text-[var(--brand)]">
                                <Icon className="h-4 w-4" />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                {activeTab === "share" ? (
                  <div className="animate-[fadeIn_280ms_ease]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                      Ready to share
                    </p>
                    <h4 className="mt-2 text-[1.45rem] font-semibold leading-[1.04] tracking-[-0.05em]">
                      Scan once, open everything, and keep the moment moving
                    </h4>

                    <div className="mt-5 grid gap-4 sm:grid-cols-[128px_1fr]">
                      <div className="rounded-[1.35rem] bg-[var(--soft)] p-3">
                        <div className="flex items-center justify-center rounded-[1rem] bg-white p-2.5 shadow-[0_12px_24px_rgba(17,24,39,0.08)]">
                          <QRCode value="https://digicard.app/maya-carter-demo" size={78} fgColor="#172340" />
                        </div>
                      </div>

                      <div className="rounded-[1.35rem] border border-[rgba(25,35,61,0.08)] px-4 py-4">
                        <div className="flex items-center gap-2 text-[var(--brand)]">
                          <CheckCircle2 className="h-4 w-4" />
                          <p className="text-sm font-semibold">Profile ready</p>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                          Show the code on your phone, let someone scan, and take them straight to your digital card.
                        </p>
                        <button
                          type="button"
                          className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white shadow-[0_14px_26px_rgba(82,103,217,0.18)] transition hover:translate-x-0.5 hover:bg-[#4459cb]"
                        >
                          Preview share flow
                          <MoveRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
