import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type { SupabaseProfile, SupabaseProfileInsert } from "@/lib/supabase/types";

function normalizeOwnerEmail(ownerEmail: string) {
  return ownerEmail.trim().toLowerCase();
}

export async function getSupabaseProfileByUserId(userId: string) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load Supabase profile for user ${userId}: ${error.message}`);
  }

  return data;
}

export async function getSupabaseProfileByOwnerEmail(ownerEmail: string) {
  const normalizedOwnerEmail = normalizeOwnerEmail(ownerEmail);
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("owner_email", normalizedOwnerEmail)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to load Supabase profile for owner ${normalizedOwnerEmail}: ${error.message}`,
    );
  }

  return data;
}

export async function upsertSupabaseProfile(profile: SupabaseProfileInsert) {
  const supabase = createSupabaseAdminClient();
  const now = new Date().toISOString();
  const normalizedProfile = {
    ...profile,
    owner_email: normalizeOwnerEmail(profile.owner_email),
    updated_at: now,
  };
  const existingProfile =
    (await getSupabaseProfileByUserId(normalizedProfile.user_id)) ??
    (await getSupabaseProfileByOwnerEmail(normalizedProfile.owner_email));
  const query = existingProfile
    ? supabase
        .from("profiles")
        .update(normalizedProfile)
        .eq("id", existingProfile.id)
    : supabase.from("profiles").insert({ created_at: now, ...normalizedProfile });
  const { data, error } = await query.select("*").single();

  if (error) {
    throw new Error(`Failed to upsert Supabase profile: ${error.message}`);
  }

  return data satisfies SupabaseProfile;
}
