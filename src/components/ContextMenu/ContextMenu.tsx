import { generateNodeId } from "@utils/Nodes";
import { useCallback } from "react";
import { useReactFlow, Node, Edge } from "reactflow";

interface ContextMenuProps {
  id: string;
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  [key: string]: any;
}

export const ContextMenu = ({
  id,
  top,
  left,
  right,
  bottom,
  ...props
}: ContextMenuProps) => {
  const { getNode, setNodes, addNodes, setEdges, getEdges } = useReactFlow();

  const duplicateNode = useCallback(() => {
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
  }, [id, getNode, addNodes]);

  const deleteNode = useCallback(() => {
    setNodes((nodes: Node[]) => nodes.filter((node) => node.id !== id));
    setEdges((edges: Edge[]) => edges.filter((edge) => edge.source !== id));
  }, [id, setNodes, setEdges]);

  // New function to toggle isComplete and update isActive
  const toggleComplete = useCallback(() => {
    const currentNode = getNode(id);
    if (!currentNode) return;

    // Get all edges
    const edges = getEdges();

    // Check all incoming edges
    const incomingEdges = edges.filter((edge) => edge.target === id);
    const allInputsComplete = incomingEdges.every((edge) => {
      const sourceNode = getNode(edge.source);
      return sourceNode?.data.isComplete; // Check if source node is complete
    });

    // Only toggle if all inputs are complete
    if (allInputsComplete) {
      setNodes((nodes: Node[]) =>
        nodes.map((node) =>
          node.id === id
            ? {
                ...node,
                data: {
                  ...node.data,
                  isComplete: !node.data.isComplete,
                  isActive: false, // Set isActive to false if completing the task
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
  }, [id, setNodes, getNode, getEdges]);

  // Get the current node to determine if it's complete
  const currentNode = getNode(id);
  const isComplete = currentNode?.data.isComplete;

  return (
    <div
      style={{ top, left, right, bottom }}
      className="absolute z-10 rounded border border-gray-200 bg-white text-gray-600 shadow-lg"
      {...props}
    >
      <p className="m-2 text-xs">Task ID: {id}</p>
      <button
        className="block w-full px-4 py-2 text-left transition-colors duration-200 hover:bg-gray-100"
        onClick={toggleComplete}
      >
        {isComplete ? "Mark Incomplete" : "Mark Complete"}
      </button>
      <button
        className="block w-full px-4 py-2 text-left text-gray-600 transition-colors duration-200 hover:bg-gray-100"
        onClick={duplicateNode}
      >
        Duplicate
      </button>
      <button
        className="block w-full px-4 py-2 text-left transition-colors duration-200 hover:bg-gray-100"
        onClick={deleteNode}
      >
        Delete
      </button>
    </div>
  );
};
