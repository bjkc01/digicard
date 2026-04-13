export type SaveCardActionState = {
  message: string;
  status: "error" | "idle" | "success";
};

export const initialSaveCardActionState: SaveCardActionState = {
  message: "",
  status: "idle",
};
