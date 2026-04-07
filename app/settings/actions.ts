"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signOut } from "@/auth";
import { requireWorkspaceUser } from "@/lib/workspace-auth";
import {
  notificationSettingOptions,
  saveWorkspaceNotifications,
  saveWorkspaceProfile,
  saveWorkspaceTemplate,
  type WorkspaceNotificationKey,
  WorkspaceSettingsValidationError,
} from "@/lib/workspace-settings";

function redirectToSettings(notice: string) {
  redirect(`/settings?notice=${notice}`);
}

function getNoticeFromError(error: unknown, fallbackNotice: string) {
  if (error instanceof WorkspaceSettingsValidationError) {
    return error.code;
  }

  return fallbackNotice;
}

export async function saveProfileSettings(formData: FormData) {
  const user = await requireWorkspaceUser("/settings");
  let notice = "profile-saved";

  try {
    await saveWorkspaceProfile(user, {
      email: String(formData.get("email") ?? ""),
      name: String(formData.get("name") ?? ""),
      title: String(formData.get("title") ?? ""),
      website: String(formData.get("website") ?? ""),
    });
    revalidatePath("/settings");
  } catch (error) {
    notice = getNoticeFromError(error, "profile-error");
  }

  redirectToSettings(notice);
}

export async function saveTemplateSettings(formData: FormData) {
  const user = await requireWorkspaceUser("/settings");
  let notice = "template-saved";

  try {
    await saveWorkspaceTemplate(user, String(formData.get("defaultTemplateId") ?? ""));
    revalidatePath("/settings");
  } catch (error) {
    notice = getNoticeFromError(error, "template-error");
  }

  redirectToSettings(notice);
}

export async function saveNotificationSettings(formData: FormData) {
  const user = await requireWorkspaceUser("/settings");
  let notice = "notifications-saved";

  try {
    const validNotificationKeys = new Set(notificationSettingOptions.map((option) => option.key));
    const enabledKeys = formData
      .getAll("notifications")
      .filter(
        (value): value is WorkspaceNotificationKey =>
          typeof value === "string" && validNotificationKeys.has(value as WorkspaceNotificationKey),
      )
      .filter((value, index, array) => array.indexOf(value) === index);

    await saveWorkspaceNotifications(user, enabledKeys);
    revalidatePath("/settings");
  } catch (error) {
    notice = getNoticeFromError(error, "notifications-error");
  }

  redirectToSettings(notice);
}

export async function signOutFromSettings() {
  const user = await requireWorkspaceUser("/settings");

  if (user.isPreview) {
    redirect("/login");
  }

  await signOut({ redirectTo: "/login" });
}
