"use server";

import { redirect } from "next/navigation";
import { signOut } from "@/backend/auth/config";
import { requireWorkspaceUser } from "@/backend/workspace/auth";

export async function signOutFromWorkspace() {
  const user = await requireWorkspaceUser("/settings");

  if (user.isPreview) {
    redirect("/login");
  }

  await signOut({ redirectTo: "/login" });
}
