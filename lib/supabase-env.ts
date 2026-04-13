function getRawEnvValue(keys: string[]) {
  for (const key of keys) {
    const value = process.env[key]?.trim();

    if (value) {
      return value;
    }
  }

  return undefined;
}

function getConfiguredEnvValue(keys: string[], placeholderValues: string[]) {
  const value = getRawEnvValue(keys);

  if (!value) {
    return undefined;
  }

  const normalized = value.toLowerCase();
  const placeholderMatch = placeholderValues.some(
    (placeholderValue) => normalized === placeholderValue.toLowerCase(),
  );

  return placeholderMatch ? undefined : value;
}

function requireEnvValue(value: string | undefined, keyName: string) {
  if (value) {
    return value;
  }

  throw new Error(
    `${keyName} is not configured. Add it to .env.local and your deployment environment variables.`,
  );
}

export const supabaseUrl = getConfiguredEnvValue(
  ["NEXT_PUBLIC_SUPABASE_URL"],
  ["https://your-project.supabase.co"],
);

export const supabaseAnonKey = getConfiguredEnvValue(
  ["NEXT_PUBLIC_SUPABASE_ANON_KEY", "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"],
  ["your-supabase-anon-key", "your-supabase-publishable-key"],
);

export const supabaseServiceRoleKey = getConfiguredEnvValue(
  ["SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_SECRET_KEY"],
  ["your-supabase-service-role-key", "your-supabase-secret-key"],
);

export const supabaseEnabled = Boolean(supabaseUrl && supabaseAnonKey && supabaseServiceRoleKey);

export function getSupabasePublicEnv() {
  return {
    anonKey: requireEnvValue(supabaseAnonKey, "NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    url: requireEnvValue(supabaseUrl, "NEXT_PUBLIC_SUPABASE_URL"),
  };
}

export function getSupabaseServiceRoleEnv() {
  return {
    serviceRoleKey: requireEnvValue(supabaseServiceRoleKey, "SUPABASE_SERVICE_ROLE_KEY"),
    ...getSupabasePublicEnv(),
  };
}
