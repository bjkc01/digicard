"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signOutFromWorkspace } from "@/lib/workspace-actions";
import { requireWorkspaceUser } from "@/lib/workspace-auth";
import {
  notificationSettingOptions,
  saveWorkspaceNotifications,
  saveWorkspaceProfileDetails,
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
    await saveWorkspaceProfileDetails(user, {
      company: String(formData.get("company") ?? ""),
      email: String(formData.get("email") ?? ""),
      linkedin: String(formData.get("linkedin") ?? ""),
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      title: String(formData.get("title") ?? ""),
      website: String(formData.get("website") ?? ""),
    });
    revalidatePath("/settings");
    revalidatePath("/dashboard");
    revalidatePath("/cards");
    revalidatePath("/create-card");
    revalidatePath("/templates");
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
    revalidatePath("/dashboard");
    revalidatePath("/cards");
    revalidatePath("/create-card");
    revalidatePath("/templates");
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
    revalidatePath("/dashboard");
    revalidatePath("/cards");
    revalidatePath("/templates");
  } catch (error) {
    notice = getNoticeFromError(error, "notifications-error");
  }

  redirectToSettings(notice);
}

export async function signOutFromSettings() {
  await signOutFromWorkspace();
}
