import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { BrandMark } from "@/components/ui/brand-mark";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-[var(--canvas)] px-4 py-10">
      <section className="panel max-w-lg p-6 text-center sm:p-8">
        <div className="flex justify-center">
          <BrandMark />
        </div>
        <div className="mx-auto mt-8 grid h-20 w-20 place-items-center rounded-[1.25rem] bg-[var(--brand-soft)] text-[var(--brand)]">
          <Home className="h-9 w-9" />
        </div>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--brand)]">
          404
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-[var(--ink)]">
          This card slipped out of the stack.
        </h1>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
          The page you are looking for does not exist, or the link has changed.
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(82,103,217,0.22)] transition hover:bg-[var(--brand-dark)]"
        >
          Back to Dashboard
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}
