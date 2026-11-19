type DashboardHeaderProps = {
  avatarUrl?: string;
  email: string;
  subtitle?: string;
  userName: string;
};

export function DashboardHeader({
  subtitle,
  userName,
}: DashboardHeaderProps) {
  const firstName = userName.split(" ")[0] || userName;

  return (
    <header className="flex flex-col gap-1.5 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <p className="text-sm font-medium text-[var(--muted)]">
          Welcome back, {firstName}
        </p>
        <h1 className="page-title">Dashboard</h1>
      </div>
      {subtitle ? (
        <p className="max-w-xl text-sm leading-6 text-[var(--muted)] sm:text-right">
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}
