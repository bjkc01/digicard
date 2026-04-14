"use server";

import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import type { SaveCardActionState } from "@/app/create-card/action-state";
import { requireWorkspaceUser } from "@/lib/workspace-auth";
import {
  deleteWorkspaceExtraCard,
  saveWorkspaceExtraCard,
  WorkspaceSettingsValidationError,
} from "@/lib/workspace-settings";

function getActionErrorMessage(error: unknown) {
  if (error instanceof WorkspaceSettingsValidationError) {
    switch (error.code) {
      case "profile-invalid":
        return "Add a valid name, email, and professional title before saving.";
      case "qr-invalid":
        return "Choose whether the QR should open your website, LinkedIn, or use auto mode.";
      case "template-invalid":
        return "Choose one of the available templates before saving.";
      default:
        return error.message;
    }
  }

  return "We could not save your card right now. Please try again.";
}

export async function saveExtraCardAction(
  _previousState: SaveCardActionState,
  formData: FormData,
): Promise<SaveCardActionState> {
  try {
    const user = await requireWorkspaceUser("/create-card");

    await saveWorkspaceExtraCard(user, {
      id: String(formData.get("extraCardId") ?? ""),
      label: String(formData.get("cardLabel") ?? ""),
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

    return {
      message: "Your card was saved successfully.",
      status: "success",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    const detail = error instanceof Error ? error.message : String(error);
    console.error("Failed to save extra card.", detail);

    return {
      message: getActionErrorMessage(error),
      status: "error",
    };
  }
}

export async function deleteExtraCardAction(cardId: string): Promise<void> {
  const user = await requireWorkspaceUser("/cards");
  await deleteWorkspaceExtraCard(user, cardId);

  revalidatePath("/dashboard");
  revalidatePath("/cards");
  revalidatePath("/create-card");
}
