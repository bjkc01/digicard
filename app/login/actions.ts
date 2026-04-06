"use server";

import { googleAuthEnabled, signIn } from "@/auth";
import { redirect } from "next/navigation";

function getSafeCallbackUrl(value: FormDataEntryValue | null) {
  return typeof value === "string" && value.startsWith("/") ? value : "/dashboard";
}

export async function signInWithGoogle(formData: FormData) {
  if (!googleAuthEnabled) {
    redirect("/login?error=GoogleOAuthNotConfigured");
  }

  await signIn("google", {
    redirectTo: getSafeCallbackUrl(formData.get("callbackUrl")),
  });
}
