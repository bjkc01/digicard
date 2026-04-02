export function DashboardHeader() {
  return (
    <header className="panel flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-400">
          Workspace
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
          Welcome back, Sofia
        </h1>
      </div>

      <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2">
        <div className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-500 to-slate-900" />
        <div>
          <p className="text-sm font-semibold text-slate-900">Sofia Bennett</p>
          <p className="text-xs text-slate-500">Admin</p>
        </div>
      </div>
    </header>
  );
}
