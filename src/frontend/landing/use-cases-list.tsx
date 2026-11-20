import { AtSign, Globe, Phone } from "lucide-react";
import { ScrollReveal } from "@/frontend/landing/scroll-reveal";

// Homepage "When you'll use it" list: one row per situation, with the QR destination
// (the same LinkedIn / Website / Phone options as the create-card form) that suits it.

export type UseCase = {
  title: string;
  copy: string;
  qr: "LinkedIn" | "Website" | "Phone";
};

const qrIcon = { LinkedIn: AtSign, Website: Globe, Phone } as const;

export function UseCasesList({ items }: { items: readonly UseCase[] }) {
  return (
    <ScrollReveal className="mt-12 divide-y divide-[rgba(25,35,61,0.08)] border-y border-[rgba(25,35,61,0.08)]">
      {items.map((item) => {
        const Icon = qrIcon[item.qr];
        return (
          <div className="grid gap-3 py-7 md:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] md:gap-10" key={item.title}>
            <div>
              <h3 className="text-lg font-semibold tracking-[-0.02em] text-[var(--ink)]">{item.title}</h3>
              <p className="mt-2 flex items-center gap-2 text-xs text-[var(--muted)]">
                QR destination
                <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(82,103,217,0.2)] bg-white px-2.5 py-0.5 font-semibold text-[var(--brand)]">
                  <Icon aria-hidden="true" className="h-3 w-3" />
                  {item.qr}
                </span>
              </p>
            </div>
            <p className="max-w-2xl text-base leading-7 text-[#46536b]">{item.copy}</p>
          </div>
        );
      })}
    </ScrollReveal>
  );
}
