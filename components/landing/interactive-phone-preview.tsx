import { Sparkles } from "lucide-react";

export function InteractivePhonePreview() {
  return (
    <div className="relative mx-auto flex w-full max-w-[40rem] justify-center py-10">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[5%] top-[10%] h-72 w-72 rounded-full bg-[rgba(82,103,217,0.2)] blur-[95px]" />
        <div className="absolute right-[6%] top-[36%] h-64 w-64 rounded-full bg-[rgba(56,189,248,0.15)] blur-[85px]" />
        <div className="absolute bottom-[2%] left-[30%] h-52 w-52 rounded-full bg-[rgba(255,255,255,0.8)] blur-[60px]" />
      </div>

      <div className="absolute right-0 top-0 z-20 hidden items-center gap-2 rounded-full border border-[rgba(82,103,217,0.15)] bg-white/90 px-4 py-2 text-sm font-semibold text-[var(--ink)] shadow-[0_10px_28px_rgba(21,32,58,0.1)] backdrop-blur lg:inline-flex">
        <Sparkles className="h-4 w-4 text-[var(--brand)]" />
        Your card. One scan.
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "320px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            position: "absolute",
            zIndex: 1,
            top: "2.5%",
            left: "6%",
            width: "88%",
            height: "95%",
            borderRadius: "35px",
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/jordan-lin-card.png"
            alt="Jordan Lin student profile preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/iphone-frame.png"
          alt=""
          aria-hidden="true"
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            height: "auto",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}
