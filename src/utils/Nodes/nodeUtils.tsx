import { Edge, Node, Position } from "reactflow";
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
      isActive: false,
      isComplete: false,
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

export const updateNodeStates = (
  nodes: Node<CustomNodeData>[],
  edges: Edge[],
): Node<CustomNodeData>[] => {
  // Create a map for fast lookups
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));

  return nodes.map((node) => {
    const incomingEdges = edges.filter((edge) => edge.target === node.id);
    const isStartNode = incomingEdges.length === 0;

    // Check if all inputs are complete using the nodeMap
    const allInputsComplete = incomingEdges.every(
      (edge) => nodeMap.get(edge.source)?.data.isComplete,
    );

    const isActive = isStartNode || allInputsComplete;

    return {
      ...node,
      data: {
        ...node.data,
        isActive,
      },
    };
  });
};
