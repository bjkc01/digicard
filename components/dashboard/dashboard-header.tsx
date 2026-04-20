import Link from "next/link";
import { ProfileAvatar } from "@/components/ui/profile-avatar";

type DashboardHeaderProps = {
  avatarUrl?: string;
  email: string;
  subtitle?: string;
  userName: string;
};

export function DashboardHeader({ avatarUrl, email, subtitle, userName }: DashboardHeaderProps) {
  return (
    <header className="panel hidden flex-col gap-4 border-[rgba(82,103,217,0.08)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(244,247,255,0.92))] p-5 sm:flex sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="min-w-0">
        <h1 className="overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(1.6rem,6.4vw,2.25rem)] font-semibold leading-[1.08] tracking-tight text-[var(--ink)] sm:text-3xl">
          Welcome back, {userName}
        </h1>
        {subtitle ? (
          <p className="mt-2 text-[0.98rem] text-[var(--muted)]">
            {subtitle}
          </p>
        ) : null}
      </div>

      <Link
        href="/settings"
        aria-label={`Open profile settings for ${userName}`}
        className="flex w-full min-w-0 max-w-full items-center gap-3 rounded-[1.4rem] border border-[rgba(82,103,217,0.08)] bg-white px-4 py-3 shadow-[0_10px_24px_rgba(21,32,58,0.04)] transition hover:-translate-y-0.5 hover:border-[rgba(82,103,217,0.18)] hover:shadow-[0_16px_30px_rgba(21,32,58,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(82,103,217,0.35)] focus-visible:ring-offset-2 sm:w-auto"
      >
        <ProfileAvatar
          avatarUrl={avatarUrl}
          className="h-12 w-12 rounded-full shadow-[0_12px_24px_rgba(82,103,217,0.18)]"
          name={userName}
          textClassName="text-sm"
        />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[var(--ink)]">{userName}</p>
          <p className="truncate text-xs text-[var(--muted)]">{email}</p>
        </div>
      </Link>
    </header>
  );
}
