import Image from "next/image";
import { Sparkles } from "lucide-react";

function CellularIcon() {
  return (
    <div className="flex h-[0.8rem] items-end gap-[2px]">
      <span className="h-[0.22rem] w-[0.12rem] rounded-full bg-white/95" />
      <span className="h-[0.38rem] w-[0.12rem] rounded-full bg-white/95" />
      <span className="h-[0.56rem] w-[0.12rem] rounded-full bg-white/95" />
      <span className="h-[0.74rem] w-[0.12rem] rounded-full bg-white/95" />
    </div>
  );
}

function WifiIcon() {
  return (
    <div className="relative h-[0.82rem] w-[0.95rem]">
      <span className="absolute left-1/2 top-[0.04rem] h-[0.72rem] w-[0.72rem] -translate-x-1/2 rounded-full border-[1.4px] border-transparent border-t-white/95" />
      <span className="absolute left-1/2 top-[0.2rem] h-[0.46rem] w-[0.46rem] -translate-x-1/2 rounded-full border-[1.4px] border-transparent border-t-white/95" />
      <span className="absolute left-1/2 bottom-[0.05rem] h-[0.14rem] w-[0.14rem] -translate-x-1/2 rounded-full bg-white/95" />
    </div>
  );
}

function BatteryIcon() {
  return (
    <div className="relative h-[0.78rem] w-[1.45rem] rounded-[0.24rem] border-[1.4px] border-white/95">
      <span className="absolute right-[-0.15rem] top-[0.18rem] h-[0.28rem] w-[0.1rem] rounded-r-full bg-white/95" />
      <span className="absolute inset-y-[0.12rem] left-[0.12rem] w-[0.88rem] rounded-[0.12rem] bg-white/95" />
    </div>
  );
}

function RealisticPhoneFrame() {
  return (
    <div className="relative mx-auto w-[17rem] sm:w-[18.25rem] lg:w-[19rem]">
      <div className="absolute left-0 top-[18%] z-0 h-[12%] w-[1.35%] rounded-full bg-[linear-gradient(180deg,#42464f,#0e1118)] shadow-[0_1px_4px_rgba(0,0,0,0.22)]" />
      <div className="absolute -left-[0.45%] top-[31%] z-0 h-[9.5%] w-[1.75%] rounded-full bg-[linear-gradient(180deg,#4a4f58,#141821)] shadow-[0_1px_4px_rgba(0,0,0,0.22)]" />
      <div className="absolute right-0 top-[27%] z-0 h-[14%] w-[1.4%] rounded-full bg-[linear-gradient(180deg,#4e535c,#141821)] shadow-[0_1px_4px_rgba(0,0,0,0.22)]" />

      <div className="relative aspect-[467/700] rounded-[3.7rem] bg-[linear-gradient(135deg,#d8dbe3_0%,#767d88_12%,#11141a_24%,#737984_38%,#0d1016_62%,#c9ccd4_100%)] p-[0.22rem] shadow-[0_26px_60px_rgba(15,23,42,0.18),0_5px_12px_rgba(15,23,42,0.12)]">
        <div className="absolute inset-[0.22rem] rounded-[3.55rem] border border-white/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.24),rgba(255,255,255,0.04)_14%,rgba(0,0,0,0.08)_55%,rgba(255,255,255,0.18)_100%)] opacity-85" />

        <div className="relative h-full w-full rounded-[3.45rem] bg-[linear-gradient(180deg,#22252d,#0a0d13)] p-[0.28rem]">
          <div className="relative h-full w-full overflow-hidden rounded-[3.15rem] bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[13%] bg-[linear-gradient(180deg,rgba(0,0,0,0.48),rgba(0,0,0,0.08)_58%,transparent)]" />
            <div className="absolute inset-x-[7%] top-[3.25%] z-30 flex items-center justify-between text-[0.82rem] font-semibold tracking-[-0.03em] text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]">
              <span>9:41</span>
              <div className="flex items-center gap-1.5">
                <CellularIcon />
                <WifiIcon />
                <BatteryIcon />
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 top-[5.4%]">
              <Image
                src="/jordan-lin-card.png"
                alt="Jordan Lin DigiCard demo preview"
                fill
                sizes="(max-width: 768px) 55vw, 336px"
                className="pointer-events-none select-none object-cover object-top"
                priority
              />
            </div>

            <div className="pointer-events-none absolute inset-x-[34%] top-[2.4%] z-20 h-[4.6%] rounded-full bg-[linear-gradient(180deg,#020304,#0b0d12)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_1px_2px_rgba(0,0,0,0.35)]" />
            <div className="pointer-events-none absolute right-[39.2%] top-[3.55%] z-30 h-[1.18%] w-[1.75%] rounded-full bg-[radial-gradient(circle_at_35%_35%,#2d6bff,#08152d_72%)] opacity-90" />

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12)_0%,transparent_18%,transparent_72%,rgba(255,255,255,0.08)_100%)]" />
            <div className="pointer-events-none absolute inset-[0.16rem] rounded-[3rem] ring-1 ring-white/6" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function InteractivePhonePreview() {
  return (
    <div className="relative mx-auto flex max-w-[40rem] justify-center py-10">
      {/* Floating badge — original light style */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[5%] top-[10%] h-72 w-72 rounded-full bg-[rgba(82,103,217,0.2)] blur-[95px]" />
        <div className="absolute right-[6%] top-[36%] h-64 w-64 rounded-full bg-[rgba(56,189,248,0.15)] blur-[85px]" />
        <div className="absolute bottom-[2%] left-[30%] h-52 w-52 rounded-full bg-[rgba(255,255,255,0.8)] blur-[60px]" />
      </div>

      {/* Floating "Why it clicks" card — original light style */}
      <div className="absolute right-0 top-0 z-20 hidden items-center gap-2 rounded-full border border-[rgba(82,103,217,0.15)] bg-white/90 px-4 py-2 text-sm font-semibold text-[var(--ink)] shadow-[0_10px_28px_rgba(21,32,58,0.1)] backdrop-blur lg:inline-flex">
        <Sparkles className="h-4 w-4 text-[var(--brand)]" />
        Your card. One scan.
      </div>

      <div className="relative w-full max-w-[620px]">
        <div className="relative flex aspect-[1920/1440] w-full items-center justify-center">
          <div className="pointer-events-none absolute inset-0 rounded-[3rem] bg-[radial-gradient(circle_at_50%_24%,rgba(82,103,217,0.2),transparent_22%),radial-gradient(circle_at_48%_58%,rgba(56,189,248,0.12),transparent_26%),radial-gradient(circle_at_38%_75%,rgba(255,255,255,0.62),transparent_28%)] blur-[2px]" />
          <div className="relative z-10">
            <RealisticPhoneFrame />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_36%_72%,rgba(255,255,255,0.26),transparent_18%),radial-gradient(circle_at_53%_13%,rgba(255,255,255,0.12),transparent_14%)]" />
        </div>
      </div>
    </div>
  );
}
