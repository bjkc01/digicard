import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
};

export function BrandMark({
  className,
  markClassName,
  showWordmark = true,
}: BrandMarkProps) {
  return (
    <div className={cn("flex min-w-0 items-center gap-3", className)}>
      <div
        aria-hidden="true"
        className={cn(
          "relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#4f46e5,#7c3aed)] text-white shadow-[0_14px_30px_rgba(79,70,229,0.24)]",
          markClassName,
        )}
      >
        <span className="absolute -right-3 -top-3 h-8 w-8 rounded-full bg-white/20" />
        <span className="absolute bottom-2 right-2 h-2 w-5 rounded-full bg-white/35" />
        <span className="relative text-[1.05rem] font-extrabold leading-none tracking-normal">
          D
        </span>
      </div>

      {showWordmark ? (
        <div className="min-w-0">
          <p className="text-[1.05rem] font-extrabold leading-tight text-[var(--ink)]">
            DigiCard
          </p>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            Digital ID
          </p>
        </div>
      ) : null}
    </div>
  );
}
