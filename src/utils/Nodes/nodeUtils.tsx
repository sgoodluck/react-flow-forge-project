import { Node, Position } from "reactflow";
import { CustomNodeData } from "@utils/interfaces";

export const createNode = (): Node<CustomNodeData> => {
  const newNodeId = generateNodeId();
  return {
    id: newNodeId,
    type: "custom",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: {
      label: "",
      onLabelChange: () => {},
    },
    position: { x: Math.random() * 250, y: Math.random() * 250 },
  };
};

export const generateNodeId = (length: number = 8): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
