"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabasePublicEnv } from "@/backend/supabase/env";
import type { Database } from "@/backend/supabase/types";

let browserClient: SupabaseClient<Database> | undefined;

export function createSupabaseBrowserClient() {
  if (!browserClient) {
    const { anonKey, url } = getSupabasePublicEnv();

    browserClient = createClient<Database>(url, anonKey, {
      auth: {
        autoRefreshToken: true,
        detectSessionInUrl: true,
        persistSession: true,
      },
    });
  }

  return browserClient;
}
