"use client";

import Script from "next/script";
import { createElement } from "react";
import { MoveRight, Sparkles } from "lucide-react";

export function SplineHero() {
  return (
    <div className="relative rounded-[2rem] border border-[rgba(25,35,61,0.08)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.92),_rgba(244,247,255,0.94))] p-3 shadow-[0_24px_60px_rgba(18,31,66,0.1)] lg:p-4">
      <Script
        type="module"
        src="https://unpkg.com/@splinetool/viewer@1.12.78/build/spline-viewer.js"
      />

      <div className="relative overflow-hidden rounded-[1.65rem] border border-[rgba(25,35,61,0.08)] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_22%),linear-gradient(180deg,_#040507_0%,_#10131c_100%)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-[linear-gradient(180deg,_rgba(6,8,14,0.88),_transparent)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-[linear-gradient(180deg,_transparent,_rgba(6,8,14,0.92))]" />

        <div className="absolute left-5 top-5 z-20 flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/82 backdrop-blur">
          <Sparkles className="h-3.5 w-3.5" />
          Interactive 3D Preview
        </div>

        <div className="absolute bottom-5 left-5 right-5 z-20 rounded-[1.5rem] border border-white/12 bg-[rgba(10,13,20,0.72)] p-4 text-white shadow-[0_22px_40px_rgba(0,0,0,0.28)] backdrop-blur">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
            Product Demo
          </p>
          <h3 className="mt-2 text-[1.3rem] font-semibold leading-[1.05] tracking-[-0.04em]">
            See how your finished card feels on a real device.
          </h3>
          <p className="mt-2 max-w-[24rem] text-sm leading-6 text-white/72">
            Rotate, inspect, and preview the kind of polished mobile presentation DigiCard is built to create.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
            Built for events, fairs, and fast follow-up
            <MoveRight className="h-4 w-4" />
          </div>
        </div>

        <div className="h-[560px] w-full">
          {createElement("spline-viewer", {
            url: "https://prod.spline.design/ifZ9yctA6O3MvUQ0/scene.splinecode",
            style: { display: "block", height: "100%", width: "100%" },
          })}
        </div>
      </div>
    </div>
  );
}
