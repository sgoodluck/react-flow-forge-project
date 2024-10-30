import { useReactFlow, Node } from "reactflow";
import { duplicateNode, deleteNode, toggleComplete } from "@utils/ContextMenu";
import { ContextMenuProps } from "@utils/interfaces";

export const ContextMenu = ({
  id,
  top,
  left,
  right,
  bottom,
  onClose,
}: ContextMenuProps) => {
  const { getNodes, getNode, setNodes, addNodes, setEdges, getEdges } =
    useReactFlow();

  const currentNode = getNode(id);
  const allNodes = getNodes();
  const allEdges = getEdges();

  return (
    <div
      style={{ top, left, right, bottom }}
      className="absolute z-10 rounded border border-gray-200 bg-white text-gray-600 shadow-lg"
    >
      <p className="m-2 text-xs">Task ID: {id}</p>

      <button
        className="block w-full px-4 py-2 text-left transition-colors duration-200"
        onClick={() => {
          toggleComplete(currentNode, allNodes, allEdges, getNode, setNodes);
          onClose();
        }}
      >
        {currentNode?.data.isComplete ? "Mark Incomplete" : "Mark Complete"}
      </button>

      <button
        className="block w-full px-4 py-2 text-left transition-colors duration-200 hover:bg-gray-100"
        onClick={() => {
          duplicateNode(id, getNode as (id: string) => Node | null, addNodes);
          onClose();
        }}
      >
        Duplicate
      </button>

      <button
        className="block w-full px-4 py-2 text-left transition-colors duration-200 hover:bg-gray-100"
        onClick={() => {
          deleteNode(id, allNodes, allEdges, setNodes, setEdges);
          onClose();
        }}
      >
        Delete
      </button>
    </div>
  );
};
