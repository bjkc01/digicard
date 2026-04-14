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
type ContactKey = "email" | "phone" | "linkedin" | "website";

type ContactDef = {
  key: ContactKey;
  label: string;
  icon: typeof Mail;
};

type StudentTheme = {
  card: string;
  overlay?: string;
  rail: string;
  chip: string;
  chipMuted: string;
  avatarWrap: string;
  avatarBg: string;
  avatarText: string;
  name: string;
  role: string;
  school: string;
  body: string;
  subtle: string;
  panel: string;
  panelAlt: string;
  iconWrap: string;
  icon: string;
  qrWrap: string;
  qrFg: string;
  tag: string;
};

const contactDefs: ContactDef[] = [
  { key: "email", label: "Email", icon: Mail },
  { key: "phone", label: "Phone", icon: Phone },
  { key: "linkedin", label: "LinkedIn", icon: AtSign },
  { key: "website", label: "Website", icon: Globe },
];

const networkingContactDefs: ContactDef[] = [
  { key: "linkedin", label: "LinkedIn", icon: AtSign },
  { key: "website", label: "Website", icon: Globe },
  { key: "email", label: "Email", icon: Mail },
  { key: "phone", label: "Phone", icon: Phone },
];

const studentThemes = {
  executive: {
    card:
      "border border-white/10 bg-[linear-gradient(180deg,#0f172a_0%,#172554_100%)] shadow-[0_30px_70px_rgba(2,6,23,0.45)]",
    overlay:
      "bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.10),transparent_35%),linear-gradient(180deg,transparent,rgba(255,255,255,0.02))]",
    rail: "bg-gradient-to-b from-cyan-300 to-blue-400",
    chip: "border border-white/12 bg-white/10 text-white/88",
    chipMuted: "border border-white/10 bg-white/[0.06] text-slate-300",
    avatarWrap: "border border-white/14 bg-white/[0.08] shadow-[0_12px_24px_rgba(2,6,23,0.24)]",
    avatarBg: "bg-white/10 border border-white/10",
    avatarText: "text-white/70",
    name: "text-white",
    role: "text-slate-200",
    school: "text-slate-400",
    body: "text-slate-200",
    subtle: "text-slate-400",
    panel: "border border-white/10 bg-white/[0.06] backdrop-blur-sm",
    panelAlt: "border border-white/10 bg-white/[0.04]",
    iconWrap: "bg-white/[0.08] border border-white/10",
    icon: "text-cyan-200",
    qrWrap: "bg-white/95 shadow-[0_14px_30px_rgba(15,23,42,0.28)]",
    qrFg: "#0f172a",
    tag: "border border-white/12 bg-white/[0.06] text-white/72",
  },
  studio: {
    card:
      "border border-stone-200 bg-[linear-gradient(180deg,#f9f7f2_0%,#f2ede3_100%)] shadow-[0_24px_54px_rgba(28,25,23,0.10)]",
    overlay:
      "bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.85),transparent_38%),linear-gradient(180deg,transparent,rgba(120,113,108,0.04))]",
    rail: "bg-gradient-to-b from-stone-900 to-stone-500",
    chip: "border border-stone-300 bg-white/85 text-stone-800",
    chipMuted: "border border-stone-200 bg-stone-100/80 text-stone-600",
    avatarWrap: "border border-stone-200 bg-white/90 shadow-[0_12px_24px_rgba(120,113,108,0.10)]",
    avatarBg: "bg-stone-200 border border-stone-300",
    avatarText: "text-stone-600",
    name: "text-stone-900",
    role: "text-stone-700",
    school: "text-stone-500",
    body: "text-stone-700",
    subtle: "text-stone-500",
    panel: "border border-stone-200 bg-white/78",
    panelAlt: "border border-stone-200 bg-stone-50/80",
    iconWrap: "bg-stone-100 border border-stone-200",
    icon: "text-stone-700",
    qrWrap: "border border-stone-200 bg-white shadow-[0_14px_30px_rgba(120,113,108,0.12)]",
    qrFg: "#1c1917",
    tag: "border border-stone-200 bg-white/90 text-stone-700",
  },
  blueprint: {
    card:
      "border border-cyan-200/50 bg-[linear-gradient(180deg,#eff9ff_0%,#dbeafe_100%)] shadow-[0_24px_54px_rgba(29,78,216,0.12)]",
    overlay:
      "bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.95),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.14),transparent_32%)]",
    rail: "bg-gradient-to-b from-blue-700 to-cyan-400",
    chip: "border border-blue-200 bg-white/90 text-blue-950",
    chipMuted: "border border-cyan-200 bg-cyan-50/90 text-blue-700",
    avatarWrap: "border border-blue-200 bg-white/90 shadow-[0_12px_24px_rgba(56,189,248,0.14)]",
    avatarBg: "bg-blue-100 border border-blue-200",
    avatarText: "text-blue-700",
    name: "text-slate-950",
    role: "text-slate-700",
    school: "text-sky-700",
    body: "text-slate-700",
    subtle: "text-sky-700/80",
    panel: "border border-blue-200/80 bg-white/80",
    panelAlt: "border border-cyan-200 bg-cyan-50/70",
    iconWrap: "bg-blue-50 border border-blue-200",
    icon: "text-blue-700",
    qrWrap: "border border-blue-200 bg-white shadow-[0_14px_30px_rgba(59,130,246,0.16)]",
    qrFg: "#1d4ed8",
    tag: "border border-blue-200 bg-white/86 text-blue-700",
  },
  signal: {
    card:
      "border border-white/8 bg-[linear-gradient(180deg,#09090b_0%,#18181b_100%)] shadow-[0_30px_70px_rgba(0,0,0,0.50)]",
    overlay:
      "bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_34%),linear-gradient(180deg,transparent,rgba(255,255,255,0.02))]",
    rail: "bg-gradient-to-b from-zinc-100 to-zinc-500",
    chip: "border border-white/10 bg-white/[0.06] text-zinc-100",
    chipMuted: "border border-white/8 bg-white/[0.04] text-zinc-400",
    avatarWrap: "border border-white/10 bg-white/[0.05] shadow-[0_12px_24px_rgba(0,0,0,0.22)]",
    avatarBg: "bg-white/[0.06] border border-white/8",
    avatarText: "text-zinc-300",
    name: "text-white",
    role: "text-zinc-200",
    school: "text-zinc-400",
    body: "text-zinc-200",
    subtle: "text-zinc-400",
    panel: "border border-white/8 bg-white/[0.04]",
    panelAlt: "border border-white/8 bg-white/[0.03]",
    iconWrap: "bg-white/[0.06] border border-white/8",
    icon: "text-zinc-200",
    qrWrap: "border border-white/8 bg-white shadow-[0_14px_30px_rgba(0,0,0,0.24)]",
    qrFg: "#09090b",
    tag: "border border-white/8 bg-white/[0.05] text-zinc-300",
  },
  crest: {
    card:
      "border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f5f7fb_100%)] shadow-[0_22px_52px_rgba(15,23,42,0.08)]",
    overlay:
      "bg-[radial-gradient(circle_at_top_right,rgba(130,146,255,0.12),transparent_32%),linear-gradient(180deg,transparent,rgba(148,163,184,0.05))]",
    rail: "bg-gradient-to-b from-slate-800 to-slate-400",
    chip: "border border-slate-200 bg-white text-slate-800",
    chipMuted: "border border-slate-200 bg-slate-50 text-slate-600",
    avatarWrap: "border border-slate-200 bg-white shadow-[0_12px_24px_rgba(15,23,42,0.08)]",
    avatarBg: "bg-slate-100 border border-slate-200",
    avatarText: "text-slate-600",
    name: "text-slate-900",
    role: "text-slate-700",
    school: "text-slate-500",
    body: "text-slate-700",
    subtle: "text-slate-500",
    panel: "border border-slate-200 bg-white/86",
    panelAlt: "border border-slate-200 bg-slate-50/86",
    iconWrap: "bg-slate-50 border border-slate-200",
    icon: "text-slate-700",
    qrWrap: "border border-slate-200 bg-white shadow-[0_14px_30px_rgba(15,23,42,0.08)]",
    qrFg: "#0f172a",
    tag: "border border-slate-200 bg-white text-slate-700",
  },
  horizon: {
    card:
      "border border-indigo-300/40 bg-[linear-gradient(180deg,#1e1b4b_0%,#3730a3_45%,#38bdf8_100%)] shadow-[0_30px_70px_rgba(49,46,129,0.32)]",
    overlay:
      "bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.14),transparent_28%)]",
    rail: "bg-gradient-to-b from-sky-200 to-cyan-400",
    chip: "border border-white/12 bg-white/[0.10] text-white/92",
    chipMuted: "border border-white/10 bg-white/[0.06] text-sky-100",
    avatarWrap: "border border-white/12 bg-white/[0.08] shadow-[0_12px_24px_rgba(15,23,42,0.22)]",
    avatarBg: "bg-white/[0.12] border border-white/12",
    avatarText: "text-white/78",
    name: "text-white",
    role: "text-sky-100",
    school: "text-white/62",
    body: "text-white/86",
    subtle: "text-white/58",
    panel: "border border-white/10 bg-white/[0.08] backdrop-blur-sm",
    panelAlt: "border border-white/10 bg-white/[0.06]",
    iconWrap: "bg-white/[0.10] border border-white/10",
    icon: "text-sky-100",
    qrWrap: "bg-white shadow-[0_14px_30px_rgba(30,41,59,0.26)]",
    qrFg: "#312e81",
    tag: "border border-white/10 bg-white/[0.08] text-white/78",
  },
  ember: {
    card:
      "border border-amber-200/40 bg-[linear-gradient(180deg,#fff6e8_0%,#fdba74_100%)] shadow-[0_24px_54px_rgba(234,88,12,0.16)]",
    overlay:
      "bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.72),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.18),transparent_28%)]",
    rail: "bg-gradient-to-b from-amber-700 to-orange-500",
    chip: "border border-amber-200 bg-white/90 text-amber-950",
    chipMuted: "border border-amber-200 bg-amber-50/90 text-orange-700",
    avatarWrap: "border border-amber-200 bg-white/88 shadow-[0_12px_24px_rgba(245,158,11,0.14)]",
    avatarBg: "bg-amber-100 border border-amber-200",
    avatarText: "text-orange-700",
    name: "text-amber-950",
    role: "text-amber-900",
    school: "text-orange-700",
    body: "text-amber-900",
    subtle: "text-orange-700/82",
    panel: "border border-amber-200 bg-white/78",
    panelAlt: "border border-amber-200 bg-amber-50/72",
    iconWrap: "bg-amber-50 border border-amber-200",
    icon: "text-orange-700",
    qrWrap: "border border-amber-200 bg-white shadow-[0_14px_30px_rgba(245,158,11,0.14)]",
    qrFg: "#9a3412",
    tag: "border border-amber-200 bg-white/86 text-orange-700",
  },
  forest: {
    card:
      "border border-emerald-300/30 bg-[linear-gradient(180deg,#06281d_0%,#065f46_100%)] shadow-[0_30px_70px_rgba(4,120,87,0.24)]",
    overlay:
      "bg-[radial-gradient(circle_at_top_right,rgba(167,243,208,0.10),transparent_34%),linear-gradient(180deg,transparent,rgba(255,255,255,0.02))]",
    rail: "bg-gradient-to-b from-emerald-200 to-teal-400",
    chip: "border border-white/12 bg-white/[0.08] text-white/90",
    chipMuted: "border border-white/10 bg-white/[0.05] text-emerald-100",
    avatarWrap: "border border-white/12 bg-white/[0.08] shadow-[0_12px_24px_rgba(6,95,70,0.22)]",
    avatarBg: "bg-white/[0.10] border border-white/10",
    avatarText: "text-emerald-100",
    name: "text-white",
    role: "text-emerald-100",
    school: "text-emerald-200/70",
    body: "text-slate-100",
    subtle: "text-emerald-200/60",
    panel: "border border-white/10 bg-white/[0.06] backdrop-blur-sm",
    panelAlt: "border border-white/10 bg-white/[0.05]",
    iconWrap: "bg-white/[0.08] border border-white/10",
    icon: "text-emerald-100",
    qrWrap: "bg-white/95 shadow-[0_14px_30px_rgba(4,120,87,0.24)]",
    qrFg: "#065f46",
    tag: "border border-white/10 bg-white/[0.06] text-emerald-100",
  },
  obsidian: {
    card:
      "border border-white/8 bg-[linear-gradient(180deg,#2e1065_0%,#581c87_100%)] shadow-[0_30px_70px_rgba(59,7,100,0.34)]",
    overlay:
      "bg-[radial-gradient(circle_at_top_right,rgba(221,214,254,0.12),transparent_34%),linear-gradient(180deg,transparent,rgba(255,255,255,0.02))]",
    rail: "bg-gradient-to-b from-fuchsia-200 to-violet-400",
    chip: "border border-white/12 bg-white/[0.08] text-white/92",
    chipMuted: "border border-white/10 bg-white/[0.05] text-violet-100",
    avatarWrap: "border border-white/10 bg-white/[0.06] shadow-[0_12px_24px_rgba(59,7,100,0.24)]",
    avatarBg: "bg-white/[0.08] border border-white/10",
    avatarText: "text-violet-100",
    name: "text-white",
    role: "text-violet-100",
    school: "text-violet-200/68",
    body: "text-slate-100",
    subtle: "text-violet-200/62",
    panel: "border border-white/10 bg-white/[0.06] backdrop-blur-sm",
    panelAlt: "border border-white/10 bg-white/[0.05]",
    iconWrap: "bg-white/[0.08] border border-white/10",
    icon: "text-violet-100",
    qrWrap: "bg-white shadow-[0_14px_30px_rgba(59,7,100,0.26)]",
    qrFg: "#581c87",
    tag: "border border-white/10 bg-white/[0.06] text-violet-100",
  },
  dawn: {
    card:
      "border border-rose-200/60 bg-[linear-gradient(180deg,#fff1f6_0%,#fbcfe8_52%,#ddd6fe_100%)] shadow-[0_24px_54px_rgba(190,24,93,0.12)]",
    overlay:
      "bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.92),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(244,114,182,0.14),transparent_26%)]",
    rail: "bg-gradient-to-b from-fuchsia-500 to-pink-400",
    chip: "border border-white/70 bg-white/92 text-rose-900",
    chipMuted: "border border-rose-200 bg-rose-50/88 text-fuchsia-700",
    avatarWrap: "border border-white/80 bg-white/88 shadow-[0_12px_24px_rgba(236,72,153,0.14)]",
    avatarBg: "bg-rose-100 border border-rose-200",
    avatarText: "text-fuchsia-700",
    name: "text-slate-900",
    role: "text-rose-900",
    school: "text-fuchsia-700",
    body: "text-slate-700",
    subtle: "text-fuchsia-700/82",
    panel: "border border-white/80 bg-white/78",
    panelAlt: "border border-rose-200 bg-white/72",
    iconWrap: "bg-rose-50 border border-rose-200",
    icon: "text-fuchsia-700",
    qrWrap: "border border-white/70 bg-white shadow-[0_14px_30px_rgba(236,72,153,0.14)]",
    qrFg: "#a21caf",
    tag: "border border-white/70 bg-white/84 text-fuchsia-700",
  },
} satisfies Record<string, StudentTheme>;

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("");
}

