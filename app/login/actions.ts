"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export async function signInWithGoogle() {
  if (!process.env.AUTH_GOOGLE_ID || !process.env.AUTH_GOOGLE_SECRET) {
    redirect("/dashboard");
  }

  await signIn("google", { redirectTo: "/dashboard" });
}
