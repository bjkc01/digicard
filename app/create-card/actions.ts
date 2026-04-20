"use server";

import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import type { SaveCardActionState } from "@/app/create-card/action-state";
import { requireWorkspaceUser } from "@/lib/workspace-auth";
import {
  deleteWorkspacePrimaryCard,
  saveWorkspaceCardSnapshot,
  WorkspaceSettingsValidationError,
} from "@/lib/workspace-settings";

function getActionErrorMessage(error: unknown) {
  if (error instanceof WorkspaceSettingsValidationError) {
    switch (error.code) {
      case "profile-invalid":
        return "Add a valid name, email, and professional title before saving.";
      case "qr-invalid":
        return "Choose whether the QR should open your website, LinkedIn, or phone.";
      case "template-invalid":
        return "Choose one of the available templates before saving.";
      case "website-invalid":
        return "Add a valid website or leave the field blank.";
      case "phone-invalid":
        return "Add a valid phone number or leave the field blank.";
      case "linkedin-invalid":
        return "Add a valid LinkedIn username or profile URL.";
      default:
        return error.message;
    }
  }

  return "We could not save your card right now. Please try again.";
}

export async function saveWorkspaceCardAction(
  _previousState: SaveCardActionState,
  formData: FormData,
): Promise<SaveCardActionState> {
  try {
    const user = await requireWorkspaceUser("/create-card");

    const result = await saveWorkspaceCardSnapshot(user, {
      company: String(formData.get("company") ?? ""),
      defaultTemplateId: String(formData.get("defaultTemplateId") ?? ""),
      email: String(formData.get("email") ?? ""),
      linkedin: String(formData.get("linkedin") ?? ""),
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      qrPreference: String(formData.get("qrPreference") ?? ""),
      title: String(formData.get("title") ?? ""),
      website: String(formData.get("website") ?? ""),
    });

    revalidatePath("/dashboard");
    revalidatePath("/cards");
    revalidatePath("/create-card");
    revalidatePath("/settings");
    revalidatePath("/templates");

    return result.storageStatus === "degraded"
      ? {
          message: "Your card was saved on this browser, but cloud sync could not be confirmed.",
          status: "warning",
        }
      : {
          message: "Your card details were saved successfully.",
          status: "success",
        };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    const detail = error instanceof Error ? error.message : String(error);
    console.error("Failed to save workspace card.", detail);

    return {
      message: getActionErrorMessage(error),
      status: "error",
    };
  }
}

export async function deleteWorkspaceCardAction(): Promise<void> {
  const user = await requireWorkspaceUser("/cards");
  await deleteWorkspacePrimaryCard(user);

  revalidatePath("/dashboard");
  revalidatePath("/cards");
  revalidatePath("/create-card");
  revalidatePath("/settings");
  revalidatePath("/templates");
}