function Av({
  imageUrl,
  name,
  size,
  rounded,
  bg,
  ring,
  textColor,
}: {
  imageUrl: string | undefined;
  name: string;
  size: string;
  rounded: string;
  bg: string;
  ring?: string;
  textColor?: string;
}) {
  if (imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={imageUrl} alt={name} className={cn(size, rounded, "object-cover flex-shrink-0", ring)} />
    );
  }

  return (
    <div
      className={cn(
        size,
        rounded,
        bg,
        ring,
        "flex flex-shrink-0 items-center justify-center font-bold",
        textColor ?? "text-white/50",
      )}
    >
      {initials(name)}
    </div>
  );
}

function StudentNetworkCard({
  card,
  imageUrl,
  qrValue,
  compact,
  theme,
}: TP & { theme: StudentTheme }) {
  const contacts = networkingContactDefs.filter((contact) => Boolean(card[contact.key]));
  const visibleContacts = compact ? contacts.slice(0, 2) : contacts.slice(0, 4);
  const qrSize = compact ? 36 : 108;
  const dividerClassName = theme.name.includes("text-white") ? "border-white/10" : "border-black/8";

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        theme.card,
        compact ? "rounded-[22px]" : "rounded-[30px]",
      )}
    >
      {theme.overlay ? <div className={cn("pointer-events-none absolute inset-0", theme.overlay)} /> : null}
      <div className={cn("absolute inset-x-0 top-0 h-[3px]", theme.rail)} />

      <div className={cn("relative flex h-full flex-col", compact ? "p-4" : "p-7")}>
        <div className="flex items-start justify-between gap-4">
          <Av
            imageUrl={imageUrl}
            name={card.name}
            size={compact ? "h-12 w-12 text-sm" : "h-14 w-14 text-base"}
            rounded={compact ? "rounded-[18px]" : "rounded-[22px]"}
            bg={theme.avatarBg}
            ring={compact ? undefined : "ring-1 ring-white/10"}
            textColor={theme.avatarText}
          />
          <span
            className={cn(
              "rounded-full border px-3 py-1 text-[8px] font-semibold uppercase tracking-[0.22em]",
              theme.chipMuted,
            )}
          >
            DigiCard
          </span>
        </div>

        <div className={compact ? "mt-4" : "mt-6"}>
          <p
            className={cn(
              compact ? "text-[24px]" : "text-[40px]",
              "font-bold leading-none tracking-[-0.05em]",
              theme.name,
            )}
          >
            {card.name}
          </p>
          {card.title ? (
            <p className={cn(compact ? "mt-2 text-[11px]" : "mt-3 text-[16px]", "font-medium", theme.role)}>
              {card.title}
            </p>
          ) : null}
          {card.company ? (
            <p className={cn(compact ? "mt-1 text-[9px]" : "mt-1.5 text-[12px]", theme.school)}>
              {card.company}
            </p>
          ) : null}
        </div>

        {visibleContacts.length > 0 ? (
          <div className={cn("flex flex-col", compact ? "mt-4" : "mt-7")}>
            {visibleContacts.map((contact) => {
              const Icon = contact.icon;
              const valueClassName = compact
                ? "mt-0.5 truncate text-[10px] font-medium"
                : "mt-1 break-all text-[12px] leading-[1.35]";

              return (
                <div
                  key={contact.key}
                  className={cn(
                    "flex items-start gap-3 border-b",
                    compact ? "py-2.5" : "py-3.5",
                    dividerClassName,
                  )}
                >
                  <Icon className={cn(compact ? "mt-0.5 h-3.5 w-3.5" : "mt-0.5 h-[18px] w-[18px]", "shrink-0", theme.icon)} />
                  <div className="min-w-0">
                    <p
                      className={cn(
                        compact ? "text-[7px]" : "text-[8px]",
                        "font-semibold uppercase tracking-[0.18em]",
                        theme.subtle,
                      )}
                    >
                      {contact.label}
                    </p>
                    <p className={cn(valueClassName, theme.body)}>{card[contact.key]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}

        <div className={cn("mt-auto flex flex-col items-center", compact ? "pt-5" : "pt-8")}>
          <div className={cn(compact ? "rounded-[20px] p-2.5" : "rounded-[28px] p-4", theme.qrWrap)}>
            <QRCodeSVG value={qrValue} size={qrSize} bgColor="#ffffff" fgColor={theme.qrFg} />
          </div>
          <p
            className={cn(
              compact ? "mt-4 text-[8px]" : "mt-7 text-[10px]",
              "font-semibold uppercase tracking-[0.28em]",
              theme.subtle,
            )}
          >
            Scan to connect | DigiCard
          </p>
        </div>
      </div>
    </div>
  );
}

function ExecutiveSlate(props: TP) {
  return <StudentNetworkCard {...props} theme={studentThemes.executive} />;
}

function StudioIvory(props: TP) {
  return <StudentNetworkCard {...props} theme={studentThemes.studio} />;
}

function Blueprint(props: TP) {
  return <StudentNetworkCard {...props} theme={studentThemes.blueprint} />;
}

function SignalMono(props: TP) {
  return <StudentNetworkCard {...props} theme={studentThemes.signal} />;
}

function Crest(props: TP) {
  return <StudentNetworkCard {...props} theme={studentThemes.crest} />;
}

function Horizon(props: TP) {
  return <StudentNetworkCard {...props} theme={studentThemes.horizon} />;
}

function Ember(props: TP) {
  return <StudentNetworkCard {...props} theme={studentThemes.ember} />;
}

function Forest(props: TP) {
  return <StudentNetworkCard {...props} theme={studentThemes.forest} />;
}

function Obsidian(props: TP) {
  return <StudentNetworkCard {...props} theme={studentThemes.obsidian} />;
}

function Dawn(props: TP) {
  return <StudentNetworkCard {...props} theme={studentThemes.dawn} />;
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_28%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.05),transparent_24%)]" />

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
            {contacts.map((contact, index) => {
              const Icon = contact.icon;

              return (
                <div
                  key={contact.key}
                  className={cn(
                    "flex items-center gap-3 border-slate-800/95",
                    compact ? "py-2.5" : "py-3.5",
                    index > 0 && "border-t",
                  )}
                >
                  <Icon className={cn(compact ? "h-4 w-4" : "h-[18px] w-[18px]", "shrink-0 text-slate-500")} />
                  <p className={cn(compact ? "text-[10px]" : "text-[12px]", "truncate text-slate-300")}>
                    {card[contact.key]}
                  </p>
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
            {card.title ? (
              <p className={cn(compact ? "mt-1 text-[10px]" : "mt-1.5 text-sm", "font-medium uppercase tracking-[0.08em] text-slate-500")}>
                {card.title}
              </p>
            ) : null}
            {card.company ? (
              <p className={cn(compact ? "mt-1 text-[9px]" : "mt-2 text-[11px]", "text-slate-500")}>
                {card.company}
              </p>
            ) : null}
          </div>

          {visibleContacts.length > 0 ? (
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
          ) : null}

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

export function CardPreview({
  card,
  compact = false,
  imageUrl,
  phoneHero: _phoneHero = false,
}: CardPreviewProps) {
  const shareTarget = getCardShareTarget(card);
  const qrValue = shareTarget.url;
  const tp: TP = { card, imageUrl, qrValue, compact };
  let preview = <Blueprint {...tp} />;

  switch (card.template) {
    case "Executive Slate":
      preview = <ExecutiveSlate {...tp} />;
      break;
    case "Studio Ivory":
      preview = <StudioIvory {...tp} />;
      break;
    case "Blueprint":
      preview = <Blueprint {...tp} />;
      break;
    case "Signal Mono":
      preview = <SignalMono {...tp} />;
      break;
    case "Classic Night":
      preview = <ClassicNight {...tp} />;
      break;
    case "Crest":
      preview = <Crest {...tp} />;
      break;
    case "Horizon":
      preview = <Horizon {...tp} />;
      break;
    case "Ember":
      preview = <Ember {...tp} />;
      break;
    case "Forest":
      preview = <Forest {...tp} />;
      break;
    case "Obsidian":
      preview = <Obsidian {...tp} />;
      break;
    case "Dawn":
      preview = <Dawn {...tp} />;
      break;
    case "Architect Column":
      preview = <ArchitectColumn {...tp} />;
      break;
    default:
      break;
  }

  return (
    <div className={cn("relative w-full aspect-[432/764]", compact ? undefined : "mx-auto max-w-[432px]")}>
      <div className="absolute inset-0 [&>*]:h-full [&>*]:w-full">{preview}</div>
    </div>
  );
}
