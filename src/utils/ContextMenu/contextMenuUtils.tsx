import { Node, Edge } from "reactflow";
import { generateNodeId } from "@utils/Nodes";

// Utility function to duplicate a node
export const duplicateNode = (
  id: string,
  getNode: (id: string) => Node | undefined,
  addNodes: (node: Node) => void,
): void => {
  const node = getNode(id);
  if (node) {
    const position = {
      x: node.position.x + 50,
      y: node.position.y + 50,
    };

    addNodes({
      ...node,
      id: generateNodeId(),
      position,
      selected: false,
      dragging: false,
    });
  }
};

// Utility function to delete a node
export const deleteNode = (
  id: string,
  nodes: Node[],
  edges: Edge[],
  setNodes: (nodes: Node[]) => void,
  setEdges: (edges: Edge[]) => void,
): void => {
  setNodes(nodes.filter((node) => node.id !== id));
  setEdges(edges.filter((edge) => edge.source !== id));
};

// Utility function to toggle completion status of a node
export const toggleComplete = (
  currentNode: Node | undefined,
  nodes: Node[],
  edges: Edge[],
  getNode: (id: string) => Node | undefined,
  setNodes: (nodes: Node[]) => void,
): void => {
  if (!currentNode) return;

  // Check all incoming edges
  const incomingEdges = edges.filter((edge) => edge.target === currentNode.id);
  const allInputsComplete = incomingEdges.every((edge) => {
    const sourceNode = getNode(edge.source);
    return sourceNode?.data.isComplete; // Check if source node is complete
  });

  // Only toggle if all inputs are complete
  if (allInputsComplete) {
    setNodes(
      nodes.map((node: Node) =>
        node.id === currentNode.id
          ? {
              ...node,
              data: {
                ...node.data,
                isComplete: !node.data.isComplete,
                isActive: false,
              },
            }
          : node,
      ),
    );
  } else {
    alert(
      "You cannot mark this task as complete until all previous tasks are complete.",
    );
  }
};
