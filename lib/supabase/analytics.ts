import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export type DailyScan = {
  date: string;
  count: number;
};

export type CardScanSummary = {
  cardId: string;
  cardLabel: string;
  total: number;
};

export type AnalyticsData = {
  totalScans: number;
  scansThisWeek: number;
  scansToday: number;
  dailyScans: DailyScan[];
  byCard: CardScanSummary[];
};

export async function getAnalyticsData(userId: string): Promise<AnalyticsData> {
  const supabase = createSupabaseAdminClient();

  const profile = await supabase
    .from("profiles")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (!profile.data) {
    return emptyAnalytics();
  }

  const profileId = profile.data.id;

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  thirtyDaysAgo.setHours(0, 0, 0, 0);

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 7);
  weekStart.setHours(0, 0, 0, 0);

  const [eventsResult, totalResult, cardsResult] = await Promise.all([
    supabase
      .from("card_events")
      .select("card_id, created_at")
      .eq("profile_id", profileId)
      .eq("event_type", "qr_scan")
      .gte("created_at", thirtyDaysAgo.toISOString())
      .order("created_at", { ascending: true }),
    supabase
      .from("card_events")
      .select("*", { count: "exact", head: true })
      .eq("profile_id", profileId)
      .eq("event_type", "qr_scan"),
    supabase
      .from("workspace_cards")
      .select("id, label, name")
      .eq("profile_id", profileId),
  ]);

  const events = eventsResult.data ?? [];
  const cards = cardsResult.data ?? [];
  const cardMap = new Map(cards.map((c) => [c.id, c.label || c.name]));

  // Build 30-day buckets
  const dailyMap = new Map<string, number>();
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dailyMap.set(d.toISOString().slice(0, 10), 0);
  }
  for (const event of events) {
    const day = event.created_at.slice(0, 10);
    if (dailyMap.has(day)) {
      dailyMap.set(day, (dailyMap.get(day) ?? 0) + 1);
    }
  }

  const dailyScans: DailyScan[] = Array.from(dailyMap.entries()).map(([date, count]) => ({
    date,
    count,
  }));

  // Per-card counts
  const cardCounts = new Map<string, number>();
  for (const event of events) {
    cardCounts.set(event.card_id, (cardCounts.get(event.card_id) ?? 0) + 1);
  }
  const byCard: CardScanSummary[] = Array.from(cardCounts.entries())
    .map(([cardId, total]) => ({
      cardId,
      cardLabel: cardMap.get(cardId) ?? "Unnamed card",
      total,
    }))
    .sort((a, b) => b.total - a.total);

  const scansToday = events.filter((e) => new Date(e.created_at) >= todayStart).length;
  const scansThisWeek = events.filter((e) => new Date(e.created_at) >= weekStart).length;

  return {
    totalScans: totalResult.count ?? 0,
    scansThisWeek,
    scansToday,
    dailyScans,
    byCard,
  };
}

function emptyAnalytics(): AnalyticsData {
  const dailyScans: DailyScan[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dailyScans.push({ date: d.toISOString().slice(0, 10), count: 0 });
  }
  return { totalScans: 0, scansThisWeek: 0, scansToday: 0, dailyScans, byCard: [] };
}
