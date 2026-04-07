"use server";

import { redirect } from "next/navigation";
import { signOut } from "@/auth";
import { requireWorkspaceUser } from "@/lib/workspace-auth";

export async function signOutFromWorkspace() {
  const user = await requireWorkspaceUser("/settings");

  if (user.isPreview) {
    redirect("/login");
  }

  await signOut({ redirectTo: "/login" });
}
