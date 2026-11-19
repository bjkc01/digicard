"use client";

import type { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";

export function PendingSubmit({ children, disabled, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();
  return <button {...props} type="submit" disabled={disabled || pending} aria-busy={pending}>
    {pending ? <span role="status" className="inline-flex items-center justify-center gap-2 py-2"><LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" />Please wait…</span> : children}
  </button>;
}
