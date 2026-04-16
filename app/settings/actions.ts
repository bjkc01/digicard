"use server";

import { revalidatePath } from "next/cache";
import type { SettingsActionState } from "@/app/settings/action-state";
import { requireWorkspaceUser } from "@/lib/workspace-auth";
import {
  clearWorkspaceCards,
  saveWorkspaceNotifications,
  saveWorkspaceProfileDetails,
  saveWorkspaceTemplate,
  WorkspaceSettingsValidationError,
} from "@/lib/workspace-settings";
import {
  notificationSettingOptions,
  type WorkspaceNotificationKey,
} from "@/lib/workspace-settings-options";
import { signOutFromWorkspace } from "@/lib/workspace-actions";

function getValidationMessage(error: WorkspaceSettingsValidationError) {
  switch (error.code) {
    case "profile-invalid":
    case "avatar-invalid":
    case "qr-invalid":
    case "website-invalid":
    case "phone-invalid":
    case "linkedin-invalid":
    case "template-invalid":
      return error.message;
    default:
      return "Please review the highlighted fields and try again.";
  }
}

function buildErrorState(error: unknown): SettingsActionState {
  if (error instanceof WorkspaceSettingsValidationError) {
    return {
      fieldErrors: error.fieldErrors,
      message: getValidationMessage(error),
      status: "error",
    };
  }

  return {
    fieldErrors: { global: "Something went wrong while saving. Please try again." },
    message: "Something went wrong while saving. Please try again.",
    status: "error",
  };
}

function buildSaveState(
  storageStatus: "browser" | "cloud" | "degraded",
  successMessage: string,
): SettingsActionState {
  return storageStatus === "degraded"
    ? {
        fieldErrors: {},
        message: "Saved on this browser, but cloud sync could not be confirmed.",
        status: "warning",
      }
    : {
        fieldErrors: {},
        message: successMessage,
        status: "success",
      };
}

function revalidateWorkspaceSettingsViews() {
  revalidatePath("/settings");
  revalidatePath("/dashboard");
  revalidatePath("/cards");
  revalidatePath("/create-card");
  revalidatePath("/templates");
}

export async function saveProfileSettings(
  _previousState: SettingsActionState,
  formData: FormData,
): Promise<SettingsActionState> {
  try {
    const user = await requireWorkspaceUser("/settings");
    const result = await saveWorkspaceProfileDetails(user, {
      avatarUrl: String(formData.get("avatarUrl") ?? ""),
      company: String(formData.get("company") ?? ""),
      email: String(formData.get("email") ?? ""),
      linkedin: String(formData.get("linkedin") ?? ""),
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      qrPreference: String(formData.get("qrPreference") ?? ""),
      title: String(formData.get("title") ?? ""),
      website: String(formData.get("website") ?? ""),
    });

    revalidateWorkspaceSettingsViews();
    return buildSaveState(result.storageStatus, "Profile details saved.");
  } catch (error) {
    return buildErrorState(error);
  }
}

export async function saveTemplateSettings(
  _previousState: SettingsActionState,
  formData: FormData,
): Promise<SettingsActionState> {
  try {
    const user = await requireWorkspaceUser("/settings");
    const result = await saveWorkspaceTemplate(user, String(formData.get("defaultTemplateId") ?? ""));

    revalidateWorkspaceSettingsViews();
    return buildSaveState(result.storageStatus, "Default template updated.");
  } catch (error) {
    return buildErrorState(error);
  }
}

export async function saveNotificationSettings(
  _previousState: SettingsActionState,
  formData: FormData,
): Promise<SettingsActionState> {
  try {
    const user = await requireWorkspaceUser("/settings");
    const validNotificationKeys = new Set(notificationSettingOptions.map((option) => option.key));
    const enabledKeys = formData
      .getAll("notifications")
      .filter(
        (value): value is WorkspaceNotificationKey =>
          typeof value === "string" && validNotificationKeys.has(value as WorkspaceNotificationKey),
      )
      .filter((value, index, array) => array.indexOf(value) === index);
    const result = await saveWorkspaceNotifications(user, enabledKeys);

    revalidateWorkspaceSettingsViews();
    return buildSaveState(result.storageStatus, "Notification settings saved.");
  } catch (error) {
    return buildErrorState(error);
  }
}

export async function clearSavedCardsSettingsAction(
  _previousState: SettingsActionState,
  _formData: FormData,
): Promise<SettingsActionState> {
  try {
    const user = await requireWorkspaceUser("/settings");
    const result = await clearWorkspaceCards(user);

    revalidateWorkspaceSettingsViews();
    return buildSaveState(result.storageStatus, "All saved cards were cleared.");
  } catch (error) {
    return buildErrorState(error);
  }
}

export async function signOutFromSettings() {
  await signOutFromWorkspace();
}
