"use client";

import Script from "next/script";
import { createElement } from "react";

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
