import React, { ChangeEvent, useCallback, useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { CustomNodeData } from "@utils/interfaces";
import { CheckBadgeIcon } from "@heroicons/react/24/solid"; // Import the check badge icon

const CustomNode: React.FC<NodeProps<CustomNodeData>> = ({
  id,
  data,
  isConnectable,
}) => {
  const [label, setLabel] = useState(data.label);
  const [isEditing, setIsEditing] = useState(false); // State to control input visibility

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setLabel(event.target.value);
  }, []);

  const onBlur = useCallback(() => {
    data.onLabelChange(id, label);
    setIsEditing(false); // Hide input after blur
  }, [id, label, data]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        onBlur(); // Call onBlur when Enter is pressed
      }
    },
    [onBlur],
  );

  return (
    <div className="relative z-10 flex w-full cursor-pointer items-center overflow-hidden rounded-xl border border-slate-800 p-[1.5px]">
      {data.isActive && (
        <div className="absolute inset-0 h-full w-full animate-rotate rounded-full bg-[conic-gradient(transparent_20deg,#0ea5e9_120deg)]" />
      )}
      <div className="z-20 flex w-full flex-col rounded-[0.60rem] bg-slate-900 p-2">
        <Handle
          type="target"
          position={Position.Left}
          isConnectable={isConnectable}
        />

        {/* Checkmark Icon */}
        {data.isComplete && (
          <div className="absolute right-2 top-2">
            <CheckBadgeIcon className="h-5 w-5 text-green-500" />
          </div>
        )}

        {/* Node Label + Input */}
        {isEditing ? (
          <input
            className="mt-1 rounded-lg border border-gray-300 bg-transparent px-2 py-1 text-xs text-gray-500 placeholder:text-slate-700 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            value={label}
            onChange={onChange}
            onBlur={onBlur}
            onKeyDown={handleKeyDown}
            placeholder="Describe Task..."
            autoFocus
          />
        ) : (
          <div
            className="mt-1 cursor-pointer text-sm text-white"
            onClick={() => setIsEditing(true)} // Show input on click
          >
            {label}
          </div>
        )}

        {/* Node ID */}
        <div className="text-xs text-gray-400">Task ID: {id}</div>

        <Handle
          type="source"
          position={Position.Right}
          isConnectable={isConnectable}
        />
      </div>
    </div>
  );
};

export default CustomNode;
