"use client";

import { useState } from "react";
import { ArrowUpRight, GraduationCap, QrCode, ScanLine, Sparkles, UserRound } from "lucide-react";

export function SplineHero() {
  const [tilt, setTilt] = useState({ rotateX: 7, rotateY: -11 });

  return (
    <div className="relative rounded-[2rem] border border-[rgba(25,35,61,0.08)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(245,248,255,0.98))] p-3 shadow-[0_24px_60px_rgba(18,31,66,0.1)] lg:p-4">
      <div className="relative overflow-hidden rounded-[1.65rem] border border-[rgba(25,35,61,0.08)] bg-[radial-gradient(circle_at_top_left,_rgba(82,103,217,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(255,141,87,0.14),_transparent_24%),linear-gradient(180deg,_#f8faff_0%,_#edf2ff_100%)] px-6 py-8 sm:px-8 sm:py-10">
        <div className="pointer-events-none absolute left-8 top-8 h-24 w-24 rounded-full bg-[rgba(82,103,217,0.14)] blur-3xl" />
        <div className="pointer-events-none absolute bottom-8 right-8 h-28 w-28 rounded-full bg-[rgba(255,141,87,0.16)] blur-3xl" />

        <div className="relative flex min-h-[560px] items-center justify-center [perspective:1600px]">
          <div className="pointer-events-none absolute left-4 top-8 hidden rounded-full border border-[rgba(25,35,61,0.08)] bg-white/88 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand)] shadow-[0_12px_25px_rgba(18,31,66,0.06)] sm:block">
            Interactive card preview
          </div>

          <div className="pointer-events-none absolute right-4 top-24 hidden max-w-[10rem] rounded-[1.3rem] border border-[rgba(25,35,61,0.08)] bg-white/88 px-4 py-3 text-sm leading-6 text-[var(--muted)] shadow-[0_14px_32px_rgba(18,31,66,0.08)] lg:block">
            <p className="font-semibold text-[var(--ink)]">Move your cursor</p>
            <p className="mt-1">The phone tilts like a real product demo while the profile stays locked in place.</p>
          </div>

          <div className="pointer-events-none absolute bottom-10 left-5 hidden items-center gap-3 rounded-[1.4rem] border border-[rgba(25,35,61,0.08)] bg-white/92 px-4 py-3 shadow-[0_16px_32px_rgba(18,31,66,0.08)] md:flex">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(82,103,217,0.12)] text-[var(--brand)]">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--ink)]">Ready for real events</p>
              <p className="text-xs text-[var(--muted)]">Career fairs, club nights, alumni mixers</p>
            </div>
          </div>

          <div
            className="relative transition-transform duration-200 ease-out"
            style={{
              transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
              transformStyle: "preserve-3d",
            }}
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
              const offsetY = (event.clientY - rect.top) / rect.height - 0.5;

              setTilt({
                rotateX: -offsetY * 16,
                rotateY: offsetX * 18,
              });
            }}
            onMouseLeave={() => setTilt({ rotateX: 7, rotateY: -11 })}
          >
            <div
              className="absolute left-1/2 top-8 h-[78%] w-[82%] -translate-x-1/2 rounded-[3.2rem] bg-[radial-gradient(circle_at_center,_rgba(44,64,126,0.22),_rgba(44,64,126,0.04)_58%,_transparent_72%)] blur-2xl"
              style={{ transform: "translateZ(-80px)" }}
            />

            <div
              className="absolute left-1/2 top-[94%] h-10 w-[68%] -translate-x-1/2 rounded-full bg-[rgba(25,35,61,0.18)] blur-2xl"
              style={{ transform: "translateZ(-90px)" }}
            />

            <div className="relative w-[295px] rounded-[3.2rem] border-[10px] border-[#0a0d16] bg-[#0a0d16] p-[8px] shadow-[0_38px_80px_rgba(10,13,22,0.26)] sm:w-[330px]">
              <div className="absolute left-1/2 top-[11px] z-30 h-6 w-28 -translate-x-1/2 rounded-full bg-[#05070c]" />

              <div className="overflow-hidden rounded-[2.45rem] bg-[linear-gradient(180deg,_#f8faff_0%,_#eef3ff_100%)]">
                <div className="border-b border-[rgba(25,35,61,0.06)] px-5 pb-4 pt-6">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(82,103,217,0.12)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--brand)]">
                      <UserRound className="h-3.5 w-3.5" />
                      Student profile
                    </div>
                    <ScanLine className="h-4 w-4 text-[var(--brand)]" />
                  </div>

                  <div className="mt-5 rounded-[1.7rem] bg-[linear-gradient(165deg,_#172340_0%,_#2d4177_44%,_#5267d9_100%)] p-5 text-white shadow-[0_20px_40px_rgba(49,69,127,0.18)]">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/14">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-[1.65rem] font-semibold tracking-[-0.05em]">Maya Carter</h3>
                    <p className="mt-1 text-sm text-white/78">Computer Science Student</p>
                    <p className="mt-1 text-sm text-white/70">University of Maryland</p>
                    <p className="mt-5 text-[13px] leading-6 text-white/84">
                      Looking for software engineering internships and student networking opportunities.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 px-5 py-4">
                  <div className="rounded-[1.35rem] bg-white px-4 py-3 shadow-[0_10px_24px_rgba(21,32,58,0.05)]">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Email</p>
                    <p className="mt-2 text-sm font-medium text-[var(--ink)]">maya.carter@umd-example.edu</p>
                  </div>

                  <div className="grid grid-cols-[1.12fr_0.88fr] gap-3">
                    <div className="rounded-[1.35rem] bg-white px-4 py-3 shadow-[0_10px_24px_rgba(21,32,58,0.05)]">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">LinkedIn</p>
                      <p className="mt-2 text-sm font-medium text-[var(--ink)]">linkedin.com/in/mayacarter</p>
                    </div>
                    <div className="rounded-[1.35rem] bg-white px-4 py-3 shadow-[0_10px_24px_rgba(21,32,58,0.05)]">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Focus</p>
                      <p className="mt-2 text-sm font-medium text-[var(--ink)]">Software Eng.</p>
                    </div>
                  </div>

                  <div className="rounded-[1.35rem] bg-white px-4 py-3 shadow-[0_10px_24px_rgba(21,32,58,0.05)]">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Portfolio</p>
                        <p className="mt-2 text-sm font-medium text-[var(--ink)]">maya.dev</p>
                      </div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(82,103,217,0.12)] text-[var(--brand)]">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[1.55rem] border border-[rgba(82,103,217,0.18)] bg-[linear-gradient(180deg,_rgba(82,103,217,0.08),_rgba(82,103,217,0.16))] px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-white p-2.5 shadow-[0_10px_24px_rgba(21,32,58,0.06)]">
                        <QrCode className="h-9 w-9 text-[#172340]" />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Quick share</p>
                        <p className="mt-1 text-sm font-medium leading-6 text-[var(--ink)]">
                          Scan to open Maya&apos;s profile instantly.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
