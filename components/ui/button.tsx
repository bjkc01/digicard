import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
};

const buttonStyles = {
  primary:
    "bg-[var(--brand)] text-white shadow-[0_14px_30px_rgba(82,103,217,0.22)] hover:bg-[var(--brand-dark)]",
  secondary:
    "border border-[rgba(82,103,217,0.18)] bg-white text-[var(--ink)] hover:border-[rgba(82,103,217,0.34)] hover:bg-[var(--brand-soft)]",
  ghost: "text-[var(--muted)] hover:bg-[var(--brand-soft)] hover:text-[var(--ink)]",
  destructive:
    "bg-red-600 text-white shadow-[0_14px_30px_rgba(220,38,38,0.18)] hover:bg-red-700",
};

export function Button({
  children,
  className,
  href,
  variant = "primary",
  type = "button",
  onClick,
  disabled,
}: ButtonProps) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60",
    buttonStyles[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
