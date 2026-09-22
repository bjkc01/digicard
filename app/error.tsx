"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="flex min-h-dvh items-center justify-center px-5"><div role="alert" className="panel max-w-md p-8 text-center"><AlertCircle className="mx-auto h-8 w-8 text-[var(--brand)]" /><h1 className="mt-5 text-2xl font-semibold">Let’s try that again</h1><p className="mt-3 text-sm leading-6 text-[var(--muted)]">We couldn’t load this page. Try again, or return to your workspace.</p><div className="mt-6 flex flex-wrap justify-center gap-3"><button onClick={reset} className="min-h-11 rounded-xl bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white">Try again</button><Link href="/dashboard" className="min-h-11 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold">Go to workspace</Link></div></div></main>;
}
