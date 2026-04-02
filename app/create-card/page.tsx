import { Suspense } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { CreateCardForm } from "./create-card-form";

function FormSkeleton() {
  return (
    <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <div className="panel animate-pulse p-6 md:p-8">
        <div className="h-3 w-24 rounded-full bg-slate-200" />
        <div className="mt-5 h-8 w-64 rounded-2xl bg-slate-200" />
        <div className="mt-5 h-4 w-full rounded-full bg-slate-100" />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className={`space-y-2 ${i === 6 ? "md:col-span-2" : ""}`}>
              <div className="h-3 w-16 rounded-full bg-slate-200" />
              <div className="h-12 rounded-2xl bg-slate-100" />
            </div>
          ))}
        </div>
        <div className="mt-6 h-32 rounded-[28px] bg-slate-100" />
        <div className="mt-6 flex gap-3">
          <div className="h-12 w-28 rounded-xl bg-slate-200" />
          <div className="h-12 w-36 rounded-xl bg-slate-100" />
        </div>
      </div>
      <div className="panel animate-pulse p-5">
        <div className="mb-5 flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-3 w-24 rounded-full bg-slate-200" />
            <div className="h-3 w-36 rounded-full bg-slate-100" />
          </div>
          <div className="h-6 w-12 rounded-full bg-slate-100" />
        </div>
        <div className="h-[320px] rounded-[28px] bg-slate-100" />
      </div>
    </section>
  );
}

export default function CreateCardPage() {
  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6 lg:py-6">
      <Sidebar activePath="/create-card" />
      <Suspense fallback={<FormSkeleton />}>
        <CreateCardForm />
      </Suspense>
    </main>
  );
}
