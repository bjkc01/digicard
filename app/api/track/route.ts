import { type NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const cardId = searchParams.get("cid");
  const redirectParam = searchParams.get("url");

  if (cardId) {
    try {
      const supabase = createSupabaseAdminClient();
      const { data: card } = await supabase
        .from("workspace_cards")
        .select("profile_id")
        .eq("id", cardId)
        .single();

      if (card) {
        await supabase.from("card_events").insert({
          card_id: cardId,
          profile_id: card.profile_id,
          event_type: "qr_scan",
        });
      }
    } catch {
      // Don't fail the redirect if tracking errors
    }
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
