import { useReactFlow, Node } from "reactflow";
import { duplicateNode, deleteNode, toggleComplete } from "@utils/ContextMenu"; // Adjust the path as necessary

interface ContextMenuProps {
  id: string;
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
}

export const ContextMenu = ({
  id,
  top,
  left,
  right,
  bottom,
}: ContextMenuProps) => {
  const { getNode, setNodes, addNodes, setEdges, getEdges } = useReactFlow();
  const currentNode = getNode(id);

  return (
    <div
      style={{ top, left, right, bottom }}
      className="absolute z-10 rounded border border-gray-200 bg-white text-gray-600 shadow-lg"
    >
      <p className="m-2 text-xs">Task ID: {id}</p>

      <button
        className="block w-full px-4 py-2 text-left transition-colors duration-200"
        onClick={() =>
          toggleComplete(
            id,
            getNode as (id: string) => Node | null,
            setNodes,
            getEdges,
          )
        }
      >
        {currentNode?.data.isComplete ? "Mark Incomplete" : "Mark Complete"}
      </button>

      <button
        className="block w-full px-4 py-2 text-left transition-colors duration-200 hover:bg-gray-100"
        onClick={() =>
          duplicateNode(id, getNode as (id: string) => Node | null, addNodes)
        }
      >
        Duplicate
      </button>

      <button
        className="block w-full px-4 py-2 text-left transition-colors duration-200 hover:bg-gray-100"
        onClick={() => deleteNode(id, setNodes, setEdges)}
      >
        Delete
      </button>
    </div>
  );
};
