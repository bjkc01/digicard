export function DashboardHeader() {
  return (
    <header className="panel flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="eyebrow">Workspace</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
          Welcome back, Sofia
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Here is a quick view of your published cards and recent activity.
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
        <div className="h-11 w-11 rounded-full bg-slate-900" />
        <div>
          <p className="text-sm font-semibold text-slate-900">Sofia Bennett</p>
          <p className="text-xs text-slate-500">Admin</p>
        </div>
      </div>
    </header>
  );
}
