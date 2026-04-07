"use server";

import { revalidatePath } from "next/cache";
import { requireWorkspaceUser } from "@/lib/workspace-auth";
import {
  saveWorkspaceProfileDetails,
  saveWorkspaceTemplate,
  WorkspaceSettingsValidationError,
} from "@/lib/workspace-settings";

export type SaveCardActionState = {
  message: string;
  status: "error" | "idle" | "success";
};

export const initialSaveCardActionState: SaveCardActionState = {
  message: "",
  status: "idle",
};

function getActionErrorMessage(error: unknown) {
  if (error instanceof WorkspaceSettingsValidationError) {
    switch (error.code) {
      case "profile-invalid":
        return "Add a valid name, email, and professional title before saving.";
      case "template-invalid":
        return "Choose one of the available templates before saving.";
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
  const user = await requireWorkspaceUser("/create-card");

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
    await saveWorkspaceTemplate(user, String(formData.get("defaultTemplateId") ?? ""));

    revalidatePath("/dashboard");
    revalidatePath("/cards");
    revalidatePath("/create-card");
    revalidatePath("/settings");
    revalidatePath("/templates");

    return {
      message: "Your card details were saved to this workspace.",
      status: "success",
    };
  } catch (error) {
    return {
      message: getActionErrorMessage(error),
      status: "error",
    };
  }
}
