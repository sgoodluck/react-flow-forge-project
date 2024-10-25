import { ChangeEvent } from "react";
import { CustomNodeData } from "@utils/interfaces";

export const handleLabelChange = (
  event: ChangeEvent<HTMLInputElement>,
  setLabel: (label: string) => void,
) => {
  setLabel(event.target.value);
};

export const handleLabelBlur = (
  id: string,
  label: string,
  data: CustomNodeData,
  setIsEditing: (isEditing: boolean) => void,
) => {
  data.onLabelChange(id, label);
  setIsEditing(false);
};

export const handleKeyDown = (
  event: React.KeyboardEvent<HTMLInputElement>,
  onBlur: () => void,
) => {
  if (event.key === "Enter") {
    onBlur();
  }
};
