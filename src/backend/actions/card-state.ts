export type SaveCardActionState = {
  message: string;
  status: "error" | "idle" | "success" | "warning";
};

export const initialSaveCardActionState: SaveCardActionState = {
  message: "",
  status: "idle",
};
