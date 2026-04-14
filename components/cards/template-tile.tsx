import Link from "next/link";
import { AtSign, Globe, Mail, Phone } from "lucide-react";
import type { DigiCardTemplate } from "@/lib/data";

function TemplateCardPreview({ template }: { template: DigiCardTemplate }) {
  const id = template.id;

  // ── Executive Slate ─────────────────────────────────────────────────────────
  // Rigid & formal: strict rules, left accent bar, text-only contact lines
  if (id === "executive") {
    return (
      <div className="h-44 rounded-[18px] bg-gradient-to-br from-slate-900 to-slate-700 p-4 flex flex-col">
        <div className="flex items-center justify-between">
          <div className="w-0.5 h-6 rounded-full bg-white/30" />
          <span className="text-[8px] tracking-[0.22em] uppercase text-white/35 font-medium">Executive</span>
        </div>
        <div className="mt-auto">
          <div className="h-px w-full bg-white/10 mb-3" />
          <div className="h-3 w-20 rounded-sm bg-white/75" />
          <div className="mt-1.5 h-2 w-14 rounded-sm bg-white/30" />
        </div>
        <div className="mt-4 flex gap-4">
          <div className="h-1.5 w-8 rounded-sm bg-white/18" />
          <div className="h-1.5 w-8 rounded-sm bg-white/18" />
          <div className="h-1.5 w-8 rounded-sm bg-white/18" />
        </div>
      </div>
    );
  }

  // ── Studio Ivory ────────────────────────────────────────────────────────────
  // Editorial: large decorative initial in background, pill tags at bottom
  if (id === "studio") {
    return (
      <div className="h-44 rounded-[18px] bg-gradient-to-br from-stone-800 to-stone-500 p-4 flex flex-col overflow-hidden relative">
        <div className="absolute -right-3 -top-4 text-[72px] font-black leading-none text-white/[0.06] select-none pointer-events-none">
          S
        </div>
        <span className="text-[8px] tracking-[0.2em] uppercase text-white/40 font-medium">Studio</span>
        <div className="mt-auto">
          <div className="h-2 w-10 rounded-full bg-white/30 mb-2" />
          <div className="h-4 w-24 rounded-sm bg-white/78" />
          <div className="mt-1.5 h-2 w-16 rounded-sm bg-white/38" />
        </div>
        <div className="mt-3 flex gap-1.5">
          <div className="h-5 w-16 rounded-full bg-white/12 border border-white/18" />
          <div className="h-5 w-12 rounded-full bg-white/12 border border-white/18" />
        </div>
      </div>
    );
  }

  // ── Blueprint ───────────────────────────────────────────────────────────────
  // Technical: 2×2 contact grid, name at top, QR badge top-right
  if (id === "blueprint") {
    return (
      <div className="h-44 rounded-[18px] bg-gradient-to-br from-blue-700 to-cyan-500 p-4 flex flex-col">
        <div className="flex justify-between items-start">
          <div>
            <div className="h-3 w-20 rounded bg-white/80" />
            <div className="mt-1 h-2 w-14 rounded bg-white/45" />
          </div>
          <div className="h-6 w-6 rounded-[6px] bg-white/20 border border-white/30 flex items-center justify-center flex-shrink-0">
            <div className="h-2.5 w-2.5 rounded-[3px] bg-white/60" />
          </div>
        </div>
        <div className="mt-auto grid grid-cols-2 gap-1.5">
          {[Mail, Phone, AtSign, Globe].map((Icon, i) => (
            <div key={i} className="h-6 rounded-[8px] bg-white/15 border border-white/20 flex items-center px-1.5 gap-1.5">
              <Icon className="h-2.5 w-2.5 text-white/60 flex-shrink-0" />
              <div className="h-1.5 w-8 rounded bg-white/35" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Signal Mono ─────────────────────────────────────────────────────────────
  // Ultra-minimal: almost nothing — name, one rule top, one rule bottom
  if (id === "signal") {
    return (
      <div className="h-44 rounded-[18px] bg-gradient-to-br from-zinc-950 to-zinc-700 p-4 flex flex-col justify-between">
        <div className="h-px w-full bg-white/8" />
        <div>
          <div className="h-4 w-28 rounded-sm bg-white/72" />
          <div className="mt-2 h-2 w-16 rounded-sm bg-white/22" />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="h-px w-full bg-white/8" />
          <div className="flex justify-between items-center">
            <div className="h-1.5 w-14 rounded-sm bg-white/18" />
            <span className="text-[8px] tracking-[0.18em] uppercase text-white/18">Mono</span>
          </div>
        </div>
      </div>
    );
  }

  // ── Crest ───────────────────────────────────────────────────────────────────
  // Centered/symmetric: avatar centred, flanking horizontal rules, dot row
  if (id === "crest") {
    return (
      <div className="h-44 rounded-[18px] bg-gradient-to-br from-slate-800 to-slate-500 p-4 flex flex-col items-center justify-between">
        <div className="flex items-center gap-2 w-full">
          <div className="h-px flex-1 bg-white/15" />
          <span className="text-[8px] tracking-[0.2em] uppercase text-white/35">Crest</span>
          <div className="h-px flex-1 bg-white/15" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-white/15 ring-1 ring-white/25" />
          <div className="h-3 w-20 rounded-full bg-white/70" />
          <div className="h-1.5 w-14 rounded-full bg-white/28" />
        </div>
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-1.5 w-1.5 rounded-full bg-white/22" />
          ))}
        </div>
      </div>
    );
  }

  // ── Horizon ─────────────────────────────────────────────────────────────────
  // Modern/bright: avatar+name top, contact pills bottom, progress accent bar
  if (id === "horizon") {
    return (
      <div className="h-44 rounded-[18px] bg-gradient-to-br from-indigo-700 to-sky-500 p-4 flex flex-col">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full bg-white/22 ring-1 ring-white/32 flex-shrink-0" />
          <div>
            <div className="h-2.5 w-16 rounded-full bg-white/80" />
            <div className="mt-1 h-1.5 w-10 rounded-full bg-white/45" />
          </div>
        </div>
        <div className="mt-auto flex flex-wrap gap-1.5">
          {["Email", "Phone", "Web", "In"].map((label) => (
            <span
              key={label}
              className="rounded-full bg-white/18 border border-white/25 px-2 py-0.5 text-[8px] font-medium text-white/80"
            >
              {label}
            </span>
          ))}
        </div>
        <div className="mt-2.5 h-1 w-full rounded-full bg-white/15">
          <div className="h-1 w-3/4 rounded-full bg-white/48" />
        </div>
      </div>
    );
  }

  // ── Ember ───────────────────────────────────────────────────────────────────
  // Bold/energetic: large decorative circles, big name bar, icon circles
  if (id === "ember") {
    return (
      <div className="h-44 rounded-[18px] bg-gradient-to-br from-amber-600 to-orange-400 p-4 flex flex-col overflow-hidden relative">
        <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute -right-2 -bottom-6 h-24 w-24 rounded-full bg-white/[0.07] pointer-events-none" />
        <span className="text-[8px] tracking-[0.2em] uppercase text-white/55 font-semibold">Ember</span>
        <div className="mt-auto">
          <div className="h-5 w-28 rounded-sm bg-white/82 mb-1.5" />
          <div className="h-2 w-16 rounded-sm bg-white/48" />
        </div>
        <div className="mt-3 flex gap-2 items-center">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-6 w-6 rounded-full bg-white/20 border border-white/30" />
          ))}
          <div className="ml-auto h-6 w-6 rounded-[6px] bg-white/15 border border-white/25" />
        </div>
      </div>
    );
  }

  // ── Forest ──────────────────────────────────────────────────────────────────
  // Deep/grounded: name section top, bordered bottom strip with text rows
  if (id === "forest") {
    return (
      <div className="h-44 rounded-[18px] bg-gradient-to-br from-emerald-900 to-teal-600 p-4 flex flex-col">
        <div className="flex justify-between items-start">
          <span className="text-[8px] tracking-[0.2em] uppercase text-white/45 font-medium">Forest</span>
          <div className="h-6 w-6 rounded-full border border-white/20 bg-white/10 flex items-center justify-center">
            <div className="h-2.5 w-2.5 rounded-full bg-white/38" />
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="h-3 w-20 rounded bg-white/75" />
          <div className="mt-1.5 h-2 w-14 rounded bg-white/32" />
        </div>
        <div className="border-t border-white/10 pt-2.5 flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <div className="h-1.5 w-14 rounded bg-white/22" />
            <div className="h-1.5 w-10 rounded bg-white/22" />
          </div>
          <div className="h-8 w-8 rounded-[8px] bg-white/14 border border-white/20" />
        </div>
      </div>
    );
  }

  // ── Obsidian ────────────────────────────────────────────────────────────────
  // Luxury/dramatic: radial glow, thin shimmer top, diamond accent, name bottom
  if (id === "obsidian") {
    return (
      <div className="h-44 rounded-[18px] bg-gradient-to-br from-violet-900 to-purple-600 p-4 flex flex-col relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-200/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(167,139,250,0.15),transparent_50%)] pointer-events-none" />
        <div className="flex justify-between items-center relative">
          <span className="text-[8px] tracking-[0.25em] uppercase text-white/35 font-medium">Obsidian</span>
          <div className="h-2 w-2 rotate-45 bg-white/28" />
        </div>
        <div className="mt-auto relative">
          <div className="h-4 w-24 rounded bg-white/78" />
          <div className="mt-1.5 h-2 w-16 rounded bg-white/32" />
          <div className="mt-3 h-px w-full bg-gradient-to-r from-purple-200/28 to-transparent" />
          <div className="mt-2 flex gap-2">
            <div className="h-1.5 w-10 rounded bg-white/18" />
            <div className="h-1.5 w-10 rounded bg-white/18" />
          </div>
        </div>
      </div>
    );
  }

  // ── Dawn ────────────────────────────────────────────────────────────────────
  // Soft/expressive: centred avatar, dot row top, rounded icon bubbles bottom
  if (id === "dawn") {
    return (
      <div className="h-44 rounded-[18px] bg-gradient-to-br from-pink-500 to-purple-400 p-4 flex flex-col">
        <div className="flex gap-1.5 items-center">
          <div className="h-1.5 w-1.5 rounded-full bg-white/80" />
          <div className="h-1.5 w-1.5 rounded-full bg-white/50" />
          <div className="h-1.5 w-1.5 rounded-full bg-white/28" />
        </div>
        <div className="flex-1 flex flex-col justify-center items-center gap-2">
          <div className="h-10 w-10 rounded-2xl bg-white/22 ring-1 ring-white/38" />
          <div className="h-3 w-20 rounded-full bg-white/80" />
          <div className="h-2 w-14 rounded-full bg-white/42" />
        </div>
        <div className="flex justify-center gap-2">
          {[Mail, Phone, Globe].map((Icon, i) => (
            <div key={i} className="h-7 w-7 rounded-2xl bg-white/20 border border-white/28 flex items-center justify-center">
              <Icon className="h-3 w-3 text-white/70" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className={`h-44 rounded-[18px] bg-gradient-to-br ${template.accent} p-4`} />
  );
}

export function TemplateTile({
  isSelected = false,
  template,
}: {
  isSelected?: boolean;
  template: DigiCardTemplate;
}) {
  return (
    <Link
      href={`/create-card?template=${template.id}`}
      className={`group subtle-panel block overflow-hidden p-4 transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)] ${
        isSelected ? "ring-2 ring-[rgba(82,103,217,0.18)]" : ""
      }`}
    >
      {/* Card preview */}
      <div className={`rounded-[22px] ${template.tone} p-3`}>
        <TemplateCardPreview template={template} />
      </div>

      {/* Label row */}
      <div className="mt-4 px-1">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">{template.name}</h3>
          {isSelected ? (
            <span className="rounded-full bg-[rgba(82,103,217,0.1)] px-3 py-1 text-xs font-semibold text-[var(--brand)]">
              Current default
            </span>
          ) : (
            <span className="text-sm font-medium text-slate-900 transition-transform duration-300 group-hover:translate-x-1">
              Use template
            </span>
          )}
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-600">{template.description}</p>
      </div>
    </Link>
  );
}
