export default function CardsLoading() {
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

      <section className="workspace-content space-y-4 sm:space-y-6">
        <div className="panel p-5 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <div className="h-10 w-44 animate-pulse rounded-xl bg-slate-200" />
              <div className="h-7 w-28 animate-pulse rounded-full bg-slate-100" />
            </div>
            <div className="h-11 w-full animate-pulse rounded-full bg-slate-100 sm:w-56" />
          </div>
        </div>

        <div className="grid min-w-0 gap-4 sm:gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="panel p-5 sm:p-6">
            <div className="space-y-4">
              <div className="h-8 w-36 animate-pulse rounded-xl bg-slate-200" />
              <div className="h-5 w-56 animate-pulse rounded-full bg-slate-100" />
              <div className="grid gap-3 rounded-2xl bg-slate-50 p-3 sm:grid-cols-[minmax(0,1fr)_12rem]">
                <div className="h-11 animate-pulse rounded-xl bg-white" />
                <div className="h-11 animate-pulse rounded-xl bg-white" />
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {[1, 2].map((i) => (
                  <div key={i} className="aspect-[432/764] animate-pulse rounded-[22px] bg-slate-100" />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="panel h-40 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
