import Link from "next/link";
import type { ReactNode } from "react";
import { HomeAuthModal } from "@/frontend/login/home-auth-modal";
import { LogoMark } from "@/frontend/ui/brand-mark";

type PremiumHeaderProps = {
  children: ReactNode;
  showAuthModal: boolean;
  signedIn?: boolean;
};

const navLinks = [
  { href: "#live-preview", label: "Preview" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#use-cases", label: "Use cases" },
] as const;

export function PremiumHeader({ children, showAuthModal, signedIn = false }: PremiumHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
        <Link href="/" className="flex min-h-[44px] min-w-0 items-center gap-3">
          <LogoMark className="h-10 w-10 flex-shrink-0 drop-shadow-[0_8px_14px_rgba(88,80,236,0.28)] sm:h-11 sm:w-11" priority />
          <div className="min-w-0">
            <p className="text-base font-extrabold tracking-tight text-[var(--ink)] sm:text-lg">DigiCard</p>
            <p className="hidden text-xs font-medium text-[var(--muted)] sm:block">Student-first networking cards</p>
          </div>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex min-h-[44px] items-center rounded-full px-4 py-2 text-sm font-medium text-gray-500 transition-[background-color,color] duration-200 ease-in-out hover:bg-gray-100 hover:text-gray-900 focus-visible:bg-gray-100 focus-visible:text-gray-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {!signedIn ? <HomeAuthModal
            initiallyOpen={showAuthModal}
            buttonClassName="inline-flex min-h-[38px] items-center rounded-full px-3 py-2 text-sm font-semibold text-[var(--muted)] transition hover:bg-[var(--soft)] hover:text-[var(--ink)] sm:min-h-[44px] sm:px-4"
            callbackUrl="/dashboard"
          >
            {children}
          </HomeAuthModal> : null}
          <Link
            href="/dashboard"
            className="inline-flex min-h-11 items-center rounded-xl bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--brand-dark)]"
          >
            {signedIn ? "My workspace" : "Get started"}
          </Link>
        </div>
      </div>
    </header>
  );
}
