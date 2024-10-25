export interface CustomNodeData {
  label: string;
  onLabelChange: (id: string, newLabel: string) => void;
  isActive: boolean;
  isComplete: boolean;
}

export interface MenuPosition {
  id: string;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}
