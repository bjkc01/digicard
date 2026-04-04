export function DashboardHeader() {
  return (
    <header className="panel flex flex-col gap-4 border-[rgba(82,103,217,0.08)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(244,247,255,0.92))] p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="eyebrow text-[var(--brand)]">Workspace</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--ink)]">
          Welcome back, Sofia
        </h1>
        <p className="mt-2 text-[0.98rem] text-[var(--muted)]">
          Here is a quick view of your published cards and recent activity.
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-[1.4rem] border border-[rgba(82,103,217,0.08)] bg-white px-4 py-3 shadow-[0_10px_24px_rgba(21,32,58,0.04)]">
        <div className="h-12 w-12 rounded-full bg-[linear-gradient(135deg,_#172340,_#5267d9)]" />
        <div>
          <p className="text-sm font-semibold text-[var(--ink)]">Sofia Bennett</p>
          <p className="text-xs text-[var(--muted)]">Admin</p>
        </div>
      </div>
    </header>
  );
}
