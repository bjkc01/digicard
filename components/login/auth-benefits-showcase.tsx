"use client";

import { AtSign, Globe, Mail, Phone } from "lucide-react";
import QRCode from "react-qr-code";
import { siteConfig } from "@/lib/site-config";

export function AuthBenefitsShowcase() {
  return (
    <section aria-label="Sample card template" className="border-t border-slate-100 bg-[linear-gradient(160deg,#f7f9ff,#eef2fc)] px-5 py-5 sm:px-6">
      <div className="relative isolate overflow-hidden rounded-[1.3rem] border border-white/20 bg-[linear-gradient(120deg,#121c30_0%,#24365b_65%,#405aa0_100%)] p-4 text-white shadow-[0_12px_28px_rgba(28,43,82,0.16)] sm:p-5">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-28 -z-10 h-64 w-64 rounded-full border border-white/10" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-14 -top-20 -z-10 h-48 w-48 rounded-full border border-white/10" />

        <div className="flex items-center gap-3">
          <div aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-base font-semibold text-indigo-100">JL</div>
          <div>
            <h3 className="text-[1.65rem] font-semibold leading-none tracking-[-0.045em] text-white">Jordan Lin</h3>
            <p className="mt-2 text-[11px] leading-4 text-slate-200">Computer Science Student</p>
            <p className="mt-0.5 text-[10px] leading-4 text-slate-300">State University</p>
          </div>
        </div>

        <p className="mt-4 text-xs leading-5 text-slate-200">Aspiring software developer building thoughtful, practical web experiences. Open to internships and collaborative projects.</p>

        <div className="mt-4 flex items-end justify-between gap-3 border-t border-white/15 pt-4">
          <div className="min-w-0 space-y-2 text-[10px] leading-4 text-slate-200">
            {[
              { Icon: Mail, value: "jordan@example.com" },
              { Icon: Phone, value: "+1 (555) 010-0123" },
              { Icon: AtSign, value: "linkedin.com/in/jordan-lin" },
              { Icon: Globe, value: "jordan.example.com" },
            ].map(({ Icon, value }) => (
              <p key={value} className="flex items-center gap-2">
                <Icon aria-hidden="true" className="h-3 w-3 shrink-0 text-indigo-200" />
                <span className="min-w-0 break-words [overflow-wrap:anywhere]">{value}</span>
              </p>
            ))}
          </div>
          <div className="shrink-0 text-center">
            <div role="img" aria-label="Sample QR code for the DigiCard homepage" className="h-16 w-16 rounded-xl bg-white p-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.15)] sm:h-[4.5rem] sm:w-[4.5rem]">
              <QRCode aria-hidden="true" bgColor="#ffffff" fgColor="#19233d" size={72} style={{ height: "100%", width: "100%" }} value={siteConfig.url} />
            </div>
            <p className="mt-1.5 text-[8px] tracking-wide text-indigo-100/80">DigiCard preview</p>
          </div>
        </div>
      </div>
    </section>
  );
}
