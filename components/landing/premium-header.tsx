"use client";

import Link from "next/link";
import { CreditCard, Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HomeAuthModal } from "@/components/login/home-auth-modal";
import NavHeader from "@/components/ui/nav-header";

type PremiumHeaderProps = {
  children: React.ReactNode;
  showAuthModal: boolean;
};

const navLinks = [
  { href: "#live-preview", label: "Preview" },
  { href: "#why-it-matters", label: "Why it matters" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#use-cases", label: "Use cases" },
] as const;

export function PremiumHeader({ children, showAuthModal }: PremiumHeaderProps) {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const lastScrollYRef = useRef(0);
  const stickyStartRef = useRef(0);
  const navVisibleRef = useRef(true);

  useEffect(() => {
    const updateStickyStart = () => {
      stickyStartRef.current = headerRef.current?.offsetTop ?? 0;
    };

    const syncVisibility = (nextVisible: boolean) => {
      if (navVisibleRef.current === nextVisible) {
        return;
      }

      navVisibleRef.current = nextVisible;
      setIsNavVisible(nextVisible);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollYRef.current;
      const passedBanner = currentScrollY > stickyStartRef.current + 8;

      setIsScrolled(currentScrollY > 520);

      if (!passedBanner || currentScrollY <= 8) {
        syncVisibility(true);
      } else if (Math.abs(scrollDelta) > 8) {
        syncVisibility(scrollDelta < 0);
      }

      lastScrollYRef.current = currentScrollY;
    };

    updateStickyStart();
    handleScroll();

    window.addEventListener("resize", updateStickyStart);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", updateStickyStart);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full transition-transform duration-300 ease-out ${
        isNavVisible ? "translate-y-0" : "-translate-y-full"
      } ${isNavVisible ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5 transition-colors duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-md" : ""
        }`}>
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#172340,_#5267d9)] shadow-[0_16px_30px_rgba(82,103,217,0.18)]">
            <CreditCard className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className={`text-lg font-semibold tracking-tight transition-colors duration-300 ${isScrolled ? "text-[var(--ink)]" : "text-white"}`}>DigiCard</p>
            <p className={`text-xs font-medium transition-colors duration-300 ${isScrolled ? "text-[var(--muted)]" : "text-white/60"}`}>Student-first networking cards</p>
          </div>
        </Link>

        <NavHeader items={navLinks} className="hidden lg:block" />

        <div className="flex items-center gap-2">
          <HomeAuthModal
            initiallyOpen={showAuthModal}
            buttonClassName={`hidden rounded-full px-4 py-2 text-sm font-semibold transition sm:inline-flex ${
              isScrolled
                ? "text-[var(--muted)] hover:bg-[var(--soft)] hover:text-[var(--ink)]"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
            callbackUrl="/dashboard"
          >
            {children}
          </HomeAuthModal>
          <Link
            href="/dashboard"
            className="hidden rounded-full bg-[#5267d9] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(82,103,217,0.3)] transition hover:bg-[#6278e8] hover:shadow-[0_12px_28px_rgba(82,103,217,0.4)] sm:inline-flex"
          >
            Create my card
          </Link>
          <button
            type="button"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden ${
              isScrolled ? "border-[rgba(25,35,61,0.08)] text-[var(--ink)]" : "border-white/20 text-white"
            }`}
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
