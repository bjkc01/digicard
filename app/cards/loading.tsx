export default function CardsLoading() {
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

      <section className="min-w-0 space-y-4 sm:space-y-6">
        <div className="panel p-5 sm:p-6">
          <div className="space-y-4">
            <div className="h-4 w-20 animate-pulse rounded-full bg-slate-100" />
            <div className="h-11 w-44 animate-pulse rounded-2xl bg-slate-200" />
            <div className="flex flex-wrap gap-2">
              <div className="h-7 w-24 animate-pulse rounded-full bg-slate-100" />
              <div className="h-7 w-32 animate-pulse rounded-full bg-slate-100" />
            </div>
            <div className="h-12 w-full animate-pulse rounded-full bg-slate-100 sm:w-56" />
          </div>
        </div>

        <div className="grid min-w-0 gap-4 sm:gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="panel p-5 sm:p-6">
            <div className="space-y-4">
              <div className="h-4 w-24 animate-pulse rounded-full bg-slate-100" />
              <div className="h-10 w-36 animate-pulse rounded-2xl bg-slate-200" />
              <div className="h-5 w-56 animate-pulse rounded-full bg-slate-100" />
              <div className="mt-6 rounded-[28px] bg-slate-50 p-6">
                <div className="h-32 animate-pulse rounded-[24px] bg-white" />
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="panel h-48 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
