import Image from "next/image";
import { Sparkles } from "lucide-react";

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
        <div className="relative aspect-[1920/1440] w-full">
          <div className="pointer-events-none absolute inset-0 rounded-[3rem] bg-[radial-gradient(circle_at_50%_24%,rgba(82,103,217,0.2),transparent_22%),radial-gradient(circle_at_48%_58%,rgba(56,189,248,0.12),transparent_26%),radial-gradient(circle_at_38%_75%,rgba(255,255,255,0.62),transparent_28%)] blur-[2px]" />

          <div className="absolute left-[36.08%] top-[6.9%] h-[70.16%] w-[25.9%] overflow-hidden rounded-[3.08rem] bg-[#060912] shadow-[0_24px_40px_rgba(15,23,42,0.2)]">
            <div className="absolute inset-[0.1rem] overflow-hidden rounded-[2.96rem] bg-[#060912]">
              <div className="absolute inset-[-0.3%_-1.25%_-0.45%_-1.25%]">
                <Image
                  src="/jordan-lin-card.png"
                  alt="Jordan Lin DigiCard demo preview"
                  fill
                  sizes="(max-width: 768px) 30vw, 180px"
                  className="pointer-events-none select-none object-fill"
                  priority
                />
              </div>
            </div>
          </div>

          <Image
            src="/hand-phone-hero.png"
            alt="Hand holding a phone previewing the DigiCard blueprint template"
            fill
            sizes="(max-width: 768px) 90vw, 620px"
            className="pointer-events-none select-none object-contain drop-shadow-[0_34px_80px_rgba(15,23,42,0.24)]"
            priority
          />

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_36%_72%,rgba(255,255,255,0.26),transparent_18%),radial-gradient(circle_at_53%_13%,rgba(255,255,255,0.12),transparent_14%)]" />
        </div>
      </div>
    </div>
  );
}
