"use client";

import Script from "next/script";
import { createElement } from "react";
import { GraduationCap, QrCode, ScanLine, UserRound } from "lucide-react";

export function SplineHero() {
  return (
    <div className="relative rounded-[2rem] border border-[rgba(25,35,61,0.08)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(245,248,255,0.98))] p-3 shadow-[0_24px_60px_rgba(18,31,66,0.1)] lg:p-4">
      <Script
        type="module"
        src="https://unpkg.com/@splinetool/viewer@1.12.78/build/spline-viewer.js"
      />

      <div className="relative overflow-hidden rounded-[1.65rem] border border-[rgba(25,35,61,0.08)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.92),_rgba(239,243,255,0.96))]">
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2),_transparent_32%),linear-gradient(180deg,_rgba(255,255,255,0.1),_transparent_28%,_rgba(255,255,255,0.08))]" />

        <div className="h-[560px] w-full">
          {createElement("spline-viewer", {
            url: "https://prod.spline.design/ifZ9yctA6O3MvUQ0/scene.splinecode",
            style: { display: "block", height: "100%", width: "100%" },
          })}
        </div>

        <div className="pointer-events-none absolute left-[41%] top-[51%] z-20 w-[122px] -translate-x-1/2 -translate-y-1/2 rotate-[-7deg] overflow-hidden rounded-[1.55rem] border border-white/70 bg-[linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(242,245,255,0.98))] shadow-[0_16px_34px_rgba(21,32,58,0.24)] sm:left-[40%] sm:top-[50.5%] sm:w-[134px]">
          <div className="rounded-t-[1.4rem] bg-[linear-gradient(165deg,_#172340_0%,_#2d4177_44%,_#5267d9_100%)] p-2.5 text-white">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.18em] text-white/78">
                <UserRound className="h-2.5 w-2.5" />
                Student profile
              </div>
              <ScanLine className="h-3 w-3 text-white/70" />
            </div>

            <div className="mt-3.5 flex h-7 w-7 items-center justify-center rounded-lg bg-white/14">
              <GraduationCap className="h-3.5 w-3.5 text-white" />
            </div>
            <h3 className="mt-2.5 text-[15px] font-semibold tracking-[-0.04em]">Maya Carter</h3>
            <p className="mt-0.5 text-[10px] text-white/78">Computer Science Student</p>
            <p className="mt-0.5 text-[10px] text-white/68">University of Maryland</p>
            <p className="mt-3 text-[9px] leading-4 text-white/82">
              Looking for software engineering internships and student networking opportunities.
            </p>
          </div>

          <div className="space-y-2 p-2.5">
            <div className="rounded-[0.9rem] bg-[var(--soft)] px-2.5 py-2">
              <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Email</p>
              <p className="mt-1 text-[10px] font-medium leading-4 text-[var(--ink)]">
                maya.carter@umd-example.edu
              </p>
            </div>

            <div className="rounded-[0.9rem] bg-[var(--soft)] px-2.5 py-2">
              <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Focus</p>
              <p className="mt-1 text-[10px] font-medium leading-4 text-[var(--ink)]">
                Software Engineering
              </p>
            </div>

            <div className="rounded-[0.9rem] border border-[rgba(25,35,61,0.08)] bg-white px-2.5 py-2">
              <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Portfolio</p>
              <p className="mt-1 text-[10px] font-medium leading-4 text-[var(--ink)]">maya.dev</p>
            </div>

            <div className="flex items-center gap-2 rounded-[0.9rem] border border-[rgba(82,103,217,0.14)] bg-[linear-gradient(180deg,_rgba(82,103,217,0.08),_rgba(82,103,217,0.16))] px-2.5 py-2">
              <div className="rounded-lg bg-white p-1.5">
                <QrCode className="h-4.5 w-4.5 text-[#172340]" />
              </div>
              <p className="text-[9px] font-medium leading-4 text-[var(--ink)]">
                Scan to open Maya&apos;s profile instantly.
              </p>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-4 right-4 z-20 h-12 w-36 rounded-full bg-[linear-gradient(180deg,_rgba(244,247,255,0.98),_rgba(238,242,255,0.98))] shadow-[0_12px_28px_rgba(18,31,66,0.08)]" />
      </div>
    </div>
  );
}
