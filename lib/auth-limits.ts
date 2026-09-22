import { supabaseEnabled } from "@/lib/supabase-env";

const localBuckets = new Map<string, { count: number; expires: number }>();

// Supabase provides an atomic counter shared across serverless instances.
// In-memory storage is only used for local development without a database.
export async function consumeAuthLimit(key: string, limit: number, windowSeconds: number) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(key));
  const hashedKey = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
  if (supabaseEnabled) {
    const { createSupabaseAdminClient } = await import("@/lib/supabase/server");
    const { data, error } = await createSupabaseAdminClient().rpc("consume_auth_limit", {
      bucket_key: hashedKey, max_attempts: limit, window_seconds: windowSeconds,
    });
    if (error) throw new Error("Sign-in protection is unavailable.");
    return data === true;
  }
  if (process.env.NODE_ENV === "production") throw new Error("Sign-in protection requires database storage.");
  const now = Date.now();
  for (const [id, bucket] of localBuckets) if (bucket.expires <= now) localBuckets.delete(id);
  const bucket = localBuckets.get(hashedKey) ?? { count: 0, expires: now + windowSeconds * 1000 };
  if (bucket.count >= limit) return false;
  bucket.count += 1;
  localBuckets.set(hashedKey, bucket);
  return true;
}
