"use client";

import { useEffect, useRef, useState, type WheelEvent } from "react";
import { AtSign, Globe, Mail, Phone } from "lucide-react";
import QRCode from "react-qr-code";

function sanitizeFragment(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function InteractiveHeroPreview() {
  const [name, setName] = useState("");
  const [placeholder, setPlaceholder] = useState("Live preview");
  const screenScrollRef = useRef<HTMLDivElement>(null);
  const [showPlaceholderText, setShowPlaceholderText] = useState(true);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setShowPlaceholderText(false);
      const timeoutId = window.setTimeout(() => {
        setPlaceholder((current) =>
          current === "Live preview" ? "Type your name..." : "Live preview",
        );
        setShowPlaceholderText(true);
      }, 250);

      return () => window.clearTimeout(timeoutId);
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, []);

  const displayName = name.trim() || "Jordan Lin";
  const nameParts = displayName.split(/\s+/).filter(Boolean);
  const firstName = nameParts[0] ?? "Jordan";
  const lastName = nameParts[1] ?? nameParts[0] ?? "Lin";
  const initials = nameParts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2) || "JL";
  const safeFirst = sanitizeFragment(firstName) || "j";
  const safeLast = sanitizeFragment(lastName) || "lin";
  const profileSlug = `${slugify(displayName) || "jordan-lin"}-cs`;
  const qrValue = `https://digicard.me/${slugify(name) || "jordan-lin"}`;

  const detailRows = [
    {
      icon: Mail,
      value: `${safeFirst.charAt(0)}.${safeLast}@example.edu`,
    },
    {
      icon: Phone,
      value: "+1 (555) 019-3847",
    },
    {
      icon: AtSign,
      value: `linkedin.com/in/${profileSlug}`,
    },
    {
      icon: Globe,
      value: `digicard.me/${slugify(displayName) || "jordan-lin"}`,
    },
  ];

  const handlePhoneWheel = (event: WheelEvent<HTMLDivElement>) => {
    const screenElement = screenScrollRef.current;
    if (!screenElement) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    screenElement.scrollBy({
      top: event.deltaY,
      behavior: "auto",
    });
  };

  return (
    <div className="anim-card relative" id="live-preview">
      <div className="relative mx-auto flex w-full max-w-[42rem] justify-center py-10 lg:justify-end lg:pr-3">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[8%] top-[8%] h-72 w-72 rounded-full bg-[rgba(82,103,217,0.16)] blur-[95px]" />
          <div className="absolute right-[8%] top-[28%] h-64 w-64 rounded-full bg-[rgba(56,189,248,0.1)] blur-[88px]" />
          <div className="absolute bottom-[8%] left-[26%] h-56 w-56 rounded-full bg-[rgba(255,255,255,0.72)] blur-[64px]" />
        </div>

        <div className="absolute right-0 top-0 z-20">
          <input
            aria-label="Type your name to preview the card"
            autoComplete="off"
            className="h-12 w-[13rem] rounded-full border border-[rgba(82,103,217,0.15)] bg-white/90 px-5 text-sm font-semibold text-[var(--ink)] shadow-[0_10px_28px_rgba(21,32,58,0.1)] backdrop-blur-xl transition-[border-color,box-shadow,background-color,transform] duration-300 ease-in-out focus:-translate-y-0.5 focus:border-[rgba(82,103,217,0.3)] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[rgba(82,103,217,0.12)] sm:w-[14.5rem]"
            onChange={(event) => setName(event.target.value)}
            spellCheck={false}
            type="text"
            value={name}
          />
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-y-0 left-5 flex items-center whitespace-nowrap text-sm font-semibold text-[var(--muted)] transition-opacity duration-500 ease-in-out ${
              name.length > 0 || !showPlaceholderText ? "opacity-0" : "opacity-100"
            }`}
          >
            {placeholder}
          </span>
        </div>

        <div className="phone-mockup-container relative mx-auto w-full max-w-[320px] [perspective:1400px]">
          <div className="hero-device-glow pointer-events-none absolute -left-12 top-[18%] -z-20 h-40 w-40 rounded-full bg-[rgba(255,255,255,0.9)] blur-[72px]" />
          <div className="hero-device-glow hero-device-glow--delay pointer-events-none absolute -right-10 top-[12%] -z-20 h-48 w-48 rounded-full bg-[rgba(150,218,255,0.26)] blur-[86px]" />
          <div className="hero-device-glow pointer-events-none absolute -bottom-8 right-[12%] -z-20 h-36 w-36 rounded-full bg-[rgba(82,103,217,0.22)] blur-[74px]" />

          <div className="hero-device relative aspect-[9/19.5] w-full" onWheelCapture={handlePhoneWheel}>
            <div className="absolute -left-[0.96%] top-[24.6%] z-10 h-[4.1%] w-[0.72%] rounded-full bg-[linear-gradient(180deg,#d8dde5_0%,#919bac_24%,#56606f_64%,#161d28_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.42),inset_0_-1px_0_rgba(0,0,0,0.28),0_2px_4px_rgba(15,23,42,0.12)]">
              <div className="absolute inset-x-[22%] top-[12%] h-[18%] rounded-full bg-[rgba(255,255,255,0.32)]" />
            </div>
            <div className="absolute -left-[0.96%] top-[37.3%] z-10 h-[2.9%] w-[0.72%] rounded-full bg-[linear-gradient(180deg,#d8dde5_0%,#919bac_24%,#56606f_64%,#161d28_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.42),inset_0_-1px_0_rgba(0,0,0,0.28),0_2px_4px_rgba(15,23,42,0.12)]">
              <div className="absolute inset-x-[22%] top-[12%] h-[18%] rounded-full bg-[rgba(255,255,255,0.32)]" />
            </div>
            <div className="absolute -left-[0.96%] top-[47.4%] z-10 h-[4.1%] w-[0.72%] rounded-full bg-[linear-gradient(180deg,#d8dde5_0%,#919bac_24%,#56606f_64%,#161d28_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.42),inset_0_-1px_0_rgba(0,0,0,0.28),0_2px_4px_rgba(15,23,42,0.12)]">
              <div className="absolute inset-x-[22%] top-[12%] h-[18%] rounded-full bg-[rgba(255,255,255,0.32)]" />
            </div>

            <div className="hero-device-shell relative h-full rounded-[3.35rem] border border-white/32 bg-[linear-gradient(160deg,#eef2f8_0%,#b2bccb_9%,#707a8b_18%,#303847_31%,#121824_67%,#090d16_100%)] p-[0.42rem]">
              <div className="pointer-events-none absolute bottom-[5%] left-[0.18rem] top-[5%] w-[0.34rem] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0.18)_22%,rgba(255,255,255,0.02)_62%,rgba(0,0,0,0.3))]" />
              <div className="pointer-events-none absolute bottom-[6%] right-[0.22rem] top-[6%] w-[0.22rem] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0.02)_28%,rgba(0,0,0,0.36))]" />
              <div className="pointer-events-none absolute inset-[0.38rem] rounded-[3rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.07)_11%,rgba(255,255,255,0)_24%)]" />
              <div className="pointer-events-none absolute left-1/2 top-[0.78rem] z-20 h-[0.95rem] w-[5.7rem] -translate-x-1/2 rounded-full bg-[#05070d] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" />

              <div className="relative h-full overflow-hidden rounded-[3rem] border border-white/8 bg-[#070b14]">
                <div className="pointer-events-none absolute inset-x-[13%] top-0 z-10 h-[2px] bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.92)_22%,rgba(114,224,255,0.9)_76%,rgba(255,255,255,0))]" />

                <div className="relative h-full bg-[radial-gradient(circle_at_18%_0%,rgba(82,103,217,0.24),rgba(82,103,217,0)_32%),linear-gradient(165deg,#151b2d_0%,#0d1220_46%,#070b14_100%)] px-[9.5%] pb-[8.6%] pt-[17.5%] text-white">
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0)_24%,rgba(114,224,255,0.04)_58%,rgba(0,0,0,0.18)_100%)]" />
                  <div
                    ref={screenScrollRef}
                    className="relative z-10 flex h-full w-full flex-col justify-between overflow-y-auto overscroll-contain pointer-events-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                  >
                    <div className="shrink-0">
                      <div className="flex h-[clamp(2.85rem,16vw,3.5rem)] w-[clamp(2.85rem,16vw,3.5rem)] items-center justify-center rounded-[1.15rem] border border-white/10 bg-white/8 text-[clamp(1rem,5vw,1.125rem)] font-semibold tracking-tight text-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-sm">
                        {initials}
                      </div>

                      <div className="mt-7">
                        <p className="max-w-[92%] break-words text-[clamp(2rem,10vw,2.35rem)] font-semibold leading-[0.92] tracking-[-0.065em] text-white">
                          {displayName}
                        </p>
                        <p className="mt-3 line-clamp-3 text-[clamp(0.9rem,4vw,1rem)] text-white/66">
                          Undergrad Student, Computer Science
                        </p>
                        <p className="mt-1 text-[clamp(0.82rem,3.4vw,0.95rem)] text-white/28">State University</p>
                      </div>
                    </div>

                    <div className="flex-1 mt-4 space-y-2">
                      {detailRows.map((row) => (
                        <div
                          key={row.value}
                          className="flex items-center gap-3 border-b border-white/8 pb-3.5 text-[clamp(0.75rem,3.2vw,0.84rem)] text-white/72"
                        >
                          <row.icon className="h-4 w-4 flex-none text-white/35" />
                          <span className="min-w-0 truncate">{row.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="shrink-0 pt-8">
                      <div className="shrink-0 pb-2 flex justify-center">
                        <div className="flex h-[clamp(5rem,27vw,6rem)] w-[clamp(5rem,27vw,6rem)] items-center justify-center rounded-xl bg-white p-2 shadow-[0_18px_40px_rgba(4,9,18,0.45)]">
                          <QRCode
                            bgColor="transparent"
                            fgColor="#151a29"
                            size={80}
                            style={{ height: "100%", width: "100%" }}
                            value={qrValue}
                          />
                        </div>
                      </div>

                      <p className="mt-6 text-center text-[0.63rem] font-medium uppercase tracking-[0.34em] text-white/28">
                        Scan to connect <span className="mx-1 text-white/18">.</span>
                        <span className="font-semibold tracking-[0.28em] text-white/78"> Digicard</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(128deg,rgba(255,255,255,0.13),rgba(255,255,255,0)_24%,rgba(255,255,255,0)_64%,rgba(255,255,255,0.05)_100%)] mix-blend-screen" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
