import Image from "next/image";
import { Sparkles } from "lucide-react";

function CellularIcon() {
  return (
    <div className="flex h-[0.8rem] items-end gap-[2px]">
      <span className="h-[0.22rem] w-[0.12rem] rounded-full bg-current" />
      <span className="h-[0.38rem] w-[0.12rem] rounded-full bg-current" />
      <span className="h-[0.56rem] w-[0.12rem] rounded-full bg-current" />
      <span className="h-[0.74rem] w-[0.12rem] rounded-full bg-current" />
    </div>
  );
}

function WifiIcon() {
  return (
    <div className="relative h-[0.82rem] w-[0.95rem]">
      <span className="absolute left-1/2 top-[0.04rem] h-[0.72rem] w-[0.72rem] -translate-x-1/2 rounded-full border-[1.4px] border-transparent border-t-current" />
      <span className="absolute left-1/2 top-[0.2rem] h-[0.46rem] w-[0.46rem] -translate-x-1/2 rounded-full border-[1.4px] border-transparent border-t-current" />
      <span className="absolute left-1/2 bottom-[0.05rem] h-[0.14rem] w-[0.14rem] -translate-x-1/2 rounded-full bg-current" />
    </div>
  );
}

function BatteryIcon() {
  return (
    <div className="relative h-[0.78rem] w-[1.45rem] rounded-[0.24rem] border-[1.4px] border-current">
      <span className="absolute right-[-0.15rem] top-[0.18rem] h-[0.28rem] w-[0.1rem] rounded-r-full bg-current" />
      <span className="absolute inset-y-[0.12rem] left-[0.12rem] w-[0.88rem] rounded-[0.12rem] bg-current" />
    </div>
  );
}

function RealisticPhoneFrame() {
  return (
    <div className="relative mx-auto w-[16.4rem] sm:w-[17.55rem] lg:w-[18.6rem]">
      <div className="relative aspect-[316/640]">
        <div className="pointer-events-none absolute inset-x-[10%] top-[12%] h-[74%] rounded-full bg-[radial-gradient(circle,rgba(82,103,217,0.22),rgba(82,103,217,0.05)_48%,transparent_72%)] blur-[42px]" />
        <div className="pointer-events-none absolute inset-x-[18%] bottom-[2.2%] h-[7%] rounded-full bg-[rgba(15,23,42,0.16)] blur-[18px]" />

        <span className="pointer-events-none absolute left-[4.2%] top-[24%] h-[8.6%] w-[1.1%] rounded-l-full bg-[linear-gradient(180deg,#5d636d,#d9dde4,#606772)] opacity-95" />
        <span className="pointer-events-none absolute left-[4.2%] top-[35.3%] h-[14.8%] w-[1.2%] rounded-l-full bg-[linear-gradient(180deg,#656b75,#e2e5eb,#5d646f)] opacity-95" />
        <span className="pointer-events-none absolute left-[4.2%] top-[51.4%] h-[14.8%] w-[1.2%] rounded-l-full bg-[linear-gradient(180deg,#656b75,#e2e5eb,#5d646f)] opacity-95" />
        <span className="pointer-events-none absolute right-[4.35%] top-[36.9%] h-[18.8%] w-[1.1%] rounded-r-full bg-[linear-gradient(180deg,#5d636d,#e2e5eb,#5b626d)] opacity-95" />

        <div className="absolute inset-x-[7%] top-[1.4%] bottom-[1.4%] rounded-[3.4rem] bg-[linear-gradient(180deg,#fdfdfe_0%,#eceef3_14%,#8e949c_44%,#eff2f6_68%,#d7dbe2_100%)] shadow-[0_30px_60px_rgba(15,23,42,0.18),0_1px_0_rgba(255,255,255,0.95),inset_0_1px_1px_rgba(255,255,255,0.75)]">
          <div className="absolute inset-[0.14rem] rounded-[3.18rem] bg-[linear-gradient(180deg,#0f1217_0%,#050608_48%,#12161d_100%)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1),inset_0_10px_18px_rgba(255,255,255,0.03)]">
            <div className="pointer-events-none absolute inset-[0.08rem] rounded-[3.06rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0)_18%,rgba(255,255,255,0)_82%,rgba(255,255,255,0.08))]" />

            <div className="absolute inset-x-[2.8%] top-[1.55%] bottom-[1.65%] overflow-hidden rounded-[2.9rem] bg-[linear-gradient(180deg,#f8f9fd_0%,#eef3ff_52%,#ffffff_100%)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(82,103,217,0.18),transparent_28%),radial-gradient(circle_at_78%_66%,rgba(56,189,248,0.14),transparent_24%),radial-gradient(circle_at_50%_92%,rgba(255,255,255,0.92),transparent_20%)]" />

              <div className="absolute inset-x-[7.8%] top-[3.75%] z-30 flex items-center justify-between text-[0.76rem] font-semibold tracking-[-0.03em] text-slate-700">
                <span>12:34</span>
                <div className="flex items-center gap-[0.32rem]">
                  <CellularIcon />
                  <WifiIcon />
                  <BatteryIcon />
                </div>
              </div>

              <div className="pointer-events-none absolute left-1/2 top-[2.25%] z-20 h-[5.2%] w-[34.5%] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,#020304,#0d1015)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_1px_3px_rgba(0,0,0,0.28)]" />
              <div className="pointer-events-none absolute right-[33.7%] top-[3.88%] z-30 h-[0.95%] w-[1.55%] rounded-full bg-[radial-gradient(circle_at_35%_35%,#2d6bff,#08152d_72%)] opacity-90" />

              <div className="absolute inset-x-[5.2%] bottom-[6.9%] top-[11.5%] rounded-[2.55rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.54),rgba(245,248,255,0.76)_38%,rgba(255,255,255,0.82)_100%)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.42)]">
                <div className="pointer-events-none absolute inset-0 rounded-[2.55rem] bg-[radial-gradient(circle_at_22%_14%,rgba(82,103,217,0.13),transparent_22%),radial-gradient(circle_at_78%_62%,rgba(56,189,248,0.11),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0))]" />
                <div className="absolute inset-x-[3.2%] bottom-[2.1%] top-[2.2%]">
                  <Image
                    src="/jordan-lin-card.png"
                    alt="Jordan Lin DigiCard demo preview"
                    fill
                    sizes="(max-width: 768px) 46vw, 255px"
                    className="pointer-events-none select-none object-contain object-top drop-shadow-[0_22px_40px_rgba(15,23,42,0.18)]"
                    priority
                  />
                </div>
              </div>

              <div className="pointer-events-none absolute left-1/2 bottom-[2.7%] z-30 h-[0.34rem] w-[30%] -translate-x-1/2 rounded-full bg-[#090b10]/78" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.09)_0%,transparent_18%,transparent_72%,rgba(255,255,255,0.05)_100%)]" />
              <div className="pointer-events-none absolute inset-[0.12rem] rounded-[2.72rem] ring-1 ring-[rgba(17,24,39,0.06)]" />
            </div>
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
