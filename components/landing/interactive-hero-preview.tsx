"use client";

import { useState } from "react";
import { ArrowUpRight, AtSign, Globe2, Mail } from "lucide-react";
import QRCode from "react-qr-code";
import { siteConfig } from "@/lib/site-config";

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function InteractiveHeroPreview() {
  const [name, setName] = useState("");
  const displayName = name.trim() || "Jordan Lin";
  const firstName = displayName.split(/\s+/)[0] || "Jordan";
  const initials = displayName.split(/\s+/).slice(0, 2).map(part => part[0]?.toUpperCase()).join("");
  const handle = slugify(displayName) || "jordan-lin";

  return (
    <div id="live-preview" className="relative z-10 mx-auto w-full max-w-[580px]">
      <div className="mb-6 flex items-center justify-between gap-4">
        <span className="landing-kicker text-[#697268]">THE CARD / A PREVIEW</span>
        <span className="flex items-center gap-2 text-xs font-semibold text-[#697268]"><span className="h-2 w-2 rounded-full bg-[#bd6348]" /> INTERACTIVE</span>
      </div>
      <div className="relative px-0 pb-5 pt-3 sm:px-5 sm:pb-7">
        <div aria-hidden="true" className="absolute bottom-0 left-[7%] right-0 top-[10%] rotate-[5deg] rounded-[2rem] border border-[#c9c7b9] bg-[#d8d6c8] sm:left-[10%]" />
        <div className="relative flex min-h-[490px] flex-col overflow-hidden rounded-[1.7rem] border border-[#365247] bg-[#253a32] p-6 text-[#f7f4e9] shadow-[0_28px_70px_rgba(36,51,42,0.24)] sm:min-h-[520px] sm:rounded-[2rem] sm:p-9">
          <div className="flex items-start justify-between gap-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#e1b9a8]">DIGICARD / 001</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#779083] text-sm font-semibold text-white">{initials}</div>
          </div>
          <div className="mt-12 sm:mt-14">
            <p className="text-xs uppercase tracking-[0.2em] text-[#b8c8bb]">Nice to meet you, I’m</p>
            <p className="landing-display mt-3 break-words text-[clamp(2.6rem,7vw,4.6rem)] leading-[0.97] tracking-[-0.055em] text-[#f7f4e9]">{displayName}</p>
            <p className="mt-4 text-sm text-[#c5d0c5]">Computer science student <span className="mx-1 text-[#e1b9a8]">·</span> State University</p>
          </div>
          <div className="mt-9 grid gap-2 border-t border-[#607567] pt-5 text-xs text-[#d9e1d7] sm:grid-cols-2 sm:gap-y-4">
            <span className="flex min-w-0 items-center gap-2"><Mail className="h-4 w-4 shrink-0 text-[#e1b9a8]" /> {firstName.toLowerCase()}@example.edu</span>
            <span className="flex min-w-0 items-center gap-2"><AtSign className="h-4 w-4 shrink-0 text-[#e1b9a8]" /> /in/{handle}</span>
            <span className="flex min-w-0 items-center gap-2 sm:col-span-2"><Globe2 className="h-4 w-4 shrink-0 text-[#e1b9a8]" /> yoursite.example</span>
          </div>
          <div className="mt-auto flex items-end justify-between gap-4 pt-8">
            <div>
              <span className="landing-kicker text-[#e1b9a8]">MAKE IT MEMORABLE</span>
              <p className="mt-2 max-w-[165px] text-xs leading-5 text-[#b8c8bb]">A sample card. Your real QR destination is yours to choose.</p>
            </div>
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-[#f7f4e9] p-2.5 sm:h-28 sm:w-28">
              <QRCode value={siteConfig.url} size={90} bgColor="transparent" fgColor="#253a32" style={{ width: "100%", height: "100%" }} aria-label="Sample QR code for the DigiCard website" />
            </div>
          </div>
          <div className="pointer-events-none absolute -right-16 top-1/4 h-52 w-52 rounded-full border border-[#c7d2bc]/15 sm:h-64 sm:w-64" aria-hidden="true" />
        </div>
      </div>
      <label htmlFor="preview-name" className="mt-4 block text-xs font-semibold uppercase tracking-[0.18em] text-[#536256]">Try your name in the card <ArrowUpRight className="inline h-3.5 w-3.5" /></label>
      <input id="preview-name" type="text" value={name} maxLength={46} onChange={(event) => setName(event.target.value)} placeholder="Type your name" autoComplete="off" className="mt-2 min-h-12 w-full rounded-xl border border-[#c6c9bc] bg-[#f8f7f1] px-4 text-sm text-[#253a32] placeholder:text-[#7d8378] focus:border-[#253a32] focus:outline-none focus:ring-2 focus:ring-[#253a32]/15" />
      <p className="mt-2 text-xs text-[#697268]">Preview only · Scanning the sample QR opens DigiCard.</p>
    </div>
  );
}
