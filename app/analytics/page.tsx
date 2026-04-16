export const dynamic = "force-dynamic";

import { Sidebar } from "@/components/dashboard/sidebar";
import { requireWorkspaceUser } from "@/lib/workspace-auth";
import { getWorkspaceView } from "@/lib/workspace-view";
import { getAnalyticsData } from "@/lib/supabase/analytics";
import { supabaseEnabled } from "@/lib/supabase-env";

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="panel border-[rgba(82,103,217,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(244,247,255,0.92))] p-5">
      <p className="text-sm font-medium text-[var(--ink-faint)]">{label}</p>
      <p className="mt-1 text-3xl font-bold tabular-nums text-[var(--ink)]">{value.toLocaleString()}</p>
    </div>
  );
}

function BarChart({ data }: { data: { date: string; count: number }[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  const showLabel = (i: number) => i === 0 || i === 14 || i === 29;

  return (
    <div>
      <div className="flex items-end gap-[3px] h-36">
        {data.map((day, i) => {
          const heightPct = Math.max((day.count / max) * 100, day.count > 0 ? 4 : 0);
          return (
            <div
              key={day.date}
              className="group relative flex-1 flex flex-col justify-end"
              style={{ height: "100%" }}
            >
              <div
                className="w-full rounded-t bg-indigo-500 transition-opacity group-hover:opacity-80"
                style={{ height: `${heightPct}%`, minHeight: day.count > 0 ? 3 : 0 }}
              />
              {/* Tooltip */}
              <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:flex flex-col items-center z-10">
                <div className="rounded bg-[var(--ink)] px-2 py-1 text-xs text-white whitespace-nowrap shadow-lg">
                  {day.count} scan{day.count !== 1 ? "s" : ""}
                  <div className="text-[10px] opacity-60">{day.date}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-1.5 flex justify-between text-[10px] text-[var(--ink-faint)]">
        {data.map((day, i) =>
          showLabel(i) ? (
            <span key={day.date} className="shrink-0">
              {new Date(day.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
          ) : null
        )}
      </div>
    </div>
  );
}

export default async function AnalyticsPage() {
  const workspaceUser = await requireWorkspaceUser("/analytics");
  const workspaceView = await getWorkspaceView(workspaceUser);
  const displayName = workspaceView.settings.profile.name || workspaceUser.name;
  const displayEmail = workspaceView.settings.profile.email || workspaceUser.email;
  const avatarUrl = workspaceView.settings.profile.avatarUrl;

  const analytics = supabaseEnabled
    ? await getAnalyticsData(workspaceUser.id)
    : { totalScans: 0, scansThisWeek: 0, scansToday: 0, dailyScans: [], byCard: [] };

  const hasData = analytics.totalScans > 0;

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6 lg:py-6">
      <Sidebar activePath="/analytics" avatarUrl={avatarUrl} email={displayEmail} userName={displayName} />

      <section className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--ink)]">Analytics</h1>
          <p className="mt-1 text-sm text-[var(--ink-faint)]">QR scan activity across all your cards.</p>
        </div>

        {!supabaseEnabled ? (
          <div className="panel border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
            Analytics requires Supabase. Connect your database in settings to start tracking scans.
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard label="Total scans" value={analytics.totalScans} />
              <StatCard label="Last 7 days" value={analytics.scansThisWeek} />
              <StatCard label="Today" value={analytics.scansToday} />
            </div>

            <div className="panel border-[rgba(82,103,217,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(244,247,255,0.92))] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[var(--ink)]">QR scans — last 30 days</p>
                {hasData && (
                  <span className="text-xs text-[var(--ink-faint)]">Hover bars for details</span>
                )}
              </div>
              {analytics.dailyScans.length > 0 ? (
                <BarChart data={analytics.dailyScans} />
              ) : (
                <p className="text-sm text-[var(--ink-faint)] py-8 text-center">No scans recorded yet.</p>
              )}
            </div>

            {analytics.byCard.length > 0 && (
              <div className="panel border-[rgba(82,103,217,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(244,247,255,0.92))] p-6 space-y-4">
                <p className="text-sm font-semibold text-[var(--ink)]">Scans by card (last 30 days)</p>
                <div className="divide-y divide-[var(--border)]">
                  {analytics.byCard.map((card) => (
                    <div key={card.cardId} className="flex items-center justify-between py-3">
                      <span className="text-sm text-[var(--ink)]">{card.cardLabel}</span>
                      <span className="text-sm font-semibold tabular-nums text-[var(--ink)]">
                        {card.total.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!hasData && (
              <div className="panel border-[rgba(82,103,217,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(244,247,255,0.92))] p-8 text-center">
                <p className="text-sm font-medium text-[var(--ink)]">No scans yet</p>
                <p className="mt-1 text-sm text-[var(--ink-faint)]">
                  Share your card and scans will appear here automatically.
                </p>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
