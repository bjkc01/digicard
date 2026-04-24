export default function DashboardLoading() {
  return (
    <main className="workspace-shell">
      <div className="hidden h-full min-h-dvh border-r border-slate-200/80 bg-white p-5 lg:block">
        <div className="flex items-center gap-3 border-b border-slate-200/80 pb-5">
          <div className="h-11 w-11 animate-pulse rounded-2xl bg-slate-200" />
          <div className="space-y-2">
            <div className="h-4 w-24 animate-pulse rounded-full bg-slate-200" />
            <div className="h-3 w-16 animate-pulse rounded-full bg-slate-100" />
          </div>
        </div>
        <div className="mt-5 space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-11 animate-pulse rounded-xl bg-slate-100" />
          ))}
        </div>
      </div>

      <section className="workspace-content space-y-6">
        <div className="space-y-2">
          <div className="h-4 w-32 animate-pulse rounded-full bg-slate-200" />
          <div className="h-10 w-48 animate-pulse rounded-xl bg-slate-200" />
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="panel p-6">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div className="h-8 w-44 animate-pulse rounded-xl bg-slate-200" />
              <div className="h-11 w-40 animate-pulse rounded-full bg-slate-100" />
            </div>
            <div className="rounded-2xl bg-slate-50 p-6">
              <div className="h-40 animate-pulse rounded-2xl bg-white" />
            </div>
          </div>
          <div className="space-y-6">
            <div className="panel h-44 animate-pulse" />
            <div className="panel h-52 animate-pulse" />
            <div className="panel h-44 animate-pulse" />
          </div>
        </div>
      </section>
    </main>
  );
}
