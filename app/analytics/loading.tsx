export default function AnalyticsLoading() {
  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6 lg:py-6">
      <div className="panel flex h-fit flex-col gap-8 p-6">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-6">
          <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200" />
          <div className="space-y-2">
            <div className="h-3 w-20 animate-pulse rounded-full bg-slate-200" />
            <div className="h-3 w-28 animate-pulse rounded-full bg-slate-100" />
          </div>
        </div>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-11 animate-pulse rounded-xl bg-slate-100" />
          ))}
        </div>
      </div>

      <section className="space-y-6">
        <div className="space-y-2">
          <div className="h-7 w-32 animate-pulse rounded-2xl bg-slate-200" />
          <div className="h-4 w-56 animate-pulse rounded-full bg-slate-100" />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="panel h-24 animate-pulse" />
          ))}
        </div>

        <div className="panel h-56 animate-pulse" />
      </section>
    </main>
  );
}
