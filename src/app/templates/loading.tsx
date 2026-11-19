export default function TemplatesLoading() {
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

      <section className="workspace-content">
        <div className="panel min-w-0 p-5 sm:p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <div className="h-9 w-80 max-w-full animate-pulse rounded-xl bg-slate-200" />
              <div className="h-4 w-[28rem] max-w-full animate-pulse rounded-full bg-slate-100" />
            </div>
            <div className="h-11 w-full animate-pulse rounded-full bg-slate-100 sm:w-44" />
          </div>

          <div className="mt-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {["All", "Corporate", "Creative", "Bold", "Minimal"].map((label) => (
              <div key={label} className="h-10 w-24 shrink-0 animate-pulse rounded-full bg-slate-100" />
            ))}
          </div>

          <div className="mt-6 grid min-w-0 gap-4 sm:gap-6 xl:grid-cols-2 2xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="subtle-panel p-4">
                <div className="rounded-2xl bg-slate-100 p-5">
                  <div className="mx-auto aspect-[432/764] w-[208px] max-w-full animate-pulse rounded-[22px] bg-white" />
                </div>
                <div className="mt-4 space-y-3 px-1">
                  <div className="h-6 w-36 animate-pulse rounded-full bg-slate-200" />
                  <div className="space-y-2">
                    <div className="h-4 w-full animate-pulse rounded-full bg-slate-100" />
                    <div className="h-4 w-4/5 animate-pulse rounded-full bg-slate-100" />
                  </div>
                  <div className="h-9 w-32 animate-pulse rounded-full bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
