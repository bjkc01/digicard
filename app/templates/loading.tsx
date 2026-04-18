export default function TemplatesLoading() {
  return (
    <main className="mx-auto grid w-full max-w-7xl min-w-0 gap-4 px-3 py-3 sm:px-4 sm:py-4 lg:gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6 lg:py-6">
      <div className="panel hidden h-fit flex-col gap-8 p-6 lg:flex">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-6">
          <div className="h-12 w-12 animate-pulse rounded-2xl bg-slate-200" />
          <div className="h-5 w-28 animate-pulse rounded-full bg-slate-100" />
        </div>
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-11 animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
      </div>

      <section className="panel min-w-0 p-5 sm:p-6 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <div className="h-11 w-72 max-w-full animate-pulse rounded-2xl bg-slate-200" />
          </div>
          <div className="h-12 w-full animate-pulse rounded-full bg-slate-100 sm:w-52" />
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {["All", "Corporate", "Creative", "Bold", "Minimal"].map((label) => (
            <div key={label} className="h-10 w-24 shrink-0 animate-pulse rounded-full bg-slate-100" />
          ))}
        </div>

        <div className="mt-6 grid min-w-0 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="subtle-panel p-4">
              <div className="rounded-[22px] bg-slate-100 p-4">
                <div className="mx-auto h-72 w-[148px] animate-pulse rounded-[24px] bg-white/80" />
              </div>
              <div className="mt-4 space-y-3 px-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="h-6 w-32 animate-pulse rounded-full bg-slate-200" />
                  <div className="h-8 w-24 animate-pulse rounded-full bg-slate-100" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full animate-pulse rounded-full bg-slate-100" />
                  <div className="h-4 w-4/5 animate-pulse rounded-full bg-slate-100" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
