import Image from "next/image";
import { cn } from "@/frontend/utils";

// The DigiCard logo: two stacked ID cards, the front one with a person, text lines and a QR motif.
// Artwork: public/brand/digicard-mark.png (transparent PNG, 437px square). Browser-tab icons are
// public/brand/icon-32.png and icon-64.png (set in src/app/layout.tsx).
const LOGO_SRC = "/brand/digicard-mark.png";

type LogoMarkProps = {
  className?: string;
  /** Rendered size in px (CSS classes can still override it). */
  size?: number;
  /** Load immediately; use for the logo in the page header. */
  priority?: boolean;
};

/** The logo tile on its own. Decorative: pair it with the "DigiCard" name in text. */
export function LogoMark({ className, size = 44, priority = false }: LogoMarkProps) {
  return <Image alt="" aria-hidden="true" className={className} height={size} priority={priority} src={LOGO_SRC} width={size} />;
}

type BrandMarkProps = {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  tagline?: string;
};

/** Logo tile + "DigiCard" wordmark, as used in the app sidebar, mobile menu and 404 page. */
export function BrandMark({ className, markClassName, showWordmark = true, tagline = "Digital ID" }: BrandMarkProps) {
  return (
    <div className={cn("flex min-w-0 items-center gap-3", className)}>
      <LogoMark className={cn("h-11 w-11 shrink-0 drop-shadow-[0_8px_14px_rgba(88,80,236,0.28)]", markClassName)} />

      {showWordmark ? (
        <div className="min-w-0">
          <p className="text-[1.05rem] font-extrabold leading-tight text-[var(--ink)]">DigiCard</p>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">{tagline}</p>
        </div>
      ) : null}
    </div>
  );
}
