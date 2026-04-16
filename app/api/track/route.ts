import { type NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const cardId = searchParams.get("cid");
  const redirectParam = searchParams.get("url");

  const profileId = searchParams.get("pid");

  if (cardId && profileId) {
    try {
      const supabase = createSupabaseAdminClient();
      const { error } = await supabase.from("card_events").insert({
        card_id: cardId,
        profile_id: profileId,
        event_type: "qr_scan",
      });
      if (error) console.error("[track] insert error:", error.message, error.code, { cardId, profileId });
    } catch (err) {
      console.error("[track] unexpected error:", err);
    }
  } else if (cardId) {
    // Fallback: look up profile_id via workspace_cards (extra cards only)
    try {
      const supabase = createSupabaseAdminClient();
      const { data: card } = await supabase
        .from("workspace_cards")
        .select("profile_id")
        .eq("id", cardId)
        .single();
      if (card) {
        const { error } = await supabase.from("card_events").insert({
          card_id: cardId,
          profile_id: card.profile_id,
          event_type: "qr_scan",
        });
        if (error) console.error("[track] insert error (fallback):", error.message, error.code, { cardId });
      }
    } catch (err) {
      console.error("[track] unexpected fallback error:", err);
    }
  } else {
    console.warn("[track] missing cid or pid — not recording", { cardId, profileId: searchParams.get("pid") });
  }

  if (redirectParam) {
    try {
      const target = new URL(redirectParam);
      // Only allow http/https/mailto redirects
      if (["http:", "https:", "mailto:"].includes(target.protocol)) {
        return NextResponse.redirect(target.toString());
      }
    } catch {
      // invalid URL — fall through
    }
  }

  return NextResponse.redirect(new URL("/", origin));
}
