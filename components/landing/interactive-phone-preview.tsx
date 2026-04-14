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
    <div className="relative mx-auto w-[16.25rem] sm:w-[17.5rem] lg:w-[18.5rem]">
      <div className="relative aspect-[308/589]">
        <Image
          src="/realistic-phone-template.jpg"
          alt="Realistic phone template framing the DigiCard preview"
          fill
          sizes="(max-width: 768px) 52vw, 296px"
          className="pointer-events-none select-none object-cover"
          priority
        />

        <div className="absolute left-[8.2%] top-[8.05%] h-[88.25%] w-[83.8%] overflow-hidden rounded-[2.7rem] bg-[linear-gradient(180deg,#191e30_0%,#0a0d17_100%)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[11.5%] bg-[linear-gradient(180deg,rgba(5,8,14,0.58),rgba(5,8,14,0.14)_60%,transparent)]" />

          <div className="absolute inset-x-[7%] top-[2.9%] z-30 flex items-center justify-between text-[0.8rem] font-semibold tracking-[-0.03em] text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <CellularIcon />
              <WifiIcon />
              <BatteryIcon />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-[33.5%] top-[2.2%] z-20 h-[4.9%] rounded-full bg-[linear-gradient(180deg,#020304,#0b0d12)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_1px_2px_rgba(0,0,0,0.35)]" />
          <div className="pointer-events-none absolute right-[38.9%] top-[3.33%] z-30 h-[1.14%] w-[1.7%] rounded-full bg-[radial-gradient(circle_at_35%_35%,#2d6bff,#08152d_72%)] opacity-90" />

          <div className="absolute inset-x-[3.2%] bottom-[2.2%] top-[7.8%]">
            <Image
              src="/jordan-lin-card.png"
              alt="Jordan Lin DigiCard demo preview"
              fill
              sizes="(max-width: 768px) 46vw, 248px"
              className="pointer-events-none select-none object-contain object-top"
              priority
            />
          </div>

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,transparent_18%,transparent_74%,rgba(255,255,255,0.06)_100%)]" />
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
