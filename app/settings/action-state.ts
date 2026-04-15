export type SettingsFieldErrorKey =
  | "company"
  | "defaultTemplateId"
  | "email"
  | "global"
  | "linkedin"
  | "name"
  | "notifications"
  | "phone"
  | "qrPreference"
  | "title"
  | "website";

export type SettingsActionState = {
  fieldErrors: Partial<Record<SettingsFieldErrorKey, string>>;
  message: string;
  status: "error" | "idle" | "success" | "warning";
};

export const initialSettingsActionState: SettingsActionState = {
  fieldErrors: {},
  message: "",
  status: "idle",
};
