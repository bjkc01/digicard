import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit" | "reset";
};

const buttonStyles = {
  primary:
    "bg-accent text-white shadow-lg shadow-blue-600/20 hover:bg-accent-dark",
  secondary:
    "border border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50",
  ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
};

export function Button({
  children,
  className,
  href,
  variant = "primary",
  type = "button",
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-200",
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
    <button type={type} className={classes}>
      {children}
    </button>
  );
}
