import { ArrowRight, CreditCard, QrCode, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  actionHref?: string;
  actionLabel?: string;
  className?: string;
  description: string;
  kicker?: string;
  showAction?: boolean;
  title: string;
};

export function EmptyState({
  actionHref = "/create-card",
  actionLabel = "Create card",
  className,
  description,
  kicker,
  showAction = true,
  title,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "mt-6 overflow-hidden rounded-[1.5rem] border border-[rgba(82,103,217,0.12)] bg-[linear-gradient(180deg,#ffffff,#f8f9ff)] p-5 text-left shadow-[0_14px_36px_rgba(15,23,42,0.05)] sm:mt-8 sm:p-6",
        className,
      )}
    >
      <div className="grid gap-5 md:grid-cols-[13rem_minmax(0,1fr)] md:items-center">
        <div className="relative h-40 overflow-hidden rounded-[1.35rem] border border-[rgba(82,103,217,0.1)] bg-[radial-gradient(circle_at_25%_15%,rgba(82,103,217,0.16),transparent_30%),linear-gradient(135deg,#eef2ff,#ffffff)]">
          <div className="absolute left-7 top-8 h-24 w-36 rotate-[-7deg] rounded-[1.2rem] border border-white/80 bg-white shadow-[0_18px_42px_rgba(82,103,217,0.16)]" />
          <div className="absolute left-12 top-12 h-24 w-36 rotate-[5deg] rounded-[1.2rem] border border-[rgba(82,103,217,0.14)] bg-[linear-gradient(135deg,#4f46e5,#7c3aed)] p-4 text-white shadow-[0_18px_42px_rgba(82,103,217,0.2)]">
            <div className="flex items-center justify-between">
              <CreditCard className="h-5 w-5" />
              <Sparkles className="h-4 w-4 text-white/70" />
            </div>
            <div className="mt-5 h-2 w-20 rounded-full bg-white/65" />
            <div className="mt-2 h-2 w-14 rounded-full bg-white/35" />
          </div>
          <div className="absolute bottom-5 right-6 grid h-14 w-14 place-items-center rounded-2xl border border-white bg-white shadow-[0_14px_30px_rgba(15,23,42,0.1)]">
            <QrCode className="h-7 w-7 text-[var(--brand)]" />
          </div>
        </div>

        <div className="min-w-0">
          {kicker ? (
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand)]">
              {kicker}
            </p>
          ) : null}
          <h3 className="mt-1 text-xl font-semibold tracking-normal text-[var(--ink)]">
            {title}
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--muted)]">
            {description}
          </p>
          {showAction ? (
            <Button href={actionHref} className="mt-5 gap-2">
              {actionLabel}
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
