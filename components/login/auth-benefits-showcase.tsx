"use client";

import { GraduationCap, QrCode, ScanLine, UserRound } from "lucide-react";

const previewItems = ["LinkedIn", "Portfolio", "Resume", "Email"];

export function AuthBenefitsShowcase() {
  return (
    <div className="relative hidden w-[24rem] flex-shrink-0 border-l border-[rgba(25,35,61,0.08)] bg-[linear-gradient(180deg,_#f8faff_0%,_#eef2ff_100%)] lg:flex">
      <div className="absolute left-4 top-6 h-28 w-28 rounded-full bg-[rgba(82,103,217,0.18)] blur-3xl" />
      <div className="absolute bottom-6 right-5 h-32 w-32 rounded-full bg-[rgba(255,141,87,0.14)] blur-3xl" />

      <div className="relative flex h-full w-full flex-col gap-3 overflow-y-auto p-4">
        <div className="rounded-[1.8rem] border border-[rgba(25,35,61,0.08)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.9),_rgba(246,248,255,0.96))] p-3 shadow-[0_22px_54px_rgba(18,31,66,0.12)]">
          <div className="rounded-[1.65rem] bg-[linear-gradient(165deg,_#172340_0%,_#2d4177_44%,_#5267d9_100%)] p-4 text-white shadow-[0_18px_36px_rgba(49,69,127,0.2)]">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/82">
                <UserRound className="h-3.5 w-3.5" />
                Active card
              </div>
              <ScanLine className="h-4 w-4 text-white/72" />
            </div>

            <div className="mt-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/14">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <h3 className="mt-4 text-[1.85rem] font-semibold leading-[1.02] tracking-[-0.05em]">
                Alex Morgan
              </h3>
              <p className="mt-1.5 text-sm text-white/78">Business Analytics Student</p>
              <p className="mt-1 text-sm text-white/72">State University</p>
            </div>

            <div className="mt-6 rounded-[1.35rem] border border-white/14 bg-white/10 p-3.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/66">
                Quick scan
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="rounded-[1rem] bg-white p-2.5 shadow-[0_10px_24px_rgba(12,18,31,0.16)]">
                  <QrCode className="h-14 w-14 text-[#172340]" />
                </div>
                <p className="max-w-[8rem] text-sm leading-6 text-white/78">
                  Ready for career fairs and campus events.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[1.45rem] border border-[rgba(25,35,61,0.08)] bg-[rgba(246,248,255,0.94)] p-4 shadow-[0_12px_30px_rgba(21,32,58,0.05)]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Signed-in benefits
          </p>
          <h3 className="mt-2.5 text-[1.75rem] font-semibold leading-[1.05] tracking-[-0.05em] text-[var(--ink)]">
            Keep your profile polished and event-ready.
          </h3>
          <p className="mt-2.5 text-sm leading-6 text-[var(--muted)]">
            Update your resume, refresh your links, and open your DigiCard quickly whenever a new
            opportunity shows up.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {previewItems.map((item) => (
            <div
              key={item}
              className="rounded-[1.2rem] border border-[rgba(25,35,61,0.08)] bg-white/92 px-4 py-3.5 shadow-[0_12px_28px_rgba(21,32,58,0.04)]"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                Included
              </p>
              <p className="mt-2 text-[1.02rem] font-semibold tracking-[-0.02em] text-[var(--ink)]">
                {item}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-[1.45rem] border border-[rgba(25,35,61,0.08)] bg-white/92 p-4 shadow-[0_12px_28px_rgba(21,32,58,0.04)]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Student-first use
          </p>
          <p className="mt-2.5 text-[1.1rem] font-semibold leading-8 tracking-[-0.04em] text-[var(--ink)]">
            Better for recruiters, alumni, mentors, and speakers who want your profile right away.
          </p>
        </div>
      </div>
    </div>
  );
}
