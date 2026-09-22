import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, QrCode } from "lucide-react";
import { HomeAuthModal } from "@/components/login/home-auth-modal";

type PremiumHeaderProps = {
  children: ReactNode;
  showAuthModal: boolean;
  signedIn?: boolean;
};

const navLinks = [
  { href: "#live-preview", label: "The card" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#use-cases", label: "Use cases" },
] as const;

export function PremiumHeader({ children, showAuthModal, signedIn = false }: PremiumHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#d9d9ce] bg-[#f6f4ee]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-5 py-3 sm:gap-4 sm:px-10 sm:py-4 lg:px-16">
        <Link href="/" className="flex min-h-[44px] min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#253a32] sm:h-11 sm:w-11">
            <QrCode className="h-5 w-5 text-[#f6f4ee]" />
          </div>
          <div className="min-w-0">
            <p className="text-base font-extrabold tracking-[-0.05em] text-[#253a32] sm:text-lg">DigiCard<span className="text-[#bd6348]">.</span></p>
            <p className="hidden text-[10px] font-medium tracking-wide text-[#697268] sm:block">THE DIGITAL INTRODUCTION</p>
          </div>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex min-h-[44px] items-center rounded-full px-4 py-2 text-sm font-medium text-[#536256] transition hover:bg-[#e7e9df] hover:text-[#253a32]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {!signedIn ? <HomeAuthModal
            initiallyOpen={showAuthModal}
            buttonClassName="inline-flex min-h-[44px] items-center rounded-full px-2 py-2 text-sm font-semibold text-[#253a32] transition hover:text-[#bd6348] sm:px-4"
            callbackUrl="/dashboard"
          >
            {children}
          </HomeAuthModal> : null}
          <Link
            href="/dashboard"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#253a32] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#38584a] sm:px-5"
          >
            {signedIn ? "My workspace" : "Get started"}
            <ArrowUpRight className="hidden h-4 w-4 sm:block" />
          </Link>
        </div>
      </div>
    </header>
  );
}
