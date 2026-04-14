"use client";

import { AtSign, Globe, Mail, Phone } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import type { DigiCard } from "@/lib/data";
import { getCardShareTarget } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type CardPreviewProps = {
  card: DigiCard;
  compact?: boolean;
  imageUrl?: string;
  phoneHero?: boolean;
};

type TP = { card: DigiCard; imageUrl: string | undefined; qrValue: string; compact: boolean };

const contactDefs = [
  { key: "email" as const, label: "Email", icon: Mail },
  { key: "phone" as const, label: "Phone", icon: Phone },
  { key: "linkedin" as const, label: "LinkedIn", icon: AtSign },
  { key: "website" as const, label: "Website", icon: Globe },
];

function inits(name: string) {
  return name.split(" ").slice(0, 2).map((p) => p[0] ?? "").join("");
}

// ── Reusable avatar sub-component ────────────────────────────────────────────
function Av({
  imageUrl, name, size, rounded, bg, ring, textColor,
}: {
  imageUrl: string | undefined; name: string; size: string;
  rounded: string; bg: string; ring?: string; textColor?: string;
}) {
  if (imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={imageUrl} alt={name} className={cn(size, rounded, "object-cover flex-shrink-0", ring)} />
    );
  }
  return (
    <div className={cn(size, rounded, bg, ring, "flex items-center justify-center font-bold flex-shrink-0", textColor ?? "text-white/50")}>
      {inits(name)}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// 1. EXECUTIVE SLATE — corporate formal, rigid structure
// ════════════════════════════════════════════════════════════════════════════════
function ExecutiveSlate({ card, imageUrl, qrValue, compact }: TP) {
  const contacts = contactDefs.filter((c) => Boolean(card[c.key]));
  const p = compact ? "p-4" : "p-7";
  const nameSize = compact ? "text-xl" : "text-[30px]";
  const qrSize = compact ? 36 : 52;

  return (
    <div className={cn("relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-700 shadow-[0_24px_60px_rgba(0,0,0,0.5)]", compact ? "rounded-[22px]" : "rounded-[28px]")}>
      {/* Left accent bar */}
      <div className="absolute left-0 inset-y-0 w-1 bg-white/20" />

      <div className={cn(p, "pl-6 flex h-full flex-col gap-0")}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="h-4 w-4 rounded-sm bg-white/10 border border-white/12 flex items-center justify-center">
            <div className="h-2 w-2 rounded-sm bg-white/35" />
          </div>
          <span className="text-[8px] tracking-[0.26em] uppercase text-white/28 font-medium">DigiCard</span>
        </div>

        {/* Rule + identity */}
        <div className={compact ? "mt-4" : "mt-6"}>
          <div className="h-px w-full bg-white/10 mb-4" />
          <div className="flex items-start gap-3">
            <Av imageUrl={imageUrl} name={card.name}
              size={compact ? "h-9 w-9 text-xs" : "h-12 w-12 text-sm"}
              rounded="rounded-sm" bg="bg-white/8 border border-white/12" />
            <div className="min-w-0">
              <p className={cn(nameSize, "font-black tracking-[-0.03em] text-white leading-none")}>{card.name}</p>
              {card.title && <p className={cn(compact ? "text-[10px]" : "text-sm", "mt-1 text-slate-400 truncate")}>{card.title}</p>}
              {card.company && <p className={cn(compact ? "text-[9px]" : "text-xs", "text-slate-600 truncate")}>{card.company}</p>}
            </div>
          </div>
        </div>

        {/* Contacts — label | value, no icons */}
        {contacts.length > 0 && !compact && (
          <div className="mt-6 flex flex-col">
            {contacts.map((c, i) => (
              <div key={c.key} className={cn("py-2 flex items-baseline gap-3", i > 0 && "border-t border-white/[0.06]")}>
                <span className="text-[8px] tracking-[0.18em] uppercase text-slate-600 w-14 flex-shrink-0">{c.label}</span>
                <span className="text-[11px] text-slate-300 truncate">{card[c.key]}</span>
              </div>
            ))}
          </div>
        )}
        {contacts.length > 0 && compact && (
          <div className="mt-3 flex flex-col gap-0.5">
            {contacts.slice(0, 2).map((c) => (
              <p key={c.key} className="text-[9px] text-slate-500 truncate font-mono">{card[c.key]}</p>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className={cn(compact ? "mt-4" : "mt-auto pt-5", "border-t border-white/[0.06] flex items-center justify-between")}>
          <span className="text-[8px] tracking-[0.18em] uppercase text-slate-700">Scan to connect</span>
          <div className="rounded-[5px] bg-white p-1">
            <QRCodeSVG value={qrValue} size={qrSize} bgColor="#ffffff" fgColor="#0f172a" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// 2. STUDIO IVORY — light editorial, dark text on cream
// ════════════════════════════════════════════════════════════════════════════════
function StudioIvory({ card, imageUrl, qrValue, compact }: TP) {
  const contacts = contactDefs.filter((c) => Boolean(card[c.key]));
  const p = compact ? "p-4" : "p-6";
  const qrSize = compact ? 40 : 60;

  return (
    <div className={cn("relative overflow-hidden bg-stone-50 border border-stone-200 shadow-[0_16px_40px_rgba(0,0,0,0.07)]", compact ? "rounded-[22px]" : "rounded-[28px]")}>
      {/* Left thick editorial stripe */}
      <div className="absolute left-0 inset-y-0 w-3 bg-gradient-to-b from-stone-800 to-stone-500" />

      <div className={cn(p, "pl-8 flex h-full flex-col")}>
        {/* Avatar + brand */}
        <div className="flex items-center justify-between">
          <Av imageUrl={imageUrl} name={card.name}
            size={compact ? "h-10 w-10 text-xs" : "h-14 w-14 text-sm"}
            rounded="rounded-2xl" bg="bg-stone-200 border border-stone-300"
            textColor="text-stone-600" ring={compact ? undefined : "ring-1 ring-stone-200"} />
          <span className="text-[8px] tracking-[0.22em] uppercase text-stone-400">DigiCard</span>
        </div>

        {/* Name */}
        <div className={compact ? "mt-3" : "mt-5"}>
          <p className={cn(compact ? "text-xl" : "text-[34px]", "font-black tracking-[-0.03em] text-stone-900 leading-none")}>{card.name}</p>
          {(card.title || card.company) && (
            <p className={cn(compact ? "text-[10px]" : "text-sm", "mt-1.5 text-stone-500 tracking-[0.02em]")}>
              {[card.title, card.company].filter(Boolean).join(" / ")}
            </p>
          )}
        </div>

        {/* Rule */}
        <div className={cn(compact ? "mt-3" : "mt-5", "h-px bg-stone-200")} />

        {/* Contacts */}
        {contacts.length > 0 && (
          <div className="mt-3 flex flex-col">
            {(compact ? contacts.slice(0, 3) : contacts).map((c, i) => {
              const Icon = c.icon;
              return (
                <div key={c.key} className={cn("flex items-center gap-2.5", compact ? "py-1.5" : "py-2", i > 0 && "border-t border-stone-100")}>
                  <Icon className="h-3 w-3 text-stone-400 flex-shrink-0" />
                  <span className={cn(compact ? "text-[10px]" : "text-[12px]", "text-stone-600 truncate")}>{card[c.key]}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* QR */}
        <div className={cn(compact ? "mt-4" : "mt-auto pt-5", "flex items-center justify-between")}>
          <div className="rounded-xl bg-white border border-stone-200 p-2 shadow-sm">
            <QRCodeSVG value={qrValue} size={qrSize} bgColor="#ffffff" fgColor="#1c1917" />
          </div>
          <span className={cn(compact ? "text-[8px]" : "text-[9px]", "tracking-[0.16em] uppercase text-stone-400 text-right leading-relaxed")}>
            Scan to<br />connect
          </span>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// 3. BLUEPRINT — structured grid, blue-cyan technical
// ════════════════════════════════════════════════════════════════════════════════
function Blueprint({ card, imageUrl, qrValue, compact }: TP) {
  const contacts = contactDefs.filter((c) => Boolean(card[c.key]));
  const p = compact ? "p-4" : "p-7";
  const qrSize = compact ? 40 : 56;

  return (
    <div className={cn("relative overflow-hidden bg-gradient-to-br from-blue-700 to-cyan-500 shadow-[0_24px_60px_rgba(0,0,0,0.45)]", compact ? "rounded-[22px]" : "rounded-[28px]")}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.09),transparent_55%)] pointer-events-none" />

      <div className={cn(p, "relative flex h-full flex-col")}>
        {/* Identity row */}
        <div className="flex items-start gap-3">
          <Av imageUrl={imageUrl} name={card.name}
            size={compact ? "h-10 w-10 text-sm" : "h-14 w-14 text-base"}
            rounded={compact ? "rounded-xl" : "rounded-2xl"}
            bg="bg-white/20 border border-white/30" ring={compact ? undefined : "ring-2 ring-white/25"} />
          <div className="flex-1 min-w-0">
            <p className={cn(compact ? "text-base" : "text-[22px]", "font-bold tracking-[-0.02em] text-white leading-tight")}>{card.name}</p>
            {card.title && <p className={cn(compact ? "text-[9px]" : "text-sm", "text-white/65 truncate")}>{card.title}</p>}
            {card.company && <p className={cn(compact ? "text-[8px]" : "text-xs", "text-white/45 truncate")}>{card.company}</p>}
          </div>
          <div className="h-6 w-6 rounded-lg bg-white/18 border border-white/28 flex items-center justify-center flex-shrink-0">
            <div className="h-2.5 w-2.5 rounded-[3px] bg-white/55" />
          </div>
        </div>

        {/* Rule */}
        <div className={cn(compact ? "mt-3" : "mt-4", "h-px bg-white/20")} />

        {/* 2×2 contact grid */}
        {contacts.length > 0 && (
          <div className={cn(compact ? "mt-3" : "mt-4", "grid grid-cols-2 gap-1.5")}>
            {(compact ? contacts.slice(0, 4) : contacts).map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.key} className={cn("rounded-xl bg-white/14 border border-white/18 backdrop-blur", compact ? "p-2" : "p-3")}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className={cn("rounded-lg bg-white/18 flex items-center justify-center flex-shrink-0", compact ? "h-4 w-4" : "h-5 w-5")}>
                      <Icon className={cn(compact ? "h-2 w-2" : "h-2.5 w-2.5", "text-white")} />
                    </div>
                    <span className="text-[7px] tracking-[0.14em] uppercase text-white/45">{c.label}</span>
                  </div>
                  <p className={cn(compact ? "text-[9px]" : "text-[11px]", "text-white/85 truncate leading-none")}>{card[c.key]}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* QR footer */}
        <div className={cn(compact ? "mt-4" : "mt-auto pt-5", "border-t border-white/15 flex items-center justify-between")}>
          <div>
            <p className={cn(compact ? "text-[9px]" : "text-xs", "font-semibold text-white/85")}>Scan to connect</p>
            {!compact && <p className="text-[9px] text-white/45 mt-0.5">Opens your profile instantly</p>}
          </div>
          <div className="rounded-xl bg-white p-1.5 shadow-lg">
            <QRCodeSVG value={qrValue} size={qrSize} bgColor="#ffffff" fgColor="#1d4ed8" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// 4. SIGNAL MONO — ultra-minimal, bare monochrome
// ════════════════════════════════════════════════════════════════════════════════
function SignalMono({ card, imageUrl, qrValue, compact }: TP) {
  const contacts = contactDefs.filter((c) => Boolean(card[c.key]));
  const p = compact ? "p-5" : "p-8";

  return (
    <div className={cn("relative overflow-hidden bg-gradient-to-br from-zinc-950 to-zinc-800 shadow-[0_24px_60px_rgba(0,0,0,0.65)]", compact ? "rounded-[22px]" : "rounded-[28px]")}>
      <div className={cn(p, "flex h-full flex-col")}>
        {/* Top rule */}
        <div className="h-px w-full bg-white/8" />

        {/* Big name */}
        <div className={compact ? "mt-5" : "mt-8"}>
          {imageUrl && compact && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt={card.name} className="h-7 w-7 rounded object-cover mb-2 opacity-60" />
          )}
          <p className={cn(compact ? "text-3xl" : "text-[46px]", "font-black tracking-[-0.04em] text-white leading-none")}>{card.name}</p>
          {card.title && (
            <p className={cn(compact ? "mt-1.5 text-[9px]" : "mt-3 text-[10px]", "tracking-[0.28em] uppercase text-zinc-500")}>{card.title}</p>
          )}
          {card.company && (
            <p className={cn(compact ? "mt-0.5 text-[8px]" : "mt-1 text-[10px]", "tracking-[0.2em] uppercase text-zinc-600")}>{card.company}</p>
          )}
        </div>

        {/* Bare contact values */}
        {contacts.length > 0 && (
          <div className={cn(compact ? "mt-4" : "mt-8", "flex flex-col", compact ? "gap-1" : "gap-2")}>
            {(compact ? contacts.slice(0, 3) : contacts).map((c) => (
              <p key={c.key} className={cn(compact ? "text-[9px]" : "text-[11px]", "text-zinc-500 font-mono truncate")}>{card[c.key]}</p>
            ))}
          </div>
        )}

        {/* Bottom rules + QR */}
        <div className={cn(compact ? "mt-4" : "mt-auto pt-8", "flex items-end justify-between")}>
          <div className="flex flex-col gap-1">
            <div className="h-px w-16 bg-white/8" />
            <div className="h-px w-10 bg-white/5" />
          </div>
          <div className="rounded-[6px] bg-zinc-800 border border-white/8 p-1.5">
            <QRCodeSVG value={qrValue} size={compact ? 32 : 44} bgColor="transparent" fgColor="#52525b" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ClassicNight({ card, imageUrl, qrValue, compact }: TP) {
  const contacts = contactDefs.filter((c) => Boolean(card[c.key]));
  const p = compact ? "p-4" : "p-8";
  const qrSize = compact ? 52 : 128;

  return (
    <div
      className={cn(
        "relative overflow-hidden border border-white/10 bg-[linear-gradient(180deg,#121827_0%,#0b1020_100%)] shadow-[0_32px_80px_rgba(0,0,0,0.58)]",
        compact ? "rounded-[22px]" : "rounded-[34px]",
      )}
    >
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_28%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.05),transparent_24%)] pointer-events-none" />

      <div className={cn(p, "relative flex h-full flex-col")}>
        <Av
          imageUrl={imageUrl}
          name={card.name}
          size={compact ? "h-12 w-12 text-sm" : "h-14 w-14 text-base"}
          rounded="rounded-2xl"
          bg="bg-white/10 border border-white/14"
          ring={compact ? undefined : "ring-1 ring-white/12"}
        />

        <div className={compact ? "mt-5" : "mt-8"}>
          <p className={cn(compact ? "text-[28px]" : "text-[42px]", "font-bold tracking-[-0.04em] leading-none text-white")}>
            {card.name}
          </p>
          {card.title ? (
            <p className={cn(compact ? "mt-2 text-[10px]" : "mt-3 text-[16px]", "font-medium text-slate-300")}>
              {card.title}
            </p>
          ) : null}
          {card.company ? (
            <p className={cn(compact ? "mt-1 text-[9px]" : "mt-1.5 text-[12px]", "text-slate-500")}>
              {card.company}
            </p>
          ) : null}
        </div>

        {contacts.length > 0 ? (
          <div className={cn(compact ? "mt-5" : "mt-8", "flex flex-col")}>
            {contacts.map((c, index) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.key}
                  className={cn(
                    "flex items-center gap-3 border-slate-800/95",
                    compact ? "py-2.5" : "py-3.5",
                    index > 0 && "border-t",
                  )}
                >
                  <Icon className={cn(compact ? "h-4 w-4" : "h-[18px] w-[18px]", "shrink-0 text-slate-500")} />
                  <p className={cn(compact ? "text-[10px]" : "text-[12px]", "truncate text-slate-300")}>{card[c.key]}</p>
                </div>
              );
            })}
          </div>
        ) : null}

        <div className={cn(compact ? "mt-6" : "mt-auto pt-8", "flex flex-col items-center")}>
          <div className={cn("bg-white shadow-[0_12px_34px_rgba(0,0,0,0.35)]", compact ? "rounded-[20px] p-2.5" : "rounded-[28px] p-4")}>
            <QRCodeSVG value={qrValue} size={qrSize} bgColor="#ffffff" fgColor="#111827" />
          </div>
          <p className={cn(compact ? "mt-4 text-[8px]" : "mt-7 text-[10px]", "tracking-[0.28em] uppercase text-slate-600")}>
            SCAN TO CONNECT | DIGICARD
          </p>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// 5. CREST — light neutral, centered, symmetric
// ════════════════════════════════════════════════════════════════════════════════
function Crest({ card, imageUrl, qrValue, compact }: TP) {
  const contacts = contactDefs.filter((c) => Boolean(card[c.key]));
  const p = compact ? "p-4" : "p-6";

  return (
    <div className={cn("relative overflow-hidden bg-slate-50 border border-slate-200 shadow-[0_16px_40px_rgba(0,0,0,0.06)]", compact ? "rounded-[22px]" : "rounded-[28px]")}>
      <div className={cn(p, "flex h-full flex-col items-center text-center")}>
        {/* Top flanking rule */}
        <div className="flex items-center gap-2 w-full">
          <div className="h-px flex-1 bg-slate-200" />
          <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Centered avatar */}
        <div className={compact ? "mt-3" : "mt-5"}>
          <Av imageUrl={imageUrl} name={card.name}
            size={compact ? "h-12 w-12 text-sm" : "h-16 w-16 text-base"}
            rounded="rounded-full" bg="bg-slate-200 border-2 border-slate-300"
            textColor="text-slate-500" ring={compact ? undefined : "ring-2 ring-slate-200"} />
        </div>

        {/* Name */}
        <div className={compact ? "mt-2.5" : "mt-4"}>
          <p className={cn(compact ? "text-xl" : "text-2xl", "font-bold tracking-[-0.02em] text-slate-900")}>{card.name}</p>
          {card.title && <p className={cn(compact ? "text-[10px]" : "text-sm", "mt-1 text-slate-500")}>{card.title}</p>}
          {card.company && <p className={cn(compact ? "text-[9px]" : "text-xs", "text-slate-400")}>{card.company}</p>}
        </div>

        {/* Rule */}
        <div className={cn(compact ? "mt-3" : "mt-4", "h-px w-full bg-slate-200")} />

        {/* 2×2 contacts */}
        {contacts.length > 0 && (
          <div className="mt-3 w-full grid grid-cols-2 gap-x-3">
            {(compact ? contacts.slice(0, 4) : contacts).map((c, i) => {
              const Icon = c.icon;
              return (
                <div key={c.key} className={cn("flex items-center gap-1.5 text-left", compact ? "py-1.5" : "py-2", i >= 2 && "border-t border-slate-100")}>
                  <Icon className={cn(compact ? "h-2.5 w-2.5" : "h-3 w-3", "text-slate-400 flex-shrink-0")} />
                  <span className={cn(compact ? "text-[9px]" : "text-[11px]", "text-slate-600 truncate")}>{card[c.key]}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* QR centered */}
        <div className={cn(compact ? "mt-4" : "mt-auto pt-5", "flex flex-col items-center gap-1.5")}>
          <div className="rounded-xl bg-white border border-slate-200 p-2 shadow-sm">
            <QRCodeSVG value={qrValue} size={compact ? 40 : 60} bgColor="#ffffff" fgColor="#0f172a" />
          </div>
          <span className="text-[8px] tracking-[0.16em] uppercase text-slate-400">Scan to connect</span>
        </div>

        {/* Bottom rule */}
        <div className={cn(compact ? "mt-2" : "mt-3", "flex items-center gap-2 w-full")}>
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-[7px] tracking-[0.2em] uppercase text-slate-300">DigiCard</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// 6. HORIZON — split layout, bright indigo-sky
// ════════════════════════════════════════════════════════════════════════════════
function Horizon({ card, imageUrl, qrValue, compact }: TP) {
  const contacts = contactDefs.filter((c) => Boolean(card[c.key]));

  if (compact) {
    return (
      <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-indigo-700 to-sky-500 shadow-[0_16px_40px_rgba(0,0,0,0.4)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.1),transparent_45%)] pointer-events-none" />
        <div className="relative flex h-full flex-col gap-3 p-4">
          {/* Identity */}
          <div className="flex items-center gap-2.5">
            <Av imageUrl={imageUrl} name={card.name} size="h-10 w-10 text-sm"
              rounded="rounded-2xl" bg="bg-white/20 border border-white/30" />
            <div className="min-w-0">
              <p className="text-base font-bold text-white tracking-tight leading-tight truncate">{card.name}</p>
              {card.title && <p className="text-[9px] text-white/60 truncate">{card.title}</p>}
            </div>
          </div>
          {/* Contact pills */}
          <div className="flex flex-wrap gap-1">
            {contacts.slice(0, 4).map((c) => (
              <span key={c.key} className="rounded-full bg-white/18 border border-white/22 px-2 py-0.5 text-[8px] font-medium text-white/80 truncate max-w-[120px]">
                {card[c.key]}
              </span>
            ))}
          </div>
          {/* QR row */}
          <div className="mt-auto flex items-center justify-between border-t border-white/15 pt-2.5">
            <p className="text-[8px] text-white/45 tracking-wide">Scan to connect</p>
            <div className="rounded-lg bg-white p-1">
              <QRCodeSVG value={qrValue} size={32} bgColor="#ffffff" fgColor="#3730a3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-indigo-700 to-sky-500 shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.1),transparent_45%)] pointer-events-none" />
      <div className="relative flex min-h-[340px]">
        {/* Left panel — identity */}
        <div className="w-[44%] border-r border-white/15 p-6 flex flex-col">
          <Av imageUrl={imageUrl} name={card.name} size="h-16 w-16 text-base"
            rounded="rounded-3xl" bg="bg-white/20 border border-white/30" ring="ring-2 ring-white/25" />
          <div className="mt-5 flex-1">
            <p className="text-xl font-bold tracking-[-0.02em] text-white leading-tight">{card.name}</p>
            {card.title && <p className="mt-1.5 text-[11px] text-white/60 leading-snug">{card.title}</p>}
          </div>
          {card.company && (
            <span className="mt-auto rounded-full bg-white/14 border border-white/20 px-3 py-1 text-[10px] font-medium text-white/75 self-start">
              {card.company}
            </span>
          )}
        </div>

        {/* Right panel — contacts + QR */}
        <div className="flex h-full flex-1 flex-col p-5">
          <div className="flex flex-col gap-3">
            {contacts.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.key} className="flex items-center gap-2.5">
                  <div className="h-7 w-7 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-3 w-3 text-white/75" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[7px] tracking-[0.14em] uppercase text-white/38">{c.label}</p>
                    <p className="text-[10px] text-white/80 truncate leading-none mt-0.5">{card[c.key]}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-auto flex items-center gap-3 border-t border-white/15 pt-4">
            <div className="rounded-xl bg-white p-1.5 shadow-lg">
              <QRCodeSVG value={qrValue} size={44} bgColor="#ffffff" fgColor="#3730a3" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-white/85">Scan to connect</p>
              <p className="text-[8px] text-white/40 mt-0.5">DigiCard</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// 7. EMBER — bold warm, energetic with decorative circles
// ════════════════════════════════════════════════════════════════════════════════
function Ember({ card, imageUrl, qrValue, compact }: TP) {
  const contacts = contactDefs.filter((c) => Boolean(card[c.key]));
  const p = compact ? "p-4" : "p-7";

  return (
    <div className={cn("relative overflow-hidden bg-gradient-to-br from-amber-600 to-orange-400 shadow-[0_24px_60px_rgba(0,0,0,0.4)]", compact ? "rounded-[22px]" : "rounded-[28px]")}>
      <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10 pointer-events-none" />
      <div className="absolute -right-3 -bottom-8 h-32 w-32 rounded-full bg-white/[0.07] pointer-events-none" />

      <div className={cn(p, "relative flex h-full flex-col")}>
        {/* Brand + avatar */}
        <div className="flex items-center justify-between">
          <span className="text-[8px] tracking-[0.24em] uppercase text-white/55 font-semibold">DigiCard</span>
          <Av imageUrl={imageUrl} name={card.name}
            size={compact ? "h-8 w-8 text-[10px]" : "h-11 w-11 text-sm"}
            rounded="rounded-xl" bg="bg-white/20 border border-white/30"
            ring={compact ? undefined : "ring-2 ring-white/25"} />
        </div>

        {/* Big name */}
        <div className={compact ? "mt-4" : "mt-5"}>
          <p className={cn(compact ? "text-2xl" : "text-[38px]", "font-black tracking-[-0.03em] text-white leading-none")}>{card.name}</p>
          {card.title && <p className={cn(compact ? "text-[10px]" : "text-sm", "mt-1.5 font-medium text-white/65")}>{card.title}</p>}
          {card.company && (
            <div className="mt-2">
              <span className="rounded-full bg-white/18 border border-white/25 px-2.5 py-0.5 text-[9px] font-semibold text-white/80">
                {card.company}
              </span>
            </div>
          )}
        </div>

        {/* Rule */}
        <div className={cn(compact ? "mt-3" : "mt-5", "h-px bg-white/20")} />

        {/* Contacts */}
        {contacts.length > 0 && (
          <div className={cn(compact ? "mt-2.5" : "mt-4", "flex flex-col")}>
            {(compact ? contacts.slice(0, 3) : contacts).map((c, i) => {
              const Icon = c.icon;
              return (
                <div key={c.key} className={cn("flex items-center gap-2.5", compact ? "py-1.5" : "py-2", i > 0 && "border-t border-white/10")}>
                  <div className={cn("rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0", compact ? "h-5 w-5" : "h-6 w-6")}>
                    <Icon className={cn(compact ? "h-2.5 w-2.5" : "h-3 w-3", "text-white/65")} />
                  </div>
                  <span className={cn(compact ? "text-[10px]" : "text-[11px]", "text-white/82 truncate")}>{card[c.key]}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* QR */}
        <div className={cn(compact ? "mt-4" : "mt-auto pt-5", "flex justify-end")}>
          <div className="rounded-xl bg-white/88 p-1.5 shadow-lg">
            <QRCodeSVG value={qrValue} size={compact ? 36 : 52} bgColor="rgba(255,255,255,0.9)" fgColor="#92400e" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// 8. FOREST — two zones divided, deep green
// ════════════════════════════════════════════════════════════════════════════════
function Forest({ card, imageUrl, qrValue, compact }: TP) {
  const contacts = contactDefs.filter((c) => Boolean(card[c.key]));
  const p = compact ? "p-4" : "p-7";

  return (
    <div className={cn("relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-teal-700 shadow-[0_24px_60px_rgba(0,0,0,0.55)]", compact ? "rounded-[22px]" : "rounded-[28px]")}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(52,211,153,0.07),transparent_50%)] pointer-events-none" />

      <div className={cn(p, "relative flex h-full flex-col")}>
        {/* Top zone — identity */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {card.company && (
              <div className="mb-2">
                <span className="rounded-sm bg-white/10 border border-white/12 px-2 py-0.5 text-[8px] tracking-[0.16em] uppercase text-emerald-300/65">
                  {card.company}
                </span>
              </div>
            )}
            <p className={cn(compact ? "text-2xl" : "text-[32px]", "font-bold tracking-[-0.03em] text-white leading-none")}>{card.name}</p>
            {card.title && <p className={cn(compact ? "text-[10px]" : "text-sm", "mt-1.5 text-emerald-200/55")}>{card.title}</p>}
          </div>
          <Av imageUrl={imageUrl} name={card.name}
            size={compact ? "h-10 w-10 text-xs" : "h-14 w-14 text-sm"}
            rounded="rounded-2xl" bg="bg-white/8 border border-white/12"
            textColor="text-white/38" />
        </div>

        {/* Decorative divider */}
        <div className={cn(compact ? "mt-3" : "mt-5", "flex items-center gap-2")}>
          <div className="h-px flex-1 bg-white/10" />
          <div className="h-1 w-1 rotate-45 bg-emerald-400/28" />
          <div className="h-px w-6 bg-white/10" />
        </div>

        {/* Bottom zone — contacts */}
        {contacts.length > 0 && (
          <div className={cn(compact ? "mt-2.5" : "mt-4", "flex flex-col")}>
            {(compact ? contacts.slice(0, 3) : contacts).map((c, i) => {
              const Icon = c.icon;
              return (
                <div key={c.key} className={cn("flex items-center gap-2.5", compact ? "py-1.5" : "py-2", i > 0 && "border-t border-white/[0.07]")}>
                  <Icon className={cn(compact ? "h-2.5 w-2.5" : "h-3.5 w-3.5", "text-emerald-400/45 flex-shrink-0")} />
                  <span className={cn(compact ? "text-[10px]" : "text-[11px]", "text-slate-300 truncate")}>{card[c.key]}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* QR footer */}
        <div className={cn(compact ? "mt-4" : "mt-auto pt-5", "border-t border-white/[0.07] flex items-center justify-between")}>
          <div>
            <p className="text-[8px] tracking-[0.18em] uppercase text-emerald-300/35">Scan to connect</p>
            {!compact && <p className="text-[7px] text-white/18 mt-0.5">DigiCard</p>}
          </div>
          <div className="rounded-xl bg-white/10 border border-white/14 p-1.5 backdrop-blur">
            <QRCodeSVG value={qrValue} size={compact ? 36 : 48} bgColor="transparent" fgColor="rgba(167,243,208,0.65)" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// 9. OBSIDIAN — luxury dark, frosted glass contacts
// ════════════════════════════════════════════════════════════════════════════════
function Obsidian({ card, imageUrl, qrValue, compact }: TP) {
  const contacts = contactDefs.filter((c) => Boolean(card[c.key]));
  const p = compact ? "p-4" : "p-7";

  return (
    <div className={cn("relative overflow-hidden bg-gradient-to-br from-violet-950 to-purple-800 shadow-[0_24px_60px_rgba(0,0,0,0.65)]", compact ? "rounded-[22px]" : "rounded-[28px]")}>
      {/* Shimmer top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-200/40 to-transparent pointer-events-none" />
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(167,139,250,0.16),transparent_45%)] pointer-events-none" />

      <div className={cn(p, "relative flex h-full flex-col")}>
        {/* Brand row */}
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rotate-45 bg-violet-300/45" />
          <span className="text-[8px] tracking-[0.26em] uppercase text-violet-300/38 font-medium">DigiCard</span>
        </div>

        {/* Avatar right + name left */}
        <div className={cn(compact ? "mt-3" : "mt-5", "flex items-start gap-3")}>
          <div className="flex-1 min-w-0">
            <p className={cn(compact ? "text-xl" : "text-[30px]", "font-bold tracking-[-0.03em] text-white leading-none")}>{card.name}</p>
            {card.title && <p className={cn(compact ? "text-[10px]" : "text-sm", "mt-1.5 text-violet-200/55")}>{card.title}</p>}
            {card.company && <p className={cn(compact ? "text-[9px]" : "text-xs", "text-violet-300/38")}>{card.company}</p>}
          </div>
          <Av imageUrl={imageUrl} name={card.name}
            size={compact ? "h-10 w-10 text-xs" : "h-14 w-14 text-sm"}
            rounded="rounded-2xl" bg="bg-violet-800/60 border border-violet-300/14"
            textColor="text-violet-300/38" ring={compact ? undefined : "ring-1 ring-violet-300/18"} />
        </div>

        {/* Frosted contact tile */}
        {contacts.length > 0 && (
          <div className={cn(compact ? "mt-3" : "mt-5", "rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-sm overflow-hidden")}>
            {(compact ? contacts.slice(0, 3) : contacts).map((c, i) => {
              const Icon = c.icon;
              return (
                <div key={c.key} className={cn("flex items-center gap-2.5", compact ? "px-3 py-2" : "px-4 py-2.5", i > 0 && "border-t border-white/[0.06]")}>
                  <Icon className={cn(compact ? "h-2.5 w-2.5" : "h-3 w-3", "text-violet-300/45 flex-shrink-0")} />
                  <span className={cn(compact ? "text-[9px]" : "text-[11px]", "text-slate-300 truncate")}>{card[c.key]}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Shimmer + QR */}
        <div className={cn(compact ? "mt-4" : "mt-auto pt-5")}>
          <div className="h-px bg-gradient-to-r from-violet-300/18 via-violet-300/8 to-transparent mb-3" />
          <div className="flex items-center justify-between">
            <p className="text-[8px] tracking-[0.2em] uppercase text-violet-300/30">Scan to connect</p>
            <div className="rounded-xl bg-violet-900/60 border border-violet-300/18 p-1.5 backdrop-blur">
              <QRCodeSVG value={qrValue} size={compact ? 34 : 46} bgColor="transparent" fgColor="rgba(196,181,253,0.65)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// 10. DAWN — soft, centered, playful rounded bubbles
// ════════════════════════════════════════════════════════════════════════════════
function Dawn({ card, imageUrl, qrValue, compact }: TP) {
  const contacts = contactDefs.filter((c) => Boolean(card[c.key]));
  const p = compact ? "p-4" : "p-7";

  return (
    <div className={cn("relative overflow-hidden bg-gradient-to-br from-pink-500 to-purple-500 shadow-[0_24px_60px_rgba(0,0,0,0.4)]", compact ? "rounded-[22px]" : "rounded-[32px]")}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none" />

      <div className={cn(p, "relative flex h-full flex-col items-center text-center")}>
        {/* Dot row */}
        <div className="flex gap-1.5 items-center">
          <div className="h-1.5 w-1.5 rounded-full bg-white/70" />
          <div className="h-1.5 w-1.5 rounded-full bg-white/42" />
          <div className="h-1.5 w-1.5 rounded-full bg-white/22" />
        </div>

        {/* Centered avatar */}
        <div className={compact ? "mt-3" : "mt-4"}>
          <Av imageUrl={imageUrl} name={card.name}
            size={compact ? "h-14 w-14 text-base" : "h-20 w-20 text-xl"}
            rounded={compact ? "rounded-2xl" : "rounded-3xl"}
            bg="bg-white/22 border-2 border-white/28"
            ring={compact ? undefined : "ring-4 ring-white/22"} />
        </div>

        {/* Name */}
        <div className={compact ? "mt-2.5" : "mt-4"}>
          <p className={cn(compact ? "text-xl" : "text-2xl", "font-bold tracking-[-0.02em] text-white")}>{card.name}</p>
          {card.title && <p className={cn(compact ? "text-[10px]" : "text-sm", "mt-0.5 text-white/65")}>{card.title}</p>}
          {card.company && <p className={cn(compact ? "text-[9px]" : "text-xs", "text-white/45")}>{card.company}</p>}
        </div>

        {/* Bubble contacts */}
        {contacts.length > 0 && (
          <div className={cn(compact ? "mt-3" : "mt-5", "w-full flex flex-col gap-1.5")}>
            {(compact ? contacts.slice(0, 3) : contacts).map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.key} className={cn("rounded-2xl bg-white/18 border border-white/24 flex items-center gap-2.5", compact ? "px-3 py-2" : "px-4 py-2.5")}>
                  <Icon className={cn(compact ? "h-3 w-3" : "h-3.5 w-3.5", "text-white/65 flex-shrink-0")} />
                  <span className={cn(compact ? "text-[10px]" : "text-[11px]", "text-white/82 truncate text-left")}>{card[c.key]}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* QR */}
        <div className={cn(compact ? "mt-4" : "mt-auto pt-5", "flex flex-col items-center gap-1.5")}>
          <div className="rounded-2xl bg-white p-2 shadow-[0_8px_20px_rgba(0,0,0,0.2)]">
            <QRCodeSVG value={qrValue} size={compact ? 38 : 58} bgColor="#ffffff" fgColor="#7c3aed" />
          </div>
          <span className="text-[8px] tracking-[0.16em] uppercase text-white/38">Scan to connect | DigiCard</span>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ════════════════════════════════════════════════════════════════════════════════
function ArchitectColumn({ card, imageUrl, qrValue, compact }: TP) {
  const contacts = contactDefs.filter((c) => Boolean(card[c.key]));
  const visibleContacts = compact ? contacts.slice(0, 3) : contacts;
  const qrSize = compact ? 40 : 112;

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[#f6f3ee] text-[#1c2329] shadow-[0_24px_60px_rgba(15,23,42,0.16)]",
        compact ? "rounded-[22px]" : "rounded-[30px]",
      )}
    >
      <div className="absolute inset-y-0 left-0 w-[30%] bg-[#182126]" />
      <div className="absolute inset-y-0 left-[30%] w-px bg-[#182126]/10" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/70" />

      <div className={cn("relative flex h-full", compact ? "px-3 py-4" : "px-6 py-7")}>
        <div className={cn("relative flex-shrink-0", compact ? "w-[29%]" : "w-[110px]")}>
          <div className={cn("flex justify-center", compact ? "pt-3" : "pt-5")}>
            <div
              className="max-h-full text-center text-white"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              <span className={cn(compact ? "text-[9px]" : "text-[11px]", "font-bold tracking-[-0.02em]")}>
                {card.name}
              </span>
              <span className={cn(compact ? "mt-1 text-[8px]" : "mt-2 text-[10px]", "text-white/72")}>
                {card.company || card.title || "DigiCard"}
              </span>
            </div>
          </div>

          <div className={cn("absolute left-1/2 -translate-x-1/2", compact ? "bottom-20" : "bottom-36")}>
            <div
              className={cn(
                "flex items-center justify-center rounded-full bg-[#182126] shadow-[0_18px_35px_rgba(15,23,42,0.24)]",
                compact ? "h-12 w-12" : "h-20 w-20",
              )}
            >
              {imageUrl ? (
                <Av
                  imageUrl={imageUrl}
                  name={card.name}
                  size={compact ? "h-9 w-9 text-[10px]" : "h-14 w-14 text-sm"}
                  rounded="rounded-full"
                  bg="bg-white/10"
                />
              ) : (
                <div className={cn("rounded-full bg-[#f6f3ee]", compact ? "h-3.5 w-7" : "h-5 w-10")} />
              )}
            </div>
          </div>

          <div className={cn("absolute left-1/2 -translate-x-1/2", compact ? "bottom-6" : "bottom-8")}>
            <div className="flex flex-col items-center gap-2">
              <div className={cn("rounded-full bg-white/92", compact ? "h-2.5 w-9" : "h-3 w-14")} />
              <div className={cn("rounded-full bg-white/34", compact ? "h-2.5 w-12" : "h-3 w-16")} />
              <div className={cn("rounded-full bg-white/55", compact ? "h-2.5 w-7" : "h-3 w-9")} />
            </div>
          </div>
        </div>

        <div className={cn("flex min-w-0 flex-1 flex-col", compact ? "pl-3.5" : "pl-6")}>
          <div className="flex justify-end">
            <div className={cn("rounded-[18px] bg-white p-2 shadow-[0_16px_28px_rgba(15,23,42,0.12)]", compact && "rounded-[14px] p-1.5")}>
              <QRCodeSVG value={qrValue} size={qrSize} bgColor="#ffffff" fgColor="#11181d" />
            </div>
          </div>

          <div className={compact ? "mt-4" : "mt-6"}>
            <p className={cn(compact ? "text-base" : "text-[24px]", "font-bold tracking-[-0.03em] text-[#1b2328]")}>
              {card.name}
            </p>
            {card.title && (
              <p className={cn(compact ? "mt-1 text-[10px]" : "mt-1.5 text-sm", "font-medium uppercase tracking-[0.08em] text-slate-500")}>
                {card.title}
              </p>
            )}
            {card.company && (
              <p className={cn(compact ? "mt-1 text-[9px]" : "mt-2 text-[11px]", "text-slate-500")}>
                {card.company}
              </p>
            )}
          </div>

          {visibleContacts.length > 0 && (
            <div className={cn(compact ? "mt-4 space-y-2.5" : "mt-7 space-y-3.5")}>
              {visibleContacts.map((contact) => (
                <div key={contact.key}>
                  <div className={cn("mb-2 h-px bg-[#182126]/22", compact && "mb-1.5")} />
                  <p className={cn(compact ? "text-[7px]" : "text-[9px]", "uppercase tracking-[0.22em] text-slate-400")}>
                    {contact.label}
                  </p>
                  <p className={cn(compact ? "mt-1 text-[9px]" : "mt-1.5 text-[12px]", "text-slate-700")}>
                    {card[contact.key]}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className={cn(compact ? "mt-auto pt-4" : "mt-auto pt-6")}>
            <div className="flex items-center gap-2.5">
              <div className={cn("h-px bg-[#182126]/35", compact ? "w-8" : "w-12")} />
              <span className={cn(compact ? "text-[7px]" : "text-[9px]", "uppercase tracking-[0.2em] text-slate-400")}>
                Scan to connect
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardPreview({ card, compact = false, imageUrl, phoneHero: _phoneHero = false }: CardPreviewProps) {
  const shareTarget = getCardShareTarget(card);
  const qrValue = shareTarget.url;
  const tp: TP = { card, imageUrl, qrValue, compact };
  let preview = <Blueprint {...tp} />;

  switch (card.template) {
    case "Executive Slate": preview = <ExecutiveSlate {...tp} />; break;
    case "Studio Ivory": preview = <StudioIvory {...tp} />; break;
    case "Blueprint": preview = <Blueprint {...tp} />; break;
    case "Signal Mono": preview = <SignalMono {...tp} />; break;
    case "Classic Night": preview = <ClassicNight {...tp} />; break;
    case "Crest": preview = <Crest {...tp} />; break;
    case "Horizon": preview = <Horizon {...tp} />; break;
    case "Ember": preview = <Ember {...tp} />; break;
    case "Forest": preview = <Forest {...tp} />; break;
    case "Obsidian": preview = <Obsidian {...tp} />; break;
    case "Dawn": preview = <Dawn {...tp} />; break;
    case "Architect Column": preview = <ArchitectColumn {...tp} />; break;
    default: break;
  }

  return (
    <div className={cn("relative w-full aspect-[432/764]", compact ? undefined : "mx-auto max-w-[432px]")}>
      <div className="absolute inset-0 [&>*]:h-full [&>*]:w-full">
        {preview}
      </div>
    </div>
  );
}
