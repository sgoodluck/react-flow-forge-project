export interface CustomNodeData {
  label: string;
  onLabelChange?: (id: string, newLabel: string) => void;
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

export interface ContextMenuProps {
  id: string;
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  onClick?: () => void;
  onClose: () => void;
  [key: string]: unknown;
}
