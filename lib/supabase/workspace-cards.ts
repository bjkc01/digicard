import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type {
  SupabaseWorkspaceCard,
  SupabaseWorkspaceCardInsert,
} from "@/lib/supabase/types";

export async function getSupabaseWorkspaceCardsByProfileId(profileId: string) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("workspace_cards")
    .select("*")
    .eq("profile_id", profileId)
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to load workspace cards for profile ${profileId}: ${error.message}`);
  }

  return data satisfies SupabaseWorkspaceCard[];
}

export async function upsertSupabaseWorkspaceCard(card: SupabaseWorkspaceCardInsert) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("workspace_cards")
    .upsert(card, { onConflict: "id" })
    .select("*")
    .single();

  if (error) {
    throw new Error(`Failed to upsert workspace card ${card.id}: ${error.message}`);
  }

  return data satisfies SupabaseWorkspaceCard;
}

export async function deleteSupabaseWorkspaceCard(cardId: string) {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("workspace_cards").delete().eq("id", cardId);

  if (error) {
    throw new Error(`Failed to delete workspace card ${cardId}: ${error.message}`);
  }
}

export async function deleteSupabaseWorkspaceCardsByProfileId(profileId: string) {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("workspace_cards").delete().eq("profile_id", profileId);

  if (error) {
    throw new Error(`Failed to delete workspace cards for profile ${profileId}: ${error.message}`);
  }
}
