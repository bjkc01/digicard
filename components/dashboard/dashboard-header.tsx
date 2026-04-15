type DashboardHeaderProps = {
  email: string;
  subtitle: string;
  userName: string;
};

export function DashboardHeader({ email, subtitle, userName }: DashboardHeaderProps) {
  return (
    <header className="panel flex flex-col gap-4 border-[rgba(82,103,217,0.08)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(244,247,255,0.92))] p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--ink)]">
          Welcome back, {userName}
        </h1>
        <p className="mt-2 text-[0.98rem] text-[var(--muted)]">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-[1.4rem] border border-[rgba(82,103,217,0.08)] bg-white px-4 py-3 shadow-[0_10px_24px_rgba(21,32,58,0.04)]">
        <div className="h-12 w-12 rounded-full bg-[linear-gradient(135deg,_#172340,_#5267d9)]" />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[var(--ink)]">{userName}</p>
          <p className="truncate text-xs text-[var(--muted)]">{email}</p>
        </div>
      </div>
    </header>
  );
}
