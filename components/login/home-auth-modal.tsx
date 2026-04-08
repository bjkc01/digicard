"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";

type HomeAuthModalProps = {
  buttonClassName?: string;
  buttonLabel?: string;
  callbackUrl?: string;
  children: React.ReactNode;
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

  useEffect(() => {
    setOpen(initiallyOpen);
  }, [initiallyOpen]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (open) {
      document.body.style.overflow = "hidden";
      document.body.dataset.authModalOpen = "true";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      delete document.body.dataset.authModalOpen;
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

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        router.replace(closedHref, { scroll: false });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closedHref, open, router]);

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
      <button type="button" className={buttonClassName} onClick={handleOpen}>
        {buttonLabel}
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center px-4 py-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              handleClose();
            }
          }}
        >
          <div className="auth-modal-backdrop absolute inset-0 bg-black/55 backdrop-blur-[6px]" />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Sign in to DigiCard"
            className="auth-modal-panel relative z-10"
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute -right-3 -top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-[var(--ink)] shadow-[0_4px_16px_rgba(15,23,42,0.18)] transition hover:bg-slate-50"
              aria-label="Close sign in"
            >
              <X className="h-4 w-4" />
            </button>

            {children}
          </div>
        </div>
      ) : null}
    </>
  );
}
