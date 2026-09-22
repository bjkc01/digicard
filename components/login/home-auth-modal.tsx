"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";

type HomeAuthModalProps = {
  buttonClassName?: string;
  buttonLabel?: string;
  callbackUrl?: string;
  children?: React.ReactNode;
  initiallyOpen?: boolean;
};

const authQueryKeys = ["auth", "callbackUrl", "email", "error", "method", "notice", "step"];

export function HomeAuthModal({
  buttonClassName,
  buttonLabel = "Sign in",
  callbackUrl = "/dashboard",
  children,
  initiallyOpen = false,
}: HomeAuthModalProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(initiallyOpen);
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(initiallyOpen);
  }, [initiallyOpen]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (open) {
      document.body.style.overflow = "hidden";
      document.body.dataset.authModalOpen = "true";
    }

    const main = document.querySelector("main");
    const wasInert = main?.inert ?? false;
    if (open && main) main.inert = true;

    return () => {
      document.body.style.overflow = previousOverflow;
      delete document.body.dataset.authModalOpen;
      if (main) main.inert = wasInert;
    };
  }, [open]);

  const closedHref = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());

    authQueryKeys.forEach((key) => {
      params.delete(key);
    });

    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  }, [pathname, searchParams]);

  const openHref = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("auth", "login");
    params.set("callbackUrl", callbackUrl);

    return `${pathname}?${params.toString()}`;
  }, [callbackUrl, pathname, searchParams]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const trigger = triggerRef.current;
    dialogRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        router.replace(closedHref, { scroll: false });
      }
      if (event.key === "Tab") {
        const items = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), [tabindex="0"]') ?? []).filter(item => item.getClientRects().length > 0);
        const first = items[0];
        const last = items[items.length - 1];
        if (!first) { event.preventDefault(); return; }
        if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialogRef.current)) { event.preventDefault(); first.focus(); }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      const target = previousFocus?.isConnected && previousFocus !== document.body ? previousFocus : trigger;
      target?.focus();
    };
  }, [closedHref, open, router, mounted]);

  function handleOpen() {
    setOpen(true);
    router.push(openHref, { scroll: false });
  }

  function handleClose() {
    setOpen(false);
    router.replace(closedHref, { scroll: false });
  }

  return (
    <>
      <button ref={triggerRef} type="button" aria-haspopup="dialog" aria-expanded={open} className={buttonClassName} onClick={handleOpen}>
        {buttonLabel}
      </button>

      {mounted && open
        ? createPortal(
            <div
              className="fixed inset-0 z-[120] flex items-center justify-center px-4 py-8"
              onClick={(event) => {
                if (event.target === event.currentTarget) {
                  handleClose();
                }
              }}
            >
              <div aria-hidden="true" onClick={handleClose} className="auth-modal-backdrop absolute inset-0 bg-[rgba(12,18,31,0.42)] backdrop-blur-[12px]" />

              <div
                role="dialog"
                ref={dialogRef}
                tabIndex={-1}
                aria-modal="true"
                aria-label="Sign in to DigiCard"
                className="auth-modal-panel relative"
              >
                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute -right-3 -top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-[var(--ink)] shadow-[0_4px_16px_rgba(15,23,42,0.18)] transition hover:bg-slate-50"
                  aria-label="Close sign in"
                >
                  <X className="h-4 w-4" />
                </button>

                {children ?? (
                  <div className="w-[min(calc(100vw-2rem),29rem)] rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.22),0_4px_16px_rgba(15,23,42,0.08)]">
                    <div className="h-5 w-28 animate-pulse rounded-full bg-slate-200" />
                    <div className="mt-6 h-8 w-64 max-w-full animate-pulse rounded-2xl bg-slate-200" />
                    <div className="mt-4 space-y-3">
                      <div className="h-16 animate-pulse rounded-[1.3rem] bg-slate-100" />
                      <div className="h-16 animate-pulse rounded-[1.3rem] bg-slate-100" />
                    </div>
                  </div>
                )}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
